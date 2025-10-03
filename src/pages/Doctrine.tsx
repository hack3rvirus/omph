import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DoctrineQA {
  question: string;
  answer: string;
  references: string[];
}

const doctrineData: DoctrineQA[] = [
  {
    question: "What is the Holy Trinity?",
    answer: "The Holy Trinity is the central mystery of Christian faith and life. It is the mystery of one God in three Persons: Father, Son, and Holy Spirit. The three divine Persons are one in being and equal in power and glory, yet distinct in their relations to one another. This doctrine is rooted in the New Testament and was formally defined at the Councils of Nicaea (325 AD) and Constantinople (381 AD). God is not solitary; He is a communion of love, eternally existing as Father, Son, and Holy Spirit.",
    references: ["Catechism of the Catholic Church (CCC) 232-267", "Matthew 28:19", "John 1:1-14"]
  },
  {
    question: "What is the Eucharist?",
    answer: "The Eucharist is the 'source and summit of the Christian life.' It is the real presence of Jesus Christ under the appearances of bread and wine. Through transubstantiation, the substance of bread and wine is changed into the body, blood, soul, and divinity of Christ, while the accidents (appearance) remain. The Eucharist is both sacrifice and sacrament, re-presenting Christ's sacrifice on the Cross and nourishing us with His life. It unites us to Christ and to one another in the Church.",
    references: ["CCC 1322-1419", "John 6:51-58", "1 Corinthians 11:23-26"]
  },
  {
    question: "What is Transubstantiation?",
    answer: "Transubstantiation is the change of the whole substance of bread into the substance of the Body of Christ and of the whole substance of wine into the substance of the Blood of Christ. This change is brought about by the action of the Holy Spirit and the words of Christ spoken by the priest. The Church teaches that this is a mystery of faith, not a physical or chemical change, but a substantial conversion discernible by faith alone. It was defined at the Fourth Lateran Council (1215) and reaffirmed at Trent (1551).",
    references: ["CCC 1374-1377", "Council of Trent, Session XIII", "John 6:55"]
  },
  {
    question: "Who is Mary, and why do Catholics honor her?",
    answer: "Mary is the Mother of God (Theotokos), the Immaculate Conception, and the Queen of Heaven. Catholics honor her as the perfect disciple of Christ, chosen by God to bear the Savior. Her Immaculate Conception means she was preserved from original sin from the moment of her conception. Veneration of Mary (hyperdulia) is distinct from worship (latria) reserved for God alone. She intercedes for us as our spiritual mother, as seen at Cana and in Revelation 12.",
    references: ["CCC 963-975", "Luke 1:28-42", "Council of Ephesus (431 AD)"]
  },
  {
    question: "What is the role of the Pope?",
    answer: "The Pope is the visible head of the universal Church, the successor of St. Peter, and the Vicar of Christ on earth. He possesses full, supreme, and universal power over the Church, exercised in faith and morals with infallibility when teaching ex cathedra on doctrine. This primacy ensures unity and fidelity to the deposit of faith. The papacy began with Peter's confession (Matthew 16:18) and has continued through apostolic succession.",
    references: ["CCC 880-896", "Matthew 16:18-19", "Vatican I (1870)"]
  },
  {
    question: "What is Confession (Reconciliation)?",
    answer: "The Sacrament of Penance, or Reconciliation, is the means by which sins committed after Baptism are forgiven. It involves contrition, confession to a priest, absolution, and satisfaction. The priest acts in persona Christi, absolving sins through the power given by Christ (John 20:23). This sacrament restores grace, reconciles us to God and the Church, and provides spiritual healing. It is necessary for mortal sins.",
    references: ["CCC 1422-1498", "John 20:22-23", "James 5:16"]
  },
  {
    question: "What is the Bible, and how is it inspired?",
    answer: "The Bible is the inspired Word of God, written by human authors under the guidance of the Holy Spirit. It consists of 73 books: 46 in the Old Testament and 27 in the New Testament. Inspiration means God is the principal author, ensuring the truth for our salvation. The canon was defined by councils like Hippo (393) and Carthage (397). Catholics interpret Scripture within Tradition and the Magisterium.",
    references: ["CCC 101-141", "2 Timothy 3:16", "Dei Verbum (Vatican II)"]
  },
  {
    question: "What are the Seven Sacraments?",
    answer: "The Seven Sacraments are outward signs instituted by Christ to give grace: Baptism (removes original sin), Confirmation (strengthens Baptism), Eucharist (real presence), Penance (forgives sins), Anointing of the Sick (heals body/soul), Holy Orders (ordains ministers), Matrimony (unites spouses). They are efficacious signs of grace, divided into initiation, healing, and service sacraments.",
    references: ["CCC 1113-1134", "John 20:23", "Council of Trent"]
  },
  {
    question: "What is Purgatory?",
    answer: "Purgatory is the final purification of the elect after death, for those who die in God's grace but still imperfectly purified. It is a state of cleansing fire for venial sins and temporal punishment, preparing souls for heaven. Prayers and Masses for the dead aid this process. The doctrine is implied in 2 Maccabees and 1 Corinthians 3:15, defined at Florence (1439) and Trent.",
    references: ["CCC 1030-1032", "2 Maccabees 12:46", "1 Corinthians 3:11-15"]
  },
  {
    question: "Why do Catholics pray to saints?",
    answer: "Catholics ask saints for intercession, not worship. Saints are alive in Christ and part of the communion of saints, praying for us as friends in heaven. This is like asking living friends to pray. The practice is biblical (Revelation 5:8, 8:3-4) and traditional, honoring God's work in their lives. Canonized saints are infallibly declared in heaven.",
    references: ["CCC 946-962", "Revelation 5:8", "Hebrews 12:1"]
  },
  // Add more up to 50+ in production, sourced from CCC/Vatican
  // For brevity, 10 here; expand with real content from usccb.org/vatican.va
  {
    question: "What is the Immaculate Conception?",
    answer: "The Immaculate Conception is the dogma that Mary was conceived without original sin by a singular grace from God, in view of her role as Mother of the Redeemer. Defined by Pope Pius IX in 1854 (Ineffabilis Deus), it honors Mary's total dedication to God from her first moment. It is not the Virgin Birth of Jesus.",
    references: ["CCC 490-493", "Luke 1:28", "Ineffabilis Deus (1854)"]
  },
  {
    question: "What is Limbo?",
    answer: "Limbo is a theological hypothesis, not dogma, for unbaptized infants who die without personal sin but with original sin. The Church hopes in God's mercy for their salvation, entrusting them to Christ. Recent theology emphasizes God's desire for all to be saved (1 Timothy 2:4), without definitive teaching on their fate.",
    references: ["CCC 1261", "International Theological Commission (2007)", "1 Timothy 2:4"]
  },
  {
    question: "What is the Magisterium?",
    answer: "The Magisterium is the Church's teaching authority, exercised by the Pope and bishops in communion with him, to authentically interpret Scripture and Tradition. It is ordinary (daily teaching) or extraordinary (infallible definitions). It guards the deposit of faith for the salvation of souls.",
    references: ["CCC 85-100", "Lumen Gentium 25", "Dei Verbum 10"]
  },
  {
    question: "Why celibacy for priests?",
    answer: "Priestly celibacy is a discipline in the Latin Rite, symbolizing total dedication to Christ and the Church, imitating the Apostles. It configures the priest to Christ the Bridegroom. While not a doctrine, it is highly valued for undivided service. Eastern Rites allow married priests.",
    references: ["CCC 1579-1580", "Presbyterorum Ordinis 16", "1 Corinthians 7:32-35"]
  },
  {
    question: "What is the Rosary?",
    answer: "The Rosary is a Scripture-based prayer honoring Mary, meditating on the mysteries of Christ's life (Joyful, Sorrowful, Glorious, Luminous). It consists of Hail Marys, Our Fathers, and Glory Bes, promoting contemplation. Introduced in the 13th century by St. Dominic, it is a powerful weapon against evil.",
    references: ["CCC 971", "Rosarium Virginis Mariae (John Paul II)", "Luke 1:28"]
  },
  // Continue with 35+ more, e.g., Indulgences, Relics, Angels, Original Sin, etc.
  // Example additional:
  {
    question: "What are Indulgences?",
    answer: "An indulgence is the remission before God of the temporal punishment due to sins whose guilt has already been forgiven. Partial indulgences remit part, plenary the whole. They are drawn from the Church's treasury of merits, applied by the Church. Gained through prayer, works of mercy, etc.",
    references: ["CCC 1471-1479", "Enchiridion Indulgentiarum", "Council of Trent"]
  },
  // ... (expand to 50+ in full implementation)
];

const Doctrine = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredData = doctrineData.filter(qa => 
    qa.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    qa.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-16 bg-beigeBg">
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-5xl text-center text-navyBlue mb-4"
        >
          Catholic Doctrine Q&A
        </motion.h1>
        <p className="font-body text-lg text-center text-darkText mb-12">
          Explore key teachings of the Catholic Church with references to Scripture, Catechism, and Tradition.
        </p>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search questions or answers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md mx-auto block p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navyBlue"
          />
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredData.map((qa, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full p-6 text-left font-heading text-xl text-navyBlue hover:bg-beigeBg transition-all"
              >
                <span className="mr-2">{openIndex === index ? '▼' : '▶'}</span>
                {qa.question}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-gray-50">
                      <p className="font-body text-darkText mb-4 leading-relaxed">{qa.answer}</p>
                      <div className="font-body text-sm text-gray-600">
                        <strong>References:</strong>
                        <ul className="list-disc list-inside mt-2">
                          {qa.references.map((ref, i) => (
                            <li key={i}>{ref}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <p className="text-center text-darkText mt-8">No results found. Try a different search term.</p>
        )}
      </div>
    </div>
  );
};

export default Doctrine;
