import { NavLink } from 'react-router-dom'
import './dist/customerChat.css'

export function CustommerChatCard() {
    return (
        <NavLink to={'user'} className='custommer_chat_card'>
            <div className="left_card_part">
                <img src="/img/Customer.svg" alt="" />
                <div className="customer_info">
                    <div className='customer_name'>Віктор Павлович Онищенко</div>
                    <div className='customer_mes'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,</div>
                </div>
            </div>
            <div className="customer_date">
                <div className="c_date_c">25 липня 2024</div>
            </div>
        </NavLink>
    )
}