import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading text-primaryBlue mb-6">About Our Mother of Perpetual Help Chaplaincy</h1>
      <p className="text-lg text-gray-700 mb-4">
        Founded in 2000, Our Mother of Perpetual Help Chaplaincy serves the spiritual needs of the AEFUTHA 1 community in Nigeria.
        We are dedicated to fostering faith, community, and service in the spirit of Our Lady of Perpetual Help.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Our mission is to provide a welcoming space for worship, prayer, and fellowship, drawing inspiration from the Catholic tradition
        and the intercession of Our Mother of Perpetual Help.
      </p>
      <h2 className="text-2xl font-heading text-primaryBlue mb-4">Our Patron Saint</h2>
      <p className="text-lg text-gray-700">
        Our Lady of Perpetual Help, also known as Our Mother of Perpetual Succour, is a Catholic title of the Blessed Virgin Mary.
        The image depicts the Virgin Mary holding the Child Jesus, who is frightened by symbols of his passion.
      </p>
    </div>
  );
};

export default About;
