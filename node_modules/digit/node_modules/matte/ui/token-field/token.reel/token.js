var Component = require("montage/ui/component").Component;

exports.Token = Component.specialize({

    _text: {
        value: null
    },

    text: {
        dependencies: ["value", "textPropertyPath"],
        get: function() {
            var textPropertyPath,
                value,
                text;

            if (this._text == null) {
                this._adHoc = false;
                textPropertyPath = this.textPropertyPath;
                value = this.value;

                if (textPropertyPath != null && value != null) {
                    if (typeof value[textPropertyPath] === 'undefined' && this.allowAdHocValues) {
                        this._adHoc = true;
                        this._text = value;
                    } else {
                        this._text = value[textPropertyPath];
                    }
                } else {
                    this._text = value;
                }
            }

            return this._text;
        }
    },

    allowAdHocValues: {value: null},

    _value: {
        value: null
    },

    value: {
        get: function() {
            return this._value;
        },
        set: function(aValue) {
            this._value = aValue;
            this._text = null;
        }
    },

    textPropertyPath: {value: null},

    tokensController: {value: null},

    // private

    __adHoc: {value: null},
    _adHoc: {
        get: function() {
            return this.__adHoc;
        },
        set: function(value) {
            this.__adHoc = value;
            this.needsDraw = true;
        }
    },

    _deleteEl: {value: null},

    enterDocument: {
        value: function(firstTime) {
            if (firstTime) {
                if(window.Touch) {
                    this._deleteEl.addEventListener('touchend', this);
                } else {
                    this._deleteEl.addEventListener('click', this);
                }
            }
        }
    },

    draw: {
        value: function() {
            this.element.classList[this._adHoc ? 'add' : 'remove']('montage-Token--adhoc');
        }
    },

    // Event handling

    removeSelf: {
        value: function() {
            this.tokensController.selectedObjects = [this.value];
            this.tokensController.removeObjectsAtSelectedIndexes();
            this.tokensController.selectedIndexes = [];
        }
    },

   handleClick: {
       value: function(event) {
           this.removeSelf();
       }
   },
   handleTouchend: {
       value: function(event) {
          this.removeSelf();
      }
  }

});
