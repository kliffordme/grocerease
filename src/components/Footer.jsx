import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-5 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-1 text-sm">
        <span className="font-semibold text-white">GrocerEase</span>
        <span>© {new Date().getFullYear()} GrocerEase. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
