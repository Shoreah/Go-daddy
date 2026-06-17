import "./App.css";
import Nav from "./components/Nav.jsx";
import Search from "./components/Search.jsx";
import HeroCarousel from "./components/HeroCarousel.jsx";
import Rating from "./components/RatingComp.jsx";

function App() {
  return (
    <>
      <Nav />
      <Search />
      <HeroCarousel />
      <Rating />
    </>
  );
}

export default App;
