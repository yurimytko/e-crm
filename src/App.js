import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductPage } from './pages/Product/productPage';
import { Catalog } from './pages/Catalog/catalog';
import { OrdersPage } from './pages/Orders/orders';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<OrdersPage/>}/>
          <Route path='/products' element={<ProductPage/>}/>
          <Route path='/catalog' element={<Catalog/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
