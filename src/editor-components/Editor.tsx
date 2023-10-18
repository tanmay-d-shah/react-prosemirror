/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProseMirror } from "use-prosemirror";
import { useState } from 'react';
import { EditorState } from "prosemirror-state";
import { editorSchema } from "./editorSchema";
import { EditorView } from "prosemirror-view";
import './EditorStyles.css'
import { DOMParser, Node } from "prosemirror-model";
import { exampleSetup } from "prosemirror-example-setup";
import { getMenuContent } from "../utils/getMenuContent";
import { inputRules } from 'prosemirror-inputrules'
import { pillInputRule } from "../utils/input-rules/pillInputRule";
import useConstant from "use-constant";

import { NodeViewPortal } from "./NodeViewPortal";
import { constructNodeView } from "../utils/node-views/constructNodeView";


export interface NodeViewType {
  containerElement: HTMLElement
  node: Node
  getPosition: (() => number | undefined)
  view?: EditorView
}
export function Editor() {
  const [view, setView] = useState<EditorView>()
  const [savedNodeViews, setSavedNodeViews] = useState<NodeViewType[]>([])
  const nodeViews = useConstant(() => constructNodeView(setSavedNodeViews))

  const [state, setState] = useState<EditorState>(EditorState.create({
    schema: editorSchema,
    plugins: [...exampleSetup({
      schema: editorSchema,
      menuContent: getMenuContent(editorSchema),
    }),
    inputRules({
      rules: [pillInputRule]
    }),
    ],
    doc: undefined
  }))

  return <div className="border-2">
    <ProseMirror
      state={state}
      domParser={DOMParser.fromSchema(editorSchema)}
      className="snippetEditor prose min-w-full snippetEditor-scroll-bar" dispatchTransaction={(tr) => {
        const nextState = view?.state.apply(tr)
        if (nextState) {
          setState(nextState)
        }
      }}
      editorViewFactory={(element, editorProps) => {
        const editorView = new EditorView(element, editorProps)
        setView(editorView)
        return editorView
      }}
      nodeViews={nodeViews}
    />

    <NodeViewPortal savedNodeViews={savedNodeViews} state={state} dispatch={view?.dispatch} isEditable={true} />
  </div>
}