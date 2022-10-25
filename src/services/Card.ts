import Action from "./enum/Action";
import Direction from "./enum/Direction";
import Follower from "./enum/Follower";

export default interface Card {
  id: string,
  townNumber: number,
  direction: Direction,
  followerActions: FollowerActions[],
  monkFollower: Follower,
  monkAction: Action
}

export interface FollowerActions {
  follower: Follower,
  actions: Action[]
}
