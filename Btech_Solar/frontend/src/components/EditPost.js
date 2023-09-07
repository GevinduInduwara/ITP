import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();

  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [tdate, setTDate] = useState('');
  const [postCategory, setPostCategory] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'topic') {
      setTopic(value);
    } else if (name === 'description') {
      setDescription(value);
    } else if (name === 'amount') {
      setAmount(value);
    } else if (name === 'tdate') {
      setTDate(value);
    } else if (name === 'postCategory') {
      setPostCategory(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      topic,
      description,
      postCategory,
      tdate,
      amount,
    };

    console.log(data);

    axios.put(`http://localhost:4000/post/update/${id}`, data).then((res) => {
      if (res.data.success) {
        alert('Item Updated Successfully');
        setTopic('');
        setDescription('');
        setAmount('');
        setTDate('');
        setPostCategory('');
      }
    });
  };

  useEffect(() => {
    axios.get(`/post/${id}`).then((res) => {
      if (res.data.success) {
        const { topic, description, postCategory, tdate, amount } = res.data.post;

        setTopic(topic);
        setDescription(description);
        setAmount(amount);
        setTDate(tdate);
        setPostCategory(postCategory);
      }
    });
  }, [id]);

  return (
    <div className="container1">
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">EDIT DETAILS FORM</h1>
        <form className="needs-validation" noValidate>
        <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Solar System type</label>
            <select
              className="form-control"
              name="topic"
              value={topic}
              onChange={handleInputChange}
            >
              <option value="" disabled>Select System type</option>
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
              placeholder="Enter Name"
              value={description}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Payment method</label>
            <select
              className="form-control"
              name="postCategory"
              value={postCategory}
              onChange={handleInputChange}
            >
              <option value="" disabled>Select Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Master credit card">Master credit card</option>
              <option value="Visa credit card">Visa credit card</option>
              <option value="American express credit card">American express credit card
              </option>
              <option value="Master debit card">Master debit card</option>
              <option value="Visa debit card">Visa debit card</option>
              <option value="American express debit card">American express debit card</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: '15px' }}>
        <label style={{ marginBottom: '5px' }}>Date of payment</label>
        <input
          type="date"
          className="form-control"
          name="tdate"
          placeholder="Enter Date"
          value={tdate}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label style={{ marginBottom: '5px' }}>Amount</label>
        <input
          type="number"
          className="form-control"
          name="amount"
          placeholder="Enter Amount"
          value={amount}
          onChange={handleInputChange}
        />
      </div>

      <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }} onClick={onSubmit}>
        <i className="far fa-check-square"></i>
        &nbsp; Edit Payment Details
      </button>

      <br />

      <Link to="/" className="btn btn-danger" style={{ marginTop: '15px' }}>
        Back
      </Link>
    </form>
  </div>
</div>
);
};

export default EditPost;