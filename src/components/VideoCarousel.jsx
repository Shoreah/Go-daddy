import { useState, useRef, useEffect, useCallback } from "react";
import Demon from "../assets/Demon.mp4";
import DemonImg from "../assets/Fourvid1.png";

import Solo from "../assets/SoloLevel.mp4";
import SoloImg from "../assets/Fourvid2.jpg";
/**
 * VideoCarousel
 *
 * Replace the VIDEOS array with your own files.
 * Each entry needs:
 *   src    – path / URL to the video file
 *   poster – path / URL to the thumbnail image
 *   title  – accessible label (not shown in carousel)
 */
const VIDEOS = [
  {
    id: 0,
    title: "Video one",
    src: Demon,
    poster: DemonImg,
  },
  {
    id: 1,
    title: "Video two",
    src: Solo,
    poster: SoloImg,
  },
  {
    id: 2,
    title: "Video three",
    src: "/videos/video4.mp4",
    poster: "/posters/poster3.jpg",
  },
  {
    id: 3,
    title: "Video four",
    src: "/videos/video4.mp4",
    poster: "/posters/poster4.jpg",
  },
];

const SWIPE_THRESHOLD = 50; // px drag needed to trigger a slide change

/* ─── tiny SVG icons ─────────────────────────────────────────────────── */

const PlayIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5.14v14l11-7-11-7z" />
  </svg>
);

const PauseIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const VolumeOnIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);

const VolumeOffIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18L19 19.27 20.27 18 5.27 3 4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
  </svg>
);

const FullscreenIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
  </svg>
);

const XIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronLeft = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* ─── helpers ─────────────────────────────────────────────────────────── */

function fmt(s) {
  if (!s || isNaN(s)) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

/* ─── Modal player ────────────────────────────────────────────────────── */

function VideoModal({ video, onClose, onBackToHome }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [dur, setDur] = useState(0);
  const [seeking, setSeeking] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      setCurrent(0);
      setDur(0);
      setPlaying(false);
    }
  }, [video.id]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) videoRef.current.pause();
    else videoRef.current.play();
    setPlaying((p) => !p);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted((m) => !m);
  };

  const pct = dur > 0 ? (current / dur) * 100 : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5"
      style={{ background: "rgba(0,0,0,0.82)" }}
      onClick={(e) => {
        if (e.currentTarget === e.target) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl mx-4 rounded-xl overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="w-full aspect-video object-cover"
          src={video.src}
          poster={video.poster}
          onTimeUpdate={() => {
            if (!seeking && videoRef.current)
              setCurrent(videoRef.current.currentTime);
          }}
          onLoadedMetadata={() => {
            if (videoRef.current) setDur(videoRef.current.duration);
          }}
          onEnded={() => setPlaying(false)}
          playsInline
        />

        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ background: "rgba(255,255,255,0.18)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.30)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.18)")
          }
        >
          <XIcon className="w-4 h-4 text-white" />
        </button>

        <div className="bg-black px-3 pb-3 pt-1">
          <div
            className="relative h-1 rounded-full overflow-hidden mb-2 mt-1"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            <div
              className="absolute inset-y-0 left-0 bg-white rounded-full"
              style={{ width: `${pct}%` }}
            />
            <input
              type="range"
              min={0}
              max={dur || 0}
              step={0.1}
              value={current}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                if (videoRef.current) videoRef.current.currentTime = v;
                setCurrent(v);
              }}
              onMouseDown={() => setSeeking(true)}
              onMouseUp={() => setSeeking(false)}
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
              className="text-white hover:opacity-75 transition-opacity"
            >
              {playing ? (
                <PauseIcon className="w-5 h-5" />
              ) : (
                <PlayIcon className="w-5 h-5" />
              )}
            </button>
            <span
              className="text-xs tabular-nums mr-auto"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {fmt(current)} / {fmt(dur)}
            </span>
            <button
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="text-white hover:opacity-75 transition-opacity"
            >
              {muted ? (
                <VolumeOffIcon className="w-5 h-5" />
              ) : (
                <VolumeOnIcon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => videoRef.current?.requestFullscreen?.()}
              aria-label="Fullscreen"
              className="text-white hover:opacity-75 transition-opacity"
            >
              <FullscreenIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={onBackToHome}
        className="text-sm px-6 py-2.5 rounded-lg border transition-colors"
        style={{
          borderColor: "rgba(255,255,255,0.3)",
          color: "#fff",
          background: "transparent",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
        }
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        Back to home page
      </button>
    </div>
  );
}

/* ─── Main carousel ───────────────────────────────────────────────────── */

