import { Link } from '@tanstack/react-router'

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: '#1a1a2e',
      padding: '1rem 2rem',
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center'
    }}>
      <Link to="/" style={linkStyle}>Inicio</Link>
      <Link to="/repuestos" style={linkStyle}>Repuestos</Link>
    </nav>
  )
}

const linkStyle = {
  backgroundColor: '#2d2d5e',
  color: 'white',
  padding: '0.6rem 1.5rem',
  borderRadius: '10px',
  textDecoration: 'none',
  fontWeight: 'bold'
}

export default Navbar