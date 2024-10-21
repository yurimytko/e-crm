import { useState } from "react";
import { NavBar } from "../../components/NavBar/nav";
import "./dist/chat.css";
import { FormCard } from "../../components/BackFormCard/formCard";
import { CustommerChatCard } from "../../components/CustomerChatCard/customerChat";

import { useGetCallsQuery } from "../../store/calls";
import { Loader } from "../../components/Loader/loader";

export function ChatPage() {
    const [activeButton, setActiveButton] = useState('feedback'); // Default active button

    const { data: calls = [], isLoading, Error } = useGetCallsQuery()

    console.log(calls)

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    return (
        <div className="chat_page">
            <NavBar />
            <div className="chat_window">
                <div className="page_title">Чат підтримки</div>
                <div className="chat_control">
                    <button
                        className={`back_form ${activeButton === 'feedback' ? 'active_btn' : ''}`}
                        onClick={() => handleButtonClick('feedback')}
                    >
                        <img src={activeButton === 'feedback' ? "/img/phoneactive.svg" : "/img/phone.svg"} alt="" />
                        <span>Зворотній зв'язок</span>
                    </button>
                    <button
                        className={`chat_form ${activeButton === 'support' ? 'active_btn' : ''}`}
                        onClick={() => handleButtonClick('support')}
                    >
                        <img src={activeButton === 'support' ? "/img/mailactive.svg" : "/img/mail.svg"} alt="" />
                        <span>Чати підтримки</span>
                    </button>
                </div>

                <div className="content">
                    {activeButton === 'feedback' ? (
                        <div className="from_cards_con">
                            {isLoading && <Loader/>}
                            {calls?.calls?.length > 0 && calls?.calls?.map(call => (
                                <FormCard key={call._id} call={call} />
                            ))}

                            

                        </div>

                    ) : (
                        <div className="from_cards_con">
                            <CustommerChatCard />
                            <CustommerChatCard />
                            <CustommerChatCard />

                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}
