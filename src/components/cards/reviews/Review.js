import React from 'react';

const Review = React.forwardRef(({ review }, ref) => {
    const postBody = (
        <>
            <p>{`Rating: ${review.rating}/10`}</p>
            <p>{`${review.description}`}</p>
            <h2 className="self-end">{`- ${review.author}`}</h2>
        </>
    );

    const content = ref ? (
        <article
            className="text-black bg-white flex flex-col items-start m-1 w-full rounded-md"
            ref={ref}
        >
            {postBody}
        </article>
    ) : (
        <article className="text-black bg-white flex flex-col items-start m-1 w-full rounded-md">
            {postBody}
        </article>
    );

    return content;
});

export default Review;
