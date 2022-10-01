import { defineStore } from "pinia";

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: [],
    };
  },
  // getters
  actions: {
    addItems(event, product) {
      const count = parseInt(event);
      for (let i = 0; i < count; i++) this.items.push(product);
    },
  },
});
