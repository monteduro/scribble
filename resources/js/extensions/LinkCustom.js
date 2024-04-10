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
            internal_id: {
                default: null,
            },
            target: {
                default: this.options.HTMLAttributes.target,
            },
            title: {
                default: null,
            },
            rel: {
                default: null,
            }
        }
    },
})
