<template>
  <div class="fixed inset-0 flex bg-[#f5f8ff]">
    <!-- Banner trái nhỏ, nền đỏ -->
    <div class="items-center justify-center hidden w-2/5 h-full bg-gradient-to-br from-[#F62E56] to-[#7b1e3a] lg:flex">
      <div class="w-[90%] h-[80%] rounded-[48px] flex flex-col justify-between p-10 text-white shadow-2xl bg-gradient-to-br from-[#F62E56] to-[#7b1e3a]">
        <div>
          <h2 class="mb-4 text-4xl font-bold leading-tight">Start Your<br />Journey<br />with Us</h2>
        </div>
        <div>
          <div class="flex items-center gap-2 mb-2">
            <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#fff" fill-opacity="0.1"/><path d="M16 8a8 8 0 100 16 8 8 0 000-16zm0 14.4A6.4 6.4 0 1116 9.6a6.4 6.4 0 010 12.8z" fill="#fff"/></svg>
            <span class="text-lg font-bold">N</span>
          </div>
          <p class="text-sm opacity-80">We’re crafting an attractive UI UX Design<br />that can solve problems</p>
        </div>
      </div>
    </div>
    <!-- Form đăng nhập -->
    <div class="flex flex-col items-center justify-center w-full h-full lg:w-3/5">
      <div class="relative flex flex-col justify-center w-full h-full px-2 py-8 bg-white rounded-none shadow-xl lg:rounded-3xl lg:px-16 lg:py-16">
        <button
          class="absolute text-5xl text-gray-400 top-6 right-6 hover:text-gray-600"
          @click="goHome"
          aria-label="Đóng"
        >
          &times;
        </button>
        <!-- Title & Description -->
        <div class="mb-8 max-w-[400px] w-full mx-auto">
          <h1 class="mb-2 text-3xl font-bold text-[#1C1917] flex items-center gap-2">
            <svg class="w-7 h-7 text-[#F62E56]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v4a4 4 0 01-8 0v-4"/></svg>
            Welcome Back
          </h1>
          <p class="text-[#899CC9] text-base">Sign in to your account</p>
        </div>
        <form @submit.prevent="handleLogin" class="max-w-[400px] w-full mx-auto">
          <div v-if="errorMsg" class="mb-4 text-sm text-red-500">{{ errorMsg }}</div>
          <div class="mb-3">
            <label class="block mb-2 text-sm font-medium text-gray-600">Email</label>
            <div class="relative">
              <span class="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v4a4 4 0 01-8 0v-4"/></svg>
              </span>
              <input
                v-model="email"
                type="email"
                class="w-full pl-10 pr-4 py-2 border-2 border-[#F62E56] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F62E56]/40 text-base"
                placeholder="domat@example.com"
                required
              />
            </div>
          </div>
          <div class="mb-3">
            <label class="block mb-2 text-sm font-medium text-gray-600">Password</label>
            <div class="relative">
              <span class="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M12 15v2m-6-2a6 6 0 1112 0v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2z"/></svg>
              </span>
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                class="w-full pl-10 pr-10 py-2 border-2 border-[#F62E56] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F62E56]/40 text-base"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                class="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2"
                @click="showPassword = !showPassword"
                tabindex="-1"
              >
                <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6.708 5.293A9.956 9.956 0 0112 19c2.21 0 4.253-.722 5.708-1.707M4.293 6.707A9.956 9.956 0 0112 5c2.21 0 4.253.722 5.708 1.707"/></svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6.708 5.293A9.956 9.956 0 0112 19c2.21 0 4.253-.722 5.708-1.707M4.293 6.707A9.956 9.956 0 0112 5c2.21 0 4.253.722 5.708 1.707"/></svg>
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center">
              <input
                id="remember"
                type="checkbox"
                v-model="remember"
                class="w-4 h-4 text-[#F62E56] border-gray-300 rounded focus:ring-[#F62E56]"
              />
              <label for="remember" class="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <button
              type="button"
              class="text-[#F62E56] text-sm font-medium hover:underline"
              @click="forgotPassword"
            >
              Forgot Password
            </button>
          </div>
          <button
            type="submit"
            class="w-full py-3 bg-[#F62E56] text-white rounded-full font-semibold text-base md:text-lg hover:bg-[#d9254a] transition"
          >
            Sign in
          </button>
          <div class="flex items-center my-6">
            <div class="flex-1 h-px bg-gray-200"></div>
            <span class="mx-4 text-gray-400">or</span>
            <div class="flex-1 h-px bg-gray-200"></div>
          </div>
          <button
            type="button"
            class="w-full flex items-center justify-center gap-2 py-3 border-2 border-[#F62E56] rounded-full text-[#F62E56] font-semibold hover:bg-[#f5f8ff] transition"
            @click="signInWithGoogle"
          >
            <svg class="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.9 33.1 30.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8.9 20-20 0-1.3-.1-2.7-.4-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 17.1 19.4 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4 24 4c-7.1 0-13.2 3.7-16.7 9.3z"/><path fill="#FBBC05" d="M24 44c5.6 0 10.5-1.9 14.4-5.1l-6.7-5.5C29.6 35.5 27 36 24 36c-6.2 0-10.9-2.9-11.7-7.5l-7-5.1C4.8 35.1 13.1 44 24 44z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7C34.3 32.3 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8.9 20-20 0-1.3-.1-2.7-.4-4z"/></g></svg>
            Sign in with Google
          </button>
        </form>
        <p class="mt-6 text-sm text-center text-gray-500 md:text-base max-w-[400px] w-full mx-auto">
          Don’t have an account?
          <NuxtLink to="/register" class="text-[#F62E56] hover:underline ml-1">Sign up</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({ layout: 'auth' })

const router = useRouter()
const email = ref('')
const password = ref('')
const remember = ref(false)
const showPassword = ref(false)
const errorMsg = ref('')

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function handleLogin() {
  errorMsg.value = ''
  if (!validateEmail(email.value)) {
    errorMsg.value = 'Invalid email address.'
    return
  }
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const user = users.find(u => u.email === email.value && u.password === password.value)
  if (!user) {
    errorMsg.value = 'Email or password is incorrect.'
    return
  }
  localStorage.setItem('currentUser', JSON.stringify({ email: user.email, name: user.name }))
  router.push('/')
}

function signInWithGoogle() {
  alert('Tính năng Google chưa tích hợp!')
}
function forgotPassword() {
  alert('Tính năng quên mật khẩu chưa tích hợp!')
}
function goHome() {
  router.push('/')
}
</script>