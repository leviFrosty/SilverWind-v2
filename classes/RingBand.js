import { v4 as uuidv4 } from "uuid";

export default class RingBand {
  image = "";
  description = "";
  enabled = true;
  constructor(image, description, enabled) {
    (this.id = uuidv4()),
      (this.image = image),
      (this.description = description);
      (this.enabled = true || enabled)
  }
}
