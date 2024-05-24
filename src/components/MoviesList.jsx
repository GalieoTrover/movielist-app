import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";

const MoviesList = () => {
  const [movieData, setMovieData] = useState([]);

  const url =
    "https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2012&page=1&vote_count.gte=100";

  const getMoviesData = async () => {
    const fetchData = await fetch(url);
    const jsonData = await fetchData.json();
    const data = await jsonData;

    setMovieData(data.results);
  };

  useEffect(() => {
    getMoviesData();
  }, []);

  return (
    <section id="moviesList">
      <div className="container">
        <div className="year-heading">2012</div>
        <div className="movies-list">
          {movieData.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoviesList;
