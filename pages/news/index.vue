<template>
  <div class="min-h-screen pt-12 pb-12 bg-white">
    <div class="flex flex-col gap-10 px-6 pb-0 mx-auto max-w-7xl md:flex-row">
      <!-- Main content -->
      <div class="flex-1 w-full">
        <!-- Featured news -->
        <div v-if="newsList.length" class="mb-8">
          <div class="relative overflow-hidden bg-white shadow rounded-2xl">
            <img
              :src="newsList[0]?.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'"
              class="w-full h-[260px] md:h-[340px] object-cover"
              alt="Tin nổi bật"
            />
            <div class="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent">
              <h2 class="mb-2 text-2xl font-bold text-white md:text-3xl">{{ newsList[0].title }}</h2>
              <div class="flex items-center gap-2 mb-1 text-sm text-white/80">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-width="2" d="M12 8v4l3 3"/>
                  <circle cx="12" cy="12" r="10" stroke-width="2"/>
                </svg>
                <span>1 giờ trước</span>
              </div>
            </div>
          </div>
        </div>
        <!-- List news -->
        <div class="flex flex-col gap-4">
          <div
            v-for="(item, idx) in visibleNews"
            :key="item.id"
            class="flex gap-4 p-4 bg-white shadow rounded-xl"
          >
            <img
              :src="item.image || 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80'"
              class="flex-shrink-0 object-cover w-32 h-24 rounded-lg"
              alt="news"
            />
            <div class="flex flex-col flex-1">
              <div class="flex items-center gap-2 mb-1 text-xs text-gray-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-width="2" d="M12 8v4l3 3"/>
                  <circle cx="12" cy="12" r="10" stroke-width="2"/>
                </svg>
                <span>{{ item.date || '30 phút trước' }}</span>
              </div>
              <NuxtLink
                :to="`/news/${item.slug}`"
                class="font-semibold text-[#1C1917] text-base mb-1 hover:text-[#F62E56] line-clamp-2"
              >
                {{ item.title }}
              </NuxtLink>
              <p class="text-sm text-gray-500 line-clamp-2">{{ item.description }}</p>
            </div>
          </div>
        </div>
        <!-- Xem thêm -->
        <div class="flex justify-center mt-8">
          <button
            class="px-8 py-3 bg-[#F62E56] text-white rounded-lg font-semibold font-inter hover:bg-[#d81b4a] transition"
            @click="loadMore"
            v-if="visibleNews.length < newsList.length - 1"
          >
            Xem thêm
          </button>
        </div>
      </div>
      <!-- Sidebar -->
      <aside class="w-full md:w-[320px] flex-shrink-0">
        <div class="p-6 mb-6 bg-white shadow rounded-xl">
          <div class="font-bold text-base mb-4 text-[#1C1917]">Bài viết được xem nhiều nhất</div>
          <ul class="flex flex-col gap-3">
            <li v-for="item in mostViewed" :key="item.id">
              <NuxtLink
                :to="`/news/${item.slug}`"
                class="text-sm text-[#1C1917] hover:text-[#F62E56] transition line-clamp-2"
              >
                {{ item.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="p-6 bg-white shadow mt-9 rounded-xl">
          <div class="font-bold text-base mb-2 text-[#1C1917]">Tin mới</div>
          <ul class="flex flex-col gap-2">
            <li v-for="item in latestNews" :key="item.id">
              <NuxtLink
                :to="`/news/${item.slug}`"
                class="text-sm text-[#1C1917] hover:text-[#F62E56] transition line-clamp-1"
              >
                {{ item.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const newsList = [
  {
    id: 1,
    title: 'Những Điểm Sáng Ấn Tượng Của Thị Trường Bất Động Sản Hà Nội',
    description: 'Bên cạnh các yếu tố về vị trí, chủ đầu tư, chất lượng xây dựng,... giới tinh hoa đang quan tâm nhiều hơn đến các tiêu chí về sức khỏe khi chọn lựa bất động sản. Năm tại "vị trí vàng" của khu vực phía Tây th...',
    date: '1 giờ trước',
    slug: 'nhung-diem-sang-an-tuong-cua-thi-truong-bat-dong-san-ha-noi',
    image: 'https://plus.unsplash.com/premium_photo-1673264931187-9e8b6c6b6c2d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Honas Residence - Căn Hộ 1.3 Tỷ Hâm Nóng Thị Trường Bất Động Sản',
    description: 'Bên cạnh các yếu tố về vị trí, chủ đầu tư, chất lượng xây dựng,... giới tinh hoa đang quan tâm nhiều hơn đến các tiêu chí về sức khỏe khi chọn lựa bất động sản. Năm tại "vị trí vàng" của khu vực phía Tây th...',
    date: '30 phút trước',
    slug: 'honas-residence-can-ho-1-3-ty-ham-nong-thi-truong',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    title: 'Định Giá Đất Phù Hợp Để Tăng Nguồn Cung Dự Án',
    description: 'Bên cạnh các yếu tố về vị trí, chủ đầu tư, chất lượng xây dựng,... giới tinh hoa đang quan tâm nhiều hơn đến các tiêu chí về sức khỏe khi chọn lựa bất động sản. Năm tại "vị trí vàng" của khu vực phía Tây th...',
    date: '30 phút trước',
    slug: 'dinh-gia-dat-phu-hop-de-tang-nguon-cung-du-an',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 4,
    title: 'Thị Trường BĐS Quận 10: Sức Hút Từ Trung Tâm Kinh Tế Lâu Đời Của TP.HCM',
    description: 'Bên cạnh các yếu tố về vị trí, chủ đầu tư, chất lượng xây dựng,... giới tinh hoa đang quan tâm nhiều hơn đến các tiêu chí về sức khỏe khi chọn lựa bất động sản. Năm tại "vị trí vàng" của khu vực phía Tây th...',
    date: '30 phút trước',
    slug: 'thi-truong-bds-quan-10-suc-hut-trung-tam-kinh-te',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 5,
    title: 'Nhiều Lô Đất Nền Quận 9 Giảm Giá Cả Tỷ Đồng',
    description: 'Bên cạnh các yếu tố về vị trí, chủ đầu tư, chất lượng xây dựng,... giới tinh hoa đang quan tâm nhiều hơn đến các tiêu chí về sức khỏe khi chọn lựa bất động sản. Năm tại "vị trí vàng" của khu vực phía Tây th...',
    date: '30 phút trước',
    slug: 'nhieu-lo-dat-nen-quan-9-giam-gia-ca-ty-dong',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 6,
    title: 'Thực Trạng Thị Trường BĐS Ở Việt Nam Hiện Nay: Lượng Giao Dịch Đang Tăng',
    description: 'Bên cạnh các yếu tố về vị trí, chủ đầu tư, chất lượng xây dựng,... giới tinh hoa đang quan tâm nhiều hơn đến các tiêu chí về sức khỏe khi chọn lựa bất động sản. Năm tại "vị trí vàng" của khu vực phía Tây th...',
    date: '30 phút trước',
    slug: 'thuc-trang-thi-truong-bds-viet-nam-hien-nay',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 7,
    title: 'Môi Giới Bất Động Sản Bắt Đầu Quay Lại Với Nghề Khi Thị Trường BĐS Ấm Lên',
    description: 'Bên cạnh các yếu tố về vị trí, chủ đầu tư, chất lượng xây dựng,... giới tinh hoa đang quan tâm nhiều hơn đến các tiêu chí về sức khỏe khi chọn lựa bất động sản. Năm tại "vị trí vàng" của khu vực phía Tây th...',
    date: '30 phút trước',
    slug: 'moi-gioi-bat-dong-san-bat-dau-quay-lai-voi-nghe',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80'
  }
]

// Sidebar: bài viết được xem nhiều nhất (demo)
const mostViewed = [
  {
    id: 101,
    title: 'Lệch Pha Kỳ Vọng Về Giá Khiến Giao Dịch BĐS Khó "Chốt Kèo"',
    slug: 'lech-pha-ky-vong-giao-dich-bds'
  },
  {
    id: 102,
    title: 'Những Điểm Sáng Ấn Tượng Của Thị Trường Bất Động Sản Hà Nội',
    slug: 'nhung-diem-sang-an-tuong-cua-thi-truong-bat-dong-san-ha-noi'
  },
  {
    id: 103,
    title: 'Toàn Cảnh Thị Trường BĐS Quý 2/2023 Qua Báo Cáo Batdongsan.com.vn',
    slug: 'toan-canh-thi-truong-bds-quy-2-2023'
  },
  {
    id: 104,
    title: 'Lãi Suất Vay Ngân Hàng Tháng 7/2023 Ra Sao Sau Chỉ Đạo Của Ngân Hàng Nhà Nước?',
    slug: 'lai-suat-vay-ngan-hang-thang-7-2023'
  },
  {
    id: 105,
    title: '"Xếp Hạng" Cho Môi Giới Thoát Hộ Suất Đầu Tư Nhà Đất Tỉnh',
    slug: 'xep-hang-moi-gioi-thoat-ho-suat-dau-tu'
  }
]

// Sidebar: tin mới (demo)
const latestNews = [
  {
    id: 201,
    title: 'Lệch Pha Kỳ Vọng Về Giá Khiến Giao Dịch BĐS Khó "Chốt Kèo"',
    slug: 'lech-pha-ky-vong-giao-dich-bds'
  },
  {
    id: 202,
    title: 'Những Điểm Sáng Ấn Tượng Của Thị Trường Bất Động Sản Hà Nội',
    slug: 'nhung-diem-sang-an-tuong-cua-thi-truong-bat-dong-san-ha-noi'
  },
  {
    id: 203,
    title: 'Toàn Cảnh Thị Trường BĐS Quý 2/2023 Qua Báo Cáo Batdongsan.com.vn',
    slug: 'toan-canh-thi-truong-bds-quy-2-2023'
  },
  {
    id: 204,
    title: 'Lãi Suất Vay Ngân Hàng Tháng 7/2023 Ra Sao Sau Chỉ Đạo Của Ngân Hàng Nhà Nước?',
    slug: 'lai-suat-vay-ngan-hang-thang-7-2023'
  },
  {
    id: 205,
    title: '"Xếp Hạng" Cho Môi Giới Thoát Hộ Suất Đầu Tư Nhà Đất Tỉnh',
    slug: 'xep-hang-moi-gioi-thoat-ho-suat-dau-tu'
  }
]

// Số lượng bài viết hiển thị mỗi lần
const PAGE_SIZE = 5
const visibleCount = ref(PAGE_SIZE)

// Bỏ bài đầu tiên (featured) khỏi danh sách load-more
const visibleNews = computed(() => newsList.slice(1, 1 + visibleCount.value))

function loadMore() {
  if (visibleCount.value < newsList.length - 1) {
    visibleCount.value += PAGE_SIZE
  }
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>