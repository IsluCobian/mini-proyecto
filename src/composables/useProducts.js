import data from "@/data/products.json"
import { ref } from "vue"

export function useProducts() {
  const products = ref([...data.products])

  return {
    products,
  }
}
