import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
      products: []
    };
  }

  componentWillMount(){
    this.getProducts();
  }

  getProducts(){
    const products = JSON.parse(localStorage.getItem('products'));
    this.setState({ products });
  }

  render() {
    const title = 'Products Manager'; 

    return (
      <div className="App">
        <h1>{title}</h1>

        {
          this.state.products.map(product => {
            return(
              <div key={product.name}>
                <span>{product.name}</span> 
                {' | '} 
                <span>{product.price}</span>
                {' | '} 
                <button>Delete</button>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default App;
