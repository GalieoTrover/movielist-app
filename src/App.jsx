import Header from "./components/Header";
import GenresFilter from "./components/GenresFilter";
import MoviesList from "./components/MoviesList";
import MoviesByGenre from "./components/MoviesByGenre";
import { useState, useEffect } from 'react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [appState, setAppState] = useState("movieData");

  const url =
    "https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2012&page=1&vote_count.gte=100";

  const getMoviesData = async () => {
    const fetchData = await fetch(url);
    const jsonData = await fetchData.json();
    const data = await jsonData;

    setMovieData(data.results);
  };

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
    default:
      results = movieData;
  }

  return (
    <>
      <Header searchTerm={searchTerm} getSearchTerm={getSearchTerm} fetchSearchResults={fetchSearchResults} />
      <GenresFilter movieGenres={movieGenres} getMoviesByGenre={getMoviesByGenre} />
      <MoviesList searchTerm={searchTerm} results={results} />
    </>
  )
}

export default App;