import Icon from "@mdi/react";
import {
  mdiWeb,
  mdiGithub,
  mdiMenuDownOutline,
  mdiMenuUpOutline,
} from "@mdi/js";
import "./project-card.css";
import { useEffect, useState } from "react";
import Gallery from "../img-gallery/img-gallery";

const ProjectCard = (props) => {
  const { project } = props;
  const { images, technologies } = project;
  const [display, setDisplay] = useState(false);
  const [imgSet, setImgSet] = useState([]);
  const [dateStr, setDateStr] = useState("");
  const [showDescription, setShowDescription] = useState(false);

  const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];

  useEffect(() => {
    let date = new Date(project.published);
    setDateStr(
      months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
    );
  }, []);
  const displayGallery = (images) => {
    const set = images.map((image) => ({
      original: image.url,
      thumbnail: image.url,
    }));
    setDisplay(true);
    setImgSet(set);
  };

  return (
    <>
      {display && (
        <>
          <div className="overlay" />
          <Gallery
            className="gallery"
            images={imgSet}
            setDisplay={setDisplay}
          />
        </>
      )}
      <div className="project-card">
        <h2>{project.title}</h2>
        <span className="technologies">
          {technologies &&
            technologies.map((technology) =>
              technology.icon ? (
                <svg
                  viewBox="0 0 24 24"
                  role="presentation"
                  key={technology.id}
                  title={technology.name}
                  className="technology-icon"
                >
                  <path
                    d={technology.icon}
                    style={{ fill: technology.color }}
                  ></path>
                </svg>
              ) : (
                <p key={technology.id}>{technology.name}</p>
              )
            )}
        </span>
        {images && (
          <img
            className="project-card-img"
            key={images[0]?.id}
            src={images[0]?.url}
            alt={images[0]?.alt}
            onClick={() => displayGallery(images)}
          />
        )}
        <span className="project-links">
          {project.url && (
            <a
              className="project-link"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon path={mdiWeb} size={1.8} color="#c4f5fc" />
              <p>Website</p>
            </a>
          )}
          {project.github && (
            <a
              className="project-link"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon path={mdiGithub} size={1.8} color="#FFF" />
              <p>Github</p>
            </a>
          )}
        </span>
        {showDescription ? (
          <div>
            <span
              className="dropdown"
              onClick={() => setShowDescription(false)}
            >
              <Icon path={mdiMenuUpOutline} size={2} color="#FFF" />
            </span>
            <p style={{ marginTop: "-1rem" }}>Published: {dateStr}</p>
            <p className="project-description">{project.description}</p>
          </div>
        ) : (
          <span className="dropdown" onClick={() => setShowDescription(true)}>
            <Icon path={mdiMenuDownOutline} size={2} color="#FFF" />
          </span>
        )}
      </div>
    </>
  );
};

export default ProjectCard;
