<script setup>
import { ref, onMounted } from 'vue'
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
  fetchTools()
})

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
              <v-list-item v-for="i in 5" :key="i" link>
                <v-list-item-title>Item {{ i }}</v-list-item-title>
                <template v-slot:append>
                  <v-icon icon="mdi-menu-right" size="x-small"></v-icon>
                </template>
                <v-menu :open-on-focus="false" activator="parent" open-on-hover submenu>
                  <v-list>
                    <v-list-item v-for="j in 5" :key="j" link>
                      <v-list-item-title>Item {{ i }} - {{ j }}</v-list-item-title>
                      <template v-slot:append>
                        <v-icon icon="mdi-menu-right" size="x-small"></v-icon>
                      </template>
                      <v-menu :open-on-focus="false" activator="parent" open-on-hover submenu>
                        <v-list>
                          <v-list-item v-for="k in 5" :key="k" link>
                            <v-list-item-title>Item {{ i }} - {{ j }} - {{ k }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
        <v-btn text variant="plain">All Tools</v-btn>
        <RouterLink class="text-decoration-none text-grey-lighten-5" to="/rentals"
          ><v-btn text variant="plain">Rentals</v-btn></RouterLink
        >
        <v-btn text variant="plain">About</v-btn>
        <v-btn text variant="plain">Contact</v-btn>
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
            <h1 class="ml-5">Featured Tools</h1>
          </v-col>
          <v-col v-for="tool in tools" :key="tool.id" cols="12" sm="6" md="4" lg="3" class="d-flex">
            <v-card class="mx-auto mb-4" max-width="305">
              <!-- Adjust mb-4 for less spacing -->
              <v-img :src="tool.img" alt="Tool Image" max-height="200" contain></v-img>
              <v-card-title>
                <h2 class="text-h4">{{ tool.name }}</h2>
                <v-spacer></v-spacer>
                <span class="text-h6">${{ tool.price }}</span>
              </v-card-title>
              <v-card-text>
                {{ tool.description }}
              </v-card-text>
              <v-divider class="mx-4"></v-divider>
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
          <v-col cols="12">
            <h1 class="ml-5">Popular Tools</h1>
          </v-col>
          <v-col v-for="tool in tools" :key="tool.id" cols="12" sm="6" md="4" lg="3" class="d-flex">
            <v-card class="mx-auto mb-4" max-width="305">
              <!-- Adjust mb-4 for less spacing -->
              <v-img :src="tool.img" alt="Tool Image" max-height="200" contain></v-img>
              <v-card-title>
                <h2 class="text-h4">{{ tool.name }}</h2>
                <v-spacer></v-spacer>
                <span class="text-h6">${{ tool.price }}</span>
              </v-card-title>
              <v-card-text>
                {{ tool.description }}
              </v-card-text>
              <v-divider class="mx-4"></v-divider>
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
