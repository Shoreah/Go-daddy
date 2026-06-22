import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import Gal1 from "../assets/Gal1.jpg";
import Gal2 from "../assets/Gal2.jpg";
import Gal3 from "../assets/Gal3.jpg";
import Gal4 from "../assets/Gal4.jpg";
import Gal5 from "../assets/Gal5.jpg";
import Gal6 from "../assets/Gal6.jpg";

const TEMPLATES = [
  { id: "beachwave", title: "Beach Wave", width: 380, image: Gal1 },
  { id: "parelence", title: "Parelence", width: 300, image: Gal2 },
  { id: "acutouch", title: "AcuTouch", width: 420, image: Gal3 },
  { id: "ironforge", title: "Ironforge", width: 340, image: Gal4 },
  { id: "lumeport", title: "Lumeport", width: 360, image: Gal5 },
  { id: "norden", title: "Norden & Co.", width: 320, image: Gal6 },
];

const CARD_HEIGHT = 420;
const GAP = 8;
const SPEED = 34; // px per second

export default function TemplateGallery() {
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const hoverPauseRef = useRef(false);
  const lastTimeRef = useRef(null);
  const rafRef = useRef(null);

  const [isPaused, setIsPaused] = useState(false);
  const [hoveredKey, setHoveredKey] = useState(null);

  const periodWidth =
    TEMPLATES.reduce((sum, t) => sum + t.width, 0) + GAP * TEMPLATES.length;
  const loopItems = [...TEMPLATES, ...TEMPLATES];

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      pausedRef.current = true;
      setIsPaused(true);
    }

    const tick = (time) => {
      if (lastTimeRef.current == null) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!pausedRef.current && !hoverPauseRef.current) {
        offsetRef.current += SPEED * dt;
        if (offsetRef.current >= periodWidth) {
          offsetRef.current -= periodWidth;
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [periodWidth]);

  const togglePause = () => {
    pausedRef.current = !pausedRef.current;
    setIsPaused(pausedRef.current);
    lastTimeRef.current = null;
  };

  return (
    <div
      className="w-full mb-20"
      style={{
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        backgroundColor: "#eef0f3",
      }}
    >
      {/* header — now part of the same gray section as everything else */}
      <div className="pt-16 pb-12 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          Templates designed to sell
        </h2>
        <p className="mt-4 text-gray-500 text-base md:text-lg">
          Choose from 100s of designs for every idea and industry.
        </p>
      </div>

      {/* image row + footer row, still inside the same gray wrapper */}
      <div className="w-full">
        {/* image track */}
        <div className="w-full overflow-hidden pt-10">
          <div
            ref={trackRef}
            className="flex"
            style={{ gap: GAP, willChange: "transform" }}
          >
            {loopItems.map((item, i) => {
              const cardKey = `${item.id}-${i}`;
              const isHovered = hoveredKey === cardKey;
              return (
                <div
                  key={cardKey}
                  className="relative flex-shrink-0 overflow-hidden"
                  style={{ width: item.width, height: CARD_HEIGHT }}
                  onMouseEnter={() => {
                    setHoveredKey(cardKey);
                    hoverPauseRef.current = true;
                  }}
                  onMouseLeave={() =>
                    setHoveredKey((c) => {
                      if (c === cardKey) {
                        hoverPauseRef.current = false;
                        return null;
                      }
                      return c;
                    })
                  }
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    className="w-full h-full object-cover select-none"
                  />

                  {/* hover overlay */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-200"
                    style={{
                      backgroundColor: "rgba(10,12,18,0.55)",
                      opacity: isHovered ? 1 : 0,
                      pointerEvents: isHovered ? "auto" : "none",
                    }}
                  >
                    <button
                      type="button"
                      onFocus={() => {
                        setHoveredKey(cardKey);
                        hoverPauseRef.current = true;
                      }}
                      onBlur={() =>
                        setHoveredKey((c) => {
                          if (c === cardKey) {
                            hoverPauseRef.current = false;
                            return null;
                          }
                          return c;
                        })
                      }
                      className="bg-white text-gray-900 text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      Start Editing
                    </button>
                    <button
                      type="button"
                      className="text-white text-sm font-medium underline-offset-4 hover:underline"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* footer row: centered CTA + pause/play, still inside the gray section */}
        <div className="relative flex items-center justify-center px-6 md:px-10 py-8">
          <button
            type="button"
            className="bg-gray-900 text-white text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors"
          >
            Browse All Templates
          </button>

          <button
            type="button"
            onClick={togglePause}
            aria-label={isPaused ? "Resume scrolling" : "Pause scrolling"}
            aria-pressed={isPaused}
            className="absolute right-6 md:right-10 flex items-center justify-center w-11 h-11 rounded-full text-white transition-colors"
            style={{ backgroundColor: "#9298a3" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#7d8390")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#9298a3")
            }
          >
            {isPaused ? <Play size={18} /> : <Pause size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
