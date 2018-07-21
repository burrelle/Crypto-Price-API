import React from "react";
import Python from '../utils/pythontutorial.jsx';
import JSTutorial from '../utils/jstutorial.jsx';
import TutorialCards from './tutorialcards.jsx';
/*
const Home = () => {
    return (
        <div className="mt-32 flex items-center justify-center">
            <div className="max-w-lg">
                { <TutorialCards tutorial={<Python />}/> }
                { <TutorialCards tutorial={<JSTutorial />}/> }
            </div>
        </div>
    );
};
*/

const Quickstart = () => {
    return (
        <div className = "items-center justify-center py-24">
            <h3> This section is intended to show how to quickly interact with APIs using different languages. </h3>
            <div className="font-sans flex items-center justify-center w-full py-4">
                    <div className="overflow-hidden bg-white rounded w-full shadow-lg  leading-normal">
                        { <TutorialCards text="Show Python Tutorial" tutorial={<Python />}/> }
                        { <TutorialCards text="Show Javascript Tutorial" tutorial={<JSTutorial />}/> }
                    </div>
            </div>
        </div>
    )
}
export default Quickstart;