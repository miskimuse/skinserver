var router = require('express').Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var Skin = sequelize.import('../models/skin');
var validateSession = require("../middleware/validate-session");

router.get('/', (req, res)=> {
    let userid = req.user.id;

    Skin.findAll({where: {owner: userid}})
        .then(
            function findAllSuccess(data){
                res.json(data);
            },
            function findAllError(err){
                res.send(500, err.message);
            }
        )
})


router.post('/create',validateSession, (req, res) => {
    let cleanser = req.body.cleanser;
    let exfoliant = req.body.exfoliant;
    let moisturizer = req.body.moisturizer;
    let result = req.body.result;
    let owner = req.user.id;

    Skin
    .create({
        cleanser: cleanser,
        exfoliant: exfoliant,
        moisturizer: moisturizer,
        result: result,
        owner: owner
    })
    .then(
        function createSuccess(skindata){
            res.json({
                skindata: skindata
            })
        },
        function createError(err){
            res.send(500, err.message);
        }
    )
})

router.get('/:id',validateSession, (req, res) => {
    let data = req.params.id;
    let userid = req.user.id;

    Skin
        .findOne({
            where: {id: data, owner: userid}
        }).then(
            function findOneSuccess(data){
                res.json(data);
            },
            function findOneError(err){ 
                res.send(500, err.message);
            }
        )
})

router.put('/:id', validateSession, (req, res) =>{
    let updateId = req.params.id;
    let updateCln = req.body.cleanser;
    let updateExf = req.body.exfoliant;
    let updateMst = req.body.moisturizer;
    let updateRes = req.body.result;
    let updateOwner = req.user.id

    Skin
        .update({
            cleanser: updateCln,
            exfoliant: updateExf,
            moisturizer: updateMst,
            result: updateRes,
            owner: updateOwner
        }, {where: {id: updateId}})
        .then(
            function updateSuccess(){
                res.json({
                    cleanser: updateCln,
                    exfoliant: updateExf,
                    moisturizer: updateMst,
                    result: updateRes,
                    owner: updateOwner
                })
            }, 
            function updateError(err){
                res.send(500, err.message);
            }
        )
})

router.delete('/:id', validateSession,(req, res) => {
    let data = req.params.id;
    let userId = req.user.id;

    Skin 
        .destroy({
            where: {id: data, owner: userId}
        })
        .then(
            function deleteLogSuccess(){
                res.send("deleted");
            },
            function deleteLogError(err){
                res.send(500, err.message);
            }
        )
})

module.exports = router;