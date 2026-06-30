const items = [
  "Why Choose GoDaddy?",
  "WEBSITES MADE EASY",
  "SOCIAL MADE SIMPLE",
  "Why Choose GoDaddy?",
  "TRUSTED WORLDWIDE",
  "GROW YOUR BUSINESS",
];

export default function Marquee() {
  // Duplicate the list so the loop is seamless
  const loopItems = [...items, ...items];

  return (
    <div className="w-full bg-cyan-200 overflow-hidden">
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          width: max-content;
          animation: marquee-scroll 20s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-track flex items-center gap-3 whitespace-nowrap py-10">
        {loopItems.map((text, i) => {
          const isBold = text === "Why Choose GoDaddy?";
          return (
            <span key={i} className="flex items-center gap-3">
              <span
                className={
                  isBold
                    ? "font-semibold text-black text-2xl"
                    : "font-normal text-black text-md tracking-wide"
                }
              >
                {text}
              </span>
              <span className="text-black text-2xl">•</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
