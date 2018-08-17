import React from "react";

const APIURL = "http://ec2-52-40-20-31.us-west-2.compute.amazonaws.com/api";

const RubyTutorial = () => {
    return (
        <div className = "flex">
            <p className = "text-sm flex-1 lead-normal">
                <h2> Ruby on Rails Requests </h2>
                This guide shows how to make an API request using Ruby on Rails and the 
                <code> open-uri </code> library.
                <br />
                <br />
                <pre className="text-sm text-green-darker shadow-md bg-grey-light p-4">
                    #Import Library<br />
                    require 'open-uri' <br /><br />
                    
                    #Get Response<br />
                    response = open('{APIURL}').read<br />
                </pre >
                <br />
            </p>
        </div>
    );
};

export default RubyTutorial;