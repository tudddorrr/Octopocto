import React, { Component } from 'react'
import { getUsername } from '../Utils'
import randomColor from 'randomcolor'

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    let api_root = 'https://api.github.com'

    // fetch the user
    fetch(api_root + '/users/' + getUsername() + this.appInfo())
    .then(res => res.json())
    .then(json => {      
      this.setState({user: json})   
    })
    .catch((error) => {
      console.error(error)
    });
  }

  appInfo() {
    return '?client_id=702e6ea0fab499c77148&client_secret=2627da72ec40adf602258d067013b45412671890'
  }

  render() {
    return (
      <div>
        <div className="Intro">
          <a href={'http://github.com/' + this.state.user.login}><img className="Avatar" src={this.state.user.avatar_url} alt="Avatar" /></a>

          {this.state.user.name ? <h1>{this.state.user.name}</h1> : null}
          <h3>{this.state.user.bio}</h3>

          <div className="Stats">
            <ul>
              <li>{this.state.user.public_repos} repos</li>          
              <li><a href={this.state.user.blog} style={{color: 'black', cursor: 'pointer'}} target="_blank">{this.state.user.blog}</a></li>
              <li>{this.state.user.location}</li>
              {this.state.user.hireable ? <li>Looking for work!</li> : null}              
            </ul>
          </div>
        </div>

        <div className="Projects">
          <div className="Project" style={{width: '100vw'}}>
            <div style={{marginTop: '-2em'}}>            
              <h1>A few stats...</h1>
              
              <h3>Favourite languages</h3>
              {
                this.props.favLanguages.map(this.toLanguage)
              }

              <br/><br/>

              {
                this.props.favTopics.length > 0
                ?
                <div>
                  <h3>Favourite topics</h3>
                  {this.props.favTopics.map(this.toTopic)}
                </div>
                :
                null
              }
            </div>
          </div>
        </div>

        <div>
          <h1>{this.state.user.name ? this.state.user.name + '\'s' : 'Their'} Projects...</h1>          
        </div>
      </div>
    );
  }

  toLanguage = (language) => {
    let colour = Object.keys(this.props.languageColours).length>0 ? this.props.languageColours[language.name].color : 'white'
    return <span key={language.name} className="Language" style={{color: colour}}>{language.name}</span>
  }

  toTopic = (topic) => {
    return <span key={topic.name} className="Topic" style={{backgroundColor: randomColor({hue: 'orange', luminosity: 'dark'})}}>{topic.name}</span>
  }
}

export default User