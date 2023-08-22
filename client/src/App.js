import './App.css';
import Main from './layouts/main/Main';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">

      <ToastContainer/>
      <Main/>
      
    </div>
  );
}

export default App;
