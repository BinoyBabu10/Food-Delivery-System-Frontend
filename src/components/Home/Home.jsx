// src/components/Home/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuDisplay from '../Customer/Dashboard/MenuDisplay'; // Adjust path if necessary
import RestaurantCards from '../Customer/Dashboard/RestaurantCards'; // Adjust path if necessary

// Updated dummy images for the banner slider
const bannerImages = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Delicious array of dishes
    "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Delicious pasta
    "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Burger and fries
    "https://images.pexels.com/photos/1482803/pexels-photo-1482803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Pizza slices
];

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); 



    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerImages.length);
        }, 5000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='bg-gradient-to-br from-blue-50 to-indigo-100'>
        <div className="mx-auto  max-w-7xl pt-16  "> {/* Add padding-top to account for Navbar */}

            {/* --- Large Sliding Banner Section --- */}
            <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-xl mb-12">
                {bannerImages.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Banner ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                ))}
                 <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                        <h1 className="text-6xl font-extrabold mb-4 animate-fade-in-up">
                            Craving Something Delicious?
                        </h1>
                        <p className="text-xl mb-8 animate-fade-in-up delay-200">
                            Order from your favorite restaurants, delivered fast!
                        </p>
                        <Link
                            className="inline-flex text-white items-center px-8 py-4 text-xl font-bold bg-orange-600 rounded-full shadow-lg hover:bg-orange-700 transition duration-300 transform hover:scale-105 animate-fade-in-up delay-400"
                            to="/customer-management/select-location" // Link to a relevant page for customer to start ordering
                        >
                            Start Your Order
       
                              
            
                        </Link>
                    </div>
                </div>
            </div>
            {/* --- Categories Section --- */}
    <section className="py-2  rounded-lg mb-12">
        {/* <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 px-4 sm:px-6 lg:px-8">Explore Categories</h2> */}
        {/* MenuDisplay itself should handle its internal horizontal padding if needed */}
        <MenuDisplay />
    </section>

    {/* --- Restaurants Section --- */}
    <section className=" py-2 rounded-lg ">
        {/* <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 px-4 sm:px-6 lg:px-8">Top Restaurants Near You</h2> */}
        {/* RestaurantCards itself should handle its internal horizontal padding if needed */}
        <RestaurantCards />
    </section>
        
        </div>
        </div>
    );
}

















