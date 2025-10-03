import { NextRequest, NextResponse } from 'next/server'

interface ChatRequest {
  message: string
}

// Enhanced Catholic knowledge base
const catholicKnowledge = [
  {
    keywords: ['sacraments', 'seven sacraments', 'sacrament'],
    response: "The seven sacraments of the Catholic Church are: **Baptism** (initiation into the Church), **Confirmation** (strengthening by the Holy Spirit), **Eucharist** (Holy Communion - the Body and Blood of Christ), **Penance** (Confession - forgiveness of sins), **Anointing of the Sick** (healing and comfort), **Holy Orders** (ordination of priests and deacons), and **Matrimony** (marriage). Each sacrament is a visible sign of God's invisible grace, instituted by Christ. (Source: Catechism of the Catholic Church, 1131)"
  },
  {
    keywords: ['trinity', 'holy trinity', 'father son holy spirit'],
    response: "The Holy Trinity is the central mystery of Christian faith - **one God in three divine Persons**: the Father, the Son (Jesus Christ), and the Holy Spirit. These three Persons are distinct yet completely one in essence and nature. The Father is the source, the Son is the Word made flesh, and the Holy Spirit is the love between them, proceeding from both. (Source: Catechism of the Catholic Church, 253-256)"
  },
  {
    keywords: ['mass', 'holy mass', 'eucharist', 'communion'],
    response: "The Mass is the central act of Catholic worship, where we celebrate the Eucharist - the true Body and Blood of Jesus Christ. It consists of two main parts: the **Liturgy of the Word** (readings from Scripture and homily) and the **Liturgy of the Eucharist** (consecration and communion). During the consecration, bread and wine become the actual Body and Blood of Christ through transubstantiation. (Source: Catechism of the Catholic Church, 1345-1355)"
  },
  {
    keywords: ['mary', 'virgin mary', 'mother of god', 'blessed virgin'],
    response: "Mary is the **Mother of God** (Theotokos), conceived without sin (Immaculate Conception), and assumed into heaven body and soul. She is our spiritual mother and powerful intercessor who leads us closer to her Son, Jesus. Catholics honor Mary through prayers like the Rosary, devotions, and feast days. She is the perfect model of faith and discipleship. (Source: Catechism of the Catholic Church, 963-975)"
  },
  {
    keywords: ['prayer', 'how to pray', 'praying'],
    response: "Prayer is **conversation with God** - speaking and listening to our Creator. Catholics pray through various forms: **vocal prayers** (like the Our Father and Hail Mary), **mental prayer** (meditation and reflection), **liturgical prayer** (Mass and Divine Office), and **contemplation** (silent union with God). Jesus taught us the Our Father as the perfect prayer. Set aside time daily for prayer, and remember God is always listening. (Source: Catechism of the Catholic Church, 2559-2565)"
  },
  {
    keywords: ['saints', 'saint', 'intercession', 'patron saint'],
    response: "Saints are **holy men and women** who lived lives of heroic virtue and are now in heaven with God. They intercede for us before God's throne and serve as models of Christian living. We can ask for their prayers (not worship them) and imitate their virtues. Each saint has particular patronages - areas where they especially help us. The communion of saints connects all believers across heaven, earth, and purgatory. (Source: Catechism of the Catholic Church, 946-962)"
  },
  {
    keywords: ['bible', 'scripture', 'word of god'],
    response: "The Bible is the **inspired Word of God**, written by human authors under the guidance of the Holy Spirit. It contains 73 books (46 Old Testament, 27 New Testament) and is the foundation of our faith alongside Sacred Tradition. Catholics are encouraged to read Scripture daily, especially the Gospels. The Church provides guidance for proper interpretation through the Magisterium. (Source: Catechism of the Catholic Church, 101-141)"
  },
  {
    keywords: ['confession', 'penance', 'reconciliation', 'forgiveness'],
    response: "The Sacrament of Penance (Confession) is God's gift of **forgiveness and healing**. Through this sacrament, we confess our sins to a priest, receive absolution, and are reconciled with God and the Church. The priest acts in the person of Christ (in persona Christi). Regular confession helps us grow in holiness and receive grace to avoid sin. All confessions are completely confidential under the seal of confession. (Source: Catechism of the Catholic Church, 1422-1498)"
  },
  {
    keywords: ['rosary', 'hail mary', 'our father'],
    response: "The **Rosary** is a powerful Marian prayer combining vocal and mental prayer. We meditate on the mysteries of Christ's life while praying the Our Father, Hail Mary, and Glory Be. The Hail Mary comes from Scripture: the angel Gabriel's greeting and Elizabeth's words to Mary. The Rosary helps us contemplate Jesus through Mary's eyes and is a weapon against evil. Pray it daily if possible. (Source: Pope St. John Paul II, Rosarium Virginis Mariae)"
  },
  {
    keywords: ['heaven', 'eternal life', 'afterlife'],
    response: "**Heaven** is eternal life with God - perfect happiness, peace, and love forever. It's not just a place but a state of being in perfect communion with the Trinity. We prepare for heaven through faith, good works, and the sacraments. Those who die in God's grace and friendship, purified of all sin, live forever with Christ. Heaven exceeds all human understanding - 'eye has not seen, ear has not heard' what God has prepared. (Source: Catechism of the Catholic Church, 1023-1029)"
  }
]

function findResponse(message: string): string | null {
  const lowercaseMessage = message.toLowerCase()
  
  for (const item of catholicKnowledge) {
    if (item.keywords.some(keyword => lowercaseMessage.includes(keyword))) {
      return item.response
    }
  }
  
  return null
}

export async function POST(request: NextRequest) {
  try {
    const { message }: ChatRequest = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Try to find a response in our knowledge base
    let response = findResponse(message)

    if (!response) {
      // Enhanced default response with more helpful guidance
      response = `Thank you for your question about Catholic faith. While I'm still expanding my knowledge base, I recommend consulting these reliable sources for authoritative answers:

**📖 Primary Sources:**
• **The Catechism of the Catholic Church** - Official teaching
• **Your parish priest or chaplain** - Personal guidance
• **Catholic.com** - Comprehensive Q&A database
• **Vatican.va** - Official Church documents

**🙏 For Spiritual Guidance:**
• **Confession** - Speak with a priest about personal matters
• **Spiritual Direction** - Regular guidance from a spiritual director
• **Catholic Bible Study** - Join a parish study group

**📱 Helpful Apps:**
• **Laudate** - Catholic prayers and readings
• **iBreviary** - Divine Office prayers
• **Catholic Bible** - Scripture with commentary

For questions specific to our chaplaincy (Mass times, events, sacraments), please contact our pastoral team directly. 

**Remember:** While I can provide general Catholic teaching, always consult with clergy for personal spiritual matters, sacramental questions, or complex theological issues.

Is there a specific aspect of Catholic faith you'd like to explore? I can help with topics like prayer, saints, sacraments, or Scripture.`
    }

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
      source: 'ASK A PADRE AI - Catholic Knowledge Base'
    })

  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: 'Failed to process your message. Please try again.' },
      { status: 500 }
    )
  }
}