import { useEffect, useState } from "react";
import { Link } from "react-router";
import { StyledContainer, StyledLoading } from "../styles/commonStyle.ts";
import styled from "styled-components";
import type { Post } from "../types/post.ts";



const Title = styled.h1`
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 24px;
    color: #111;
`;

const BoardTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-top: 2px solid #333;

    th,
    td {
        padding: 16px 14px;
    }
    th {
        background-color: #f8f9fa;
        font-size: 14px;
        font-weight: 600;
        color: #444;
        border-bottom: 1px solid #dee2e6;
        text-align: center;
    }
    td {
        border-bottom: 1px solid #eee;
    }
`;

const TableRow = styled.tr`
    transition: background-color 0.2s;
    &:hover {
        background-color: #f1f7ff;
    }
`;

const IdCell = styled.td`
    width: 80px;
    text-align: center;
    color: #888;
`;

const TitleCell = styled.td`
    text-align: left;
`;

const UserIdCell = styled.td`
    text-align: center;
    color: #666;
`;

const StyledLink = styled(Link)`
    color: #333;
    &:hover {
        color: #191969;
        border-bottom: 1px solid #191969;
    }
`;




// 리액트에서 "컴포넌트"라는 녀석은,
// 자바스크립트 입장에서 "Element"타입의 내용을 리턴하는 함수를 뜻함
function Home() {
    const [list, setList] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then((a:Post[]) => {
                setList(a);
                setLoading(false);
            })
            .catch((err:unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log("알 수 없는 에러 :"+err);
                }
            });
    }, []);

    if (loading) {
        return <StyledLoading>데이터를 로드 중입니다...</StyledLoading>;
    }

       return (
           <StyledContainer>
               <Title>커뮤니티 계시판</Title>
               <BoardTable>
                   <thead>
                       <tr>
                           <th>번호</th>
                           <th>제목</th>
                           <th>작성자 ID</th>
                       </tr>
                   </thead>
                   <tbody>
                       {list.map((item, index) => (
                           <TableRow key={index}>
                               <IdCell>{item.id}</IdCell>
                               <TitleCell>
                                   <StyledLink to={`/${item.id}`}>
                                       {item.title}
                                   </StyledLink>
                               </TitleCell>
                               <UserIdCell>{item.userId}</UserIdCell>
                           </TableRow>
                       ))}
                   </tbody>
               </BoardTable>
           </StyledContainer>
       );
}
export default Home;