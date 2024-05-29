import MovieCard from "./MovieCard";
import { useRef } from "react";

const MoviesList = ({ searchTerm, results, appState, items, children, movie }) => {
  const moviesYearArr = [];
  let moviesYear;
  movie.map((elem) => {
    moviesYearArr.push(elem.release_date);
    moviesYear = moviesYearArr[0].split('-')[0];
  });
  return (
    <>
      <section className={`movielist ${appState}`}>
        <div className="container">
          {/* {moviesYearArr.map((year) => <p>{year}</p>)} */}
          {results &&
            !results.length === 0
            ? <div className="results-heading"><p>Results for: <span>{searchTerm}</span></p></div>
            : <div className="year-heading">{moviesYear}</div>
          }
          {/* <div className="year-heading">{startYear}</div> */}
          <div className="movies-list" >
            {results && !results.length == 0 && results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
            {children}
          </div>
        </div>
      </section>
    </>
  );
}

export default MoviesList;
