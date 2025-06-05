<script setup>
const props = defineProps({
  value: [String, Number, Boolean],
  label: String,
  customClass: String,
})
</script>

<template>
  <div class="flex w-full flex-col" :class="customClass">
    <span class="text-muted-foreground text-xs font-medium">
      {{ label }}
    </span>
    {{ value }}
  </div>
</template>
