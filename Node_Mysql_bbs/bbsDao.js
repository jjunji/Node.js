var database = require("./module/database");
var tableName = "board";

exports.select = function(callback){
    var query = "select * from "+tableName+" ";
    database.executeQuery(query, callback);
}

exports.search = function(qs, callback){
    var query = "select * from" +tableName+ "where title like '%" + qs.title + "%' ";
    console.log(query);
    database.executeQuery(query, callback);
}

exports.insert = function(data, callback){
    console.log("in bbsDao insert");
    var query = " insert into "+tableName+"(title,content,author,date)";
        query = query + " VALUES ?";
    var values = [
        [data.title,data.content,data.author,data.date]
    ];
    database.executeMulti(query, values, callback);
}

exports.update = function(data, callback){
    var query = " update "+tableName
                + " set title=?, content=?, author=?, date=? where id=?";
    var now = new Date().toLocaleDateString();
    var values = [data.title, data.content, data.author, now, data.id];

    database.execute(query, values, function(error){
        callback(error);
    })
}

exports.delete = function(data, callback){
    var query = "delete from "+tableName+" where id = ?";
    var values = [data.id];
    database.execute(query, values, function(error){
        callback(error);
    });
}