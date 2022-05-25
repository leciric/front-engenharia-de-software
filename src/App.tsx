import axios from "axios";
import { useState } from "react";

import 'react-toastify/dist/ReactToastify.css';

import { toast, ToastContainer } from "react-toastify";


export function App(): JSX.Element {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [coins, setCoins] = useState(0);

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3333/user", {
        name, email, password
      });


      toast.success("Cadastro realizado com sucesso");

    } catch (error) {
      toast.error("Ocorreu um erro ao fazer o cadastro, tente novamente!");
    }

  }


  async function handleGetCoins(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    try {


      const response = await axios.get(`http://localhost:3333/user/coins/${email}`);

      setCoins(response.data.coins);

      toast.success("Moedas buscadas com sucesso!");

    } catch (error) {
      toast.error("Ocorreu um erro ao buscar as moedas, tente novamente!")
    }
  }

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center gap-8">

        <div className="flex flex-col items-center justify-center">

          <form className="flex flex-col p-8 items-center justify-center border-2 gap-6 outline-none">
            <p className="mb-4 text-violet-600">Fazer cadastro</p>

            <input type="text" placeholder="Nome: "
              onChange={(event) => setName(event.target.value)}
              className="outline-none border-b-2 border-violet-200"
            />

            <input type="text" placeholder="Email: "
              onChange={(event) => setEmail(event.target.value)}
              className="outline-none border-b-2 border-violet-200"
            />

            <input type="password" placeholder="Senha: "
              onChange={(event) => setPassword(event.target.value)}
              className="outline-none border-b-2 border-violet-200"
            />

            <button
              className="px-4 py-1 rounded border-2 border-violet-500 hover:bg-violet-500 hover:text-white"
              onClick={(event) => handleSubmit(event)}
            >
              Enviar
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl text-violet-700 align-center mt-8">Moedas: {coins} </h1>

          <form className="flex flex-col p-8 items-center justify-center border-2 gap-6 mt-8">

            <h1>Verificar moedas de um usuário</h1>
            <input type="text" placeholder="Email: "
              onChange={(event) => setEmail(event.target.value)}
              className="outline-none border-b-2 border-violet-200"
            />

            <button
              className="px-4 py-1 rounded border-2 border-violet-500 hover:bg-violet-500 hover:text-white"
              type="button" onClick={(event) => handleGetCoins(event)}>Buscar moedas</button>
          </form>
        </div>

      </div>

      <ToastContainer /></>

  )
}

