import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
  Outlet
} from '@tanstack/react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import CarParts from './pages/CarParts'

// Ruta raíz (layout general)
const rootRoute = createRootRoute({
  component: () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
})

// Rutas hijas
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home
})

const carPartsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/repuestos',
  component: CarParts
})

// Árbol de rutas
const routeTree = rootRoute.addChildren([homeRoute, carPartsRoute])

const router = createRouter({ routeTree })

function App() {
  return <RouterProvider router={router} />
}

export default App