
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import SocialLogin from 'react-social-login';
import Calculator from './Component/Calculator';
import ExpensesTable from './Component/ExpensesTable';
import ETable from './Component/ETable';
import Login from './Component/Login';
import Registration from './Component/Registration';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/socialLogin" element={<SocialLogin/>}/>
          <Route exact path="/calculator" element={<Calculator/>}/>
          <Route exact path="/expensesTable" element={<ExpensesTable/>}/>
          <Route exact path="/eTable" element={<ETable/>}/>
          <Route exact path="/registration" element={<Registration/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
