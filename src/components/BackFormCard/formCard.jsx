import './dist/formCard.css'

export function FormCard({call}) {



    const formData = new Date(call.createdAt).toLocaleDateString()
    return (
        <div className='form_card'>
            <div className="left_card_part">
                <img src="/img/Customer.svg" alt="" />
                <div className="customer_info">
                    <div className='customer_name'>{call.text}</div>
                    <div className='customer_phone'>{call.callPhone}</div>
                </div>
            </div>
            <div className="customer_date">
                <div className="c_date">{formData}</div>
            </div>
        </div>
    )
}