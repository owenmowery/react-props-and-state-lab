import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = type => {
    this.setState({
      ...this.state.filters,
      type: type
    })
  }

  onFindPetsClick = () => {
    let apiPath;

    if (this.state.filters.type === 'cat') {
      apiPath = '/api/pets?type=cat'
    } else if (this.state.filters.type === 'dog') {
      apiPath = '/api/pets?type=dog'
    } else if (this.state.filters.type === 'micropig') {
      apiPath = '/api/pets?type=micropig'
    } else {
      apiPath = '/api/pets'
    }

    fetch(apiPath)
      .then(response => {
        if (!response.ok) { throw response }
        return response.json()
      })
      .then(json => {
        let ary = []
        ary.push(json)
        this.setState({
          pets: ary
        })
      })
      .catch(err => {
        err.text().then(errorMessage => {
          console.log(errorMessage)
        })
      })
  }

  onAdoptPet = id => {
    const pet = this.state.pets.find(pet => pet.id === id)
    pet.isAdopted = true
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onChangeType={this.onChangeType}
              onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser 
              pets={this.state.pets}
              onAdoptPet={this.state.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
