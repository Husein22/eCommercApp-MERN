import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './page/Home';
import{BrowserRouter,Route,Routes}from "react-router-dom"
import Navigation from './components/Navigation';
import Login from './page/Login';
import Signup from './page/Signup';
import { useSelector } from 'react-redux';
import NewPordact from './page/NewPordact';
import ProductPage from './page/ProductPage';
import CategoryPage from './page/CategoryPage';
import ScrollToTop from './components/ScrollToTop'
import CartPage from './page/CartPage';
import OrdersPage from './page/OrdersPage';

function App() {
  const user=useSelector((state)=>state.user)
  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop></ScrollToTop>
      <Navigation/>
      <Routes>
        <Route index element={<Home/>}/>
       
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/orders" element={<OrdersPage/>}/>        


        <Route path="/product/:id" element={<ProductPage/>}/>
        <Route path="/category/:category" element={<CategoryPage/>}/>
        {user &&(
          <> 
           <Route path="/cart/" element={<CartPage/>}/>
          </>
        )}

        <Route path="/new-product" element={<NewPordact/>}/>
        <Route path="*" element={<Home/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
