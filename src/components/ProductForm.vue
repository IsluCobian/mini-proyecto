<script setup>
import { useForm } from "vee-validate"
import { toTypedSchema } from "@vee-validate/yup"
import { productSchema } from "@/schemas/productSchema"
import { groupVariationsByColor } from "@/lib/utils"
import { X } from "lucide-vue-next"

const props = defineProps({
  product: { type: Object, default: null },
})
const emit = defineEmits(["submit", "cancel"])

const allColors = ["Rojo", "Azul", "Verde", "Negro", "Blanco"]
const allSizes = [
  "Única",
  ...Array.from({ length: 11 }, (_, i) => `${21 + i}MX`),
]

const schema = toTypedSchema(productSchema)

const { handleSubmit, resetForm, errors, meta, defineField } = useForm({
  validationSchema: schema,
  initialValues: {
    id: props.product?.id || "",
    title: props.product?.title || "",
    site_id: props.product?.site_id || "",
    seller_id: props.product?.seller_id || "",
    category_id: props.product?.category_id || "",
    price: props.product?.price || "",
    base_price: props.product?.base_price || "",
    initial_quantity: props.product?.initial_quantity || "",
    available_quantity: props.product?.available_quantity || "",
    sold_quantity: props.product?.sold_quantity || "",
    variations: props.product?.variations || [],
  },
})

const [title] = defineField("title")
const [site_id] = defineField("site_id")
const [seller_id] = defineField("seller_id")
const [category_id] = defineField("category_id")
const [price] = defineField("price")
const [base_price] = defineField("base_price")
const [initial_quantity] = defineField("initial_quantity")
const [available_quantity] = defineField("available_quantity")
const [sold_quantity] = defineField("sold_quantity")
const [variations] = defineField("variations")

const newVariation = ref({
  color: "",
  sizes: [],
  price: "",
})

function addVariation() {
  if (
    newVariation.value.color &&
    newVariation.value.sizes.length &&
    newVariation.value.price
  ) {
    variations.value.push({ ...newVariation.value })
    newVariation.value = { color: "", sizes: [], price: "" }
  }
}

function removeVariation(index) {
  variations.value.splice(index, 1)
}

const onSubmit = handleSubmit((values) => {
  emit("submit", values)
  resetForm()
})

onMounted(() => {
  if (props.product) {
    resetForm({
      values: {
        ...props.product,
        variations: groupVariationsByColor(props.product.variations || []),
      },
    })
  }
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Input
      v-model="title"
      :error="errors.title"
      label="Título"
      placeholder="Nombre del Producto"
    />

    <div class="grid grid-cols-3 gap-4 text-xs">
      <Input v-model="site_id" :error="errors.site_id" label="ID del Sitio" />
      <Input
        v-model="seller_id"
        :error="errors.seller_id"
        label="ID Vendedor"
      />
      <Input
        v-model="category_id"
        :error="errors.category_id"
        label="ID Categoría"
      />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <Input
        v-model="price"
        :error="errors.price"
        label="Precio (MXN)"
        type="number"
      />
      <Input
        v-model="base_price"
        :error="errors.base_price"
        label="Precio Base"
        type="number"
      />
    </div>

    <div class="grid grid-cols-3 gap-4">
      <Input
        v-model="initial_quantity"
        :error="errors.initial_quantity"
        label="Cant. Inicial"
        type="number"
      />
      <Input
        v-model="available_quantity"
        :error="errors.available_quantity"
        label="Cant. Disponible"
        type="number"
      />
      <Input
        v-model="sold_quantity"
        :error="errors.sold_quantity"
        label="Cant. Vendida"
        type="number"
      />
    </div>
    <!-- Variaciones -->
    <div class="space-y-2">
      <h3 class="text-sm font-medium">Variantes</h3>
      <div class="grid grid-cols-3 gap-4 text-xs">
        <Select
          v-model="newVariation.color"
          label="Color"
          placeholder="Selecciona un color"
          :options="allColors.map((c) => ({ label: c, value: c }))"
        />
        <SizesSelector
          v-model="newVariation.sizes"
          label="Tallas"
          :options="allSizes"
          multiple
        />
        <Input
          v-model="newVariation.price"
          label="Precio (MXN)"
          type="number"
        />
      </div>

      <div class="flex items-center gap-2">
        <Button variant="outline" class="text-xs" @click.prevent="addVariation"
          >Añadir Variante</Button
        >
        <span v-if="errors.variations" class="text-xs text-red-500">
          {{ errors.variations }}
        </span>
      </div>

      <div
        v-if="variations.length"
        class="max-h-24 space-y-1 overflow-y-auto text-xs"
      >
        <div
          v-for="(variation, index) in variations"
          :key="index"
          class="flex justify-between rounded border p-2"
        >
          <div>
            <b>Color:</b> {{ variation.color }} <b>Tallas:</b>
            {{ (variation.sizes || []).join(", ") }}
          </div>
          <button
            @click.prevent="removeVariation(index)"
            class="text-red-500 hover:underline"
          >
            <X class="inline size-3" /> Quitar
          </button>
        </div>
      </div>
    </div>

    <div class="mt-4 flex justify-end gap-2">
      <Button variant="outline" @click.prevent="emit('cancel')"
        >Cancelar</Button
      >
      <Button type="submit" :disabled="!meta.dirty">Guardar</Button>
    </div>
  </form>
</template>
