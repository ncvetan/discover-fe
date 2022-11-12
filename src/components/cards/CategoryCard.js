import React from 'react';

function CategoryCard(props) {
    async function handleButton() {
        props.setCategoryPageOpen(false);
        props.setResultsPageOpen(true);
        props.setSearchCategory(`${props.category}`);
    }

    return (
        <>
            <button
                className="bg-primary-green text-white w-2/5 aspect-square capitalize rounded-3xl hover:scale-105 hover:duration-150 shadow-md flex flex-col items-center justify-center"
                onClick={handleButton}
            >
                <img
                    src={props.logo}
                    alt={`Icon representing ${props.category}`}
                    className="text-white h-1/2 pb-1"
                />
                <p className="text-lg font-bold pt-1">{props.category}</p>
            </button>
        </>
    );
}

export default CategoryCard;
