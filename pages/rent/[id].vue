<template>
  <div class="px-4 py-8 mx-auto max-w-7xl">
    <div class="mb-10" v-if="product">
      <h1 class="mb-2 text-2xl font-bold">{{ product.title }}</h1>
      <div class="mb-2 text-gray-600">{{ product.location }}</div>
      <div class="mb-4">{{ product.description }}</div>
      <div class="mb-4">Diện tích: {{ product.area }}m² | Hướng: {{ product.direction }} | Block: {{ product.block }}</div>
      <div class="mb-4">Nội thất: {{ product.interior?.join(', ') }}</div>
      <div class="mb-4 font-bold text-[#F62E56] text-xl">{{ formatPrice(product.price) }}</div>
      <div class="mb-10">{{ product.advantages }}</div>
    </div>
    <div v-else>
      <p>Không tìm thấy sản phẩm</p>
    </div>
    <div>
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
    </div>
  </div>
</template>

<script setup>
import { properties } from '~/data/properties'
import { useRoute } from 'vue-router'
import PropertyCard from '~/components/PropertyCard.vue'
import { computed } from 'vue'

const route = useRoute()
const product = computed(() => properties.find(p => p.id === Number(route.params.id)))
const relatedProducts = computed(() =>
  properties.filter(p => p.id !== Number(route.params.id) && p.type === product.value?.type).slice(0, 4)
)

function formatPrice(price) {
  if (!price) return ''
  return price.toLocaleString('vi-VN') + ' VNĐ'
}
</script>