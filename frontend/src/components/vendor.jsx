import React, { Component } from 'react'
import Waiting from './waiting'
import Dispatch from './dispatch'
import Dispatched from './dispatched'
import { Button } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Navbar from './navbar'
import  FormData from 'form-data'
class Vendor extends Component{
    state = {
        products: [ ],
        addnew: false,
        sortPrice: false,
        sortQty: false,
        dum_products : [],
        file:'',
    }
    
    componentDidMount() {
        console.log("com")
        // window.location.reload(false);
        const id = localStorage.getItem('id')
        axios.get('http://localhost:8080/products/specific/' + id)
             .then(response => {
                 this.setState({products: response.data});
                 this.setState({dum_products:response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    addHandler = () => {
        // console.log("Asda")
        this.setState({addnew : true})  
    }
    handleSubmit = (event) => {
        event.preventDefault()
        // alert(this.refs.price)
        console.log(this.refs.name.value,this.refs.price.value,this.refs.qty.value,this.state.file)
        this.setState({addnew: false})
        const newid = this.state.products.length
        const newProduct = {
            id : localStorage.getItem('id'),
            name : this.refs.name.value,
            price : this.refs.price.value,
            qty : this.refs.qty.value,
            seller_name: localStorage.getItem('username')
        }
        let data = new FormData()
        data.append('productImage',this.state.file)
        data.append('id' , localStorage.getItem('id'))
        data.append('name' , this.refs.name.value)
        data.append('price' , this.refs.price.value)
        data.append('qty' , this.refs.qty.value)
        data.append('seller_name', localStorage.getItem('username'))
        console.log(data)
        axios.post('http://localhost:8080/products', data)
        .then(res => console.log(res))
        this.componentDidMount();
        
    }
    handleFile = (e) => {
        console.log(e.target.files)
        this.setState({file:e.target.files[0]})
    }
    redirect = () =>
    {
        if(this.state.addnew){
            return (
                <div>
                    
                <form  className="container-sm p-3 my-3 border w-50" onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label>Product Name </label>
                        <input placeholder='Enter product name' type='text' name='name' ref='name'/>
                    </div>
                    <div className='form-group'>
                    <label>Price</label>
                        <input placeholder='Price of a Bundle' type='number' name='price' ref='price'/>
                    </div>
                    <div className='form-group'>
                    <label>Quantity </label>
                        <input placeholder='Quantity in the Bundle' type='number' name='qty' ref='qty'/>
                    </div>
                    <div className='form-group'>
                    <label>Upload Image </label>
                        <input placeholder='choose a file...' type='file' name='file' onChange={this.handleFile}/>
                    </div>
            <input type='submit' value="Submit" className='btn btn-primary'/>
                <hr />
                </form>
                </div>
                
                )
        }
    }
    deleteHandler = (id) =>{
        // console.log("delte pressed", id)
        
        axios.patch('http://localhost:8080/orders/cancel/' + id)
        .then(res => console.log(res))

        axios.delete('http://localhost:8080/products/' + id)
        .then(res => console.log(res))
        
        // const list = this.state.products.filter(c => c.id != id)
        // this.setState({products: list})
    }
    dispatchHandler = (id) => {
        console.log("sdfsdf")
        axios.patch('http://localhost:8080/orders/dispatch/' + id)
        .then(res => console.log(res.data))

        axios.patch('http://localhost:8080/products/dispatch/' + id)
        .then(res => console.log(res.data))
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
    
    redirectt = () => {
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
            <div className='container'>
                <div>
                {this.redirect()}
                <button onClick={this.addHandler} className='btn btn-primary btn-sm m-2'>Add a new Product</button>
                </div>

            </div>
            <div className='text-center'>
            <h3 className='text-center'>Waiting...</h3>
                <div className='align-self-center'>
                    
                    {this.state.products.map(product => {if((product.qty_remaining)>0){return <Waiting product={product} ondelete={this.deleteHandler}/>
                    }})}
                </div>
                <hr />
                <h3 className='text-center'>Ready to Dispatch...</h3>

                <div className='align-self-center'>
                    {this.state.products.map(product => {if(product.qty_remaining===0 && !product.dispatched){return <Dispatch product={product} ondispatch={this.dispatchHandler}/>}})}
                
                </div>
                <hr />
                <h3 className='text-center'>Dispatched...</h3>

                <div className='align-self-center'>
                    {this.state.products.map(product => {if(product.dispatched){return <Dispatched product={product}/>}})}

                </div>
                
            </div>
            {this.redirectt()}
            </div>
        )
    }
}
export default Vendor