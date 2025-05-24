<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 w-full bg-white transition-all duration-300 ease-in-out',
      isScrolled ? 'shadow py-2' : 'py-6'
    ]"
  >
    <div
      :class="[
        'flex items-center mx-auto transition-all duration-300 ease-in-out max-w-screen-2xl',
        isScrolled ? 'px-4 md:px-8' : 'px-8 md:px-20'
      ]"
    >
      <!-- Logo -->
      <div
        :class="[
          'flex items-center flex-shrink-0 cursor-pointer home-app-logo transition-all duration-300 ease-in-out',
          isScrolled ? 'scale-90' : 'scale-100'
        ]"
      >
        <nuxt-link to="/" class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            fill="none"
            class="w-8 h-8"
          >
            <!-- ...SVG content... -->
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
          <span
            :class="[
              'text-[#F62E56] font-quicksand font-bold ml-2 transition-all duration-300 ease-in-out',
              isScrolled ? 'text-[20px]' : 'text-[24px]'
            ]"
          >
            Nhàvui
          </span>
        </nuxt-link>
      </div>

      <!-- Navigation Links -->
      <div class="flex items-center justify-center flex-1 gap-10">
        <nuxt-link
          to="/"
          :class="[

            'font-inter font-medium text-[16px] cursor-pointer pb-1 pt-[5px] border-b-2 transition-colors',
            route.path === '/' ? 'text-[#F62E56] border-[#F62E56]' : 'text-[#1C1917] border-transparent hover:text-[#F62E56]'
          ]"
        >
          Trang chủ
        </nuxt-link>
        <nuxt-link
          to="/buy"
          :class="[

            'font-inter font-normal text-[16px] cursor-pointer pb-1 pt-[5px] border-b-2 transition-colors',
            route.path.startsWith('/buy') ? 'text-[#F62E56] border-[#F62E56]' : 'text-[#1C1917] border-transparent hover:text-[#F62E56]'
          ]"
        >
          Mua
        </nuxt-link>
        <nuxt-link
          to="/rent"
          :class="[

            'font-inter font-normal text-[16px] cursor-pointer pb-1 pt-[5px] border-b-2 transition-colors',
            route.path.startsWith('/rent') ? 'text-[#F62E56] border-[#F62E56]' : 'text-[#1C1917] border-transparent hover:text-[#F62E56]'
          ]"
        >
          Thuê
        </nuxt-link>
        <nuxt-link
          to="/news"
          :class="[

            'font-inter font-normal text-[16px] cursor-pointer pb-1 pt-[5px] border-b-2 transition-colors',
            route.path.startsWith('/news') ? 'text-[#F62E56] border-[#F62E56]' : 'text-[#1C1917] border-transparent hover:text-[#F62E56]'
          ]"
        >
          Tin tức
        </nuxt-link>
        <nuxt-link
          to="/contact"
          :class="[

            'font-inter font-normal text-[16px] cursor-pointer pb-1 pt-[5px] border-b-2 transition-colors',
            route.path.startsWith('/contact') ? 'text-[#F62E56] border-[#F62E56]' : 'text-[#1C1917] border-transparent hover:text-[#F62E56]'
          ]"
        >
          Liên hệ
        </nuxt-link>
      </div>

      <!-- Authentication/Profile -->
      <div class="relative flex items-center flex-shrink-0 gap-6 ml-8">
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
          <!-- Profile Dropdown -->
          <div class="relative">
            <button
              ref="profileBtn"
              @click="toggleDropdown"
              class="flex items-center gap-2 px-3 py-2 rounded-full border border-[#E4E4E7] bg-white shadow-sm hover:shadow transition min-w-[140px]"
            >
              <img
                :src="currentUser.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'"
                class="object-cover w-8 h-8 border rounded-full"
                alt="avatar"
              />
              <span class="font-medium text-[#1C1917] truncate max-w-[80px] md:max-w-[140px] lg:max-w-[220px]">{{ currentUser.name || currentUser.email }}</span>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
              <span
                v-if="currentUser.role === 'admin'"
                class="ml-2 px-2 py-0.5 rounded-full border border-[#F62E56] text-[#F62E56] text-xs font-semibold flex items-center gap-1"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="#F62E56" stroke-width="2"/>
                  <path stroke="#F62E56" stroke-width="2" d="M8 12h8"/>
                </svg>
                Admin
              </span>
            </button>
            <!-- Dropdown -->
            <div
              v-if="showDropdown"
              ref="dropdownMenu"
              class="absolute right-0 z-50 w-64 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl"
            >
              <div class="flex items-center gap-3 px-5 py-4 border-b">
                <img
                  :src="currentUser.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'"
                  class="object-cover w-10 h-10 border rounded-full"
                  alt="avatar"
                />
                <div>
                  <div class="font-semibold text-[#1C1917]">{{ currentUser.name }}</div>
                  <div class="text-xs text-gray-500">{{ currentUser.email }}</div>
                </div>
              </div>
              <ul class="py-2">
                <li>
                  <nuxt-link to="/profile" class="flex items-center gap-2 px-5 py-2 hover:bg-[#fce6ec] transition text-[#1C1917]">
                    <svg class="w-5 h-5 text-[#F62E56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="#F62E56" stroke-width="2"/>
                      <path stroke="#F62E56" stroke-width="2" d="M12 16v-4"/>
                    </svg>
                    My Profile
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/profile?tab=liked" class="flex items-center gap-2 px-5 py-2 hover:bg-[#fce6ec] transition text-[#1C1917]">
                    <svg class="w-5 h-5 text-[#F62E56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z" stroke="#F62E56" stroke-width="2" fill="none"/>
                    </svg>
                    Saved Properties
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/profile?tab=myproducts" class="flex items-center gap-2 px-5 py-2 hover:bg-[#fce6ec] transition text-[#1C1917]">
                    <svg class="w-5 h-5 text-[#F62E56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="7" width="18" height="13" rx="2" stroke="#F62E56" stroke-width="2"/>
                      <path d="M16 3v4M8 3v4" stroke="#F62E56" stroke-width="2"/>
                    </svg>
                    My Listings
                  </nuxt-link>
                </li>
                <li v-if="currentUser.role === 'admin'">
                  <nuxt-link to="/admin" class="flex items-center gap-2 px-5 py-2 hover:bg-[#fce6ec] transition text-[#1C1917]">
                    <svg class="w-5 h-5 text-[#F62E56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="#F62E56" stroke-width="2"/>
                      <path stroke="#F62E56" stroke-width="2" d="M8 12h8"/>
                    </svg>
                    Admin Dashboard
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/settings" class="flex items-center gap-2 px-5 py-2 hover:bg-[#fce6ec] transition text-[#1C1917]">
                    <svg class="w-5 h-5 text-[#F62E56]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="#F62E56" stroke-width="2"/>
                      <path stroke="#F62E56" stroke-width="2" d="M12 8v4l3 3"/>
                    </svg>
                    Settings
                  </nuxt-link>
                </li>
              </ul>
              <div class="border-t">
                <button
                  @click="logout"
                  class="flex items-center gap-2 px-5 py-3 w-full text-left text-[#F62E56] font-semibold hover:bg-[#fce6ec] transition"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke="#F62E56" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7"/>
                  </svg>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const currentUser = computed(() => userStore.currentUser)

const isScrolled = ref(false)
const showDropdown = ref(false)
const router = useRouter()
const route = useRoute()
const profileBtn = ref(null)
const dropdownMenu = ref(null)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 4
}

function logout() {
  userStore.logout()
  showDropdown.value = false
  router.push('/')
}

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function handleClickOutside(e) {
  if (
    showDropdown.value &&
    !profileBtn.value.contains(e.target) &&
    (!dropdownMenu.value || !dropdownMenu.value.contains(e.target))
  ) {
    showDropdown.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Không cần thêm gì nếu đã dùng TailwindCSS đúng như trên */
</style>
