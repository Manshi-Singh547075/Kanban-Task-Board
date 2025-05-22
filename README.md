# Kanban Task Management Board

## Overview
This project is a Kanban-style task management board built with React, featuring drag-and-drop functionality for organizing tasks. The application has a clean UI built with Shadcn UI components and supports essential task management features like creating, updating, and categorizing tasks by status (To Do, In Progress, Completed).

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture
The application follows a modern React frontend architecture with a Node.js/Express backend. It's structured as a full-stack JavaScript/TypeScript application with client-server separation.

### Frontend
- **React** - Main UI library
- **React DnD** - Drag and drop functionality
- **Shadcn UI** - Component library built on Radix UI
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **React Query** - Data fetching and state management
- **Wouter** - Simple routing
- **React Context** - State management for tasks and theme

### Backend
- **Express** - Web server framework
- **Drizzle ORM** - Database ORM
- **PostgreSQL** - Database (configured but not fully implemented)

## Key Components

### 1. Task Management
The core of the application is the task management system:
- `TaskContext` - Provides state and methods for task operations
- `TaskManager` - Handles CRUD operations for tasks
- Tasks can be filtered by status (todo, in-progress, completed)

### 2. Kanban Board
The main UI component is a Kanban board with:
- `KanbanBoard` - Container for all columns
- `KanbanColumn` - Individual columns for each task status
- `TaskCard` - Individual task display with drag-and-drop capabilities

### 3. Form and Modal System
- `TaskForm` - Form for creating and editing tasks
- `DeleteConfirmation` - Confirmation modal for task deletion

### 4. Theme System
- `ThemeProvider` - Manages light/dark mode preferences
- Theme state is persisted in localStorage

### 5. UI Components
- Extensive set of UI components from Shadcn UI
- Custom toast notifications

## Data Flow

1. **Task Creation**:
   - User opens task form
   - Submits task details
   - Task is added to local state
   - In a production environment, this would be persisted to the database

2. **Task Movement**:
   - User drags a task card
   - React DnD handles the drag and drop events
   - Task status is updated in the context
   - UI reflects the new task position

3. **Task Management**:
   - CRUD operations are managed through `TaskContext`
   - Local state is currently used as primary storage
   - Backend integration is prepared but not fully implemented

## Data Model

The primary data model is the Task, which includes:
- id: string
- title: string
- description: string
- status: "todo" | "in-progress" | "completed"
- dueDate: string
- tag: TaskTag ("Development", "Design", "Documentation", "Bug", "Feature")

Database schema is defined in `shared/schema.ts` for users but is not fully utilized yet for tasks.

## External Dependencies

### Frontend
- React and React DOM
- TanStack React Query
- React Hook Form with Zod validation
- Radix UI primitives (many components)
- class-variance-authority and clsx for styling
- Tailwind CSS for styling
- date-fns for date formatting
- React DnD for drag and drop

### Backend
- Express
- Drizzle ORM
- PostgreSQL (via Neon Database)

## Deployment Strategy

The application is configured for deployment on Replit with:
- Development mode: `npm run dev`
- Build process: `npm run build`
- Production mode: `npm run start`

Build steps include:
1. Building the React frontend with Vite
2. Bundling the Express server with esbuild
3. Serving the static files from the Express server

Database migration is handled through Drizzle ORM with:
- `npm run db:push` to push schema changes to the database

## Development Workflow

1. **Development**:
   - Run `npm run dev` to start both frontend and backend in development mode
   - Frontend runs with Vite's HMR
   - Backend runs with tsx for TypeScript execution

2. **Backend Development**:
   - Modify Express routes in `server/routes.ts`
   - Database schema in `shared/schema.ts`
   - Storage interface in `server/storage.ts`

3. **Frontend Development**:
   - Components in `client/src/components`
   - Pages in `client/src/pages`
   - Context and hooks in respective directories

## Next Steps

1. **Database Integration**:
   - Complete the PostgreSQL integration for task persistence
   - Implement API endpoints for task CRUD operations
   - Replace the in-memory storage with database storage

2. **Authentication**:
   - Add user authentication system
   - Implement multi-user support with personal task boards

3. **Enhanced Features**:
   - Add filtering and search capabilities
   - Implement task assignments and sharing
   - Add due date reminders and notifications
