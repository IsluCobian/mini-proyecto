<template>
  <Modal v-model="open" title="Editar Variante" size="md">
    <form @submit.prevent="saveEdit" class="space-y-4">
      <Select
        v-model="localVariation.color"
        label="Color"
        placeholder="Selecciona un color"
        :options="allColors.map(color => ({ label: color, value: color }))"
      />
      <SizesSelector
        v-model="localVariation.sizes"
        label="Tallas"
        :options="allSizes"
      />
      <Input
        v-model="localVariation.price"
        label="Precio (MXN)"
        type="number"
      />
      <Input
        v-model="localVariation.quantity"
        label="Cantidad"
        type="number"
      />
      <div class="flex justify-end gap-2">
        <Button variant="outline" @click.prevent="$emit('cancel')">Cancelar</Button>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  </Modal>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  variation: {
    type: Object,
    default: () => ({ color: '', sizes: [], price: '', quantity: 0 })
  },
})
const emit = defineEmits(['update:modelValue', 'update', 'cancel'])

const open = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const allColors = ['Rojo', 'Azul', 'Verde', 'Negro', 'Blanco']
const allSizes = [
  'Única',
  ...Array.from({ length: 11 }, (_, i) => `${21 + i}MX`),
]

const localVariation = ref({ ...props.variation })

watch(() => props.variation, (val) => {
  localVariation.value = { ...val }
}, { immediate: true })

function saveEdit() {
  emit('update', { ...localVariation.value })
  emit('update:modelValue', false)
}
</script> 