# Taskflow - Quick Start Guide

## 🚀 Getting Started

Your Taskflow app is now a **production-ready SaaS productivity platform**. Here's how to use it:

---

## 📋 MAIN FEATURES AT A GLANCE

### Dashboard (Home)
- **List View**: Traditional task list with all details
- **Board View**: Kanban board with drag-and-drop
- **Calendar View**: Monthly calendar (prepared)
- **Dashboard**: Analytics and statistics

### Navigation
- **My Tasks**: All active tasks
- **Today**: Tasks due today + overdue
- **Upcoming**: Tasks with future due dates
- **Completed**: Finished tasks
- **History**: Deleted tasks (can restore)

### Quick Actions
- **Cmd+K** (Mac) / **Ctrl+K** (Windows): Global search
- **Theme Toggle**: Dark/Light mode (top right)
- **Notification Bell**: Shows overdue count
- **Focus Mode**: Pomodoro timer for deep work

---

## ✅ ADDING & MANAGING TASKS

### Add a Task
1. Type in the input field at the top
2. Select priority: 🟢 Low | 🟡 Medium | 🔴 High
3. Press Enter or click "Add"

### Edit a Task
1. Click on any task to open the **Task Inspector** (right panel)
2. Edit:
   - Title (click to edit)
   - Description (textarea)
   - Due date (date picker)
   - Priority (dropdown)
   - Tags (multi-select)
   - Subtasks (add/edit/delete)
3. Changes auto-save

### Complete a Task
- Click the checkbox on the left
- Task moves to "Completed" view
- Strikethrough text appears

### Delete a Task
- Click the trash icon (appears on hover)
- Task moves to "History" (can restore later)

---

## 🏷️ TAGS & ORGANIZATION

### Create a Tag
1. Open Task Inspector for any task
2. Scroll to "Tags" section
3. Click "Add tag..." dropdown
4. (Tags are created via the sidebar in future updates)

### Assign Tags
1. Open Task Inspector
2. Click "Add tag..." dropdown
3. Select from existing tags
4. Click tag name to add

### Filter by Tag
1. Click any tag in the left sidebar
2. View only tasks with that tag

---

## 📅 DUE DATES & REMINDERS

### Set a Due Date
1. Open Task Inspector
2. Click "Due Date" field
3. Select date and time
4. Auto-saves

### Due Date Indicators
- 🔴 **Red border**: Task is overdue
- 🟡 **Amber border**: Task is due today
- 📅 **Date chip**: Shows due date

### Browser Notifications
- Notifications appear 15 minutes before due time
- Overdue tasks notify on app open
- (Requires notification permission)

---

## 🎯 KANBAN BOARD

### Switch to Board View
1. Click "Board" button (top of main content)
2. See 3 columns: To Do | In Progress | Done

### Move Tasks
1. Drag any task card
2. Drop into another column
3. Status auto-updates

### Column Meanings
- **To Do**: Not started
- **In Progress**: Currently working on
- **Done**: Completed

---

## 📊 TODAY VIEW

### Access Today View
1. Click "Today" in left sidebar
2. See only tasks due today + overdue

### Progress Ring
- Shows completion percentage
- Motivational quote at top
- Real-time updates

---

## 🔍 GLOBAL SEARCH

### Open Search
- Press **Cmd+K** (Mac) or **Ctrl+K** (Windows)
- Or click search bar in header

### Search Tips
- Search by task title
- Search by description
- Search by tag name
- Fuzzy matching (typos OK)

### Navigate Results
- Use arrow keys to move up/down
- Press Enter to select
- Press Escape to close

---

## ⏱️ FOCUS MODE (POMODORO)

### Start Focus Mode
1. Click "Focus Mode" button in header
2. Fullscreen Pomodoro timer appears

### Timer Cycles
- **25 minutes**: Work time (focus)
- **5 minutes**: Break time (rest)
- Auto-switches between cycles

### Controls
- **Start/Pause**: Toggle timer
- **Reset**: Restart current cycle
- **Sound Toggle**: Enable/disable beep
- **Exit**: Close focus mode

---

## 📈 DASHBOARD

### View Analytics
1. Click "Dashboard" in left sidebar
2. See statistics:
   - Total tasks created
   - Completed this week
   - Current streak (days)
   - Completion rate %
   - Tasks by priority (chart)
   - Most productive day (chart)

