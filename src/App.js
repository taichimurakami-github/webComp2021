
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
  const changeComponent = () => props.onChangeAppStatus({ onDisp: 'PHOTO' });
  return (
    <div>
      <div onClick={changeComponent}>表情を撮影する</div>
      <video></video>
      <canvas></canvas>
    </div>
  )
}


const App = () => {

  const [appStatus, setAppStatus] = useState({
    onDisp: 'TOP',
    userData: null,
    options: null,
    searchResult: null,
  })

  const executeSearch = async () => {
    return await searchYoutube(appStatus);
  }

  const changeAppState = (d) => setAppStatus({ ...appStatus, ...d });

  const resetAppState = () => setAppStatus({
    onDisp: 'TOP',
    userData: null,
    options: null,
    searchResult: null
  });

  const componentsHandler = (nowOnDisp) => {
    let r;

    switch (nowOnDisp) {
      case componentsID.PHASE_1:
        r = <TopMenu onChangeAppStatus={changeAppState} />
        break;
      case componentsID.PHASE_2:
        r = <Photo onChangeAppStatus={changeAppState} onReset={resetAppState} />
        break;
      case componentsID.PHASE_3:
        r = <Options onChangeAppStatus={changeAppState} onReset={resetAppState} data={appStatus.userData} />
        break;
      case componentsID.PHASE_4:
        r = <Result onChangeAppStatus={changeAppState} onReset={resetAppState} onExecute={executeSearch} />
        break;
      default:
        // console.log("appStatus:", appStatus);
        throw new Error("error at componentsHandler in App.js");
    }

    return r;
  }

  useEffect(() => {
    console.log("---------appStatus update checker---------");
    console.log("appStatus changed!!");
    console.log(appStatus);
  }, [appStatus]);

  return (
    <div className="App">
      <h1>音楽検索アプリ　テスト</h1>
      {componentsHandler(appStatus.onDisp)}
    </div>
  );
}
export default App;
