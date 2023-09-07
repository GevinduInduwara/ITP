import React, { Component } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import {Link} from 'react-router-dom'

export default class Home extends Component {
  constructor(props){
    super(props);

    this.state={
      posts:[]
    };
  }
  


  componentDidMount(){
    this.retrievePosts();
  }


retrievePosts(){
  axios.get("http://localhost:4000/posts").then(res =>{
    if(res.data.success){
      this.setState({
        posts:res.data.existingPosts
      });

      console.log(this.state.posts)
    }
  });
}

  onDelete = (id) =>{

    axios.delete(`http://localhost:4000/post/delete/${id}`).then((res) =>{
      alert("Deleted Successully");
      this.retrievePosts();
    })
  }


  filterData(posts,searchKey){

    const result = posts.filter((post) =>
    post.topic.toLowerCase().includes(searchKey)||
    post.description.toLowerCase().includes(searchKey)||
    post.tdate.toLowerCase().includes(searchKey)||
    post.postCategory.toLowerCase().includes(searchKey)
 

    )
    this.setState({posts:result})

  }

  handleSearchArea = (e) =>{

    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:4000/posts").then(res =>{
      if(res.data.success){
      
        this.filterData(res.data.existingPosts,searchKey)

      }
    });
  };

  generatePDF = () => {
    const { posts } = this.state;
  
    const doc = new jsPDF();
    const tableColumn = ['Solar system type', 'Name', 'Payment Method', 'Date of Payment', 'Amount Paid (Rupees)'];
    const tableRows = [];
  
    // Prepare table rows
    posts.forEach((post, index) => {
      const rowData = [
        post.topic,
        post.description,
        post.postCategory,
        post.tdate,
        post.amount,
      ];
      tableRows.push(rowData);
    });
  
    // Set table properties
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });
  
    
    doc.save('payment-details.pdf');
  };
  

  render() {
    return (
      <div className="container1">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
          <h1>PAYMENT DETAILS</h1>
          </div>

          <div className="search-box">
    <button className="searchQuery"><i class="fas fa-search"></i></button>
    <input type="text" class="input-search" placeholder="Type to Search..." onChange={this.handleSearchArea}/>
  </div>

       </div>

        <table className="table table-hover" style={{marginTop:'40px'}}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Invoice Number</th>
              <th scope="col">Name</th>
              <th scope="col">Payment Method</th>
              <th scope="col">Date of Payment</th>
              <th scope="col">Amount Paid (Rupees)</th>
              <th scope="col">Edit / Delete</th>

            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts,index) =>(

              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>
                    <a href={`/post/${posts._id}`} style={{textDecoration:'none'}}>
                    <th scope="row">S{index+10000}</th>
                    </a>
                    </td>
                <td>{posts.description}</td>
                <td>{posts.postCategory}</td>
                <td>{posts.tdate}</td>
                <td>{posts.amount}</td>
                <td>
                <a className="btn btn-warning" href={`/edit/${posts._id}`}>
                <Link to={`/edit/${posts._id}`}><i className="fas fa-edit"></i>&nbsp;Edit </Link>
                </a>
                &nbsp;
                <a className="btn btn-danger" onClick={() => this.onDelete(posts._id)} >
                <i className="far fa-trash-alt"></i>&nbsp;Delete
                </a>
                </td>
              </tr>

            ))}
          </tbody>

        </table>
            <br></br>  
        <button className="btn btn-success"><a href="/add" style={{textDecoration:'none',color:'white'}}>Add new payment details</a></button>
        <br/>
        <br/><button className="btn btn-primary" onClick={this.generatePDF}>
      Generate PDF
    </button>
<br />
<br />
    <Link to="/empsal" className='navbar-items'><button className="btn btn-primary">Calculator</button></Link>
    </div>
  )}
}