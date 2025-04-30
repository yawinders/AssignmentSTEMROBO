import React from "react";
import styles from "../styles/StudentModal.module.css";

const StudentModal = ({ student, posts, onClose }) => {
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            {/* stop Propagation to avoid event bubbling */}
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2>{student.name}</h2>
                <p>Email: {student.email}</p>
                <p>City: {student.address.city}</p>
                <h3>Performance Posts:</h3>
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default StudentModal;
