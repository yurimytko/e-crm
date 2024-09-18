import { NavLink, useParams } from 'react-router-dom';
import { NavBar } from '../../components/NavBar/nav';
import './dist/userPage.css';
import { useGetUserByIdQuery } from '../../store/adminApi';
import { UserOrder } from '../../components/UserOrderCard/userOrder';
import { Loader } from '../../components/Loader/loader';

export function UserPage() {
    const { userId } = useParams();
    const { data: user = {}, isLoading, error } = useGetUserByIdQuery({ id: userId });

    if (isLoading) return <Loader />;
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
                        <span className="info_user_span">{userData.fullname}</span>
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

                <div className="user_order_con">
                    {
                        userData.history.map((item, index)=> (
                            <UserOrder item = {item} />

                        ))
                    }



                </div>

            </div>
        </div>
    );
}