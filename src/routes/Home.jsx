// 이 파일은 게시판 목록 화면을 담당하는 컴포넌트 파일

import { useEffect, useState } from "react";
import styles from "./Home.module.css"

function Home() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 과정인지 아닌지를 boolean으로 저장

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then(a => {
                setList(a);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    if (loading) {
        return <div className={styles.loading}>데이터를 로드 중입니다...</div>;
    }

    // useEffect를 통해서 최초 렌더링 이후에 useEffect 안에 함수를 const 실행하는데,
    // 정상적으로 모든 작업이 끝났을 때 setLoading(false)를 통해 loading 값이 바뀌고
    // state 값이 바뀌었으므로 드 때 이 아래에 있는 return이 화면에 리렌더링 됨

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>커뮤니티 계시판</h1>
            <table className={styles.boardTable}>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자 ID</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={index} className={styles.tableRow}>
                            <td className={styles.idCell}>{item.id}</td>
                            <td className={styles.titleCell}>{item.title}</td>
                            <td className={styles.userIdCell}>{item.userId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Home;