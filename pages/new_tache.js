import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "@/components/layout/header";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import LoadingModal from "@/components/ui/modal";
import Head from "next/head";
export default function NewTache({ session }) {
  // const { data: session, status } = useSession()

  const router = useRouter();
  const [loading2, setLoading2] = useState(false);
  const [loading_user, setLoading_user] = useState(false);
  const [loading_taches, setLoading_taches] = useState(true);
  const [errorm, setErrorm] = useState(null);
  const [taches, setTaches] = useState([]);
  const handleSubmit = async (event) => {
    setLoading2(true);
    event.preventDefault();
    const form = event.target;
    const formData = {
      title: form.title.value,
      content: form.description.value,
    };

    try {
      const response = await fetch("/api/tache", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      const { tache } = data;
      console.log(tache);
      setLoading2(false);
    } catch (error) {
      setErrorm(error);
      setLoading2(false);
    }
  };

  if (loading_user) {
    return <LoadingModal />;
  } else
    return (
      <>
        <Head>
          <title>TodoApp| Accueil</title>
        </Head>
        <Layout>
          <div className="container">
            <form
              className="space-y-6"
              onSubmit={handleSubmit}
              action="#"
              method="POST"
            >
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Titre de la tâche
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    className="first-line:block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description de la tâche
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    required
                    className="first-line:block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-pink-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                  disabled={loading2 ? "disabled" : false}
                >
                  {loading2 ? (
                    <>
                      <svg
                        class="animate-spin h-5 w-5 mr-3 ..."
                        viewBox="0 0 24 24"
                      ></svg>
                      Veuillez patienter...
                    </>
                  ) : (
                    <span> Ajouter une tâche</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </Layout>
      </>
    );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: {
        user: {
          image: session?.user?.image ?? null,
        },
      },
    },
  };
}
