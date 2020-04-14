module.exports = async function getToken() {
const pool = require('../database');
const axios = require('axios')
var nowDate = new Date();
var today = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
var accessToken = await pool.query("SELECT * FROM token")
var expireDate = getExpireDate(accessToken[0].created_at, accessToken[0].expires_in)

  var res = today.split('/') 
  var res1 = expireDate.split('/')
  console.log(res1)
  console.log(res)
  if(res[0] >= res1[0] && res[1] > res1[1]){
    var newToken = await getNewToken()
    //console.log("new1" + newToken)
    return newToken
  }else if(res[1] == res1[1] && res[2] >= (res1[2] - 2)){
    var newToken = await getNewToken()
    //console.log("new2" + newToken)
    return newToken
  }else{
   //console.log(accessToken + "//")
   return accessToken[0].access_token
  }


async function getNewToken(){

 	var requestToken = await axios.post('https://api.resourceguruapp.com/oauth/token', {
        grant_type    : 'password',
        username      : 'mariaalejandralomeli@gmail.com',
        password      : 'Intelix.123',
        client_id     : '92fivwj7g0ugu4qh9tqDnFxqB6XPq1IcjAktX9ruvIQ',
        client_secret : 'V_Ner9Zj29PXPKjoqqevEqS3BeWvs8ZTyD6E1DRQKF8'
    })

    const expireSecG = requestToken.data.expires_in
    const newToken = requestToken.data.access_token
    await pool.query(`UPDATE token SET access_token = '${newToken}', expires_in = '${expireSecG}', created_at = '${today}'`);
    console.log("update :" + newToken)
    return newToken
}


function getExpireDate(created_at, secs) {
  days = secs/43200
  var res = created_at.split('/')
  var tyear = parseInt(res[0])
  var tmonth = parseInt(res[1])
  var tday = parseInt(res[2])
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
      month =  tmonth + 1
      year = tyear
    }else{
      day = tday + days
      month = tmonth
      year = tyear
    }
  }
  return year+'/'+month+'/'+day
}


}