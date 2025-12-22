import React, { useState } from 'react';

export const SimpleDesktop: React.FC = () => {
  const [windows, setWindows] = useState<any[]>([]);

  const openWindow = (type: string) => {
    const newWindow = {
      id: Date.now(),
      type,
      title: type === 'wildwest' ? 'Wild West' : type === 'docs' ? 'Docs' : type === 'ledger' ? 'Ledger' : 'Telegraph'
    };
    setWindows([...windows, newWindow]);
  };

  const closeWindow = (id: number) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', background: '#000' }}>
      
      {/* Left Panel - Modern Tech */}
      <div style={{
        width: '320px',
        background: 'linear-gradient(to bottom, #0a0a0a, #1a1a1a)',
        borderRight: '1px solid rgba(59, 130, 246, 0.3)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          height: '40px',
          background: 'linear-gradient(to right, rgb(37, 99, 235), rgb(147, 51, 234))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          🤖 AGENT STATION
        </div>
        <div id="agent-workbench-hook" style={{ flex: 1, padding: '16px' }}>
          <div style={{
            border: '2px dashed rgba(59, 130, 246, 0.3)',
            borderRadius: '8px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.4)'
          }}>
            <div style={{ textAlign: 'center', color: 'rgb(96, 165, 250)', opacity: 0.6 }}>
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>🕵️</div>
              <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>Agent Workbench</div>
              <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.7 }}>Waiting for AgenticSeek...</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Western OS */}
      <div style={{
        flex: 1,
        background: 'url(https://images.unsplash.com/photo-1533106958148-daec8a8c1605?q=80&w=2540&auto=format&fit=crop) center/cover',
        position: 'relative',
        color: 'white'
      }}>
        
        {/* Menu Bar */}
        <div style={{
          height: '32px',
          background: '#2c1810',
          borderBottom: '1px solid #8b4513',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          fontSize: '14px',
          color: '#f4e4bc',
          fontFamily: 'serif'
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', color: '#deb887' }}>🤠 WesternOS</span>
            <span style={{ cursor: 'pointer' }}>Docs</span>
            <span style={{ cursor: 'pointer' }}>Edit</span>
            <span style={{ cursor: 'pointer' }}>View</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#deb887' }}>
            <span>🔋</span>
            <span>📶</span>
            <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>

        {/* Desktop Icons */}
        <div style={{
          position: 'absolute',
          top: '48px',
          left: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          zIndex: 10
        }}>
          {[
            { name: 'Sheriff', icon: '⭐' },
            { name: 'Saloon', icon: '🍺' },
            { name: 'Stables', icon: '🐎' }
          ].map(item => (
            <div key={item.name} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '8px',
              cursor: 'pointer',
              width: '80px'
            }}>
              <div style={{ fontSize: '36px', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.8))' }}>{item.icon}</div>
              <span style={{
                fontSize: '12px',
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#f4e4bc',
                background: 'rgba(0,0,0,0.5)',
                borderRadius: '4px',
                padding: '0 4px'
              }}>{item.name}</span>
            </div>
          ))}
        </div>

        {/* Windows */}
        {windows.map(win => (
          <div key={win.id} style={{
            position: 'absolute',
            top: '100px',
            left: '200px',
            width: '600px',
            height: '400px',
            background: 'rgba(253, 245, 230, 0.95)',
            borderRadius: '8px',
            border: '2px solid #8b4513',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            zIndex: 100
          }}>
            <div style={{
              height: '40px',
              background: '#8b4513',
              borderBottom: '1px solid #5c4033',
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
              cursor: 'move'
            }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => closeWindow(win.id)} style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#cd5c5c',
                  border: '1px solid #800000',
                  cursor: 'pointer'
                }} />
                <button style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#f4a460',
                  border: '1px solid #8b4513',
                  cursor: 'pointer'
                }} />
                <button style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#228b22',
                  border: '1px solid #006400',
                  cursor: 'pointer'
                }} />
              </div>
              <div style={{ flex: 1, textAlign: 'center', fontSize: '14px', fontWeight: '500', color: '#f4e4bc' }}>
                {win.title}
              </div>
            </div>
            <div style={{ height: 'calc(100% - 40px)', padding: '16px', color: '#3e2723' }}>
              {win.type === 'wildwest' && (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <input
                      type="text"
                      defaultValue="https://choppd.beauty"
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '2px solid #5c4033',
                        borderRadius: '4px',
                        fontFamily: 'serif'
                      }}
                      placeholder="Ride to URL..."
                    />
                  </div>
                  <iframe
                    src="https://choppd.beauty"
                    style={{ flex: 1, border: 'none', width: '100%' }}
                    sandbox="allow-scripts allow-same-origin allow-forms"
                    title="Wild West Browser"
                  />
                </div>
              )}
              {win.type === 'docs' && <div>📁 File Manager - Coming soon!</div>}
              {win.type === 'ledger' && <textarea style={{ width: '100%', height: '100%', border: 'none', fontFamily: 'monospace' }} defaultValue="# Marshal's Log\n\nDay 1: Tracking the bug..." />}
              {win.type === 'telegraph' && <div style={{ fontFamily: 'monospace', background: '#1a1a1a', color: '#daa520', padding: '8px', height: '100%' }}>WESTERN OS TELEGRAPH v1.0<br/>Type "help" for signals</div>}
            </div>
          </div>
        ))}

        {/* Dock */}
        <div style={{
          position: 'fixed',
          bottom: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            padding: '8px',
            display: 'flex',
            gap: '8px'
          }}>
            {[
              { type: 'docs', icon: '💼', name: 'Docs' },
              { type: 'wildwest', icon: '🌵', name: 'Wild West' },
              { type: 'ledger', icon: '📓', name: 'Ledger' },
              { type: 'telegraph', icon: '📠', name: 'Telegraph' }
            ].map(app => (
              <div
                key={app.type}
                onClick={() => openWindow(app.type)}
                style={{
                  width: '64px',
                  height: '64px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '36px',
                  cursor: 'pointer',
                  background: '#8b4513',
                  borderRadius: '8px',
                  border: '2px solid #d2691e',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                  transition: 'transform 0.3s'
                }}
                title={app.name}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) translateY(-16px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
              >
                {app.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
