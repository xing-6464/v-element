import{d as v,h as o,k as p,y as d,l as _,o as u,c as r,m as s,$ as w,t as V,e as b,n as f}from"./framework.Dcy6uJZY.js";const k=["name","disabled"],y={class:"x-switch__core"},x={class:"x-switch__core-inner"},B={key:0,class:"x-switch__core-inner-text"},g=s("div",{class:"x-switch__core-action"},null,-1),N=v({name:"XSwitch",inheritAttrs:!1,__name:"Switch",props:{modelValue:{type:[Boolean,String,Number]},disabled:{type:Boolean},activeText:{},inactiveText:{},activeValue:{type:[Boolean,String,Number],default:!0},inactiveValue:{type:[Boolean,String,Number],default:!1},name:{},id:{},size:{}},emits:["update:modelValue","change"],setup(h,{emit:m}){const a=h,c=m,i=o(),n=o(a.modelValue),t=p(()=>n.value===a.activeValue);d(t,e=>{i.value.checked=e}),d(()=>a.modelValue,e=>{n.value=e});const l=()=>{if(a.disabled)return;const e=t.value?a.inactiveValue:a.activeValue;n.value=e,c("update:modelValue",e),c("change",e)};return _(()=>{i.value.checked=t.value}),(e,S)=>(u(),r("div",{class:f(["x-switch",{[`x-switch--${e.size}`]:e.size,"is-disabled":e.disabled,"is-checked":t.value}]),onClick:l},[s("input",{ref_key:"input",ref:i,class:"x-switch__input",type:"checkbox",role:"switch",name:e.name,disabled:e.disabled,onKeydown:w(l,["enter"])},null,40,k),s("div",y,[s("div",x,[e.activeText||e.inactiveText?(u(),r("span",B,V(t.value?e.activeText:e.inactiveText),1)):b("",!0)]),g])],2))}});export{N as _};