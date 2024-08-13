import React from 'react'
import {Routes,Route} from 'react-router-dom'
import About from './Components/Pages/About'
import Home from './Components/Pages/Home'
import Product from './Components/Pages/Product'
import UserDashboard from './Components/Dashboard/User/User'
import AdminDashboard from './Components/Dashboard/Admin/Admin'
import BillingForm from './Components/Pages/Billing'
import Profile from './Components/Pages/Profilo'
import Contact from './Components/Pages/Contact'
import Admin from '../src/Components/Dashboard/Admin/app'
const Allroutes = () => {
  const productId=1
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/Home' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product' element={<Product productId={productId}/>}/>
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/checkout" element={<BillingForm />} />
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default Allroutes
