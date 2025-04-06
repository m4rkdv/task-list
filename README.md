# Task Manager App

Aplicación de gestión de tareas construida con Next.js, Shadcn/ui y SQLite.

![Task List Preview](/docs/assets/task-prev.png) 

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
git clone https://github.com/m4rkdv/task-list.git
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
/api
  /tasks           # Maneja GET (lista) , POST (creación) y DELETE de todas las tareas
  /task/id         # Maneja GET (individual), PUT (actualización) y DELETE
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
![Edit Task](/docs/assets/task-edit.png)

## Tecnologías utilizadas
- Next.js 14
- Shadcn/ui
- SQLite
- TypeScript
- Tailwind CSS