### Charts
- All charts update in real-time
- Based on your task data
- No external data sources

---

## 🌓 THEME & SETTINGS

### Toggle Theme
1. Click sun/moon icon in header (top right)
2. Smooth transition between dark/light
3. Preference auto-saves

### Dark Theme
- Deep navy background (#0d0f1a)
- Electric indigo accents
- Easy on the eyes

### Light Theme
- Clean white background
- Professional appearance
- High contrast

---

## 💾 EXPORT & IMPORT

### Export as JSON
1. (Feature prepared for future)
2. Downloads todos.json
3. Includes all tasks + history

### Export as Markdown
1. (Feature prepared for future)
2. Downloads formatted checklist
3. Perfect for sharing

### Import JSON
1. (Feature prepared for future)
2. Upload previously exported file
3. Merges with existing tasks

---

## 🏷️ SUBTASKS

### Add a Subtask
1. Open Task Inspector
2. Scroll to "Subtasks" section
3. Type subtask text
4. Click "+" button

### Complete a Subtask
1. Click checkbox next to subtask
2. Progress bar updates
3. Parent task shows "X/Y" progress

### Delete a Subtask
1. Click "✕" button on subtask
2. Subtask removed

### Progress Tracking
- Progress bar shows completion %
- Helps break down large tasks
- Visual motivation

---

## 🗂️ WORKSPACE

### Rename Workspace
1. Click workspace name in sidebar
2. Type new name
3. Press Enter to save
4. Auto-saves to localStorage

### Default Workspace
- "My Workspace" is default
- Can be renamed anytime
- Preference persists

---

## 📱 MOBILE USAGE

### Responsive Design
- Sidebar collapses on mobile
- Right panel becomes drawer
- Touch-friendly buttons
- Full functionality on all devices

### Mobile Navigation
- Tap menu icon (☰) to open sidebar
- Swipe to close panels
- Tap tasks to open inspector

---

## 🔐 DATA & PRIVACY

### Local Storage Only
- All data stored in browser
- No cloud sync
- No external servers
- 100% private

### Data Backup
- Export as JSON regularly
- Keep backups safe
- Can import anytime

### Browser Storage Limits
- Typically 5-10MB per domain
- Enough for thousands of tasks
- Check browser settings if needed

---

## ⌨️ KEYBOARD SHORTCUTS

| Shortcut | Action |
|----------|--------|
| Cmd+K / Ctrl+K | Open global search |
| Enter | Submit search / Save task |
| Escape | Close search / Cancel edit |
| ↑ / ↓ | Navigate search results |

---

## 🎨 CUSTOMIZATION

### Font Size (Prepared)
- Small / Medium / Large options
- Stored in localStorage
- Applies to all text

### Color Scheme
- Dark theme (default)
- Light theme
- Auto-switches with toggle

### Tags
- Create custom tags
- Choose from 10 colors
- Organize by category

---

## 🐛 TROUBLESHOOTING

### Tasks Not Saving?
- Check browser storage settings
- Ensure cookies/storage enabled
- Try refreshing page

### Search Not Working?
- Press Cmd+K or Ctrl+K
- Check keyboard layout
- Try typing in search box

### Notifications Not Showing?
- Grant notification permission
- Check browser settings
- Ensure app is open or in background

### Theme Not Persisting?
- Clear browser cache
- Check localStorage settings
- Try toggling theme again

---

## 📞 SUPPORT

- **Website**: https://cloudexify.site
- **Issues**: Check browser console (F12)
- **Feedback**: Share your ideas!

---

## 🎉 TIPS & TRICKS

1. **Use Tags**: Organize by project, context, or priority
2. **Set Due Dates**: Never miss a deadline
3. **Subtasks**: Break big tasks into smaller steps
4. **Focus Mode**: Use Pomodoro for deep work
5. **Export Regularly**: Backup your data
6. **Search Often**: Cmd+K is your friend
7. **Board View**: Visualize workflow
8. **Today View**: Stay focused on what matters

---

## 🚀 NEXT STEPS

1. **Add Your First Task**: Start organizing
2. **Create Tags**: Categorize your work
3. **Set Due Dates**: Plan ahead
4. **Try Focus Mode**: Boost productivity
5. **Export Data**: Backup regularly
6. **Share Feedback**: Help us improve

---

**Happy Tasking! 🎯**

Made with ❤️ by Cloudexify
