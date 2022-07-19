import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { getPostsPage } from "./api/axios";
import { Post } from "./components/Post";
import usePosts from "./hooks/usePosts";

export const Example2 = () => {
    const {
        fetchNextPage,
        data,
        isLoading,
        hasNextPage,
        isFetchingNextPage,
        status,
        error,
    } = useInfiniteQuery(
        "/posts",
        ({ pageParam = 1 }) => getPostsPage(pageParam),
        {
            staleTime: 1000000,
            getNextPageParam: (lastPage, allPages) => {
                console.log({ lastPage, allPages });

                return lastPage?.length ? allPages?.length + 1 : undefined;
            },
        }
    );

    // useEffect(() => {
    //     console.log(data?.pages);
    // }, [data]);

    // useEffect(() => {
    //     console.log(fetchNextPage);
    // }, [fetchNextPage]);

    const intObserver = useRef();
    const lastPostRef = useCallback(
        (post) => {
            if (isFetchingNextPage) return;
            // console.log(post, intObserver);

            if (intObserver.current) {
                // console.log(intObserver.current);
                intObserver.current?.disconnect();
            }

            intObserver.current = new IntersectionObserver((posts) => {
                if (posts[0].isIntersecting && hasNextPage) {
                    console.log("closer");
                    fetchNextPage();
                }
            });

            if (post) intObserver.current.observe(post);
        },
        [isFetchingNextPage, fetchNextPage, hasNextPage]
    );

    if (status === "error") return <h3>Error: {error?.message}</h3>;

    const content = data?.pages.map((pg) => {
        return pg?.map((post, index) => {
            if (pg?.length === index + 1) {
                return <Post key={post?.id} post={post} ref={lastPostRef} />;
            }

            return <Post key={post?.id} post={post} />;
        });
    });

    return (
        <div>
            <h1>Example 1</h1>
            <h1>Infinite Scroll with React</h1>

            {isLoading && <h2 style={{ color: "white" }}>Loading...</h2>}

            <div>{content}</div>

            {hasNextPage && <p>Loading more posts...</p>}
            {/* <p ref={loader}>Loading more posts...</p> */}
        </div>
    );
};
