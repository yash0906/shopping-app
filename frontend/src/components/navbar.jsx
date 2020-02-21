import React, { Component }  from 'react'
import { NavLink, Redirect } from 'react-router-dom'
class Navbar extends Component {
    state = {
        logout: false,

    }
    
    handleLogout = () =>{
        localStorage.setItem('loggedin', false)
        console.log('qeqweqweq')
        this.setState({logout:true})
    }
    showLoggedInUser = () =>{
        // console.log("navbar")
        if(localStorage.getItem('loggedin') === 'true')
        {
        return (
                <div className="row px-5">
                <li className="text-white px-5 pt-2 text-capitalize font-weight-bold">Logged in as {localStorage.getItem('username')}</li>
                <button onClick={this.handleLogout} className='btn btn-primary'>Logout</button>
                </div>
                )
        }
        // else{
        //     return <Redirect to='/' />
        // }

    }
    redirect = () => {
        if(this.state.logout)
        return <Redirect to='/' />
    }
    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">ShopaHolic</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li className="nav-item"><NavLink className="nav-link" to='/'>Home</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" to='/register'>Register</NavLink></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            {/* <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
                            <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li> */}
                            {this.showLoggedInUser()}
                        </ul>

                    </div>
                </nav>
                {this.redirect()}
            </div>
        )
    }
}
export default Navbar