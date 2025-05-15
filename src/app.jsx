import { createRoot } from "react-dom/client";

function App(){
  return(
    <div>
      <h1>Test</h1>
    </div>
  )
}

const root = createRoot( document.querySelector("#root"));
root.render(<App/>);