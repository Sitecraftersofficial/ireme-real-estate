import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX, X } from "lucide-react";

export type VideoEntry = { key: string; src: string; title: string };

/** Full-screen dialog playing one video at large size. */
function BigVideoDialog({
  title,
  src,
  onClose,
}: {
  title: string;
  src: string;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Autoplay unmuted in the dialog; pause & reset when it closes.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setMuted(false);
    video.play().catch(() => {});
    return () => {
      video.pause();
      video.currentTime = 0;
    };
  }, [src]);

  // Escape closes the dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Video: ${title}`}
      onClick={onClose}
    >
      <div
        className="relative h-full max-h-[90vh]"
        style={{ aspectRatio: "9 / 16" }}
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={src}
          loop
          playsInline
          controls
          className="h-full w-full rounded-xl object-contain"
        />
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-4 left-4 rounded-full bg-black/50 p-3 text-white backdrop-blur transition hover:bg-black/70"
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      </div>
      <button
        onClick={onClose}
        aria-label="Close video"
        className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20"
      >
        <X className="h-6 w-6" />
      </button>
    </div>
  );
}

/**
 * A YouTube-Shorts-style vertical (9:16) video card.
 * Autoplays muted while in the viewport; "View listing" opens the video in a
 * big full-screen dialog.
 */
export function VideoShort({ video }: { video: VideoEntry }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [big, setBig] = useState(false);

  // Play/pause based on whether the card is visible (like Shorts autoplay).
  useEffect(() => {
    const el = wrapRef.current;
    const vid = videoRef.current;
    if (!el || !vid) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.intersectionRatio >= 0.6) {
          vid.play().catch(() => {});
          setPlaying(true);
        } else {
          vid.pause();
          setPlaying(false);
        }
      },
      { threshold: [0, 0.6, 1] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [video.src]);

  // Pause the inline video while the big dialog is open.
  useEffect(() => {
    if (big) videoRef.current?.pause();
  }, [big]);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => {});
      setPlaying(true);
    } else {
      vid.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setMuted(vid.muted);
  };

  return (
    <div
      ref={wrapRef}
      className="group relative mx-auto w-full max-w-75 overflow-hidden rounded-xl bg-navy-deep shadow-elegant"
      style={{ aspectRatio: "9 / 16" }}
    >
      <video
        ref={videoRef}
        src={video.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
        aria-label={`Video: ${video.title}`}
      />

      {/* Shorts-style gradients (keep it clean: no property details) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/80 to-transparent" />

      {/* Controls: sound + play/pause, and the expand-video button */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
        <div className="flex gap-2 opacity-80 transition group-hover:opacity-100 group-focus-within:opacity-100">
          <button
            onClick={togglePlay}
            aria-label={playing ? "Pause video" : "Play video"}
            className="rounded-full bg-black/50 p-2.5 text-white backdrop-blur transition hover:bg-black/70"
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className="rounded-full bg-black/50 p-2.5 text-white backdrop-blur transition hover:bg-black/70"
          >
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>
        <button
          onClick={() => setBig(true)}
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          View listing
        </button>
      </div>

      {big && <BigVideoDialog title={video.title} src={video.src} onClose={() => setBig(false)} />}
    </div>
  );
}

/** Row of Shorts-style vertical videos (horizontal scroll on small screens). */
export function PropertyShorts({ videos }: { videos: VideoEntry[] }) {
  if (!videos.length) return null;
  return (
    <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
      {videos.map((v) => (
        <div key={v.key} className="w-70 shrink-0 snap-center md:w-auto">
          <VideoShort video={v} />
        </div>
      ))}
    </div>
  );
}
