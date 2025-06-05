<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue"
import Button from "@/components/ui/Button.vue"
import { X } from "lucide-vue-next"

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  title: { type: String, default: "" },
  closeOnOutsideClick: { type: Boolean, default: true },
  size: {
    type: String,
    default: "md",
    validator: (val) => ["sm", "md", "lg", "xl"].includes(val),
  },
})

const emit = defineEmits(["update:modelValue"])

const sizes = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
}

const close = () => emit("update:modelValue", false)

const handleKey = (e) => {
  if (e.key === "Escape") close()
}

onMounted(() => document.addEventListener("keydown", handleKey))
onBeforeUnmount(() => document.removeEventListener("keydown", handleKey))
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        @click.self="closeOnOutsideClick && close()"
      >
        <transition name="scale">
          <div
            class="bg-card max-h-dvh w-full overflow-y-auto rounded-lg p-6 shadow-xl"
            :class="sizes[size]"
            @click.stop
          >
            <div class="mb-2 flex items-center justify-between">
              <h2 class="text-lg font-semibold">{{ title }}</h2>
              <Button
                @click="close"
                variant="icon"
                class="text-muted-foreground border-0 transition-colors hover:text-red-500"
              >
                <X />
              </Button>
            </div>
            <div class="modal-body">
              <slot />
            </div>
            <div v-if="$slots.footer" class="mt-4 flex justify-end gap-2">
              <slot name="footer" />
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.scale-enter-active,
.scale-leave-active {
  transition: transform 0.2s ease;
}
.scale-enter-from,
.scale-leave-to {
  transform: scale(0.95);
}
</style>
