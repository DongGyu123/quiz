import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main';
import Quiz from './pages/quiz';
import End from './pages/end';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/end" element={<End />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;