//npm requires
const express = require('express')
const axios = require('axios')
//Project's own requires
const pool = require('../database');
const { json } = require('express');
//Initializations
const router = express.Router()



//Routes
    //GET para obtener registros
router.get('/tableUser', async (req, res) => {//Ruta para obtener datos de los usuarios
    const result = await pool.query('SELECT *, (SELECT name FROM user_group WHERE id = user.group_id) AS group_name FROM user');
    res.json(result);
});
router.get('/tableSkills', async (req, res) => {//Ruta para obtener datos de los skills
    const result = await pool.query('SELECT *, (SELECT name FROM categories WHERE id = skills.category_id) AS category_name FROM skills');
    res.json(result);
});
router.get('/users/:email', async (req, res) => {//Ruta para obtener datos del usuario segun su email
    const { email } = req.params 
    const result = await pool.query('SELECT *, (SELECT name FROM user_group WHERE id = user.group_id) AS group_name FROM user WHERE email = "'+email+'"');
    res.json(result);
});
router.get('/skills/:group', async (req, res) => {//Ruta para obtener datos de skill segun su grupo
    const { group } = req.params
    const cats = await pool.query('SELECT * FROM categories');
    const filteredCats = await cats.map( (item) => JSON.parse(item.group_ids).includes(parseInt(group)) ? item.id : null).filter(function (el) {
        return el != null;
      });
    async function mapResult(filteredCats){
        let result = [], skills;
        for (i=0; i<filteredCats.length; i++){
            skills =  await pool.query('SELECT *, (SELECT name FROM categories WHERE id = skills.category_id) AS category_name FROM skills WHERE category_id = '+filteredCats[i]+' ORDER BY category_name ASC, name ASC;');
            if(result.length == 0){
                result = skills
            }else{
                result = result.concat(skills)
            }
        }
        return result;
    }
    res.json(await mapResult(filteredCats));
});
router.get('/groups', async (req, res) => {//Ruta para obtener datos de los grupos de gerencia
    const result = await pool.query('SELECT * FROM user_group');
    res.json(result);
});
router.get('/categories', async (req, res) => {//Ruta para obtener datos de las categorias de skill
    const result = await pool.query('SELECT * FROM categories');
    res.json(result);
});
    //PUT para insertar registros
router.put('/users', async (req, res) => {//Ruta para ingresar los datos del usuario
    const { email, full_name, group_id, sede, cargo } = req.body
    const skills = JSON.stringify({"ids": [], "lvls": [], "names": []})
    const exist = (await pool.query('SELECT * FROM user WHERE email = "'+email+'"')).length!=0 ? true : false;
    if (exist){
        res.send("ERROR");
    }else{
        const result = await pool.query('INSERT INTO user SET ?', {email: email, full_name: full_name, group_id: group_id, skills: skills, sede: sede, cargo: cargo})
        res.json(result);
    }
});
router.put('/skills', async (req, res) => {//Ruta para ingresar los datos de las skills
    const { name, category_id } = req.body 
    const exist = (await pool.query('SELECT * FROM skills WHERE name = "'+name+'"')).length!=0 ? true : false;
    if (exist){
        res.send("ERROR");
    }else{
        const result = await pool.query('INSERT INTO skills SET ?', {name: name, category_id: category_id})
        res.json(result);
    }
});
router.put('/groups', async (req, res) => {//Ruta para ingresar los datos de los grupos de gerencia
    const { name, description } = req.body 
    const exist = (await pool.query('SELECT * FROM user_group WHERE name = "'+name+'"')).length!=0 ? true : false;
    if (exist){
        res.send("ERROR");
    }else{
        const result = await pool.query('INSERT INTO user_group SET ?', {name: name, description: description})
        res.json(result);
    }
});
router.put('/categories', async (req, res) => {//Ruta para ingresar los datos de la categoria de skill
    const { name, description, group_ids } = req.body 
    const exist = (await pool.query('SELECT * FROM categories WHERE name = "'+name+'"')).length!=0 ? true : false;
    if (exist){
        res.send("ERROR");
    }else{
        const result = await pool.query('INSERT INTO categories SET ?', {name: name, group_ids: group_ids, description: description})
        res.json(result);
    }
});
    //POST para editar registros
