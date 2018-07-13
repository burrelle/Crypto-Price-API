import React from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="flex justify-around items-center fixed pt-8 pin-t pin-x">
      <div className="flex items-center">
        <span className="fab fa-node-js fa-2x mr-4 " />
        <Link to="/" className="no-underline text-black">
          Aries Cryptocurrency API
        </Link>
      </div>
      <nav>
        <Link to="/quickstart" className="no-underline text-black m-8 hover:text-purple-dark hover:font-bold">
          Quickstart
        </Link>
        <Link to="/docs" className="no-underline text-black m-8 hover:text-purple-dark hover:font-bold">
          Documentation
        </Link>
        <Link to="/faq" className="no-underline text-black m-8 hover:text-purple-dark hover:font-bold">
          FAQ
        </Link>
      </nav>
      <div className="inline-block relative">
        <select className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-1 pr-8 rounded leading-tight">
          <option>Version 1</option>
          <option>Version 2</option>
          <option>Version 3</option>
        </select>
        <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
