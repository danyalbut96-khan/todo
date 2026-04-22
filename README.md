# Todo App - Task Master

A beautiful, production-ready Todo List Web App built with Next.js 14, TypeScript, and Tailwind CSS. Features glass-morphism design, smooth animations with Framer Motion, and localStorage persistence.

## 🎨 Features

- ✅ **Add Tasks** with priority selector (Low 🟢 / Medium 🟡 / High 🔴)
- ✅ **Edit Tasks** inline with Enter/Escape support
- ✅ **Complete Tasks** with animated checkmark
- ✅ **Delete Tasks** with slide-out animation
- ✅ **Filter Tabs** - All / Active / Completed / History
- ✅ **Sort Options** - Priority / Date Added / Alphabetical
- ✅ **Stats Bar** - Task counts with animated transitions
- ✅ **History Panel** - View and restore deleted/completed tasks
- ✅ **Responsive Design** - Works on mobile and desktop
- ✅ **localStorage Persistence** - Data survives refresh
- ✅ **Smooth Animations** - Framer Motion throughout
- ✅ **Dark Theme** - Electric indigo accents on deep navy background
- ✅ **Glass-Morphism** - Premium UI with backdrop blur

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Fonts**: Bricolage Grotesque (headings) & DM Mono (body)
- **Icons**: Unicode emoji + custom SVGs
- **State Management**: React Hooks (useTodos)
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

The app is production-ready and can be deployed to Vercel with zero configuration:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or push to GitHub and connect to Vercel dashboard
```

**Vercel deployment**: The app automatically builds and deploys. Just push to your git repository and connect to Vercel.

## 🎯 Usage

1. **Add Task**: Type in the input field, select priority, press Enter or click "Add"
2. **Edit Task**: Hover over a task and click the pencil icon, then Enter to save
3. **Complete Task**: Click the checkbox to mark as done
4. **Delete Task**: Click the trash icon to remove (goes to history)
5. **Filter**: Use tabs to view All / Active / Completed / History
6. **Sort**: Select sort order from dropdown
7. **Restore**: Click "Restore" on deleted items in History panel

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome)

## 🎨 Design Details

- **Color Scheme**: Deep navy (#0d0f1a) with electric indigo (#6366f1) accents
- **Typography**: Premium font pairing for focus and readability
- **Animations**: Smooth micro-interactions on all UI elements
- **Glassmorphism**: Subtle backdrop blur with semi-transparent backgrounds
- **Floating Orbs**: Animated gradient backgrounds for visual interest

## 📄 Data Persistence

All data is stored in browser localStorage:
- `cloudaik_todos` - Active tasks
- `cloudaik_history` - Deleted/completed tasks

Data persists across browser sessions and refreshes.

## 📝 Notes

- No backend or database required
- No environment variables needed
- Fully hydration-safe
- Mobile-responsive
- Zero external APIs

## 🔗 Links

Made with ❤️ by [Cloudexify](https://cloudexify.site)

## 📄 License

This project is open source and available for personal use.

---

**Built with Next.js 14 • TypeScript • Tailwind CSS • Framer Motion**
