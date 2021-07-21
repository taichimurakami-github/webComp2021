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

const Loaded = (props) => {

  return (
    <ul>
      {props.data.map((val, index) => {
        return (
          <li>
            <h3>{val.snippet.title}</h3>
            <img src={val.snippet.thumbnails.medium.url} />
            <a href={`https://www.youtube.com/watch?v=${val.id.videoId}`}>Youtubeで見る</a>
            <p>{val.snippet.publishTime}</p>
          </li>
        )
      })}
    </ul>
  );
}


const Result = (props) => {
  const components = {
    loading: <Loading></Loading>,
    loaded: <Loaded data={props.data}></Loaded>
  }
  const [resultState, setResultState] = useState(components.loading);

  const backToTop = () => props.onReset();

  const execute = async () => {
    const searchResult = await props.onExecute();
    console.log(searchResult);
    props.onChangeAppStatus({ searchResult: searchResult.items })
  }

  useEffect(() => {
    execute();
  }, []);

  useEffect(() => {
    if (props.data !== null) {
      setResultState(components.loaded);
    }
  }, [props.data])

  return (
    <>
      <p>this is RESULT component</p>
      <button onClick={backToTop}>TOPページに戻る</button>
      {resultState}
    </>
  )
}


export { Result };