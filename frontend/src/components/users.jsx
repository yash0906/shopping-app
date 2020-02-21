import React, { Component, useState }  from 'react'
import axios from 'axios'
import Navbar from './navbar'
import { Redirect } from 'react-router-dom'
class User extends Component{
    constructor(props) {
        super(props);
        this.state = {users: []}
    }
    componentDidMount() {
        axios.get('http://localhost:8080/users')
             .then(response => {
                 this.setState({users: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    handleVendor = (q) =>{
        if(q) return <td>True</td>
        else return <td>False</td>
    }
    redirect = () => {
        if(localStorage.getItem('loggedin') === 'false')
        {
            // this.setState({'qwe':this.state.qwe+1})
            
            return (<Redirect to='/' />)
        }
    }
    render(){
        // console.log(this.props)
        const { params } = this.props.match
        return(
            <div>
                <Navbar />
                <hr />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Vendor</th>
                    </tr>
                </thead>
                <tbody>
                { 
                    this.state.users.map((currentUser, i) => {
                        return (
                            <tr>
                                <td>{currentUser.username}</td>
                                <td>{currentUser.email}</td>
                                {this.handleVendor(currentUser.vendor)}
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            {this.redirect()}
        </div>
        )
    }
}
export default User