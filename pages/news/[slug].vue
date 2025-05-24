<template>
  <div class="max-w-2xl px-4 py-10 mx-auto">
    <div v-if="news">
      <h1 class="text-2xl font-bold text-[#F62E56] mb-4">{{ news.title }}</h1>
      <div class="mb-2 text-sm text-gray-400">{{ news.date }}</div>
      <div class="mb-6 text-gray-600">{{ news.description }}</div>
      <NuxtLink to="/news" class="text-[#F62E56] underline">← Quay lại danh sách tin</NuxtLink>
    </div>
    <div v-else>
      <p class="text-gray-500">Không tìm thấy tin tức này.</p>
      <NuxtLink to="/news" class="text-[#F62E56] underline">← Quay lại danh sách tin</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug

// Dữ liệu mẫu giống news.vue
const newsList = [
  {
    id: 1,
    title: 'Thị trường bất động sản 2025: Xu hướng và cơ hội',
    description: 'Cùng điểm qua những xu hướng nổi bật của thị trường bất động sản năm 2025 và các cơ hội đầu tư hấp dẫn...',
    date: '22/05/2025',
    slug: 'thi-truong-bat-dong-san-2025',
  },
  {
    id: 2,
    title: '5 lưu ý khi mua nhà lần đầu',
    description: 'Bạn đang chuẩn bị mua nhà lần đầu? Đừng bỏ qua 5 lưu ý quan trọng giúp bạn tránh rủi ro và chọn được căn nhà ưng ý...',
    date: '20/05/2025',
    slug: '5-luu-y-khi-mua-nha-lan-dau',
  },
]

const news = newsList.find(item => item.slug === slug)
</script>