const RestaurantOrdersSearch = {
    emits: ['orders-fetched'], 
    data() {
        return {
            restaurantCode: ''
        }
    },
    
    template: `
        <input type="text" v-model="restaurantCode">
        <button v-on:click="getOrders()">Buscar pedidos</button>
    `,
    
    methods: {
        async getOrders() {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/restaurants/${this.restaurantCode}/orders`);
                if (!response.ok) {
                    throw new Error(`Status: ${response.status}`)
                }
                const orders = await response.json();
                this.$emit('orders-fetched', { orders, restaurantCode: this.restaurantCode, showList: true });
                console.log(orders)
            } catch(error) {
                console.log(error.message)
                this.$emit('orders-fetched', { orders: [], restaurantCode: this.restaurantCode, showList: true });

            }
        }
    }
}

const app = Vue.createApp({
    data() {
        return {
            restaurantCode: '',
            ordersList: [],
            showList: false,
            showDetails: false,
            orderDetails: ''
        }
    },

    components: {
        RestaurantOrdersSearch
    },

    methods:{
        async getDetailsAndShow(orderCode) {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/restaurants/${this.restaurantCode}/orders/${orderCode}`)
                if (!response.ok) {
                    throw new Error(`Status: ${response.status}`)
                }
                this.orderDetails = await response.json();
                this.showList = false;
                this.showDetails = true;
                console.log(this.orderDetails)
            } catch(error) {
                console.log(error.message)
            }
        },

        backToList(orderCode) {
            this.showDetails = false;
            this.showList = true;
            orderIndex = this.ordersList.findIndex(item => item.code === orderCode);
            this.ordersList[orderIndex] = this.orderDetails;
            console.log(this.ordersList);
        },

        async updateOrder(orderCode, newStatus) {
            try {
                console.log(`http://localhost:3000/api/v1/restaurants/${this.restaurantCode}/orders/${orderCode}/${newStatus}`)
                const response = await fetch(`http://localhost:3000/api/v1/restaurants/${this.restaurantCode}/orders/${orderCode}/${newStatus}`, { method: 'PATCH' })
                if (!response.ok) {
                    throw new Error(`Status: ${response.status}`)
                }
                this.orderDetails = await response.json();
                this.showList = false;
                this.showDetails = true;
                console.log(this.orderDetails)
            } catch(error) {
                console.log(error.message)
            }
        }
    }
})

app.mount('#app')