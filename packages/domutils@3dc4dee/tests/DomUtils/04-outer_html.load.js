montageDefine("3dc4dee","tests/DomUtils/04-outer_html",{dependencies:["../.."],factory:function(t,e,n){var a=t("../..");e.name="Get outer HTML",e.getElements=function(t){return'<tag1 id="asdf"> <script>text</script> <!-- comment --> <tag2> text </tag2></tag1>'},e.getByFunction=function(t){return a.getOuterHTML(a.getElementById("asdf",t,!0))},e.expected='<tag1 id="asdf"> <script>text</script> <!-- comment --> <tag2> text </tag2></tag1>'}});