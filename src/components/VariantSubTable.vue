<script setup>
import { PencilLine, Trash2 } from "lucide-vue-next"
import { useProducts } from "@/composables/useProducts"

const props = defineProps({
  variations: {
    type: Array,
    required: true,
  },
  productId: {
    type: [String, Number],
    required: true,
  },
})

const columns = [
  { key: "size", label: "Talla" },
  { key: "price", label: "Precio" },
  { key: "quantity", label: "Cantidad" },
  { key: "actions", label: "Acciones" },
]

const tableRows = computed(() => (variations) => {
  const grouped = {}
  variations.forEach((variation) => {
    let color = "Desconocido"
    let sizes = []
    let price = variation.price || "-"
    let quantity = variation.quantity || 0

    // New format (from form)
    if (variation.color && variation.sizes) {
      color = variation.color || color
      sizes = variation.sizes
      quantity = variation.quantity || 0
    } 
    // Original format
    else if (variation.attribute_combinations) {
      const colorAttr = variation.attribute_combinations.find(attr => attr.name === "Color")
      const sizeAttr = variation.attribute_combinations.find(attr => attr.name === "Talla")
      color = colorAttr?.value_name || color
      sizes = [sizeAttr?.value_name || "-"]
      quantity = variation.quantity || 0
    }

    if (!grouped[color]) {
      grouped[color] = {}
    }

    sizes.forEach((size) => {
      grouped[color][size] ??= {
        size,
        price,
        quantity,
      }
    })
  })

  return Object.entries(grouped).flatMap(([color, sizesObj]) => [
    { isSubheader: true, color },
    ...Object.values(sizesObj).map((row) => ({ ...row, color })),
  ])
})

const editModalOpen = ref(false)
const editIndex = ref(null)
const editVariation = ref({ color: "", sizes: [], price: "", quantity: 0 })
const { updateProduct } = useProducts()

function openEditModal(row, index) {
  editIndex.value = index
  editVariation.value = {
    color: row.color || "",
    sizes: row.size ? [row.size] : row.sizes || [],
    price: row.price || "",
    quantity: row.quantity || 0,
  }
  editModalOpen.value = true
}

function handleUpdate(variation) {
  const updatedVariations = props.variations.map((v, idx) => {
    console.log(idx)
    console.log(editIndex.value)
    if (idx === editIndex.value) {
      console.log("si")
      return { ...v, ...variation }
    }
    return v
  })
  console.log(variation)
  console.log(updatedVariations)
  updateProduct(props.productId, { variations: updatedVariations })
  editModalOpen.value = false
}

function deleteVariation(row, index) {
  editIndex.value = index
  const updatedVariations = props.variations.filter((v, idx) => {
    if (idx === editIndex.value) {
      return false
    }
    return true
  })
  updateProduct(props.productId, { variations: updatedVariations })
}

</script>

<template>
  <Table
    :columns="columns"
    :data="tableRows(variations)"
    :paginated="false"
  >
    <template #quantity="{ row }">
      <div class="py-1.5">
        <QuantityLabel :quantity="row.quantity" />
      </div>
    </template>
    <template #actions="{ row, rowIndex }">
      <div class="flex items-center gap-2">
        <Button variant="icon" class="" @click="openEditModal(row, rowIndex - 1)">
          <PencilLine />
        </Button>
        <Button
          variant="icon"
          class="hover:border-red-500 hover:bg-red-500 hover:text-white"
          @click="deleteVariation(row, rowIndex - 1)"
        >
          <Trash2 />
        </Button>
      </div>
    </template>
  </Table>
  <VariantEditModal
    v-model="editModalOpen"
    :variation="editVariation"
    @update="handleUpdate"
    @cancel="editModalOpen = false"
  />
</template>
