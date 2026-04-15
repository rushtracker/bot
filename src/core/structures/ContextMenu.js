import Base from './Base.js';

export default class ContextMenu extends Base {
  constructor(client, {
    name,
    type
  } = {}) {
    super(client);

    this.config = {
      name,
      type
    };
  }
}
