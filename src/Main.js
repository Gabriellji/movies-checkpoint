import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'

import Movie from './Movie'

const initialState = {
  movies: [],
  genres: [],
  favorites: [],
  selectedGenre: '',
  randomMovie: {},
  isLoading: true
}


const Main = props => {

  let [state, setState] = useState(initialState)

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/wildcodeschoolparis/datas/master/movies.json')
      .then(res => res.json())
      .then(data => setState({
        ...state,
        originalMovies: data.movies,
        movies: data.movies,
        genres: ['All', ...data.genres],
        isLoading: false
      }))
  }, [])

  const addToFavorites = event => {
    window.scrollTo(0, 0)

    let selectedMovie = state.movies[event.target.id]

    if (state.favorites.find(duplicate => duplicate === selectedMovie)) {
      alert('You have already added that movie!')
    } else {
      let myFavorites = [...state.favorites]
      myFavorites.push(selectedMovie)
      setState({
        ...state,
        favorites: myFavorites
      })
    }
  }

  const removeFromFavorites = movie => {
    let myFavorites = [...state.favorites]

    let indexOfFavorite = state.favorites.findIndex(favoriteMovie => favoriteMovie.title === movie)


    myFavorites.splice(indexOfFavorite, 1)

    setState({
      ...state,
      favorites: myFavorites
    })
  }

  const pickRandomMovie = () => {

    const randomIndex = Math.floor(Math.random() * state.favorites.length)

    const newRandomMovie = state.favorites[randomIndex]

    props.history.push({
      pathname: '/random',
      state: {
        randomMovie: newRandomMovie
      }
    })
  }

  const handleGenre = (event) => {

    let filteredMovies = state.originalMovies.filter(movie => movie.genres.includes(event.target.value))

    let allFilteredMovies = event.target.value === 'All' ? state.originalMovies : filteredMovies

    setState({
      ...state,
      movies: allFilteredMovies
    })
  }
  console.log(state)
  return (
    <div>
      {state.isLoading

        ? <h2>Loading all movies...</h2>
        :
        <div>
          {

            state.favorites.length > 0 &&
            <div>
              <h2>Your favorites <button onClick={pickRandomMovie}>Pick a random movie</button></h2>
              {
                state.favorites.map((movie, index) =>
                  <div key={nanoid()}>
                    <Movie
                      title={movie.title}
                      year={movie.year}
                      director={movie.director}
                      plot={movie.plot}
                      genres={movie.genres}
                      action={removeFromFavorites}
                      index={index}
                      remove
                    />
                  </div>)
              }
              <hr />
              <hr />
              <hr />
            </div>
          }
          <h1>List of movies</h1>
          <select onChange={handleGenre}>
            {
              state.genres.map((genre, index) =>
                <option key={index}>{genre}</option>
              )
            }
          </select>
          {
            state.movies.map((movie, index) =>
              <div key={nanoid()}>
                <Movie
                  title={movie.title}
                  year={movie.year}
                  director={movie.director}
                  plot={movie.plot}
                  genres={movie.genres}
                  action={addToFavorites}
                  index={index}
                  add
                />
              </div>
            )
          }
        </div>
      }
    </div>
  )

}


export default Main;
