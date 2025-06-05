<script setup>
import { ref, computed } from "vue"
import { RefreshCw, Plus } from "lucide-vue-next"
import { useProducts } from "@/composables/useProducts.js"

const { products, reset, deleteProduct } = useProducts()

const searchQuery = ref("")
const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  return products.value.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Modal controls
const showModal = ref(false)
const selectedProduct = ref(null)
const confirmDeleteModal = ref(false)
const productToDelete = ref(null)

// Gallery controls
const selectedImages = ref([])
const selectedTitle = ref("")
const showGallery = ref(false)

// Event handlers
function openForAdd() {
  selectedProduct.value = null
  showModal.value = true
}

function openForEdit(product) {
  selectedProduct.value = product
  showModal.value = true
}

function askToDelete(product) {
  productToDelete.value = product
  confirmDeleteModal.value = true
}

function confirmDelete() {
  if (productToDelete.value) {
    deleteProduct(productToDelete.value.id)
    productToDelete.value = null
  }
}

function viewGallery(row) {
  selectedImages.value = row.pictures
  selectedTitle.value = row.title
  showGallery.value = true
}
</script>

<template>
  <main class="flex-1 space-y-3 overflow-x-auto p-5">
    <div>
      <h2 class="text-lg font-semibold md:text-2xl">Gestión de Productos</h2>
      <p class="text-muted-foreground text-sm">
        Administra tu inventario de productos
      </p>
    </div>

    <div
      class="flex flex-col justify-between gap-2 md:flex-row md:items-center"
    >
      <SearchBar v-model="searchQuery" />
      <div class="flex items-center space-x-2">
        <Button @click="openForAdd"><Plus />Añadir Producto</Button>
        <Button variant="icon" @click="reset()" title="Reiniciar tabla">
          <RefreshCw />
        </Button>
      </div>
    </div>

    <ProductsTable
      :products="filteredProducts"
      @edit="openForEdit"
      @delete="askToDelete"
      @view-gallery="viewGallery"
    />

    <ProductModal v-model="showModal" :product="selectedProduct" />
    <ImageModal
      v-model="showGallery"
      :images="selectedImages"
      :title="selectedTitle"
    />
    <ConfirmDeleteModal
      v-model="confirmDeleteModal"
      :item="productToDelete"
      @confirm="confirmDelete"
    />
  </main>
</template>
