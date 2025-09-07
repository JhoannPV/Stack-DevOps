// Helper to join error fragments in a natural language list
export const buildErrorMessage = (...parts: string[]): string => {
    const tokens = parts.filter(p => !!p);
    if (tokens.length === 0) return '';
    if (tokens.length === 1) return tokens[0];
    if (tokens.length === 2) return tokens.join(' and ');
    return `${tokens.slice(0, -1).join(', ')} and ${tokens[tokens.length - 1]}`;
};