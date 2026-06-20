import React, { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Play, Pause } from "lucide-react";
import Yuta from "../assets/Yuta.mp4";
import Yuji from "../assets/120.mp4";
import Ren from "../assets/rengoku.mp4";

const PANELS = [
  {
    title: "AI tools built for your business",
    description:
      "Our suite of AI tools can help save you time and money, enabling you to customize and scale your site with ease. Create content, product descriptions, FAQs, and more to bring your brand to life.",
    src: Yuta,
  },
  {
    title: "Point, click, and launch",
    description:
      "With our robust website builder, no coding or design experience is required. Add or delete sections with drag and drop functionality to create and publish your site with ease and speed.",
    src: Yuji,
  },
  {
    title: "Templates that fit your vision",
    description:
      "Our professionally designed layouts offer options for any industry, and, they're customizable, empowering you to build a brand that is uniquely yours. Change your mind? No problem, change the look and feel with a single click.",
    src: Ren,
  },
];

export default function VideoShowcase() {
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef([]);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === active) {
        video.currentTime = 0;
        if (isPlaying) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      } else {
        video.pause();
      }
    });
  }, [active]);

  useEffect(() => {
    const current = videoRefs.current[active];
    if (!current) return;
    if (isPlaying) {
      current.play().catch(() => {});
    } else {
      current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="w-full max-w-[1220px] mx-auto p-6 font-sans">
      {/* Video stage */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-xl h-[430px]">
        {PANELS.map((panel, i) => (
          <video
            key={panel.src}
            ref={(el) => (videoRefs.current[i] = el)}
            src={panel.src}
            muted
            loop
            playsInline
            autoPlay={i === active}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{
              opacity: i === active ? 1 : 0,
              zIndex: i === active ? 1 : 0,
            }}
          />
        ))}

        {/* Pause / play control */}
        <button
          onClick={() => setIsPlaying((p) => !p)}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="absolute bottom-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/45 backdrop-blur-sm text-white hover:bg-black/65 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {isPlaying ? (
            <Pause size={16} fill="currentColor" strokeWidth={0} />
          ) : (
            <Play
              size={16}
              fill="currentColor"
              strokeWidth={0}
              className="ml-0.5"
            />
          )}
        </button>
      </div>

      {/* Controller cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-5">
        {PANELS.map((panel, i) => (
          <div
            key={panel.title}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            className={`rounded-xl p-5 cursor-pointer transition-colors duration-300 ${
              active === i ? "bg-gray-200" : "bg-transparent hover:bg-gray-50"
            }`}
          >
            <h3 className="text-3xl font-semibold text-gray-900 mb-2">
              {panel.title}
            </h3>
            <p className="text-md ">{panel.description}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center my-10">
        <button className="group bg-black rounded-md py-4 px-15 text-white font-semibold mb-3 cursor-pointer flex items-center gap-0 hover:gap-2 hover:scale-102 transition-all duration-300">
          Start for Free
          <ArrowRight
            size={18}
            className="w-0 opacity-0 -translate-x-2 group-hover:w-[18px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          />
        </button>
      </div>
    </div>
  );
}
