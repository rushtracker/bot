import Base from './Base.js';

export default class Event extends Base {
  constructor(client, {
    name,
    process,
    rest
  } = {}) {
    super(client);

    this.config = {
      name,
      process,
      rest
    };
  }
}
