class OrderService {
    constructor(database) {
        this.ordersCollection = database.collection('orders');
    }

    async getOrders() {
        // Logique pour récupérer toutes les commandes
    }

    async getOrdersByPizza(pizzaName) {
        // Logique pour récupérer les commandes filtrées par recette de pizza
    }

    async getOrdersBySize(size) {
        // Logique pour récupérer les commandes filtrées par format
    }

    // Méthode optionnelle pour implémenter des filtres multiples
    async getOrdersWithFilters(filters) {
        // Logique pour récupérer les commandes avec des filtres multiples
    }
}

module.exports = OrderService;