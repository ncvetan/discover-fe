import React from 'react';
import DiscoverLogo from '../../assets/discover-logo.png';
import Profile from './auth/Profile';
import { useAuth0 } from '@auth0/auth0-react';

function Navbar() {
    const { loginWithRedirect, logout, user, isLoading } = useAuth0();

    return (
        <>
            <div className="flex shadow-md w-full h-16 fixed top-0 left-0 items-center justify-between bg-white">
                <input
                    type="image"
                    className="h-1/2 sm:h-4/5 md:h-full p-1"
                    src={DiscoverLogo}
                    alt="Discover Logo that returns the website to the homepage when clicked"
                    onClick={() => window.location.reload(false)}
                />
                <div className="flex h-2/3 gap-2">
                    {!user && !isLoading && (
                        <button
                            className="bg-primary-green text-white text-lg font-semibold rounded-lg shadow-sm hover:shadow-md px-2 py-1 mr-5"
                            onClick={() => loginWithRedirect()}
                        >
                            Log In
                        </button>
                    )}
                    {user && !isLoading && (
                        <button
                            className="text-xs sm:text-lg bg-primary-green text-white font-semibold rounded-lg shadow-sm hover:shadow-md px-2 py-1"
                            onClick={() => logout()}
                        >
                            Log out
                        </button>
                    )}
                    {user && !isLoading && <Profile />}
                </div>
            </div>
        </>
    );
}

export default Navbar;
