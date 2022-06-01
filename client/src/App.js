import logo from './logo.svg';
import './App.css';

import {Routes, Route} from 'react-router-dom';

import Login from './pages/login/login';
import Register from './pages/register/register';
import ListPage from './pages/list/list';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/list' element={<ListPage />}></Route>
    </Routes>
  )
  // return <Register />
  // const [token, setToken] = useState();
  // if(!token){
  //   return <Login setToken={setToken}></Login>
  // }
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
