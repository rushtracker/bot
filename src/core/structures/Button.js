import Base from './Base.js';

export default class Button extends Base {
  constructor(client, {
    name
  } = {}) {
    super(client);
    
    this.config = {
      name
    };
  }
}
