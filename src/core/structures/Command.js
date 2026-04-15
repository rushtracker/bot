import Base from './Base.js';

export default class Command extends Base {
  constructor(client, {
    name,
    description,
    category,
    options
  } = {}) {
    super(client);

    this.config = {
      name,
      description,
      category,
      options
    };
  }
}
