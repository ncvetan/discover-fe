import React, { useState, useRef, useCallback, useEffect } from 'react';
import LoadingSymbol from '../utility-components/LoadingSymbol';
import PlaceCard from '../cards/place-card/PlaceCardFull';
import PlaceCardPreview from '../cards/place-card/PlaceCardPreview';
import usePlaces from '../../hooks/usePlaces';
import useScrollBlock from '../../hooks/useScrollBlock'

function ResultsPage(props) {
    const [openId, setOpenId] = useState('');
    const [detailsPageOpen, setDetailsPageOpen] = useState(false);
    const [pageNum, setPageNum] = useState(1);

    const [blockScroll, allowScroll] = useScrollBlock();

    // useEffect(() => {
    //     if (detailsPageOpen){
    //         blockScroll();
    //     }
    //     else{
    //         allowScroll();
    //     }

    // }, [detailsPageOpen])
    

    const { isLoading, isError, error, results, hasNextPage } = usePlaces(
        props.searchCategory,
        pageNum
    );

    const intObserver = useRef();

    const lastPlaceRef = useCallback(
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

    const content = results.map((result, i) => {
        if (results.length === i + 1) {
            return (
                <PlaceCardPreview
                    key={`place.id-${i}`}
                    ref={lastPlaceRef}
                    result={result}
                    setOpenId={setOpenId}
                    setDetailsPageOpen={setDetailsPageOpen}
                />
            );
        }
        return (
            <PlaceCardPreview
                key={`place.id-${i}`}
                result={result}
                setOpenId={setOpenId}
                setDetailsPageOpen={setDetailsPageOpen}
            />
        );
    });

    return (
        <>
            <div
                className={
                    detailsPageOpen ? 'blur-md opacity-50' : 'visible'
                }
            >
                <div className="flex flex-col items-center">
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

                        {content}
                    </div>
                </div>
            </div>
            {isLoading && <LoadingSymbol />}
            {detailsPageOpen && (
                <PlaceCard
                    setDetailsPageOpen={setDetailsPageOpen}
                    openId={openId}
                />
            )}
        </>
    );
}

export default ResultsPage;
