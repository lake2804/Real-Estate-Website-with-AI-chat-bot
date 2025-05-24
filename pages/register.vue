<template>
  <client-only>
    <div class="fixed inset-0 flex bg-[#f5f8ff]">
      <div class="flex flex-col items-center justify-center w-full h-full lg:w-3/5">
        <div class="relative flex flex-col justify-center w-full h-full px-2 py-8 bg-white rounded-none shadow-xl lg:rounded-3xl lg:px-16 lg:py-16">
          <button
            class="absolute text-5xl text-gray-400 top-6 right-6 hover:text-gray-600"
            @click="goHome"
            aria-label="Đóng"
          >
            &times;
          </button>
          <form @submit.prevent="handleRegister" class="max-w-[400px] w-full mx-auto">
            <h1 class="mb-6 text-3xl font-bold text-[#1C1917] text-center">Sign Up</h1>
            <div class="mb-4">
              <input v-model="name" type="text" placeholder="Full Name" class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F62E56]" />
            </div>
            <div class="mb-4">
              <input v-model="email" type="email" placeholder="Email" class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F62E56]" />
            </div>
            <div class="mb-4">
              <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Password" class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F62E56]" />
            </div>
            <div class="mb-4">
              <input v-model="confirmPassword" :type="showPassword ? 'text' : 'password'" placeholder="Confirm Password" class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F62E56]" />
            </div>
            <div class="flex items-center mb-4">
              <input id="showPassword" type="checkbox" v-model="showPassword" class="mr-2" />
              <label for="showPassword" class="text-sm text-gray-600">Show password</label>
            </div>
            <div class="flex items-center mb-4">
              <input id="agree" type="checkbox" v-model="agree" class="mr-2" />
              <label for="agree" class="text-sm text-gray-600">I agree to the terms and conditions</label>
            </div>
            <div v-if="errorMsg" class="mb-4 text-sm text-red-500">{{ errorMsg }}</div>
            <button type="submit" class="w-full py-3 bg-[#F62E56] text-white rounded-lg font-semibold hover:bg-[#d81b4a] transition">Sign Up</button>
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
</script>