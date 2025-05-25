<template>
  <div class="flex flex-col gap-8">
    <!-- Hero Section -->
    <section
      class="flex flex-col items-center justify-center w-full pt-6 pb-2 bg-white"
      style="min-height: 600px"
    >
      <div
        class="flex flex-col items-center justify-between w-full gap-12 px-4 mx-auto mt-20 md:flex-row max-w-7xl"
      >
        <!-- Left: Main Text -->
        <div
          class="flex flex-col items-center w-full max-w-xl gap-8 md:items-start md:gap-14"
        >
          <div class="flex flex-col w-full gap-1">
            <h1
              class="font-inter text-3xl md:text-5xl font-bold leading-tight text-[#1C1917] text-center md:text-left"
            >
              BẤT ĐỘNG SẢN
            </h1>
            <h1
              class="text-3xl font-bold leading-tight text-center md:text-5xl font-inter md:text-left"
            >
              <span class="text-[#F62E56]">XÁC THỰC</span>
              <span class="text-black"> & </span>
              <span class="text-[#F62E56]">TIN CẬY</span>
            </h1>
            <p
              class="mt-2 text-base text-center md:text-lg font-inter text-stone-700 md:text-left"
            >
              Nâng tầm chất lượng cuộc sống
            </p>
          </div>
          <!-- Stats (ẩn trên mobile) -->
          <div class="items-center hidden gap-10 md:flex">
            <div>
              <div
                class="text-4xl font-medium text-stone-900 font-inter md:text-5xl"
              >
                2K+
              </div>
              <p class="text-base leading-tight font-inter text-stone-700">
                sản phẩm <br />bất động sản
              </p>
            </div>
            <div class="w-px h-14 bg-stone-200"></div>
            <div>
              <div
                class="text-4xl font-medium text-stone-900 font-inter md:text-5xl"
              >
                1.5K+
              </div>
              <p class="text-base leading-tight font-inter text-stone-700">
                giao dịch <br />thành công
              </p>
            </div>
          </div>
        </div>
        <!-- Right: Image (ẩn trên mobile) -->
        <img
          src="../assets/images/cef3f7e8db9fbab15b0d1a0905b75277e8690064.png"
          alt=""
          class="hidden md:block w-[340px] md:w-[420px] lg:w-[480px] xl:w-[552px] h-auto rounded-xl shadow-md"
        />
      </div>
      <!-- Search Section -->
      <div class="relative z-20 flex justify-center w-full mt-8 md:mt-12">
        <div
          class="flex items-center w-full max-w-5xl px-2 py-2 bg-white border rounded-full shadow-xl border-stone-100 md:py-3"
          style="box-shadow: 0 8px 32px 0 rgba(60, 60, 60, 0.1)"
        >
          <!-- Toggle Switch -->
          <div class="flex items-center justify-center mr-2">
            <div
              class="relative flex w-[180px] h-12 bg-[#F4F4F5] rounded-full p-1"
            >
              <button
                :class="[
                  'flex-1 h-full rounded-full font-semibold font-inter transition-all duration-200',
                  searchValues.type === 'Mua nhà'
                    ? 'bg-[#F62E56] text-white shadow'
                    : 'bg-transparent text-[#6B7280]',
                ]"
                @click="changeTab(0)"
              >
                Mua nhà
              </button>
              <button
                :class="[
                  'flex-1 h-full rounded-full font-semibold font-inter transition-all duration-200',
                  searchValues.type === 'Thuê nhà'
                    ? 'bg-[#F62E56] text-white shadow'
                    : 'bg-transparent text-[#6B7280]',
                ]"
                @click="changeTab(1)"
              >
                Thuê nhà
              </button>
            </div>
          </div>
          <!-- Input -->
          <div
            class="flex items-center flex-1 h-12 min-w-0 px-4 bg-white rounded-full"
          >
            <input
              v-model="searchValues.keyword"
              type="text"
              placeholder="Tìm kiếm căn hộ"
              class="w-full text-base bg-transparent font-inter focus:outline-none"
              autocomplete="off"
            />
          </div>

          <!-- Dropdowns tích hợp trực tiếp -->
          <div class="flex items-center">
            <div
              v-for="(field, idx) in searchFields.filter(
                (f) => f.type === 'dropdown'
              )"
              :key="field.model"
              class="relative flex items-center flex-shrink-0 h-full px-4 border-l border-stone-200"
              :class="idx === 0 ? 'z-30' : ''"
            >
              <button
                @click="toggleDropdown(field.model)"
                class="flex items-center gap-2 bg-transparent focus:outline-none min-w-[110px] h-12 cursor-pointer"
                :class="{
                  'text-[#F62E56] font-semibold':
                    dropdownOpen === field.model ||
                    searchValues[field.model] !== field.options[0],
                  'text-gray-700':
                    !(dropdownOpen === field.model) &&
                    searchValues[field.model] === field.options[0],
                }"
                type="button"
              >
                <span class="truncate max-w-[90px]">{{
                  searchValues[field.model] || field.options[0]
                }}</span>
                <svg
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
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
                  :class="{
                    'text-[#F62E56] font-semibold':
                      searchValues[field.model] === option,
                  }"
                >
                  {{ option }}
                </div>
              </div>
            </div>
          </div>

          <!-- Search Button -->
          <button
            @click="handleSearch"
            class="flex items-center gap-2 h-10 px-6 ml-2 bg-[#F62E56] text-white font-semibold rounded-full hover:bg-[#d9254a] transition-colors duration-200 focus:outline-none cursor-pointer"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" stroke-width="2"></circle>
              <path
                stroke-linecap="round"
                stroke-width="2"
                d="M21 21l-4.35-4.35"
              ></path>
            </svg>
            <span class="hidden md:inline">Tìm kiếm</span>
          </button>
        </div>
      </div>
      <!-- Stats (hiện trên mobile) -->
      <div class="flex items-center justify-center gap-10 mt-6 md:hidden">
        <div>
          <div class="text-2xl font-medium text-stone-900 font-inter">2K+</div>
          <p
            class="text-sm leading-tight text-center font-inter text-stone-700"
          >
            sản phẩm <br />bất động sản
          </p>
        </div>
        <div class="w-px h-10 bg-stone-200"></div>
        <div>
          <div class="text-2xl font-medium text-stone-900 font-inter">
            1.5K+
          </div>
          <p
            class="text-sm leading-tight text-center font-inter text-stone-700"
          >
            giao dịch <br />thành công
          </p>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <div class="container px-8 py-4 mx-auto max-w-7xl">
      <!-- Title -->
      <h2 class="mb-6 text-[32px] font-bold text-gray-900 font-inter">
        Dự án nổi bật
      </h2>

      <!-- Tabs -->
      <div class="flex pb-2 mb-6 overflow-x-auto hide-scrollbar">
        <div class="flex w-full space-x-12 border-b border-stone-200">
          <button
            v-for="(tab, index) in projectTabs"
            :key="index"
            @click="activeProjectTab = index"
            :class="[
              'whitespace-nowrap pb-2 font-bold border-b-2 transition-colors font-inter cursor-pointer',
              activeProjectTab === index
                ? 'border-red-500 text-red-500'
                : 'border-transparent text-gray-500 hover:text-red-500',
            ]"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <!-- Project Grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(project, index) in filteredProjects"
          :key="index"
          class="overflow-hidden transition-transform transform bg-white rounded-lg shadow-sm hover:-translate-y-2 hover:shadow-lg"
        >
          <!-- Project Image -->
          <div class="relative h-48">
            <img
              :src="project.image"
              :alt="project.name"
              class="object-cover w-full h-full"
            />
            <!-- Badge -->
            <span
              v-if="project.badge"
              class="absolute px-2 py-1 text-xs font-medium text-white bg-red-500 rounded top-2 left-2 font-inter"
            >
              Mới bàn giao
            </span>
          </div>

          <!-- Project Info -->
          <div class="p-4">
            <h3
              class="mb-1 text-lg font-semibold text-gray-900 truncate font-inter"
            >
              {{ project.name }}
            </h3>
            <p class="flex items-center mb-3 text-sm text-gray-500 font-inter">
              <svg class="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="#6B7280">
                <path
                  d="M10 10a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM10 16.667c3.333-3.334 6.667-7.5 6.667-10a6.667 6.667 0 10-13.334 0c0 2.5 3.334 6.666 6.667 10z"
                />
              </svg>
              <span class="truncate">{{ project.location }}</span>
            </p>

            <!-- Project Details -->
            <div
              class="grid grid-cols-2 gap-2 text-sm text-gray-700 font-inter"
            >
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="#6B7280">
                  <path
                    d="M3 17v-2h3v-3h3v-3h3V6h3V3h2v4h-3v3h-3v3H9v3H6v3H3z"
                  />
                </svg>
                {{ project.floors }} tầng
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="#6B7280">
                  <path d="M3 3h14v14H3V3zm2 2v10h10V5H5z" />
                </svg>
                {{ project.area }}
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="#6B7280">
                  <path
                    d="M3 3h4v4H3V3zm5 0h4v4H8V3zm5 0h4v4h-4V3zM3 8h4v4H3V8zm5 0h4v4H8V8zm5 0h4v4h-4V8zM3 13h4v4H3v-4zm5 0h4v4H8v-4zm5 0h4v4h-4v-4z"
                  />
                </svg>
                {{ project.blocks }} block
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="#6B7280">
                  <path d="M3 5h14v2H3V5zm0 4h14v2H3V9zm0 4h14v2H3v-2z" />
                </svg>
                {{ project.units }} căn hộ
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Rental Properties Section -->
    <div class="container px-8 py-4 mx-auto max-w-7xl">
      <!-- Title -->
      <h2 class="mb-6 text-[32px] font-bold text-gray-900 font-inter">
        Cho thuê bất động sản
      </h2>

      <!-- Tabs -->
      <div class="flex pb-2 mb-6 overflow-x-auto hide-scrollbar">
        <div class="flex w-full space-x-12 border-b border-stone-200">
          <button
            v-for="(tab, index) in rentalTabs"
            :key="index"
            @click="activeRentalTab = index"
            :class="[
              'whitespace-nowrap pb-2 font-bold border-b-2 transition-colors font-inter cursor-pointer',
              activeRentalTab === index
                ? 'border-red-500 text-red-500'
                : 'border-transparent text-gray-500 hover:text-red-500',
            ]"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <!-- Rental Grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Hiển thị danh sách thuê nổi bật -->
        <PropertyCard
          v-for="property in properties ? properties.filter(p => p.type === 'rent').slice(0, 4) : []"
          :key="property.id"
          :product="property"
          :to="`/rent/${property.id}`"
          :isRent="true"
        />
      </div>
      <div class="flex justify-center mt-8">
        <NuxtLink
          to="/rent"
          class="px-6 py-2 text-sm font-medium border-2 border-[#F62E56] text-[#F62E56] bg-white rounded transition-colors hover:bg-[#F62E56] hover:text-white font-inter cursor-pointer"
        >
          Xem thêm →
        </NuxtLink>
      </div>
    </div>

    <!-- For Sale Properties Section -->
    <div class="container px-8 py-4 mx-auto max-w-7xl">
      <!-- Title -->
      <h2 class="mb-6 text-[32px] font-bold text-gray-900 font-inter">
        Bán bất động sản
      </h2>

      <!-- Tabs -->
      <div class="flex pb-2 mb-6 overflow-x-auto hide-scrollbar">
        <div class="flex w-full space-x-12 border-b border-stone-200">
          <button
            v-for="(tab, index) in saleTabs"
            :key="index"
            @click="activeSaleTab = index"
            :class="[
              'whitespace-nowrap pb-2 font-bold border-b-2 transition-colors font-inter cursor-pointer',
              activeSaleTab === index
                ? 'border-red-500 text-red-500'
                : 'border-transparent text-gray-500 hover:text-red-500',
            ]"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <!-- Sale Grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Hiển thị danh sách bán nổi bật -->
        <PropertyCard
          v-for="property in properties
            ? properties.filter((p) => p.type === 'sale').slice(0, 4)
            : []"
          :key="property.id"
          :product="property"
          :to="`/buy/${property.id}`"
        />
      </div>

      <!-- View More Button -->
      <div class="flex justify-center mt-8">
        <NuxtLink
          to="/buy"
          class="px-6 py-2 text-sm font-medium border-2 border-[#F62E56] text-[#F62E56] bg-white rounded transition-colors hover:bg-[#F62E56] hover:text-white font-inter cursor-pointer"
        >
          Xem thêm →
        </NuxtLink>
      </div>
    </div>

    <!-- News Section -->
    <div class="container px-8 py-4 mx-auto max-w-7xl">
      <!-- Title -->
      <h2 class="mb-6 text-[32px] font-bold text-gray-900 font-inter">
        Tin tức Bất động sản
      </h2>

      <!-- Tabs -->
      <div class="flex pb-2 mb-6 overflow-x-auto hide-scrollbar">
        <div class="flex w-full space-x-12 border-b border-stone-200">
          <button
            v-for="(tab, index) in newsTabs"
            :key="index"
            @click="activeNewsTab = index"
            :class="[
              'whitespace-nowrap pb-2 font-bold border-b-2 transition-colors font-inter cursor-pointer',
              activeNewsTab === index
                ? 'border-red-500 text-red-500'
                : 'border-transparent text-gray-500 hover:text-red-500',
            ]"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <!-- News Grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(news, index) in filteredNews"
          :key="index"
          class="overflow-hidden transition-transform transform bg-white rounded-lg shadow-sm hover:-translate-y-2 hover:shadow-lg"
        >
          <!-- News Image -->
          <div class="relative h-48">
            <img
              :src="news.image"
              :alt="news.title"
              class="object-cover w-full h-full"
            />
            <!-- Category Badge -->
            <span
              class="absolute px-2 py-1 text-xs font-medium text-white bg-red-500 rounded top-2 left-2 font-inter"
            >
              {{ news.category }}
            </span>
          </div>

          <!-- News Content -->
          <div class="p-4">
            <h3 class="mb-2 text-lg font-semibold text-gray-900 font-inter">
              {{ news.title }}
            </h3>
            <p class="mb-3 text-sm text-gray-500 font-inter line-clamp-2">
              {{ news.description }}
            </p>

            <!-- News Details -->
            <div
              class="flex items-center justify-between text-sm text-gray-400 font-inter"
            >
              <span>{{ news.date }}</span>
              <span class="flex items-center text-red-500 cursor-pointer">
                Đọc tiếp
                <svg
                  class="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- View More Button -->
      <div class="flex justify-center mt-8">
        <NuxtLink
          to="/news"
          class="px-6 py-2 text-sm font-medium text-white transition-colors bg-red-500 rounded cursor-pointer hover:bg-red-600 font-inter"
        >
          Xem thêm →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import image1 from "../assets/images/69c3287225c0955eae77611c48fe35842bc4c6fb.jpg";
