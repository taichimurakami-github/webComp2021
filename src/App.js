import photo from './images/smile.jpg';
import './App.css';
import { useState, useEffect } from 'react';
import { MSfaceAPI, useCamera } from "./components/face";
import { searchYoutube } from "./components/youtube";

function App() {

  const [faceInfo, setFaceInfo] = useState({
    bounding: {},
    age: null,
    emotion: null,
  });

  // useCamera();
  const activateCamera = () => {
    useCamera();
  }

  async function testSearch() {
    const a = await MSfaceAPI();
    console.log("detect result: ", a);
    // const a = await MSfaceAPI().then(() => { console.log("finished") });
    // MSfaceAPI(setFaceInfo).then(() => { console.log("finished") });
    // console.log("result:", a);
  }



  return (
    <div className="App">
      <h1>音声検索アプリ　テスト</h1>

      <div>条件指定はこちら</div>
      <img src={photo} />
      <div className={"flex"}>
        <div>環境情報検索</div>
        <div>複合条件検索</div>
        <div>表情検索</div>
        {/* <p onClick={MSfaceAPI}>face api</p> */}
        <p id="shutter">shutter</p>
        <p id="youtube" onClick={searchYoutube}>search youtube</p>
        <p id="result"></p>
        <p onClick={testSearch}>search test start</p>
        <video></video>
        <canvas></canvas>
      </div>
    </div>
  );
}


// const python = () => {
//   var { PythonShell } = require('python-shell');
//   const options = {
//     mode: "json",
//     pythonPath: '~\\AppData\\Local\\Microsoft\\WindowsApps\\PythonSoftwareFoundation.Python.3.9_qbz5n2kfra8p0\\python.exe',
//     pythonOptions: ['-u']
//   }

//   const pythonResult = PythonShell.run('python/youtube_test_json.py', options, (err) => {
//     if (err) throw err;
//   })

//   console.log(pythonResult);
// }
// python();
export default App;
