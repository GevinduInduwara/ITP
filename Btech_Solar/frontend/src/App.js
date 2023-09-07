import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Admincp from './pages/Admincp'
import AllFunctions from './pages/AllFunctions'
import Navbar from './components/Navbar'
import AboutUs from './pages/AboutUs'


import NewRepairform from './pages/NewRepairform'
import RepairTable from './pages/RepairTable'
import EditRepair from './pages/EditRepair'


import AddEmployee from './components/AddEmployee';
import Employees from './components/Employees';
import EmployeeProfile from './components/employeeProfile';


import AddInventoryForm from "./components/additemForm";
import InventoryTable from './components/InventoryTable';
import EditItem from './components/EditItem';

import Promotions from './pages/Promotions'
import AddPromo from './pages/AddPromo'
import EditPromo from './pages/EditPromo'
import ViewProduct from './ViewProduct'
import ContactUs from './components/contactForm'

import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import FHome from './components/Home';
import PostDetails from './components/PostDetails';
import EmployeeSalary from './components/EmployeeSalary';
import CreditCard from './components/CreditCard';

function App() {
  const { user } = useAuthContext()

  return (
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route 
              path="/login"
              element={!user ? <Login /> : <Navigate to="/"/>}
            />
            <Route 
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/"/>}
            />
            <Route 
              path="/profile/:id"
              element={user ? <Profile /> : <Navigate to="/login"/>}
            />
            <Route 
              path="/admincp"
              element={user ? <Admincp /> : <Navigate to="/"/>}
            />
            <Route 
              path="/functions"
              element={user ? <AllFunctions /> : <Navigate to="/"/>}
            />
            <Route 
              path="/aboutus"
              element={<AboutUs />}
            />

            {/* Repair */}
            <Route 
            path="/repairs"
            element={<RepairTable />}
            />
            <Route 
              path="/repair/:id"
              element={<EditRepair />}
            />
            <Route 
              path="/add"
              element={<NewRepairform />}
            />

            {/* Employee */}
            <Route 
              path="/employee"
              element={< Employees /> }
            />
            <Route 
              path="/employee/add"
              element={< AddEmployee /> }
            />

            <Route
            path="/employee/:id"
            element={<EmployeeProfile/>}
            />

          {/* Inventory */}
            <Route 
              path="/inv/add"
              element={<AddInventoryForm />} />
            <Route 
              path="/inv/:id"
              element={<EditItem />} />
          <Route
            path="/inv" 
            element={<InventoryTable />} />

          {/* Promotions */}
            <Route 
              path="/promotions" 
              element={<Promotions />}
            />
            <Route 
              path="/promotions/add" 
              element={<AddPromo />}
            />
            <Route 
              path="/promotions/:id" 
              element={<EditPromo />}
            />
            <Route 
              path="/promotions/view/:id" 
              element={<ViewProduct />}
            />

            <Route 
              path="/promotions/contactusForm" 
              element={<ContactUs />}
            />

        {/* Finance */}
        <Route path="/finance" element={<FHome/>} exact />
        <Route path="/add" element={<CreatePost/>}/>
        <Route path="/edit/:id" element={ <EditPost/>} />
        <Route path="/post/:id" element={<PostDetails/> } />
        <Route path="/empsal" element={<EmployeeSalary/> } />
        <Route path="/ccard" element={<CreditCard/> } />


            <Route 
              path="/"
              element={<Home />}
            />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
