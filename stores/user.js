import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null,
    users: [
      {
        id: 1,
        name: 'Nguyễn Văn A',
        email: 'user@example.com',
        password: 'Password@123',
        phone: '0987654321',
        address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        role: 'user',
        likedProducts: [],
        myProducts: []
      },
      {
        id: 2,
        name: 'Admin',
        email: 'admin@example.com',
        password: 'Password@123',
        phone: '0909123456',
        address: '456 Đường Nguyễn Huệ, Quận 1, TP.HCM',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        role: 'admin'
      }
    ]
  }),
  actions: {
    login({ email, password }) {
      const found = this.users.find(u => u.email === email && u.password === password)
      if (found) {
        this.currentUser = found
        return true
      }
      return false
    },
    logout() {
      this.currentUser = null
    },
    register(user) {
      if (this.users.find(u => u.email === user.email)) {
        throw new Error('Email already exists.')
      }
      const newUser = {
        ...user,
        id: Date.now(),
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        role: 'user',
        likedProducts: [],
        myProducts: []
      }
      this.users.push(newUser)
      this.currentUser = newUser
    }
  },
  persist: true
})