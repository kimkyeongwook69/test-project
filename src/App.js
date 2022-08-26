import './App.css';
import { useState } from 'react';
import Search from './component/Search';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Common } from './page/Common';
import { Main } from './page/Main';
import ConcertDetail from './component/ConcertDetail';

// npm install
// npm install axios
// npm install styled-components
// npm install react-router-dom
// npm install react-xml-parser

// spotify API Reference
// https://developer.spotify.com/documentation/web-api/reference/#/

function App() {
  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("");
  
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <div>
    <Routes>
      <Route path='/' element={<Common token={token} setToken={setToken} setSearchKey={setSearchKey} />}>
        <Route path='/' element={token? (<Main token={token} />):(<></>)}></Route>
        <Route path='/search' element={<Search token={token} />}></Route>
        <Route path='/detail' element={<ConcertDetail/>}></Route>
      </Route>
    </Routes>
    </div>
    </BrowserRouter>
  );
  
}

export default App;
