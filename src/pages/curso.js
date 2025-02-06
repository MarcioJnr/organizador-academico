import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/course.module.css";

export default function Curso() {
    const [cursos, setCursos] = useState([]);
    const [semestres, setSemestres] = useState([]);
    const [semestreNome, setSemestreNome] = useState("");
    const [semestreCodigo, setSemestreCodigo] = useState("");
    const [selectedCurso, setSelectedCurso] = useState(null);
    const [error, setError] = useState("");
    const router = useRouter();

    // Carregar cursos do localStorage ao montar a página
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedCursos = JSON.parse(
                localStorage.getItem("cursos") || "[]"
            );
            setCursos(storedCursos);
        }
    }, []);

    // Carregar semestres automaticamente quando um curso for selecionado
    useEffect(() => {
        if (selectedCurso) {
            fetch(`http://localhost:3000/semestres/curso/${selectedCurso.id}`, {
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
                        setSemestres(data);
                    }
                })
                .catch(() => setError("Erro ao carregar semestres"));
        }
    }, [selectedCurso]); // Atualiza os semestres sempre que o curso for alterado

    const handleAddSemestre = async () => {
        if (!selectedCurso) {
            setError("Selecione um curso antes de adicionar um semestre.");
            return;
        }

        if (semestreNome.trim() === "" || semestreCodigo.trim() === "") {
            setError("Preencha todos os campos.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:3000/semestres/curso/${selectedCurso.id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.token,
                    },
                    body: JSON.stringify({
                        nome: semestreNome,
                        ano: "2025",
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erro ao adicionar semestre");
            }

            setSemestres((prev) => [...prev, data]);
            setSemestreNome("");
            setSemestreCodigo("");
            setError("");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleNavigateToSemestre = (id) => {
        router.push(`/semestre/${id}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Cadastro de Semestres</h1>

                <div className={styles.form}>
                    <label>Selecione um curso:</label>
                    <select
                        value={selectedCurso?.id || ""}
                        onChange={(e) =>
                            setSelectedCurso(
                                cursos.find(
                                    (curso) => curso.id == e.target.value
                                )
                            )
                        }
                        className={styles.input}
                    >
                        <option value="">-- Selecione um curso --</option>
                        {cursos.map((curso) => (
                            <option key={curso.id} value={curso.id}>
                                {curso.nome}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        value={semestreNome}
                        onChange={(e) => setSemestreNome(e.target.value)}
                        placeholder="Nome do semestre"
                        className={styles.input}
                    />
                    <input
                        type="text"
                        value={semestreCodigo}
                        onChange={(e) => setSemestreCodigo(e.target.value)}
                        placeholder="Código do semestre"
                        className={styles.input}
                    />
                    <button
                        onClick={handleAddSemestre}
                        className={`${styles.button} ${styles.addButton}`}
                    >
                        Adicionar Semestre
                    </button>
                    {error && <p className={styles.error}>{error}</p>}
                </div>

                {/* Lista de Semestres */}
                <div className={styles.semestreList}>
                    <h2 className={styles.subTitle}>Semestres Cadastrados:</h2>
                    <ul>
                        {semestres.length === 0 ? (
                            <li className={styles.semestreListItem}>
                                Não há semestres cadastrados.
                            </li>
                        ) : (
                            semestres.map((semestre) => (
                                <li
                                    key={semestre.id}
                                    className={styles.semestreListItem}
                                    onClick={() =>
                                        handleNavigateToSemestre(semestre.id)
                                    }
                                >
                                    {semestre.nome} - {semestre.codigo} (ID:{" "}
                                    {semestre.id})
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                <button className={`${styles.button} ${styles.logoutButton}`}>
                    Sair
                </button>
            </div>
        </div>
    );
}
