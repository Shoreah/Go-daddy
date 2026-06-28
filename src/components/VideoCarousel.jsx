import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
  X,
} from "lucide-react";

import ArcaneImg from "../assets/arcane.jpeg";
import HellImg from "../assets/hell.jpeg";
import Demon from "../assets/Demon.mp4";
import DemonImg from "../assets/Fourvid1.png";
import Solo from "../assets/SoloLevel.mp4";
import SoloImg from "../assets/Fourvid2.jpg";

const CARD_LAYOUT = {
  center: {
    x: "0%",
    scale: 1,
    opacity: 1,
    zIndex: 30,
  },
  left: {
    x: "-38%",
    scale: 0.78,
    opacity: 0.85,
    zIndex: 20,
  },
  right: {
    x: "38%",
    scale: 0.78,
    opacity: 0.85,
    zIndex: 20,
  },
  hiddenLeft: {
    x: "-70%",
    scale: 0.65,
    opacity: 0,
    zIndex: 10,
  },
  hiddenRight: {
    x: "70%",
    scale: 0.65,
    opacity: 0,
    zIndex: 10,
  },
};

function VideoCard({
  video,
  layout,
  opening,
  active,
  muted,
  videoRef,
  onClick,
}) {
  const localVideoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      className="absolute left-1/2 top-0 w-[62%] -translate-x-1/2 cursor-pointer"
      animate={{
        ...layout,
        scale: opening ? 1.06 : layout.scale,
      }}
      whileHover={{
        y: -10,
      }}
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 28,
      }}
      style={{ zIndex: layout.zIndex }}
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovered(true);

        if (localVideoRef.current) {
          localVideoRef.current.currentTime = 0;
          localVideoRef.current.play().catch(() => {});
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);

        if (localVideoRef.current) {
          localVideoRef.current.pause();
          localVideoRef.current.currentTime = 0;
        }
      }}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden rounded-[28px] bg-black shadow-2xl"
      >
        <div className="relative aspect-video">
          <motion.img
            src={video.poster}
            alt={video.title}
            animate={{
              scale: isHovered ? 1.02 : 1,
              opacity: active || isHovered ? 1 : 0.78,
            }}
            transition={{
              duration: 0.5,
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <video
            ref={(el) => {
              localVideoRef.current = el;

              if (typeof videoRef === "function") {
                videoRef(el);
              }
            }}
            src={video.src}
            muted={muted}
            loop
            playsInline
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          <motion.div
            animate={{
              opacity: isHovered ? 0.9 : 0.65,
            }}
            transition={{
              duration: 0.3,
            }}
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
          />

          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h2 className="text-4xl font-bold">{video.title}</h2>

            <p className="mt-3 max-w-md text-lg text-white/80">
              {video.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const videos = [
  {
    id: 1,
    title: "Sell online with confidence",
    description: "Create a professional online store in minutes.",
    src: "/videos/video1.mp4",
    poster: ArcaneImg,
  },
  {
    id: 2,
    title: "Build your website",
    description: "Beautiful websites that work on every device.",
    src: Solo,
    poster: SoloImg,
  },
  {
    id: 3,
    title: "Grow your audience",
    description: "Reach more customers with built-in marketing tools.",
    src: Demon,
    poster: DemonImg,
  },
  {
    id: 4,
    title: "Secure your brand",
    description: "Everything your business needs in one place.",
    src: "/videos/video4.mp4",
    poster: HellImg,
  },
  {
    id: 5,
    title: "Manage everything",
    description: "Domains, hosting and email together.",
    src: "/videos/video5.mp4",
    poster: "/images/poster5.jpg",
  },
];

export default function VideoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalPlaying, setModalPlaying] = useState(true);
  const [openingVideoId, setOpeningVideoId] = useState(null);

  const videoRefs = useRef([]);
  const modalVideoRef = useRef(null);
  const wheelLock = useRef(false);
  const carouselRef = useRef(null);
  const dragStartX = useRef(null);

  const previous = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, []);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedVideo(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const element = carouselRef.current;

    if (!element) return;

    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;

      e.preventDefault();

      if (wheelLock.current) return;
      if (Math.abs(e.deltaX) < 40) return;

      wheelLock.current = true;

      if (e.deltaX > 0) {
        next();
      } else {
        previous();
      }

      setTimeout(() => {
        wheelLock.current = false;
      }, 350);
    };

    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, [next, previous]);

  const getLayout = (index) => {
    const total = videos.length;

    let diff = index - activeIndex;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    switch (diff) {
      case 0:
        return CARD_LAYOUT.center;

      case -1:
        return CARD_LAYOUT.left;

      case 1:
        return CARD_LAYOUT.right;

      case -2:
        return CARD_LAYOUT.hiddenLeft;

      case 2:
        return CARD_LAYOUT.hiddenRight;

      default:
        return {
          opacity: 0,
          scale: 0.6,
          x: "0%",
          zIndex: 0,
        };
    }
  };
  return (
    <>
      <section
        className="relative mx-auto flex h-[760px] w-full max-w-[1500px] items-center justify-center overflow-hidden px-8"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.div
          ref={carouselRef}
          className="relative h-[600px] w-full"
          onPointerDown={(e) => {
            dragStartX.current = e.clientX;
          }}
          onPointerUp={(e) => {
            if (dragStartX.current === null) return;

            const distance = e.clientX - dragStartX.current;

            dragStartX.current = null;

            if (Math.abs(distance) < 70) return;

            if (distance < 0) {
              next();
            } else {
              previous();
            }
          }}
        >
          {videos.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              layout={getLayout(index)}
              opening={openingVideoId === video.id}
              active={index === activeIndex}
              muted={muted}
              videoRef={(el) => (videoRefs.current[index] = el)}
              onClick={() => {
                setActiveIndex(index);
                setOpeningVideoId(video.id);

                setTimeout(() => {
                  setSelectedVideo(video);
                  setOpeningVideoId(null);
                }, 180);
              }}
            />
          ))}

          {/* Previous */}
          <button
            onClick={previous}
            className="absolute left-6 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next */}
          <button
            onClick={next}
            className="absolute right-6 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105"
          >
            <ChevronRight size={22} />
          </button>
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="relative w-[78%] max-w-4xl overflow-hidden rounded-[36px] bg-black"
              initial={{
                opacity: 0,
                scale: 0.84,
                y: 50,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 20,
                filter: "blur(4px)",
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 22,
                mass: 0.9,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute right-5 top-5 rounded-full bg-black/50 p-3 text-white backdrop-blur transition hover:scale-110"
              >
                <X size={20} />
              </button>

              <motion.video
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                ref={modalVideoRef}
                src={selectedVideo.src}
                autoPlay
                muted={muted}
                controls={false}
                className="aspect-video w-full"
              />

              <div className="flex items-center justify-between p-6 text-white">
                <div>
                  <h2 className="text-3xl font-bold">{selectedVideo.title}</h2>

                  <p className="mt-2 text-white/70">
                    {selectedVideo.description}
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      if (!modalVideoRef.current) return;

                      if (modalPlaying) {
                        modalVideoRef.current.pause();
                      } else {
                        modalVideoRef.current.play();
                      }

                      setModalPlaying(!modalPlaying);
                    }}
                    className="rounded-full bg-white/10 p-3"
                  >
                    {modalPlaying ? <Pause size={22} /> : <Play size={22} />}
                  </button>

                  <button
                    onClick={() => setMuted((m) => !m)}
                    className="rounded-full bg-white/10 p-3"
                  >
                    {muted ? <VolumeX /> : <Volume2 />}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
