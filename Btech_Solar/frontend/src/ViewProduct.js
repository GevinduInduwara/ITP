import React from 'react';
import './ViewProduct.css';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


export const ViewProduct = () => {
  const { id } = useParams();
  const [promo, setPromodetails] = useState(null);

  useEffect(() => {
      const fetchPromo = async (id) => {
          const response = await fetch(`http://localhost:4000/promotion/${id}`)
          const json = await response.json()
  
          if(response.ok) {
              setPromodetails([json])
          }
      }
      fetchPromo(id);
  }, [id])

    return(
      
      <div className="app">
      
        {
          promo && promo.map(item =>(
            <div className="details" key={item._id}>
              <div className="big-img">
                <img src={item.post} alt=""/>
              </div>

              <div className="box">
                <div className="row">
                  <h2>{item.productName}</h2>
                  <span1>LKR {item.bestPrice}</span1>
                  <span>LKR{item.price}</span> 
                  
                </div>
                

                <p>{item.description}</p>
                <p>{item.content}</p>
                <a href="/promotions"> 
                        <button className="btn btn-warning mx-1">Back</button>
                        </a>

              </div>
            </div>
          ))
        }
      </div>
    );
}

export default ViewProduct;
