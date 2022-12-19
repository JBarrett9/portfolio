import { useEffect, useState } from "react";
import { fetchTechnologies } from "../../../api";
import "./projects-nav.css";

const ProjectsNav = (props) => {
  const { search, setSearch, technology, setTechnology } = props;
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    async function getTechnologies() {
      const _technologies = await fetchTechnologies();
      setTechnologies(_technologies);
    }

    getTechnologies();
  }, []);

  return (
    <nav className="projects-nav">
      <span>
        <label>Search: </label>
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </span>
      <span>
        <label>Technologies: </label>
        <select
          value={technology}
          onChange={(e) => setTechnology(e.target.value)}
        >
          <option value="">Any</option>
          {technologies.length > 0 &&
            technologies.map((technology) => (
              <option key={technology.id} value={technology.name}>
                {technology.name}
              </option>
            ))}
        </select>
      </span>
    </nav>
  );
};

export default ProjectsNav;
