import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar(props) {
    return (
      <div>
        {props.user ? (
          <div>
            <p>Welcome {props.user.username}</p>
            <br />
            <Link to="/projects">Projects</Link>
          </div>
        ) : (
          <div> 
            <Link to="/signup">Signup</Link>
          </div>  
        )}
      </div>
    );
}
