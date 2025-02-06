import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/login.module.css"; // Usando o mesmo estilo

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            setError("Preencha todos os campos!");
            return;
        }

        if (password !== confirmPassword) {
            setError("As senhas não coincidem!");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                "http://localhost:3000/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nome: name,
                        email: email,
                        senha: password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erro ao cadastrar");
            }

            router.push("/login");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Cadastro</h1>
                <p className={styles.subtitle}>Crie uma nova conta</p>

                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                />

                <input
                    type="password"
                    placeholder="Confirmar Senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={styles.input}
                />

                {error && <p className={styles.error}>{error}</p>}

                <button
                    onClick={handleRegister}
                    className={styles.button}
                    disabled={loading}
                >
                    {loading ? "Cadastrando..." : "Cadastrar"}
                </button>

                <div className={styles.registerLink}>
                    <p>Já tem uma conta?</p>
                    <button
                        onClick={() => router.push("/login")}
                        className={styles.linkButton}
                    >
                        Faça Login
                    </button>
                </div>
            </div>
        </div>
    );
}
