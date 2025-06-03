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
    let color, sizes, price

    // New format (from form)
    if ("color" in variation && "sizes" in variation) {
      color = variation.color
      sizes = variation.sizes
      price = variation.price || "-"
    }
    // Original format
    else if ("attribute_combinations" in variation) {
      const colorAttr = variation.attribute_combinations.find(
        (attr) => attr.name === "Color"
      )
      const sizeAttr = variation.attribute_combinations.find(
        (attr) => attr.name === "Talla"
      )
      color = colorAttr?.value_name || "Desconocido"
      sizes = [sizeAttr?.value_name || "-"]
      price = variation.price || "-"
    }

    if (!color) color = "Desconocido"

    if (!grouped[color]) {
      grouped[color] = {
        color,
        tallas: [...sizes],
        price,
      }
    } else {
      grouped[color].tallas.push(...sizes)
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
