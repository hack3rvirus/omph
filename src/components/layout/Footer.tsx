import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-darkText text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-heading text-xl text-accentGold mb-4">OMP Chaplaincy</h3>
            <p className="font-body text-gray-300">
              Our Mother of Perpetual Help Chaplaincy, <br />
              Alex Ekwueme Federal University Teaching Hospital 1, <br />
              Abakaliki, Ebonyi State, Nigeria.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-xl text-accentGold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/mass-schedule" className="hover:text-accentGold">Mass Schedule</Link></li>
              <li><Link to="/contact" className="hover:text-accentGold">Contact Us</Link></li>
              <li><Link to="/news" className="hover:text-accentGold">Parish News</Link></li>
              <li><Link to="/admin" className="hover:text-accentGold">Admin Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-xl text-accentGold mb-4">Connect</h3>
            <p className="text-gray-300">
              {/* Add social media links here later */}
              Follow us on social media for daily updates and live streams.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Our Mother of Perpetual Help Chaplaincy. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;