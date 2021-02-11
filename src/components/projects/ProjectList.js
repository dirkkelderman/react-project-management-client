// components/projects/ProjectList.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import AddProject from './AddProject'; // <== !!!

class ProjectList extends Component {
  state = { listOfProjects: [] }

  getAllProjects = () =>{
    axios.get(`http://localhost:5000/api/projects`)
    .then(responseFromApi => {
      this.setState({
        listOfProjects: responseFromApi.data
      })
    }, err => {
        console.log(err)
    })
  }

  componentDidMount() {
    this.getAllProjects();
  }

  render() {

    const projects = this.state.listOfProjects.map(project => {
        return (
            <div key={project._id}>
                <Link to={`/projects/${project._id}`}>
                    <h4>{project.title}</h4>
                </Link>
            </div>
        )
    })

    return (
        <div>
            <div>
                {projects}
            </div>
            <div>
                <hr />
                <AddProject getData={() => this.getAllProjects()} />
            </div>
        </div>
    )
}
}

export default ProjectList;
