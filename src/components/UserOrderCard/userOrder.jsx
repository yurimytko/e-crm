import { OrderProduct } from '../UserOrderProduct/orderProduct'
import './dist/useOrder.css'


export function UserOrder({item}) {



    const formData =  new Date(item.createdAt).toLocaleDateString()

    return (
        <div class="parent">
            <div class="div1 grid_title_column">нз</div>
            <div class="div2 grid_title_column">дата створення</div>
            <div class="div3 grid_title_column">Доставка</div>
            <div class="div4 grid_title_column">Місто</div>
            <div class="div5 grid_title_column">Відділення</div>
            <div class="div6 grid_title_column">Оплата</div>
            <div class="div7 grid_title_column">Тип оплати</div>
            <div class="div8 grid_title_column">Коментар від менеджера</div>
            <div class="div9 grid_title_column">Коментар до замовлення</div>
            <div class="div10">Виконано</div>
            <div class="div11 order_id"> qwer</div>
            <div class="div12">
                <span>Разом</span>
                <span>{item.cost} грн</span>

            </div>
            <div class="div13 comments_column">{item.managerComment}</div>
            <div class="div14 comments_column">{item.customerComment}</div>
            <div class="div15 orders_info">
                {
                    item.localStorage.map((product, index)=> (
                        <OrderProduct key={index} product={product}/>

                    ))
                }


            </div>
            <div class="div16 grid_info_column">{formData}</div>
            <div class="div17 grid_info_column">{item.deliveryType}</div>
            <div class="div18 grid_info_column"> {item.city}</div>
            <div class="div19 grid_info_column">{item.address}</div>
            <div class="div20 grid_info_column">{item.payment ? 'Успішна' : 'Відсутня'}</div>
            <div class="div21 grid_info_column"> eue</div>
        </div>
    )
}