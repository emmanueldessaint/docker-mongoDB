const mongoose = require('mongoose');

console.log('step 1')
const dbURI = 'mongodb://localhost:27017/pizzas_orders_db';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const pizzaOrderSchema = new mongoose.Schema({
  name: String,
  size: String,
  price: Number,
  quantity: Number,
  date: Date,
});

const PizzaOrder = mongoose.model('PizzaOrder', pizzaOrderSchema);

mongoose.connect(dbURI, options)
  .then(async () => {
    console.log('Connexion à la base de données réussie');

    const orders = await PizzaOrder.find();

    console.log('Contenu de la base de données :', orders);
  })
  .catch((err) => console.error('Erreur de connexion', err));