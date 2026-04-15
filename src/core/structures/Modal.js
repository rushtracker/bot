import Base from './Base.js';

export default class Modal extends Base {
  constructor(client, {
    name
  } = {}) {
    super(client);

    this.config = {
      name
    };
  }
}
