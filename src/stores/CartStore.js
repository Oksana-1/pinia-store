import { defineStore } from "pinia";

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: [],
    };
  },
  getters: {
    count: (state) => state.items.length,
    isEmpty() {
      return this.items.length === 0;
    }
  },
  actions: {
    addItems(event, product) {
      const count = parseInt(event);
      for (let i = 0; i < count; i++) this.items.push(product);
    },
  },
});
