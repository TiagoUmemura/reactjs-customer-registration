import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProductItem from './ProductItem';
import AddProduct from './AddProduct';

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

    this.state = {
      products: JSON.parse(localStorage.getItem('products'))
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
    const products = this.getProducts();

    products.push({name, price});

    this.setState({ products });
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
