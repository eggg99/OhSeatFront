import React from "react";

interface Comment {
    commentId: number;
    content: string;
    commenterId : string;
    authorNickname: string;
    createdAt: string;
}

interface CommentListProps {
    comments: Comment[];

}

export const CommentList:React.FC<CommentListProps> = ({comments}) => {
    if (!comments || comments.length === 0) {
        return <div>댓글이 없습니다 🥲</div>
    }
    return (
        <div className="post_comment_wrap">
            <ul className="post_comment_list">
                {comments.map((c: Comment) => (
                    <li key={c.commentId}>
                        <h4>{c.authorNickname}</h4>
                        <p>{c.content}</p>


                    </li>
                ))}
            </ul>
        </div>
    )
}