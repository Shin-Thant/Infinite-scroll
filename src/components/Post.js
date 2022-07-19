import React, { useEffect, useState } from "react";

export const Post = React.forwardRef(({ post }, ref) => {
    // const [num, setNum] = useState(1);
    useEffect(() => {
        console.log("log" + post.id);
    }, []);
    const PostBody = (
        <>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>Post Id : {post.id}</p>
        </>
    );

    const content = ref ? (
        <article ref={ref}>{PostBody}</article>
    ) : (
        <article>{PostBody}</article>
    );

    return <div>{content}</div>;
});
