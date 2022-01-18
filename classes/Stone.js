import { v4 as uuidv4 } from "uuid";

export default class Stone {
  image = "";
  description = "";
  quantity = 0;
  dimensions = "";
  constructor(image, description, quantity, dimensions) {
    (this.id = uuidv4()),
      (this.image = image),
      (this.description = description),
      (this.quantity = quantity),
      (this.dimensions = dimensions);
  }
}
