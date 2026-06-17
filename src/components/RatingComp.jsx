import Rating from "./TrustRating.jsx";

export default function RatingComp() {
  return (
    <div className="my-15 flex gap-3 justify-center text-sm">
      <p>
        Our customers say{" "}
        <span className="font-semibold text-lg">Excellent</span>
      </p>
      <p className="border-x px-3 flex gap-3 items-center">
        <Rating />
        <div>
          4.4 out of 5 stars based on <span className="font-bold">136,815</span>{" "}
          reviews
        </div>
      </p>
      <p>TrustPilot</p>
    </div>
  );
}
