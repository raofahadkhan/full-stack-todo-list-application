// app/providers.tsx
'use client'

import AlertState from '@/context/alert/AlertState'
import AuthState from '@/context/auth/AuthState'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
      <AuthState>
        <AlertState>
          <CacheProvider>
            <ChakraProvider>
              {children}
            </ChakraProvider>
          </CacheProvider>
        </AlertState>
      </AuthState>
  )
}
