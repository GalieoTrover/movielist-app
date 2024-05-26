import MovieCard from "./MovieCard";

const MoviesList = ({ searchTerm, results }) => {
  // const observer = new IntersectionObserver((entries) => {
  //   console.log(entries[0]);
  //   const lastCard = entries[0];
  //   // if (!lastCard.isIntersecting) return;
  //   if (lastCard.isIntersecting) {
  //     lastCard.target.classList.add('selected')
  //   }
  // })

  // const loadMovieList = () => {
  //   const root = document.getElementById('root');
  //   const movieListCont = document.createElement('section');
  //   movieListCont.classList.add('movieslist');
  //   const yearHead = document.createElement('div');
  //   yearHead.classList.add('year-heading');
  //   const movieList = document.createElement('div');
  //   movieList.classList.add('movies-list');
  //   movieListCont.appendChild(yearHead).appendChild(movieList);
  //   root.appendChild(movieListCont);
  //   for (let i = 0; i < 20; i++) {
  //     {
  //       movies.map((movie) => (
  //         <MovieCard key={movie.id} movie={movie} />
  //       ))
  //     }
  //   }
  // }

  // const lastChild = document.querySelector('.movies-list--card:last-child');
  // console.log(lastChild);
  // if (lastChild) {
  //   observer.observe(lastChild);
  //   console.log(lastChild);
  // }


  function runObserver() {
    console.log(document.querySelector('.movies-list'));
    // const observer = new IntersectionObserver((entries) => {
    //   console.log(entries);
    // })

    // observer.observe(document.querySelector('.movies-list'));
  }
  // window.addEventListener('load', runObserver());

  // console.log(results);
  return (
    <section id="moviesList">
      <div className="container">
        {
          !results.length === 0
            ? <div className="results-heading"><p>Results for: <span>{searchTerm}</span></p></div>
            : <div className="year-heading">2012</div>
        }
        <div className="movies-list">
          {/* {searchResults.length === 0 ? movieData.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          )) : searchResults.map((result) => (
            <MovieCard key={result.id} movie={result} />
          ))} */}
          {!results.length == 0 && results.map((result) => (
            <MovieCard key={result.id} movie={result} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoviesList;
