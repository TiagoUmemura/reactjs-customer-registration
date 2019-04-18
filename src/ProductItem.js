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
      <tbody>
        {
          //verify if is on edit mode or normal mode
          this.state.isEdit 
          ? (

              <form onSubmit={this.onEditSubmit}>
                <input placeholder="Name" ref={nameInput => this.nameInput = nameInput} defaultValue={name}/>
                <input placeholder="Price" ref={priceInput => this.priceInput = priceInput} defaultValue={price}/>
                <button>Save</button>
              </form>

            ) : (
              <tr>
                <th scope="row">{name}</th>
                <td>{price}</td>
                <td><button onClick={this.onEdit}>Edit</button></td>
                <td>@<button onClick={this.onDelete}>Delete</button></td>
              </tr>
            )
        }
      </tbody>
    );
  }
}

export default ProductItem;