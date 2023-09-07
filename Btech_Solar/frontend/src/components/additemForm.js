import { useState, useEffect } from 'react';
const AddInventoryForm = () => {
  const [Category, setCategory] = useState('');
  const [Itemcode, setItemCode] = useState('');
  const [Description, setDescription] = useState('');
  const [Brand, setBrand] = useState('');
  const [tempbrand, setTempBrand] = useState([]);
  const [Price, setPrice] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [SellingPrice, setSellingPrice] = useState('');


  useEffect(() => {
    loadBrands();
  }, [Category]);
  const handleSubmit = async (e) => {
    e.preventDefault();

        // Special code validation
        const specialCodeRegex = /^[a-zA-Z0-9]+$/;
        if (!specialCodeRegex.test(Itemcode)) {
          alert('Special code should only contain letters and numbers.');
          return;
        }
    const inventory = {
      Itemcode,
      Category,
      Description,
      Brand,
      Price,
      Quantity,
      SellingPrice
    };
    const response = await fetch('http://localhost:4000/api/inventory/add', {
            method: 'POST',
            body: JSON.stringify(inventory),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    const json = await response.json()
    if (response.ok) {
      setCategory('');
      setItemCode('');
      setDescription('');
      setBrand('');
      setTempBrand([]);
      setPrice('');
      setQuantity('');
      setSellingPrice('');
      console.log('New inventory added', json)
      alert('New inventory item added')
    }
  };
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
  return (
    <div className="container" style={{ maxWidth: "800px" }}>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label>Category</label>
          <select className="form-control" onChange={(event) => { setCategory(event.target.value); loadBrands(); }} required>
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
          <select className="form-control" onChange={(event) => setBrand(event.target.value)} required>
            <option value="">Select a brand...</option>
            {tempbrand.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        <div className="form-group my-2">
          <label>Item Code</label>
          <input
            type="text"
            className="form-control"
            value={Itemcode}
            onChange={(event) => setItemCode(event.target.value)}
            required
          />
        </div>
        <div className="form-group my-2">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            value={Price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
        </div>
        <div className="form-group my-2">
          <label>Quantity</label>
          <input
            type="number"
            className="form-control"
            value={Quantity}
            onChange={(event) => setQuantity(event.target.value)}
            required
          />
        </div>
        <div className="form-group my-2">
          <label>Selling Price</label>
          <input
            type="number"
            className="form-control"
            value={SellingPrice}
            onChange={(event) => setSellingPrice(event.target.value)}
            required
          />
        </div>
        <div className="form-group my-2">
          <label>Description</label>
          <textarea
            className="form-control"
            value={Description}
            onChange={(event) => setDescription(event.target.value)}
            rows="4"
            cols="50"
            required
          />
        </div>
        <br></br>
        <button className="btn btn-primary" type="submit">
          Add item
        </button>
      </form>
    </div>
  );
};
export default AddInventoryForm;