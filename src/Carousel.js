import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };

  // constructor(props){
  //   super(props);
  //   this.handleIndexClick = this.handleIndexClick.bind(this); //whenever u call this it binds to the state
  // }

  //every time the props changes this is called
  static getDerivedStateFromProps({ media }) {
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }
    return { photos };
  }

  //arrow functions dont create new scope!
  handleIndexClick = event => {
    this.setState({
      //coerce a string into a number with a + sign
      active: +event.target.dataset.index
    });
  };
  render() {
    const { photos, active } = this.state;

    let hero = "http://placecorgi.com/300/300";
    if (photos[active] && photos[active].value) {
      hero = photos[active].value;
    }

    return (
      <div className="carousel">
        <img src={hero} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            /* eslint-disable-next-line */
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo.value}
              src={photo.value}
              className={index === active ? "active" : ""}
              alt="animal thumnbail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
