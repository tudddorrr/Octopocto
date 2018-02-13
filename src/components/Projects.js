import React, { Component } from 'react'
import { monthName, toEmoji, getUsername } from '../Utils'
import * as randomColor from 'randomcolor'

class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    let api_root = 'https://api.github.com'

    // fetch repos
    fetch(api_root + '/users/' + getUsername() + '/repos' + this.appInfo())
    .then(res => res.json())
    .then(json => {      
      let projects = []

      json.forEach(repo => {
        repo.bg = randomColor({hue: 'purple', luminosity: 'dark'})

        // get the languages
        this.getProjectData(repo.languages_url)
        .then(languages => {
          repo.languages = languages
          this.props.addLanguages(Object.keys(languages))

          // get the topics
          let topicsUrl = api_root + '/repos/' + getUsername() + '/' + repo.name + '/topics' + this.appInfo();
          let topicsHeaders = {Accept: 'application/vnd.github.mercy-preview+json'};
          return this.getProjectData(topicsUrl, topicsHeaders)       
        })
        .then(topics => {
          repo.topics = topics
          this.props.addTopics(topics.names)

          projects.push(repo)
          this.setState({projects})   
        })
      })      
    })
    .catch((error) => {
      console.error(error)
    });
  }

  getProjectData(url, headers) {
    return fetch(url + this.appInfo(), {headers: headers})
    .then((res) => res.json())
    .then((json) => {      
      return json
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
      <div className="Projects">
        {
          this.state.projects.length > 0
          ? 
          this.state.projects.sort((p1, p2) => {
            return p1.created_at === p2.created_at ? 0 : p1.created_at > p2.created_at ? -1 : 1;
          }).map(this.toProject)
          :
          <div>You have no public projects or there was an error with the GitHub API</div>            
        }
      </div>
    );
  }

  toProject = (project, index) => {
    return (
      <div key={project.id} className="Project" style={{backgroundColor: project.bg, width: this.state.projects.length%2!==0 && index===this.state.projects.length-1 ? '100vw' : null}}>
        <div>
          <div>
            <h2>{project.fork ? toEmoji('🍴') : null} <a href={project.html_url} target="_blank">{project.name}</a></h2>
            <p>
              Created in <strong>{monthName(new Date(project.created_at).getMonth())} {new Date(project.created_at).getFullYear()}</strong> and
              last updated in <strong>{monthName(new Date(project.pushed_at).getMonth())} {new Date(project.pushed_at).getFullYear()}</strong>
            </p>          
          </div>

          <div>
            <p>{project.description}</p>             
          </div>
          <br/>

          {
            project.languages && Object.keys(project.languages).length>0
            ?
            <div>
              <div>Built with {Object.keys(project.languages).map(this.toLanguage)}</div>   
              <br/>          
            </div>
            :
            null
          }

          {
            project.topics.names.length > 0
            ?
            <div>
              <div className="Topics">{project.topics.names.map(this.toTopic)}</div>                       
            </div>
            :
            null
          }

          <div className="Stats">
            <ul>
              {project.stargazers_count ? <li>{toEmoji('⭐')} {project.stargazers_count}</li> : null}
              {project.forks_count ? <li>{toEmoji('🍴')} {project.forks_count}</li> : null}
              {project.watchers_count ? <li>{toEmoji('👀')} {project.watchers_count}</li> : null}
            </ul>                
          </div>
        </div>
      </div>
    )
  }

  toLanguage = (language) => {
    let colour = Object.keys(this.props.languageColours).length>0 && this.props.languageColours[language] ? this.props.languageColours[language].color : 'white'
    return <span key={language} className="Language" style={{color: colour}}>{language}</span>
  }

  toTopic = (topic) => {
    return <span key={topic} className="Topic" style={{backgroundColor: randomColor({hue: 'orange', luminosity: 'dark'})}}>{topic}</span>
  }
}

export default Projects