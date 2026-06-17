import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import Domain from "../assets/Domain.mp4";
import website from "../assets/website.png";

const slides = [
  {
    id: 0,
    label: "Domains",
    type: "video",
    media: Domain,
    subtitle: "Domains",
    title: "Find the perfect domain for your business",
    btnText: "Claim your .com",
    showLearnMore: false,
  },

  {
    id: 1,
    label: "Website Builder",
    type: "image",
    media: website,
    subtitle: "Website Builder",
    title: "Your free website is just the beginning",
    btnText: "Start for Free",
    showLearnMore: true,
  },
];

const DURATION = 8000;

export default function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const animationRef = useRef();
  const startTimeRef = useRef();
  const videoRef = useRef(null);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
    startTimeRef.current = performance.now();
  };

  const selectSlide = (index) => {
    setActiveSlide(index);
    setProgress(0);
    startTimeRef.current = performance.now();
  };

  useEffect(() => {
    startTimeRef.current = performance.now();

    const animate = (time) => {
      if (!paused) {
        const elapsed = time - startTimeRef.current;
        const percentage = (elapsed / DURATION) * 100;

        if (percentage >= 100) {
          nextSlide();
        } else {
          setProgress(percentage);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [activeSlide, paused]);

  useEffect(() => {
    if (!videoRef.current) return;

    if (paused) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }, [paused]);

  return (
    <section className="relative mx-3 my-5 h-[500px] overflow-hidden rounded-2xl">
      {/* MEDIA */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              activeSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.type === "video" ? (
              <video
                ref={activeSlide === index ? videoRef : null}
                src={slide.media}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src={slide.media}
                alt=""
                className="h-full w-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <div
        key={activeSlide}
        className=" relative z-10 flex h-full flex-col items-center justify-center
                    px-6 text-center text-white animate-[fadeIn_.5s_ease]"
      >
        <p className="mb-4 text-lg font-medium">
          {slides[activeSlide].subtitle}
        </p>

        <h1 className="max-w-3xl text-5xl font-bold leading-tight lg:text-5xl">
          {slides[activeSlide].title}
        </h1>

        <div className="mt-6 flex items-center gap-4">
          <button className="rounded-md bg-white px-16 py-4 font-semibold text-black">
            {slides[activeSlide].btnText}
          </button>

          {slides[activeSlide].showLearnMore && (
            <button className="font-semibold">Learn More →</button>
          )}
        </div>

        <p className="mt-5 text-sm">No credit card required.</p>
      </div>

      {/* CONTROLS */}
      <div className="absolute bottom-8 left-8 z-20 flex items-center gap-3">
        {slides.map((slide, index) => {
          const isActive = activeSlide === index;

          const isCompleted =
            (activeSlide === 1 && index === 0) ||
            (activeSlide === 0 && index === 1 && progress > 95);

          return (
            <button
              key={slide.id}
              onClick={() => selectSlide(index)}
              className="
                relative overflow-hidden rounded-full
                bg-white px-5 py-1
                text-sm font-semibold
              "
            >
              {/* Loader */}
              <div
                className="absolute inset-0 bg-neutral-300"
                style={{
                  width: isActive
                    ? `${progress}%`
                    : isCompleted
                      ? "100%"
                      : "0%",
                }}
              />

              <span className="relative z-10 text-black">{slide.label}</span>
            </button>
          );
        })}

        {/* Pause */}
        <button
          onClick={() => setPaused((prev) => !prev)}
          className="
            flex h-8 w-8 items-center justify-center
            rounded-full bg-white/80
            backdrop-blur-md
            transition hover:bg-white
          "
        >
          {paused ? (
            <Play size={13} strokeWidth={1.5} />
          ) : (
            <Pause size={13} strokeWidth={1.5} />
          )}
        </button>
      </div>
    </section>
  );
}
