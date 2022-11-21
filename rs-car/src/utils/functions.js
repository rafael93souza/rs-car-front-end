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

export function validateCPF(cpf) {
    if (!cpf) {
        return { status: false, message: "O campo CPF é Obrigatório" };
    }
    const cpfSplit = cpf.split("");
    const validecpf = cpfSplit.filter((item) => {
        return item !== "." && item !== "-";
    });
    if (validecpf.length !== 11) {
        return { status: false, message: "O CPF deve ser válido" };
    }
    cpf = validecpf.reduce((acum, value) => acum + value);

    return { status: true, cpf };
}

export function validateValue(value) {
    if (!value.trim()) {
        return { status: false, message: "Preencha o campo do valor" };
    }
    const valueConvert = convertValuesIntoCents(value);
    if (!valueConvert) {
        return { status: false, message: "O campo valor deve ser preenchido" };
    }
    return { status: true, valueConvert };
}

export function validateDate(date) {
    if (!date.trim()) {
        return { status: false, message: "Informe uma data" };
    }
    if (date.length < 10) {
        return { status: false, message: "Informe uma data no formato válido" };
    }
    const dateFormat = date.split("/").reverse().join("-") + "T20:00:00.000Z";

    if (!checkDate(new Date(dateFormat))) {
        return { status: false, message: "Informe uma data válida" };
    }
    return { status: true, dateFormat };
}

function checkDate(date) {
    return date instanceof Date && !isNaN(date);
}

export function maskValues(value) {
    let valueTreat = `R$${(value / 100).toFixed(2).replace(".", ",")}`;
    valueTreat = valueTreat.replace(/(?=(\d{3})+(\D))\B/g, ".");
    return valueTreat;
}

export function maskYear(e) {
    let value = e.target.value;
    e.target.maxLength = 4;
    value = value.replace(/\D/g, "");
    e.target.value = value
    return e.target.value;
}
export function maskBoard(e) {
    let value = e.target.value;
    e.target.maxLength = 8;
    value = value.replace(/[^a-z0-9]/gi, '');
    value = value.replace(/^(\w{3})(\w)/g, "$1-$2");
    e.target.value = value
    return e.target.value.toUpperCase();
}


export function formatDateLong(date) {
    const formatterDate = Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        day: "2-digit",
        month: "2-digit",
    });
    return formatterDate.format(new Date(date));
}

export function maskCPF(cpf) {
    let value = cpf;
    value = value.replace(/\D/g, "");
    if (value.length < 5) {
        value = value.replace(/^(\d{3})(\d)/, "$1.$2");
    } else if (value.length < 7) {
        value = value.replace(/^(\d{3})(\d)/, "$1.$2");
    } else if (value.length < 10) {
        value = value.replace(/^(\d{3})(\d{3})(\d)/, "$1.$2.$3");
    } else {
        value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d)/, "$1.$2.$3-$4");
    }
    return value;
}

export function treatValuesInputStrings(e) {
    const caracter = ["!", "@", "#", "$", "%", "¨", "&", "*", "(", ")", "-", "_", "=", "+", ".", ",", ":", "<", ">", "|", "?", "{", "}", "[", "]", "/", "  ", "ª", "º", "°", '"', "'",];
    let value = e;
    let isSpecialCaracter = false;
    for (let item of caracter) {
        if (value.includes(item)) {
            isSpecialCaracter = true;
            break;
        }
    }
    value = value.replace(/\d/g, "");
    isSpecialCaracter ? (value = value.slice(0, value.length - 1)) : "";
    e = value;
    return e;
}

export function treatDateInput(e) {
    let value = e.target.value;
    e.target.maxLength = 10;
    if (e.target.value.length < 6) {
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d)/, "$1/$2");
    } else {
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d{2})(\d)/, "$1/$2/$3");
    }
    e.target.value = value;

    return e.target.value;
}

export function treatValuesInput(e) {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    value = "R$ " + value;
    e.target.value = value;

    return e.target.value;
}

export function convertValuesIntoCents(value) {
    const valueTreat = value.split("");

    let valueNumber = valueTreat.filter((value) => {
        if (Number(value) || value === "0" || value === ",") return value;
    });
    if (!valueNumber.length) return false;

    let valueCents = valueNumber.reduce((acum, value) => acum + value);
    valueCents = valueCents.replace(",", ".");
    valueCents = Number(valueCents * 100);
    return valueCents;
}


export function editDataArray(array, id, data) {
    let localArray = [...array];
    let localArrayFind = localArray.findIndex((element) => {
        return element.id === id
    });
    localArray.splice(localArrayFind, 1, data);
    return localArray;
}

export function removeDataArray(array, id) {
    let localArray = [...array];
    let localArrayFind = localArray.findIndex((element) => {
        return element.id === id
    });
    localArray.splice(localArrayFind, 1);
    return localArray;
}