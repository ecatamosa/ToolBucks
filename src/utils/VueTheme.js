import { createVuetify } from "vuetify/lib/framework.mjs";

export default createVuetify({
    theme: {
      themes: {
        light: {
          error: '#D32F2F', // Custom error color
        },
      },
    },
  });