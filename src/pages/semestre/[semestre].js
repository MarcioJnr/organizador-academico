import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/course.module.css"; // Ajuste o caminho do CSS se necessário

export default function SemestreDetalhes() {
  const router = useRouter();
  const { semestre } = router.query; // Obtém o semestre da URL
  const [itens, setItens] = useState([]);
  const [itemNome, setItemNome] = useState("");

  const handleAddItem = () => {
    if (itemNome.trim() !== "") {
      setItens((prev) => [...prev, itemNome]);
      setItemNome("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{semestre || "Carregando..."}</h1>

        <div className={styles.form}>
          <input
            type="text"
            value={itemNome}
            onChange={(e) => setItemNome(e.target.value)}
            placeholder="Nome do item"
            className={styles.input}
          />
          <button onClick={handleAddItem} className={`${styles.button} ${styles.addButton}`}>
            Adicionar Item
          </button>
        </div>

        <h2 className={styles.subTitle}>Itens cadastrados:</h2>
        <ul>
          {itens.length === 0 ? (
            <li className={styles.semestreListItem}>Nenhum item cadastrado.</li>
          ) : (
            itens.map((item, index) => (
              <li key={index} className={styles.semestreListItem}>
                {item}
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
