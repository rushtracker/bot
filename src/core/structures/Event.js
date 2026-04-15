import Base from './Base.js';

export default class Event extends Base {
  constructor(client, {
    name,
    event,
    process,
    rest
  } = {}) {
    super(client);

    this.config = {
      name,
      event,
      process,
      rest
    };
  }
}
