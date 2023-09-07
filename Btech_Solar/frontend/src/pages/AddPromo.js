import { useState } from "react"


const AddPromo = () => {
    const [productName, setName] = useState('')    
    const [itemCode, setCode] = useState('')    
    const [startDate, setStart] = useState('')    
    const [endDate, setEnd] = useState('')
    const [post, setPost] = useState('')   
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [price, setPrice] = useState('')
    const [bestPrice, setBestPrice] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const promo = {productName, itemCode, startDate, endDate, post, description}

        const response = await fetch('http://localhost:4000/promotion/add', {
            method: 'POST',
            body: JSON.stringify(promo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(response.ok) {
            setName('')
            setCode('')
            setStart('')
            setEnd('')
            setPost('')
            setDescription('')
            setContent('')
            setPrice('')
            setBestPrice('')
            console.log('New Promo added', json)
            alert('New Promo added Successfully !')
            
        console.log(json)
        }

    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertToBase64(file)
        setPost(base64);
    }

    var today = new Date().toISOString().split('T')[0];
    return (
        
        <div className="container">
            <br></br>  
            <br></br>  
         <center><h4>ADD NEW PROMOTIONS</h4></center> 
                <br></br>  
        <div className="row justify-content-md-center">
            <div className="col-8">
            <form onSubmit={handleSubmit}>  
            <div className="form-group my-4" >
                <div className="row">
                    <div className="col-md-6">

                        
                        <label>Product Name</label>
                        <input type="text" className="form-control" placeholder="Product Name" onChange={(e) => setName(e.target.value)} value={productName}/>
                    </div>
                    <div className="col-md-6">
                        <label>Item Code</label>
                        <input type="text" className="form-control"placeholder="Item Code" onChange={(e) => setCode(e.target.value)} value={itemCode}/>
                    </div>
                    <div className="col-md-6">
                        <label>price</label>
                        <input type="number" className="form-control"  placeholder="Price" onChange={(e) => setPrice(e.target.value)} value={price}/>
                    </div>
                    <div className="col-md-6">
                        <label>Best Price</label>
                        <input type="number" className="form-control"  placeholder="Best Price" onChange={(e) => setBestPrice(e.target.value)} value={bestPrice}/>
                    </div>
                    <div className="col-md-6">
                        <label>Description</label>
                        <input type="text" className="form-control"  placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description}/>
                    </div>
                    <div className="col-md-6">
                        <label>Content</label>
                        <input type="text" className="form-control"  placeholder="Content" onChange={(e) => setContent(e.target.value)} value={content}/>
                    </div>
                    
                </div>
                <label>Start Date</label>
                <input type="date"  className="form-control" onChange={(e) => setStart(e.target.value)} min={today} value={startDate}/>
            
                
                <label>End Date</label>
                
                
                <input type="date"  className="form-control" onChange={(e) => setEnd(e.target.value)} min={startDate} value={endDate}/>
                
                <label>Promo Post</label>
                <input type="file" name="post"accept="image/*" className="form-control" onChange={(e) => handleFileUpload(e)}/>

            </div>


            <button className="btn btn-danger">Add Promo</button>
            </form>
        </div>
        </div>
        </div>
    )
}

export default AddPromo

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