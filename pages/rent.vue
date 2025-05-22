<template>
  <div class="flex flex-col min-h-screen">
    <!-- Search Bar -->
    <div class="py-4 bg-gray-100">
      <div class="container px-4 mx-auto">
        <div class="flex flex-wrap items-center p-4 bg-white rounded-md shadow">
          <!-- Dropdowns -->
          <div class="flex flex-wrap items-center flex-1 space-x-2">
            <select
              v-model="location"
              class="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm md:w-auto focus:outline-none focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Chọn vị trí</option>
              <option value="quan-9">Quận 9, TP.HCM</option>
              <option value="quan-5">Quận 5, TP.HCM</option>
            </select>
            <select
              v-model="priceRange"
              class="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm md:w-auto focus:outline-none focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Giá</option>
              <option value="0-5">Dưới 5 triệu</option>
              <option value="5-10">5 - 10 triệu</option>
              <option value="10-15">10 - 15 triệu</option>
              <option value="15-20">15 - 20 triệu</option>
              <option value="20+">Trên 20 triệu</option>
            </select>
            <select
              v-model="bedrooms"
              class="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm md:w-auto focus:outline-none focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Số phòng</option>
              <option value="1">1 Phòng ngủ</option>
              <option value="2">2 Phòng ngủ</option>
              <option value="3">3 Phòng ngủ</option>
              <option value="4+">4+ Phòng ngủ</option>
            </select>
          </div>

          <!-- Search Button -->
          <div class="ml-4">
            <button
              class="w-full px-6 py-2 text-sm text-white bg-red-500 rounded-md md:w-auto hover:bg-red-600"
              @click="handleSearch"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="flex-grow">
      <div class="container px-4 py-6 mx-auto">
        <h1 class="mb-6 text-2xl font-bold">Danh sách thuê nhà</h1>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <PropertyCard
            v-for="property in filteredProperties"
            :key="property.id"
            :property="property"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import PropertyCard from '../components/PropertyCard.vue';

export default {
  name: 'RentPage',
  components: {
    PropertyCard,
  },
  data() {
    return {
      location: '',
      priceRange: '',
      bedrooms: '',
      properties: [
        {
          id: 1,
          name: 'Căn hộ RIVERPARK PREMIER',
          location: 'Quận 9, TP HCM',
          price: 18000000,
          bedrooms: 2,
          bathrooms: 2,
          area: 67.86,
          block: 'B',
          district: 'Tây Nam',
          imageUrl: '/images/apartment2.jpg',
        },
        // Các sản phẩm khác...
      ],
    };
  },
  computed: {
    filteredProperties() {
      return this.properties.filter((property) => {
        const matchesLocation =
          !this.location || property.location.toLowerCase().includes(this.location.toLowerCase());
        const matchesPrice =
          !this.priceRange ||
          (this.priceRange === '0-5' && property.price <= 5000000) ||
          (this.priceRange === '5-10' && property.price > 5000000 && property.price <= 10000000) ||
          (this.priceRange === '10-15' && property.price > 10000000 && property.price <= 15000000) ||
          (this.priceRange === '15-20' && property.price > 15000000 && property.price <= 20000000) ||
          (this.priceRange === '20+' && property.price > 20000000);
        const matchesBedrooms =
          !this.bedrooms || property.bedrooms === parseInt(this.bedrooms);

        return matchesLocation && matchesPrice && matchesBedrooms;
      });
    },
  },
  methods: {
    handleSearch() {
      console.log('Tìm kiếm với:', {
        location: this.location,
        priceRange: this.priceRange,
        bedrooms: this.bedrooms,
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>