window.onload = function () {
    console.log("DOM ready!");

    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();

        // Récupérer les valeurs des champs du formulaire
        const lastName = document.querySelector("#lastName").value;
        const firstName = document.querySelector("#firstName").value;
        const email = document.querySelector("#email").value;
        const birthday = document.querySelector("#birthday").value;
        const address = document.querySelector("#address").value;

        // Valider les champs du formulaire
        if (!validateText(lastName) || !validateText(firstName) || !validateText(address)) {
            alert("Les champs texte doivent avoir au moins 5 caractères.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Veuillez saisir une adresse email valide.");
            return;
        }

        if (!validateBirthday(birthday)) {
            alert("La date de naissance ne peut pas être dans le futur.");
            return;
        }

        // Afficher la modal avec les informations personnalisées
        showSuccessModal(firstName, birthday, address);
    });

    function validateText(text) {
        return text.length >= 5;
    }

    function validateEmail(email) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validateBirthday(birthday) {
        const birthdayDate = new Date(birthday);
        const nowTimestamp = Date.now();
        return birthdayDate.getTime() <= nowTimestamp;
    }

    function showSuccessModal(firstName, birthday, address) {
        var myModal = new bootstrap.Modal(document.getElementById("myModal"));

        // Mise à jour du titre de la modal
        document.querySelector(".modal-title").textContent = `Bienvenue ${firstName}`;

        // Mise à jour du corps de la modal
        document.querySelector(".modal-body").innerHTML = `
            <p>Vous êtes né(e) le ${new Date(birthday).toLocaleDateString()} et vous habitez :</p>
            <p>${address}</p>
            <a href="http://maps.google.com/maps?q=${encodeURIComponent(address)}" target="_blank">
                <img src="https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(address)}&zoom=14&size=400x300&scale=2&markers=${encodeURIComponent(address)}&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg" alt="Google Maps" />
            </a>
        `;

        // Afficher la modal
        myModal.show();
    }
};
