import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setFooter } from "./../stores/rendering";
import { db } from './../firebase/index'
import moment from 'moment'


import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { Card } from 'react-bootstrap';

const useStyles = makeStyles(theme => ({
  root : {
    width: '17rem',
    display: 'inline-block',
    padding: '5px'
  },
  cardbody: {
    margin: 15,
  },
  cardimg: {
    width: '100%',
    maxHeight: '200px',
    minHeight: '200px',
    objectFit: 'cover'
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(5.5),
    height: theme.spacing(5.5),
    float: 'left',
  },
  carduser: {
    paddingTop: '11px',
    marginLeft: '55px',
    marginBottom: '20px'
  },
  username: {
    margin: 0
  },
  cardtitle: {

  },
  date: {
    float: 'right',
  },
  likefooter: {
    textAlign: 'right',
  },
  likecount: {
    marginLeft: '5px'
  }
}));

//文字数制限

function AdCard(props) {
  const classes = useStyles();
  /*
    props[1]にあるもの
    ユーザーアイコン
    ユーザーネーム
    ユーザーid
    作品のサムネイル
    タイトル
    説明
    元の案件
    投稿日時
    userIdからとってくる
  */

  //User
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const [userIcon, setUserIcon] = useState();

  //投稿作品

  //元の案件
  const [projectName, setProjectName] = useState();
  const [projectUrl, setProjectUrl] = useState();
  
  useEffect(() => {
    db.collection('users').get().then(snapshot => {
      snapshot.forEach(doc => {
        if( props[1].userId === doc.id ){
          setUserName(doc.get('name'));
          setUserId(doc.get('userId'));
          setUserIcon(doc.get('icon'));
          console.log(doc.get('name'));
        }
      })
    })

    db.collection('form').get().then(snapshot => {
      snapshot.forEach(doc =>{
        if( props[1].formId === doc.id ){
          setProjectName( doc.get('title') );
          setProjectUrl(props[1].formId)
        }
      })
    })
    
    
  }, [props])
  
  const AdUrl = "/posts/" + props[0];
  const UserPageUrl = "/user/" + userId;
  const ProjectUrl = "/projects/" + projectUrl;

  return(
    <div className={classes.root}>
    <Card class="grid-item">
      <a href={AdUrl}>
        <img className={classes.cardimg} src={props[1].url}/>
      </a>
      <div className={classes.cardbody}>
        <div>
          <a href={UserPageUrl}>
            <Avatar className={classes.orange} src={userIcon}>N</Avatar>
          </a>
          <div className={classes.carduser}>
          <a href={UserPageUrl} style={{ color: 'black', textDecoration: 'none' }}>
            <h6 className={classes.username}>{userName}<small className="text-muted">@{userId}</small></h6>
          </a>
          </div>
        </div>
        <a href={AdUrl} style={{ color: 'black', textDecoration: 'none' }}>
          <h5 className={classes.cardtitle}>
            {props[1].title}
          </h5 >
        </a>
        <Card.Text>
          {props[1].description}
        </Card.Text>
        <div className={classes.likefooter}>
          <FavoriteIcon color="secondary" />
          <span className={classes.likecount}>{props[1].likecount}</span>
        </div>
      </div>
      <Card.Footer>
        <a href={ProjectUrl} style={{ textDecoration: 'none' }}>
          <small className="text-muted">{projectName}</small>
        </a>
        <div className={classes.date}>
          <a href={AdUrl} style={{ textDecoration: 'none' }}>
            <small className="text-muted">{moment(props[1].timestamp.toDate()).format('YYYY/MM/DD')}</small>
          </a>
        </div>
      </Card.Footer>
    </Card>
    </div>
  );
}

export default AdCard;
