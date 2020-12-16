import React from 'react';
import { nanoid } from 'nanoid';

const Movie = props => {

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
      {myProps.add && <button id={myProps.index} onClick={myProps.action}>Add to favorites</button>}
      {myProps.remove && <button id={myProps.index} onClick={() => myProps.action(myProps.title)}>Remove from favorites</button>}
      <br />
      <hr />
    </div>
  )
}

export default Movie;
