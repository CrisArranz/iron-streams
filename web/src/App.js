import { Route, Routes } from 'react-router';
import { StreamList, StreamDetail, NavBar, StreamForm } from './components';

function App() {

  return (
    <>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<StreamList />} />
          <Route path="streams/:id" element={<StreamDetail />} />
          <Route path="/create-stream" element={<StreamForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
