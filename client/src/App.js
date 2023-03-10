import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Contact, Footer, Projects, Success } from "./components";
import Home from "./components/home/home";
import { Life, Romance } from "./components/mini-projects";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/projects" element={<Projects />}></Route>
        <Route path="/mini_projects/romance" element={<Romance />}></Route>
        <Route path="/mini_projects/game_of_life" element={<Life />}></Route>
        <Route path="/success" element={<Success />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
