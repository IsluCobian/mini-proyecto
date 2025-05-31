<script setup>
import { ref, watchEffect, onMounted } from "vue"
import { Moon, Sun } from "lucide-vue-next"

const theme = ref("light")

onMounted(() => {
  const saved = localStorage.getItem("theme")
  if (saved === "dark" || saved === "light") {
    theme.value = saved
  } else {
    theme.value = "light"
  }
})

watchEffect(() => {
  const html = document.documentElement

  if (theme.value === "dark") {
    html.classList.add("dark")
  } else {
    html.classList.remove("dark")
  }

  localStorage.setItem("theme", theme.value)
})

function toggleTheme() {
  theme.value = theme.value === "dark" ? "light" : "dark"
}
</script>

<template>
  <button
    @click="toggleTheme"
    class="border-border hover:bg-muted cursor-pointer rounded-full border p-2 transition-all"
    :aria-label="`Toggle ${theme === 'dark' ? 'light' : 'dark'} mode`"
  >
    <component :is="theme === 'dark' ? Sun : Moon" class="size-5" />
  </button>
</template>
