# Taskflow - SaaS Productivity Platform

A **production-ready SaaS-grade productivity platform** built with Next.js 14, TypeScript, and Tailwind CSS. Features a 3-column dashboard layout, Kanban board, Pomodoro timer, analytics dashboard, and full task management with localStorage persistence.

## 🎉 What's New (v2.0 - SaaS Upgrade)

This is a **complete upgrade** from the original Todo app into a full-featured productivity platform:

### Major Features Added
- ✅ **3-Column Dashboard Layout** - Sidebar + Main Content + Task Inspector
- ✅ **Kanban Board** - Drag-and-drop task management (To Do | In Progress | Done)
- ✅ **Today View** - Focus on today's tasks with progress ring
- ✅ **Dashboard Analytics** - Charts and statistics
- ✅ **Subtasks** - Unlimited subtasks per task with progress tracking
- ✅ **Due Dates & Time** - Full date/time picker with overdue indicators
- ✅ **Tags/Labels** - Custom tags with 10 color options
- ✅ **Global Search (Cmd+K)** - Fuzzy search across all tasks
- ✅ **Task Inspector** - Full task details panel (right sidebar)
- ✅ **Focus Mode** - Pomodoro timer (25min work / 5min break)
- ✅ **Dark/Light Theme** - Smooth theme toggle with persistence
- ✅ **Browser Notifications** - 15-min before due + overdue alerts
- ✅ **Export/Import** - JSON and Markdown export
- ✅ **Responsive Design** - Mobile-first, fully responsive
- ✅ **Workspace Management** - Editable workspace name

## 🎨 Features

### Core Task Management
- ✅ **Add Tasks** with priority selector (Low 🟢 / Medium 🟡 / High 🔴)
- ✅ **Edit Tasks** inline or in Task Inspector
- ✅ **Complete Tasks** with animated checkmark
- ✅ **Delete Tasks** with slide-out animation
- ✅ **Restore Tasks** from history
- ✅ **Subtasks** with progress tracking
- ✅ **Due Dates** with time picker
- ✅ **Tags** for organization

### Views & Navigation
- ✅ **List View** - Traditional task list
- ✅ **Board View** - Kanban with drag-and-drop
- ✅ **Calendar View** - Monthly calendar (prepared)
- ✅ **Today View** - Today's tasks + overdue
- ✅ **Dashboard** - Analytics and statistics
- ✅ **History** - Deleted tasks (can restore)

### Filtering & Sorting
- ✅ **Filter Tabs** - All / Active / Completed / Today / Upcoming / History
- ✅ **Sort Options** - Priority / Date Added / Alphabetical / Due Date
- ✅ **Global Search** - Cmd+K fuzzy search
- ✅ **Tag Filtering** - Click tags in sidebar

### Productivity Features
- ✅ **Focus Mode** - Pomodoro timer (25/5 cycles)
- ✅ **Progress Tracking** - Completion rate, streak, stats
- ✅ **Notifications** - Browser notifications for due tasks
- ✅ **Analytics** - Charts and productivity insights

### UI/UX
- ✅ **3-Column Layout** - Sidebar + Main + Inspector
- ✅ **Dark/Light Theme** - Smooth toggle with persistence
- ✅ **Glass-Morphism** - Premium design with backdrop blur
- ✅ **Smooth Animations** - Framer Motion throughout
- ✅ **Responsive Design** - Mobile, tablet, desktop
- ✅ **Floating Orbs** - Animated gradient backgrounds

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Search**: Fuse.js (fuzzy search)
- **Charts**: Recharts
- **Drag-Drop**: HTML5 native + Framer Motion
- **Fonts**: Bricolage Grotesque & DM Mono (Google Fonts)
- **State**: React Hooks (useTodos, useTags, useTheme, useSearch, useStats)
- **Storage**: Browser localStorage
- **Deployment**: Vercel

## 📦 Installation

```bash
# Clone or download the project
cd todo

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

## 🚀 Deployment to Vercel

The app is **production-ready** and can be deployed to Vercel with zero configuration:

```bash
# Option 1: Vercel CLI
npm i -g vercel
vercel

