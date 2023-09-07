import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "",
      description: "",
      postCategory: "",
      tdate: "",
      amount: "",
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  

  handleSubmit = (e) => {
    e.preventDefault();
    const { topic, description, postCategory, tdate, amount } = this.state;
    const data = {
      topic,
      description,
      postCategory,
      tdate,
      amount,
    };
    console.log(data);

    axios.post("http://localhost:4000/post/save", data).then((res) => {
      if (res.data.success) {
        alert('Payment Details Inserted Successfully');
        this.setState({
          topic: "",
          description: "",
          postCategory: "",
          tdate: "",
          amount: "",
        });
      }
    });
  };

  render() {
    const today = new Date().toISOString().split('T')[0];
    return (
      <div className="container3">
        <div className="col-md8 mt-4 mx auto">
          <h1 className="h3 mb-3 font-weight-normal">PAYMENT DETAILS FORM</h1>
          <form className="needs-validation" noValidate onSubmit={this.handleSubmit}>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Solar system type</label>
              <select
                className="form-control"
                name="topic"
                value={this.state.topic}
                onChange={this.handleInputChange}
              >
                <option value="" disabled>Select system type</option>
                <option value="Grid-tie">Grid-tie</option>
                <option value="Off-grid">Off-grid</option>
                <option value="Backup power systems">Backup power systems</option>

              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Name</label>
              <input
                type="text"
                className="form-control"
                name="description"
                placeholder="Enter the Name"
                value={this.state.description}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Payment method</label>
              <select
                className="form-control"
                name="postCategory"
                value={this.state.postCategory}
                onChange={this.handleInputChange}
              >
                <option value="" disabled>Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="Master credit card">Master credit card</option>
                <option value="Visa credit card">Visa credit card</option>
                <option value="American express credit card">American express credit card</option>
                <option value="Master debit card">Master debit card</option>
                <option value="Visa debit card">Visa debit card</option>
                <option value="American express debit card">American express debit card</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Date of payment</label>
              <input
                type="date"
                max={today}
                className="form-control"
                name="tdate"
                placeholder="Enter the Date"
                value={this.state.tdate}
                onChange={this.handleInputChange}
              />
            </div>
    
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Amount (Rupees)</label>
              <input
                type="number"
                className="form-control"
                name="amount"
                placeholder="Enter the Amount"
                value={this.state.amount}
                onChange={this.handleInputChange}
              />
            </div>
    
            <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }}>
              <i className="far fa-check-square"></i>
              &nbsp; Save Payment Details
            </button>
            <br></br>
            <Link to="/" className="btn btn-danger" style={{ marginTop: '15px' }}>
              Back
            </Link>
          </form>
        </div>
      </div>
    )
  }
}
        
