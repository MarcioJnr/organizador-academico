import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard"); // Redireciona para o painel após login
      }
    });
  }, [router]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">Login com Google</button>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Sair</button>
    </div>
  );
}
