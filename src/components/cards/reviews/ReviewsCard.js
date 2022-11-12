import React, { useState, useRef, useCallback } from 'react';
import CloseBtn from '../../utility-components/CloseButton';
import LoadingSymbol from '../../utility-components/LoadingSymbol';
import Review from './Review';
import useReviews from '../../../hooks/useReviews';

function ReviewsCard(props) {
    const [pageNum, setPageNum] = useState(1);

    const { isLoading, isError, error, results, hasNextPage } = useReviews(
        props.openId,
        pageNum
    );

    const intObserver = useRef();

    const lastReviewRef = useCallback(
        (review) => {
            if (isLoading) {
                return;
            }

            if (intObserver.current) {
                intObserver.current.disconnect();
            }

            intObserver.current = new IntersectionObserver((reviews) => {
                if (reviews[0].isIntersecting && hasNextPage) {
                    setPageNum((prev) => prev + 1);
                }
            });

            if (review) {
                intObserver.current.observe(review);
            }
        },
        [isLoading, hasNextPage]
    );

    if (isError === true) {
        return <p>{`Error: ${error.message}`}</p>;
    }

    const content = results.map((review, i) => {
        if (results.length === i + 1) {
            return (
                <Review
                    ref={lastReviewRef}
                    key={`review-${props.openId}-${i}`}
                    review={review}
                />
            );
        }
        return <Review key={`review-${props.openId}-${i}`} review={review} />;
    });

    return (
        <div
            className={
                props.createReviewPageOpen
                    ? 'hidden'
                    : 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-16 h-screen w-full bg-white bg-opacity-50 backdrop-blur-sm flex items-center flex-col'
            }
        >
            <div className="mt-8 h-auto w-auto max-w-1/2 flex flex-col m-2 p-2 items-center bg-primary-green rounded-2xl shadow-md text-white">
                <h1 className="text-xl pb-1">{`Reviews for ${props.name}`}</h1>
                <button
                    className="bg-white text-black rounded-md w-32"
                    onClick={() => props.setCreateReviewPageOpen(true)}
                >
                    Create Review
                </button>
                {results.length === 0 && (
                    <p>{`There are no reviews for ${props.name} yet, be the first!`}</p>
                )}
                <div className="flex flex-col items-center">{content}</div>
                {isLoading && <LoadingSymbol />}
            </div>
            <CloseBtn clickProp={props.setReviewsPageOpen} />
        </div>
    );
}

export default ReviewsCard;
