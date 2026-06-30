import { lazy, Suspense } from "react";
// Above the fold — load immediately, no delay
import Nav from "./components/Nav.jsx";
import Search from "./components/Search.jsx";
import HeroCarousel from "./components/HeroCarousel.jsx";

// Below the fold — load on demand
const Rating = lazy(() => import("./components/RatingComp.jsx"));
const ThreePages = lazy(() => import("./components/ThreePages.jsx"));
const ShowcaseHeader = lazy(() => import("./components/ShowcaseHeader.jsx"));
const VideoShowcase = lazy(() => import("./components/VideoShowcase.jsx"));
const TemplateGallery = lazy(() => import("./components/TemplateGallery.jsx"));
const Overlap = lazy(() => import("./components/Overlap.jsx"));
const FiveBoxes = lazy(() => import("./components/FiveBoxes.jsx"));
const VidGroupHeader = lazy(() => import("./components/VidGroupHeader.jsx"));
const VideoCarousel = lazy(() => import("./components/VideoCarousel.jsx"));
const Marquee = lazy(() => import("./components/Marquee.jsx"));
const Footer = lazy(() => import("./components/Footer.jsx"));

function App() {
  return (
    <>
      <Nav />
      <Search />
      <HeroCarousel />

      <Suspense fallback={null}>
        <Rating />
      </Suspense>
      <Suspense fallback={null}>
        <ThreePages />
      </Suspense>
      <Suspense fallback={null}>
        <ShowcaseHeader />
      </Suspense>
      <Suspense fallback={null}>
        <VideoShowcase />
      </Suspense>
      <Suspense fallback={null}>
        <TemplateGallery />
      </Suspense>
      <Suspense fallback={null}>
        <Overlap />
      </Suspense>
      <Suspense fallback={null}>
        <FiveBoxes />
      </Suspense>
      <Suspense fallback={null}>
        <VidGroupHeader />
      </Suspense>
      <Suspense fallback={null}>
        <VideoCarousel />
      </Suspense>
      <Suspense fallback={null}>
        <Marquee />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
