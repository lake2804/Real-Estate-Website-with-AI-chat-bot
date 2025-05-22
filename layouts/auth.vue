<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex items-center justify-center min-h-screen">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
  mounted() {
    console.log('Auth layout is being used');
  },
  created() {
    this.$nuxt.$emit('set-layout', 'auth');
  }
};
</script>

<style scoped>
/* Thêm style nếu cần */
</style>