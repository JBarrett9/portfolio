import "./footer.css";
import Icon from "@mdi/react";
import { mdiGithub } from "@mdi/js";

const Footer = () => {
  return (
    <footer>
      <span className="footer-icons">
        <a href="mailto:info@jamesbarrett.dev">
          <i className="material-icons" id="mail-icon">
            mail
          </i>
        </a>
        <a href="https://www.linkedin.com/in/james-barrett-dev" target="_blank">
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 40 40"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.9716667,33.5527338 L25.001,33.5527338 L25.001,27.1328007 C25.001,25.439485 25.3213333,23.7988354 27.4206667,23.7988354 C29.491,23.7988354 29.517,25.7351486 29.517,27.2404662 L29.517,33.5527338 L33.5506667,33.5527338 L33.5506667,26.4341413 C33.5506667,22.9381777 32.796,20.2505391 28.711,20.2505391 C26.7483333,20.2505391 25.432,21.3265278 24.8943333,22.3471839 L24.839,22.3471839 L24.839,20.5725357 L20.9716667,20.5725357 L20.9716667,33.5527338 Z M16.423,14.1202696 C15.1273333,14.1202696 14.0823333,15.1682587 14.0823333,16.4595785 C14.0823333,17.7508984 15.1273333,18.7992208 16.423,18.7992208 C17.7133333,18.7992208 18.761,17.7508984 18.761,16.4595785 C18.761,15.1682587 17.7133333,14.1202696 16.423,14.1202696 L16.423,14.1202696 Z M14.4026667,33.5527338 L18.4406667,33.5527338 L18.4406667,20.5725357 L14.4026667,20.5725357 L14.4026667,33.5527338 Z M9.76633333,40 C8.79033333,40 8,39.2090082 8,38.2336851 L8,9.76631493 C8,8.79065843 8.79033333,8 9.76633333,8 L38.234,8 C39.2093333,8 40,8.79065843 40,9.76631493 L40,38.2336851 C40,39.2090082 39.2093333,40 38.234,40 L9.76633333,40 Z"
              id="Shape"
              fill="#ffffff"
            ></path>
          </svg>
        </a>
        <a href="https://github.com/JBarrett9" target="_blank">
          <Icon path={mdiGithub} size={2.6} color="#FFF" />
        </a>
      </span>
      <p className="quote">
        <q>
          No role is so well suited to philosophy as the one you happen to be in
          right now.
        </q>{" "}
        ~ Marcus Aurelius <cite>Meditations</cite>
      </p>

      <small className="copyright">
        &copy; Copyright 2022, James Barrett. All Rights Reserved
      </small>
    </footer>
  );
};

export default Footer;
