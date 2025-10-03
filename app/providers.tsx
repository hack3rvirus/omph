'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface ChurchConfig {
  name: string
  patron: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  contact: {
    address: string
    phone: string
    email: string
  }
}

const defaultConfig: ChurchConfig = {
  name: "Our Mother of Perpetual Help Chaplaincy, AEFUTHA 1",
  patron: "Our Mother of Perpetual Help",
  colors: {
    primary: "#FFD700",
    secondary: "#1E3A8A", 
    accent: "#B91C1C",
    background: "#FFFFFF",
    text: "#1F2937"
  },
  contact: {
    address: "AEFUTHA Campus, Akure, Ondo State, Nigeria",
    phone: "+234-XXX-XXX-XXXX",
    email: "info@ourmotherofperpetualhelpchaplaincy.org"
  }
}

const ChurchConfigContext = createContext<ChurchConfig>(defaultConfig)

export function Providers({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ChurchConfig>(defaultConfig)

  useEffect(() => {
    // Apply CSS custom properties for theming
    const root = document.documentElement
    root.style.setProperty('--primary-color', config.colors.primary)
    root.style.setProperty('--secondary-color', config.colors.secondary)
    root.style.setProperty('--accent-color', config.colors.accent)
    root.style.setProperty('--background-primary', config.colors.background)
    root.style.setProperty('--text-primary', config.colors.text)
    root.style.setProperty('--church-patron-color', config.colors.secondary)
  }, [config])

  return (
    <ChurchConfigContext.Provider value={config}>
      {children}
    </ChurchConfigContext.Provider>
  )
}

export const useChurchConfig = () => useContext(ChurchConfigContext)