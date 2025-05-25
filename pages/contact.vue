<template>
  <client-only>
    <div class="fixed inset-x-0 z-40 flex bg-[#FFF6F8] top-22 h-[calc(100vh-88px)]">
      <!-- Sidebar: Danh sách sản phẩm đã thích/đăng -->
      <div class="w-[350px] bg-white border-r border-[#F62E56] flex flex-col">
        <div class="px-6 py-6 border-b border-[#F62E56]">
          <div class="text-xl font-bold text-[#F62E56] font-inter">Sản phẩm của bạn</div>
        </div>
        <div class="flex-1 overflow-y-auto">
          <div
            v-for="prod in userProducts"
            :key="prod.id"
            @click="selectProduct(prod.id)"
            :class="[
              'cursor-pointer px-6 py-4 flex items-center gap-2 border-b border-[#FCE6EC] transition',
              selectedProductId === prod.id
                ? 'bg-[#F62E56] text-white'
                : 'hover:bg-[#FFF0F5] text-[#1C1917]'
            ]"
          >
            <span class="font-semibold truncate">{{ prod.title }}</span>
          </div>
        </div>
      </div>
      <!-- Khung chat -->
      <div class="flex flex-col flex-1 h-full">
        <!-- Header -->
        <div class="flex items-center px-10 py-6 border-b border-[#F62E56] bg-white">
          <span class="flex-1 text-xl font-bold text-[#F62E56] font-inter">
            {{ selectedProductTitle || 'Chọn một sản phẩm để chat' }}
          </span>
        </div>
        <!-- Nội dung chat -->
        <div class="flex-1 overflow-y-auto px-10 py-8 bg-[#FFF6F8]">
          <div v-if="selectedProductId" class="flex flex-col gap-3">
            <div
              v-for="msg in messages"
              :key="msg.time + msg.text"
              class="flex"
              :class="msg.from === 'me' ? 'justify-end' : 'justify-start'"
            >
              <div
                :class="msg.from === 'me'
                  ? 'bg-[#F62E56] text-white rounded-br-2xl rounded-t-2xl rounded-bl-md'
                  : 'bg-white text-[#F62E56] border border-[#F62E56] rounded-bl-2xl rounded-t-2xl rounded-br-md'"
                class="px-5 py-3 max-w-[60%] shadow font-inter text-base"
              >
                {{ msg.text }}
              </div>
            </div>
          </div>
          <div v-else class="flex items-center justify-center h-full text-lg text-gray-400 font-inter">
            Chọn một sản phẩm để chat
          </div>
        </div>
        <!-- Nhập tin nhắn -->
        <div class="flex gap-4 px-10 py-6 bg-white border-t border-[#F62E56]" v-if="selectedProductId">
          <input
            v-model="input"
            @keyup.enter="send"
            class="flex-1 px-4 py-3 rounded-xl border border-[#F62E56] focus:outline-none focus:ring-2 focus:ring-[#F62E56] font-inter text-base"
            placeholder="Nhập tin nhắn..."
          />
          <button
            @click="send"
            class="bg-[#F62E56] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#d81b4a] transition text-base font-inter"
          >
            Gửi
          </button>
          <button
            @click="testChat"
            class="bg-[#FCE6EC] text-[#F62E56] px-6 py-3 rounded-xl font-semibold ml-2 border border-[#F62E56] hover:bg-[#F62E56] hover:text-white transition text-base font-inter"
          >
            Test chat
          </button>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '~/stores/user'

const chatStore = ref({}) // { [productId]: [{from, text, time}] }

const userStore = useUserStore()
const user = computed(() => userStore.currentUser)

const selectedProductId = ref(null)
const input = ref('')

// Sản phẩm test luôn hiển thị
const staticProduct = { id: 1, title: 'Căn hộ mẫu test liên hệ' }

const userProducts = computed(() => {
  const dynamic =
    user.value
      ? [
          ...(user.value.likedProducts || []),
          ...(user.value.myProducts || [])
        ]
      : []
  // Đảm bảo không trùng id
  const ids = dynamic.map(p => p.id)
  return ids.includes(1) ? dynamic : [staticProduct, ...dynamic]
})

const selectedProductTitle = computed(() => {
  const prod = userProducts.value.find(p => p.id === selectedProductId.value)
  return prod ? prod.title : ''
})

const messages = computed(() => {
  return chatStore.value[selectedProductId.value] || []
})

function selectProduct(id) {
  selectedProductId.value = id
  // Nếu chưa có đoạn chat mẫu thì thêm vào
  if (!chatStore.value[id] || chatStore.value[id].length === 0) {
    chatStore.value[id] = [
      {
        from: 'me',
        text: 'Xin chào, tôi muốn hỏi thêm về sản phẩm này.',
        time: new Date(Date.now() - 60000).toISOString()
      },
      {
        from: 'bot',
        text: 'Chào bạn! Sản phẩm này vẫn còn. Bạn cần hỗ trợ gì thêm không?',
        time: new Date(Date.now() - 50000).toISOString()
      }
    ]
  }
}

function send() {
  if (!input.value.trim() || !selectedProductId.value) return
  if (!chatStore.value[selectedProductId.value]) chatStore.value[selectedProductId.value] = []
  chatStore.value[selectedProductId.value].push({
    from: 'me',
    text: input.value,
    time: new Date().toISOString()
  })
  setTimeout(() => {
    chatStore.value[selectedProductId.value].push({
      from: 'bot',
      text: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.',
      time: new Date().toISOString()
    })
  }, 1000)
  input.value = ''
}

// Thêm nút test chat
function testChat() {
  if (!selectedProductId.value) return
  if (!chatStore.value[selectedProductId.value]) chatStore.value[selectedProductId.value] = []
  chatStore.value[selectedProductId.value].push({
    from: 'me',
    text: 'Test chat message',
    time: new Date().toISOString()
  })
  setTimeout(() => {
    chatStore.value[selectedProductId.value].push({
      from: 'bot',
      text: 'Đây là phản hồi test từ hệ thống.',
      time: new Date().toISOString()
    })
  }, 1000)
}
</script>

<style scoped>
body {
  background: #FFF6F8;
}
</style>