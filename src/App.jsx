import "./App.css";
import Nav from "./components/Nav.jsx";
import Search from "./components/Search.jsx";
import HeroCarousel from "./components/HeroCarousel.jsx";
import Rating from "./components/RatingComp.jsx";
import ThreePages from "./components/ThreePages.jsx";
import ShowcaseHeader from "./components/ShowcaseHeader.jsx";
import VideoShowcase from "./components/VideoShowcase.jsx";
import TemplateGallery from "./components/TemplateGallery.jsx";
import Overlap from "./components/Overlap.jsx";
import FiveBoxes from "./components/FiveBoxes.jsx";
import VidGroupHeader from "./components/VidGroupHeader.jsx";
import VideoCarousel from "./components/VideoCarousel.jsx";

function App() {
  return (
    <>
      <Nav />
      <Search />
      <HeroCarousel />
      <Rating />
      <ThreePages />
      <ShowcaseHeader />
      <VideoShowcase />
      <TemplateGallery />
      <Overlap />
      <FiveBoxes />
      <VidGroupHeader />
      <VideoCarousel />
    </>
  );
}

export default App;
