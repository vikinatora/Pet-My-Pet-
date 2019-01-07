const pet = (function () {
    //ADD AUTHORIZATION EVERYWHEREEEE
    const dashboard = function (ctx) {
        if (!userModel.isAuthorized()) {
            ctx.redirect('#/login');
        } else {
            let animalType = ctx.params.animalType;

            petModel.getPets(animalType).done(function (data) {
                let petArray = Array.from(data);
                let userId = storage.getData('userInfo').id;
                for (const pet of petArray) {
                    if (pet._acl.creator === userId) {
                        var index = petArray.indexOf(pet);
                        petArray.splice(index, 1);
                    }
                }
                ctx.pets = petArray;
                ctx.partial('views/pet/dashboard.hbs');
            });
        }

    };

    const addGet = function (ctx) {
        if (!userModel.isAuthorized()) {
            ctx.redirect('#/login');
        } else {
            ctx.partial('views/pet/add.hbs');
        }
    }
    const addPost = function (ctx) {
        petModel.addPet(ctx.params).done(function () {
            notification.info('Pet created');
            ctx.redirect('#/pet/dashboard/All');
        })
    }

    const editGet = function (ctx) {
        if (!userModel.isAuthorized()) {
            ctx.redirect('#/login');
        } else {
            let petId = ctx.params.id;
            petModel.getPet(petId).done(function (data) {
                if (data[0]._acl.creator !== storage.getData('userInfo').id) {
                    notification.error('You are not allowed to do that! :@');
                    ctx.redirect('#/pet/dashboard/All');
                } else {
                    ctx.pet = data[0];
                    ctx.partial('views/pet/edit.hbs');
                }
            })
        }
    }

    const editPost = function (ctx) {
        let petId = ctx.params.id;
        petModel.getPet(petId).done(function (oldData) {
            petModel.editPet(oldData, ctx.params).done(function () {
                notification.info('Updated successfully!');
                ctx.redirect('#/pet/dashboard/All');
            })
        });
    }

    const myPets = function (ctx) {
        petModel.getPets("Mine").done(function (data) {
            ctx.pets = data;
            ctx.partial('views/pet/myPets.hbs');
        });
    }

    const deletePetGet = function (ctx) {
        let petId = ctx.params.id;
        petModel.getPet(petId).done(function (data) {
            if (data[0]._acl.creator !== storage.getData('userInfo').id) {
                notification.error('You are not allowed to do that! :@');
                ctx.redirect('#/pet/dashboard/All');
            } else {
                ctx.pet = data[0];
                ctx.partial('views/pet/delete.hbs');
            }
        })
    }

    const deletePetPost = function (ctx) {
        let petId = ctx.params.id;
        petModel.deletePet(petId).done(function () {
            notification.info("Pet removed successfully.");
            ctx.redirect('#/pet/dashboard/All');
        })
    }

    const details = function (ctx) {
        let petId = ctx.params.id;
        petModel.getPet(petId).done(function (data) {
            ctx.pet = data[0];
            ctx.partial('views/pet/details.hbs');
        })
    }

    const pet = function (ctx) {
        let petId = ctx.params.id;
        petModel.getPet(petId).done(function (oldData) {
            if (oldData[0]._acl.creator === storage.getData('userInfo').id) {
                notification.error(`Cannot pet your own pets! :@`);
                ctx.redirect('#/pet/dashboard/All');
            } else {
                petModel.petPet(oldData).done(function () {
                    notification.info(`Successfully petted ${oldData[0].name}!`);
                    ctx.redirect('#/pet/dashboard/All');
                })
            }

        });
    }

    return {
        dashboard,
        addGet,
        addPost,
        myPets,
        editGet,
        editPost,
        deletePetGet,
        deletePetPost,
        details,
        pet
    }

}());