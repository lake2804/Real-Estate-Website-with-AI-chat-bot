import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => ({
    // messages: { [productId]: [{from, text, time}] }
    messages: {},
    // last message for each product
    lastMessages: {}
  }),
  actions: {
    sendMessage(productId, from, text) {
      if (!this.messages[productId]) this.messages[productId] = []
      const msg = { from, text, time: new Date().toISOString() }
      this.messages[productId].push(msg)
      this.lastMessages[productId] = msg
    }
  },
  persist: true
})