<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header class="bg-white shadow">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5-5h2a2 2 0 012 2v7a2 2 0 01-2 2h-2a2 2 0 01-2-2v-7a2 2 0 012-2z" /></svg>
            <span class="text-xl font-bold text-red-500">Nhàvui</span>
          </div>
          <!-- Menu Center -->
          <div class="flex space-x-8">
            <nuxt-link to="/" exact-active-class="text-red-500 border-b-2 border-red-400" class="text-gray-800 hover:text-red-400 pb-1 transition">Trang chủ</nuxt-link>
            <nuxt-link to="/mua" exact-active-class="text-red-500 border-b-2 border-red-400" class="text-gray-800 hover:text-red-400 pb-1 transition">Mua</nuxt-link>
            <nuxt-link to="/thue" exact-active-class="text-red-500 border-b-2 border-red-400" class="text-gray-800 hover:text-red-400 pb-1 transition">Thuê</nuxt-link>
            <nuxt-link to="/du-an" exact-active-class="text-red-500 border-b-2 border-red-400" class="text-gray-800 hover:text-red-400 pb-1 transition">Dự án</nuxt-link>
            <nuxt-link to="/blog" exact-active-class="text-red-500 border-b-2 border-red-400" class="text-gray-800 hover:text-red-400 pb-1 transition">Blog</nuxt-link>
          </div>
          <!-- Right Side Buttons -->
          <div class="flex items-center space-x-2">
            <nuxt-link to="/login" class="text-red-500 hover:underline px-3 py-1 font-medium">Đăng nhập</nuxt-link>
            <nuxt-link to="/register" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition">Đăng kí</nuxt-link>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <nuxt />
    </main>

    <!-- Footer -->
    <footer class="bg-red-500">
      <div class="container mx-auto px-4 py-4">
        <p class="text-white text-center">© 2025 Real Estate. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
};
</script>

<style scoped>
/* Add any scoped styles if needed */
</style>
