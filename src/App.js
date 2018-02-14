
import React, { Component } from 'react'
import './App.css'
import Home from './pages/Home'

class App extends Component {
  componentWillMount() {
    document.title = "Octopocto"
  }

  render() {
    return (
      <Home/>
    );
  }
}

export default App
