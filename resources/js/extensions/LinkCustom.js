import Link from '@tiptap/extension-link'

export default Link.extend({
    inclusive: false,

    addOptions() {
        return {
            openOnClick: false,
            linkOnPaste: true,
            autolink: false,
            protocols: [],
            HTMLAttributes: {},
            validate: undefined,
        }
    },

    addAttributes() {
        return {
            href: {
                default: null,
            },
<<<<<<< HEAD
            internal_id: {
=======
            id: {
                default: null,
            },
            suca: {
>>>>>>> 6289081 (feat: customizzazione di scribble)
                default: null,
            },
            target: {
                default: this.options.HTMLAttributes.target,
            },
<<<<<<< HEAD
            title: {
=======
            hreflang: {
>>>>>>> 6289081 (feat: customizzazione di scribble)
                default: null,
            },
            rel: {
                default: null,
<<<<<<< HEAD
=======
            },
            referrerpolicy: {
                default: null,
            },
            class: {
                default: null,
>>>>>>> 6289081 (feat: customizzazione di scribble)
            }
        }
    },
})
