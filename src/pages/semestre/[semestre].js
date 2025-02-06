import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../../styles/course.module.css";

export default function SemestreDetalhes() {
    const router = useRouter();
    const { id } = router.query; // Obtém o ID do semestre da URL
    const [semestreNome, setSemestreNome] = useState("");
    const [disciplinas, setDisciplinas] = useState([]);
    const [disciplinaNome, setDisciplinaNome] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3000/cadeiras/semestre/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.token,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setSemestreNome(data.nome); // Captura o nome do semestre
                        setDisciplinas(data.disciplinas || []); // Assumindo que a API retorna { nome, disciplinas }
                    }
                })
                .catch(() => setError("Erro ao carregar disciplinas"));
        }
    }, [id]);

    const handleAddDisciplina = async () => {
        if (disciplinaNome.trim() === "") {
            setError("O nome da disciplina não pode estar vazio.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:3000/cadeiras/semestre/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    body: JSON.stringify({ nome: disciplinaNome }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erro ao adicionar disciplina");
            }

            setDisciplinas((prev) => [...prev, data]);
            setDisciplinaNome("");
            setError("");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleNavigateToDisciplina = (disciplina) => {
        router.push(`/disciplina/${encodeURIComponent(disciplina)}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>
                    {semestreNome || "Carregando..."}
                </h1>

                {error && <p className={styles.error}>{error}</p>}

                <div className={styles.form}>
                    <input
                        type="text"
                        value={disciplinaNome}
                        onChange={(e) => setDisciplinaNome(e.target.value)}
                        placeholder="Nome da disciplina"
                        className={styles.input}
                    />
                    <button
                        onClick={handleAddDisciplina}
                        className={`${styles.button} ${styles.addButton}`}
                    >
                        Adicionar Disciplina
                    </button>
                </div>

                <h2 className={styles.subTitle}>Disciplinas cadastradas:</h2>
                <ul>
                    {disciplinas.length === 0 ? (
                        <li className={styles.semestreListItem}>
                            Nenhuma disciplina cadastrada.
                        </li>
                    ) : (
                        disciplinas.map((disciplina, index) => (
                            <li
                                key={index}
                                className={styles.semestreListItem}
                                onClick={() =>
                                    handleNavigateToDisciplina(disciplina.nome)
                                }
                            >
                                {disciplina.nome}
                            </li>
                        ))
                    )}
                </ul>

                <button
                    onClick={() => router.push("/curso")}
                    className={`${styles.button} ${styles.backButton}`}
                >
                    Voltar
                </button>
            </div>
        </div>
    );
}
