import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroes = () => {
  const [fetchInterval, setFetchInterval] = useState(3000);

  const onSuccess = (result) => {
    console.log("Perform side effect after data fetching", result);
    if (result.length >= 4) {
      setFetchInterval(false);
      console.log("fetch interval", fetchInterval);
    }
  };

  const onError = (result) => {
    console.log("Perform side effect after encountering error", result);
    setFetchInterval(false);
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    ["super-heroes"],
    fetchSuperHeroes,
    {
      refetchInterval: fetchInterval,
      onSuccess,
      onError,
      select: (data) => {
        const superHeroNames = data.data.map((hero) => hero.name);
        return superHeroNames;
      },
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
      {/* <h2>RQ Super Heroes</h2>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })} */}
      <h2>RQ Super Heroes</h2>
      <button onClick={refetch}>Fetch Heroes</button>
      {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })}
    </>
  );
};
