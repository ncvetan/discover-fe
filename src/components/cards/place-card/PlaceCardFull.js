import { React, useEffect, useState } from 'react';
import { api } from '../../../api/axios';
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
        const response = await api.get(`/explore/places/${props.openId}`, {
            headers: { 'Content-Type': 'application/json' },
        });
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
            <div
                className={
                    reviewsCardOpen
                        ? 'hidden'
                        : 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-16 h-screen w-full bg-white bg-opacity-50 backdrop-blur-sm flex items-center flex-col'
                }
            >
                <div className="mt-8 h-auto w-auto flex flex-col m-2 p-2 items-center gap-1 bg-primary-green rounded-2xl shadow-md text-white">
                    <h1 className="text-xl font-bold">{data.name}</h1>
                    <div
                        style={{
                            backgroundImage: `url('${`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${data.photoRef}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}')`,
                        }}
                        className={`w-72 h-32 rounded-md border-white border-4 bg-center bg-cover`}
                    />
                    {data.address && (
                            <p>{`${data.address.streetNumber} ${
                                data.address.streetName
                            } ${
                                data.address.unit ? `#${data.address.unit}` : ''
                            }`}</p>
                        ) && (
                            <p>{`${data.address.city}, ${data.address.postalCode} ${data.address.countryCode}`}</p>
                        ) && <p>{`${data.description}`}</p>}
                    {data.hours && <Hours hours={data.hours} />}
                    {data.hours && <Attributes attributes={data.attributes} />}
                    <button
                        className="bg-white text-black rounded-md w-32"
                        onClick={() => setReviewsCardOpen(true)}
                    >
                        See All Reviews
                    </button>
                </div>
                <CloseBtn clickProp={props.setDetailsPageOpen} />
            </div>
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
