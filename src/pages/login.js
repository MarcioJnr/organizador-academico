import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/login.module.css"; // Usando o mesmo estilo

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Função de login (mesma lógica que você já tinha)
    const handleLogin = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, senha: password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erro ao fazer login");
            }

            // Armazenar o token e redirecionar para o dashboard
            localStorage.setItem("token", data.token);
            router.push("/dashboard");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Bem-vindo!</h1>
                <p className={styles.subtitle}>
                    Acesse sua conta para continuar
                </p>

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

                {error && <p className={styles.error}>{error}</p>}

                <button
                    onClick={handleLogin}
                    className={styles.button}
                    disabled={loading}
                >
                    {loading ? "Entrando..." : "Entrar"}
                </button>

                {/* Link para a tela de Cadastro */}
                <div className={styles.registerLink}>
                    <p>Não tem uma conta?</p>
                    <button
                        onClick={() => router.push("/register")}
                        className={styles.linkButton}
                    >
                        Cadastre-se
                    </button>
                </div>
            </div>
        </div>
    );
}
