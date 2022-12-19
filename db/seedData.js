const { createCategory, addCategoryToProject } = require("./categories");
const client = require("./client");
const { createImage } = require("./images");
const { addProject } = require("./projects");
const { addTechnologyToProject, createTechnology } = require("./technologies");
require("dotenv").config();
const { EMAIL, PASSWORD } = process.env;

const dropTables = async () => {
  try {
    console.log("-- Dropping Tables --");
    await client.query(`
    DROP TABLE IF EXISTS images;
    DROP TABLE IF EXISTS project_technologies;
    DROP TABLE IF EXISTS technologies;
    DROP TABLE IF EXISTS project_categories;
    DROP TABLE IF EXISTS categories;
    DROP TABLE IF EXISTS projects;
    DROP TABLE IF EXISTS admins;
    `);
    console.log("-- Tables Dropped --");
  } catch (error) {
    console.error(error);
  }
};

const createTables = async () => {
  try {
    console.log("Creating projects table ...");
    await client.query(`CREATE TABLE projects(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        published DATE,
        description TEXT,
        url VARCHAR(255),
        github VARCHAR(255),
        active BOOLEAN DEFAULT true
    );`);

    console.log("Creating images table ...");
    await client.query(`CREATE TABLE images(
        id SERIAL PRIMARY KEY,
        url VARCHAR(255),
        alt VARCHAR(255),
        "projectId" INTEGER REFERENCES projects(id)
    );`);

    console.log("Creating technologies table ...");
    await client.query(`CREATE TABLE technologies(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        icon TEXT,
        color VARCHAR(255)
    );`);

    console.log("Creating project_technologies table ...");
    await client.query(`CREATE TABLE project_technologies(
        id SERIAL PRIMARY KEY,
        "projectId" INTEGER REFERENCES projects(id),
        "technologyId" INTEGER REFERENCES technologies(id)
    );`);

    console.log("Creating categories table ...");
    await client.query(`CREATE TABLE categories(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255)
    );`);

    console.log("Creating project_categories table ...");
    await client.query(`CREATE TABLE project_categories(
      id SERIAL PRIMARY KEY,
      "projectId" INTEGER REFERENCES projects(id),
      "categoryId" INTEGER REFERENCES categories(id)
    );`);

    console.log("Creating admin table ...");
    await client.query(`CREATE TABLE admins(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )`);

    console.log("Tables created");
  } catch (error) {
    console.error(error);
  }
};

const createAdmin = async () => {
  console.log("Creating Admin ... ");
  try {
    const { id } = await createAdmin({
      name: "James",
      email: EMAIL,
      password: PASSWORD,
    });
  } catch (error) {
    console.error(error);
  }
};

