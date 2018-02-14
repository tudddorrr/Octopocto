
import React, { Component } from 'react'
import logo from '../assets/Octocat.png'

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{this.props.title}</h1>
      </header>
    )
  }
}

export default Header
