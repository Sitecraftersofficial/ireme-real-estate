import { createFileRoute } from "@tanstack/react-router";
import { services } from "@/lib/services";
import { ServicePage } from "@/components/site/ServicePage";
import { meta } from "@/components/site/Common";

const s = services[2];
export const Route = createFileRoute("/services/interior-design")({
  head: () => meta(`${s.name} in Kigali — IREME Real Estate`, s.intro),
  component: () => <ServicePage s={s} />,
});
