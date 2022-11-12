import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Profile() {
    const { user, isAuthenticated } = useAuth0();

    return (
        <>
            {isAuthenticated && (
                <article>
                    {user?.picture && (
                        <img
                            className="rounded-full h-full mr-2"
                            src={user.picture}
                            alt={user.name}
                        />
                    )}
                </article>
            )}
        </>
    );
}
export default Profile;
