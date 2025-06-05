<script setup>
import ThemeToggle from "./ThemeToggle.vue"
</script>

<template>
  <header
    class="bg-primary flex h-14 w-full items-center justify-between p-4 text-white md:mr-1 md:h-full md:w-14 md:flex-col"
  >
    <h1 class="text-xl leading-none font-bold">SF</h1>
    <ThemeToggle />
  </header>
</template>
