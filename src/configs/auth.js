module.exports = {
  jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: "1d",
  },
};
