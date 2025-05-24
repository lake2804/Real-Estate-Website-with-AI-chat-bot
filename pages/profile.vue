<template>
  <client-only>
    <div v-if="user" class="max-w-5xl px-4 py-10 mx-auto">
      <div class="flex flex-col gap-8 md:flex-row">
        <!-- Sidebar -->
        <aside class="flex flex-col w-full gap-4 p-6 bg-white shadow md:w-64 rounded-xl">
          <div class="flex items-center gap-3">
            <img :src="user.avatar" class="w-14 h-14 rounded-full border-2 border-[#F62E56]" />
            <div>
              <div class="text-lg font-bold">{{ user.name }}</div>
              <div class="text-xs text-gray-400">{{ user.role === 'admin' ? 'Admin' : 'User' }}</div>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-sm text-gray-500">Email:</div>
            <div class="font-medium">{{ user.email }}</div>
          </div>
          <div class="mt-2">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              @click="handleTab(tab.key)"
              :class="[
                'w-full text-left px-4 py-2 rounded-lg font-medium transition',
                currentTab === tab.key
                  ? 'bg-gradient-to-br from-[#F62E56] to-[#ff7cae] text-white'
                  : 'hover:bg-[#fce6ec] text-[#F62E56]'
              ]"
            >
              {{ tab.label }}
            </button>
          </div>
        </aside>

        <!-- Main Content -->
        <section class="flex-1 bg-white rounded-xl shadow p-6 min-h-[400px]">
          <!-- User Tabs -->
          <template v-if="user.role === 'user'">
            <div v-if="currentTab === 'info'">
              <h2 class="font-bold text-xl mb-4 text-[#F62E56]">Thông tin tài khoản</h2>
              <div><b>Tên:</b> {{ user.name }}</div>
              <div><b>Email:</b> {{ user.email }}</div>
              <div><b>Số điện thoại:</b> {{ user.phone }}</div>
              <div><b>Địa chỉ:</b> {{ user.address }}</div>
              <div><b>Mật khẩu:</b> {{ user.password }}</div>
              <div><b>Vai trò:</b> {{ user.role === 'admin' ? 'Admin' : 'User' }}</div>
            </div>
            <div v-else-if="currentTab === 'liked'">
              <h2 class="font-bold text-xl mb-4 text-[#F62E56]">Sản phẩm đã thích</h2>
              <ul>
                <li v-for="item in user.likedProducts" :key="item.id" class="mb-2">
                  <span class="font-medium">{{ item.title }}</span> - {{ item.type }}
                </li>
              </ul>
            </div>
            <div v-else-if="currentTab === 'myproducts'">
              <h2 class="font-bold text-xl mb-4 text-[#F62E56]">Quản lý sản phẩm đã đăng</h2>
              <ul>
                <li v-for="item in user.myProducts" :key="item.id" class="flex items-center justify-between mb-2">
                  <span>
                    <span class="font-medium">{{ item.title }}</span> - {{ item.status }}
                  </span>
                  <button class="px-3 py-1 rounded bg-[#F62E56] text-white text-xs">Chỉnh sửa</button>
                </li>
              </ul>
            </div>
            <div v-else-if="currentTab === 'chat'">
              <h2 class="font-bold text-xl mb-4 text-[#F62E56]">Liên hệ với người mua</h2>
              <div class="text-gray-500">Tích hợp chat realtime ở đây (demo):</div>
              <div class="mt-2 p-4 bg-[#fce6ec] rounded-lg text-[#F62E56]">Bạn chưa có tin nhắn nào.</div>
            </div>
          </template>

          <!-- Admin Tabs -->
          <template v-else>
            <div v-if="currentTab === 'info'">
              <h2 class="font-bold text-xl mb-4 text-[#F62E56]">Thông tin tài khoản</h2>
              <div><b>Tên:</b> {{ user.name }}</div>
              <div><b>Email:</b> {{ user.email }}</div>
              <div><b>Số điện thoại:</b> {{ user.phone }}</div>
              <div><b>Địa chỉ:</b> {{ user.address }}</div>
              <div><b>Mật khẩu:</b> {{ user.password }}</div>
              <div><b>Vai trò:</b> {{ user.role === 'admin' ? 'Admin' : 'User' }}</div>
            </div>
            <div v-else-if="currentTab === 'products'">
              <h2 class="font-bold text-xl mb-4 text-[#F62E56]">Quản lý sản phẩm</h2>
              <ul>
                <li v-for="item in adminProducts" :key="item.id" class="flex items-center justify-between mb-2">
                  <span>
                    <span class="font-medium">{{ item.title }}</span> - {{ item.status }}
                  </span>
                  <button class="px-3 py-1 rounded bg-[#F62E56] text-white text-xs">Xem</button>
                </li>
              </ul>
            </div>
            <div v-else-if="currentTab === 'approve'">
              <h2 class="font-bold text-xl mb-4 text-[#F62E56]">Phê duyệt sản phẩm</h2>
              <ul>
                <li v-for="item in pendingProducts" :key="item.id" class="flex items-center justify-between mb-2">
                  <span>
                    <span class="font-medium">{{ item.title }}</span>
                  </span>
                  <button class="px-3 py-1 rounded bg-[#F62E56] text-white text-xs">Phê duyệt</button>
                </li>
              </ul>
            </div>
            <div v-else-if="currentTab === 'users'">
              <h2 class="font-bold text-xl mb-4 text-[#F62E56]">Quản lý người dùng</h2>
              <ul>
                <li v-for="u in allUsers" :key="u.id" class="flex items-center justify-between mb-2">
                  <span>{{ u.name }} - {{ u.email }}</span>
                  <button class="px-3 py-1 rounded bg-[#ff7cae] text-white text-xs">Khóa</button>
                </li>
              </ul>
            </div>
            <div v-else-if="currentTab === 'analytics'">
              <h2 class="font-bold text-xl mb-4 text-[#F62E56]">Quản lý lượng truy cập</h2>
              <div class="text-gray-500">Biểu đồ truy cập sẽ hiển thị ở đây (demo).</div>
              <div class="mt-2 p-4 bg-[#fce6ec] rounded-lg text-[#F62E56]">Tổng truy cập hôm nay: 1234</div>
            </div>
            <div v-else-if="currentTab === 'news'">
              <h2 class="font-bold text-xl mb-4 text-[#F62E56]">Quản lý tin tức</h2>
              <ul>
                <li v-for="item in newsList" :key="item.id" class="flex items-center justify-between mb-2">
                  <span>{{ item.title }}</span>
                  <button class="px-3 py-1 rounded bg-[#F62E56] text-white text-xs">Sửa</button>
                </li>
              </ul>
              <button class="mt-4 px-4 py-2 rounded bg-[#ff7cae] text-white font-semibold">Đăng tin mới</button>
            </div>
          </template>
        </section>
      </div>
    </div>
    <div v-else class="flex items-center justify-center min-h-[400px]">
      <span class="text-[#F62E56] font-semibold text-lg">Vui lòng đăng nhập để xem thông tin tài khoản.</span>
    </div>
  </client-only>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '~/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const user = computed(() => userStore.currentUser)
