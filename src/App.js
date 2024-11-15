import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductPage } from './pages/Product/productPage';
import { Catalog } from './pages/Catalog/catalog';
import { OrdersPage } from './pages/Orders/orders';
import { Update } from './pages/UpdateProduct/update';
import { SignIn } from './pages/Sign-in/signIn';
import { Clients } from './pages/Clients/clients';
import { Blog } from './pages/Blog/blog';
import { BlogPage } from './pages/BlogPage/blogPage';
import { SubSection } from './pages/SubSection/subSection';
import { UserPage } from './pages/UserPage/userPage';
import { PacksPage } from './pages/PacksPage/packsPage';
import { ChatPage } from './pages/Chat/caht';
import { ReviewsPage } from './pages/Reviews/reviews';
import { UserChat } from './pages/UserChat/UserChat';

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

if (!localStorage.getItem("csrfToken") && !getCookie("_csrf")) {
  fetch('https://superogshmal.pp.ua/')
    .then(response => {
      console.log(response.headers.getSetCookie());
      console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json(); 
    })
    .then(data => {
      localStorage.setItem("csrfToken", data.csrfToken);

      // Set CSRF token in cookies
      document.cookie = `_csrf=${data.csrfToken}; path=/; secure; samesite=Strict;`;
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}


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
          <Route path='/blog/:blogId' element={<BlogPage/>}/>
          <Route path='/catalog/:catalogId' element={<SubSection/>}/>
          <Route path='/clients/:userId' element={<UserPage/>}/>
          <Route path='/packs' element={<PacksPage/>}/>
          <Route path='/chat' element={<ChatPage/>}/>
          <Route path='/chat/user' element={<UserChat/>}/>
          <Route path='/:pId/reviews' element={<ReviewsPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
