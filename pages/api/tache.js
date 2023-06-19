
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
                const {title,content}=req.body
                console.log({title,content,userId});
                //    try {
                //        const tache=  await prisma.tache.create(
                //            {
                //                data : {title,content,userId
                //                },
                //            }
                //        );
                //        res.status(200).json({ tache })
                //      } catch (error) {
                      
                //    res.status(201).json({ error })
                //      }
                
                const tache=  await prisma.tache.create(
                    {
                        data: {
                            title,
                            content,
                            user: {
                              connect: {
                                id: parseInt(userId),
                              },
                            },
                          },
                    }
                );
                res.status(200).json({ tache })
              
               }else{
                   const taches=await prisma.tache.findMany({where: {userId: parseInt(`${session.user.id}`) } })
                   console.log(taches)
                   res.status(200).json({ taches })
               }
           
           
        }
}