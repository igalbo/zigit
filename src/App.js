import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Info from "./Pages/Info/Info";
import Login from "./Pages/Login/Login";
import Error from "./Pages/Error/Error";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/info" element={<Info />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
