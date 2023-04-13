import "./App.css";
import Cards from './components/Cards.jsx';
import Nav from './components/Nav';
import About from './components/About';
import Detail from './components/Detail';
import Form from './components/Form';
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Routes, Route, useLocation, useNavigate} from 'react-router-dom';

const URL_BASE = 'https://be-a-rym.up.railway.app/api/character';
const API_KEY = 'faf14f53c6dd.20445f090467d861ea58';

const email = 'lesly@gmail.com';
const password = '12345les';

function App() {
   const location = useLocation();
   const navigate = useNavigate();
   const [characters, setCharacters] = useState([]);
   const [access, setAccess] = useState(false);

   const login = (userData) => {
      if(userData.email === email && userData.password === password){
         setAccess(true);
         navigate('/home');
      }
   }

   useEffect(() => {
      !access && navigate('/')
   }, [access])
   
      const onSearch = (id) => {
         axios(`${URL_BASE}/${id}?key=${API_KEY}`)
         .then(response => response.data)
         .then((data) => {
         if (data.name) {
         setCharacters((oldChars) => [...oldChars, data]);
            } else {
         window.alert('¡No hay personajes con este ID!');
         }
      });
   }

   const onClose = (id) => {
      const charactersFiltered = characters.filter(character => character.id !== id)
      setCharacters(charactersFiltered)
   }

   return (
      <div className='App'>
         {
            location.pathname !== '/' && <Nav onSearch={onSearch} access={access}/>
         }
         
         <Routes>
            <Route path='/' element={<Form login={login}/>} />
            <Route path='/home' element={ <Cards characters={characters} onClose={onClose}/> }/>
            <Route path='/about' element={<About/>} />
            <Route path='/detail/:id' element={<Detail/>} />
            </Routes>
        
      </div>
   );
}



export default App;
