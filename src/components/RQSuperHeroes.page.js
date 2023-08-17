import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useSuperHeroesData,
  useAddSuperHeroesData,
} from "../hooks/useSuperHeroesData";

export const RQSuperHeroes = () => {
  const [fetchInterval, setFetchInterval] = useState(3000);
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccess = (result) => {
    console.log("Perform side effect after data fetching", result);
    if (result.data.length >= 4) {
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

  const { mutate } = useAddSuperHeroesData();

  const handleAddHeroClick = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    mutate(hero);
  };

  console.log({ isLoading, isFetching });

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  console.log("Data: ", data);

  return (
    <>
      <h2>RQ Super Heroes</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Hero name"
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
          placeholder="Alter Ego"
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.name}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* <h2>RQ Super Heroes</h2>
      <button onClick={refetch}>Fetch Heroes</button>
      {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </>
  );
};
