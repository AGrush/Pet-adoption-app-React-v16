import React from "react";
//ANIMALS is an array of strings :string[] when hovered over
import { ANIMALS } from "petfinder-client";
import { Consumer } from "./SearchContext";
//make petfinder API available below in the code (pass in the authentication object to allow get/list requests)

class SearchBox extends React.Component {
  //prevent form from actually submitting
  handleFormSubmit = event => {
    event.preventDefault();
    this.props.search();
  };
  render() {
    return (
      //better to write 'function (context) => (...)' below. This has an implicit return. The reason we use a function here to render the component is so that context is in the scope of that which is rendered.
      //if you only have to reafetence context inside the consumer then always wrap in consumer like this, HOWEVER if you need to reference it in a lifecycle method you have to do it like its done in Results.js whereby you wrap the export in the Consumer
      <Consumer>
        {context => (
          <div className="search-params">
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="location">
                Location
                <input
                  id="location"
                  onChange={context.handleLocationChange}
                  value={context.location}
                  plsceholder="Location"
                />
              </label>
              <label htmlFor="animal">
                Animal
                <select
                  id="animal"
                  value={context.animal}
                  onChange={context.handleAnimalChange}
                  onBlur={context.handleAnimalChange}
                >
                  <option />
                  {ANIMALS.map(animal => (
                    //anytime you do a map you have to have a key
                    <option key={animal} value={animal}>
                      {animal}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="breed">
                breed
                <select
                  id="breed"
                  value={context.breed}
                  onChange={context.handleBreedChange}
                  onBlur={context.handleBreedChange}
                  //disabled if the animal has no breeds listed
                  disabled={context.breeds.length === 0}
                >
                  <option value="">All animals</option>
                  {context.breeds.map(breed => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </label>
              <button>Submit</button>
            </form>
          </div>
        )}
      </Consumer>
    );
  }
}

export default SearchBox;
