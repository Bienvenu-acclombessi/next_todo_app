
import { data } from 'autoprefixer'
import { prisma } from '../../server/db/client'
import { useRouter } from 'next/router'
import {hashSync} from 'bcrypt'

export default async function handle(req,res)
{

    if(req.method=='POST'){
     const {nom,prenom,email,password}=req.body
     const hashedPassword = hashSync(password, 10);
     console.log(nom)
        try {
            const user=  await prisma.user.create(
                {
                    data : {nom,
                        prenom,
                        email,
                        password:hashedPassword
                    },
                }
            );
            res.status(200).json({ success: 'utilisateurs ajouté avec success' })
          } catch (error) {
           
        res.status(201).json({ error })
          }


   
    }else{
        res.status(200).json({ error: 'Methode non prise en charge' })
    }


}