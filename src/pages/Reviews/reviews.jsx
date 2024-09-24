import { NavBar } from '../../components/NavBar/nav';
import './dist/reviews.css';
import { useGetReviewsQuery } from '../../store/reviewsApi';
import { ReviewCard } from '../../components/ReviewCard/review';
import { Loader } from '../../components/Loader/loader';
import { useNavigate } from 'react-router-dom';

export function ReviewsPage() {
    const { data: reviews = [], isLoading, error } = useGetReviewsQuery();
    const navigate = useNavigate(); // Initialize navigate

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className='rev_page'>
            <NavBar />
            <div className='rev_window'>
                <button className='back_btn' onClick={handleBack}> <img src="/img/Group 53.svg" alt="" />Назад</button>
                <div className="rew_con">
                    {isLoading && <Loader />}
                    {reviews.length === 0 ? (
                        <div>No reviews available.</div>
                    ) : (
                        reviews.reviews.map((review) => (
                            <ReviewCard key={review.id} review={review} /> // Assuming review has an `id` field
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
