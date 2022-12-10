import React from 'react';

function Attributes(props) {
    const attributesItems = props.attributes.map((attribute, i) => (
        <li className="list-item" key={`$attr-${i}`}>
            {attribute}
        </li>
    ));

    return (
        <div className='flex flex-col'>
            <p className="font-bold">Attributes:</p>
            <ul className="grid grid-cols-2 gap-x-6 list-disc list-inside">
                {attributesItems}
            </ul>
        </div>
    );
}

export default Attributes;
