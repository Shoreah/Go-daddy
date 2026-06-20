import { useState, useEffect, useRef } from "react";

export default function ShowcaseHeader() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node); // only animate once
        }
      },
      { threshold: 0.2 }, // fires when 20% of the element is visible
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <h1
        ref={ref}
        className={`text-center text-5xl font-semibold my-5 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        Create a website that works for your business
      </h1>
    </div>
  );
}
