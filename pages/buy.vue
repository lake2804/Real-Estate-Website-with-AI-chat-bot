<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <div class="font-bold text-red-500">TEST SEARCH BAR</div>
    <!-- Search Bar -->
    <div class="relative z-20 flex justify-center w-full">
      <div
        class="flex items-center w-full max-w-5xl px-2 py-2 bg-white border rounded-full shadow-xl border-stone-100 md:py-3"
        style="box-shadow: 0 8px 32px 0 rgba(60,60,60,0.10);"
      >
        <!-- Toggle Switch -->
        <div class="flex items-center justify-center mr-2">
          <div class="relative flex w-[180px] h-12 bg-[#F4F4F5] rounded-full p-1">
            <button
              :class="[
                'flex-1 h-full rounded-full font-semibold font-inter transition-all duration-200',
                searchTab === 'Mua nhà'
                  ? 'bg-[#F62E56] text-white shadow'
                  : 'bg-transparent text-[#6B7280]'
              ]"
              @click="searchTab = 'Mua nhà'"
            >
              Mua nhà
            </button>
            <button
              :class="[
                'flex-1 h-full rounded-full font-semibold font-inter transition-all duration-200',
                searchTab === 'Thuê nhà'
                  ? 'bg-[#F62E56] text-white shadow'
                  : 'bg-transparent text-[#6B7280]'
              ]"
              @click="searchTab = 'Thuê nhà'"
            >
              Thuê nhà
            </button>
          </div>
        </div>
        <!-- Input -->
        <div class="flex items-center flex-1 h-12 min-w-0 px-4 bg-white rounded-full">
          <input
            v-model="keyword"
            type="text"
            placeholder="Tìm kiếm căn hộ"
            class="w-full text-base bg-transparent font-inter focus:outline-none"
            autocomplete="off"
          />
        </div>
        <!-- Dropdowns custom -->
        <div class="flex items-center">
          <div
            v-for="(field, idx) in dropdownFields"
            :key="field.model"
            class="relative flex items-center flex-shrink-0 h-full px-4 border-l border-stone-200"
            :class="idx === 0 ? 'z-30' : ''"
          >
            <button
              @click="toggleDropdown(field.model)"
              class="flex items-center gap-2 bg-transparent focus:outline-none min-w-[110px] h-12"
              :class="{
                'text-[#F62E56] font-semibold': dropdownOpen === field.model || searchValues[field.model] !== field.options[0],
                'text-gray-700': !(dropdownOpen === field.model) && searchValues[field.model] === field.options[0]
              }"
              type="button"
            >
              <span class="truncate max-w-[90px]">{{ searchValues[field.model] || field.options[0] }}</span>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div
              v-if="dropdownOpen === field.model"
              class="absolute left-0 z-40 w-48 py-2 mt-2 bg-white border shadow-xl top-full rounded-xl border-stone-100"
            >
              <div
                v-for="(option, i) in field.options"
                :key="i"
                @click="selectDropdownOption(field.model, option)"
                class="px-4 py-2 cursor-pointer hover:bg-[#F4F4F5] rounded-lg transition"
                :class="{'text-[#F62E56] font-semibold': searchValues[field.model] === option}"
              >
                {{ option }}
              </div>
            </div>
          </div>
        </div>
        <!-- Search Button -->
        <button
          @click="handleSearch"
          class="flex items-center gap-2 h-10 px-6 ml-2 bg-[#F62E56] text-white font-semibold rounded-full hover:bg-[#d9254a] transition-colors duration-200 focus:outline-none"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" stroke-width="2"></circle>
            <path stroke-linecap="round" stroke-width="2" d="M21 21l-4.35-4.35"></path>
          </svg>
          <span class="hidden md:inline">Tìm kiếm</span>
        </button>
      </div>
    </div>

    <!-- Kết quả tìm kiếm -->
    <div class="container px-4 py-6 mx-auto max-w-7xl">
      <div class="mb-4 text-gray-700 font-inter">
        <span class="font-semibold">{{ totalResults }}</span> kết quả tìm kiếm cho
        <span class="font-semibold text-[#F62E56]">"{{ searchTab }} {{ searchValues.location !== 'Vị trí' ? searchValues.location : '' }}"</span>
      </div>
      <!-- Grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div
          v-for="property in paginatedProperties"
          :key="property.id"
          class="flex flex-col p-4 transition bg-white shadow rounded-xl hover:shadow-lg"
        >
          <img :src="property.image" class="object-cover mb-3 rounded-lg aspect-video" />
          <div class="mb-2 text-base font-semibold font-inter line-clamp-2">{{ property.name }}</div>
          <div class="mb-1 text-sm text-gray-500 font-inter">{{ property.location }}</div>
          <div class="flex flex-wrap gap-2 mb-2 text-xs text-gray-500">
            <span>{{ property.bedrooms }}PN/{{ property.bathrooms }}WC</span>
            <span>{{ property.area }}m²</span>
            <span>{{ property.direction }}</span>
            <span>{{ property.block }}</span>
          </div>
          <div class="mt-auto font-inter font-semibold text-[#F62E56]">
            {{ property.price.toLocaleString() }} VNĐ <span class="text-xs font-normal text-gray-500">/tháng</span>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div class="flex justify-center mt-8">
        <nav class="flex space-x-2">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'w-9 h-9 rounded border text-base font-inter',
              currentPage === page
                ? 'bg-[#F62E56] text-white border-[#F62E56]'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
            ]"
          >{{ page }}</button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Search bar state
