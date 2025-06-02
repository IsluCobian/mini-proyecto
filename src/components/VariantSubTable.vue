<script setup>
import Table from "@/components/ui/Table.vue"

defineProps({
  variations: {
    type: Array,
    required: true,
  },
})

const columns = [
  { key: "color", label: "Color" },
  { key: "tallas", label: "Tallas" },
  { key: "price", label: "Precio" },
]

function groupVariationsByColor(variations) {
  const grouped = {}

  variations.forEach((variation) => {
    const colorAttr = variation.attribute_combinations.find(
      (attr) => attr.name === "Color"
    )
    const sizeAttr = variation.attribute_combinations.find(
      (attr) => attr.name === "Talla"
    )

    const color = colorAttr?.value_name || "Desconocido"
    const size = sizeAttr?.value_name || "-"
    const price = variation.price

    if (!grouped[color]) {
      grouped[color] = {
        color,
        tallas: [size],
        price,
      }
    } else {
      grouped[color].tallas.push(size)
    }
  })

  return Object.values(grouped).map((item) => ({
    ...item,
    tallas: item.tallas.join(", "),
  }))
}
</script>

<template>
  <div class="ml-5 w-2/3 p-3 pt-1">
    <h2 class="text-muted-foreground mb-2 text-sm font-semibold">Variantes</h2>
    <Table :columns="columns" :data="groupVariationsByColor(variations)" />
  </div>
</template>
