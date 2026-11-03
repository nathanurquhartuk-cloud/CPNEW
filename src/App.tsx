import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { useAuth } from './lib/auth'
import Account from './pages/Account'
import AddSolution from './pages/AddSolution'
import BookShipment from './pages/BookShipment'
import Documents from './pages/Documents'
import Financials from './pages/Financials'
import Insights from './pages/Insights'
import Inventory from './pages/Inventory'
import Login from './pages/Login'
import More from './pages/More'
import NotFound from './pages/NotFound'
import Overview from './pages/Overview'
import Shipments from './pages/Shipments'
import Solutions from './pages/Solutions'
import Studies from './pages/Studies'
import Support from './pages/Support'

export default function App() {
  const authed = useAuth((s) => s.isAuthenticated)
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {authed ? (
          <Route element={<Layout />}>
            <Route path="/" element={<Overview />} />
            <Route path="/shipments" element={<Shipments />} />
            <Route path="/shipments/live" element={<Shipments live />} />
            <Route path="/orders" element={<Shipments />} />
            <Route path="/tracking" element={<Shipments live />} />
            <Route path="/studies" element={<Studies />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/financials" element={<Financials />} />
            <Route path="/invoices" element={<Financials />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/analytics" element={<Insights />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/agreements" element={<Solutions />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/support" element={<Support />} />
            <Route path="/account" element={<Account />} />
            <Route path="/book" element={<BookShipment />} />
            <Route path="/place-order" element={<BookShipment />} />
            <Route path="/add-service" element={<AddSolution />} />
            <Route path="/more" element={<More />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </HashRouter>
  )
}
