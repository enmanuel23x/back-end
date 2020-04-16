//npm requires
/*const express = require('express')
const axios = require('axios')
//Project's own requires

//Initializations 
var accessTokenG = 'TL5O159iOxHJL2SV-z4JhUTKclGFuE4cX4E7DjMfWP0'
var dayG = '2020/03/30'
var expireDateG = getExpireDate(30, 3, 2020, 604800)
var nowDate = new Date();
var todayG = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();

function getToken(){
  var res = todayG.split('/')
  var res1 = expireDateG.split('/')
  if(res[0] >= res1[0] && res[1] >= res1[1] && res[2] >= (res1[2] - 1)){
    getNewToken()
  }else{

  }

}

function getExpireDate(tday, tmonth, tyear, secs) {
  days = secs/43200
  var month, day, year = 0
  if(tmonth == 1 || tmonth == 3 || tmonth == 5 || tmonth == 7 || tmonth == 8 || tmonth == 10 || tmonth == 12){
    if((tday + days) > 31 && tmonth !== 12){
      day = (tday + days) - 31
      month = tmonth + 1
      year = tyear
    }else if ((tday + days) > 31 && tmonth == 12) {
      day = (tday + days) - 31
      month = 1
      year = tyear + 1
    }else{
      day = tday + days
      month = tmonth
      year = tyear
    }
  }else if(tmonth == 4 || tmonth == 6 || tmonth == 9 || tmonth == 11){
    if((tday + days) > 30){
      day = (tday + days) - 30
      month = tmonth + 1
      year = tyear
    }else{
      day = tday + days
      month = tmonth
      year = tyear
    }
  }else if(tmonth == 4){
    if((tday + days) > 28){
      day = (tday + days) - 28
      month = date.getMonth() + 2
      year = tyear
    }else{
      day = tday + days
      month = tmonth
      year = tyear
    }
  }
  return year+'/'+month+'/'+day
}

function getNewToken() {
  axios.post('https://api.resourceguruapp.com/oauth/token', {
        grant_type    : 'password',
        username      : 'mariaalejandralomeli@gmail.com',
        password      : 'Intelix.123',
        client_id     : '92fivwj7g0ugu4qh9tqDnFxqB6XPq1IcjAktX9ruvIQ',
        client_secret : 'V_Ner9Zj29PXPKjoqqevEqS3BeWvs8ZTyD6E1DRQKF8'
    })
    .then(function (response) {
        var nowDateI = new Date(); 
        dayG = nowDateI.getFullYear()+'/'+(nowDateI.getMonth()+1)+'/'+nowDateI.getday();
        expireDateG = getExpireDate(nowDateI.getday(),(nowDateI.getMonth()+1),nowDateI.getFullYear(),response.data.expires_in)
        accessTokenG = response.data.access_token
      })
      .catch(function (error) {
        console.log(error);
      })
}
     



//?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4080%2Fauth%2Fcb&client_id=vdoO8xLDjDFtQIqHvO6UWHNkOIGPEMy18GdHfKzXuaY

*/