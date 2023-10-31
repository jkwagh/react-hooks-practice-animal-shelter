import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

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