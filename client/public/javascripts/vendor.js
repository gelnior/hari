(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
/*! jQuery v2.1.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.1",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+-new Date,v=a.document,w=0,x=0,y=gb(),z=gb(),A=gb(),B=function(a,b){return a===b&&(l=!0),0},C="undefined",D=1<<31,E={}.hasOwnProperty,F=[],G=F.pop,H=F.push,I=F.push,J=F.slice,K=F.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},L="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",N="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=N.replace("w","w#"),P="\\["+M+"*("+N+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+O+"))|)"+M+"*\\]",Q=":("+N+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+P+")*)|.*)\\)|)",R=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),S=new RegExp("^"+M+"*,"+M+"*"),T=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp("="+M+"*([^\\]'\"]*?)"+M+"*\\]","g"),V=new RegExp(Q),W=new RegExp("^"+O+"$"),X={ID:new RegExp("^#("+N+")"),CLASS:new RegExp("^\\.("+N+")"),TAG:new RegExp("^("+N.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+Q),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+L+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{I.apply(F=J.call(v.childNodes),v.childNodes),F[v.childNodes.length].nodeType}catch(eb){I={apply:F.length?function(a,b){H.apply(a,J.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],!a||"string"!=typeof a)return d;if(1!==(k=b.nodeType)&&9!==k)return[];if(p&&!e){if(f=_.exec(a))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return I.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return I.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=9===k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+qb(o[l]);w=ab.test(a)&&ob(b.parentNode)||b,x=o.join(",")}if(x)try{return I.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function gb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function hb(a){return a[u]=!0,a}function ib(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function jb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function kb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||D)-(~a.sourceIndex||D);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function lb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function nb(a){return hb(function(b){return b=+b,hb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function ob(a){return a&&typeof a.getElementsByTagName!==C&&a}c=fb.support={},f=fb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fb.setDocument=function(a){var b,e=a?a.ownerDocument||a:v,g=e.defaultView;return e!==n&&9===e.nodeType&&e.documentElement?(n=e,o=e.documentElement,p=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){m()},!1):g.attachEvent&&g.attachEvent("onunload",function(){m()})),c.attributes=ib(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ib(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(e.getElementsByClassName)&&ib(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=ib(function(a){return o.appendChild(a).id=u,!e.getElementsByName||!e.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==C&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c=typeof a.getAttributeNode!==C&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==C?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==C&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(e.querySelectorAll))&&(ib(function(a){a.innerHTML="<select msallowclip=''><option selected=''></option></select>",a.querySelectorAll("[msallowclip^='']").length&&q.push("[*^$]="+M+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+M+"*(?:value|"+L+")"),a.querySelectorAll(":checked").length||q.push(":checked")}),ib(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+M+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ib(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",Q)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===v&&t(v,a)?-1:b===e||b.ownerDocument===v&&t(v,b)?1:k?K.call(k,a)-K.call(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],i=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:k?K.call(k,a)-K.call(k,b):0;if(f===g)return kb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?kb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},e):n},fb.matches=function(a,b){return fb(a,null,null,b)},fb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fb(b,n,null,[a]).length>0},fb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&E.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fb.selectors={cacheLength:50,createPseudo:hb,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+M+")"+a+"("+M+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==C&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?hb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=K.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:hb(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?hb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:hb(function(a){return function(b){return fb(a,b).length>0}}),contains:hb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:hb(function(a){return W.test(a||"")||fb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:nb(function(){return[0]}),last:nb(function(a,b){return[b-1]}),eq:nb(function(a,b,c){return[0>c?c+b:c]}),even:nb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:nb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:nb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:nb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=lb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=mb(b);function pb(){}pb.prototype=d.filters=d.pseudos,d.setFilters=new pb,g=fb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fb.error(a):z(a,i).slice(0)};function qb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function rb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function sb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function tb(a,b,c){for(var d=0,e=b.length;e>d;d++)fb(a,b[d],c);return c}function ub(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function vb(a,b,c,d,e,f){return d&&!d[u]&&(d=vb(d)),e&&!e[u]&&(e=vb(e,f)),hb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||tb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ub(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ub(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?K.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ub(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):I.apply(g,r)})}function wb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=rb(function(a){return a===b},h,!0),l=rb(function(a){return K.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>i;i++)if(c=d.relative[a[i].type])m=[rb(sb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return vb(i>1&&sb(m),i>1&&qb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&wb(a.slice(i,e)),f>e&&wb(a=a.slice(e)),f>e&&qb(a))}m.push(c)}return sb(m)}function xb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=G.call(i));s=ub(s)}I.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&fb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?hb(f):f}return h=fb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xb(e,d)),f.selector=a}return f},i=fb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&ob(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qb(j),!a)return I.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&ob(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ib(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ib(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||jb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ib(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||jb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ib(function(a){return null==a.getAttribute("disabled")})||jb(L,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fb}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+Math.random()}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)
},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(ob(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(ob(c,"script"),kb),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(hb,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function tb(a){var b=l,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:"0",fontWeight:"400"},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fb(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fb(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?zb.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=yb(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(n.cssHooks[a+b].set=Gb)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}n.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Kb.prototype.init,n.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=n.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||tb(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?tb(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ub(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return n.map(k,Ub,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xb,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xb(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),n.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Lb=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Lb=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Mb||(Mb=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Mb),Mb=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Yb,Zb,$b=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))
},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||n.find.attr;$b[b]=function(a,b,d){var e,f;return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=n.now(),dc=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var ec,fc,gc=/#.*$/,hc=/([?&])_=[^&]*/,ic=/^(.*?):[ \t]*([^\r\n]*)$/gm,jc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,kc=/^(?:GET|HEAD)$/,lc=/^\/\//,mc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,nc={},oc={},pc="*/".concat("*");try{fc=location.href}catch(qc){fc=l.createElement("a"),fc.href="",fc=fc.href}ec=mc.exec(fc.toLowerCase())||[];function rc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function sc(a,b,c,d){var e={},f=a===oc;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function tc(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function uc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function vc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:fc,type:"GET",isLocal:jc.test(ec[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":pc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?tc(tc(a,n.ajaxSettings),b):tc(n.ajaxSettings,a)},ajaxPrefilter:rc(nc),ajaxTransport:rc(oc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=ic.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||fc)+"").replace(gc,"").replace(lc,ec[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=mc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===ec[1]&&h[2]===ec[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(ec[3]||("http:"===ec[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),sc(nc,k,b,v),2===t)return v;i=k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!kc.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=hc.test(d)?d.replace(hc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+pc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=sc(oc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=uc(k,v,f)),u=vc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var wc=/%20/g,xc=/\[\]$/,yc=/\r?\n/g,zc=/^(?:submit|button|image|reset|file)$/i,Ac=/^(?:input|select|textarea|keygen)/i;function Bc(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||xc.test(a)?d(a,e):Bc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Bc(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Bc(c,a[c],b,e);return d.join("&").replace(wc,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Ac.test(this.nodeName)&&!zc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(yc,"\r\n")}}):{name:b.name,value:c.replace(yc,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Cc=0,Dc={},Ec={0:200,1223:204},Fc=n.ajaxSettings.xhr();a.ActiveXObject&&n(a).on("unload",function(){for(var a in Dc)Dc[a]()}),k.cors=!!Fc&&"withCredentials"in Fc,k.ajax=Fc=!!Fc,n.ajaxTransport(function(a){var b;return k.cors||Fc&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Cc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Dc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Ec[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Dc[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Gc=[],Hc=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Gc.pop()||n.expando+"_"+cc++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Hc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Hc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Hc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Gc.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Ic=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Ic)return Ic.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Jc=a.document.documentElement;function Kc(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Kc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Jc;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Jc})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Kc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=yb(k.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Lc=a.jQuery,Mc=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Mc),b&&a.jQuery===n&&(a.jQuery=Lc),n},typeof b===U&&(a.jQuery=a.$=n),n});

;//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,w=Object.keys,_=i.bind,j=function(n){return n instanceof j?n:this instanceof j?void(this._wrapped=n):new j(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=j),exports._=j):n._=j,j.VERSION="1.6.0";var A=j.each=j.forEach=function(n,t,e){if(null==n)return n;if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a=j.keys(n),u=0,i=a.length;i>u;u++)if(t.call(e,n[a[u]],a[u],n)===r)return;return n};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var O="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(O);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=j.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(O);return r},j.find=j.detect=function(n,t,r){var e;return k(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,e){t||(t=j.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var k=j.some=j.any=function(n,t,e){t||(t=j.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};j.contains=j.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:k(n,function(n){return n===t})},j.invoke=function(n,t){var r=o.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,j.property(t))},j.where=function(n,t){return j.filter(n,j.matches(t))},j.findWhere=function(n,t){return j.find(n,j.matches(t))},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);var e=-1/0,u=-1/0;return A(n,function(n,i,a){var o=t?t.call(r,n,i,a):n;o>u&&(e=n,u=o)}),e},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);var e=1/0,u=1/0;return A(n,function(n,i,a){var o=t?t.call(r,n,i,a):n;u>o&&(e=n,u=o)}),e},j.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e},j.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=j.values(n)),n[j.random(n.length-1)]):j.shuffle(n).slice(0,Math.max(0,t))};var E=function(n){return null==n?j.identity:j.isFunction(n)?n:j.property(n)};j.sortBy=function(n,t,r){return t=E(t),j.pluck(j.map(n,function(n,e,u){return{value:n,index:e,criteria:t.call(r,n,e,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=E(r),A(t,function(i,a){var o=r.call(e,i,a,t);n(u,o,i)}),u}};j.groupBy=F(function(n,t,r){j.has(n,t)?n[t].push(r):n[t]=[r]}),j.indexBy=F(function(n,t,r){n[t]=r}),j.countBy=F(function(n,t){j.has(n,t)?n[t]++:n[t]=1}),j.sortedIndex=function(n,t,r,e){r=E(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;r.call(e,n[o])<u?i=o+1:a=o}return i},j.toArray=function(n){return n?j.isArray(n)?o.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:o.call(n,0,t)},j.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var M=function(n,t,r){return t&&j.every(n,j.isArray)?c.apply(r,n):(A(n,function(n){j.isArray(n)||j.isArguments(n)?t?a.apply(r,n):M(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return M(n,t,[])},j.without=function(n){return j.difference(n,o.call(arguments,1))},j.partition=function(n,t){var r=[],e=[];return A(n,function(n){(t(n)?r:e).push(n)}),[r,e]},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:j.contains(a,r))||(a.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=o.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.contains(t,n)})})},j.difference=function(n){var t=c.apply(e,o.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var R=function(){};j.bind=function(n,t){var r,e;if(_&&n.bind===_)return _.apply(n,o.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));R.prototype=n.prototype;var u=new R;R.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=o.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===j&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},j.bindAll=function(n){var t=o.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return A(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(o.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=r.leading===!1?0:j.now(),a=null,i=n.apply(e,u),e=u=null};return function(){var l=j.now();o||r.leading!==!1||(o=l);var f=t-(l-o);return e=this,u=arguments,0>=f?(clearTimeout(a),a=null,o=l,i=n.apply(e,u),e=u=null):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u,i,a,o,c=function(){var l=j.now()-a;t>l?e=setTimeout(c,t-l):(e=null,r||(o=n.apply(i,u),i=u=null))};return function(){i=this,u=arguments,a=j.now();var l=r&&!e;return e||(e=setTimeout(c,t)),l&&(o=n.apply(i,u),i=u=null),o}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return j.partial(t,n)},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=function(n){if(!j.isObject(n))return[];if(w)return w(n);var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},j.pairs=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},j.invert=function(n){for(var t={},r=j.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)j.contains(r,u)||(t[u]=n[u]);return t},j.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]===void 0&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o)&&"constructor"in n&&"constructor"in t)return!1;r.push(n),e.push(t);var c=0,f=!0;if("[object Array]"==u){if(c=n.length,f=c==t.length)for(;c--&&(f=S(n[c],t[c],r,e)););}else{for(var s in n)if(j.has(n,s)&&(c++,!(f=j.has(t,s)&&S(n[s],t[s],r,e))))break;if(f){for(s in t)if(j.has(t,s)&&!c--)break;f=!c}}return r.pop(),e.pop(),f};j.isEqual=function(n,t){return S(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=x||function(n){return"[object Array]"==l.call(n)},j.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return n===void 0},j.has=function(n,t){return f.call(n,t)},j.noConflict=function(){return n._=t,this},j.identity=function(n){return n},j.constant=function(n){return function(){return n}},j.property=function(n){return function(t){return t[n]}},j.matches=function(n){return function(t){if(t===n)return!0;for(var r in n)if(n[r]!==t[r])return!1;return!0}},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},j.now=Date.now||function(){return(new Date).getTime()};var T={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};T.unescape=j.invert(T.escape);var I={escape:new RegExp("["+j.keys(T.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(T.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(I[n],function(t){return T[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){A(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(j,n))}})};var N=0;j.uniqueId=function(n){var t=++N+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(D,function(n){return"\\"+B[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=new Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},j.chain=function(n){return j(n).chain()};var z=function(n){return this._chain?j(n).chain():n};j.mixin(j),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];j.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}}),"function"==typeof define&&define.amd&&define("underscore",[],function(){return j})}).call(this);
//# sourceMappingURL=underscore-min.map
;(function(t,e){if(typeof define==="function"&&define.amd){define(["underscore","jquery","exports"],function(i,r,s){t.Backbone=e(t,s,i,r)})}else if(typeof exports!=="undefined"){var i=require("underscore");e(t,exports,i)}else{t.Backbone=e(t,{},t._,t.jQuery||t.Zepto||t.ender||t.$)}})(this,function(t,e,i,r){var s=t.Backbone;var n=[];var a=n.push;var o=n.slice;var h=n.splice;e.VERSION="1.1.2";e.$=r;e.noConflict=function(){t.Backbone=s;return this};e.emulateHTTP=false;e.emulateJSON=false;var u=e.Events={on:function(t,e,i){if(!c(this,"on",t,[e,i])||!e)return this;this._events||(this._events={});var r=this._events[t]||(this._events[t]=[]);r.push({callback:e,context:i,ctx:i||this});return this},once:function(t,e,r){if(!c(this,"once",t,[e,r])||!e)return this;var s=this;var n=i.once(function(){s.off(t,n);e.apply(this,arguments)});n._callback=e;return this.on(t,n,r)},off:function(t,e,r){var s,n,a,o,h,u,l,f;if(!this._events||!c(this,"off",t,[e,r]))return this;if(!t&&!e&&!r){this._events=void 0;return this}o=t?[t]:i.keys(this._events);for(h=0,u=o.length;h<u;h++){t=o[h];if(a=this._events[t]){this._events[t]=s=[];if(e||r){for(l=0,f=a.length;l<f;l++){n=a[l];if(e&&e!==n.callback&&e!==n.callback._callback||r&&r!==n.context){s.push(n)}}}if(!s.length)delete this._events[t]}}return this},trigger:function(t){if(!this._events)return this;var e=o.call(arguments,1);if(!c(this,"trigger",t,e))return this;var i=this._events[t];var r=this._events.all;if(i)f(i,e);if(r)f(r,arguments);return this},stopListening:function(t,e,r){var s=this._listeningTo;if(!s)return this;var n=!e&&!r;if(!r&&typeof e==="object")r=this;if(t)(s={})[t._listenId]=t;for(var a in s){t=s[a];t.off(e,r,this);if(n||i.isEmpty(t._events))delete this._listeningTo[a]}return this}};var l=/\s+/;var c=function(t,e,i,r){if(!i)return true;if(typeof i==="object"){for(var s in i){t[e].apply(t,[s,i[s]].concat(r))}return false}if(l.test(i)){var n=i.split(l);for(var a=0,o=n.length;a<o;a++){t[e].apply(t,[n[a]].concat(r))}return false}return true};var f=function(t,e){var i,r=-1,s=t.length,n=e[0],a=e[1],o=e[2];switch(e.length){case 0:while(++r<s)(i=t[r]).callback.call(i.ctx);return;case 1:while(++r<s)(i=t[r]).callback.call(i.ctx,n);return;case 2:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a);return;case 3:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a,o);return;default:while(++r<s)(i=t[r]).callback.apply(i.ctx,e);return}};var d={listenTo:"on",listenToOnce:"once"};i.each(d,function(t,e){u[e]=function(e,r,s){var n=this._listeningTo||(this._listeningTo={});var a=e._listenId||(e._listenId=i.uniqueId("l"));n[a]=e;if(!s&&typeof r==="object")s=this;e[t](r,s,this);return this}});u.bind=u.on;u.unbind=u.off;i.extend(e,u);var p=e.Model=function(t,e){var r=t||{};e||(e={});this.cid=i.uniqueId("c");this.attributes={};if(e.collection)this.collection=e.collection;if(e.parse)r=this.parse(r,e)||{};r=i.defaults({},r,i.result(this,"defaults"));this.set(r,e);this.changed={};this.initialize.apply(this,arguments)};i.extend(p.prototype,u,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(t){return i.clone(this.attributes)},sync:function(){return e.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return i.escape(this.get(t))},has:function(t){return this.get(t)!=null},set:function(t,e,r){var s,n,a,o,h,u,l,c;if(t==null)return this;if(typeof t==="object"){n=t;r=e}else{(n={})[t]=e}r||(r={});if(!this._validate(n,r))return false;a=r.unset;h=r.silent;o=[];u=this._changing;this._changing=true;if(!u){this._previousAttributes=i.clone(this.attributes);this.changed={}}c=this.attributes,l=this._previousAttributes;if(this.idAttribute in n)this.id=n[this.idAttribute];for(s in n){e=n[s];if(!i.isEqual(c[s],e))o.push(s);if(!i.isEqual(l[s],e)){this.changed[s]=e}else{delete this.changed[s]}a?delete c[s]:c[s]=e}if(!h){if(o.length)this._pending=r;for(var f=0,d=o.length;f<d;f++){this.trigger("change:"+o[f],this,c[o[f]],r)}}if(u)return this;if(!h){while(this._pending){r=this._pending;this._pending=false;this.trigger("change",this,r)}}this._pending=false;this._changing=false;return this},unset:function(t,e){return this.set(t,void 0,i.extend({},e,{unset:true}))},clear:function(t){var e={};for(var r in this.attributes)e[r]=void 0;return this.set(e,i.extend({},t,{unset:true}))},hasChanged:function(t){if(t==null)return!i.isEmpty(this.changed);return i.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?i.clone(this.changed):false;var e,r=false;var s=this._changing?this._previousAttributes:this.attributes;for(var n in t){if(i.isEqual(s[n],e=t[n]))continue;(r||(r={}))[n]=e}return r},previous:function(t){if(t==null||!this._previousAttributes)return null;return this._previousAttributes[t]},previousAttributes:function(){return i.clone(this._previousAttributes)},fetch:function(t){t=t?i.clone(t):{};if(t.parse===void 0)t.parse=true;var e=this;var r=t.success;t.success=function(i){if(!e.set(e.parse(i,t),t))return false;if(r)r(e,i,t);e.trigger("sync",e,i,t)};q(this,t);return this.sync("read",this,t)},save:function(t,e,r){var s,n,a,o=this.attributes;if(t==null||typeof t==="object"){s=t;r=e}else{(s={})[t]=e}r=i.extend({validate:true},r);if(s&&!r.wait){if(!this.set(s,r))return false}else{if(!this._validate(s,r))return false}if(s&&r.wait){this.attributes=i.extend({},o,s)}if(r.parse===void 0)r.parse=true;var h=this;var u=r.success;r.success=function(t){h.attributes=o;var e=h.parse(t,r);if(r.wait)e=i.extend(s||{},e);if(i.isObject(e)&&!h.set(e,r)){return false}if(u)u(h,t,r);h.trigger("sync",h,t,r)};q(this,r);n=this.isNew()?"create":r.patch?"patch":"update";if(n==="patch")r.attrs=s;a=this.sync(n,this,r);if(s&&r.wait)this.attributes=o;return a},destroy:function(t){t=t?i.clone(t):{};var e=this;var r=t.success;var s=function(){e.trigger("destroy",e,e.collection,t)};t.success=function(i){if(t.wait||e.isNew())s();if(r)r(e,i,t);if(!e.isNew())e.trigger("sync",e,i,t)};if(this.isNew()){t.success();return false}q(this,t);var n=this.sync("delete",this,t);if(!t.wait)s();return n},url:function(){var t=i.result(this,"urlRoot")||i.result(this.collection,"url")||M();if(this.isNew())return t;return t.replace(/([^\/])$/,"$1/")+encodeURIComponent(this.id)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(t){return this._validate({},i.extend(t||{},{validate:true}))},_validate:function(t,e){if(!e.validate||!this.validate)return true;t=i.extend({},this.attributes,t);var r=this.validationError=this.validate(t,e)||null;if(!r)return true;this.trigger("invalid",this,r,i.extend(e,{validationError:r}));return false}});var v=["keys","values","pairs","invert","pick","omit"];i.each(v,function(t){p.prototype[t]=function(){var e=o.call(arguments);e.unshift(this.attributes);return i[t].apply(i,e)}});var g=e.Collection=function(t,e){e||(e={});if(e.model)this.model=e.model;if(e.comparator!==void 0)this.comparator=e.comparator;this._reset();this.initialize.apply(this,arguments);if(t)this.reset(t,i.extend({silent:true},e))};var m={add:true,remove:true,merge:true};var y={add:true,remove:false};i.extend(g.prototype,u,{model:p,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return e.sync.apply(this,arguments)},add:function(t,e){return this.set(t,i.extend({merge:false},e,y))},remove:function(t,e){var r=!i.isArray(t);t=r?[t]:i.clone(t);e||(e={});var s,n,a,o;for(s=0,n=t.length;s<n;s++){o=t[s]=this.get(t[s]);if(!o)continue;delete this._byId[o.id];delete this._byId[o.cid];a=this.indexOf(o);this.models.splice(a,1);this.length--;if(!e.silent){e.index=a;o.trigger("remove",o,this,e)}this._removeReference(o,e)}return r?t[0]:t},set:function(t,e){e=i.defaults({},e,m);if(e.parse)t=this.parse(t,e);var r=!i.isArray(t);t=r?t?[t]:[]:i.clone(t);var s,n,a,o,h,u,l;var c=e.at;var f=this.model;var d=this.comparator&&c==null&&e.sort!==false;var v=i.isString(this.comparator)?this.comparator:null;var g=[],y=[],_={};var b=e.add,w=e.merge,x=e.remove;var E=!d&&b&&x?[]:false;for(s=0,n=t.length;s<n;s++){h=t[s]||{};if(h instanceof p){a=o=h}else{a=h[f.prototype.idAttribute||"id"]}if(u=this.get(a)){if(x)_[u.cid]=true;if(w){h=h===o?o.attributes:h;if(e.parse)h=u.parse(h,e);u.set(h,e);if(d&&!l&&u.hasChanged(v))l=true}t[s]=u}else if(b){o=t[s]=this._prepareModel(h,e);if(!o)continue;g.push(o);this._addReference(o,e)}o=u||o;if(E&&(o.isNew()||!_[o.id]))E.push(o);_[o.id]=true}if(x){for(s=0,n=this.length;s<n;++s){if(!_[(o=this.models[s]).cid])y.push(o)}if(y.length)this.remove(y,e)}if(g.length||E&&E.length){if(d)l=true;this.length+=g.length;if(c!=null){for(s=0,n=g.length;s<n;s++){this.models.splice(c+s,0,g[s])}}else{if(E)this.models.length=0;var k=E||g;for(s=0,n=k.length;s<n;s++){this.models.push(k[s])}}}if(l)this.sort({silent:true});if(!e.silent){for(s=0,n=g.length;s<n;s++){(o=g[s]).trigger("add",o,this,e)}if(l||E&&E.length)this.trigger("sort",this,e)}return r?t[0]:t},reset:function(t,e){e||(e={});for(var r=0,s=this.models.length;r<s;r++){this._removeReference(this.models[r],e)}e.previousModels=this.models;this._reset();t=this.add(t,i.extend({silent:true},e));if(!e.silent)this.trigger("reset",this,e);return t},push:function(t,e){return this.add(t,i.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);this.remove(e,t);return e},unshift:function(t,e){return this.add(t,i.extend({at:0},e))},shift:function(t){var e=this.at(0);this.remove(e,t);return e},slice:function(){return o.apply(this.models,arguments)},get:function(t){if(t==null)return void 0;return this._byId[t]||this._byId[t.id]||this._byId[t.cid]},at:function(t){return this.models[t]},where:function(t,e){if(i.isEmpty(t))return e?void 0:[];return this[e?"find":"filter"](function(e){for(var i in t){if(t[i]!==e.get(i))return false}return true})},findWhere:function(t){return this.where(t,true)},sort:function(t){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");t||(t={});if(i.isString(this.comparator)||this.comparator.length===1){this.models=this.sortBy(this.comparator,this)}else{this.models.sort(i.bind(this.comparator,this))}if(!t.silent)this.trigger("sort",this,t);return this},pluck:function(t){return i.invoke(this.models,"get",t)},fetch:function(t){t=t?i.clone(t):{};if(t.parse===void 0)t.parse=true;var e=t.success;var r=this;t.success=function(i){var s=t.reset?"reset":"set";r[s](i,t);if(e)e(r,i,t);r.trigger("sync",r,i,t)};q(this,t);return this.sync("read",this,t)},create:function(t,e){e=e?i.clone(e):{};if(!(t=this._prepareModel(t,e)))return false;if(!e.wait)this.add(t,e);var r=this;var s=e.success;e.success=function(t,i){if(e.wait)r.add(t,e);if(s)s(t,i,e)};t.save(null,e);return t},parse:function(t,e){return t},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0;this.models=[];this._byId={}},_prepareModel:function(t,e){if(t instanceof p)return t;e=e?i.clone(e):{};e.collection=this;var r=new this.model(t,e);if(!r.validationError)return r;this.trigger("invalid",this,r.validationError,e);return false},_addReference:function(t,e){this._byId[t.cid]=t;if(t.id!=null)this._byId[t.id]=t;if(!t.collection)t.collection=this;t.on("all",this._onModelEvent,this)},_removeReference:function(t,e){if(this===t.collection)delete t.collection;t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,r){if((t==="add"||t==="remove")&&i!==this)return;if(t==="destroy")this.remove(e,r);if(e&&t==="change:"+e.idAttribute){delete this._byId[e.previous(e.idAttribute)];if(e.id!=null)this._byId[e.id]=e}this.trigger.apply(this,arguments)}});var _=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample"];i.each(_,function(t){g.prototype[t]=function(){var e=o.call(arguments);e.unshift(this.models);return i[t].apply(i,e)}});var b=["groupBy","countBy","sortBy","indexBy"];i.each(b,function(t){g.prototype[t]=function(e,r){var s=i.isFunction(e)?e:function(t){return t.get(e)};return i[t](this.models,s,r)}});var w=e.View=function(t){this.cid=i.uniqueId("view");t||(t={});i.extend(this,i.pick(t,E));this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()};var x=/^(\S+)\s*(.*)$/;var E=["model","collection","el","id","attributes","className","tagName","events"];i.extend(w.prototype,u,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();this.stopListening();return this},setElement:function(t,i){if(this.$el)this.undelegateEvents();this.$el=t instanceof e.$?t:e.$(t);this.el=this.$el[0];if(i!==false)this.delegateEvents();return this},delegateEvents:function(t){if(!(t||(t=i.result(this,"events"))))return this;this.undelegateEvents();for(var e in t){var r=t[e];if(!i.isFunction(r))r=this[t[e]];if(!r)continue;var s=e.match(x);var n=s[1],a=s[2];r=i.bind(r,this);n+=".delegateEvents"+this.cid;if(a===""){this.$el.on(n,r)}else{this.$el.on(n,a,r)}}return this},undelegateEvents:function(){this.$el.off(".delegateEvents"+this.cid);return this},_ensureElement:function(){if(!this.el){var t=i.extend({},i.result(this,"attributes"));if(this.id)t.id=i.result(this,"id");if(this.className)t["class"]=i.result(this,"className");var r=e.$("<"+i.result(this,"tagName")+">").attr(t);this.setElement(r,false)}else{this.setElement(i.result(this,"el"),false)}}});e.sync=function(t,r,s){var n=T[t];i.defaults(s||(s={}),{emulateHTTP:e.emulateHTTP,emulateJSON:e.emulateJSON});var a={type:n,dataType:"json"};if(!s.url){a.url=i.result(r,"url")||M()}if(s.data==null&&r&&(t==="create"||t==="update"||t==="patch")){a.contentType="application/json";a.data=JSON.stringify(s.attrs||r.toJSON(s))}if(s.emulateJSON){a.contentType="application/x-www-form-urlencoded";a.data=a.data?{model:a.data}:{}}if(s.emulateHTTP&&(n==="PUT"||n==="DELETE"||n==="PATCH")){a.type="POST";if(s.emulateJSON)a.data._method=n;var o=s.beforeSend;s.beforeSend=function(t){t.setRequestHeader("X-HTTP-Method-Override",n);if(o)return o.apply(this,arguments)}}if(a.type!=="GET"&&!s.emulateJSON){a.processData=false}if(a.type==="PATCH"&&k){a.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")}}var h=s.xhr=e.ajax(i.extend(a,s));r.trigger("request",r,h,s);return h};var k=typeof window!=="undefined"&&!!window.ActiveXObject&&!(window.XMLHttpRequest&&(new XMLHttpRequest).dispatchEvent);var T={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};e.ajax=function(){return e.$.ajax.apply(e.$,arguments)};var $=e.Router=function(t){t||(t={});if(t.routes)this.routes=t.routes;this._bindRoutes();this.initialize.apply(this,arguments)};var S=/\((.*?)\)/g;var H=/(\(\?)?:\w+/g;var A=/\*\w+/g;var I=/[\-{}\[\]+?.,\\\^$|#\s]/g;i.extend($.prototype,u,{initialize:function(){},route:function(t,r,s){if(!i.isRegExp(t))t=this._routeToRegExp(t);if(i.isFunction(r)){s=r;r=""}if(!s)s=this[r];var n=this;e.history.route(t,function(i){var a=n._extractParameters(t,i);n.execute(s,a);n.trigger.apply(n,["route:"+r].concat(a));n.trigger("route",r,a);e.history.trigger("route",n,r,a)});return this},execute:function(t,e){if(t)t.apply(this,e)},navigate:function(t,i){e.history.navigate(t,i);return this},_bindRoutes:function(){if(!this.routes)return;this.routes=i.result(this,"routes");var t,e=i.keys(this.routes);while((t=e.pop())!=null){this.route(t,this.routes[t])}},_routeToRegExp:function(t){t=t.replace(I,"\\$&").replace(S,"(?:$1)?").replace(H,function(t,e){return e?t:"([^/?]+)"}).replace(A,"([^?]*?)");return new RegExp("^"+t+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(t,e){var r=t.exec(e).slice(1);return i.map(r,function(t,e){if(e===r.length-1)return t||null;return t?decodeURIComponent(t):null})}});var N=e.History=function(){this.handlers=[];i.bindAll(this,"checkUrl");if(typeof window!=="undefined"){this.location=window.location;this.history=window.history}};var R=/^[#\/]|\s+$/g;var O=/^\/+|\/+$/g;var P=/msie [\w.]+/;var C=/\/$/;var j=/#.*$/;N.started=false;i.extend(N.prototype,u,{interval:50,atRoot:function(){return this.location.pathname.replace(/[^\/]$/,"$&/")===this.root},getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getFragment:function(t,e){if(t==null){if(this._hasPushState||!this._wantsHashChange||e){t=decodeURI(this.location.pathname+this.location.search);var i=this.root.replace(C,"");if(!t.indexOf(i))t=t.slice(i.length)}else{t=this.getHash()}}return t.replace(R,"")},start:function(t){if(N.started)throw new Error("Backbone.history has already been started");N.started=true;this.options=i.extend({root:"/"},this.options,t);this.root=this.options.root;this._wantsHashChange=this.options.hashChange!==false;this._wantsPushState=!!this.options.pushState;this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var r=this.getFragment();var s=document.documentMode;var n=P.exec(navigator.userAgent.toLowerCase())&&(!s||s<=7);this.root=("/"+this.root+"/").replace(O,"/");if(n&&this._wantsHashChange){var a=e.$('<iframe src="javascript:0" tabindex="-1">');this.iframe=a.hide().appendTo("body")[0].contentWindow;this.navigate(r)}if(this._hasPushState){e.$(window).on("popstate",this.checkUrl)}else if(this._wantsHashChange&&"onhashchange"in window&&!n){e.$(window).on("hashchange",this.checkUrl)}else if(this._wantsHashChange){this._checkUrlInterval=setInterval(this.checkUrl,this.interval)}this.fragment=r;var o=this.location;if(this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!this.atRoot()){this.fragment=this.getFragment(null,true);this.location.replace(this.root+"#"+this.fragment);return true}else if(this._hasPushState&&this.atRoot()&&o.hash){this.fragment=this.getHash().replace(R,"");this.history.replaceState({},document.title,this.root+this.fragment)}}if(!this.options.silent)return this.loadUrl()},stop:function(){e.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl);if(this._checkUrlInterval)clearInterval(this._checkUrlInterval);N.started=false},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(t){var e=this.getFragment();if(e===this.fragment&&this.iframe){e=this.getFragment(this.getHash(this.iframe))}if(e===this.fragment)return false;if(this.iframe)this.navigate(e);this.loadUrl()},loadUrl:function(t){t=this.fragment=this.getFragment(t);return i.any(this.handlers,function(e){if(e.route.test(t)){e.callback(t);return true}})},navigate:function(t,e){if(!N.started)return false;if(!e||e===true)e={trigger:!!e};var i=this.root+(t=this.getFragment(t||""));t=t.replace(j,"");if(this.fragment===t)return;this.fragment=t;if(t===""&&i!=="/")i=i.slice(0,-1);if(this._hasPushState){this.history[e.replace?"replaceState":"pushState"]({},document.title,i)}else if(this._wantsHashChange){this._updateHash(this.location,t,e.replace);if(this.iframe&&t!==this.getFragment(this.getHash(this.iframe))){if(!e.replace)this.iframe.document.open().close();this._updateHash(this.iframe.location,t,e.replace)}}else{return this.location.assign(i)}if(e.trigger)return this.loadUrl(t)},_updateHash:function(t,e,i){if(i){var r=t.href.replace(/(javascript:|#).*$/,"");t.replace(r+"#"+e)}else{t.hash="#"+e}}});e.history=new N;var U=function(t,e){var r=this;var s;if(t&&i.has(t,"constructor")){s=t.constructor}else{s=function(){return r.apply(this,arguments)}}i.extend(s,r,e);var n=function(){this.constructor=s};n.prototype=r.prototype;s.prototype=new n;if(t)i.extend(s.prototype,t);s.__super__=r.prototype;return s};p.extend=g.extend=$.extend=w.extend=N.extend=U;var M=function(){throw new Error('A "url" property or function must be specified')};var q=function(t,e){var i=e.error;e.error=function(r){if(i)i(t,r,e);t.trigger("error",t,r,e)}};return e});
//# sourceMappingURL=backbone-min.map
;//    PouchDB 3.2.0
//    
//    (c) 2012-2014 Dale Harvey and the PouchDB team
//    PouchDB may be freely distributed under the Apache license, version 2.0.
//    For all details and documentation:
//    http://pouchdb.com
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;"undefined"!=typeof window?t=window:"undefined"!=typeof global?t=global:"undefined"!=typeof self&&(t=self),t.PouchDB=e()}}(function(){var define,module,exports;return function e(t,n,r){function o(s,a){if(!n[s]){if(!t[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(i)return i(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var f=n[s]={exports:{}};t[s][0].call(f.exports,function(e){var n=t[s][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(e,t){"use strict";function n(e,t){for(var n=0;n<e.length;n++)if(t(e[n],n)===!0)return e[n];return!1}function r(e){return function(t,n){t||n[0]&&n[0].error?e(t||n[0]):e(null,n.length?n[0]:n)}}function o(e){var t={},n=[];return u.traverseRevTree(e,function(e,r,o,i){var s=r+"-"+o;return e&&(t[s]=0),void 0!==i&&n.push({from:i,to:s}),s}),n.reverse(),n.forEach(function(e){t[e.from]=void 0===t[e.from]?1+t[e.to]:Math.min(t[e.from],1+t[e.to])}),t}function i(e,t,n){var r="limit"in t?t.keys.slice(t.skip,t.limit+t.skip):t.skip>0?t.keys.slice(t.skip):t.keys;if(t.descending&&r.reverse(),!r.length)return e._allDocs({limit:0},n);var o={offset:t.skip};return h.all(r.map(function(n){var r=a.extend(!0,{key:n,deleted:"ok"},t);return["limit","skip","keys"].forEach(function(e){delete r[e]}),new h(function(t,i){e._allDocs(r,function(e,r){return e?i(e):(o.total_rows=r.total_rows,void t(r.rows[0]||{key:n,error:"not_found"}))})})})).then(function(e){return o.rows=e,o})}function s(){var e=this;f.call(this),e.autoCompact=function(t){return e.auto_compaction&&"http"!==e.type()?function(n,r){if(n)t(n);else{var o=r.length,i=function(){o--,o||t(null,r)};if(!r.length)return t(null,r);r.forEach(function(t){t.ok&&t.id?e.compactDocument(t.id,0,i):i()})}}:t};var t,n=0,r=["change","delete","create","update"];this.on("newListener",function(o){if(~r.indexOf(o)){if(n)return void n++;n++;var i=0;t=this.changes({conflicts:!0,include_docs:!0,continuous:!0,since:"now",onChange:function(t){t.seq<=i||(i=t.seq,e.emit("change",t),t.doc._deleted?e.emit("delete",t):"1"===t.doc._rev.split("-")[0]?e.emit("create",t):e.emit("update",t))}})}}),this.on("removeListener",function(e){~r.indexOf(e)&&(n--,n||t.cancel())})}var a=e("./utils"),u=e("./merge"),c=e("./deps/errors"),f=e("events").EventEmitter,l=e("./deps/upsert"),d=e("./changes"),h=a.Promise;a.inherits(s,f),t.exports=s,s.prototype.post=a.adapterFun("post",function(e,t,n){return"function"==typeof t&&(n=t,t={}),"object"!=typeof e||Array.isArray(e)?n(c.NOT_AN_OBJECT):void this.bulkDocs({docs:[e]},t,this.autoCompact(r(n)))}),s.prototype.put=a.adapterFun("put",a.getArguments(function(e){var t,n,o,i,s=e.shift(),u="_id"in s;if("object"!=typeof s||Array.isArray(s))return(i=e.pop())(c.NOT_AN_OBJECT);for(s=a.clone(s);;)if(t=e.shift(),n=typeof t,"string"!==n||u?"string"!==n||!u||"_rev"in s?"object"===n?o=t:"function"===n&&(i=t):s._rev=t:(s._id=t,u=!0),!e.length)break;o=o||{};var f=a.invalidIdError(s._id);return f?i(f):a.isLocalId(s._id)&&"function"==typeof this._putLocal?s._deleted?this._removeLocal(s,i):this._putLocal(s,i):void this.bulkDocs({docs:[s]},o,this.autoCompact(r(i)))})),s.prototype.putAttachment=a.adapterFun("putAttachment",function(e,t,n,r,o,i){function s(e){return e._attachments=e._attachments||{},e._attachments[t]={content_type:o,data:r},a.put(e)}var a=this;return"function"==typeof o&&(i=o,o=r,r=n,n=null),"undefined"==typeof o&&(o=r,r=n,n=null),a.get(e).then(function(e){if(e._rev!==n)throw c.REV_CONFLICT;return s(e)},function(t){if(t.error===c.MISSING_DOC.error)return s({_id:e});throw t})}),s.prototype.removeAttachment=a.adapterFun("removeAttachment",function(e,t,n,r){var o=this;o.get(e,function(e,i){return e?void r(e):i._rev!==n?void r(c.REV_CONFLICT):i._attachments?(delete i._attachments[t],0===Object.keys(i._attachments).length&&delete i._attachments,void o.put(i,r)):r()})}),s.prototype.remove=a.adapterFun("remove",function(e,t,n,o){var i;"string"==typeof t?(i={_id:e,_rev:t},"function"==typeof n&&(o=n,n={})):(i=e,"function"==typeof t?(o=t,n={}):(o=n,n=t)),n=a.clone(n||{}),n.was_delete=!0;var s={_id:i._id,_rev:i._rev||n.rev};return s._deleted=!0,a.isLocalId(s._id)&&"function"==typeof this._removeLocal?this._removeLocal(i,o):void this.bulkDocs({docs:[s]},n,r(o))}),s.prototype.revsDiff=a.adapterFun("revsDiff",function(e,t,n){function r(e,t){c.has(e)||c.set(e,{missing:[]}),c.get(e).missing.push(t)}function o(t,n){var o=e[t].slice(0);u.traverseRevTree(n,function(e,n,i,s,a){var u=n+"-"+i,c=o.indexOf(u);-1!==c&&(o.splice(c,1),"available"!==a.status&&r(t,u))}),o.forEach(function(e){r(t,e)})}"function"==typeof t&&(n=t,t={}),t=a.clone(t);var i=Object.keys(e);if(!i.length)return n(null,{});var s=0,c=new a.Map;i.map(function(t){this._getRevisionTree(t,function(r,a){if(r&&404===r.status&&"missing"===r.message)c.set(t,{missing:e[t]});else{if(r)return n(r);o(t,a)}if(++s===i.length){var u={};return c.forEach(function(e,t){u[t]=e}),n(null,u)}})},this)}),s.prototype.compactDocument=a.adapterFun("compactDocument",function(e,t,n){var r=this;this._getRevisionTree(e,function(i,s){if(i)return n(i);var a=o(s),c=[],f=[];Object.keys(a).forEach(function(e){a[e]>t&&c.push(e)}),u.traverseRevTree(s,function(e,t,n,r,o){var i=t+"-"+n;"available"===o.status&&-1!==c.indexOf(i)&&f.push(i)}),r._doCompaction(e,f,n)})}),s.prototype.compact=a.adapterFun("compact",function(e,t){"function"==typeof e&&(t=e,e={});var n=this;e=a.clone(e||{}),n.get("_local/compaction")["catch"](function(){return!1}).then(function(r){return"function"==typeof n._compact?(r&&r.last_seq&&(e.last_seq=r.last_seq),n._compact(e,t)):void 0})}),s.prototype._compact=function(e,t){function n(){l(c,"_local/compaction",function(e){return!e.last_seq||e.last_seq<i?(e.last_seq=i,e):!1},t)}function r(){a--,!a&&s&&n()}function o(e){a++,c.compactDocument(e.id,0).then(r,t)}var i,s=!1,a=0,u={returnDocs:!1},c=this;e.last_seq&&(u.since=e.last_seq),c.changes(u).on("change",o).on("complete",function(e){s=!0,i=e.last_seq,a||n()}).on("error",t)},s.prototype.get=a.adapterFun("get",function(e,t,r){function o(){var n=[],o=i.length;return o?void i.forEach(function(i){s.get(e,{rev:i,revs:t.revs,attachments:t.attachments},function(e,t){n.push(e?{missing:i}:{ok:t}),o--,o||r(null,n)})}):r(null,n)}if("function"==typeof t&&(r=t,t={}),"string"!=typeof e)return r(c.INVALID_ID);if(a.isLocalId(e)&&"function"==typeof this._getLocal)return this._getLocal(e,r);var i=[],s=this;if(!t.open_revs)return this._get(e,t,function(e,o){if(t=a.clone(t),e)return r(e);var i=o.doc;if(!i)return r(new Error("no doc!"));var c=o.metadata,f=o.ctx;if(t.conflicts){var l=u.collectConflicts(c);l.length&&(i._conflicts=l)}if(t.revs||t.revs_info){var d=u.rootToLeaf(c.rev_tree),h=n(d,function(e){return-1!==e.ids.map(function(e){return e.id}).indexOf(i._rev.split("-")[1])}),p=h.ids.map(function(e){return e.id}).indexOf(i._rev.split("-")[1])+1,v=h.ids.length-p;if(h.ids.splice(p,v),h.ids.reverse(),t.revs&&(i._revisions={start:h.pos+h.ids.length-1,ids:h.ids.map(function(e){return e.id})}),t.revs_info){var g=h.pos+h.ids.length;i._revs_info=h.ids.map(function(e){return g--,{rev:g+"-"+e.id,status:e.opts.status}})}}if(t.local_seq&&(i._local_seq=o.metadata.seq),t.attachments&&i._attachments){var y=i._attachments,m=Object.keys(y).length;if(0===m)return r(null,i);Object.keys(y).forEach(function(e){this._getAttachment(y[e],{encode:!0,ctx:f},function(t,n){var o=i._attachments[e];o.data=n,delete o.stub,delete o.length,--m||r(null,i)})},s)}else{if(i._attachments)for(var _ in i._attachments)i._attachments.hasOwnProperty(_)&&(i._attachments[_].stub=!0);r(null,i)}});if("all"===t.open_revs)this._getRevisionTree(e,function(e,t){e&&(t=[]),i=u.collectLeaves(t).map(function(e){return e.rev}),o()});else{if(!Array.isArray(t.open_revs))return r(c.error(c.UNKNOWN_ERROR,"function_clause"));i=t.open_revs;for(var f=0;f<i.length;f++){var l=i[f];if("string"!=typeof l||!/^\d+-/.test(l))return r(c.error(c.BAD_REQUEST,"Invalid rev format"))}o()}}),s.prototype.getAttachment=a.adapterFun("getAttachment",function(e,t,n,r){var o=this;n instanceof Function&&(r=n,n={}),n=a.clone(n),this._get(e,n,function(e,i){return e?r(e):i.doc._attachments&&i.doc._attachments[t]?(n.ctx=i.ctx,void o._getAttachment(i.doc._attachments[t],n,r)):r(c.MISSING_DOC)})}),s.prototype.allDocs=a.adapterFun("allDocs",function(e,t){if("function"==typeof e&&(t=e,e={}),e=a.clone(e),e.skip="undefined"!=typeof e.skip?e.skip:0,"keys"in e){if(!Array.isArray(e.keys))return t(new TypeError("options.keys must be an array"));var n=["startkey","endkey","key"].filter(function(t){return t in e})[0];if(n)return void t(c.error(c.QUERY_PARSE_ERROR,"Query parameter `"+n+"` is not compatible with multi-get"));if("http"!==this.type())return i(this,e,t)}return this._allDocs(e,t)}),s.prototype.changes=function(e,t){return"function"==typeof e&&(t=e,e={}),new d(this,e,t)},s.prototype.close=a.adapterFun("close",function(e){return this._closed=!0,this._close(e)}),s.prototype.info=a.adapterFun("info",function(e){var t=this;this._info(function(n,r){return n?e(n):(r.db_name=r.db_name||t._db_name,r.auto_compaction=!(!t._auto_compaction||"http"===t.type()),void e(null,r))})}),s.prototype.id=a.adapterFun("id",function(e){return this._id(e)}),s.prototype.type=function(){return"function"==typeof this._type?this._type():this.adapter},s.prototype.bulkDocs=a.adapterFun("bulkDocs",function(e,t,n){if("function"==typeof t&&(n=t,t={}),t=a.clone(t),Array.isArray(e)&&(e={docs:e}),!e||!e.docs||!Array.isArray(e.docs))return n(c.MISSING_BULK_DOCS);for(var r=0;r<e.docs.length;++r)if("object"!=typeof e.docs[r]||Array.isArray(e.docs[r]))return n(c.NOT_AN_OBJECT);return e=a.clone(e),"new_edits"in t||(t.new_edits="new_edits"in e?e.new_edits:!0),t.new_edits||"http"===this.type()||e.docs.sort(function(e,t){var n=a.compare(e._id,t._id);if(0!==n)return n;var r=e._revisions?e._revisions.start:0,o=t._revisions?t._revisions.start:0;return a.compare(r,o)}),e.docs.forEach(function(e){e._deleted&&delete e._attachments}),this._bulkDocs(e,t,this.autoCompact(function(e,r){return e?n(e):(t.new_edits||(r=r.filter(function(e){return e.error})),void n(null,r))}))}),s.prototype.registerDependentDatabase=a.adapterFun("registerDependentDatabase",function(e,t){function n(t){return t.dependentDbs=t.dependentDbs||{},t.dependentDbs[e]?!1:(t.dependentDbs[e]=!0,t)}var r={};this.__opts.db&&(r.db=this.__opts.db),this._adapter&&(r.adapter=this._adapter);var o=new this.constructor(e,r);l(this,"_local/_pouch_dependentDbs",n,function(e){return e?t(e):t(null,{db:o})})})},{"./changes":6,"./deps/errors":12,"./deps/upsert":16,"./merge":20,"./utils":25,events:33}],2:[function(e,t){(function(n,r){"use strict";function o(e){return/^_(design|local)/.test(e)?e:encodeURIComponent(e)}function i(e){return e._attachments&&Object.keys(e._attachments)?d.Promise.all(Object.keys(e._attachments).map(function(t){var n=e._attachments[t];if(n.data&&"string"!=typeof n.data){if(v)return new d.Promise(function(e){d.readAsBinaryString(n.data,function(t){n.data=d.btoa(t),e()})});n.data=n.data.toString("base64")}})):d.Promise.resolve()}function s(e,t){if(/http(s?):/.test(e)){var n=d.parseUri(e);n.remote=!0,(n.user||n.password)&&(n.auth={username:n.user,password:n.password});var r=n.path.replace(/(^\/|\/$)/g,"").split("/");if(n.db=r.pop(),n.path=r.join("/"),t=t||{},t=d.clone(t),n.headers=t.headers||{},t.auth||n.auth){var o=t.auth||n.auth,i=d.btoa(o.username+":"+o.password);n.headers.Authorization="Basic "+i}return t.headers&&(n.headers=t.headers),n}return{host:"",path:"/",db:e,auth:!1}}function a(e,t){return u(e,e.db+"/"+t)}function u(e,t){if(e.remote){var n=e.path?"/":"";return e.protocol+"://"+e.host+":"+e.port+"/"+e.path+n+t}return"/"+t}function c(e,t){function n(e,t){var n=d.extend({},_,e);return p(n.method+" "+n.url),d.ajax(n,t)}function c(e){return e.split("/").map(encodeURIComponent).join("/")}var g=this;g.getHost=e.getHost?e.getHost:s;var y=g.getHost(e.name,e),m=a(y,"");g.getUrl=function(){return m},g.getHeaders=function(){return d.clone(y.headers)};var _=e.ajax||{};e=d.clone(e);var b=function(){n({headers:y.headers,method:"PUT",url:m},function(e){e&&401===e.status?n({headers:y.headers,method:"HEAD",url:m},function(e){e?t(e):t(null,g)}):e&&412!==e.status?t(e):t(null,g)})};e.skipSetup||n({headers:y.headers,method:"GET",url:m},function(e){e?404===e.status?(d.explain404("PouchDB is just detecting if the remote DB exists."),b()):t(e):t(null,g)}),g.type=function(){return"http"},g.id=d.adapterFun("id",function(e){n({headers:y.headers,method:"GET",url:u(y,"")},function(t,n){var r=n&&n.uuid?n.uuid+y.db:a(y,"");e(null,r)})}),g.request=d.adapterFun("request",function(e,t){e.headers=y.headers,e.url=a(y,e.url),n(e,t)}),g.compact=d.adapterFun("compact",function(e,t){"function"==typeof e&&(t=e,e={}),e=d.clone(e),n({headers:y.headers,url:a(y,"_compact"),method:"POST"},function(){function n(){g.info(function(r,o){o.compact_running?setTimeout(n,e.interval||200):t()})}"function"==typeof t&&n()})}),g._info=function(e){n({headers:y.headers,method:"GET",url:a(y,"")},function(t,n){t?e(t):(n.host=a(y,""),e(null,n))})},g.get=d.adapterFun("get",function(e,t,r){"function"==typeof t&&(r=t,t={}),t=d.clone(t),void 0===t.auto_encode&&(t.auto_encode=!0);var i=[];t.revs&&i.push("revs=true"),t.revs_info&&i.push("revs_info=true"),t.local_seq&&i.push("local_seq=true"),t.open_revs&&("all"!==t.open_revs&&(t.open_revs=JSON.stringify(t.open_revs)),i.push("open_revs="+t.open_revs)),t.attachments&&i.push("attachments=true"),t.rev&&i.push("rev="+t.rev),t.conflicts&&i.push("conflicts="+t.conflicts),i=i.join("&"),i=""===i?"":"?"+i,t.auto_encode&&(e=o(e));var s={headers:y.headers,method:"GET",url:a(y,e+i)},u=e.split("/");(u.length>1&&"_design"!==u[0]&&"_local"!==u[0]||u.length>2&&"_design"===u[0]&&"_local"!==u[0])&&(s.binary=!0),n(s,function(e,t,n){return e?r(e):void r(null,t,n)})}),g.remove=d.adapterFun("remove",function(e,t,r,i){var s;"string"==typeof t?(s={_id:e,_rev:t},"function"==typeof r&&(i=r,r={})):(s=e,"function"==typeof t?(i=t,r={}):(i=r,r=t));var u=s._rev||r.rev;n({headers:y.headers,method:"DELETE",url:a(y,o(s._id))+"?rev="+u},i)}),g.getAttachment=d.adapterFun("getAttachment",function(e,t,n,r){"function"==typeof n&&(r=n,n={}),n=d.clone(n),void 0===n.auto_encode&&(n.auto_encode=!0),n.auto_encode&&(e=o(e)),n.auto_encode=!1,g.get(e+"/"+c(t),n,r)}),g.removeAttachment=d.adapterFun("removeAttachment",function(e,t,r,i){var s=a(y,o(e)+"/"+c(t))+"?rev="+r;n({headers:y.headers,method:"DELETE",url:s},i)}),g.putAttachment=d.adapterFun("putAttachment",function(e,t,i,s,u,f){"function"==typeof u&&(f=u,u=s,s=i,i=null),"undefined"==typeof u&&(u=s,s=i,i=null);var l=o(e)+"/"+c(t),p=a(y,l);if(i&&(p+="?rev="+i),"string"==typeof s){var g;try{g=d.atob(s)}catch(m){return f(d.extend({},h.BAD_ARG,{reason:"Attachments need to be base64 encoded"}))}s=v?d.createBlob([d.fixBinary(g)],{type:u}):g?new r(g,"binary"):""}var _={headers:d.clone(y.headers),method:"PUT",url:p,processData:!1,body:s,timeout:6e4};_.headers["Content-Type"]=u,n(_,f)}),g.put=d.adapterFun("put",d.getArguments(function(e){var t,r,s,u=e.shift(),c="_id"in u,f=e.pop();return"object"!=typeof u||Array.isArray(u)?f(h.NOT_AN_OBJECT):(u=d.clone(u),void i(u).then(function(){for(;;)if(t=e.shift(),r=typeof t,"string"!==r||c?"string"!==r||!c||"_rev"in u?"object"===r&&(s=d.clone(t)):u._rev=t:(u._id=t,c=!0),!e.length)break;s=s||{};var i=d.invalidIdError(u._id);if(i)throw i;var l=[];s&&"undefined"!=typeof s.new_edits&&l.push("new_edits="+s.new_edits),l=l.join("&"),""!==l&&(l="?"+l),n({headers:y.headers,method:"PUT",url:a(y,o(u._id))+l,body:u},function(e,t){return e?f(e):(t.ok=!0,void f(null,t))})})["catch"](f))})),g.post=d.adapterFun("post",function(e,t,n){return"function"==typeof t&&(n=t,t={}),t=d.clone(t),"object"!=typeof e?n(h.NOT_AN_OBJECT):("_id"in e||(e._id=d.uuid()),void g.put(e,t,function(e,t){return e?n(e):(t.ok=!0,void n(null,t))}))}),g._bulkDocs=function(e,t,r){"undefined"!=typeof t.new_edits&&(e.new_edits=t.new_edits),d.Promise.all(e.docs.map(i)).then(function(){n({headers:y.headers,method:"POST",url:a(y,"_bulk_docs"),body:e},function(e,t){return e?r(e):(t.forEach(function(e){e.ok=!0}),void r(null,t))})})["catch"](r)},g.allDocs=d.adapterFun("allDocs",function(e,t){"function"==typeof e&&(t=e,e={}),e=d.clone(e);var r,o=[],i="GET";if(e.conflicts&&o.push("conflicts=true"),e.descending&&o.push("descending=true"),e.include_docs&&o.push("include_docs=true"),e.attachments&&o.push("attachments=true"),e.key&&o.push("key="+encodeURIComponent(JSON.stringify(e.key))),e.startkey&&o.push("startkey="+encodeURIComponent(JSON.stringify(e.startkey))),e.endkey&&o.push("endkey="+encodeURIComponent(JSON.stringify(e.endkey))),"undefined"!=typeof e.inclusive_end&&o.push("inclusive_end="+!!e.inclusive_end),"undefined"!=typeof e.limit&&o.push("limit="+e.limit),"undefined"!=typeof e.skip&&o.push("skip="+e.skip),o=o.join("&"),""!==o&&(o="?"+o),"undefined"!=typeof e.keys){var s="keys="+encodeURIComponent(JSON.stringify(e.keys));s.length+o.length+1<=l?o+=(-1!==o.indexOf("?")?"&":"?")+s:(i="POST",r=JSON.stringify({keys:e.keys}))}n({headers:y.headers,method:i,url:a(y,"_all_docs"+o),body:r},t)}),g._changes=function(e){var t="batch_size"in e?e.batch_size:f;e=d.clone(e),e.timeout=e.timeout||3e4;var r={timeout:e.timeout-5e3},o="undefined"!=typeof e.limit?e.limit:!1;0===o&&(o=1);var i;i="returnDocs"in e?e.returnDocs:!0;var s=o;if(e.style&&(r.style=e.style),(e.include_docs||e.filter&&"function"==typeof e.filter)&&(r.include_docs=!0),e.attachments&&(r.attachments=!0),e.continuous&&(r.feed="longpoll"),e.conflicts&&(r.conflicts=!0),e.descending&&(r.descending=!0),e.filter&&"string"==typeof e.filter&&(r.filter=e.filter,"_view"===e.filter&&e.view&&"string"==typeof e.view&&(r.view=e.view)),e.query_params&&"object"==typeof e.query_params)for(var u in e.query_params)e.query_params.hasOwnProperty(u)&&(r[u]=e.query_params[u]);var c,p="GET";if(e.doc_ids){r.filter="_doc_ids";var v=JSON.stringify(e.doc_ids);v.length<l?r.doc_ids=v:(p="POST",c={doc_ids:e.doc_ids})}if(e.continuous&&g._useSSE)return g.sse(e,r,i);var m,_,b=function(i,u){if(!e.aborted){r.since=i,e.descending?o&&(r.limit=s):r.limit=!o||s>t?t:s;var f="?"+Object.keys(r).map(function(e){return e+"="+r[e]}).join("&"),l={headers:y.headers,method:p,url:a(y,"_changes"+f),timeout:e.timeout,body:c};_=i,e.aborted||(m=n(l,u))}},w=10,E=0,S={results:[]},A=function(n,r){if(!e.aborted){var a=0;if(r&&r.results){a=r.results.length,S.last_seq=r.last_seq;var u={};u.query=e.query_params,r.results=r.results.filter(function(t){s--;var n=d.filterChange(e)(t);return n&&(i&&S.results.push(t),d.call(e.onChange,t)),n})}else if(n)return e.aborted=!0,void d.call(e.complete,n);r&&r.last_seq&&(_=r.last_seq);var c=o&&0>=s||r&&t>a||e.descending;if((!e.continuous||o&&0>=s)&&c)d.call(e.complete,null,S);else{n?E+=1:E=0;var f=1<<E,l=w*f,p=e.maximumWait||3e4;if(l>p)return void d.call(e.complete,n||h.UNKNOWN_ERROR);setTimeout(function(){b(_,A)},l)}}};return b(e.since||0,A),{cancel:function(){e.aborted=!0,m&&m.abort()}}},g.sse=function(e,t,n){function r(t){var r=JSON.parse(t.data);n&&c.results.push(r),c.last_seq=r.seq,d.call(e.onChange,r)}function o(t){return u.removeEventListener("message",r,!1),l===!1?(g._useSSE=!1,void(f=g._changes(e))):(u.close(),void d.call(e.complete,t))}t.feed="eventsource",t.since=e.since||0,t.limit=e.limit,delete t.timeout;var i="?"+Object.keys(t).map(function(e){return e+"="+t[e]}).join("&"),s=a(y,"_changes"+i),u=new EventSource(s),c={results:[],last_seq:!1},f=!1,l=!1;return u.addEventListener("message",r,!1),u.onopen=function(){l=!0},u.onerror=o,{cancel:function(){return f?f.cancel():(u.removeEventListener("message",r,!1),void u.close())}}},g._useSSE=!1,g.revsDiff=d.adapterFun("revsDiff",function(e,t,r){"function"==typeof t&&(r=t,t={}),n({headers:y.headers,method:"POST",url:a(y,"_revs_diff"),body:JSON.stringify(e)},r)}),g._close=function(e){e()},g.destroy=d.adapterFun("destroy",function(e){n({url:a(y,""),method:"DELETE",headers:y.headers},function(t,n){t?(g.emit("error",t),e(t)):(g.emit("destroyed"),e(null,n))})})}var f=25,l=1800,d=e("../utils"),h=e("../deps/errors"),p=e("debug")("pouchdb:http"),v="undefined"==typeof n||n.browser;c.destroy=d.toPromise(function(e,t,n){var r=s(e,t);t=t||{},"function"==typeof t&&(n=t,t={}),t=d.clone(t),t.headers=r.headers,t.method="DELETE",t.url=a(r,"");var o=t.ajax||{};t=d.extend({},t,o),d.ajax(t,n)}),c.valid=function(){return!0},t.exports=c}).call(this,e("_process"),e("buffer").Buffer)},{"../deps/errors":12,"../utils":25,_process:34,buffer:29,debug:35}],3:[function(e,t){(function(n,r){"use strict";function o(e,t,n){try{e.apply(t,n)}catch(r){window.PouchDB&&window.PouchDB.emit("error",r)}}function i(){if(!q.running&&q.queue.length){q.running=!0;var e=q.queue.shift();e.action(function(t,r){o(e.callback,this,[t,r]),q.running=!1,n.nextTick(i)})}}function s(e){return function(t){var n=t.target&&t.target.error&&t.target.error.name||t.target;e(m.error(m.IDB_ERROR,n,t.type))}}function a(e,t,n){var r={data:_.stringify(e)};return r.winningRev=t,r.deletedOrLocal=n?"1":"0",r.id=e.id,r}function u(e){if(!e)return null;if(!e.data)return e;var t=_.parse(e.data);return t.winningRev=e.winningRev,t.deletedOrLocal="1"===e.deletedOrLocal,t}function c(e,t,n,r){n?e?"string"!=typeof e?g.readAsBinaryString(e,function(e){r(g.btoa(e))}):r(e):r(""):e?"string"!=typeof e?r(e):(e=g.fixBinary(atob(e)),r(g.createBlob([e],{type:t}))):r(g.createBlob([""],{type:t}))}function f(e,t,n,r){function o(){++a===s.length&&r&&r()}function i(e,t){var r=e._attachments[t],i=r.digest;n.objectStore(S).get(i).onsuccess=function(e){r.body=e.target.result.body,o()}}var s=Object.keys(e._attachments||{});if(!s.length)return r&&r();var a=0;s.forEach(function(n){t.attachments&&t.include_docs?i(e,n):(e._attachments[n].stub=!0,o())})}function l(e){return g.Promise.all(e.map(function(e){if(e.doc&&e.doc._attachments){var t=Object.keys(e.doc._attachments);return g.Promise.all(t.map(function(t){var n=e.doc._attachments[t];if("body"in n){var r=n.body,o=n.content_type;return new g.Promise(function(i){c(r,o,!0,function(r){e.doc._attachments[t]=g.extend(g.pick(n,["digest","content_type"]),{data:r}),i()})})}}))}}))}function d(e,t){var n=this;q.queue.push({action:function(t){h(n,e,t)},callback:t}),i()}function h(e,t,o){function i(e){var t=e.createObjectStore(w,{keyPath:"id"});t.createIndex("seq","seq",{unique:!0}),e.createObjectStore(E,{autoIncrement:!0}).createIndex("_doc_id_rev","_doc_id_rev",{unique:!0}),e.createObjectStore(S,{keyPath:"digest"}),e.createObjectStore(k,{keyPath:"id",autoIncrement:!1}),e.createObjectStore(x),t.createIndex("deletedOrLocal","deletedOrLocal",{unique:!1}),e.createObjectStore(T,{keyPath:"_id"});var n=e.createObjectStore(A,{autoIncrement:!0});n.createIndex("seq","seq"),n.createIndex("digestSeq","digestSeq",{unique:!0})}function h(e,t){var n=e.objectStore(w);n.createIndex("deletedOrLocal","deletedOrLocal",{unique:!1}),n.openCursor().onsuccess=function(e){var r=e.target.result;if(r){var o=r.value,i=g.isDeleted(o);o.deletedOrLocal=i?"1":"0",n.put(o),r["continue"]()}else t()}}function p(e){e.createObjectStore(T,{keyPath:"_id"}).createIndex("_doc_id_rev","_doc_id_rev",{unique:!0})}function _(e,t){var n=e.objectStore(T),o=e.objectStore(w),i=e.objectStore(E),s=o.openCursor();s.onsuccess=function(e){var s=e.target.result;if(s){var a=s.value,u=a.id,c=g.isLocalId(u),f=y.winningRev(a);if(c){var l=u+"::"+f,d=u+"::",h=u+"::~",p=i.index("_doc_id_rev"),v=r.IDBKeyRange.bound(d,h,!1,!1),m=p.openCursor(v);m.onsuccess=function(e){if(m=e.target.result){var t=m.value;t._doc_id_rev===l&&n.put(t),i["delete"](m.primaryKey),m["continue"]()}else o["delete"](s.primaryKey),s["continue"]()}}else s["continue"]()}else t&&t()}}function q(e){var t=e.createObjectStore(A,{autoIncrement:!0});t.createIndex("seq","seq"),t.createIndex("digestSeq","digestSeq",{unique:!0})}function R(e){var t=e.objectStore(E),n=e.objectStore(S),r=e.objectStore(A),o=n.count();o.onsuccess=function(e){var n=e.target.result;n&&(t.openCursor().onsuccess=function(e){var t=e.target.result;if(t){for(var n=t.value,o=t.primaryKey,i=Object.keys(n._attachments||{}),s={},a=0;a<i.length;a++){var u=n._attachments[i[a]];s[u.digest]=!0}var c=Object.keys(s);for(a=0;a<c.length;a++){var f=c[a];r.put({seq:o,digestSeq:f+"::"+o})}t["continue"]()}})}}function O(e,t,n){function o(){n(null,{total_rows:e,offset:t.skip,rows:I})}var i="startkey"in t?t.startkey:!1,s="endkey"in t?t.endkey:!1,a="key"in t?t.key:!1,c=t.skip||0,d="number"==typeof t.limit?t.limit:-1,h=t.inclusive_end!==!1,p="descending"in t&&t.descending?"prev":null,v=!1;p&&i&&s&&(v=s,s=!1);var _=null;try{i&&s?_=r.IDBKeyRange.bound(i,s,!1,!h):i?_=p?r.IDBKeyRange.upperBound(i):r.IDBKeyRange.lowerBound(i):s?_=p?r.IDBKeyRange.lowerBound(s,!h):r.IDBKeyRange.upperBound(s,!h):a&&(_=r.IDBKeyRange.only(a))}catch(b){return"DataError"===b.name&&0===b.code?n(null,{total_rows:e,offset:t.skip,rows:[]}):n(m.error(m.IDB_ERROR,b.name,b.message))}var A=[w,E];t.attachments&&A.push(S);var k=B.transaction(A,"readonly");k.oncomplete=function(){t.attachments?l(I).then(o):o()};var T=k.objectStore(w),x=p?T.openCursor(_,p):T.openCursor(_),I=[];x.onsuccess=function(e){function n(e,n){var o={id:e.id,key:e.id,value:{rev:i}};t.include_docs&&(o.doc=n,o.doc._rev=i,o.doc._doc_id_rev&&delete o.doc._doc_id_rev,t.conflicts&&(o.doc._conflicts=y.collectConflicts(e)),f(o.doc,t,k));var s=g.isDeleted(e,i);if("ok"===t.deleted)s&&(o.value.deleted=!0,o.doc=null),I.push(o);else if(!s&&c--<=0){if(v){if(h&&o.key<v)return;if(!h&&o.key<=v)return}if(I.push(o),0===--d)return}r["continue"]()}if(e.target.result){var r=e.target.result,o=u(r.value),i=o.winningRev||y.winningRev(o);if(t.include_docs){var s=k.objectStore(E).index("_doc_id_rev"),a=o.id+"::"+i;s.get(a).onsuccess=function(e){n(u(r.value),e.target.result)}}else n(o)}}}function D(e){if(-1!==P)return e(null,P);var t,n=B.transaction([w],"readonly"),o=n.objectStore(w).index("deletedOrLocal");o.count(r.IDBKeyRange.only("0")).onsuccess=function(e){t=e.target.result},n.onerror=s(e),n.oncomplete=function(){P=t,e(null,P)}}var C=t.name,N=null,j=!1,B=null,P=-1;e.type=function(){return"idb"},e._id=g.toPromise(function(e){e(null,N)}),e._bulkDocs=function(t,n,r){function o(){g.processDocs(_,e,q,x,I,h,n)}function i(e){function t(){++n===_.length&&e()}if(!_.length)return e();var n=0;_.forEach(function(e){if(e._id&&g.isLocalId(e._id))return t();var n=e.metadata.id,r=x.objectStore(w).get(n);r.onsuccess=function(e){var r=u(e.target.result);r&&q.set(n,r),t()}})}function c(){if(!R){var e=I.map(function(e){if(!Object.keys(e).length)return{ok:!0};if(e.error)return e;var t=e.metadata,n=y.winningRev(t);return{ok:!0,id:t.id,rev:n}});d.Changes.notify(C),P=-1,r(null,e)}}function f(e,t){var n=x.objectStore([S]).get(e);n.onsuccess=function(n){if(n.target.result)t();else{var r=new Error("unknown stub attachment with digest "+e);r.status=412,t(r)}}}function l(e){function t(){++o===n.length&&e(r)}var n=[];if(_.forEach(function(e){e.data&&e.data._attachments&&Object.keys(e.data._attachments).forEach(function(t){var r=e.data._attachments[t];r.stub&&n.push(r.digest)})}),!n.length)return e();var r,o=0;n.forEach(function(e){f(e,function(e){e&&!r&&(r=e),t()})})}function h(e,t,n,r,o,i){function s(e){l||(e?(l=e,r(l)):d===m.length&&f())}function u(e){d++,s(e)}function c(t,n){function r(){++i===s.length&&n()}function o(n){var o=e.data._attachments[n].digest,i=x.objectStore(A).put({seq:t,digestSeq:o+"::"+t});i.onsuccess=r,i.onerror=function(e){e.preventDefault(),e.stopPropagation(),r()}}var i=0,s=Object.keys(e.data._attachments||{});if(!s.length)return n();for(var a=0;a<s.length;a++)o(s[a])}function f(){function o(o){var s=e.metadata,u=o.target.result;s.seq=u,delete s.rev;var f=a(s,t,n),l=x.objectStore(w).put(f);l.onsuccess=function(){delete s.deletedOrLocal,delete s.winningRev,I[i]=e,q.set(e.metadata.id,e.metadata),c(u,function(){g.call(r)})}}e.data._doc_id_rev=y;var s=x.objectStore(E),u=s.index("_doc_id_rev"),f=s.put(e.data);f.onsuccess=o,f.onerror=function(t){t.preventDefault(),t.stopPropagation();var n=u.getKey(e.data._doc_id_rev);n.onsuccess=function(t){var n=s.put(e.data,t.target.result);n.onsuccess=o}}}var l=null,d=0,h=e.data._id=e.metadata.id,v=e.data._rev=e.metadata.rev,y=h+"::"+v;n&&(e.data._deleted=!0);var m=e.data._attachments?Object.keys(e.data._attachments):[];for(var _ in e.data._attachments)if(e.data._attachments[_].stub)d++,s();else{var b=e.data._attachments[_].data;delete e.data._attachments[_].data;var S=e.data._attachments[_].digest;p(S,b,u)}m.length||f()}function p(e,t,n){var r=x.objectStore(S);r.get(e).onsuccess=function(o){var i=o.target.result;if(i)return g.call(n);var s={digest:e,body:t};r.put(s).onsuccess=function(){g.call(n)}}}var v=n.new_edits,m=t.docs,_=m.map(function(e){if(e._id&&g.isLocalId(e._id))return e;var t=g.parseDoc(e,v);return t}),b=_.filter(function(e){return e.error});if(b.length)return r(b[0]);var x,I=new Array(_.length),q=new g.Map,R=!1,O=L?"blob":"base64";g.preprocessAttachments(_,O,function(e){if(e)return r(e);var t=[w,E,S,k,T,A];x=B.transaction(t,"readwrite"),x.onerror=s(r),x.ontimeout=s(r),x.oncomplete=c,l(function(e){return e?(R=!0,r(e)):void i(o)})})},e._get=function(e,t,n){function r(){n(s,{doc:o,metadata:i,ctx:a})}var o,i,s,a;t=g.clone(t),a=t.ctx?t.ctx:B.transaction([w,E,S],"readonly"),a.objectStore(w).get(e).onsuccess=function(e){if(i=u(e.target.result),!i)return s=m.MISSING_DOC,r();if(g.isDeleted(i)&&!t.rev)return s=m.error(m.MISSING_DOC,"deleted"),r();var n=a.objectStore(E),c=t.rev||i.winningRev||y.winningRev(i),f=i.id+"::"+c;n.index("_doc_id_rev").get(f).onsuccess=function(e){return o=e.target.result,o&&o._doc_id_rev&&delete o._doc_id_rev,o?void r():(s=m.MISSING_DOC,r())}}},e._getAttachment=function(e,t,n){var r;t=g.clone(t),r=t.ctx?t.ctx:B.transaction([w,E,S],"readonly");var o=e.digest,i=e.content_type;r.objectStore(S).get(o).onsuccess=function(e){var r=e.target.result.body;c(r,i,t.encode,function(e){n(null,e)})}},e._allDocs=function(e,t){D(function(n,r){return n?t(n):0===e.limit?t(null,{total_rows:r,offset:e.skip,rows:[]}):void O(r,e,t)})},e._info=function(e){D(function(t,n){if(t)return e(t);if(null===B){var r=new Error("db isn't open");return r.id="idbNull",e(r)}var o=0,i=B.transaction([E],"readonly");i.objectStore(E).openCursor(null,"prev").onsuccess=function(e){var t=e.target.result;o=t?t.key:0},i.oncomplete=function(){e(null,{doc_count:n,update_seq:o})}})},e._changes=function(t){function n(){var e=[w,E];t.attachments&&e.push(S),_=B.transaction(e,"readonly"),_.onerror=s(t.complete),_.oncomplete=i;var n;n=h?_.objectStore(E).openCursor(r.IDBKeyRange.lowerBound(t.since,!0),h):_.objectStore(E).openCursor(r.IDBKeyRange.lowerBound(t.since,!0)),n.onsuccess=o,n.onerror=onerror}function o(e){var n=e.target.result;if(n){var r=n.value;if(c&&!c.has(r._id))return n["continue"]();var o=_.objectStore(w);o.get(r._id).onsuccess=function(e){var o=u(e.target.result);p<o.seq&&(p=o.seq);var i=o.winningRev||y.winningRev(o);if(r._rev!==i)return n["continue"]();delete r._doc_id_rev;var s=t.processChange(r,o,t);s.seq=n.key,k(s)&&(A++,m&&b.push(s),t.attachments&&t.include_docs?f(r,t,_,function(){l([s]).then(function(){t.onChange(s)})}):t.onChange(s)),A!==v&&n["continue"]()}}}function i(){function e(){t.complete(null,{results:b,last_seq:p})}t.continuous||(t.attachments?l(b).then(e):e())}if(t=g.clone(t),t.continuous){var a=C+":"+g.uuid();return d.Changes.addListener(C,a,e,t),d.Changes.notify(C),{cancel:function(){d.Changes.removeListener(C,a)}}}var c=t.doc_ids&&new g.Set(t.doc_ids),h=t.descending?"prev":null,p=0;t.since=t.since&&!h?t.since:0;var v="limit"in t?t.limit:-1;0===v&&(v=1);var m;m="returnDocs"in t?t.returnDocs:!0;var _,b=[],A=0,k=g.filterChange(t);n()},e._close=function(e){return null===B?e(m.NOT_OPEN):(B.close(),delete I[C],B=null,void e())
},e._getRevisionTree=function(e,t){var n=B.transaction([w],"readonly"),r=n.objectStore(w).get(e);r.onsuccess=function(e){var n=u(e.target.result);n?t(null,n.rev_tree):t(m.MISSING_DOC)}},e._doCompaction=function(e,t,n){function o(){h.length&&h.forEach(function(e){var t=d.index("digestSeq").count(r.IDBKeyRange.bound(e+"::",e+"::￿",!1,!1));t.onsuccess=function(t){var n=t.target.result;n||l["delete"](e)}})}var i=B.transaction([w,E,S,A],"readwrite"),c=i.objectStore(w),f=i.objectStore(E),l=i.objectStore(S),d=i.objectStore(A),h=[];c.get(e).onsuccess=function(n){var s=u(n.target.result);y.traverseRevTree(s.rev_tree,function(e,n,r,o,i){var s=n+"-"+r;-1!==t.indexOf(s)&&(i.status="missing")});var c=t.length;t.forEach(function(t){var n=f.index("_doc_id_rev"),u=e+"::"+t;n.getKey(u).onsuccess=function(e){var t=e.target.result;if("number"==typeof t){f["delete"](t);var n=d.index("seq").openCursor(r.IDBKeyRange.only(t));n.onsuccess=function(e){var t=e.target.result;if(t){var n=t.value.digestSeq.split("::")[0];h.push(n),d["delete"](t.primaryKey),t["continue"]()}else if(c--,!c){var r=s.winningRev||y.winningRev(s),u=s.deletedOrLocal;i.objectStore(w).put(a(s,r,u)),o()}}}}})},i.onerror=s(n),i.oncomplete=function(){g.call(n)}},e._getLocal=function(e,t){var n=B.transaction([T],"readonly"),r=n.objectStore(T).get(e);r.onerror=s(t),r.onsuccess=function(e){var n=e.target.result;n?(delete n._doc_id_rev,t(null,n)):t(m.MISSING_DOC)}},e._putLocal=function(e,t,n){"function"==typeof t&&(n=t,t={}),delete e._revisions;var r=e._rev,o=e._id;e._rev=r?"0-"+(parseInt(r.split("-")[1],10)+1):"0-1";var i,a=t.ctx;a||(a=B.transaction([T],"readwrite"),a.onerror=s(n),a.oncomplete=function(){i&&n(null,i)});var u,c=a.objectStore(T);r?(u=c.get(o),u.onsuccess=function(o){var s=o.target.result;if(s&&s._rev===r){var a=c.put(e);a.onsuccess=function(){i={ok:!0,id:e._id,rev:e._rev},t.ctx&&n(null,i)}}else n(m.REV_CONFLICT)}):(u=c.add(e),u.onerror=function(e){n(m.REV_CONFLICT),e.preventDefault(),e.stopPropagation()},u.onsuccess=function(){i={ok:!0,id:e._id,rev:e._rev},t.ctx&&n(null,i)})},e._removeLocal=function(e,t){var n,r=B.transaction([T],"readwrite");r.oncomplete=function(){n&&t(null,n)};var o=e._id,i=r.objectStore(T),a=i.get(o);a.onerror=s(t),a.onsuccess=function(r){var s=r.target.result;s&&s._rev===e._rev?(i["delete"](o),n={ok:!0,id:o,rev:"0-0"}):t(m.MISSING_DOC)}};var U=I[C];if(U)return B=U.idb,N=U.instanceId,j=U.idStored,void n.nextTick(function(){o(null,e)});var F=r.indexedDB.open(C,b);"openReqList"in d||(d.openReqList={}),d.openReqList[C]=F,F.onupgradeneeded=function(e){var t=e.target.result;if(e.oldVersion<1)return void i(t);var n=e.currentTarget.transaction;e.oldVersion<4&&(q(t),e.oldVersion<3?(p(t),e.oldVersion<2?h(n,function(){_(n,function(){R(n)})}):_(n,function(){R(n)})):R(n))},F.onsuccess=function(t){B=t.target.result,B.onversionchange=function(){B.close(),delete I[C]},B.onabort=function(){B.close(),delete I[C]};var n=B.transaction([k,x],"readwrite"),r=n.objectStore(k).get(k);r.onsuccess=function(t){var r=function(){null!==L&&j&&(I[C]={idb:B,instanceId:N,idStored:j,loaded:!0},o(null,e))},i=t.target.result||{id:k};C+"_id"in i?(N=i[C+"_id"],j=!0,r()):(N=g.uuid(),i[C+"_id"]=N,n.objectStore(k).put(i).onsuccess=function(){j=!0,r()}),v||(v=new g.Promise(function(e){var t=g.createBlob([""],{type:"image/png"});n.objectStore(x).put(t,"key"),n.oncomplete=function(){n=B.transaction([k,x],"readwrite");var t=n.objectStore(x).get("key");t.onsuccess=function(t){var n=t.target.result,r=URL.createObjectURL(n);g.ajax({url:r,cache:!0,binary:!0},function(t,n){t&&405===t.status?e(!0):(e(!(!n||"image/png"!==n.type)),t&&404===t.status&&g.explain404("PouchDB is just detecting blob URL support.")),URL.revokeObjectURL(r)})}}})["catch"](function(){L=!1,r()})),v.then(function(e){L=e,r()})}},F.onerror=s(o)}function p(e,t,n){"openReqList"in d||(d.openReqList={}),d.Changes.removeAllListeners(e),d.openReqList[e]&&d.openReqList[e].result&&d.openReqList[e].result.close();var o=r.indexedDB.deleteDatabase(e);o.onsuccess=function(){d.openReqList[e]&&(d.openReqList[e]=null),g.hasLocalStorage()&&e in r.localStorage&&delete r.localStorage[e],delete I[e],n(null,{ok:!0})},o.onerror=s(n)}var v,g=e("../utils"),y=e("../merge"),m=e("../deps/errors"),_=e("vuvuzela"),b=4,w="document-store",E="by-sequence",S="attach-store",A="attach-seq-store",k="meta-store",T="local-store",x="detect-blob-support",I={},q={running:!1,queue:[]},L=null;d.valid=function(){var e="undefined"!=typeof openDatabase&&/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent);return!e&&r.indexedDB&&r.IDBKeyRange},d.destroy=g.toPromise(function(e,t,n){q.queue.push({action:function(n){p(e,t,n)},callback:n}),i()}),d.Changes=new g.Changes,t.exports=d}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../deps/errors":12,"../merge":20,"../utils":25,_process:34,vuvuzela:67}],4:[function(e,t){t.exports=["idb","websql"]},{}],5:[function(e,t){(function(n){"use strict";function r(e){return"'"+e+"'"}function o(e){return e.replace(/\u0002/g,"").replace(/\u0001/g,"").replace(/\u0000/g,"")}function i(e){return e.replace(/\u0001\u0001/g,"\x00").replace(/\u0001\u0002/g,"").replace(/\u0002\u0002/g,"")}function s(e,t,n,r,o){function i(){++u===a.length&&o&&o()}function s(e,t){var o=e._attachments[t],s={encode:!0,ctx:r};n._getAttachment(o,s,function(n,r){e._attachments[t]=h.extend(h.pick(o,["digest","content_type"]),{data:r}),i()})}var a=Object.keys(e._attachments||{});if(!a.length)return o&&o();var u=0;a.forEach(function(n){t.attachments&&t.include_docs?s(e,n):(e._attachments[n].stub=!0,i())})}function a(e,t,n,r,o){return"SELECT "+e+" FROM "+("string"==typeof t?t:t.join(" JOIN "))+(n?" ON "+n:"")+(r?" WHERE "+("string"==typeof r?r:r.join(" AND ")):"")+(o?" ORDER BY "+o:"")}function u(e){return function(t){var n=t&&t.constructor.toString().match(/function ([^\(]+)/),r=n&&n[1]||t.type,o=t.target||t.message;e(v.error(v.WSQ_ERROR,o,r))}}function c(e){return delete e._id,delete e._rev,JSON.stringify(e)}function f(e,t,n){return e=JSON.parse(e),e._id=t,e._rev=n,e}function l(e){if("size"in e)return 1e6*e.size;var t=/Android/.test(window.navigator.userAgent);return t?5e6:1}function d(e,t){function r(){h.hasLocalStorage()&&(n.localStorage["_pouch__websqldb_"+K]=!0),t(null,H)}function m(e,t){e.executeSql(L),e.executeSql("ALTER TABLE "+S+" ADD COLUMN deleted TINYINT(1) DEFAULT 0",[],function(){e.executeSql(I),e.executeSql("ALTER TABLE "+E+" ADD COLUMN local TINYINT(1) DEFAULT 0",[],function(){e.executeSql("CREATE INDEX IF NOT EXISTS 'doc-store-local-idx' ON "+E+" (local, id)");var n="SELECT "+E+".winningseq AS seq, "+E+".json AS metadata FROM "+S+" JOIN "+E+" ON "+S+".seq = "+E+".winningseq";e.executeSql(n,[],function(e,n){for(var r=[],o=[],i=0;i<n.rows.length;i++){var s=n.rows.item(i),a=s.seq,u=JSON.parse(s.metadata);h.isDeleted(u)&&r.push(a),h.isLocalId(u.id)&&o.push(u.id)}e.executeSql("UPDATE "+E+"SET local = 1 WHERE id IN ("+o.map(function(){return"?"}).join(",")+")",o,function(){e.executeSql("UPDATE "+S+" SET deleted = 1 WHERE seq IN ("+r.map(function(){return"?"}).join(",")+")",r,t)})})})})}function N(e,t){var n="CREATE TABLE IF NOT EXISTS "+k+" (id UNIQUE, rev, json)";e.executeSql(n,[],function(){var n="SELECT "+E+".id AS id, "+S+".json AS data FROM "+S+" JOIN "+E+" ON "+S+".seq = "+E+".winningseq WHERE local = 1";e.executeSql(n,[],function(e,n){function r(){if(!o.length)return t(e);var n=o.shift(),i=JSON.parse(n.data)._rev;e.executeSql("INSERT INTO "+k+" (id, rev, json) VALUES (?,?,?)",[n.id,i,n.data],function(e){e.executeSql("DELETE FROM "+E+" WHERE id=?",[n.id],function(e){e.executeSql("DELETE FROM "+S+" WHERE seq=?",[n.seq],function(){r()})})})}for(var o=[],i=0;i<n.rows.length;i++)o.push(n.rows.item(i));r()})})}function j(e,t){function n(n){function r(){if(!n.length)return t(e);var o=n.shift(),i=y(o.hex,V),s=i.lastIndexOf("::"),a=i.substring(0,s),u=i.substring(s+2),c="UPDATE "+S+" SET doc_id=?, rev=? WHERE doc_id_rev=?";e.executeSql(c,[a,u,i],function(){r()})}r()}var r="ALTER TABLE "+S+" ADD COLUMN doc_id";e.executeSql(r,[],function(e){var t="ALTER TABLE "+S+" ADD COLUMN rev";e.executeSql(t,[],function(e){e.executeSql(q,[],function(e){var t="SELECT hex(doc_id_rev) as hex FROM "+S;e.executeSql(t,[],function(e,t){for(var r=[],o=0;o<t.rows.length;o++)r.push(t.rows.item(o));n(r)})})})})}function B(e,t){function n(e){var n="SELECT COUNT(*) AS cnt FROM "+A;e.executeSql(n,[],function(e,n){function r(){var n=a(C+", "+E+".id AS id",[E,S],D,null,E+".id ");n+=" LIMIT "+s+" OFFSET "+i,i+=s,e.executeSql(n,[],function(e,n){function o(e,t){var n=i[e]=i[e]||[];-1===n.indexOf(t)&&n.push(t)}if(!n.rows.length)return t(e);for(var i={},s=0;s<n.rows.length;s++)for(var a=n.rows.item(s),u=f(a.data,a.id,a.rev),c=Object.keys(u._attachments||{}),l=0;l<c.length;l++){var d=u._attachments[c[l]];o(d.digest,a.seq)}var h=[];if(Object.keys(i).forEach(function(e){var t=i[e];t.forEach(function(t){h.push([e,t])})}),!h.length)return r();var p=0;h.forEach(function(t){var n="INSERT INTO "+x+" (digest, seq) VALUES (?,?)";e.executeSql(n,t,function(){++p===h.length&&r()})})})}var o=n.rows.item(0).cnt;if(!o)return t(e);var i=0,s=10;r()})}var r="CREATE TABLE IF NOT EXISTS "+x+" (digest, seq INTEGER)";e.executeSql(r,[],function(e){e.executeSql(O,[],function(e){e.executeSql(R,[],n)})})}function P(e,t){var n="ALTER TABLE "+A+" ADD COLUMN escaped TINYINT(1) DEFAULT 0";e.executeSql(n,[],t)}function U(e,t){e.executeSql('SELECT HEX("a") AS hex',[],function(e,n){var r=n.rows.item(0).hex;V=2===r.length?"UTF-8":"UTF-16",t()})}function F(){for(;X.length>0;){var e=X.pop();e(null,W)}}function M(e,t){if(0===t){var n="CREATE TABLE IF NOT EXISTS "+T+" (dbid, db_version INTEGER)",r="CREATE TABLE IF NOT EXISTS "+A+" (digest UNIQUE, escaped TINYINT(1), body BLOB)",o="CREATE TABLE IF NOT EXISTS "+x+" (digest, seq INTEGER)",i="CREATE TABLE IF NOT EXISTS "+E+" (id unique, json, winningseq)",s="CREATE TABLE IF NOT EXISTS "+S+" (seq INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, json, deleted TINYINT(1), doc_id, rev)",a="CREATE TABLE IF NOT EXISTS "+k+" (id UNIQUE, rev, json)";e.executeSql(r),e.executeSql(a),e.executeSql(o,[],function(){e.executeSql(R),e.executeSql(O)}),e.executeSql(i,[],function(){e.executeSql(L),e.executeSql(s,[],function(){e.executeSql(I),e.executeSql(q),e.executeSql(n,[],function(){var t="INSERT INTO "+T+" (db_version, dbid) VALUES (?,?)";W=h.uuid();var n=[w,W];e.executeSql(t,n,function(){F()})})})})}else{var u=function(){var n=w>t;n&&e.executeSql("UPDATE "+T+" SET db_version = "+w);var r="SELECT dbid FROM "+T;e.executeSql(r,[],function(e,t){W=t.rows.item(0).dbid,F()})},c=[m,N,j,B,P,u],f=t,l=function(e){c[f-1](e,l),f++};l(e)}}function G(){Q.transaction(function(e){U(e,function(){J(e)})},u(t),r)}function J(e){var t="SELECT sql FROM sqlite_master WHERE tbl_name = "+T;e.executeSql(t,[],function(e,t){t.rows.length?/db_version/.test(t.rows.item(0).sql)?e.executeSql("SELECT db_version FROM "+T,[],function(e,t){var n=t.rows.item(0).db_version;M(e,n)}):e.executeSql("ALTER TABLE "+T+" ADD COLUMN db_version INTEGER",[],function(){M(e,1)}):M(e,0)})}function Y(e,t){if(-1!==$)return t($);var n=a("COUNT("+E+".id) AS 'num'",[E,S],D,S+".deleted=0");e.executeSql(n,[],function(e,n){$=n.rows.item(0).num,t($)})}var V,H=this,W=null,K=e.name,z=l(e),X=[],$=-1,Q=_(K,b,K,z);return Q?("function"!=typeof Q.readTransaction&&(Q.readTransaction=Q.transaction),h.isCordova()&&"undefined"!=typeof n?n.addEventListener(K+"_pouch",function Z(){n.removeEventListener(K+"_pouch",Z,!1),G()},!1):G(),H.type=function(){return"websql"},H._id=h.toPromise(function(e){e(null,W)}),H._info=function(e){Q.readTransaction(function(t){Y(t,function(n){var r="SELECT MAX(seq) AS seq FROM "+S;t.executeSql(r,[],function(t,r){var o=r.rows.item(0).seq||0;e(null,{doc_count:n,update_seq:o})})})},u(e))},H._bulkDocs=function(e,t,n){function r(){if(T)return n(T);var e=I.map(function(e){if(!Object.keys(e).length)return{ok:!0};if(e.error)return e;var t=e.metadata,n=p.winningRev(t);return{ok:!0,id:t.id,rev:n}});d.Changes.notify(K),$=-1,n(null,e)}function i(e,t){var n="SELECT count(*) as cnt FROM "+A+" WHERE digest=?";k.executeSql(n,[e],function(n,r){if(0===r.rows.item(0).cnt){var o=new Error("unknown stub attachment with digest "+e);o.status=412,t(o)}else t()})}function s(e){function t(){++o===n.length&&e(r)}var n=[];if(b.forEach(function(e){e.data&&e.data._attachments&&Object.keys(e.data._attachments).forEach(function(t){var r=e.data._attachments[t];r.stub&&n.push(r.digest)})}),!n.length)return e();var r,o=0;n.forEach(function(e){i(e,function(e){e&&!r&&(r=e),t()})})}function f(e,t,n,r,o,i){function s(){function t(e,t){function n(){return++i===s.length&&t(),!1}function o(t){var o="INSERT INTO "+x+" (digest, seq) VALUES (?,?)",i=[r._attachments[t].digest,e];k.executeSql(o,i,n,n)}var i=0,s=Object.keys(r._attachments||{});if(!s.length)return t();for(var a=0;a<s.length;a++)o(s[a])}var r=e.data,o=n?1:0,i=r._id,s=r._rev,u=c(r),f="INSERT INTO "+S+" (doc_id, rev, json, deleted) VALUES (?, ?, ?, ?);",d=[i,s,u,o];k.executeSql(f,d,function(e,n){var r=n.insertId;t(r,function(){l(e,r)})},function(){var e=a("seq",S,null,"doc_id=? AND rev=?");return k.executeSql(e,[i,s],function(e,n){var r=n.rows.item(0).seq,a="UPDATE "+S+" SET json=?, deleted=? WHERE doc_id=? AND rev=?;",c=[u,o,i,s];e.executeSql(a,c,function(e){t(r,function(){l(e,r)})})}),!1})}function u(e){d||(e?(d=e,r(d)):h===p.length&&s())}function f(e){h++,u(e)}function l(n,s){e.metadata.seq=s,delete e.metadata.rev;var a=o?"UPDATE "+E+" SET json=?, winningseq=(SELECT seq FROM "+S+" WHERE doc_id="+E+".id AND rev=?) WHERE id=?":"INSERT INTO "+E+" (id, winningseq, json) VALUES (?, ?, ?);",u=g.stringify(e.metadata),c=e.metadata.id,f=o?[u,t,c]:[c,s,u];n.executeSql(a,f,function(){I[i]=e,q.set(c,e.metadata),r()})}var d=null,h=0;e.data._id=e.metadata.id,e.data._rev=e.metadata.rev,n&&(e.data._deleted=!0);var p=e.data._attachments?Object.keys(e.data._attachments):[];for(var v in e.data._attachments)if(e.data._attachments[v].stub)h++,u();else{var m=e.data._attachments[v].data;delete e.data._attachments[v].data;var _=e.data._attachments[v].digest;y(_,m,f)}p.length||s()}function l(){h.processDocs(b,H,q,k,I,f,t)}function v(e){function t(){++n===b.length&&e()}if(!b.length)return e();var n=0;b.forEach(function(e){if(e._id&&h.isLocalId(e._id))return t();var n=e.metadata.id;k.executeSql("SELECT json FROM "+E+" WHERE id = ?",[n],function(e,r){if(r.rows.length){var o=g.parse(r.rows.item(0).json);q.set(n,o)}t()})})}function y(e,t,n){var r="SELECT digest FROM "+A+" WHERE digest=?";k.executeSql(r,[e],function(i,s){return s.rows.length?n():(r="INSERT INTO "+A+" (digest, body, escaped) VALUES (?,?,1)",void i.executeSql(r,[e,o(t)],function(){n()},function(){return n(),!1}))})}var m=t.new_edits,_=e.docs,b=_.map(function(e){if(e._id&&h.isLocalId(e._id))return e;var t=h.parseDoc(e,m);return t}),w=b.filter(function(e){return e.error});if(w.length)return n(w[0]);var k,T,I=new Array(b.length),q=new h.Map;h.preprocessAttachments(b,"binary",function(e){return e?n(e):void Q.transaction(function(e){k=e,s(function(e){e?T=e:v(l)})},u(n),r)})},H._get=function(e,t,n){function r(){n(s,{doc:o,metadata:i,ctx:l})}t=h.clone(t);var o,i,s;if(!t.ctx)return void Q.readTransaction(function(r){t.ctx=r,H._get(e,t,n)});var u,c,l=t.ctx;t.rev?(u=a(C,[E,S],E+".id="+S+".doc_id",[S+".doc_id=?",S+".rev=?"]),c=[e,t.rev]):(u=a(C,[E,S],D,E+".id=?"),c=[e]),l.executeSql(u,c,function(e,n){if(!n.rows.length)return s=v.MISSING_DOC,r();var a=n.rows.item(0);return i=g.parse(a.metadata),a.deleted&&!t.rev?(s=v.error(v.MISSING_DOC,"deleted"),r()):(o=f(a.data,i.id,a.rev),void r())})},H._allDocs=function(e,t){var n,r=[],o="startkey"in e?e.startkey:!1,i="endkey"in e?e.endkey:!1,c="key"in e?e.key:!1,l="descending"in e?e.descending:!1,d="limit"in e?e.limit:-1,h="skip"in e?e.skip:0,v=e.inclusive_end!==!1,y=[],m=[];if(c!==!1)m.push(E+".id = ?"),y.push(c);else if(o!==!1||i!==!1){if(o!==!1&&(m.push(E+".id "+(l?"<=":">=")+" ?"),y.push(o)),i!==!1){var _=l?">":"<";v&&(_+="="),m.push(E+".id "+_+" ?"),y.push(i)}c!==!1&&(m.push(E+".id = ?"),y.push(c))}"ok"!==e.deleted&&m.push(S+".deleted = 0"),Q.readTransaction(function(t){Y(t,function(o){if(n=o,0!==d){var i=a(C,[E,S],D,m,E+".id "+(l?"DESC":"ASC"));i+=" LIMIT "+d+" OFFSET "+h,t.executeSql(i,y,function(t,n){for(var o=0,i=n.rows.length;i>o;o++){var a=n.rows.item(o),u=g.parse(a.metadata),c=f(a.data,u.id,a.rev),l=c._rev,d={id:u.id,key:u.id,value:{rev:l}};if(e.include_docs&&(d.doc=c,d.doc._rev=l,e.conflicts&&(d.doc._conflicts=p.collectConflicts(u)),s(d.doc,e,H,t)),a.deleted){if("ok"!==e.deleted)continue;d.value.deleted=!0,d.doc=null}r.push(d)}})}})},u(t),function(){t(null,{total_rows:n,offset:e.skip,rows:r})})},H._changes=function(e){function t(){var t=[E+".winningseq > "+e.since],n=[];e.doc_ids&&(t.push(E+".id IN ("+e.doc_ids.map(function(){return"?"}).join(",")+")"),n=e.doc_ids);var d=a(C,[E,S],D,t,E+".winningseq "+(r?"DESC":"ASC")),p=h.filterChange(e);e.view||e.filter||(d+=" LIMIT "+o);var v=0;Q.readTransaction(function(t){t.executeSql(d,n,function(t,n){function r(t){return function(){e.onChange(t)}}for(var a=0,u=n.rows.length;u>a;a++){var d=n.rows.item(a),h=g.parse(d.metadata);v<d.seq&&(v=d.seq);var y=f(d.data,h.id,d.rev),m=e.processChange(y,h,e);if(m.seq=d.seq,p(m)&&(l++,i&&c.push(m),e.attachments&&e.include_docs?s(y,e,H,t,r(m)):r(m)()),l===o)break}})},u(e.complete),function(){e.continuous||e.complete(null,{results:c,last_seq:v})})}if(e=h.clone(e),e.continuous){var n=K+":"+h.uuid();return d.Changes.addListener(K,n,H,e),d.Changes.notify(K),{cancel:function(){d.Changes.removeListener(K,n)}}}var r=e.descending;e.since=e.since&&!r?e.since:0;var o="limit"in e?e.limit:-1;0===o&&(o=1);var i;i="returnDocs"in e?e.returnDocs:!0;var c=[],l=0;t()},H._close=function(e){e()},H._getAttachment=function(e,t,n){var r,o=t.ctx,s=e.digest,a=e.content_type,u="SELECT escaped, CASE WHEN escaped = 1 THEN body ELSE HEX(body) END AS body FROM "+A+" WHERE digest=?";o.executeSql(u,[s],function(e,o){var s=o.rows.item(0),u=s.escaped?i(s.body):y(s.body,V);t.encode?r=btoa(u):(u=h.fixBinary(u),r=h.createBlob([u],{type:a})),n(null,r)})},H._getRevisionTree=function(e,t){Q.readTransaction(function(n){var r="SELECT json AS metadata FROM "+E+" WHERE id = ?";n.executeSql(r,[e],function(e,n){if(n.rows.length){var r=g.parse(n.rows.item(0).metadata);t(null,r.rev_tree)}else t(v.MISSING_DOC)})})},H._doCompaction=function(e,t,n){return t.length?void Q.transaction(function(n){var r="SELECT json AS metadata FROM "+E+" WHERE id = ?";n.executeSql(r,[e],function(n,r){var o=g.parse(r.rows.item(0).metadata);p.traverseRevTree(o.rev_tree,function(e,n,r,o,i){var s=n+"-"+r;-1!==t.indexOf(s)&&(i.status="missing")});var i="UPDATE "+E+" SET json = ? WHERE id = ?";n.executeSql(i,[g.stringify(o),e])}),t.forEach(function(t){var r="SELECT seq FROM "+S+" WHERE doc_id=? AND rev=?";n.executeSql(r,[e,t],function(e,t){if(t.rows.length){var n=t.rows.item(0).seq,r="SELECT a1.digest AS digest FROM "+x+" a1 JOIN "+x+" a2 ON a1.digest=a2.digest WHERE a1.seq=? GROUP BY a1.digest HAVING COUNT(*) = 1";e.executeSql(r,[n],function(e,t){for(var r=[],o=0;o<t.rows.length;o++)r.push(t.rows.item(o).digest);e.executeSql("DELETE FROM "+S+" WHERE seq=?",[n]),e.executeSql("DELETE FROM "+x+" WHERE seq=?",[n]),r.forEach(function(t){e.executeSql("DELETE FROM "+x+" WHERE digest=?",[t]),e.executeSql("DELETE FROM "+A+" WHERE digest=?",[t])})})}})})},u(n),function(){n()}):n()},H._getLocal=function(e,t){Q.readTransaction(function(n){var r="SELECT json, rev FROM "+k+" WHERE id=?";n.executeSql(r,[e],function(n,r){if(r.rows.length){var o=r.rows.item(0),i=f(o.json,e,o.rev);t(null,i)}else t(v.MISSING_DOC)})})},H._putLocal=function(e,t,n){function r(e){var r,u;i?(r="UPDATE "+k+" SET rev=?, json=? WHERE id=? AND rev=?",u=[o,f,s,i]):(r="INSERT INTO "+k+" (id, rev, json) VALUES (?,?,?)",u=[s,o,f]),e.executeSql(r,u,function(e,r){r.rowsAffected?(a={ok:!0,id:s,rev:o},t.ctx&&n(null,a)):n(v.REV_CONFLICT)},function(){return n(v.REV_CONFLICT),!1})}"function"==typeof t&&(n=t,t={}),delete e._revisions;var o,i=e._rev,s=e._id;o=e._rev=i?"0-"+(parseInt(i.split("-")[1],10)+1):"0-1";var a,f=c(e);t.ctx?r(t.ctx):Q.transaction(function(e){r(e)},u(n),function(){a&&n(null,a)})},void(H._removeLocal=function(e,t){var n;Q.transaction(function(r){var o="DELETE FROM "+k+" WHERE id=? AND rev=?",i=[e._id,e._rev];r.executeSql(o,i,function(r,o){return o.rowsAffected?void(n={ok:!0,id:e._id,rev:"0-0"}):t(v.MISSING_DOC)})},u(t),function(){n&&t(null,n)})})):t(v.UNKNOWN_ERROR)}var h=e("../utils"),p=e("../merge"),v=e("../deps/errors"),g=e("vuvuzela"),y=e("../deps/parse-hex"),m={},_=h.getArguments(function(e){if("undefined"!=typeof n){if(n.navigator&&n.navigator.sqlitePlugin&&n.navigator.sqlitePlugin.openDatabase)return navigator.sqlitePlugin.openDatabase.apply(navigator.sqlitePlugin,e);if(n.sqlitePlugin&&n.sqlitePlugin.openDatabase)return n.sqlitePlugin.openDatabase.apply(n.sqlitePlugin,e);var t=m[e[0]];return t||(t=m[e[0]]=n.openDatabase.apply(n,e)),t}}),b=1,w=6,E=r("document-store"),S=r("by-sequence"),A=r("attach-store"),k=r("local-store"),T=r("metadata-store"),x=r("attach-seq-store"),I="CREATE INDEX IF NOT EXISTS 'by-seq-deleted-idx' ON "+S+" (seq, deleted)",q="CREATE UNIQUE INDEX IF NOT EXISTS 'by-seq-doc-id-rev' ON "+S+" (doc_id, rev)",L="CREATE INDEX IF NOT EXISTS 'doc-winningseq-idx' ON "+E+" (winningseq)",R="CREATE INDEX IF NOT EXISTS 'attach-seq-seq-idx' ON "+x+" (seq)",O="CREATE UNIQUE INDEX IF NOT EXISTS 'attach-seq-digest-idx' ON "+x+" (digest, seq)",D=S+".seq = "+E+".winningseq",C=S+".seq AS seq, "+S+".deleted AS deleted, "+S+".json AS data, "+S+".rev AS rev, "+E+".json AS metadata";d.valid=function(){if("undefined"!=typeof n){if(n.navigator&&n.navigator.sqlitePlugin&&n.navigator.sqlitePlugin.openDatabase)return!0;if(n.sqlitePlugin&&n.sqlitePlugin.openDatabase)return!0;if(n.openDatabase)return!0}return!1},d.destroy=h.toPromise(function(e,t,r){d.Changes.removeAllListeners(e);var o=l(t),i=_(e,b,e,o);i.transaction(function(e){var t=[E,S,A,T,k,x];t.forEach(function(t){e.executeSql("DROP TABLE IF EXISTS "+t,[])})},u(r),function(){h.hasLocalStorage()&&(delete n.localStorage["_pouch__websqldb_"+e],delete n.localStorage[e]),r(null,{ok:!0})})}),d.Changes=new h.Changes,t.exports=d}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../deps/errors":12,"../deps/parse-hex":14,"../merge":20,"../utils":25,vuvuzela:67}],6:[function(e,t){"use strict";function n(e,t,n){function r(){i.cancel()}a.call(this);var i=this;this.db=e,t=t?o.clone(t):{};var s=n||t.complete||function(){},u=t.complete=o.once(function(t,n){t?i.emit("error",t):i.emit("complete",n),i.removeAllListeners(),e.removeListener("destroyed",r)});s&&(i.on("complete",function(e){s(null,e)}),i.on("error",function(e){s(e)}));var c=t.onChange;c&&i.on("change",c),e.once("destroyed",r),t.onChange=function(e){t.isCancelled||(i.emit("change",e),i.startSeq&&i.startSeq<=e.seq&&(i.emit("uptodate"),i.startSeq=!1),e.deleted?i.emit("delete",e):1===e.changes.length&&"1-"===e.changes[0].rev.slice(0,2)?i.emit("create",e):i.emit("update",e))};var f=new o.Promise(function(e,n){t.complete=function(t,r){t?n(t):e(r)}});i.once("cancel",function(){c&&i.removeListener("change",c),t.complete(null,{status:"cancelled"})}),this.then=f.then.bind(f),this["catch"]=f["catch"].bind(f),this.then(function(e){u(null,e)},u),e.taskqueue.isReady?i.doChanges(t):e.taskqueue.addTask(function(){i.isCancelled?i.emit("cancel"):i.doChanges(t)})}function r(e,t,n){var r=[{rev:e._rev}];"all_docs"===n.style&&(r=i.collectLeaves(t.rev_tree).map(function(e){return{rev:e.rev}}));var s={id:t.id,changes:r,doc:e};return o.isDeleted(t,e._rev)&&(s.deleted=!0),n.conflicts&&(s.doc._conflicts=i.collectConflicts(t),s.doc._conflicts.length||delete s.doc._conflicts),s}var o=e("./utils"),i=e("./merge"),s=e("./deps/errors"),a=e("events").EventEmitter,u=e("./evalFilter"),c=e("./evalView");t.exports=n,o.inherits(n,a),n.prototype.cancel=function(){this.isCancelled=!0,this.db.taskqueue.isReady&&this.emit("cancel")},n.prototype.doChanges=function(e){var t=this,n=e.complete;if(e=o.clone(e),"live"in e&&!("continuous"in e)&&(e.continuous=e.live),e.processChange=r,"latest"===e.since&&(e.since="now"),e.since||(e.since=0),"now"===e.since)return void this.db.info().then(function(r){return t.isCancelled?void n(null,{status:"cancelled"}):(e.since=r.update_seq-1,void t.doChanges(e))},n);if(e.continuous&&"now"!==e.since&&this.db.info().then(function(e){t.startSeq=e.update_seq-1},function(e){if("idbNull"!==e.id)throw e}),"http"!==this.db.type()&&e.filter&&"string"==typeof e.filter&&!e.doc_ids)return this.filterChanges(e);"descending"in e||(e.descending=!1),e.limit=0===e.limit?1:e.limit,e.complete=n;var i=this.db._changes(e);if(i&&"function"==typeof i.cancel){var s=t.cancel;t.cancel=o.getArguments(function(e){i.cancel(),s.apply(this,e)})}},n.prototype.filterChanges=function(e){var t=this,n=e.complete;if("_view"===e.filter){if(!e.view||"string"!=typeof e.view){var r=new Error("`view` filter parameter is not provided.");return r.status=s.BAD_REQUEST.status,r.name=s.BAD_REQUEST.name,r.error=!0,void n(r)}var o=e.view.split("/");this.db.get("_design/"+o[0],function(r,i){if(t.isCancelled)return void n(null,{status:"cancelled"});if(r)return void n(r);if(i&&i.views&&i.views[o[1]]){var a=c(i.views[o[1]].map);return e.filter=a,void t.doChanges(e)}var u=i.views?"missing json key: "+o[1]:"missing json key: views";r||(r=new Error(u),r.status=s.MISSING_DOC.status,r.name=s.MISSING_DOC.name,r.error=!0),n(r)})}else{var i=e.filter.split("/");this.db.get("_design/"+i[0],function(r,o){if(t.isCancelled)return void n(null,{status:"cancelled"});if(r)return void n(r);if(o&&o.filters&&o.filters[i[1]]){var a=u(o.filters[i[1]]);return e.filter=a,void t.doChanges(e)}var c=o&&o.filters?"missing json key: "+i[1]:"missing json key: filters";return r||(r=new Error(c),r.status=s.MISSING_DOC.status,r.name=s.MISSING_DOC.name,r.error=!0),void n(r)})}}},{"./deps/errors":12,"./evalFilter":18,"./evalView":19,"./merge":20,"./utils":25,events:33}],7:[function(e,t){"use strict";function n(e,t,n,r){return e.get(t)["catch"](function(n){if(404===n.status)return"http"===e.type()&&o.explain404("PouchDB is just checking if a remote checkpoint exists."),{_id:t};throw n}).then(function(t){return r.cancelled?void 0:(t.last_seq=n,e.put(t))})}function r(e,t,n,r){this.src=e,this.target=t,this.id=n,this.returnValue=r}var o=e("./utils");r.prototype.writeCheckpoint=function(e){var t=this;return this.updateTarget(e).then(function(){return t.updateSource(e)})},r.prototype.updateTarget=function(e){return n(this.target,this.id,e,this.returnValue)},r.prototype.updateSource=function(e){var t=this;return this.readOnlySource?o.Promise.resolve(!0):n(this.src,this.id,e,this.returnValue)["catch"](function(e){var n="number"==typeof e.status&&4===Math.floor(e.status/100);if(n)return t.readOnlySource=!0,!0;throw e})},r.prototype.getCheckpoint=function(){var e=this;return e.target.get(e.id).then(function(t){return e.src.get(e.id).then(function(e){return t.last_seq===e.last_seq?e.last_seq:0},function(n){if(404===n.status&&t.last_seq)return e.src.put({_id:e.id,last_seq:0}).then(function(){return 0},function(n){return 401===n.status?(e.readOnlySource=!0,t.last_seq):0});throw n})})["catch"](function(e){if(404!==e.status)throw e;return 0})},t.exports=r},{"./utils":25}],8:[function(e,t){(function(n){"use strict";function r(e){e&&n.debug&&console.error(e)}function o(e,t,n){if(!(this instanceof o))return new o(e,t,n);var c=this;("function"==typeof t||"undefined"==typeof t)&&(n=t,t={}),e&&"object"==typeof e&&(t=e,e=void 0),"undefined"==typeof n&&(n=r),t=t||{},this.__opts=t;var f=n;c.auto_compaction=t.auto_compaction,c.prefix=o.prefix,i.call(c),c.taskqueue=new a;var l=new u(function(r,i){n=function(e,t){return e?i(e):(delete t.then,void r(t))},t=s.clone(t);var a,u,f=t.name||e;return function(){try{if("string"!=typeof f)throw u=new Error("Missing/invalid DB name"),u.code=400,u;if(a=o.parseAdapter(f,t),t.originalName=f,t.name=a.name,t.prefix&&"http"!==a.adapter&&"https"!==a.adapter&&(t.name=t.prefix+t.name),t.adapter=t.adapter||a.adapter,c._adapter=t.adapter,c._db_name=f,!o.adapters[t.adapter])throw u=new Error("Adapter is missing"),u.code=404,u;if(!o.adapters[t.adapter].valid())throw u=new Error("Invalid Adapter"),u.code=404,u}catch(e){c.taskqueue.fail(e),c.changes=s.toPromise(function(t){t.complete&&t.complete(e)})}}(),u?i(u):(c.adapter=t.adapter,c.replicate={},c.replicate.from=function(e,t,n){return c.constructor.replicate(e,c,t,n)},c.replicate.to=function(e,t,n){return c.constructor.replicate(c,e,t,n)},c.sync=function(e,t,n){return c.constructor.sync(c,e,t,n)},c.replicate.sync=c.sync,c.destroy=s.adapterFun("destroy",function(e){var t=this;t.info(function(n,r){return n?e(n):void t.constructor.destroy(r.db_name,e)})}),o.adapters[t.adapter].call(c,t,function(e){function r(e){"destroyed"===e&&(c.emit("destroyed"),o.removeListener(f,r))}return e?void(n&&(c.taskqueue.fail(e),n(e))):(o.on(f,r),c.emit("created",c),o.emit("created",t.originalName),c.taskqueue.ready(c),void n(null,c))}),t.skipSetup&&c.taskqueue.ready(c),void(s.isCordova()&&cordova.fireWindowEvent(t.name+"_pouch",{})))});l.then(function(e){f(null,e)},f),c.then=l.then.bind(l),c["catch"]=l["catch"].bind(l)}var i=e("./adapter"),s=e("./utils"),a=e("./taskqueue"),u=s.Promise;s.inherits(o,i),o.debug=e("debug"),t.exports=o}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./adapter":1,"./taskqueue":24,"./utils":25,debug:35}],9:[function(e,t){"use strict";function n(e,t){function n(t,n,r){if(e.binary||e.json||!e.processData||"string"==typeof t){if(!e.binary&&e.json&&"string"==typeof t)try{t=JSON.parse(t)}catch(o){return r(o)}}else t=JSON.stringify(t);Array.isArray(t)&&(t=t.map(function(e){var t;return e.ok?e:e.error&&"conflict"===e.error?(t=i.REV_CONFLICT,t.id=e.id,t):e.error&&"forbidden"===e.error?(t=i.FORBIDDEN,t.id=e.id,t.reason=e.reason,t):e.missing?(t=i.MISSING_DOC,t.missing=e.missing,t):e})),r(null,t,n)}function a(e,t){var n,r,o,s;try{n=JSON.parse(e.responseText);for(s in i)if(i.hasOwnProperty(s)&&i[s].name===n.error){o=i[s];break}o||(o=i.UNKNOWN_ERROR,e.status&&(o.status=e.status),e.statusText&&(e.name=e.statusText)),r=i.error(o,n.reason)}catch(a){for(var s in i)if(i.hasOwnProperty(s)&&i[s].status===e.status){o=i[s];break}o||(o=i.UNKNOWN_ERROR,e.status&&(o.status=e.status),e.statusText&&(e.name=e.statusText)),r=i.error(o)}e.withCredentials&&0===e.status&&(r.status=405,r.statusText="Method Not Allowed"),t(r)}var u=!1,c=s.getArguments(function(e){u||(t.apply(this,e),u=!0)});"function"==typeof e&&(c=e,e={}),e=s.clone(e);var f={method:"GET",headers:{},json:!0,processData:!0,timeout:1e4,cache:!1};if(e=s.extend(!0,f,e),"GET"===e.method&&!e.cache){var l=-1!==e.url.indexOf("?");e.url+=(l?"&":"?")+"_nonce="+s.uuid(16)}var d,h;h=e.xhr?new e.xhr:new XMLHttpRequest,h.open(e.method,e.url),h.withCredentials=!0,e.json&&(e.headers.Accept="application/json",e.headers["Content-Type"]=e.headers["Content-Type"]||"application/json",e.body&&e.processData&&"string"!=typeof e.body&&(e.body=JSON.stringify(e.body))),e.binary&&(h.responseType="arraybuffer");var p=function(e,t,n){var r="";if(n){var o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3),r="; expires="+o.toGMTString()}document.cookie=e+"="+t+r+"; path=/"};for(var v in e.headers)if("Cookie"===v){var g=e.headers[v].split("=");p(g[0],g[1],10)}else h.setRequestHeader(v,e.headers[v]);"body"in e||(e.body=null);var y=function(){u||(h.abort(),a(h,c))};return h.onreadystatechange=function(){if(4===h.readyState&&!u)if(clearTimeout(d),h.status>=200&&h.status<300){var t;t=e.binary?o([h.response||""],{type:h.getResponseHeader("Content-Type")}):h.responseText,n(t,h,c)}else a(h,c)},e.timeout>0&&(d=setTimeout(y,e.timeout),h.onprogress=function(){clearTimeout(d),d=setTimeout(y,e.timeout)
},"undefined"==typeof r&&(r=-1!==Object.keys(h).indexOf("upload")),r&&(h.upload.onprogress=h.onprogress)),e.body&&e.body instanceof Blob?s.readAsBinaryString(e.body,function(e){h.send(s.fixBinary(e))}):h.send(e.body),{abort:y}}var r,o=e("./blob.js"),i=e("./errors"),s=e("../utils");t.exports=n},{"../utils":25,"./blob.js":10,"./errors":12}],10:[function(e,t){(function(e){"use strict";function n(t,n){t=t||[],n=n||{};try{return new Blob(t,n)}catch(r){if("TypeError"!==r.name)throw r;for(var o=e.BlobBuilder||e.MSBlobBuilder||e.MozBlobBuilder||e.WebKitBlobBuilder,i=new o,s=0;s<t.length;s+=1)i.append(t[s]);return i.getBlob(n.type)}}t.exports=n}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],11:[function(e,t,n){"use strict";function r(){this.store={}}function o(e){if(this.store=new r,e&&Array.isArray(e))for(var t=0,n=e.length;n>t;t++)this.add(e[t])}n.Map=r,n.Set=o,r.prototype.mangle=function(e){if("string"!=typeof e)throw new TypeError("key must be a string but Got "+e);return"$"+e},r.prototype.unmangle=function(e){return e.substring(1)},r.prototype.get=function(e){var t=this.mangle(e);return t in this.store?this.store[t]:void 0},r.prototype.set=function(e,t){var n=this.mangle(e);return this.store[n]=t,!0},r.prototype.has=function(e){var t=this.mangle(e);return t in this.store},r.prototype["delete"]=function(e){var t=this.mangle(e);return t in this.store?(delete this.store[t],!0):!1},r.prototype.forEach=function(e){var t=this,n=Object.keys(t.store);n.forEach(function(n){var r=t.store[n];n=t.unmangle(n),e(r,n)})},o.prototype.add=function(e){return this.store.set(e,!0)},o.prototype.has=function(e){return this.store.has(e)},o.prototype["delete"]=function(e){return this.store["delete"](e)}},{}],12:[function(e,t,n){"use strict";function r(e){this.status=e.status,this.name=e.error,this.message=e.reason,this.error=!0}r.prototype__proto__=Error.prototype,r.prototype.toString=function(){return JSON.stringify({status:this.status,name:this.name,message:this.message})},n.UNAUTHORIZED=new r({status:401,error:"unauthorized",reason:"Name or password is incorrect."}),n.MISSING_BULK_DOCS=new r({status:400,error:"bad_request",reason:"Missing JSON list of 'docs'"}),n.MISSING_DOC=new r({status:404,error:"not_found",reason:"missing"}),n.REV_CONFLICT=new r({status:409,error:"conflict",reason:"Document update conflict"}),n.INVALID_ID=new r({status:400,error:"invalid_id",reason:"_id field must contain a string"}),n.MISSING_ID=new r({status:412,error:"missing_id",reason:"_id is required for puts"}),n.RESERVED_ID=new r({status:400,error:"bad_request",reason:"Only reserved document ids may start with underscore."}),n.NOT_OPEN=new r({status:412,error:"precondition_failed",reason:"Database not open"}),n.UNKNOWN_ERROR=new r({status:500,error:"unknown_error",reason:"Database encountered an unknown error"}),n.BAD_ARG=new r({status:500,error:"badarg",reason:"Some query argument is invalid"}),n.INVALID_REQUEST=new r({status:400,error:"invalid_request",reason:"Request was invalid"}),n.QUERY_PARSE_ERROR=new r({status:400,error:"query_parse_error",reason:"Some query parameter is invalid"}),n.DOC_VALIDATION=new r({status:500,error:"doc_validation",reason:"Bad special document member"}),n.BAD_REQUEST=new r({status:400,error:"bad_request",reason:"Something wrong with the request"}),n.NOT_AN_OBJECT=new r({status:400,error:"bad_request",reason:"Document must be a JSON object"}),n.DB_MISSING=new r({status:404,error:"not_found",reason:"Database not found"}),n.IDB_ERROR=new r({status:500,error:"indexed_db_went_bad",reason:"unknown"}),n.WSQ_ERROR=new r({status:500,error:"web_sql_went_bad",reason:"unknown"}),n.LDB_ERROR=new r({status:500,error:"levelDB_went_went_bad",reason:"unknown"}),n.FORBIDDEN=new r({status:403,error:"forbidden",reason:"Forbidden by design doc validate_doc_update function"}),n.error=function(e,t,n){function r(){this.message=t,n&&(this.name=n)}return r.prototype=e,new r(t)}},{}],13:[function(e,t){(function(n,r){"use strict";function o(e,t,n){if("function"==typeof e.slice)return t?n?e.slice(t,n):e.slice(t):e.slice();t=Math.floor(t||0),n=Math.floor(n||0);var r=e.byteLength;if(t=0>t?Math.max(t+r,0):Math.min(r,t),n=0>n?Math.max(n+r,0):Math.min(r,n),0>=n-t)return new ArrayBuffer(0);var o=new ArrayBuffer(n-t),i=new Uint8Array(o),s=new Uint8Array(e,t,n-t);return i.set(s),o}function i(e){var t=[255&e,e>>>8&255,e>>>16&255,e>>>24&255];return t.map(function(e){return String.fromCharCode(e)}).join("")}function s(e){for(var t="",n=0;n<e.length;n++)t+=i(e[n]);return r.btoa(t)}var a=e("crypto"),u=e("spark-md5"),c=r.setImmediate||r.setTimeout,f=32768;t.exports=function(e,t){function r(e,t,n,r){d?e.appendBinary(t.substring(n,r)):e.append(o(t,n,r))}function i(){var n=g*p,o=n+p;if(n+p>=e.size&&(o=e.size),g++,v>g)r(y,e,n,o),c(i);else{r(y,e,n,o);var a=y.end(!0),u=s(a);t(null,u),y.destroy()}}if(!n.browser){var l=a.createHash("md5").update(e).digest("base64");return void t(null,l)}var d="string"==typeof e,h=d?e.length:e.byteLength,p=Math.min(f,h),v=Math.ceil(h/p),g=0,y=d?new u:new u.ArrayBuffer;i()}}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{_process:34,crypto:28,"spark-md5":66}],14:[function(e,t){"use strict";function n(e){return decodeURIComponent(window.escape(e))}function r(e){return 65>e?e-48:e-55}function o(e,t,n){for(var o="";n>t;)o+=String.fromCharCode(r(e.charCodeAt(t++))<<4|r(e.charCodeAt(t++)));return o}function i(e,t,n){for(var o="";n>t;)o+=String.fromCharCode(r(e.charCodeAt(t+2))<<12|r(e.charCodeAt(t+3))<<8|r(e.charCodeAt(t))<<4|r(e.charCodeAt(t+1))),t+=4;return o}function s(e,t){return"UTF-8"===t?n(o(e,0,e.length)):i(e,0,e.length)}t.exports=s},{}],15:[function(e,t){"use strict";function n(e){for(var t=r,n=t.parser[t.strictMode?"strict":"loose"].exec(e),o={},i=14;i--;){var s=t.key[i],a=n[i]||"",u=-1!==["user","password"].indexOf(s);o[s]=u?decodeURIComponent(a):a}return o[t.q.name]={},o[t.key[12]].replace(t.q.parser,function(e,n,r){n&&(o[t.q.name][n]=r)}),o}var r={strictMode:!1,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};t.exports=n},{}],16:[function(e,t){"use strict";function n(e,t,n){return new o(function(o,i){return t&&"object"==typeof t&&(t=t._id),"string"!=typeof t?i(new Error("doc id is required")):void e.get(t,function(s,a){if(s)return 404!==s.status?i(s):o(r(e,n({_id:t}),n));var u=n(a);return u?void o(r(e,u,n)):o(a)})})}function r(e,t,r){return e.put(t)["catch"](function(o){if(409!==o.status)throw o;return n(e,t,r)})}var o=e("../utils").Promise;t.exports=function(e,t,r,o){return"function"!=typeof o?n(e,t,r):void n(e,t,r).then(function(e){o(null,e)},o)}},{"../utils":25}],17:[function(e,t){"use strict";function n(e){return 0|Math.random()*e}function r(e,t){t=t||o.length;var r="",i=-1;if(e){for(;++i<e;)r+=o[n(t)];return r}for(;++i<36;)switch(i){case 8:case 13:case 18:case 23:r+="-";break;case 19:r+=o[3&n(16)|8];break;default:r+=o[n(16)]}return r}var o="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");t.exports=r},{}],18:[function(_dereq_,module,exports){"use strict";function evalFilter(input){return eval(["(function () { return ",input," })()"].join(""))}module.exports=evalFilter},{}],19:[function(_dereq_,module,exports){"use strict";function evalView(input){return eval(["(function () {","  return function (doc) {","    var emitted = false;","    var emit = function (a, b) {","      emitted = true;","    };","    var view = "+input+";","    view(doc);","    if (emitted) {","      return true;","    }","  }","})()"].join("\n"))}module.exports=evalView},{}],20:[function(e,t){"use strict";function n(e){for(var t,n=e.shift(),r=[n.id,n.opts,[]],o=r;e.length;)n=e.shift(),t=[n.id,n.opts,[]],o[2].push(t),o=t;return r}function r(e,t){for(var n=[{tree1:e,tree2:t}],r=!1;n.length>0;){var o=n.pop(),i=o.tree1,s=o.tree2;(i[1].status||s[1].status)&&(i[1].status="available"===i[1].status||"available"===s[1].status?"available":"missing");for(var a=0;a<s[2].length;a++)if(i[2][0]){for(var u=!1,c=0;c<i[2].length;c++)i[2][c][0]===s[2][a][0]&&(n.push({tree1:i[2][c],tree2:s[2][a]}),u=!0);u||(r="new_branch",i[2].push(s[2][a]),i[2].sort())}else r="new_leaf",i[2][0]=s[2][a]}return{conflicts:r,tree:e}}function o(e,t,n){var o,i=[],s=!1,a=!1;return e.length?(e.forEach(function(e){if(e.pos===t.pos&&e.ids[0]===t.ids[0])o=r(e.ids,t.ids),i.push({pos:e.pos,ids:o.tree}),s=s||o.conflicts,a=!0;else if(n!==!0){var u=e.pos<t.pos?e:t,c=e.pos<t.pos?t:e,f=c.pos-u.pos,l=[],d=[];for(d.push({ids:u.ids,diff:f,parent:null,parentIdx:null});d.length>0;){var h=d.pop();0!==h.diff?h.ids&&h.ids[2].forEach(function(e,t){d.push({ids:e,diff:h.diff-1,parent:h.ids,parentIdx:t})}):h.ids[0]===c.ids[0]&&l.push(h)}var p=l[0];p?(o=r(p.ids,c.ids),p.parent[2][p.parentIdx]=o.tree,i.push({pos:u.pos,ids:u.ids}),s=s||o.conflicts,a=!0):i.push(e)}else i.push(e)}),a||i.push(t),i.sort(function(e,t){return e.pos-t.pos}),{tree:i,conflicts:s||"internal_node"}):{tree:[t],conflicts:"new_leaf"}}function i(e,t){var r=a.rootToLeaf(e).map(function(e){var r=e.ids.slice(-t);return{pos:e.pos+(e.ids.length-r.length),ids:n(r)}});return r.reduce(function(e,t){return o(e,t,!0).tree},[r.shift()])}var s=e("pouchdb-extend"),a={};a.merge=function(e,t,n){e=s(!0,[],e),t=s(!0,{},t);var r=o(e,t);return{tree:i(r.tree,n),conflicts:r.conflicts}},a.winningRev=function(e){var t=[];return a.traverseRevTree(e.rev_tree,function(e,n,r,o,i){e&&t.push({pos:n,id:r,deleted:!!i.deleted})}),t.sort(function(e,t){return e.deleted!==t.deleted?e.deleted>t.deleted?1:-1:e.pos!==t.pos?t.pos-e.pos:e.id<t.id?1:-1}),t[0].pos+"-"+t[0].id},a.traverseRevTree=function(e,t){for(var n,r=e.slice();n=r.pop();)for(var o=n.pos,i=n.ids,s=i[2],a=t(0===s.length,o,i[0],n.ctx,i[1]),u=0,c=s.length;c>u;u++)r.push({pos:o+1,ids:s[u],ctx:a})},a.collectLeaves=function(e){var t=[];return a.traverseRevTree(e,function(e,n,r,o,i){e&&t.unshift({rev:n+"-"+r,pos:n,opts:i})}),t.sort(function(e,t){return t.pos-e.pos}),t.map(function(e){delete e.pos}),t},a.collectConflicts=function(e){var t=a.winningRev(e),n=a.collectLeaves(e.rev_tree),r=[];return n.forEach(function(e){e.rev===t||e.opts.deleted||r.push(e.rev)}),r},a.rootToLeaf=function(e){var t=[];return a.traverseRevTree(e,function(e,n,r,o,i){if(o=o?o.slice(0):[],o.push({id:r,opts:i}),e){var s=n+1-o.length;t.unshift({pos:s,ids:o})}return o}),t},t.exports=a},{"pouchdb-extend":57}],21:[function(e,t,n){"use strict";function r(e,t){e=parseInt(e,10),t=parseInt(t,10),e!==e&&(e=0),t!==t||e>=t?t=(e||1)<<1:t+=1;var n=Math.random(),r=t-e;return~~(r*n+e)}function o(e){var t=0;return e||(t=2e3),r(e,t)}function i(e,t,n,r,i,s,a){return r.retry===!1?(i.emit("error",a),void i.removeAllListeners()):(r.default_back_off=r.default_back_off||0,r.retries=r.retries||0,"function"!=typeof r.back_off_function&&(r.back_off_function=o),r.retries++,r.max_retries&&r.retries>r.max_retries?(i.emit("error",new Error("tried "+r.retries+" times but replication failed")),void i.removeAllListeners()):(i.emit("requestError",a),"active"===i.state&&(i.emit("syncStopped"),i.state="stopped",i.once("syncRestarted",function(){r.current_back_off=r.default_back_off})),r.current_back_off=r.current_back_off||r.default_back_off,r.current_back_off=r.back_off_function(r.current_back_off),void setTimeout(function(){u(e,t,n,r,i)},r.current_back_off)))}function s(){d.call(this),this.cancelled=!1,this.state="pending";var e=this,t=new l.Promise(function(t,n){e.once("complete",t),e.once("error",n)});e.then=function(e,n){return t.then(e,n)},e["catch"]=function(e){return t["catch"](e)},e["catch"](function(){})}function a(e,t,n){var r=n.filter?n.filter.toString():"";return e.id().then(function(e){return t.id().then(function(t){var o=e+t+r+JSON.stringify(n.query_params)+n.doc_ids;return l.MD5(o).then(function(e){return e=e.replace(/\//g,".").replace(/\+/g,"_"),"_local/"+e})})})}function u(e,t,n,r,o,s){function a(){if(0!==T.docs.length){var e=T.docs;return n.bulkDocs({docs:e},{new_edits:!1}).then(function(e){if(P.cancelled)throw b(),new Error("cancelled");var t=[];e.forEach(function(e){if(e.error){s.doc_write_failures++;var n=new Error(e.reason||e.message||"Unknown reason");n.name=e.name||e.error,t.push(n)}}),s.errors=s.errors.concat(t),s.docs_written+=T.docs.length-t.length;var n=t.filter(function(e){return"unauthorized"!==e.name&&"forbidden"!==e.name});if(n.length>0){var r=new Error("bulkDocs error");throw r.other_errors=t,_("target.bulkDocs failed to write docs",r),new Error("bulkWrite partial failure")}},function(t){throw s.doc_write_failures+=e.length,t})}}function u(){for(var e=T.diffs,n=Object.keys(e)[0],r=e[n].missing,o=[],i=0;i<r.length;i+=p)o.push(r.slice(i,Math.min(r.length,i+p)));return l.Promise.all(o.map(function(r){return t.get(n,{revs:!0,open_revs:r,attachments:!0}).then(function(t){t.forEach(function(e){return P.cancelled?b():void(e.ok&&(s.docs_read++,T.pendingRevs++,T.docs.push(e.ok)))}),delete e[n]})}))}function c(){return Object.keys(T.diffs).length>0?u().then(c):l.Promise.resolve()}function f(){var e=Object.keys(T.diffs).filter(function(e){var t=T.diffs[e].missing;return 1===t.length&&"1-"===t[0].slice(0,2)});return t.allDocs({keys:e,include_docs:!0}).then(function(e){if(P.cancelled)throw b(),new Error("cancelled");e.rows.forEach(function(e){!e.doc||e.deleted||"1-"!==e.value.rev.slice(0,2)||e.doc._attachments&&0!==Object.keys(e.doc._attachments).length||(s.docs_read++,T.pendingRevs++,T.docs.push(e.doc),delete T.diffs[e.id])})})}function d(){return f().then(c)}function v(){return q=!0,U.writeCheckpoint(T.seq).then(function(){if(q=!1,P.cancelled)throw b(),new Error("cancelled");s.last_seq=O=T.seq,o.emit("change",l.clone(s)),T=void 0,A()})["catch"](function(e){throw q=!1,_("writeCheckpoint completed with error",e),e})}function g(){var e={};return T.changes.forEach(function(t){e[t.id]=t.changes.map(function(e){return e.rev})}),n.revsDiff(e).then(function(e){if(P.cancelled)throw b(),new Error("cancelled");T.diffs=e,T.pendingRevs=0})}function y(){if(!P.cancelled&&!T){if(0===x.length)return void m(!0);T=x.shift(),g().then(d).then(a).then(v).then(y)["catch"](function(e){_("batch processing terminated with error",e)})}}function m(e){return 0===I.changes.length?void(0!==x.length||T||((D&&F.live||L)&&o.emit("uptodate",l.clone(s)),L&&b())):void((e||L||I.changes.length>=C)&&(x.push(I),I={seq:0,changes:[],docs:[]},y()))}function _(e,t){R||(s.ok=!1,s.status="aborting",s.errors.push(t),x=[],I={seq:0,changes:[],docs:[]},b())}function b(){if(!(R||P.cancelled&&(s.status="cancelled",q))){s.status=s.status||"complete",s.end_time=new Date,s.last_seq=O,R=P.cancelled=!0;var a=s.errors.filter(function(e){return"unauthorized"!==e.name&&"forbidden"!==e.name});if(a.length>0){var u=s.errors.pop();s.errors.length>0&&(u.other_errors=s.errors),u.result=s,i(e,t,n,r,o,s,u)}else o.emit("complete",s),o.removeAllListeners()}}function w(e){return P.cancelled?b():(0!==I.changes.length||0!==x.length||T||o.emit("outofdate",l.clone(s)),I.seq=e.seq,I.changes.push(e),void m(0===x.length))}function E(e){return j=!1,P.cancelled?b():(F.since<e.last_seq?(F.since=e.last_seq,A()):D?(F.live=!0,A()):L=!0,void m(!0))}function S(e){return j=!1,P.cancelled?b():void _("changes rejected",e)}function A(){function e(){r.cancel()}function n(){o.removeListener("cancel",e)}if(!j&&!L&&x.length<N){j=!0,o.once("cancel",e);var r=t.changes(F).on("change",w);r.then(n,n),r.then(E)["catch"](S)}}function k(){U.getCheckpoint().then(function(e){O=e,F={since:O,limit:C,batch_size:C,style:"all_docs",doc_ids:B,returnDocs:!1},r.filter&&(F.filter=r.filter),r.query_params&&(F.query_params=r.query_params),A()})["catch"](function(e){_("getCheckpoint rejected with ",e)})}var T,x=[],I={seq:0,changes:[],docs:[]},q=!1,L=!1,R=!1,O=0,D=r.continuous||r.live||!1,C=r.batch_size||100,N=r.batches_limit||10,j=!1,B=r.doc_ids,P={cancelled:!1},U=new h(t,n,e,P);s=s||{ok:!0,start_time:new Date,docs_read:0,docs_written:0,doc_write_failures:0,errors:[]};var F={};o.ready(t,n),o.once("cancel",b),"function"==typeof r.onChange&&o.on("change",r.onChange),"function"==typeof r.complete&&(o.once("error",r.complete),o.once("complete",function(e){r.complete(null,e)})),"undefined"==typeof r.since?k():(q=!0,U.writeCheckpoint(r.since).then(function(){return q=!1,P.cancelled?void b():(O=r.since,void k())})["catch"](function(e){throw q=!1,_("writeCheckpoint completed with error",e),e}))}function c(e,t){var n=t.PouchConstructor;return"string"==typeof e?new n(e):e.then?e:l.Promise.resolve(e)}function f(e,t,n,r){"function"==typeof n&&(r=n,n={}),"undefined"==typeof n&&(n={}),n.complete||(n.complete=r||function(){}),n=l.clone(n),n.continuous=n.continuous||n.live,n.retry=n.retry||!1,n.PouchConstructor=n.PouchConstructor||this;var o=new s(n);return c(e,n).then(function(e){return c(t,n).then(function(t){return a(e,t,n).then(function(r){u(r,e,t,n,o)})})})["catch"](function(e){o.emit("error",e),n.complete(e)}),o}var l=e("./utils"),d=e("events").EventEmitter,h=e("./checkpointer"),p=50;l.inherits(s,d),s.prototype.cancel=function(){this.cancelled=!0,this.state="cancelled",this.emit("cancel")},s.prototype.ready=function(e,t){function n(){o.cancel()}function r(){e.removeListener("destroyed",n),t.removeListener("destroyed",n)}var o=this;this.once("change",function(){"pending"===this.state?(o.state="active",o.emit("syncStarted")):"stopped"===o.state&&(o.state="active",o.emit("syncRestarted"))}),e.once("destroyed",n),t.once("destroyed",n),this.then(r,r)},n.toPouch=c,n.replicate=f},{"./checkpointer":7,"./utils":25,events:33}],22:[function(e,t){(function(n){"use strict";var r=e("./constructor"),o=e("./utils"),i=o.Promise,s=e("events").EventEmitter;r.adapters={},r.preferredAdapters=e("./adapters/preferredAdapters.js"),r.prefix="_pouch_";var a=new s,u=["on","addListener","emit","listeners","once","removeAllListeners","removeListener","setMaxListeners"];u.forEach(function(e){r[e]=a[e].bind(a)}),r.setMaxListeners(0),r.parseAdapter=function(e,t){var i,s,a=e.match(/([a-z\-]*):\/\/(.*)/);if(a){if(e=/http(s?)/.test(a[1])?a[1]+"://"+a[2]:a[2],i=a[1],!r.adapters[i].valid())throw"Invalid adapter";return{name:e,adapter:a[1]}}var u="idb"in r.adapters&&"websql"in r.adapters&&o.hasLocalStorage()&&n.localStorage["_pouch__websqldb_"+r.prefix+e];if("undefined"!=typeof t&&t.db)s="leveldb";else for(var c=0;c<r.preferredAdapters.length;++c)if(s=r.preferredAdapters[c],s in r.adapters){if(u&&"idb"===s)continue;break}if(i=r.adapters[s],s&&i){var f="use_prefix"in i?i.use_prefix:!0;return{name:f?r.prefix+e:e,adapter:s}}throw"No valid adapter found"},r.destroy=o.toPromise(function(e,t,n){function s(){c.destroy(d,t,function(t,o){t?n(t):(r.emit("destroyed",e),r.emit(e,"destroyed"),n(null,o||{ok:!0}))})}("function"==typeof t||"undefined"==typeof t)&&(n=t,t={}),e&&"object"==typeof e&&(t=e,e=void 0);var a=r.parseAdapter(t.name||e,t),u=a.name,c=r.adapters[a.adapter],f="use_prefix"in c?c.use_prefix:!0,l=f?u.replace(new RegExp("^"+r.prefix),""):u,d=("http"===a.adapter||"https"===a.adapter?"":t.prefix||"")+u,h=o.extend(!0,{},t,{adapter:a.adapter});new r(l,h,function(e,u){return e?n(e):void u.get("_local/_pouch_dependentDbs",function(e,u){if(e)return 404!==e.status?n(e):s();var c=u.dependentDbs,l=Object.keys(c).map(function(e){var n=f?e.replace(new RegExp("^"+r.prefix),""):e,i=o.extend(!0,t,{adapter:a.adapter});return r.destroy(n,i)});i.all(l).then(s,function(e){n(e)})})})}),r.allDbs=o.toPromise(function(e){var t=new Error("allDbs method removed");t.stats="400",e(t)}),r.adapter=function(e,t){t.valid()&&(r.adapters[e]=t)},r.plugin=function(e){Object.keys(e).forEach(function(t){r.prototype[t]=e[t]})},r.defaults=function(e){function t(t,n,i){("function"==typeof n||"undefined"==typeof n)&&(i=n,n={}),t&&"object"==typeof t&&(n=t,t=void 0),n=o.extend(!0,{},e,n),r.call(this,t,n,i)}return o.inherits(t,r),t.destroy=o.toPromise(function(t,n,i){return("function"==typeof n||"undefined"==typeof n)&&(i=n,n={}),t&&"object"==typeof t&&(n=t,t=void 0),n=o.extend(!0,{},e,n),r.destroy(t,n,i)}),u.forEach(function(e){t[e]=a[e].bind(a)}),t.setMaxListeners(0),t.preferredAdapters=r.preferredAdapters.slice(),Object.keys(r).forEach(function(e){e in t||(t[e]=r[e])}),t},t.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./adapters/preferredAdapters.js":4,"./constructor":8,"./utils":25,events:33}],23:[function(e,t){"use strict";function n(e,t,n,s){return"function"==typeof n&&(s=n,n={}),"undefined"==typeof n&&(n={}),n=o.clone(n),n.PouchConstructor=n.PouchConstructor||this,e=i.toPouch(e,n),t=i.toPouch(t,n),new r(e,t,n,s)}function r(e,t,n,r){function i(e){h||(h=!0,f.emit("cancel",e))}function a(e){f.emit("change",{direction:"pull",change:e})}function u(e){f.emit("change",{direction:"push",change:e})}function c(e){return function(t,n){var r="change"===t&&(n===a||n===u),o="cancel"===t&&n===i,s=t in p&&n===p[t];(r||o||s)&&(t in v||(v[t]={}),v[t][e]=!0,2===Object.keys(v[t]).length&&f.removeAllListeners(t))}}var f=this;this.canceled=!1;var l,d;"onChange"in n&&(l=n.onChange,delete n.onChange),"function"!=typeof r||n.complete?"complete"in n&&(d=n.complete,delete n.complete):d=r,this.push=s(e,t,n),this.pull=s(t,e,n);var h=!1,p={},v={};this.on("newListener",function(e){"change"===e?(f.pull.on("change",a),f.push.on("change",u)):"cancel"===e?(f.pull.on("cancel",i),f.push.on("cancel",i)):"error"===e||"removeListener"===e||"complete"===e||e in p||(p[e]=function(t){f.emit(e,t)},f.pull.on(e,p[e]),f.push.on(e,p[e]))}),this.on("removeListener",function(e){"change"===e?(f.pull.removeListener("change",a),f.push.removeListener("change",u)):"cancel"===e?(f.pull.removeListener("cancel",i),f.push.removeListener("cancel",i)):e in p&&"function"==typeof p[e]&&(f.pull.removeListener(e,p[e]),f.push.removeListener(e,p[e]),delete p[e])}),this.pull.on("removeListener",c("pull")),this.push.on("removeListener",c("push"));var g=o.Promise.all([this.push,this.pull]).then(function(e){var t={push:e[0],pull:e[1]};return f.emit("complete",t),d&&d(null,t),f.removeAllListeners(),t},function(e){throw f.cancel(),f.emit("error",e),d&&d(e),f.removeAllListeners(),e});this.then=function(e,t){return g.then(e,t)},this["catch"]=function(e){return g["catch"](e)}}var o=e("./utils"),i=e("./replicate"),s=i.replicate,a=e("events").EventEmitter;o.inherits(r,a),t.exports=n,r.prototype.cancel=function(){this.canceled||(this.canceled=!0,this.push.cancel(),this.pull.cancel())}},{"./replicate":21,"./utils":25,events:33}],24:[function(e,t){"use strict";function n(){this.isReady=!1,this.failed=!1,this.queue=[]}t.exports=n,n.prototype.execute=function(){var e,t;if(this.failed)for(;e=this.queue.shift();)"function"!=typeof e?(t=e.parameters[e.parameters.length-1],"function"==typeof t?t(this.failed):"changes"===e.name&&"function"==typeof t.complete&&t.complete(this.failed)):e(this.failed);else if(this.isReady)for(;e=this.queue.shift();)"function"==typeof e?e():e.task=this.db[e.name].apply(this.db,e.parameters)},n.prototype.fail=function(e){this.failed=e,this.execute()},n.prototype.ready=function(e){return this.failed?!1:0===arguments.length?this.isReady:(this.isReady=e?!0:!1,this.db=e,void this.execute())},n.prototype.addTask=function(e,t){if("function"!=typeof e){var n={name:e,parameters:t};return this.queue.push(n),this.failed&&this.execute(),n}this.queue.push(e),this.failed&&this.execute()}},{}],25:[function(e,t,n){(function(t,r){function o(e){var t={};return e.forEach(function(e){t[e]=!0}),t}function i(){return"undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage&&"undefined"!=typeof chrome.storage.local}function s(){if(!(this instanceof s))return new s;var e=this;f.call(this),this.isChrome=i(),this.listeners={},this.hasLocal=!1,this.isChrome||(this.hasLocal=n.hasLocalStorage()),this.isChrome?chrome.storage.onChanged.addListener(function(t){null!=t.db_name&&e.emit(t.dbName.newValue)}):this.hasLocal&&(r.addEventListener?r.addEventListener("storage",function(t){e.emit(t.key)}):r.attachEvent("storage",function(t){e.emit(t.key)}))}var a=e("./merge");n.extend=e("pouchdb-extend"),n.ajax=e("./deps/ajax"),n.createBlob=e("./deps/blob"),n.uuid=e("./deps/uuid"),n.getArguments=e("argsarray");var u=e("./deps/buffer"),c=e("./deps/errors"),f=e("events").EventEmitter,l=e("./deps/collections");n.Map=l.Map,n.Set=l.Set,n.Promise="function"==typeof r.Promise?r.Promise:e("bluebird");var d=n.Promise,h=o(["_id","_rev","_attachments","_deleted","_revisions","_revs_info","_conflicts","_deleted_conflicts","_local_seq","_rev_tree","_replication_id","_replication_state","_replication_state_time","_replication_state_reason","_replication_stats"]),p=o(["_attachments","_replication_id","_replication_state","_replication_state_time","_replication_state_reason","_replication_stats"]);n.lastIndexOf=function(e,t){for(var n=e.length-1;n>=0;n--)if(e.charAt(n)===t)return n;return-1},n.clone=function(e){return n.extend(!0,{},e)},n.pick=function(e,t){for(var n={},r=0,o=t.length;o>r;r++){var i=t[r];n[i]=e[i]}return n},n.inherits=e("inherits"),n.invalidIdError=function(e){var t;if(e?"string"!=typeof e?(t=new TypeError(c.INVALID_ID.message),t.status=400):/^_/.test(e)&&!/^_(design|local)/.test(e)&&(t=new TypeError(c.RESERVED_ID.message),t.status=400):(t=new TypeError(c.MISSING_ID.message),t.status=412),t)throw t},n.call=n.getArguments(function(e){if(e.length){var t=e.shift();"function"==typeof t&&t.apply(this,e)}}),n.isLocalId=function(e){return/^_local/.test(e)},n.isDeleted=function(e,t){t||(t=a.winningRev(e));var n=t.indexOf("-");-1!==n&&(t=t.substring(n+1));var r=!1;return a.traverseRevTree(e.rev_tree,function(e,n,o,i,s){o===t&&(r=!!s.deleted)}),r},n.revExists=function(e,t){var n=!1;return a.traverseRevTree(e.rev_tree,function(e,r,o){r+"-"+o===t&&(n=!0)}),n},n.filterChange=function(e){var t={},n=e.filter&&"function"==typeof e.filter;return t.query=e.query_params,function(r){if(e.filter&&n&&!e.filter.call(this,r.doc,t))return!1;if(e.include_docs){if(!e.attachments)for(var o in r.doc._attachments)r.doc._attachments.hasOwnProperty(o)&&(r.doc._attachments[o].stub=!0)}else delete r.doc;return!0}},n.parseDoc=function(e,t){var r,o,i,s,a={status:"available"};if(e._deleted&&(a.deleted=!0),t)if(e._id||(e._id=n.uuid()),o=n.uuid(32,16).toLowerCase(),e._rev){if(i=/^(\d+)-(.+)$/.exec(e._rev),!i)return s=new Error("bad_request"),s.message="Invalid rev format",s.error=!0,s;e._rev_tree=[{pos:parseInt(i[1],10),ids:[i[2],{status:"missing"},[[o,a,[]]]]}],r=parseInt(i[1],10)+1}else e._rev_tree=[{pos:1,ids:[o,a,[]]}],r=1;else if(e._revisions&&(e._rev_tree=[{pos:e._revisions.start-e._revisions.ids.length+1,ids:e._revisions.ids.reduce(function(e,t){return null===e?[t,a,[]]:[t,{status:"missing"},[e]]},null)}],r=e._revisions.start,o=e._revisions.ids[0]),!e._rev_tree){if(i=/^(\d+)-(.+)$/.exec(e._rev),!i)return s=new Error("bad_request"),s.message="Invalid rev format",s.error=!0,s;r=parseInt(i[1],10),o=i[2],e._rev_tree=[{pos:parseInt(i[1],10),ids:[i[2],a,[]]}]}n.invalidIdError(e._id),e._rev=[r,o].join("-");var u={metadata:{},data:{}};for(var f in e)if(e.hasOwnProperty(f)){var l="_"===f[0];if(l&&!h[f])throw s=new Error(c.DOC_VALIDATION.message+": "+f),s.status=c.DOC_VALIDATION.status,s;l&&!p[f]?u.metadata[f.slice(1)]=e[f]:u.data[f]=e[f]}return u},n.isCordova=function(){return"undefined"!=typeof cordova||"undefined"!=typeof PhoneGap||"undefined"!=typeof phonegap},n.hasLocalStorage=function(){if(i())return!1;try{return r.localStorage}catch(e){return!1}},n.Changes=s,n.inherits(s,f),s.prototype.addListener=function(e,t,r,o){function i(){r.changes({include_docs:o.include_docs,attachments:o.attachments,conflicts:o.conflicts,continuous:!1,descending:!1,filter:o.filter,doc_ids:o.doc_ids,view:o.view,since:o.since,query_params:o.query_params,onChange:function(e){e.seq>o.since&&!o.cancelled&&(o.since=e.seq,n.call(o.onChange,e))}})}this.listeners[t]||(this.listeners[t]=i,this.on(e,i))},s.prototype.removeListener=function(e,t){t in this.listeners&&f.prototype.removeListener.call(this,e,this.listeners[t])},s.prototype.notifyLocalWindows=function(e){this.isChrome?chrome.storage.local.set({dbName:e}):this.hasLocal&&(localStorage[e]="a"===localStorage[e]?"b":"a")},s.prototype.notify=function(e){this.emit(e),this.notifyLocalWindows(e)},n.atob=t.browser&&"atob"in r?function(e){return atob(e)}:function(e){var t=new u(e,"base64");if(t.toString("base64")!==e)throw"Cannot base64 encode full string";return t.toString("binary")},n.btoa=t.browser&&"btoa"in r?function(e){return btoa(e)}:function(e){return new u(e,"binary").toString("base64")},n.fixBinary=function(e){if(!t.browser)return e;for(var n=e.length,r=new ArrayBuffer(n),o=new Uint8Array(r),i=0;n>i;i++)o[i]=e.charCodeAt(i);return r},n.readAsBinaryString=function(e,t){var r=new FileReader,o="function"==typeof r.readAsBinaryString;r.onloadend=function(e){var r=e.target.result||"";return o?t(r):void t(n.arrayBufferToBinaryString(r))},o?r.readAsBinaryString(e):r.readAsArrayBuffer(e)},n.once=function(e){var t=!1;return n.getArguments(function(n){if(t)throw new Error("once called  more than once");t=!0,e.apply(this,n)})},n.toPromise=function(e){return n.getArguments(function(r){var o,i=this,s="function"==typeof r[r.length-1]?r.pop():!1;s&&(o=function(e,n){t.nextTick(function(){s(e,n)})});var a=new d(function(t,o){var s;try{var a=n.once(function(e,n){e?o(e):t(n)});r.push(a),s=e.apply(i,r),s&&"function"==typeof s.then&&t(s)}catch(u){o(u)}});return o&&a.then(function(e){o(null,e)},o),a.cancel=function(){return this},a})},n.adapterFun=function(t,r){function o(e,t,n){if(i.enabled){for(var r=[e._db_name,t],o=0;o<n.length-1;o++)r.push(n[o]);i.apply(null,r);var s=n[n.length-1];n[n.length-1]=function(n,r){var o=[e._db_name,t];o=o.concat(n?["error",n]:["success",r]),i.apply(null,o),s(n,r)}}}var i=e("debug")("pouchdb:api");return n.toPromise(n.getArguments(function(e){if(this._closed)return d.reject(new Error("database is closed"));var i=this;return o(i,t,e),this.taskqueue.isReady?r.apply(this,e):new n.Promise(function(n,r){i.taskqueue.addTask(function(o){o?r(o):n(i[t].apply(i,e))})})}))},n.arrayBufferToBinaryString=function(e){for(var t="",n=new Uint8Array(e),r=n.byteLength,o=0;r>o;o++)t+=String.fromCharCode(n[o]);return t},n.cancellableFun=function(e,t,r){r=r?n.clone(!0,{},r):{};var o=new f,i=r.complete||function(){},s=r.complete=n.once(function(e,t){e?i(e):(o.emit("end",t),i(null,t)),o.removeAllListeners()}),a=r.onChange||function(){},u=0;t.on("destroyed",function(){o.removeAllListeners()}),r.onChange=function(e){a(e),e.seq<=u||(u=e.seq,o.emit("change",e),e.deleted?o.emit("delete",e):1===e.changes.length&&"1-"===e.changes[0].rev.slice(0,1)?o.emit("create",e):o.emit("update",e))};var c=new d(function(e,t){r.complete=function(n,r){n?t(n):e(r)}});return c.then(function(e){s(null,e)},s),c.cancel=function(){c.isCancelled=!0,t.taskqueue.isReady&&r.complete(null,{status:"cancelled"})},t.taskqueue.isReady?e(t,r,c):t.taskqueue.addTask(function(){c.isCancelled?r.complete(null,{status:"cancelled"}):e(t,r,c)}),c.on=o.on.bind(o),c.once=o.once.bind(o),c.addListener=o.addListener.bind(o),c.removeListener=o.removeListener.bind(o),c.removeAllListeners=o.removeAllListeners.bind(o),c.setMaxListeners=o.setMaxListeners.bind(o),c.listeners=o.listeners.bind(o),c.emit=o.emit.bind(o),c},n.MD5=n.toPromise(e("./deps/md5")),n.explain404=function(e){t.browser&&"console"in r&&"info"in console&&console.info("The above 404 is totally normal. "+e)},n.parseUri=e("./deps/parse-uri"),n.compare=function(e,t){return t>e?-1:e>t?1:0},n.updateDoc=function(e,t,r,o,i,s,u){if(n.revExists(e,t.metadata.rev))return r[o]=t,i();
var f=n.isDeleted(e),l=n.isDeleted(t.metadata),d=/^1-/.test(t.metadata.rev);if(f&&!l&&u&&d){var h=t.data;h._rev=a.winningRev(e),h._id=t.metadata.id,t=n.parseDoc(h,u)}var p=a.merge(e.rev_tree,t.metadata.rev_tree[0],1e3),v=u&&(f&&l||!f&&"new_leaf"!==p.conflicts||f&&!l&&"new_branch"===p.conflicts);if(v){var g=c.REV_CONFLICT;return r[o]=g,i()}t.metadata.rev_tree=p.tree;var y=a.winningRev(t.metadata);l=n.isDeleted(t.metadata,y),s(t,y,l,i,!0,o)},n.processDocs=function(e,t,r,o,i,s,u){function f(e,t,r){var o=a.winningRev(e.metadata),f=n.isDeleted(e.metadata,o);return"was_delete"in u&&f?(i[t]=c.MISSING_DOC,r()):void s(e,o,f,r,!1,t)}if(e.length){var l=u.new_edits,d=new n.Map;e.forEach(function(e,r){if(e._id&&n.isLocalId(e._id))return void t[e._deleted?"_removeLocal":"_putLocal"](e,{ctx:o},function(e){i[r]=e?e:{}});var s=e.metadata.id;d.has(s)?d.get(s).push([e,r]):d.set(s,[[e,r]])}),d.forEach(function(e,t){function o(){++u<e.length&&a()}function a(){var a=e[u],c=a[0],d=a[1];r.has(t)?n.updateDoc(r.get(t),c,i,d,o,s,l):f(c,d,o)}var u=0;a()})}},n.preprocessAttachments=function(e,t,r){function o(e){try{return n.atob(e)}catch(t){var r=c.error(c.BAD_ARG,"Attachments need to be base64 encoded");return{error:r}}}function i(e,r){if(e.stub)return r();if("string"==typeof e.data){var i=o(e.data);if(i.error)return r(i.error);e.length=i.length,e.data="blob"===t?n.createBlob([n.fixBinary(i)],{type:e.content_type}):"base64"===t?n.btoa(i):i,n.MD5(i).then(function(t){e.digest="md5-"+t,r()})}else n.readAsBinaryString(e.data,function(o){"binary"===t?e.data=o:"base64"===t&&(e.data=n.btoa(o)),n.MD5(o).then(function(t){e.digest="md5-"+t,e.length=o.length,r()})})}function s(){u++,e.length===u&&(a?r(a):r())}if(!e.length)return r();var a,u=0;e.forEach(function(e){function t(e){a=e,r++,r===n.length&&s()}var n=e.data&&e.data._attachments?Object.keys(e.data._attachments):[],r=0;if(!n.length)return s();for(var o in e.data._attachments)e.data._attachments.hasOwnProperty(o)&&i(e.data._attachments[o],t)})}}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./deps/ajax":9,"./deps/blob":10,"./deps/buffer":28,"./deps/collections":11,"./deps/errors":12,"./deps/md5":13,"./deps/parse-uri":15,"./deps/uuid":17,"./merge":20,_process:34,argsarray:27,bluebird:42,debug:35,events:33,inherits:38,"pouchdb-extend":57}],26:[function(e,t){t.exports="3.2.0"},{}],27:[function(e,t){"use strict";function n(e){return function(){var t=arguments.length;if(t){for(var n=[],r=-1;++r<t;)n[r]=arguments[r];return e.call(this,n)}return e.call(this,[])}}t.exports=n},{}],28:[function(){},{}],29:[function(e,t,n){function r(e,t,n){if(!(this instanceof r))return new r(e,t,n);var o,i=typeof e;if("number"===i)o=e>0?e>>>0:0;else if("string"===i)"base64"===t&&(e=S(e)),o=r.byteLength(e,t);else{if("object"!==i||null===e)throw new TypeError("must start with number, buffer, array or string");"Buffer"===e.type&&N(e.data)&&(e=e.data),o=+e.length>0?Math.floor(+e.length):0}if(this.length>j)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+j.toString(16)+" bytes");var s;r.TYPED_ARRAY_SUPPORT?s=r._augment(new Uint8Array(o)):(s=this,s.length=o,s._isBuffer=!0);var a;if(r.TYPED_ARRAY_SUPPORT&&"number"==typeof e.byteLength)s._set(e);else if(k(e))if(r.isBuffer(e))for(a=0;o>a;a++)s[a]=e.readUInt8(a);else for(a=0;o>a;a++)s[a]=(e[a]%256+256)%256;else if("string"===i)s.write(e,0,t);else if("number"===i&&!r.TYPED_ARRAY_SUPPORT&&!n)for(a=0;o>a;a++)s[a]=0;return s}function o(e,t,n,r){n=Number(n)||0;var o=e.length-n;r?(r=Number(r),r>o&&(r=o)):r=o;var i=t.length;if(i%2!==0)throw new Error("Invalid hex string");r>i/2&&(r=i/2);for(var s=0;r>s;s++){var a=parseInt(t.substr(2*s,2),16);if(isNaN(a))throw new Error("Invalid hex string");e[n+s]=a}return s}function i(e,t,n,r){var o=R(x(t),e,n,r);return o}function s(e,t,n,r){var o=R(I(t),e,n,r);return o}function a(e,t,n,r){return s(e,t,n,r)}function u(e,t,n,r){var o=R(L(t),e,n,r);return o}function c(e,t,n,r){var o=R(q(t),e,n,r);return o}function f(e,t,n){return D.fromByteArray(0===t&&n===e.length?e:e.slice(t,n))}function l(e,t,n){var r="",o="";n=Math.min(e.length,n);for(var i=t;n>i;i++)e[i]<=127?(r+=O(o)+String.fromCharCode(e[i]),o=""):o+="%"+e[i].toString(16);return r+O(o)}function d(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;n>o;o++)r+=String.fromCharCode(e[o]);return r}function h(e,t,n){return d(e,t,n)}function p(e,t,n){var r=e.length;(!t||0>t)&&(t=0),(!n||0>n||n>r)&&(n=r);for(var o="",i=t;n>i;i++)o+=T(e[i]);return o}function v(e,t,n){for(var r=e.slice(t,n),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}function g(e,t,n){if(e%1!==0||0>e)throw new RangeError("offset is not uint");if(e+t>n)throw new RangeError("Trying to access beyond buffer length")}function y(e,t,n,o,i,s){if(!r.isBuffer(e))throw new TypeError("buffer must be a Buffer instance");if(t>i||s>t)throw new TypeError("value is out of bounds");if(n+o>e.length)throw new TypeError("index out of range")}function m(e,t,n,r){0>t&&(t=65535+t+1);for(var o=0,i=Math.min(e.length-n,2);i>o;o++)e[n+o]=(t&255<<8*(r?o:1-o))>>>8*(r?o:1-o)}function _(e,t,n,r){0>t&&(t=4294967295+t+1);for(var o=0,i=Math.min(e.length-n,4);i>o;o++)e[n+o]=t>>>8*(r?o:3-o)&255}function b(e,t,n,r,o,i){if(t>o||i>t)throw new TypeError("value is out of bounds");if(n+r>e.length)throw new TypeError("index out of range")}function w(e,t,n,r,o){return o||b(e,t,n,4,3.4028234663852886e38,-3.4028234663852886e38),C.write(e,t,n,r,23,4),n+4}function E(e,t,n,r,o){return o||b(e,t,n,8,1.7976931348623157e308,-1.7976931348623157e308),C.write(e,t,n,r,52,8),n+8}function S(e){for(e=A(e).replace(P,"");e.length%4!==0;)e+="=";return e}function A(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function k(e){return N(e)||r.isBuffer(e)||e&&"object"==typeof e&&"number"==typeof e.length}function T(e){return 16>e?"0"+e.toString(16):e.toString(16)}function x(e){for(var t=[],n=0;n<e.length;n++){var r=e.charCodeAt(n);if(127>=r)t.push(r);else{var o=n;r>=55296&&57343>=r&&n++;for(var i=encodeURIComponent(e.slice(o,n+1)).substr(1).split("%"),s=0;s<i.length;s++)t.push(parseInt(i[s],16))}}return t}function I(e){for(var t=[],n=0;n<e.length;n++)t.push(255&e.charCodeAt(n));return t}function q(e){for(var t,n,r,o=[],i=0;i<e.length;i++)t=e.charCodeAt(i),n=t>>8,r=t%256,o.push(r),o.push(n);return o}function L(e){return D.toByteArray(e)}function R(e,t,n,r){for(var o=0;r>o&&!(o+n>=t.length||o>=e.length);o++)t[o+n]=e[o];return o}function O(e){try{return decodeURIComponent(e)}catch(t){return String.fromCharCode(65533)}}var D=e("base64-js"),C=e("ieee754"),N=e("is-array");n.Buffer=r,n.SlowBuffer=r,n.INSPECT_MAX_BYTES=50,r.poolSize=8192;var j=1073741823;r.TYPED_ARRAY_SUPPORT=function(){try{var e=new ArrayBuffer(0),t=new Uint8Array(e);return t.foo=function(){return 42},42===t.foo()&&"function"==typeof t.subarray&&0===new Uint8Array(1).subarray(1,1).byteLength}catch(n){return!1}}(),r.isBuffer=function(e){return!(null==e||!e._isBuffer)},r.compare=function(e,t){if(!r.isBuffer(e)||!r.isBuffer(t))throw new TypeError("Arguments must be Buffers");for(var n=e.length,o=t.length,i=0,s=Math.min(n,o);s>i&&e[i]===t[i];i++);return i!==s&&(n=e[i],o=t[i]),o>n?-1:n>o?1:0},r.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},r.concat=function(e,t){if(!N(e))throw new TypeError("Usage: Buffer.concat(list[, length])");if(0===e.length)return new r(0);if(1===e.length)return e[0];var n;if(void 0===t)for(t=0,n=0;n<e.length;n++)t+=e[n].length;var o=new r(t),i=0;for(n=0;n<e.length;n++){var s=e[n];s.copy(o,i),i+=s.length}return o},r.byteLength=function(e,t){var n;switch(e+="",t||"utf8"){case"ascii":case"binary":case"raw":n=e.length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":n=2*e.length;break;case"hex":n=e.length>>>1;break;case"utf8":case"utf-8":n=x(e).length;break;case"base64":n=L(e).length;break;default:n=e.length}return n},r.prototype.length=void 0,r.prototype.parent=void 0,r.prototype.toString=function(e,t,n){var r=!1;if(t>>>=0,n=void 0===n||1/0===n?this.length:n>>>0,e||(e="utf8"),0>t&&(t=0),n>this.length&&(n=this.length),t>=n)return"";for(;;)switch(e){case"hex":return p(this,t,n);case"utf8":case"utf-8":return l(this,t,n);case"ascii":return d(this,t,n);case"binary":return h(this,t,n);case"base64":return f(this,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return v(this,t,n);default:if(r)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),r=!0}},r.prototype.equals=function(e){if(!r.isBuffer(e))throw new TypeError("Argument must be a Buffer");return 0===r.compare(this,e)},r.prototype.inspect=function(){var e="",t=n.INSPECT_MAX_BYTES;return this.length>0&&(e=this.toString("hex",0,t).match(/.{2}/g).join(" "),this.length>t&&(e+=" ... ")),"<Buffer "+e+">"},r.prototype.compare=function(e){if(!r.isBuffer(e))throw new TypeError("Argument must be a Buffer");return r.compare(this,e)},r.prototype.get=function(e){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(e)},r.prototype.set=function(e,t){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(e,t)},r.prototype.write=function(e,t,n,r){if(isFinite(t))isFinite(n)||(r=n,n=void 0);else{var f=r;r=t,t=n,n=f}t=Number(t)||0;var l=this.length-t;n?(n=Number(n),n>l&&(n=l)):n=l,r=String(r||"utf8").toLowerCase();var d;switch(r){case"hex":d=o(this,e,t,n);break;case"utf8":case"utf-8":d=i(this,e,t,n);break;case"ascii":d=s(this,e,t,n);break;case"binary":d=a(this,e,t,n);break;case"base64":d=u(this,e,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":d=c(this,e,t,n);break;default:throw new TypeError("Unknown encoding: "+r)}return d},r.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},r.prototype.slice=function(e,t){var n=this.length;if(e=~~e,t=void 0===t?n:~~t,0>e?(e+=n,0>e&&(e=0)):e>n&&(e=n),0>t?(t+=n,0>t&&(t=0)):t>n&&(t=n),e>t&&(t=e),r.TYPED_ARRAY_SUPPORT)return r._augment(this.subarray(e,t));for(var o=t-e,i=new r(o,void 0,!0),s=0;o>s;s++)i[s]=this[s+e];return i},r.prototype.readUInt8=function(e,t){return t||g(e,1,this.length),this[e]},r.prototype.readUInt16LE=function(e,t){return t||g(e,2,this.length),this[e]|this[e+1]<<8},r.prototype.readUInt16BE=function(e,t){return t||g(e,2,this.length),this[e]<<8|this[e+1]},r.prototype.readUInt32LE=function(e,t){return t||g(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},r.prototype.readUInt32BE=function(e,t){return t||g(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},r.prototype.readInt8=function(e,t){return t||g(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},r.prototype.readInt16LE=function(e,t){t||g(e,2,this.length);var n=this[e]|this[e+1]<<8;return 32768&n?4294901760|n:n},r.prototype.readInt16BE=function(e,t){t||g(e,2,this.length);var n=this[e+1]|this[e]<<8;return 32768&n?4294901760|n:n},r.prototype.readInt32LE=function(e,t){return t||g(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},r.prototype.readInt32BE=function(e,t){return t||g(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},r.prototype.readFloatLE=function(e,t){return t||g(e,4,this.length),C.read(this,e,!0,23,4)},r.prototype.readFloatBE=function(e,t){return t||g(e,4,this.length),C.read(this,e,!1,23,4)},r.prototype.readDoubleLE=function(e,t){return t||g(e,8,this.length),C.read(this,e,!0,52,8)},r.prototype.readDoubleBE=function(e,t){return t||g(e,8,this.length),C.read(this,e,!1,52,8)},r.prototype.writeUInt8=function(e,t,n){return e=+e,t>>>=0,n||y(this,e,t,1,255,0),r.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),this[t]=e,t+1},r.prototype.writeUInt16LE=function(e,t,n){return e=+e,t>>>=0,n||y(this,e,t,2,65535,0),r.TYPED_ARRAY_SUPPORT?(this[t]=e,this[t+1]=e>>>8):m(this,e,t,!0),t+2},r.prototype.writeUInt16BE=function(e,t,n){return e=+e,t>>>=0,n||y(this,e,t,2,65535,0),r.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=e):m(this,e,t,!1),t+2},r.prototype.writeUInt32LE=function(e,t,n){return e=+e,t>>>=0,n||y(this,e,t,4,4294967295,0),r.TYPED_ARRAY_SUPPORT?(this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=e):_(this,e,t,!0),t+4},r.prototype.writeUInt32BE=function(e,t,n){return e=+e,t>>>=0,n||y(this,e,t,4,4294967295,0),r.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=e):_(this,e,t,!1),t+4},r.prototype.writeInt8=function(e,t,n){return e=+e,t>>>=0,n||y(this,e,t,1,127,-128),r.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),0>e&&(e=255+e+1),this[t]=e,t+1},r.prototype.writeInt16LE=function(e,t,n){return e=+e,t>>>=0,n||y(this,e,t,2,32767,-32768),r.TYPED_ARRAY_SUPPORT?(this[t]=e,this[t+1]=e>>>8):m(this,e,t,!0),t+2},r.prototype.writeInt16BE=function(e,t,n){return e=+e,t>>>=0,n||y(this,e,t,2,32767,-32768),r.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=e):m(this,e,t,!1),t+2},r.prototype.writeInt32LE=function(e,t,n){return e=+e,t>>>=0,n||y(this,e,t,4,2147483647,-2147483648),r.TYPED_ARRAY_SUPPORT?(this[t]=e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24):_(this,e,t,!0),t+4},r.prototype.writeInt32BE=function(e,t,n){return e=+e,t>>>=0,n||y(this,e,t,4,2147483647,-2147483648),0>e&&(e=4294967295+e+1),r.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=e):_(this,e,t,!1),t+4},r.prototype.writeFloatLE=function(e,t,n){return w(this,e,t,!0,n)},r.prototype.writeFloatBE=function(e,t,n){return w(this,e,t,!1,n)},r.prototype.writeDoubleLE=function(e,t,n){return E(this,e,t,!0,n)},r.prototype.writeDoubleBE=function(e,t,n){return E(this,e,t,!1,n)},r.prototype.copy=function(e,t,n,o){var i=this;if(n||(n=0),o||0===o||(o=this.length),t||(t=0),o!==n&&0!==e.length&&0!==i.length){if(n>o)throw new TypeError("sourceEnd < sourceStart");if(0>t||t>=e.length)throw new TypeError("targetStart out of bounds");if(0>n||n>=i.length)throw new TypeError("sourceStart out of bounds");if(0>o||o>i.length)throw new TypeError("sourceEnd out of bounds");o>this.length&&(o=this.length),e.length-t<o-n&&(o=e.length-t+n);var s=o-n;if(1e3>s||!r.TYPED_ARRAY_SUPPORT)for(var a=0;s>a;a++)e[a+t]=this[a+n];else e._set(this.subarray(n,n+s),t)}},r.prototype.fill=function(e,t,n){if(e||(e=0),t||(t=0),n||(n=this.length),t>n)throw new TypeError("end < start");if(n!==t&&0!==this.length){if(0>t||t>=this.length)throw new TypeError("start out of bounds");if(0>n||n>this.length)throw new TypeError("end out of bounds");var r;if("number"==typeof e)for(r=t;n>r;r++)this[r]=e;else{var o=x(e.toString()),i=o.length;for(r=t;n>r;r++)this[r]=o[r%i]}return this}},r.prototype.toArrayBuffer=function(){if("undefined"!=typeof Uint8Array){if(r.TYPED_ARRAY_SUPPORT)return new r(this).buffer;for(var e=new Uint8Array(this.length),t=0,n=e.length;n>t;t+=1)e[t]=this[t];return e.buffer}throw new TypeError("Buffer.toArrayBuffer not supported in this browser")};var B=r.prototype;r._augment=function(e){return e.constructor=r,e._isBuffer=!0,e._get=e.get,e._set=e.set,e.get=B.get,e.set=B.set,e.write=B.write,e.toString=B.toString,e.toLocaleString=B.toString,e.toJSON=B.toJSON,e.equals=B.equals,e.compare=B.compare,e.copy=B.copy,e.slice=B.slice,e.readUInt8=B.readUInt8,e.readUInt16LE=B.readUInt16LE,e.readUInt16BE=B.readUInt16BE,e.readUInt32LE=B.readUInt32LE,e.readUInt32BE=B.readUInt32BE,e.readInt8=B.readInt8,e.readInt16LE=B.readInt16LE,e.readInt16BE=B.readInt16BE,e.readInt32LE=B.readInt32LE,e.readInt32BE=B.readInt32BE,e.readFloatLE=B.readFloatLE,e.readFloatBE=B.readFloatBE,e.readDoubleLE=B.readDoubleLE,e.readDoubleBE=B.readDoubleBE,e.writeUInt8=B.writeUInt8,e.writeUInt16LE=B.writeUInt16LE,e.writeUInt16BE=B.writeUInt16BE,e.writeUInt32LE=B.writeUInt32LE,e.writeUInt32BE=B.writeUInt32BE,e.writeInt8=B.writeInt8,e.writeInt16LE=B.writeInt16LE,e.writeInt16BE=B.writeInt16BE,e.writeInt32LE=B.writeInt32LE,e.writeInt32BE=B.writeInt32BE,e.writeFloatLE=B.writeFloatLE,e.writeFloatBE=B.writeFloatBE,e.writeDoubleLE=B.writeDoubleLE,e.writeDoubleBE=B.writeDoubleBE,e.fill=B.fill,e.inspect=B.inspect,e.toArrayBuffer=B.toArrayBuffer,e};var P=/[^+\/0-9A-z]/g},{"base64-js":30,ieee754:31,"is-array":32}],30:[function(e,t,n){var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";!function(e){"use strict";function t(e){var t=e.charCodeAt(0);return t===s?62:t===a?63:u>t?-1:u+10>t?t-u+26+26:f+26>t?t-f:c+26>t?t-c+26:void 0}function n(e){function n(e){c[l++]=e}var r,o,s,a,u,c;if(e.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var f=e.length;u="="===e.charAt(f-2)?2:"="===e.charAt(f-1)?1:0,c=new i(3*e.length/4-u),s=u>0?e.length-4:e.length;var l=0;for(r=0,o=0;s>r;r+=4,o+=3)a=t(e.charAt(r))<<18|t(e.charAt(r+1))<<12|t(e.charAt(r+2))<<6|t(e.charAt(r+3)),n((16711680&a)>>16),n((65280&a)>>8),n(255&a);return 2===u?(a=t(e.charAt(r))<<2|t(e.charAt(r+1))>>4,n(255&a)):1===u&&(a=t(e.charAt(r))<<10|t(e.charAt(r+1))<<4|t(e.charAt(r+2))>>2,n(a>>8&255),n(255&a)),c}function o(e){function t(e){return r.charAt(e)}function n(e){return t(e>>18&63)+t(e>>12&63)+t(e>>6&63)+t(63&e)}var o,i,s,a=e.length%3,u="";for(o=0,s=e.length-a;s>o;o+=3)i=(e[o]<<16)+(e[o+1]<<8)+e[o+2],u+=n(i);switch(a){case 1:i=e[e.length-1],u+=t(i>>2),u+=t(i<<4&63),u+="==";break;case 2:i=(e[e.length-2]<<8)+e[e.length-1],u+=t(i>>10),u+=t(i>>4&63),u+=t(i<<2&63),u+="="}return u}var i="undefined"!=typeof Uint8Array?Uint8Array:Array,s="+".charCodeAt(0),a="/".charCodeAt(0),u="0".charCodeAt(0),c="a".charCodeAt(0),f="A".charCodeAt(0);e.toByteArray=n,e.fromByteArray=o}("undefined"==typeof n?this.base64js={}:n)},{}],31:[function(e,t,n){n.read=function(e,t,n,r,o){var i,s,a=8*o-r-1,u=(1<<a)-1,c=u>>1,f=-7,l=n?o-1:0,d=n?-1:1,h=e[t+l];for(l+=d,i=h&(1<<-f)-1,h>>=-f,f+=a;f>0;i=256*i+e[t+l],l+=d,f-=8);for(s=i&(1<<-f)-1,i>>=-f,f+=r;f>0;s=256*s+e[t+l],l+=d,f-=8);if(0===i)i=1-c;else{if(i===u)return s?0/0:1/0*(h?-1:1);s+=Math.pow(2,r),i-=c}return(h?-1:1)*s*Math.pow(2,i-r)},n.write=function(e,t,n,r,o,i){var s,a,u,c=8*i-o-1,f=(1<<c)-1,l=f>>1,d=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,h=r?0:i-1,p=r?1:-1,v=0>t||0===t&&0>1/t?1:0;for(t=Math.abs(t),isNaN(t)||1/0===t?(a=isNaN(t)?1:0,s=f):(s=Math.floor(Math.log(t)/Math.LN2),t*(u=Math.pow(2,-s))<1&&(s--,u*=2),t+=s+l>=1?d/u:d*Math.pow(2,1-l),t*u>=2&&(s++,u/=2),s+l>=f?(a=0,s=f):s+l>=1?(a=(t*u-1)*Math.pow(2,o),s+=l):(a=t*Math.pow(2,l-1)*Math.pow(2,o),s=0));o>=8;e[n+h]=255&a,h+=p,a/=256,o-=8);for(s=s<<o|a,c+=o;c>0;e[n+h]=255&s,h+=p,s/=256,c-=8);e[n+h-p]|=128*v}},{}],32:[function(e,t){var n=Array.isArray,r=Object.prototype.toString;t.exports=n||function(e){return!!e&&"[object Array]"==r.call(e)}},{}],33:[function(e,t){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function r(e){return"function"==typeof e}function o(e){return"number"==typeof e}function i(e){return"object"==typeof e&&null!==e}function s(e){return void 0===e}t.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(e){if(!o(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},n.prototype.emit=function(e){var t,n,o,a,u,c;if(this._events||(this._events={}),"error"===e&&(!this._events.error||i(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;throw TypeError('Uncaught, unspecified "error" event.')}if(n=this._events[e],s(n))return!1;if(r(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:for(o=arguments.length,a=new Array(o-1),u=1;o>u;u++)a[u-1]=arguments[u];n.apply(this,a)}else if(i(n)){for(o=arguments.length,a=new Array(o-1),u=1;o>u;u++)a[u-1]=arguments[u];for(c=n.slice(),o=c.length,u=0;o>u;u++)c[u].apply(this,a)}return!0},n.prototype.addListener=function(e,t){var o;if(!r(t))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,r(t.listener)?t.listener:t),this._events[e]?i(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,i(this._events[e])&&!this._events[e].warned){var o;o=s(this._maxListeners)?n.defaultMaxListeners:this._maxListeners,o&&o>0&&this._events[e].length>o&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())}return this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(e,t){function n(){this.removeListener(e,n),o||(o=!0,t.apply(this,arguments))}if(!r(t))throw TypeError("listener must be a function");var o=!1;return n.listener=t,this.on(e,n),this},n.prototype.removeListener=function(e,t){var n,o,s,a;if(!r(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],s=n.length,o=-1,n===t||r(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(i(n)){for(a=s;a-->0;)if(n[a]===t||n[a].listener&&n[a].listener===t){o=a;break}if(0>o)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(o,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},n.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],r(n))this.removeListener(e,n);else for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},n.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?r(this._events[e])?[this._events[e]]:this._events[e].slice():[]},n.listenerCount=function(e,t){var n;return n=e._events&&e._events[t]?r(e._events[t])?1:e._events[t].length:0}},{}],34:[function(e,t){function n(){}var r=t.exports={};r.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.MutationObserver,n="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};var r=[];if(t){var o=document.createElement("div"),i=new MutationObserver(function(){var e=r.slice();r.length=0,e.forEach(function(e){e()})});return i.observe(o,{attributes:!0}),function(e){r.length||o.setAttribute("yes","no"),r.push(e)}}return n?(window.addEventListener("message",function(e){var t=e.source;if((t===window||null===t)&&"process-tick"===e.data&&(e.stopPropagation(),r.length>0)){var n=r.shift();n()}},!0),function(e){r.push(e),window.postMessage("process-tick","*")}):function(e){setTimeout(e,0)}}(),r.title="browser",r.browser=!0,r.env={},r.argv=[],r.on=n,r.addListener=n,r.once=n,r.off=n,r.removeListener=n,r.removeAllListeners=n,r.emit=n,r.binding=function(){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(){throw new Error("process.chdir is not supported")}},{}],35:[function(e,t,n){function r(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function o(){var e=arguments,t=this.useColors;if(e[0]=(t?"%c":"")+this.namespace+(t?" %c":" ")+e[0]+(t?"%c ":" ")+"+"+n.humanize(this.diff),!t)return e;var r="color: "+this.color;e=[e[0],r,"color: inherit"].concat(Array.prototype.slice.call(e,1));var o=0,i=0;return e[0].replace(/%[a-z%]/g,function(e){"%"!==e&&(o++,"%c"===e&&(i=o))}),e.splice(i,0,r),e}function i(){return"object"==typeof console&&"function"==typeof console.log&&Function.prototype.apply.call(console.log,console,arguments)}function s(e){try{null==e?localStorage.removeItem("debug"):localStorage.debug=e}catch(t){}}function a(){var e;try{e=localStorage.debug}catch(t){}return e}n=t.exports=e("./debug"),n.log=i,n.formatArgs=o,n.save=s,n.load=a,n.useColors=r,n.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],n.formatters.j=function(e){return JSON.stringify(e)},n.enable(a())},{"./debug":36}],36:[function(e,t,n){function r(){return n.colors[f++%n.colors.length]}function o(e){function t(){}function o(){var e=o,t=+new Date,i=t-(c||t);e.diff=i,e.prev=c,e.curr=t,c=t,null==e.useColors&&(e.useColors=n.useColors()),null==e.color&&e.useColors&&(e.color=r());var s=Array.prototype.slice.call(arguments);s[0]=n.coerce(s[0]),"string"!=typeof s[0]&&(s=["%o"].concat(s));var a=0;s[0]=s[0].replace(/%([a-z%])/g,function(t,r){if("%"===t)return t;a++;var o=n.formatters[r];if("function"==typeof o){var i=s[a];t=o.call(e,i),s.splice(a,1),a--}return t}),"function"==typeof n.formatArgs&&(s=n.formatArgs.apply(e,s));var u=o.log||n.log||console.log.bind(console);u.apply(e,s)}t.enabled=!1,o.enabled=!0;var i=n.enabled(e)?o:t;return i.namespace=e,i}function i(e){n.save(e);for(var t=(e||"").split(/[\s,]+/),r=t.length,o=0;r>o;o++)t[o]&&(e=t[o].replace(/\*/g,".*?"),"-"===e[0]?n.skips.push(new RegExp("^"+e.substr(1)+"$")):n.names.push(new RegExp("^"+e+"$")))}function s(){n.enable("")}function a(e){var t,r;for(t=0,r=n.skips.length;r>t;t++)if(n.skips[t].test(e))return!1;for(t=0,r=n.names.length;r>t;t++)if(n.names[t].test(e))return!0;return!1}function u(e){return e instanceof Error?e.stack||e.message:e}n=t.exports=o,n.coerce=u,n.disable=s,n.enable=i,n.enabled=a,n.humanize=e("ms"),n.names=[],n.skips=[],n.formatters={};var c,f=0},{ms:37}],37:[function(e,t){function n(e){var t=/^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"y":return n*f;case"days":case"day":case"d":return n*c;case"hours":case"hour":case"h":return n*u;case"minutes":case"minute":case"m":return n*a;case"seconds":case"second":case"s":return n*s;case"ms":return n}}}function r(e){return e>=c?Math.round(e/c)+"d":e>=u?Math.round(e/u)+"h":e>=a?Math.round(e/a)+"m":e>=s?Math.round(e/s)+"s":e+"ms"}function o(e){return i(e,c,"day")||i(e,u,"hour")||i(e,a,"minute")||i(e,s,"second")||e+" ms"}function i(e,t,n){return t>e?void 0:1.5*t>e?Math.floor(e/t)+" "+n:Math.ceil(e/t)+" "+n+"s"}var s=1e3,a=60*s,u=60*a,c=24*u,f=365.25*c;t.exports=function(e,t){return t=t||{},"string"==typeof e?n(e):t.long?o(e):r(e)}},{}],38:[function(e,t){t.exports="function"==typeof Object.create?function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},{}],39:[function(e,t){"use strict";function n(){}t.exports=n},{}],40:[function(e,t){"use strict";function n(e){function t(e,t){function r(e){c[t]=e,++f===n&!u&&(u=!0,a.resolve(d,c))}i(e).then(r,function(e){u||(u=!0,a.reject(d,e))})}if("[object Array]"!==Object.prototype.toString.call(e))return o(new TypeError("must be an array"));var n=e.length,u=!1;if(!n)return i([]);for(var c=new Array(n),f=0,l=-1,d=new r(s);++l<n;)t(e[l],l);return d}var r=e("./promise"),o=e("./reject"),i=e("./resolve"),s=e("./INTERNAL"),a=e("./handlers");t.exports=n},{"./INTERNAL":39,"./handlers":41,"./promise":43,"./reject":46,"./resolve":47}],41:[function(e,t,n){"use strict";function r(e){var t=e&&e.then;return e&&"object"==typeof e&&"function"==typeof t?function(){t.apply(e,arguments)}:void 0}var o=e("./tryCatch"),i=e("./resolveThenable"),s=e("./states");n.resolve=function(e,t){var a=o(r,t);if("error"===a.status)return n.reject(e,a.value);var u=a.value;if(u)i.safely(e,u);else{e.state=s.FULFILLED,e.outcome=t;for(var c=-1,f=e.queue.length;++c<f;)e.queue[c].callFulfilled(t)}return e},n.reject=function(e,t){e.state=s.REJECTED,e.outcome=t;for(var n=-1,r=e.queue.length;++n<r;)e.queue[n].callRejected(t);return e}},{"./resolveThenable":48,"./states":49,"./tryCatch":50}],42:[function(e,t,n){t.exports=n=e("./promise"),n.resolve=e("./resolve"),n.reject=e("./reject"),n.all=e("./all"),n.race=e("./race")},{"./all":40,"./promise":43,"./race":45,"./reject":46,"./resolve":47}],43:[function(e,t){"use strict";function n(e){if(!(this instanceof n))return new n(e);if("function"!=typeof e)throw new TypeError("reslover must be a function");this.state=s.PENDING,this.queue=[],this.outcome=void 0,e!==o&&i.safely(this,e)}var r=e("./unwrap"),o=e("./INTERNAL"),i=e("./resolveThenable"),s=e("./states"),a=e("./queueItem");t.exports=n,n.prototype["catch"]=function(e){return this.then(null,e)},n.prototype.then=function(e,t){if("function"!=typeof e&&this.state===s.FULFILLED||"function"!=typeof t&&this.state===s.REJECTED)return this;var i=new n(o);if(this.state!==s.PENDING){var u=this.state===s.FULFILLED?e:t;r(i,u,this.outcome)}else this.queue.push(new a(i,e,t));return i}},{"./INTERNAL":39,"./queueItem":44,"./resolveThenable":48,"./states":49,"./unwrap":51}],44:[function(e,t){"use strict";function n(e,t,n){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof n&&(this.onRejected=n,this.callRejected=this.otherCallRejected)}var r=e("./handlers"),o=e("./unwrap");t.exports=n,n.prototype.callFulfilled=function(e){r.resolve(this.promise,e)},n.prototype.otherCallFulfilled=function(e){o(this.promise,this.onFulfilled,e)},n.prototype.callRejected=function(e){r.reject(this.promise,e)},n.prototype.otherCallRejected=function(e){o(this.promise,this.onRejected,e)}},{"./handlers":41,"./unwrap":51}],45:[function(e,t){"use strict";function n(e){function t(e){i(e).then(function(e){u||(u=!0,a.resolve(f,e))},function(e){u||(u=!0,a.reject(f,e))})}if("[object Array]"!==Object.prototype.toString.call(e))return o(new TypeError("must be an array"));var n=e.length,u=!1;if(!n)return i([]);for(var c=-1,f=new r(s);++c<n;)t(e[c]);return f}var r=e("./promise"),o=e("./reject"),i=e("./resolve"),s=e("./INTERNAL"),a=e("./handlers");t.exports=n},{"./INTERNAL":39,"./handlers":41,"./promise":43,"./reject":46,"./resolve":47}],46:[function(e,t){"use strict";function n(e){var t=new r(o);return i.reject(t,e)}var r=e("./promise"),o=e("./INTERNAL"),i=e("./handlers");t.exports=n},{"./INTERNAL":39,"./handlers":41,"./promise":43}],47:[function(e,t){"use strict";function n(e){if(e)return e instanceof r?e:i.resolve(new r(o),e);var t=typeof e;switch(t){case"boolean":return s;case"undefined":return u;case"object":return a;case"number":return c;case"string":return f}}var r=e("./promise"),o=e("./INTERNAL"),i=e("./handlers");t.exports=n;var s=i.resolve(new r(o),!1),a=i.resolve(new r(o),null),u=i.resolve(new r(o),void 0),c=i.resolve(new r(o),0),f=i.resolve(new r(o),"")},{"./INTERNAL":39,"./handlers":41,"./promise":43}],48:[function(e,t,n){"use strict";function r(e,t){function n(t){a||(a=!0,o.reject(e,t))}function r(t){a||(a=!0,o.resolve(e,t))}function s(){t(r,n)}var a=!1,u=i(s);"error"===u.status&&n(u.value)}var o=e("./handlers"),i=e("./tryCatch");n.safely=r},{"./handlers":41,"./tryCatch":50}],49:[function(e,t,n){n.REJECTED=["REJECTED"],n.FULFILLED=["FULFILLED"],n.PENDING=["PENDING"]},{}],50:[function(e,t){"use strict";function n(e,t){var n={};try{n.value=e(t),n.status="success"}catch(r){n.status="error",n.value=r}return n}t.exports=n},{}],51:[function(e,t){"use strict";function n(e,t,n){r(function(){var r;try{r=t(n)}catch(i){return o.reject(e,i)}r===e?o.reject(e,new TypeError("Cannot resolve promise with itself")):o.resolve(e,r)})}var r=e("immediate"),o=e("./handlers");t.exports=n},{"./handlers":41,immediate:52}],52:[function(e,t){"use strict";function n(){o=!0;for(var e,t,n=a.length;n;){for(t=a,a=[],e=-1;++e<n;)t[e]();n=a.length}o=!1}function r(e){1!==a.push(e)||o||i()}for(var o,i,s=[e("./nextTick"),e("./mutation.js"),e("./messageChannel"),e("./stateChange"),e("./timeout")],a=[],u=-1,c=s.length;++u<c;)if(s[u]&&s[u].test&&s[u].test()){i=s[u].install(n);
break}t.exports=r},{"./messageChannel":53,"./mutation.js":54,"./nextTick":28,"./stateChange":55,"./timeout":56}],53:[function(e,t,n){(function(e){"use strict";n.test=function(){return e.setImmediate?!1:"undefined"!=typeof e.MessageChannel},n.install=function(t){var n=new e.MessageChannel;return n.port1.onmessage=t,function(){n.port2.postMessage(0)}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],54:[function(e,t,n){(function(e){"use strict";var t=e.MutationObserver||e.WebKitMutationObserver;n.test=function(){return t},n.install=function(n){var r=0,o=new t(n),i=e.document.createTextNode("");return o.observe(i,{characterData:!0}),function(){i.data=r=++r%2}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],55:[function(e,t,n){(function(e){"use strict";n.test=function(){return"document"in e&&"onreadystatechange"in e.document.createElement("script")},n.install=function(t){return function(){var n=e.document.createElement("script");return n.onreadystatechange=function(){t(),n.onreadystatechange=null,n.parentNode.removeChild(n),n=null},e.document.documentElement.appendChild(n),t}}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],56:[function(e,t,n){"use strict";n.test=function(){return!0},n.install=function(e){return function(){setTimeout(e,0)}}},{}],57:[function(e,t){"use strict";function n(e){return null===e?String(e):"object"==typeof e||"function"==typeof e?u[d.call(e)]||"object":typeof e}function r(e){return null!==e&&e===e.window}function o(e){if(!e||"object"!==n(e)||e.nodeType||r(e))return!1;try{if(e.constructor&&!h.call(e,"constructor")&&!h.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}var o;for(o in e);return void 0===o||h.call(e,o)}function i(e){return"function"===n(e)}function s(){for(var e=[],t=-1,n=arguments.length,r=new Array(n);++t<n;)r[t]=arguments[t];var o={};e.push({args:r,result:{container:o,key:"key"}});for(var i;i=e.pop();)a(e,i.args,i.result);return o.key}function a(e,t,n){var r,s,a,u,c,f,l,d=t[0]||{},h=1,v=t.length,g=!1,y=/\d+/;for("boolean"==typeof d&&(g=d,d=t[1]||{},h=2),"object"==typeof d||i(d)||(d={}),v===h&&(d=this,--h);v>h;h++)if(null!=(r=t[h])){l=p(r);for(s in r)if(!(s in Object.prototype)){if(l&&!y.test(s))continue;if(a=d[s],u=r[s],d===u)continue;g&&u&&(o(u)||(c=p(u)))?(c?(c=!1,f=a&&p(a)?a:[]):f=a&&o(a)?a:{},e.push({args:[g,f,u],result:{container:d,key:s}})):void 0!==u&&(p(r)&&i(u)||(d[s]=u))}}n.container[n.key]=d}for(var u={},c=["Boolean","Number","String","Function","Array","Date","RegExp","Object","Error"],f=0;f<c.length;f++){var l=c[f];u["[object "+l+"]"]=l.toLowerCase()}var d=u.toString,h=u.hasOwnProperty,p=Array.isArray||function(e){return"array"===n(e)};t.exports=s},{}],58:[function(e,t){"use strict";var n=e("./upsert"),r=e("./utils"),o=r.Promise;t.exports=function(e){var t=e.db,i=e.viewName,s=e.map,a=e.reduce,u=e.temporary,c=s.toString()+(a&&a.toString())+"undefined";if(!u&&t._cachedViews){var f=t._cachedViews[c];if(f)return o.resolve(f)}return t.info().then(function(e){function o(e){e.views=e.views||{};var t=i;-1===t.indexOf("/")&&(t=i+"/"+i);var n=e.views[t]=e.views[t]||{};if(!n[f])return n[f]=!0,e}var f=e.db_name+"-mrview-"+(u?"temp":r.MD5(c));return n(t,"_local/mrviews",o).then(function(){return t.registerDependentDatabase(f).then(function(e){var n=e.db;n.auto_compaction=!0;var r={name:f,db:n,sourceDB:t,adapter:t.adapter,mapFun:s,reduceFun:a};return r.db.get("_local/lastSeq")["catch"](function(e){if(404!==e.status)throw e}).then(function(e){return r.seq=e?e.seq:0,u||(t._cachedViews=t._cachedViews||{},t._cachedViews[c]=r,r.db.on("destroyed",function(){delete t._cachedViews[c]})),r})})})})}},{"./upsert":64,"./utils":65}],59:[function(_dereq_,module,exports){"use strict";module.exports=function(func,emit,sum,log,isArray,toJSON){return eval("'use strict'; ("+func.replace(/;\s*$/,"")+");")}},{}],60:[function(e,t,n){(function(t){"use strict";function r(e){return-1===e.indexOf("/")?[e,e]:e.split("/")}function o(e,t,n){try{return{output:t.apply(null,n)}}catch(r){return e.emit("error",r),{error:r}}}function i(e,t){var n=A(e.key,t.key);return 0!==n?n:A(e.value,t.value)}function s(e,t,n){return n=n||0,"number"==typeof t?e.slice(n,t+n):n>0?e.slice(n):e}function a(e){var t=e.value,n=t&&"object"==typeof t&&t._id||e.id;return n}function u(e){var t=new Error("builtin "+e+" function requires map values to be numbers or number arrays");return t.name="invalid_value",t.status=500,t}function c(e){for(var t=0,n=0,r=e.length;r>n;n++){var o=e[n];if("number"!=typeof o){if(!Array.isArray(o))throw u("_sum");t="number"==typeof t?[t]:t;for(var i=0,s=o.length;s>i;i++){var a=o[i];if("number"!=typeof a)throw u("_sum");"undefined"==typeof t[i]?t.push(a):t[i]+=a}}else"number"==typeof t?t+=o:t[0]+=o}return t}function f(e,t,n,r){var o=t[e];"undefined"!=typeof o&&(r&&(o=encodeURIComponent(JSON.stringify(o))),n.push(e+"="+o))}function l(e,t){var n=e.descending?"endkey":"startkey",r=e.descending?"startkey":"endkey";if("undefined"!=typeof e[n]&&"undefined"!=typeof e[r]&&A(e[n],e[r])>0)throw new _("No rows can match your key range, reverse your start_key and end_key or set {descending : true}");if(t.reduce&&e.reduce!==!1){if(e.include_docs)throw new _("{include_docs:true} is invalid for reduce");if(e.keys&&e.keys.length>1&&!e.group&&!e.group_level)throw new _("Multi-key fetches for reduce views must use {group: true}")}if(e.group_level){if("number"!=typeof e.group_level)throw new _('Invalid value for integer: "'+e.group_level+'"');if(e.group_level<0)throw new _('Invalid value for positive integer: "'+e.group_level+'"')}}function d(e,t,n){var o,i=[],s="GET";if(f("reduce",n,i),f("include_docs",n,i),f("attachments",n,i),f("limit",n,i),f("descending",n,i),f("group",n,i),f("group_level",n,i),f("skip",n,i),f("stale",n,i),f("conflicts",n,i),f("startkey",n,i,!0),f("endkey",n,i,!0),f("inclusive_end",n,i),f("key",n,i,!0),i=i.join("&"),i=""===i?"":"?"+i,"undefined"!=typeof n.keys){var a=2e3,u="keys="+encodeURIComponent(JSON.stringify(n.keys));u.length+i.length+1<=a?i+=("?"===i[0]?"&":"?")+u:(s="POST","string"==typeof t?o=JSON.stringify({keys:n.keys}):t.keys=n.keys)}if("string"==typeof t){var c=r(t);return e.request({method:s,url:"_design/"+c[0]+"/_view/"+c[1]+i,body:o})}return o=o||{},Object.keys(t).forEach(function(e){o[e]=Array.isArray(t[e])?t[e]:t[e].toString()}),e.request({method:"POST",url:"_temp_view"+i,body:o})}function h(e){return function(t){if(404===t.status)return e;throw t}}function p(e,t,n){var r="_local/doc_"+e;return t.db.get(r)["catch"](h({_id:r,keys:[]})).then(function(r){return L.resolve().then(function(){return r.keys.length?t.db.allDocs({keys:r.keys,include_docs:!0}):{rows:[]}}).then(function(t){var o=t.rows.map(function(e){return e.doc}).filter(function(e){return e}),i=n[e],s={};o.forEach(function(e){if(s[e._id]=!0,e._deleted=!i[e._id],!e._deleted){var t=i[e._id];"value"in t&&(e.value=t.value)}});var a=Object.keys(i);return a.forEach(function(e){if(!s[e]){var t={_id:e},n=i[e];"value"in n&&(t.value=n.value),o.push(t)}}),r.keys=q.uniq(a.concat(r.keys)),o.splice(0,0,r),o})})}function v(e,t,n){var r="_local/lastSeq";return e.db.get(r)["catch"](h({_id:r,seq:0})).then(function(r){var o=Object.keys(t);return L.all(o.map(function(n){return p(n,e,t)})).then(function(t){var o=[];return t.forEach(function(e){o=o.concat(e)}),r.seq=n,o.push(r),e.db.bulkDocs({docs:o})})})}function g(e,t,n){0===n.group_level&&delete n.group_level;var r,i=n.group||n.group_level;r=C[e.reduceFun]?C[e.reduceFun]:I(e.reduceFun.toString(),null,c,w,Array.isArray,JSON.parse);var a=[],u=n.group_level;t.forEach(function(e){var t=a[a.length-1],n=i?e.key:null;return i&&Array.isArray(n)&&"number"==typeof u&&(n=n.length>u?n.slice(0,u):n),t&&0===A(t.key[0][0],n)?(t.key.push([n,e.id]),void t.value.push(e.value)):void a.push({key:[[n,e.id]],value:[e.value]})});for(var f=0,l=a.length;l>f;f++){var d=a[f],h=o(e.sourceDB,r,[d.key,d.value,!1]);d.value=h.error?null:h.output,d.key=d.key[0][0]}return{rows:s(a,n.limit,n.skip)}}function y(e){return e.request({method:"POST",url:"_view_cleanup"})}function m(e,n,o){if("http"===e.type())return d(e,n,o);if("string"!=typeof n){l(o,n);var i={db:e,viewName:"temp_view/temp_view",map:n.map,reduce:n.reduce,temporary:!0};return O.add(function(){return x(i).then(function(e){function t(){return e.db.destroy()}return q.fin(N(e).then(function(){return j(e,o)}),t)})}),O.finish()}var s=n,a=r(s),u=a[0],c=a[1];return e.get("_design/"+u).then(function(n){var r=n.views&&n.views[c];if(!r||"string"!=typeof r.map)throw new b("ddoc "+u+" has no view named "+c);l(o,r);var i={db:e,viewName:s,map:r.map,reduce:r.reduce};return x(i).then(function(e){return"ok"===o.stale||"update_after"===o.stale?("update_after"===o.stale&&t.nextTick(function(){N(e)}),j(e,o)):N(e).then(function(){return j(e,o)})})})}function _(e){this.status=400,this.name="query_parse_error",this.message=e,this.error=!0;try{Error.captureStackTrace(this,_)}catch(t){}}function b(e){this.status=404,this.name="not_found",this.message=e,this.error=!0;try{Error.captureStackTrace(this,b)}catch(t){}}var w,E=e("pouchdb-collate"),S=e("./taskqueue"),A=E.collate,k=E.toIndexableString,T=E.normalizeKey,x=e("./create-view"),I=e("./evalfunc");w="undefined"!=typeof console&&"function"==typeof console.log?Function.prototype.bind.call(console.log,console):function(){};var q=e("./utils"),L=q.Promise,R=new S,O=new S,D=50,C={_sum:function(e,t){return c(t)},_count:function(e,t){return t.length},_stats:function(e,t){function n(e){for(var t=0,n=0,r=e.length;r>n;n++){var o=e[n];t+=o*o}return t}return{sum:c(t),min:Math.min.apply(null,t),max:Math.max.apply(null,t),count:t.length,sumsqr:n(t)}}},N=q.sequentialize(R,function(e){function t(e,t){var n={id:s._id,key:T(e)};"undefined"!=typeof t&&null!==t&&(n.value=T(t)),r.push(n)}function n(t,n){return function(){return v(e,t,n)}}var r,s,a;if("function"==typeof e.mapFun&&2===e.mapFun.length){var u=e.mapFun;a=function(e){return u(e,t)}}else a=I(e.mapFun.toString(),t,c,w,Array.isArray,JSON.parse);var f=e.seq||0,l=new S;return new L(function(t,u){function c(){l.finish().then(function(){e.seq=f,t()})}function d(){function t(e){u(e)}e.sourceDB.changes({conflicts:!0,include_docs:!0,since:f,limit:D}).on("complete",function(t){var u=t.results;if(!u.length)return c();for(var h={},p=0,v=u.length;v>p;p++){var g=u[p];if("_"!==g.doc._id[0]){r=[],s=g.doc,s._deleted||o(e.sourceDB,a,[s]),r.sort(i);for(var y,m={},_=0,b=r.length;b>_;_++){var w=r[_],E=[w.key,w.id];w.key===y&&E.push(_);var S=k(E);m[S]=w,y=w.key}h[g.doc._id]=m}f=g.seq}return l.add(n(h,f)),u.length<D?c():d()}).on("error",t)}d()})}),j=q.sequentialize(R,function(e,t){function n(t){return t.include_docs=!0,e.db.allDocs(t).then(function(e){return o=e.total_rows,e.rows.map(function(e){if("value"in e.doc&&"object"==typeof e.doc.value&&null!==e.doc.value){var t=Object.keys(e.doc.value).sort(),n=["id","key","value"];if(!(n>t||t>n))return e.doc.value}var r=E.parseIndexableString(e.doc._id);return{key:r[0],id:r[1],value:"value"in e.doc?e.doc.value:null}})})}function r(n){var r;if(r=i?g(e,n,t):{total_rows:o,offset:s,rows:n},t.include_docs){var u=q.uniq(n.map(a));return e.sourceDB.allDocs({keys:u,include_docs:!0,conflicts:t.conflicts,attachments:t.attachments}).then(function(e){var t={};return e.rows.forEach(function(e){e.doc&&(t["$"+e.id]=e.doc)}),n.forEach(function(e){var n=a(e),r=t["$"+n];r&&(e.doc=r)}),r})}return r}var o,i=e.reduceFun&&t.reduce!==!1,s=t.skip||0;"undefined"==typeof t.keys||t.keys.length||(t.limit=0,delete t.keys);var u=function(e){return e.reduce(function(e,t){return e.concat(t)})};if("undefined"!=typeof t.keys){var c=t.keys,f=c.map(function(e){var t={startkey:k([e]),endkey:k([e,{}])};return n(t)});return L.all(f).then(u).then(r)}var l={descending:t.descending};if("undefined"!=typeof t.startkey&&(l.startkey=k(t.descending?[t.startkey,{}]:[t.startkey])),"undefined"!=typeof t.endkey){var d=t.inclusive_end!==!1;t.descending&&(d=!d),l.endkey=k(d?[t.endkey,{}]:[t.endkey])}if("undefined"!=typeof t.key){var h=k([t.key]),p=k([t.key,{}]);l.descending?(l.endkey=h,l.startkey=p):(l.startkey=h,l.endkey=p)}return i||("number"==typeof t.limit&&(l.limit=t.limit),l.skip=s),n(l).then(r)}),B=q.sequentialize(R,function(e){return e.get("_local/mrviews").then(function(t){var n={};Object.keys(t.views).forEach(function(e){var t=r(e),o="_design/"+t[0],i=t[1];n[o]=n[o]||{},n[o][i]=!0});var o={keys:Object.keys(n),include_docs:!0};return e.allDocs(o).then(function(r){var o={};r.rows.forEach(function(e){var r=e.key.substring(8);Object.keys(n[e.key]).forEach(function(n){var i=r+"/"+n;t.views[i]||(i=n);var s=Object.keys(t.views[i]),a=e.doc&&e.doc.views&&e.doc.views[n];s.forEach(function(e){o[e]=o[e]||a})})});var i=Object.keys(o).filter(function(e){return!o[e]}),s=i.map(function(t){return e.constructor.destroy(t,{adapter:e.adapter})});return L.all(s).then(function(){return{ok:!0}})})},h({ok:!0}))});n.viewCleanup=q.callbackify(function(){var e=this;return"http"===e.type()?y(e):B(e)}),n.query=function(e,t,n){"function"==typeof t&&(n=t,t={}),t=q.extend(!0,{},t),"function"==typeof e&&(e={map:e});var r=this,o=L.resolve().then(function(){return m(r,e,t)});return q.promisedCallback(o,n),o},q.inherits(_,Error),q.inherits(b,Error)}).call(this,e("_process"))},{"./create-view":58,"./evalfunc":59,"./taskqueue":63,"./utils":65,_process:34,"pouchdb-collate":61}],61:[function(e,t,n){"use strict";function r(e){if(null!==e)switch(typeof e){case"boolean":return e?1:0;case"number":return f(e);case"string":return e.replace(/\u0002/g,"").replace(/\u0001/g,"").replace(/\u0000/g,"");case"object":var t=Array.isArray(e),r=t?e:Object.keys(e),o=-1,i=r.length,s="";if(t)for(;++o<i;)s+=n.toIndexableString(r[o]);else for(;++o<i;){var a=r[o];s+=n.toIndexableString(a)+n.toIndexableString(e[a])}return s}return""}function o(e,t){var n,r=t,o="1"===e[t];if(o)n=0,t++;else{var i="0"===e[t];t++;var s="",a=e.substring(t,t+d),u=parseInt(a,10)+l;for(i&&(u=-u),t+=d;;){var c=e[t];if("\x00"===c)break;s+=c,t++}s=s.split("."),n=1===s.length?parseInt(s,10):parseFloat(s[0]+"."+s[1]),i&&(n-=10),0!==u&&(n=parseFloat(n+"e"+u))}return{num:n,length:t-r}}function i(e,t){var n=e.pop();if(t.length){var r=t[t.length-1];n===r.element&&(t.pop(),r=t[t.length-1]);var o=r.element,i=r.index;if(Array.isArray(o))o.push(n);else if(i===e.length-2){var s=e.pop();o[s]=n}else e.push(n)}}function s(e,t){for(var r=Math.min(e.length,t.length),o=0;r>o;o++){var i=n.collate(e[o],t[o]);if(0!==i)return i}return e.length===t.length?0:e.length>t.length?1:-1}function a(e,t){return e===t?0:e>t?1:-1}function u(e,t){for(var r=Object.keys(e),o=Object.keys(t),i=Math.min(r.length,o.length),s=0;i>s;s++){var a=n.collate(r[s],o[s]);if(0!==a)return a;if(a=n.collate(e[r[s]],t[o[s]]),0!==a)return a}return r.length===o.length?0:r.length>o.length?1:-1}function c(e){var t=["boolean","number","string","object"],n=t.indexOf(typeof e);return~n?null===e?1:Array.isArray(e)?5:3>n?n+2:n+3:Array.isArray(e)?5:void 0}function f(e){if(0===e)return"1";var t=e.toExponential().split(/e\+?/),n=parseInt(t[1],10),r=0>e,o=r?"0":"2",i=(r?-n:n)-l,s=p.padLeft(i.toString(),"0",d);o+=h+s;var a=Math.abs(parseFloat(t[0]));r&&(a=10-a);var u=a.toFixed(20);return u=u.replace(/\.?0+$/,""),o+=h+u}var l=-324,d=3,h="",p=e("./utils");n.collate=function(e,t){if(e===t)return 0;e=n.normalizeKey(e),t=n.normalizeKey(t);var r=c(e),o=c(t);if(r-o!==0)return r-o;if(null===e)return 0;switch(typeof e){case"number":return e-t;case"boolean":return e===t?0:t>e?-1:1;case"string":return a(e,t)}return Array.isArray(e)?s(e,t):u(e,t)},n.normalizeKey=function(e){switch(typeof e){case"undefined":return null;case"number":return 1/0===e||e===-1/0||isNaN(e)?null:e;case"object":var t=e;if(Array.isArray(e)){var r=e.length;e=new Array(r);for(var o=0;r>o;o++)e[o]=n.normalizeKey(t[o])}else{if(e instanceof Date)return e.toJSON();if(null!==e){e={};for(var i in t)if(t.hasOwnProperty(i)){var s=t[i];"undefined"!=typeof s&&(e[i]=n.normalizeKey(s))}}}}return e},n.toIndexableString=function(e){var t="\x00";return e=n.normalizeKey(e),c(e)+h+r(e)+t},n.parseIndexableString=function(e){for(var t=[],n=[],r=0;;){var s=e[r++];if("\x00"!==s)switch(s){case"1":t.push(null);break;case"2":t.push("1"===e[r]),r++;break;case"3":var a=o(e,r);t.push(a.num),r+=a.length;break;case"4":for(var u="";;){var c=e[r];if("\x00"===c)break;u+=c,r++}u=u.replace(/\u0001\u0001/g,"\x00").replace(/\u0001\u0002/g,"").replace(/\u0002\u0002/g,""),t.push(u);break;case"5":var f={element:[],index:t.length};t.push(f.element),n.push(f);break;case"6":var l={element:{},index:t.length};t.push(l.element),n.push(l);break;default:throw new Error("bad collationIndex or unexpectedly reached end of input: "+s)}else{if(1===t.length)return t.pop();i(t,n)}}}},{"./utils":62}],62:[function(e,t,n){"use strict";function r(e,t,n){for(var r="",o=n-e.length;r.length<o;)r+=t;return r}n.padLeft=function(e,t,n){var o=r(e,t,n);return o+e},n.padRight=function(e,t,n){var o=r(e,t,n);return e+o},n.stringLexCompare=function(e,t){var n,r=e.length,o=t.length;for(n=0;r>n;n++){if(n===o)return 1;var i=e.charAt(n),s=t.charAt(n);if(i!==s)return s>i?-1:1}return o>r?-1:0},n.intToDecimalForm=function(e){var t=0>e,n="";do{var r=t?-Math.ceil(e%10):Math.floor(e%10);n=r+n,e=t?Math.ceil(e/10):Math.floor(e/10)}while(e);return t&&"0"!==n&&(n="-"+n),n}},{}],63:[function(e,t){"use strict";function n(){this.promise=new r(function(e){e()})}var r=e("./utils").Promise;n.prototype.add=function(e){return this.promise=this.promise["catch"](function(){}).then(function(){return e()}),this.promise},n.prototype.finish=function(){return this.promise},t.exports=n},{"./utils":65}],64:[function(e,t){"use strict";function n(e,t,n){return new o(function(o,i){return t&&"object"==typeof t&&(t=t._id),"string"!=typeof t?i(new Error("doc id is required")):void e.get(t,function(s,a){if(s)return 404!==s.status?i(s):o(r(e,n({_id:t}),n));var u=n(a);return u?void o(r(e,u,n)):o(a)})})}function r(e,t,r){return e.put(t)["catch"](function(o){if(409!==o.status)throw o;return n(e,t,r)})}var o=e("./utils").Promise;t.exports=n},{"./utils":65}],65:[function(e,t,n){(function(t,r){"use strict";n.Promise="function"==typeof r.Promise?r.Promise:e("lie"),n.inherits=e("inherits"),n.extend=e("pouchdb-extend");var o=e("argsarray");n.promisedCallback=function(e,n){return n&&e.then(function(e){t.nextTick(function(){n(null,e)})},function(e){t.nextTick(function(){n(e)})}),e},n.callbackify=function(e){return o(function(t){var r=t.pop(),o=e.apply(this,t);return"function"==typeof r&&n.promisedCallback(o,r),o})},n.fin=function(e,t){return e.then(function(e){var n=t();return"function"==typeof n.then?n.then(function(){return e}):e},function(e){var n=t();if("function"==typeof n.then)return n.then(function(){throw e});throw e})},n.sequentialize=function(e,t){return function(){var n=arguments,r=this;return e.add(function(){return t.apply(r,n)})}},n.uniq=function(e){for(var t={},n=0,r=e.length;r>n;n++)t["$"+e[n]]=!0;var o=Object.keys(t),i=new Array(o.length);for(n=0,r=o.length;r>n;n++)i[n]=o[n].substring(1);return i};var i=e("crypto"),s=e("spark-md5");n.MD5=function(e){return t.browser?s.hash(e):i.createHash("md5").update(e).digest("hex")}}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{_process:34,argsarray:27,crypto:28,inherits:38,lie:42,"pouchdb-extend":57,"spark-md5":66}],66:[function(e,t,n){!function(e){if("object"==typeof n)t.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var r;try{r=window}catch(o){r=self}r.SparkMD5=e()}}(function(){"use strict";var e=function(e,t){return e+t&4294967295},t=function(t,n,r,o,i,s){return n=e(e(n,t),e(o,s)),e(n<<i|n>>>32-i,r)},n=function(e,n,r,o,i,s,a){return t(n&r|~n&o,e,n,i,s,a)},r=function(e,n,r,o,i,s,a){return t(n&o|r&~o,e,n,i,s,a)},o=function(e,n,r,o,i,s,a){return t(n^r^o,e,n,i,s,a)},i=function(e,n,r,o,i,s,a){return t(r^(n|~o),e,n,i,s,a)},s=function(t,s){var a=t[0],u=t[1],c=t[2],f=t[3];a=n(a,u,c,f,s[0],7,-680876936),f=n(f,a,u,c,s[1],12,-389564586),c=n(c,f,a,u,s[2],17,606105819),u=n(u,c,f,a,s[3],22,-1044525330),a=n(a,u,c,f,s[4],7,-176418897),f=n(f,a,u,c,s[5],12,1200080426),c=n(c,f,a,u,s[6],17,-1473231341),u=n(u,c,f,a,s[7],22,-45705983),a=n(a,u,c,f,s[8],7,1770035416),f=n(f,a,u,c,s[9],12,-1958414417),c=n(c,f,a,u,s[10],17,-42063),u=n(u,c,f,a,s[11],22,-1990404162),a=n(a,u,c,f,s[12],7,1804603682),f=n(f,a,u,c,s[13],12,-40341101),c=n(c,f,a,u,s[14],17,-1502002290),u=n(u,c,f,a,s[15],22,1236535329),a=r(a,u,c,f,s[1],5,-165796510),f=r(f,a,u,c,s[6],9,-1069501632),c=r(c,f,a,u,s[11],14,643717713),u=r(u,c,f,a,s[0],20,-373897302),a=r(a,u,c,f,s[5],5,-701558691),f=r(f,a,u,c,s[10],9,38016083),c=r(c,f,a,u,s[15],14,-660478335),u=r(u,c,f,a,s[4],20,-405537848),a=r(a,u,c,f,s[9],5,568446438),f=r(f,a,u,c,s[14],9,-1019803690),c=r(c,f,a,u,s[3],14,-187363961),u=r(u,c,f,a,s[8],20,1163531501),a=r(a,u,c,f,s[13],5,-1444681467),f=r(f,a,u,c,s[2],9,-51403784),c=r(c,f,a,u,s[7],14,1735328473),u=r(u,c,f,a,s[12],20,-1926607734),a=o(a,u,c,f,s[5],4,-378558),f=o(f,a,u,c,s[8],11,-2022574463),c=o(c,f,a,u,s[11],16,1839030562),u=o(u,c,f,a,s[14],23,-35309556),a=o(a,u,c,f,s[1],4,-1530992060),f=o(f,a,u,c,s[4],11,1272893353),c=o(c,f,a,u,s[7],16,-155497632),u=o(u,c,f,a,s[10],23,-1094730640),a=o(a,u,c,f,s[13],4,681279174),f=o(f,a,u,c,s[0],11,-358537222),c=o(c,f,a,u,s[3],16,-722521979),u=o(u,c,f,a,s[6],23,76029189),a=o(a,u,c,f,s[9],4,-640364487),f=o(f,a,u,c,s[12],11,-421815835),c=o(c,f,a,u,s[15],16,530742520),u=o(u,c,f,a,s[2],23,-995338651),a=i(a,u,c,f,s[0],6,-198630844),f=i(f,a,u,c,s[7],10,1126891415),c=i(c,f,a,u,s[14],15,-1416354905),u=i(u,c,f,a,s[5],21,-57434055),a=i(a,u,c,f,s[12],6,1700485571),f=i(f,a,u,c,s[3],10,-1894986606),c=i(c,f,a,u,s[10],15,-1051523),u=i(u,c,f,a,s[1],21,-2054922799),a=i(a,u,c,f,s[8],6,1873313359),f=i(f,a,u,c,s[15],10,-30611744),c=i(c,f,a,u,s[6],15,-1560198380),u=i(u,c,f,a,s[13],21,1309151649),a=i(a,u,c,f,s[4],6,-145523070),f=i(f,a,u,c,s[11],10,-1120210379),c=i(c,f,a,u,s[2],15,718787259),u=i(u,c,f,a,s[9],21,-343485551),t[0]=e(a,t[0]),t[1]=e(u,t[1]),t[2]=e(c,t[2]),t[3]=e(f,t[3])},a=function(e){var t,n=[];for(t=0;64>t;t+=4)n[t>>2]=e.charCodeAt(t)+(e.charCodeAt(t+1)<<8)+(e.charCodeAt(t+2)<<16)+(e.charCodeAt(t+3)<<24);return n},u=function(e){var t,n=[];for(t=0;64>t;t+=4)n[t>>2]=e[t]+(e[t+1]<<8)+(e[t+2]<<16)+(e[t+3]<<24);return n},c=function(e){var t,n,r,o,i,u,c=e.length,f=[1732584193,-271733879,-1732584194,271733878];for(t=64;c>=t;t+=64)s(f,a(e.substring(t-64,t)));for(e=e.substring(t-64),n=e.length,r=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t=0;n>t;t+=1)r[t>>2]|=e.charCodeAt(t)<<(t%4<<3);if(r[t>>2]|=128<<(t%4<<3),t>55)for(s(f,r),t=0;16>t;t+=1)r[t]=0;return o=8*c,o=o.toString(16).match(/(.*?)(.{0,8})$/),i=parseInt(o[2],16),u=parseInt(o[1],16)||0,r[14]=i,r[15]=u,s(f,r),f},f=function(e){var t,n,r,o,i,a,c=e.length,f=[1732584193,-271733879,-1732584194,271733878];for(t=64;c>=t;t+=64)s(f,u(e.subarray(t-64,t)));for(e=c>t-64?e.subarray(t-64):new Uint8Array(0),n=e.length,r=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t=0;n>t;t+=1)r[t>>2]|=e[t]<<(t%4<<3);if(r[t>>2]|=128<<(t%4<<3),t>55)for(s(f,r),t=0;16>t;t+=1)r[t]=0;return o=8*c,o=o.toString(16).match(/(.*?)(.{0,8})$/),i=parseInt(o[2],16),a=parseInt(o[1],16)||0,r[14]=i,r[15]=a,s(f,r),f},l=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],d=function(e){var t,n="";for(t=0;4>t;t+=1)n+=l[e>>8*t+4&15]+l[e>>8*t&15];return n},h=function(e){var t;for(t=0;t<e.length;t+=1)e[t]=d(e[t]);return e.join("")},p=function(e){return h(c(e))},v=function(){this.reset()};return"5d41402abc4b2a76b9719d911017c592"!==p("hello")&&(e=function(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}),v.prototype.append=function(e){return/[\u0080-\uFFFF]/.test(e)&&(e=unescape(encodeURIComponent(e))),this.appendBinary(e),this},v.prototype.appendBinary=function(e){this._buff+=e,this._length+=e.length;var t,n=this._buff.length;for(t=64;n>=t;t+=64)s(this._state,a(this._buff.substring(t-64,t)));return this._buff=this._buff.substr(t-64),this},v.prototype.end=function(e){var t,n,r=this._buff,o=r.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(t=0;o>t;t+=1)i[t>>2]|=r.charCodeAt(t)<<(t%4<<3);return this._finish(i,o),n=e?this._state:h(this._state),this.reset(),n},v.prototype._finish=function(e,t){var n,r,o,i=t;if(e[i>>2]|=128<<(i%4<<3),i>55)for(s(this._state,e),i=0;16>i;i+=1)e[i]=0;n=8*this._length,n=n.toString(16).match(/(.*?)(.{0,8})$/),r=parseInt(n[2],16),o=parseInt(n[1],16)||0,e[14]=r,e[15]=o,s(this._state,e)},v.prototype.reset=function(){return this._buff="",this._length=0,this._state=[1732584193,-271733879,-1732584194,271733878],this},v.prototype.destroy=function(){delete this._state,delete this._buff,delete this._length},v.hash=function(e,t){/[\u0080-\uFFFF]/.test(e)&&(e=unescape(encodeURIComponent(e)));var n=c(e);return t?n:h(n)},v.hashBinary=function(e,t){var n=c(e);return t?n:h(n)},v.ArrayBuffer=function(){this.reset()},v.ArrayBuffer.prototype.append=function(e){var t,n=this._concatArrayBuffer(this._buff,e),r=n.length;for(this._length+=e.byteLength,t=64;r>=t;t+=64)s(this._state,u(n.subarray(t-64,t)));return this._buff=r>t-64?n.subarray(t-64):new Uint8Array(0),this},v.ArrayBuffer.prototype.end=function(e){var t,n,r=this._buff,o=r.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(t=0;o>t;t+=1)i[t>>2]|=r[t]<<(t%4<<3);return this._finish(i,o),n=e?this._state:h(this._state),this.reset(),n},v.ArrayBuffer.prototype._finish=v.prototype._finish,v.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._state=[1732584193,-271733879,-1732584194,271733878],this},v.ArrayBuffer.prototype.destroy=v.prototype.destroy,v.ArrayBuffer.prototype._concatArrayBuffer=function(e,t){var n=e.length,r=new Uint8Array(n+t.byteLength);return r.set(e),r.set(new Uint8Array(t),n),r},v.ArrayBuffer.hash=function(e,t){var n=f(new Uint8Array(e));return t?n:h(n)},v})},{}],67:[function(e,t,n){"use strict";function r(e,t,n){var r=n[n.length-1];e===r.element&&(n.pop(),r=n[n.length-1]);var o=r.element,i=r.index;if(Array.isArray(o))o.push(e);else if(i===t.length-2){var s=t.pop();o[s]=e}else t.push(e)}n.stringify=function(e){var t=[];t.push({obj:e});for(var n,r,o,i,s,a,u,c,f,l,d,h="";n=t.pop();)if(r=n.obj,o=n.prefix||"",i=n.val||"",h+=o,i)h+=i;else if("object"!=typeof r)h+="undefined"==typeof r?null:JSON.stringify(r);else if(null===r)h+="null";else if(Array.isArray(r)){for(t.push({val:"]"}),s=r.length-1;s>=0;s--)a=0===s?"":",",t.push({obj:r[s],prefix:a});t.push({val:"["})}else{u=[];for(c in r)r.hasOwnProperty(c)&&u.push(c);for(t.push({val:"}"}),s=u.length-1;s>=0;s--)f=u[s],l=r[f],d=s>0?",":"",d+=JSON.stringify(f)+":",t.push({obj:l,prefix:d});t.push({val:"{"})}return h},n.parse=function(e){for(var t,n,o,i,s,a,u,c,f,l=[],d=[],h=0;;)if(t=e[h++],"}"!==t&&"]"!==t&&"undefined"!=typeof t)switch(t){case" ":case"	":case"\n":case":":case",":break;case"n":h+=3,r(null,l,d);break;case"t":h+=3,r(!0,l,d);break;case"f":h+=4,r(!1,l,d);break;case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":case"-":for(n="",h--;;){if(o=e[h++],!/[\d\.\-e\+]/.test(o)){h--;break}n+=o}r(parseFloat(n),l,d);break;case'"':for(i="",s=void 0,a=0;;){if(u=e[h++],'"'===u&&("\\"!==s||a%2!==1))break;i+=u,s=u,"\\"===s?a++:a=0}r(JSON.parse('"'+i+'"'),l,d);break;case"[":c={element:[],index:l.length},l.push(c.element),d.push(c);break;case"{":f={element:{},index:l.length},l.push(f.element),d.push(f);break;default:throw new Error("unexpectedly reached end of input: "+t)}else{if(1===l.length)return l.pop();r(l.pop(),l,d)}}},{}],68:[function(e,t){(function(n){"use strict";var r=e("./setup");t.exports=r,r.ajax=e("./deps/ajax"),r.extend=e("pouchdb-extend"),r.utils=e("./utils"),r.Errors=e("./deps/errors"),r.replicate=e("./replicate").replicate,r.sync=e("./sync"),r.version=e("./version");var o=e("./adapters/http");if(r.adapter("http",o),r.adapter("https",o),r.adapter("idb",e("./adapters/idb")),r.adapter("websql",e("./adapters/websql")),r.plugin(e("pouchdb-mapreduce")),!n.browser){var i=e("./adapters/leveldb");r.adapter("ldb",i),r.adapter("leveldb",i)}}).call(this,e("_process"))},{"./adapters/http":2,"./adapters/idb":3,"./adapters/leveldb":28,"./adapters/websql":5,"./deps/ajax":9,"./deps/errors":12,"./replicate":21,"./setup":22,"./sync":23,"./utils":25,"./version":26,_process:34,"pouchdb-extend":57,"pouchdb-mapreduce":60}]},{},[68])(68)});
;//! moment.js
//! version : 2.9.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function (undefined) {
    /************************************
        Constants
    ************************************/

    var moment,
        VERSION = '2.9.0',
        // the global-scope this is NOT the global object in Node.js
        globalScope = (typeof global !== 'undefined' && (typeof window === 'undefined' || window === global.window)) ? global : this,
        oldGlobalMoment,
        round = Math.round,
        hasOwnProperty = Object.prototype.hasOwnProperty,
        i,

        YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,

        // internal storage for locale config files
        locales = {},

        // extra moment internal properties (plugins register props here)
        momentProperties = [],

        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module && module.exports),

        // ASP.NET json date format regex
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
        aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,

        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,

        // format tokens
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,

        // parsing token regexes
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
        parseTokenOneToFourDigits = /\d{1,4}/, // 0 - 9999
        parseTokenOneToSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
        parseTokenDigits = /\d+/, // nonzero number of digits
        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, // any word (or two) characters or numbers including two/three word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        parseTokenT = /T/i, // T (ISO separator)
        parseTokenOffsetMs = /[\+\-]?\d+/, // 1234567890123
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123

        //strict parsing regexes
        parseTokenOneDigit = /\d/, // 0 - 9
        parseTokenTwoDigits = /\d\d/, // 00 - 99
        parseTokenThreeDigits = /\d{3}/, // 000 - 999
        parseTokenFourDigits = /\d{4}/, // 0000 - 9999
        parseTokenSixDigits = /[+-]?\d{6}/, // -999,999 - 999,999
        parseTokenSignedNumber = /[+-]?\d+/, // -inf - inf

        // iso 8601 regex
        // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
        isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,

        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
            ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
            ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d{2}/],
            ['YYYY-DDD', /\d{4}-\d{3}/]
        ],

        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
            ['HH:mm', /(T| )\d\d:\d\d/],
            ['HH', /(T| )\d\d/]
        ],

        // timezone chunker '+10:00' > ['10', '00'] or '-1530' > ['-', '15', '30']
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,

        // getter and setter names
        proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
        unitMillisecondFactors = {
            'Milliseconds' : 1,
            'Seconds' : 1e3,
            'Minutes' : 6e4,
            'Hours' : 36e5,
            'Days' : 864e5,
            'Months' : 2592e6,
            'Years' : 31536e6
        },

        unitAliases = {
            ms : 'millisecond',
            s : 'second',
            m : 'minute',
            h : 'hour',
            d : 'day',
            D : 'date',
            w : 'week',
            W : 'isoWeek',
            M : 'month',
            Q : 'quarter',
            y : 'year',
            DDD : 'dayOfYear',
            e : 'weekday',
            E : 'isoWeekday',
            gg: 'weekYear',
            GG: 'isoWeekYear'
        },

        camelFunctions = {
            dayofyear : 'dayOfYear',
            isoweekday : 'isoWeekday',
            isoweek : 'isoWeek',
            weekyear : 'weekYear',
            isoweekyear : 'isoWeekYear'
        },

        // format function strings
        formatFunctions = {},

        // default relative time thresholds
        relativeTimeThresholds = {
            s: 45,  // seconds to minute
            m: 45,  // minutes to hour
            h: 22,  // hours to day
            d: 26,  // days to month
            M: 11   // months to year
        },

        // tokens to ordinalize and pad
        ordinalizeTokens = 'DDD w W M D d'.split(' '),
        paddedTokens = 'M D H h m s w W'.split(' '),

        formatTokenFunctions = {
            M    : function () {
                return this.month() + 1;
            },
            MMM  : function (format) {
                return this.localeData().monthsShort(this, format);
            },
            MMMM : function (format) {
                return this.localeData().months(this, format);
            },
            D    : function () {
                return this.date();
            },
            DDD  : function () {
                return this.dayOfYear();
            },
            d    : function () {
                return this.day();
            },
            dd   : function (format) {
                return this.localeData().weekdaysMin(this, format);
            },
            ddd  : function (format) {
                return this.localeData().weekdaysShort(this, format);
            },
            dddd : function (format) {
                return this.localeData().weekdays(this, format);
            },
            w    : function () {
                return this.week();
            },
            W    : function () {
                return this.isoWeek();
            },
            YY   : function () {
                return leftZeroFill(this.year() % 100, 2);
            },
            YYYY : function () {
                return leftZeroFill(this.year(), 4);
            },
            YYYYY : function () {
                return leftZeroFill(this.year(), 5);
            },
            YYYYYY : function () {
                var y = this.year(), sign = y >= 0 ? '+' : '-';
                return sign + leftZeroFill(Math.abs(y), 6);
            },
            gg   : function () {
                return leftZeroFill(this.weekYear() % 100, 2);
            },
            gggg : function () {
                return leftZeroFill(this.weekYear(), 4);
            },
            ggggg : function () {
                return leftZeroFill(this.weekYear(), 5);
            },
            GG   : function () {
                return leftZeroFill(this.isoWeekYear() % 100, 2);
            },
            GGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 4);
            },
            GGGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 5);
            },
            e : function () {
                return this.weekday();
            },
            E : function () {
                return this.isoWeekday();
            },
            a    : function () {
                return this.localeData().meridiem(this.hours(), this.minutes(), true);
            },
            A    : function () {
                return this.localeData().meridiem(this.hours(), this.minutes(), false);
            },
            H    : function () {
                return this.hours();
            },
            h    : function () {
                return this.hours() % 12 || 12;
            },
            m    : function () {
                return this.minutes();
            },
            s    : function () {
                return this.seconds();
            },
            S    : function () {
                return toInt(this.milliseconds() / 100);
            },
            SS   : function () {
                return leftZeroFill(toInt(this.milliseconds() / 10), 2);
            },
            SSS  : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            SSSS : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            Z    : function () {
                var a = this.utcOffset(),
                    b = '+';
                if (a < 0) {
                    a = -a;
                    b = '-';
                }
                return b + leftZeroFill(toInt(a / 60), 2) + ':' + leftZeroFill(toInt(a) % 60, 2);
            },
            ZZ   : function () {
                var a = this.utcOffset(),
                    b = '+';
                if (a < 0) {
                    a = -a;
                    b = '-';
                }
                return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
            },
            z : function () {
                return this.zoneAbbr();
            },
            zz : function () {
                return this.zoneName();
            },
            x    : function () {
                return this.valueOf();
            },
            X    : function () {
                return this.unix();
            },
            Q : function () {
                return this.quarter();
            }
        },

        deprecations = {},

        lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'],

        updateInProgress = false;

    // Pick the first defined of two or three arguments. dfl comes from
    // default.
    function dfl(a, b, c) {
        switch (arguments.length) {
            case 2: return a != null ? a : b;
            case 3: return a != null ? a : b != null ? b : c;
            default: throw new Error('Implement me');
        }
    }

    function hasOwnProp(a, b) {
        return hasOwnProperty.call(a, b);
    }

    function defaultParsingFlags() {
        // We need to deep clone this object, and es5 standard is not very
        // helpful.
        return {
            empty : false,
            unusedTokens : [],
            unusedInput : [],
            overflow : -2,
            charsLeftOver : 0,
            nullInput : false,
            invalidMonth : null,
            invalidFormat : false,
            userInvalidated : false,
            iso: false
        };
    }

    function printMsg(msg) {
        if (moment.suppressDeprecationWarnings === false &&
                typeof console !== 'undefined' && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;
        return extend(function () {
            if (firstTime) {
                printMsg(msg);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    function deprecateSimple(name, msg) {
        if (!deprecations[name]) {
            printMsg(msg);
            deprecations[name] = true;
        }
    }

    function padToken(func, count) {
        return function (a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func, period) {
        return function (a) {
            return this.localeData().ordinal(func.call(this, a), period);
        };
    }

    function monthDiff(a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        return -(wholeMonthDiff + adjust);
    }

    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);


    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // thie is not supposed to happen
            return hour;
        }
    }

    /************************************
        Constructors
    ************************************/

    function Locale() {
    }

    // Moment prototype object
    function Moment(config, skipOverflow) {
        if (skipOverflow !== false) {
            checkOverflow(config);
        }
        copyConfig(this, config);
        this._d = new Date(+config._d);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            moment.updateOffset(this);
            updateInProgress = false;
        }
    }

    // Duration Constructor
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = moment.localeData();

        this._bubble();
    }

    /************************************
        Helpers
    ************************************/


    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function copyConfig(to, from) {
        var i, prop, val;

        if (typeof from._isAMomentObject !== 'undefined') {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (typeof from._i !== 'undefined') {
            to._i = from._i;
        }
        if (typeof from._f !== 'undefined') {
            to._f = from._f;
        }
        if (typeof from._l !== 'undefined') {
            to._l = from._l;
        }
        if (typeof from._strict !== 'undefined') {
            to._strict = from._strict;
        }
        if (typeof from._tzm !== 'undefined') {
            to._tzm = from._tzm;
        }
        if (typeof from._isUTC !== 'undefined') {
            to._isUTC = from._isUTC;
        }
        if (typeof from._offset !== 'undefined') {
            to._offset = from._offset;
        }
        if (typeof from._pf !== 'undefined') {
            to._pf = from._pf;
        }
        if (typeof from._locale !== 'undefined') {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (typeof val !== 'undefined') {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength, forceSign) {
        var output = '' + Math.abs(number),
            sign = number >= 0;

        while (output.length < targetLength) {
            output = '0' + output;
        }
        return (sign ? (forceSign ? '+' : '') : '-') + output;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        other = makeAs(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = moment.duration(val, period);
            addOrSubtractDurationFromMoment(this, dur, direction);
            return this;
        };
    }

    function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months;
        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            rawSetter(mom, 'Date', rawGetter(mom, 'Date') + days * isAdding);
        }
        if (months) {
            rawMonthSetter(mom, rawGetter(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            moment.updateOffset(mom, days || months);
        }
    }

    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return Object.prototype.toString.call(input) === '[object Date]' ||
            input instanceof Date;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function normalizeUnits(units) {
        if (units) {
            var lowered = units.toLowerCase().replace(/(.)s$/, '$1');
            units = unitAliases[units] || camelFunctions[lowered] || lowered;
        }
        return units;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeList(field) {
        var count, setter;

        if (field.indexOf('week') === 0) {
            count = 7;
            setter = 'day';
        }
        else if (field.indexOf('month') === 0) {
            count = 12;
            setter = 'month';
        }
        else {
            return;
        }

        moment[field] = function (format, index) {
            var i, getter,
                method = moment._locale[field],
                results = [];

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            getter = function (i) {
                var m = moment().utc().set(setter, i);
                return method.call(moment._locale, m, format || '');
            };

            if (index != null) {
                return getter(index);
            }
            else {
                for (i = 0; i < count; i++) {
                    results.push(getter(i));
                }
                return results;
            }
        };
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
                value = Math.floor(coercedNumber);
            } else {
                value = Math.ceil(coercedNumber);
            }
        }

        return value;
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    function weeksInYear(year, dow, doy) {
        return weekOfYear(moment([year, 11, 31 + dow - doy]), dow, doy).week;
    }

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function checkOverflow(m) {
        var overflow;
        if (m._a && m._pf.overflow === -2) {
            overflow =
                m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :
                m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :
                m._a[HOUR] < 0 || m._a[HOUR] > 24 ||
                    (m._a[HOUR] === 24 && (m._a[MINUTE] !== 0 ||
                                           m._a[SECOND] !== 0 ||
                                           m._a[MILLISECOND] !== 0)) ? HOUR :
                m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :
                m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :
                m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }

            m._pf.overflow = overflow;
        }
    }

    function isValid(m) {
        if (m._isValid == null) {
            m._isValid = !isNaN(m._d.getTime()) &&
                m._pf.overflow < 0 &&
                !m._pf.empty &&
                !m._pf.invalidMonth &&
                !m._pf.nullInput &&
                !m._pf.invalidFormat &&
                !m._pf.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    m._pf.charsLeftOver === 0 &&
                    m._pf.unusedTokens.length === 0 &&
                    m._pf.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        if (!locales[name] && hasModule) {
            try {
                oldLocale = moment.locale();
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we want to undo that for lazy loaded locales
                moment.locale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // Return a moment from input, that is local/utc/utcOffset equivalent to
    // model.
    function makeAs(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (moment.isMoment(input) || isDate(input) ?
                    +input : +moment(input)) - (+res);
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(+res._d + diff);
            moment.updateOffset(res, false);
            return res;
        } else {
            return moment(input).local();
        }
    }

    /************************************
        Locale
    ************************************/


    extend(Locale.prototype, {

        set : function (config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
            // Lenient ordinal parsing accepts just a number in addition to
            // number + (possibly) stuff coming from _ordinalParseLenient.
            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + /\d{1,2}/.source);
        },

        _months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        months : function (m) {
            return this._months[m.month()];
        },

        _monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        monthsShort : function (m) {
            return this._monthsShort[m.month()];
        },

        monthsParse : function (monthName, format, strict) {
            var i, mom, regex;

            if (!this._monthsParse) {
                this._monthsParse = [];
                this._longMonthsParse = [];
                this._shortMonthsParse = [];
            }

            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                mom = moment.utc([2000, i]);
                if (strict && !this._longMonthsParse[i]) {
                    this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                    this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
                }
                if (!strict && !this._monthsParse[i]) {
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                    return i;
                } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                    return i;
                } else if (!strict && this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },

        _weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdays : function (m) {
            return this._weekdays[m.day()];
        },

        _weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysShort : function (m) {
            return this._weekdaysShort[m.day()];
        },

        _weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        weekdaysMin : function (m) {
            return this._weekdaysMin[m.day()];
        },

        weekdaysParse : function (weekdayName) {
            var i, mom, regex;

            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
            }

            for (i = 0; i < 7; i++) {
                // make the regex if we don't have it already
                if (!this._weekdaysParse[i]) {
                    mom = moment([2000, 1]).day(i);
                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        },

        _longDateFormat : {
            LTS : 'h:mm:ss A',
            LT : 'h:mm A',
            L : 'MM/DD/YYYY',
            LL : 'MMMM D, YYYY',
            LLL : 'MMMM D, YYYY LT',
            LLLL : 'dddd, MMMM D, YYYY LT'
        },
        longDateFormat : function (key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },

        isPM : function (input) {
            // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
            // Using charAt should be more compatible.
            return ((input + '').toLowerCase().charAt(0) === 'p');
        },

        _meridiemParse : /[ap]\.?m?\.?/i,
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        },


        _calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        calendar : function (key, mom, now) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom, [now]) : output;
        },

        _relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },

        relativeTime : function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },

        pastFuture : function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },

        ordinal : function (number) {
            return this._ordinal.replace('%d', number);
        },
        _ordinal : '%d',
        _ordinalParse : /\d{1,2}/,

        preparse : function (string) {
            return string;
        },

        postformat : function (string) {
            return string;
        },

        week : function (mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        },

        _week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        },

        firstDayOfWeek : function () {
            return this._week.dow;
        },

        firstDayOfYear : function () {
            return this._week.doy;
        },

        _invalidDate: 'Invalid date',
        invalidDate: function () {
            return this._invalidDate;
        }
    });

    /************************************
        Formatting
    ************************************/


    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '';
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }


    /************************************
        Parsing
    ************************************/


    // get the regex to find the next token
    function getParseRegexForToken(token, config) {
        var a, strict = config._strict;
        switch (token) {
        case 'Q':
            return parseTokenOneDigit;
        case 'DDDD':
            return parseTokenThreeDigits;
        case 'YYYY':
        case 'GGGG':
        case 'gggg':
            return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;
        case 'Y':
        case 'G':
        case 'g':
            return parseTokenSignedNumber;
        case 'YYYYYY':
        case 'YYYYY':
        case 'GGGGG':
        case 'ggggg':
            return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;
        case 'S':
            if (strict) {
                return parseTokenOneDigit;
            }
            /* falls through */
        case 'SS':
            if (strict) {
                return parseTokenTwoDigits;
            }
            /* falls through */
        case 'SSS':
            if (strict) {
                return parseTokenThreeDigits;
            }
            /* falls through */
        case 'DDD':
            return parseTokenOneToThreeDigits;
        case 'MMM':
        case 'MMMM':
        case 'dd':
        case 'ddd':
        case 'dddd':
            return parseTokenWord;
        case 'a':
        case 'A':
            return config._locale._meridiemParse;
        case 'x':
            return parseTokenOffsetMs;
        case 'X':
            return parseTokenTimestampMs;
        case 'Z':
        case 'ZZ':
            return parseTokenTimezone;
        case 'T':
            return parseTokenT;
        case 'SSSS':
            return parseTokenDigits;
        case 'MM':
        case 'DD':
        case 'YY':
        case 'GG':
        case 'gg':
        case 'HH':
        case 'hh':
        case 'mm':
        case 'ss':
        case 'ww':
        case 'WW':
            return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;
        case 'M':
        case 'D':
        case 'd':
        case 'H':
        case 'h':
        case 'm':
        case 's':
        case 'w':
        case 'W':
        case 'e':
        case 'E':
            return parseTokenOneOrTwoDigits;
        case 'Do':
            return strict ? config._locale._ordinalParse : config._locale._ordinalParseLenient;
        default :
            a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), 'i'));
            return a;
        }
    }

    function utcOffsetFromString(string) {
        string = string || '';
        var possibleTzMatches = (string.match(parseTokenTimezone) || []),
            tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [],
            parts = (tzChunk + '').match(parseTimezoneChunker) || ['-', 0, 0],
            minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? minutes : -minutes;
    }

    // function to convert string input to date
    function addTimeToArrayFromToken(token, input, config) {
        var a, datePartArray = config._a;

        switch (token) {
        // QUARTER
        case 'Q':
            if (input != null) {
                datePartArray[MONTH] = (toInt(input) - 1) * 3;
            }
            break;
        // MONTH
        case 'M' : // fall through to MM
        case 'MM' :
            if (input != null) {
                datePartArray[MONTH] = toInt(input) - 1;
            }
            break;
        case 'MMM' : // fall through to MMMM
        case 'MMMM' :
            a = config._locale.monthsParse(input, token, config._strict);
            // if we didn't find a month name, mark the date as invalid.
            if (a != null) {
                datePartArray[MONTH] = a;
            } else {
                config._pf.invalidMonth = input;
            }
            break;
        // DAY OF MONTH
        case 'D' : // fall through to DD
        case 'DD' :
            if (input != null) {
                datePartArray[DATE] = toInt(input);
            }
            break;
        case 'Do' :
            if (input != null) {
                datePartArray[DATE] = toInt(parseInt(
                            input.match(/\d{1,2}/)[0], 10));
            }
            break;
        // DAY OF YEAR
        case 'DDD' : // fall through to DDDD
        case 'DDDD' :
            if (input != null) {
                config._dayOfYear = toInt(input);
            }

            break;
        // YEAR
        case 'YY' :
            datePartArray[YEAR] = moment.parseTwoDigitYear(input);
            break;
        case 'YYYY' :
        case 'YYYYY' :
        case 'YYYYYY' :
            datePartArray[YEAR] = toInt(input);
            break;
        // AM / PM
        case 'a' : // fall through to A
        case 'A' :
            config._meridiem = input;
            // config._isPm = config._locale.isPM(input);
            break;
        // HOUR
        case 'h' : // fall through to hh
        case 'hh' :
            config._pf.bigHour = true;
            /* falls through */
        case 'H' : // fall through to HH
        case 'HH' :
            datePartArray[HOUR] = toInt(input);
            break;
        // MINUTE
        case 'm' : // fall through to mm
        case 'mm' :
            datePartArray[MINUTE] = toInt(input);
            break;
        // SECOND
        case 's' : // fall through to ss
        case 'ss' :
            datePartArray[SECOND] = toInt(input);
            break;
        // MILLISECOND
        case 'S' :
        case 'SS' :
        case 'SSS' :
        case 'SSSS' :
            datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);
            break;
        // UNIX OFFSET (MILLISECONDS)
        case 'x':
            config._d = new Date(toInt(input));
            break;
        // UNIX TIMESTAMP WITH MS
        case 'X':
            config._d = new Date(parseFloat(input) * 1000);
            break;
        // TIMEZONE
        case 'Z' : // fall through to ZZ
        case 'ZZ' :
            config._useUTC = true;
            config._tzm = utcOffsetFromString(input);
            break;
        // WEEKDAY - human
        case 'dd':
        case 'ddd':
        case 'dddd':
            a = config._locale.weekdaysParse(input);
            // if we didn't get a weekday name, mark the date as invalid
            if (a != null) {
                config._w = config._w || {};
                config._w['d'] = a;
            } else {
                config._pf.invalidWeekday = input;
            }
            break;
        // WEEK, WEEK DAY - numeric
        case 'w':
        case 'ww':
        case 'W':
        case 'WW':
        case 'd':
        case 'e':
        case 'E':
            token = token.substr(0, 1);
            /* falls through */
        case 'gggg':
        case 'GGGG':
        case 'GGGGG':
            token = token.substr(0, 2);
            if (input) {
                config._w = config._w || {};
                config._w[token] = toInt(input);
            }
            break;
        case 'gg':
        case 'GG':
            config._w = config._w || {};
            config._w[token] = moment.parseTwoDigitYear(input);
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = dfl(w.GG, config._a[YEAR], weekOfYear(moment(), 1, 4).year);
            week = dfl(w.W, 1);
            weekday = dfl(w.E, 1);
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = dfl(w.gg, config._a[YEAR], weekOfYear(moment(), dow, doy).year);
            week = dfl(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < dow) {
                    ++week;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);

        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromConfig(config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = dfl(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                config._pf._overflowDayOfYear = true;
            }

            date = makeUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dateFromObject(config) {
        var normalizedInput;

        if (config._d) {
            return;
        }

        normalizedInput = normalizeObjectUnits(config._i);
        config._a = [
            normalizedInput.year,
            normalizedInput.month,
            normalizedInput.day || normalizedInput.date,
            normalizedInput.hour,
            normalizedInput.minute,
            normalizedInput.second,
            normalizedInput.millisecond
        ];

        dateFromConfig(config);
    }

    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate()
            ];
        } else {
            return [now.getFullYear(), now.getMonth(), now.getDate()];
        }
    }

    // date from string and format string
    function makeDateFromStringAndFormat(config) {
        if (config._f === moment.ISO_8601) {
            parseISO(config);
            return;
        }

        config._a = [];
        config._pf.empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    config._pf.unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    config._pf.empty = false;
                }
                else {
                    config._pf.unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                config._pf.unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        config._pf.charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            config._pf.unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._pf.bigHour === true && config._a[HOUR] <= 12) {
            config._pf.bigHour = undefined;
        }
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR],
                config._meridiem);
        dateFromConfig(config);
        checkOverflow(config);
    }

    function unescapeFormat(s) {
        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        });
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function regexpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    // date from string and array of format strings
    function makeDateFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            config._pf.invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._pf = defaultParsingFlags();
            tempConfig._f = config._f[i];
            makeDateFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += tempConfig._pf.charsLeftOver;

            //or tokens
            currentScore += tempConfig._pf.unusedTokens.length * 10;

            tempConfig._pf.score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    // date from iso format
    function parseISO(config) {
        var i, l,
            string = config._i,
            match = isoRegex.exec(string);

        if (match) {
            config._pf.iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    // match[5] should be 'T' or undefined
                    config._f = isoDates[i][0] + (match[6] || ' ');
                    break;
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (string.match(parseTokenTimezone)) {
                config._f += 'Z';
            }
            makeDateFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function makeDateFromString(config) {
        parseISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            moment.createFromInputFallback(config);
        }
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function makeDateFromInput(config) {
        var input = config._i, matched;
        if (input === undefined) {
            config._d = new Date();
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if ((matched = aspNetJsonRegex.exec(input)) !== null) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === 'string') {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            dateFromConfig(config);
        } else if (typeof(input) === 'object') {
            dateFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            moment.createFromInputFallback(config);
        }
    }

    function makeDate(y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor doesn't accept years < 1970
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }

    function makeUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    function parseWeekday(input, locale) {
        if (typeof input === 'string') {
            if (!isNaN(input)) {
                input = parseInt(input, 10);
            }
            else {
                input = locale.weekdaysParse(input);
                if (typeof input !== 'number') {
                    return null;
                }
            }
        }
        return input;
    }

    /************************************
        Relative Time
    ************************************/


    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime(posNegDuration, withoutSuffix, locale) {
        var duration = moment.duration(posNegDuration).abs(),
            seconds = round(duration.as('s')),
            minutes = round(duration.as('m')),
            hours = round(duration.as('h')),
            days = round(duration.as('d')),
            months = round(duration.as('M')),
            years = round(duration.as('y')),

            args = seconds < relativeTimeThresholds.s && ['s', seconds] ||
                minutes === 1 && ['m'] ||
                minutes < relativeTimeThresholds.m && ['mm', minutes] ||
                hours === 1 && ['h'] ||
                hours < relativeTimeThresholds.h && ['hh', hours] ||
                days === 1 && ['d'] ||
                days < relativeTimeThresholds.d && ['dd', days] ||
                months === 1 && ['M'] ||
                months < relativeTimeThresholds.M && ['MM', months] ||
                years === 1 && ['y'] || ['yy', years];

        args[2] = withoutSuffix;
        args[3] = +posNegDuration > 0;
        args[4] = locale;
        return substituteTimeAgo.apply({}, args);
    }


    /************************************
        Week of Year
    ************************************/


    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = moment(mom).add(daysToDayOfWeek, 'd');
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var d = makeUTCDate(year, 0, 1).getUTCDay(), daysToAdd, dayOfYear;

        d = d === 0 ? 7 : d;
        weekday = weekday != null ? weekday : firstDayOfWeek;
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;

        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }

    /************************************
        Top Level Functions
    ************************************/

    function makeMoment(config) {
        var input = config._i,
            format = config._f,
            res;

        config._locale = config._locale || moment.localeData(config._l);

        if (input === null || (format === undefined && input === '')) {
            return moment.invalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (moment.isMoment(input)) {
            return new Moment(input, true);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }

        res = new Moment(config);
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    moment = function (input, format, locale, strict) {
        var c;

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._i = input;
        c._f = format;
        c._l = locale;
        c._strict = strict;
        c._isUTC = false;
        c._pf = defaultParsingFlags();

        return makeMoment(c);
    };

    moment.suppressDeprecationWarnings = false;

    moment.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return moment();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    moment.min = function () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    };

    moment.max = function () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    };

    // creating with utc
    moment.utc = function (input, format, locale, strict) {
        var c;

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._useUTC = true;
        c._isUTC = true;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;
        c._pf = defaultParsingFlags();

        return makeMoment(c).utc();
    };

    // creating with unix timestamp (in seconds)
    moment.unix = function (input) {
        return moment(input * 1000);
    };

    // duration
    moment.duration = function (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            parseIso,
            diffRes;

        if (moment.isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoDurationRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            parseIso = function (inp) {
                // We'd normally use ~~inp for this, but unfortunately it also
                // converts floats to ints.
                // inp may be undefined, so careful calling replace on it.
                var res = inp && parseFloat(inp.replace(',', '.'));
                // apply sign while we're at it
                return (isNaN(res) ? 0 : res) * sign;
            };
            duration = {
                y: parseIso(match[2]),
                M: parseIso(match[3]),
                d: parseIso(match[4]),
                h: parseIso(match[5]),
                m: parseIso(match[6]),
                s: parseIso(match[7]),
                w: parseIso(match[8])
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' &&
                ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(moment(duration.from), moment(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (moment.isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    };

    // version number
    moment.version = VERSION;

    // default format
    moment.defaultFormat = isoFormat;

    // constant that refers to the ISO standard
    moment.ISO_8601 = function () {};

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    moment.momentProperties = momentProperties;

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    moment.updateOffset = function () {};

    // This function allows you to set a threshold for relative time strings
    moment.relativeTimeThreshold = function (threshold, limit) {
        if (relativeTimeThresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return relativeTimeThresholds[threshold];
        }
        relativeTimeThresholds[threshold] = limit;
        return true;
    };

    moment.lang = deprecate(
        'moment.lang is deprecated. Use moment.locale instead.',
        function (key, value) {
            return moment.locale(key, value);
        }
    );

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    moment.locale = function (key, values) {
        var data;
        if (key) {
            if (typeof(values) !== 'undefined') {
                data = moment.defineLocale(key, values);
            }
            else {
                data = moment.localeData(key);
            }

            if (data) {
                moment.duration._locale = moment._locale = data;
            }
        }

        return moment._locale._abbr;
    };

    moment.defineLocale = function (name, values) {
        if (values !== null) {
            values.abbr = name;
            if (!locales[name]) {
                locales[name] = new Locale();
            }
            locales[name].set(values);

            // backwards compat for now: also set the locale
            moment.locale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    };

    moment.langData = deprecate(
        'moment.langData is deprecated. Use moment.localeData instead.',
        function (key) {
            return moment.localeData(key);
        }
    );

    // returns locale data
    moment.localeData = function (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return moment._locale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    };

    // compare moment object
    moment.isMoment = function (obj) {
        return obj instanceof Moment ||
            (obj != null && hasOwnProp(obj, '_isAMomentObject'));
    };

    // for typechecking Duration objects
    moment.isDuration = function (obj) {
        return obj instanceof Duration;
    };

    for (i = lists.length - 1; i >= 0; --i) {
        makeList(lists[i]);
    }

    moment.normalizeUnits = function (units) {
        return normalizeUnits(units);
    };

    moment.invalid = function (flags) {
        var m = moment.utc(NaN);
        if (flags != null) {
            extend(m._pf, flags);
        }
        else {
            m._pf.userInvalidated = true;
        }

        return m;
    };

    moment.parseZone = function () {
        return moment.apply(null, arguments).parseZone();
    };

    moment.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    moment.isDate = isDate;

    /************************************
        Moment Prototype
    ************************************/


    extend(moment.fn = Moment.prototype, {

        clone : function () {
            return moment(this);
        },

        valueOf : function () {
            return +this._d - ((this._offset || 0) * 60000);
        },

        unix : function () {
            return Math.floor(+this / 1000);
        },

        toString : function () {
            return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        },

        toDate : function () {
            return this._offset ? new Date(+this) : this._d;
        },

        toISOString : function () {
            var m = moment(this).utc();
            if (0 < m.year() && m.year() <= 9999) {
                if ('function' === typeof Date.prototype.toISOString) {
                    // native implementation is ~50x faster, use it when we can
                    return this.toDate().toISOString();
                } else {
                    return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
                }
            } else {
                return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        },

        toArray : function () {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hours(),
                m.minutes(),
                m.seconds(),
                m.milliseconds()
            ];
        },

        isValid : function () {
            return isValid(this);
        },

        isDSTShifted : function () {
            if (this._a) {
                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
            }

            return false;
        },

        parsingFlags : function () {
            return extend({}, this._pf);
        },

        invalidAt: function () {
            return this._pf.overflow;
        },

        utc : function (keepLocalTime) {
            return this.utcOffset(0, keepLocalTime);
        },

        local : function (keepLocalTime) {
            if (this._isUTC) {
                this.utcOffset(0, keepLocalTime);
                this._isUTC = false;

                if (keepLocalTime) {
                    this.subtract(this._dateUtcOffset(), 'm');
                }
            }
            return this;
        },

        format : function (inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.localeData().postformat(output);
        },

        add : createAdder(1, 'add'),

        subtract : createAdder(-1, 'subtract'),

        diff : function (input, units, asFloat) {
            var that = makeAs(input, this),
                zoneDiff = (that.utcOffset() - this.utcOffset()) * 6e4,
                anchor, diff, output, daysAdjust;

            units = normalizeUnits(units);

            if (units === 'year' || units === 'month' || units === 'quarter') {
                output = monthDiff(this, that);
                if (units === 'quarter') {
                    output = output / 3;
                } else if (units === 'year') {
                    output = output / 12;
                }
            } else {
                diff = this - that;
                output = units === 'second' ? diff / 1e3 : // 1000
                    units === 'minute' ? diff / 6e4 : // 1000 * 60
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                    units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                    units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                    diff;
            }
            return asFloat ? output : absRound(output);
        },

        from : function (time, withoutSuffix) {
            return moment.duration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        },

        fromNow : function (withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },

        calendar : function (time) {
            // We want to compare the start of today, vs this.
            // Getting start-of-today depends on whether we're locat/utc/offset
            // or not.
            var now = time || moment(),
                sod = makeAs(now, this).startOf('day'),
                diff = this.diff(sod, 'days', true),
                format = diff < -6 ? 'sameElse' :
                    diff < -1 ? 'lastWeek' :
                    diff < 0 ? 'lastDay' :
                    diff < 1 ? 'sameDay' :
                    diff < 2 ? 'nextDay' :
                    diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.localeData().calendar(format, this, moment(now)));
        },

        isLeapYear : function () {
            return isLeapYear(this.year());
        },

        isDST : function () {
            return (this.utcOffset() > this.clone().month(0).utcOffset() ||
                this.utcOffset() > this.clone().month(5).utcOffset());
        },

        day : function (input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                input = parseWeekday(input, this.localeData());
                return this.add(input - day, 'd');
            } else {
                return day;
            }
        },

        month : makeAccessor('Month', true),

        startOf : function (units) {
            units = normalizeUnits(units);
            // the following switch intentionally omits break keywords
            // to utilize falling through the cases.
            switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
                /* falls through */
            }

            // weeks are a special case
            if (units === 'week') {
                this.weekday(0);
            } else if (units === 'isoWeek') {
                this.isoWeekday(1);
            }

            // quarters are also special
            if (units === 'quarter') {
                this.month(Math.floor(this.month() / 3) * 3);
            }

            return this;
        },

        endOf: function (units) {
            units = normalizeUnits(units);
            if (units === undefined || units === 'millisecond') {
                return this;
            }
            return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
        },

        isAfter: function (input, units) {
            var inputMs;
            units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this > +input;
            } else {
                inputMs = moment.isMoment(input) ? +input : +moment(input);
                return inputMs < +this.clone().startOf(units);
            }
        },

        isBefore: function (input, units) {
            var inputMs;
            units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this < +input;
            } else {
                inputMs = moment.isMoment(input) ? +input : +moment(input);
                return +this.clone().endOf(units) < inputMs;
            }
        },

        isBetween: function (from, to, units) {
            return this.isAfter(from, units) && this.isBefore(to, units);
        },

        isSame: function (input, units) {
            var inputMs;
            units = normalizeUnits(units || 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this === +input;
            } else {
                inputMs = +moment(input);
                return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
            }
        },

        min: deprecate(
                 'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
                 function (other) {
                     other = moment.apply(null, arguments);
                     return other < this ? this : other;
                 }
         ),

        max: deprecate(
                'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
                function (other) {
                    other = moment.apply(null, arguments);
                    return other > this ? this : other;
                }
        ),

        zone : deprecate(
                'moment().zone is deprecated, use moment().utcOffset instead. ' +
                'https://github.com/moment/moment/issues/1779',
                function (input, keepLocalTime) {
                    if (input != null) {
                        if (typeof input !== 'string') {
                            input = -input;
                        }

                        this.utcOffset(input, keepLocalTime);

                        return this;
                    } else {
                        return -this.utcOffset();
                    }
                }
        ),

        // keepLocalTime = true means only change the timezone, without
        // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
        // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
        // +0200, so we adjust the time as needed, to be valid.
        //
        // Keeping the time actually adds/subtracts (one hour)
        // from the actual represented time. That is why we call updateOffset
        // a second time. In case it wants us to change the offset again
        // _changeInProgress == true case, then we have to adjust, because
        // there is no such time in the given timezone.
        utcOffset : function (input, keepLocalTime) {
            var offset = this._offset || 0,
                localAdjust;
            if (input != null) {
                if (typeof input === 'string') {
                    input = utcOffsetFromString(input);
                }
                if (Math.abs(input) < 16) {
                    input = input * 60;
                }
                if (!this._isUTC && keepLocalTime) {
                    localAdjust = this._dateUtcOffset();
                }
                this._offset = input;
                this._isUTC = true;
                if (localAdjust != null) {
                    this.add(localAdjust, 'm');
                }
                if (offset !== input) {
                    if (!keepLocalTime || this._changeInProgress) {
                        addOrSubtractDurationFromMoment(this,
                                moment.duration(input - offset, 'm'), 1, false);
                    } else if (!this._changeInProgress) {
                        this._changeInProgress = true;
                        moment.updateOffset(this, true);
                        this._changeInProgress = null;
                    }
                }

                return this;
            } else {
                return this._isUTC ? offset : this._dateUtcOffset();
            }
        },

        isLocal : function () {
            return !this._isUTC;
        },

        isUtcOffset : function () {
            return this._isUTC;
        },

        isUtc : function () {
            return this._isUTC && this._offset === 0;
        },

        zoneAbbr : function () {
            return this._isUTC ? 'UTC' : '';
        },

        zoneName : function () {
            return this._isUTC ? 'Coordinated Universal Time' : '';
        },

        parseZone : function () {
            if (this._tzm) {
                this.utcOffset(this._tzm);
            } else if (typeof this._i === 'string') {
                this.utcOffset(utcOffsetFromString(this._i));
            }
            return this;
        },

        hasAlignedHourOffset : function (input) {
            if (!input) {
                input = 0;
            }
            else {
                input = moment(input).utcOffset();
            }

            return (this.utcOffset() - input) % 60 === 0;
        },

        daysInMonth : function () {
            return daysInMonth(this.year(), this.month());
        },

        dayOfYear : function (input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
        },

        quarter : function (input) {
            return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
        },

        weekYear : function (input) {
            var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return input == null ? year : this.add((input - year), 'y');
        },

        isoWeekYear : function (input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add((input - year), 'y');
        },

        week : function (input) {
            var week = this.localeData().week(this);
            return input == null ? week : this.add((input - week) * 7, 'd');
        },

        isoWeek : function (input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add((input - week) * 7, 'd');
        },

        weekday : function (input) {
            var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return input == null ? weekday : this.add(input - weekday, 'd');
        },

        isoWeekday : function (input) {
            // behaves the same as moment#day except
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
            // as a setter, sunday should belong to the previous week.
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
        },

        isoWeeksInYear : function () {
            return weeksInYear(this.year(), 1, 4);
        },

        weeksInYear : function () {
            var weekInfo = this.localeData()._week;
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units]();
        },

        set : function (units, value) {
            var unit;
            if (typeof units === 'object') {
                for (unit in units) {
                    this.set(unit, units[unit]);
                }
            }
            else {
                units = normalizeUnits(units);
                if (typeof this[units] === 'function') {
                    this[units](value);
                }
            }
            return this;
        },

        // If passed a locale key, it will set the locale for this
        // instance.  Otherwise, it will return the locale configuration
        // variables for this instance.
        locale : function (key) {
            var newLocaleData;

            if (key === undefined) {
                return this._locale._abbr;
            } else {
                newLocaleData = moment.localeData(key);
                if (newLocaleData != null) {
                    this._locale = newLocaleData;
                }
                return this;
            }
        },

        lang : deprecate(
            'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
            function (key) {
                if (key === undefined) {
                    return this.localeData();
                } else {
                    return this.locale(key);
                }
            }
        ),

        localeData : function () {
            return this._locale;
        },

        _dateUtcOffset : function () {
            // On Firefox.24 Date#getTimezoneOffset returns a floating point.
            // https://github.com/moment/moment/pull/1871
            return -Math.round(this._d.getTimezoneOffset() / 15) * 15;
        }

    });

    function rawMonthSetter(mom, value) {
        var dayOfMonth;

        // TODO: Move this out of here!
        if (typeof value === 'string') {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (typeof value !== 'number') {
                return mom;
            }
        }

        dayOfMonth = Math.min(mom.date(),
                daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function rawGetter(mom, unit) {
        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
    }

    function rawSetter(mom, unit, value) {
        if (unit === 'Month') {
            return rawMonthSetter(mom, value);
        } else {
            return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    function makeAccessor(unit, keepTime) {
        return function (value) {
            if (value != null) {
                rawSetter(this, unit, value);
                moment.updateOffset(this, keepTime);
                return this;
            } else {
                return rawGetter(this, unit);
            }
        };
    }

    moment.fn.millisecond = moment.fn.milliseconds = makeAccessor('Milliseconds', false);
    moment.fn.second = moment.fn.seconds = makeAccessor('Seconds', false);
    moment.fn.minute = moment.fn.minutes = makeAccessor('Minutes', false);
    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    moment.fn.hour = moment.fn.hours = makeAccessor('Hours', true);
    // moment.fn.month is defined separately
    moment.fn.date = makeAccessor('Date', true);
    moment.fn.dates = deprecate('dates accessor is deprecated. Use date instead.', makeAccessor('Date', true));
    moment.fn.year = makeAccessor('FullYear', true);
    moment.fn.years = deprecate('years accessor is deprecated. Use year instead.', makeAccessor('FullYear', true));

    // add plural methods
    moment.fn.days = moment.fn.day;
    moment.fn.months = moment.fn.month;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;
    moment.fn.quarters = moment.fn.quarter;

    // add aliased format methods
    moment.fn.toJSON = moment.fn.toISOString;

    // alias isUtc for dev-friendliness
    moment.fn.isUTC = moment.fn.isUtc;

    /************************************
        Duration Prototype
    ************************************/


    function daysToYears (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        return days * 400 / 146097;
    }

    function yearsToDays (years) {
        // years * 365 + absRound(years / 4) -
        //     absRound(years / 100) + absRound(years / 400);
        return years * 146097 / 400;
    }

    extend(moment.duration.fn = Duration.prototype, {

        _bubble : function () {
            var milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data,
                seconds, minutes, hours, years = 0;

            // The following code bubbles up values, see the tests for
            // examples of what that means.
            data.milliseconds = milliseconds % 1000;

            seconds = absRound(milliseconds / 1000);
            data.seconds = seconds % 60;

            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;

            hours = absRound(minutes / 60);
            data.hours = hours % 24;

            days += absRound(hours / 24);

            // Accurately convert days to years, assume start from year 0.
            years = absRound(daysToYears(days));
            days -= absRound(yearsToDays(years));

            // 30 days to a month
            // TODO (iskren): Use anchor date (like 1st Jan) to compute this.
            months += absRound(days / 30);
            days %= 30;

            // 12 months -> 1 year
            years += absRound(months / 12);
            months %= 12;

            data.days = days;
            data.months = months;
            data.years = years;
        },

        abs : function () {
            this._milliseconds = Math.abs(this._milliseconds);
            this._days = Math.abs(this._days);
            this._months = Math.abs(this._months);

            this._data.milliseconds = Math.abs(this._data.milliseconds);
            this._data.seconds = Math.abs(this._data.seconds);
            this._data.minutes = Math.abs(this._data.minutes);
            this._data.hours = Math.abs(this._data.hours);
            this._data.months = Math.abs(this._data.months);
            this._data.years = Math.abs(this._data.years);

            return this;
        },

        weeks : function () {
            return absRound(this.days() / 7);
        },

        valueOf : function () {
            return this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              toInt(this._months / 12) * 31536e6;
        },

        humanize : function (withSuffix) {
            var output = relativeTime(this, !withSuffix, this.localeData());

            if (withSuffix) {
                output = this.localeData().pastFuture(+this, output);
            }

            return this.localeData().postformat(output);
        },

        add : function (input, val) {
            // supports only 2.0-style add(1, 's') or add(moment)
            var dur = moment.duration(input, val);

            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;

            this._bubble();

            return this;
        },

        subtract : function (input, val) {
            var dur = moment.duration(input, val);

            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;

            this._bubble();

            return this;
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + 's']();
        },

        as : function (units) {
            var days, months;
            units = normalizeUnits(units);

            if (units === 'month' || units === 'year') {
                days = this._days + this._milliseconds / 864e5;
                months = this._months + daysToYears(days) * 12;
                return units === 'month' ? months : months / 12;
            } else {
                // handle milliseconds separately because of floating point math errors (issue #1867)
                days = this._days + Math.round(yearsToDays(this._months / 12));
                switch (units) {
                    case 'week': return days / 7 + this._milliseconds / 6048e5;
                    case 'day': return days + this._milliseconds / 864e5;
                    case 'hour': return days * 24 + this._milliseconds / 36e5;
                    case 'minute': return days * 24 * 60 + this._milliseconds / 6e4;
                    case 'second': return days * 24 * 60 * 60 + this._milliseconds / 1000;
                    // Math.floor prevents floating point math errors here
                    case 'millisecond': return Math.floor(days * 24 * 60 * 60 * 1000) + this._milliseconds;
                    default: throw new Error('Unknown unit ' + units);
                }
            }
        },

        lang : moment.fn.lang,
        locale : moment.fn.locale,

        toIsoString : deprecate(
            'toIsoString() is deprecated. Please use toISOString() instead ' +
            '(notice the capitals)',
            function () {
                return this.toISOString();
            }
        ),

        toISOString : function () {
            // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
            var years = Math.abs(this.years()),
                months = Math.abs(this.months()),
                days = Math.abs(this.days()),
                hours = Math.abs(this.hours()),
                minutes = Math.abs(this.minutes()),
                seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);

            if (!this.asSeconds()) {
                // this is the same as C#'s (Noda) and python (isodate)...
                // but not other JS (goog.date)
                return 'P0D';
            }

            return (this.asSeconds() < 0 ? '-' : '') +
                'P' +
                (years ? years + 'Y' : '') +
                (months ? months + 'M' : '') +
                (days ? days + 'D' : '') +
                ((hours || minutes || seconds) ? 'T' : '') +
                (hours ? hours + 'H' : '') +
                (minutes ? minutes + 'M' : '') +
                (seconds ? seconds + 'S' : '');
        },

        localeData : function () {
            return this._locale;
        },

        toJSON : function () {
            return this.toISOString();
        }
    });

    moment.duration.fn.toString = moment.duration.fn.toISOString;

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    for (i in unitMillisecondFactors) {
        if (hasOwnProp(unitMillisecondFactors, i)) {
            makeDurationGetter(i.toLowerCase());
        }
    }

    moment.duration.fn.asMilliseconds = function () {
        return this.as('ms');
    };
    moment.duration.fn.asSeconds = function () {
        return this.as('s');
    };
    moment.duration.fn.asMinutes = function () {
        return this.as('m');
    };
    moment.duration.fn.asHours = function () {
        return this.as('h');
    };
    moment.duration.fn.asDays = function () {
        return this.as('d');
    };
    moment.duration.fn.asWeeks = function () {
        return this.as('weeks');
    };
    moment.duration.fn.asMonths = function () {
        return this.as('M');
    };
    moment.duration.fn.asYears = function () {
        return this.as('y');
    };

    /************************************
        Default Locale
    ************************************/


    // Set default locale, other locale will inherit from English.
    moment.locale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    /* EMBED_LOCALES */

    /************************************
        Exposing Moment
    ************************************/

    function makeGlobal(shouldDeprecate) {
        /*global ender:false */
        if (typeof ender !== 'undefined') {
            return;
        }
        oldGlobalMoment = globalScope.moment;
        if (shouldDeprecate) {
            globalScope.moment = deprecate(
                    'Accessing Moment through the global scope is ' +
                    'deprecated, and will be removed in an upcoming ' +
                    'release.',
                    moment);
        } else {
            globalScope.moment = moment;
        }
    }

    // CommonJS module is defined
    if (hasModule) {
        module.exports = moment;
    } else if (typeof define === 'function' && define.amd) {
        define(function (require, exports, module) {
            if (module.config && module.config() && module.config().noGlobal === true) {
                // release the global variable
                globalScope.moment = oldGlobalMoment;
            }

            return moment;
        });
        makeGlobal(true);
    } else {
        makeGlobal();
    }
}).call(this);

;!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jade=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = merge(attrs, a[i]);
    }
    return attrs;
  }
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    a['class'] = ac.concat(bc).filter(nulls);
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {*} val
 * @return {Boolean}
 * @api private
 */

function nulls(val) {
  return val != null && val !== '';
}

/**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 */
exports.joinClasses = joinClasses;
function joinClasses(val) {
  return Array.isArray(val) ? val.map(joinClasses).filter(nulls).join(' ') : val;
}

/**
 * Render the given classes.
 *
 * @param {Array} classes
 * @param {Array.<Boolean>} escaped
 * @return {String}
 */
exports.cls = function cls(classes, escaped) {
  var buf = [];
  for (var i = 0; i < classes.length; i++) {
    if (escaped && escaped[i]) {
      buf.push(exports.escape(joinClasses([classes[i]])));
    } else {
      buf.push(joinClasses(classes[i]));
    }
  }
  var text = joinClasses(buf);
  if (text.length) {
    return ' class="' + text + '"';
  } else {
    return '';
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = function attr(key, val, escaped, terse) {
  if ('boolean' == typeof val || null == val) {
    if (val) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    } else {
      return '';
    }
  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
  } else if (escaped) {
    return ' ' + key + '="' + exports.escape(val) + '"';
  } else {
    return ' ' + key + '="' + val + '"';
  }
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 */
exports.attrs = function attrs(obj, terse){
  var buf = [];

  var keys = Object.keys(obj);

  if (keys.length) {
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('class' == key) {
        if (val = joinClasses(val)) {
          buf.push(' ' + key + '="' + val + '"');
        }
      } else {
        buf.push(exports.attr(key, val, false, terse));
      }
    }
  }

  return buf.join('');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  var result = String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  if (result === '' + html) return html;
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str =  str || require('fs').readFileSync(filename, 'utf8')
  } catch (ex) {
    rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

},{"fs":2}],2:[function(require,module,exports){

},{}]},{},[1])
(1)
});
;
//# sourceMappingURL=vendor.js.map