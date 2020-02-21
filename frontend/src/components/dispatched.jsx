import React, { Component } from 'react'
import StarRatings from 'react-star-ratings'
class Dispatched extends Component { 
    state = {
        image : '',
        cls:'',
    }
    componentDidMount(){
        this.setState({image:'http://localhost:8080/' + this.props.product.productImage})
        if(this.props.product.productImage!='')
        this.setState({cls:'float-left'})
    }
    renderImage = () => {
        if(this.state.image!='http://localhost:8080/')
        {
            return (<div className="float-right">
        <img src={this.state.image} alt="image" className="img-rounded" style={{width: '120px', height:'120px'}}/>
        </div>)}
    }
    render(){
        return(
            <div class="row d-flex justify-content-center">
            <div className='p-3 my-3 border w-50'>
                {this.renderImage()}
                <div className={this.state.cls}>
                <h3>Product Name : {this.props.product.name}</h3>
                <h3>Price of a Bundle: {this.props.product.price}</h3>
                <h3>Quantity in a Bundle: {this.props.product.qty}</h3>
                {/* <h3>Quantity Remaining: {this.props.product.qty_remaining}</h3> */}
                <h6><StarRatings
                            rating={this.props.product.rating}
                            starRatedColor="blue"
                            numberOfStars={5}
                            name='rating'
                /></h6>
                {/* <button className="btn btn-danger" onClick={ () => this.props.ondelete(this.props.product._id)}>Remove</button> */}
                {/* <button className="btn btn-success float-right" onClick={() => this.props.ondispatch(this.props.product._id)}>Dispatch</button> */}
            </div>
            <div class ="container border">
                {this.props.product.review.map(rev => <h3><span className="text-success">{rev.username}</span> : {rev.msg}</h3>)}
                </div>
            </div>
            
            </div>
        )
    }
}
export default Dispatched