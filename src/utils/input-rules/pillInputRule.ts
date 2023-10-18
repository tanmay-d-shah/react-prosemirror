import { InputRule } from 'prosemirror-inputrules'
import { Fragment, Slice } from 'prosemirror-model'
import { editorSchema } from '../../editor-components/editorSchema'

export const pillInputRule = new InputRule(/{([^{}]*)}$/gm, (state, match, start, end) => {
  if (match.index === null) return null
  const pillName = match[1].trim()
  if (pillName === '') return null
  const node = editorSchema.node('pill', { name: pillName })
  const pillSlice = new Slice(Fragment.from(node), 0, 0)
  return state.tr
    .replace(start, end, pillSlice)
    .insertText(' ')
})
