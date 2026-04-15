import { ApplicationCommandOptionType, bold, chatInputApplicationCommandMention, Collection, HeadingLevel } from 'discord.js';
import { readdirSync } from 'fs';

import Command from '../../../core/structures/Command.js';
import Container from '../../../services/Container.js';

export default class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      description: 'obtenir la liste des commandes',
      category: 'information',
      options: [
        {
          name: 'command',
          description: 'informations d\'une commande spécifique',
          type: ApplicationCommandOptionType.String,
          autocomplete: true
        }
      ]
    });
  }

  async run(interaction) {
    const command = this.client.commands.get(interaction.options.getString('command'));
    
    if (command) {
      const applicationCommand = await this.client.getApplicationCommand(command.config.name);

      this.safeReply(interaction, {
        components: [
          new Container()
          .addHeading(HeadingLevel.Three, chatInputApplicationCommandMention(applicationCommand.name, applicationCommand.id))
          .addUnorderedList([
            `${bold('description:')} ${command.config.description}`,
            `${bold('catégorie:')} ${command.config.category}`
          ])
        ]
      })
    } else {
      const container = new Container();
      const level = this.client.config.categories.level;
      const categories = this.client.commands
      .reduce((acc, c) => {
        const category = c.config.category || '?';

        if (!acc.has(category)) acc.set(category, []);
        acc.get(category).push(c);

        return acc;
      }, new Collection())
      .sort((a, b, ka, kb) => (level[ka] || 999) - (level[kb] || 999));

      for (const [category, commands] of categories) {
        container.addHeading(HeadingLevel.Three, category);
        const mentions = await Promise.all(
          commands.map(async (c) => {
            const applicationCommand = await this.client.getApplicationCommand(c.config.name);

            return chatInputApplicationCommandMention(applicationCommand.name, applicationCommand.id);
          })
        );

        container.addText(mentions.join(', '));
      }

      this.safeReply(interaction, {
        components: [
          container
        ]
      });
    }
  }

  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();
    const filtered = this.client.commands.filter((c) => c.config.name.includes(focusedValue));

    await interaction.respond(
      filtered.map((c) => ({
        name: c.config.name,
        value: c.config.name
      })).slice(0, 25)
    );
  }
}
