import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, SignUp, SignIn, NotFound, Register, ProtectedRoute } from "./pages";
import { AppProvider } from './context';
import { SharedLayout, AddJob, AllJobs, Profile, Stats } from './pages/dashboard';

/*

TODO:

FIXME:

*/


function App() {
  return (
    <Router>
      {/* <NavigationBar /> */}
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Stats />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>

  );
}

export default App;
