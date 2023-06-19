import { useEffect,useState } from "react";

import { prisma } from '../server/db/client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from '@/components/layout/header'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import TacheWidget from '@/components/ui/tache_widget'

import LoadingModal from '@/components/ui/modal'
import Head from "next/head";
import { TRACE_OUTPUT_VERSION } from "next/dist/shared/lib/constants";
export default function Dashboard({session,taches}) {
  // const { data: session, status } = useSession()
  const router = useRouter();
  
  

  // const recupererTaches=async()=>{
  //   const response=await fetch('/api/tache');
  //   const data = await response.json();
  //   setLoading_taches(false)
  //   setTaches(data)
  // }

  // useEffect(() => {
  //   // if (!(status === "authenticated")) {
  //   //   router.push('/login') // Redirection vers la page de connexion
     
  //   // }else{
  //   //   setLoading_user(false)
  //   // }
  //   recupererTaches();
  //   console.log(taches)
  // }, []);

   
  return (
   <>
    <Head>
        <title>TodoApp| Accueil</title>
      </Head>
   <Layout title={'Mes taches'}>
       <div className="container" >
       <ul>
        {taches.map((tache) => (
          <TacheWidget tache={tache} />
        ))}
      </ul>         
       </div>
   </Layout>
   
   </>
  );
}



export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  // const response = await fetch('http://localhost:3000/api/tache/');
  // console.log(response)
  // const data = await response.json();
  // console.log(data)
  // const {taches}= await data
  // console.log(taches)
  const taches=await prisma.tache.findMany({where: {userId: parseInt(`${session.user.id}`) } })
                   
  return {
    props: {
      session: {
        user: {
          image: session?.user?.image ?? null
        },
      },
      taches
    },
  }
}
