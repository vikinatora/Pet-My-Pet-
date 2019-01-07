 const home = (function(){
    const index = function(ctx) {
        if(!userModel.isAuthorized()){
            ctx.partial('views/home/index.hbs');
        } else {
            ctx.redirect('#/pet/dashboard/All');
        }
    };

    return {
        index
    };
}());