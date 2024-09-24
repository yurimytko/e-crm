import { NavBar } from "../../components/NavBar/nav"
import { useState } from "react";

import { useNavigate } from 'react-router-dom';

import "./dist/userChat.css"

export function UserChat() {
    const [text, setText] = useState("");


    const navigate = useNavigate(); // Initialize navigate

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="user_chat">
            <NavBar />
            <div className="chat">
                <button className='back_btn' onClick={handleBack}> <img src="/img/Group 53.svg" alt="" />Назад</button>
                <div className="chat_window_c">

                </div>
                <div className="control_review">
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        type="text"
                        placeholder="Напишіть відповідь"
                    />
                    <button>Відповісти</button>
                </div>
            </div>
        </div>
    )
}