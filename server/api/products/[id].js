export default defineEventHandler((event) => {
  const products = [
    {
      id: 1,
      name: 'Căn hộ RIVERPARK PREMIER đầy đủ nội thất diện tích 131m²',
      location: 'Quận 9, TP HCM',
      price: 18000000,
      imageUrl: '/images/apartment1.jpg',
    },
    // Các sản phẩm khác...
  ]

  const id = parseInt(event.context.params.id)
  const product = products.find((item) => item.id === id)

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found',
    })
  }

  return product
})