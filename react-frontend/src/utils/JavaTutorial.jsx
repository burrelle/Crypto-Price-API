import React from 'react';

const APIURL = "http://ec2-52-40-20-31.us-west-2.compute.amazonaws.com/api";

const JavaTutorial = () => {
    return (
        <div className = "flex">
            <p className = "text-sm flex-1 lead-normal">
                <h2> Java Requests </h2>
                This guide shows how to make an API request using Java and the Apache
                <code> HttpClient </code> library.
                <br />
                <em>Pre-requisite </em>: Get <code> HttpClient </code> and its dependencies from the Apache website 
                and place it into the class path. <br /> 
                More information could be found in the {" "}
                <a href ='http://hc.apache.org/httpclient-3.x/tutorial.html'>documentation </a> 
                <br />
                <br />
                <pre className="text-sm text-green-darker shadow-md bg-grey-light p-4">
                    //Instantiate HttpClient<br />
                    HttpClient client = new HttpClient(); <br />
                    <br />
                    //Create HttpClient method<br />
                    HttpMethod method = new GetMethod('{APIURL}');<br />
                    <br />
                    //Read the Response<br />
                    byte[] responseBody = method.getResponseBody();<br />
                </pre >
                <br />
            </p>
        </div>
    );
};

export default JavaTutorial;