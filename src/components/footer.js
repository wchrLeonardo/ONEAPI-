import React from 'react';

const Footer = ({ name }) => {
  return (
    <footer className="bg-gray-600 text-white p-4 flex flex-col items-center">
      <p className="text-center">Site criado por {name}</p>
      <div className="flex space-x-4 mt-2">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
          <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" alt="Facebook" className="w-6 h-6" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
          <img src="https://img.icons8.com/ios-filled/50/ffffff/twitter.png" alt="Twitter" className="w-6 h-6" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
          <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram" className="w-6 h-6" />
        </a>
      </div>
      <p className="mt-2 text-center">Todos os direitos reservados &copy; {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer
