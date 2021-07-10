
import './App.css';
import { useState, useEffect } from 'react';
import { MSfaceAPI, Photo } from "./components/face";
import { searchYoutube } from "./components/youtube";

const TopMenu = (props) => {


  const goToPhotoComponent = () => props.onChangeAppStatus({ onDisp: 'PHOTO' })

  return (
    <div>
      <div onClick={goToPhotoComponent}>表情を撮影する</div>
      {/* <p onClick={MSfaceAPI}>face api</p> */}
      {/* <p id="youtube" onClick={searchYoutube}>search youtube test</p> */}
      {/* <p onClick={testSearch}>face detect test</p> */}
      <video></video>
      <canvas></canvas>
    </div>
  )
}


const App = () => {

  //TOP, PHOTO, RESULT
  const [appStatus, setAppStatus] = useState({
    onDisp: 'TOP',
    userData: {},
    searchResult: {}
  })

  const [faceInfo, setFaceInfo] = useState({
    bounding: {},
    age: null,
    emotion: null,
  });

  // useCamera();
  const activateCamera = () => {
    useCamera();
  }

  const youtubeExecTest = () => {
    searchYoutube();
  }


  let displayComponent;
  switch (appStatus.onDisp) {
    case 'TOP':
      displayComponent = <TopMenu onChangeAppStatus={setAppStatus}></TopMenu>
      break;
    case 'PHOTO':
      displayComponent = <Photo onChangeAppStatus={setAppStatus}></Photo>
      break;
    default:
      displayComponent = <TopMenu></TopMenu>
      break;
  }

  return (
    <div className="App">
      <h1>音楽検索アプリ　テスト</h1>
      {displayComponent}
      <p onClick={youtubeExecTest}>youtube test</p>
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
