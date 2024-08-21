import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Product App/Header/header';
import Home from './components/Product App/Content/Home/home';
import Sidebar from './components/Product App/Sidebar/sidebar';
import Dashboard from './components/Product App/Content/Dashboard/dashboard';
import Product from './components/Product App/Content/Product/product';
import Inventory from './components/Product App/Content/Inventory/inventory';
import Order from './components/Product App/Content/Order/order';
import Stock from './components/Product App/Content/Stock/stock';
import About from './components/Product App/Content/About/about';
import Account from './components/Product App/Content/Account/account';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Sidebar>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product" element={<Product />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/order" element={<Order />} />
            <Route path="/stock" element={<Stock />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/account' element={<Account />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </div>
  );
}

export default App;
