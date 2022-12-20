import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <nav className="navbar">
      <Link to="/projects" className="nav-link">
        My Work
      </Link>
      <Link to="/">
        <img
          className="logo"
          src="https://storage.googleapis.com/portfolio-web-static-files-9867/logo.JPG"
        />
      </Link>
      <Link className="nav-link" to="/contact">
        Contact Me
      </Link>
    </nav>
  );
};

export default Header;
