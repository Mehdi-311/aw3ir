// store.js
var contactStore = (function () {
    // Récupérer la liste des contacts stockés dans localStorage
    let contactListString = localStorage.getItem("contactList");
    var contactList = contactListString ? JSON.parse(contactListString) : [];
  
    return {
      // Ajouter un contact à la liste
      add: function (_name, _firstname, _date, _address, _mail) {
        var contact = {
          name: _name,
          firstname: _firstname,
          date: _date,
          address: _address,
          mail: _mail,
        };
        // Ajouter le contact à la liste
        contactList.push(contact);
  
        // Enregistrer la liste mise à jour dans localStorage
        localStorage.setItem("contactList", JSON.stringify(contactList));
  
        return contactList;
      },
  
      // Réinitialiser la liste des contacts
      reset: function () {
        localStorage.removeItem("contactList");
        contactList = [];
        return contactList;
      },
  
      // Récupérer la liste des contacts
      getList: function () {
        return contactList;
      },
    };
})();
