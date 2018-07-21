import React from "react";

const APIURL = "https://jsonplaceholder.typicode.com/posts/1";

const PHPTutorial = () => {
  return (
    <div className="flex">
      <p className="text-sm flex-1 leading-normal">
        <h2> PHP Requests </h2>
        This guide shows how to make an API request using PHP and the GuzzleHTTP library.
        <br />
        <em>Pre-requisite </em>: First, install Composer, then run{" "}
        <code>php composer.phar require guzzlehttp/guzzle</code>. More information could be found in the{" "}
        <a href="https://github.com/guzzle/guzzle">documentation</a>.
        <br />
        <br />
        <pre className="text-sm text-green-darker shadow-md bg-grey-light p-4">
        $client = new \GuzzleHttp\Client(); <br />  <br /> 
        $response = $client->request('GET', {APIURL});  <br /> <br /> 
        echo $response->getStatusCode(); // 200 <br />  
        echo $response->getHeaderLine('content-type');  // Application-JSON <br />  
        echo $response->getBody(); // Get the body of the response <br />
        </pre>
        <br />
      </p>
    </div>
  );
};

export default PHPTutorial;
