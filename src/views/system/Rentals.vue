<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1 class="text-center">Rental List</h1>
          <v-btn @click="goHome" class="mb-4 me-3" color="amber-darken-3" variant="plain"><v-icon class="hover-icon">mdi-arrow-left</v-icon> Back to Dashboard</v-btn>
          <RouterLink to="/cart"><v-btn class="mb-4" color="amber-darken-3">Go to Cart</v-btn></RouterLink>
          <div v-if="loading">Loading...</div>
          <div v-if="tools.length === 0">No tools available.</div>
          <v-list v-else>
            <v-list-item-group>
              <v-list-item v-for="tool in tools" :key="tool.id">
                <v-list-item-content>
                  <v-list-item-title>{{ tool.name }}</v-list-item-title>
                  <v-list-item-subtitle>
                    Status: {{ tool.purchased ? 'Rented' : 'Not Rented' }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { supabase } from '@/utils/supabase'
import { useRouter } from 'vue-router'

export default {
  name: 'RentalList',
  data() {
    return {
      tools: [],
      loading: true,
    }
  },
  setup() {
    const router = useRouter()
    return { router }
  },
  methods: {
    async fetchToolsAndCarts() {
      const userId = localStorage.getItem('user_id')
      const { data: carts, error: cartsError } = await supabase
        .from('carts')
        .select('*')
        .eq('user_id', userId)
        .eq('purchased', true);
      if (cartsError) throw cartsError;

      const cartToolIds = carts.map(cart => cart.tool_id);
      const { data: tools, error: toolsError } = await supabase
        .from('tools')
        .select('*')
        .in('id', cartToolIds);
      if (toolsError) throw toolsError;

      this.tools = tools.map(tool => {
        const cart = carts.find(cart => cart.tool_id === tool.id);
        return { ...tool, purchased: cart ? cart.purchased : false };
      });
    },
    goHome() {
      this.router.push('/')
    },
    
  },
  mounted() {
    this.fetchToolsAndCarts();
    this.loading = false;
  },

  
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>