import logo from './logo.svg';
import './App.css';
import PostPreview from './Components/PostPreview';
import Landing from './Pages/Landing';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';

function App() {
  return (
    <div className="App bg-white font-inter min-h-screen">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />                                                               
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
