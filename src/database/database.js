import mysql from "mysql2"
import {config} from "dotenv"
config()
const pool= mysql.createPool({
    host:config.HOST,
    database:config.DATABASE,
    user :config.USER,
    password:config.PASSWORD,
    
})
export default pool

