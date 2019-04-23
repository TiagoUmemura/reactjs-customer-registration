import React, { Component } from 'react';
import './App.css';
import ProductItem from './ProductItem';
import AddProduct from './AddProduct';
import axios from 'axios'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const products = [];

const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 600, pv: 2300, amt: 2400},
  {name: 'Page C', uv: 450, pv: 2800, amt: 2400},
  {name: 'Page C', uv: 500, pv: 2800, amt: 2400}];

localStorage.setItem('products', JSON.stringify(products));

class App extends Component {
  constructor(props){
    super(props);

    let products = [];

    axios.get('http://localhost:3000/products')
    .then(response => products = response.data);

    this.state = {
      products: products
    };

    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  componentWillMount(){
    const products = this.getProducts();

    this.setState({ products });

  }

  getProducts(){
    axios.get('http://localhost:3000/products')
    .then(response => this.setState({ products: response.data }));
    return this.state.products;
  }

  onDelete(id){

    axios.delete(`http://localhost:3000/products/${id}`)
    .then(res => {
      console.log(res.data);
      const products = this.getProducts();
      this.setState({ products });
    })

  }

  onAdd(name, price) {
    let product = {};
    product.name = name;
    product.price = price;

    axios.post('http://localhost:3000/products', product)
    .then(res => {
      console.log(res.data);
      let products = this.getProducts();
      this.setState({ products });
    });
  }

  //originalName is the parameter to search the modified product
  onEditSubmit(name, price, id){
    let product = {};
    product.name = name;
    product.price = price;
    product.id = id;

    axios.put(`http://localhost:3000/products/${id}`, product)
    .then(res => {
      console.log(res.data);
      let products = this.getProducts();
      this.setState({ products });
    });
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
            <div className="col-sm alert alert-info">Product List</div>
          </div>

          {
            this.state.products.map(product => {
              return(
                <ProductItem
                  key={product.name}
                  name={product.name}
                  price={product.price}
                  id={product.id}
                  onDelete={this.onDelete}
                  onEditSubmit={this.onEditSubmit}
                />
              );
            })
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
