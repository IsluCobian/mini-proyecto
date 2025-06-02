<script setup>
import { cn } from "@/lib/utils.js"

defineProps({
  columns: Array,
  data: Array,
})
</script>

<template>
  <div class="bg-background w-full overflow-x-auto rounded border">
    <table class="min-w-full text-sm">
      <thead
        class="bg-card text-muted-foreground sticky top-0 z-10 border-b text-xs"
      >
        <tr>
          <th
            v-for="(header, index) in columns"
            :key="index"
            :class="
              cn(
                'bg-card w-fit px-4 py-3 text-left whitespace-nowrap',
                header.sticky && 'sticky left-0 z-10'
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
        <template v-for="(row, rowIndex) in data" :key="rowIndex">
          <tr
            class="hover:bg-accent even:bg-muted/50 border-t transition-colors"
          >
            <td
              v-for="(col, colIndex) in columns"
              :key="colIndex"
              :class="
                cn(
                  'bg-background w-fit px-4 py-1.5 whitespace-nowrap',
                  col.sticky && 'sticky left-0'
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
</template>