import image2 from "../assets/images/6b7d8bfad7fb4d36ecf330170d823a425da5a78c.png";
import image3 from "../assets/images/a4a07cb3b7048da0103b09abd45180c16400b41e.png";
import image4 from "../assets/images/bdcb37b73921618b978df14dba5c19e7ca664018.jpg";
import PropertyCard from "~/components/PropertyCard.vue";

// Inline DropdownSelect component
const DropdownSelect = {
  props: {
    options: { type: Array, required: true },
    modelValue: { type: String, default: "" },
    placeholder: { type: String, default: "" },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const open = ref(false);
    const value = ref(props.modelValue || props.placeholder);
    const root = ref(null);

    watch(
      () => props.modelValue,
      (v) => (value.value = v)
    );

    function select(option) {
      emit("update:modelValue", option);
      open.value = false;
      value.value = option;
    }
    function toggle() {
      open.value = !open.value;
    }
    function handleClickOutside(event) {
      if (root.value && !root.value.contains(event.target)) {
        open.value = false;
      }
    }
    onMounted(() => {
      document.addEventListener("mousedown", handleClickOutside);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("mousedown", handleClickOutside);
    });

    return { open, value, root, select, toggle, props };
  },
};

// --- Main page logic ---
const tabs = ref([
  { label: "Mua nhà", active: true },
  { label: "Thuê nhà", active: false },
]);
const searchFields = ref([
  {
    type: "input",
    inputType: "text",
    placeholder: "Tìm kiếm căn hộ",
    model: "keyword",
  },
  {
    type: "dropdown",
    options: ["Vị trí", "Hà Nội", "Hồ Chí Minh", "Đà Nẵng"],
    model: "location",
  },
  {
    type: "dropdown",
    options: ["Giá", "Dưới 1 tỷ", "1-2 tỷ", "Trên 2 tỷ"],
    model: "price",
  },
  {
    type: "dropdown",
    options: ["Số phòng", "1 phòng", "2 phòng", "3 phòng"],
    model: "rooms",
  },
]);
const searchValues = ref({
  type: "Mua nhà",
  keyword: "",
  location: "Vị trí",
  price: "Giá",
  rooms: "Số phòng",
});

