import React, { Component } from 'react';

class ProductItem extends Component {
  constructor(props){
    super(props);

    this.state = {
      isEdit : false
    };

    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  onDelete(){
    //get Id parameter passed on app.js from props
    const { id } = this.props;

    this.props.onDelete(id);
  }

  onEdit(){
    this.setState({ isEdit: true });
  }

  onEditSubmit(event){
    event.preventDefault();

    let customer = {};
    customer.name = this.nameInput.value;
    customer.email = this.emailInput.value;
    customer.telefone = this.telefone.value;
    customer.endereco = this.endereco.value;
    customer.bairro = this.bairro.value;
    customer.numero = this.numero.value;
    customer.cidade = this.cidade.value;

    this.props.onEditSubmit(customer, this.props.id);

    this.setState({ isEdit : false});
  }

  render() {
    const { name, email } = this.props;
    const customer = this.props.customerItem;

    return (
          // verify if is on edit mode or normal mode
        <div className="row mt-2">
          {
            this.state.isEdit
                ? (
                    <form onSubmit={this.onEditSubmit} className="container-fluid">
                      <div className="form-row">
                        <div className="form-group col-md-5">
                          <input placeholder="Name"
                          ref={nameInput => this.nameInput = nameInput}
                          defaultValue={name} className="form-control"/>
                        </div>
                        <div className="form-group col-md-5">
                          <input placeholder="Email"
                          ref={emailInput => this.emailInput = emailInput}
                          defaultValue={email} className="form-control"/>
                        </div>
                        <div className="form-group col-md-2">
                          <input placeholder="Telefone"
                                 ref={telefone => this.telefone = telefone}
                                 defaultValue={customer.telefone} className="form-control"/>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <input placeholder="Endereco"
                                 ref={endereco => this.endereco = endereco}
                                 defaultValue={customer.endereco} className="form-control"/>
                        </div>
                        <div className="form-group col-md-3">
                          <input placeholder="Bairro"
                                 ref={bairro => this.bairro = bairro}
                                 defaultValue={customer.bairro} className="form-control"/>
                        </div>
                        <div className="form-group col-md-3">
                          <input placeholder="Numero"
                                 ref={numero => this.numero = numero}
                                 defaultValue={customer.numero} className="form-control"/>
                        </div>
                        <div className="form-group col-md-3">
                          <input placeholder="Cidade"
                                 ref={cidade => this.cidade = cidade}
                                 defaultValue={customer.cidade} className="form-control"/>
                        </div>
                      </div>
                      <button className="btn btn-primary">Save</button>
                    </form>

                ) : (
                    <>
                      <div className="col-sm">{name}</div>
                      <div className="col-sm">{email}</div>
                      <div className="col-sm">
                        <button className="btn btn-primary" onClick={this.onEdit}>Edit</button>
                      </div>
                      <div className="col-sm">
                        <button className="btn btn-primary" onClick={this.onDelete}>Delete</button>
                      </div>
                    </>
                )
          }
        </div>

    );
  }
}

export default ProductItem;