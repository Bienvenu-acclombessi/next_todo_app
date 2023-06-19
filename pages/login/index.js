import Head from "next/head"
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
export default function Login() {
    const [loading, setLoading] =useState(false);
  const router=useRouter();
  const [errorm, setErrorm] =useState(null);
  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault();
    const form = event.target;
    const formData = {
      email: form.email.value,
      password: form.password.value,
    };
    
    try {
        const result = await signIn('credentials', {
            redirect: false,
            ...formData,
          });
        router.push('/') // Redirection vers la page de connexion
      } catch (error) {
        setErrorm(error)
        setLoading(false)
      }
   
  };
    return (
      <>
      <Head>
        <title>TodoApp| Login</title>
      </Head>
     <div className="h-full">
       
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="text-md text-bold text-center text-pink-700">Todo App</h1>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Connectez vous à votre compte
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit} action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Adresse email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Mot de passe
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-pink-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                  >{loading? ( <>
                    <svg
                      class="animate-spin h-5 w-5 mr-3 ..."
                      viewBox="0 0 24 24"
                    ></svg>
                    Veuillez patienter...
                  </>): (<span> Se connecter</span>) }
             
                  </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
                Je n'ai pas un compte{" "}
                <a
                  href="/register"
                  className="font-semibold leading-6  text-pink-900 hover:text-pink-500"
                >
                  Je m'inscrire
                </a>
              </p>
          </div>
        </div>
           
     </div>      
      </>
    )
  }
  