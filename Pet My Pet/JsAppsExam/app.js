const app = Sammy('#site-content', function(){
    this.use('Handlebars', 'hbs');
    this.before({except: {}}, function() {
        user.initializeLogin();
    });

    this.get('#/', home.index);
    this.get('#/login', user.getLogin);
    this.post('#/login', user.postLogin);
    this.get('#/logout', user.logout);
    this.get('#/register', user.getRegister);
    this.post('#/register', user.postRegister);
    this.get('#/pet/dashboard/:animalType',pet.dashboard);
    this.get('#/pet/add',pet.addGet);
    this.post('#/pet/add',pet.addPost);
    this.get('#/pet/myPets',pet.myPets);
    this.get('#/pet/edit/:id',pet.editGet);
    this.put('#/pet/edit/:id',pet.editPost);
    this.get('#/pet/delete/:id',pet.deletePetGet);
    this.post('#/pet/delete/:id',pet.deletePetPost);
    this.get('#/pet/details/:id',pet.details);
    this.get('#/pet/pet/:id',pet.pet);



});

$(function(){
    app.run('#/');
});