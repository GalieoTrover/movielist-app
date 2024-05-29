import MovieCard from "./MovieCard";

const MoviesList = ({ searchTerm, results, appState, genre, children, movie }) => {

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
      return (<div className="results-heading"><p>Search results for: <span>{searchTerm}</span></p></div>)
    } else if (stateOfApp == "moviesByGenre") {
      return (<div className="genres-heading"><p>Showing results related to <span>{genre}</span></p></div>)
    }
  }

  return (
    <>
      <section className={`movielist ${appState}`}>
        <div className="container">
          {setHeading(appState)}
          <div className="movies-list" >
            {results && results.map((movie) => (
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
