import Rating from "./TrustRating.jsx";

export default function RatingComp() {
  return (
    <div className="mt-15 mb-30 flex items-center justify-center gap-3 text-sm">
      <p>
        Our customers say{" "}
        <span className="text-lg font-semibold">Excellent</span>
      </p>

      <div className="h-4 border-l border-gray-300" />

      <Rating />

      <p>
        4.4 out of 5 stars based on <span className="font-bold">136,815</span>{" "}
        reviews
      </p>

      <div className="h-4 border-l border-gray-300" />

      <p>TrustPilot</p>
    </div>
  );
}
