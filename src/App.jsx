import Header from "./components/Header";
import GenresFilter from "./components/GenresFilter";
import MoviesList from "./components/MoviesList";

const App = () => {
  return (
    <>
      <Header title={'MovieList App'} />
      <GenresFilter />
      <MoviesList />
    </>
  )
}

export default App;