import React, { Component } from 'react'
import axios from 'axios'
import StarRatings from 'react-star-ratings'
import Navbar from './navbar'
import { Redirect } from 'react-router-dom'
class BuyItem extends Component{
    state = {
        product: [],
        sub: false,
        qty: '',
        status: 0,
        b:false,
        ven_review : [],
    }
    componentDidMount(){
        const id = localStorage.getItem('product_id')
        axios.get('http://localhost:8080/products/'+ id)
        .then(response => {
        console.log(response.data)
        this.setState({product: response.data})
        
        axios.get('http://localhost:8080/users/' + response.data.seller_id)
        .then(res => this.setState({ven_review:res.data.review}))
        .catch(err => console.log(err) )
        
        })
        .catch(function(error){
            console.log(error)
        })

        

        
    }
    handleSubmit = (event) => {
        // event.preventDefault();
        this.setState({sub: true})
        const id = this.state.product._id
        // console.log(this.state.qty)
        // console.log(parseInt(this.state.product.qty_remaining))
        if(parseInt(this.state.qty)<=parseInt(this.state.product.qty_remaining))
        {
        const qty={qty: this.state.product.qty_remaining-this.state.qty}
        axios.patch('http://localhost:8080/products/'+ id,qty)
        .then(res => console.log(res));
        if(qty.qty===0)
        {
            axios.patch('http://localhost:8080/orders/placed/'+ id)
            .then(res => console.log(res))
        }
        console.log("Order Successful")
        this.setState({status: 1})
        const newOrder = {
            user_id: localStorage.getItem('id'),
            product_name: this.state.product.name,
            product_id : id,
            qty: this.state.qty,
            seller_name: this.state.product.seller_name,
            seller_id : this.state.product.seller_id,
            qty_rem : qty.qty
        }
        axios.post('http://localhost:8080/orders',newOrder)
        .then(res => console.log(res))
        }
        else{
            console.log("decrease")
            this.setState({status: 2})
        }

        // alert("user entered : " + this.state.username + '\n' + "Password : " + this.state.password)
    }
    handleChangeQty = (e) =>{
        this.setState({qty: e.target.value})
    }
    showMessage = () =>{
        if(this.state.status===1)
        return <h3 className="text-success">Order Placed Successfully,Thanks for Ordering!!</h3>
        else if(this.state.status===2)
        return <h3 className="text-danger">Your Order Quantity should be less than the {this.state.product.qty_remaining}.</h3>
    }
    redirect = () => {
        if(localStorage.getItem('loggedin') === 'false')
        {
            // this.setState({'qwe':this.state.qwe+1})
            
            return (<Redirect to='/' />)
        }
    }
    backHandler = () => {
        this.setState({b:true})
    }
    back = () =>{
        if(this.state.b)
        return <Redirect to='/customer' />
    }
    showVendorReviews = () =>
    {
        if(this.state.ven_review.length!=0)
        {
            return <div class ="container border">
                <h3>Vendor Reviews :-</h3>
            {this.state.ven_review.map(rev => <h3><span className="text-success">{rev.username}</span> : {rev.msg}</h3>)}
            </div>
        }
    }
    render(){
        return(
            <div>
                <Navbar />
                <hr />
            <div className="container">
                {this.back()}
                <button className="btn btn-danger mb-3" onClick={this.backHandler}>Back</button>
            <h3>Product Description</h3>
            <table className="table table-hover">
                <tr>
                    <td>Name</td>
                    <td>{this.state.product.name}</td>
                </tr>
                <tr>
                    <td>Price of Bundle</td>
                    <td>{this.state.product.price}</td>
                </tr>
                <tr>
                    <td>Quantity of Bundle</td>
                    <td>{this.state.product.qty}</td>
                </tr>
                <tr>
                    <td>Seller</td>
                    <td>{this.state.product.seller_name}</td>
                </tr>
                <tr>
                    <td>Quantity remaining</td>
                    <td>{this.state.product.qty_remaining}</td>
                </tr>
                <tr>
                    <td colSpan='2'><StarRatings
                            rating={this.state.product.rating}
                            starRatedColor="blue"
                            // changeRating={this.changeRating}
                            numberOfStars={5}
                            name='rating'
                        /></td>
                </tr>
            </table>
            <form onSubmit={this.handleSubmit}>
            <div className={'form-group' + (this.state.sub && !this.state.qty ? ' has-danger' : '')}>
            <label>Enter Quantity</label>
            <input className="form-control" type='number' min='1' value={this.state.qty} onChange={this.handleChangeQty}/>
            {this.state.sub && !this.state.qty &&
            <div className="text-danger">Minimum quantity 1 is required</div>}
            
            </div>
            <div className='form-group'>
            <input type='submit' value="Buy Item" className='btn btn-primary'/>
            </div>
            </form>
            {this.showMessage()}
            {this.showVendorReviews()}
            
            </div>
            {this.redirect()}
            </div>

        )
    }
}
export default BuyItem