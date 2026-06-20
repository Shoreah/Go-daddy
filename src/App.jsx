import "./App.css";
import Nav from "./components/Nav.jsx";
import Search from "./components/Search.jsx";
import HeroCarousel from "./components/HeroCarousel.jsx";
import Rating from "./components/RatingComp.jsx";
import ThreePages from "./components/ThreePages.jsx";
import ShowcaseHeader from "./components/ShowcaseHeader.jsx";
import VideoShowcase from "./components/VideoShowcase.jsx";
import TemplateGallery from "./components/TemplateGallery.jsx";

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
    </>
  );
}

export default App;
