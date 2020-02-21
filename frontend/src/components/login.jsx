import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import axios from 'axios'
import Navbar from './navbar'
class Login extends Component{
    state= {
        username: '',
        password: '',
        email: '',
        info : null,
        credential: 0,
    }
    
    handleChangeU = (event) => {
        this.setState({username: event.target.value})
        // console.log(this.state.value)
    }
    handleChangeP = (event) => {
        this.setState({password: event.target.value})
        // console.log(this.state.value)
    }
    checkCredentials = () => {
        if(this.state.credential === 1)
        {
            return(
                <div className="text-danger">
                    Invalid Credentials.Please check your username or password!
                </div>
            )
        }
        else if(this.state.credential != 0){
            if(localStorage.getItem('vendor') === 'true')
            return <Redirect to='/vendor' />
            else return <Redirect to='/customer' />
        }
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        const infoUser = {
            username : this.state.username,
            pwd : this.state.password,
        }
        // localStorage.setItem('username',infoUser.username)
        // localStorage.setItem('loggedin',true)
        axios.post('http://localhost:8080/users/check', infoUser)
        .then(res => {
            this.setState({info: res.data})
            if(res.data){
                console.log(res.data)
                localStorage.setItem('username', res.data.username)
                localStorage.setItem('loggedin', true)
                localStorage.setItem('id', res.data._id)
                localStorage.setItem('vendor', res.data.vendor)
                this.setState({credential: 2})
            }
            else{
                console.log("check ")
                this.setState({credential: 1})
            }    
        })
        // alert("user entered : " + this.state.username + '\n' + "Password : " + this.state.password)
        // console.log(this.state.info)
    }
    redirect = () => {
        if(localStorage.getItem('loggedin') === 'false')
        {
            // this.setState({'qwe':this.state.qwe+1})
            
            return (<Redirect to='/' />)
        }
    }
    render(){
        return (
            <div>
                <Navbar />
                <hr />
        <div className='col-md-6 col-md-offset-3'>
            <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
            <label htmlFor="username">Username</label>
            <input placeholder='Username' className="form-control" type='text' value={this.state.username} onChange={this.handleChangeU}/>
            
            </div>
            <div className='form-group'>
            <label htmlFor="password">Password</label>
            <input placeholder='Password' className="form-control" type='password' value={this.state.password} onChange={this.handleChangeP}/>
            </div>
            <div className='form-group'>
            <input type='submit' value="Login" className='btn btn-primary'/>
            <NavLink to="/register" className="btn btn-link">Register</NavLink>
            </div>
        </form>
        {this.checkCredentials()}
        </div>
        {this.redirect()}
        </div>)
    }
}
export default Login