
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DataComponent from './components/DataComponent/DataComponent';
import Home from './components/Home/Home';
import { users, products } from './config/entries'
function App() {
  return (
    <div>
      <Router basename="/astudio-assessment">
        <div className='container'>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/users' element={<DataComponent type={'users'} entries={users} />} />
            <Route path='/products' element={<DataComponent type={'products'}  entries={products}/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