# Option 2: GitHub Integration (Recommended)
git push origin main
# Then connect to Vercel dashboard
```

## 🎯 Quick Start

1. **Add Task**: Type in input field, select priority, press Enter
2. **Edit Task**: Click task to open Task Inspector, edit details
3. **Complete Task**: Click checkbox to mark done
4. **Delete Task**: Click trash icon (goes to history)
5. **Switch Views**: Click List/Board/Calendar buttons
6. **Search**: Press Cmd+K (Mac) or Ctrl+K (Windows)
7. **Focus Mode**: Click "Focus Mode" button for Pomodoro timer
8. **View Analytics**: Click "Dashboard" in sidebar

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome)

## 🎨 Design

### Color Scheme
- **Dark Theme** (default): #0d0f1a navy + #6366f1 indigo accents
- **Light Theme**: #f8f9fc background + white cards

### Typography
- **Headings**: Bricolage Grotesque (premium, bold)
- **Body**: DM Mono (clean, readable)
- **Font Sizes**: Small / Medium / Large options

### Glass-Morphism
- 1px solid rgba(255, 255, 255, 0.08) borders
- backdrop-blur-xl effect
- Gradient backgrounds: from-white/5 to-white/[0.02]

## 📄 Data Persistence

All data stored in browser localStorage:
- `cloudaik_todos` - All tasks with full details
- `cloudaik_history` - Deleted/completed items
- `cloudaik_tags` - User-created tags
- `taskflow_theme` - Dark/Light preference
- `taskflow_fontSize` - Font size setting
- `taskflow_workspace` - Workspace name

## 📁 Project Structure

```
/app
  /page.tsx          ← Main app component
  /layout.tsx        ← Root layout with fonts
  /globals.css       ← Global styles + Tailwind
/components
  /layout
    /Sidebar.tsx     ← Navigation + workspace
    /Header.tsx      ← Search + theme toggle
    /RightPanel.tsx  ← Task Inspector
    /CommandPalette.tsx ← Cmd+K search
  /views
    /ListView.tsx    ← List view
    /BoardView.tsx   ← Kanban board
    /TodayView.tsx   ← Today view
    /DashboardView.tsx ← Analytics
  /task
    /TaskCard.tsx    ← Task card component
  /ui
    /PomodoroTimer.tsx ← Focus mode timer
/lib
  /useTodos.ts       ← Task state management
  /useTags.ts        ← Tag management
  /useTheme.ts       ← Theme + font size
  /useSearch.ts      ← Fuzzy search
  /useStats.ts       ← Analytics
  /export.ts         ← Export/import functions
  /scheduler.ts      ← Notifications
  /types.ts          ← TypeScript interfaces
/public
  /favicon.ico
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Cmd+K / Ctrl+K | Open global search |
| Enter | Submit search / Save task |
| Escape | Close search / Cancel edit |
| ↑ / ↓ | Navigate search results |

## 🔐 Privacy & Security

- **100% Client-Side**: All data stored locally in browser
- **No Cloud Sync**: No external servers or APIs
- **No Tracking**: No analytics or telemetry
- **No Ads**: Completely ad-free
- **Open Source**: Transparent and auditable

## 📝 Notes

- No backend or database required
- No environment variables needed
- Fully hydration-safe
- Mobile-responsive
- Zero external APIs
- Works offline (after first load)

## 📚 Documentation

- **QUICK_START.md** - User guide and feature walkthrough
- **UPGRADE_SUMMARY.md** - Complete upgrade details
- **DEPLOYMENT.md** - Deployment instructions
- **FEATURES.md** - Detailed feature list

## 🔗 Links

- **Website**: https://cloudexify.site
- **GitHub**: (Add your repo)
- **Issues**: (Add issue tracker)

## 📄 License

This project is open source and available for personal use.

---

## 🎉 What's Included

✅ Production-ready code
✅ Zero TypeScript errors
✅ Fully responsive design
✅ Smooth animations
✅ Dark/Light themes
✅ localStorage persistence
✅ Browser notifications
✅ Analytics dashboard
✅ Kanban board
✅ Pomodoro timer
✅ Global search
✅ Task inspector
✅ Subtasks
✅ Due dates
✅ Tags/labels
✅ Export/import
✅ Mobile-optimized
✅ Vercel-ready

---

**Built with ❤️ by Cloudexify**

**Tech Stack**: Next.js 14 • TypeScript • Tailwind CSS • Framer Motion • Recharts • Fuse.js
