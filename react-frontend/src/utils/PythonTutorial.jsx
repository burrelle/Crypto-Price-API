import React from "react";

const APIURL = "https://jsonplaceholder.typicode.com/posts/1";

export default function Python() {
  return (
    <div className="flex">
      <p className="text-sm leading-normal flex-1">
        <h2> Python Requests </h2>
        This guide shows how to make an API request using Python and the
        <code>requests</code> library.
        <br />
        <em>Pre-requisite </em>: Install the <code>requests</code> library using <code>pip install requests</code>.
        <br />
        <br />
        <pre className="text-sm text-green-darker shadow-md bg-grey-light p-4">
          #import the requests library<br />
          import requests<br />
          <br />
          #API endpoint<br />
          URL = '{APIURL}'<br />
          <br />
          #Send the API request<br />
          req = requests.get(url = URL)<br />
          <br />
          #Extract data<br />
          data = req.json()<br />
        </pre>
        <br />
      </p>
    </div>
  );
}