router.post('/users', async (req, res) => {//Ruta para editar los datos del usuario
    const { id, email, full_name, group_id, skills, sede, cargo  } = req.body
    const obj = JSON.parse(skills)
    const exist = (await pool.query('SELECT * FROM user WHERE id = "'+id+'"')).length!=0 ? true : false;
    if (exist){
        const result = await pool.query('UPDATE user SET email = ?, full_name = ?, group_id = ?, skills = ?, sede = ?, cargo = ? WHERE id = ?', [email, full_name, group_id, skills, sede, cargo, id])
        await pool.query('DELETE FROM skills_x_user WHERE user_id =' + id)
        for(i=0;i<obj.ids.length;i++){
            await pool.query('INSERT INTO skills_x_user SET ?', {skill_id: obj.ids[i], user_id: id, lvl: obj.lvls[i]})
        }
        res.json(result);
    }else{
        res.send("ERROR");
        
    }
});
router.post('/skills', async (req, res) => {//Ruta para editar los datos de las skills
    const { id, name, category_id } = req.body; 
    const exist = (await pool.query('SELECT * FROM skills WHERE id = "'+id+'"')).length!=0 ? true : false;
    if (exist){
        const users = await pool.query('SELECT * FROM user');
        let user;
        for (i=0; i<users.length; i++){
            user = users[i];
            user.skills = JSON.parse(user.skills);
            if(user.skills.ids.includes(parseInt(id))){
                updateSkillInUser(user, id, name)
            }
        }
        const result = await pool.query('UPDATE skills SET name = ?, category_id = ? WHERE id = ?', [name, category_id, id])
        res.json(result);
    }else{
        res.send("ERROR");
        
    }
});
function updateSkillInUser(user, skillId, name){
    const index = user.skills.ids.map( (item, i) => item == skillId ? i : null ).filter( (item) => item != null)[0];
    const result = {ids: user.skills.ids, lvls: user.skills.lvls, names: user.skills.names.map( (item, i) => i == index ? name : item)}
    axios.post('http://localhost:4080/resource/users',{
        id: user.id, 
        email: user.email, 
        full_name: user.full_name, 
        group_id: user.group_id, 
        skills: JSON.stringify(result),
        sede: user.sede, 
        cargo:user.cargo
    })
}
router.post('/groups', async (req, res) => {//Ruta para editar los datos del usuario
    const { id, name, description } = req.body 
    const exist = (await pool.query('SELECT * FROM user_group WHERE id = "'+id+'"')).length!=0 ? true : false;
    if (exist){
        const result = await pool.query('UPDATE user_group SET name = ?, description = ? WHERE id = ?', [name, description, id])
        res.json(result);
    }else{
        res.send("ERROR");
        
    }
});
router.post('/categories', async (req, res) => {//Ruta para editar los datos del usuario
    const { id, name, description, group_ids } = req.body 
    const exist = (await pool.query('SELECT * FROM categories WHERE id = "'+id+'"')).length!=0 ? true : false;
    if (exist){
        const result = await pool.query('UPDATE categories SET name = ?, group_ids = ?, description = ? WHERE id = ?', [name, group_ids, description, id])
        res.json(result);
    }else{
        res.send("ERROR");
        
    }
});
    //DELETE para eliminar registros
router.delete('/users/:id', async (req, res) => {//Ruta para eliminar los datos de los grupos de gerencia
    const { id } = req.params
    await pool.query('DELETE FROM skills_x_user WHERE user_id =' + id)
    const result = await pool.query('DELETE FROM user WHERE id =' + id)
    res.json(result);
});
router.delete('/skills/:id', async (req, res) => {//Ruta para eliminar los datos de los grupos de gerencia
    const { id } = req.params
    const users = await pool.query('SELECT * FROM user');
    await pool.query('DELETE FROM skills_x_user WHERE skill_id =' + id)
    let user;
    for (i=0; i<users.length; i++){
        user = users[i];
        user.skills = JSON.parse(user.skills);
        if(user.skills.ids.includes(parseInt(id))){
            deleteSkillFromUser(user, id)
        }
    }
    const result = await pool.query('DELETE FROM skills WHERE id =' + id);
    res.json(result);
});
function deleteSkillFromUser(user, skillId){
    const index = user.skills.ids.map( (item, i) => item == skillId ? i : null ).filter( (item) => item != null)[0];
    const result = {ids: user.skills.ids.filter( (item, i) => i != index), lvls: user.skills.lvls.filter( (item, i) => i != index), names: user.skills.names.filter( (item, i) => i != index)}
    axios.post('http://localhost:4080/resource/users',{
        id: user.id, 
        email: user.email, 
        full_name: user.full_name, 
        group_id: user.group_id, 
        skills: JSON.stringify(result),
        sede: user.sede, 
        cargo:user.cargo
    })
}
router.delete('/groups/:id', async (req, res) => {//Ruta para eliminar los datos de los grupos de gerencia
    const { id } = req.params
    const cats = await pool.query('SELECT * FROM categories');
    let exist;
    cats.forEach(cat => {
        if(JSON.parse(cat.group_ids).includes(parseInt(id))){
            exist = true;
        }
    });
    let result;
    if(exist){
        result = "ERROR"
    }else{
        result = await pool.query('DELETE FROM user_group WHERE id =' + id)
    }
    res.json(result);
});
router.delete('/categories/:id', async (req, res) => {//Ruta para eliminar los datos de los grupos de gerencia
    const { id } = req.params
    const skills = await pool.query('SELECT * FROM skills WHERE category_id= '+id);
    let result;
    if(skills.length!=0){
        result == "ERROR"
    }else{
        result = await pool.query('DELETE FROM categories WHERE id =' + id)
    }
    res.json(result);
});
module.exports = router
/*          Lo que falta
Enmanuel:
    -Crear categoria
    -Editar categoria
Alejandro: 
    -Editar grupos, usuarios y skills
*/