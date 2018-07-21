import React from "react";
import Typing from "react-typing-animation";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="mt-32 py-8">
      <div className="flex justify-center flex-col">
        <div className="flex-col text-center text-3xl font-semibold">
          <Typing speed={100}>Welcome to the Aries Cryptocurrency API</Typing>
          <div className="text-lg p-4 italic font-light">
            <Typing startDelay={5000}>
              Powered by AdonisJS, Microservices, React, Typescript and
              Postgres.
            </Typing>
          </div>
          <div />
          <Link to="/docs">
            <span className="inline-block bg-purple-dark rounded-full px-3 py-1 text-sm text-white mr-2 hover:bg-white hover:text-purple-dark border-purple-dark border-2">
              Click Here for Live Data
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
