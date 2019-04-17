import React, { Component } from 'react';
import './App.css';
import ProductItem from './ProductItem';
import AddProduct from './AddProduct';
import axios from 'axios'

const products = [
  {
    name:'iPad',
    price: '200'
  },
  {
    name:'iPhone',
    price: '650'
  }
];

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
    const title = 'Products Manager'; 

    return (
      <div className="App">
        <h1>{title}</h1>

        <AddProduct
          onAdd = {this.onAdd}
        />
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
    );
  }
}

export default App;
