import './App.css'
import { Editor } from './editor-components/Editor'

function App() {
  return (
    <>
      <div className="h-140">
        <h1>Rich Text Editor with React Components</h1>
        <br></br>
        <p className='text-left'>
          <p>In this example, you can insert a Pill (which is a React component) inside a pure javascript based rich text editor library</p>
          <p>A text can be made into a pill by either of the following ways : </p>
          <p>1. Selecting some text inside editor and clicking on curly braces icon from menu of text editor</p>
          <p>2. Enclosing the text within curly braces. Eg: &#123;example-text&#125; </p>

          <br></br>
          <p>The pill is for demo purpose. Ideally, we can add any React component in place of pill</p>
        </p>
        <br></br>
        <Editor />
        <br></br>
        <p className='text-left'>Similar kind of mechanism is being used by companies like Atlassian (Jira)</p>
      </div>

    </>
  )
}

export default App
