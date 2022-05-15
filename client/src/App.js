import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, SignUp, SignIn, NotFound, Register } from "./pages";
import { AppProvider } from './context';

/*

TODO:

FIXME:
- previous visited comp displaying in the following comps, same comp displaying twice on first load

*/


function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>

  );
}

export default App;
