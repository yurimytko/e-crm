import { AddPacks } from "../../components/AddPacks/addPacks";
import { NavBar } from "../../components/NavBar/nav";
import "./dist/packsPage.css";
import { useEffect, useState } from "react";
import { useGetPacksQuery } from "../../store/packsApi";
import { PackCard } from "../../components/PacksCard/packsCard";
import { Loader } from "../../components/Loader/loader";
import { UpPack } from "../../components/UpdatePack/upPack";

import { useLazyExportPacksQuery, useLazyExportPacksByIdQuery } from "../../store/exportApi";

export function PacksPage() {
    const [isSelected, setIsSelected] = useState(false);

    const { data: packs = [], isLoading, error } = useGetPacksQuery();

    const [packId, setPackId] = useState()

    const [triggerExport] = useLazyExportPacksQuery()
    const [triggerExportById] = useLazyExportPacksByIdQuery()

    const [selectedIds, setSelectedIds] = useState([]);


    const handleButtonClick = () => {
        setIsSelected(!isSelected);
        if(isSelected === false){
            setSelectedIds([])
        }
    };

    const openAddMenu = () => {
        const menuElement = document.getElementById("packs_modal");
        menuElement.style.display = "flex";

        setTimeout(() => {
            menuElement.style.opacity = "1";
        }, 300);
    };


    const getPackId = (id) => {
        setPackId(id)
        console.log(packId)
    }

    useEffect(() => {
        console.log(packId)
    }, [packId])


    const handleClick = async () => {
        try {
            let result;
            if (isSelected && selectedIds.length > 0) {
                result = await triggerExportById({ id: selectedIds.join(',') });
            } else {
                result = await triggerExport();
            }

            if (result.error) {
                console.error("Error exporting product:", result.error);
            } else {
                console.log("Raw CSV Data:", result.data);

                const blob = new Blob([result.data], { type: 'text/csv;charset=utf-8;' });

                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.href = url;
                link.setAttribute('download', 'Набори.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (err) {
            console.error("Error exporting product:", err);
        }
    };


    const handleCheckboxChange = (event, id) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelectedIds(prevIds => [...prevIds, id]);
        } else {
            setSelectedIds(prevIds => prevIds.filter(ide => ide !== id));
        }
    };


    return (
        <div className="packs_page">
            <NavBar />
            <div className="packs_window">
                <div className="page_title">Список Наборів</div>
                <div className="control_packs">
                    <button className="add_product" onClick={openAddMenu}>
                        <img src="./img/plus.png" alt="" />
                        <p className="btn_text">Створити набір</p>
                    </button>
                    <div className="search_con">
                        <input
                            className="search_i"
                            type="text"
                            placeholder="Введіть тег і натисніть Enter"
                        />
                    </div>
                    <button className="select_btn" onClick={handleButtonClick}>
                        <img src="./img/Group 20574425.svg" alt="" /> Виділити товар
                    </button>
                    <button
                        style={{ opacity: isSelected ? 1 : 0 }}
                        className="delete"
                    >
                        <img src="./img/Delete (1).svg" alt="" /> Видалити виділене
                    </button>
                </div>

                <div className="parent">
                    <div style={{ opacity: 0 }} className="div1 delete_check">

                    </div>
                    <div className="div2 packs_column_title">НТ</div>
                    <div className="div3 packs_column_title">Артикул</div>
                    <div className="div4 packs_column_title">Дата Створення</div>
                    <div className="div5 packs_column_title">Назва набору</div>
                    <div className="div6 packs_column_title">Перелік товарів</div>

                    <div className="div9 packs_column_title">Ціна</div>
                    <div className="div10 packs_column_title">Кількість</div>
                    <div className="div11 packs_column_title">Наявніть</div>
                    <div onClick={handleClick} className="div12 packs_export">
                        <div className="export_btn_p">
                            <img src="/img/Export CSV.svg" alt="" />
                        </div>
                    </div>
                </div>

                <div className="packs_con">
                    {isLoading && <Loader />}

                    {packs.packs && packs.packs.length > 0 ? (
                        packs.packs.map((pack) => (
                            <PackCard handleCheckboxChange={handleCheckboxChange} isSelected={isSelected} getPackId={getPackId} key={pack._id} pack={pack} />
                        ))
                    ) : (
                        <div>No packs available</div>
                    )}
                </div>
            </div>
            <AddPacks />
            <UpPack packId={packId} />
        </div>
    );
}
