import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Navbar from "./layout/Navbar";

function App() {
  return (
    <main>
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/articles" element={<Articles />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
