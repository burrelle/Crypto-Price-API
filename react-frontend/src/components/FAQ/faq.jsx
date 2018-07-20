import React from "react";
import Question from "./question";

const Faq = () => {
  return (
    <div className="mt-32">
      <div className="flex justify-center flex-col">
        <div className="flex-col text-center text-3xl font-semibold">
          FAQ
          <div className="text-lg p-4 italic font-light">
            From time to time, we all have questions.
          </div>
          <Question question="What is cryptocurrency?" answer="A cryptocurrency is digital asset designed to work as a medium of exchange that uses strong cryptography to secure financial transactions, control the creation of additional units, and verify the transfer of assets." />
          <Question question="What is an API?" answer="In computer programming, an application programming interface is a set of subroutine definitions, protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication between various components." />
          <Question question="What is AdonisJS?" answer="AdonisJs is a Node.js web framework with a breath of fresh air and drizzle of elegant syntax on top of it." />
          <Question question="What is Typescript?" answer="TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript, and adds optional static typing to the language." />
        </div>
      </div>
    </div>
  );
};

export default Faq;
