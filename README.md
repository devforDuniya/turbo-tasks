# 🚀 TurboTasks

TurboTasks is a **fully interactive Kanban board** built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It supports drag-and-drop columns, persistent state (via `localStorage`), modal editing for task cards, and real-time list and card manipulation — all in a clean, responsive UI.

---

## 🔥 Features

- 📦 Drag-and-drop **columns** with live reordering  
- 📝 **Cards** with titles, descriptions, and column assignments  
- 🧩 Modal for **editing cards**  
- 🗂️ Add/delete entire **lists (columns)**  
- 🧹 One-click **clear all data** (columns + cards)  
- 💾 Persistent state using `localStorage`  
- ⚡ Fast and responsive UI built with Tailwind CSS  
- ✅ Type-safe with TypeScript  

---

## 📦 Tech Stack

- **Next.js** (v14+)  
- **React** (v18+)  
- **TypeScript**  
- **Tailwind CSS**  
- **Framer Motion** (animations)  
- **Heroicons**  

---

## 🛠️ Getting Started

### 1. **Clone the repository**  
```bash
git clone https://github.com/your-username/TurboTasks.git
cd TurboTasks
```


### 2. **Install dependencies**  
```bash
npm install
```

### 3. **Start the dev server**  
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the Kanban board.  

---

## 💾 `localStorage` Keys  

- `cards` → Stores all card data  
- `columns` → Stores all column/list metadata  

---

## 🚧 Future Enhancements  

- 🔐 User authentication  
- 🔄 Database sync (e.g., Supabase/Firebase)  
- 📆 Due dates and reminders  
- 🏷️ Tagging system  
```