import React, { Component } from 'react';

class AddProduct extends Component {
  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event){
    event.preventDefault();//prevent page from refreshing

    this.props.onAdd(this.nameInput.value, this.priceInput.value);

    this.nameInput.value = '';
    this.priceInput.value = '';
  }

  render() {

    return (
      <form onSubmit={this.onSubmit}>
        <div className="container">
        <h3>Add Product</h3>
        <div className="form-row">
          <input className="form-control col-5" placeholder="Name" ref={nameInput => this.nameInput = nameInput}/>
          <input className="form-control col-5" placeholder="Price" ref={priceInput => this.priceInput = priceInput}/>
          <button className="btn btn-primary col-2">Add</button>
        </div>
        </div>
        <hr />
      </form>
    );
  }
}

export default AddProduct;