import data from "@/data/products.json"
import { ref } from "vue"
const products = ref([...data.products])

export function useProducts() {
  const addProduct = (product) => {
    product.id = Date.now()
    products.value.push(product)
  }

  const reset = () => {
    products.value = [...data.products]
  }

  const deleteProduct = (id) => {
    products.value = products.value.filter((p) => p.id !== id)
  }

  return {
    products,
    reset,
    addProduct,
    deleteProduct,
  }
}
