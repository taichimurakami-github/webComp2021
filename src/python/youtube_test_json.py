from googleapiclient.discovery import build
# import googleapiclient;
import json

API_KEY = "AIzaSyAJVy80IB8wtbJwWOok9FgmwQfRXGyaBF8"

youtube = build('youtube', 'v3', developerKey=API_KEY)

search_response = youtube.search().list(
  part='snippet',
  #検索したい文字列を指定
  q='パソコン',
  #視聴回数が多い順に取得
  order='viewCount',
  type='video',
).execute()

print(search_response['items'])