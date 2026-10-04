import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
} from "react";

// Minimal client-side router built on the History API.
// Supports path params ("/properties/$slug") and query-string search params.

export type SearchParams = Record<string, string | number | undefined>;

type RouterState = {
  path: string;
  search: SearchParams;
  navigate: (to: string, search?: SearchParams) => void;
};

const RouterContext = createContext<RouterState>({
  path: "/",
  search: {},
  navigate: () => {},
});

/** Convert a search object into a URL query string, dropping undefined values. */
export function searchToString(search: SearchParams): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(search)) {
    if (value !== undefined) params.set(key, String(value));
  }
  const s = params.toString();
  return s ? `?${s}` : "";
}

function parseSearch(): SearchParams {
  const out: SearchParams = {};
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of params.entries()) {
    const asNumber = /^\d+$/.test(value) ? Number(value) : undefined;
    out[key] = asNumber ?? value;
  }
  return out;
}

function currentPath(): string {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const navigate = useCallback((to: string, search?: SearchParams) => {
    const url = `${to}${search ? searchToString(search) : ""}`;
    window.history.pushState({}, "", url);
    setState({ path: currentPath(), search: parseSearch(), navigate });
    window.scrollTo({ top: 0 });
  }, []);

  const [state, setState] = useState<RouterState>(() => ({
    path: currentPath(),
    search: parseSearch(),
    navigate,
  }));

  useEffect(() => {
    const sync = () => setState({ path: currentPath(), search: parseSearch(), navigate });
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [navigate]);

  return <RouterContext.Provider value={{ ...state, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}

/** Extract params from a path pattern like "/properties/$slug" against the current path. */
export function useParams(pattern: string): Record<string, string> {
  const { path } = useRouter();
  const patternParts = pattern.split("/").filter(Boolean);
  const pathParts = path.split("/").filter(Boolean);
  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i++) {
    const part = patternParts[i] ?? "";
    if (part.startsWith("$")) {
      params[part.slice(1)] = pathParts[i] ?? "";
    }
  }
  return params;
}

/** Build a concrete href from a pattern like "/blog/$slug" and params. */
export function buildHref(
  to: string,
  params?: Record<string, string>,
  search?: SearchParams,
): string {
  let href = to;
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      href = href.replace(`$${key}`, encodeURIComponent(value));
    }
  }
  if (search) href += searchToString(search);
  return href;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  params?: Record<string, string>;
  search?: SearchParams;
  activeProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
  activeOptions?: { exact?: boolean };
};

export function Link({
  to,
  params,
  search,
  activeProps,
  activeOptions,
  children,
  onClick,
  ...rest
}: LinkProps) {
  const { path } = useRouter();
  const href = buildHref(to, params, search);

  const isActive = activeOptions?.exact
    ? path === to
    : path === to || (to !== "/" && path.startsWith(`${to}/`));

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
      return;
    e.preventDefault();
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0 });
  };

  return (
    <a href={href} onClick={handleClick} {...(isActive ? activeProps : undefined)} {...rest}>
      {children}
    </a>
  );
}
