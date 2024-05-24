import movies from '../movies.json'
import MovieCard from './MovieCard';

const MoviesList = () => {
    // console.log(movies);
    // console.log(jobs);

    return (
        <section id="moviesList">
            <div className="container">
                <div className="year-heading">2012</div>
                <div className="movies-list">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </section>
    )
}

// https://image.tmdb.org/t/p/w300_and_h450_bestv2
export default MoviesList;