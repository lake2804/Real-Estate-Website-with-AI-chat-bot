<template>
  <client-only>
    <div class="max-w-5xl mx-auto my-10 rounded-2xl shadow-2xl flex h-[600px] bg-white border border-[#F62E56]">
      <!-- Sidebar: Danh sách sản phẩm đã thích/đăng -->
      <div class="w-1/3 bg-[#fff6f8] border-r border-[#F62E56] overflow-y-auto">
        <div
          v-for="prod in userProducts"
          :key="prod.id"
          @click="selectProduct(prod.id)"
          :class="['cursor-pointer px-4 py-3 flex items-center gap-2 border-b', selectedProductId === prod.id ? 'bg-[#F62E56] text-white' : 'hover:bg-[#ffe3ec]']"
        >
          <span class="font-semibold">{{ prod.title }}</span>
        </div>
      </div>
      <!-- Khung chat -->
      <div class="flex flex-col flex-1">
        <div class="flex items-center px-4 py-3 border-b bg-[#F62E56] rounded-tr-2xl">
          <span class="flex-1 text-lg font-bold text-white">
            {{ selectedProductTitle || 'Chọn một sản phẩm để chat' }}
          </span>
        </div>
        <div class="flex-1 overflow-y-auto p-4 bg-[#fff6f8]">
          <div v-if="selectedProductId">
            <div v-for="msg in messages" :key="msg.time" class="flex mb-2" :class="msg.from === 'me' ? 'justify-end' : 'justify-start'">
              <div
                :class="msg.from === 'me'
                  ? 'bg-[#F62E56] text-white rounded-br-2xl rounded-t-2xl rounded-bl-md'
                  : 'bg-white text-[#F62E56] border border-[#F62E56] rounded-bl-2xl rounded-t-2xl rounded-br-md'"
                class="px-4 py-2 max-w-[70%] shadow"
              >
                {{ msg.text }}
              </div>
            </div>
          </div>
          <div v-else class="flex items-center justify-center h-full text-gray-400">Chọn một sản phẩm để chat</div>
        </div>
        <div class="flex gap-2 p-4 bg-white border-t" v-if="selectedProductId">
          <input
            v-model="input"
            @keyup.enter="send"
            class="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#F62E56]"
            placeholder="Nhập tin nhắn..."
          />
          <button @click="send" class="bg-[#F62E56] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#d81b4a] transition">Gửi</button>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'

// Giả lập store chat, bạn có thể chuyển sang Pinia nếu muốn lưu lâu dài
const chatStore = ref({}) // { [productId]: [{from, text, time}] }

const userStore = useUserStore()
const user = computed(() => userStore.currentUser)
const router = useRouter()

const selectedProductId = ref(null)
const input = ref('')

const userProducts = computed(() => {
  if (!user.value) return []
  return [
    ...(user.value.likedProducts || []),
    ...(user.value.myProducts || [])
  ]
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
}

function send() {
  if (!input.value.trim() || !selectedProductId.value) return
  if (!chatStore.value[selectedProductId.value]) chatStore.value[selectedProductId.value] = []
  chatStore.value[selectedProductId.value].push({
    from: 'me',
    text: input.value,
    time: new Date().toISOString()
  })
  // Giả lập phản hồi bot
  setTimeout(() => {
    chatStore.value[selectedProductId.value].push({
      from: 'bot',
      text: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.',
      time: new Date().toISOString()
    })
  }, 1000)
  input.value = ''
}
</script>