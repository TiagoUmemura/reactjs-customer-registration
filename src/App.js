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

  onDelete(name){
    const products = this.getProducts();

    const filteredProducts = products.filter(product =>{
      return product.name !== name;
    });

    this.setState({ products: filteredProducts});
    console.log(filteredProducts);
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
  onEditSubmit(name, price, originalName){
    let products = this.getProducts();

    //search for the product name and change attributes (name and price) for product that matches the name product
    products = products.map(product => {
      if(product.name === originalName){
        product.name = name;
        product.price = price;
      }

      return product;
    })

    this.setState({ products });
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
