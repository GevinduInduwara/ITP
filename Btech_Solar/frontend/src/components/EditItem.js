import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const EditItem = () => {
  const [Category, setCategory] = useState('');
  const [Brand, setBrand] = useState('');
  const [tempbrand, setTempBrand] = useState([]);

  
  const { id } = useParams();
  const [ inventory, setInventory ] = useState(null)
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    loadBrands();
  }, [Category]);

  useEffect(() => {
    const fetchinventory = async (id) => {
        try {
          const response = await fetch(`http://localhost:4000/api/inventory/${id}`);
          const json = await response.json();
        
          if (response.ok) {
            setInventory(json)
            setCategory(json.Category)
            setBrand(json.Brand)
          } else {
            throw new Error('Error fetching inventory');
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchinventory(id);
}, [id])

useEffect(() => {
    if (inventory) {
      setBrand(inventory.Brand);
    }
  }, [inventory])

const handleInputChange = event => {
    const { name, value }= event.target;
    setInventory(prevState => ({
        ...prevState,
        [name]: value
    }))
}

  function loadBrands() {
    if (Category === "Battery") {
      setTempBrand(["Rossen", "Sako", "Euronet", "Amaron"]);
    } else if (Category === "Solar panels") {
      setTempBrand(["Canadian", "JINCO", "Trina"]);
    } else if (Category === "Dc Wire") {
      setTempBrand(["KBE", "Lapp", "Top"]);
    } else if (Category === "Earth Wire") {
      setTempBrand(["Kelani", "Sierra"]);
    } else if (Category === "Inverters") {
      setTempBrand(["Solis", "SMA"]);
    } else if (Category === "Other") {
      setTempBrand(["Other"]);
    } else {
      setTempBrand([]);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const response = await fetch('http://localhost:4000/api/inventory/' + inventory._id, {
        method: 'PATCH',
        body: JSON.stringify(inventory),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
      setIsUpdated(true); // Set the update status to true
    }

    await response.json()

}

useEffect(() => {
  // Display alert when update status changes
  if (isUpdated) {
    alert('Details updated successfully');
  }
}, [isUpdated]);
  return (
    <div>
        {inventory ? (
    <div className="container" style={{ maxWidth: "800px" }}>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label>Category</label>
          <select className="form-control" name="Category" defaultValue={inventory.Category} onChange={handleInputChange}>
            <option value="">Select a category...</option>
            <option value="Battery">Battery</option>
            <option value="Solar panels">Solar panels</option>
            <option value="Dc Wire">DC Wire</option>
            <option value="Earth Wire">Earth Wire</option>
            <option value="Inverters">Inverters</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="form-group my-2">
          <label>Brand</label>
          <select className="form-control" name="Brand" value={Brand} onChange={handleInputChange}>
            <option value="">Select a brand...</option>
            {tempbrand.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
            ))}
            </select>
        </div>

        <div className="form-group my-2">
          <label>Item Code</label>
          <input type="text" name="Itemcode" className="form-control" defaultValue={inventory.Itemcode} onChange={handleInputChange} />
        </div>

        <div className="form-group my-2">
          <label>Price</label>
          <input type="number" name="Price" className="form-control" defaultValue={inventory.Price} onChange={handleInputChange} />
        </div>

        <div className="form-group my-2">
          <label>Quantity</label>
          <input type="number" name="Quantity" className="form-control" defaultValue={inventory.Quantity} onChange={handleInputChange} />
        </div>

        <div className="form-group my-2">
          <label>Selling Price</label>
          <input type="number" name="SellingPrice" className="form-control" defaultValue={inventory.SellingPrice} onChange={handleInputChange} />
        </div>

        <div className="form-group my-2">
          <label>Description</label>
          <textarea className="form-control" name="Description" defaultValue={inventory.Description} onChange={handleInputChange} rows="4" cols="50" />
        </div>
        <br>
        </br>

        <button className="btn btn-primary" type="submit">
          Update
        </button>
      </form>
    </div>
    ) : (
        <p>Loading...</p>
    )}
    </div>
  );
};

export default EditItem;