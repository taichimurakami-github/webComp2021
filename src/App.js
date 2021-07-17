
import './App.css';
import { useState, useEffect } from 'react';
import { Photo } from "./components/face";
import { searchYoutube } from "./components/youtube";
import { Options } from "./components/options";
import { Result } from './components/result';

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
      <video></video>
      <canvas></canvas>
    </div>
  )
}


const App = () => {

  const [appStatus, setAppStatus] = useState({
    onDisp: componentsID.PHASE_1,
    userData: null,
    options: null,
    searchResult: null,
  })

  const youtubeExecTest = () => {
    searchYoutube();
  }

  const GOTO_PHASE_1 = () => setAppStatus({ ...appStatus, onDisp: componentsID.PHASE_1 });
  const GOTO_PHASE_2 = () => setAppStatus({ ...appStatus, onDisp: componentsID.PHASE_2 });
  const GOTO_PHASE_3 = () => setAppStatus({ ...appStatus, onDisp: componentsID.PHASE_3 });
  const GOTO_PHASE_4 = () => setAppStatus({ ...appStatus, onDisp: componentsID.PHASE_4 });

  const changeAppState = (d) => {
    // console.log("changeAppState");
    // console.log(d);
    setAppStatus({ ...appStatus, ...d })
  }

  const saveUserData = (d) => {
    console.log("App.js saveUserdata");
    console.log("data is below: ");
    console.log(d);
    setAppStatus({ ...appStatus, userData: d });
  };

  const componentsHandler = (nowOnDisp) => {
    let r;

    switch (nowOnDisp) {
      case componentsID.PHASE_1:
        r = <TopMenu goToNextComponent={GOTO_PHASE_2}></TopMenu>
        break;
      case componentsID.PHASE_2:
        r = <Photo goToNextComponent={GOTO_PHASE_3} onSaveUserData={saveUserData} onChangeAppStatus={changeAppState}></Photo>
        break;
      case componentsID.PHASE_3:
        r = <Options goToNextComponent={GOTO_PHASE_4} data={appStatus.userData}></Options>
        break;
      case componentsID.PHASE_4:
        r = <Result onChangeAppStatus={changeAppState}></Result>
        break;
      default:
        // console.log("appStatus:", appStatus);
        throw new Error("error at componentsHandler in App.js");
    }

    return r;
  }

  useEffect(() => {
    console.log("---------userdata update checker---------");
    console.log("userData changed!!");
    console.log(appStatus.userData);
  }, [appStatus.userData]);

  useEffect(() => {
    console.log("---------appStatus update checker---------");
    console.log("appStatus changed!!");
    console.log(appStatus);
  }, [appStatus]);

  return (
    <div className="App">
      <h1>音楽検索アプリ　テスト</h1>
      {componentsHandler(appStatus.onDisp)}
      <p onClick={youtubeExecTest}>youtube test</p>
    </div>
  );
}
export default App;
