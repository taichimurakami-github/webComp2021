import { searchYoutube } from "./youtube";
import { useState, useEffect } from "react";
import loading from "../images/loading-like-youtube.gif";

const Loading = () => {
  return (
    <div>
      <img src={loading}></img>
      <p>Youtubeを検索中...</p>
    </div>
  )
}

const Loaded = () => {
  return (
    <></>
  );
}


const Result = (props) => {
  const components = {
    loading: <Loading></Loading>,
    loaded: <Loaded></Loaded>
  }
  const [resultState, setResultState] = useState(components.loading);

  const backToTop = () => props.onReset();

  const execute = () => {
    // props.onExecute();
    // setResultState(components.loaded);
  }

  useEffect(() => {
    execute();
  }, []);

  return (
    <>
      <p>this is RESULT component</p>
      <button onClick={backToTop}>TOPページに戻る</button>
      {resultState}
    </>
  )
}


export { Result };