import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Footer, Projects } from "./components";
import Home from "./components/home/home";
import { Romance } from "./components/mini-projects";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/projects" element={<Projects />}></Route>
        <Route path="/mini_projects/romance" element={<Romance />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
