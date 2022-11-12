/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'primary-green': '#37876A',
            },
            maxWidth: {
                '1/2': '50%',
                '1/3': '33%',
                '3/5': '60%',
                '4/5': '80%',
            },
            minWidth: {
                '1/3': '33%',
            },
            padding: {
                '1/2': '50%',
                full: '100%',
            },
        },
    },
    plugins: [],
    'tailwindCSS.includeLanguages': { plaintext: 'javascript' },
};
