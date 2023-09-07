import { useState,useEffect } from 'react';
import {Table, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import generatePDF from './InventoryReport';

const InventoryTable = () => {
  const [inventory, setInventory] = useState(null);
  const [category, setCategory] = useState('')
  const [tempbrand, setTempBrand] = useState([]);
  const [brand, setBrand] = useState([]);
  const [shouldSort, setShouldSort] = useState(false);
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetchInventory = async () => {
      const response = await fetch("http://localhost:4000/api/inventory");
      const data = await response.json();

      if (response.ok) {
        setInventory(data);
      }
    };

    fetchInventory();
  }, []);

  useEffect(() => {
    loadBrands();
  }, [category]);

  function loadBrands() {
    if (category === "Battery") {
      setTempBrand(["Rossen", "Sako", "Euronet", "Amaron"]);
    } else if (category === "Solar panels") {
      setTempBrand(["Canadian", "JINCO", "Trina"]);
    } else if (category === "Dc Wire") {
      setTempBrand(["KBE", "Lapp", "Top"]);
    } else if (category === "Earth Wire") {
      setTempBrand(["Kelani", "Sierra"]);
    } else if (category === "Inverters") {
      setTempBrand(["Solis", "SMA"]);
    } else if (category === "Other") {
      setTempBrand(["Other"]);
    } else {
      setTempBrand([]);
    }

    // Reset the selected brand when the category is changed
    setBrand('');
    // Don't sort the data when the category is changed
    setShouldSort(false);
  }

  const keys = ['Category', 'Brand']

  const search = (data) => {
    if (!data) {
      return [];
    }
    let filteredData = data.filter((item) =>
      keys.some(
        (key) =>
          item[key].toLowerCase().includes(category.toLowerCase()) && (brand === '' || item["Brand"].toLowerCase() === brand.toLowerCase())
      )
    );
    
    if (brand !== '' && shouldSort) {
      filteredData.sort((a, b) => a.Brand.localeCompare(b.Brand));
    }

    return filteredData;
  };

  const keyss = ['Category', 'Brand', 'Description']

    const searchinv = (data) => {
        if (!data) {
            return [];
        }
        return data.filter((item) =>
            keyss.some((key) => item[key].toLowerCase().includes(query.toLowerCase()))
        )
    }
  
  //Delete function
  const handleDelete = async (id) => {
    const response = await fetch("http://localhost:4000/api/inventory/" + id, {
        method: 'DELETE'
    })
    const json = await response.json()

    window.location.href = '/';
    if(response.ok) {
        console.log(json)
    }
}

const handleSearch = (event) => {
  const { value } = event.target
  setQuery(value)
}

return (
  <div>
   
    <div className="d-flex justify-content-start mb-3">
    <div className='px-1'></div>
      <div className="form-group my-2 me-3">
        <select
          className="form-select"
          onChange={(event) => {
            setCategory(event.target.value);
            loadBrands();
          }}
        >
          <option value="">Select a category...</option>
          <option value="Battery">Battery</option>
          <option value="Solar panels">Solar panels</option>
          <option value="Dc Wire">DC Wire</option>
          <option value="Earth Wire">Earth Wire</option>
          <option value="Inverters">Inverters</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group my-2 me-3">
        <select
          className="form-select"
          onChange={(event) => setBrand(event.target.value)}
        >
          <option value="">Select a brand...</option>
          {tempbrand.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <div className='form-outline w-25'>
          <input id='search-input' type='search' className='form-control' placeholder='Search...' onChange={handleSearch} />
      </div>
      <div className='px-5'></div>
      <div className='px-5'></div>
      <div className='px-5'></div>
      <div className='px-5'></div>
      <div className='px-5'></div>
      <div className='px-5'></div>
      <div className='px-5'></div>
      <div className='px-5'></div>
      <div className='px-5'></div>
      <div className='px-5'></div>
      <div className='px-5'></div>
      <div className='px-3'></div>
      <Link to='/inv/add'><button className="btn btn-success px-2 mt-2">Add Item</button></Link>
      <div className='px-1'></div>
      <div className="form-group py-2">
        {inventory && (
          <button
            className="btn btn-primary"
            onClick={() => generatePDF(search(inventory))}
          >
            Generate Report
          </button>
        )}
      </div>
    </div>
    <Table striped bordered>
      <thead>
        <tr>
          <th>Itemcode</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Selling Price</th>
          <th>Date</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {inventory &&
          searchinv(search(inventory)).map((item) => (
            <tr key={item._id}>
              <td>{item.Itemcode}</td>
              <td>{item.Category} - {item.Brand}</td>
              <td>{item.Quantity}</td>
              <td>{item.Price}</td>
              <td>{item.SellingPrice}</td>
              <td>{item.Date}</td>
              <td>{item.Description}</td>
              <td>
              <Link to={`/inv/${item._id}`}>
                 <Button variant="success"> {/* Add variant="success" */}
                   Update
                </Button>
              </Link>

                &nbsp;&nbsp;
                <Button variant="danger" onClick={() => handleDelete(item._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  </div>
);


};

export default InventoryTable;
