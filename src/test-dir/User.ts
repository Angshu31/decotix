import { Id } from "../decorators/attributes/Id";
import { MapField } from "../decorators/attributes/MapField";
import { MongoId } from "../decorators/attributes/MongoDB";
import { ManyToMany } from "../decorators/attributes/relations/ManyToMany";
import {
  ManyToOne,
  OneToMany,
} from "../decorators/attributes/relations/ManyToOne";
import { OneToOne } from "../decorators/attributes/relations/OneToOne";
import { MultiFieldId } from "../decorators/block-attributes/MultiFieldId";
import { Model } from "../decorators/Model";
import { Property } from "../decorators/Property";
import { Book } from "./Book";
import { Role } from "./Role";

@Model()
export class User {
  @Property()
  @Id()
  id: string;

  @OneToMany(() => Book, (book) => book.author)
  books?: Book[];

  @Property(() => Role)
  role: Role;
}
