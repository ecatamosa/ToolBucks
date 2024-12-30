<template>
  <div>
    <h1>Rental List</h1>
    <div v-if="tools.length === 0">No tools available.</div>
    <ul v-else>
      <li v-for="tool in tools" :key="tool.id">
        <h2>{{ tool.name }}</h2>
        <p>Status: {{ tool.purchased ? 'Purchased' : 'Not Purchased' }}</p>
        <!-- Add more tool details as needed -->
      </li>
    </ul>
  </div>
</template>

<script>
import { supabase } from '@/utils/supabase'

export default {
  name: 'RentalList',
  data() {
    return {
      tools: [],
    }
  },
  methods: {
    async fetchToolsAndCarts() {
      try {
        const userId = localStorage.getItem('user_id')
        if (!userId) {
          throw new Error('User ID not found in localStorage')
        }

        // Fetch carts for the specific user
        const { data: carts, error: cartsError } = await supabase
          .from('carts')
          .select('*')
          .eq('user_id', userId)
          .eq('purchased', true)
        if (cartsError) throw cartsError

        const cartToolIds = carts.map((cart) => cart.tool_id)

        // Fetch tools that are in the user's cart
        const { data: tools, error: toolsError } = await supabase
          .from('tools')
          .select('*')
          .in('id', cartToolIds)
        if (toolsError) throw toolsError

        // Attach purchased status to tools
        this.tools = tools.map((tool) => {
          const cart = carts.find((cart) => cart.tool_id === tool.id)
          return { ...tool, purchased: cart ? cart.purchased : false }
        })
      } catch (error) {
        console.error('Error fetching tools and carts:', error)
      }
    },
  },
  mounted() {
    this.fetchToolsAndCarts()
  },
}
</script>

<style scoped>
h1 {
  font-size: 2em;
  margin-bottom: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
