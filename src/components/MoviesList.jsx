import MovieCard from "./MovieCard";

const MoviesList = ({ searchTerm, results, appState, genre, children, movie, moviesListRef }) => {

  const moviesYearArr = [];
  let moviesYear;
  if (movie) {
    movie.map((elem) => {
      moviesYearArr.push(elem.release_date);
      moviesYear = moviesYearArr[0].split('-')[0];
    });
  }

  function setHeading(stateOfApp) {
    if (stateOfApp == "movieData") {
      return (<div className="year-heading">{moviesYear}</div>)
    } else if (stateOfApp == "searchResults") {
      if (searchTerm && results.length === 0) {
        return <p className="results-heading">No movies found, please provide a different search query</p>
      } else if (searchTerm && results.length !== 0) {
        return <p className="results-heading">Search results for: <span>{searchTerm}</span></p>
      } else {
        return <p className="results-heading">No movies found, please provide a different search query</p>
      }
    } else if (stateOfApp == "moviesByGenre") {
      return (<div className="genres-heading"><p>Showing results related to <span>{genre}</span></p></div>)
    }
  }

  return (
    <>
      <section className={`movielist ${appState}`} ref={moviesListRef} >
        <div className="container">
          {setHeading(appState)}
          <div className="movies-list" >
            {results && results.length > 0 && results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
            {children}
          </div>
        </div>
      </section >
    </>
  );
}

export default MoviesList;
