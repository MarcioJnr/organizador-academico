import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebaseConfig";
import styles from "../styles/course.module.css";

export default function Curso() {
  const [semestres, setSemestres] = useState([]);
  const [semestreNome, setSemestreNome] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleAddSemestre = () => {
    if (semestreNome.trim() !== "") {
      setSemestres((prev) => [...prev, { nome: semestreNome }]);
      setSemestreNome("");
    }
  };

  const handleNavigateToSemestre = (nome) => {
    router.push(`/semestre/${encodeURIComponent(nome)}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Cadastro de Semestres</h1>

        <div className={styles.form}>
          <input
            type="text"
            value={semestreNome}
            onChange={(e) => setSemestreNome(e.target.value)}
            placeholder="Nome do semestre"
            className={styles.input}
          />
          <button onClick={handleAddSemestre} className={`${styles.button} ${styles.addButton}`}>
            Adicionar Semestre
          </button>
        </div>

        <div className={styles.semestreList}>
          <h2 className={styles.subTitle}>Semestres Cadastrados:</h2>
          <ul>
            {semestres.length === 0 ? (
              <li className={styles.semestreListItem}>Não há semestres cadastrados.</li>
            ) : (
              semestres.map((semestre, index) => (
                <li
                  key={index}
                  className={styles.semestreListItem}
                  onClick={() => handleNavigateToSemestre(semestre.nome)}
                >
                  {semestre.nome}
                </li>
              ))
            )}
          </ul>
        </div>

        <button onClick={() => auth.signOut()} className={`${styles.button} ${styles.logoutButton}`}>
          Sair
        </button>
      </div>
    </div>
  );
}
