//npm requires
const express = require('express')
const axios = require('axios')
//Project's own requires
const keys = require('../config/keys')
var getToken = require('../config/getToken')
//Initializations
const router = express.Router()



//Routes
router.get('/me/:token', (req, res) => {
    const { token } = req.params 
    res.send(token);
})

router.get('/resource/:id', async(req, res) => {
  accessToken = await getToken()
 
    const { id } = req.params
    axios.get(`https://api.resourceguruapp.com/v1/karlalomeli/resources/${id}`,{
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${await accessToken}`
        }
    })
    .then(function(response){
        res.send(response.data)
    })
    .catch(function (error) {
        console.log(error);
      })
})

router.get('/resources/ids', async (req, res) => {
    accessToken = await getToken()
     console.log(`Bearer ${await accessToken}`)
    await axios.get('https://api.resourceguruapp.com/v1/karlalomeli/resources',{
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${await accessToken}`
        }
    })
    .then(function(response){
        results = response.data
        var ids = []
        for (var i = 0; i <= (results.length - 1); i++) {
            ids.push(results[i]['id'])
        } 
        res.send(ids)
    })
    .catch(function (error) {
        console.log(error);
      })
})

router.post('/resources/emails', async (req, res) => {
  accessToken = await getToken()
    var emails = []
    const { ids } = req.body
    const getMails = async function(ids, emails){
        for (var i = 0; i <= (ids.length - 1); i++) {
        await axios.get(`https://api.resourceguruapp.com/v1/karlalomeli/resources/${ids[i]}`,{
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${await accessToken}`
        }
    })
    .then(function(response){
        results = response.data
        emails.push(results['email'])
        if (i == (ids.length - 1)) {
            res.send(emails)
        }
    })
    .catch(function (error) {
        console.log(error);
    })        
    }
    }
    getMails(ids, emails)
})


router.post('/resources/create', async (req, res) => {
  accessToken = await getToken()
    console.log(req.body)
    const {fName, lName, phone, email, skills} = req.body
    axios.post('https://api.resourceguruapp.com/v1/karlalomeli/resources', 
    {
        first_name: fName,
        last_name: lName,
        type: 'Person',
        phone: phone,
        resource_type_id:289294,
        email: email,
        invite: false,
        timezone: 'UTC',
        custom_field_option_ids: skills
    },
    {
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${await accessToken}`
        }
    })
    .then(function(response){
        res.send(response.data)
    })
    .catch(function (error) {
        console.log(error);
      })
})

router.post('/resources/edit/:id', async (req, res) => {
  accessToken = await getToken()
    const { id } = req.params
    const {skills} = req.body
    axios.put(`https://api.resourceguruapp.com/v1/karlalomeli/resources/${id}`, 
    {
        custom_field_option_ids: skills
    },
    {
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${await accessToken}`
        }
    })
    .then(function(response){
        res.send(response.data)
    })
    .catch(function (error) {
        console.log(error);
      })
})

router.get('/resources/delete/:id', async(req, res) => {
  accessToken = await getToken()
    const { id } = req.params
    axios.delete(`https://api.resourceguruapp.com/v1/karlalomeli/resources/${id}`, 
    {
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${await accessToken}`
        }
    })
    .then(function(response){
        res.send(response.data)
    })
    .catch(function (error) {
        console.log(error);
      })
})

router.get('/skills', async (req, res) => {
  accessToken = await getToken()
    axios.get('https://api.resourceguruapp.com/v1/karlalomeli/resource_types',{
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${await accessToken}`
        }
    })
    .then(function(response){
        const skills = response.data[0]['custom_fields'][3]['custom_field_options']
        res.send(skills)
        
    })
    .catch(function (error) {
        console.log(error);
      })
})
router.get('/titles', async (req, res) => {
  accessToken = await getToken()
    axios.get('https://api.resourceguruapp.com/v1/karlalomeli/resource_types',{
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${await accessToken}`
        }
    })
    .then(function(response){
        const skills = response.data[0]['custom_fields'][3]['custom_field_options']
        //console.log(skills.length)
        var titles = []
        for (var i = 0; i <= (skills.length - 1); i += 4) {
            titles.push(skills[i])

        }
        res.send(titles)
        
    })
    .catch(function (error) {
        console.log(error);
      })
})


module.exports = router