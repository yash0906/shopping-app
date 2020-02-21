import React, {Component} from 'react';
import axios from 'axios';


export default class PersonalProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {users: []}
    }
    componentDidMount() {
        axios.post('http://localhost:4000/find_personal_products_of_vendors',
        {
            username: localStorage.getItem('gotname')
        })
             .then(response => {
                 this.setState({users: response.data});
// console.log("hbdsihvbdjcbajd");

             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    handleClick(id) {
        console.log(id)
        axios.delete('http://localhost:4000/dispatch_item/' + id)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        
      }
    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Orders</th>
                            <th>Dispatch</th>
                            {/* <th>Vendor Name</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.users.map((currentUser, i) => {
                            return (
                                <tr>
                                    <td>{currentUser.product_name}</td>
                                    <td>{currentUser.price}</td>
                                    <td>{currentUser.quantity}</td>
                                    <td>{currentUser.quantity}</td>
                                    {/* <button type="button" class="btn">Dispatch</button> */}
                                    <button onClick={() => this.handleClick(currentUser._id)} type="button" class="btn btn-warning">Dispatch Item</button>
                                    {/* <td>{currentUser.username}</td> */}
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}