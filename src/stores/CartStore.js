import { defineStore } from "pinia";
import { groupBy } from "lodash";
import { useAuthStore } from "@/stores/AuthStore";
import { useLocalStorage } from "@vueuse/core";

export const useCartStore = defineStore("CartStore", {
  historyEnabled: true,
  state: () => {
    return {
      items: useLocalStorage("CartStore:items", []),
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
    },
    checkout() {
      const AuthStore = useAuthStore();
      alert(
        `User ${AuthStore.userName} bought ${this.items.length} items of total $${this.total}!`
      );
    },
  },
});
