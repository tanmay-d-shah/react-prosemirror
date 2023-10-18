import type { Node } from 'prosemirror-model'
import type { EditorView, NodeViewConstructor } from 'prosemirror-view'
import type { Dispatch } from 'react'
import { NodeViewType } from '../../../editor-components/Editor'
import { destroyNodeView } from '../destroyNodeView'

export const buildPillNode = (setSpecs: Dispatch<React.SetStateAction<NodeViewType[]>>): NodeViewConstructor => {
  return (node: Node, view: EditorView, getPos: () => number | undefined) => {
    const el = document.createElement('span')
    el.setAttribute('class', 'node-view inline-block align-middle')
    el.setAttribute('name', node.attrs.name)
    const spec: NodeViewType = {
      containerElement: el,
      node: node,
      getPosition: getPos
    }
    setTimeout(() => {
      setSpecs(specs => [...specs, spec])
    }, 0)
    return {
      dom: el,
      destroy: destroyNodeView(spec, setSpecs),
      stopEvent() { return true }
    }
  }
}
