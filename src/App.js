import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductPage } from './pages/Product/productPage';
import { Catalog } from './pages/Catalog/catalog';
import { OrdersPage } from './pages/Orders/orders';
import { Update } from './pages/UpdateProduct/update';
import { SignIn } from './pages/Sign-in/signIn';
import { Clients } from './pages/Clients/clients';
import { Blog } from './pages/Blog/blog';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<OrdersPage/>}/>
          <Route path='/products' element={<ProductPage/>}/>
          <Route path='/catalog' element={<Catalog/>}/>
          <Route path='/:id' element={<Update/>}/>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/clients' element ={<Clients/>}/>
          <Route path='/blog' element={<Blog/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
