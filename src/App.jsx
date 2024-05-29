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
  const [selectedGenre, setSelectedGenre] = useState('');
  // const [loadMore, setLoadMore] = useState(false);
  // const [loadedMovies, setLoadedMovies] = useState([]);
  const [startYear, setStartYear] = useState(2012);

  const url =
    "https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2012&page=1&vote_count.gte=100";

  const getMoviesData = async () => {
    const fetch2012 = await fetch(url);
    const jsonData2012 = await fetch2012.json();
    const data2012 = await jsonData2012;
    // const empty = [];
    // empty.push([...data.results]);
    // setMovieData(data.results);
    // console.log(movieData);

    const fetch2013 = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2013&page=1&vote_count.gte=100");
    const json2013 = await fetch2013.json();
    const data2013 = await json2013;
    // empty.push(data2013.results);

    // const fetch2011 = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2011&page=1&vote_count.gte=100");
    // const json2011 = await fetch2011.json();
    // const data2011 = await json2011;

    setMovieData([data2012.results, data2013.results]);
  };

  // TO-DO: add cleanup function to remove running bg promise using abort controller
  useEffect(() => {
    getMoviesData();
    // document.querySelector('.movielist:nth-child(2)').focus();
    let test = document.querySelector('.movielist:nth-child(4)');
    if (test !== null) { test.focus() }
  }, []);

  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=2dca580c2a14b55200e784d157207b4d&query=${searchTerm}`;
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

  const genresUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d";

  const fetchMovieGenres = async () => {
    const fetchGenres = await fetch(genresUrl);
    const jsonGenres = await fetchGenres.json();
    const data = await jsonGenres;
    const movieGenres = data.genres.slice(0, 5);

    setMovieGenres(movieGenres);
  }

  useEffect(() => {
    fetchMovieGenres();
  }, [])

  async function getMoviesByGenre(genreId) {
    const fetchMovieBasedonGenreId = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&with_genres=${genreId}`)
    const jsonData = await fetchMovieBasedonGenreId.json();
    const genreData = await jsonData;

    console.log(genreData.results);
    setMoviesByGenre(genreData.results)
    setAppState("moviesByGenre");
    if (genreData.results.id === genreId) {
      setSelectedGenre(`seclected-genre-${genreId}`)

    }
    // document.querySelector(`genre-${genreId}`).classList.add('selected-genre')
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

  // function incrementYear(startYear) {
  //   for (let i = 0; i < 12; i++) {
  //     startYear = startYear + 1;
  //     // console.log(startYear);
  //   }
  // }

  // function decrementYear(startYear) {
  //   for (let i = 0; i < 3; i++) {
  //     startYear = startYear - 1;
  //     console.log(startYear);
  //   }
  // }

  const [isLoading, setIsLoading] = useState(false);
  // const [startYear, setStartYear] = useState(2013);
  const topLoaderRef = useRef(null);
  const bottomLoaderRef = useRef(null);
  const api_key = "12f4b68458fda3289b7bb96bf49d95ea";
  const controller = new AbortController();
  const signal = controller.signal;

  const fetchNextYearData = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    /* next year's data (2013 - 2024) */
    const fetchNextData = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&primary_release_year=${startYear + 1}&page=1&vote_count.gte=100`, signal);
    const jsonNextData = await fetchNextData.json();
    const dataNext = await jsonNextData;

    // console.log(data.results);
    // setItems((prevItems) => [...prevItems, ...data.results]);
    setMovieData((prevData) => [...prevData, dataNext.results])
    // console.log("results", results);

    // setItems(data.results)

    if (startYear === 2024) {
      controller.abort();
      console.log('fetch aborted');
      setIsLoading(false);
      document.querySelector('.bottom-loader').style.display = 'none';
    }
    setStartYear((prevYear) => prevYear + 1);

    setIsLoading(false);
  }, [startYear, isLoading]);

  const fetchPrevYearData = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    /* previous year's data (2011 - 2010) */
    const fetchPrevData = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&primary_release_year=${startYear - 1}&page=1&vote_count.gte=100`, signal);
    const jsonPrevData = await fetchPrevData.json();
    const dataPrev = await jsonPrevData;
    // console.log(dataPrev);
    const empty = [];
    empty.push(dataPrev);
    // console.log(empty);
    // console.log(data.results);
    // setItems((prevItems) => [...prevItems, ...data.results]);
    setMovieData((prevData) => [dataPrev.results, ...prevData])
    // console.log(movieData);
    // console.log("results", results);

    // setItems(data.results)

    if (startYear === 2010) {
      controller.abort();
      console.log('fetch aborted');
      setIsLoading(false);
      document.querySelector('.top-loader').style.display = 'none';
    }
    setStartYear((prevYear) => prevYear - 1);

    setIsLoading(false);
  }, [startYear, isLoading]);

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

    const topObserser = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        fetchPrevYearData();
      }
    });

    if (topLoaderRef.current) {
      topObserser.observe(topLoaderRef.current);
    }

    return () => {
      if (bottomLoaderRef.current) {
        bottomObserver.unobserve(bottomLoaderRef.current);
      }
      if (topLoaderRef.current) {
        topObserser.unobserve(topLoaderRef.current);
      }
    };
  }, [fetchNextYearData, fetchPrevYearData]);

  const moviesArr = [];
  // if (movieData.length > 1) {
  for (let i = 0; i < movieData.length; i++) {
    moviesArr.push(movieData[i]);
  }
  // console.log(moviesArr);
  // }

  // moviesArr.map((date) => moviesYear = moviesYear + 1);




  // console.log(bottomLoaderRef.current);

  return (
    <>
      <Header searchTerm={searchTerm} getSearchTerm={getSearchTerm} fetchSearchResults={fetchSearchResults} />
      <GenresFilter movieGenres={movieGenres} getMoviesByGenre={getMoviesByGenre} selectedGenre={selectedGenre} setAppState={setAppState} />
      {/* <div ref={topLoaderRef} className="top-loader">{isLoading && <p>Loading...</p>}</div> */}
      {appState == "movieData" ? moviesArr.map((movie) => (
        <MoviesList movie={movie}>
          {movie.map((data) => (
            <>
              {/* <div className="movie-year">{data.release_date.split('-')[0]}</div> */}
              <MovieCard movie={data} />
            </>
          ))}
        </MoviesList>
      )) : <MoviesList results={results} />}
      <div ref={bottomLoaderRef} className="bottom-loader">{isLoading && <p>Loading...</p>}</div>
    </>
  )
}

export default App;