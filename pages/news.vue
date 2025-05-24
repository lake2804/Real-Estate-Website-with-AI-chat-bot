<template>
  <div class="max-w-4xl px-4 py-10 mx-auto">
    <h1 class="text-3xl font-bold text-[#F62E56] mb-8">Tin tức bất động sản</h1>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div
        v-for="item in newsList"
        :key="item.id"
        class="flex flex-col justify-between p-5 bg-white shadow rounded-xl"
      >
        <div>
          <h2 class="text-xl font-semibold text-[#1C1917] mb-2">{{ item.title }}</h2>
          <p class="mb-4 text-sm text-gray-500 line-clamp-3">{{ item.description }}</p>
        </div>
        <div class="flex items-center justify-between text-sm text-gray-400 font-inter">
          <span>{{ item.date }}</span>
          <NuxtLink
            :to="`/news/${item.slug}`"
            class="flex items-center text-[#F62E56] cursor-pointer hover:underline"
          >
            Đọc tiếp
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
  // Thêm các tin khác nếu muốn
]
</script>