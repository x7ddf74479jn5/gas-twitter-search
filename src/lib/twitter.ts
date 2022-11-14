/**
 * ツイートを検索
 *
 * @param  {String} token Bearer token
 * @param  {String} query 検索ワード
 * @return                検索結果
 */
export function getSearchTweets(token: string, query: string, sinceID: string) {
  // RTを除外
  let q = encodeURIComponent(query + " -filter:retweets");

  // since_idがあればクエリに追加
  if (sinceID !== "") {
    q += "&since_id=" + sinceID;
  }

  const bearerAuthHeader = {
    Authorization: "Bearer " + token,
  };

  const res = UrlFetchApp.fetch(
    "https://api.twitter.com/1.1/search/tweets.json?q=" + q + "&count=103&result_type=recent",
    { headers: bearerAuthHeader }
  );

  const result = JSON.parse(res.getContentText());

  return result;
}
