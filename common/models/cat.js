'use strict';

module.exports = function(Cat) {

    Cat.afterRemote('findById', function(context,cat,next){
        cat.description = cat.name + " is "+ cat.age + " years old  and is a " + cat.breed;

        next();
    });

    Cat.adoptable = function(id,cb){
        Cat.findById(id,function(err, cat){
            if(err) return cb("Error",null);

            if(!cat) return cb("Cat not found",null);
            let canAdopt = false;

            if(cat.breed != "tiger" || (cat.age >= 10) ) canAdopt = true;

            cb(null,canAdopt);

        });
    }

    Cat.remoteMethod('adoptable',{
        accepts: {arg: 'id' , type: 'any'},
        returns: {arg: 'adoptable', type: 'boolean'}
    });

};
