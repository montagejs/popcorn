montageDefine("3dc4dee","tests/DomUtils/01-by_id",{dependencies:["../.."],factory:function(t,e,a){var n=t("../..");e.name="Get element by id",e.getElements=function(t){return n.getElements({id:"asdf"},t,!0,1)[0]},e.getByFunction=function(t){return n.getElementById("asdf",t,!0)},e.expected={type:"tag",name:"tag1",attribs:{id:"asdf"},children:[{data:" ",type:"text"},{type:"script",name:"script",attribs:{},children:[{data:"text",type:"text"}]},{data:" ",type:"text"},{data:" comment ",type:"comment"},{data:" ",type:"text"},{type:"tag",name:"tag2",attribs:{},children:[{data:" text ",type:"text"}]}]}}});