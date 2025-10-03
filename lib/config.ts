// Church Configuration System
// This allows easy customization for different parishes

export interface ChurchConfig {
  // Basic Information
  name: string
  shortName: string
  patron: string
  location: string
  
  // Theme Colors
  colors: {
    primary: string      // Main gold/dominant color
    secondary: string    // Secondary color (often blue for Mary)
    accent: string       // Accent color for highlights
    background: string   // Main background color
    text: string         // Primary text color
  }
  
  // Contact Information
  contact: {
    address: string
    city: string
    state: string
    country: string
    phone: string
    email: string
    website?: string
  }
  
  // Mass Schedule
  massSchedule: {
    sunday: string[]
    weekday: string[]
    saturday: string[]
    holyDays?: string[]
  }
  
  // Social Media
  social?: {
    facebook?: string
    twitter?: string
    instagram?: string
    youtube?: string
  }
  
  // Features
  features: {
    onlineDonations: boolean
    liveStreaming: boolean
    eventRegistration: boolean
    prayerWall: boolean
  }
}

// Default configuration for Our Mother of Perpetual Help Chaplaincy
export const defaultChurchConfig: ChurchConfig = {
  name: "Our Mother of Perpetual Help Chaplaincy, AEFUTHA 1",
  shortName: "OMPH Chaplaincy",
  patron: "Our Mother of Perpetual Help",
  location: "AEFUTHA Campus, Akure",
  
  colors: {
    primary: "#FFD700",    // Vatican Gold
    secondary: "#1E3A8A",  // Deep Marian Blue  
    accent: "#B91C1C",     // Gentle Red
    background: "#FFFFFF", // Pure White
    text: "#1F2937"        // Charcoal
  },
  
  contact: {
    address: "Adekunle Ajasin University",
    city: "Akure",
    state: "Ondo State",
    country: "Nigeria",
    phone: "+234-XXX-XXX-XXXX",
    email: "chaplain@aaua.edu.ng",
    website: "https://omphaefutha.org"
  },
  
  massSchedule: {
    sunday: ["8:00 AM", "10:00 AM"],
    weekday: ["6:00 AM", "6:00 PM"],
    saturday: ["6:00 PM"],
    holyDays: ["6:00 AM", "12:00 PM", "6:00 PM"]
  },
  
  features: {
    onlineDonations: true,
    liveStreaming: true,
    eventRegistration: true,
    prayerWall: true
  }
}

// Alternative church configurations for easy customization
export const sampleChurchConfigs: Record<string, Partial<ChurchConfig>> = {
  "st-peters": {
    name: "St. Peter's Catholic Parish",
    patron: "St. Peter the Apostle",
    colors: {
      primary: "#DAA520",
      secondary: "#4169E1", 
      accent: "#DC143C",
      background: "#FFFFFF",
      text: "#2C3E50"
    }
  },
  
  "st-marys": {
    name: "St. Mary's Catholic Church",
    patron: "Blessed Virgin Mary",
    colors: {
      primary: "#FFD700",
      secondary: "#191970",
      accent: "#FF6B6B",
      background: "#FFFFFF", 
      text: "#2C3E50"
    }
  },
  
  "sacred-heart": {
    name: "Sacred Heart Catholic Church",
    patron: "Sacred Heart of Jesus",
    colors: {
      primary: "#B22222",
      secondary: "#FFD700",
      accent: "#FFFFFF",
      background: "#FFFFFF",
      text: "#2C3E50"
    }
  }
}

// Utility function to merge configurations
export function createChurchConfig(override: Partial<ChurchConfig>): ChurchConfig {
  return {
    ...defaultChurchConfig,
    ...override,
    colors: {
      ...defaultChurchConfig.colors,
      ...override.colors
    },
    contact: {
      ...defaultChurchConfig.contact,
      ...override.contact
    },
    massSchedule: {
      ...defaultChurchConfig.massSchedule,
      ...override.massSchedule
    },
    features: {
      ...defaultChurchConfig.features,
      ...override.features
    }
  }
}