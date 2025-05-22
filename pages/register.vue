<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h1 class="mb-6 text-2xl font-bold text-center text-gray-800">Đăng ký</h1>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-600">Họ và tên</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Nhập họ và tên"
            required
          />
        </div>
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
        <div class="mb-4">
          <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-600">Xác nhận mật khẩu</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            class="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Nhập lại mật khẩu"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Đăng ký
        </button>
      </form>
      <p class="mt-4 text-sm text-center text-gray-600">
        Đã có tài khoản?
        <nuxt-link to="/login" class="text-red-500 hover:underline">Đăng nhập</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert('Mật khẩu và xác nhận mật khẩu không khớp!');
        return;
      }
      console.log('Đăng ký với:', {
        name: this.name,
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>