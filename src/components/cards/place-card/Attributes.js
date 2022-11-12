import React from 'react';

function Attributes(props) {
    const attributesItems = props.attributes.map((attribute, i) => (
        <li className="list-item" key={`$attr-${i}`}>
            {attribute}
        </li>
    ));

    return (
        <>
            <p>Attributes:</p>
            <ul className="grid grid-cols-2 gap-x-6 list-disc">
                {attributesItems}
            </ul>
        </>
    );
}

export default Attributes;
