(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(13),o=n.n(c),u=n(14),l=n(2),i=function(e){var t=e.inputState,n=e.prompt;return r.a.createElement("div",null,n,": ",r.a.createElement("input",{value:t.state,onChange:t.handleChange}))},s=function(e){var t=e.handleAddPerson,n=e.newNameState,a=e.newPhoneState;return r.a.createElement("form",{onSubmit:t},r.a.createElement(i,{prompt:"name",inputState:n}),r.a.createElement(i,{prompt:"number",inputState:a}),r.a.createElement("button",{type:"submit"},"add"))},m=function(e){var t=e.person,n=e.handleDelete;return r.a.createElement("div",null,t.name," ",t.number," ",r.a.createElement("button",{onClick:function(){window.confirm("Delete ".concat(t.name,"?"))&&n(t.id)}},"Delete"))},d=function(e){var t=e.persons,n=e.nameFilter,a=e.handleDelete,c=t.filter((function(e){return e.name.toLowerCase().includes(n)})).map((function(e){return r.a.createElement(m,{key:e.id,person:e,handleDelete:a})}));return r.a.createElement("div",null,c)},f=n(3),h=n.n(f),p="/api/persons",b=function(){return h.a.get(p).then((function(e){return e.data}))},v=function(e){return h.a.post(p,e).then((function(e){return e.data}))},E=function(e,t){return h.a.put("".concat(p,"/").concat(e),t).then((function(e){return e.data}))},g=function(e){return h.a.delete("".concat(p,"/").concat(e))},S=function(e){var t=e.style,n=e.message;return null===n?null:r.a.createElement("div",{className:"notification",style:t},n)},j=(n(37),function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(""),m=Object(l.a)(o,2),f=m[0],h=m[1],p=Object(a.useState)(""),j=Object(l.a)(p,2),w=j[0],O=j[1],y=Object(a.useState)(""),D=Object(l.a)(y,2),C=D[0],k=D[1],P=Object(a.useState)(null),N=Object(l.a)(P,2),A=N[0],F=N[1],T=Object(a.useState)(null),x=Object(l.a)(T,2),G=x[0],J=x[1];Object(a.useEffect)((function(){console.log("Getting persons"),b().then((function(e){console.log("Got persons"),c(e)}))}),[]);var L=function(e){J(e),setTimeout((function(){return J(null)}),5e3)},B={state:f,handleChange:function(e){var t=e.target.value;h(t)}},I={state:w,handleChange:function(e){var t=e.target.value;O(t)}};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(S,{message:A,style:{color:"red"}}),r.a.createElement(S,{message:G,style:{color:"green"}}),r.a.createElement(i,{prompt:"Filter by",inputState:{state:C,handleChange:function(e){var t=e.target.value;k(t.toLowerCase())}}}),r.a.createElement("h3",null,"New contact"),r.a.createElement(s,{handleAddPerson:function(e){e.preventDefault();var t={name:f,number:w};if(n.map((function(e){return e.name})).includes(f)){if(window.confirm("".concat(f," is already listed in the phonebook,\nDo you want to replace the number?"))){var a=n.find((function(e){return e.name===t.name}));E(a.id,Object(u.a)({},t,{id:a.id})).then((function(e){c(n.map((function(t){return t.id!==a.id?t:e}))),L("Updated ".concat(e.name)),h(""),O("")}))}}else v(t).then((function(e){c(n.concat(e)),h(""),O(""),L("Added ".concat(e.name))}))},newNameState:B,newPhoneState:I}),r.a.createElement("h3",null,"Contacts"),r.a.createElement(d,{persons:n,nameFilter:C,handleDelete:function(e){var t=n.find((function(t){return t.id===e}));g(e).then((function(a){console.log("Deleted ".concat(e,"\n"),a.statusText),c(n.filter((function(t){return t.id!==e}))),L("Deleted ".concat(t.name))})).catch((function(a){var r;c(n.filter((function(t){return t.id!==e}))),r="".concat(t.name," has already been deleted from the database!"),F(r),setTimeout((function(){return F(null)}),5e3)}))}}))});o.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.fa6be878.chunk.js.map