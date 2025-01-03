<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { defineProps } from 'vue'
import SideNavigation from './navigation/SideNavigation.vue'
import { shallowRef } from 'vue'
import { supabase } from '@/utils/supabase'
import { useRouter } from 'vue-router'

const selection = shallowRef(2) //each product
const props = defineProps({
  showLoginButton: {
    type: Boolean,
    default: true,
  },
  showSideNavigation: {
    type: Boolean,
    default: true,
  },
  showSearchBar: {
    type: Boolean,
    default: true,
  },
})

const tools = ref([])

const fetchTools = async () => {
  try {
    const { data, error } = await supabase.from('tools').select('*')

    if (error) {
      console.error('Error fetching tools:', error)
    } else {
      tools.value = data.map((tool) => {
        const fileName = tool.img
        const imageUrl = `${fileName}`
        console.log('Tool image URL:', {
          fileName,
          imageUrl,
          originalTool: tool,
        })
        return {
          ...tool,
          img: imageUrl,
        }
      })
    }
  } catch (error) {
    console.error('Unexpected error fetching tools:', error)
  }
}




onMounted(() => {
  fetchTools(),
  fetchCategories()
})

const categories = ref([])

const fetchCategories = async () => {
  const { data, error } = await supabase.from('categories').select('*')

  if (error) {
    console.error('Error fetching categories:', error)
  } else {
    categories.value = data
  }
}

const slides = [
  'images/slide1.png',
  'images/slide2.png',
  'images/slide3.png',
  'images/slide4.png',
  'images/slide5.png',
]

const loading = ref(false)
const router = useRouter()

const addToCart = async (toolId) => {
  loading.value = true
  const userId = localStorage.getItem('user_id')

  try {
    const { error } = await supabase.from('carts').insert([{ user_id: userId, tool_id: toolId }])

    if (error) {
      console.error('Error adding to cart:', error)
    } else {
      router.push('/cart')
    }
  } catch (err) {
    console.error('Unexpected error:', err)
  } finally {
    loading.value = false
  }
}

// Static tools data
const ftools = ref([
  {
    id: '3',
    img: '/images/impact2.png',
    name: 'Impact Drill',
    price: 8.00,
    description: 'Powerful, versatile tool designed for both professional and DIY use.',
    rating: 5.0,
  },
  {
    id: '1',
    img: '/images/grinder1.png',
    name: 'Grinder',
    price: 7.49,
    description: 'Versatile tool designed for cutting and polishing a variety of materials.',
    rating: 4.5,
  },
  {
    id: '4',
    img: '/images/shovel1.png',
    name: 'Shovel',
    price: 2.00,
    description: 'For both amateur gardeners and professional landscapers.',
    rating: 4.0,
  },
  {
    id: '2',
    img: '/images/hammer1.png',
    name: 'Hammer',
    price: 3.00,
    description: 'Essential tool designed for driving nails and performing various tasks.',
    rating: 4.0,
  },
  // Add more static tools as needed
])

// Scroll to All Tools Section
const scrollToAllTools = () => {
  const section = document.getElementById('all-tools-section');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Add search functionality
// The following variable holds the current search input
const searchQuery = ref('') // Holds the current search input

// Function to clear the search input
const clearSearch = () => {
  searchQuery.value = ''
}

// Computed property to filter tools based on search query
const filteredTools = computed(() => {
  if (!searchQuery.value) return tools.value // Return all tools if search query is empty
  return tools.value.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.value.toLowerCase()) // Filter based on name
  )
})
</script>








