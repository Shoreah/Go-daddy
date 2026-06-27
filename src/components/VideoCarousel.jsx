import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import Demon from "../assets/Demon.mp4";
import DemonImg from "../assets/Fourvid1.png";
import Solo from "../assets/SoloLevel.mp4";
import SoloImg from "../assets/Fourvid2.jpg";
import ArcaneImg from "../assets/arcane.jpeg";
import HellImg from "../assets/hell.jpeg";

// ─── Data ────────────────────────────────────────────────────────────────────
const VIDEOS = [
  {
    id: 0,
    title: "Video one",
    description:
      "Choose the right domain so the world can find you, and grow with an AI-powered website and built-in marketing tools.",
    src: Demon,
    poster: ArcaneImg,
  },
  {
    id: 1,
    title: "Video two",
    description:
      "Build a stunning website in minutes with our AI-powered builder and start selling online today.",
    src: Solo,
    poster: SoloImg,
  },
  {
    id: 2,
    title: "Video three",
    description:
      "Reach more customers with built-in SEO tools, email marketing, and social media integrations.",
    src: Demon,
    poster: DemonImg,
  },
  {
    id: 3,
    title: "Video four",
    description:
      "Join millions of entrepreneurs who trust us to power their online presence and grow their business.",
    src: "/videos/video4.mp4",
    poster: HellImg,
  },
];

// ─── Layout constants ─────────────────────────────────────────────────────────
const CARD_H = 420;
const W_ACTIVE = 750;
const W_SIDE = 280;
const GAP = 32;
const DIM_OPACITY = 0.45;
const DRAG_THRESHOLD = 80; // px — how far to drag before committing a slide
const SLOT_WIDTH = W_SIDE + GAP; // how far the track moves per slide
const SPRING = { type: "spring", stiffness: 300, damping: 40, mass: 1 };
const SNAP_SPRING = { type: "spring", stiffness: 400, damping: 45, mass: 0.8 };

// ─── Icons ───────────────────────────────────────────────────────────────────
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={24} height={24}>
    <path d="M8 5.14v14l11-7-11-7z" />
  </svg>
);
const ChevronLeft = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={16}
    height={16}
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRight = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={16}
    height={16}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

function mod(n, m) {
  return ((n % m) + m) % m;
}

// ─── Card ─────────────────────────────────────────────────────────────────────
// progress: motion value -1 to +1 representing how far we're dragging
// slot: -1 (prev), 0 (active), +1 (next)
// We derive width and dim opacity from progress so they animate live
function Card({ video, slot, dragProgress, onClick }) {
  // When slot=0 (active): width goes from W_ACTIVE toward W_SIDE as we drag
  // When slot=-1 (prev):  width goes from W_SIDE toward W_ACTIVE as we drag right
  // When slot=+1 (next):  width goes from W_SIDE toward W_ACTIVE as we drag left
  const width = useTransform(dragProgress, (p) => {
    if (slot === 0) return W_ACTIVE - (W_ACTIVE - W_SIDE) * Math.abs(p);
    if (slot === -1) return W_SIDE + (W_ACTIVE - W_SIDE) * Math.max(0, p);
    if (slot === 1) return W_SIDE + (W_ACTIVE - W_SIDE) * Math.max(0, -p);
    return W_SIDE;
  });

  const dimOpacity = useTransform(dragProgress, (p) => {
    if (slot === 0) return DIM_OPACITY * Math.abs(p);
    if (slot === -1) return DIM_OPACITY - DIM_OPACITY * Math.max(0, p);
    if (slot === 1) return DIM_OPACITY - DIM_OPACITY * Math.max(0, -p);
    return DIM_OPACITY;
  });

  const playOpacity = useTransform(dragProgress, (p) => {
    if (slot === 0) return 1 - Math.abs(p);
    return 0;
  });

  return (
    <motion.div
      onClick={onClick}
      style={{
        width,
        height: CARD_H,
        borderRadius: 16,
        overflow: "hidden",
        flexShrink: 0,
        position: "relative",
        cursor: slot === 0 ? "pointer" : "grab",
      }}
    >
      <img
        src={video.poster}
        alt={video.title}
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* Dim overlay — live from dragProgress */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "white",
          opacity: dimOpacity,
          pointerEvents: "none",
        }}
      />

      {/* Play button — fades out as you drag */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          opacity: playOpacity,
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
            boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
          }}
        >
          <PlayIcon />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Carousel ─────────────────────────────────────────────────────────────────
