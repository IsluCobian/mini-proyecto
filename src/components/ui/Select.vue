<script setup>
import { computed } from "vue"

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  placeholder: String,
  options: {
    type: Array,
    required: true, // Format: [{ label: "Red", value: "red" }]
  },
  error: String,
  class: String,
  selectClass: String,
  disabled: Boolean,
})

const emit = defineEmits(["update:modelValue"])

const inputId = computed(
  () => props.label?.toLowerCase().replace(/\s+/g, "-") || "select"
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

    <select
      :id="inputId"
      :value="modelValue"
      :disabled="disabled"
      @change="$emit('update:modelValue', $event.target.value)"
      :class="[
        'focus:ring-primary/40 hover:bg-muted/40 cursor-pointer rounded border px-2 py-1 text-sm transition focus:ring-2 focus:outline-none',
        error ? 'border-red-500' : 'border-border',
        disabled && 'bg-muted cursor-not-allowed opacity-70',
        selectClass,
      ]"
    >
      <option disabled value="">
        {{ placeholder || "Selecciona una opción" }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <span v-if="error" class="text-xs text-red-500">{{ error }}</span>
  </div>
</template>
