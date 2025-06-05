<script setup>
import { cn } from "@/lib/utils.js"
import { Image } from "lucide-vue-next"
import { Trash2, PencilLine, ChevronRight } from "lucide-vue-next"

const { products } = defineProps({
  products: Array,
})

const emit = defineEmits(["edit", "delete", "view-gallery"])

const productsWithState = ref([])

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
</script>

<template>
  <Table :columns="columns" :data="productsWithState">
    <template #picture="{ row }">
      <div
        class="flex size-12 items-center justify-center overflow-hidden rounded-sm border bg-white p-1"
      >
        <img
          v-if="row.pictures?.length"
          :src="row.pictures?.[0]?.url"
          @click="$emit('view-gallery', row)"
          class="cursor-pointer object-contain"
        />
        <Image v-else class="text-muted-foreground size-6" aria-hidden="true" />
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
                ? 'bg-lime-500/15 text-green-600'
                : 'bg-yellow-500/15 text-yellow-600'
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
      <div class="flex items-center gap-2">
        <Button variant="icon" class="" @click="$emit('edit', row)">
          <PencilLine />
        </Button>
        <Button
          variant="icon"
          class="hover:border-red-500 hover:bg-red-500 hover:text-white"
          @click="$emit('delete', row)"
        >
          <Trash2 />
        </Button>
      </div>
    </template>
  </Table>
</template>
