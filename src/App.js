import React, { Component } from 'react';
import './App.css';
import ProductItem from './ProductItem';
import AddProduct from './AddProduct';
import axios from 'axios'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const customers = [];

const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 600, pv: 2300, amt: 2400},
  {name: 'Page C', uv: 450, pv: 2800, amt: 2400},
  {name: 'Page C', uv: 500, pv: 2800, amt: 2400}];

class App extends Component {
  constructor(props){
    super(props);

    let customers = [];

    this.state = {
      customers: customers
    };

    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.filterByName = this.filterByName.bind(this);
  }

  componentWillMount(){
    const customers = this.getCustomers();
    this.setState({ customers });
  }

  getCustomers(){
    axios.get('http://localhost:3000/customers')
    .then(response => this.setState({ customers: response.data }));
  }

  onDelete(id){
    axios.delete(`http://localhost:3000/customers/${id}`)
    .then(res => {
      console.log(res.data);
      this.getCustomers();
      //this.setState({ customers });
    })

  }

  onAdd(customer) {
    axios.post('http://localhost:3000/customers',customer)
    .then(res => {
      console.log(res.data);
      this.getCustomers();
      //this.setState({ customers });
    });
  }

  onEditSubmit(customer, id) {
    axios.put(`http://localhost:3000/customers/${id}`, customer)
    .then(res => {
      console.log(res.data);
      this.getCustomers();
    });
  }

  filterByName(event) {
    let filterBy = event.target.value.toLowerCase();
    axios.get('http://localhost:3000/customers?name_like=' + filterBy)
    .then(response => this.setState({ customers: response.data }));
  }


  render() {
    const title = 'Customer Manager';

    return (
      <div className="App">
        <h1 className="alert alert-info">{title}</h1>

        <AddProduct
          onAdd = {this.onAdd}
        />
        <div className="container">
          <div className="row">
            <div className="col-sm alert alert-info">Customer List</div>
          </div>

          <div className="container">
            <div className="input-group mb-4">
              <div class="input-group-prepend">
                <div class="input-group-text">Filter by name: </div>
              </div>
              <input type="text" id="filter"
                   onChange={this.filterByName}
                   ref={filter => this.filter = filter}
                   placeholder="Digite o nome"
                   className="form-control"/>
            </div>
          </div>

          {
            this.state.customers ? this.state.customers.map(customer => {
              return(
                <ProductItem
                  key={customer.name}
                  name={customer.name}
                  email={customer.email}
                  id={customer.id}
                  customerItem={customer}
                  onDelete={this.onDelete}
                  onEditSubmit={this.onEditSubmit}
                />
              );
            }) : <p>Não tem nada</p>
          }
        </div>

        <div className="container">
          <div className="row mt-3">
            <div className="col-sm alert alert-info">Order numbers chart</div>
          </div>
        </div>
        <LineChart width={600} height={300} data={data} margin={{ top: 35, right: 60, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    );
  }
}

export default App;
