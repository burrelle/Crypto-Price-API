import React from 'react';

const APIURL = 'https://jsonplaceholder.typicode.com/posts/1';

export default function Python() {
        return(
            <div className="flex border-b">
                <p className="text-sm">
                    <h2> Python Requests </h2>
                    This guide shows how to make an API request using Python and the 'requests' 
                    library.
                    <br />
                    <em>Pre-requisite </em>: Install the 'requests' library using 'pip install requests'<br /><br />
                    <pre className='text-sm text-green-darker shadow-md bg-grey-light px-4'>
                        #import the requests library<br />
                        import requests<br /><br />

                        #API endpoint<br />
                        URL = '{APIURL}'<br /><br />

                        #Send the API request<br />
                        req = requests.get(url = URL)<br /><br />

                        #Extract data<br />
                        data = req.json()<br />
                    </pre>
                    <br />
                    Congratulations, you should be able to print out or manipulate the data now using the variable 'data'!
                </p>
            </div>
        )
    }


    //border-solid border-black border-2