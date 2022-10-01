import { defineStore } from "pinia";
import { groupBy } from "lodash";

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
    },
    grouped: (state) => {
      const grouped = groupBy(state.items, (item) => item.name);
      const sorted = Object.keys(grouped).sort();
      let inOrder = {};
      sorted.forEach((key) => (inOrder[key] = grouped[key]));
      return inOrder;
    },
    groupCount: (state) => (name) => state.grouped[name].length,
    total: (state) =>
      state.items.reduce((result, item) => result + parseInt(item.price), 0),
  },
  actions: {
    addItems(event, product) {
      const count = parseInt(event);
      for (let i = 0; i < count; i++) this.items.push(product);
    },
    removeItem(name) {
      this.items = this.items.filter((item) => item.name !== name);
    },
    setItemCount(count, product) {
      this.removeItem(product.name);
      this.addItems(count, product);
    }
  },
});
