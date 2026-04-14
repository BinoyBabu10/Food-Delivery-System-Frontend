// import Header from "../Header/Header";
// // import CustomerNavbar from "./CustomerNavbar";

// const CustSearchItemDash = ({children}) => {
//     return (
//         <div>
//             {/* <CustomerNavbar /> */}
//             <Header/>
//             <div className="p-4">{children}</div>
//             <footer/>
//         </div>
//     )
// }

// export default CustSearchItemDash;





import React from "react";
import Header from "../Header/Header"; // Assuming this path is correct
import Footer from "../Footer/Footer"; // Assuming you have a Footer component to import

const CustSearchItemDash = ({ children }) => {
  return (
    // Apply the consistent gradient background and flex column layout to the entire page
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header component will sit at the top */}
      <Header />

      {/* Main content area, centered and taking available space */}
      <main className="flex-grow flex items-center justify-center p-4">
        {/* Children (e.g., SearchItem component) will be rendered here.
            The children component itself is expected to apply its own card-like styling
            (e.g., w-full max-w-4xl bg-white rounded-xl shadow-lg p-8) as seen in SearchItem.
            This div primarily provides padding and ensures centering within the main content area.
        */}
        {children}
      </main>

      {/* Footer component will sit at the bottom */}
      <Footer />
    </div>
  );
};

export default CustSearchItemDash;