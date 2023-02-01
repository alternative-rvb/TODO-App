// Empêcher les injections de code ou de caractères spéciaux
export function sanitizeInput(input) {
    // Enlever les balises HTML
    input = input.replace(/<[^>]*>/g, "");
    // Enlever les caractères spéciaux dangereux
    input = input.replace(/[^a-zA-Z0-9 -]/g, "");
    // Enlever les espaces multiples
    input = input.replace(/\s\s+/g, " ");
    // Enlever les espaces en début et fin de chaîne
    input = input.trim();
    return input;
}
