const mongoose = require('mongoose');
console.log('step 1')
const dbURI = 'mongodb://localhost:27017';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbURI, options)
  .then(() => {
    console.log('connexion ok');
  })
  .catch((err) => console.error('err de connexion', err));