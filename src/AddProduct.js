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
      <div className="container">
        <h3>Add Customer</h3>
        <form onSubmit={this.onSubmit}>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="name">Name:</label>
              <input className="form-control" placeholder="Name" ref={nameInput => this.nameInput = nameInput}/>
            </div>
            <div className="form-group col-md-6">
              <label for="price">Price:</label>
              <input className="form-control" placeholder="Price" ref={priceInput => this.priceInput = priceInput}/>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-3">
              <label for="telefone">Telefone:</label>
              <input className="form-control" placeholder="Telefone"/>
            </div>
            <div className="form-group col-md-4">
              <label for="endereco">Endereço:</label>
              <input className="form-control" placeholder="Endereco"/>
            </div>
            <div className="form-group col-md-4">
              <label for="bairro">Bairro:</label>
              <input className="form-control" placeholder="Bairro"/>
            </div>
            <div className="form-group col-md-1">
              <label for="numero">Número:</label>
              <input className="form-control" placeholder="Numero"/>
            </div>
          </div>
          <button className="btn btn-primary col-2">Add</button>
        </form>
        <hr />
      </div>
    );
  }
}

export default AddProduct;