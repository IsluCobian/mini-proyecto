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

## 🎨 Exploración de Diseño

Aunque el proyecto implementa una interfaz basada en una tabla tradicional, más conservadora y familiar para los usuarios, también se exploró una versión alternativa centrada en una experiencia más visual y fluida para el usuario.

### 🧪 Diseño Experimental

#### Características destacadas del diseño:

- Vista dividida estilo master-detail: lista de productos a la izquierda, detalle completo a la derecha.
- Interacciones más visuales, con imágenes destacadas del producto y navegación más intuitiva.
- Sistema de variantes con color y talla presentados como chips visuales.
