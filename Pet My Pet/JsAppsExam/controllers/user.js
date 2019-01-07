const user = (function(){
    const getLogin = function(ctx){
        ctx.partial('views/user/login.hbs');
    };

    const postLogin = function(ctx){
        var username = ctx.params.username;
        var password = ctx.params.password;
        
        userModel.login(username, password).done(function(data){
            storage.saveUser(data);
            notification.info('Login successful.');
            ctx.redirect('#/pet/dashboard/All');
        }).fail(function(data) {
            notification.error('Invalid login credentials');
        });
    };

    const logout = function(ctx){
        userModel.logout().done(function(){
            storage.deleteUser();
            notification.info('Logout successful.');
            ctx.redirect('#/');
        }).fail(function(data) {
            notification.error('Something went wrong. Try again.');
        });;
    }

    const getRegister = function(ctx) {
        ctx.partial('views/user/register.hbs');
    };

    const postRegister = function(ctx) {
        userModel.register(ctx.params).done(function(data){
            storage.saveUser(data);
            notification.info('User registration successful.');
            ctx.redirect('#/');
        }).fail(function(data) {
            notification.error('Something went wrong. Try again.');
        });;
    }

    const initializeLogin = function(){
        if(userModel.isAuthorized()){
            $('.first-bar').show();
            $('.second-bar').show();
            let username = storage.getData('userInfo').username;
            $('.second-bar>ul>li')[0].textContent=`Welcome, ${username}`;
            $('.navbar-anonymous').hide();
        } else {
            $('.first-bar').hide();
            $('.second-bar').hide();
            $('.navbar-anonymous').show();
        }
    };

    return {
        getLogin,
        postLogin,
        logout,
        getRegister,
        postRegister,
        initializeLogin
    };
}());