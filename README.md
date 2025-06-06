# Mini Projecto

Una pequeña aplicación de gestión de productos que permite crear, editar, visualizar y eliminar productos con múltiples variantes (como tallas y colores).

## Instalación y Ejecución

1. Clona el repositorio:

```sh

git clone https://github.com/IsluCobian/mini-proyecto.git

cd mini-proyecto

```

2. Instala las dependencias:

```sh

pnpm install

```

3. Ejecuta el entorno de desarrollo:

```sh

pnpm run dev

```

## Arquitectura del proyecto

```sh
├── public/                 # Archivos estáticos
└── src/
    ├── assets/            # Imágenes, íconos, fuentes, etc.
    ├── components/        # Componentes Vue
    │   └── ui/            # Componentes UI reutilizables (inputs, modals, etc.)
    ├── composables/       # Funciones reutilizables (e.g. useProducts)
    ├── data/              # Datos simulados o estáticos
    ├── lib/               # Utilidades o helpers
    ├── schemas/           # Esquemas de validación
    ├── views/             # Vistas principales (pantallas)
    └── App.vue            # Componente raíz
├── index.html             # Entrada HTML principal
```

## ⚙️ Tecnologías utilizadas

- **Vite** - Entorno de desarrollo rápido para Vue
- **TailwindCSS** - Estilizado mediante clases
- **Lucide Icons** - Librería de íconos
- **VeeValidate + Yup** - Validación y manejo de estado de formularios

## 🔧 Mejoras Potenciales

### 🎨 Mejoras en la Visualización de Variantes

- Implementar chips visuales para mostrar los colores de las variantes
- Mejorar la visualización de tallas con un selector más intuitivo

### 📝 Mejoras en Formularios

- Implementar comboboxes inteligentes para:
  - Selección de categorías
  - Selección de sitios
  - Selección de vendedores
- Añadir búsqueda y filtrado en tiempo real en los comboboxes
- Implementar autocompletado para reducir errores de entrada

### 🛠️ Mejoras en la Gestión de Variantes

- Rediseñar el formulario de variantes para una mejor experiencia de usuario
- Implementar arrastrar y soltar para reordenar variantes
- Implementar la edicion de variantes

### 🔍 Mejoras Generales

- Añadir filtros por múltiples criterios
- Mejorar la paginación y el sistema de ordenamiento
- Implementar exportación de datos en diferentes formatos

### 📱 Mejoras en la Responsividad

- Optimizar la interfaz para dispositivos móviles
- Mejorar la experiencia táctil en formularios
- Implementar gestos para acciones comunes