export default function VideoCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const stripRef = useRef(null);
  const isSliding = useRef(false);
  const wheelAccum = useRef(0);
  const wheelTimer = useRef(null);

  // dragProgress: -1 = fully dragged to reveal next, +1 = fully dragged to reveal prev
  // 0 = settled at center. This is a MotionValue so it drives card widths/dims
  // without causing React re-renders on every frame.
  const dragProgress = useMotionValue(0);

  // trackX: the actual pixel translation of the card row as you drag
  const trackX = useMotionValue(0);

  const goNext = useCallback(() => {
    if (isSliding.current) return;
    isSliding.current = true;
    // Animate progress to -1 (next card fully expands), then commit
    animate(dragProgress, -1, {
      ...SNAP_SPRING,
      onComplete: () => {
        setActiveIdx((i) => mod(i + 1, VIDEOS.length));
        dragProgress.set(0);
        trackX.set(0);
        isSliding.current = false;
      },
    });
  }, [dragProgress, trackX]);

  const goPrev = useCallback(() => {
    if (isSliding.current) return;
    isSliding.current = true;
    animate(dragProgress, 1, {
      ...SNAP_SPRING,
      onComplete: () => {
        setActiveIdx((i) => mod(i - 1, VIDEOS.length));
        dragProgress.set(0);
        trackX.set(0);
        isSliding.current = false;
      },
    });
  }, [dragProgress, trackX]);

  const prevIdx = mod(activeIdx - 1, VIDEOS.length);
  const nextIdx = mod(activeIdx + 1, VIDEOS.length);

  // ── Pointer drag ──────────────────────────────────────────────────────────
  const onPointerDown = useCallback(
    (e) => {
      if (isSliding.current) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      const startX = e.clientX;

      const onMove = (e) => {
        const delta = e.clientX - startX;
        // Clamp to ±SLOT_WIDTH so it doesn't drag too far
        const clamped = Math.max(-SLOT_WIDTH, Math.min(SLOT_WIDTH, delta));
        trackX.set(clamped);
        // Convert pixel delta to -1..+1 progress
        dragProgress.set(-(clamped / SLOT_WIDTH));
      };

      const onUp = (e) => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);

        const delta = e.clientX - startX;
        if (delta < -DRAG_THRESHOLD) {
          goNext();
        } else if (delta > DRAG_THRESHOLD) {
          goPrev();
        } else {
          // Snap back to center
          animate(trackX, 0, SNAP_SPRING);
          animate(dragProgress, 0, SNAP_SPRING);
        }
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [dragProgress, trackX, goNext, goPrev],
  );

  // ── Trackpad wheel ────────────────────────────────────────────────────────
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (isSliding.current) return;

      wheelAccum.current += e.deltaX;

      // Live preview while swiping
      const clamped = Math.max(
        -SLOT_WIDTH,
        Math.min(SLOT_WIDTH, -wheelAccum.current),
      );
      trackX.set(clamped);
      dragProgress.set(-(clamped / SLOT_WIDTH));

      clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => {
        if (wheelAccum.current > DRAG_THRESHOLD) {
          goNext();
        } else if (wheelAccum.current < -DRAG_THRESHOLD) {
          goPrev();
        } else {
          animate(trackX, 0, SNAP_SPRING);
          animate(dragProgress, 0, SNAP_SPRING);
        }
        wheelAccum.current = 0;
      }, 120);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [dragProgress, trackX, goNext, goPrev]);

  return (
    <section
      style={{
        width: "100%",
        background: "white",
        paddingTop: 40,
        paddingBottom: 40,
      }}
    >
      {/* Strip */}
      <div
        ref={stripRef}
        style={{ width: "100%", overflow: "hidden", cursor: "grab" }}
        onPointerDown={onPointerDown}
      >
        {/* Track — translates live as you drag */}
        <motion.div
          style={{
            x: trackX,
            display: "flex",
            alignItems: "center",
            width: "max-content",
            margin: "0 auto",
            gap: GAP,
            userSelect: "none",
          }}
        >
          <Card
            video={VIDEOS[prevIdx]}
            slot={-1}
            dragProgress={dragProgress}
            onClick={() => {
              if (!isSliding.current) goPrev();
            }}
          />
          <Card
            video={VIDEOS[activeIdx]}
            slot={0}
            dragProgress={dragProgress}
            onClick={() => {
              /* modal step 7 */
            }}
          />
          <Card
            video={VIDEOS[nextIdx]}
            slot={1}
            dragProgress={dragProgress}
            onClick={() => {
              if (!isSliding.current) goNext();
            }}
          />
        </motion.div>
      </div>

      {/* Caption */}
      <div
        style={{
          position: "relative",
          padding: "24px 32px 0",
          maxWidth: 1100,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={activeIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            style={{
              color: "#4b5563",
              fontSize: 14,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {VIDEOS[activeIdx].description}
          </motion.p>
        </AnimatePresence>

        {/* Nav buttons */}
        <div
          style={{
            position: "absolute",
            right: 32,
            top: 24,
            display: "flex",
            gap: 8,
          }}
        >
          <button
            onClick={goPrev}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1px solid #d1d5db",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#374151",
            }}
          >
            <ChevronLeft />
          </button>
          <button
            onClick={goNext}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1px solid #d1d5db",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#374151",
            }}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
