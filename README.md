# Task Manager App

Aplicación de gestión de tareas construida con Next.js, Shadcn/ui y SQLite.

![Task List Preview](/docs/assets/task-list.png) <!-- Asegúrate de crear esta ruta y agregar tus screenshots -->

## Características principales
- ✅ Crear, editar y eliminar tareas
- ✅ Marcar tareas como completadas
- ✅ Vista de lista con scroll
- ✅ Filtros para tareas completadas/pendientes
- ✅ Interfaz responsive y accesible

## Requisitos previos
- Node.js v18+
- npm v9+ (o yarn/pnpm/bun)
- Navegador moderno

## Instalación

1. Clonar el repositorio:
```bash
git clone [tu-url-del-repositorio]
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
# o
bun install
```

## Ejecutar la aplicación

1. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

2. Abrir en el navegador:
```
http://localhost:3000
```

## Estructura principal del proyecto
```
/app
  /TaskItem        # Página de edición de tareas
  /TaskList        # Lista principal de tareas
  /TaskForm        # Formulario de creación/edición
/components        # Componentes UI
/types             # Tipos TypeScript
/docs              # Documentación y assets
```

## Application Preview

### Vista de lista de tareas
![Task List](/docs/assets/task-list.png)

### Formulario de edición
![Edit Task](/docs/assets/edit-task.png)

### Confirmación de eliminación
![Delete Confirmation](/docs/assets/delete-confirmation.png)

## Configuración avanzada

Para personalizar la base de datos:
1. Crear archivo `.env` basado en `.env.example`
2. Modificar la configuración de SQLite en `lib/db.ts`

## Desplegar en Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=[tu-url-del-repositorio])

```bash
npm run build
vercel deploy
```

## Tecnologías utilizadas
- Next.js 14
- Shadcn/ui
- SQLite
- TypeScript
- Tailwind CSS