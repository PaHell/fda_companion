import staticAdapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    adapter: staticAdapter({
      out: '/public',
      fallback: 'index.html'
    }),
    alias: {
      '$src': 'src',
    }
  },
};

export default config;
