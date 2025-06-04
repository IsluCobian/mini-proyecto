import { object, string, number, array } from "yup"

export const productSchema = object({
  id: string().optional(),
  title: string().required("Título requerido"),
  site_id: string().required("ID del Sitio requerido"),
  seller_id: string().required("ID del Vendedor requerido"),
  category_id: string().required("ID de la Categoría requerido"),
  price: number()
    .typeError("Precio debe ser un número")
    .required("Precio requerido"),
  base_price: number()
    .typeError("Precio base debe ser un número")
    .required("Precio base requerido"),
  available_quantity: number()
    .typeError("Cantidad inicial debe ser un número")
    .required("Cantidad inicial requerida"),
  initial_quantity: number()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue == null ? undefined : value
    )
    .optional()
    .typeError("Cantidad disponible debe ser un número"),
  sold_quantity: number()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue == null ? undefined : value
    )
    .optional()
    .typeError("Cantidad vendida debe ser un número"),
  variations: array()
    .of(
      object({
        color: string().required("Color requerido"),
        sizes: array().of(string()).min(1, "Selecciona al menos una talla"),
        price: number()
          .typeError("Precio inválido")
          .required("Precio de variante requerido"),
      })
    )
    .min(1, "Agrega al menos una variante"),
})
