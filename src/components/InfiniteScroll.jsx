import React, { useState, useEffect, useRef, useCallback } from "react";
import MovieCard from "./MovieCard";
import LoadMoreMoviesList from "./LoadMoreMoviesList";
// import MoviesList from "./MoviesList";

const InfiniteScroll = ({ startYear, setStartYear }) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [startYear, setStartYear] = useState(2013);
    const loaderRef = useRef(null);
    const api_key = "12f4b68458fda3289b7bb96bf49d95ea";
    const controller = new AbortController();
    const signal = controller.signal;


    const fetchData = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);
        const fetchData = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&primary_release_year=${startYear + 2}&page=1&vote_count.gte=100`, signal);
        const jsonData = await fetchData.json();
        const data = await jsonData;

        setItems((prevItems) => [...prevItems, ...data.results]);
        console.log(data);
        // setItems(data.results)

        if (startYear === 2024) {
            controller.abort();
            console.log('fetch aborted');
            setIsLoading(false);
        }

        //     .then((res) => res.json())
        // .then((data) => {
        //     // console.log(data.data);
        // })

        // .catch((err) => console.log(err));
        setStartYear((prevYear) => prevYear + 1);

        setIsLoading(false);
    }, [startYear, isLoading]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting) {
                fetchData();
            }
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [fetchData]);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&primary_release_year=${startYear + 1}&page=1&vote_count.gte=100`
                );
                const json = await response.json();
                const data = await json;
                // console.log(data.results);
                setItems(data.results);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };

        getData();
    }, []);

    const moviesArr = [];
    function createSets() {
        for (let i = 0; i < items.length; i++) {
            let maxLength = 5;
            if (items.length >= maxLength) {

                let setOf20 = items.slice(0, maxLength)
                moviesArr.push(Array.from(setOf20));
            }
        }
        console.log(moviesArr);
    }

    { items.length !== 0 && createSets(items) };


    // let year = items[0].release_date.split('-')[0];
    // console.log(items[0]);
    // items.forEach((item) => console.log(item))
    // console.log(items.release_date);
    // let arr2 = items.slice(20, 40);
    // console.log(moviesArr);

    // function createSets(items) {
    //     for (let i = 0; i < items.length; i++) {
    //         let maxLength = 20;
    //         let year = items[i].release_date.split('-')[0];

    //         if (year !== startYear) {

    //         }
    //     }
    // }


    // console.log(items.results);

    return (
        // <div className={`movielist-${startYear}`}>
        //     <div className='container'>
        //         <div className="movies-list" >
        //             {/* {items.length !== 0 && <div className="movies-list--year">{items[0].release_date.split('-')[0]}</div>} */}
        //             {/* {startYear + 1} */}
        //             {items.map((movie, index) => (
        //                 <>
        //                     {/* <p>{movie.release_date}</p> */}
        //                     <MovieCard movie={movie} key={movie.id} startYear={startYear} />
        //                 </>
        //             ))}
        //         </div>
        //         <div ref={loaderRef} className="loader">{isLoading && <p>Loading...</p>}</div>
        //     </div>
        // </div>

        <>
            <LoadMoreMoviesList items={items} />
            <div ref={loaderRef} className="loader">{isLoading && <p>Loading...</p>}</div>
        </>


        // <>
        //     {
        //         items.map((movie) => (
        //             <>
        //                 <MoviesList movie={movie} key={movie.id} startYear={startYear}>
        //                 </MoviesList>
        //                 <div ref={loaderRef} className="loader">{isLoading && <p>Loading...</p>}</div>
        //             </>
        //         ))
        //     }
        // </>
    );
};

export default InfiniteScroll;