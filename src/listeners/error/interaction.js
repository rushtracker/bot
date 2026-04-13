import Event from '../../core/structures/Event.js';

export default class ErrorInteraction extends Event {
  constructor(client) {
    super(client, {
      name: 'error:interaction'
    });
  }

  async run(error) {
    console.log(error);
  }
}
