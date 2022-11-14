export type TimeBasedEvent = {
  atHour: number;
  nearMinute?: Minute;
  frequency?: {
    type: "everyDays";
    interval: 1;
  };
};

type Minute = 1 | 5 | 10 | 15 | 30;

export type Divider = {
  type: "divider";
};

export type Section = {
  type: "section";
  text: Mrkdwn;
  accessory: Accessory;
};

type Accessory = Image;

type Image = {
  type: "image";
  image_url: string;
  alt_text: string;
};

type Mrkdwn = {
  type: "mrkdwn";
  text: string;
};

type PlainText = {
  type: "plain_text";
  emoji: boolean;
  text: string;
};

export type Actions = {
  type: "actions";
  elements: Block[];
};

export type Button = {
  type: "button";
  text: Text;
  url: string;
};

export type Header = {
  type: "header";
  text: Text;
};

type Text = Mrkdwn | PlainText;
export type Block = Divider | Section | Actions | Button | Header;

export type MessagePayload = {
  text: string;
  blocks: Block[];
};

export type Tweet = {
  user: {
    screen_name: string;
    name: string;
    profile_image_url_https: string;
  };
  id_str: string;
  text: string;
};
