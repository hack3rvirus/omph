import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Society {
  slug: string;
  name: string;
  patron: string;
  history: string;
  mission: string;
  prayers: string[];
  facts: string[];
}

const societiesData: Society[] = [
  {
    slug: 'legion-of-mary',
    name: 'Legion of Mary',
    patron: 'Blessed Virgin Mary',
    history: 'Founded in Dublin, Ireland, in 1921 by Frank Duff, the Legion of Mary is a lay apostolic organization dedicated to the spiritual development of its members through prayer and active apostolate.',
    mission: 'To lead people to Christ through Mary, fostering devotion to Our Lady and engaging in evangelization, charity, and social work.',
    prayers: ['Ave Maria', 'Salve Regina', 'Magnificat'],
    facts: ['Over 3 million active members worldwide', 'Present in over 170 countries', 'Known for its Marian spirituality and apostolic zeal']
  },
  {
    slug: 'st-vincent-de-paul-society',
    name: 'St. Vincent de Paul Society',
    patron: 'St. Vincent de Paul',
    history: 'Established in 1833 in Paris by Frédéric Ozanam and Emmanuel Bailly, inspired by the life of St. Vincent de Paul, to help the poor and marginalized.',
    mission: 'To serve Christ in the poor with love, dignity, and respect, providing material and spiritual assistance.',
    prayers: ['Prayer to St. Vincent de Paul', 'Our Father', 'Hail Mary'],
    facts: ['Serves over 30 million people annually', 'Over 800,000 volunteers worldwide', 'Focuses on systemic change to combat poverty']
  },
  {
    slug: 'catholic-womens-league',
    name: 'Catholic Women\'s League',
    patron: 'Blessed Virgin Mary',
    history: 'Founded in 1902 in Canada, the CWL promotes Catholic values through education, charity, and social justice initiatives.',
    mission: 'To unite Catholic women in faith, service, and leadership for the betterment of society.',
    prayers: ['Ave Maria', 'Act of Consecration to Mary', 'Rosary'],
    facts: ['Over 100,000 members in Canada', 'Involved in pro-life advocacy', 'Supports Catholic education and healthcare']
  },
  {
    slug: 'knights-of-columbus',
    name: 'Knights of Columbus',
    patron: 'Blessed Virgin Mary',
    history: 'Founded in 1882 in New Haven, Connecticut, by Father Michael J. McGivney, as a fraternal organization for Catholic men.',
    mission: 'To promote charity, unity, fraternity, and patriotism among Catholic men, supporting the Church and community.',
    prayers: ['Our Father', 'Hail Mary', 'Glory Be'],
    facts: ['Over 2 million members worldwide', 'Largest Catholic fraternal organization', 'Provides insurance and charitable programs']
  },
  // Add more societies as needed
];

const SocietyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const society = societiesData.find(s => s.slug === slug);

  if (!society) {
    return (
      <div className="py-16 bg-beigeBg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl text-navyBlue mb-4">Society Not Found</h1>
          <p className="font-body text-darkText">The requested society page does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-beigeBg">
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-5xl text-center text-navyBlue mb-4"
        >
          {society.name}
        </motion.h1>
        <p className="font-body text-lg text-center text-darkText mb-12">
          Patron: {society.patron}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* History and Mission */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <h2 className="font-heading text-2xl text-navyBlue mb-6">History</h2>
            <p className="font-body text-darkText mb-8 leading-relaxed">{society.history}</p>
            <h2 className="font-heading text-2xl text-navyBlue mb-4">Mission</h2>
            <p className="font-body text-darkText leading-relaxed">{society.mission}</p>
          </motion.div>

          {/* Prayers and Facts */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <h2 className="font-heading text-2xl text-navyBlue mb-6">Common Prayers</h2>
            <ul className="font-body text-darkText mb-8 list-disc list-inside">
              {society.prayers.map((prayer, index) => (
                <li key={index}>{prayer}</li>
              ))}
            </ul>
            <h2 className="font-heading text-2xl text-navyBlue mb-4">Interesting Facts</h2>
            <ul className="font-body text-darkText list-disc list-inside">
              {society.facts.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SocietyDetail;
