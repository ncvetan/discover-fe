import { useState, useEffect } from 'react';
import { getReviews } from '../api/axios';

const useReviews = function (placeId, pageNum = 1) {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState({});
    const [hasNextPage, setHasNextPage] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        setError({});

        const controller = new AbortController();
        const { signal } = controller;

        getReviews(placeId, pageNum, { signal })
            .then((data) => {
                setResults((prev) => [...prev, ...data]);
                setHasNextPage(Boolean(data.length));
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                if (signal.aborted) return;
                setIsError(true);
                setError({ message: err.message });
            });

        return () => controller.abort();
    }, [pageNum, placeId]);

    return { isLoading, isError, error, results, hasNextPage };
};

export default useReviews;
