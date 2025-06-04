<script setup>
import { ChevronLeft } from "lucide-vue-next"

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  loop: {
    type: Boolean,
    default: true,
  },
})

const currentIndex = ref(0)

function next() {
  if (currentIndex.value < props.images.length - 1) {
    currentIndex.value++
  } else if (props.loop) {
    currentIndex.value = 0
  }
}

function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else if (props.loop) {
    currentIndex.value = props.images.length - 1
  }
}

function setIndex(index) {
  currentIndex.value = index
}
</script>

<template>
  <div class="relative mx-auto w-full max-w-2xl">
    <div
      class="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border"
    >
      <img
        :src="images[currentIndex].url"
        alt="Carousel image"
        class="h-full w-full rounded-lg object-contain"
      />
    </div>

    <!-- Controls -->
    <Button
      @click="prev"
      variant="icon"
      class="absolute top-1/2 left-2 z-10 -translate-y-1/2 border-0 bg-black/50 text-white hover:bg-black/70"
    >
      <ChevronLeft />
    </Button>
    <Button
      @click="next"
      variant="icon"
      class="absolute top-1/2 right-2 z-10 -translate-y-1/2 border-0 bg-black/50 text-white hover:bg-black/70"
    >
      <ChevronLeft class="rotate-180" />
    </Button>

    <!-- Indicators -->
    <div class="mt-2 flex justify-center gap-2">
      <button
        v-for="(image, index) in images"
        :key="index"
        @click="setIndex(index)"
        class="h-2 w-2 rounded-full"
        :class="{
          'bg-primary': index === currentIndex,
          'bg-muted': index !== currentIndex,
        }"
      />
    </div>
  </div>
</template>
