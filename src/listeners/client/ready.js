import Event from '../../core/structures/Event.js';

export default class ClientReadyEvent extends Event {
  constructor(client) {
    super(client, {
      name: 'client:ready',
      event: 'clientReady'
    });
  }

  async run() {
    console.log('connecté');
  }
}
