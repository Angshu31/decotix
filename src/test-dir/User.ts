import { Id } from "../decorators/attributes/Id";
import { MapField } from "../decorators/attributes/MapField";
import { MultiFieldId } from "../decorators/block-attributes/MultiFieldId";
import { Model } from "../decorators/Model";
import { Property } from "../decorators/Property";

@Model()
@MultiFieldId(["id", "id2"])
export class User {
  @Property()
  id: string;

  @Property()
  id2: string;

  @Property()
  @MapField("somefloat2")
  somefloat: number;
}
