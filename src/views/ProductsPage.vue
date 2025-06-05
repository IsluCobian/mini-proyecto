<script setup>
import ProductsTable from "@/components/ProductsTable.vue"
import { useProducts } from "@/composables/useProducts.js"
const { products } = useProducts()
</script>
<template>
  <main class="flex-1 space-y-3 overflow-x-auto p-5">
    <div>
      <h2 class="text-lg font-semibold md:text-2xl">Gestión de Productos</h2>
      <p class="text-muted-foreground text-sm">
        Administra tu inventario de productos
      </p>
    </div>
    <ProductsTable :products="products" />
  </main>
</template>
