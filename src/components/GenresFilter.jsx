const GenresFilter = ({ movieGenres, getMoviesByGenre }) => {
    return (
        <section id="filter">
            <div className="container">
                <div className="genres-filter">
                    {!movieGenres.length ? '' : movieGenres.map((genre) => (
                        <div className="genres-filter--category" key={genre.id} onClick={() => getMoviesByGenre(genre.id)}>
                            <p>{genre.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default GenresFilter;