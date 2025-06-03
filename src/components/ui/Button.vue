<script setup>
import { cn } from "@/lib/utils.js"

defineOptions({ inheritAttrs: false })

const emit = defineEmits(["click"])

const props = defineProps({
  class: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "default",
  },
})

const variantClasses = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline: "border text-foreground",
  ghost: "bg-transparent",
  icon: "bg-transparent p-2 border",
}
</script>

<template>
  <button
    :class="
      cn(
        'hover:bg-accent inline-flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4',
        variantClasses[props.variant],
        props.class
      )
    "
    @click="(e) => emit('click', e)"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>
