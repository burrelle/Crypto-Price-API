import React from "react";

const APIURL = "https://jsonplaceholder.typicode.com/posts/1";

const NodeTutorial = () => {
  return (
    <div className="flex">
      <p className="text-sm flex-1 leading-normal">
        <h2> Javascript Requests </h2>
        This guide shows how to make an API request using Javascript and the
        <code>axios</code> library.
        <br />
        <em>Pre-requisite </em>: Install the <code>axios</code> library using{" "}
        <code>npm install axios</code> or more information could be found in the{" "}
        <a href="https://github.com/axios/axios">documentation</a>.
        <br />
        <br />
        <pre className="text-sm text-green-darker shadow-md bg-grey-light p-4">
          // Import Axios library <br />
          import axios from 'axios'<br />
          <br />
          // Make a GET request to the API<br />
          const response = axios.get('{APIURL}')<br />
          <br />
          // The JSON response is then outputted to the console <br />
          console.log(response) <br />
        </pre>
        <br />
      </p>
    </div>
  );
};

export default NodeTutorial;
