import pkg from '../../package.json';

const config = {
  name: pkg.name,
  feedbackEmail: process.env.FEEDBACK_EMAIL
};

export default config;
