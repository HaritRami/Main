import { RotatingLines } from 'react-loader-spinner';

const Loader = ({ text = 'Processing...', height = 100, width = 100, color = '#0d6efd' }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backdropFilter: 'blur(6px)',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <RotatingLines
        strokeColor={color}
        strokeWidth="5"
        animationDuration="0.75"
        width={width}
        visible={true}
      />
      <p style={{ marginTop: 20, fontSize: '1.1rem', color: '#0d6efd' }}>{text}</p>
    </div>
  );
};

export default Loader;
