import { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import Login from './components/Auth/Login';
import NavBar from './components/NavBar';
import PlantDetails from './components/Plants/PlantDetails';
import SellerProfile from './components/Auth/SellerProfile';
import Footer from './components/Footer';
import Signup from './components/Auth/Signup';
import CreatePlant from './components/Plants/CreatePlant';
import HomePage from './components/HomePage/HomePage';
import AllPlantsPage from './components/Plants/AllPlantsPage';
import CartPage from './components/CartPageAndPayment/CartPage';
import { Routes, Route } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import AuthService from './components/Auth/auth-service';
import PlantService from './components/Plants/plant-service';
import EditPlant from './components/Plants/EditPlant';
import EditProfileInfo from './components/Auth/EditProfileInfo';
import PaymentForm from './components/CartPageAndPayment/PaymentForm';
import {ProtectedRoutesCart, ProtectedRoutesLoggedUser} from './components/Auth/protected-routes';
const serviceAuth = new AuthService();
const servicePlants = new PlantService();

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    serviceAuth.loggedin()
      .then(response => setUser(response))
      .catch(err => setUser(false));
  };

  const [products, setProducts] = useState([]);

  const fetchAllProducts = () => {
    servicePlants.getAllPlants()
      .then(response => {
        let makeRandom = response.sort((a, b) => Math.random() - 0.5);
        setProducts(makeRandom)
      })
      .catch(err => setProducts(false));
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);


  const [cart, setCart] = useState([]);
  useEffect(() => {
    updateCart();
  }, []);




  const getTheUser = userObj => {
    setUser(userObj);
  };

  const updateCart = (obj, deletion) => {
    if (deletion) {
      const copy = [...cart];
      let index = copy.findIndex(item => item._id === obj._id);
      copy.splice(index, 1);
      setCart(copy);
    }
    if (!deletion && obj) {
      const newCart = [...cart, { ...obj, quantity: 1 }];
      setCart(newCart);
    }
  };

  return (
    <div className="App">
      <NavBar theUser={user} theCart={cart} getUser={getTheUser} />
      <Routes>
        <Route path='/' element={<HomePage allProducts={products} />} />
        <Route path='/signup' element={<ProtectedRoutesLoggedUser theUser={user}><Signup getUser={getTheUser}/></ProtectedRoutesLoggedUser>} />
        <Route path='/login' element={<ProtectedRoutesLoggedUser theUser={user}><Login getUser={getTheUser} /></ProtectedRoutesLoggedUser>} />
        <Route path='/cart' element={<CartPage productsInCart={cart} cartManipulation={updateCart} />}>
          <Route path='payment' element={<ProtectedRoutesCart theUser={user}><PaymentForm /></ProtectedRoutesCart>} />
        </Route>
        <Route path='/products' element={<AllPlantsPage addToCart={updateCart} allProducts={products} />} />
        <Route path='/plant/:id' element={<PlantDetails addToCart={updateCart} />} />
        <Route path='/create-plant' element={<CreatePlant reloadData={() => fetchAllProducts()} />} />
        <Route path='/profile/:userId' element={<SellerProfile addToCart={updateCart} theUser={user} />}>
          <Route path='edit-plant/:plantId' element={<EditPlant reloadData={() => fetchUser()} />} />
          <Route path='edit-info' element={<EditProfileInfo theUser={user} getUser={fetchUser} />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
