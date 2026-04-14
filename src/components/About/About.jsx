// import React from 'react'

// export default function About() {
//   return (
//       <div className="py-16 bg-white">
//           <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
//               <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
//                   <div className="md:5/12 lg:w-5/12">
//                       <img
//                           src="https://play-lh.googleusercontent.com/s6FHg1NWwX1xpeuzGXzAt56KiwFjRgt2tYDlFe-okstp3ySAHbxKrF8tEuqiS4hl4i4"
//                           alt="image"
//                       />
//                   </div>
//                   <div className="md:7/12 lg:w-6/12">
//                       <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
//                           React development is carried out by passionate developers
//                       </h2>
//                       <p className="mt-6 text-gray-600">
//                           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem
//                           accusantium nemo perspiciatis delectus atque autem! Voluptatum tenetur beatae unde
//                           aperiam, repellat expedita consequatur! Officiis id consequatur atque doloremque!
//                       </p>
//                       <p className="mt-4 text-gray-600">
//                           Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at?
//                           Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.
//                       </p>
//                   </div>
//               </div>
//           </div>
//       </div>
//   );
// }




// import React from 'react';

// export default function About() {
//   return (
//     <div className="py-16 bg-gray-900 text-gray-300">
//       <div className="container m-auto px-6 md:px-12 xl:px-6">
//         <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
//           <div className="md:5/12 lg:w-5/12">
//             <img
//               // New image URL: A person holding a food delivery bag
//               src="public\img\hero-img.png"
//               alt="Fast and Fresh Food Delivery" // Updated alt text
//               // IMPORTANT: Remove 'filter invert brightness-0' if the image already looks good on dark background
//               // This specific image is already light, so you'll likely want to remove this class.
//               // If the image still appears dark or inverted, remove this class.
//               // className="filter invert brightness-0"
//             />
//           </div>
//           <div className="md:7/12 lg:w-6/12">
//             <h2 className="text-2xl text-gray-100 font-bold md:text-4xl">
//               Delivering Happiness, One Bite at a Time
//             </h2>
//             <p className="mt-6 text-gray-400">
//               At Food Hub, we believe that great food brings people together. Our mission is to connect you with your favorite local restaurants and deliver delicious meals right to your doorstep, quickly and conveniently. We're passionate about making every meal an enjoyable experience, from Browse our diverse menus to the moment you take your first bite.
//             </p>
//             <p className="mt-4 text-gray-400">
//               We're built on a foundation of technology, efficiency, and a deep understanding of what our customers crave. Our dedicated team of food enthusiasts, tech innovators, and reliable delivery partners work tirelessly to ensure fresh, hot meals reach you, whenever and wherever you need them. Taste the convenience, experience the difference!
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }











































import React from 'react';

export default function About() {
  return (
    <div className="py-16 bg-gray-900 text-gray-300">
      <div className="container m-auto px-6 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-5/12">
            <img
              src="public\img\hero-img.png"
              alt="Fast and Fresh Food Delivery"
            />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-100 font-bold md:text-4xl">
              Delivering Happiness, One Bite at a Time
            </h2>
            <p className="mt-6 text-gray-400">
              At **Food Hub**, we believe that great food brings people together. Our mission is to connect you with your favorite local restaurants and deliver delicious meals right to your doorstep, quickly and conveniently. We're passionate about making every meal an enjoyable experience, from Browse our diverse menus to the moment you take your first bite.
            </p>
            <p className="mt-4 text-gray-400">
              We're built on a foundation of technology, efficiency, and a deep understanding of what our customers crave. Our dedicated team of food enthusiasts, tech innovators, and reliable delivery partners work tirelessly to ensure fresh, hot meals reach you, whenever and wherever you need them. Taste the convenience, experience the difference!
            </p>
          </div>
        </div>

        ---

        <div className="mt-16">
          <h2 className="text-2xl text-gray-100 font-bold text-center md:text-4xl mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-yellow-400"> Aman Singh</h3>
            </div>

            {/* Team Member 2 */}
            <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-yellow-400">Binoy Babu </h3>
            </div>

            {/* Team Member 3 */}
            <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-yellow-400">Abhishek Sinha</h3>
            </div>

            {/* Team Member 4 */}
            <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-yellow-400"> Aarchi Tiwari </h3>
            </div>

            {/* Team Member 5 */}
            <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-yellow-400">Bhagirath Jangid</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}