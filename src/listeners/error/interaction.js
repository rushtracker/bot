import Event from '../../core/structures/Event.js';

export default class ErrorInteractionEvent extends Event {
  constructor(client) {
    super(client, {
      name: 'error:interaction'
    });
  }

  async run(error) {
    this.errorReply(interaction);
    console.log(error);
  }
}
