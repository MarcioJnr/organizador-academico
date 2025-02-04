import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/dashboard.module.css"; // Importa o CSS

export default function Curso() {
  const [semestres, setSemestres] = useState([]); // Estado para armazenar semestres
  const [semestreNome, setSemestreNome] = useState(""); // Estado para o nome do semestre
  const router = useRouter();

  const handleAddSemestre = () => {
    if (semestreNome.trim() !== "") {
      setSemestres((prevSemestres) => [
        ...prevSemestres,
        semestreNome,
      ]);
      setSemestreNome(""); // Limpa o campo de entrada
    }
  };

  const handleLogout = () => {
    // Lógica de logout (se necessário)
    router.push("/login");
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardCard}>
        <h1 className={styles.dashboardTitle}>Cadastro de Semestres</h1>
        
        {/* Formulário de cadastro de semestre */}
        <div className="flex flex-col items-center gap-4">
          <input
            type="text"
            value={semestreNome}
            onChange={(e) => setSemestreNome(e.target.value)}
            placeholder="Nome do semestre"
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
          <button
            onClick={handleAddSemestre}
            className={`${styles.button} ${styles.viewCourseButton}`}
          >
            Adicionar Semestre
          </button>
        </div>

        {/* Lista de semestres cadastrados */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Semestres Cadastrados:</h2>
          <ul className="list-disc pl-5 mt-2">
            {semestres.length === 0 ? (
              <li>Não há semestres cadastrados.</li>
            ) : (
              semestres.map((semestre, index) => (
                <li key={index} className="text-gray-700">{semestre}</li>
              ))
            )}
          </ul>
        </div>

        {/* Botão de logout */}
        <button
          onClick={handleLogout}
          className={`${styles.button} ${styles.logoutButton}`}
        >
          Sair
        </button>
      </div>
    </div>
  );
}
