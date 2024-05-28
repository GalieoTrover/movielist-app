import Header from "./components/Header";
import GenresFilter from "./components/GenresFilter";
import MoviesList from "./components/MoviesList";
import InfiniteScroll from "./components/InfiniteScroll";
import { useState, useEffect, useRef, useCallback } from 'react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [appState, setAppState] = useState("movieData");
  // const [loadMore, setLoadMore] = useState(false);
  // const [loadedMovies, setLoadedMovies] = useState([]);
  const [startYear, setStartYear] = useState(2012);

  const url =
    "https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2012&page=1&vote_count.gte=100";

  const getMoviesData = async () => {
    const fetchData = await fetch(url);
    const jsonData = await fetchData.json();
    const data = await jsonData;
    // console.log(typeof (data));
    // const empty = [];
    // empty.push([...data.results]);
    // console.log(empty);
    setMovieData(data.results);

    // const fetch2013 = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2013&page=1&vote_count.gte=100");
    // const json2013 = await fetch2013.json();
    // const data2013 = await json2013;
    // empty.push(data2013.results);
    // console.log(empty);
    // setMovieData((prevData) => ([...prevData, data2013]))


    // setMovieData(empty);
  };
  // console.log(movieData);

  // TO-DO: add cleanup function to remove running bg promise using abort controller
  useEffect(() => {
    getMoviesData();
  }, []);

  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=2dca580c2a14b55200e784d157207b4d&query=${searchTerm}`;
  const fetchSearchResults = async () => {
    const fetchQuery = await fetch(searchUrl);
    const jsonQuery = await fetchQuery.json();
    const data = await jsonQuery;

    setSearchResults(data.results);
    // console.log("searchres", data.results);
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

    // console.log(genreData.results);
    setMoviesByGenre(genreData.results)
    setAppState("moviesByGenre");
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
    // case "loadMoreMovies":
    //   results = 
    default:
      results = movieData;
  }

  function incrementYear(startYear) {
    for (let i = 0; i < 12; i++) {
      startYear = startYear + 1;
      // console.log(startYear);
    }
  }

  function decrementYear(startYear) {
    for (let i = 0; i < 3; i++) {
      startYear = startYear - 1;
      console.log(startYear);
    }
  }

  // decrementYear(startYear);
  // incrementYear(startYear);
  // const loadNextMoviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${startYear}&page=1&vote_count.gte=100`;
  // const movieListRef = useRef(null);

  // useEffect(() => {
  //   const loadMoreMovies = async () => {
  //     if (loadedMovies.length === 0) {
  //       // const loadMoviesfetch = await fetch(loadNextMoviesUrl);
  //       // const loadMoviesJson = await loadMoviesfetch.json();
  //       // const loadMoviesdata = await loadMoviesJson;

  //       // console.log(loadMoviesdata);
  //       // setLoadedMovies(loadMoviesdata.results);
  //     } else if (loadedMovies.length > 1) {
  //       console.log('data in array');
  //       return;
  //     } else {
  //       console.log('yeet');
  //       return;
  //     }

  //     // if (loadedMovies.length == 0) {
  //     //   console.log(loadMoviesdata);
  //     // } else {
  //     //   console.log('data in array');
  //     // }
  //     // setMovieData((prevData) => [...prevData, loadMoviesdata]);
  //     // setMovieData(loadMoreMovies);
  //     // console.log(movieData);
  //     // console.log('movies loaded');
  //   }

  //   const observer = new IntersectionObserver((entries) => {
  //     let lastCard = entries[0];
  //     if (lastCard.intersectionRatio !== 1 && lastCard.isIntersecting) {
  //       setLoadMore(true);
  //       loadMoreMovies();
  //     } else {
  //       lastCard.target.classList.remove('show');
  //     }
  //   }, {
  //     rootMargin: "100px",
  //     threshold: "0.75"
  //   })

  //   if (movieListRef.current) {
  //     observer.observe(movieListRef.current);
  //   };

  //   /* cleanup */
  //   return () => {
  //     observer.disconnect();
  //     setLoadMore((prevState) => !prevState)
  //   }
  // }, [movieListRef.current, loadedMovies])

  // console.log(results[0]);
  // results.forEach((result) => console.log(result))
  // const [items, setItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // // const [startYear, setStartYear] = useState(2013);
  // const loaderRef = useRef(null);
  // const api_key = "12f4b68458fda3289b7bb96bf49d95ea";
  // const controller = new AbortController();
  // const signal = controller.signal;

  // const fetchData = useCallback(async () => {
  //   if (isLoading) return;
  //   setIsLoading(true);

  //   const fetchData = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&primary_release_year=${startYear + 1}&page=1&vote_count.gte=100`, signal);
  //   const jsonData = await fetchData.json();
  //   const data = await jsonData;

  //   // console.log(data.results);
  //   // setItems((prevItems) => [...prevItems, ...data.results]);
  //   setMovieData((prevData) => [...prevData, data.results])
  //   // console.log("results", results);

  //   // setItems(data.results)

  //   if (startYear === 2024) {
  //     controller.abort();
  //     console.log('fetch aborted');
  //     setIsLoading(false);
  //   }
  //   setStartYear((prevYear) => prevYear + 1);

  //   setIsLoading(false);
  // }, [startYear, isLoading]);

  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     const target = entries[0];
  //     if (target.isIntersecting) {
  //       fetchData();
  //     }
  //   });

  //   if (loaderRef.current) {
  //     observer.observe(loaderRef.current);
  //   }

  //   return () => {
  //     if (loaderRef.current) {
  //       observer.unobserve(loaderRef.current);
  //     }
  //   };
  // }, [fetchData]);

  // console.log(movieData);

  return (
    <>
      <Header searchTerm={searchTerm} getSearchTerm={getSearchTerm} fetchSearchResults={fetchSearchResults} />
      <GenresFilter movieGenres={movieGenres} getMoviesByGenre={getMoviesByGenre} />
      <MoviesList searchTerm={searchTerm} results={results} appState={appState} startYear={startYear} setStartYear={setStartYear} />
      {/* <div ref={loaderRef} className="loader">{isLoading && <p>Loading...</p>}</div> */}
      {/* {loadMore && <MoviesList searchTerm={searchTerm} results={loadedMovies} />} */}
      <InfiniteScroll movieData={movieData} startYear={startYear} setStartYear={setStartYear} />
    </>
  )
}

export default App;