<template>
  <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
    <h1 class="mb-6 text-2xl font-bold text-center text-gray-800">Đăng nhập</h1>
    <form @submit.prevent="handleLogin">
      <!-- Email -->
      <div class="mb-4">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-600">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Nhập email"
          required
        />
      </div>

      <!-- Password -->
      <div class="mb-4">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-600">Mật khẩu</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Nhập mật khẩu"
          required
        />
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
      >
        Đăng nhập
      </button>
    </form>

    <!-- Register Link -->
    <p class="mt-4 text-sm text-center text-gray-600">
      Chưa có tài khoản?
      <nuxt-link to="/register" class="text-red-500 hover:underline">Đăng ký ngay</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    handleLogin() {
      console.log('Đăng nhập với:', {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>