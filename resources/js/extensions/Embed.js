import { Extension } from '@tiptap/core'

export default  Extension.create({
  name: 'Embed',

  addPasteRules() {
    return [
      {
        find: /^(https?:\/\/)?(www\.youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)$/g,
        handler: ({ match, commands }) => {
          const url = match[0];
          const options = {
            identifier: 'embed',
            values: {
                embed: url
             },
          };

          commands.insertScribbleBlock(options);
        }
      },
    ];
  }
});
