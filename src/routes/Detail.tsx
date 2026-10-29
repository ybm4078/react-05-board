// 이 파일은 글 상세 화면을 담당하는 컴포넌트 파일

import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { StyledContainer, StyledLoading } from "../styles/commonStyle.ts";
import type { Post } from "../types/post.ts";
import styled from "styled-components";

const BackLink = styled(Link)`
    color: #666;
    font-size: 14px;
    padding: 8px 12px;
    border-radius: 6px;
    background-color: #f1f3f5;
    border: 1px solid #666;
    &:hover {
        background-color: #e9ecef;
        color: #0077ff;
    }
`;

const Article = styled.article`
    border-top: 1px solid #eee;
    margin-top: 20px;
    padding-top: 40px;
`;

const Title = styled.h2`
    font-size: 2.5rem;
    font-weight: 800;
    color: #111;
    margin-bottom: 24px;
`;

const Meta = styled.div`
    color: #888;
    margin-bottom: 40px;
`;

const Body = styled.div`
    font-size: 1.15rem;
    line-height: 1.8;
    white-space: pre-wrap;
`;

function Detail() {

    const { id } = useParams();

    const [post, setPosts] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then(json => {
                setPosts(json);
                setLoading(false);
            })
            .catch((err:unknown)=> {
                if (err instanceof Error){
                    console.log(err.message)
                } else {
                    console.log(err)
                }
            });
    }, []);

    if (loading) {
        return (
            <StyledLoading>본문을 불러오는 중입니다...</StyledLoading>
        );
    }

    if (!post) {
        return (
            <StyledLoading>존재하지 않는 게시글입니다.</StyledLoading>
        );
    }

    return (
        <StyledContainer>
            <BackLink to={"/"}>&larr; 목록으로 돌아가기</BackLink>

            <Article>
                <Title>{post.title}</Title>
                <Meta>
                    <span>게시글 번호 : {post.id}</span>
                    <span style={{ margin: "0 12px" }}>|</span>
                    <span>작성자 : {post.userId}</span>
                </Meta>
                <Body>{post.body}</Body>
            </Article>
        </StyledContainer>
    );
}
export default Detail;