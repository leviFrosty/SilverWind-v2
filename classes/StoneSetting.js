import { v4 as uuidv4 } from "uuid";

export default class StoneSetting {
  image = "";
  description = "";
  enabled = true;
  constructor(image, description, enabled = true) {
    (this.id = uuidv4()),
      (this.image = image),
      (this.description = description),
      (this.enabled = enabled);
  }
}
