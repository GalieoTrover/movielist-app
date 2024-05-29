import { useState } from "react";
import MovieModal from "./MovieModal";

const MovieCard = ({ movie }) => {
  // console.log(movie);
  // const desc = movie.overview.substring(0, 100) + "...";
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOverlay, setModalOverlay] = useState(false);
  const [getMovieInfo, setGetMovieInfo] = useState([]);
  const [getMovieCredits, setGetMovieCredits] = useState([]);

  const singleMovieInfoUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=2dca580c2a14b55200e784d157207b4d`;
  const singleMovieCreditsUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=2dca580c2a14b55200e784d157207b4d`;

  const getSingleMovieInfo = async () => {
    const fetchInfo = await fetch(singleMovieInfoUrl);
    const jsonInfo = await fetchInfo.json();
    const info = await jsonInfo;

    const fetchCredits = await fetch(singleMovieCreditsUrl);
    const jsonCredits = await fetchCredits.json();
    const credits = await jsonCredits;

    setModalVisible((prevState) => !prevState);
    setModalOverlay((prevState) => !prevState);
    setGetMovieInfo(info);
    setGetMovieCredits(credits);
  };

  const overlay = document.querySelector('.modal-overlay');
  modalOverlay ? overlay.style.display = 'block' : overlay.style.display = 'none';

  const movieYear = movie.release_date.split('-')[0];

  return (
    <>
      <div className={!modalOverlay ? "movies-list--card" : "movies-list--card selected-card"} onClick={getSingleMovieInfo}>
        <div className="movies-list--card-figure">
          <img
            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
            alt={movie.title}
            className="movies-list--card-figure-img"
          />
        </div>
        <div className="movies-list--card-info">
          <h3>{movie.title}</h3>
          <p>{movieYear}</p>
          {/* <p>{data.release_date.split('-')[0]}</p> */}
          <div className="more-info">
            {/* <p>{desc}</p> */}
          </div>
          {/* <div className="movie-info movie-genres-wrap">
          {getMovieInfo &&
            getMovieInfo.genres.map((genre) => (
              <span key={genre.id} className="movie-genres">
                {genre.name}
              </span>
            ))}
        </div> */}
        </div>

        <MovieModal
          modalVisible={modalVisible}
          modalOverlay={modalOverlay}
          movie={movie}
          getMovieInfo={getMovieInfo}
          getMovieCredits={getMovieCredits}
        />
      </div>
    </>
  );
};

export default MovieCard;
