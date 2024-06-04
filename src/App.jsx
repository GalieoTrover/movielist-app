import Header from "./components/Header";
import GenresFilter from "./components/GenresFilter";
import MoviesList from "./components/MoviesList";
import { useState, useEffect, useRef, useCallback } from 'react';
import MovieCard from "./components/MovieCard";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [appState, setAppState] = useState("movieData");
  const [genre, setGenre] = useState("");
  const [prevYear, setPrevYear] = useState(2012);
  const [nextYear, setNextYear] = useState(2012);
  const [isLoading, setIsLoading] = useState(false);
  const bottomLoaderRef = useRef(null);
  const api_key = "2dca580c2a14b55200e784d157207b4d";

  const controller = new AbortController();
  const signal = controller.signal;

  const getMoviesData = async () => {
    const fetch2012 = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&primary_release_year=2012&page=1&vote_count.gte=100`, { signal });
    const jsonData2012 = await fetch2012.json();
    const data2012 = await jsonData2012;

    const fetch2013 = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&primary_release_year=2013&page=1&vote_count.gte=100`, { signal });
    const json2013 = await fetch2013.json();
    const data2013 = await json2013;

    setMovieData([data2012.results, data2013.results]);
  };

  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchTerm}`;
  const fetchSearchResults = async () => {
    const fetchQuery = await fetch(searchUrl);
    const jsonQuery = await fetchQuery.json();
    const data = await jsonQuery;

    setSearchResults(data.results);
    setAppState("searchResults");
  }
  function getSearchTerm(e) {
    setSearchTerm(e.target.value);
  }

  const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`;

  const fetchMovieGenres = async () => {
    const fetchGenres = await fetch(genresUrl, { signal });
    const jsonGenres = await fetchGenres.json();
    const data = await jsonGenres;
    const movieGenres = data.genres.slice(0, 10);

    setMovieGenres(movieGenres);
  }

  useEffect(() => {
    getMoviesData();
    fetchMovieGenres();

    return () => {
      setTimeout(() => {
        controller.abort();
      }, 1000)
    }
  }, []);

  async function getMoviesByGenre(genreId, genreName) {
    const fetchMovieBasedonGenreId = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${genreId}`)
    const jsonData = await fetchMovieBasedonGenreId.json();
    const genreData = await jsonData;

    setMoviesByGenre(genreData.results);
    setAppState("moviesByGenre");
    setGenre(genreName);
    setSearchTerm("");
  }

  let results;
  switch (appState) {
    case "searchResults":
      results = searchResults;
      break;
    case "moviesByGenre":
      results = moviesByGenre;
      break;
    case "movieData":
      results = movieData;
    default:
      results = movieData;
  }

  const fetchNextYearData = useCallback(async () => {
    const fetchNextData = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&primary_release_year=${nextYear + 1}&page=1&vote_count.gte=100`, signal);
    const jsonNextData = await fetchNextData.json();
    const dataNext = await jsonNextData;

    setMovieData((prevData) => [...prevData, dataNext.results])

    if (nextYear === 2024) {
      controller.abort();
      console.log('fetch aborted');
      setIsLoading(false);
      document.querySelector('.bottom-loader').style.display = 'none';
    }
    setNextYear((prevYear) => prevYear + 1);

    setIsLoading(false);
  }, [nextYear, isLoading]);

  const fetchPrevYearData = useCallback(async () => {
    const fetchPrevData = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&primary_release_year=${prevYear - 1}&page=1&vote_count.gte=100`, signal);
    const jsonPrevData = await fetchPrevData.json();
    const dataPrev = await jsonPrevData;

    setMovieData((prevData) => [dataPrev.results, ...prevData])

    if (prevYear === 2005) {
      controller.abort();
      console.log('fetch aborted');
      setIsLoading(false);
    }
    setPrevYear((prevYear) => prevYear - 1);

    setIsLoading(false);
  }, [prevYear, isLoading]);

  useEffect(() => {
    const bottomObserver = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        fetchNextYearData();
      }
    });

    if (bottomLoaderRef.current) {
      bottomObserver.observe(bottomLoaderRef.current);
    }

    return () => {
      if (bottomLoaderRef.current) {
        bottomObserver.unobserve(bottomLoaderRef.current);
      }
    };
  }, [fetchNextYearData]);

  const moviesArr = [];
  for (let i = 0; i < movieData.length; i++) {
    moviesArr.push(movieData[i]);
  }

  return (
    <>
      <Header searchTerm={searchTerm} getSearchTerm={getSearchTerm} fetchSearchResults={fetchSearchResults} />
      <GenresFilter movieGenres={movieGenres} getMoviesByGenre={getMoviesByGenre} genre={genre} setAppState={setAppState} setSearchTerm={setSearchTerm} />
      {(appState == "movieData" && prevYear !== 2005) && <div className="load-prev">
        <button className="load-prev--btn" onClick={fetchPrevYearData}>Load Previous</button>
      </div>}
      {appState == "movieData" ? moviesArr.map((movie) => (
        <MoviesList key={moviesArr.indexOf(movie)} movie={movie} appState={appState}>
          {movie.map((data) => (
            <>
              <MovieCard movie={data} />
            </>
          ))}
        </MoviesList>
      )) : <MoviesList results={results} searchTerm={searchTerm} appState={appState} genre={genre} />}
      {appState == "movieData" && <div ref={bottomLoaderRef} className="bottom-loader">{isLoading && <p>Loading...</p>}</div>}
    </>
  )
}

export default App;