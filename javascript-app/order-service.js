const mongoose = require('mongoose');

// Définition du schéma directement ici
const pizzaOrderSchema = new mongoose.Schema({
  name: String,
  size: String,
  price: Number,
  quantity: Number,
  date: Date,
});


const PizzaOrder = mongoose.model('PizzaOrder', pizzaOrderSchema);

class OrderService {
  constructor(dbClient) {
    this.dbClient = dbClient; 
  }

  async calculateMediumPizzasByRecipe() {
    const pipeline = [
      {
        $match: { size: "medium" }
      },
      {
        $group: {
          _id: "$name",
          totalQuantity: { $sum: "$quantity" }
        }
      }
    ];

    try {
      const result = await this.dbClient.collection('pizza_orders').aggregate(pipeline).toArray();
      return result;
    } catch (error) {
      console.error("Error calculating medium pizzas by recipe:", error);
      throw error;
    }
  }

  async calculateAveragePizzaQuantity() {
    const pipeline = [
      {
        $group: {
          _id: null,
          averageQuantity: { $avg: "$quantity" }
        }
      }
    ];

    try {
      const result = await this.dbClient.collection('pizza_orders').aggregate(pipeline).toArray();
      return result[0].averageQuantity; // Assuming there's only one result
    } catch (error) {
      console.error("Error calculating average pizza quantity:", error);
      throw error;
    }
  }
}

module.exports = OrderService;