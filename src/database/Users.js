const RocksDB  = require('rocksdb');
const path = require('path');

class Users {
    constructor(dbName){
        this.dbPath = path.resolve(__dirname, '../../db_data', dbName);
        this.db = null;
        this.open((err) =>{
            err ? console.error("Erro ao abrir o branco: ", err) : null;
        });
    }

    open(callback){
        this.db = new RocksDB(this.dbPath);
        this.db.open(callback);
    }

    close(callback){
        if(this.db){
            this.db.close(callback);
        }
    }

    readAllData(callback){
        if(!this.db){
            return callback(new Error('O banco não está aberto!'));
        }

        const data = [];
        const iterator = this.db.iterator({});

        const loop = () => {
            iterator.next((err, key, value) => {
                if(err){
                    iterator.end(() => {
                        callback(err);
                    });
                    return;
                }

                if(!key && !value){
                    iterator.end(()=>{
                        callback(null, data);
                    });
                    return;
                }

                const temp = JSON.parse(value.toString());
                const result = {
                    id : key.toString(),
                    username : temp.username,
                    name : temp.name,
                    password : temp.password,
                    user_type : temp.user_type
                }

                data.push(result);
                loop();
            });
        }
        loop();
    }

    put(key, value, callback){
        if(!this.db){
            return callback(new Error('O banco não está aberto!'));
        }
        this.db.put(key, value, callback);
    }

    get(key, callback){
        if(!this.db){
            return callback(new Error('O banco não está aberto!'));
        }
        this.db.get(key, callback);
    }

    del(key, callback){
        if(!this.db){
            return callback(new Error('O banco não está aberto!'));
        }
        this.db.del(key, callback);
    }
}

module.exports = Users;

