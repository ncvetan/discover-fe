import React from 'react';
import GitHubLogo from '../../assets/GitHub-Mark-64px.png';

function Footer() {
    return (
        <footer className="bg-white flex flex-col items-center fixed inset-x-0 bottom-0 shadow-inner">
            <a href="https://github.com/ncvetan" className="flex items-center">
                <img
                    src={GitHubLogo}
                    alt="GitHub Logo"
                    className="cursor-pointer h-4 hover:animate-spin"
                />
                <p className="p-1">ncvetan</p>
            </a>
        </footer>
    );
}
export default Footer;
