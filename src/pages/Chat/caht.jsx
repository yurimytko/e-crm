import { useState } from "react";
import { NavBar } from "../../components/NavBar/nav";
import "./dist/chat.css";
import { FormCard } from "../../components/BackFormCard/formCard";
import { CustommerChatCard } from "../../components/CustomerChatCard/customerChat";

export function ChatPage() {
    const [activeButton, setActiveButton] = useState('feedback'); // Default active button

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
                            <FormCard />
                            <FormCard />
                            <FormCard />
                        </div>

                    ) : (
                        <div className="from_cards_con">
                            <CustommerChatCard/>
                            <CustommerChatCard/>
                            <CustommerChatCard/>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
