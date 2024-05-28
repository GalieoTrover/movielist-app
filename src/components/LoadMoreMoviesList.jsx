import MovieCard from "./MovieCard";

const LoadMoreMoviesList = ({ items }) => {
    return (
        <section id="moviesList" className={`movielist-}`}>
            <div className="container">
                {/* {
            !results.length === 0
              ? <div className="results-heading"><p>Results for: <span>{searchTerm}</span></p></div>
              : <div className="year-heading">{startYear}</div>
          } */}
                <div className="movies-list" >
                    {!items.length == 0 && items.map((movie, index) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default LoadMoreMoviesList;