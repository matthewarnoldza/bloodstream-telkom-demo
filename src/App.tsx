import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { PageLayout } from './components/layout/PageLayout'
import { DashboardPage } from './pages/DashboardPage'
import { BriefDetailPage } from './pages/BriefDetailPage'
import { CirculationPage } from './pages/CirculationPage'
import { QAGatesPage } from './pages/QAGatesPage'
import { VersionHistoryPage } from './pages/VersionHistoryPage'
import { ResourcePlannerPage } from './pages/ResourcePlannerPage'
import { FilesPage } from './pages/FilesPage'

function Layout() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  )
}

function SettingsPage() {
  return (
    <div className="p-8">
      <h1 className="page-title mb-2">Settings</h1>
      <p className="text-tk-grey/60 text-sm">System configuration and preferences.</p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/dashboard"   element={<DashboardPage />} />
          <Route path="/briefs"      element={<BriefDetailPage />} />
          <Route path="/circulation" element={<CirculationPage />} />
          <Route path="/qa-gates"    element={<QAGatesPage />} />
          <Route path="/versions"    element={<VersionHistoryPage />} />
          <Route path="/resources"   element={<ResourcePlannerPage />} />
          <Route path="/files"       element={<FilesPage />} />
          <Route path="/settings"    element={<SettingsPage />} />
          <Route path="/"            element={<Navigate to="/dashboard" replace />} />
          <Route path="*"            element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
