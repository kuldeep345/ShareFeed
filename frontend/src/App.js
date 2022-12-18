import './App.css';
import {Route ,Routes} from 'react-router-dom'
import Login from './components/Login';
import Home from './pages/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProfile } from './components';
import Pins from './pages/Pins';

 
function App() {

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <Routes>
    <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
