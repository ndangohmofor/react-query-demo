import React, { useState } from "react";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

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

  const hookConfigs = {
    fetchInterval: fetchInterval,
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError, hookConfigs);

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
