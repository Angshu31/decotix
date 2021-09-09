import { Id } from "../decorators/attributes/Id";
import { ManyToMany } from "../decorators/attributes/relations/ManyToMany";
import {
  ManyToOne,
  OneToMany,
} from "../decorators/attributes/relations/ManyToOne";
import { OneToOne } from "../decorators/attributes/relations/OneToOne";
import { Model } from "../decorators/Model";
import { Property } from "../decorators/Property";
import { User } from "./User";

@Model()
export class Book {
  @Property()
  @Id()
  id: string;

  @ManyToOne(() => User, (user) => user.books)
  author: User;
}
