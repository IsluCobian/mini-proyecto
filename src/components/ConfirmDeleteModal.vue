<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  item: {
    type: Object,
    required: false,
  },
  titleKey: {
    type: String,
    default: "title",
  },
})

const emit = defineEmits(["update:modelValue", "confirm"])

function close() {
  emit("update:modelValue", false)
}

function confirm() {
  emit("confirm")
  close()
}
</script>

<template>
  <Modal
    :model-value="modelValue"
    @update:modelValue="close"
    title="Eliminar producto"
  >
    <div class="space-y-4 text-sm">
      <p>
        ¿Estás seguro de que quieres eliminar
        <strong>{{ item?.[titleKey] || "este ítem" }}</strong
        >?
      </p>
    </div>
    <template #footer>
      <Button variant="outline" @click="close">Cancelar</Button>
      <Button class="bg-destructive hover:bg-destructive/80" @click="confirm">
        Eliminar
      </Button>
    </template>
  </Modal>
</template>
