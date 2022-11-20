import api from "../services/api";
import { getItem } from "./storage";

export function getHeaders() {
    const token = getItem("token");
    const headers = { authorization: `Bearer ${token}` };
    return headers;
}

export async function postLogin(data) {
    const response = await api.post("/login", { ...data });
    return response;
}

export async function getGraphicsSum() {
    const response = await api.get("/grafico/soma", { headers: getHeaders() });
    return response;
}
export async function getGraphicsMonthlySum() {
    const response = await api.get("/grafico/soma/mensal", { headers: getHeaders() });
    return response;
}
export async function getCarsAll() {
    const response = await api.get("/carro", { headers: getHeaders() });
    return response;
}
export async function getSalesAll() {
    const response = await api.get("/venda", { headers: getHeaders() });
    return response;
}
export async function getSellersAll() {
    const response = await api.get("/vendedor", { headers: getHeaders() });
    return response;
}