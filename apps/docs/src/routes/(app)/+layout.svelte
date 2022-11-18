<script>
  import './app.css';
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';
</script>

<div class="flex flex-col min-h-screen">
  <div class="sticky top-0 z-40"><Header /></div>
  <div class="flex flex-col flex-grow">
    <slot />
  </div>
  <Footer />
</div>
