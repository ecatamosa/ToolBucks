<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1 class="text-center">Shopping Cart</h1>
          <v-btn @click="goHome" class="mb-4 me-3" color="amber-darken-3" variant="plain"><v-icon class="hover-icon">mdi-arrow-left</v-icon> Back to Dashboard</v-btn>
          <RouterLink to="/rentals"><v-btn class="mb-4" color="amber-darken-3">Go to Rentals</v-btn></RouterLink>
          <div v-if="loading">Loading...</div>
          <v-row>
            <v-col v-for="cart in carts" :key="cart.id" cols="12" md="6" lg="4">
              <v-card class="mb-4">
                <v-card-title>{{ cart.tool_name }}</v-card-title>
                <v-card-subtitle>
                  <div>Price: {{ cart.price }}</div>
                  <div>{{ cart.description }}</div>
                </v-card-subtitle>
                <v-card-actions>
                  <v-btn v-if="!cart.purchased" @click="purchaseTool(cart.tool_id)" color="amber-darken-3">Rent</v-btn>
                  <v-btn v-else disabled color="grey">Rented</v-btn>
                  <v-btn @click="deleteTool(cart.id)" color="red"><v-icon>mdi-delete</v-icon></v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { supabase } from '@/utils/supabase'
import { useRouter } from 'vue-router'

export default {
  name: 'CartView',
  data() {
    return {
      carts: [],
      loading: true,
    }
  },
  setup() {
    const router = useRouter()
    return { router }
  },
  async created() {
    await this.fetchToolsAndCarts();
    this.loading = false;
  },
  methods: {
    async fetchToolsAndCarts() {
      const userId = localStorage.getItem('user_id')
      const { data: carts, error: cartsError } = await supabase
        .from('carts')
        .select('*')
        .eq('user_id', userId);
      if (cartsError) throw cartsError;

      const cartToolIds = carts.map(cart => cart.tool_id);
      const { data: tools, error: toolsError } = await supabase
        .from('tools')
        .select('*')
        .in('id', cartToolIds);
      if (toolsError) throw toolsError;

      this.carts = carts.map(cart => {
        const tool = tools.find(tool => tool.id === cart.tool_id);
        return {
          ...cart,
          tool_name: tool ? tool.name : 'Unknown',
          price: tool ? tool.price : 0,
          description: tool ? tool.description : 'No description available',
        };
      });
    },

    async purchaseTool(toolId) {
      const userId = localStorage.getItem('user_id');
      const { error } = await supabase
        .from('carts')
        .update({ purchased: true })
        .eq('user_id', userId)
        .eq('tool_id', toolId);
      if (error) throw error;

      await this.fetchToolsAndCarts(); // Re-fetch to update the cart
    },

    async deleteTool(cartId) {
      const { error } = await supabase
        .from('carts')
        .delete()
        .eq('id', cartId);
      if (error) throw error;

      await this.fetchToolsAndCarts(); // Re-fetch to update the cart
    },

    goHome() {
      this.router.push('/')
    },

    
  },
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
.v-card {
  transition: box-shadow 0.3s;
}
.v-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
</style>