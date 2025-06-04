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

  const updateProduct = (id, values) => {
    const index = products.value.findIndex((p) => p.id === id)
    if (index === -1) return

    products.value.splice(index, 1, { ...products.value[index], ...values })
  }

  return {
    products,
    reset,
    addProduct,
    deleteProduct,
    updateProduct,
  }
}
