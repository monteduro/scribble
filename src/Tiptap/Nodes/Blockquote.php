<?php

namespace Awcodes\Scribble\Tiptap\Nodes;

use Tiptap\Nodes\Blockquote as NodesBlockquote;

class Blockquote extends NodesBlockquote
{

    public function addAttributes()
    {
        return [
            'class' => null,
        ];
    }

}
