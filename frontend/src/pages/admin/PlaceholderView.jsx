import React from 'react';

const PlaceholderView = ({ title }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        gap: 16,
        opacity: 0.4,
      }}
    >
      <div style={{ fontSize: 48 }}>🚧</div>
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 20,
          fontWeight: 700,
          color: 'white',
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 13, color: '#6b7280' }}>
        Tính năng đang được phát triển
      </div>
    </div>
  );
};

export default PlaceholderView;
