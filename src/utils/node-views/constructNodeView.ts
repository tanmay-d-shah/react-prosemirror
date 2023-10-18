import type { Dispatch } from 'react'
import type { NodeViewConstructor } from 'prosemirror-view'
import { buildPillNode } from './pill/buildPillNode'
import { NodeViewType } from '../../editor-components/Editor'

export const constructNodeView = (
  setSpecs: Dispatch<React.SetStateAction<NodeViewType[]>>
): { [name: string]: NodeViewConstructor } => {
  return {
    pill: buildPillNode(setSpecs),
  }
}
