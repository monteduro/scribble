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
<<<<<<< HEAD
=======
>>>>>>> bdae654 (feat: customizzazione di scribble)
            internal_id: {
=======
            id: {
                default: null,
            },
            suca: {
<<<<<<< HEAD
>>>>>>> 6289081 (feat: customizzazione di scribble)
=======
            internal_id: {
>>>>>>> 0a677f3 (refactor: alcuni fix e personalizzazione dei link (parziale))
=======
>>>>>>> ec44a0e (feat: customizzazione di scribble)
>>>>>>> bdae654 (feat: customizzazione di scribble)
                default: null,
            },
            target: {
                default: this.options.HTMLAttributes.target,
            },
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            title: {
=======
            hreflang: {
>>>>>>> 6289081 (feat: customizzazione di scribble)
=======
            title: {
>>>>>>> 0a677f3 (refactor: alcuni fix e personalizzazione dei link (parziale))
=======
            title: {
=======
            hreflang: {
>>>>>>> ec44a0e (feat: customizzazione di scribble)
>>>>>>> bdae654 (feat: customizzazione di scribble)
                default: null,
            },
            rel: {
                default: null,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> bdae654 (feat: customizzazione di scribble)
=======
            },
            referrerpolicy: {
                default: null,
            },
            class: {
                default: null,
<<<<<<< HEAD
>>>>>>> 6289081 (feat: customizzazione di scribble)
=======
>>>>>>> 0a677f3 (refactor: alcuni fix e personalizzazione dei link (parziale))
=======
>>>>>>> ec44a0e (feat: customizzazione di scribble)
>>>>>>> bdae654 (feat: customizzazione di scribble)
            }
        }
    },
})
