import React, { Component } from 'react'
import axios from 'axios'

class ShowUsers extends Component{
    componentDidMount(){
        axios.get('http://localhost:4000/users')
            .then(res => {console.log("hello there")})
            .catch(err => {console.log(err)})
    }
    
    render(){
        return(
            <div>
            <ul>
                <li>hello world</li>
            </ul>
            </div>
        )
    }
}

export default ShowUsers