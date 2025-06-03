import data from "@/data/products.json"
import { ref } from "vue"
const products = ref([...data.products])

export function useProducts() {
  const addProduct = (product) => {
    product.id = Date.now()
    products.value.push(product)
  }

  return {
    products,
    addProduct,
  }
}
