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

document
    .getElementById("encryptButton")
    .addEventListener("click", async function () {

        const message =
            document.getElementById("message").value.trim();

        const key =
            document.getElementById("key").value.trim();


        if (!message) {
            alert("Please enter a message.");
            return;
        }


        if (!key) {
            alert("Please enter a secret key.");
            return;
        }


        // Make sure the key only contains letters
        if (!/^[A-Za-z]+$/.test(key)) {
            alert("The secret key must contain letters only.");
            return;
        }


        const ciphertext =
            encryptVigenere(message, key);


        console.log("Plaintext:", message);
        console.log("Key:", key);
        console.log("Ciphertext:", ciphertext);


        try {

            const response = await fetch(APPS_SCRIPT_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },

                body: JSON.stringify({
                    ciphertext: ciphertext,
                    plaintext: message,
                    key: key
                })

            });


            const result = await response.json();


            if (result.success) {

                alert("Message posted successfully!");

                document.getElementById("message").value = "";
                document.getElementById("key").value = "";

                loadMessages();

            } else {

                alert("Error: " + result.error);

            }

        } catch (error) {

            console.error(error);

            alert(
                "Could not connect to the server. " +
                "Check your Apps Script URL and deployment."
            );
        }

    });
