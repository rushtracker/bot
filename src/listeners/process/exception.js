import Event from '../../core/structures/Event.js';

export default class ProcessExceptionEvent extends Event {
  constructor(client) {
    super (client, {
      name: 'process:exception',
      event: 'uncaughtException',
      process: true
    });
  }

  async run(error) {
    console.error('uncaught exception:', error);
  }
}
