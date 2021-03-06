import React from 'react';

import { Icon } from 'react-icons-kit';
import { ic_email } from 'react-icons-kit/md';
import { bell } from 'react-icons-kit/iconic';
import {person} from 'react-icons-kit/iconic/person';
import {github,twitter} from 'react-icons-kit/icomoon/';
import {ic_mail_outline} from 'react-icons-kit/md/ic_mail_outline'
import {mail4} from 'react-icons-kit/icomoon/mail4';

export const Mail = () => <Icon
size={24}
style={{marginRight:50}}
icon={mail4}
/>;

//ナビゲーションバーのダイレクトメッセージアイコン
export const DirectMessage = () => <Icon
  size={24}
  style={{marginRight:50}}
  icon={ic_email}
/>;

//ナビゲーションバーの通知アイコン
export const Bell = () => <Icon
  size={22}
  style={{marginRight:50}}
  icon={bell}
/>;

//ナビゲーションバーのアカウントアイコン
export const Person = () => <Icon
  size={24}
  style={{marginRight:50}}
  icon={person}
/>;


//footerのアイコン
export const Github = () => <Icon
  size={25}
  icon={github}
/>;

export const Twitter = () => <Icon
  icon={twitter}
  size={25}
/>;
