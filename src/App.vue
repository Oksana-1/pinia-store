<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "@/stores/ProductStore";
import { useCartStore } from "@/stores/CartStore";
import { ref, reactive } from "vue";

const productStore = useProductStore();
const cartStore = useCartStore();
const history = reactive([]);
const future = reactive([]);
const doingHistory = ref(false);
history.push(JSON.stringify(cartStore.$state));
const undo = () => {
  if (history.length === 1) return;
  doingHistory.value = true;
  future.push(history.pop());
  cartStore.$state = JSON.parse(history.at(-1));
  doingHistory.value = false;
}
const redo = () => {
  const lastState =  future.pop();
  if (!lastState) return;
  doingHistory.value = true;
  history.push(lastState);
  cartStore.$state = JSON.parse(lastState);
  doingHistory.value = false;
}
cartStore.$subscribe((mutation, state) => {
  if (doingHistory.value === true) return;
  history.push(JSON.stringify(state));
  future.splice(0, future.length);
});
cartStore.$onAction(({ name, store, args, after, onError }) => {
  if (name === "addItems") {
    after(() => {
      console.log(`User added ${args[0]} "${args[1].name}"`);
    });
  }
});
productStore.fill();
</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-10 text-center">
      <AppButton class="mr-5" @click="undo">Undo</AppButton>
      <AppButton @click="redo">Redo</AppButton>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="cartStore.addItems($event, { ...product })"
      />
    </ul>
  </div>
</template>
