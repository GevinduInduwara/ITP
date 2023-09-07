import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:4000/post/${id}`).then((res) => {
      if (res.data.success) {
        setPost(res.data.post);
        console.log(post);
      }
    });
  }, [id]);

  const { topic, description, postCategory, tdate, amount } = post;

  return (
    <div className="container1">
    <div style={{ marginTop: '20px' }}>
      <h4>{topic}</h4>
      <hr />

      <dl className="row">
        <dt className="col-sm-3">Name</dt>
        <dd className="col-sm-9">{description}</dd>

        <dt className="col-sm-3">Payment type</dt>
        <dd className="col-sm-9">{postCategory}</dd>

        <dt className="col-sm-3">Date of payment</dt>
        <dd className="col-sm-9">{tdate}</dd>

        <dt className="col-sm-3">Amount</dt>
        <dd className="col-sm-9">{amount}</dd>
      </dl>
      <Link to="/" className="btn btn-danger" style={{ marginTop: '15px' }}>
            Back
            </Link>
    </div>
    </div>
  );
}

export default PostDetails;
