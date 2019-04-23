import React, { Component } from 'react';

class AddProduct extends Component {
  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event){
    event.preventDefault();//prevent page from refreshing
    let customer = {};
    customer.name = this.nameInput.value;
    customer.email = this.emailInput.value;
    customer.telefone = this.telefone.value;
    customer.endereco = this.endereco.value;
    customer.bairro = this.bairro.value;
    customer.numero = this.numero.value;
    customer.cidade = this.cidade.value;

    this.props.onAdd(customer);

    this.nameInput.value = '';
    this.emailInput.value = '';
    this.telefone.value = '';
    this.endereco.value = '';
    this.bairro.value = '';
    this.numero.value = '';
    this.cidade.value = 'Campo Mourao';
  }

  render() {

    return (
      <div className="container">
        <h3>Add Customer</h3>
        <form onSubmit={this.onSubmit}>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Nome:</label>
              <input className="form-control" placeholder="Nome" ref={nameInput => this.nameInput = nameInput}/>
            </div>
            <div className="form-group col-md-6">
              <label >Email:</label>
              <input className="form-control" placeholder="Email" ref={emailInput => this.emailInput = emailInput}/>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-3">
              <label >Telefone:</label>
              <input className="form-control" placeholder="Telefone" ref={telefone => this.telefone = telefone}/>
            </div>
            <div className="form-group col-md-4">
              <label >Endereço:</label>
              <input className="form-control" placeholder="Endereco" ref={endereco => this.endereco = endereco}/>
            </div>
            <div className="form-group col-md-4">
              <label >Bairro:</label>
              <input className="form-control" placeholder="Bairro" ref={bairro => this.bairro = bairro}/>
            </div>
            <div className="form-group col-md-1">
              <label >Número:</label>
              <input className="form-control" placeholder="Numero" ref={numero => this.numero = numero}/>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-3">
              <label >Cidade:</label>
              <input className="form-control" placeholder="Cidade" defaultValue="Campo Mourao" ref={cidade => this.cidade = cidade}/>
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