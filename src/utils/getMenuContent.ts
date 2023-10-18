/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { buildMenuItems } from "prosemirror-example-setup";
import { MenuItem, MenuItemSpec } from "prosemirror-menu";
import { MarkType, Schema } from "prosemirror-model";

import { Command, EditorState } from "prosemirror-state";
import { toggleMark } from "prosemirror-commands";
import { insertPillNodeFromSelection } from "./commands/pill/insertPillNode";

export const markActive = (state: EditorState, type: MarkType): any => {
  const { from, $from, to, empty } = state.selection
  if (empty) { return !!type.isInSet(state.storedMarks ?? $from.marks()) } else { return state.doc.rangeHasMark(from, to, type) }
}

export const markItem = (markType: MarkType, options: Partial<MenuItemSpec>): MenuItem => {
  const passedOptions: Partial<MenuItemSpec> = {
    active(state: EditorState) { return markActive(state, markType) }
  }
  for (const prop in options) {
    const key = prop as keyof MenuItemSpec
    // @ts-expect-error
    passedOptions[key] = options[key]
  }
  return cmdItem(toggleMark(markType), passedOptions)
}

export const cmdItem = (cmd: Command, options: Partial<MenuItemSpec>): MenuItem => {
  const passedOptions: MenuItemSpec = {
    label: options.title as MenuItemSpec['label'],
    run: cmd
  }
  for (const prop in options) {
    const key = prop as keyof MenuItemSpec
    // @ts-expect-error
    passedOptions[key] = options[key]
  }
  if (!options.enable && !options.select) { passedOptions.select = state => cmd(state) }
  return new MenuItem(passedOptions)
}
export function getMenuContent(schema: Schema) {
  const menuItems = buildMenuItems(schema)
  const boldToggle = menuItems.toggleStrong
  const emToggle = menuItems.toggleEm
  const underlineToggle = markItem(schema.marks.underline, {
    title: 'Toggle underline',
    icon: {
      width: 16,
      height: 15,
      path: 'M0.5 13.25H15.5V14.5H0.5V13.25ZM8 11.375C6.83968 11.375 5.72688 10.9141 4.90641 10.0936C4.08594 9.27312 3.625 8.16032 3.625 7V0.125H4.875V7C4.875 7.8288 5.20424 8.62366 5.79029 9.20971C6.37634 9.79576 7.1712 10.125 8 10.125C8.8288 10.125 9.62366 9.79576 10.2097 9.20971C10.7958 8.62366 11.125 7.8288 11.125 7V0.125H12.375V7C12.375 8.16032 11.9141 9.27312 11.0936 10.0936C10.2731 10.9141 9.16032 11.375 8 11.375Z'
    }
  })
  const strikethroughToggle = markItem(schema.marks.strikethrough, {
    title: 'Toggle strike through',
    icon: {
      width: 16, height: 14, path: 'M15.5 6.37489H9.2225C8.94498 6.30027 8.66619 6.23047 8.38625 6.16552C6.63125 5.75052 5.63875 5.44677 5.63875 4.02614C5.6245 3.7809 5.66081 3.53535 5.74542 3.30473C5.83004 3.07411 5.96115 2.86335 6.13062 2.68552C6.6615 2.24896 7.32644 2.0084 8.01375 2.00427C9.7825 1.96052 10.5981 2.56052 11.265 3.47302L12.2744 2.73552C11.8019 2.05699 11.1578 1.51605 10.4078 1.16796C9.65779 0.819872 8.82884 0.677113 8.00563 0.754268C6.99439 0.760724 6.01887 1.12898 5.25563 1.79239C4.96634 2.08583 4.74024 2.43541 4.59125 2.81959C4.44227 3.20377 4.37356 3.61439 4.38937 4.02614C4.36197 4.4767 4.4466 4.92702 4.63572 5.33688C4.82483 5.74674 5.11254 6.10337 5.47312 6.37489H0.5V7.62489H9.0325C10.2619 7.98114 10.9969 8.44489 11.0156 9.72364C11.0359 9.9968 10.9985 10.2712 10.9056 10.5289C10.8128 10.7866 10.6667 11.0218 10.4769 11.2193C9.81551 11.7406 8.99384 12.0165 8.15188 11.9999C7.52345 11.9817 6.90738 11.8208 6.35029 11.5294C5.7932 11.2381 5.30966 10.8238 4.93625 10.318L3.97812 11.1205C4.46358 11.7675 5.08994 12.2954 5.80972 12.6643C6.52951 13.0333 7.32384 13.2335 8.1325 13.2499H8.195C9.34924 13.2632 10.4695 12.8595 11.35 12.113C11.6625 11.7979 11.9054 11.4208 12.0632 11.006C12.2209 10.5913 12.2898 10.148 12.2656 9.70489C12.289 8.94692 12.0332 8.20676 11.5469 7.62489H15.5V6.37489Z'
    }
  })
  const bulletList = menuItems.wrapBulletList
  const numberedList = menuItems.wrapOrderedList
  const pillMenu = new MenuItem({
    run: insertPillNodeFromSelection,
    enable: state => insertPillNodeFromSelection(state),
    label: 'Pill',
    title: 'Make a Pill',
    icon: { width: 24, height: 24, path: 'M6,6A2,2,0,0,1,8,4,1,1,0,0,0,8,2,4,4,0,0,0,4,6V9a2,2,0,0,1-2,2,1,1,0,0,0,0,2,2,2,0,0,1,2,2v3a4,4,0,0,0,4,4,1,1,0,0,0,0-2,2,2,0,0,1-2-2V15a4,4,0,0,0-1.38-3A4,4,0,0,0,6,9Zm16,5a2,2,0,0,1-2-2V6a4,4,0,0,0-4-4,1,1,0,0,0,0,2,2,2,0,0,1,2,2V9a4,4,0,0,0,1.38,3A4,4,0,0,0,18,15v3a2,2,0,0,1-2,2,1,1,0,0,0,0,2,4,4,0,0,0,4-4V15a2,2,0,0,1,2-2,1,1,0,0,0,0-2Z' }
  })

  return [
    [
      boldToggle!,
      emToggle!,
      underlineToggle,
      strikethroughToggle
    ],
    [
      bulletList!,
      numberedList!
    ],
    [pillMenu]
  ]
}