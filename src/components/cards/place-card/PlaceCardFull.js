import { React, useEffect, useState } from 'react';
import { api } from '../../../api/axios';
import Address from './Address';
import Attributes from './Attributes';
import CloseBtn from '../../utility-components/CloseButton';
import CreateReviewCard from '../reviews/CreateReviewCard';
import Hours from './Hours';
import LoadingSymbol from '../../utility-components/LoadingSymbol';
import ReviewsCard from '../reviews/ReviewsCard';

function PlaceCard(props) {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [reviewsCardOpen, setReviewsCardOpen] = useState(false);
    const [createReviewCardOpen, setCreateReviewCardOpen] = useState(false);

    async function getPlaceDetails() {
        const response = await api.get(
            `${process.env.REACT_APP_SERVER_URL}/explore/places/${props.openId}`,
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );
        setData(response.data);
        setIsLoading(false);
        return;
    }

    useEffect(() => {
        getPlaceDetails();
    }, []);

    if (isLoading) {
        return <LoadingSymbol />;
    }

    // Loading photo's uses a client-side API Key, which is publicly exposed. This API Key is restricted to the app's domain.
    return (
        <>
            <article
                className={
                    (reviewsCardOpen || createReviewCardOpen)
                        ? 'hidden'
                        : 'fixed inset-0 mt-16 h-auto w-full flex items-center flex-col overscroll-contain overflow-y-scroll mb-7'
                }
            >
                <div className="mt-8 h-auto w-auto md:w-2/3 lg:w-1/2 flex flex-col m-2 p-2 items-center gap-1 bg-primary-green rounded-2xl shadow-md text-white">
                    <h1 className="text-xl font-bold">{data.name}</h1>
                    {data.photoRef && (
                        <div
                            style={{
                                backgroundImage: `url('data:${data.photoType};base64,${data.photo}')`,
                            }}
                            className={`w-72 h-32 md:w-96 md:h-44 rounded-md border-white border-4 bg-center bg-cover`}
                        />
                    )}
                    {data.address && <Address address={data.address} />}
                    <p>{`${data.description}`}</p>
                    <div className="flex flex-col gap-1">
                        {data.hours && <Hours hours={data.hours} />}
                        {data.hours && (
                            <Attributes attributes={data.attributes} />
                        )}
                    </div>
                    <button
                        className="bg-white text-black rounded-md w-32 mt-1"
                        onClick={() => setReviewsCardOpen(true)}
                    >
                        See All Reviews
                    </button>
                </div>
                <CloseBtn clickProp={props.setDetailsPageOpen} />
            </article>
            {reviewsCardOpen && (
                <ReviewsCard
                    name={data.name}
                    openId={props.openId}
                    setReviewsPageOpen={setReviewsCardOpen}
                    createReviewPageOpen={createReviewCardOpen}
                    setCreateReviewPageOpen={setCreateReviewCardOpen}
                />
            )}
            {createReviewCardOpen && (
                <CreateReviewCard
                    name={data.name}
                    openId={props.openId}
                    setCreateReviewPageOpen={setCreateReviewCardOpen}
                />
            )}
        </>
    );
}

export default PlaceCard;
