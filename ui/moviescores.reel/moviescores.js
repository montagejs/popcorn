var Montage     = require("montage/core/core").Montage,
    Component   = require("montage/ui/component").Component;

exports.Moviescores = Montage.create(Component, {
    _data: {
        value: null
    },

    data: {
        set: function(val){
            this._data = val;
            this.needsDraw = true;
        },
        get: function(){
            return this._data;
        }
    },

    draw: {
        value: function(){
            if( this.data ){
                var audience = this.data.ratings.audience_rating,
                    critics = this.data.ratings.critics_rating;

                if( audience == "Fresh" ){
                    this.aImage.style.backgroundPosition = '0px 0px'
                }else if( audience == "Rotten" ){
                    this.aImage.style.backgroundPosition = '0px -25px'
                }else if( audience == "Certified Fresh" ){
                    this.aImage.style.backgroundPosition = '0px -50px'
                }else if( audience == "Upright" ){
                    this.aImage.style.backgroundPosition = '0px -75px'
                }else if( audience == "Spilled" ){
                    this.aImage.style.backgroundPosition = '0px -125px'
                }else{
                    this.aImage.style.backgroundPosition = '0px -100px'
                }

                if( critics == "Fresh" ){
                    this.cImage.style.backgroundPosition = '0px 0px'
                }else if( critics == "Rotten" ){
                    this.cImage.style.backgroundPosition = '0px -25px'
                }else if( critics == "Certified Fresh" ){
                    this.cImage.style.backgroundPosition = '0px -50px'
                }else if( critics == "Upright" ){
                    this.cImage.style.backgroundPosition = '0px -75px'
                }else if( critics == "Spilled" ){
                    this.cImage.style.backgroundPosition = '0px -125px'
                }else{
                    this.cImage.style.backgroundPosition = '0px -100px'
                }
            }
        }
    }

});
