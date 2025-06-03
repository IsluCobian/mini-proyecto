<script setup>
import Header from "@/components/Header.vue"
import { useProducts } from "@/composables/useProducts"
import ProductsTable from "@/components/ProductsTable.vue"
const { products } = useProducts()
</script>

<template>
  <div class="flex h-screen w-screen flex-col overflow-x-hidden md:flex-row">
    <Header />
    <main class="flex-1 overflow-x-auto p-5">
      <ProductsTable :products="products" />
    </main>
  </div>
</template>
