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
export async function getFindCar(id) {
    const response = await api.get(`/carro/${id}`, { headers: getHeaders() });
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
export async function postSeller(data) {
    const response = await api.post("/vendedor", { ...data }, { headers: getHeaders() });
    return response;
}
export async function putSeller(id, data) {
    const response = await api.put(`/vendedor/${id}`, { ...data }, { headers: getHeaders() });
    return response;
}
export async function postSale(data) {
    const response = await api.post("/venda", { ...data }, { headers: getHeaders() });
    return response;
}
export async function putSale(id, data) {
    const response = await api.put(`/venda/${id}`, { ...data }, { headers: getHeaders() });
    return response;
}