const context = require.context('./logos', true, /\.(png|jpe?g|svg)$/);

const logo = {};

context.keys().forEach((path) => {
  logo[path.replace('./', '').replace(/\.\w+$/, '')] = context(path);
});

export default logo;