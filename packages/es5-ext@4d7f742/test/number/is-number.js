"use strict";module.exports=function(e,t){t(e(0),!0,"Zero"),t(e(NaN),!0,"NaN"),t(e(1/0),!0,"Infinity"),t(e(12),!0,"Number"),t(e(!1),!1,"Boolean"),t(e(new Date),!1,"Date"),t(e(new Number(2)),!0,"Number object"),t(e("asdfaf"),!1,"String"),t(e(""),!1,"Empty String")};