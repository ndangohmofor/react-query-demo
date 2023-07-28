import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

export const ParallelQueries = () => {
  const { isLoading: heroLoad, data: superHeroes } = useQuery(
    ["super-heroes"],
    fetchSuperHeroes
  );
  const { isLoading: friendLoad, data: friends } = useQuery(
    ["friends"],
    fetchFriends
  );

  return (
    <>
      <div>
        <ul>
          {!heroLoad &&
            superHeroes.data.map((hero) => {
              return (
                <li key={hero.id}>
                  {hero.name} = {hero.alterEgo}
                </li>
              );
            })}
        </ul>
      </div>
      <div>
        <ul>
          {!friendLoad &&
            friends.data.map((friend) => {
              return <li key={friend.id}>{friend.name}</li>;
            })}
        </ul>
      </div>
    </>
  );
};
