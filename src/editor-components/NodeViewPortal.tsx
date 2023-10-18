import { FC } from 'react'
import { createPortal } from 'react-dom'

import { v4 as uuid } from 'uuid'
import type { NodeViewType } from './Editor'
import type { EditorView } from 'prosemirror-view'
import type { EditorState } from 'prosemirror-state'
import { Pill } from '../rich-react-components/Pill'
import { IconMove } from '../rich-react-components/IconMove'
import { IconClose } from '../rich-react-components/IconClose'
import { removePillNode } from '../utils/commands/pill/insertPillNode'

export interface NodeViewPortalProps {
  savedNodeViews: NodeViewType[]
  state: EditorState
  dispatch?: EditorView['dispatch']
  isEditable?: boolean
}
export const NodeViewPortal: FC<NodeViewPortalProps> = ({
  savedNodeViews,
  state,
  dispatch,
  isEditable = true
}) => {
  return (
    <>
      {savedNodeViews.map((savedNodeView) => {
        const key = uuid()
        let render = (<></>)
        const nodeTypeName = savedNodeView.node.type.name
        switch (nodeTypeName) {
          case 'pill': render = (
            <Pill
              name={savedNodeView.node.attrs.name}
              isInteractive={isEditable}
              leftIcon={<IconMove className="absolute top-2/4 transform -translate-y-2/4 left-1 w-4 h-4 fill-indigo-500 cursor-move" />}
              rightIcon={<IconClose className="absolute top-2/4 transform -translate-y-2/4 right-1 w-4 h-4 fill-indigo-500" />}
              rightIconOnClick={() => removePillNode(state, dispatch, savedNodeView.getPosition)}
            />
          )
            break
        }
        return createPortal(render, savedNodeView.containerElement, key)
      })}
    </>
  )
}
