import React, { useState } from 'react';
import CategoryPage from './components/pages/CategoryPage';
import Footer from './components/footer/Footer';
import Navbar from './components/nav/Navbar';
import ResultsPage from './components/pages/ResultsPage';
import CreatePlaceCard from './components/pages/CreatePlace';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [categoryPageOpen, setCategoryPageOpen] = useState(true);
    const [resultsPageOpen, setResultsPageOpen] = useState(false);
    const [searchCategory, setSearchCategory] = useState('');
    const [detailsPageOpen, setDetailsPageOpen] = useState(false);

    return (
        <main>
            <div className="w-screen h-16 bg-transparent" />
            {categoryPageOpen && (
                <CategoryPage
                    setCategoryPageOpen={setCategoryPageOpen}
                    setResultsPageOpen={setResultsPageOpen}
                    setSearchCategory={setSearchCategory}
                />
            )}
            <div className={detailsPageOpen ? 'overflow-hidden' : ''}>
            {resultsPageOpen && (
                <ResultsPage
                setResultsPageOpen={setResultsPageOpen}
                searchCategory={searchCategory}
                detailsPageOpen={detailsPageOpen}
                setDetailsPageOpen={setDetailsPageOpen}
                />
                )}
            </div>
            <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <Footer/>
        </main>
    );
}

export default App;
