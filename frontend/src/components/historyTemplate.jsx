import React, { Component } from 'react'
import StarRatings from 'react-star-ratings'
import axios from 'axios'
class History extends Component {
    state = {
        product:[],
        rating: '',
        product_review:'',
        vendor_review:'',
        newqty:'',
    }
    componentDidMount() {
        const id  = this.props.order.product_id
        axios.get('http://localhost:8080/products/' + id)
        .then(res => {this.setState({product:res.data});console.log(res.data)})
    }
    showQty = () => {
        if(this.props.order.status != 'Cancelled')
        return (<tr>
            <td>Quantity Remaining</td>
            <td>{this.state.product.qty_remaining}</td>
        </tr>)
    }
    handleRate = () =>{
        const rat ={
            rating: this.state.rating,
        }
        axios.patch('http://localhost:8080/products/rating/' + this.props.order.product_id, rat)
        .then(res => console.log(res.data))
        
        axios.patch('http://localhost:8080/orders/rating/' + this.props.order._id ,rat)
        .then(res => console.log(res.data))

        axios.patch('http://localhost:8080/users/rating/' + this.props.order.seller_id, rat)
        .then(res => console.log(res.data))

        this.setState({rating:''})
    }
    changeRating = (e) =>{
        this.setState({rating:e.target.value})
    }
    handleVendor = (e) =>{
        this.setState({vendor_review:e.target.value})
    }
    handleProduct = (e) =>{
        this.setState({product_review:e.target.value})

    }
    submitProduct = () => {
        console.log("Product")
        const rev = {
            username: localStorage.getItem('username'),
            msg: this.state.product_review,
        }
        console.log(rev)
        axios.patch('http://localhost:8080/products/review/' + this.props.order.product_id, rev)
        .then(res => console.log(res) )
        this.setState({product_review:''})
    }
    submitVendor = () => {
        console.log("Vendor")
        const rev = {
            username: localStorage.getItem('username'),
            msg: this.state.vendor_review,
        }
        console.log(rev)
        axios.patch('http://localhost:8080/users/review/' + this.props.order.seller_id, rev)
        .then(res => console.log(res) )
        this.setState({vendor_review:''})
    }
    showStatus = () =>
    {
        if(this.props.order.status==='Cancelled')
        return <span className="text-danger">Cancelled</span>
        else if(this.props.order.status==='Dispatched')
        return <span className="text-success">Dispatched</span>
        else
        return <span className="text-warning">{this.props.order.status}</span>
    }
    showRatRev = () =>{
        if(this.props.order.status==='Dispatched')
        return <React.Fragment><tr colSpan='2' className="w-100">
        {/* {this.showRatRev()} */}
        <td><button className="btn btn-primary" onClick={this.handleRate}>Rate</button>
            <input type='number' max='5' min='0' value={this.state.rating} onChange={this.changeRating}/>
        </td>
    </tr>
    <tr>
    <td><input type="text" placeholder="write comments here.." maxLength="30" value={this.state.product_review} onChange={this.handleProduct}/></td>
        <td><button className="btn btn-primary" onClick={this.submitProduct}>Review Product</button></td>
    </tr>
    <tr>
    <td><input type="text" placeholder="write comments here.." value={this.state.vendor_review} onChange={this.handleVendor}/></td>
        <td><button className="btn btn-primary" onClick={this.submitVendor}>Review Vendor</button></td>
    </tr>
    </React.Fragment>
    }
    changeQty = (e) => {
        this.setState({newqty: e.target.value})
    }
    changeOrder = () => {
        if(this.state.newqty > this.state.product.qty_remaining + this.props.order.qty)
        alert("Sorry,you can only order upto " + (this.state.product.qty_remaining + this.props.order.qty))
        else{
            const newRem = {
                qty: this.state.product.qty_remaining + this.props.order.qty - this.state.newqty
            }
            axios.patch('http://localhost:8080/products/' + this.state.product._id, newRem)
            .then(res => console.log(res))
            const newQty = {
                qty: this.state.newqty
            }
            axios.patch('http://localhost:8080/orders/' + this.props.order._id, newQty)
            .then(res => console.log(res))

            if(newRem.qty===0)
            {
                axios.patch('http://localhost:8080/orders/placed/' + this.state.product._id)
                .then(res => console.log(res))
            }
            this.componentDidMount()
            alert("Order Successfully Changed!")
        }
        this.setState({newqty:''})
    }
    editOrder = () => {
        if(this.props.order.status!='Dispatched' && this.props.order.status!='Cancelled')
        {
            return <React.Fragment><tr>
                <td><button className="btn btn-primary" onClick={this.changeOrder}>Edit Order</button></td>
                <td><input type='number' min='0' value={this.state.newqty} onChange={this.changeQty}/></td>
            </tr>
            </React.Fragment>
        }
    }
    render(){
        return(
            <div className="container row">
                <table className="table table-hover table-bordered">
                    <tr>
                        <td>Product</td>
                        <td>{this.props.order.product_name}</td>
                    </tr>
                    <tr>
                        <td>Seller</td>
                        <td>{this.props.order.seller_name}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>{this.showStatus()}</td>
                    </tr>
                    <tr>
                        <td>Amount Orderd</td>
                        <td>{this.props.order.qty}</td>
                    </tr>
                    {this.showQty()}
                    {this.showRatRev()}
                    {this.editOrder()}
                    
                    <tr >
                        <td colSpan='2'><StarRatings
                            rating={this.props.order.rating}
                            starRatedColor="blue"
                            // changeRating={this.changeRating}
                            numberOfStars={5}
                            name='rating'
                        /></td>
                        </tr>
                        
                </table>
            </div>
        )
    }
}
export default History