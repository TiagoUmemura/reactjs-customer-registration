import React, { Component } from 'react';
import './App.css';
import ProductItem from './ProductItem';
import AddProduct from './AddProduct';
import axios from 'axios'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Pagination, Table } from 'antd';

const columns = [{
  title: 'Nome',
  dataIndex: 'name',
  key: 'id',
}, {
  title: 'Email',
  dataIndex: 'email',
  key: 'email',
}];

const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 600, pv: 2300, amt: 2400},
  {name: 'Page C', uv: 450, pv: 2800, amt: 2400},
  {name: 'Page D', uv: 500, pv: 2800, amt: 2400}];

class App extends Component {
  constructor(props){
    super(props);

    let customers = [];

    this.state = {
      customers: customers,
      perPage: 2
    };

    this.getCustomers();

    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.filterByName = this.filterByName.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

  componentWillMount(){
    const customers = this.getCustomers();
    this.setState({ customers });
  }

  getCustomers(page = 1, limit = this.state.perPage) {
    axios.get(`http://localhost:3000/customers`)
    .then(response => this.setState(() => {
      return {
        totalPage: response.data.length
      }
    }, () => axios.get(`http://localhost:3000/customers?_page=${page}&_limit=${limit}`)
    .then(result => this.setState({customers: result.data}))
    ))
  }

  onDelete(id){
    axios.delete(`http://localhost:3000/customers/${id}`)
    .then(res => {
      this.getCustomers();
    })

  }

  onAdd(customer) {
    axios.post('http://localhost:3000/customers',customer)
    .then(res => {
      this.getCustomers();
    });
  }

  onEditSubmit(customer, id) {
    axios.put(`http://localhost:3000/customers/${id}`, customer)
    .then(res => {
      this.getCustomers();
    });
  }

  filterByName(event) {
    let filterBy = event.target.value.toLowerCase();

    axios.get(`http://localhost:3000/customers?name_like=${filterBy}`)
    .then(response => this.setState(() => {
          return {
            totalPage: response.data.length
          }
        }, () => axios.get(`http://localhost:3000/customers?name_like=${filterBy}&_page=1&_limit=${this.state.perPage}`)
        .then(result => this.setState({customers: result.data}))
    ))

  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }


  handlePageClick = (page, pageSize) => {

      axios.get(`http://localhost:3000/customers?_page=${page}&_limit=${pageSize}`)
      .then(response => this.setState({
            customers: response.data,
            current: page
          }
      ));

  };

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
              <div className="input-group-prepend">
                <div className="input-group-text">Filter by name: </div>
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
          <br/>
          <Pagination
              onChange={this.handlePageClick}
              total={this.state.totalPage}
              pageSize={this.state.perPage}
              current={this.state.current || 1}
              defaultCurrent={1}
          />
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