const populate = async () => {
  const project1 = await addProject({
    title: "Sauce Boss",
    published: "2022-12-03",
    description:
      "Sauce Boss is a full stack web application which allows customers to customize and order pizzas or save them in their cart for later. The application also allows an admin to add, edit and remove products as well as set prices and track inventory.",
    url: "https://sauceboss.onrender.com/",
    github: "https://github.com/Cileb/grace-shopper",
  });

  await createImage({
    url: "https://storage.cloud.google.com/portfolio-web-static-files-9867/Capture.JPG",
    alt: "Homepage for Sauce Boss featuring pizzas available to order. A pizza logo is displayed in top left corner, login and cart buttons are in the top right corner.",
    projectId: 1,
  });

  await createImage({
    url: "https://storage.cloud.google.com/portfolio-web-static-files-9867/Capture_1.JPG",
    alt: "Diagram showing the database structure for Sauce Boss",
    projectId: 1,
  });

  const project2 = await addProject({
    title: "The Art Collector",
    published: "2022-08-28",
    description: `The Art Collector utilizes the Harvard Art Museum api and provides the user with tools to search and filter through the collection.`,
    url: "https://jbarrett-art-collector.netlify.app/",
    github: "https://github.com/JBarrett9/art_collector",
  });

  await createImage({
    url: "https://storage.cloud.google.com/portfolio-web-static-files-9867/Capture_10.JPG",
    alt: "The Art Collector homepage with the painting 'Wind in the Pines' secelcted and its details displayed.",
    projectId: 2,
  });

  const project3 = await addProject({
    title: "Connect 4",
    published: "2022-07-31",
    description:
      "Connect 4 is based on the classic game of the same name. This web application allows you to play either against the computer or a local opponent. The computer is programmed to try and win the game. The underlying idea of this project however was handling state with vanilla Javascript.",
    url: "https://jbarrett-arcade.netlify.app/",
    github: "https://github.com/JBarrett9/arcade",
  });

  await createImage({
    url: "https://storage.cloud.google.com/portfolio-web-static-files-9867/Capture_6.JPG",
    alt: "An image showing connect 4 gameplay",
    projectId: 3,
  });

  await addProject({
    title: "NRV Water Quality",
    published: "2022-05-4",
    description: "",
    github: "https://github.com/JBarrett9/water_quality",
  });

  createImage({
    url: "https://storage.cloud.google.com/portfolio-web-static-files-9867/fig_9.JPG",
    alt: "Graph of chloride concentration data from Virginia Tech for March 24, 2013 to March 27, 2013",
    projectId: 4,
  });

  createImage({
    url: "https://storage.cloud.google.com/portfolio-web-static-files-9867/Capture_16.JPG",
    alt: "The initial prompt asking the user to select a data set",
    projectId: 4,
  });

  createImage({
    url: "https://storage.cloud.google.com/portfolio-web-static-files-9867/Capture_18.JPG",
    alt: "prompt asking user to choose what data they would like to look at",
    projectId: 4,
  });

  createImage({
    url: "https://storage.cloud.google.com/portfolio-web-static-files-9867/Capture_17.JPG",
    alt: "A graph showing choride concentration and relevant code for drawing graph",
    projectId: 4,
  });

  createImage({
    url: "https://storage.cloud.google.com/portfolio-web-static-files-9867/Capture_19.JPG",
    alt: "A table of events exceeding EPA recommendations with the times and durations of those events",
    projectId: 4,
  });

  createImage({
    url: "https://storage.cloud.google.com/portfolio-web-static-files-9867/Capture_20.JPG",
    alt: "Two graphs and data tables displaying pH level data",
    projectId: 4,
  });

  await addProject({
    title: "Stranger's Things",
    published: "2022-09-17",
    description:
      "Stranger's Things is a website which allows the community of registered users to post items for sale and contact the sellers of items they're interested in.",
    url: "https://jbarrett-strangers-things.netlify.app/posts",
    github: "https://github.com/JBarrett9/strangers_things_project",
  });

  await createImage({
    url: "https://storage.cloud.google.com/portfolio-web-static-files-9867/Capture_11.JPG",
    alt: "Screenshot of the posts view of Stranger's Things",
    projectId: 5,
  });

  await createImage({
    url: "https://storage.cloud.google.com/portfolio-web-static-files-9867/Capture_8.JPG",
    alt: "Creating a new post on Stranger's Things",
    projectId: 5,
  });

  await addProject({
    title: "Guessing Game",
    published: "2022-07-16",
    description:
      "This is a fairly simple game that asks the user to guess a number. Some entertainment value has been added through the use of pop culture references and heightened difficulty given that the computer will only tell you if you're close, not whether your guess was high or low. Unless of course you use one of your three hints.",
    url: "https://jbarrett-guessing-game.netlify.app/",
    github: "https://github.com/JBarrett9/UNIV_Guessing_Game_Starter",
  });

  await createImage({
    url: "https://storage.cloud.google.com/portfolio-web-static-files-9867/Capture_13.JPG",
    alt: "Gameplay image of Guessing Game showing feedback to a users wrong answer",
    projectId: 6,
  });

  await createImage({
    url: "https://storage.cloud.google.com/portfolio-web-static-files-9867/Capture_14.JPG",
    alt: "Game Over",
    projectId: 6,
  });

  await createImage({
    url: "https://storage.cloud.google.com/portfolio-web-static-files-9867/Capture_15.JPG",
    alt: "A helpful hint",
    projectId: 6,
  });

  await addProject({
    title: "Poetry Generator",
    published: "2022-07-10",
    description:
      "This program uses a markov chain to generate poetry based on the lyrics of popular songs.",
    url: "https://jamesbarrett.dev/mini_projects/romance",
    github: "https://github.com/JBarrett9/romance",
  });

  await createImage({
    url: "https://storage.cloud.google.com/portfolio-web-static-files-9867/Capture_22.JPG",
    alt: `Poem generated based on Katy Perry's Firework titled "You're Gonna Leave 'Em"`,
    projectId: 7,
  });

  const express = await createTechnology({
    name: "Express JS",
    icon: "",
    color: "",
  });

  const postgres = await createTechnology({
    name: "PostgreSQL",
    icon: "M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z",
    color: "#c4f5fc",
  });

  const node = await createTechnology({
    name: "Node JS",
    icon: "M 12 1.85 C 11.73 1.85 11.45 1.92 11.22 2.05 L 3.78 6.35 C 3.3 6.63 3 7.15 3 7.71 V 16.29 C 3 16.85 3.3 17.37 3.78 17.65 L 5.73 18.77 C 6.68 19.23 7 19.24 7.44 19.24 C 8.84 19.24 9.65 18.39 9.65 16.91 V 8.44 C 9.65 8.32 9.55 8.22 9.43 8.22 H 8.5 C 8.37 8.22 8.27 8.32 8.27 8.44 V 16.91 C 8.27 17.57 7.59 18.22 6.5 17.67 L 4.45 16.5 C 4.38 16.45 4.34 16.37 4.34 16.29 V 7.71 C 4.34 7.62 4.38 7.54 4.45 7.5 L 11.89 3.21 C 11.95 3.17 12.05 3.17 12.11 3.21 L 19.55 7.5 C 19.62 7.54 19.66 7.62 19.66 7.71 V 16.29 C 19.66 16.37 19.62 16.45 19.55 16.5 L 12.11 20.79 C 12.05 20.83 11.95 20.83 11.88 20.79 L 10 19.65 C 9.92 19.62 9.84 19.61 9.79 19.64 C 9.26 19.94 9.16 20 8.67 20.15 C 8.55 20.19 8.36 20.26 8.74 20.47 L 11.22 21.94 C 11.46 22.08 11.72 22.15 12 22.15 C 12.28 22.15 12.54 22.08 12.78 21.94 L 20.22 17.65 C 20.7 17.37 21 16.85 21 16.29 V 7.71 C 21 7.15 20.7 6.63 20.22 6.35 L 12.78 2.05 C 12.55 1.92 12.28 1.85 12 1.85 M 14 8 C 11.88 8 10.61 8.89 10.61 10.39 C 10.61 12 11.87 12.47 13.91 12.67 C 16.34 12.91 16.53 13.27 16.53 13.75 C 16.53 14.58 15.86 14.93 14.3 14.93 C 12.32 14.93 11.9 14.44 11.75 13.46 C 11.73 13.36 11.64 13.28 11.53 13.28 H 10.57 C 10.45 13.28 10.36 13.37 10.36 13.5 C 10.36 14.74 11.04 16.24 14.3 16.24 C 16.65 16.24 18 15.31 18 13.69 C 18 12.08 16.92 11.66 14.63 11.35 C 12.32 11.05 12.09 10.89 12.09 10.35 C 12.09 9.9 12.29 9.3 14 9.3 C 15.5 9.3 16.09 9.63 16.32 10.66 C 16.34 10.76 16.43 10.83 16.53 10.83 H 17.5 C 17.55 10.83 17.61 10.81 17.65 10.76 C 17.69 10.72 17.72 10.66 17.7 10.6 C 17.56 8.82 16.38 8 14 8 Z",
    color: "#b7ffd8",
  });

  const react = await createTechnology({
    name: "React JS",
    icon: "M 12 10.11 C 13.03 10.11 13.87 10.95 13.87 12 C 13.87 13 13.03 13.85 12 13.85 C 10.97 13.85 10.13 13 10.13 12 C 10.13 10.95 10.97 10.11 12 10.11 M 7.37 20 C 8 20.38 9.38 19.8 10.97 18.3 C 10.45 17.71 9.94 17.07 9.46 16.4 C 8.64 16.32 7.83 16.2 7.06 16.04 C 6.55 18.18 6.74 19.65 7.37 20 M 8.08 14.26 L 7.79 13.75 C 7.68 14.04 7.57 14.33 7.5 14.61 C 7.77 14.67 8.07 14.72 8.38 14.77 C 8.28 14.6 8.18 14.43 8.08 14.26 M 14.62 13.5 L 15.43 12 L 14.62 10.5 C 14.32 9.97 14 9.5 13.71 9.03 C 13.17 9 12.6 9 12 9 C 11.4 9 10.83 9 10.29 9.03 C 10 9.5 9.68 9.97 9.38 10.5 L 8.57 12 L 9.38 13.5 C 9.68 14.03 10 14.5 10.29 14.97 C 10.83 15 11.4 15 12 15 C 12.6 15 13.17 15 13.71 14.97 C 14 14.5 14.32 14.03 14.62 13.5 M 12 6.78 C 11.81 7 11.61 7.23 11.41 7.5 C 11.61 7.5 11.8 7.5 12 7.5 C 12.2 7.5 12.39 7.5 12.59 7.5 C 12.39 7.23 12.19 7 12 6.78 M 12 17.22 C 12.19 17 12.39 16.77 12.59 16.5 C 12.39 16.5 12.2 16.5 12 16.5 C 11.8 16.5 11.61 16.5 11.41 16.5 C 11.61 16.77 11.81 17 12 17.22 M 16.62 4 C 16 3.62 14.62 4.2 13.03 5.7 C 13.55 6.29 14.06 6.93 14.54 7.6 C 15.36 7.68 16.17 7.8 16.94 7.96 C 17.45 5.82 17.26 4.35 16.62 4 M 15.92 9.74 L 16.21 10.25 C 16.32 9.96 16.43 9.67 16.5 9.39 C 16.23 9.33 15.93 9.28 15.62 9.23 C 15.72 9.4 15.82 9.57 15.92 9.74 M 17.37 2.69 C 18.84 3.53 19 5.74 18.38 8.32 C 20.92 9.07 22.75 10.31 22.75 12 C 22.75 13.69 20.92 14.93 18.38 15.68 C 19 18.26 18.84 20.47 17.37 21.31 C 15.91 22.15 13.92 21.19 12 19.36 C 10.08 21.19 8.09 22.15 6.62 21.31 C 5.16 20.47 5 18.26 5.62 15.68 C 3.08 14.93 1.25 13.69 1.25 12 C 1.25 10.31 3.08 9.07 5.62 8.32 C 5 5.74 5.16 3.53 6.62 2.69 C 8.09 1.85 10.08 2.81 12 4.64 C 13.92 2.81 15.91 1.85 17.37 2.69 M 17.08 12 C 17.42 12.75 17.72 13.5 17.97 14.26 C 20.07 13.63 21.25 12.73 21.25 12 C 21.25 11.27 20.07 10.37 17.97 9.74 C 17.72 10.5 17.42 11.25 17.08 12 M 6.92 12 C 6.58 11.25 6.28 10.5 6.03 9.74 C 3.93 10.37 2.75 11.27 2.75 12 C 2.75 12.73 3.93 13.63 6.03 14.26 C 6.28 13.5 6.58 12.75 6.92 12 M 15.92 14.26 C 15.82 14.43 15.72 14.6 15.62 14.77 C 15.93 14.72 16.23 14.67 16.5 14.61 C 16.43 14.33 16.32 14.04 16.21 13.75 L 15.92 14.26 M 13.03 18.3 C 14.62 19.8 16 20.38 16.62 20 C 17.26 19.65 17.45 18.18 16.94 16.04 C 16.17 16.2 15.36 16.32 14.54 16.4 C 14.06 17.07 13.55 17.71 13.03 18.3 M 8.08 9.74 C 8.18 9.57 8.28 9.4 8.38 9.23 C 8.07 9.28 7.77 9.33 7.5 9.39 C 7.57 9.67 7.68 9.96 7.79 10.25 L 8.08 9.74 M 10.97 5.7 C 9.38 4.2 8 3.62 7.37 4 C 6.74 4.35 6.55 5.82 7.06 7.96 C 7.83 7.8 8.64 7.68 9.46 7.6 C 9.94 6.93 10.45 6.29 10.97 5.7 Z",
    color: "#c4f5fc",
  });

  const html = await createTechnology({
    name: "html5",
    icon: "M 12 17.56 L 16.07 16.43 L 16.62 10.33 H 9.38 L 9.2 8.3 H 16.8 L 17 6.31 H 7 L 7.56 12.32 H 14.45 L 14.22 14.9 L 12 15.5 L 9.78 14.9 L 9.64 13.24 H 7.64 L 7.93 16.43 L 12 17.56 M 4.07 3 H 19.93 L 18.5 19.2 L 12 21 L 5.5 19.2 L 4.07 3 Z",
    color: "#ffc1cf",
  });

  const css = await createTechnology({
    name: "css3",
    icon: "M 5 3 L 4.35 6.34 H 17.94 L 17.5 8.5 H 3.92 L 3.26 11.83 H 16.85 L 16.09 15.64 L 10.61 17.45 L 5.86 15.64 L 6.19 14 H 2.85 L 2.06 18 L 9.91 21 L 18.96 18 L 20.16 11.97 L 20.4 10.76 L 21.94 3 H 5 Z",
    color: "#c4f5fc",
  });

  const javascript = await createTechnology({
    name: "Javascript",
    icon: "M 3 3 H 21 V 21 H 3 V 3 M 7.73 18.04 C 8.13 18.89 8.92 19.59 10.27 19.59 C 11.77 19.59 12.8 18.79 12.8 17.04 V 11.26 H 11.1 V 17 C 11.1 17.86 10.75 18.08 10.2 18.08 C 9.62 18.08 9.38 17.68 9.11 17.21 L 7.73 18.04 M 13.71 17.86 C 14.21 18.84 15.22 19.59 16.8 19.59 C 18.4 19.59 19.6 18.76 19.6 17.23 C 19.6 15.82 18.79 15.19 17.35 14.57 L 16.93 14.39 C 16.2 14.08 15.89 13.87 15.89 13.37 C 15.89 12.96 16.2 12.64 16.7 12.64 C 17.18 12.64 17.5 12.85 17.79 13.37 L 19.1 12.5 C 18.55 11.54 17.77 11.17 16.7 11.17 C 15.19 11.17 14.22 12.13 14.22 13.4 C 14.22 14.78 15.03 15.43 16.25 15.95 L 16.67 16.13 C 17.45 16.47 17.91 16.68 17.91 17.26 C 17.91 17.74 17.46 18.09 16.76 18.09 C 15.93 18.09 15.45 17.66 15.09 17.06 L 13.71 17.86 Z",
    color: "#ffc1cf",
  });

  const matlab = await createTechnology({
    name: "MATLAB",
    icon: "",
    color: "",
  });

  await addTechnologyToProject({
    projectId: 1,
    technologyId: javascript.id,
  });

  await addTechnologyToProject({
    projectId: 1,
    technologyId: express.id,
  });

  await addTechnologyToProject({
    projectId: 1,
    technologyId: postgres.id,
  });

  await addTechnologyToProject({
    projectId: 1,
    technologyId: node.id,
  });

  await addTechnologyToProject({
    projectId: 1,
    technologyId: react.id,
  });

  await addTechnologyToProject({
    projectId: 1,
    technologyId: html.id,
  });

  await addTechnologyToProject({
    projectId: 1,
    technologyId: css.id,
  });

  await addTechnologyToProject({
    projectId: 2,
    technologyId: html.id,
  });

  await addTechnologyToProject({
    projectId: 2,
    technologyId: css.id,
  });

  await addTechnologyToProject({
    projectId: 2,
    technologyId: javascript.id,
  });

  await addTechnologyToProject({
    projectId: 2,
    technologyId: react.id,
  });

  await addTechnologyToProject({
    projectId: 3,
    technologyId: html.id,
  });

  await addTechnologyToProject({
    projectId: 3,
    technologyId: css.id,
  });

  await addTechnologyToProject({
    projectId: 3,
    technologyId: javascript.id,
  });

  await addTechnologyToProject({
    projectId: 4,
    technologyId: matlab.id,
  });

  await addTechnologyToProject({
    projectId: 5,
    technologyId: react.id,
  });

  await addTechnologyToProject({
    projectId: 5,
    technologyId: html.id,
  });

  await addTechnologyToProject({
    projectId: 5,
    technologyId: css.id,
  });

  await addTechnologyToProject({
    projectId: 5,
    technologyId: javascript.id,
  });

  await addTechnologyToProject({
    projectId: 6,
    technologyId: html.id,
  });

  await addTechnologyToProject({
    projectId: 6,
    technologyId: css.id,
  });

  await addTechnologyToProject({
    projectId: 6,
    technologyId: javascript.id,
  });

  await addTechnologyToProject({
    projectId: 7,
    technologyId: html.id,
  });

  await addTechnologyToProject({
    projectId: 7,
    technologyId: css.id,
  });

  await addTechnologyToProject({
    projectId: 7,
    technologyId: javascript.id,
  });

  const full = await createCategory("Full Project");

  const mini = await createCategory("Mini Project");

  const problem = await createCategory("Coding Problem");

  const rest = await createCategory("RESTful API");

  const crud = await createCategory("CRUD");

  const pern = await createCategory("PERN");

  const ecommerce = await createCategory("ECommerce");

  const game = await createCategory("Game");

  const vanillaJs = await createCategory("Vanilla Javascript");

  await addCategoryToProject({ projectId: 1, categoryId: full.id });

  await addCategoryToProject({ projectId: 1, categoryId: rest.id });

  await addCategoryToProject({ projectId: 1, categoryId: crud.id });

  await addCategoryToProject({ projectId: 1, categoryId: pern.id });

  await addCategoryToProject({ projectId: 1, categoryId: ecommerce.id });

  await addCategoryToProject({ projectId: 2, categoryId: full.id });

  await addCategoryToProject({ projectId: 3, categoryId: full.id });

  await addCategoryToProject({ projectId: 4, categoryId: full.id });

  await addCategoryToProject({ projectId: 5, categoryId: vanillaJs.id });

  await addCategoryToProject({ projectId: 3, categoryId: game.id });

  await addCategoryToProject({ projectId: 5, categoryId: full.id });

  await addCategoryToProject({ projectId: 5, categoryId: vanillaJs.id });

  await addCategoryToProject({ projectId: 6, categoryId: mini.id });

  await addCategoryToProject({ projectId: 6, categoryId: vanillaJs.id });

  await addCategoryToProject({ projectId: 7, categoryId: mini.id });

  await addCategoryToProject({ projectId: 7, categoryId: vanillaJs.id });
};

const rebuildDB = async () => {
  try {
    await dropTables();
    await createTables();
    await populate();
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createTables,
  dropTables,
  rebuildDB,
};
