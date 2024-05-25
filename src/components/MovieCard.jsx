import { useState } from "react";
import MovieModal from "./MovieModal";

const MovieCard = ({ movie }) => {
  const desc = movie.overview.substring(0, 100) + "...";

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

  modalOverlay ? document.querySelector('.modal-overlay').style.display = 'block' : document.querySelector('.modal-overlay').style.display = 'none';

  return (
    <div className="movies-list--card" onClick={getSingleMovieInfo}>
      <div className="movies-list--card-figure">
        <img
          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
          alt={movie.title}
          className="movies-list--card-figure-img"
        />
      </div>
      <div className="movies-list--card-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
        <div className="more-info">
          <p>{desc}</p>
        </div>
      </div>

      <MovieModal
        modalVisible={modalVisible}
        modalOverlay={modalOverlay}
        movie={movie}
        getMovieInfo={getMovieInfo}
        getMovieCredits={getMovieCredits}
      />
    </div>
  );
};

export default MovieCard;
