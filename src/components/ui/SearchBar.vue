<script setup>
import { ref, watch } from "vue"

const modelValue = defineModel() // Enables v-model usage

const debounceTimeout = ref(null)
const input = ref(modelValue.value)

watch(input, (newVal) => {
  clearTimeout(debounceTimeout.value)
  debounceTimeout.value = setTimeout(() => {
    modelValue.value = newVal
  }, 300) // 300ms debounce
})
</script>

<template>
  <input
    v-model="input"
    type="text"
    placeholder="Buscar producto..."
    class="focus:ring-primary/40 rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
  />
</template>
