import React from 'react'
import {Link} from 'react-router-dom'
import AuthService from '../auth/auth-service'

 class Navbar extends React.Component {

    service = new AuthService();

    logoutUser = () =>{
        this.service.logout()
        .then(() => {
          this.props.getUser(null);  
        })
      }

    render() {
    return (
      <div>
        {this.props.user ? (
          <div>
            <p>Welcome {this.props.user.username}</p>
            <br />
            <Link to='/'>
                <button onClick={() => this.logoutUser()}>Logout</button>
            </Link>
          </div>
        ) : (
          <div> 
            <Link to="/signup">Signup</Link>
          </div>  
        )}
      </div>
    );
}
}

export default Navbar