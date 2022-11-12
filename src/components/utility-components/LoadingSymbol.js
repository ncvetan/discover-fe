import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

export default function LoadingSymbol() {
    return (
        <div className="flex justify-center p-5">
            <FontAwesomeIcon
                icon={faCircleNotch}
                className="text-primary-green animate-spin h-12"
            />
            <span className="sr-only">Loading...</span>
        </div>
    );
}
