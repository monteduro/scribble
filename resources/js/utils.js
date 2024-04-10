import tippy from 'tippy.js'

export const uuid = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

export const openScribbleModal = (component, args) => {
    document.getElementById('scribble-editor-loading-indicator').classList.remove('hidden');
    document.querySelector('#scribble-editor-loading-indicator .loader').classList.remove('hidden');
    window.Livewire.dispatch('openScribbleModal', { component: component, arguments: args })
}

export const hideLoadingIndicator = (hide_loader = false) => {
    if ( hide_loader )
        document.querySelector('#scribble-editor-loading-indicator .loader').classList.add('hidden');
    else
        document.getElementById('scribble-editor-loading-indicator').classList.add('hidden');
}

export const commandRunner = (editor, commands, args = []) => {
    commands.forEach(command => {
        editor.chain().focus()[command.command](Object.keys(command?.arguments).length > 0 ? command.arguments : args).run()
    })
}

export const replaceStatePath = (data, statePath) => {
    if (typeof data != "object") return;
    if (!data) return; // null object

    for (const key in data) {
        if (['statePath'].includes(key)) {
            data[key] = statePath;
        } else {
            replaceStatePath(data[key], statePath);
        }
    }
}
