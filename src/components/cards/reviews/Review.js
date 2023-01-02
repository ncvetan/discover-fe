import React from 'react';
import { Rating } from '@mui/material';

const Review = React.forwardRef(({ review }, ref) => {
    const postBody = (
        <>
            <Rating
                name="read-only"
                value={Number(review.rating)}
                precision={0.1}
                readOnly
            ></Rating>
            <p>{`${review.description}`}</p>
            <h2 className="self-end">{`- ${review.author}`}</h2>
        </>
    );

    const content = ref ? (
        <article
            className="text-black bg-white flex flex-col items-start p-1 m-2 w-full rounded-md"
            ref={ref}
        >
            {postBody}
        </article>
    ) : (
        <article className="text-black bg-white flex flex-col items-start p-1 m-2 w-full rounded-md">
            {postBody}
        </article>
    );

    return content;
});

export default Review;
