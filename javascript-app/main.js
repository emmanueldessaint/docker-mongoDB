require('dotenv').config(); // Pour charger les variables d'environnement depuis le fichier .env
const mongoose = require('mongoose');
const OrderService = require('./order-service');

const dbURI = process.env.DB_URI;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connexion à la base de données réussie');

  const pizzaOrderSchema = new mongoose.Schema({
    name: String,
    size: String,
    price: Number,
    quantity: Number,
    date: Date,
  });

  const PizzaOrder = mongoose.model('PizzaOrder', pizzaOrderSchema);

  const orders = await PizzaOrder.find();

  // algos
  const totalAmount = orders.reduce((acc, order) => acc + (order.price * order.quantity), 0);
  const totalPizzas = orders.reduce((acc, order) => acc + order.quantity, 0);
  const totalVeganPizzas = orders.filter(order => order.name === 'Vegan').reduce((acc, order) => acc + order.quantity, 0);
  const totalLargePizzas = orders.filter(order => order.size === 'large').reduce((acc, order) => acc + order.quantity, 0);
  const pizzaSalesByRecipe = orders.reduce((acc, order) => {
    acc[order.name] = (acc[order.name] || 0) + order.quantity;
    return acc;
  }, {});
  const pizzaSalesBySize = orders.reduce((acc, order) => {
    acc[order.size] = (acc[order.size] || 0) + order.quantity;
    return acc;
  }, {});
  const pizzaRevenueByRecipe = orders.reduce((acc, order) => {
    acc[order.name] = (acc[order.name] || 0) + (order.price * order.quantity);
    return acc;
  }, {});

  // résultats
  console.log('a :', totalAmount);
  console.log('b :', totalPizzas);
  console.log('c :', totalVeganPizzas);
  console.log('d :', totalLargePizzas);
  console.log('e :', Object.keys(pizzaSalesByRecipe).reduce((a, b) => pizzaSalesByRecipe[a] > pizzaSalesByRecipe[b] ? a : b));
  console.log('f :', Object.keys(pizzaSalesBySize).reduce((a, b) => pizzaSalesBySize[a] > pizzaSalesBySize[b] ? a : b));
  console.log('g :', Object.keys(pizzaRevenueByRecipe).reduce((a, b) => pizzaRevenueByRecipe[a] > pizzaRevenueByRecipe[b] ? a : b));
}).catch((err) => console.error('Erreur de connexion', err));