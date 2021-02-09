import './App.css';
import ProjectList from './components/projects/ProjectList'
import {Switch, Route} from 'react-router-dom'
import ProjectDetails from './components/projects/ProjectDetails';
import AddProject from './components/projects/AddProject';
import TaskDetails from './components/tasks/TaskDetails'

function App() {
  return (
    <div className="App">
    <Switch>
      {/* <Route path='/' component={AddProject} /> */}
      <Route exact path='/projects' component={ProjectList} />
      <Route exact path='/projects/:id' component={ProjectDetails} />
      <Route exact path="/projects/:id/tasks/:taskId" component={TaskDetails} /> {/* <== !!! */}

    </Switch>
    </div>
  );
}

export default App;
