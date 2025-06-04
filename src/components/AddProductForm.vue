<script setup>
import { useForm } from "vee-validate"
import { productSchema } from "@/schemas/productSchema"
import { toTypedSchema } from "@vee-validate/yup"

import { Plus, X, LoaderCircle } from "lucide-vue-next"
import { useProducts } from "@/composables/useProducts"

const { addProduct } = useProducts()

const open = ref(false)

const schema = toTypedSchema(productSchema)

const { handleSubmit, resetForm, errors, meta, defineField } = useForm({
  validationSchema: schema,
  initialValues: {
    variations: [],
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
const [variations, variationsAttrs] = defineField("variations")

const newVariation = ref({
  color: "",
  sizes: [],
  price: "",
})

const allColors = ["Rojo", "Azul", "Verde", "Negro", "Blanco"]
const allSizes = [
  "Única",
  ...Array.from({ length: 11 }, (_, i) => `${21 + i}MX`),
]

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
  addProduct(values)
  open.value = false
  resetForm()
})
</script>

<template>
  <Button @click="open = true">
    <Plus class="size-4" /> Añadir Producto
  </Button>

  <Modal v-model="open" title="Añadir Producto" size="lg">
    <form @submit.prevent="onSubmit" class="w-full space-y-4">
      <Input
        v-model="title"
        :error="errors.title"
        label="Título"
        placeholder="Nombre del producto"
      />

      <div class="grid grid-cols-3 gap-4 text-xs">
        <Input v-model="site_id" :error="errors.site_id" label="ID del Sitio" />
        <Input
          v-model="seller_id"
          :error="errors.seller_id"
          label="ID del Vendedor"
        />
        <Input
          v-model="category_id"
          :error="errors.category_id"
          label="ID de la Categoría"
        />
      </div>

      <hr />

      <div class="grid grid-cols-2 gap-4 text-xs">
        <Input
          v-model="price"
          :error="errors.price"
          label="Precio (MXN)"
          placeholder="0.00"
          type="number"
        />
        <Input
          v-model="base_price"
          :error="errors.base_price"
          label="Precio Base (MXN)"
          placeholder="0.00"
          type="number"
        />
      </div>

      <div class="grid grid-cols-3 gap-4 text-xs">
        <Input
          v-model="initial_quantity"
          :error="errors.initial_quantity"
          label="Cant. Inicial"
          placeholder="0"
          type="number"
        />
        <Input
          v-model="available_quantity"
          :error="errors.available_quantity"
          label="Cant. Disponible"
          placeholder="0"
          type="number"
        />
        <Input
          v-model="sold_quantity"
          :error="errors.sold_quantity"
          label="Cant. Vendida"
          placeholder="0"
          type="number"
        />
      </div>

      <hr />

      <!-- Variaciones -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium">Variantes</h3>
        <div class="grid grid-cols-3 gap-4 text-xs">
          <!-- Color  -->
          <Select
            v-model="newVariation.color"
            label="Color"
            placeholder="Selecciona un color"
            :options="
              allColors.map((color) => ({ label: color, value: color }))
            "
          />

          <!-- Tallas  -->
          <SizesSelector
            v-model="newVariation.sizes"
            label="Tallas"
            :options="allSizes"
            :placeholder="'Selecciona tallas'"
          />

          <Input
            v-model="newVariation.price"
            label="Precio (MXN)"
            type="number"
          />
        </div>
        <div class="flex flex-col items-start">
          <span v-if="errors.variations" class="text-xs text-red-500">
            {{ errors.variations }}
          </span>

          <Button
            class="mt-2 text-xs"
            variant="outline"
            @click.prevent="addVariation"
          >
            Añadir Variante
          </Button>
        </div>

        <div v-if="variations" class="max-h-16 space-y-1 overflow-y-auto">
          <div
            v-for="(variation, index) in variations"
            :key="index"
            class="flex items-center justify-between rounded-md border px-2 py-1 text-xs"
          >
            <div>
              <span class="font-semibold">Color:</span> {{ variation.color }}
              <span class="font-semibold">Tallas:</span>
              {{ variation.sizes.join(", ") }}
            </div>
            <button
              @click.prevent="removeVariation(index)"
              class="cursor-pointer text-red-500 hover:underline"
            >
              <X class="inline size-3" /> Quitar
            </button>
          </div>
        </div>
      </div>
      <div class="mt-4 flex justify-end gap-2">
        <Button variant="outline" @click="open = false">Cancelar</Button>
        <Button
          type="submit"
          :disabled="!meta.dirty"
          class="bg-primary text-white"
        >
          <template v-if="meta.pending">
            <LoaderCircle class="animate-spin" />
          </template>
          Guardar
        </Button>
      </div>
    </form>
  </Modal>
</template>
