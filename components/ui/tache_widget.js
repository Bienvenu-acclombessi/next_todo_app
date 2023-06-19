import { ArrowsUpDownIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import { useState } from "react";
  
  export default function TacheWidget(props) {
       const [tache,setTache]=useState(props.tache);
      const updateTache= async (tache_id)=>{
        console.log(tache_id);
        const id=tache_id.id;
                const response=await fetch('/api/update',
                {
                  method: 'POST',
                  body: JSON.stringify({tache_id:id}),
        headers: {
          "Content-type": "application/json",
        }
                }
                );
          const data=await response.json();
          console.log(data);
          setTache(data);
      }
    return (
          <li key={tache.title} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="/check.png" alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{tache.title}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{tache.content}</p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              {/* <p className="text-sm leading-6 text-gray-900">{person.role}</p> */}
              {tache.finished ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Finished
                   {/* <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time> */}
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <button type="button" onClick={()=>updateTache(tache)} className=" p-3 rounded-sm text-white bg-green-900">Terminé</button>
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">En cours {tache.id} </p>
                </div>
              )}
            </div>
          </li>
        
    )
  }
  