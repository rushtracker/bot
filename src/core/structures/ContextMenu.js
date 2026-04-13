import Base from './Base.js';

export default class ContextMenu extends Base {
  constructor(client, {
    name,
    type,
    perms,
    meperms
  } = {}) {
    super(client);

    this.config = {
      name,
      type,
      perms,
      meperms
    };
  }
}