const searchTab = ref('Mua nhà')
const keyword = ref('')
const dropdownOpen = ref(null)
const searchValues = ref({
  location: 'Vị trí',
  price: 'Giá',
  rooms: 'Số phòng'
})
const dropdownFields = [
  {
    model: 'location',
    options: ['Vị trí', 'Quận 9, TP.HCM', 'Quận 5, TP.HCM', 'Quận 2, TP.HCM']
  },
  {
    model: 'price',
    options: ['Giá', 'Dưới 5 triệu', '5-10 triệu', '10-20 triệu', 'Trên 20 triệu']
  },
  {
    model: 'rooms',
    options: ['Số phòng', '1 phòng', '2 phòng', '3 phòng', '4+ phòng']
  }
]

// Dropdown logic
function toggleDropdown(model) {
  dropdownOpen.value = dropdownOpen.value === model ? null : model
}
function selectDropdownOption(model, option) {
  searchValues.value[model] = option
  dropdownOpen.value = null
}
function handleClickOutsideDropdown(event) {
  const dropdowns = document.querySelectorAll('.dropdown-parent')
  let clickedInside = false
  dropdowns.forEach(el => {
    if (el.contains(event.target)) clickedInside = true
  })
  if (!clickedInside) dropdownOpen.value = null
}
onMounted(() => {
  document.addEventListener('mousedown', handleClickOutsideDropdown)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutsideDropdown)
})

// Fake property data (36 items for 3 pages)
const properties = ref(
  Array.from({ length: 36 }, (_, i) => ({
    id: i + 1,
    name: `Căn hộ ${i + 1} Vinhomes Central Park`,
    image: `https://picsum.photos/seed/apt${i + 1}/400/225`,
    location: ['Quận 9, TP.HCM', 'Quận 5, TP.HCM', 'Quận 2, TP.HCM'][i % 3],
    bedrooms: [1, 2, 3, 4][i % 4],
    bathrooms: [1, 2][i % 2],
    area: [67, 77, 88, 120][i % 4],
    direction: ['Tây Nam', 'Đông Bắc', 'Nam', 'Bắc'][i % 4],
    block: ['Block A', 'Block B', 'Block C'][i % 3],
    price: [4000000, 7000000, 12000000, 18000000, 23000000][i % 5],
    type: i % 2 === 0 ? 'rent' : 'sale'
  }))
)

const currentPage = ref(1)
const pageSize = 12

const filteredProperties = computed(() => {
  // Lọc theo search bar
  let list = properties.value.filter((p) => {
    const matchTab = searchTab.value === 'Mua nhà' ? p.type === 'sale' : p.type === 'rent'
    const matchKeyword = !keyword.value || p.name.toLowerCase().includes(keyword.value.toLowerCase())
    const matchLocation = searchValues.value.location === 'Vị trí' || p.location === searchValues.value.location
    const matchPrice =
      searchValues.value.price === 'Giá' ||
      (searchValues.value.price === 'Dưới 5 triệu' && p.price <= 5000000) ||
      (searchValues.value.price === '5-10 triệu' && p.price > 5000000 && p.price <= 10000000) ||
      (searchValues.value.price === '10-20 triệu' && p.price > 10000000 && p.price <= 20000000) ||
      (searchValues.value.price === 'Trên 20 triệu' && p.price > 20000000)
    const matchRooms =
      searchValues.value.rooms === 'Số phòng' ||
      (searchValues.value.rooms === '1 phòng' && p.bedrooms === 1) ||
      (searchValues.value.rooms === '2 phòng' && p.bedrooms === 2) ||
      (searchValues.value.rooms === '3 phòng' && p.bedrooms === 3) ||
      (searchValues.value.rooms === '4+ phòng' && p.bedrooms >= 4)
    return matchTab && matchKeyword && matchLocation && matchPrice && matchRooms
  })
  totalResults.value = list.length
  return list
})

const totalResults = ref(0)
const totalPages = computed(() => Math.max(1, Math.ceil(filteredProperties.value.length / pageSize)))
const paginatedProperties = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredProperties.value.slice(start, start + pageSize)
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
function handleSearch() {
  currentPage.value = 1
}
</script>

<style scoped>
.font-inter {
  font-family: "Inter", sans-serif;
}
</style>