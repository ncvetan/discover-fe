import React, { useState, useEffect, useRef } from 'react';
import { Rating } from '@mui/material';
import CloseBtn from '../../utility-components/CloseButton';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { api } from '../../../api/axios';
import { useAuth0 } from '@auth0/auth0-react';

const DESCRIPTION_REGEX = /^[a-zA-Z0-9$!?()%\s.]{1,1000}$/;

function CreateReviewCard(props) {
    const userRef = useRef();
    const errRef = useRef();

    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(5);
    const [userFocus, setUserFocus] = useState(false);
    const [charCount, setCharCount] = useState(1000);
    const [validDescription, setValidDescription] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setCharCount(1000 - description.length);
        setValidDescription(DESCRIPTION_REGEX.test(description));
    }, [description]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const token = await getAccessTokenSilently();
            const response = await api.post(
                `/explore/places/${props.openId}/reviews/create`,
                JSON.stringify({
                    parentId: props.openId,
                    author: user.name,
                    rating: rating,
                    description: description.trim(),
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
            console.log(response);
            setSuccess(true);
            setRating(5);
            setDescription('');
        } catch (err) {
            if (!err.response) {
                setErrMsg('No response');
            } else {
                setErrMsg('Creating review failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-16 h-screen w-full bg-white bg-opacity-50 backdrop-blur-sm flex items-center flex-col">
            <div className="mt-8 h-auto w-auto max-w-1/2 flex flex-col m-2 p-2 items-center bg-primary-green rounded-2xl shadow-md text-white">
                <p ref={errRef} className="text-red-600">
                    {errMsg}
                </p>
                <h1 className="text-xl pb-1">Create Review</h1>
                {!isAuthenticated && (
                    <p>Only registered users can post a review.</p>
                )}
                <form
                    className="flex flex-col items-center"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="rating">Rating:</label>
                    <Rating
                        name="text-feedback"
                        value={Number(rating)}
                        onChange={(e) => setRating(e.target.value)}
                        max={10}
                        precision={1}
                        disabled={!isAuthenticated}
                    />
                    <label htmlFor="description">Description:</label>
                    <textarea
                        type="text"
                        id="description"
                        className="text-black mb-1 h-36 w-64 break-words p-1"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        disabled={!isAuthenticated}
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p
                        className={
                            userFocus && !validDescription
                                ? 'text-gray-200 text-sm max-w-fit'
                                : 'sr-only'
                        }
                    >
                        <FontAwesomeIcon className="mr-2" icon={faInfoCircle} />
                        {`Tell us about your experience with ${props.name}!`}
                    </p>
                    {isAuthenticated && <p>{charCount}</p>}
                    <button
                        type="submit"
                        className="bg-white disabled:opacity-50 justify-self-center rounded-md w-1/3 mt-3 p-1 text-primary-green font-semibold"
                        disabled={
                            !isAuthenticated || !validDescription ? true : false
                        }
                    >
                        Submit Review!
                    </button>
                </form>
            </div>
            <CloseBtn clickProp={props.setCreateReviewPageOpen} />
        </div>
    );
}

export default CreateReviewCard;
