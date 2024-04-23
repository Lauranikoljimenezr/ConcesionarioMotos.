import { log } from 'console';
import db from '../config/config-db';
import User from '../Dto/UserDto';

class UserRepository {

    static async add(user: User){
     console.log(user);
     
  
        const sql = 'INSERT INTO users (email, name, lastName, phoneNumber, password, domicilio) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [user.email, user.name, user.lastName, user.phoneNumber, user.password,user.domicilio];
    
      
        
        return db.execute(sql, values);
        
    }
}


export default UserRepository;