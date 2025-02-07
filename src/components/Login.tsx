import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();

    // Simulate a fake API call
    const fakeLoginApi = async (username: string, password: string) => {
        return new Promise<{ token: string }>((resolve, reject) => {
            setTimeout(() => {
                if (username === "admin" && password === "password") {
                    resolve({ token: "fake-jwt-token" }); // Simulate a successful login
                } else {
                    reject(new Error("Invalid credentials")); // Simulate a failed login
                }
            }, 1000); // Simulate network delay
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fakeLoginApi(username, password); // Use the fake API
            const { token } = response;
            login(token); // Use the login function from AuthContext
        } catch {
            setError("Invalid credentials");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;