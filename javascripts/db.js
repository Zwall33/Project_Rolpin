var mysql = require('mysql');
var async = require('async');
var state = {
    pool: null,
}

exports.connect = function(done){
    state.pool = mysql.createPool({
        host: "localhost",
        user: "root",
        port: 3306,
        password: "",
        database: "test_lea_rolpin"
    });
    done();
}

exports.get = function() { //Récupère la query sql pour l'envoyer à la DB et retourne le résultat, utilisé ou non dans la page ayant créer la query
    return state.pool
}