import "./App.css";
import { Route, Routes } from 'react-router';
import { StreamList, StreamDetail } from './components';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="streams/:id" element={<StreamDetail />} />
      </Routes>
    </div>
  );
}

export default App;
