import './dist/formCard.css'

export function FormCard() {
    return (
        <div className='form_card'>
            <div className="left_card_part">
                <img src="/img/Customer.svg" alt="" />
                <div className="customer_info">
                    <div className='customer_name'>Віктор Павлович Онищенко</div>
                    <div className='customer_phone'>093 543 42 33</div>
                </div>
            </div>
            <div className="customer_date">
                <div className="c_date">25 липня 2024</div>
            </div>
        </div>
    )
}