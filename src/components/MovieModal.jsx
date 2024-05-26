import closeIcon from "../assets/images/closeIcon.svg";
import imdbLogo from "../assets/images/imdbLogo.svg";
import officialSiteLogo from "../assets/images/officialSiteLogo.svg";

const MovieModal = ({ modalVisible, modalOverlay, movie, getMovieInfo, getMovieCredits }) => {
  const desc = movie.overview.substring(0, 350) + "...";
  return (
    modalVisible && modalOverlay && (
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
          <p className="movie-desc">{desc}</p>
          <div className="movie-info movie-genres-wrap">
            {getMovieInfo &&
              getMovieInfo.genres.map((genre) => (
                <span key={genre.id} className="movie-genres">
                  {genre.name}
                </span>
              ))}
          </div>
          <div className="movie-info movie-cast-wrap">
            <span>Cast:</span>
            {getMovieCredits &&
              getMovieCredits.cast.slice(0, 3).map((cast) => (
                <p key={cast.id} className="movie-cast">
                  {cast.name}
                </p>
              ))}
          </div>
          <div className="movie-info movie-director-wrap">
            <span>Director:</span>
            {getMovieCredits &&
              getMovieCredits.crew
                .filter((crew) => crew.job == "Director")
                .map((director) => (
                  <p key={director.key} className="movie-director">
                    {director.name}
                  </p>
                ))}
          </div>
          {getMovieInfo && (
            <div className="movie-info movie-links-wrap">
              <p>
                <span>External Links: </span>
                <div className="movie-links">
                  <div className="movie-links--imdb">
                    <a href={`https://www.imdb.com/title/${getMovieInfo.imdb_id}`}
                      target="_blank"><img src={imdbLogo} alt="imdbLogo" /></a>
                  </div>
                  <div className="movie-links--home">
                    <a href={getMovieInfo.homepage} target="_blank"><img src={officialSiteLogo} alt="officialSiteLogo" /></a>
                  </div>
                </div>
              </p>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default MovieModal;
