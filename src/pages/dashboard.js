import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebaseConfig";
import { signOut } from "firebase/auth";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login"); // Se não estiver logado, volta para o login
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Encerra a sessão no Firebase
      setUser(null); // Remove o usuário do estado
      router.push("/login"); // Redireciona para login
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  if (!user) return <p>Carregando...</p>;

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <h1 className="text-2xl font-bold">Bem-vindo, {user.displayName}!</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Sair</button>
    </div>
  );
}
