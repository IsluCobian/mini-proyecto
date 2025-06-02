<script setup>
import { cn } from "@/lib/utils.js"
import { ref, computed } from "vue"
import Table from "@/components/ui/Table.vue"
import Button from "@/components/ui/Button.vue"
import ColumnToggle from "@/components/ui/ColumnToggle.vue"
import VariantSubTable from "@/components/VariantSubTable.vue"
import { Trash2, PencilLine, ChevronRight } from "lucide-vue-next"

const { products } = defineProps({
  products: {
    type: Array,
    required: true,
  },
})
const productsWithState = ref(products.map((p) => ({ ...p, isOpen: false })))
const columns = [
  { key: "variations", label: "", sticky: true, stickyLeft: 0 },
  { key: "title", label: "Título", sticky: true, stickyLeft: 60 },
  { key: "id", label: "ID" },
  { key: "site_id", label: "ID del Sitio" },
  { key: "seller_id", label: "ID del vendedor" },
  { key: "category_id", label: "ID de la categoría" },
  { key: "price", label: "Precio" },
  { key: "base_price", label: "Precio base" },
  { key: "initial_quantity", label: "Cant. Inicial" },
  { key: "available_quantity", label: "Cant. disponible" },
  { key: "sold_quantity", label: "Cant. vendida" },
  { key: "actions", label: "Acciones" },
]
const visibleColumnKeys = ref(columns.map((c) => c.key))

const filteredColumns = computed(() =>
  columns.filter((col) => visibleColumnKeys.value.includes(col.key))
)
</script>

<template>
  <div class="flex flex-col gap-2">
    <ColumnToggle
      v-model="visibleColumnKeys"
      :all-columns="
        columns.filter(
          (col) => col.key !== 'variations' && col.key !== 'actions'
        )
      "
    />
    <Table :columns="filteredColumns" :data="productsWithState">
      <template #title="{ row }">
        <div class="flex items-center gap-2 truncate">
          <div
            class="flex size-12 items-center justify-center rounded-sm bg-white p-1"
          >
            <img
              :src="row.pictures?.[0]?.url"
              alt="Producto"
              class="object-contain"
            />
          </div>
          {{ row.title }}
        </div>
      </template>
      <template #variations="{ row }">
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
        <VariantSubTable :variations="row.variations" />
      </template>

      <template #actions="{ row }">
        <Button variant="icon">
          <PencilLine />
        </Button>
        <Button variant="icon" class="group hover:bg-red-500">
          <Trash2 class="group-hover:text-background" />
        </Button>
      </template>
    </Table>
  </div>
</template>
