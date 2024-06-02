<script>
    import { openScribbleModal, uuid } from '../utils.js'
    import BlockSettings from './BlockSettings.svelte'
    import RemoveBlock from './RemoveBlock.svelte'
    import DuplicateBlock from './DuplicateBlock.svelte';

    export let node
    export let editor
    export let onClose;

    // Attributi booleani per rendere opzionali i tasti
    export let showSettings = true;
    export let showDuplicate = true;
    export let showRemove = true;

    const handleDuplicate = () => {

        const { tr, doc } = editor.state;
        const { selection } = tr;
        // Verifica se c'è un nodo selezionato e ottieni la posizione di quel nodo.
        const { $from, $to } = selection;
        const nodePos = $from.pos;
        const nodeSize = $to.pos - $from.pos;
        const content = $from.nodeAfter;

        // La nuova posizione è la posizione attuale del nodo più la sua lunghezza (nodeSize).
        const newPos = nodePos + nodeSize;

        // Crea una copia del nodo selezionato.
        const nodeCopy = node.type.create({...node.attrs, id: uuid()}, node.content, node.marks);

        // Verifica se la nuova posizione non è oltre l'ultimo nodo del documento.
        if (newPos <= doc.content.size) {
            // Aggiungi il nodo copiato alla nuova posizione.
            tr.insert(newPos, nodeCopy);
            editor.view.dispatch(tr);
        } else {
            console.error('Cannot duplicate after the last node of the document.');
        }

        if (onClose) {
            onClose(); // Chiama la funzione di chiusura se presente.
        }
    }

    const handleOpen = () => {

        if (onClose) {
            onClose(); // Chiama la funzione di chiusura passata come prop
        }

        openScribbleModal(node.attrs.identifier, {
            update: true,
            statePath: editor.storage?.statePathExtension.statePath ?? null,
            blockId: node.attrs.id,
            data: node.attrs.values
        })
    }
    const handleRemove = () => {

        if (onClose) {
            onClose(); // Chiama la funzione di chiusura passata come prop
        }

        editor.commands.deleteSelection()
    }

</script>

<div class="svelte-options-menu">
    {#if showSettings}
        <BlockSettings {handleOpen} />
    {/if}
    {#if showDuplicate}
        <DuplicateBlock {handleDuplicate} />
    {/if}
    {#if showRemove}
        <RemoveBlock {handleRemove} />
    {/if}
</div>
