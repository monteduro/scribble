import { Extension } from '@tiptap/core'

export default  Extension.create({
  name: 'iframe',

  addAttributes() {
    return {
      src: {
        default: null,
      },
      frameborder: {
        default: 0,
      },
      allowfullscreen: {
        default: this.options.allowFullscreen,
        parseHTML: () => this.options.allowFullscreen,
      },
    }
  },

  parseHTML() {
    return [{
      tag: 'iframe',
    }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['iframe', this.options.HTMLAttributes, HTMLAttributes]
  },


});
