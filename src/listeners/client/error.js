import Event from '../../core/structures/Event.js';

export default class ClientErrorEvent extends Event {
  constructor(client) {
    super(client, {
      name: 'client:error',
      event: 'error'
    });
  }

  async run(error) {
    console.error('error:', error);
  }
}
