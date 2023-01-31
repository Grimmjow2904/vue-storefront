import { ref, computed } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";

import type IProducts from "@/types/IProducts";

interface Item {
  product: IProducts;
  cuantity: number;
}

export const useCartStore = defineStore("cart", () => {
  const cart = ref<Item[]>([]);

  const totalItems = computed(() => {
    return cart.value.length;
  });

  const totalPrice = computed(() => {
    let temp = cart.value
      .map((x) => x.product.price * x.cuantity)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return temp.toFixed(2);
  });

  function addCart(product: IProducts, amoung: number) {
    const item = cart.value.filter((x) => x.product.id == product.id);
    if (item.length == 1) {
      item[0].cuantity += amoung;
    } else {
      cart.value.push({ product: product, cuantity: amoung });
    }
  }

  function removeCart(product: IProducts, amoung: number) {
    const item = cart.value.filter((x) => x.product.id == product.id);
    if (item.length > 0) {
      item[0].cuantity -= amoung;
      if (item[0].cuantity <= 0) {
        cart.value = cart.value.filter(
          (x) => x.product.id != item[0].product.id
        );
      }
    }
  }

  async function makeOrder() {
    /* llamada api de crear orden */
    cart.value = [];
  }

  return { cart, addCart, removeCart, makeOrder, totalPrice, totalItems };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
