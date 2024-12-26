import React, { useState } from 'react';

// Popup Component
const PopComponent = ({ message, onClose }) => {
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s', // Animation for opening
    },
    container: {
      background: '#fff',
      padding: '20px',
      borderRadius: '8px',
      width: '400px',
      maxWidth: '90%',
      textAlign: 'center',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
      position: 'relative',
      animation: 'slideIn 0.3s', // Animation for content
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      border: 'none',
      background: 'none',
      fontSize: '18px',
      cursor: 'pointer',
    },
    content: {
      margin: '15px 0',
      fontSize: '16px',
      color: '#333',
    },
  };

  return (
    <div
      style={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div style={styles.container} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div style={styles.content}>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <button onClick={handleOpen}>Open Popup</button>
      {isOpen && (
        <PopComponent
          message="This is a popup message!"
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default App;

// CSS for animations
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideIn {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

// Injecting CSS into the document
const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
