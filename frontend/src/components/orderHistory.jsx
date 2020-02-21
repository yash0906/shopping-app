import React , { Component } from 'react'
import axios from 'axios'
import History from './historyTemplate'
import Navbar from './navbar'
import { Redirect } from 'react-router-dom'
class OrderHistory extends Component{
    state = {
        orders: [],
        b:false,
    }
    componentDidMount(){
        const user = localStorage.getItem('id')
        axios.get('http://localhost:8080/orders/' + user)
        .then(res => {console.log(res);this.setState({orders:res.data})})
    }
    redirect = () => {
        if(localStorage.getItem('loggedin') === 'false')
        {
            // this.setState({'qwe':this.state.qwe+1})
            
            return (<Redirect to='/' />)
        }
    }
    backHandler = () =>{
        this.setState({b:true})
    } 
    back = () =>{
        if(this.state.b)
        return <Redirect to='/customer' />
    }
    render(){
        return(
            <div>
                <Navbar />
                <hr />
                {this.back()}
                <button className="btn btn-danger mb-3" onClick={this.backHandler}>Back</button>
                {this.state.orders.map(order => <History key={order._id} order={order} />)}
                {this.redirect()}
            </div>

        )
    }
    
}

export default OrderHistory