// Featured Projects Data
const activeProjectTab = ref(0);
const projectTabs = ref([
  "TP HCM",
  "Đà Nẵng",
  "Hà Nội",
  "Bình Dương",
  "Long An",
  "Cần Thơ",
  "Bình Định",
  "Nha Trang",
]);
const projects = ref([
  {
    name: "The Classia",
    location: "Phú Hữu, Quận 9, Hồ Chí Minh",
    floors: 25,
    area: "23000m²",
    blocks: 8,
    units: 5220,
    image: image1,
    city: "TP HCM",
    badge: true,
  },
  {
    name: "Glory Heights",
    location: "Long Bình, Quận 9, Hồ Chí Minh",
    floors: 12,
    area: "6000m²",
    blocks: 12,
    units: 1584,
    image: image2,
    city: "TP HCM",
    badge: true,
  },
  {
    name: "LUMIÈRE Boulevard",
    location: "Long Thạnh Mỹ, Quận 9, Hồ Chí Minh",
    floors: 34,
    area: "34000m²",
    blocks: 2,
    units: 4578,
    image: image3,
    city: "TP HCM",
    badge: true,
  },
  {
    name: "The River Thu Thiem",
    location: "Long Thạnh Mỹ, Quận 9, Hồ Chí Minh",
    floors: 34,
    area: "34000m²",
    blocks: 2,
    units: 4578,
    image: image4,
    city: "TP HCM",
    badge: true,
  },
]);

