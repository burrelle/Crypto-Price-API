import React from 'react';

const APIURL = 'https://jsonplaceholder.typicode.com/posts/1';

export default function JSTutorial() {
        return(
            <div className="flex border-b">
                <p className="text-sm">
                    <h2> Javascript Requests </h2>
                    This guide shows how to make an API request using Javascript and the 'axios' 
                    library.
                    <br />
                    <em>Pre-requisite </em>: Install the 'axios' library using 'npm install axios' or 'bower install axios' 
                        more information could be found in the <a href='https://github.com/axios/axios'> documentation </a><br /><br />
                    <pre className='text-sm text-green-darker border-solid border-black border-2 bg-grey-light px-4'>
                        //Import Axios library <br />
                        const axios = require('axios');<br /><br />

                        //Make a GET request to the API<br />
                        axios.get('{APIURL}')<br />
                             .then(response=>response.json())<br />
                             .then(jsonData=> JSON.stringify(jsonData, null, 2))<br />
                             .then(console.log(jsonData));<br /><br />

                        //The JSON response is then outputted to the console
                    </pre>
                    <br />
                    Congratulations, you should be able to print out or manipulate the data now using the variable 'data'!
                </p>
            </div>
        )
    }