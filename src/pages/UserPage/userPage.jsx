import { NavLink, useParams } from 'react-router-dom';
import { NavBar } from '../../components/NavBar/nav';
import './dist/userPage.css';
import { useGetUserByIdQuery } from '../../store/adminApi';

export function UserPage() {
    const { userId } = useParams();
    const { data: user = {}, isLoading, error } = useGetUserByIdQuery({ id: userId });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading user data</div>;

    const userData = user?.user?.[0];

    if (!userData) {
        return <div>No user found</div>;
    }

    const formatedDate = new Date(userData.createdAt).toLocaleDateString();

    return (
        <div className='user_page'>
            <NavBar />
            <div className="user_right">
                <div className="back_link">
                    <NavLink to={`/clients`}>Список клієнтів</NavLink>
                    <div className="sep_line_link"></div>
                    <span>Детальніше</span>

                </div>
                <div className="about_user">
                    <div className="info_user_con">
                        <span className="info_user_span">Віктор Павлович Онищенко</span>
                        <span className="info_user_span">Дата реєстрації: {formatedDate}</span>
                    </div>
                    <div className="info_user_con">
                        <span className="info_user_span">{userData.phone}</span>
                        <span className="info_user_span">Місто: {userData.city}</span>
                    </div>
                    <div className="info_user_con">
                        <span className="info_user_span">{userData.email}</span>
                    </div>
                </div>
                <span className="recent_orders">Останні замовлення</span>
            </div>
        </div>
    );
}