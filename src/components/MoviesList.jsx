import MovieCard from "./MovieCard";

const MoviesList = ({ startYear, searchTerm, results, appState, setStartYear, movieData, items, children }) => {
  return (
    <>
      <section id="moviesList" className={`movielist-${startYear} ${appState}`}>
        <div className="container">
          {/* {
            !results.length === 0
              ? <div className="results-heading"><p>Results for: <span>{searchTerm}</span></p></div>
              : <div className="year-heading">{startYear}</div>
          } */}
          <div className="year-heading">{startYear}</div>
          {/* <p>{moviesYear}</p> */}
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
