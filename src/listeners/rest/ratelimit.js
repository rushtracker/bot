import Event from '../../core/structures/Event.js';

export default class ClientErrorEvent extends Event {
  constructor(client) {
    super(client, {
      name: 'client:ratelimit',
      event: 'rateLimit',
      rest: true
    });
  }

  async run(data) {
    console.error('rate limit:', data);
  }
}
