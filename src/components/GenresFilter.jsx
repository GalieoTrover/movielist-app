import { useEffect, useState } from 'react';
import resetIcon from '../assets/images/resetIcon.svg';

const GenresFilter = ({ appState, setAppState, setSearchTerm, setMoviesByGenre, setGenre }) => {
    const [movieGenres, setMovieGenres] = useState([]);

    const fetchMovieGenres = async () => {
        const fetchGenres = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d")
        const jsonGenres = await fetchGenres.json();
        const dataGenres = await jsonGenres;

        const movieGenres = dataGenres.genres.slice(0, 10);
        setMovieGenres(movieGenres);
    }

    async function getMoviesByGenre(genreId, genreName) {
        const fetchMovieBasedonGenreId = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&with_genres=${genreId}`)
        const jsonData = await fetchMovieBasedonGenreId.json();
        const genreData = await jsonData;

        setMoviesByGenre(genreData.results);
        setAppState("moviesByGenre");
        setGenre(genreName);
        setSearchTerm("");
    }

    const resetState = () => {
        setAppState("movieData");
        setSearchTerm("");
    }

    useEffect(() => {
        fetchMovieGenres();
    }, [])

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