const currentTab = ref('info')
const router = useRouter()

const tabs = computed(() => {
  if (!user.value) return []
  if (user.value.role === 'user') {
    return [
      { key: 'info', label: 'Thông tin tài khoản' },
      { key: 'liked', label: 'Sản phẩm đã thích' },
      { key: 'myproducts', label: 'Sản phẩm đã đăng' },
      { key: 'chat', label: 'Liên hệ người mua' }
    ]
  }
  return [
    { key: 'info', label: 'Thông tin tài khoản' },
    { key: 'products', label: 'Quản lý sản phẩm' },
    { key: 'approve', label: 'Phê duyệt sản phẩm' },
    { key: 'users', label: 'Quản lý người dùng' },
    { key: 'analytics', label: 'Lượng truy cập' },
    { key: 'news', label: 'Quản lý tin tức' }
  ]
})

function handleTab(key) {
  if (key === 'chat') {
    router.push('/contact')
  } else {
    currentTab.value = key
  }
}

// Dữ liệu demo cho admin (giữ nguyên)
const adminProducts = [
  { id: 1, title: 'Căn hộ Vinhomes', status: 'Đã duyệt' },
  { id: 2, title: 'Nhà phố Quận 7', status: 'Chờ duyệt' }
]
const pendingProducts = [
  { id: 3, title: 'Biệt thự Thảo Điền' }
]
const allUsers = [
  { id: 1, name: 'Nguyễn Văn A', email: 'user@example.com' },
  { id: 2, name: 'Trần Thị B', email: 'user2@example.com' }
]
const newsList = [
  { id: 1, title: 'Thị trường BĐS 2025: Xu hướng mới' },
  { id: 2, title: '5 lưu ý khi mua nhà lần đầu' }
]
</script>

<style scoped>
/* Thêm style nếu cần thiết */
</style>