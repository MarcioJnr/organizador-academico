import { useRouter } from "next/router";
import styles from "../styles/dashboard.module.css"; // Importa o CSS

export default function Dashboard() {
    const router = useRouter();

    const handleNavigateToCourse = async () => {
        try {
            const response = await fetch("http://localhost:3000/cursos", {
                method: "GET",
                headers: {
                    Authorization: localStorage.token,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erro ao acessar cursos");
            }

            localStorage.setItem("idCurso", data[0].id);
            localStorage.setItem("nomeCurso", data[0].nome);
            router.push("/curso");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.dashboardCard}>
                <h1 className={styles.dashboardTitle}>Bem-vindo!</h1>

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
                        className={`${styles.button} ${styles.logoutButton}`}
                    >
                        Sair
                    </button>
                </div>
            </div>
        </div>
    );
}
