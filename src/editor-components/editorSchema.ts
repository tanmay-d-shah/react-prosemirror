import { schema as mdSchema } from 'prosemirror-markdown'
import { Schema } from 'prosemirror-model'
import { tableNodes } from 'prosemirror-tables'

const marks: Record<string, unknown> = {}
mdSchema.spec.marks.forEach((key, value) => {
  marks[key] = value
})

const nodes: Record<string, unknown> = {}
mdSchema.spec.nodes.forEach((key, value) => {
  nodes[key] = value
})

// schema for ProseMirror snippet editor, use this schema everywhere
export const editorSchema = new Schema({
  ...mdSchema.spec,
  nodes: {
    ...nodes,
    data: {
      selectable: true,
      attrs: {
        data: { default: '' },
        type: { default: '' }
      },
      draggable: true,
      inline: true,
      group: 'inline',
      parseDOM: [{
        tag: 'datanode[data]',
        getAttrs(dom) {
          return {
            data: (dom as HTMLElement).getAttribute('data'),
            type: (dom as HTMLElement).getAttribute('type')
          }
        }
      }],
      toDOM(node) { return ['datanode', node.attrs] }
    },
    conditionalBlock: {
      selectable: true,
      attrs: {
        blockID: { default: '0' },
        condition: { default: '' },
        conditions: { default: '' },
        conditionMessages: { default: '' }
      },
      draggable: true,
      inline: true,
      leafText: (node) => {
        if (typeof node.attrs?.condition === 'string') {
          return `%${node.attrs.condition}%`
        }
        return '% %'
      },
      isolating: true,
      whitespace: 'normal',
      group: 'inline',
      parseDOM: [{
        tag: 'conditional-block',
        getAttrs(dom) {
          return {
            condition: (dom as HTMLElement).getAttribute('condition'),
            conditions: (dom as HTMLElement).getAttribute('conditions'),
            conditionMessages: (dom as HTMLElement).getAttribute('conditionMessages')
          }
        }
      }
      ],
      toDOM(node) { return ['conditional-block', node.attrs] }
    },
    macro: {
      selectable: true,
      attrs: {
        macroType: { default: '' },
        dateFormat: { default: 'DD/MM/YYYY' },
      },
      draggable: true,
      inline: true,
      leafText: (node) => {
        if (typeof node.attrs.macroType === 'string') {
          return `%${node.attrs.macroType}%`
        }
        return '% %'
      },
      isolating: true,
      whitespace: 'normal',
      group: 'inline',
      parseDOM: [{
        tag: 'macro[macroType]',
        getAttrs(dom) {
          return {
            macroType: (dom as HTMLElement).getAttribute('macroType'),
            dateFormat: ((dom as HTMLElement).getAttribute('dateFormat') !== '' ? (dom as HTMLElement).getAttribute('dateFormat') : 'DD/MM/YYYY'),
          }
        }
      }
      ],
      toDOM(node) { return ['macro', node.attrs] }
    },
    pill: {
      selectable: true,
      attrs: {
        name: { default: '' }
      },
      draggable: true,
      inline: true,
      leafText: (node) => {
        if (typeof node.attrs.name === 'string') {
          return `{${node.attrs.name}}`
        }
        return '{ }'
      },
      isolating: true,
      whitespace: 'normal',
      group: 'inline',
      parseDOM: [{
        tag: 'pill[name]',
        getAttrs(dom) {
          return {
            name: (dom as HTMLElement).getAttribute('name')
          }
        }
      }
      ],
      toDOM(node) { return ['pill', node.attrs] }
    },
    keystroke: {
      selectable: true,
      code: true,
      attrs: {
        key: { default: '' },
        code: { default: '' }
      },
      draggable: true,
      inline: false,
      atom: true,
      leafText: () => {
        return ''
      },
      isolating: true,
      whitespace: 'normal',
      group: 'block',
      parseDOM: [{
        tag: 'keystroke',
        getAttrs(dom) {
          return {
            keyCode: (dom as HTMLElement).getAttribute('keyCode'),
            key: (dom as HTMLElement).getAttribute('key'),
            code: (dom as HTMLElement).getAttribute('code')
          }
        }
      }
      ],
      toDOM(node) { return ['keystroke', node.attrs] }
    },
    image: {
      inline: true,
      leafText: () => {
        return '🏞'
      },
      attrs: {
        src: {},
        alt: { default: null },
        title: { default: null }
      },
      group: 'inline',
      draggable: true,
      parseDOM: [{
        tag: 'img[src]',
        getAttrs(dom) {
          return {
            src: (dom as HTMLElement).getAttribute('src'),
            title: (dom as HTMLElement).getAttribute('title'),
            alt: (dom as HTMLElement).getAttribute('alt')
          }
        }
      }],
      toDOM(node) { return ['img', node.attrs] }
    },
    ...tableNodes({
      tableGroup: 'block',
      cellContent: 'block+',
      cellAttributes: {
        background: {
          default: null,
          getFromDOM(dom) {
            return dom.style.backgroundColor || null
          },
          setDOMAttr(value, attrs) {
            if (value) { attrs.style = (attrs.style as string || '') + `background-color: ${value as string};` }
          }
        }
      }
    })
  },
  marks: {
    ...marks,
    link: {
      attrs: {
        href: {},
        title: { default: null },
        target: { default: '_blank' },
        rel: { default: 'noopener' }
      },
      inclusive: false,
      parseDOM: [{
        tag: 'a[href]',
        getAttrs(ele) {
          const dom = ele as HTMLElement
          const href = dom.getAttribute('href')
          return { href: href || '', title: dom.getAttribute('title'), target: '_blank' }
        }
      }, { attrs: { target: '_blank' } }],
      // To handle links without protocol we normalize it
      toDOM(node) { return ['a', { ...node.attrs, href: node.attrs.href || '' }] }
    },
    strikethrough: {
      parseDOM: [{ tag: 's' }, { style: 'text-decoration=line-through' }],
      toDOM() { return ['s'] }
    },
    underline: {
      parseDOM: [{ tag: 'u' }, { style: 'text-decoration=underline' }],
      toDOM() { return ['u'] }
    }
  }
})
