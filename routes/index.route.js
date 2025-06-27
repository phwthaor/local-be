const homeRoute = require("./home.route");
const buildRoute = require("./build.route");

module.exports = (app) => {
  const version = "/";
  app.use(version, homeRoute);
  app.use(version + "Build", buildRoute);
};