<template>
  <v-layout>
    <v-app-bar>
      <v-img
        src="images/translogotext.png"
        alt="Tool Rental Logo"
        max-height="20"
        contain
        class="ml-4"
      ></v-img>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-row class="justify-center" align="center" dense>
        <v-btn variant="plain">
    Category
    <v-icon class="ml-2" icon="mdi-chevron-down"></v-icon>

    <v-menu open-on-hover activator="parent">
      <v-list>
        <v-list-item v-for="category in categories" :key="category.id" link>
          <v-tooltip :open-on-hover="true" :close-on-content-click="false">
            <template #activator="{ props }">
              <v-list-item-title v-bind="props">{{ category.category_name }}</v-list-item-title>
            </template>
            <span>{{ category.description }}</span> <!-- Tooltip content -->
          </v-tooltip>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-btn>
        <v-btn text variant="plain" @click="scrollToAllTools">All Tools</v-btn>
        <RouterLink to="/about" class="text-grey-lighten-3"><v-btn text variant="plain">About</v-btn></RouterLink>
        <RouterLink to="/contacts" class="text-grey-lighten-3"><v-btn text variant="plain">Contact</v-btn></RouterLink>
      </v-row>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <RouterLink v-if="showLoginButton" class="text-decoration-none text-orange" to="/login"
        ><v-btn text color="amber-darken-3" class="mr-4" prepend-icon="mdi-account" variant="plain"
          >Login</v-btn
        ></RouterLink
      >
      
      <RouterLink v-if="showSearchBar" class="text-decoration-none text-orange" to=""
        ><v-btn icon="mdi-magnify" text color="amber-darken-3" class="mr-4" variant="plain"></v-btn
      ></RouterLink>

      

      <RouterLink v-if="showSearchBar" class="text-decoration-none text-orange" to="/cart"
        ><v-btn icon="mdi-cart" text color="amber-darken-3" class="mr-4" variant="plain"></v-btn
      ></RouterLink>
    </v-app-bar>

    <SideNavigation v-if="showSideNavigation"></SideNavigation>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px">
      <v-carousel height="650" :show-arrows="false" cycle hide-delimiter-background>
        <v-carousel-item v-for="(slide, index) in slides" :key="index">
          <v-img :src="slide" alt="Slide Image" cover></v-img>
        </v-carousel-item>
      </v-carousel>
    </v-main>
  </v-layout>

  <v-layout>
    <v-main>
      <v-container fluid>
        <v-row class="mt-5">
          <v-col cols="12">
            <h1 class="ml-5">Popular Tools</h1>
          </v-col>
          <v-col v-for="tool in ftools" :key="tool.id" cols="12" sm="6" md="4" lg="3" class="d-flex mx-auto">
            <v-card class="mx-auto mb-4 fixed-height" max-width="305">
              <v-img :src="tool.img" alt="Tool Image" max-height="165" contain></v-img>
              <v-card-title>
                <h2 class="text-h4">{{ tool.name }}</h2>
                <v-spacer></v-spacer>
                <span class="text-h6">${{ tool.price }}</span>
              </v-card-title>

              <v-card-text>
                {{ tool.description }}
              </v-card-text>
              <v-divider class="mx-4"></v-divider>

              <div class="d-flex align-center ml-4">
                <v-rating
                  readonly
                  v-model="tool.rating"
                  active-color="amber-darken-3"
                  color="grey lighten-2"
                  size="18"
                  half-increments
                ></v-rating>
                <span class="ml-2 text-caption">({{ tool.rating }})</span>
              </div>

              <v-card-actions>
                <v-btn
                  :loading="loading"
                  :disabled="loading"
                  color="orange-darken-3"
                  variant="flat"
                  block
                  @click="addToCart(tool.id)"
                >
                  Add to Cart
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mt-5">
    <v-col cols="12" id="all-tools-section">
      <h1 class="ml-5">All Tools</h1>
    </v-col>
    <v-col v-for="tool in tools" :key="tool.id" cols="12" sm="6" md="4" lg="3" class="d-flex mx-auto">
      <v-card class="mx-auto mb-4 fixed-height" max-width="305">
        <v-img :src="tool.img" alt="Tool Image" max-height="165" contain></v-img>
        <v-card-title>
          <h2 class="text-h4">{{ tool.name }}</h2>
          <v-spacer></v-spacer>
          <span class="text-h6">${{ tool.price }}</span>

          <!-- <v-spacer></v-spacer>
          <span class="text-grey-lighten-2 text-caption me-2">
          ({{ rating }})
          </span>
          <v-rating
            v-model="rating"
            active-color="yellow-accent-4"
            color="white"
            size="25"
            half-increments
            hover
          ></v-rating> -->
        </v-card-title>

        <v-card-text>
                {{ tool.description }}
              </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-chip-group
        v-model="selection"
        variant="flat"
        mandatory
      >
        <v-chip text="DeWalt" border></v-chip>
        <v-chip text="Bosch" border></v-chip>
        <v-chip text="Makita" border></v-chip>
        <v-chip text="Milwaukee" border></v-chip>
      </v-chip-group>
        <v-card-actions>
          <v-btn
            :loading="loading"
            :disabled="loading"
            color="orange-darken-3"
            variant="flat"
            block
            @click="addToCart(tool.id)"
          >
            Add to Cart
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

        
      </v-container>
    </v-main>
  </v-layout>

  <!-- Existing code -->

  <v-layout>
    <v-main>
      <v-container fluid>
        <!-- Content here -->
      </v-container>
    </v-main>
  </v-layout>

  <!-- Footer -->
  <footer style="background-color: black; color: white; padding: 20px; text-align: center">
    <div style="margin-bottom: 20px">
      <a
        href="https://www.facebook.com/eisancarlos12/"
        target="_blank"
        style="margin: 0 10px; color: white"
      >
        <v-icon icon="mdi-facebook"></v-icon>
      </a>
      <a href="https://instagram.com" target="_blank" style="margin: 0 10px; color: white">
        <v-icon icon="mdi-instagram"></v-icon>
      </a>
      <a href="https://x.com/carloseisan" target="_blank" style="margin: 0 10px; color: white">
        <v-icon icon="mdi-twitter"></v-icon>
      </a>
      <a href="https://plus.google.com" target="_blank" style="margin: 0 10px; color: white">
        <v-icon icon="mdi-google-plus"></v-icon>
      </a>
      <a
        href="https://www.youtube.com/@EISANCARLOSATAMOSA"
        target="_blank"
        style="margin: 0 10px; color: white"
      >
        <v-icon icon="mdi-youtube"></v-icon>
      </a>
    </div>
    <div>
      <a href="/" style="margin: 0 10px; color: white">Home</a>
      <a href="/news" style="margin: 0 10px; color: white">News</a>
      <a href="/about" style="margin: 0 10px; color: white">About</a>
      <a href="/contact" style="margin: 0 10px; color: white">Contact Us</a>
      <a href="/team" style="margin: 0 10px; color: white">Our Team</a>
    </div>

    <div style="margin-top: 20px; font-size: 14px">
      <a href="/">
        <v-img
          src="images/translogotext.png"
          alt="Tool Rental Logo"
          max-height="20"
          contain
          class="ml-4"
        ></v-img>
      </a>
    </div>
  </footer>
</template>

<style scoped>
.fixed-height {
  height: 427px; /* Adjust height based on your content */
  display: flex;
  flex-direction: column;
}

.flex-grow-1 {
  flex-grow: 1;
}
</style>
