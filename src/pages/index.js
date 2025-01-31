import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebaseConfig";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/dashboard"); // Vai para o painel se estiver logado
      } else {
        router.push("/login");
      }
    });
  }, [router]);

  return <p>Carregando...</p>;
}
