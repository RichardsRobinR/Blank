import Editor from "./Editor"



function App() {
  // const [backgroundColor, setBackgroundColor] = useState('#5677da')
  

  return (
    <div className="w-screen h-screen max-h-screen flex flex-col bg-[var(--color-editor-bg)]">
      <h1 className="text-4xl font-bold w-fit ml-[5.6%] h-24 flex items-end pb-4 text-white">Today</h1>
      
      <hr className="h-[2px] w-full bg-white mb-1" />
      <hr className="h-[2px] w-full bg-white mb-1" />

      <div className="flex-1 overflow-hidden">
        <Editor />
      </div>
    </div>
  )
}

export default App
