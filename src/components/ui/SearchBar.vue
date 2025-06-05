<script setup>
import { ref, watch } from "vue"
import { Search } from "lucide-vue-next"

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
  <div class="relative flex">
    <Search
      class="text-muted-foreground absolute top-1/2 left-3 size-3.5 -translate-y-1/2"
    />
    <input
      v-model="input"
      type="text"
      placeholder="Buscar producto..."
      class="focus:ring-primary/40 rounded-md border px-3 py-2 pl-9.5 text-sm focus:ring-2 focus:outline-none"
    />
  </div>
</template>
