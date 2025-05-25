<template>
  <client-only>
    <div class="fixed inset-0 flex bg-[#f5f8ff]">
      <!-- Banner trái nhỏ, nền đỏ -->
      <div class="items-center justify-center hidden w-2/5 h-full bg-gradient-to-br from-[#F62E56] to-[#7b1e3a] lg:flex">
        <div class="w-[90%] h-[80%] rounded-[48px] flex flex-col justify-between p-10 text-white shadow-2xl bg-gradient-to-br from-[#F62E56] to-[#7b1e3a]">
          <div>
            <h2 class="mb-4 text-4xl font-bold leading-tight">Join<br />Nhavui<br />Today</h2>
          </div>
          <div>
            <div class="flex items-center gap-2 mb-2">
              <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#fff" fill-opacity="0.1"/><path d="M16 8a8 8 0 100 16 8 8 0 000-16zm0 14.4A6.4 6.4 0 1116 9.6a6.4 6.4 0 010 12.8z" fill="#fff"/></svg>
              <span class="text-lg font-bold">N</span>
            </div>
            <p class="text-sm opacity-80">Create your account and discover<br />the best real estate deals</p>
          </div>
        </div>
      </div>
      <!-- Form đăng ký -->
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
              Create Account
            </h1>
            <p class="text-[#899CC9] text-base">Sign up to start your journey</p>
          </div>
          <form @submit.prevent="handleRegister" class="max-w-[400px] w-full mx-auto">
            <div v-if="errorMsg" class="mb-4 text-sm text-red-500">{{ errorMsg }}</div>
            <div class="mb-3">
              <label class="block mb-2 text-sm font-medium text-gray-600">Full Name</label>
              <input v-model="name" type="text" placeholder="Full Name" class="w-full px-4 py-3 border-2 border-[#F62E56] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F62E56]/40" />
            </div>
            <div class="mb-3">
              <label class="block mb-2 text-sm font-medium text-gray-600">Email</label>
              <input v-model="email" type="email" placeholder="Email" class="w-full px-4 py-3 border-2 border-[#F62E56] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F62E56]/40" />
            </div>
            <div class="mb-3">
              <label class="block mb-2 text-sm font-medium text-gray-600">Password</label>
              <div class="relative">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Password"
                  class="w-full px-4 py-3 border-2 border-[#F62E56] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F62E56]/40 pr-12"
                />
                <button
                  type="button"
                  class="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2"
                  @click="showPassword = !showPassword"
                  tabindex="-1"
                >
                  <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6.708 5.293A9.956 9.956 0 0112 19c2.21 0 4.253-.722 5.708-1.707M4.293 6.707A9.956 9.956 0 0112 5c2.21 0 4.253.722 5.708 1.707"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6.708 5.293A9.956 9.956 0 0112 19c2.21 0 4.253-.722 5.708-1.707M4.293 6.707A9.956 9.956 0 0112 5c2.21 0 4.253.722 5.708 1.707"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="mb-3">
              <label class="block mb-2 text-sm font-medium text-gray-600">Confirm Password</label>
              <div class="relative">
                <input
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Confirm Password"
                  class="w-full px-4 py-3 border-2 border-[#F62E56] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F62E56]/40 pr-12"
                />
                <button
                  type="button"
                  class="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2"
                  @click="showConfirmPassword = !showConfirmPassword"
                  tabindex="-1"
                >
                  <svg v-if="showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6.708 5.293A9.956 9.956 0 0112 19c2.21 0 4.253-.722 5.708-1.707M4.293 6.707A9.956 9.956 0 0112 5c2.21 0 4.253.722 5.708 1.707"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6.708 5.293A9.956 9.956 0 0112 19c2.21 0 4.253-.722 5.708-1.707M4.293 6.707A9.956 9.956 0 0112 5c2.21 0 4.253.722 5.708 1.707"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="flex items-center mb-4">
              <input id="agree" type="checkbox" v-model="agree" class="mr-2" />
              <label for="agree" class="text-sm text-gray-600">I agree to the terms and conditions</label>
            </div>
            <button type="submit" class="w-full py-3 bg-[#F62E56] text-white rounded-full font-semibold hover:bg-[#d81b4a] transition text-base md:text-lg">Sign Up</button>
            <div class="flex items-center my-6">
              <div class="flex-1 h-px bg-gray-200"></div>
              <span class="mx-4 text-gray-400">or</span>
              <div class="flex-1 h-px bg-gray-200"></div>
            </div>
            <button
              type="button"
              class="w-full flex items-center justify-center gap-2 py-3 border-2 border-[#F62E56] rounded-full text-[#F62E56] font-semibold hover:bg-[#f5f8ff] transition"
              @click="signUpWithGoogle"
            >
              <svg class="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.9 33.1 30.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8.9 20-20 0-1.3-.1-2.7-.4-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 17.1 19.4 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4 24 4c-7.1 0-13.2 3.7-16.7 9.3z"/><path fill="#FBBC05" d="M24 44c5.6 0 10.5-1.9 14.4-5.1l-6.7-5.5C29.6 35.5 27 36 24 36c-6.2 0-10.9-2.9-11.7-7.5l-7-5.1C4.8 35.1 13.1 44 24 44z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7C34.3 32.3 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8.9 20-20 0-1.3-.1-2.7-.4-4z"/></g></svg>
              Sign up with Google
            </button>
          </form>
          <p class="mt-6 text-sm text-center text-gray-500 md:text-base max-w-[400px] w-full mx-auto">
            Already have an account?
            <NuxtLink to="/login" class="text-[#F62E56] hover:underline ml-1">Sign in</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'

const router = useRouter()
const userStore = useUserStore()
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agree = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const errorMsg = ref('')

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function handleRegister() {
  errorMsg.value = ''
  if (!name.value.trim()) {
    errorMsg.value = 'Please enter your full name.'
    return
  }
  if (!validateEmail(email.value)) {
    errorMsg.value = 'Invalid email address.'
    return
  }
  if (password.value.length < 6) {
    errorMsg.value = 'Password must be at least 6 characters.'
    return
  }
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match.'
    return
  }
  if (!agree.value) {
    errorMsg.value = 'You must agree to the terms.'
    return
  }
  try {
    userStore.register({
      name: name.value,
      email: email.value,
      password: password.value
    })
    router.push('/profile')
  } catch (e) {
    errorMsg.value = e.message
  }
}

function goHome() {
  router.push('/')
}

function signUpWithGoogle() {
  alert('Tính năng Google chưa tích hợp!')
}
</script>