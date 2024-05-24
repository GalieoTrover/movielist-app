import closeIcon from "../assets/images/closeIcon.svg";

const MovieModal = ({ modalVisible, movie, getMovieInfo, getMovieCredits }) => {
  if (getMovieCredits) {
    console.log(getMovieCredits);
  }
  return (
    modalVisible && (
      <div
        className={
          modalVisible ? "movies-list--modal active" : "movies-list--modal"
        }
      >
        <div className="movies-list--modal-figure">
          <img
            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
            alt=""
          />
        </div>
        <div className="movies-list--modal-info">
          <div className="movies-list--modal-closeicon">
            <img src={closeIcon} alt="closeIcon" />
          </div>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <div className="movie-genres-wrap">
            {getMovieInfo &&
              getMovieInfo.genres.map((genre) => (
                <span key={genre.id} className="movie-genres">
                  {genre.name}
                </span>
              ))}
          </div>
        </div>
      </div>
    )
  );
};

export default MovieModal;
