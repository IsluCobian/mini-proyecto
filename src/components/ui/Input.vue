<script setup>
import { computed } from "vue"

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  error: String,
  class: String,
  inputClass: String,
  disabled: Boolean,
})

const emit = defineEmits(["update:modelValue"])

const inputId = computed(
  () => props.label?.toLowerCase().replace(/\s+/g, "-") || "input"
)
</script>

<template>
  <div class="flex w-full flex-col gap-1" :class="class">
    <label
      v-if="label"
      :for="inputId"
      class="text-muted-foreground text-xs font-medium"
    >
      {{ label }}
    </label>
    <input
      :id="inputId"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="[
        'focus:ring-primary/40 rounded border px-2 py-1 text-sm transition focus:ring-2 focus:outline-none',
        error ? 'border-red-500' : 'border-border',
        disabled && 'bg-muted cursor-not-allowed opacity-70',
        inputClass,
      ]"
    />
    <span v-if="error" class="text-xs text-red-500">{{ error }}</span>
  </div>
</template>
