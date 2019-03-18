import React from "react";
import { NavLink } from "react-router-dom";

class Pet extends React.Component {
  render() {
    //es6 destructuring (so you dont need to write name.this.props every time, only name)
    const { name, animal, breed, media, location, id } = this.props;
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      //filter runs on each item on the array and if it returns true (size = pn) it stays if it returns false (all other sizes of photo) its kicked from the array
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    const hero = photos[0] ? photos[0].value : "http://placecorgi.com/300/300";

    return (
      <NavLink to={`/details/${id}`} className="pet">
        <div className="image-container">
          <img src={hero} alt={name} />
        </div>
        <div className="info">
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
        </div>
      </NavLink>
    );
  }
}

export default Pet;
