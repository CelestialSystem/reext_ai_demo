import { useState, useEffect } from 'react'
import ReExt from '@sencha/reext'
import './App.css'

function App() {
  const [ready, setReady] = useState(false)
  const [activeGrid, setActiveGrid] = useState('simple')

  useEffect(() => {
    const loadComponents = async () => {
      try {
        // Load all component definitions
        // Simple Grid
        await import('../public/components/SimpleDataStore')
        await import('../public/components/SimpleGridController')
        await import('../public/components/SimpleDataGrid')
        
        // Banking Grid
        await import('../public/components/BankingDataStore')
        await import('../public/components/BankingDataGridController')
        await import('../public/components/BankingDataGrid')
        
        // Healthcare Grid
        await import('../public/components/HealthcareDataStore')
        await import('../public/components/HealthcareDataGridController')
        await import('../public/components/HealthcareDataGrid')
        
        // School Grid
        await import('../public/components/SchoolDataStore')
        await import('../public/components/SchoolDataGridController')
        await import('../public/components/SchoolDataGrid')
        
        setReady(true)
      } catch (e) {
        console.error('Failed to load components:', e)
      }
    }

    loadComponents()
  }, [])

  const getGridXtype = () => {
    switch(activeGrid) {
      case 'simple': return 'simple-grid'
      case 'banking': return 'banking-grid'
      case 'healthcare': return 'healthcare-grid'
      case 'school': return 'school-grid'
      default: return 'simple-grid'
    }
  }

  if (!ready) {
    return (
      <div className="App" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h1>Loading ReExt Components...</h1>
      </div>
    )
  }

  return (
    <div className="App" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ 
        padding: '12px 20px', 
        backgroundColor: '#f8f9fa', 
        borderBottom: '1px solid #e9ecef',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        zIndex: 100
      }}>
        <h1 style={{ margin: '0 0 4px 0', fontSize: '20px', color: '#1a1a1a' }}>ReExt AI Demo</h1>
      </header>
      <main style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
        {/* Navigation Panel */}
        <nav style={{
          width: '280px',
          backgroundColor: '#2c3e50',
          borderRight: '1px solid #1a252f',
          overflowY: 'auto',
          boxShadow: '2px 0 4px rgba(0,0,0,0.1)'
        }}>
          {/* Header */}
          <div style={{
            padding: '20px',
            borderBottom: '2px solid #34495e',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '24px' }}>⚙️</span>
            <h2 style={{ 
              margin: 0, 
              color: '#fff', 
              fontSize: '18px',
              fontWeight: '600'
            }}>Smart Grid</h2>
          </div>

          {/* Navigation Items */}
          <ul style={{
            listStyle: 'none',
            padding: '20px 0',
            margin: 0
          }}>
            {[
              { id: 'simple', label: 'Simple Grid', icon: '🖥️' },
              { id: 'banking', label: 'Banking Grid', icon: '💰' },
              { id: 'healthcare', label: 'Healthcare Grid', icon: '⚕️' },
              { id: 'school', label: 'School Grid', icon: '🎓' }
            ].map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveGrid(item.id)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    backgroundColor: activeGrid === item.id ? '#34495e' : 'transparent',
                    color: activeGrid === item.id ? '#fff' : '#95a5a6',
                    border: 'none',
                    borderLeft: activeGrid === item.id ? '4px solid #3498db' : '4px solid transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    textAlign: 'left',
                    fontWeight: activeGrid === item.id ? '600' : '500'
                  }}
                  onMouseOver={(e) => {
                    if (activeGrid !== item.id) {
                      e.target.style.backgroundColor = '#34495e';
                      e.target.style.color = '#ecf0f1';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (activeGrid !== item.id) {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#95a5a6';
                    }
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Grid Container */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <ReExt 
            key={activeGrid}
            xtype={getGridXtype()}
            style={{ height: '100%', width: '100%' }}
          />
        </div>
      </main>
    </div>
  )
}

export default App
