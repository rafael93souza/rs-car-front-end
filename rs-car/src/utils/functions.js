export function validateEmail(email) {
    if (!email) {
        return { status: false, message: "O campo email é Obrigatório" };
    }
    const validEmail = email.trim().split(" ");

    if (validEmail.length > 1) {
        return { status: false, message: "O email deve ser um email válido" };
    }
    const verifyAtSign = email.indexOf("@");
    const verifyPonit = email.indexOf(".", verifyAtSign + 2);

    if (verifyAtSign === -1) {
        return { status: false, message: "O email deve ser um email válido" };
    }
    if (verifyPonit === -1) {
        return { status: false, message: "O email deve ser um email válido" };
    }
    return { status: true, email };
}

export function maskValues(value) {
    let valueTreat = `R$${(value / 100).toFixed(2).replace(".", ",")}`;
    valueTreat = valueTreat.replace(/(?=(\d{3})+(\D))\B/g, ".");
    return valueTreat;
}

export function formatDateLong(date) {
    const formatterDate = Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        day: "2-digit",
        month: "2-digit",
    });
    return formatterDate.format(new Date(date));
}
