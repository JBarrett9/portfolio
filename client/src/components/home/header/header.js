import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <nav className="home-nav">
      <Link to="/projects" className="home-nav-link">
        My Work
      </Link>
      <Link to="/contact" className="home-nav-link">
        Contact Me
      </Link>
    </nav>
  );
};

export default Header;
