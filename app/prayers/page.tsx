'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Cross, Star, Crown, Book, ChevronDown, ChevronUp } from 'lucide-react'

const prayerCategories = [
  {
    title: 'Traditional Catholic Prayers',
    icon: Cross,
    prayers: [
      {
        name: 'The Sign of the Cross',
        text: 'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.'
      },
      {
        name: 'Our Father',
        text: 'Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.'
      },
      {
        name: 'Hail Mary',
        text: 'Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.'
      },
      {
        name: 'Glory Be',
        text: 'Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.'
      },
      {
        name: 'Apostles\' Creed',
        text: 'I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.'
      }
    ]
  },
  {
    title: 'Marian Prayers',
    icon: Star,
    prayers: [
      {
        name: 'The Holy Rosary - How to Pray',
        text: 'Begin with the Sign of the Cross and the Apostles\' Creed. Then pray one Our Father, three Hail Marys, and one Glory Be. For each decade, announce the mystery, pray one Our Father, ten Hail Marys while meditating on the mystery, and one Glory Be. End with the Hail Holy Queen.'
      },
      {
        name: 'Joyful Mysteries (Monday & Saturday)',
        text: '1. The Annunciation - The angel Gabriel announces to Mary that she will bear the Son of God.\n2. The Visitation - Mary visits her cousin Elizabeth, who is pregnant with John the Baptist.\n3. The Nativity - Jesus is born in Bethlehem.\n4. The Presentation - Mary and Joseph present Jesus in the Temple.\n5. The Finding in the Temple - Jesus is found teaching in the Temple at age twelve.'
      },
      {
        name: 'Memorare',
        text: 'Remember, O most gracious Virgin Mary, that never was it known that anyone who fled to thy protection, implored thy help, or sought thy intercession was left unaided. Inspired with this confidence, I fly to thee, O Virgin of virgins, my Mother; to thee do I come; before thee I stand, sinful and sorrowful. O Mother of the Word Incarnate, despise not my petitions, but in thy mercy hear and answer me. Amen.'
      },
      {
        name: 'Prayer to Our Mother of Perpetual Help',
        text: 'Mother of Perpetual Help, you have been blessed and favored by God. You became not only the Mother of the Redeemer, but the Mother of the redeemed as well. We come to you today as your loving children. Watch over us and take care of us. As you held the child Jesus in your loving arms, so take us in your arms. Be a mother ready at every moment to help us. Amen.'
      }
    ]
  },
  {
    title: 'Devotional Prayers',
    icon: Heart,
    prayers: [
      {
        name: 'Prayer to the Sacred Heart of Jesus',
        text: 'O most holy Heart of Jesus, fountain of every blessing, I adore You, I love You, and with lively sorrow for my sins I offer You this poor heart of mine. Make me humble, patient, pure and wholly obedient to Your will. Grant, Good Jesus, that I may live in You and for You. Protect me in the midst of danger. Comfort me in my afflictions. Give me health of body, assistance in my temporal needs, Your blessing on all that I do, and the grace of a holy death. Amen.'
      },
      {
        name: 'Prayer to Saint Joseph',
        text: 'O Saint Joseph, whose protection is so great, so strong, so prompt before the throne of God, I place in you all my interests and desires. O Saint Joseph, do assist me by your powerful intercession and obtain for me from your divine Son all spiritual blessings through Jesus Christ, our Lord. Amen.'
      },
      {
        name: 'Guardian Angel Prayer',
        text: 'Angel of God, my guardian dear, to whom God\'s love commits me here, ever this day be at my side, to light and guard, to rule and guide. Amen.'
      }
    ]
  }
]

export default function PrayersPage() {
  const [expandedPrayer, setExpandedPrayer] = useState<string | null>(null)

  const togglePrayer = (prayerName: string) => {
    setExpandedPrayer(expandedPrayer === prayerName ? null : prayerName)
  }

  return (
    <div className="min-h-screen bg-church-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-church-primary to-church-secondary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heart className="w-16 h-16 text-white mx-auto mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Catholic Prayers
            </h1>
            <p className="text-white text-xl max-w-3xl mx-auto leading-relaxed">
              Traditional prayers that have nourished Catholic souls for centuries
            </p>
          </motion.div>
        </div>
      </section>

      {/* Prayer Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {prayerCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * categoryIndex }}
            className="mb-12"
          >
            <div className="flex items-center mb-8">
              <category.icon className="w-8 h-8 text-church-primary mr-4" />
              <h2 className="font-serif text-3xl font-bold text-church-text">
                {category.title}
              </h2>
            </div>

            <div className="space-y-4">
              {category.prayers.map((prayer, prayerIndex) => (
                <div key={prayer.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <button
                    onClick={() => togglePrayer(prayer.name)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-serif text-lg font-semibold text-church-text">
                      {prayer.name}
                    </h3>
                    {expandedPrayer === prayer.name ? (
                      <ChevronUp className="w-5 h-5 text-church-primary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-church-primary" />
                    )}
                  </button>
                  
                  {expandedPrayer === prayer.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6"
                    >
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {prayer.text}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  )
}