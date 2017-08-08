module.exports = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.resolve.alias = { // eslint-disable-line
        'react-typing': '../../lib',
      };
    }

    return config;
  },
};
