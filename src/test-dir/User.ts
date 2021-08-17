import { Model, Property, Id, Relation } from "..";
import { UserProfile } from "./Profile";

@Model()
// @ObjectType()
export class User {
  // @Field(() => ID)
  @Property(() => String)
  @Id("uuid")
  id: string;

  // @Field(() => UserProfile)
  @Property(() => UserProfile)
  @Relation("UserProfileRelation", {
    fields: ["profileId"],
    references: ["id"],
  })
  profile: UserProfile;

  // TODO: Add Project relation
  ownedProjects: any[];

  // TODO: Add ProjectMember relation
  allProjects: any[];

  // TODO: Add Liked Projects relation
  likedProjects: any[];

  // TODO: Add Followed Projects relation
  followedProjects: any[];

  // @Field(() => [User])
  @Relation("UserFollowRelation", { references: ["id"] })
  @Property(() => [User])
  following: User[];

  // @Field(() => [User])
  @Relation("UserFollowRelation", { references: ["id"] })
  @Property(() => [User])
  followers: User[];

  // TODO: Add Post relationships
  posts: any[];
  likedPosts: any[];
  likedComments: any[];
  viewablePosts: any[];
}
