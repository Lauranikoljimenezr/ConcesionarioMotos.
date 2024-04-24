import db from '../config/config-db';
import User from '../Dto/UserDto';
class UserRepository {

    static async add(user: User){     
        const sql = 'INSERT INTO users (email, name, lastName, phoneNumber, password, domicilio) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [user.email, user.name, user.lastName, user.phoneNumber, user.password,user.domicilio];   
        return db.execute(sql, values);
    }

    static async logeo(email: string){        
        const sql = 'SELECT * FROM users WHERE email = ?';
        const values = [email];     
        return db.execute(sql, values);   
    }

    static async getUserPassword(email: string): Promise<string | null> {
        try {
            const sql = 'SELECT password FROM users WHERE email = ?';
            const values = [email];
            const result = await db.execute(sql, values);

        if (result && result.length > 0 && Array.isArray(result[0]) && result[0].length > 0) {
            const firstRow = result[0];
            const user = firstRow[0];

            if (user && 'password' in user) {
                return user.password;
            }
        }

        return null; 
        } catch (error) {
            console.error('Error al obtener la contraseña del usuario:', error);
            throw error;
        }
    }
}

export default UserRepository;
