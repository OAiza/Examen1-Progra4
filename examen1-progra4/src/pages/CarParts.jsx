import { useState, useEffect } from 'react'

function CarParts() {
  const [allItems, setAllItems] = useState([])
  const [visibleCount, setVisibleCount] = useState(10)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(import.meta.env.VITE_API_URL, {
          headers: {
            'X-Access-Key': import.meta.env.VITE_JSONBIN_ACCESS_KEY
          }
        })
        if (!response.ok) throw new Error('Error al cargar los datos')
        const data = await response.json()
        setAllItems(data.record.articles) // ← articles, no items
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filtered = allItems.filter(item =>
    item.articleProductName.toLowerCase().includes(search.toLowerCase())
  )

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  if (loading) return (
    <div style={centerStyle}>
      <div style={spinnerStyle}></div>
      <p>Cargando repuestos desde la API...</p>
    </div>
  )

  if (error) return (
    <div style={centerStyle}>
      <p style={{ color: 'red' }}>⚠️ {error}</p>
    </div>
  )

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <p style={{ color: '#aaa', fontSize: '0.8rem', letterSpacing: 2 }}>CATÁLOGO</p>
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Repuestos</h1>
        <p style={{ color: '#aaa' }}>
          Mostrando {visible.length} de {filtered.length} artículos
        </p>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={e => {
          setSearch(e.target.value)
          setVisibleCount(10)
        }}
        style={inputStyle}
      />

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: '#aaa' }}>
          No se encontraron repuestos.
        </p>
      )}

      <div style={gridStyle}>
        {visible.map(item => (
          <div key={item.articleId} style={cardStyle}>
            <img
              src={item.s3image}
              alt={item.articleProductName}
              style={imgStyle}
              onError={e => e.target.src = 'https://placehold.co/300x180?text=Sin+imagen'}
            />
            <div style={{ padding: '0.75rem' }}>
              <p style={{ color: '#aaa', fontSize: '0.7rem', margin: 0 }}>
                {item.articleNo}
              </p>
              <h3 style={{ margin: '0.2rem 0', fontSize: '1rem' }}>
                {item.articleProductName}
              </h3>
              <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#aaa' }}>
                  {item.supplierName}
                </span>
                <span style={tagStyle}>#{item.supplierId}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            onClick={() => setVisibleCount(prev => prev + 10)}
            style={btnStyle}
          >
            Ver más ({filtered.length - visibleCount} de {filtered.length} restantes)
          </button>
        </div>
      )}
    </div>
  )
}

const centerStyle = {
  display: 'flex', flexDirection: 'column',
  alignItems: 'center', justifyContent: 'center',
  height: '50vh', color: '#ccc'
}
const spinnerStyle = {
  width: '40px', height: '40px',
  border: '4px solid #444',
  borderTop: '4px solid #7c6fef',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite'
}
const inputStyle = {
  display: 'block', width: '100%', maxWidth: '500px',
  margin: '0 auto 2rem', padding: '0.7rem 1rem',
  borderRadius: '8px', border: '1px solid #444',
  backgroundColor: '#1a1a2e', color: 'white', fontSize: '1rem'
}
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '1.5rem'
}
const cardStyle = {
  backgroundColor: '#1e1e3a', borderRadius: '12px',
  overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
}
const imgStyle = {
  width: '100%', height: '180px', objectFit: 'cover'
}
const tagStyle = {
  backgroundColor: '#4a3f8f', color: '#d0c8ff',
  padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem'
}
const btnStyle = {
  backgroundColor: '#7c6fef', color: 'white',
  border: 'none', padding: '0.8rem 2rem',
  borderRadius: '25px', fontSize: '1rem', cursor: 'pointer'
}

export default CarParts