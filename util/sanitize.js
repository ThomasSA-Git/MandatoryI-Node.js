export function sanitizedInput(userInput){
    return userInput.replace(/[^a-zA-Z0-9\s]/g, '');
};