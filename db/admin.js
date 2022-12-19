const client = require("./client");
const bcrypt = require("bcrypt");

const createAdmin = async (params) => {
  try {
    const { name, email, password } = params;
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const { rows: admin } = await client.query(
      `INSERT INTO admins(name, email, password) 
        VALUES ($1, $2, $3)
        RETURNING id, name, email;`,
      [name, email, hashedPassword]
    );

    return admin;
  } catch (error) {
    console.error(error);
  }
};

const getAdmin = async (params) => {
  const { email, password } = params;

  try {
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      const {
        rows: [admin],
      } = await client.query(
        `
      SELECT id, name, email FROM admins
      WHERE email=$1;
      `,
        [email]
      );
      return admin;
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createAdmin, getAdmin };
