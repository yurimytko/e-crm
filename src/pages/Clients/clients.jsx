import { ClientCard } from "../../components/ClientCard/clientCard"
import { NavBar } from "../../components/NavBar/nav"
import "./dist/clients.css"
import { useGetUsersQuery } from "../../store/adminApi"

export function Clients(){

    const {data, isLoading, error} = useGetUsersQuery()

    console.log(data)


    return(
        <div className="clients_page">
            <NavBar/>

            <div className="clients">
                <p className="page_heading">Список Клієнтів</p>
                <div className="clients_control">
                    <div className="input-container">
                        <img className="search" src="./img/search.png" alt="" />
                        <input type="text" className="client_search" />
                    </div>
                    <button className="client_filter"><img src="./img/Filter.svg" alt="" /> Фільтр клієнтів</button>
                </div>


                <div className="table_section_c">

                    <div className="table_titles">HT</div>
                    <div className="table_titles">ПІБ</div>
                    <div className="table_titles">Телефон</div>
                    <div className="table_titles">E-mail</div>
                    <div className="table_titles">Місто</div>
                    <div className="table_titles">Останнє</div>
                </div>
                <div className="client_section">
                    {data?.map(user => (
                        <ClientCard key={user.id} user={user} />
                    ))}
                </div>
            </div>
        </div>
    )
}