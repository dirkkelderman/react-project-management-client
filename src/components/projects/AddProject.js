import React, { Component } from 'react'
import axios from 'axios'

export class AddProject extends Component {

    state = {
        title: '',
        description: '',
        status: '',
        imageUrl: '',
    }

    handleFormSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:5000/api/projects', {
            title: this.state.title,
            description: this.state.description,
            imageUrl: this.state.imageUrl
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

    handleFileUpload = (event) => {
        //console.log("The file to be uploaded is: ", event.target.files[0]);
        const uploadData = new FormData();
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new thing in '/api/projects' POST route
        uploadData.append("imageUrl", event.target.files[0]);
        axios.post('http://localhost:5000/api/upload', uploadData)
          .then(response => {
            // response.image_url --> this must be the same name than the property we receive from the api
            // if it doesn't work, try to console.log response we get from the api ;)
            console.log('response from the api: ', response);
            this.setState({ imageUrl: response.data.image_url });
          })
          .catch(err => {
            console.log("Error while uploading the file: ", err);
          });
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
            
            <label>Project Image</label>
            <input type='file' onChange={(e) => this.handleFileUpload(e)} />

            <input type="submit" value="Submit" />
          </form>
        </div>
      )
    }
}

export default AddProject
