const db = new Dexie("Todo App");
db.version(1).stores({ 
    projects: "++id, title, description, color, created, sorting",
    tasks: "++id, title, type, description, priority, status, completed, created"
 });
