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

    this.props.onEditSubmit(this.nameInput.value, this.priceInput.value, this.props.id);

    this.setState({ isEdit : false});
  }

  render() {
    const { name, price } = this.props;

    return (
          // verify if is on edit mode or normal mode
        <div className="row mt-2">
          {
            this.state.isEdit
                ? (
                    <form onSubmit={this.onEditSubmit} className="wrapper">
                      <div className="col-auto">
                        <input placeholder="Name"
                        ref={nameInput => this.nameInput = nameInput}
                        defaultValue={name} className="form-control"/>
                      </div>
                      <div className="col-auto">
                        <input placeholder="Price"
                        ref={priceInput => this.priceInput = priceInput}
                        defaultValue={price} className="form-control"/>
                      </div>
                      <button className="btn btn-primary">Save</button>
                    </form>

                ) : (
                    <>
                      <div className="col-sm">{name}</div>
                      <div className="col-sm">{price}</div>
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