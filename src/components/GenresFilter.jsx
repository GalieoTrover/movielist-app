import resetIcon from '../assets/images/resetIcon.svg';

const GenresFilter = ({ movieGenres, getMoviesByGenre, appState, setAppState, setSearchTerm }) => {

    const resetState = () => {
        setAppState("movieData");
        setSearchTerm("");
    }

    return (
        <section id="filter">
            <div className={`container ${appState}`}>
                <div className="genres-filter">
                    {appState === "searchResults" | appState === "moviesByGenre" ? <div className="genres-filter--reset">
                        <img src={resetIcon} alt="resetIcon" className="genres-filter--reseticon" onClick={resetState} />
                    </div> : ""}
                    {!movieGenres.length ? '' : movieGenres.map((genre) => (
                        <div className="genres-filter--category" key={genre.id} onClick={() => getMoviesByGenre(genre.id, genre.name)}>
                            <p>{genre.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default GenresFilter;