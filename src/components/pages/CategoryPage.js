import React from 'react';
import CategoryCard from '../cards/CategoryCard';
import EntertainmentIcon from '../../assets/category-icons/entertainment.svg';
import FoodIcon from '../../assets/category-icons/food.svg';
import LandmarksIcon from '../../assets/category-icons/landmarks.svg';
import ShoppingIcon from '../../assets/category-icons/shopping.svg';

function CategoryPage(props) {
    return (
        <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold px-3 py-6">
                What are you looking to do today?
            </h1>
            <div className="flex flex-wrap w-auto lg:w-1/3 justify-center items-center gap-4">
                <CategoryCard
                    {...props}
                    logo={EntertainmentIcon}
                    category="entertainment"
                />
                <CategoryCard 
                    {...props} 
                    logo={FoodIcon} 
                    category="food" 
                />
                <CategoryCard
                    {...props}
                    logo={ShoppingIcon}
                    category="shopping"
                />
                <CategoryCard
                    {...props}
                    logo={LandmarksIcon}
                    category="landmark"
                />
            </div>
        </div>
    );
}

export default CategoryPage;