// Rental Properties Data
const activeRentalTab = ref(0);
const rentalTabs = ref([
  "TP HCM",
  "Đà Nẵng",
  "Hà Nội",
  "Bình Dương",
  "Long An",
  "Cần Thơ",
  "Bình Định",
  "Nha Trang",
]);
const rentalProjects = ref([
  {
    name: "Căn hộ cao cấp Vinhomes Central Park",
    location: "Bình Thạnh, TP HCM",
    price: "10.000.000 VND",
    image: image1,
    city: "TP HCM",
    bedrooms: 2,
    bathrooms: 2,
    area: "65m²",
    type: "Căn hộ",
    badge: "Ưu đãi",
  },
  {
    name: "Biệt thự mặt tiền Quận 2",
    location: "Thảo Điền, Quận 2, TP HCM",
    price: "25.000.000 VND",
    image: image2,
    city: "TP HCM",
    bedrooms: 4,
    bathrooms: 3,
    area: "200m²",
    type: "Biệt thự",
    badge: "Mới",
  },
  {
    name: "Căn hộ Masteri Thảo Điền",
    location: "Quận 2, TP HCM",
    price: "15.000.000 VND",
    image: image3,
    city: "TP HCM",
    bedrooms: 3,
    bathrooms: 2,
    area: "85m²",
    type: "Căn hộ",
  },
  {
    name: "Nhà phố Quận 7",
    location: "Phú Mỹ Hưng, Quận 7, TP HCM",
    price: "18.000.000 VND",
    image: image4,
    city: "TP HCM",
    bedrooms: 3,
    bathrooms: 2,
    area: "120m²",
    type: "Nhà phố",
    badge: "Hot",
  },
]);

