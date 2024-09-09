import "./dist/client.css"


export function ClientCard({user}){
    return(
        <div className="card">
            <div className="table_info_c">001</div>
            <div className="table_info_c">{user.fullname}</div>
            <div className="table_info_c">{user.phone}</div>
            <div className="table_info_c">{user.email}</div>
            <div className="table_info_c">001</div>
            <div className="table_info_c">001</div>


        </div>
    )
}