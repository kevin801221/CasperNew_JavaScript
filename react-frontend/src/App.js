import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AIProductImageDesigner from './pages/AIProductImageDesigner';
import TestPage from './test/TestPage';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="bg-gray-800 text-white p-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">主頁</Link>
            </li>
            <li>
              <Link to="/test" className="hover:text-gray-300">API 測試頁</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<AIProductImageDesigner />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
