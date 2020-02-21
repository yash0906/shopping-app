import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import axios from 'axios'
import Navbar from './navbar'
class Register extends Component{
    state= {
        username: '',
        password: '',
        email: '',
        vendor: false,
        sub: false,
        re: false,
    }
    handleChangeU = (event) => {
        this.setState({username: event.target.value})
        // console.log(this.state.value)
    }
    handleChangeP = (event) => {
        this.setState({password: event.target.value})
        // console.log(this.state.value)
    }
    handleChangeE = (event) => {
        this.setState({email: event.target.value})
        // console.log(this.state.value)
    }
    handleChangeT = (event) => {
        if(this.state.vendor)
        this.setState({vendor: false})
        else
        this.setState({vendor: true})
        // console.log(this.state.value)
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({sub: true})
        const newUser = {
            username : this.state.username,
            pwd : this.state.password,
            email: this.state.email,
            vendor: this.state.vendor,
        }
        console.log(newUser)
        if(newUser.username && newUser.pwd && newUser.email)
        {
        axios.post('http://localhost:8080/users', newUser)
        .then(res => console.log(res));
        this.setState({re:true})
        }

        // alert("user entered : " + this.state.username + '\n' + "Password : " + this.state.password)
    }
    redirect = () => 
    {
        if(this.state.re)        
        {  
        return (<Redirect to='/' />)
        }
    }
    render(){
        return (
            <div><Navbar />
            <hr />
        <div className='col-md-6 col-md-offset-3'>
            <h2>Register</h2>
        <form name="form" onSubmit={this.handleSubmit}>
            <div className={'form-group' + (this.state.sub && !this.state.email ? ' has-danger' : '')}>
            <label htmlFor="email">Email</label>
            <input placeholder='Enter email' className="form-control" type='text' value={this.state.email} onChange={this.handleChangeE}/>
            {this.state.sub && !this.state.email &&
                            <div className="text-danger">Email is required</div>
                        }
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className={'form-group' + (this.state.sub && !this.state.username ? ' has-danger' : '')}>
            
            <label htmlFor="username">Username </label>
            <input placeholder='Username' className="form-control" type='text' value={this.state.username} onChange={this.handleChangeU}/>
            {this.state.sub && !this.state.username &&
                            <div className="text-danger">Username is required</div>
                        }
            </div>
            <div className={'form-group' + (this.state.sub && !this.state.password ? ' has-danger' : '')}>
            <label htmlFor="password">Password </label>
                <input placeholder='Password' className="form-control" type='password' value={this.state.password} onChange={this.handleChangeP}/>
                {this.state.sub && !this.state.password &&
                            <div className="text-danger">Password is required</div>
                        }
            </div>
            <div className="ui checkbox form-group">
                <input type="checkbox" className="hidden" value={this.state.type} onChange={this.handleChangeT}/>
                <label htmlFor="checkbox">I'm a Vendor</label>
            </div>
            <div className='form-group'>
            <input type='submit' value="Register" className='btn btn-primary'/>
            <NavLink to='/' className="btn btn-link">Cancel</NavLink>
            </div>
        </form>
        {this.redirect()}
        </div>
        </div>)

    }
}
export default Register