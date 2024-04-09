import Scribble from './Scribble.svelte'

export default function scribble(bubbleTools, suggestionTools, toolbarTools, mergeTags, state, statePath, placeholder) {
    return {
        bubbleTools,
        suggestionTools,
        toolbarTools,
        mergeTags,
        state,
        statePath,
        placeholder: placeholder ?? "digita '/' per aggiungere un blocco",
        fullscreen: false,
        updatedFromEditor: false,
        isFocused: false,

        init() {
            const _this = this

            new Scribble({
                target: _this.$root,
                props: {
                    bubbleTools: _this.bubbleTools,
                    suggestionTools: _this.suggestionTools,
                    toolbarTools: _this.toolbarTools,
                    mergeTags: _this.mergeTags,
                    content: _this.state,
                    statePath: _this.statePath,
                    placeholder: _this.placeholder
                }
            });

            this.$watch('state', (newState, oldState) => {
                if (! _this.updatedFromEditor && JSON.stringify(newState) !== JSON.stringify(oldState)) {
                    window.dispatchEvent(new CustomEvent('updateContent', {
                        detail: {
                            statePath: statePath,
                            newContent: newState,
                        }
                    }));

                    _this.updatedFromEditor = false
                }
            });

            window.addEventListener('updatedEditor', e => {
                if (e.detail.statePath === _this.statePath) {
                    _this.updatedFromEditor = true
                    _this.state = e.detail.content
                }
            })

            window.addEventListener('focusScribbleComponent', e => {
                if (e.detail.statePath === _this.statePath) {
                    _this.isFocused = true
                }
            })
        },

        toggleFullscreen(event) {
            if (event.detail.statePath !== this.statePath) return
            this.fullscreen = !this.fullscreen
        },
    }
}
