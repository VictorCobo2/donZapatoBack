
import jwt from "jsonwebtoken"

export const generarJwt = ( uid:any)=>{
    return new Promise ((resolve, reject)=>{
        const payload = {uid};
        jwt.sign( payload, `llavesecreta`, {
            expiresIn: '24h'
        }, (err, token)=>{
            if (err) {
                console.log(err)
                reject('No se genero el token');
            }else{
                resolve(token);
            }
        })
    })

}