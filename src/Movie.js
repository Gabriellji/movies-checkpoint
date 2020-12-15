import React from 'react';
import { nanoid } from 'nanoid'

const Movie = props => {
  // Main on this component is to control if it's being rendered on '/' or in '/random'. If it is on '/' it will receive standard props, but if it is on '/random' we need to get those props from the react-router, so we control this with the following logic:
  let myProps = props.location
    ? props.location.state.randomMovie
    : props

  return (
    <div>
      <h2>{myProps.title}</h2>
      <p>Directed by {myProps.director} at year: {myProps.year}</p>
      <p>{myProps.plot}</p>
      <p>Genres:
        {myProps.genres.map((genre) => <span key={nanoid()}>{genre}</span>)}
      </p>
      {/* If we receive the prop add or remove we show different buttons */}
      {myProps.add && <button id={myProps.index} onClick={myProps.action}>Add to favorites</button>}
      {myProps.remove && <button id={myProps.index} onClick={() => myProps.action(myProps.title)}>Remove from favorites</button>}
      <br />
      <hr />
    </div>
  )
}

export default Movie;
