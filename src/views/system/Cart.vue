<template>
  <div>
    <v-container>
      <v-row>
        <v-col v-for="tool in tools" :key="tool.id">
          <v-card>
            <v-card-title>{{ tool.name }}</v-card-title>
            <v-card-subtitle>
              Price: {{ tool.price }}<br />
              <span>{{ tool.description }}</span>
            </v-card-subtitle>
            <v-card-actions>
              <v-btn v-if="!tool.purchased" @click="purchaseTool(tool.id)"> Purchased </v-btn>
              <v-btn v-else disabled> Purchased </v-btn>
              <v-btn @click="deleteTool(tool.id)">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { supabase } from '@/utils/supabase.js' // Ensure the correct path to your Supabase instance

export default {
  name: 'CartView',
  data() {
    return {
      tools: [],
    }
  },
  async created() {
    try {
      await this.fetchToolsAndCarts()
    } catch (error) {
      console.error('Error during initialization:', error)
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

    async purchaseTool(toolId) {
      try {
        const userId = localStorage.getItem('user_id')
        if (!userId) {
          throw new Error('User ID not found in localStorage')
        }

        // Update the purchased status in the carts table
        const { error } = await supabase
          .from('carts')
          .update({ purchased: true })
          .eq('user_id', userId)
          .eq('tool_id', toolId)
        if (error) throw error

        await this.fetchToolsAndCarts()
      } catch (error) {
        console.error('Error purchasing tool:', error)
      }
    },

    async deleteTool(toolId) {
      try {
        const { error } = await supabase.from('tools').delete().eq('id', toolId)
        if (error) throw error

        await this.fetchToolsAndCarts()
      } catch (error) {
        console.error('Error deleting tool:', error)
      }
    },
  },
}
</script>
