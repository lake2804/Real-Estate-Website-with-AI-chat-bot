<template>
  <div class="max-w-3xl px-4 py-12 mx-auto">
    <div v-if="news">
      <div class="mb-8">
        <NuxtLink
          to="/news"
          class="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-[#F62E56]/10 text-[#F62E56] font-semibold hover:bg-[#F62E56]/20 transition"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Quay lại danh sách tin
        </NuxtLink>
        <img
          v-if="news.image"
          :src="news.image"
          alt="Ảnh tin tức"
          class="object-cover w-full h-64 mb-6 shadow rounded-2xl"
        />
        <h1 class="text-3xl md:text-4xl font-extrabold text-[#F62E56] mb-3 leading-tight">{{ news.title }}</h1>
        <div class="flex items-center gap-3 mb-6 text-sm text-gray-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-width="2" d="M12 8v4l3 3"/>
            <circle cx="12" cy="12" r="10" stroke-width="2"/>
          </svg>
          <span>{{ news.date }}</span>
        </div>
      </div>
      <div class="mb-10 prose prose-lg text-gray-800 max-w-none">
        <p class="!text-xl !font-medium !text-gray-700">{{ news.description }}</p>
        <div v-if="news.content">
          <div v-html="news.content"></div>
        </div>
      </div>
      <div class="pt-8 mt-8 border-t">
        <div class="text-lg font-semibold text-[#1C1917] mb-4">Các tin liên quan</div>
        <div class="grid gap-4 md:grid-cols-2">
          <NuxtLink
            v-for="item in relatedNews"
            :key="item.slug"
            :to="`/news/${item.slug}`"
            class="flex gap-3 bg-[#f8f9fb] hover:bg-[#fbe9ee] rounded-xl p-3 transition group"
          >
            <img
              :src="item.image"
              alt="news"
              class="object-cover w-20 h-16 rounded-lg shadow-sm"
            />
            <div class="flex flex-col justify-center">
              <div class="flex items-center gap-1 mb-1 text-xs text-gray-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-width="2" d="M12 8v4l3 3"/>
                  <circle cx="12" cy="12" r="10" stroke-width="2"/>
                </svg>
                <span>{{ item.date }}</span>
              </div>
              <div class="font-semibold text-[#1C1917] group-hover:text-[#F62E56] text-sm line-clamp-2">
                {{ item.title }}
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div v-else class="py-20 text-center">
      <p class="mb-4 text-lg text-gray-500">Không tìm thấy tin tức này.</p>
      <NuxtLink
        to="/news"
        class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F62E56]/10 text-[#F62E56] font-semibold hover:bg-[#F62E56]/20 transition"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Quay lại danh sách tin
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug

// Dữ liệu mẫu đồng bộ với trang index.vue
const newsList = [
  {
    id: 1,
    title: 'Những Điểm Sáng Ấn Tượng Của Thị Trường Bất Động Sản Hà Nội',
    description: 'Bên cạnh các yếu tố về vị trí, chủ đầu tư, chất lượng xây dựng,... giới tinh hoa đang quan tâm nhiều hơn đến các tiêu chí về sức khỏe khi chọn lựa bất động sản. Năm tại "vị trí vàng" của khu vực phía Tây th...',
    date: '1 giờ trước',
    slug: 'nhung-diem-sang-an-tuong-cua-thi-truong-bat-dong-san-ha-noi',
    image: 'https://plus.unsplash.com/premium_photo-1673264931187-9e8b6c6b6c2d?auto=format&fit=crop&w=800&q=80',
    content: `
      <h2>Điểm nhấn thị trường</h2>
      <ul>
        <li>Vị trí vàng phía Tây Hà Nội thu hút đầu tư mạnh mẽ</li>
        <li>Chất lượng sống và tiện ích nội khu ngày càng được chú trọng</li>
        <li>Xu hướng căn hộ xanh, thân thiện môi trường</li>
      </ul>
      <h2>Cơ hội cho nhà đầu tư</h2>
      <p>
        Thị trường Hà Nội tiếp tục là điểm sáng với nhiều dự án mới, chính sách hỗ trợ hấp dẫn và tiềm năng tăng giá ổn định.
      </p>
    `
  },
  {
    id: 2,
    title: 'Honas Residence - Căn Hộ 1.3 Tỷ Hâm Nóng Thị Trường Bất Động Sản',
    description: 'Bên cạnh các yếu tố về vị trí, chủ đầu tư, chất lượng xây dựng,... giới tinh hoa đang quan tâm nhiều hơn đến các tiêu chí về sức khỏe khi chọn lựa bất động sản. Năm tại "vị trí vàng" của khu vực phía Tây th...',
    date: '30 phút trước',
    slug: 'honas-residence-can-ho-1-3-ty-ham-nong-thi-truong',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    content: `
      <h2>Honas Residence nổi bật với gì?</h2>
      <ul>
        <li>Giá bán cạnh tranh chỉ từ 1.3 tỷ/căn</li>
        <li>Vị trí thuận tiện, kết nối nhanh trung tâm</li>
        <li>Tiện ích nội khu đa dạng, an ninh 24/7</li>
      </ul>
      <p>
        Dự án phù hợp cho người trẻ, gia đình nhỏ muốn an cư tại khu vực phát triển năng động.
      </p>
    `
  },
  {
    id: 3,
    title: 'Định Giá Đất Phù Hợp Để Tăng Nguồn Cung Dự Án',
    description: 'Bên cạnh các yếu tố về vị trí, chủ đầu tư, chất lượng xây dựng,... giới tinh hoa đang quan tâm nhiều hơn đến các tiêu chí về sức khỏe khi chọn lựa bất động sản. Năm tại "vị trí vàng" của khu vực phía Tây th...',
    date: '30 phút trước',
    slug: 'dinh-gia-dat-phu-hop-de-tang-nguon-cung-du-an',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    content: `
      <h2>Định giá đất và nguồn cung</h2>
      <ul>
        <li>Giá đất hợp lý giúp tăng nguồn cung dự án mới</li>
        <li>Chính sách hỗ trợ từ nhà nước thúc đẩy phát triển</li>
      </ul>
      <p>
        Nhà đầu tư nên theo dõi sát các chính sách và quy hoạch để nắm bắt cơ hội.
      </p>
    `
  },
  {
    id: 4,
    title: 'Thị Trường BĐS Quận 10: Sức Hút Từ Trung Tâm Kinh Tế Lâu Đời Của TP.HCM',
    description: 'Bên cạnh các yếu tố về vị trí, chủ đầu tư, chất lượng xây dựng,... giới tinh hoa đang quan tâm nhiều hơn đến các tiêu chí về sức khỏe khi chọn lựa bất động sản. Năm tại "vị trí vàng" của khu vực phía Tây th...',
    date: '30 phút trước',
    slug: 'thi-truong-bds-quan-10-suc-hut-trung-tam-kinh-te',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80',
    content: `
      <h2>Quận 10 - Trung tâm kinh tế lâu đời</h2>
      <ul>
        <li>Vị trí trung tâm, giao thông thuận tiện</li>
        <li>Nhiều dự án mới, tiềm năng tăng giá cao</li>
      </ul>
      <p>
        Quận 10 là lựa chọn lý tưởng cho cả an cư và đầu tư lâu dài.
      </p>
    `
  }
]

// Lấy tin hiện tại
const news = newsList.find(item => item.slug === slug)

// Tin liên quan (khác tin hiện tại, lấy tối đa 2 tin)
const relatedNews = newsList.filter(item => item.slug !== slug).slice(0, 2)
</script>

<style scoped>
.prose :where(h2) {
  color: #F62E56;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-size: 1.25em;
  font-weight: 700;
}
.prose :where(ul,ol) {
  padding-left: 1.5em;
  margin-bottom: 1em;
}
.prose :where(li) {
  margin-bottom: 0.25em;
}
.prose :where(p) {
  margin-bottom: 1em;
}
</style>