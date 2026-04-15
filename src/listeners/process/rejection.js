import Event from '../../core/structures/Event.js';

export default class ProcessRejectionEvent extends Event {
  constructor(client) {
    super (client, {
      name: 'process:rejection',
      event: 'unhandledRejection',
      process: true
    });
  }

  async run(error) {
    console.error('unhandled rejection:', error);
  }
}
