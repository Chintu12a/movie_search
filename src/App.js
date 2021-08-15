import { useEffect, useState } from "react";
import Movie from "./components/Movie";
import "./styles.css";

const API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=97a8796f238e7f46de65087eb9fade5a";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=97a8796f238e7f46de65087eb9fade5a&query=`;

export default function App() {
  const [movies, setMovies] = useState([]);
  const [serachValue, setSerachValue] = useState("");

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    fetch(SEARCH_API + serachValue)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
    // console.log(e);
  };

  const handleOnChange = (e) => {
    setSerachValue(e.target.value);
  };

  const j = () => {
    console.log("cjjd");
  };

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="text"
            placeholder="Search..."
            value={serachValue}
            onChange={handleOnChange}
          />
          <button onClick={j()}>clear</button>
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => {
            return <Movie key={movie.id} {...movie} />;
          })}
      </div>
    </>
  );
}
