<script setup>
import { Image } from "lucide-vue-next"

const props = defineProps({
  item: {
    type: Object,
    required: false,
  },
})
</script>

<template>
  <div class="bg-muted/60 mb-1 flex w-full flex-col gap-4 rounded-2xl p-4">
    <div class="flex w-full gap-8">
      <div
        class="flex size-36 items-center justify-center overflow-hidden rounded-lg border bg-white"
      >
        <img
          v-if="item?.pictures?.length"
          :src="item?.pictures?.[0]?.url"
          alt="Product image"
          class="h-full w-full object-contain"
        />
        <Image
          v-else
          class="text-muted-foreground h-12 w-12"
          aria-hidden="true"
        />
      </div>
      <div class="grid-row-3 grid flex-3/4 grid-cols-3 gap-2 gap-x-4">
        <TextLabel label="Titulo" :value="item?.title" />
        <div class="flex gap-1">
          <TextLabel
            label="Precio"
            :value="'$' + item?.price"
            customClass="text-primary text-sm font-semibold"
          />
          <TextLabel label="Base" :value="'$' + item?.base_price" />
        </div>
        <TextLabel label="Vendedor" :value="item?.seller_id" />
        <TextLabel label="ID" :value="item?.id" />
        <TextLabel label="Sitio" :value="item?.site_id" />
        <TextLabel label="Categoría" :value="item?.category_id" />
        <TextLabel label="Cantidad" :value="item?.initial_quantity" />
        <TextLabel label="Vendidos" :value="item?.sold_quantity" />
        <TextLabel label="Disponible" :value="item?.available_quantity" />
      </div>
    </div>
    <div class="flex w-full flex-col gap-4">
      <h3 class="text-muted-foreground font-semibold">
        Variantes del producto
      </h3>
      <div class="bg-background overflow-hidden rounded-lg border">
        <VariantSubTable :variations="item.variations" />
      </div>
    </div>
  </div>
</template>
