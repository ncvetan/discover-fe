import React from 'react';

const PlaceCardPreview = React.forwardRef((props, ref) => {
    const { address, attributes, name, id } = props.result;

    function handleClick() {
        props.setOpenId(id);
        props.setDetailsPageOpen(true);
    }

    const attributesItems = attributes.map((attribute, i) => (
        <li className="list-item" key={`${id}-attr-${i}`}>
            {attribute}
        </li>
    ));

    // Loading photos uses a client-side API Key. This API Key is intentionally exposed and restricted to Discover's domain.

    const placeBody = (
        <button
            onClick={handleClick}
            className="flex flex-1 min-w-max flex-col m-2 p-2 items-center bg-primary-green rounded-2xl shadow-md text-white hover:scale-105 hover:duration-150"
        >
            <h1 className="text-xl pb-1">{name}</h1>
            <p className="pt-1">{`${address.streetNumber} ${
                address.streetName
            } ${address.unit ? '#' + address.unit : ''}`}</p>
            <ul className="grid grid-cols-2 gap-x-6 justify-items-start list-disc list-inside">
                {attributesItems}
            </ul>
        </button>
    );

    const content = ref ? (
        <article className="flex flex-1" ref={ref}>
            {placeBody}
        </article>
    ) : (
        <article className="flex flex-1">{placeBody}</article>
    );

    return content;
});

export default PlaceCardPreview;
