# Add React components inside ProseMirror based text editor

ProseMirror is a famous rich text editor library. More info can be found at : https://prosemirror.net/

## Live Demo : https://react-prosemirror-edj1accze-tanmay-shahs-projects.vercel.app/

## Purpose
The ProseMirror rich text editor library is a pure javascript library and it becomes very difficult to add react components
inside its editor for advanced use cases

Hence, this is an attempt to provide a scalable and extendable structure/setup to add react components inside ProseMirror editor. Similar approach is being used by companies like Atlassian for its Jira Products

## Mechanism
To render react components, I have used React Portals.
I have leveraged the node view extension of prosemirror to render to parent DOM elements of these React components
I have also used the use-prosemirror hook for packaging the ProseMirror instance. More info can be found at : https://github.com/ponymessenger/use-prosemirror

## Usage and Extendability
This repo can be used as a starting structure
You can add your React component entry inside NodeViewPortal component ```(src/editor-components)```
Also add entry for your React component inside the editor schema
You can also generalize the methods in insertPillNode file for your components ```(src/utils/commands/pill/insertPillNode.ts)```


