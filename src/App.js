
import './App.css';
import { useState, useEffect } from 'react';
import { Photo } from "./components/face";
import { searchYoutube } from "./components/youtube";

const componentsID = {
  PHASE_1: 'TOP',
  PHASE_2: 'PHOTO',
  PHASE_3: 'OPTIONS',
  PHASE_4: 'RESULT'
}

const TopMenu = (props) => {
  const goToPhotoComponent = () => props.goToNextComponent()

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

const Options = (props) => {
  return (
    <p>THIS IS OPTIONS COMPONENT!</p>
  )
}


const App = () => {

  //TOP, PHOTO, RESULT
  const [appStatus, setAppStatus] = useState({
    onDisp: componentsID.PHASE_1,
    displayComponent: null,
    userData: {},
    options: {},
    searchResult: {},
  })

  const [searchInfo, setSearchInfo] = useState({});

  const youtubeExecTest = () => {
    searchYoutube();
  }

  const saveInfoFromAPI = (d) => {
    setSearchInfo({
      ...searchInfo, ...d
    });
  }

  const GOTO_PHASE_1 = () => setAppStatus({ onDisp: componentsID.PHASE_1 });
  const GOTO_PHASE_2 = () => setAppStatus({ onDisp: componentsID.PHASE_2 });
  const GOTO_PHASE_3 = () => setAppStatus({ onDisp: componentsID.PHASE_3 });
  const GOTO_PHASE_4 = () => setAppStatus({ onDisp: componentsID.PHASE_4 });


  const componentsHandler = (nowOnDisp) => {
    let r;

    switch (nowOnDisp) {
      case componentsID.PHASE_1:
        r = <TopMenu goToNextComponent={GOTO_PHASE_2} onChangeAppStatus={GOTO_PHASE_2}></TopMenu>
        break;
      case componentsID.PHASE_2:
        r = <Photo goToNextComponent={GOTO_PHASE_3} onChangeAppStatus={setAppStatus} onSaveAPIData={saveInfoFromAPI}></Photo>
        break;
      case componentsID.PHASE_3:
        r = <Options goToNextComponent={GOTO_PHASE_4}></Options>
        break;
      default:
        console.log("appStatus:", appStatus);
        throw new Error("error at componentsHandler in App.js");
    }

    return r;
  }

  // let COMPONENT = componentsHandler(appStatus.onDisp);
  // useEffect(() => {
  //   COMPONENT = componentsHandler(appStatus.onDisp);
  // })

  return (
    <div className="App">
      <h1>音楽検索アプリ　テスト</h1>
      {componentsHandler(appStatus.onDisp)}
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
