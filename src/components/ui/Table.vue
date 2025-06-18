<script setup>
import { cn } from "@/lib/utils.js"

const props = defineProps({
  columns: Array,
  data: Array,
  perPage: {
    type: Number,
    default: 10,
  },
  paginated: {
    type: Boolean,
    default: true,
  },
})

const currentPage = ref(1)
const totalPages = computed(() => {
  return Math.ceil(props.data.length / props.perPage)
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.perPage
  return props.data.slice(start, start + props.perPage)
})
</script>

<template>
  <div class="bg-background w-full overflow-x-auto">
    <table class="min-w-full text-sm">
      <thead class="text-muted-foreground sticky top-0 z-10 border-b text-xs">
        <tr>
          <th
            v-for="(header, index) in columns"
            :key="index"
            :class="
              cn(
                'w-fit px-4 py-3 text-left font-light whitespace-nowrap',
                header.sticky && 'bg-muted sticky left-0 z-20'
              )
            "
            :style="
              header.sticky && header.stickyLeft !== undefined
                ? { left: header.stickyLeft + 'px' }
                : {}
            "
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>

      <tbody class="first:border-t-0">
        <template v-for="(row, rowIndex) in paginatedData" :key="rowIndex">
          <slot name="subheader" v-if="row.isSubheader" :row="row" :rowIndex="rowIndex" >
              <tr>
                <td :colspan="columns.length" class="text-center font-semibold bg-muted/70 py-1.5">{{ row.color }}</td>
              </tr>
          </slot>
          <tr v-else class="border-t">
              <td
                v-for="(col, colIndex) in columns"
                :key="colIndex"
                :class="
                  cn(
                    'w-fit px-4 py-1.5 whitespace-nowrap',
                    col.sticky && 'bg-background sticky left-0 z-10'
                  )
                "
                :style="
                  col.sticky && col.stickyLeft !== undefined
                    ? { left: col.stickyLeft + 'px' }
                    : {}
                "
              >
                <slot
                  :name="col.key"
                  :value="row[col.key]"
                  :row="row"
                  :rowIndex="rowIndex"
                >
                  {{ row[col.key] }}
                </slot>
              </td>
            </tr>
            <tr>
              <td :colspan="columns.length" class="p-0">
                <div
                  :class="[
                    'grid overflow-hidden transition-all duration-300 ease-in-out',
                    row.isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  ]"
                >
                  <div class="min-h-0">
                    <slot name="expandedRow" :row="row" :rowIndex="rowIndex" />
                  </div>
                </div>
              </td>
            </tr>
        </template>
      </tbody>
    </table>
  </div>

  <!-- Pagination controls -->
  <div v-if="paginated" class="flex items-center justify-between text-xs">
    <span> Página {{ currentPage }} de {{ totalPages }} </span>
    <div class="flex items-center gap-2">
      <Button
        variant="outline"
        class="text-xs"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        Anterior
      </Button>
      <Button
        variant="outline"
        class="text-xs"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        Siguiente
      </Button>
    </div>
  </div>
</template>
