import { Id } from "../decorators/attributes/Id";
import { OneToMany } from "../decorators/attributes/relations/ManyToOne";
import { Model } from "../decorators/Model";
import { Property } from "../decorators/Property";
import { Book } from "./Z_Book";
import { Role } from "./Role";
import { ManyToMany, OneToOne } from "..";

@Model()
export class User {
  @Property()
  @Id()
  id: string;

  @ManyToMany(() => Book, (book) => book.authors)
  books: Book[];

  @Property(() => Role)
  role: Role;
}
