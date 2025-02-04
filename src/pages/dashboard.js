import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebaseConfig";
import { signOut } from "firebase/auth";
import styles from "../styles/dashboard.module.css"; // Importa o CSS

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

  const handleNavigateToCourse = () => {
    router.push("/curso"); // Navega para a página de visão de curso
  };

  if (!user) return <p>Carregando...</p>;

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardCard}>
        <h1 className={styles.dashboardTitle}>
          Bem-vindo, {user.displayName}!
        </h1>
        
        <div className="flex flex-col items-center gap-4">
          {/* Botão para visão de curso */}
          <button 
            onClick={handleNavigateToCourse} 
            className={`${styles.button} ${styles.viewCourseButton}`}
          >
            Ver Visão de Curso
          </button>

          {/* Botão de logout */}
          <button
            onClick={handleLogout}
            className={`${styles.button} ${styles.logoutButton}`}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
