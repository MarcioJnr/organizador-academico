import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebaseConfig"; // Certifique-se de que está importando corretamente o auth
import styles from "../styles/course.module.css"; // Importa o arquivo CSS

export default function Curso() {
  const [semestres, setSemestres] = useState([]);
  const [semestreNome, setSemestreNome] = useState("");
  const [itemNome, setItemNome] = useState("");
  const [selectedSemestre, setSelectedSemestre] = useState(null);
  const [showItems, setShowItems] = useState(null); // Estado para controlar quais semestres mostrar itens
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login"); // Se não estiver logado, redireciona para o login
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Função para adicionar semestre
  const handleAddSemestre = () => {
    if (semestreNome.trim() !== "") {
      setSemestres((prevSemestres) => [
        ...prevSemestres,
        { nome: semestreNome, itens: [] },
      ]);
      setSemestreNome(""); // Limpa o campo de entrada
    }
  };

  // Função para adicionar item dentro de um semestre
  const handleAddItem = (event) => {
    event.stopPropagation(); // 🔥 Impede que o clique afete o li
  
    if (itemNome.trim() !== "" && selectedSemestre !== null) {
      setSemestres((prevSemestres) =>
        prevSemestres.map((semestre, index) =>
          index === selectedSemestre
            ? { ...semestre, itens: [...semestre.itens, itemNome] }
            : semestre
        )
      );
  
      setItemNome(""); // Limpa o campo de entrada
    }
  };
  

  // Função de logout
  const handleLogout = () => {
    auth.signOut();
    router.push("/login");
  };

  // Função para alternar a visibilidade dos itens de um semestre
  const toggleItemsVisibility = (index) => {
    if (showItems === index) {
      setShowItems(null);
      setSelectedSemestre(null); // Fechar e limpar o semestre selecionado
    } else {
      setShowItems(index);
      setSelectedSemestre(index); // Definir o semestre selecionado
    }
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Cadastro de Semestres</h1>

        {/* Formulário de cadastro de semestre */}
        <div className={styles.form}>
          <input
            type="text"
            value={semestreNome}
            onChange={(e) => setSemestreNome(e.target.value)}
            placeholder="Nome do semestre"
            className={styles.input}
          />
          <button
            onClick={handleAddSemestre}
            className={`${styles.button} ${styles.addButton}`}
          >
            Adicionar Semestre
          </button>
        </div>

        {/* Lista de semestres cadastrados */}
        <div className={styles.semestreList}>
          <h2 className={styles.subTitle}>Semestres Cadastrados:</h2>
          <ul>
            {semestres.length === 0 ? (
              <li className={styles.semestreListItem}>Não há semestres cadastrados.</li>
            ) : (
              semestres.map((semestre, index) => (
                <li
                  key={index}
                  className={`${styles.semestreListItem} ${showItems === index ? styles.selectedSemestre : ""}`}
                  onClick={() => toggleItemsVisibility(index)} // Alterna a visibilidade ao clicar
                >
                  {semestre.nome}

                  {/* Se o semestre estiver selecionado, exibe os itens */}
                  {showItems === index && (
                    <div className={styles.itemsContainer}>
                      <h3 className={styles.itemsTitle}>Itens Cadastrados:</h3>
                      <ul>
                        {semestre.itens.length === 0 ? (
                          <li className={styles.noItems}>Nenhum item cadastrado.</li>
                        ) : (
                          semestre.itens.map((item, i) => (
                            <li key={i} className={styles.item}>{item}</li>
                          ))
                        )}
                      </ul>

                      {/* Formulário para adicionar item dentro do semestre */}
                      <div className={styles.form}>
                        <input
                          type="text"
                          value={itemNome}
                          onChange={(e) => setItemNome(e.target.value)}
                          placeholder="Nome do item"
                          className={styles.input}
                          onClick={(event) => event.stopPropagation()}
                        />
                        <button
                          onClick={(event) => handleAddItem(event)}
                          className={`${styles.button} ${styles.addButton}`}
                        >
                          Adicionar Item
                        </button>
                      </div>
                    </div>
                  )}
                </li>
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
