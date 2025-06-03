<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue"

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Array,
    required: true,
  },
  label: String,
  placeholder: {
    type: String,
    default: "Selecciona tallas",
  },
  error: String,
  class: String,
  disabled: Boolean,
})

const emit = defineEmits(["update:modelValue"])

const dropdownOpen = ref(false)
const root = ref(null)

function toggleSize(size) {
  const newValue = [...props.modelValue]
  const index = newValue.indexOf(size)
  if (index > -1) {
    newValue.splice(index, 1)
  } else {
    newValue.push(size)
  }
  emit("update:modelValue", newValue)
}

const displayText = computed(() =>
  props.modelValue.length ? props.modelValue.join(", ") : props.placeholder
)
</script>

<template>
  <div ref="root" class="relative w-full" :class="class">
    <label
      v-if="label"
      class="text-muted-foreground mb-1 block text-xs font-medium"
    >
      {{ label }}
    </label>

    <div
      class="focus-within:ring-primary/40 w-40 rounded border px-2 py-1 text-sm transition focus-within:ring-2"
      :class="[
        error ? 'border-red-500' : 'border-border',
        disabled &&
          'bg-muted pointer-events-none cursor-not-allowed opacity-70 select-none',
      ]"
      @click="dropdownOpen = !dropdownOpen"
    >
      <span class="block truncate" :title="displayText">
        {{ displayText }}
      </span>
    </div>

    <div
      v-if="dropdownOpen"
      @focusout="onFocusOut"
      class="border-border absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded border bg-white p-2 shadow-md"
    >
      <label
        v-for="size in options"
        :key="size"
        class="hover:bg-muted flex cursor-pointer items-center gap-2 px-1 py-1 text-sm"
      >
        <input
          type="checkbox"
          :value="size"
          :checked="modelValue.includes(size)"
          @change.prevent="toggleSize(size)"
        />
        {{ size }}
      </label>
    </div>

    <span v-if="error" class="mt-1 block text-xs text-red-500">{{
      error
    }}</span>
  </div>
</template>
