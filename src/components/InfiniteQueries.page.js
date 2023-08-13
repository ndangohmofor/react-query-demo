import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment } from "react";

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

export const InfiniteQueries = () => {
  const {
    isLoading,
    data,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 5) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div>
        {data?.pages.map((group, idx) => {
          return (
            <Fragment key={idx}>
              {group.data.map((color) => (
                <h2>
                  {color.id} - {color.label}
                </h2>
              ))}
            </Fragment>
          );
        })}
      </div>
      <div>
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load more
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};