// For Sale Properties Data
const activeSaleTab = ref(0);
const saleTabs = ref([
  "TP HCM",
  "Đà Nẵng",
  "Hà Nội",
  "Bình Dương",
  "Long An",
  "Cần Thơ",
  "Bình Định",
  "Nha Trang",
]);
const saleProjects = ref([
  {
    name: "Căn hộ Vinhomes Grand Park",
    location: "Quận 9, TP HCM",
    price: "1.2 tỷ",
    priceUnit: "VND",
    image: image1,
    city: "TP HCM",
    bedrooms: 2,
    bathrooms: 2,
    area: "65m²",
    type: "Căn hộ",
    badge: "Ưu đãi",
  },
  {
    name: "Biệt thự The Nassim",
    location: "Quận 2, TP HCM",
    price: "12.5 tỷ",
    priceUnit: "VND",
    image: image2,
    city: "TP HCM",
    bedrooms: 4,
    bathrooms: 3,
    area: "250m²",
    type: "Biệt thự",
    badge: "Mới",
  },
  {
    name: "Nhà phố Masteri An Phú",
    location: "Quận 2, TP HCM",
    price: "5.5 tỷ",
    priceUnit: "VND",
    image: image3,
    city: "TP HCM",
    bedrooms: 3,
    bathrooms: 2,
    area: "120m²",
    type: "Nhà phố",
  },
  {
    name: "Căn hộ The Sun Avenue",
    location: "Quận 2, TP HCM",
    price: "3.2 tỷ",
    priceUnit: "VND",
    image: image4,
    city: "TP HCM",
    bedrooms: 2,
    bathrooms: 2,
    area: "70m²",
    type: "Căn hộ",
    badge: "Hot",
  },
]);

