<script setup>
import { cn } from "@/lib/utils.js"
import { Trash2, PencilLine, ChevronRight, RefreshCw } from "lucide-vue-next"

const { products } = defineProps({
  products: {
    type: Array,
    required: true,
  },
})

const { reset, deleteProduct } = useProducts()
const productsWithState = ref([])

const selectProduct = defineEmits(["selectProduct"])
watch(
  () => products,
  (newProducts) => {
    productsWithState.value = newProducts.map((p) => ({
      ...p,
      isOpen: false,
    }))
  },
  { immediate: true, deep: true }
)
const columns = [
  { key: "collapsable", label: "" },
  { key: "picture", label: "Imagen" },
  { key: "title", label: "Nombre del producto" },
  { key: "id", label: "ID" },
  { key: "category_id", label: "ID de la categoría" },
  { key: "price", label: "Precio" },
  { key: "available_quantity", label: "Cant. disponible" },
  { key: "actions", label: "Acciones" },
]
const visibleColumnKeys = ref(columns.map((c) => c.key))

const filteredColumns = computed(() =>
  columns.filter((col) => visibleColumnKeys.value.includes(col.key))
)

const selectedImages = ref([])
const selectedTitle = ref("")
const showGallery = ref(false)

function openGallery(images, title) {
  selectedImages.value = images
  selectedTitle.value = title
  showGallery.value = true
}

const showModal = ref(false)
const selectedProduct = ref(null)

function openForAdd() {
  selectedProduct.value = null
  showModal.value = true
}

function openForEdit(product) {
  selectedProduct.value = product
  showModal.value = true
}

const confirmDeleteModal = ref(false)
const productToDelete = ref(null)

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
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <ColumnToggle
        v-model="visibleColumnKeys"
        :all-columns="
          columns.filter(
            (col) => col.key !== 'variations' && col.key !== 'actions'
          )
        "
      />
      <Button @click="openForAdd">Añadir Producto</Button>
      <Button variant="icon" @click="reset()" title="Reiniciar tabla">
        <RefreshCw />
      </Button>
    </div>
    <Table :columns="filteredColumns" :data="productsWithState">
      <template #picture="{ row }">
        <div
          class="flex size-12 items-center justify-center overflow-hidden rounded-sm border bg-white p-1"
        >
          <img
            v-if="row.pictures?.length"
            :src="row.pictures?.[0]?.url"
            @click="openGallery(row.pictures, row.title)"
            alt="Producto"
            class="cursor-pointer object-contain"
          />
        </div>
      </template>
      <template #price="{ row }">
        <span class="text-primary text-sm font-semibold">${{ row.price }}</span>
      </template>
      <template #available_quantity="{ row }">
        <span
          class="text-sm"
          :class="
            cn(
              'rounded-full p-2 px-3',
              row.available_quantity > 0
                ? row.available_quantity > 3
                  ? 'bg-lime-100 text-green-600'
                  : 'bg-yellow-100 text-yellow-600'
                : 'bg-red-100 text-red-600'
            )
          "
        >
          {{ row.available_quantity }}
        </span>
      </template>
      <template #collapsable="{ row }">
        <Button
          variant="icon"
          @click="row.isOpen = !row.isOpen"
          :class="
            cn(
              'hover:text-primary border-0 text-xs [&_svg]:transition-transform [&_svg]:duration-150 [&_svg]:ease-in-out',
              row.isOpen && 'text-primary [&_svg]:rotate-90'
            )
          "
        >
          <ChevronRight />
        </Button>
      </template>
      <template #expandedRow="{ row, rowIndex }">
        <ProductItem :item="row" :index="rowIndex" />
      </template>

      <template #actions="{ row }">
        <Button variant="icon" @click="openForEdit(row)">
          <PencilLine />
        </Button>
        <Button
          variant="icon"
          @click="askToDelete(row)"
          class="group hover:bg-red-500"
        >
          <Trash2 class="group-hover:text-background" />
        </Button>
      </template>
    </Table>
    <ImageModal
      :title="selectedTitle"
      :images="selectedImages"
      v-model="showGallery"
    />
    <ProductModal v-model="showModal" :product="selectedProduct" />
    <ConfirmDeleteModal
      v-model="confirmDeleteModal"
      :item="productToDelete"
      @confirm="confirmDelete"
    />
  </div>
</template>
