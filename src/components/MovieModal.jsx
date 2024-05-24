import closeIcon from "../assets/images/closeIcon.svg";
import credits from "../credits.json";

const MovieModal = ({ modalVisible, movie, getMovieInfo, getMovieCredits }) => {
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
          {getMovieInfo && (
            <div className="movie-links-wrap">
              <p>
                <span>External Links: </span>
                <a
                  href={`https://www.imdb.com/title/${getMovieInfo.imdb_id}`}
                  target="_blank"
                >
                  IMDB
                </a>
                <a href={getMovieInfo.homepage}>HOME</a>
              </p>
            </div>
          )}
          <div className="movie-cast-wrap">
            <span>Cast:</span>
            {getMovieCredits &&
              getMovieCredits.cast.slice(0, 3).map((cast) => (
                <p key={cast.id} className="movie-cast">
                  {cast.name}
                </p>
              ))}
          </div>
          <div className="movie-director-wrap">
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
        </div>
      </div>
    )
  );
};

export default MovieModal;
