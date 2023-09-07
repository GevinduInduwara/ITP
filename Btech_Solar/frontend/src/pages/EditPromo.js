import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const EditPromo = () => {
    const { id } = useParams();
    const [ promo, setPromodetails ] = useState(null)

    useEffect(() => {
        const fetchPromo = async (id) => {
            const response = await fetch(`http://localhost:4000/promotion/${id}`)
            const json = await response.json()
    
            if(response.ok) {
                setPromodetails(json)
            }
        }
        fetchPromo(id);
    }, [id])

    const handleInputChange = event => {
        const { name, value }= event.target;
        setPromodetails(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:4000/promotion/' + promo._id, {
            method: 'PATCH',
            body: JSON.stringify(promo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await response.json()

        if(response.ok) {
            window.location.href = '/promotions';
            console.log(promo)
        }

    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertToBase64(file)
        setPromodetails(prevState => ({
            ...prevState,
            post: base64
        }))
        console.log(base64)
    }
    var today = new Date().toISOString().split('T')[0];

    return (
        <div>
            <div>
            {promo ? (
            <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-8">
                        <form onSubmit={handleSubmit}>  
                        <div className="form-group my-4" >
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Product Name</label>
                                    <input type="text" className="form-control" name="productName" placeholder="Product Name" onChange={handleInputChange} defaultValue={promo.productName}/>
                                </div>
                                <div className="col-md-6">
                                    <label>Item Code</label>
                                    <input type="text" className="form-control" name="itemCode" placeholder="Item Code" onChange={handleInputChange} defaultValue={promo.itemCode}/>
                                </div>
                                <div className="col-md-6">
                                    <label>Price</label>
                                    <input type="currency" className="form-control" name="price" placeholder="Price" onChange={handleInputChange} defaultValue={promo.price}/>
                                </div>
                                <div className="col-md-6">
                                    <label>Best Price</label>
                                    <input type="tcurrency" className="form-control" name="bestPrice" placeholder="Best Price" onChange={handleInputChange} defaultValue={promo.bestPrice}/>
                                </div>
                                <div className="col-md-6">
                                    <label>Description</label>
                                    <input type="text" className="form-control" name="description" placeholder="Description" onChange={handleInputChange} defaultValue={promo.description}/>
                                </div>
                                <div className="col-md-6">
                                    <label>Content</label>
                                    <input type="text" className="form-control" name="content" placeholder="Content" onChange={handleInputChange} defaultValue={promo.content}/>
                                </div>
                            </div>
                            <label>Start Date</label>
                            <input type="date" className="form-control" name="startDate" onChange={handleInputChange} min={today} defaultValue={promo.startDate}/>
                            
                            <label>End Date</label>
                            <input type="date" className="form-control" name="endDate" onChange={handleInputChange} min={promo.startDate} defaultValue={promo.endDate}/>
                            
                            <label>Promo Post</label>
                            <input type="file" name="post"accept="image/*" className="form-control" onChange={handleFileUpload}/>
                        </div>

                        <button className="btn btn-primary">Save Changes</button>
                        </form>
                        <div>
                        <a href="/promotions/add">
                        <button className="btn btn-danger mx-0 mt-2">Add New Promo</button>
                        </a>
                        </div>
                        
                    </div>
                        
                    </div>
                    </div>





            ) : (
                <p>Loading...</p>
            )}
            </div>
        </div>
    )
}

export default EditPromo

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}