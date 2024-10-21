import "./dist/review.css";
import { useState } from "react";
import { usePutReviewsMutation, useDeleteReviewsMutation } from "../../store/reviewsApi";

export function ReviewCard({ review }) {
    const [text, setText] = useState("");
    const [putReview] = usePutReviewsMutation();
    const [deleteReview] = useDeleteReviewsMutation()

    const putReviewFunc = async () => {
        try {
            const reviews = {
                id: review._id,
                replyText: text,
            };

            await putReview(reviews).unwrap(); 
            setText(""); 
            window.location.reload()
        } catch (e) {
            console.error(e);
        }
    };

    const deleteReviewFunc = async () => {
        try {
            const reviews = {
                id: review._id,
            };

            await deleteReview(reviews).unwrap(); 
        } catch (e) {
            console.error(e);
        }
    };
    const formData = new Date(review.createdAt).toLocaleDateString();

    return (
        <div className="review_card">
            <div className="r_card">
                <img onClick={deleteReviewFunc} className="delete_rew" src="/img/Delete.svg" alt="" />
                <div className="date">{formData}</div>
                <div className="rev_name">Відгук від покупця:</div>
                <div className="text_rew">{review.content.text}</div>
            </div>
            <div className="answer">
                {review.content.reply.map((rev, index) => (
                    <div className="res_card" key={index}>
                        <div className="date">{new Date(rev.repliedAt).toLocaleDateString()}</div>
                        <div className="who_name">Модерація</div>

                        <div className="rev_name">Відповідь на коментар:</div>
                        {rev.replyText}
                    </div>
                ))}
            </div>
            <div className="control_review">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    placeholder="Напишіть відповідь"
                />
                <button onClick={putReviewFunc}>Відповісти</button>
            </div>
        </div>
    );
}
