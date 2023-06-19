
import { prisma } from '../../server/db/client'
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]'

export default async function handle(req,res)
{
    const session = await getServerSession(req, res, authOptions)

        if (!session) {
            
          res.status(401).json({ message: "You must be logged in." });
          
        }else{
            const userId=`${session.user.id}`;

            if(req.method=='POST'){
                const {tache_id}=req.body
                console.log(tache_id);
                const tache=await prisma.tache.update({
                    where: {id: parseInt(tache_id) },
                    data: {
                        finished: true
                    }
                })
                res.status(200).json(tache)
               }else{
                   const taches=await prisma.tache.findMany({where: {userId: parseInt(`${session.user.id}`) } })
                   console.log(taches)
                   res.status(200).json('non pris en charge')
               }          
        }
}