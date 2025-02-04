import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/course.module.css"; // Ajuste o caminho do CSS se necessário

export default function SemestreDetalhes() {
  const router = useRouter();
  const { semestre } = router.query; // Obtém o semestre da URL
  const [disciplinas, setDisciplinas] = useState([]);
  const [disciplinaNome, setDisciplinaNome] = useState("");

  const handleAddDisciplina = () => {
    if (disciplinaNome.trim() !== "") {
      setDisciplinas((prev) => [...prev, disciplinaNome]);
      setDisciplinaNome("");
    }
  };

  const handleNavigateToDisciplina = (disciplina) => {
    router.push(`/disciplina/${encodeURIComponent(disciplina)}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{semestre || "Carregando..."}</h1>

        <div className={styles.form}>
          <input
            type="text"
            value={disciplinaNome}
            onChange={(e) => setDisciplinaNome(e.target.value)}
            placeholder="Nome da disciplina"
            className={styles.input}
          />
          <button onClick={handleAddDisciplina} className={`${styles.button} ${styles.addButton}`}>
            Adicionar Disciplina
          </button>
        </div>

        <h2 className={styles.subTitle}>Disciplinas cadastradas:</h2>
        <ul>
          {disciplinas.length === 0 ? (
            <li className={styles.semestreListItem}>Nenhuma disciplina cadastrada.</li>
          ) : (
            disciplinas.map((disciplina, index) => (
              <li
                key={index}
                className={styles.semestreListItem}
                onClick={() => handleNavigateToDisciplina(disciplina)}
              >
                {disciplina}
              </li>
            ))
          )}
        </ul>

        <button onClick={() => router.push("/curso")} className={`${styles.button} ${styles.backButton}`}>
          Voltar
        </button>
      </div>
    </div>
  );
}
