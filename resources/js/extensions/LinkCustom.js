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
<<<<<<< HEAD
=======
>>>>>>> bdae654 (feat: customizzazione di scribble)
=======
>>>>>>> 5ef1b3b (refactor: alcuni fix e personalizzazione dei link (parziale))
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
<<<<<<< HEAD
>>>>>>> bdae654 (feat: customizzazione di scribble)
=======
=======
            internal_id: {
>>>>>>> ada292d (refactor: alcuni fix e personalizzazione dei link (parziale))
>>>>>>> 5ef1b3b (refactor: alcuni fix e personalizzazione dei link (parziale))
                default: null,
            },
            target: {
                default: this.options.HTMLAttributes.target,
            },
<<<<<<< HEAD
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
=======
>>>>>>> 5ef1b3b (refactor: alcuni fix e personalizzazione dei link (parziale))
            title: {
=======
            hreflang: {
>>>>>>> ec44a0e (feat: customizzazione di scribble)
<<<<<<< HEAD
>>>>>>> bdae654 (feat: customizzazione di scribble)
=======
=======
            title: {
>>>>>>> ada292d (refactor: alcuni fix e personalizzazione dei link (parziale))
>>>>>>> 5ef1b3b (refactor: alcuni fix e personalizzazione dei link (parziale))
                default: null,
            },
            rel: {
                default: null,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> bdae654 (feat: customizzazione di scribble)
=======
>>>>>>> 5ef1b3b (refactor: alcuni fix e personalizzazione dei link (parziale))
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
<<<<<<< HEAD
>>>>>>> bdae654 (feat: customizzazione di scribble)
=======
=======
>>>>>>> ada292d (refactor: alcuni fix e personalizzazione dei link (parziale))
>>>>>>> 5ef1b3b (refactor: alcuni fix e personalizzazione dei link (parziale))
            }
        }
    },
})