export default function VideoCarousel({
  description = "Choose the right domain so the world can find you, and grow with an AI-powered website and built-in marketing tools.",
}) {
  const [active, setActive] = useState(0);
  const [modalIdx, setModalIdx] = useState(null);

  // drag / swipe state
  const dragStartX = useRef(null);
  const dragCurrent = useRef(0);
  const isDragging = useRef(false);
  const hasDragged = useRef(false); // true once drag exceeds a few px
  const stripRef = useRef(null);

  const total = VIDEOS.length;

  const navigate = useCallback(
    (dir) => {
      setActive((i) => mod(i + (dir === "right" ? 1 : -1), total));
    },
    [total],
  );

  /* ── pointer / touch handlers ── */

  const onDragStart = useCallback((clientX) => {
    dragStartX.current = clientX;
    dragCurrent.current = clientX;
    isDragging.current = true;
    hasDragged.current = false;
  }, []);

  const onDragMove = useCallback((clientX) => {
    if (!isDragging.current) return;
    dragCurrent.current = clientX;
    const delta = clientX - dragStartX.current;
    if (Math.abs(delta) > 5) hasDragged.current = true;
  }, []);

  const onDragEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const delta = dragCurrent.current - dragStartX.current;
    if (Math.abs(delta) >= SWIPE_THRESHOLD) {
      navigate(delta < 0 ? "right" : "left");
    }
  }, [navigate]);

  /* mouse events */
  const onMouseDown = (e) => {
    e.preventDefault();
    onDragStart(e.clientX);
  };
  const onMouseMove = (e) => {
    if (isDragging.current) onDragMove(e.clientX);
  };
  const onMouseUp = (e) => {
    onDragEnd();
  };

  /* touch events */
  const onTouchStart = (e) => {
    onDragStart(e.touches[0].clientX);
  };
  const onTouchMove = (e) => {
    onDragMove(e.touches[0].clientX);
  };
  const onTouchEnd = () => {
    onDragEnd();
  };

  /* attach global mousemove/mouseup so drag works even outside the strip */
  useEffect(() => {
    const move = (e) => onDragMove(e.clientX);
    const up = () => onDragEnd();
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [onDragMove, onDragEnd]);

  const openModal = (idx) => {
    // only open if the user didn't drag
    if (!hasDragged.current) setModalIdx(idx);
  };
  const closeModal = () => setModalIdx(null);
  const backToHome = () => {
    closeModal();
    setActive(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* five slots: far-left edge | left | ACTIVE | right | far-right edge */
  const indices = [
    mod(active - 2, total),
    mod(active - 1, total),
    active,
    mod(active + 1, total),
    mod(active + 2, total),
  ];

  const slotCfg = [
    { flex: "0 0 8%", dimOpacity: 0.55, scale: 0.9 },
    { flex: "0 0 20%", dimOpacity: 0.32, scale: 0.95 },
    { flex: "0 0 58%", dimOpacity: 0, scale: 1 },
    { flex: "0 0 20%", dimOpacity: 0.32, scale: 0.95 },
    { flex: "0 0 8%", dimOpacity: 0.55, scale: 0.9 },
  ];

  return (
    <section className="w-full bg-white w-full bg-white py-12">
      {/* ── carousel strip ── */}
      <div className="max-w-[1500px] mx-auto px-8">
        <div
          ref={stripRef}
          className="w-full overflow-hidden"
          style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex items-stretch"
            style={{
              height: "430px",
              userSelect: "none",
              gap: "24px",
            }}
          >
            {indices.map((vi, slot) => {
              const video = VIDEOS[vi];
              const isActive = slot === 2;
              const cfg = slotCfg[slot];

              return (
                <div
                  key={`${vi}-${slot}`}
                  style={{
                    flex: cfg.flex,
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "24px",
                    transform: `scale(${cfg.scale})`,
                    transition: "all 650ms cubic-bezier(.22,.61,.36,1)",
                    boxShadow: isActive
                      ? "0 20px 45px rgba(0,0,0,.18)"
                      : "none",
                  }}
                  onClick={isActive ? () => openModal(vi) : undefined}
                >
                  <img
                    src={video.poster}
                    alt={video.title}
                    draggable={false}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block",
                      pointerEvents: "none",
                      transform: isActive ? "scale(1.03)" : "scale(1)",
                      transition: "transform .7s ease",
                    }}
                  />

                  {/* dim overlay */}
                  {!isActive && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `rgba(0,0,0,${cfg.dimOpacity})`,
                        pointerEvents: "none",
                      }}
                    />
                  )}

                  {/* play button on active */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.92)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <PlayIcon
                          className="w-6 h-6 text-gray-800"
                          style={{ marginLeft: 3 }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── caption + nav row ── */}
      <div
        className="flex items-center justify-between px-6 py-5"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <p
          className="text-gray-600 text-sm leading-relaxed"
          style={{ maxWidth: 640 }}
        >
          {description}
        </p>

        <div className="flex gap-2 flex-shrink-0 ml-8">
          <button
            onClick={() => navigate("left")}
            aria-label="Previous video"
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate("right")}
            aria-label="Next video"
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── modal ── */}
      {modalIdx !== null && (
        <VideoModal
          video={VIDEOS[modalIdx]}
          onClose={closeModal}
          onBackToHome={backToHome}
        />
      )}
    </section>
  );
}
