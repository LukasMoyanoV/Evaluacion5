const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'eg-libros-react-master',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

