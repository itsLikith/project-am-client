import React, { useState } from 'react';

const PopComponent = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleOpen = () => setPopupOpen(true);
  const handleClose = () => setPopupOpen(false);

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
    },
    container: {
      background: '#fff',
      padding: '20px',
      borderRadius: '8px',
      width: '400px',
      maxWidth: '90%',
      position: 'relative',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
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
    },
  };

  return (
    <div>
      <button onClick={handleOpen}>Open Popup</button>
      {isPopupOpen && (
        <div style={styles.overlay} onClick={handleClose}>
          <div style={styles.container} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={handleClose}>
              &times;
            </button>
            <div style={styles.content}>
              <h2>Popup Content</h2>
              <p>A pop-up</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopComponent;
