<template>
  <div class="min-h-screen pt-10 bg-gray-50">
    <!-- Breadcrumb -->
    <div class="container px-4 py-2 mx-auto text-sm text-gray-500">
      <span class="hover:text-[#F62E56] cursor-pointer"><NuxtLink to="/">Trang chủ</NuxtLink></span>
      <span class="mx-2">/</span>
      <span class="hover:text-[#F62E56] cursor-pointer"><NuxtLink to="/rent">Thuê</NuxtLink></span>
      <span class="mx-2">/</span>
      <span class="text-gray-700">{{ product?.title }}</span>
    </div>

    <!-- Main Product Info -->
    <section class="container grid grid-cols-1 gap-8 px-4 py-6 mx-auto bg-white shadow md:grid-cols-2 rounded-xl">
      <!-- Image Gallery -->
      <div>
        <img :src="activeImage" class="object-cover w-full shadow h-72 md:h-96 rounded-xl" />
        <div class="flex gap-2 mt-4">
          <img
            v-for="(img, idx) in product?.images"
            :key="idx"
            :src="img"
            class="object-cover w-16 h-16 border-2 rounded cursor-pointer"
            :class="activeImage === img ? 'border-[#F62E56]' : 'border-transparent'"
            @click="activeImage = img"
          />
        </div>
      </div>
      <!-- Info -->
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold text-gray-900 md:text-3xl">{{ product?.title }}</h1>
        <div class="flex items-center gap-2 text-gray-600">
          <svg class="w-5 h-5 text-[#F62E56]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z"/></svg>
          {{ product?.location }}
        </div>
        <div class="text-3xl font-bold text-[#F62E56]">{{ formatPrice(product?.price) }}</div>
        <div class="flex gap-3 mt-2">
          <button class="px-4 py-2 rounded bg-[#F62E56] text-white font-semibold hover:bg-[#e0244d]">Liên hệ ngay</button>
          <button class="px-4 py-2 rounded border border-[#F62E56] text-[#F62E56] font-semibold hover:bg-[#fbe9ef]">Hẹn xem nhà</button>
          <button class="px-4 py-2 font-semibold text-gray-700 border border-gray-300 rounded hover:bg-gray-100">Nhắn tin</button>
        </div>
        <!-- Thông số chính -->
        <div class="flex flex-wrap gap-6 mt-4">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M4 21V7a2 2 0 012-2h12a2 2 0 012 2v14"/></svg>
            <span>{{ product?.rooms || (product?.bedrooms + 'PN/' + product?.bathrooms + 'WC') }}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><path stroke-width="2" d="M12 6v6l4 2"/></svg>
            <span>{{ product?.area }} m²</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M12 2v20m10-10H2"/></svg>
            <span>{{ product?.direction }}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="20" height="8" x="2" y="8" rx="2" stroke-width="2"/></svg>
            <span>{{ product?.block }}</span>
          </div>
        </div>
        <!-- Tiện ích nội thất -->
        <div class="mt-4">
          <h3 class="mb-2 font-semibold">Tiện nghi nội thất</h3>
          <div class="flex flex-wrap gap-3">
            <div v-for="item in product?.interior" :key="item" class="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 rounded-full">
              <span v-if="iconMap[item]" v-html="iconMap[item]" class="w-4 h-4"></span>
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mô tả chi tiết -->
    <section class="container px-4 py-6 mx-auto mt-6 bg-white shadow rounded-xl">
      <h2 class="mb-2 text-xl font-bold">Mô tả chi tiết</h2>
      <div class="leading-relaxed text-gray-700 whitespace-pre-line">
        {{ product?.description }}
      </div>
    </section>

    <!-- Ưu điểm dự án -->
    <section class="container px-4 py-6 mx-auto mt-6 bg-white shadow rounded-xl">
      <h2 class="mb-2 text-xl font-bold">Ưu điểm dự án</h2>
      <div class="mb-2">
        <span class="font-semibold">Vị trí dự án:</span>
        <span class="text-gray-700">{{ product?.advantages }}</span>
      </div>
      <div class="mb-2">
        <span class="font-semibold">Tiện ích nội khu:</span>
        <ul class="ml-6 text-gray-700 list-disc">
          <li v-for="(item, idx) in projectFacilities" :key="idx">{{ item }}</li>
        </ul>
      </div>
      <div>
        <span class="font-semibold">Thông tin dự án:</span>
        <div class="text-gray-700">{{ projectInfo }}</div>
      </div>
    </section>

    <!-- Gợi ý các căn hộ khác -->
    <section class="container px-4 py-6 mx-auto mt-6">
      <h2 class="mb-4 text-xl font-bold">Có thể bạn quan tâm</h2>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-4">
        <PropertyCard
          v-for="item in relatedProducts"
          :key="item.id"
          :product="item"
          :to="`/${item.type === 'rent' ? 'rent' : 'buy'}/${item.id}`"
          :isRent="item.type === 'rent'"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import PropertyCard from '~/components/PropertyCard.vue'
