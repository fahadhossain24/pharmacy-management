import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import EntryProduct from './components/EntryProduct/EntryProduct';
import AllProduct from './components/AllProduct/AllProduct';
import Header from './components/Shired/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Registration from './components/login/Registration';
import Cart from './components/cart/Cart';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/enteryMedicine' element={<EntryProduct></EntryProduct>}></Route>
        <Route path='/allMedicine' element={<AllProduct></AllProduct>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Registration></Registration>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
