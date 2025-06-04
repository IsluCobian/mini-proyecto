<script setup>
import { useProducts } from "@/composables/useProducts"

const props = defineProps({
  modelValue: Boolean,
  product: { type: Object, default: null },
})

const emit = defineEmits(["update:modelValue"])

const { addProduct, updateProduct } = useProducts()

const handleSubmit = async (values) => {
  if (props.product) {
    await updateProduct(props.product.id, values)
  } else {
    await addProduct(values)
  }

  emit("update:modelValue", false)
}

const close = () => emit("update:modelValue", false)
</script>

<template>
  <Modal
    :title="product ? 'Editar Producto' : 'Añadir Producto'"
    size="lg"
    :model-value="modelValue"
    @update:modelValue="close"
  >
    <ProductForm :product="product" @submit="handleSubmit" @cancel="close" />
  </Modal>
</template>
