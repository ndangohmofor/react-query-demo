import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroes = () => {
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    ["super-heroes"],
    fetchSuperHeroes,
    {
      enabled: false,
      staleTime: 30000,
      refetchOnMount: true,
      refetchIntervalInBackground: 2000,
    }
  );

  console.log({ isLoading, isFetching });

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes</h2>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};
