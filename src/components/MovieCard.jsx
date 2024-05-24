const MovieCard = ({ movie }) => {
    
    const desc = movie.overview.substring(0, 100) + ' ...';

    return (
        <>
            {/* <div className="movies-list--year">
            {movie.release_date}    
        </div>  */}
            <div className="movies-list--card">
                <div className="movies-list--card-figure">
                    <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`} alt={movie.title} />
                </div>
                <div className="movies-list--card-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date}</p>
                    <div className="more-info">
                        <p>{desc}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieCard;