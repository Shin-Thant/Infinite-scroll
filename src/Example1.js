import React, { useCallback, useEffect, useRef, useState } from "react";
import { Post } from "./components/Post";
import usePosts from "./hooks/usePosts";

export const Example1 = () => {
    const [pageNum, setPageNum] = useState(1);
    const { results, isLoading, isError, error, hasNextPage } =
        usePosts(pageNum);

    const intObserver = useRef();
    const lastPostRef = useCallback(
        (post) => {
            if (isLoading) return;
            // console.log(post, intObserver);

            if (intObserver.current) {
                // console.log(intObserver.current);
                intObserver.current?.disconnect();
            }

            intObserver.current = new IntersectionObserver((posts) => {
                if (posts[0].isIntersecting && hasNextPage) {
                    console.log("closer");
                    setPageNum((prev) => prev + 1);
                }
            });

            if (post) intObserver.current.observe(post);
        },
        [isLoading, hasNextPage]
    );

    if (isError) return <h3>Error: {error?.message}</h3>;

    const content = results?.map((post, index) => {
        if (results?.length === index + 1) {
            return <Post key={post?.id} post={post} ref={lastPostRef} />;
        }

        return <Post key={post?.id} post={post} />;
    });

    return (
        <div>
            <h1>Example 1</h1>
            <h1>Infinite Scroll with React</h1>

            {/* <div style={{ minHeight: "100vh" }}>
                {results?.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div> */}

            <div>{content}</div>

            {isLoading && <p>Loading more posts...</p>}
            {/* <p ref={loader}>Loading more posts...</p> */}
        </div>
    );
};
