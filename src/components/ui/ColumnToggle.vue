<script setup>
import { computed, watch, ref } from "vue"
import { cn } from "@/lib/utils.js"
import Button from "@/components/ui/Button.vue"
import { SlidersHorizontal } from "lucide-vue-next"

const props = defineProps({
  allColumns: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(["update:modelValue"])

const selected = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
})

const open = ref(false)
</script>

<template>
  <div class="relative">
    <Button variant="outline" @click="open = !open"
      ><SlidersHorizontal /> Columnas
    </Button>

    <div
      :class="
        cn(
          'bg-card absolute top-full z-20 mt-2 flex min-w-52 origin-top-left flex-col gap-2 rounded-lg border p-2 transition-[scale,opacity] duration-200 ease-in-out',
          open
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-80 opacity-0'
        )
      "
    >
      <span class="text-muted-foreground text-xs font-medium"
        >Seleccionar columnas</span
      >
      <div class="-mx-2">
        <hr class="w-full" />
      </div>
      <label
        v-for="column in allColumns"
        :key="column.key"
        class="hover:bg-muted flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm"
      >
        <input
          type="checkbox"
          v-model="selected"
          :value="column.key"
          class="accent-blue-500"
        />
        {{ column.label }}
      </label>
    </div>
  </div>
</template>
