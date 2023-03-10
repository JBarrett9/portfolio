import { useEffect, useState, useRef } from "react";
import Icon from "@mdi/react";
import { mdiArrowRightBoldOutline, mdiArrowLeftBoldOutline } from "@mdi/js";
import { fetchProjects, fetchProjectsByCategory } from "../../api";
import Header from "../header/header";
import useMediaQuery from "../hooks/mediaquery";
import ProjectCard from "../project-card/project-card";
import ProjectsNav from "./projects-nav/projects-nav";
import { useSwipeable } from "react-swipeable";
import "./projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [miniProjects, setMiniProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [technology, setTechnology] = useState("any");
  const [start, setStart] = useState(0);
  const [miniStart, setMiniStart] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(4);
  const [enabled, setEnabled] = useState(true);

  const one = useMediaQuery("(max-width: 1023px");
  const two = useMediaQuery("(max-width: 1300px");
  const three = useMediaQuery("(max-width: 1680px");

  const left = () => {
    if (enabled && start + resultsPerPage < projects.length) {
      setStart(start + resultsPerPage);
    }
  };

  const right = () => {
    if (enabled && start >= resultsPerPage) {
      setStart(start - resultsPerPage);
    }
  };

  const miniLeft = () => {
    if (enabled && miniStart + resultsPerPage < miniProjects.length) {
      setMiniStart(miniStart + resultsPerPage);
    }
  };

  const miniRight = () => {
    if (enabled && miniStart >= resultsPerPage) {
      setMiniStart(miniStart - resultsPerPage);
    }
  };

  const handlers = useSwipeable({ onSwipedLeft: left, onSwipedRight: right });
  const miniHandlers = useSwipeable({
    onSwipedLeft: miniLeft,
    onSwipedRight: miniRight,
  });

  useEffect(() => {
    async function getProjects() {
      const _projects = await fetchProjectsByCategory(1);
      console.log(_projects);
      setProjects(_projects);

      const _miniProjects = await fetchProjectsByCategory(2);
      console.log(_miniProjects);
      setMiniProjects(_miniProjects);
    }

    getProjects();
  }, []);

  useEffect(() => {
    if (one) {
      setResultsPerPage(1);
    } else if (two) {
      setResultsPerPage(2);
    } else if (three) {
      setResultsPerPage(3);
    } else {
      setResultsPerPage(4);
    }
  }, [one, two, three]);

  const includesSearch = (project) => {
    return (
      (project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase()) ||
        project.technologies
          .map((technology) => technology.name)
          .filter((technology) =>
            technology.toLowerCase().includes(search.toLowerCase())
          ).length ||
        project.categories
          .map((category) => category.name)
          .filter((category) =>
            category.toLowerCase().includes(search.toLowerCase())
          ).length) &&
      project.technologies
        .map((technology) => technology.name)
        .filter((tech) => technology === "any" || tech === technology).length
    );
  };

  return (
    <>
      <Header />
      <ProjectsNav
        search={search}
        setSearch={setSearch}
        technology={technology}
        setTechnology={setTechnology}
      />
      <h2 className="projects-heading ph1">Projects</h2>
      {projects.length > 0 ? (
        <div className="projects-section">
          <span className="nav-btns">
            {start >= resultsPerPage && (
              <button
                className="page-btn prev"
                onClick={() => setStart(start - resultsPerPage)}
              >
                <Icon
                  className="arrow"
                  path={mdiArrowLeftBoldOutline}
                  size={3}
                  color="#fff"
                />
              </button>
            )}
            {start + resultsPerPage < projects.length && (
              <button
                className="page-btn next"
                onClick={() => setStart(start + resultsPerPage)}
              >
                <Icon path={mdiArrowRightBoldOutline} size={3} color="#fff" />
              </button>
            )}
          </span>
          <div className="projects" {...handlers}>
            {projects
              .filter((project) => includesSearch(project))
              .slice(start, start + resultsPerPage)
              .map((project) => (
                <ProjectCard setEnabled={setEnabled} project={project} />
              ))}
          </div>
        </div>
      ) : (
        <div className="spinner" />
      )}
      <h2 className="projects-heading ph2">Smaller Projects</h2>
      {miniProjects.length > 0 ? (
        <>
          <div className="projects mini" {...miniHandlers}>
            {miniProjects
              .filter((project) => includesSearch(project))
              .slice(miniStart, miniStart + resultsPerPage)
              .map((project) => (
                <ProjectCard setEnabled={setEnabled} project={project} />
              ))}
          </div>
          <span className="nav-btns">
            {miniStart >= resultsPerPage && (
              <button
                className="page-btn prev"
                onClick={() => setMiniStart(miniStart - resultsPerPage)}
              >
                <Icon
                  className="arrow"
                  path={mdiArrowLeftBoldOutline}
                  size={3}
                  color="#fff"
                />
              </button>
            )}
            {miniStart + resultsPerPage < miniProjects.length && (
              <button
                className="page-btn next"
                onClick={() => setMiniStart(miniStart + resultsPerPage)}
              >
                <Icon path={mdiArrowRightBoldOutline} size={3} color="#fff" />
              </button>
            )}
          </span>
        </>
      ) : (
        <div className="spinner" />
      )}
    </>
  );
};

export default Projects;
