import type { EditorState } from 'prosemirror-state'
import type { EditorView } from 'prosemirror-view'
import { editorSchema } from '../../../editor-components/editorSchema'

export const insertPillNodeFromSelection = (state: EditorState, dispatch?: EditorView['dispatch']): boolean => {
  if (state.selection.empty) return false

  const selectedContent = state.selection.content().content
  const size = selectedContent.size
  const pillName = selectedContent.textBetween(0, size - 1, ' ').trim()
  if (pillName === '') return false

  if (dispatch) {
    const node = editorSchema.node('pill', { name: pillName })
    const tr = state.tr
      .insert(state.selection.from, node)
      .insertText(' ')
    dispatch(tr)
  }
  return true
}

export const insertPillNode = (state: EditorState, pillName: string, dispatch?: EditorView['dispatch']): void => {
  if (dispatch) {
    const node = editorSchema.node('pill', { name: pillName })
    const tr = state.tr
      .insert(state.selection.$to.pos, node)
      .insertText(' ')
    dispatch(tr)
  }
}

export const removePillNode = (state: EditorState, dispatch?: EditorView['dispatch'], getPos?: (() => number | undefined)): void => {
  if (dispatch && getPos) {
    const pos = getPos()
    if (pos) {
      const tr = state.tr
        .delete(pos, pos + 1)
      dispatch(tr)
    }

  }
}
