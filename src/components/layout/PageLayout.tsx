import { TopNav } from './TopNav'

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-tk-grey-lt flex flex-col">
      <TopNav />
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  )
}
