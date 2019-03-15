import React from "react";
import pf from "petfinder-client";
import { Consumer } from "./SearchContext";
import Pet from "./Pet";
import SearchBox from "./SearchBox";
const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Results extends React.Component {
  constructor(props) {
    //this pushes props up the tree and allows state to be changed
    super(props);

    this.state = {
      pets: []
    };
  }
  componentDidMount() {
    this.search();
  }
  //componentDidMount: when the dom is ready , run once per component (Pet />)
  //also run it when form is submitted
  search = () => {
    petfinder.pet
      .find({
        output: "full",
        location: this.props.searchParams.location,
        animal: this.props.searchParams.animal,
        breed: this.props.searchParams.breed
      })
      .then(data => {
        let pets;
        //if it exists, otherwise make pets an empty array
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          //if its an array add it to pets variable, otherwise if its one item make it into a single item array.
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }
        this.setState({
          pets: pets
        });
      });
    //returns a promise that you insert into a const
    //const promise = petfinder.breed.list({ animal: "dog" });
    //as soon as that promise is resolved..
    //promise.then(console.log, console.error);
  };
  render() {
    return (
      <div className="search">
        <SearchBox search={this.search} />
        {this.state.pets.map(pet => {
          let breed;
          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(", ");
          } else {
            breed = pet.breeds.breed;
          }
          return (
            <Pet
              animal={pet.animal}
              key={pet.id}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
              id={pet.id}
            />
          );
        })}
        {/* <pre>
          <code>{JSON.stringify(this.state, null, 4)}</code>
        </pre> */}
      </div>
    );
  }
}

export default function ResultsWithContext(props) {
  return (
    <Consumer>
      {context => <Results {...props} searchParams={context} />}
    </Consumer>
  );
}
