import { Node, mergeAttributes } from '@tiptap/core';
import oEmbedView from "../components/oEmbedView.svelte"
import { SvelteNodeViewRenderer } from 'svelte-tiptap'
import { uuid } from "../utils.js"

export default Node.create({
  name: 'oEmbed',
  isBlock: true,
    inline: false,
    group: 'block',
    draggable: true,
    defining: true,
    selectable: true,

    addAttributes() {
        return {
            url: {
                default: null,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'oEmbed',
                getAttrs: (dom) => {
                    return JSON.parse(dom.innerHTML);
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['oEmbed', JSON.stringify(HTMLAttributes)];
    },

    addNodeView() {
        return SvelteNodeViewRenderer(oEmbedView)
    }
});
