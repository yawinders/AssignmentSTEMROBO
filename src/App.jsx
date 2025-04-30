import { useState, useEffect, useRef } from 'react'
import styles from './styles/App.module.css'
import './App.css'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import StudentRow from './components/StudentRow'
import StudentModal from './components/StudentModal'

function App() {
  const [students, setStudents] = useState([])
  const [posts, setPosts] = useState([])
  const [searchQuery, setSearchQuery] = useState("");  //name search
  const [sortedStudents, setSortedStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // for displaying details in modal
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [page, setPage] = useState(1); //pagination deafault page1
  const inputRef = useRef(null)
  const totalPages = Math.ceil(sortedStudents.length / 5);


  const fetchingDatas = async () => {
    setIsLoadingApi(true)
    try {
      const studentsdata = await axios.get("https://jsonplaceholder.typicode.com/users"); //user data
      const postsdata = await axios.get("https://jsonplaceholder.typicode.com/posts"); //post data
      setStudents(studentsdata.data);
      setPosts(postsdata.data);
      setIsLoadingApi(false)
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchingDatas()

  }, [])


  console.log(students);
  console.log("postsdata", posts);

  useEffect(() => {
    const filteredStudents = students.filter(student =>     //filter by student name only
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSortedStudents(filteredStudents);
    inputRef.current.focus()
  }, [students, searchQuery]);   //whenever the searchquery of name changes sortedstudents gets updated

  const handleSort = (field) => { //sorting on name and city


    const sorted = [...sortedStudents].sort((a, b) => {
      //  city is inside address obj and name is direct 
      //keeping asc order
      if (field === "city") {
        if (a.address[field] < b.address[field]) return -1;
        if (a.address[field] > b.address[field]) return 1;
      } else {
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;
      }
      return 0;
    });
    setSortedStudents(sorted);
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div className={styles.appContainer}>
      <h2>STEMROBO Technologies Assignment</h2>
      {isLoadingApi ? <p>Loading...</p> : (
        <>
          {/* Search Bar  */}
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} inputRef={inputRef} />
          {/* table sec start  */}
          <table className={styles.studentTable}>
            <thead>
              <tr>
                <th onClick={() => handleSort("name")}>Name</th>
                <th>Email</th>
                <th onClick={() => handleSort("city")}>City</th>
                <th>Performance Entries</th>
              </tr>
            </thead>
            <tbody>
              {/* rendering sorted student and passing total post of sinlgle student using filter as a prop  */}
              {sortedStudents.slice(page * 5 - 5, page * 5).map((student) => (
                <StudentRow
                  key={student.id}
                  student={student}
                  posts={posts.filter((post) => post.userId === student.id)}
                  onSelect={handleSelectStudent}
                />
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className={styles.pagination}>
            {[...Array(totalPages)].map((_, idx) => {
              return <span key={idx}
                className={`${styles.paginationSpan} ${page === (idx + 1) ? styles.active : ""}`}
                onClick={() => setPage(idx + 1)}>{idx + 1}</span>
            })}
          </div>
          {/* if student gets selected displayig the modal  */}
          {selectedStudent && (
            <StudentModal student={selectedStudent} posts={posts.filter(post => post.userId === selectedStudent.id)} onClose={() => setSelectedStudent(null)} />
          )}
        </>

      )}

    </div>
  );
}

export default App
