import React from 'react';
import PropTypes from 'prop-types';

class APIGet extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: []
        };
    }

    /*
    Makes a HTTP get response at the API with the "url" as a property of the prop
    */
    componentDidMount(){
        const that = this;
        //fetch(that.url)
        fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then((response) => response.json())
        .then(jsonData=> JSON.stringify(jsonData, null, 2))
        .then(jsonString=>{
            that.setState( { data: jsonString });
            console.log(jsonString);
        });
    }

    render(){
        return (
            <div className="px-6 py-4">
                <div>
                    <pre className="pretty-print lang-json">
                        {this.state.data}
                    </pre>
                </div>
            </div>
        )
    }
}


export default APIGet