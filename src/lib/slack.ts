import type { Block, MessagePayload, Section, Tweet } from "@/types";

/**
 * Slackに送信
 *
 * @param {String} webhook webhook url
 * @param {MessagePayload} payload  payload
 */
export function sendMessage(webhook: string, payload: MessagePayload) {
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  };

  UrlFetchApp.fetch(webhook, options);
}

/**
 * blockに検索結果を追加
 *
 * @param  {String} keyword 検索ワード
 * @param  {Array}  tweets  検索結果
 * @param  {Array}  blocks  blocks
 * @return {Array}          追加後のblocks
 */
export function addResultBlock(keyword: string, tweets: Tweet[], blocks: Block[]) {
  const len = tweets.length;

  // ヘッダー
  blocks.push({
    type: "header",
    text: {
      type: "plain_text",
      text: `「${keyword}」の最新ツイートです！`,
      emoji: true,
    },
  });

  // ツイートを追加
  for (let i = 0; i < 3; i++) {
    if (i >= len) break;
    blocks = addTweetSection(tweets[i], blocks);
  }

  // ツイートが3件以上ある場合、ボタンを追加
  if (len > 3) {
    const num = len - 3;
    blocks.push({ type: "divider" });
    blocks.push({
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            emoji: true,
            text: "Next " + num + " Results",
          },
          url: "https://twitter.com/search?q=" + encodeURIComponent(keyword) + "&f=live",
        },
      ],
    });
  }

  return blocks;
}

/**
 * Blockにツイートを追加
 *
 * @param  {Object} tweet  ツイートオブジェクト
 * @param  {Array}  blocks blocks
 * @return {Array}         追加後のblocks
 */
export function addTweetSection(tweet: Tweet, blocks: Block[]) {
  const content: Section = {
    type: "section",
    text: {
      type: "mrkdwn",
      text:
        "*<https://twitter.com/" +
        tweet.user.screen_name +
        "/status/" +
        tweet.id_str +
        "|" +
        tweet.user.name +
        " @" +
        tweet.user.screen_name +
        ">*\n" +
        tweet.text,
    },
    accessory: {
      type: "image",
      image_url: tweet.user.profile_image_url_https.replace("_normal", "_bigger"),
      alt_text: "tweet thumbnail",
    },
  };

  // 追加
  blocks.push({ type: "divider" }); // セパレータ
  blocks.push(content);

  return blocks;
}
