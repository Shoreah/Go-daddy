import "./App.css";
import Nav from "./components/Nav.jsx";
import Search from "./components/Search.jsx";
import HeroCarousel from "./components/HeroCarousel.jsx";
import Rating from "./components/RatingComp.jsx";
import ThreePages from "./components/ThreePages.jsx";

function App() {
  return (
    <>
      <Nav />
      <Search />
      <HeroCarousel />
      <Rating />
      <ThreePages />
    </>
  );
}

export default App;
