<!-- layouts/default.vue -->
<template>
  <div class="flex flex-col min-h-screen bg-white">
    <!-- Navbar -->
    <header class="fixed top-0 left-0 z-30 w-full bg-white shadow" role="banner">
      <Navbar />
    </header>

    <!-- Main Content -->
    <main
      id="main-content"
      class="flex-1 pt-[92px]"
      tabindex="-1"
      role="main"
    >
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="mt-auto" role="contentinfo">
      <Footer />
    </footer>
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
</script>

<style scoped>
/* Đảm bảo không có padding/margin thừa */
main {
  padding: 0;
  outline: none;
}
</style>
