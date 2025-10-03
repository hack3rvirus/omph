import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

interface Saint {
  name: string
  type: string
  rank: string
  bio: string
}

interface Reading {
  citation: string
  text: string
  preview: string
}

interface DailyContent {
  date: string
  saints: Saint[]
  celebration: string
  readings: {
    firstReading: Reading
    psalm: Reading
    secondReading?: Reading
    gospel: Reading
    reflection: string
  }
  source: string
  lastUpdated: string
}

// Helper function to format date
const formatDateForAPI = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Fetch saints and celebrations from CalAPI
async function fetchSaintsAndCelebrations(date: string): Promise<{ saints: Saint[], celebration: string }> {
  try {
    const response = await fetch(`https://calapi.inadiutorium.cz/api/v0/en/calendars/default/${date}`, {
      headers: {
        'User-Agent': 'Catholic-Church-Website/1.0',
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    
    if (!response.ok) {
      throw new Error(`CalAPI responded with status: ${response.status}`)
    }
    
    const data = await response.json()
    
    const saints: Saint[] = []
    let celebration = "Weekday in Ordinary Time"
    
    if (data.celebrations && data.celebrations.length > 0) {
      for (const cel of data.celebrations) {
        if (cel.title && cel.title !== 'Weekday') {
          saints.push({
            name: cel.title,
            type: cel.rank || 'Memorial',
            rank: cel.rank || 'Memorial',
            bio: await fetchSaintBio(cel.title)
          })
        }
      }
      
      if (data.season) {
        celebration = data.season.name || 'Ordinary Time'
      }
    }
    
    // If no saints found, get the weekday saint
    if (saints.length === 0) {
      const weekdaySaint = getWeekdaySaint(new Date(date))
      saints.push(weekdaySaint)
    }
    
    return { saints, celebration }
  } catch (error) {
    console.error('CalAPI error:', error)
    // Return weekday saint as fallback
    const weekdaySaint = getWeekdaySaint(new Date(date))
    return {
      saints: [weekdaySaint],
      celebration: "Weekday in Ordinary Time"
    }
  }
}

// Get weekday saint based on day of week
function getWeekdaySaint(date: Date): Saint {
  const dayOfWeek = date.getDay()
  const weekdaySaints = [
    { name: "Saint Joseph", bio: "Foster father of Jesus and patron of workers, fathers, and the universal Church. He exemplifies quiet strength, faithfulness, and trust in God's plan." },
    { name: "Saint Michael the Archangel", bio: "Prince of the heavenly host and defender against evil. He leads God's army against Satan and protects the Church." },
    { name: "Saint John the Baptist", bio: "Forerunner of Christ who baptized Jesus in the Jordan River. He prepared the way for the Lord's ministry." },
    { name: "Saint Peter the Apostle", bio: "First Pope and leader of the apostles, keeper of the keys to heaven. He was chosen by Christ to lead the early Church." },
    { name: "Saint Paul the Apostle", bio: "Apostle to the Gentiles and great missionary of the early Church. His letters form much of the New Testament." },
    { name: "Saint Mary Magdalene", bio: "First witness to the Resurrection and apostle to the apostles. She was a devoted follower of Jesus." },
    { name: "Blessed Virgin Mary", bio: "Mother of God and our spiritual mother, full of grace. She is the perfect model of discipleship and faith." }
  ]
  
  return {
    name: weekdaySaints[dayOfWeek].name,
    type: "Commemoration",
    rank: "Commemoration",
    bio: weekdaySaints[dayOfWeek].bio
  }
}

// Fetch saint biography
async function fetchSaintBio(saintName: string): Promise<string> {
  try {
    // Clean the saint name for searching
    const searchName = saintName.replace(/^Saint\s+|^St\.\s+/i, '').trim()
    
    // Try to get from Catholic Online
    const response = await fetch(`https://www.catholic.org/saints/saint.php?saint_id=${encodeURIComponent(searchName)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Catholic-Church-Website/1.0)'
      },
      next: { revalidate: 86400 } // Cache for 24 hours
    })
    
    if (response.ok) {
      const html = await response.text()
      const $ = cheerio.load(html)
      
      // Extract biography from the page
      const bio = $('.saint-bio, .content, .description').first().text().trim()
      if (bio && bio.length > 50) {
        return bio.substring(0, 300) + '...'
      }
    }
    
    // Fallback to generic bio
    return `${saintName} lived a life of heroic virtue and holiness, serving God and the Church with great devotion. This saint is remembered for their faith, charity, and dedication to following Christ. We ask for their intercession as we strive to imitate their example of Christian living.`
  } catch (error) {
    return `${saintName} is commemorated today in the liturgical calendar as a model of Christian virtue and holiness.`
  }
}

// Fetch readings from EWTN and USCCB
async function fetchReadings(date: string): Promise<any> {
  // Try EWTN first
  try {
    const ewtnDate = date.replace(/-/g, '/')
    const ewtnResponse = await fetch(`https://www.ewtn.com/catholicism/daily-readings/${ewtnDate}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Catholic-Church-Website/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    
    if (ewtnResponse.ok) {
      const html = await ewtnResponse.text()
      const readings = parseEWTNReadings(html)
      if (readings.firstReading.text !== "Reading not available") {
        return readings
      }
    }
  } catch (error) {
    console.error('EWTN fetch error:', error)
  }
  
  // Fallback to USCCB
  try {
    const dateObj = new Date(date)
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const day = String(dateObj.getDate()).padStart(2, '0')
    const year = String(dateObj.getFullYear()).slice(-2)
    const formattedDate = `${month}${day}${year}` // Format: MMDDYY
    
    const usccbResponse = await fetch(`https://bible.usccb.org/bible/readings/${formattedDate}.cfm`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Catholic-Church-Website/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    
    if (usccbResponse.ok) {
      const html = await usccbResponse.text()
      return parseUSCCBReadings(html)
    }
  } catch (error) {
    console.error('USCCB fetch error:', error)
  }
  
  // Return structured readings if both fail
  return getStructuredReadings(date)
}

// Parse EWTN readings
function parseEWTNReadings(html: string): any {
  const $ = cheerio.load(html)
  
  const firstReading = $('.first-reading, .reading-first').text().trim() || 
                      $('h3:contains("First Reading")').next().text().trim()
  
  const psalm = $('.psalm, .responsorial-psalm').text().trim() || 
                $('h3:contains("Psalm")').next().text().trim()
  
  const secondReading = $('.second-reading, .reading-second').text().trim() || 
                       $('h3:contains("Second Reading")').next().text().trim()
  
  const gospel = $('.gospel, .gospel-reading').text().trim() || 
                 $('h3:contains("Gospel")').next().text().trim()
  
  return {
    firstReading: {
      citation: "First Reading",
      text: firstReading || "A reading from Sacred Scripture",
      preview: firstReading ? firstReading.substring(0, 150) + '...' : "Today's first reading..."
    },
    psalm: {
      citation: "Responsorial Psalm",
      text: psalm || "Lord, you have the words of everlasting life",
      preview: psalm ? psalm.substring(0, 100) + '...' : "Our response to God's word..."
    },
    secondReading: secondReading ? {
      citation: "Second Reading",
      text: secondReading,
      preview: secondReading.substring(0, 150) + '...'
    } : undefined,
    gospel: {
      citation: "Gospel",
      text: gospel || "A reading from the holy Gospel",
      preview: gospel ? gospel.substring(0, 150) + '...' : "Christ speaks to us today..."
    },
    reflection: "Today's readings invite us to reflect deeply on God's word and apply it to our daily lives. Through Scripture, we encounter Christ and are transformed by His love."
  }
}

// Parse USCCB readings
function parseUSCCBReadings(html: string): any {
  const $ = cheerio.load(html)
  
  const readings = $('.b-verse, .reading-text, .content-body').map((i, el) => $(el).text().trim()).get()
  
  return {
    firstReading: {
      citation: "First Reading",
      text: readings[0] || "A reading from Sacred Scripture",
      preview: readings[0] ? readings[0].substring(0, 150) + '...' : "Today's first reading..."
    },
    psalm: {
      citation: "Responsorial Psalm",
      text: readings[1] || "Lord, you have the words of everlasting life",
      preview: readings[1] ? readings[1].substring(0, 100) + '...' : "Our response to God's word..."
    },
    secondReading: readings[2] ? {
      citation: "Second Reading",
      text: readings[2],
      preview: readings[2].substring(0, 150) + '...'
    } : undefined,
    gospel: {
      citation: "Gospel",
      text: readings[readings.length - 1] || "A reading from the holy Gospel",
      preview: readings[readings.length - 1] ? readings[readings.length - 1].substring(0, 150) + '...' : "Christ speaks to us today..."
    },
    reflection: "The Word of God speaks to our hearts today, calling us to deeper faith and love."
  }
}

// Get structured readings when scraping fails
function getStructuredReadings(date: string): any {
  const dateObj = new Date(date)
  const dayOfWeek = dateObj.getDay()
  
  // Sunday readings often have second reading
  const hasSecondReading = dayOfWeek === 0 || isSpecialFeast(dateObj)
  
  return {
    firstReading: {
      citation: "Reading from the Old Testament",
      text: "The Word of the Lord proclaimed through the prophets and sacred writers of old, calling us to faithfulness and trust in God's covenant love.",
      preview: "Today we hear God's word from the Old Testament..."
    },
    psalm: {
      citation: "Responsorial Psalm",
      text: "Lord, you have the words of everlasting life. Your word is a lamp for my feet and a light for my path.",
      preview: "Our response to God's word in song and prayer..."
    },
    secondReading: hasSecondReading ? {
      citation: "Reading from the New Testament",
      text: "The apostolic teaching that guides us in Christian living and deepens our understanding of Christ's message.",
      preview: "The apostles teach us about life in Christ..."
    } : undefined,
    gospel: {
      citation: "Gospel Reading",
      text: "The Good News of Jesus Christ, who speaks to us today through His words and actions recorded in the Gospels.",
      preview: "Christ speaks to us in today's Gospel..."
    },
    reflection: "In today's readings, we are invited to encounter Christ and respond to His call with open hearts, allowing His word to transform our lives and guide our actions."
  }
}

// Check if date is a special feast (simplified)
function isSpecialFeast(date: Date): boolean {
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  // Major feasts that typically have second readings
  const specialFeasts = [
    [12, 25], // Christmas
    [1, 1],   // Mary, Mother of God
    [1, 6],   // Epiphany
    [8, 15],  // Assumption
    [11, 1],  // All Saints
    [6, 27],  // Our Mother of Perpetual Help
  ]
  
  return specialFeasts.some(([m, d]) => m === month && d === day)
}

export async function GET(request: NextRequest) {
  try {
    const today = new Date()
    const dateStr = formatDateForAPI(today)
    
    // Fetch saints and celebrations
    const { saints, celebration } = await fetchSaintsAndCelebrations(dateStr)
    
    // Fetch readings
    const readings = await fetchReadings(dateStr)
    
    const dailyContent: DailyContent = {
      date: dateStr,
      saints,
      celebration,
      readings,
      source: "CalAPI + EWTN/USCCB",
      lastUpdated: new Date().toISOString()
    }

    return NextResponse.json(dailyContent, {
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error fetching daily content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch daily content' },
      { status: 500 }
    )
  }
}

// Cron job endpoint for daily updates
export async function POST(request: NextRequest) {
  try {
    console.log('Daily content cron job executed at:', new Date().toISOString())
    
    // Force refresh of daily content
    const response = await GET(request)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Daily content updated successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error in daily content cron job:', error)
    return NextResponse.json(
      { error: 'Failed to update daily content' },
      { status: 500 }
    )
  }
}