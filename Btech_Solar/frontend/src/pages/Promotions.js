import { useEffect, useState } from 'react'
import Allpromos from '../components/Allpromos'
import generatePDF from '../components/PromotionReport'
import {Link} from 'react-router-dom'

const Promotions = () => {
    const [promos, setPromos] = useState(null)
    const [query, setQuery] = useState('')

    useEffect(() => {
        const fetchAllpromotions = async () => {
        const response = await fetch('http://localhost:4000/promotion')
        const json = await response.json()

        if (response.ok) {
            setPromos(json)
        }
        }
        fetchAllpromotions()
    }, [])

    const keys = ['productName', 'itemCode']

    const search = (data) => {
        if (!data) {
            return [];
        }
        return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(query.toLowerCase()))
        )
    }

    const handleSearch = (event) => {
        const { value } = event.target
        setQuery(value)
    }

    return (
        <div>
        <div className='container mt-5'>
            <div className='input-group d-flex justify-content-center my-3'>
                <div className='form-outline w-25'>
                    <input id='search-input' type='search' className='form-control' placeholder='Search...' onChange={handleSearch}/>
                    <br></br>
                    <br></br>

                <h3>PROMOTIONS & OFFERS</h3>
                <br></br>
                </div>
            </div>
            <div className='mt-2'>
                <a href="/promotions/add">
                    <button className="btn btn-danger mx-1 mt-2">Add New Promo</button>
                    </a>
                        <button className="btn btn-primary mx-1 mt-2 " onClick={() => generatePDF(promos)}>Generate Report</button>
                    
                        <Link to="/promotions/contactusForm"><button type="button" class="btn btn-success mx-1 mt-2">Send Email</button></Link>
            </div>
            <div class="container mt-5 mb-3">
                <div class="row">
                    {search(promos).map((promo) => (
                    <Allpromos key={promo._id} promos={promo} />
                    ))}
                </div>
            </div>
        </div>
        </div>
        
    )
}


export default Promotions