import{_ as A}from"./nuxt-link.7342e1dc.js";import{_ as B}from"./Button.f6025b36.js";import{f as N,r as x,g as l,h as I,i as t,k as W,o as f,c as h,a as v,b as e,w as o,d as n,t as d,j as E,m as j}from"./entry.b929558c.js";import"./_plugin-vue_export-helper.c27b6911.js";const D={key:0},O={class:"text-4xl text-center my-4"},T={key:1,class:"text-center"},L={class:"text-4xl"},q=N({__name:"list",setup(P){const{$service:r}=j(),i=r.list.getWordsWithScoreObject(),U=r.list.deleteAt,k=["KEY","VALUE",{value:"SCORE",align:"right"},{value:"Action",align:"center"}],w=["key","value",{fn:c=>c.score,align:"right"},{slot:"action",align:"center"}],s=x(1),_=x(15),S=c=>{_.value=parseInt(c.pageSize)};return(c,p)=>{const u=l("UiIcon"),m=l("UiIconButton"),b=A,C=l("UiTable"),V=l("UiPagination"),y=B,z=I("auto-animate");return t(i).length?W((f(),h("div",D,[v("div",O,[e(u,{class:"px-2"},{default:o(()=>[n("notes")]),_:1}),n("Words")]),e(C,{fullwidth:"",thead:k,tbody:w,data:t(i).slice(t(_)*(t(s)-1),t(_)*t(s))},{action:o(({data:a})=>[e(b,{to:"/edit?i="+a.index},{default:o(()=>[e(m,null,{default:o(()=>[n("edit")]),_:1})]),_:2},1032,["to"]),e(m,{onClick:g=>t(U)(a.index)},{default:o(()=>[n("delete")]),_:2},1032,["onClick"])]),_:1},8,["data"]),e(V,{modelValue:t(s),"onUpdate:modelValue":p[0]||(p[0]=a=>E(s)?s.value=a:null),total:t(i).length,"page-size":[15,30,50,100],"show-total":"","page-size-text":"Words per page","onUpdate:pageSize":S},{default:o(({currentMinRow:a,currentMaxRow:g})=>[n(d(a)+" - "+d(g)+" / "+d(t(i).length),1)]),_:1},8,["modelValue","total"])])),[[z]]):(f(),h("div",T,[v("div",L,[e(u,{class:"mx-2"},{default:o(()=>[n("contact_support")]),_:1}),n("No words in word list.")]),e(y,{class:"mt-4 block w-fit mx-auto"})]))}}});export{q as default};
