import Base from './Base.js';

export default class Button extends Base {
  constructor(client, {
    name,
    perms,
    meperms
  } = {}) {
    super(client);
    
    this.config = {
      name,
      perms,
      meperms
    };
  }
}
