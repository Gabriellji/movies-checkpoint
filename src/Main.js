import React, { Component } from 'react';
import { nanoid } from 'nanoid'

import Movie from './Movie'


class Main extends Component {

  state = {
    movies: [],
    genres: [],
    favorites: [],
    selectedGenre: '',
    randomMovie: {},
    isLoading: true // used to control if the api is loaded or not
  }

  componentDidMount() {
    fetch('https://raw.githubusercontent.com/wildcodeschoolparis/datas/master/movies.json')
      .then(res => res.json())
      .then(data => this.setState({
        originalMovies: data.movies, // used to keep all the movies as a backup for the filter
        movies: data.movies,
        genres: ['All', ...data.genres], // it creates an array with 'All' and the rest of genres
        isLoading: false // changes that value since the api is loaded
      }))
  }

  addToFavorites = event => {
    window.scrollTo(0, 0) // used to scroll to top of the page

    let selectedMovie = this.state.movies[event.target.id] // event.target.id gives me the index of that movie (check the movie component)

    // condition to check if the movie was already added, if not, it pushes it to a copy of the favorite movies and the updates the state with it
    if (this.state.favorites.find(duplicate => duplicate === selectedMovie)) {
      alert('You have already added that movie!')
    } else {
      let myFavorites = [...this.state.favorites]
      myFavorites.push(selectedMovie)
      this.setState({
        favorites: myFavorites
      })
    }
  }

  removeFromFavorites = movie => {
    let myFavorites = [...this.state.favorites]

    // this will return the index of a certain movie retrieved after the button click on movie component
    let indexOfFavorite = this.state.favorites.findIndex(favoriteMovie => favoriteMovie.title === movie)

    // with splice I remove an item on that particular index
    myFavorites.splice(indexOfFavorite, 1)

    this.setState({
      favorites: myFavorites
    })
  }

  pickRandomMovie = () => {
    // get a random number between 0 and the array of favorites length
    const randomIndex = Math.floor(Math.random() * this.state.favorites.length)
    // store a random movie
    const newRandomMovie = this.state.favorites[randomIndex]

    // this part updates the current state with a randomMovie and use the setState callback to inmediatelly after it is updated, use the history.push method from react router to go to that path together with that state
    this.setState({
      randomMovie: newRandomMovie
    }, () => {
      this.props.history.push({
        pathname: '/random',
        state: {
          randomMovie: this.state.randomMovie
        }
      })
    })
  }

  handleGenre = (event) => {
    // filters the movies based on the event.target.value (the selector option)
    let filteredMovies = this.state.originalMovies.filter(movie => movie.genres.includes(event.target.value))
    // it checks if the option was 'All' since it will display all movies instead
    let allFilteredMovies = event.target.value === 'All' ? this.state.originalMovies : filteredMovies
    // updates movies to show based on that filter
    this.setState({
      movies: allFilteredMovies
    })
  }


  render() {
    return (
      <div>
        {this.state.isLoading
        // ternary to control what to show based on the api call status
          ? <h2>Loading all movies...</h2>
          :
          <div>
            {
              // check to only show favorites if there are any in that array
              this.state.favorites.length > 0 &&
              <div>
                <h2>Your favorites <button onClick={this.pickRandomMovie}>Pick a random movie</button></h2>
                {
                  this.state.favorites.map((movie, index) =>
                    <div key={nanoid()}>
                      <Movie
                        title={movie.title}
                        year={movie.year}
                        director={movie.director}
                        plot={movie.plot}
                        genres={movie.genres}
                        action={this.removeFromFavorites}
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
            <select onChange={this.handleGenre}>
              {
                this.state.genres.map((genre, index) =>
                  <option key={index}>{genre}</option>
                )
              }
            </select>
            {
              this.state.movies.map((movie, index) =>
                <div key={nanoid()}>
                  <Movie
                    title={movie.title}
                    year={movie.year}
                    director={movie.director}
                    plot={movie.plot}
                    genres={movie.genres}
                    action={this.addToFavorites}
                    index={index}
                    add
                  />
                </div>
              )
            }
          </div>
        }
      </div>
    );
  }
}

export default Main;
