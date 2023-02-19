/**
 * ANCHOR SANITIZE INPUT
 * Empêcher les injections de code ou de caractères spéciaux
 * @param {string} input
 * @returns {string}
 */

function sanitizeInput(input) {
    // Enlever les balises HTML
    input = input.replace(/<[^>]*>/g, "");
    // Enlever les caractères spéciaux dangereux
    // input = input.replace(/[^a-zA-Z0-9 -#]/g, "");
    // Enlever les espaces multiples
    input = input.replace(/\s\s+/g, " ");
    // Enlever les espaces en début et fin de chaîne
    input = input.trim();
    return input;
}

// ANCHOR NO REFRESH
function noRefresh(e) {
    e.preventDefault();
    e.stopPropagation();
}

// ANCHOR FIND INDEX OF ELEMENT
function findIndexOfElmt(currentElmt, data) {
    return data.findIndex((item) => item.id == currentElmt);
}

// Exporter toutes les fonctions
export {sanitizeInput, noRefresh, findIndexOfElmt};
