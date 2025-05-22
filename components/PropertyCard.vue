// components/PropertyCard.vue
<template>
  <router-link :to="`/products/${property.id}`" class="block">
    <div class="overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow hover:shadow-md hover:-translate-y-1">
      <div class="relative h-48 overflow-hidden">
        <img
          :src="property.imageUrl"
          :alt="property.name"
          class="object-cover w-full h-full"
        />
      </div>
      <div class="p-4">
        <h3 class="h-12 mb-1 font-medium text-gray-900 line-clamp-2">{{ property.name }}</h3>
        <p class="mb-2 text-sm text-gray-600">{{ property.location }}</p>
        <p class="text-sm font-bold text-red-500">{{ formatPrice(property.price) }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'PropertyCard',
  props: {
    property: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    },
  },
};
</script>