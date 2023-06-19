import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
export default function Login() {
  const [loading, setLoading] =useState(false);
  const router=useRouter();
  const [errorm, setErrorm] =useState(null);
  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault();
    const form = event.target;
    const formData = {
      nom: form.nom.value,
      prenom: form.prenom.value,
      email: form.email.value,
      password: form.password.value,
    };
    
    try {
        const response=await fetch('/api/register',{
            method: 'POST',
            body: JSON.stringify(formData),
            headers:{
                'Content-type': 'application/json'
        }
        });
        const data= await response.json();
        const {success}=data;    
        router.push('/login') // Redirection vers la page de connexion
      } catch (error) {
        setErrorm(error)
        setLoading(false)
      }
   
  };
  return (
    <>
      <Head>
        <title>TodoApp| Register</title>
      </Head>
      <div className="flex  flex-wrap h-screen w-screen overflow-x-hidden">
        <div className="flex-1  relative bg-black">
          <div className="absolute left-0 w-full bg-contain h-full sm:visible flex flex-col justify-center items-center">
            <div>
              <img
                className="mx-auto h-auto w-auto"
                src="/bg2.jpg"
                alt="Your Company"
              />
            </div>
            {/* <h1 className=" text-2xl font-bold text-white text-center">
                    TodoApp
                </h1> */}
          </div>
        </div>
        <div className="flex-1 bg-fixed bg-pink h-full bg-white ">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Créer un compte
              </h2>
            </div>

            <div>
                <p className="text-sm text-pink-900"> {errorm} </p>
            </div>

            <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                className="space-y-6"
                onSubmit={handleSubmit}
                action="#"
                method="POST"
              >
                <div>
                  <label
                    htmlFor="nom"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nom
                  </label>
                  <div className="mt-2">
                    <input
                      id="nom"
                      name="nom"
                      type="text"
                      required
                      className="first-line:block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Prenom
                  </label>
                  <div className="mt-2">
                    <input
                      id="prenom"
                      name="prenom"
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Adresse email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="peer block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <p class="mt-1 invisible peer-invalid:visible text-pink-600 text-sm">
                      Veuillez entrer un email valide
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
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
                    className="flex w-full justify-center rounded-md bg-pink-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600" disabled={loading ? 'disabled' : false} >
                    {loading? ( <>
                          <svg
                            class="animate-spin h-5 w-5 mr-3 ..."
                            viewBox="0 0 24 24"
                          ></svg>
                          Veuillez patienter...
                        </>): (<span> S'inscrire</span>) }
                   
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                J'ai deja un compte{" "}
                <a
                  href="/login"
                  className="font-semibold leading-6  text-pink-900 hover:text-pink-500"
                >
                  Je me connecte
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
