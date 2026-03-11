import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { PageLayout } from './components/layout/PageLayout'
import { DiscoverPage } from './pages/DiscoverPage'
import { BriefDetailPage } from './pages/BriefDetailPage'
import { DashboardPage } from './pages/DashboardPage'
import { FilesPage } from './pages/FilesPage'
import { DiagnosePage } from './pages/DiagnosePage'
import { VersionHistoryPage } from './pages/VersionHistoryPage'

function Layout() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/discover"  element={<DiscoverPage />} />
          <Route path="/define"    element={<BriefDetailPage />} />
          <Route path="/develop"   element={<DashboardPage />} />
          <Route path="/deliver"   element={<FilesPage />} />
          <Route path="/diagnose"  element={<DiagnosePage />} />
          <Route path="/history"   element={<VersionHistoryPage />} />
          <Route path="/"          element={<Navigate to="/discover" replace />} />
          <Route path="*"          element={<Navigate to="/discover" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
