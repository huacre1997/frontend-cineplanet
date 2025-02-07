import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProtectedPage: React.FC = () => {
    const { logout, token } = useAuth();
    const [userData, setUserData] = useState<string | null>(null);

    const fetchUserData = async () => {
        return new Promise<string>((resolve) => {
            setTimeout(() => {
                resolve("User data for admin");
            }, 1000);
        });
    };

    useEffect(() => {
        if (token) {
            fetchUserData().then((data) => setUserData(data));
        }
    }, [token]);

    return (
        <div>
            <h2>Protected Page</h2>
            <p>You are authenticated!</p>
            {userData && <p>{userData}</p>}
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default ProtectedPage;