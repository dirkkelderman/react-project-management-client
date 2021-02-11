import React, { Component } from 'react'
import axios from 'axios'

export class AddProject extends Component {

    state = {
        title: '',
        description: '',
        status: ''
    }

    handleFormSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:5000/api/projects', {
            title: this.state.title,
            description: this.state.description,
        }, {withCredentials: true})
        .then( (res) => {
                this.props.getData();
                    this.setState({
                        title: '',
                        description: '',
                        status: 'Your project is created'
                    })
                }, (err) => {
                    console.log(err)
                    this.setState({
                        status: 'Oops, something wrong'
                    })
                })
        
        // fetch('http://localhost:5000/api/projects', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type' : 'application/json',
        //     },
        //     body: JSON.stringify(this.state)
        // })
        // .then( res => res.json() )
        // .then( (res) => {
        //     console.log("Request succesfull")
        //     console.log(res)
        // }, (err) => {
        //     console.log("Error!")
        //     console.log(err)
        // })

    }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
   
    render(){
      return(
        <div>
        {
            this.state.status !== '' ? <div>{this.state.status}</div> : null
        }
          <form onSubmit={this.handleFormSubmit}>
            <label>Title:</label>
            <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
            <label>Description:</label>
            <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
            
            <input type="submit" value="Submit" />
          </form>
        </div>
      )
    }
}

export default AddProject