import { ref, watch } from 'vue'

const route = useRoute()
const { data: product, pending, error } = await useFetch(`/api/properties/${route.params.id}`)
// Lấy danh sách tất cả sản phẩm để gợi ý
const { data: allProducts } = await useFetch('/api/properties')

const relatedProducts = ref([])
const activeImage = ref('')

// Cập nhật relatedProducts khi product hoặc allProducts thay đổi
watch([product, allProducts], () => {
  if (product.value && allProducts.value) {
    relatedProducts.value = allProducts.value
      .filter(item => item.id !== product.value.id && item.type === product.value.type)
      .slice(0, 4)
    activeImage.value = product.value.images?.[0] || product.value.image || ''
  }
}, { immediate: true })

watch(product, (val) => {
  if (val?.images?.length) {
    activeImage.value = val.images[0]
  } else if (val?.image) {
    activeImage.value = val.image
  }
})

// Icon map cho tiện nghi nội thất
const iconMap = {
  'Giường': `<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="10" width="18" height="7" rx="2" stroke-width="2"/><path stroke-width="2" d="M21 17V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10"/></svg>`,
  'Tủ lạnh': `<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="6" y="3" width="12" height="18" rx="2" stroke-width="2"/><path stroke-width="2" d="M6 9h12"/></svg>`,
  'Máy giặt': `<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/><circle cx="12" cy="12" r="5" stroke-width="2"/></svg>`,
  'Wifi': `<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M5 13a10 10 0 0114 0M8.5 16.5a5 5 0 017 0M12 20h.01"/></svg>`,
  'Tivi': `<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="13" rx="2" stroke-width="2"/><path stroke-width="2" d="M8 2h8"/></svg>`,
  'Bàn ăn': `<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="10" width="18" height="7" rx="2" stroke-width="2"/><path stroke-width="2" d="M7 10V7a5 5 0 0110 0v3"/></svg>`,
  'Lò vi sóng': `<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" stroke-width="2"/><path stroke-width="2" d="M7 11h.01M17 11h.01"/></svg>`,
  'Bồn rửa chén': `<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" stroke-width="2"/><path stroke-width="2" d="M7 11h10"/></svg>`,
  'Vòi sen': `<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/><path stroke-width="2" d="M7 17V7a5 5 0 0110 0v10"/></svg>`,
  'Bồn tắm': `<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="10" width="18" height="7" rx="2" stroke-width="2"/><path stroke-width="2" d="M7 10V7a5 5 0 0110 0v3"/></svg>`,
  'Máy lạnh': `<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" stroke-width="2"/><path stroke-width="2" d="M7 17v2a2 2 0 002 2h6a2 2 0 002-2v-2"/></svg>`,
}

function formatPrice(price) {
  if (!price) return ''
  return price.toLocaleString('vi-VN') + ' VNĐ'
}

const projectFacilities = [
  'Hồ bơi, phòng tập gym, khuôn viên xanh',
  'Trung tâm mua sắm, cửa hàng tiện lợi 24/24',
  'An ninh 24/7, bãi đậu xe rộng rãi',
  'Khu vui chơi trẻ em, công viên nội khu'
]

const projectInfo = 'Căn hộ Vinhomes Golden River được xây dựng trên khu đất Ba Son ven sông Sài Gòn, ngay trung tâm Quận 1. Khu vực này đã sớm trở thành nơi toạ lạc của những toà nhà văn phòng chọc trời, trung tâm thương mại và những con đường dạo bộ ven sông tuyệt đẹp.'
</script>