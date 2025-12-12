import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-8 border-t border-gray-700 flex justify-center items-center">
      <p className="text-sm text-center">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-white">GrocerEase</span>. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
