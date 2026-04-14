
import React from 'react';
import Header from '../../Header/Header'; // Adjust the path to your Header component
import Footer from '../../Footer/Footer'; // Adjust the path to your Footer component

const ProfileLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-100 p-6">
        {children} {/* Dynamic content for the Profile page */}
      </main>
    </div>
  );
};