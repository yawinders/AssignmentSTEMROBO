import React from "react";
import styles from "../styles/StudentRow.module.css";

const StudentRow = ({ student, posts, onSelect }) => {
    return (
        <tr className={styles.studentRow} onClick={() => onSelect(student)}>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.address.city}</td>
            <td>{posts.length}</td>
        </tr>
    );
};

export default StudentRow;
