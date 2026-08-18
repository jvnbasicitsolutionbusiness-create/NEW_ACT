const APPS_SCRIPT_URL =
    "PASTE-YOUR-APPS-SCRIPT-URL-HERE";


/* ================================
   VIGENERE ENCRYPTION
================================ */

function encryptVigenere(message, key) {

    let result = "";
    let keyIndex = 0;

    key = key.toUpperCase();

    for (let i = 0; i < message.length; i++) {

        const char = message[i];

        // Only encrypt letters
        if (/[A-Za-z]/.test(char)) {

            const messageCode =
                char.toUpperCase().charCodeAt(0) - 65;

            const keyCode =
                key[keyIndex % key.length].charCodeAt(0) - 65;

            const encryptedCode =
                (messageCode + keyCode) % 26;

            const encryptedChar =
                String.fromCharCode(encryptedCode + 65);

            result += encryptedChar;

            keyIndex++;

        } else {

            // Keep spaces, numbers, punctuation
            result += char;
        }
    }

    return result;
}


/* ================================
   VIGENERE DECRYPTION
================================ */

function decryptVigenere(ciphertext, key) {

    let result = "";
    let keyIndex = 0;

    key = key.toUpperCase();

    for (let i = 0; i < ciphertext.length; i++) {

        const char = ciphertext[i];

        if (/[A-Za-z]/.test(char)) {

            const cipherCode =
                char.toUpperCase().charCodeAt(0) - 65;

            const keyCode =
                key[keyIndex % key.length].charCodeAt(0) - 65;

            const decryptedCode =
                (cipherCode - keyCode + 26) % 26;

            const decryptedChar =
                String.fromCharCode(decryptedCode + 65);

            result += decryptedChar;

            keyIndex++;

        } else {

            result += char;
        }
    }

    return result;
}
