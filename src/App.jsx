import Header from "./components/Header";
import GenresFilter from "./components/GenresFilter";
import MoviesList from "./components/MoviesList";
import { useState, useEffect, useRef, useCallback } from 'react';
import MovieCard from "./components/MovieCard";
import Loader from "./components/Loader";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [genre, setGenre] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [appState, setAppState] = useState("movieData");
  const [prevYear, setPrevYear] = useState(2012);
  const [nextYear, setNextYear] = useState(2012);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const bottomLoaderRef = useRef(null);
  const api_key = "2dca580c2a14b55200e784d157207b4d";

  const controller = new AbortController();
  const signal = controller.signal;

  /* fetch initial data */
  const getMoviesData = async () => {
    try {
      const fetch2012 = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&primary_release_year=${nextYear}&page=1&vote_count.gte=100`, { signal });
      const jsonData2012 = await fetch2012.json();
      const data2012 = await jsonData2012;

      setMovieData([data2012.results]);
      setIsLoading(false);
    } catch (error) {
      setFetchError(error);
    }
  };

  /* fetch next year's data */
  const fetchNextYearData = useCallback(async () => {
    const fetchNext = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&primary_release_year=${nextYear + 1}&page=1&vote_count.gte=100`, { signal });
    const jsonNext = await fetchNext.json();
    const dataNext = await jsonNext;

    setMovieData((prevData) => [...prevData, dataNext.results])
    setNextYear((prevYear) => prevYear + 1);

    if (nextYear === 2024) {
      controller.abort();
      console.log('fetch aborted');
    }
  }, [nextYear, isLoading]);

  /* fetch previous year's data */
  const fetchPrevYearData = useCallback(async () => {
    const fetchPrev = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&primary_release_year=${prevYear - 1}&page=1&vote_count.gte=100`, { signal });
    const jsonPrev = await fetchPrev.json();
    const dataPrev = await jsonPrev;

    setMovieData((prevData) => [dataPrev.results, ...prevData])
    setPrevYear((prevYear) => prevYear - 1);

    if (prevYear === 2005) {
      controller.abort();
    }
  }, [prevYear, isLoading]);

  /* observe bottom loader */
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
  }, [fetchNextYearData, isLoading]);

  useEffect(() => {
    getMoviesData();
  }, []);

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

  function setMovieList(stateOfApp) {
    if (stateOfApp === "movieData") {
      return (movieData.map((movie) => (
        (<MoviesList key={movieData.indexOf(movie)} movie={movie} appState={appState}>
          {movie.map((data) => (
            <MovieCard movie={data} />
          ))}
        </MoviesList>)
      )))
    } else {
      return (<MoviesList results={results} searchTerm={searchTerm} appState={appState} genre={genre} />)
    }
  }

  return (
    <>
      <Header searchTerm={searchTerm} setSearchResults={setSearchResults} setSearchTerm={setSearchTerm} setAppState={setAppState} />
      <GenresFilter setMoviesByGenre={setMoviesByGenre} appState={appState} setAppState={setAppState} setSearchTerm={setSearchTerm} setGenre={setGenre} />
      {(appState == "movieData" && prevYear !== 2005) && <div className="load-prev">
        <button className="load-prev--btn" onClick={fetchPrevYearData}>Load Previous</button>
      </div>}
      {isLoading ? <Loader /> : setMovieList(appState)}
      {!isLoading && appState === "movieData" && <div ref={bottomLoaderRef} className="bottom-loader"><p>Loading...</p></div>}
    </>
  )
}

export default App;