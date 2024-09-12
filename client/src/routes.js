import React, { useEffect, useState } from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Loader from 'utils/loader';
import MainLayout from 'hoc/mainLayout';
import Header from 'components/navigation/header';
import Footer from 'components/navigation/footer';
import Home from 'components/home';
import RegisterLogin from 'components/auth';
import ProductDetail from 'components/product';

import Dashboard from 'components/dashboard';
import UserInfo from 'components/dashboard/user/info'

import { useDispatch, useSelector } from 'react-redux';
import { selectUser, signout, userSignOut } from 'store/features/userSlice';
import { userisAuth } from 'store/features/userSlice';
import AuthGuard from './hoc/authGuard';
import AdminProduct from 'components/dashboard/admin/products';
import AddProduct from 'components/dashboard/admin/products/addedit/add';
import EditProduct from './components/dashboard/admin/products/addedit/edit';
import Shop from './components/shop';
import UserCart from 'components/dashboard/user/cart';
import SiteVars from 'components/dashboard/admin/products/site';


function App() {

  const [ loading, setLoading] = useState(true)
  const users = useSelector(selectUser)
  const dispatch = useDispatch();

 const signOutUser =  () => {
  dispatch(userSignOut());


 }

useEffect(() => {
dispatch(userisAuth())


}, [dispatch])

useEffect(() => {
  if(users.auth !== null) {
  setLoading(false)
}

}, [users])

const ProtectedAddProduct = AuthGuard(AddProduct);

const ProtectedDashboard = AuthGuard(Dashboard);
const ProtectedUserInfo = AuthGuard(UserInfo);
const ProtectedAdminProduct = AuthGuard(AdminProduct);
const ProtectedEditProduct = AuthGuard(EditProduct);
const ProtectedCart = AuthGuard(UserCart);
const ProtectedSite = AuthGuard(SiteVars);

  return (
   <BrowserRouter>
{loading ?
<Loader full={true} />
:
<>

<Header 
users = {users}
signOutUser={signOutUser}


/>
   <MainLayout>
   <Routes>
   <Route path='dashboard/admin/add_products' element={<ProtectedAddProduct />} />
   <Route path='dashboard/admin/edit_product/:id' element={<ProtectedEditProduct />} />
   <Route path='product_detail/:id' element={<ProductDetail />} />
   <Route path='dashboard/user/user_cart' element={<ProtectedCart />} />
   <Route path='dashboard/admin/manage_site' element={<ProtectedSite />} />
   
  
   <Route path='dashboard/admin/admin_products' element={<ProtectedAdminProduct />} />
   <Route path='dashboard/user/user_info' element={<ProtectedUserInfo />} />
   <Route path='dashboard' element={<ProtectedDashboard />} />
   <Route path="shop" element={<Shop />} />
  <Route path="sign_in" element={<RegisterLogin />} />
  <Route path="/" element={<Home />} />
</Routes>
</MainLayout>
<Footer />

</>

}



   </BrowserRouter>
  );
}

export default App;
