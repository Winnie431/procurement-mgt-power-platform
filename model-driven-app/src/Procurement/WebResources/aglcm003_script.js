function onLoad(executionContext) {
  var formContext = executionContext.getFormContext();

  // Define FetchXML query to retrieve data from Dataverse table
  var fetchXml = 
    "<fetch>" +
      "<entity name='aglcm003_zulaa_entite'>" +
        "<attribute name='aglcm003_zulaa_entiteid' />" +
        "<attribute name='aglcm003_code' />" +
      "</entity>" +
    "</fetch>";

  // Retrieve data using FetchXML
  Xrm.WebApi.retrieveMultipleRecords("aglcm003_zulaa_entite", "?fetchXml=" + fetchXml)
    .then(function success(results) {
      // Process the retrieved data and set the lookup field value
      if (results.entities.length > 0) {
        var firstRecord = results.entities[0];
        var entityId = firstRecord.aglcm003_zulaa_entiteid; // Change field name as per your schema

        // Set the lookup field value with the retrieved entity ID
        formContext.getAttribute("Entité").setValue([{ id: entityId, entityType: "aglcm003_zulaa_entite" }]);
      }
    }, function error(err) {
      console.error(err); // Handle potential errors during data retrieval
    });
}
