import { Link } from 'react-router-dom'

const Allpromos = ({ promos }) => {

    const handleClick = async () => {
        const response = await fetch('http://localhost:4000/promotion/' + promos._id, {
            method: 'DELETE'
        })

        if(response.ok) {
            window.location.href = '/promotions';
        }
    }

    return (

        <div class="col-md-4">
            <div class="card p-3 mb-2">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                        <img src={promos.post} alt="promoimg" className="img-fluid" style={{width: "648px", height:"210px"}}/>
                    </div>
                </div>
                    <div class="row mt-2">
                        <div class="col">
                            <h3 class="heading">{promos.productName}</h3>
                        </div>
                        <div class="col">
                            <div class="mt-2 float-end"><span class="text2">#{promos.itemCode}</span> </div>
                        </div>
                    </div>


                    <div class="mt-2">
                        <Link to={`/promotions/view/${promos._id}`}> 
                        <button className="btn btn-warning mx-1">View</button>
                        </Link>
                        <Link to={`/promotions/${promos._id}`}><button className="btn btn-primary mx-1">Edit</button></Link>
                        <button className="btn btn-danger mx-1" onClick={handleClick}>Delete</button>
                    </div>
            </div>
        </div>
        


    )
}

export default Allpromos