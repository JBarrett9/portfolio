import Icon from "@mdi/react";
import {
  mdiWeb,
  mdiImageMultiple,
  mdiGithub,
  mdiMenuDownOutline,
  mdiMenuUpOutline,
} from "@mdi/js";
import "./project-card.css";
import { useEffect, useState } from "react";
import Gallery from "../img-gallery/img-gallery";

const ProjectCard = (props) => {
  const { project, setEnabled } = props;
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
  }, [props]);

  const displayGallery = (images) => {
    const set = images.map((image) => ({
      original: image.url,
      thumbnail: image.url,
    }));
    if (props.setEnabled) {
      setEnabled(false);
    }
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
            setEnabled={setEnabled}
          />
        </>
      )}
      <div className="project-card">
        <h2>{project.title}</h2>
        <span className="technologies">
          {technologies &&
            technologies.map((technology) =>
              technology.icon ? (
                <span
                  className="technology"
                  title={technology.name}
                  alt={technology.name}
                >
                  <svg
                    viewBox="0 0 24 24"
                    role="presentation"
                    key={technology.id}
                    className="technology-icon"
                  >
                    <path
                      d={technology.icon}
                      style={{ fill: technology.color }}
                    ></path>
                  </svg>
                </span>
              ) : (
                <p
                  title={technology.name}
                  alt={technology.name}
                  key={technology.id}
                  className={"technology"}
                >
                  {technology.name}
                </p>
              )
            )}
        </span>
        {images && (
          <div className="gallery-preview">
            <Icon className="gallery-icon" path={mdiImageMultiple} size={2} />
            <img
              className="project-card-img"
              key={images[0]?.id}
              src={images[0]?.url}
              alt={images[0]?.alt}
              onClick={() => displayGallery(images)}
            />
          </div>
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
