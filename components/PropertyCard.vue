// components/PropertyCard.vue
<template>
  <NuxtLink :to="to" class="block group focus:outline-none">
    <div class="flex flex-col overflow-hidden transition bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-2xl group-hover:scale-[1.03]">
      <img :src="product.images ? product.images[0] : product.image" class="object-cover w-full h-48" />
      <div class="flex flex-col flex-1 p-4">
        <div class="mb-1 text-xs text-gray-400">Tin vừa cập nhật hôm nay</div>
        <div class="mb-2 text-base font-bold line-clamp-2">{{ product.title || product.name }}</div>
        <div class="flex items-center gap-2 mb-1 text-sm text-gray-600">
          <svg class="w-4 h-4 text-[#F62E56]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z"/></svg>
          {{ product.location }}
        </div>
        <div class="flex flex-wrap gap-2 mb-1 text-sm text-gray-600">
          <span><b>{{ product.rooms || (product.bedrooms + 'PN/' + product.bathrooms + 'WC') }}</b></span>
          <span><b>{{ product.area }}m²</b></span>
          <span v-if="product.direction"><b>{{ product.direction }}</b></span>
          <span v-if="product.block"><b>{{ product.block }}</b></span>
        </div>
        <div class="pt-2 mt-auto border-t">
          <div class="text-[#F62E56] font-bold text-lg">
            {{ formatPrice(product.price) }}
            <span v-if="product.type === 'rent' || isRent" class="text-base font-normal">/tháng</span>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  product: { type: Object, required: true },
  to: { type: [String, Object], required: true },
  isRent: { type: Boolean, default: false }
})

function formatPrice(price) {
  if (typeof price === 'number') return price.toLocaleString('vi-VN') + ' VNĐ'
  return price
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>