import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import './searchPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SearchPage = ({ sideNavbar }) => {
    const location = useLocation();
    const searchResults = useMemo(() => location.state?.results || [], [location.state]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/allVideo');
                if (res.data && res.data.videos) {
                    console.log(res.data.videos); // Assuming you want to log the data
                } else {
                    console.warn("No videos found in response.");
                }
            } catch (err) {
                console.error("Error fetching videos:", err);
            }
        };

        fetchVideos();
    }, []);

    useEffect(() => {
        if (searchResults.length === 0) return;
        const slider = document.querySelector('.videoSuggestions_options');
        if (!slider) {
            console.warn("Slider not found.");
            return;
        }
        let isDown = false;
        let startX;
        let scrollLeft;
        const handleMouseDown = (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        };
        const handleMouseLeave = () => {
            isDown = false;
            slider.classList.remove('active');
        };
        const handleMouseUp = () => {
            isDown = false;
            slider.classList.remove('active');
        };
        const handleMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        };
        slider.addEventListener('mousedown', handleMouseDown);
        slider.addEventListener('mouseleave', handleMouseLeave);
        slider.addEventListener('mouseup', handleMouseUp);
        slider.addEventListener('mousemove', handleMouseMove);
        return () => {
            slider.removeEventListener('mousedown', handleMouseDown);
            slider.removeEventListener('mouseleave', handleMouseLeave);
            slider.removeEventListener('mouseup', handleMouseUp);
            slider.removeEventListener('mousemove', handleMouseMove);
        };
    }, [searchResults]);

    const options = [
        'All',
        'Music',
        'Animal',
        'Animation',
        'Documentary',
        'Education',
        'Entertainment',
        'Playlists',
        'Mixes',
        'Gaming',
        'Food',
        'Comedy',
        'Recently Uploaded',
        'Watched',
        'New to you',
    ];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        console.log("Selected Category:", category);
    };

    console.log("Search Results:", searchResults);
    console.log("Selected Category:", selectedCategory);

    const filteredVideos = selectedCategory === 'All' ? searchResults : searchResults.filter((video) => {
        if (video.videoType === undefined) {
            console.log("Video with undefined category:", video);
        }
        return video.videoType === selectedCategory;
    });

    console.log("Filtered Videos:", filteredVideos);

    return (
        <div className={sideNavbar ? 'searchPage' : 'fullSearchPage'}>
            <div className="videoSuggestions_options">
                {options.map((item, index) => (
                    <div key={index} className={`videoSuggestions_option ${selectedCategory === item ? 'active' : ''}`} onClick={() => handleCategoryClick(item)}>
                        {item}
                    </div>
                ))}
            </div>
            <div className="videoSuggestions_blocks">
                {filteredVideos.length > 0 ? (
                    filteredVideos.map((item) => (
                        <div className="videoSuggestionsBlock" key={item._id}>
                            <Link to={`/watch/${item._id}`} className="video_suggestion_link">
                                <div className="video_suggestion_thumbnail">
                                    <img
                                        className="video_suggestion_thumbnail_img"
                                        src={item.thumbnail || 'default_thumbnail.jpg'}
                                        alt={`Thumbnail of ${item.title}`}
                                    />
                                </div>
                                <div className="video_suggestions_about">
                                    <div className="video_suggestions_about_title">{item.title}</div>
                                    <div className="video_suggestions_about_profile">{item.user?.name || 'Unknown Channel'}</div>
                                    <div className="video_suggestions_about_views">
                                        {item.views ? `${item.views} views` : '0 views'} ·{' '}
                                        {item.createdAt ? item.createdAt.slice(0, 10) : 'Date not available'}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No videos available for this category.</p>
                )}
            </div>
        </div>
    );
};

export default SearchPage;