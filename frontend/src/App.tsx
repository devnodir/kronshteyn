import React, { Suspense } from 'react'
import RenderRoutes from '@/components/RenderRoutes'
import useAppSelector from '@/hooks/useAppSelector'
import ThemeProvider from '@/providers/ThemeProvider'
import { publicRoutes, privateRoutes } from '@/routes'
import ScreenLoader from './components/Loader/ScreenLoader'
import AuthProvider from './providers/AuthProvider'

const App: React.FC = () => {

  const { isAuth } = useAppSelector(({ auth }) => auth)
  const routes = isAuth ? privateRoutes : publicRoutes

  return (
    <ThemeProvider>
      <Suspense fallback={<ScreenLoader />}>
        <AuthProvider>
          <RenderRoutes routes={routes} />
        </AuthProvider>
      </Suspense>
    </ThemeProvider>
  )
}

export default App