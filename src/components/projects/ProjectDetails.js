import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditProject from './EditProject'
import AddTask from '../tasks/AddTask'
 
class ProjectDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
      title: "",
      description: "",
      _id:'',
      owner: ""
    }
  }
 
  componentDidMount(){
      this.getSingleProject();
  }
 
  getSingleProject = () => {
      const { params } = this.props.match;
      axios.get(`http://localhost:5000/api/projects/${params.id}`, {withCredentials: true})
      .then( responseFromApi =>{

          const {title, description, owner, _id} = responseFromApi.data;
          this.setState({
              title: title,
              description: description,
              _id: _id,
              owner: owner
          });
      })
      .catch((err)=>{
          console.log(err)
      })
  }
 
  renderEditForm = () => {
    if(!this.state.title){
      this.getSingleProject();
    } else {
    //  {...props} => so we can have 'this.props.history' in Edit.js                                                                                       |
      return <EditProject theProject={this.state} getTheProject={this.getSingleProject} {...this.props} />
        
    }
  }
  
  deleteProject = () => {
    const { params } = this.props.match;
    axios.delete(`http://localhost:5000/api/projects/${params.id}`, {withCredentials: true})
    .then( () =>{
        this.props.history.push('/'); // !!!         
    }, (err)=>{
        console.log(err)
    })
  }

  renderAddTaskForm = () => {
    if(!this.state.title){
        this.getSingleProject();
      } else {     
                // pass the project and method getSingleProject() as a props down to AddTask component
        return <AddTask theProject={this.state} getTheProject={this.getSingleProject} />
      }
  }


  render(){
    return(
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>

        {
          this.state.title !== "" && this.props.user && this.props.user._id === this.state.owner ? 

          <div>
            { this.state.tasks && this.state.tasks.length > 0 && <h3>Tasks </h3> }
                    { this.state.tasks && this.state.tasks.map((task, index) => {
                        return(
                            <div key={ index }>
                                <Link to={`/projects/${this.state._id}/tasks/${task._id}`}> 
                                    { task.title }
                                </Link>
                            </div>
                        )
                        
                    }) }
                    <div>{this.renderEditForm()} </div>
                    <button onClick={() => this.deleteProject()}>Delete project</button> {/* <== !!! */}
                    <br/>
                    <div>{this.renderAddTaskForm()} </div>
                    <br/><br/><br/><br/><br/>
          </div>
          : null
        }


        
        <Link to={'/'}>Back home</Link>
      </div>
    )
  }
}

 
export default ProjectDetails;