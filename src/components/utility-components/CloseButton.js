import React from 'react';

function CloseBtn(props) {
    return (
        <button
            onClick={() => props.clickProp(false)}
            className="bg-white border-solid border-2 border-primary-green shadow-md rounded-md text-primary-green w-32 h-auto"
        >
            Close
        </button>
    );
}

export default CloseBtn;
