
import React, { Component } from 'react'
import Header from './Header'
import GitHubIcon from '../assets/GitHub.png'

class NoUser extends Component {
  render() {
    return (
      <div className="App">
        <Header title={'Octopocto'} />
        <div className="No-user">
          <div>
            <h2>Automatically generate portfolios from your public GitHub profile</h2>
            <h3>Go to <a className="Link" href="https://sekaru.github.io/Octopocto/?sekaru">sekaru.github.io/Octopocto/?[username]</a> to view a generated portfolio!</h3>
            
            <br/><br/>
            <h3 className="Source">
              <img src={GitHubIcon} alt="GitHub" />
              <a className="Link" href="https://github.com/sekaru/octopocto">Source</a>
            </h3>
          </div>
        </div>
      </div>
    )
  }
}

export default NoUser
