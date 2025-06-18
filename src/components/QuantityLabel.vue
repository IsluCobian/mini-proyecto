<template>
  <span
    class="text-sm"
    :class="cn(
            'rounded-full p-2 px-3',
            quantity > 0
              ? quantity > 3
                ? 'bg-lime-500/15 text-green-600'
                : 'bg-yellow-500/15 text-yellow-600'
              : 'bg-red-100 text-red-600'
          )">
          {{ quantity }}
  </span>
</template>

<script setup>
import { cn } from "@/lib/utils"

defineProps({
  quantity: {
    type: Number,
    required: true,
  },
})
</script>