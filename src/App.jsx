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
  // const [selectedGenre, setSelectedGenre] = useState('');
  // const [loadMore, setLoadMore] = useState(false);
  // const [loadedMovies, setLoadedMovies] = useState([]);
  // const [startYear, setStartYear] = useState(2012);
  const [genre, setGenre] = useState("");
  const [prevYear, setPrevYear] = useState(2012);
  const [nextYear, setNextYear] = useState(2013);

  const startYear = 2012;

  const controller = new AbortController();
  const signal = controller.signal;

  const url =
    "https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2012&page=1&vote_count.gte=100";

  const getMoviesData = async () => {
    const fetch2012 = await fetch(url, { signal });
    const jsonData2012 = await fetch2012.json();
    const data2012 = await jsonData2012;
    // const empty = [];
    // empty.push([...data.results]);
    // setMovieData(data.results);
    // console.log(movieData);

    const fetch2013 = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2013&page=1&vote_count.gte=100", { signal });
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
    // setTimeout(() =>
    //   window.scrollTo(0, 1720), 600)
    getMoviesData();
    // document.querySelector('.movielist:nth-child(2)').focus();
    // let test = document.querySelector('.movielist:nth-child(4)');
    // if (test !== null) { test.focus() }

    return () => {
      // controller.abort();
      // console.log('fetch aborted');
    }
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
    const fetchGenres = await fetch(genresUrl, { signal });
    const jsonGenres = await fetchGenres.json();
    const data = await jsonGenres;
    const movieGenres = data.genres.slice(0, 5);

    setMovieGenres(movieGenres);
  }

  useEffect(() => {
    fetchMovieGenres();

    return () => {
      // controller.abort();
    }
  }, [])

  async function getMoviesByGenre(genreId, genreName) {
    const fetchMovieBasedonGenreId = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&with_genres=${genreId}`)
    const jsonData = await fetchMovieBasedonGenreId.json();
    const genreData = await jsonData;

    setMoviesByGenre(genreData.results)
    setAppState("moviesByGenre");
    setGenre(genreName);
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

  const [isLoading, setIsLoading] = useState(false);
  // const [startYear, setStartYear] = useState(2013);
  const topLoaderRef = useRef(null);
  const bottomLoaderRef = useRef(null);
  const api_key = "12f4b68458fda3289b7bb96bf49d95ea";


  const fetchNextYearData = useCallback(async () => {
    // if (isLoading) return;
    // setIsLoading(true);

    /* next year's data (2013 - 2024) */
    const fetchNextData = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&primary_release_year=${nextYear + 1}&page=1&vote_count.gte=100`, signal);
    const jsonNextData = await fetchNextData.json();
    const dataNext = await jsonNextData;

    setMovieData((prevData) => [...prevData, dataNext.results])

    if (startYear === 2024) {
      controller.abort();
      console.log('fetch aborted');
      setIsLoading(false);
      document.querySelector('.bottom-loader').style.display = 'none';
    }
    setNextYear((prevYear) => prevYear + 1);

    setIsLoading(false);
  }, [startYear, isLoading]);

  const fetchPrevYearData = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    // console.log(startYear);
    /* previous year's data (2011 - 2010) */
    const fetchPrevData = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&primary_release_year=${prevYear - 1}&page=1&vote_count.gte=100`, signal);
    const jsonPrevData = await fetchPrevData.json();
    const dataPrev = await jsonPrevData;
    const empty = [];
    empty.push(dataPrev);
    setMovieData((prevData) => [dataPrev.results, ...prevData])

    if (startYear === 2009) {
      controller.abort();
      console.log('fetch aborted');
      setIsLoading(false);
      // document.querySelector('.top-loader').style.display = 'none';
    }
    setPrevYear((prevYear) => prevYear - 1);

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
        // fetchPrevYearData();
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
  }, [fetchNextYearData]);

  const moviesArr = [];
  for (let i = 0; i < movieData.length; i++) {
    moviesArr.push(movieData[i]);
  }

  // let oldScrollY = window.scrollY;
  // function test() {
  //   console.log('hi');
  // }

  // console.log(window.scrollY);
  // // function scrollUpEvent() {
  // useEffect(() => {
  //   window.onscroll = function (e) {
  //     if (window.scrollY === 0) {
  //       console.log('scrolled up');
  //       console.log(oldScrollY);
  //       test();
  //       // fetchPrevYearData();
  //     }
  //     oldScrollY = window.scrollY;
  //     // fetchPrevYearData();
  //   }

  // }, [])
  // }
  // scrollUpEvent();


  const moviesListRef = useRef();
  const moviesListObserver = new IntersectionObserver((entries) => {
    const target = entries[0];

    if (target.isIntersecting) {
      moviesListRef.current.classList.add('scroll')
      setIsLoading(true);
    }
  })

  if (moviesListRef.current) {
    moviesListObserver.observe(moviesListRef.current)
  }

  // console.log(moviesListRef);
  return (
    <>
      <Header searchTerm={searchTerm} getSearchTerm={getSearchTerm} fetchSearchResults={fetchSearchResults} />
      <GenresFilter movieGenres={movieGenres} getMoviesByGenre={getMoviesByGenre} genre={genre} setAppState={setAppState} />
      {appState == "movieData" && <div className="load-prev">
        <button className="load-prev--btn" onClick={fetchPrevYearData}>Load Previous</button>
      </div>}
      {appState == "movieData" ? moviesArr.map((movie) => (
        <MoviesList key={moviesArr.indexOf(movie)} movie={movie} appState={appState} moviesListRef={moviesListRef}>
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