import "./home.css";
import Icon from "@mdi/react";
import {
  mdiReact,
  mdiNodejs,
  mdiLanguageHtml5,
  mdiLanguageCss3,
  mdiLanguageJavascript,
  mdiLanguagePython,
} from "@mdi/js";
import ProjectCard from "../project-card/project-card";
import { useEffect, useState } from "react";
import { fetchProjectById, fetchProjects } from "../../api";
import Header from "./header/header";
import useMediaQuery from "../hooks/mediaquery";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [fontSize, setFontSize] = useState(1.6);

  useEffect(() => {
    const getProjects = async () => {
      const project1 = await fetchProjectById(1);
      const project2 = await fetchProjectById(9);
      const project3 = await fetchProjectById(11);
      setProjects([project1, project2, project3]);
    };

    getProjects();
  }, []);

  const breakPoint = useMediaQuery("(min-width: 600px");

  useEffect(() => {
    if (breakPoint) {
      setFontSize(2.2);
    } else {
      setFontSize(1.6);
    }
  }, [breakPoint]);

  return (
    <>
      <Header />
      <div className="home">
        <div className="sq-1"></div>
        <div className="sq-2"></div>
        <div className="sq-3"></div>
        <div className="sq-4"></div>
        <h1 className="title">James Barrett</h1>
        <p
          style={{
            fontSize: `${fontSize}rem`,
            fontWeight: "400",
            marginTop: "-3.2rem",
          }}
        >
          Full Stack Developer
        </p>
        <span className="tech-icons">
          <Icon
            className="icon-anim"
            style={{ animationDelay: "4s" }}
            path={mdiReact}
            size={fontSize}
            color="#c4f5fc"
          />
          <Icon
            className="icon-anim"
            style={{ animationDelay: "4.25s" }}
            path={mdiNodejs}
            size={fontSize}
            color="#b7ffd8"
          />
          <Icon
            className="icon-anim"
            style={{ animationDelay: "4.5s" }}
            path={mdiLanguageHtml5}
            size={fontSize}
            color="#ffc1cf"
          />
          <Icon
            className="icon-anim"
            style={{ animationDelay: "4.75s" }}
            path={mdiLanguageCss3}
            size={fontSize}
            color="#c4f5fc"
          />
          <Icon
            className="icon-anim"
            style={{ animationDelay: "5s" }}
            path={mdiLanguageJavascript}
            size={fontSize}
            color="#ffc1cf"
          />
          <Icon
            className="icon-anim"
            style={{ animationDelay: "5.25s" }}
            path={mdiLanguagePython}
            size={fontSize}
            color="#b7ffd8"
          />
        </span>
      </div>
      <p className="about-me">
        Thank you for visiting my site. My name is James Barrett and I am a full
        stack engineer specializing in the PERN stack. I believe that technology
        can be applied to help solve complex problems and generally improve our
        lives. It is also the case that the things we fail to consider can often
        yield unexpected and unintended results. For those reasons, as well as
        just for the love of it, I am committed to learning. I am a graduate of
        the Virginia Tech / Full Stack Academy software engineering immersive
        program and a current student at Arizona State University studying
        political science, political statistics and data science.
      </p>

      <div className="featured-projects">
        {projects.length > 0 ? (
          <>
            <ProjectCard project={projects[0]} />
            <ProjectCard project={projects[2]} />
            <ProjectCard project={projects[1]} />
          </>
        ) : (
          <div className="spinner" />
        )}
      </div>
    </>
  );
};

export default Home;
