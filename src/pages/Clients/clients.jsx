import { ClientCard } from "../../components/ClientCard/clientCard";
import { NavBar } from "../../components/NavBar/nav";
import "./dist/clients.css";
import { useGetUsersQuery } from "../../store/adminApi";
import { useLazyExportUsersQuery } from "../../store/exportApi";
import { useState } from "react"; // Add this if needed

export function Clients() {
  // Fetch users
  const { data: usersData, isLoading: usersLoading, error: usersError } = useGetUsersQuery();

  // Lazy query for export
  const [triggerExport, { isLoading: exportLoading }] = useLazyExportUsersQuery();

  // Handle export button click
  const handleClick = async () => {
    try {
      const result = await triggerExport(); // Trigger the query manually

      if (result.error) {
        console.error("Error exporting users:", result.error);
      } else {
        console.log("Raw CSV Data:", result.data); // Log the raw CSV data

        const blob = new Blob([result.data], { type: "text/csv;charset=utf-8;" });

        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute("download", "Клієнти.csv"); // Set filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error("Error exporting users:", err);
    }
  };

  return (
    <div className="clients_page">
      <NavBar />

      <div className="clients">
        <p className="page_heading">Список Клієнтів</p>
        <div className="clients_control">
          <div className="input-container">
            <img className="search" src="./img/search.png" alt="" />
            <input type="text" className="client_search" />
          </div>
          <button className="client_filter">
            <img src="./img/Filter.svg" alt="" /> Фільтр клієнтів
          </button>
        </div>

        <div className="table_section_c">
          <div className="table_titles">HT</div>
          <div className="table_titles">ПІБ</div>
          <div className="table_titles">Телефон</div>
          <div className="table_titles">E-mail</div>
          <div className="table_titles">Місто</div>
          <div className="table_titles">Останнє</div>

          {/* Export Button */}
          <div className="export_btn" onClick={handleClick}>
            <img src="/img/Export CSV.svg" alt="Export CSV" />
          </div>
        </div>

        {/* Display users */}
        <div className="client_section">
          {usersLoading && <p>Loading clients...</p>}
          {usersError && <p>Error loading clients: {usersError.message}</p>}
          {usersData &&
            usersData.map((user) => <ClientCard key={user.id} user={user} />)}
        </div>
      </div>
    </div>
  );
}
