# ReExt AI Demo - Complete Standalone App

This is a **fully independent** Vite + React + Node.js application with ReExt (ExtJS React wrapper) integration.

## 📁 Project Structure

```
reext-vite-demo/
├── src/                          # React app source
│   ├── App.jsx                   # Main React component with <ReExt xtype='simple-grid' />
│   └── main.jsx                  # Entry point with ReExtProvider
├── public/components/            # ExtJS component definitions
│   ├── SimpleDataStore.js
│   ├── SimpleGridController.js
│   └── SimpleDataGrid.js
├── server/                       # Node.js API server (moved here)
│   ├── server.js                 # Express app with API endpoints
│   ├── services/                 # Business logic (aiQueryParser, etc.)
│   ├── endpoints/                # API route handlers
│   ├── .env                      # OpenAI API key
│   └── package.json              # Node dependencies
├── vite.config.js                # Vite config with API proxy
├── package.json                  # Root scripts (run both servers)
└── README.md
```

## 🚀 Quick Start

### 1. Install All Dependencies

```bash
cd reext-vite-demo

# Install React/Vite dependencies
npm install

# Install Node server dependencies
cd server && npm install && cd ..
```

### 2. Start Both Servers with One Command

```bash
npm run dev
```

This starts:
- **Vite Dev Server**: http://localhost:5173
- **Node API Server**: http://localhost:8080

### 3. Open Your Browser

```
http://localhost:5173
```

The app will:
- Load the ReExt grid component
- Fetch data from `/api/simple-data`
- Allow natural language queries via AI

## 📊 Features

✅ **Vite React App** - Fast, hot-reload development
✅ **ReExt Integration** - ExtJS grids as React components
✅ **Node.js API** - Data endpoints + AI query processing
✅ **GPT-3.5 Integration** - Natural language query support
✅ **No CORS Issues** - API proxy handles cross-origin requests
✅ **Completely Self-Contained** - No dependency on external ExtJS app

## 🔧 Configuration

### Environment Variables (.env in server folder)

```env
OPENAI_API_KEY=sk-...your-key...
PORT=8080
NODE_ENV=development
```

### ReExt Trial Key (src/main.jsx)

When you first run the app, ReExt will prompt for a trial key. You can also add it directly:

```jsx
const reextkey = 'your-trial-key-here'
```

## 📝 How It Works

1. **User types NL query** in grid search field
2. **React component sends** query to `/api/simplegrid-prompt`
3. **Vite proxy** redirects to Node server (localhost:8080)
4. **Node server** processes query with GPT-3.5-turbo
5. **AI returns** filters & sorters
6. **Grid updates** with filtered results

## 🛠️ Available Scripts

```bash
# Run both Vite dev server AND Node API server
npm run dev

# Run only Vite dev server (port 5173)
npm run vite-dev

# Run only Node API server (port 8080)
npm run server-dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔐 Production Deployment

1. **Build React app**:
   ```bash
   npm run build
   # Creates dist/ folder
   ```

2. **Point Node server to built dist**:
   Edit `server/server.js` line ~20:
   ```javascript
   app.use(express.static(path.join(__dirname, '../dist')));
   ```

3. **Deploy**, start only Node server:
   ```bash
   cd server
   npm start
   # App accessible at http://your-domain:8080
   ```

## 📚 Project Origins

This project was evolved from two sources:
- **Classic ExtJS App** - Original at `../ReExtAIDemo`
- **ReExt Documentation** - https://docs.sencha.com/reext/1.1.0/

The decision to migrate to React + ReExt provides:
- Modern React framework benefits
- Hot module reloading during development
- Easier component composition
- Better TypeScript support (optional)
- True single-page app (SPA) experience

## 🐛 Troubleshooting

**Grid not loading data?**
- Ensure both servers are running: `npm run dev`
- Check Network tab in DevTools for `/api/simple-data` requests
- Verify OpenAI key in `server/.env`

**ReExt plugin error?**
- Make sure `vite` and `@vitejs/plugin-react` are installed
- ReExt plugin is auto-imported in vite.config.js

**NL queries not working?**
- Check Node server console for GPT errors
- Verify OPENAI_API_KEY in server/.env is valid
- Model is set to `gpt-3.5-turbo` (not gpt-4)

## 📧 Support

For ReExt issues: https://docs.sencha.com/reext/
For Vite issues: https://vite.dev/
For React issues: https://react.dev

---

**Ready to code!** 🎉

Start with: `npm run dev`
