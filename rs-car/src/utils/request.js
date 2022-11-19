import api from "../services/api";

export async function postLogin(data) {
    const response = await api.post("/login", { ...data });
    return response;
}