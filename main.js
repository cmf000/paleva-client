const app = Vue.createApp({
    data() {
        return {
            restaurantCode: '',
            ordersList: [],
            selectedOrder: null,
            orderDetails: []
        }
    },

    methods: {
        async getOrders() {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/restaurants/${this.restaurantCode}/orders`);
                if (!response.ok) {
                    throw new Error(`Status: ${response.status}`)
                }
                this.ordersList = await response.json();
            } catch(error) {
                console.log(error.message)
            }
        },
        async getOrderDetails(orderCode) {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/restaurants/${this.restaurantCode}/orders/${orderCode}`)
                if (!response.ok) {
                    throw new Error(`Status: ${response.status}`)
                }
                this.orderDetails = await response.json();
                console.log(this.orderDetails)
            } catch(error) {
                console.log(error.message)
            }
        }
    }
})

app.mount('#app')