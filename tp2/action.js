window.onload = () => {
    // Récupérer la chaîne de requête des données envoyées par le formulaire
    const paramsString = document.location.search; 
    const searchParams = new URLSearchParams(paramsString); // Créer une instance de URLSearchParams
  
    // Itérer sur les paramètres de recherche
    for (const param of searchParams) {
      // Afficher les paramètres dans la console pour débogage
      console.log(param);
  
      const elementId = param[0]; // Le nom du paramètre (identifiant du champ de saisie)
      const elementValue = param[1]; // La valeur du paramètre
      const element = document.getElementById(elementId); // Rechercher l'élément par son identifiant
  
      // Mettre à jour le contenu de l'élément si trouvé
      if (element !== null) {
        element.textContent = elementValue; // Mettre à jour le texte de l'élément
      }
  
      // Spécificités pour le champ adresse
      if (elementId === "address") {
        // Créer un lien vers Google Maps
        const addressValue = elementValue;
        element.href = `https://www.google.com/maps/search/?api=1&query=${addressValue}`; // URL Google Maps
        element.textContent = addressValue; // Afficher l'adresse dans le lien
      } 
      // Spécificités pour le champ email
      else if (elementId === "email") {
        // Créer un lien mailto
        const emailValue = elementValue;
        element.href = `mailto:${emailValue}?subject=Hello!&body=What's up?`; // Lien mailto
        element.textContent = emailValue; // Afficher l'email dans le lien
      }
    }
  };
  