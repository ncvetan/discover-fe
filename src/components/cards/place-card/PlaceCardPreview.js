import React from 'react';
import { Rating } from '@mui/material';

const PlaceCardPreview = React.forwardRef((props, ref) => {
    const result = props.result;

    function handleClick() {
        props.setOpenId(props.result._id);
        props.setDetailsPageOpen(true);
    }

    const attributesItems = result.attributes.map((attribute, i) => (
        <li className="list-item" key={`${props.result._id}-attr-${i}`}>
            {attribute}
        </li>
    ));

    const placeBody = (
        <button
            onClick={handleClick}
            className="flex flex-1 min-w-max flex-col m-2 p-2 items-center gap-1 bg-primary-green rounded-2xl shadow-md text-white hover:scale-105 hover:duration-150"
        >
            <h1 className="text-xl">{result.name}</h1>
            {result.address.streetName && (
                <p>{`${result.address.streetNumber ? result.address.streetNumber : ''} ${
                    result.address.streetName
                } ${result.address.unit ? '#' + result.address.unit : ''}`}</p>
            )}
            
            <Rating
                name="read-only"
                value={Number(result.avgReviewScore)}
                precision={0.1}
                readOnly
            ></Rating>
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
