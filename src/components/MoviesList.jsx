import MovieCard from "./MovieCard";
import { useState, useEffect, useCallback, useRef } from "react";

const MoviesList = ({ startYear, searchTerm, results, appState, setStartYear, movieData, items }) => {
  // console.log('hi');
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

  //   setItems((prevItems) => [...prevItems, ...data.results]);
  //   // console.log("results", results);
  //   console.log(items);
  //   setItems(data.results)

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

  // useEffect(() => {
  //   const getData = async () => {
  //     setIsLoading(true);
  //     try {
  //       // const response = await fetch(
  //       //   `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&primary_release_year=${startYear + 1}&page=1&vote_count.gte=100`
  //       // );
  //       // const json = await response.json();
  //       // const data = await json;
  //       // console.log("2013", data.results);
  //       // setItems(data.results);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setIsLoading(false);
  //   };

  //   getData();
  // }, []);

  // let resultsData = 
  // let movies1 = results[0];
  // console.log(result);
  // results.map((result) => { console.log(result[0]); })
  //   result.map((movie) => {
  //     console.log(movie.title);
  //   })
  // })
  // results.map((result,index)=>console.log();)
  // console.log(resultsData);

  // resultsData.map((result) => console.log(result));

  // console.log(movies1);
  return (
    <>
      <section id="moviesList" className={`movielist-${startYear} ${appState}`}>
        <div className="container">
          {/* {
            !results.length === 0
              ? <div className="results-heading"><p>Results for: <span>{searchTerm}</span></p></div>
              : <div className="year-heading">{startYear}</div>
          } */}
          <div className="movies-list" >
            {!results.length == 0 && results.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>
      {/* <div ref={loaderRef} className="loader">{isLoading && <p>Loading...</p>}</div> */}
    </>

  );
}

export default MoviesList;
