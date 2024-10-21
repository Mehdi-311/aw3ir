window.onload = function () {
    console.log("DOM ready!");

    // Ajouter un écouteur pour le bouton de géolocalisation
    const btnGps = document.getElementById("btnGps");
    if (btnGps) {
        btnGps.addEventListener("click", function () {
            getLocation();  // Appel de la fonction getLocation définie dans gps.js
        });
    } else {
        console.error("Le bouton de géolocalisation (btnGps) est introuvable.");
    }

    // Validation du formulaire et ajout à la liste des contacts
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

        // Ajouter le contact à la liste des contacts stockée dans localStorage
        contactStore.add(lastName, firstName, birthday, address, email);

        // Afficher la liste mise à jour
        displayContactList();

        // Afficher un message de succès
        const successMessage = document.getElementById("successMessage");
        successMessage.style.display = "block";
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 3000); // Le message disparaît après 3 secondes

        // Afficher la modal avec les informations personnalisées
        showSuccessModal(firstName, birthday, address);
    });

    // Ajouter un écouteur pour le bouton de réinitialisation du formulaire
    const resetButton = document.getElementById("resetButton");
    if (resetButton) {
        resetButton.addEventListener("click", function () {
            resetForm();
        });
    }

    // Ajouter un écouteur pour le bouton de réinitialisation du tableau des contacts
    const resetContactTableButton = document.getElementById("resetContactTableButton");
    if (resetContactTableButton) {
        resetContactTableButton.addEventListener("click", function () {
            resetContactList();
        });
    }

    // Fonction pour réinitialiser le formulaire
    function resetForm() {
        // Réinitialiser les champs du formulaire
        document.getElementById("myForm").reset();

        // Réinitialiser le compteur de caractères et le masquer
        const charCountElements = document.querySelectorAll(".char-count");
        charCountElements.forEach(function (span) {
            span.textContent = "0 car.";
            span.classList.add("d-none");
        });
    }

    // Fonction pour réinitialiser la liste des contacts
    function resetContactList() {
        // Réinitialiser la liste des contacts dans le localStorage
        contactStore.reset();

        // Réinitialiser l'affichage du tableau
        displayContactList();
    }

    // Appeler displayContactList() pour afficher les contacts au chargement de la page
    displayContactList();

    // Fonctions de validation
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

    // Fonction pour afficher la liste des contacts dans un tableau HTML
    function displayContactList() {
        const contactListString = localStorage.getItem('contactList');
        const contactList = contactListString ? JSON.parse(contactListString) : [];

        const tbody = document.querySelector("#contactTable tbody");
        tbody.innerHTML = ""; // Vider le tableau pour éviter les doublons

        for (const contact of contactList) {
            tbody.innerHTML += `
                <tr>
                    <td>${contact.name}</td>
                    <td>${contact.firstname}</td>
                    <td>${contact.date}</td>
                    <td>${contact.address}</td>
                    <td>${contact.mail}</td>
                </tr>`;
        }

        // Mise à jour du compteur de contacts
        document.getElementById("contactCount").textContent = `(${contactList.length})`;
    }
};
