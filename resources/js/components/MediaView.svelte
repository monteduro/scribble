<script>
    import { NodeViewWrapper } from 'svelte-tiptap'
    import { onMount } from 'svelte'
    import BlockActions from './BlockActions.svelte'
    import DragHandle from './DragHandle.svelte'
    import tippy from 'tippy.js'
    import OptionsMenu from '../components/OptionsMenu.svelte'

    export let editor;
    export let node;
    export let selected = false;
    export let updateAttributes;

    let component;
    let popupInstance;

    const handleMenuOpen = (event) => {
        const clientRect = event.currentTarget.getBoundingClientRect();

        // Inizializza prima il componente senza popupInstance
        component = new OptionsMenu({
            target: document.createElement('div'), // Crea un elemento div per montare il componente Svelte
            props: {
                node,
                showSettings: false,
                editor,
                onClose: () => closeOptions()
            }
        });

        popupInstance = tippy('body', {
            content: component.$$.root,
            getReferenceClientRect: () => clientRect,
            allowHTML: true,
            interactive: true,
            trigger: 'manual',
            placement: 'left',
            showOnCreate: true,
            hideOnClick: true,
            theme: 'scribble-options',
            arrow: true,
            zIndex: 9999,
            onHidden(instance) {
                instance.destroy();
            }
        });
    };

    const closeOptions = (event) => {
        if (Array.isArray(popupInstance)) {
            popupInstance.forEach(instance => instance.hide());
        } else {
            popupInstance.hide();
        }
    }

    onMount(() => {
        window.addEventListener('updatedBlock', (e) => {
            if (
                e.detail.type === node.attrs.type
                && e.detail.statePath === editor.storage?.statePathExtension.statePath
            ) {
                updateAttributes({ values: e.detail.values })
            }
        })
    })
</script>

<NodeViewWrapper>
    <div class="scribble-block">
        <div class="scribble-block-content {selected ? 'ProseMirror-selectednode' : ''}">
            <div class="p-8">
                <img
                    src={node.attrs.src}
                    alt={node.attrs.alt}
                    title={node.attrs?.title ?? null}
                    width={node.attrs.width}
                    height={node.attrs.height}
                    loading={node.attrs.loading}
                />
            </div>
        </div>
        <BlockActions>
            <DragHandle {handleMenuOpen} />
        </BlockActions>
    </div>
</NodeViewWrapper>
