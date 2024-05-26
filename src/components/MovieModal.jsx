import closeIcon from "../assets/images/closeIcon.svg";
import imdbLogo from "../assets/images/imdbLogo.svg";
import officialSiteLogo from "../assets/images/officialSiteLogo.svg";
import groupIcon from "../assets/images/groupIcon.svg";
import personIcon from "../assets/images/personIcon.svg";

const MovieModal = ({ modalVisible, modalOverlay, movie, getMovieInfo, getMovieCredits }) => {
  // const desc = movie.overview.substring(0, 350) + "...";
  return (
    modalVisible && modalOverlay && (
      <div
        className={
          modalVisible ? "movies-list--modal active" : "movies-list--modal"
        }
      >
        {/* <div className="movies-list--modal-figure">
          <img
            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
            alt=""
          />
        </div> */}
        <div className="movies-list--modal-info">
          <div className="movies-list--modal-closeicon">
            <img src={closeIcon} alt="closeIcon" />
          </div>
          <div className="movie-title--links">
            <div className="movie-title">
              <h2>{movie.title}</h2>
              {getMovieInfo && <p className="movie-tagline">{getMovieInfo.tagline}</p>}
            </div>
            <div className="movie-links">
              {getMovieInfo && (
                <div className="movie-info movie-links-wrap">
                  <p>
                    {/* <span>External Links: </span> */}
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

          <p className="movie-desc">{movie.overview}</p>
          {/* <div className="movie-info movie-genres-wrap">
            {getMovieInfo &&
              getMovieInfo.genres.map((genre) => (
                <span key={genre.id} className="movie-genres">
                  {genre.name}
                </span>
              ))}
          </div> */}
          <div className="movie-info movie-cast-wrap">
            <span><div className="movie-cast--icon"><img src={groupIcon} alt="groupIcon" /></div>Cast</span>
            <div className="movie-casts">
              {getMovieCredits &&
                getMovieCredits.cast.slice(0, 3).map((cast) => (
                  <div key={cast.id} className="movie-cast">
                    <div className="movie-cast--figure">
                      <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${cast.profile_path}`} alt="" />
                    </div>
                    <p className="movie-cast--name">{cast.name}</p>
                  </div>
                ))}
            </div>
          </div>
          <div className="movie-info movie-director-wrap">
            <span><div className="movie-cast--icon"><img src={personIcon} alt="personIcon" /></div>Director</span>
            <div className="movie-casts">
              {getMovieCredits &&
                getMovieCredits.crew
                  .filter((crew) => crew.job == "Director")
                  .map((director) => (
                    <div key={director.key} className="movie-director">
                      <div className="movie-cast--figure">
                        <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${director.profile_path}`} alt="" />
                      </div>
                      <p className="movie-cast--name">{director.name}</p>
                    </div>
                  ))}
            </div>
          </div>
          {/* {getMovieInfo && (
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
          )} */}
        </div>
      </div>
    )
  );
};

export default MovieModal;
