//npm requires
const express = require('express')
const axios = require('axios')
//Project's own requires
const pool = require('../database');
//Initializations
const router = express.Router()



//Routes
    //GET para obtener registros
router.get('/users/:email', async (req, res) => {//Ruta para obtener datos del usuario segun su email
    const { email } = req.params 
    const result = await pool.query('SELECT * FROM user WHERE email = "'+email+'"');
    res.json(result);
});
router.get('/skills/:group', async (req, res) => {//Ruta para obtener datos de skill segun su grupo
    const { group } = req.params
    let skills = await pool.query('SELECT * FROM skills');
    const result = skills.filter((data) => JSON.parse(data.group_ids).includes( parseInt(group)));
    res.json(result);
});
router.get('/groups', async (req, res) => {//Ruta para obtener datos de los grupos de gerencia
    const result = await pool.query('SELECT * FROM group');
    res.json(result);
});
router.get('/categories', async (req, res) => {//Ruta para obtener datos de las categorias de skill
    const result = await pool.query('SELECT * FROM categories');
    res.json(result);
});
    //PUT para insertar registros
router.put('/users', async (req, res) => {//Ruta para ingresar los datos del usuario
    const { email, full_name, group_id, skills } = req.body 
    const exist = (await pool.query('SELECT * FROM user WHERE email = "'+email+'"')).length!=0 ? true : false;
    if (exist){
        res.send("ERROR");
    }else{
        const result = await pool.query('INSERT INTO user SET ?', {email: email, full_name: full_name, group_id: group_id, skills: skills})
        res.json(result);
    }
});
router.put('/skills', async (req, res) => {//Ruta para ingresar los datos de las skills
    const { name, group_ids, category_id } = req.body 
    const exist = (await pool.query('SELECT * FROM skills WHERE name = "'+name+'"')).length!=0 ? true : false;
    if (exist){
        res.send("ERROR");
    }else{
        const result = await pool.query('INSERT INTO skills SET ?', {name: name, group_ids: group_ids, category_id: category_id})
        res.json(result);
    }
});
router.put('/groups', async (req, res) => {//Ruta para ingresar los datos de los grupos de gerencia
    const { name, description } = req.body 
    const exist = (await pool.query('SELECT * FROM group WHERE name = "'+name+'"')).length!=0 ? true : false;
    if (exist){
        res.send("ERROR");
    }else{
        const result = await pool.query('INSERT INTO group SET ?', {name: name, description: description})
        res.json(result);
    }
});
router.put('/categories', async (req, res) => {//Ruta para ingresar los datos de la categoria de skill
    const { name, description } = req.body 
    const exist = (await pool.query('SELECT * FROM categories WHERE name = "'+name+'"')).length!=0 ? true : false;
    if (exist){
        res.send("ERROR");
    }else{
        const result = await pool.query('INSERT INTO categories SET ?', {name: name, description: description})
        res.json(result);
    }
});
    //POST para editar registros
router.post('/users', async (req, res) => {//Ruta para editar los datos del usuario
    const { id, email, full_name, group_id, skills } = req.body 
    const exist = (await pool.query('SELECT * FROM user WHERE id = "'+id+'"')).length!=0 ? true : false;
    if (exist){
        const result = await pool.query('UPDATE user SET email = ?, full_name = ?, group_id = ?, skills = ? WHERE id = ?', [email, full_name, group_id, skills, id])
        res.json(result);
    }else{
        res.send("ERROR");
        
    }
});
router.post('/skills', async (req, res) => {//Ruta para editar los datos de las skills
    const { id, name, group_ids, category_id } = req.body; 
    const exist = (await pool.query('SELECT * FROM skills WHERE id = "'+id+'"')).length!=0 ? true : false;
    if (exist){
        const result = await pool.query('UPDATE skills SET name = ?, group_ids = ?, category_id = ? WHERE id = ?', [name, group_ids, category_id, id])
        res.json(result);
    }else{
        res.send("ERROR");
        
    }
});
router.post('/groups', async (req, res) => {//Ruta para editar los datos del usuario
    const { id, name, description } = req.body 
    const exist = (await pool.query('SELECT * FROM group WHERE id = "'+id+'"')).length!=0 ? true : false;
    if (exist){
        const result = await pool.query('UPDATE group SET name = ?, description = ? WHERE id = ?', [name, description, id])
        res.json(result);
    }else{
        res.send("ERROR");
        
    }
});
router.post('/categories', async (req, res) => {//Ruta para editar los datos del usuario
    const { id, name, description } = req.body 
    const exist = (await pool.query('SELECT * FROM categories WHERE id = "'+id+'"')).length!=0 ? true : false;
    if (exist){
        const result = await pool.query('UPDATE categories SET name = ?, description = ? WHERE id = ?', [name, description, id])
        res.json(result);
    }else{
        res.send("ERROR");
        
    }
});
    //DELETE para eliminar registros
router.delete('/users', async (req, res) => {//Ruta para eliminar los datos de los grupos de gerencia
    const { id } = req.body
    const result = await pool.query('DELETE FROM user WHERE id =' + id)
    res.json(result);
});
router.delete('/skills', async (req, res) => {//Ruta para eliminar los datos de los grupos de gerencia
    const { id } = req.body
    const result = await pool.query('DELETE FROM skills WHERE id =' + id)
    res.json(result);
});
router.delete('/groups', async (req, res) => {//Ruta para eliminar los datos de los grupos de gerencia
    const { id } = req.body
    const result = await pool.query('DELETE FROM groups WHERE id =' + id)
    res.json(result);
});
router.delete('/categories', async (req, res) => {//Ruta para eliminar los datos de los grupos de gerencia
    const { id } = req.body
    const result = await pool.query('DELETE FROM categories WHERE id =' + id)
    res.json(result);
});
module.exports = router