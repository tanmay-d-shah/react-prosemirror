import type { Dispatch } from 'react'
import { NodeViewType } from '../../editor-components/Editor'
export const destroyNodeView = (savedNodeView: NodeViewType, setSavedNodeViews: Dispatch<React.SetStateAction<NodeViewType[]>>): (() => void) => {
  return (): void => {
    // Avoid memory leak warnings after unmount
    // REFER: Hack around https://github.com/facebook/react/issues/18178#issuecomment-595846312
    setTimeout(() => {
      setSavedNodeViews(specs => {
        const next = [...specs]
        next.splice(
          specs.findIndex(({ containerElement }) => containerElement === savedNodeView.containerElement),
          1
        )
        return next
      })
    }, 0)
  }
}
