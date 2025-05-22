<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 w-full bg-white transition-all duration-200',
      { 'shadow': isScrolled, 'py-6': !isScrolled, 'py-3': isScrolled }
    ]"
  >
    <div class="flex items-center px-8 mx-auto transition-all duration-300 md:px-20 max-w-screen-2xl">
      <!-- Logo -->
      <div class="flex items-center flex-shrink-0 cursor-pointer home-app-logo">
        <nuxt-link to="/" class="flex items-center">
          <!-- ...logo SVG... -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            fill="none"
            class="w-8 h-8"
          >
            <mask
              id="mask0_404_2339"
              style="mask-type: alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="40"
              height="40"
            >
              <rect width="40" height="40" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_404_2339)">
              <path
                d="M9.38333 32.8334C8.79444 32.8334 8.29167 32.6268 7.875 32.2136C7.45833 31.8004 7.25 31.2987 7.25 30.7084V27.9167L12.9167 22.8751V32.8334H9.38333ZM14.25 32.8334V27.1667H25.75V32.8334H14.25ZM27.0833 32.8334V21.1883L20.9583 15.7917L25.25 12.0001L32.0417 18.0001C32.2639 18.2223 32.4375 18.4692 32.5625 18.7408C32.6875 19.0124 32.75 19.3018 32.75 19.6088V30.6977C32.75 31.2882 32.5434 31.7917 32.1302 32.2084C31.717 32.6251 31.2153 32.8334 30.625 32.8334H27.0833ZM7.25 26.0834V19.6368C7.25 19.3315 7.3125 19.038 7.4375 18.7561C7.5625 18.4743 7.73611 18.2223 7.95833 18.0001L18.5833 8.58341C18.8056 8.38897 19.0354 8.25008 19.2728 8.16675C19.5102 8.08341 19.7532 8.04175 20.002 8.04175C20.2507 8.04175 20.4931 8.08341 20.7292 8.16675C20.9653 8.25008 21.1944 8.38897 21.4167 8.58341L24.25 11.1251L7.25 26.0834Z"
                fill="#F62E56"
              />
            </g>
          </svg>
          <span class="text-[#F62E56] font-quicksand font-bold text-[24px] ml-2">
            Nhàvui
          </span>
        </nuxt-link>
      </div>

      <!-- Navigation Links -->
      <div class="flex items-center justify-center flex-1 gap-10">
        <nuxt-link
          to="/"
          class="font-inter font-medium text-[16px] text-[#F62E56] cursor-pointer pb-1 pt-[5px] border-b-2 border-[#F62E56]"
        >
          Trang chủ
        </nuxt-link>
        <nuxt-link
          to="/buy"
          class="text-[#1C1917] font-inter font-normal text-[16px] cursor-pointer"
        >
          Mua
        </nuxt-link>
        <nuxt-link
          to="/rent"
          class="text-[#1C1917] font-inter font-normal text-[16px] cursor-pointer"
        >
          Thuê
        </nuxt-link>
        <nuxt-link
          to="/projects"
          class="text-[#1C1917] font-inter font-normal text-[16px] cursor-pointer"
        >
          Dự án
        </nuxt-link>
        <nuxt-link
          to="/blog"
          class="text-[#1C1917] font-inter font-normal text-[16px] cursor-pointer"
        >
          Blog
        </nuxt-link>
      </div>

      <!-- Authentication -->
      <div class="flex items-center flex-shrink-0 gap-6 ml-8">
        <template v-if="!currentUser">
          <nuxt-link
            to="/login"
            class="py-[10px] flex items-center justify-center text-center font-inter font-medium text-[16px] text-[#F62E56] cursor-pointer"
          >
            Đăng nhập
          </nuxt-link>
          <div class="w-px h-6 bg-[#E4E4E7]"></div>
          <nuxt-link
            to="/register"
            class="py-[10px] flex items-center justify-center text-center px-6 bg-[#F62E56] rounded-lg text-white font-inter font-medium text-[16px] cursor-pointer"
          >
            Đăng ký
          </nuxt-link>
        </template>
        <template v-else>
          <span class="font-inter text-[16px] text-[#F62E56] font-semibold">
            {{ currentUser.name || currentUser.email }}
          </span>
          <button
            @click="logout"
            class="py-[10px] px-6 bg-[#F62E56] rounded-lg text-white font-inter font-medium text-[16px] cursor-pointer"
          >
            Đăng xuất
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const isScrolled = ref(false)
const currentUser = ref(null)
const router = useRouter()

const handleScroll = () => {
  isScrolled.value = window.scrollY > 4
}

function checkLogin() {
  const user = localStorage.getItem('currentUser')
  currentUser.value = user ? JSON.parse(user) : null
}

function logout() {
  localStorage.removeItem('currentUser')
  currentUser.value = null
  router.push('/')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  checkLogin()
  window.addEventListener('storage', checkLogin)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('storage', checkLogin)
})
</script>

<style scoped>
/* Không cần thêm gì nếu đã dùng TailwindCSS đúng như trên */
</style>
