const petModel = (function(){
    var petUrl = `appdata/${storage.appKey}/pets`;

    const getPets = function(animalType) {
        if(animalType === "All"){
            var url = `${petUrl}?query={}&sort={"likes": -1}`;
        } else if(animalType === "Mine") {
            let userId = storage.getData('userInfo').id;
            var url = `${petUrl}?query={"_acl.creator":"${userId}"}`
        } else {
            var url = `${petUrl}?query={"category":"${animalType}"}&sort={"likes": -1}`;
        }

        return requester.get(url);
    }

    const getPet = function(petId) {
        var url = `${petUrl}?query={"_id":"${petId}"}`;
        return requester.get(url);
    }

    const editPet = function(oldData,formParams) {
        oldData[0].description = formParams.description;
        var url = `${petUrl}/${oldData[0]._id}`;

        return requester.put(url,oldData[0]);
    }

    const addPet = function(data){
        data.likes = "0";
        return requester.post(petUrl,data);
    }

    const deletePet = function(id) {
        let url = `${petUrl}/${id}`;
        return requester.del(url);
    }

    const petPet = function(animalData) {
        //Abort if you try to pet your own pet ;O
        let animal = animalData[0];
        animal.likes = ((+animal.likes)+1).toString();
        var url = `${petUrl}/${animal._id}`;

        return requester.put(url,animal);
    }

    return {
        getPets,
        addPet,
        getPet,
        editPet,
        deletePet,
        petPet
    }
}())