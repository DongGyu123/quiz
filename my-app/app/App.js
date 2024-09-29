import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './component/main';
import Quiz from './component/quiz';
import End from './component/end';
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