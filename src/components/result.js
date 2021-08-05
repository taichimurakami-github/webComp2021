import { useState, useEffect } from "react";
import loading from "../images/loading-like-youtube.gif";
import "./styles/result.scss";

const Loading = () => {
  return (
    <div>
      <h2>検索結果を取得しています...</h2>
      <img src={loading}></img>
    </div>
  )
}

const Loaded = (props) => {

  return (
    <ul>
      <h2 className={"pageTitle"}>検索結果はこちらです！</h2>
      <h3>生成された検索ワード：{props.data.keyword}</h3>
      {props.data.result.map((val, index) => {
        return (
          <li className={"list"}>
            <h3 className={"movieTitle"}>{val.snippet.title}</h3>
            <img className={"img"} src={val.snippet.thumbnails.medium.url} />
            <a className={"link"} href={`https://www.youtube.com/watch?v=${val.id.videoId}`}>Youtubeで見る</a>
            <p>投稿日時：{val.snippet.publishTime}</p>
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
    props.onChangeAppStatus(
      {
        searchResult: {
          result: searchResult.result.items,
          keyword: searchResult.keyword
        }
      }
    );
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
      <button onClick={backToTop}>TOPページに戻る</button>
      {resultState}
    </>
  )
}


export { Result };