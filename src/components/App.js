import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });
  // App should pass a callback prop, onChangeType, to <Filters />. This callback needs to update <App />'s filters.type state.

  const updateFiltersType = (type) => {
    setFilters({type: type});
  }

  const onFindPetsClick = () => {
    let fetchUrl = 'http://localhost:3001/pets'

    if (filters.type !== "all") {
      fetchUrl += `?type=${filters.type}`
    }

    fetch(fetchUrl)
      .then((resp) => resp.json())
      .then((data) => {
        setPets(data);
        console.log(data)
      });
  }
  // Finally, App should pass a callback prop, onAdoptPet, to <PetBrowser />. This callback should take in an id for a pet, find the matching pet in the pets array in App, and set the isAdopted property to true.
  const onAdoptPet = (petId) => {
    const updatedPets = pets.map((pet) => {
      if (pet.id === petId) {
        return {...pet, isAdopted: true};
      }
      return pet
    })

    setPets(updatedPets);
  }

  const updateFiltersType = (type) => {
    setFilters({type: type});
  };

  const onFindPetsClick = async () =>{
    let petsUrl = 'http://localhost:3000/pets';

    if (filters.type !== "all") {
      petsUrl += `?type=${filters.type}`;
    }
    const response = await fetch(petsUrl);
    const petsData = await response.json();

    setPets(petsData);
  };

  const onAdoptPet = (id) => {
    const updateAdoptedPets = pets.map((pet) => {
      return pets.id === id ? {...pet, isAdopted: true} : pet;
    });
    setPets(updateAdoptedPets);

  };

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={updateFiltersType} onFindPetsClick={onFindPetsClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;