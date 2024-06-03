import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { DOMParser as ProseMirrorDOMParser } from 'prosemirror-model'


export default Extension.create({
  name: 'oEmbedExtension',

  addCommands() {
    return {
      setOembedContent: options => ({ commands }) => {
        return commands.insertContent(`<div class="oembed">${options.html}</div>`)
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('handlePaste'),
        props: {
          handlePaste(view, event) {
            const text = event.clipboardData.getData('text/plain');
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            const match = urlRegex.exec(text);

            if (match) {
              // Prevent the default behavior
              event.preventDefault();

              // Use your handler to process the URL
              const url = match[0];

              // Call your custom handler
              const handler = async () => {
                try {
                  const response = await fetch('/oembed-check', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                    body: JSON.stringify({ url }),
                  });

                  const data = await response.json();

                  if (data.isValid) {

                   // Usiamo il dispatcher del view per richiamare il comando
                   view.dispatch(view.state.tr.replaceSelectionWith(
                     view.state.schema.nodes.scribbleBlock.createAndFill({ identifier: 'embed', values: { url: url } }) // Assumendo che "oEmbed" sia il tipo di nodo definito nel tuo schema
                   ));

                    console.log('Block inserted successfully with fetch data');
                  } else {
                    console.log('URL non è un embed');
                  }
                } catch (error) {
                  console.error('Fetch error:', error);
                }
              };

              handler();

              return true;
            }

            return false;
          },
        },
      }),
    ]
  },
});
