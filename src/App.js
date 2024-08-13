import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductPage } from './pages/Product/productPage';
import { Catalog } from './pages/Catalog/catalog';
import { OrdersPage } from './pages/Orders/orders';
import { Update } from './pages/UpdateProduct/update';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/e-crm' element={<OrdersPage/>}/>
          <Route path='/products' element={<ProductPage/>}/>
          <Route path='/catalog' element={<Catalog/>}/>
          <Route path='/:id' element={<Update/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
