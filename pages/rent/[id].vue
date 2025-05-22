<template>
  <div class="container px-4 py-6 mx-auto">
    <h1 class="mb-6 text-2xl font-bold">{{ product.name }}</h1>
    <p>Giá thuê: {{ formatPrice(product.price) }}</p>
    <p>Vị trí: {{ product.location }}</p>
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    const mockData = [
      {
        id: 1,
        name: 'Căn hộ RIVERPARK PREMIER',
        price: 18000000,
        location: 'Quận 9, TP HCM',
      },
    ];
    const product = mockData.find((item) => item.id === parseInt(params.id));
    return { product };
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    },
  },
};
</script>