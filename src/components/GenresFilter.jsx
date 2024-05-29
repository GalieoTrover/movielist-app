import resetIcon from '../assets/images/resetIcon.svg';

const GenresFilter = ({ movieGenres, getMoviesByGenre, selectedGenre, setAppState }) => {

    const resetState = () => {
        setAppState("movieData");
    }

    return (
        <section id="filter">
            <div className="container">
                <div className="genres-filter">
                    <div className="genres-filter--reset">
                        <img src={resetIcon} alt="resetIcon" className="genres-filter--reseticon" onClick={resetState} />
                    </div>
                    {!movieGenres.length ? '' : movieGenres.map((genre) => (
                        <div className={selectedGenre ? "genres-filter--category selected-genre" : "genres-filter--category "} key={genre.id} onClick={() => getMoviesByGenre(genre.id)}>
                            <p>{genre.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default GenresFilter;