<script setup>
const props = defineProps({
  title: String,
  images: Array,
  modelValue: Boolean,
})

const emit = defineEmits(["update:modelValue"])

function closeModal() {
  emit("update:modelValue", false)
}
</script>

<template>
  <Modal
    :title="title"
    :model-value="modelValue"
    @update:modelValue="closeModal"
  >
    <div class="flex flex-col items-center">
      <Carousel :images="images" loop />
    </div>
  </Modal>
</template>
