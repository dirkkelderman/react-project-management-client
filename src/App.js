import React, { Component } from 'react';
import './App.css';
import ProjectList from './components/projects/ProjectList'
import {Switch, Route, Redirect} from 'react-router-dom'
import ProjectDetails from './components/projects/ProjectDetails';
import TaskDetails from './components/tasks/TaskDetails'
import Signup from './components/auth/Signup';
import Navbar from './components/navbar/Navbar'
import Login from './components/auth/Login'
import ProtectedRoute from './components/auth/protected-route'

class App extends React.Component {
  
  state = { loggedInUser: null }
 
  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }



  render(){
  return (
    <div className="App">
    <Navbar user={this.state.loggedInUser} getUser={this.getTheUser}/>
    
    <Switch>

      <ProtectedRoute 
        user={this.state.loggedInUser} 
        exact path='/' 
        component={ProjectList} 
        />

      <ProtectedRoute 
        user={this.state.loggedInUser} 
        path='/projects/:id' 
        component={ProjectDetails} 
        />

      <Route exact path='/signup' render={(props) => <Signup {...props} getUser={this.getTheUser}/>}/>

      <Route exact path='/login' render={(props) => <Login {...props} getUser={this.getTheUser}/>}/>

      {/* <Route exact path='/projects'> 
        {this.state.loggedInUser ? <ProjectList/> : <Redirect to='/' /> }
      </Route> */}
      
      {/* <Route exact path="/projects/:id" render={ (props) => { 
        return this.state.loggedInUser ? 
        <ProjectDetails {...props} user={this.state.loggedInUser} /> :
        <Redirect to='/' />
      }} />    */}
      
      <Route exact path="/projects/:id/tasks/:taskId" component={TaskDetails} /> 

    </Switch>
    </div>
  );
}
}

export default App;
