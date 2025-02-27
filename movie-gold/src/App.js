import './App.css';
import api from './api/axiosConfig.js';
import process from 'process';
import { useState, useEffect, React } from 'react';
import Layout from './components/Layout.js';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home.js';
import Header from './components/header/Header.js';
import Trailer from './components/trailer/Trailer.js';
import Reviews from './components/reviews/Reviews.js';

function App() {

  window.process = process;

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews,setReviews] = useState();

  const getMovies = async () => {

    try {
      const response = await api.get("/api/v1/movies");
      console.log(response.data)
      setMovies(response.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  const getMovieData = async (movieId) => {
    try{
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviews);
    }catch(error){

    }
  }

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home movies={movies} />}></Route>
          <Route path='/Trailer/:ytTrailerId' element={<Trailer />}></Route>
          <Route path='/Reviews/:movieId' element = {<Reviews getMovieData={getMovieData} reviews={reviews} setReviews={setReviews} /> }></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
