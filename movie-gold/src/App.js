import './App.css';
import api from './api/axiosConfig.js';
import process from 'process';
import { useState, useEffect, React } from 'react';
import Layout from './components/Layout.js';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home.js';

function App() {

  window.process = process;

  const [movies, setMovies] = useState();

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

  useEffect(() => {
    getMovies();
  },[]);
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route path='/' element={<Home/>}></Route>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
