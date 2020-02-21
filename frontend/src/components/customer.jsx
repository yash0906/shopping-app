import React, { Component } from 'react'
import axios from 'axios'
import { render } from '@testing-library/react'
import Product from './productForCustomer'
import { Redirect } from 'react-router'
import Navbar from './navbar'
class Customer extends Component{
    state = {
        allProducts : [],
        toShowProducts : [],
        query : '',
        buy: 0,
        sortPrice: false,
        sortQty: false,
    }
    componentDidMount (){
        axios.get('http://localhost:8080/products')
             .then(response => {
                this.setState({allProducts: response.data});
                this.setState({toShowProducts: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    buyHandler = (id) => {
        localStorage.setItem('product_id', id)
        this.setState({buy: 1})
        return (<Redirect to='/buyitem'/>)
    }
    redirectHandler = () => {
        if(this.state.buy === 1)
        return <Redirect to='/buyitem' />
        else if(this.state.buy === 2)
        return <Redirect to='/orderhistory' />
    }
    handleChange = (e) => {
        this.setState({ query :e.target.value})
        const filteredData = this.state.allProducts.filter(element => {return element.name.toLowerCase().includes(e.target.value.toLowerCase())})
        this.setState({toShowProducts: filteredData})
    }
    historyHandler = () => {
        this.setState({buy: 2})
    }
    redirect = () => {
        if(localStorage.getItem('loggedin') === 'false')
        {
            // this.setState({'qwe':this.state.qwe+1})
            
            return (<Redirect to='/' />)
        }
    }
    SortpriceHandler = () =>{
        if(this.state.sortPrice)
        {this.setState({sortPrice:false})}
        else this.setState({sortPrice:true})
    }
    SortqtyHandler = () =>{
        if(this.state.sortQty)
        {this.setState({sortQty:false})}
        else this.setState({sortQty:true})
    }
    check = () => {

        if(this.state.sortPrice)
        {
        // console.log("fIrst")
            return(
        this.state.toShowProducts.sort((a,b) => (a.price-b.price))
        .map(product => {if((product.qty_remaining)>0){return <Product key={product._id} product={product} onclick={this.buyHandler} text="Buy" />}}))
        }
        else if(this.state.sortQty)
        {
            // console.log("second")
            return(this.state.toShowProducts.sort((a,b) => (a.qty_remaining-b.qty_remaining))
        .map(product => {if((product.qty_remaining)>0)return<Product key={product._id} product={product} onclick={this.buyHandler} text="Buy" />}))
        }
        else {
            // console.log("trhee")
            return (this.state.toShowProducts
            .map(product => {if((product.qty_remaining)>0)return<Product key={product._id} product={product} onclick={this.buyHandler}text="Buy" />}))
        }
        

    }
    render(){
        return(
            <div>
                <Navbar />
                <hr />
        <div className="container">
            <div className="sticky-top bg-light row p-3 m-9">
            <h3>Your Search Ends Here...</h3>
            <div className="custom-control custom-checkbox custom-control-inline mx-3">
  <input type="checkbox" className="custom-control-input" id="defaultInline1" onClick={this.SortpriceHandler}/>
  <label className="custom-control-label" for="defaultInline1">Sort by Price</label>
</div>

<div className="custom-control custom-checkbox custom-control-inline">
  <input type="checkbox" className="custom-control-input" id="defaultInline2" onClick={this.SortqtyHandler}/>
  <label className="custom-control-label" for="defaultInline2">Sort by Quantity</label>
</div>
            <div className='col m-2'>
            <button className="btn btn-primary float-right" onClick={this.historyHandler}>Order History</button>
            </div>
            <div className="row col-12 input-group">
                        <input className="form-control border-secondary py-2" type="search" value={this.state.query} onChange={this.handleChange}/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button">
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
            </div>
            </div>
            <div >
                {this.check()}
            {/* {
            this.state.toShowProducts
            .sort((a,b) => a.price-b.price)
            .map(product => <Product key={product._id} product={product} onclick={this.buyHandler} class="btn btn-success" text="Buy" />)} */}
            </div>
            {this.redirectHandler()}
        </div>
        {this.redirect()}
        </div>
        )
    }
}

export default Customer