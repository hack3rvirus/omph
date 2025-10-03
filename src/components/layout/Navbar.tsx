import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSocietiesDropdown, setShowSocietiesDropdown] = useState(false);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Doctrine', path: '/doctrine' },
    { title: 'Readings', path: '/readings' },
    { title: 'Saints', path: '/saints' },
    { title: 'Marketplace', path: '/marketplace' },
    { title: 'Intentions', path: '/intentions' },
    { title: 'News & Events', path: '/news-events' },
    { title: 'Prayer Wall', path: '/prayer-wall' },
  ];

  const societiesSubLinks = [
    { title: 'Legion of Mary', path: '/societies/legion' },
    { title: 'Knights of Columbus', path: '/societies/knights' },
    { title: 'Catholic Girls School (CGS)', path: '/societies/cgs' },
    { title: 'Charismatic Renewal', path: '/societies/charismatic' },
    { title: 'Altar Servers', path: '/societies/altar' },
    { title: 'Ushers', path: '/societies/ushers' },
    { title: 'Choir', path: '/societies/choir' },
    { title: 'Youth Group', path: '/societies/youth' },
    { title: 'Bible Study', path: '/societies/bible' },
    { title: 'Rosary Group', path: '/societies/rosary' },
  ];

  // NavLink style for active links
  const activeLinkStyle = {
    color: '#FFD700', // accentGold
    textDecoration: 'underline',
  };

  const handleSocietiesMouseEnter = () => setShowSocietiesDropdown(true);
  const handleSocietiesMouseLeave = () => setShowSocietiesDropdown(false);

  return (
    <nav className="bg-navyBlue shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-warmGold font-heading text-2xl font-bold">
          OMPH Chaplaincy
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center relative">
          {navLinks.map((link) => (
            <div key={link.title} className="relative">
              <NavLink
                to={link.path}
                className="text-white font-body hover:text-warmGold transition-colors duration-300"
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              >
                {link.title}
              </NavLink>
              {link.title === 'Societies' && (
                <div
                  onMouseEnter={handleSocietiesMouseEnter}
                  onMouseLeave={handleSocietiesMouseLeave}
                  className="absolute top-full left-0 mt-2 bg-navyBlue/95 backdrop-blur-sm rounded-lg shadow-lg py-2 min-w-[200px] z-10"
                >
                  <AnimatePresence>
                    {showSocietiesDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-1 px-4"
                      >
                        {societiesSubLinks.map((subLink) => (
                          <NavLink
                            key={subLink.title}
                            to={subLink.path}
                            className="block text-white font-body text-sm py-2 hover:text-warmGold transition-colors duration-300"
                            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                          >
                            {subLink.title}
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          ))}
          <Link to="/donate" className="bg-warmGold text-navyBlue font-bold py-2 px-4 rounded-full hover:bg-yellow-300 transition-colors duration-300">
            Donate
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
            {isOpen ? '×' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-navyBlue/95 backdrop-blur-sm absolute w-full"
          >
            <div className="flex flex-col items-center py-8 space-y-2">
              {navLinks.map((link) => (
                <div key={link.title}>
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-white font-body text-xl py-3 hover:text-warmGold transition-colors duration-300"
                    style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                  >
                    {link.title}
                  </NavLink>
                  {link.title === 'Societies' && (
                    <div className="space-y-1 px-4 w-full">
                      {societiesSubLinks.map((subLink) => (
                        <NavLink
                          key={subLink.title}
                          to={subLink.path}
                          onClick={() => setIsOpen(false)}
                          className="block text-white font-body text-lg py-2 hover:text-warmGold transition-colors duration-300 pl-4 border-l-2 border-transparent hover:border-warmGold"
                          style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                        >
                          {subLink.title}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link to="/donate" onClick={() => setIsOpen(false)} className="bg-warmGold text-navyBlue font-bold py-2 px-6 rounded-full hover:bg-yellow-300 transition-colors duration-300">
                Donate
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
