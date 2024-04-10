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
<<<<<<< HEAD
            internal_id: {
=======
            id: {
                default: null,
            },
            suca: {
>>>>>>> 6289081 (feat: customizzazione di scribble)
=======
            internal_id: {
>>>>>>> 0a677f3 (refactor: alcuni fix e personalizzazione dei link (parziale))
                default: null,
            },
            target: {
                default: this.options.HTMLAttributes.target,
            },
<<<<<<< HEAD
<<<<<<< HEAD
            title: {
=======
            hreflang: {
>>>>>>> 6289081 (feat: customizzazione di scribble)
=======
            title: {
>>>>>>> 0a677f3 (refactor: alcuni fix e personalizzazione dei link (parziale))
                default: null,
            },
            rel: {
                default: null,
<<<<<<< HEAD
<<<<<<< HEAD
=======
            },
            referrerpolicy: {
                default: null,
            },
            class: {
                default: null,
>>>>>>> 6289081 (feat: customizzazione di scribble)
=======
>>>>>>> 0a677f3 (refactor: alcuni fix e personalizzazione dei link (parziale))
            }
        }
    },
})
