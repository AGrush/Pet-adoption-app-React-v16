import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import pf from "petfinder-client";
import { Provider } from "./SearchContext";
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "Seattle, WA",
      animal: "",
      breed: "",
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    };
  }
  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    });
  };

  handleAnimalChange = event => {
    this.setState(
      {
        animal: event.target.value,
        breed: ""
      },
      //getBreeds callback function to run after setState
      this.getBreeds
    );
  };

  handleBreedChange = event => {
    this.setState({
      breed: event.target.value
    });
  };

  getBreeds() {
    if (this.state.animal) {
      petfinder.breed.list({ animal: this.state.animal }).then(data => {
        //make sure that petfinder & breeds exist & make sure breed is an array because one of the animals don't have a breed so you have to be defensive against that
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({
            breeds: data.petfinder.breeds.breed
          });
        } else {
          this.setState({ breeds: [] });
        }
      });
    } else {
      this.setState({ breeds: [] });
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <header>
            <NavLink to="/">Adopt Me!</NavLink>
            <NavLink to="/search-params">
              <span aria-label="search" role="img">
                Search
              </span>
            </NavLink>
          </header>
          <Provider value={this.state}>
            <Switch>
              <Route component={Results} path="/" exact />
              <Route component={Details} path="/details/:id" />
              <Route component={SearchParams} path="/search-params" />
            </Switch>
          </Provider>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
