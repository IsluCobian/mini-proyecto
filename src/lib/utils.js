import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(...inputs))
}

export function groupVariationsByColor(variations) {
  const grouped = {}

  variations.forEach((variation) => {
    let color = "Desconocido"
    let sizes = []
    let price = "-"

    if ("color" in variation && "sizes" in variation) {
      color = variation.color || "Desconocido"
      sizes = Array.isArray(variation.sizes) ? variation.sizes : []
      price = variation.price || "-"
    } else if ("attribute_combinations" in variation) {
      const colorAttr = variation.attribute_combinations.find(
        (attr) => attr.name === "Color"
      )
      const sizeAttrs = variation.attribute_combinations.filter(
        (attr) => attr.name === "Talla"
      )

      color = colorAttr?.value_name || "Desconocido"
      sizes = sizeAttrs.map((s) => s.value_name).filter(Boolean)
      price = variation.price || "-"
    }

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
    color: item.color,
    sizes: item.tallas,
    price: item.price,
  }))
}
