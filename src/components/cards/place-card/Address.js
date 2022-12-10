import React from 'react';

function Address(props) {

    const address = props.address;

    return (
        <div className='flex flex-col items-center'>
            { address.streetName &&
            <p>{`${address.streetNumber ? `${address.streetNumber}` : ''} ${address.streetName} ${address.unit ? `#${address.unit}` : ''}`}</p>
            }
            <p>{`${address.city} ${address.province}, ${address.postalCode ? address.postalCode : ''}`}</p>
        </div>
    );
}

export default Address;




