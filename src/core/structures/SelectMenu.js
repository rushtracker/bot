import Base from './Base.js';

export default class SelectMenu extends Base {
  constructor(client, {
    name
  } = {}) {
    super(client);

    this.config = {
      name
    };
  }
}