// News Data
const activeNewsTab = ref(0);
const newsTabs = ref(["Tất cả", "Thị trường", "Phân tích", "Pháp lý", "Dự án"]);
const newsList = ref([
  {
    title: "Lịch Phát Hành Kỳ Vọng Với Giá Khiến Giao Dịch BĐS Khó 'Chốt Kèo'",
    description:
      "Những thông tin mới nhất về thị trường bất động sản trong tháng này với nhiều biến động đáng chú ý.",
    date: "2 giờ trước",
    image: image1,
    category: "Thị trường",
    tag: "market",
  },
  {
    title: "Những Điểm Sáng Ấn Tượng Của Thị Trường Bất Động Sản Hà Nội",
    description:
      "Thị trường bất động sản Hà Nội đang có những chuyển biến tích cực với nhiều dự án mới được mở bán.",
    date: "1 ngày trước",
    image: image2,
    category: "Phân tích",
    tag: "analysis",
  },
  {
    title: "Căn Hộ Thương Mại Đang Là Xu Hướng Mới",
    description:
      "Căn hộ thương mại đang thu hút sự quan tâm lớn từ các nhà đầu tư với tiềm năng sinh lời cao.",
    date: "3 ngày trước",
    image: image3,
    category: "Dự án",
    tag: "project",
  },
  {
    title: "Thay Đổi Chính Sách Thuế Bất Động Sản Năm 2023",
    description:
      "Những thay đổi về chính sách thuế bất động sản sẽ có hiệu lực từ đầu năm 2023.",
    date: "5 ngày trước",
    image: image4,
    category: "Pháp lý",
    tag: "legal",
  },
  {
    title: "Xu Hướng Đầu Tư Bất Động Sản Ven Đô",
    description:
      "Các khu vực ven đô đang trở thành điểm đến mới cho các nhà đầu tư bất động sản.",
    date: "1 tuần trước",
    image: image1,
    category: "Phân tích",
    tag: "analysis",
  },
  {
    title: "Dự Án Mới Tại Quận 9: Cơ Hội Đầu Tư Hấp Dẫn",
    description:
      "Dự án mới tại Quận 9 hứa hẹn mang lại nhiều cơ hội đầu tư hấp dẫn cho nhà đầu tư.",
    date: "2 tuần trước",
    image: image2,
    category: "Dự án",
    tag: "project",
  },
]);

const isMobile = ref(false);
const dropdownOpen = ref(null);

// --- Lifecycle hooks ---
onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
  document.addEventListener("mousedown", handleClickOutsideDropdown);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", checkMobile);
  document.removeEventListener("mousedown", handleClickOutsideDropdown);
});

// --- Computed properties ---
const filteredProjects = computed(() => {
  return projects.value.filter(
    (project) => project.city === projectTabs.value[activeProjectTab.value]
  );
});
const filteredRentalProjects = computed(() => {
  return rentalProjects.value.filter(
    (project) => project.city === rentalTabs.value[activeRentalTab.value]
  );
});
const filteredSaleProjects = computed(() => {
  return saleProjects.value.filter(
    (project) => project.city === saleTabs.value[activeSaleTab.value]
  );
});
const filteredNews = computed(() => {
  if (activeNewsTab.value === 0) {
    return newsList.value.slice(0, 3); // Show first 3 news for "All" tab
  }
  const category = newsTabs.value[activeNewsTab.value];
  return newsList.value
    .filter((news) => news.category === category)
    .slice(0, 3);
});

// --- Methods ---
function checkMobile() {
  isMobile.value = window.innerWidth < 768;
}
function changeTab(index) {
  tabs.value.forEach((tab, i) => {
    tab.active = i === index;
  });
  searchValues.value.type = tabs.value[index].label;
}
function handleSearch() {
  // Xử lý tìm kiếm
  console.log("Search values:", searchValues.value);
}
function toggleDropdown(model) {
  dropdownOpen.value = dropdownOpen.value === model ? null : model;
}
function selectDropdownOption(model, option) {
  searchValues.value[model] = option;
  dropdownOpen.value = null;
}

// Đóng dropdown khi click ngoài
function handleClickOutsideDropdown(event) {
  const dropdowns = document.querySelectorAll(".dropdown-parent");
  let clickedInside = false;
  dropdowns.forEach((el) => {
    if (el.contains(event.target)) clickedInside = true;
  });
  if (!clickedInside) dropdownOpen.value = null;
}

const { data: properties, pending, error } = await useFetch("/api/properties");
</script>

<style>
.font-inter {
  font-family: "Inter", sans-serif;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
