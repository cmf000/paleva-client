const messages = {
    pt: {
        statuses: {
            pending_kitchen: 'Aguardando confirmação da cozinha',
            preparing: 'Em preparação',
            cancelled: 'Cancelado',
            ready: 'Pronto',
            delivered: 'Entregue'
        }
    }
}

const i18n = VueI18n.createI18n({
    locale: 'pt',
    messages
})

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
                const data = await response.json();
                orders = data.sort( (a, b) => { return new Date(b.placed_at) - new Date(a.placed_at )})
                this.$emit('orders-fetched', { orders, restaurantCode: this.restaurantCode, showList: true });
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
            orderDetails: '',
            showCancellationMenu: false,
            cancellationNote: ''
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
                const response = await fetch(`http://localhost:3000/api/v1/restaurants/${this.restaurantCode}/orders/${orderCode}/${newStatus}`, { method: 'PATCH' })
                if (!response.ok) {
                    throw new Error(`Status: ${response.status}`)
                }
                this.orderDetails = await response.json();
                this.showList = false;
                this.showDetails = true;
            } catch(error) {
                console.log(error.message);
            }
        },

        formatDateTime(date) {
            const dateObject = new Date(date);
            return dateObject.toLocaleString('pt-BR');
        },

        async cancelOrder(orderCode) {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/v1/restaurants/${this.restaurantCode}/orders/${orderCode}/cancelled`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                                order: {
                                    cancellation_note: this.cancellationNote
                                }
                        })
                    }
                );
                if (!response.ok) {
                    throw new Error(`Status: ${response.status}`)
                }
                this.orderDetails = await response.json();
                this.showCancellationMenu = false;
                this.backToList(orderCode);
            } catch(error) {
                console.log(error.message);
            }
        }
    }
})

app.use(i18n)
app.mount('#app')


