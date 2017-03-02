var Module;if(!Module)Module=(typeof Module!=="undefined"?Module:null)||{};
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports === 'object' &&
               typeof exports.nodeName !== 'string') {
        factory(exports);
    } else {
        factory(root.libsodium = {});
    }
})(this, (function (exports) {
    "use strict";
    var Module = exports;
var Module;if(!Module)Module=(typeof Module!=="undefined"?Module:null)||{};var moduleOverrides={};for(var key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;if(Module["ENVIRONMENT"]){if(Module["ENVIRONMENT"]==="WEB"){ENVIRONMENT_IS_WEB=true}else if(Module["ENVIRONMENT"]==="WORKER"){ENVIRONMENT_IS_WORKER=true}else if(Module["ENVIRONMENT"]==="NODE"){ENVIRONMENT_IS_NODE=true}else if(Module["ENVIRONMENT"]==="SHELL"){ENVIRONMENT_IS_SHELL=true}else{throw new Error("The provided Module['ENVIRONMENT'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.")}}else{ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof require==="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER}if(ENVIRONMENT_IS_NODE){if(!Module["print"])Module["print"]=console.log;if(!Module["printErr"])Module["printErr"]=console.warn;var nodeFS;var nodePath;Module["read"]=function read(filename,binary){if(!nodeFS)nodeFS=require("fs");if(!nodePath)nodePath=require("path");filename=nodePath["normalize"](filename);var ret=nodeFS["readFileSync"](filename);return binary?ret:ret.toString()};Module["readBinary"]=function readBinary(filename){var ret=Module["read"](filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};Module["load"]=function load(f){globalEval(read(f))};if(!Module["thisProgram"]){if(process["argv"].length>1){Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/")}else{Module["thisProgram"]="unknown-program"}}Module["arguments"]=process["argv"].slice(2);if(typeof module!=="undefined"){module["exports"]=Module}process["on"]("uncaughtException",(function(ex){if(!(ex instanceof ExitStatus)){throw ex}}));Module["inspect"]=(function(){return"[Emscripten Module object]"})}else if(ENVIRONMENT_IS_SHELL){if(!Module["print"])Module["print"]=print;if(typeof printErr!="undefined")Module["printErr"]=printErr;if(typeof read!="undefined"){Module["read"]=read}else{Module["read"]=function read(){throw"no read() available"}}Module["readBinary"]=function readBinary(f){if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}var data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){Module["arguments"]=scriptArgs}else if(typeof arguments!="undefined"){Module["arguments"]=arguments}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){Module["read"]=function read(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};Module["readAsync"]=function readAsync(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response)}else{onerror()}};xhr.onerror=onerror;xhr.send(null)};if(typeof arguments!="undefined"){Module["arguments"]=arguments}if(typeof console!=="undefined"){if(!Module["print"])Module["print"]=function print(x){console.log(x)};if(!Module["printErr"])Module["printErr"]=function printErr(x){console.warn(x)}}else{var TRY_USE_DUMP=false;if(!Module["print"])Module["print"]=TRY_USE_DUMP&&typeof dump!=="undefined"?(function(x){dump(x)}):(function(x){})}if(ENVIRONMENT_IS_WORKER){Module["load"]=importScripts}if(typeof Module["setWindowTitle"]==="undefined"){Module["setWindowTitle"]=(function(title){document.title=title})}}else{throw"Unknown runtime environment. Where are we?"}function globalEval(x){abort("NO_DYNAMIC_EXECUTION=1 was set, cannot eval")}if(!Module["load"]&&Module["read"]){Module["load"]=function load(f){globalEval(Module["read"](f))}}if(!Module["print"]){Module["print"]=(function(){})}if(!Module["printErr"]){Module["printErr"]=Module["print"]}if(!Module["arguments"]){Module["arguments"]=[]}if(!Module["thisProgram"]){Module["thisProgram"]="./this.program"}Module.print=Module["print"];Module.printErr=Module["printErr"];Module["preRun"]=[];Module["postRun"]=[];for(var key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=undefined;var Runtime={setTempRet0:(function(value){tempRet0=value}),getTempRet0:(function(){return tempRet0}),stackSave:(function(){return STACKTOP}),stackRestore:(function(stackTop){STACKTOP=stackTop}),getNativeTypeSize:(function(type){switch(type){case"i1":case"i8":return 1;case"i16":return 2;case"i32":return 4;case"i64":return 8;case"float":return 4;case"double":return 8;default:{if(type[type.length-1]==="*"){return Runtime.QUANTUM_SIZE}else if(type[0]==="i"){var bits=parseInt(type.substr(1));assert(bits%8===0);return bits/8}else{return 0}}}}),getNativeFieldSize:(function(type){return Math.max(Runtime.getNativeTypeSize(type),Runtime.QUANTUM_SIZE)}),STACK_ALIGN:16,prepVararg:(function(ptr,type){if(type==="double"||type==="i64"){if(ptr&7){assert((ptr&7)===4);ptr+=4}}else{assert((ptr&3)===0)}return ptr}),getAlignSize:(function(type,size,vararg){if(!vararg&&(type=="i64"||type=="double"))return 8;if(!type)return Math.min(size,8);return Math.min(size||(type?Runtime.getNativeFieldSize(type):0),Runtime.QUANTUM_SIZE)}),dynCall:(function(sig,ptr,args){if(args&&args.length){return Module["dynCall_"+sig].apply(null,[ptr].concat(args))}else{return Module["dynCall_"+sig].call(null,ptr)}}),functionPointers:[null,null,null,null,null,null,null,null],addFunction:(function(func){for(var i=0;i<Runtime.functionPointers.length;i++){if(!Runtime.functionPointers[i]){Runtime.functionPointers[i]=func;return 1*(1+i)}}throw"Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS."}),removeFunction:(function(index){Runtime.functionPointers[(index-1)/1]=null}),warnOnce:(function(text){if(!Runtime.warnOnce.shown)Runtime.warnOnce.shown={};if(!Runtime.warnOnce.shown[text]){Runtime.warnOnce.shown[text]=1;Module.printErr(text)}}),funcWrappers:{},getFuncWrapper:(function(func,sig){assert(sig);if(!Runtime.funcWrappers[sig]){Runtime.funcWrappers[sig]={}}var sigCache=Runtime.funcWrappers[sig];if(!sigCache[func]){if(sig.length===1){sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func)}}else if(sig.length===2){sigCache[func]=function dynCall_wrapper(arg){return Runtime.dynCall(sig,func,[arg])}}else{sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func,Array.prototype.slice.call(arguments))}}}return sigCache[func]}),getCompilerSetting:(function(name){throw"You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work"}),stackAlloc:(function(size){var ret=STACKTOP;STACKTOP=STACKTOP+size|0;STACKTOP=STACKTOP+15&-16;return ret}),staticAlloc:(function(size){var ret=STATICTOP;STATICTOP=STATICTOP+size|0;STATICTOP=STATICTOP+15&-16;return ret}),dynamicAlloc:(function(size){var ret=HEAP32[DYNAMICTOP_PTR>>2];var end=(ret+size+15|0)&-16;HEAP32[DYNAMICTOP_PTR>>2]=end;if(end>=TOTAL_MEMORY){var success=enlargeMemory();if(!success){HEAP32[DYNAMICTOP_PTR>>2]=ret;return 0}}return ret}),alignMemory:(function(size,quantum){var ret=size=Math.ceil(size/(quantum?quantum:16))*(quantum?quantum:16);return ret}),makeBigInt:(function(low,high,unsigned){var ret=unsigned?+(low>>>0)+ +(high>>>0)*+4294967296:+(low>>>0)+ +(high|0)*+4294967296;return ret}),GLOBAL_BASE:8,QUANTUM_SIZE:4,__dummy__:0};Module["Runtime"]=Runtime;var ABORT=0;var EXITSTATUS=0;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}function getCFunc(ident){var func=Module["_"+ident];if(!func){abort("NO_DYNAMIC_EXECUTION=1 was set, cannot eval")}assert(func,"Cannot call unknown function "+ident+" (perhaps LLVM optimizations or closure removed it?)");return func}var cwrap,ccall;((function(){var JSfuncs={"stackSave":(function(){Runtime.stackSave()}),"stackRestore":(function(){Runtime.stackRestore()}),"arrayToC":(function(arr){var ret=Runtime.stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}),"stringToC":(function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){var len=(str.length<<2)+1;ret=Runtime.stackAlloc(len);stringToUTF8(str,ret,len)}return ret})};var toC={"string":JSfuncs["stringToC"],"array":JSfuncs["arrayToC"]};ccall=function ccallFunc(ident,returnType,argTypes,args,opts){var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=Runtime.stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);if(returnType==="string")ret=Pointer_stringify(ret);if(stack!==0){if(opts&&opts.async){EmterpreterAsync.asyncFinalizers.push((function(){Runtime.stackRestore(stack)}));return}Runtime.stackRestore(stack)}return ret};cwrap=function cwrap(ident,returnType,argTypes){return(function(){return ccall(ident,returnType,argTypes,arguments)})}}))();Module["ccall"]=ccall;Module["cwrap"]=cwrap;function setValue(ptr,value,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":HEAP8[ptr>>0]=value;break;case"i8":HEAP8[ptr>>0]=value;break;case"i16":HEAP16[ptr>>1]=value;break;case"i32":HEAP32[ptr>>2]=value;break;case"i64":tempI64=[value>>>0,(tempDouble=value,+Math_abs(tempDouble)>=+1?tempDouble>+0?(Math_min(+Math_floor(tempDouble/+4294967296),+4294967295)|0)>>>0:~~+Math_ceil((tempDouble- +(~~tempDouble>>>0))/+4294967296)>>>0:0)],HEAP32[ptr>>2]=tempI64[0],HEAP32[ptr+4>>2]=tempI64[1];break;case"float":HEAPF32[ptr>>2]=value;break;case"double":HEAPF64[ptr>>3]=value;break;default:abort("invalid type for setValue: "+type)}}Module["setValue"]=setValue;function getValue(ptr,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":return HEAP8[ptr>>0];case"i8":return HEAP8[ptr>>0];case"i16":return HEAP16[ptr>>1];case"i32":return HEAP32[ptr>>2];case"i64":return HEAP32[ptr>>2];case"float":return HEAPF32[ptr>>2];case"double":return HEAPF64[ptr>>3];default:abort("invalid type for setValue: "+type)}return null}Module["getValue"]=getValue;var ALLOC_NORMAL=0;var ALLOC_STACK=1;var ALLOC_STATIC=2;var ALLOC_DYNAMIC=3;var ALLOC_NONE=4;Module["ALLOC_NORMAL"]=ALLOC_NORMAL;Module["ALLOC_STACK"]=ALLOC_STACK;Module["ALLOC_STATIC"]=ALLOC_STATIC;Module["ALLOC_DYNAMIC"]=ALLOC_DYNAMIC;Module["ALLOC_NONE"]=ALLOC_NONE;function allocate(slab,types,allocator,ptr){var zeroinit,size;if(typeof slab==="number"){zeroinit=true;size=slab}else{zeroinit=false;size=slab.length}var singleType=typeof types==="string"?types:null;var ret;if(allocator==ALLOC_NONE){ret=ptr}else{ret=[typeof _malloc==="function"?_malloc:Runtime.staticAlloc,Runtime.stackAlloc,Runtime.staticAlloc,Runtime.dynamicAlloc][allocator===undefined?ALLOC_STATIC:allocator](Math.max(size,singleType?1:types.length))}if(zeroinit){var ptr=ret,stop;assert((ret&3)==0);stop=ret+(size&~3);for(;ptr<stop;ptr+=4){HEAP32[ptr>>2]=0}stop=ret+size;while(ptr<stop){HEAP8[ptr++>>0]=0}return ret}if(singleType==="i8"){if(slab.subarray||slab.slice){HEAPU8.set(slab,ret)}else{HEAPU8.set(new Uint8Array(slab),ret)}return ret}var i=0,type,typeSize,previousType;while(i<size){var curr=slab[i];if(typeof curr==="function"){curr=Runtime.getFunctionIndex(curr)}type=singleType||types[i];if(type===0){i++;continue}if(type=="i64")type="i32";setValue(ret+i,curr,type);if(previousType!==type){typeSize=Runtime.getNativeTypeSize(type);previousType=type}i+=typeSize}return ret}Module["allocate"]=allocate;function getMemory(size){if(!staticSealed)return Runtime.staticAlloc(size);if(!runtimeInitialized)return Runtime.dynamicAlloc(size);return _malloc(size)}Module["getMemory"]=getMemory;function Pointer_stringify(ptr,length){if(length===0||!ptr)return"";var hasUtf=0;var t;var i=0;while(1){t=HEAPU8[ptr+i>>0];hasUtf|=t;if(t==0&&!length)break;i++;if(length&&i==length)break}if(!length)length=i;var ret="";if(hasUtf<128){var MAX_CHUNK=1024;var curr;while(length>0){curr=String.fromCharCode.apply(String,HEAPU8.subarray(ptr,ptr+Math.min(length,MAX_CHUNK)));ret=ret?ret+curr:curr;ptr+=MAX_CHUNK;length-=MAX_CHUNK}return ret}return Module["UTF8ToString"](ptr)}Module["Pointer_stringify"]=Pointer_stringify;function AsciiToString(ptr){var str="";while(1){var ch=HEAP8[ptr++>>0];if(!ch)return str;str+=String.fromCharCode(ch)}}Module["AsciiToString"]=AsciiToString;function stringToAscii(str,outPtr){return writeAsciiToMemory(str,outPtr,false)}Module["stringToAscii"]=stringToAscii;var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(u8Array,idx){var endPtr=idx;while(u8Array[endPtr])++endPtr;if(endPtr-idx>16&&u8Array.subarray&&UTF8Decoder){return UTF8Decoder.decode(u8Array.subarray(idx,endPtr))}else{var u0,u1,u2,u3,u4,u5;var str="";while(1){u0=u8Array[idx++];if(!u0)return str;if(!(u0&128)){str+=String.fromCharCode(u0);continue}u1=u8Array[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}u2=u8Array[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u3=u8Array[idx++]&63;if((u0&248)==240){u0=(u0&7)<<18|u1<<12|u2<<6|u3}else{u4=u8Array[idx++]&63;if((u0&252)==248){u0=(u0&3)<<24|u1<<18|u2<<12|u3<<6|u4}else{u5=u8Array[idx++]&63;u0=(u0&1)<<30|u1<<24|u2<<18|u3<<12|u4<<6|u5}}}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}}Module["UTF8ArrayToString"]=UTF8ArrayToString;function UTF8ToString(ptr){return UTF8ArrayToString(HEAPU8,ptr)}Module["UTF8ToString"]=UTF8ToString;function stringToUTF8Array(str,outU8Array,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){if(outIdx>=endIdx)break;outU8Array[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;outU8Array[outIdx++]=192|u>>6;outU8Array[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;outU8Array[outIdx++]=224|u>>12;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=2097151){if(outIdx+3>=endIdx)break;outU8Array[outIdx++]=240|u>>18;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=67108863){if(outIdx+4>=endIdx)break;outU8Array[outIdx++]=248|u>>24;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else{if(outIdx+5>=endIdx)break;outU8Array[outIdx++]=252|u>>30;outU8Array[outIdx++]=128|u>>24&63;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}}outU8Array[outIdx]=0;return outIdx-startIdx}Module["stringToUTF8Array"]=stringToUTF8Array;function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}Module["stringToUTF8"]=stringToUTF8;function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){++len}else if(u<=2047){len+=2}else if(u<=65535){len+=3}else if(u<=2097151){len+=4}else if(u<=67108863){len+=5}else{len+=6}}return len}Module["lengthBytesUTF8"]=lengthBytesUTF8;var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;function demangle(func){var hasLibcxxabi=!!Module["___cxa_demangle"];if(hasLibcxxabi){try{var s=func.substr(1);var len=lengthBytesUTF8(s)+1;var buf=_malloc(len);stringToUTF8(s,buf,len);var status=_malloc(4);var ret=Module["___cxa_demangle"](buf,0,0,status);if(getValue(status,"i32")===0&&ret){return Pointer_stringify(ret)}}catch(e){}finally{if(buf)_free(buf);if(status)_free(status);if(ret)_free(ret)}return func}Runtime.warnOnce("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");return func}function demangleAll(text){return text.replace(/__Z[\w\d_]+/g,(function(x){var y=demangle(x);return x===y?x:x+" ["+y+"]"}))}function jsStackTrace(){var err=new Error;if(!err.stack){try{throw new Error(0)}catch(e){err=e}if(!err.stack){return"(no stack trace available)"}}return err.stack.toString()}function stackTrace(){var js=jsStackTrace();if(Module["extraStackTrace"])js+="\n"+Module["extraStackTrace"]();return demangleAll(js)}Module["stackTrace"]=stackTrace;var PAGE_SIZE=4096;var HEAP;var buffer;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferViews(){Module["HEAP8"]=HEAP8=new Int8Array(buffer);Module["HEAP16"]=HEAP16=new Int16Array(buffer);Module["HEAP32"]=HEAP32=new Int32Array(buffer);Module["HEAPU8"]=HEAPU8=new Uint8Array(buffer);Module["HEAPU16"]=HEAPU16=new Uint16Array(buffer);Module["HEAPU32"]=HEAPU32=new Uint32Array(buffer);Module["HEAPF32"]=HEAPF32=new Float32Array(buffer);Module["HEAPF64"]=HEAPF64=new Float64Array(buffer)}var STATIC_BASE,STATICTOP,staticSealed;var STACK_BASE,STACKTOP,STACK_MAX;var DYNAMIC_BASE,DYNAMICTOP_PTR;STATIC_BASE=STATICTOP=STACK_BASE=STACKTOP=STACK_MAX=DYNAMIC_BASE=DYNAMICTOP_PTR=0;staticSealed=false;function abortOnCannotGrowMemory(){abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value "+TOTAL_MEMORY+", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which adjusts the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")}function enlargeMemory(){abortOnCannotGrowMemory()}var TOTAL_STACK=Module["TOTAL_STACK"]||5242880;var TOTAL_MEMORY=Module["TOTAL_MEMORY"]||34996224;var WASM_PAGE_SIZE=64*1024;var totalMemory=WASM_PAGE_SIZE;while(totalMemory<TOTAL_MEMORY||totalMemory<2*TOTAL_STACK){if(totalMemory<16*1024*1024){totalMemory*=2}else{totalMemory+=16*1024*1024}}if(totalMemory!==TOTAL_MEMORY){TOTAL_MEMORY=totalMemory}if(Module["buffer"]){buffer=Module["buffer"]}else{{buffer=new ArrayBuffer(TOTAL_MEMORY)}}updateGlobalBufferViews();function getTotalMemory(){return TOTAL_MEMORY}HEAP32[0]=1668509029;HEAP16[1]=25459;if(HEAPU8[2]!==115||HEAPU8[3]!==99)throw"Runtime error: expected the system to be little-endian!";Module["HEAP"]=HEAP;Module["buffer"]=buffer;Module["HEAP8"]=HEAP8;Module["HEAP16"]=HEAP16;Module["HEAP32"]=HEAP32;Module["HEAPU8"]=HEAPU8;Module["HEAPU16"]=HEAPU16;Module["HEAPU32"]=HEAPU32;Module["HEAPF32"]=HEAPF32;Module["HEAPF64"]=HEAPF64;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Runtime.dynCall("v",func)}else{Runtime.dynCall("vi",func,[callback.arg])}}else{func(callback.arg===undefined?null:callback.arg)}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATEXIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){callRuntimeCallbacks(__ATEXIT__);runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}Module["addOnPreRun"]=addOnPreRun;function addOnInit(cb){__ATINIT__.unshift(cb)}Module["addOnInit"]=addOnInit;function addOnPreMain(cb){__ATMAIN__.unshift(cb)}Module["addOnPreMain"]=addOnPreMain;function addOnExit(cb){__ATEXIT__.unshift(cb)}Module["addOnExit"]=addOnExit;function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}Module["addOnPostRun"]=addOnPostRun;function intArrayFromString(stringy,dontAddNull,length){var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array}Module["intArrayFromString"]=intArrayFromString;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}Module["intArrayToString"]=intArrayToString;function writeStringToMemory(string,buffer,dontAddNull){Runtime.warnOnce("writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!");var lastChar,end;if(dontAddNull){end=buffer+lengthBytesUTF8(string);lastChar=HEAP8[end]}stringToUTF8(string,buffer,Infinity);if(dontAddNull)HEAP8[end]=lastChar}Module["writeStringToMemory"]=writeStringToMemory;function writeArrayToMemory(array,buffer){HEAP8.set(array,buffer)}Module["writeArrayToMemory"]=writeArrayToMemory;function writeAsciiToMemory(str,buffer,dontAddNull){for(var i=0;i<str.length;++i){HEAP8[buffer++>>0]=str.charCodeAt(i)}if(!dontAddNull)HEAP8[buffer>>0]=0}Module["writeAsciiToMemory"]=writeAsciiToMemory;if(!Math["imul"]||Math["imul"](4294967295,5)!==-5)Math["imul"]=function imul(a,b){var ah=a>>>16;var al=a&65535;var bh=b>>>16;var bl=b&65535;return al*bl+(ah*bl+al*bh<<16)|0};Math.imul=Math["imul"];if(!Math["clz32"])Math["clz32"]=(function(x){x=x>>>0;for(var i=0;i<32;i++){if(x&1<<31-i)return i}return 32});Math.clz32=Math["clz32"];if(!Math["trunc"])Math["trunc"]=(function(x){return x<0?Math.ceil(x):Math.floor(x)});Math.trunc=Math["trunc"];var Math_abs=Math.abs;var Math_cos=Math.cos;var Math_sin=Math.sin;var Math_tan=Math.tan;var Math_acos=Math.acos;var Math_asin=Math.asin;var Math_atan=Math.atan;var Math_atan2=Math.atan2;var Math_exp=Math.exp;var Math_log=Math.log;var Math_sqrt=Math.sqrt;var Math_ceil=Math.ceil;var Math_floor=Math.floor;var Math_pow=Math.pow;var Math_imul=Math.imul;var Math_fround=Math.fround;var Math_round=Math.round;var Math_min=Math.min;var Math_clz32=Math.clz32;var Math_trunc=Math.trunc;var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}Module["addRunDependency"]=addRunDependency;function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["removeRunDependency"]=removeRunDependency;Module["preloadedImages"]={};Module["preloadedAudios"]={};var ASM_CONSTS=[(function(){{return Module.getRandomValue()}}),(function(){{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self,crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto,randomValuesStandard=(function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0});randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto"),randomValueNodeJS=(function(){var buf=crypto.randomBytes(4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0});randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}})];function _emscripten_asm_const_i(code){return ASM_CONSTS[code]()}function _emscripten_asm_const_v(code){return ASM_CONSTS[code]()}STATIC_BASE=8;STATICTOP=STATIC_BASE+35472;__ATINIT__.push();allocate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,38,232,149,143,194,178,39,176,69,195,244,137,242,239,152,240,213,223,172,5,211,198,51,57,177,56,2,136,109,83,252,5,199,23,106,112,61,77,216,79,186,60,11,118,13,16,103,15,42,32,83,250,44,57,204,198,78,199,253,119,146,172,3,122,19,232,149,143,194,178,39,176,69,195,244,137,242,239,152,240,213,223,172,5,211,198,51,57,177,56,2,136,109,83,252,133,180,23,106,112,61,77,216,79,186,60,11,118,13,16,103,15,42,32,83,250,44,57,204,198,78,199,253,119,146,172,3,250,236,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,127,237,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,127,238,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,127,217,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,218,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,219,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,8,201,188,243,103,230,9,106,59,167,202,132,133,174,103,187,43,248,148,254,114,243,110,60,241,54,29,95,58,245,79,165,209,130,230,173,127,82,14,81,31,108,62,43,140,104,5,155,107,189,65,251,171,217,131,31,121,33,126,19,25,205,224,91,34,174,40,215,152,47,138,66,205,101,239,35,145,68,55,113,47,59,77,236,207,251,192,181,188,219,137,129,165,219,181,233,56,181,72,243,91,194,86,57,25,208,5,182,241,17,241,89,155,79,25,175,164,130,63,146,24,129,109,218,213,94,28,171,66,2,3,163,152,170,7,216,190,111,112,69,1,91,131,18,140,178,228,78,190,133,49,36,226,180,255,213,195,125,12,85,111,137,123,242,116,93,190,114,177,150,22,59,254,177,222,128,53,18,199,37,167,6,220,155,148,38,105,207,116,241,155,193,210,74,241,158,193,105,155,228,227,37,79,56,134,71,190,239,181,213,140,139,198,157,193,15,101,156,172,119,204,161,12,36,117,2,43,89,111,44,233,45,131,228,166,110,170,132,116,74,212,251,65,189,220,169,176,92,181,83,17,131,218,136,249,118,171,223,102,238,82,81,62,152,16,50,180,45,109,198,49,168,63,33,251,152,200,39,3,176,228,14,239,190,199,127,89,191,194,143,168,61,243,11,224,198,37,167,10,147,71,145,167,213,111,130,3,224,81,99,202,6,112,110,14,10,103,41,41,20,252,47,210,70,133,10,183,39,38,201,38,92,56,33,27,46,237,42,196,90,252,109,44,77,223,179,149,157,19,13,56,83,222,99,175,139,84,115,10,101,168,178,119,60,187,10,106,118,230,174,237,71,46,201,194,129,59,53,130,20,133,44,114,146,100,3,241,76,161,232,191,162,1,48,66,188,75,102,26,168,145,151,248,208,112,139,75,194,48,190,84,6,163,81,108,199,24,82,239,214,25,232,146,209,16,169,101,85,36,6,153,214,42,32,113,87,133,53,14,244,184,209,187,50,112,160,106,16,200,208,210,184,22,193,164,25,83,171,65,81,8,108,55,30,153,235,142,223,76,119,72,39,168,72,155,225,181,188,176,52,99,90,201,197,179,12,28,57,203,138,65,227,74,170,216,78,115,227,99,119,79,202,156,91,163,184,178,214,243,111,46,104,252,178,239,93,238,130,143,116,96,47,23,67,111,99,165,120,114,171,240,161,20,120,200,132,236,57,100,26,8,2,199,140,40,30,99,35,250,255,190,144,233,189,130,222,235,108,80,164,21,121,198,178,247,163,249,190,43,83,114,227,242,120,113,198,156,97,38,234,206,62,39,202,7,194,192,33,199,184,134,209,30,235,224,205,214,125,218,234,120,209,110,238,127,79,125,245,186,111,23,114,170,103,240,6,166,152,200,162,197,125,99,10,174,13,249,190,4,152,63,17,27,71,28,19,53,11,113,27,132,125,4,35,245,119,219,40,147,36,199,64,123,171,202,50,188,190,201,21,10,190,158,60,76,13,16,156,196,103,29,67,182,66,62,203,190,212,197,76,42,126,101,252,156,41,127,89,236,250,214,58,171,111,203,95,23,88,71,74,140,25,68,108,182,120,89,255,133,114,211,0,189,110,21,255,15,10,106,0,41,192,1,0,152,232,121,255,188,60,160,255,153,113,206,255,0,183,226,254,180,13,72,255,176,160,14,254,211,201,134,255,158,24,143,0,127,105,53,0,96,12,189,0,167,215,251,255,159,76,128,254,106,101,225,255,30,252,4,0,146,12,174,0,89,241,178,254,10,229,166,255,123,221,42,254,30,20,212,0,82,128,3,0,48,209,243,0,119,121,64,255,50,227,156,255,0,110,197,1,103,27,144,0,133,59,140,1,189,241,36,255,248,37,195,1,96,220,55,0,183,76,62,255,195,66,61,0,50,76,164,1,225,164,76,255,76,61,163,255,117,62,31,0,81,145,64,255,118,65,14,0,162,115,214,255,6,138,46,0,124,230,244,255,10,138,143,0,52,26,194,0,184,244,76,0,129,143,41,1,190,244,19,255,123,170,122,255,98,129,68,0,121,213,147,0,86,101,30,255,161,103,155,0,140,89,67,255,239,229,190,1,67,11,181,0,198,240,137,254,238,69,188,255,67,151,238,0,19,42,108,255,229,85,113,1,50,68,135,255,17,106,9,0,50,103,1,255,80,1,168,1,35,152,30,255,16,168,185,1,56,89,232,255,101,210,252,0,41,250,71,0,204,170,79,255,14,46,239,255,80,77,239,0,189,214,75,255,17,141,249,0,38,80,76,255,190,85,117,0,86,228,170,0,156,216,208,1,195,207,164,255,150,66,76,255,175,225,16,255,141,80,98,1,76,219,242,0,198,162,114,0,46,218,152,0,155,43,241,254,155,160,104,255,51,187,165,0,2,17,175,0,66,84,160,1,247,58,30,0,35,65,53,254,69,236,191,0,45,134,245,1,163,123,221,0,32,110,20,255,52,23,165,0,186,214,71,0,233,176,96,0,242,239,54,1,57,89,138,0,83,0,84,255,136,160,100,0,92,142,120,254,104,124,190,0,181,177,62,255,250,41,85,0,152,130,42,1,96,252,246,0,151,151,63,254,239,133,62,0,32,56,156,0,45,167,189,255,142,133,179,1,131,86,211,0,187,179,150,254,250,170,14,255,210,163,78,0,37,52,151,0,99,77,26,0,238,156,213,255,213,192,209,1,73,46,84,0,20,65,41,1,54,206,79,0,201,131,146,254,170,111,24,255,177,33,50,254,171,38,203,255,78,247,116,0,209,221,153,0,133,128,178,1,58,44,25,0,201,39,59,1,189,19,252,0,49,229,210,1,117,187,117,0,181,179,184,1,0,114,219,0,48,94,147,0,245,41,56,0,125,13,204,254,244,173,119,0,44,221,32,254,84,234,20,0,249,160,198,1,236,126,234,255,47,99,168,254,170,226,153,255,102,179,216,0,226,141,122,255,122,66,153,254,182,245,134,0,227,228,25,1,214,57,235,255,216,173,56,255,181,231,210,0,119,128,157,255,129,95,136,255,110,126,51,0,2,169,183,255,7,130,98,254,69,176,94,255,116,4,227,1,217,242,145,255,202,173,31,1,105,1,39,255,46,175,69,0,228,47,58,255,215,224,69,254,207,56,69,255,16,254,139,255,23,207,212,255,202,20,126,255,95,213,96,255,9,176,33,0,200,5,207,255,241,42,128,254,35,33,192,255,248,229,196,1,129,17,120,0,251,103,151,255,7,52,112,255,140,56,66,255,40,226,245,255,217,70,37,254,172,214,9,255,72,67,134,1,146,192,214,255,44,38,112,0,68,184,75,255,206,90,251,0,149,235,141,0,181,170,58,0,116,244,239,0,92,157,2,0,102,173,98,0,233,137,96,1,127,49,203,0,5,155,148,0,23,148,9,255,211,122,12,0,34,134,26,255,219,204,136,0,134,8,41,255,224,83,43,254,85,25,247,0,109,127,0,254,169,136,48,0,238,119,219,255,231,173,213,0,206,18,254,254,8,186,7,255,126,9,7,1,111,42,72,0,111,52,236,254,96,63,141,0,147,191,127,254,205,78,192,255,14,106,237,1,187,219,76,0,175,243,187,254,105,89,173,0,85,25,89,1,162,243,148,0,2,118,209,254,33,158,9,0,139,163,46,255,93,70,40,0,108,42,142,254,111,252,142,255,155,223,144,0,51,229,167,255,73,252,155,255,94,116,12,255,152,160,218,255,156,238,37,255,179,234,207,255,197,0,179,255,154,164,141,0,225,196,104,0,10,35,25,254,209,212,242,255,97,253,222,254,184,101,229,0,222,18,127,1,164,136,135,255,30,207,140,254,146,97,243,0,129,192,26,254,201,84,33,255,111,10,78,255,147,81,178,255,4,4,24,0,161,238,215,255,6,141,33,0,53,215,14,255,41,181,208,255,231,139,157,0,179,203,221,255,255,185,113,0,189,226,172,255,113,66,214,255,202,62,45,255,102,64,8,255,78,174,16,254,133,117,68,255,133,59,140,1,189,241,36,255,248,37,195,1,96,220,55,0,183,76,62,255,195,66,61,0,50,76,164,1,225,164,76,255,76,61,163,255,117,62,31,0,81,145,64,255,118,65,14,0,162,115,214,255,6,138,46,0,124,230,244,255,10,138,143,0,52,26,194,0,184,244,76,0,129,143,41,1,190,244,19,255,123,170,122,255,98,129,68,0,121,213,147,0,86,101,30,255,161,103,155,0,140,89,67,255,239,229,190,1,67,11,181,0,198,240,137,254,238,69,188,255,234,113,60,255,37,255,57,255,69,178,182,254,128,208,179,0,118,26,125,254,3,7,214,255,241,50,77,255,85,203,197,255,211,135,250,255,25,48,100,255,187,213,180,254,17,88,105,0,83,209,158,1,5,115,98,0,4,174,60,254,171,55,110,255,217,181,17,255,20,188,170,0,146,156,102,254,87,214,174,255,114,122,155,1,233,44,170,0,127,8,239,1,214,236,234,0,175,5,219,0,49,106,61,255,6,66,208,255,2,106,110,255,81,234,19,255,215,107,192,255,67,151,238,0,19,42,108,255,229,85,113,1,50,68,135,255,17,106,9,0,50,103,1,255,80,1,168,1,35,152,30,255,16,168,185,1,56,89,232,255,101,210,252,0,41,250,71,0,204,170,79,255,14,46,239,255,80,77,239,0,189,214,75,255,17,141,249,0,38,80,76,255,190,85,117,0,86,228,170,0,156,216,208,1,195,207,164,255,150,66,76,255,175,225,16,255,141,80,98,1,76,219,242,0,198,162,114,0,46,218,152,0,155,43,241,254,155,160,104,255,178,9,252,254,100,110,212,0,14,5,167,0,233,239,163,255,28,151,157,1,101,146,10,255,254,158,70,254,71,249,228,0,88,30,50,0,68,58,160,255,191,24,104,1,129,66,129,255,192,50,85,255,8,179,138,255,38,250,201,0,115,80,160,0,131,230,113,0,125,88,147,0,90,68,199,0,253,76,158,0,28,255,118,0,113,250,254,0,66,75,46,0,230,218,43,0,229,120,186,1,148,68,43,0,136,124,238,1,187,107,197,255,84,53,246,255,51,116,254,255,51,187,165,0,2,17,175,0,66,84,160,1,247,58,30,0,35,65,53,254,69,236,191,0,45,134,245,1,163,123,221,0,32,110,20,255,52,23,165,0,186,214,71,0,233,176,96,0,242,239,54,1,57,89,138,0,83,0,84,255,136,160,100,0,92,142,120,254,104,124,190,0,181,177,62,255,250,41,85,0,152,130,42,1,96,252,246,0,151,151,63,254,239,133,62,0,32,56,156,0,45,167,189,255,142,133,179,1,131,86,211,0,187,179,150,254,250,170,14,255,68,113,21,255,222,186,59,255,66,7,241,1,69,6,72,0,86,156,108,254,55,167,89,0,109,52,219,254,13,176,23,255,196,44,106,255,239,149,71,255,164,140,125,255,159,173,1,0,51,41,231,0,145,62,33,0,138,111,93,1,185,83,69,0,144,115,46,0,97,151,16,255,24,228,26,0,49,217,226,0,113,75,234,254,193,153,12,255,182,48,96,255,14,13,26,0,128,195,249,254,69,193,59,0,132,37,81,254,125,106,60,0,214,240,169,1,164,227,66,0,210,163,78,0,37,52,151,0,99,77,26,0,238,156,213,255,213,192,209,1,73,46,84,0,20,65,41,1,54,206,79,0,201,131,146,254,170,111,24,255,177,33,50,254,171,38,203,255,78,247,116,0,209,221,153,0,133,128,178,1,58,44,25,0,201,39,59,1,189,19,252,0,49,229,210,1,117,187,117,0,181,179,184,1,0,114,219,0,48,94,147,0,245,41,56,0,125,13,204,254,244,173,119,0,44,221,32,254,84,234,20,0,249,160,198,1,236,126,234,255,143,62,221,0,129,89,214,255,55,139,5,254,68,20,191,255,14,204,178,1,35,195,217,0,47,51,206,1,38,246,165,0,206,27,6,254,158,87,36,0,217,52,146,255,125,123,215,255,85,60,31,255,171,13,7,0,218,245,88,254,252,35,60,0,55,214,160,255,133,101,56,0,224,32,19,254,147,64,234,0,26,145,162,1,114,118,125,0,248,252,250,0,101,94,196,255,198,141,226,254,51,42,182,0,135,12,9,254,109,172,210,255,197,236,194,1,241,65,154,0,48,156,47,255,153,67,55,255,218,165,34,254,74,180,179,0,218,66,71,1,88,122,99,0,212,181,219,255,92,42,231,255,239,0,154,0,245,77,183,255,94,81,170,1,18,213,216,0,171,93,71,0,52,94,248,0,18,151,161,254,197,209,66,255,174,244,15,254,162,48,183,0,49,61,240,254,182,93,195,0,199,228,6,1,200,5,17,255,137,45,237,255,108,148,4,0,90,79,237,255,39,63,77,255,53,82,207,1,142,22,118,255,101,232,18,1,92,26,67,0,5,200,88,255,33,168,138,255,149,225,72,0,2,209,27,255,44,245,168,1,220,237,17,255,30,211,105,254,141,238,221,0,128,80,245,254,111,254,14,0,222,95,190,1,223,9,241,0,146,76,212,255,108,205,104,255,63,117,153,0,144,69,48,0,35,228,111,0,192,33,193,255,112,214,190,254,115,152,151,0,23,102,88,0,51,74,248,0,226,199,143,254,204,162,101,255,208,97,189,1,245,104,18,0,230,246,30,255,23,148,69,0,110,88,52,254,226,181,89,255,208,47,90,254,114,161,80,255,33,116,248,0,179,152,87,255,69,144,177,1,88,238,26,255,58,32,113,1,1,77,69,0,59,121,52,255,152,238,83,0,52,8,193,0,231,39,233,255,199,34,138,0,222,68,173,0,91,57,242,254,220,210,127,255,192,7,246,254,151,35,187,0,195,236,165,0,111,93,206,0,212,247,133,1,154,133,209,255,155,231,10,0,64,78,38,0,122,249,100,1,30,19,97,255,62,91,249,1,248,133,77,0,197,63,168,254,116,10,82,0,184,236,113,254,212,203,194,255,61,100,252,254,36,5,202,255,119,91,153,255,129,79,29,0,103,103,171,254,237,215,111,255,216,53,69,0,239,240,23,0,194,149,221,255,38,225,222,0,232,255,180,254,118,82,133,255,57,209,177,1,139,232,133,0,158,176,46,254,194,115,46,0,88,247,229,1,28,103,191,0,221,222,175,254,149,235,44,0,151,228,25,254,218,105,103,0,142,85,210,0,149,129,190,255,213,65,94,254,117,134,224,255,82,198,117,0,157,221,220,0,163,101,36,0,197,114,37,0,104,172,166,254,11,182,0,0,81,72,188,255,97,188,16,255,69,6,10,0,199,147,145,255,8,9,115,1,65,214,175,255,217,173,209,0,80,127,166,0,247,229,4,254,167,183,124,255,90,28,204,254,175,59,240,255,11,41,248,1,108,40,51,255,144,177,195,254,150,250,126,0,138,91,65,1,120,60,222,255,245,193,239,0,29,214,189,255,128,2,25,0,80,154,162,0,77,220,107,1,234,205,74,255,54,166,103,255,116,72,9,0,228,94,47,255,30,200,25,255,35,214,89,255,61,176,140,255,83,226,163,255,75,130,172,0,128,38,17,0,95,137,152,255,215,124,159,1,79,93,0,0,148,82,157,254,195,130,251,255,40,202,76,255,251,126,224,0,157,99,62,254,207,7,225,255,96,68,195,0,140,186,157,255,131,19,231,255,42,128,254,0,52,219,61,254,102,203,72,0,141,7,11,255,186,164,213,0,31,122,119,0,133,242,145,0,208,252,232,255,91,213,182,255,143,4,250,254,249,215,74,0,165,30,111,1,171,9,223,0,229,123,34,1,92,130,26,255,77,155,45,1,195,139,28,255,59,224,78,0,136,17,247,0,108,121,32,0,79,250,189,255,96,227,252,254,38,241,62,0,62,174,125,255,155,111,93,255,10,230,206,1,97,197,40,255,0,49,57,254,65,250,13,0,18,251,150,255,220,109,210,255,5,174,166,254,44,129,189,0,235,35,147,255,37,247,141,255,72,141,4,255,103,107,255,0,247,90,4,0,53,44,42,0,2,30,240,0,4,59,63,0,88,78,36,0,113,167,180,0,190,71,193,255,199,158,164,255,58,8,172,0,77,33,12,0,65,63,3,0,153,77,33,255,172,254,102,1,228,221,4,255,87,30,254,1,146,41,86,255,138,204,239,254,108,141,17,255,187,242,135,0,210,208,127,0,68,45,14,254,73,96,62,0,81,60,24,255,170,6,36,255,3,249,26,0,35,213,109,0,22,129,54,255,21,35,225,255,234,61,56,255,58,217,6,0,143,124,88,0,236,126,66,0,209,38,183,255,34,238,6,255,174,145,102,0,95,22,211,0,196,15,153,254,46,84,232,255,117,34,146,1,231,250,74,255,27,134,100,1,92,187,195,255,170,198,112,0,120,28,42,0,209,70,67,0,29,81,31,0,29,168,100,1,169,173,160,0,107,35,117,0,62,96,59,255,81,12,69,1,135,239,190,255,220,252,18,0,163,220,58,255,137,137,188,255,83,102,109,0,96,6,76,0,234,222,210,255,185,174,205,1,60,158,213,255,13,241,214,0,172,129,140,0,93,104,242,0,192,156,251,0,43,117,30,0,225,81,158,0,127,232,218,0,226,28,203,0,233,27,151,255,117,43,5,255,242,14,47,255,33,20,6,0,137,251,44,254,27,31,245,255,183,214,125,254,40,121,149,0,186,158,213,255,89,8,227,0,69,88,0,254,203,135,225,0,201,174,203,0,147,71,184,0,18,121,41,254,94,5,78,0,224,214,240,254,36,5,180,0,251,135,231,1,163,138,212,0,210,249,116,254,88,129,187,0,19,8,49,254,62,14,144,255,159,76,211,0,214,51,82,0,109,117,228,254,103,223,203,255,75,252,15,1,154,71,220,255,23,13,91,1,141,168,96,255,181,182,133,0,250,51,55,0,234,234,212,254,175,63,158,0,39,240,52,1,158,189,36,255,213,40,85,1,32,180,247,255,19,102,26,1,84,24,97,255,69,21,222,0,148,139,122,255,220,213,235,1,232,203,255,0,121,57,147,0,227,7,154,0,53,22,147,1,72,1,225,0,82,134,48,254,83,60,157,255,145,72,169,0,34,103,239,0,198,233,47,0,116,19,4,255,184,106,9,255,183,129,83,0,36,176,230,1,34,103,72,0,219,162,134,0,245,42,158,0,32,149,96,254,165,44,144,0,202,239,72,254,215,150,5,0,42,66,36,1,132,215,175,0,86,174,86,255,26,197,156,255,49,232,135,254,103,182,82,0,253,128,176,1,153,178,122,0,245,250,10,0,236,24,178,0,137,106,132,0,40,29,41,0,50,30,152,255,124,105,38,0,230,191,75,0,143,43,170,0,44,131,20,255,44,13,23,255,237,255,155,1,159,109,100,255,112,181,24,255,104,220,108,0,55,211,131,0,99,12,213,255,152,151,145,255,238,5,159,0,97,155,8,0,33,108,81,0,1,3,103,0,62,109,34,255,250,155,180,0,32,71,195,255,38,70,145,1,159,95,245,0,69,229,101,1,136,28,240,0,79,224,25,0,78,110,121,255,248,168,124,0,187,128,247,0,2,147,235,254,79,11,132,0,70,58,12,1,181,8,163,255,79,137,133,255,37,170,11,255,141,243,85,255,176,231,215,255,204,150,164,255,239,215,39,255,46,87,156,254,8,163,88,255,172,34,232,0,66,44,102,255,27,54,41,254,236,99,87,255,41,123,169,1,52,114,43,0,117,134,40,0,155,134,26,0,231,207,91,254,35,132,38,255,19,102,125,254,36,227,133,255,118,3,113,255,29,13,124,0,152,96,74,1,88,146,206,255,167,191,220,254,162,18,88,255,182,100,23,0,31,117,52,0,81,46,106,1,12,2,7,0,69,80,201,1,209,246,172,0,12,48,141,1,224,211,88,0,116,226,159,0,122,98,130,0,65,236,234,1,225,226,9,255,207,226,123,1,89,214,59,0,112,135,88,1,90,244,203,255,49,11,38,1,129,108,186,0,89,112,15,1,101,46,204,255,127,204,45,254,79,255,221,255,51,73,18,255,127,42,101,255,241,21,202,0,160,227,7,0,105,50,236,0,79,52,197,255,104,202,208,1,180,15,16,0,101,197,78,255,98,77,203,0,41,185,241,1,35,193,124,0,35,155,23,255,207,53,192,0,11,125,163,1,249,158,185,255,4,131,48,0,21,93,111,255,61,121,231,1,69,200,36,255,185,48,185,255,111,238,21,255,39,50,25,255,99,215,163,255,87,212,30,255,164,147,5,255,128,6,35,1,108,223,110,255,194,76,178,0,74,101,180,0,243,47,48,0,174,25,43,255,82,173,253,1,54,114,192,255,40,55,91,0,215,108,176,255,11,56,7,0,224,233,76,0,209,98,202,254,242,25,125,0,44,193,93,254,203,8,177,0,135,176,19,0,112,71,213,255,206,59,176,1,4,67,26,0,14,143,213,254,42,55,208,255,60,67,120,0,193,21,163,0,99,164,115,0,10,20,118,0,156,212,222,254,160,7,217,255,114,245,76,1,117,59,123,0,176,194,86,254,213,15,176,0,78,206,207,254,213,129,59,0,233,251,22,1,96,55,152,255,236,255,15,255,197,89,84,255,93,149,133,0,174,160,113,0,234,99,169,255,152,116,88,0,144,164,83,255,95,29,198,255,34,47,15,255,99,120,134,255,5,236,193,0,249,247,126,255,147,187,30,0,50,230,117,255,108,217,219,255,163,81,166,255,72,25,169,254,155,121,79,255,28,155,89,254,7,126,17,0,147,65,33,1,47,234,253,0,26,51,18,0,105,83,199,255,163,196,230,0,113,248,164,0,226,254,218,0,189,209,203,255,164,247,222,254,255,35,165,0,4,188,243,1,127,179,71,0,37,237,254,255,100,186,240,0,5,57,71,254,103,72,73,255,244,18,81,254,229,210,132,255,238,6,180,255,11,229,174,255,227,221,192,1,17,49,28,0,163,215,196,254,9,118,4,255,51,240,71,0,113,129,109,255,76,240,231,0,188,177,127,0,125,71,44,1,26,175,243,0,94,169,25,254,27,230,29,0,15,139,119,1,168,170,186,255,172,197,76,255,252,75,188,0,137,124,196,0,72,22,96,255,45,151,249,1,220,145,100,0,64,192,159,255,120,239,226,0,129,178,146,0,0,192,125,0,235,138,234,0,183,157,146,0,83,199,192,255,184,172,72,255,73,225,128,0,77,6,250,255,186,65,67,0,104,246,207,0,188,32,138,255,218,24,242,0,67,138,81,254,237,129,121,255,20,207,150,1,41,199,16,255,6,20,128,0,159,118,5,0,181,16,143,255,220,38,15,0,23,64,147,254,73,26,13,0,87,228,57,1,204,124,128,0,43,24,223,0,219,99,199,0,22,75,20,255,19,27,126,0,157,62,215,0,110,29,230,0,179,167,255,1,54,252,190,0,221,204,182,254,179,158,65,255,81,157,3,0,194,218,159,0,170,223,0,0,224,11,32,255,38,197,98,0,168,164,37,0,23,88,7,1,164,186,110,0,96,36,134,0,234,242,229,0,250,121,19,0,242,254,112,255,3,47,94,1,9,239,6,255,81,134,153,254,214,253,168,255,67,124,224,0,245,95,74,0,28,30,44,254,1,109,220,255,178,89,89,0,252,36,76,0,24,198,46,255,76,77,111,0,134,234,136,255,39,94,29,0,185,72,234,255,70,68,135,255,231,102,7,254,77,231,140,0,167,47,58,1,148,97,118,255,16,27,225,1,166,206,143,255,110,178,214,255,180,131,162,0,143,141,225,1,13,218,78,255,114,153,33,1,98,104,204,0,175,114,117,1,167,206,75,0,202,196,83,1,58,64,67,0,138,47,111,1,196,247,128,255,137,224,224,254,158,112,207,0,154,100,255,1,134,37,107,0,198,128,79,255,127,209,155,255,163,254,185,254,60,14,243,0,31,219,112,254,29,217,65,0,200,13,116,254,123,60,196,255,224,59,184,254,242,89,196,0,123,16,75,254,149,16,206,0,69,254,48,1,231,116,223,255,209,160,65,1,200,80,98,0,37,194,184,254,148,63,34,0,139,240,65,255,217,144,132,255,56,38,45,254,199,120,210,0,108,177,166,255,160,222,4,0,220,126,119,254,165,107,160,255,82,220,248,1,241,175,136,0,144,141,23,255,169,138,84,0,160,137,78,255,226,118,80,255,52,27,132,255,63,96,139,255,152,250,39,0,188,155,15,0,232,51,150,254,40,15,232,255,240,229,9,255,137,175,27,255,75,73,97,1,218,212,11,0,135,5,162,1,107,185,213,0,2,249,107,255,40,242,70,0,219,200,25,0,25,157,13,0,67,82,80,255,196,249,23,255,145,20,149,0,50,72,146,0,94,76,148,1,24,251,65,0,31,192,23,0,184,212,201,255,123,233,162,1,247,173,72,0,162,87,219,254,126,134,89,0,159,11,12,254,166,105,29,0,73,27,228,1,113,120,183,255,66,163,109,1,212,143,11,255,159,231,168,1,255,128,90,0,57,14,58,254,89,52,10,255,253,8,163,1,0,145,210,255,10,129,85,1,46,181,27,0,103,136,160,254,126,188,209,255,34,35,111,0,215,219,24,255,212,11,214,254,101,5,118,0,232,197,133,255,223,167,109,255,237,80,86,255,70,139,94,0,158,193,191,1,155,15,51,255,15,190,115,0,78,135,207,255,249,10,27,1,181,125,233,0,95,172,13,254,170,213,161,255,39,236,138,255,95,93,87,255,190,128,95,0,125,15,206,0,166,150,159,0,227,15,158,255,206,158,120,255,42,141,128,0,101,178,120,1,156,109,131,0,218,14,44,254,247,168,206,255,212,112,28,0,112,17,228,255,90,16,37,1,197,222,108,0,254,207,83,255,9,90,243,255,243,244,172,0,26,88,115,255,205,116,122,0,191,230,193,0,180,100,11,1,217,37,96,255,154,78,156,0,235,234,31,255,206,178,178,255,149,192,251,0,182,250,135,0,246,22,105,0,124,193,109,255,2,210,149,255,169,17,170,0,0,96,110,255,117,9,8,1,50,123,40,255,193,189,99,0,34,227,160,0,48,80,70,254,211,51,236,0,45,122,245,254,44,174,8,0,173,37,233,255,158,65,171,0,122,69,215,255,90,80,2,255,131,106,96,254,227,114,135,0,205,49,119,254,176,62,64,255,82,51,17,255,241,20,243,255,130,13,8,254,128,217,243,255,162,27,1,254,90,118,241,0,246,198,246,255,55,16,118,255,200,159,157,0,163,17,1,0,140,107,121,0,85,161,118,255,38,0,149,0,156,47,238,0,9,166,166,1,75,98,181,255,50,74,25,0,66,15,47,0,139,225,159,0,76,3,142,255,14,238,184,0,11,207,53,255,183,192,186,1,171,32,174,255,191,76,221,1,247,170,219,0,25,172,50,254,217,9,233,0,203,126,68,255,183,92,48,0,127,167,183,1,65,49,254,0,16,63,127,1,254,21,170,255,59,224,127,254,22,48,63,255,27,78,130,254,40,195,29,0,250,132,112,254,35,203,144,0,104,169,168,0,207,253,30,255,104,40,38,254,94,228,88,0,206,16,128,255,212,55,122,255,223,22,234,0,223,197,127,0,253,181,181,1,145,102,118,0,236,153,36,255,212,217,72,255,20,38,24,254,138,62,62,0,152,140,4,0,230,220,99,255,1,21,212,255,148,201,231,0,244,123,9,254,0,171,210,0,51,58,37,255,1,255,14,255,244,183,145,254,0,242,166,0,22,74,132,0,121,216,41,0,95,195,114,254,133,24,151,255,156,226,231,255,247,5,77,255,246,148,115,254,225,92,81,255,222,80,246,254,170,123,89,255,74,199,141,0,29,20,8,255,138,136,70,255,93,75,92,0,221,147,49,254,52,126,226,0,229,124,23,0,46,9,181,0,205,64,52,1,131,254,28,0,151,158,212,0,131,64,78,0,206,25,171,0,0,230,139,0,191,253,110,254,103,247,167,0,64,40,40,1,42,165,241,255,59,75,228,254,124,243,189,255,196,92,178,255,130,140,86,255,141,89,56,1,147,198,5,255,203,248,158,254,144,162,141,0,11,172,226,0,130,42,21,255,1,167,143,255,144,36,36,255,48,88,164,254,168,170,220,0,98,71,214,0,91,208,79,0,159,76,201,1,166,42,214,255,69,255,0,255,6,128,125,255,190,1,140,0,146,83,218,255,215,238,72,1,122,127,53,0,189,116,165,255,84,8,66,255,214,3,208,255,213,110,133,0,195,168,44,1,158,231,69,0,162,64,200,254,91,58,104,0,182,58,187,254,249,228,136,0,203,134,76,254,99,221,233,0,75,254,214,254,80,69,154,0,64,152,248,254,236,136,202,255,157,105,153,254,149,175,20,0,22,35,19,255,124,121,233,0,186,250,198,254,132,229,139,0,137,80,174,255,165,125,68,0,144,202,148,254,235,239,248,0,135,184,118,0,101,94,17,255,122,72,70,254,69,130,146,0,127,222,248,1,69,127,118,255,30,82,215,254,188,74,19,255,229,167,194,254,117,25,66,255,65,234,56,254,213,22,156,0,151,59,93,254,45,28,27,255,186,126,164,255,32,6,239,0,127,114,99,1,219,52,2,255,99,96,166,254,62,190,126,255,108,222,168,1,75,226,174,0,230,226,199,0,60,117,218,255,252,248,20,1,214,188,204,0,31,194,134,254,123,69,192,255,169,173,36,254,55,98,91,0,223,42,102,254,137,1,102,0,157,90,25,0,239,122,64,255,252,6,233,0,7,54,20,255,82,116,174,0,135,37,54,255,15,186,125,0,227,112,175,255,100,180,225,255,42,237,244,255,244,173,226,254,248,18,33,0,171,99,150,255,74,235,50,255,117,82,32,254,106,168,237,0,207,109,208,1,228,9,186,0,135,60,169,254,179,92,143,0,244,170,104,255,235,45,124,255,70,99,186,0,117,137,183,0,224,31,215,0,40,9,100,0,26,16,95,1,68,217,87,0,8,151,20,255,26,100,58,255,176,165,203,1,52,118,70,0,7,32,254,254,244,254,245,255,167,144,194,255,125,113,23,255,176,121,181,0,136,84,209,0,138,6,30,255,89,48,28,0,33,155,14,255,25,240,154,0,141,205,109,1,70,115,62,255,20,40,107,254,138,154,199,255,94,223,226,255,157,171,38,0,163,177,25,254,45,118,3,255,14,222,23,1,209,190,81,255,118,123,232,1,13,213,101,255,123,55,123,254,27,246,165,0,50,99,76,255,140,214,32,255,97,65,67,255,24,12,28,0,174,86,78,1,64,247,96,0,160,135,67,0,66,55,243,255,147,204,96,255,26,6,33,255,98,51,83,1,153,213,208,255,2,184,54,255,25,218,11,0,49,67,246,254,18,149,72,255,13,25,72,0,42,79,214,0,42,4,38,1,27,139,144,255,149,187,23,0,18,164,132,0,245,84,184,254,120,198,104,255,126,218,96,0,56,117,234,255,13,29,214,254,68,47,10,255,167,154,132,254,152,38,198,0,66,178,89,255,200,46,171,255,13,99,83,255,210,187,253,255,170,45,42,1,138,209,124,0,214,162,141,0,12,230,156,0,102,36,112,254,3,147,67,0,52,215,123,255,233,171,54,255,98,137,62,0,247,218,39,255,231,218,236,0,247,191,127,0,195,146,84,0,165,176,92,255,19,212,94,255,17,74,227,0,88,40,153,1,198,147,1,255,206,67,245,254,240,3,218,255,61,141,213,255,97,183,106,0,195,232,235,254,95,86,154,0,209,48,205,254,118,209,241,255,240,120,223,1,213,29,159,0,163,127,147,255,13,218,93,0,85,24,68,254,70,20,80,255,189,5,140,1,82,97,254,255,99,99,191,255,132,84,133,255,107,218,116,255,112,122,46,0,105,17,32,0,194,160,63,255,68,222,39,1,216,253,92,0,177,105,205,255,149,201,195,0,42,225,11,255,40,162,115,0,9,7,81,0,165,218,219,0,180,22,0,254,29,146,252,255,146,207,225,1,180,135,96,0,31,163,112,0,177,11,219,255,133,12,193,254,43,78,50,0,65,113,121,1,59,217,6,255,110,94,24,1,112,172,111,0,7,15,96,0,36,85,123,0,71,150,21,255,208,73,188,0,192,11,167,1,213,245,34,0,9,230,92,0,162,142,39,255,215,90,27,0,98,97,89,0,94,79,211,0,90,157,240,0,95,220,126,1,102,176,226,0,36,30,224,254,35,31,127,0,231,232,115,1,85,83,130,0,210,73,245,255,47,143,114,255,68,65,197,0,59,72,62,255,183,133,173,254,93,121,118,255,59,177,81,255,234,69,173,255,205,128,177,0,220,244,51,0,26,244,209,1,73,222,77,255,163,8,96,254,150,149,211,0,158,254,203,1,54,127,139,0,161,224,59,0,4,109,22,255,222,42,45,255,208,146,102,255,236,142,187,0,50,205,245,255,10,74,89,254,48,79,142,0,222,76,130,255,30,166,63,0,236,12,13,255,49,184,244,0,187,113,102,0,218,101,253,0,153,57,182,254,32,150,42,0,25,198,146,1,237,241,56,0,140,68,5,0,91,164,172,255,78,145,186,254,67,52,205,0,219,207,129,1,109,115,17,0,54,143,58,1,21,248,120,255,179,255,30,0,193,236,66,255,1,255,7,255,253,192,48,255,19,69,217,1,3,214,0,255,64,101,146,1,223,125,35,255,235,73,179,255,249,167,226,0,225,175,10,1,97,162,58,0,106,112,171,1,84,172,5,255,133,140,178,255,134,245,142,0,97,90,125,255,186,203,185,255,223,77,23,255,192,92,106,0,15,198,115,255,217,152,248,0,171,178,120,255,228,134,53,0,176,54,193,1,250,251,53,0,213,10,100,1,34,199,106,0,151,31,244,254,172,224,87,255,14,237,23,255,253,85,26,255,127,39,116,255,172,104,100,0,251,14,70,255,212,208,138,255,253,211,250,0,176,49,165,0,15,76,123,255,37,218,160,255,92,135,16,1,10,126,114,255,70,5,224,255,247,249,141,0,68,20,60,1,241,210,189,255,195,217,187,1,151,3,113,0,151,92,174,0,231,62,178,255,219,183,225,0,23,23,33,255,205,181,80,0,57,184,248,255,67,180,1,255,90,123,93,255,39,0,162,255,96,248,52,255,84,66,140,0,34,127,228,255,194,138,7,1,166,110,188,0,21,17,155,1,154,190,198,255,214,80,59,255,18,7,143,0,72,29,226,1,199,217,249,0,232,161,71,1,149,190,201,0,217,175,95,254,113,147,67,255,138,143,199,255,127,204,1,0,29,182,83,1,206,230,155,255,186,204,60,0,10,125,85,255,232,96,25,255,255,89,247,255,213,254,175,1,232,193,81,0,28,43,156,254,12,69,8,0,147,24,248,0,18,198,49,0,134,60,35,0,118,246,18,255,49,88,254,254,228,21,186,255,182,65,112,1,219,22,1,255,22,126,52,255,189,53,49,255,112,25,143,0,38,127,55,255,226,101,163,254,208,133,61,255,137,69,174,1,190,118,145,255,60,98,219,255,217,13,245,255,250,136,10,0,84,254,226,0,201,31,125,1,240,51,251,255,31,131,130,255,2,138,50,255,215,215,177,1,223,12,238,255,252,149,56,255,124,91,68,255,72,126,170,254,119,255,100,0,130,135,232,255,14,79,178,0,250,131,197,0,138,198,208,0,121,216,139,254,119,18,36,255,29,193,122,0,16,42,45,255,213,240,235,1,230,190,169,255,198,35,228,254,110,173,72,0,214,221,241,255,56,148,135,0,192,117,78,254,141,93,207,255,143,65,149,0,21,18,98,255,95,44,244,1,106,191,77,0,254,85,8,254,214,110,176,255,73,173,19,254,160,196,199,255,237,90,144,0,193,172,113,255,200,155,136,254,228,90,221,0,137,49,74,1,164,221,215,255,209,189,5,255,105,236,55,255,42,31,129,1,193,255,236,0,46,217,60,0,138,88,187,255,226,82,236,255,81,69,151,255,142,190,16,1,13,134,8,0,127,122,48,255,81,64,156,0,171,243,139,0,237,35,246,0,122,143,193,254,212,122,146,0,95,41,255,1,87,132,77,0,4,212,31,0,17,31,78,0,39,45,173,254,24,142,217,255,95,9,6,255,227,83,6,0,98,59,130,254,62,30,33,0,8,115,211,1,162,97,128,255,7,184,23,254,116,28,168,255,248,138,151,255,98,244,240,0,186,118,130,0,114,248,235,255,105,173,200,1,160,124,71,255,94,36,164,1,175,65,146,255,238,241,170,254,202,198,197,0,228,71,138,254,45,246,109,255,194,52,158,0,133,187,176,0,83,252,154,254,89,189,221,255,170,73,252,0,148,58,125,0,36,68,51,254,42,69,177,255,168,76,86,255,38,100,204,255,38,53,35,0,175,19,97,0,225,238,253,255,81,81,135,0,210,27,255,254,235,73,107,0,8,207,115,0,82,127,136,0,84,99,21,254,207,19,136,0,100,164,101,0,80,208,77,255,132,207,237,255,15,3,15,255,33,166,110,0,156,95,85,255,37,185,111,1,150,106,35,255,166,151,76,0,114,87,135,255,159,194,64,0,12,122,31,255,232,7,101,254,173,119,98,0,154,71,220,254,191,57,53,255,168,232,160,255,224,32,99,255,218,156,165,0,151,153,163,0,217,13,148,1,197,113,89,0,149,28,161,254,207,23,30,0,105,132,227,255,54,230,94,255,133,173,204,255,92,183,157,255,88,144,252,254,102,33,90,0,159,97,3,0,181,218,155,255,240,114,119,0,106,214,53,255,165,190,115,1,152,91,225,255,88,106,44,255,208,61,113,0,151,52,124,0,191,27,156,255,110,54,236,1,14,30,166,255,39,127,207,1,229,199,28,0,188,228,188,254,100,157,235,0,246,218,183,1,107,22,193,255,206,160,95,0,76,239,147,0,207,161,117,0,51,166,2,255,52,117,10,254,73,56,227,255,152,193,225,0,132,94,136,255,101,191,209,0,32,107,229,255,198,43,180,1,100,210,118,0,114,67,153,255,23,88,26,255,89,154,92,1,220,120,140,255,144,114,207,255,252,115,250,255,34,206,72,0,138,133,127,255,8,178,124,1,87,75,97,0,15,229,92,254,240,67,131,255,118,123,227,254,146,120,104,255,145,213,255,1,129,187,70,255,219,119,54,0,1,19,173,0,45,150,148,1,248,83,72,0,203,233,169,1,142,107,56,0,247,249,38,1,45,242,80,255,30,233,103,0,96,82,70,0,23,201,111,0,81,39,30,255,161,183,78,255,194,234,33,255,68,227,140,254,216,206,116,0,70,27,235,255,104,144,79,0,164,230,93,254,214,135,156,0,154,187,242,254,188,20,131,255,36,109,174,0,159,112,241,0,5,110,149,1,36,165,218,0,166,29,19,1,178,46,73,0,93,43,32,254,248,189,237,0,102,155,141,0,201,93,195,255,241,139,253,255,15,111,98,255,108,65,163,254,155,79,190,255,73,174,193,254,246,40,48,255,107,88,11,254,202,97,85,255,253,204,18,255,113,242,66,0,110,160,194,254,208,18,186,0,81,21,60,0,188,104,167,255,124,166,97,254,210,133,142,0,56,242,137,254,41,111,130,0,111,151,58,1,111,213,141,255,183,172,241,255,38,6,196,255,185,7,123,255,46,11,246,0,245,105,119,1,15,2,161,255,8,206,45,255,18,202,74,255,83,124,115,1,212,141,157,0,83,8,209,254,139,15,232,255,172,54,173,254,50,247,132,0,214,189,213,0,144,184,105,0,223,254,248,0,255,147,240,255,23,188,72,0,7,51,54,0,188,25,180,254,220,180,0,255,83,160,20,0,163,189,243,255,58,209,194,255,87,73,60,0,106,24,49,0,245,249,220,0,22,173,167,0,118,11,195,255,19,126,237,0,110,159,37,255,59,82,47,0,180,187,86,0,188,148,208,1,100,37,133,255,7,112,193,0,129,188,156,255,84,106,129,255,133,225,202,0,14,236,111,255,40,20,101,0,172,172,49,254,51,54,74,255,251,185,184,255,93,155,224,255,180,249,224,1,230,178,146,0,72,57,54,254,178,62,184,0,119,205,72,0,185,239,253,255,61,15,218,0,196,67,56,255,234,32,171,1,46,219,228,0,208,108,234,255,20,63,232,255,165,53,199,1,133,228,5,255,52,205,107,0,74,238,140,255,150,156,219,254,239,172,178,255,251,189,223,254,32,142,211,255,218,15,138,1,241,196,80,0,28,36,98,254,22,234,199,0,61,237,220,255,246,57,37,0,142,17,142,255,157,62,26,0,43,238,95,254,3,217,6,255,213,25,240,1,39,220,174,255,154,205,48,254,19,13,192,255,244,34,54,254,140,16,155,0,240,181,5,254,155,193,60,0,166,128,4,255,36,145,56,255,150,240,219,0,120,51,145,0,82,153,42,1,140,236,146,0,107,92,248,1,189,10,3,0,63,136,242,0,211,39,24,0,19,202,161,1,173,27,186,255,210,204,239,254,41,209,162,255,182,254,159,255,172,116,52,0,195,103,222,254,205,69,59,0,53,22,41,1,218,48,194,0,80,210,242,0,210,188,207,0,187,161,161,254,216,17,1,0,136,225,113,0,250,184,63,0,223,30,98,254,77,168,162,0,59,53,175,0,19,201,10,255,139,224,194,0,147,193,154,255,212,189,12,254,1,200,174,255,50,133,113,1,94,179,90,0,173,182,135,0,94,177,113,0,43,89,215,255,136,252,106,255,123,134,83,254,5,245,66,255,82,49,39,1,220,2,224,0,97,129,177,0,77,59,89,0,61,29,155,1,203,171,220,255,92,78,139,0,145,33,181,255,169,24,141,1,55,150,179,0,139,60,80,255,218,39,97,0,2,147,107,255,60,248,72,0,173,230,47,1,6,83,182,255,16,105,162,254,137,212,81,255,180,184,134,1,39,222,164,255,221,105,251,1,239,112,125,0,63,7,97,0,63,104,227,255,148,58,12,0,90,60,224,255,84,212,252,0,79,215,168,0,248,221,199,1,115,121,1,0,36,172,120,0,32,162,187,255,57,107,49,255,147,42,21,0,106,198,43,1,57,74,87,0,126,203,81,255,129,135,195,0,140,31,177,0,221,139,194,0,3,222,215,0,131,68,231,0,177,86,178,254,124,151,180,0,184,124,38,1,70,163,17,0,249,251,181,1,42,55,227,0,226,161,44,0,23,236,110,0,51,149,142,1,93,5,236,0,218,183,106,254,67,24,77,0,40,245,209,255,222,121,153,0,165,57,30,0,83,125,60,0,70,38,82,1,229,6,188,0,109,222,157,255,55,118,63,255,205,151,186,0,227,33,149,255,254,176,246,1,227,177,227,0,34,106,163,254,176,43,79,0,106,95,78,1,185,241,122,255,185,14,61,0,36,1,202,0,13,178,162,255,247,11,132,0,161,230,92,1,65,1,185,255,212,50,165,1,141,146,64,255,158,242,218,0,21,164,125,0,213,139,122,1,67,71,87,0,203,158,178,1,151,92,43,0,152,111,5,255,39,3,239,255,217,255,250,255,176,63,71,255,74,245,77,1,250,174,18,255,34,49,227,255,246,46,251,255,154,35,48,1,125,157,61,255,106,36,78,255,97,236,153,0,136,187,120,255,113,134,171,255,19,213,217,254,216,94,209,255,252,5,61,0,94,3,202,0,3,26,183,255,64,191,43,255,30,23,21,0,129,141,77,255,102,120,7,1,194,76,140,0,188,175,52,255,17,81,148,0,232,86,55,1,225,48,172,0,134,42,42,255,238,50,47,0,169,18,254,0,20,147,87,255,14,195,239,255,69,247,23,0,238,229,128,255,177,49,112,0,168,98,251,255,121,71,248,0,243,8,145,254,246,227,153,255,219,169,177,254,251,139,165,255,12,163,185,255,164,40,171,255,153,159,27,254,243,109,91,255,222,24,112,1,18,214,231,0,107,157,181,254,195,147,0,255,194,99,104,255,89,140,190,255,177,66,126,254,106,185,66,0,49,218,31,0,252,174,158,0,188,79,230,1,238,41,224,0,212,234,8,1,136,11,181,0,166,117,83,255,68,195,94,0,46,132,201,0,240,152,88,0,164,57,69,254,160,224,42,255],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE);allocate([59,215,67,255,119,195,141,255,36,180,121,254,207,47,8,255,174,210,223,0,101,197,68,255,255,82,141,1,250,137,233,0,97,86,133,1,16,80,69,0,132,131,159,0,116,93,100,0,45,141,139,0,152,172,157,255,90,43,91,0,71,153,46,0,39,16,112,255,217,136,97,255,220,198,25,254,177,53,49,0,222,88,134,255,128,15,60,0,207,192,169,255,192,116,209,255,106,78,211,1,200,213,183,255,7,12,122,254,222,203,60,255,33,110,199,254,251,106,117,0,228,225,4,1,120,58,7,255,221,193,84,254,112,133,27,0,189,200,201,255,139,135,150,0,234,55,176,255,61,50,65,0,152,108,169,255,220,85,1,255,112,135,227,0,162,26,186,0,207,96,185,254,244,136,107,0,93,153,50,1,198,97,151,0,110,11,86,255,143,117,174,255,115,212,200,0,5,202,183,0,237,164,10,254,185,239,62,0,236,120,18,254,98,123,99,255,168,201,194,254,46,234,214,0,191,133,49,255,99,169,119,0,190,187,35,1,115,21,45,255,249,131,72,0,112,6,123,255,214,49,181,254,166,233,34,0,92,197,102,254,253,228,205,255,3,59,201,1,42,98,46,0,219,37,35,255,169,195,38,0,94,124,193,1,156,43,223,0,95,72,133,254,120,206,191,0,122,197,239,255,177,187,79,255,254,46,2,1,250,167,190,0,84,129,19,0,203,113,166,255,249,31,189,254,72,157,202,255,208,71,73,255,207,24,72,0,10,16,18,1,210,81,76,255,88,208,192,255,126,243,107,255,238,141,120,255,199,121,234,255,137,12,59,255,36,220,123,255,148,179,60,254,240,12,29,0,66,0,97,1,36,30,38,255,115,1,93,255,96,103,231,255,197,158,59,1,192,164,240,0,202,202,57,255,24,174,48,0,89,77,155,1,42,76,215,0,244,151,233,0,23,48,81,0,239,127,52,254,227,130,37,255,248,116,93,1,124,132,118,0,173,254,192,1,6,235,83,255,110,175,231,1,251,28,182,0,129,249,93,254,84,184,128,0,76,181,62,0,175,128,186,0,100,53,136,254,109,29,226,0,221,233,58,1,20,99,74,0,0,22,160,0,134,13,21,0,9,52,55,255,17,89,140,0,175,34,59,0,84,165,119,255,224,226,234,255,7,72,166,255,123,115,255,1,18,214,246,0,250,7,71,1,217,220,185,0,212,35,76,255,38,125,175,0,189,97,210,0,114,238,44,255,41,188,169,254,45,186,154,0,81,92,22,0,132,160,193,0,121,208,98,255,13,81,44,255,203,156,82,0,71,58,21,255,208,114,191,254,50,38,147,0,154,216,195,0,101,25,18,0,60,250,215,255,233,132,235,255,103,175,142,1,16,14,92,0,141,31,110,254,238,241,45,255,153,217,239,1,97,168,47,255,249,85,16,1,28,175,62,255,57,254,54,0,222,231,126,0,166,45,117,254,18,189,96,255,228,76,50,0,200,244,94,0,198,152,120,1,68,34,69,255,12,65,160,254,101,19,90,0,167,197,120,255,68,54,185,255,41,218,188,0,113,168,48,0,88,105,189,1,26,82,32,255,185,93,164,1,228,240,237,255,66,182,53,0,171,197,92,255,107,9,233,1,199,120,144,255,78,49,10,255,109,170,105,255,90,4,31,255,28,244,113,255,74,58,11,0,62,220,246,255,121,154,200,254,144,210,178,255,126,57,129,1,43,250,14,255,101,111,28,1,47,86,241,255,61,70,150,255,53,73,5,255,30,26,158,0,209,26,86,0,138,237,74,0,164,95,188,0,142,60,29,254,162,116,248,255,187,175,160,0,151,18,16,0,209,111,65,254,203,134,39,255,88,108,49,255,131,26,71,255,221,27,215,254,104,105,93,255,31,236,31,254,135,0,211,255,143,127,110,1,212,73,229,0,233,67,167,254,195,1,208,255,132,17,221,255,51,217,90,0,67,235,50,255,223,210,143,0,179,53,130,1,233,106,198,0,217,173,220,255,112,229,24,255,175,154,93,254,71,203,246,255,48,66,133,255,3,136,230,255,23,221,113,254,235,111,213,0,170,120,95,254,251,221,2,0,45,130,158,254,105,94,217,255,242,52,180,254,213,68,45,255,104,38,28,0,244,158,76,0,161,200,96,255,207,53,13,255,187,67,148,0,170,54,248,0,119,162,178,255,83,20,11,0,42,42,192,1,146,159,163,255,183,232,111,0,77,229,21,255,71,53,143,0,27,76,34,0,246,136,47,255,219,39,182,255,92,224,201,1,19,142,14,255,69,182,241,255,163,118,245,0,9,109,106,1,170,181,247,255,78,47,238,255,84,210,176,255,213,107,139,0,39,38,11,0,72,21,150,0,72,130,69,0,205,77,155,254,142,133,21,0,71,111,172,254,226,42,59,255,179,0,215,1,33,128,241,0,234,252,13,1,184,79,8,0,110,30,73,255,246,141,189,0,170,207,218,1,74,154,69,255,138,246,49,255,155,32,100,0,125,74,105,255,90,85,61,255,35,229,177,255,62,125,193,255,153,86,188,1,73,120,212,0,209,123,246,254,135,209,38,255,151,58,44,1,92,69,214,255,14,12,88,255,252,153,166,255,253,207,112,255,60,78,83,255,227,124,110,0,180,96,252,255,53,117,33,254,164,220,82,255,41,1,27,255,38,164,166,255,164,99,169,254,61,144,70,255,192,166,18,0,107,250,66,0,197,65,50,0,1,179,18,255,255,104,1,255,43,153,35,255,80,111,168,0,110,175,168,0,41,105,45,255,219,14,205,255,164,233,140,254,43,1,118,0,233,67,195,0,178,82,159,255,138,87,122,255,212,238,90,255,144,35,124,254,25,140,164,0,251,215,44,254,133,70,107,255,101,227,80,254,92,169,55,0,215,42,49,0,114,180,85,255,33,232,27,1,172,213,25,0,62,176,123,254,32,133,24,255,225,191,62,0,93,70,153,0,181,42,104,1,22,191,224,255,200,200,140,255,249,234,37,0,149,57,141,0,195,56,208,255,254,130,70,255,32,173,240,255,29,220,199,0,110,100,115,255,132,229,249,0,228,233,223,255,37,216,209,254,178,177,209,255,183,45,165,254,224,97,114,0,137,97,168,255,225,222,172,0,165,13,49,1,210,235,204,255,252,4,28,254,70,160,151,0,232,190,52,254,83,248,93,255,62,215,77,1,175,175,179,255,160,50,66,0,121,48,208,0,63,169,209,255,0,210,200,0,224,187,44,1,73,162,82,0,9,176,143,255,19,76,193,255,29,59,167,1,24,43,154,0,28,190,190,0,141,188,129,0,232,235,203,255,234,0,109,255,54,65,159,0,60,88,232,255,121,253,150,254,252,233,131,255,198,110,41,1,83,77,71,255,200,22,59,254,106,253,242,255,21,12,207,255,237,66,189,0,90,198,202,1,225,172,127,0,53,22,202,0,56,230,132,0,1,86,183,0,109,190,42,0,243,68,174,1,109,228,154,0,200,177,122,1,35,160,183,255,177,48,85,255,90,218,169,255,248,152,78,0,202,254,110,0,6,52,43,0,142,98,65,255,63,145,22,0,70,106,93,0,232,138,107,1,110,179,61,255,211,129,218,1,242,209,92,0,35,90,217,1,182,143,106,255,116,101,217,255,114,250,221,255,173,204,6,0,60,150,163,0,73,172,44,255,239,110,80,255,237,76,153,254,161,140,249,0,149,232,229,0,133,31,40,255,174,164,119,0,113,51,214,0,129,228,2,254,64,34,243,0,107,227,244,255,174,106,200,255,84,153,70,1,50,35,16,0,250,74,216,254,236,189,66,255,153,249,13,0,230,178,4,255,221,41,238,0,118,227,121,255,94,87,140,254,254,119,92,0,73,239,246,254,117,87,128,0,19,211,145,255,177,46,252,0,229,91,246,1,69,128,247,255,202,77,54,1,8,11,9,255,153,96,166,0,217,214,173,255,134,192,2,1,0,207,0,0,189,174,107,1,140,134,100,0,158,193,243,1,182,102,171,0,235,154,51,0,142,5,123,255,60,168,89,1,217,14,92,255,19,214,5,1,211,167,254,0,44,6,202,254,120,18,236,255,15,113,184,255,184,223,139,0,40,177,119,254,182,123,90,255,176,165,176,0,247,77,194,0,27,234,120,0,231,0,214,255,59,39,30,0,125,99,145,255,150,68,68,1,141,222,248,0,153,123,210,255,110,127,152,255,229,33,214,1,135,221,197,0,137,97,2,0,12,143,204,255,81,41,188,0,115,79,130,255,94,3,132,0,152,175,187,255,124,141,10,255,126,192,179,255,11,103,198,0,149,6,45,0,219,85,187,1,230,18,178,255,72,182,152,0,3,198,184,255,128,112,224,1,97,161,230,0,254,99,38,255,58,159,197,0,151,66,219,0,59,69,143,255,185,112,249,0,119,136,47,255,123,130,132,0,168,71,95,255,113,176,40,1,232,185,173,0,207,93,117,1,68,157,108,255,102,5,147,254,49,97,33,0,89,65,111,254,247,30,163,255,124,217,221,1,102,250,216,0,198,174,75,254,57,55,18,0,227,5,236,1,229,213,173,0,201,109,218,1,49,233,239,0,30,55,158,1,25,178,106,0,155,111,188,1,94,126,140,0,215,31,238,1,77,240,16,0,213,242,25,1,38,71,168,0,205,186,93,254,49,211,140,255,219,0,180,255,134,118,165,0,160,147,134,255,110,186,35,255,198,243,42,0,243,146,119,0,134,235,163,1,4,241,135,255,193,46,193,254,103,180,79,255,225,4,184,254,242,118,130,0,146,135,176,1,234,111,30,0,69,66,213,254,41,96,123,0,121,94,42,255,178,191,195,255,46,130,42,0,117,84,8,255,233,49,214,254,238,122,109,0,6,71,89,1,236,211,123,0,244,13,48,254,119,148,14,0,114,28,86,255,75,237,25,255,145,229,16,254,129,100,53,255,134,150,120,254,168,157,50,0,23,72,104,255,224,49,14,0,255,123,22,255,151,185,151,255,170,80,184,1,134,182,20,0,41,100,101,1,153,33,16,0,76,154,111,1,86,206,234,255,192,160,164,254,165,123,93,255,1,216,164,254,67,17,175,255,169,11,59,255,158,41,61,255,73,188,14,255,195,6,137,255,22,147,29,255,20,103,3,255,246,130,227,255,122,40,128,0,226,47,24,254,35,36,32,0,152,186,183,255,69,202,20,0,195,133,195,0,222,51,247,0,169,171,94,1,183,0,160,255,64,205,18,1,156,83,15,255,197,58,249,254,251,89,110,255,50,10,88,254,51,43,216,0,98,242,198,1,245,151,113,0,171,236,194,1,197,31,199,255,229,81,38,1,41,59,20,0,253,104,230,0,152,93,14,255,246,242,146,254,214,169,240,255,240,102,108,254,160,167,236,0,154,218,188,0,150,233,202,255,27,19,250,1,2,71,133,255,175,12,63,1,145,183,198,0,104,120,115,255,130,251,247,0,17,212,167,255,62,123,132,255,247,100,189,0,155,223,152,0,143,197,33,0,155,59,44,255,150,93,240,1,127,3,87,255,95,71,207,1,167,85,1,255,188,152,116,255,10,23,23,0,137,195,93,1,54,98,97,0,240,0,168,255,148,188,127,0,134,107,151,0,76,253,171,0,90,132,192,0,146,22,54,0,224,66,54,254,230,186,229,255,39,182,196,0,148,251,130,255,65,131,108,254,128,1,160,0,169,49,167,254,199,254,148,255,251,6,131,0,187,254,129,255,85,82,62,0,178,23,58,255,254,132,5,0,164,213,39,0,134,252,146,254,37,53,81,255,155,134,82,0,205,167,238,255,94,45,180,255,132,40,161,0,254,111,112,1,54,75,217,0,179,230,221,1,235,94,191,255,23,243,48,1,202,145,203,255,39,118,42,255,117,141,253,0,254,0,222,0,43,251,50,0,54,169,234,1,80,68,208,0,148,203,243,254,145,7,135,0,6,254,0,0,252,185,127,0,98,8,129,255,38,35,72,255,211,36,220,1,40,26,89,0,168,64,197,254,3,222,239,255,2,83,215,254,180,159,105,0,58,115,194,0,186,116,106,255,229,247,219,255,129,118,193,0,202,174,183,1,166,161,72,0,201,107,147,254,237,136,74,0,233,230,106,1,105,111,168,0,64,224,30,1,1,229,3,0,102,151,175,255,194,238,228,255,254,250,212,0,187,237,121,0,67,251,96,1,197,30,11,0,183,95,204,0,205,89,138,0,64,221,37,1,255,223,30,255,178,48,211,255,241,200,90,255,167,209,96,255,57,130,221,0,46,114,200,255,61,184,66,0,55,182,24,254,110,182,33,0,171,190,232,255,114,94,31,0,18,221,8,0,47,231,254,0,255,112,83,0,118,15,215,255,173,25,40,254,192,193,31,255,238,21,146,255,171,193,118,255,101,234,53,254,131,212,112,0,89,192,107,1,8,208,27,0,181,217,15,255,231,149,232,0,140,236,126,0,144,9,199,255,12,79,181,254,147,182,202,255,19,109,182,255,49,212,225,0,74,163,203,0,175,233,148,0,26,112,51,0,193,193,9,255,15,135,249,0,150,227,130,0,204,0,219,1,24,242,205,0,238,208,117,255,22,244,112,0,26,229,34,0,37,80,188,255,38,45,206,254,240,90,225,255,29,3,47,255,42,224,76,0,186,243,167,0,32,132,15,255,5,51,125,0,139,135,24,0,6,241,219,0,172,229,133,255,246,214,50,0,231,11,207,255,191,126,83,1,180,163,170,255,245,56,24,1,178,164,211,255,3,16,202,1,98,57,118,255,141,131,89,254,33,51,24,0,243,149,91,255,253,52,14,0,35,169,67,254,49,30,88,255,179,27,36,255,165,140,183,0,58,189,151,0,88,31,0,0,75,169,66,0,66,101,199,255,24,216,199,1,121,196,26,255,14,79,203,254,240,226,81,255,94,28,10,255,83,193,240,255,204,193,131,255,94,15,86,0,218,40,157,0,51,193,209,0,0,242,177,0,102,185,247,0,158,109,116,0,38,135,91,0,223,175,149,0,220,66,1,255,86,60,232,0,25,96,37,255,225,122,162,1,215,187,168,255,158,157,46,0,56,171,162,0,232,240,101,1,122,22,9,0,51,9,21,255,53,25,238,255,217,30,232,254,125,169,148,0,13,232,102,0,148,9,37,0,165,97,141,1,228,131,41,0,222,15,243,255,254,18,17,0,6,60,237,1,106,3,113,0,59,132,189,0,92,112,30,0,105,208,213,0,48,84,179,255,187,121,231,254,27,216,109,255,162,221,107,254,73,239,195,255,250,31,57,255,149,135,89,255,185,23,115,1,3,163,157,255,18,112,250,0,25,57,187,255,161,96,164,0,47,16,243,0,12,141,251,254,67,234,184,255,41,18,161,0,175,6,96,255,160,172,52,254,24,176,183,255,198,193,85,1,124,121,137,255,151,50,114,255,220,203,60,255,207,239,5,1,0,38,107,255,55,238,94,254,70,152,94,0,213,220,77,1,120,17,69,255,85,164,190,255,203,234,81,0,38,49,37,254,61,144,124,0,137,78,49,254,168,247,48,0,95,164,252,0,105,169,135,0,253,228,134,0,64,166,75,0,81,73,20,255,207,210,10,0,234,106,150,255,94,34,90,255,254,159,57,254,220,133,99,0,139,147,180,254,24,23,185,0,41,57,30,255,189,97,76,0,65,187,223,255,224,172,37,255,34,62,95,1,231,144,240,0,77,106,126,254,64,152,91,0,29,98,155,0,226,251,53,255,234,211,5,255,144,203,222,255,164,176,221,254,5,231,24,0,179,122,205,0,36,1,134,255,125,70,151,254,97,228,252,0,172,129,23,254,48,90,209,255,150,224,82,1,84,134,30,0,241,196,46,0,103,113,234,255,46,101,121,254,40,124,250,255,135,45,242,254,9,249,168,255,140,108,131,255,143,163,171,0,50,173,199,255,88,222,142,255,200,95,158,0,142,192,163,255,7,117,135,0,111,124,22,0,236,12,65,254,68,38,65,255,227,174,254,0,244,245,38,0,240,50,208,255,161,63,250,0,60,209,239,0,122,35,19,0,14,33,230,254,2,159,113,0,106,20,127,255,228,205,96,0,137,210,174,254,180,212,144,255,89,98,154,1,34,88,139,0,167,162,112,1,65,110,197,0,241,37,169,0,66,56,131,255,10,201,83,254,133,253,187,255,177,112,45,254,196,251,0,0,196,250,151,255,238,232,214,255,150,209,205,0,28,240,118,0,71,76,83,1,236,99,91,0,42,250,131,1,96,18,64,255,118,222,35,0,113,214,203,255,122,119,184,255,66,19,36,0,204,64,249,0,146,89,139,0,134,62,135,1,104,233,101,0,188,84,26,0,49,249,129,0,208,214,75,255,207,130,77,255,115,175,235,0,171,2,137,255,175,145,186,1,55,245,135,255,154,86,181,1,100,58,246,255,109,199,60,255,82,204,134,255,215,49,230,1,140,229,192,255,222,193,251,255,81,136,15,255,179,149,162,255,23,39,29,255,7,95,75,254,191,81,222,0,241,81,90,255,107,49,201,255,244,211,157,0,222,140,149,255,65,219,56,254,189,246,90,255,178,59,157,1,48,219,52,0,98,34,215,0,28,17,187,255,175,169,24,0,92,79,161,255,236,200,194,1,147,143,234,0,229,225,7,1,197,168,14,0,235,51,53,1,253,120,174,0,197,6,168,255,202,117,171,0,163,21,206,0,114,85,90,255,15,41,10,255,194,19,99,0,65,55,216,254,162,146,116,0,50,206,212,255,64,146,29,255,158,158,131,1,100,165,130,255,172,23,129,255,125,53,9,255,15,193,18,1,26,49,11,255,181,174,201,1,135,201,14,255,100,19,149,0,219,98,79,0,42,99,143,254,96,0,48,255,197,249,83,254,104,149,79,255,235,110,136,254,82,128,44,255,65,41,36,254,88,211,10,0,187,121,187,0,98,134,199,0,171,188,179,254,210,11,238,255,66,123,130,254,52,234,61,0,48,113,23,254,6,86,120,255,119,178,245,0,87,129,201,0,242,141,209,0,202,114,85,0,148,22,161,0,103,195,48,0,25,49,171,255,138,67,130,0,182,73,122,254,148,24,130,0,211,229,154,0,32,155,158,0,84,105,61,0,177,194,9,255,166,89,86,1,54,83,187,0,249,40,117,255,109,3,215,255,53,146,44,1,63,47,179,0,194,216,3,254,14,84,136,0,136,177,13,255,72,243,186,255,117,17,125,255,211,58,211,255,93,79,223,0,90,88,245,255,139,209,111,255,70,222,47,0,10,246,79,255,198,217,178,0,227,225,11,1,78,126,179,255,62,43,126,0,103,148,35,0,129,8,165,254,245,240,148,0,61,51,142,0,81,208,134,0,15,137,115,255,211,119,236,255,159,245,248,255,2,134,136,255,230,139,58,1,160,164,254,0,114,85,141,255,49,166,182,255,144,70,84,1,85,182,7,0,46,53,93,0,9,166,161,255,55,162,178,255,45,184,188,0,146,28,44,254,169,90,49,0,120,178,241,1,14,123,127,255,7,241,199,1,189,66,50,255,198,143,101,254,189,243,135,255,141,24,24,254,75,97,87,0,118,251,154,1,237,54,156,0,171,146,207,255,131,196,246,255,136,64,113,1,151,232,57,0,240,218,115,0,49,61,27,255,64,129,73,1,252,169,27,255,40,132,10,1,90,201,193,255,252,121,240,1,186,206,41,0,43,198,97,0,145,100,183,0,204,216,80,254,172,150,65,0,249,229,196,254,104,123,73,255,77,104,96,254,130,180,8,0,104,123,57,0,220,202,229,255,102,249,211,0,86,14,232,255,182,78,209,0,239,225,164,0,106,13,32,255,120,73,17,255,134,67,233,0,83,254,181,0,183,236,112,1,48,64,131,255,241,216,243,255,65,193,226,0,206,241,100,254,100,134,166,255,237,202,197,0,55,13,81,0,32,124,102,255,40,228,177,0,118,181,31,1,231,160,134,255,119,187,202,0,0,142,60,255,128,38,189,255,166,201,150,0,207,120,26,1,54,184,172,0,12,242,204,254,133,66,230,0,34,38,31,1,184,112,80,0,32,51,165,254,191,243,55,0,58,73,146,254,155,167,205,255,100,104,152,255,197,254,207,255,173,19,247,0,238,10,202,0,239,151,242,0,94,59,39,255,240,29,102,255,10,92,154,255,229,84,219,255,161,129,80,0,208,90,204,1,240,219,174,255,158,102,145,1,53,178,76,255,52,108,168,1,83,222,107,0,211,36,109,0,118,58,56,0,8,29,22,0,237,160,199,0,170,209,157,0,137,71,47,0,143,86,32,0,198,242,2,0,212,48,136,1,92,172,186,0,230,151,105,1,96,191,229,0,138,80,191,254,240,216,130,255,98,43,6,254,168,196,49,0,253,18,91,1,144,73,121,0,61,146,39,1,63,104,24,255,184,165,112,254,126,235,98,0,80,213,98,255,123,60,87,255,82,140,245,1,223,120,173,255,15,198,134,1,206,60,239,0,231,234,92,255,33,238,19,255,165,113,142,1,176,119,38,0,160,43,166,254,239,91,105,0,107,61,194,1,25,4,68,0,15,139,51,0,164,132,106,255,34,116,46,254,168,95,197,0,137,212,23,0,72,156,58,0,137,112,69,254,150,105,154,255,236,201,157,0,23,212,154,255,136,82,227,254,226,59,221,255,95,149,192,0,81,118,52,255,33,43,215,1,14,147,75,255,89,156,121,254,14,18,79,0,147,208,139,1,151,218,62,255,156,88,8,1,210,184,98,255,20,175,123,255,102,83,229,0,220,65,116,1,150,250,4,255,92,142,220,255,34,247,66,255,204,225,179,254,151,81,151,0,71,40,236,255,138,63,62,0,6,79,240,255,183,185,181,0,118,50,27,0,63,227,192,0,123,99,58,1,50,224,155,255,17,225,223,254,220,224,77,255,14,44,123,1,141,128,175,0,248,212,200,0,150,59,183,255,147,97,29,0,150,204,181,0,253,37,71,0,145,85,119,0,154,200,186,0,2,128,249,255,83,24,124,0,14,87,143,0,168,51,245,1,124,151,231,255,208,240,197,1,124,190,185,0,48,58,246,0,20,233,232,0,125,18,98,255,13,254,31,255,245,177,130,255,108,142,35,0,171,125,242,254,140,12,34,255,165,161,162,0,206,205,101,0,247,25,34,1,100,145,57,0,39,70,57,0,118,204,203,255,242,0,162,0,165,244,30,0,198,116,226,0,128,111,153,255,140,54,182,1,60,122,15,255,155,58,57,1,54,50,198,0,171,211,29,255,107,138,167,255,173,107,199,255,109,161,193,0,89,72,242,255,206,115,89,255,250,254,142,254,177,202,94,255,81,89,50,0,7,105,66,255,25,254,255,254,203,64,23,255,79,222,108,255,39,249,75,0,241,124,50,0,239,152,133,0,221,241,105,0,147,151,98,0,213,161,121,254,242,49,137,0,233,37,249,254,42,183,27,0,184,119,230,255,217,32,163,255,208,251,228,1,137,62,131,255,79,64,9,254,94,48,113,0,17,138,50,254,193,255,22,0,247,18,197,1,67,55,104,0,16,205,95,255,48,37,66,0,55,156,63,1,64,82,74,255,200,53,71,254,239,67,125,0,26,224,222,0,223,137,93,255,30,224,202,255,9,220,132,0,198,38,235,1,102,141,86,0,60,43,81,1,136,28,26,0,233,36,8,254,207,242,148,0,164,162,63,0,51,46,224,255,114,48,79,255,9,175,226,0,222,3,193,255,47,160,232,255,255,93,105,254,14,42,230,0,26,138,82,1,208,43,244,0,27,39,38,255,98,208,127,255,64,149,182,255,5,250,209,0,187,60,28,254,49,25,218,255,169,116,205,255,119,18,120,0,156,116,147,255,132,53,109,255,13,10,202,0,110,83,167,0,157,219,137,255,6,3,130,255,50,167,30,255,60,159,47,255,129,128,157,254,94,3,189,0,3,166,68,0,83,223,215,0,150,90,194,1,15,168,65,0,227,83,51,255,205,171,66,255,54,187,60,1,152,102,45,255,119,154,225,0,240,247,136,0,100,197,178,255,139,71,223,255,204,82,16,1,41,206,42,255,156,192,221,255,216,123,244,255,218,218,185,255,187,186,239,255,252,172,160,255,195,52,22,0,144,174,181,254,187,100,115,255,211,78,176,255,27,7,193,0,147,213,104,255,90,201,10,255,80,123,66,1,22,33,186,0,1,7,99,254,30,206,10,0,229,234,5,0,53,30,210,0,138,8,220,254,71,55,167,0,72,225,86,1,118,190,188,0,254,193,101,1,171,249,172,255,94,158,183,254,93,2,108,255,176,93,76,255,73,99,79,255,74,64,129,254,246,46,65,0,99,241,127,254,246,151,102,255,44,53,208,254,59,102,234,0,154,175,164,255,88,242,32,0,111,38,1,0,255,182,190,255,115,176,15,254,169,60,129,0,122,237,241,0,90,76,63,0,62,74,120,255,122,195,110,0,119,4,178,0,222,242,210,0,130,33,46,254,156,40,41,0,167,146,112,1,49,163,111,255,121,176,235,0,76,207,14,255,3,25,198,1,41,235,213,0,85,36,214,1,49,92,109,255,200,24,30,254,168,236,195,0,145,39,124,1,236,195,149,0,90,36,184,255,67,85,170,255,38,35,26,254,131,124,68,255,239,155,35,255,54,201,164,0,196,22,117,255,49,15,205,0,24,224,29,1,126,113,144,0,117,21,182,0,203,159,141,0,223,135,77,0,176,230,176,255,190,229,215,255,99,37,181,255,51,21,138,255,25,189,89,255,49,48,165,254,152,45,247,0,170,108,222,0,80,202,5,0,27,69,103,254,204,22,129,255,180,252,62,254,210,1,91,255,146,110,254,255,219,162,28,0,223,252,213,1,59,8,33,0,206,16,244,0,129,211,48,0,107,160,208,0,112,59,209,0,109,77,216,254,34,21,185,255,246,99,56,255,179,139,19,255,185,29,50,255,84,89,19,0,74,250,98,255,225,42,200,255,192,217,205,255,210,16,167,0,99,132,95,1,43,230,57,0,254,11,203,255,99,188,63,255,119,193,251,254,80,105,54,0,232,181,189,1,183,69,112,255,208,171,165,255,47,109,180,255,123,83,165,0,146,162,52,255,154,11,4,255,151,227,90,255,146,137,97,254,61,233,41,255,94,42,55,255,108,164,236,0,152,68,254,0,10,140,131,255,10,106,79,254,243,158,137,0,67,178,66,254,177,123,198,255,15,62,34,0,197,88,42,255,149,95,177,255,152,0,198,255,149,254,113,255,225,90,163,255,125,217,247,0,18,17,224,0,128,66,120,254,192,25,9,255,50,221,205,0,49,212,70,0,233,255,164,0,2,209,9,0,221,52,219,254,172,224,244,255,94,56,206,1,242,179,2,255,31,91,164,1,230,46,138,255,189,230,220,0,57,47,61,255,111,11,157,0,177,91,152,0,28,230,98,0,97,87,126,0,198,89,145,255,167,79,107,0,249,77,160,1,29,233,230,255,150,21,86,254,60,11,193,0,151,37,36,254,185,150,243,255,228,212,83,1,172,151,180,0,201,169,155,0,244,60,234,0,142,235,4,1,67,218,60,0,192,113,75,1,116,243,207,255,65,172,155,0,81,30,156,255,80,72,33,254,18,231,109,255,142,107,21,254,125,26,132,255,176,16,59,255,150,201,58,0,206,169,201,0,208,121,226,0,40,172,14,255,150,61,94,255,56,57,156,255,141,60,145,255,45,108,149,255,238,145,155,255,209,85,31,254,192,12,210,0,99,98,93,254,152,16,151,0,225,185,220,0,141,235,44,255,160,172,21,254,71,26,31,255,13,64,93,254,28,56,198,0,177,62,248,1,182,8,241,0,166,101,148,255,78,81,133,255,129,222,215,1,188,169,129,255,232,7,97,0,49,112,60,255,217,229,251,0,119,108,138,0,39,19,123,254,131,49,235,0,132,84,145,0,130,230,148,255,25,74,187,0,5,245,54,255,185,219,241,1,18,194,228,255,241,202,102,0,105,113,202,0,155,235,79,0,21,9,178,255,156,1,239,0,200,148,61,0,115,247,210,255,49,221,135,0,58,189,8,1,35,46,9,0,81,65,5,255,52,158,185,255,125,116,46,255,74,140,13,255,210,92,172,254,147,23,71,0,217,224,253,254,115,108,180,255,145,58,48,254,219,177,24,255,156,255,60,1,154,147,242,0,253,134,87,0,53,75,229,0,48,195,222,255,31,175,50,255,156,210,120,255,208,35,222,255,18,248,179,1,2,10,101,255,157,194,248,255,158,204,101,255,104,254,197,255,79,62,4,0,178,172,101,1,96,146,251,255,65,10,156,0,2,137,165,255,116,4,231,0,242,215,1,0,19,35,29,255,43,161,79,0,59,149,246,1,251,66,176,0,200,33,3,255,80,110,142,255,195,161,17,1,228,56,66,255,123,47,145,254,132,4,164,0,67,174,172,0,25,253,114,0,87,97,87,1,250,220,84,0,96,91,200,255,37,125,59,0,19,65,118,0,161,52,241,255,237,172,6,255,176,191,255,255,1,65,130,254,223,190,230,0,101,253,231,255,146,35,109,0,250,29,77,1,49,0,19,0,123,90,155,1,22,86,32,255,218,213,65,0,111,93,127,0,60,93,169,255,8,127,182,0,17,186,14,254,253,137,246,255,213,25,48,254,76,238,0,255,248,92,70,255,99,224,139,0,184,9,255,1,7,164,208,0,205,131,198,1,87,214,199,0,130,214,95,0,221,149,222,0,23,38,171,254,197,110,213,0,43,115,140,254,215,177,118,0,96,52,66,1,117,158,237,0,14,64,182,255,46,63,174,255,158,95,190,255,225,205,177,255,43,5,142,255,172,99,212,255,244,187,147,0,29,51,153,255,228,116,24,254,30,101,207,0,19,246,150,255,134,231,5,0,125,134,226,1,77,65,98,0,236,130,33,255,5,110,62,0,69,108,127,255,7,113,22,0,145,20,83,254,194,161,231,255,131,181,60,0,217,209,177,255,229,148,212,254,3,131,184,0,117,177,187,1,28,14,31,255,176,102,80,0,50,84,151,255,125,31,54,255,21,157,133,255,19,179,139,1,224,232,26,0,34,117,170,255,167,252,171,255,73,141,206,254,129,250,35,0,72,79,236,1,220,229,20,255,41,202,173,255,99,76,238,255,198,22,224,255,108,198,195,255,36,141,96,1,236,158,59,255,106,100,87,0,110,226,2,0,227,234,222,0,154,93,119,255,74,112,164,255,67,91,2,255,21,145,33,255,102,214,137,255,175,230,103,254,163,246,166,0,93,247,116,254,167,224,28,255,220,2,57,1,171,206,84,0,123,228,17,255,27,120,119,0,119,11,147,1,180,47,225,255,104,200,185,254,165,2,114,0,77,78,212,0,45,154,177,255,24,196,121,254,82,157,182,0,90,16,190,1,12,147,197,0,95,239,152,255,11,235,71,0,86,146,119,255,172,134,214,0,60,131,196,0,161,225,129,0,31,130,120,254,95,200,51,0,105,231,210,255,58,9,148,255,43,168,221,255,124,237,142,0,198,211,50,254,46,245,103,0,164,248,84,0,152,70,208,255,180,117,177,0,70,79,185,0,243,74,32,0,149,156,207,0,197,196,161,1,245,53,239,0,15,93,246,254,139,240,49,255,196,88,36,255,162,38,123,0,128,200,157,1,174,76,103,255,173,169,34,254,216,1,171,255,114,51,17,0,136,228,194,0,110,150,56,254,106,246,159,0,19,184,79,255,150,77,240,255,155,80,162,0,0,53,169,255,29,151,86,0,68,94,16,0,92,7,110,254,98,117,149,255,249,77,230,255,253,10,140,0,214,124,92,254,35,118,235,0,89,48,57,1,22,53,166,0,184,144,61,255,179,255,194,0,214,248,61,254,59,110,246,0,121,21,81,254,166,3,228,0,106,64,26,255,69,232,134,255,242,220,53,254,46,220,85,0,113,149,247,255,97,179,103,255,190,127,11,0,135,209,182,0,95,52,129,1,170,144,206,255,122,200,204,255,168,100,146,0,60,144,149,254,70,60,40,0,122,52,177,255,246,211,101,255,174,237,8,0,7,51,120,0,19,31,173,0,126,239,156,255,143,189,203,0,196,128,88,255,233,133,226,255,30,125,173,255,201,108,50,0,123,100,59,255,254,163,3,1,221,148,181,255,214,136,57,254,222,180,137,255,207,88,54,255,28,33,251,255,67,214,52,1,210,208,100,0,81,170,94,0,145,40,53,0,224,111,231,254,35,28,244,255,226,199,195,254,238,17,230,0,217,217,164,254,169,157,221,0,218,46,162,1,199,207,163,255,108,115,162,1,14,96,187,255,118,60,76,0,184,159,152,0,209,231,71,254,42,164,186,255,186,153,51,254,221,171,182,255,162,142,173,0,235,47,193,0,7,139,16,1,95,164,64,255,16,221,166,0,219,197,16,0,132,29,44,255,100,69,117,255,60,235,88,254,40,81,173,0,71,190,61,255,187,88,157,0,231,11,23,0,237,117,164,0,225,168,223,255,154,114,116,255,163,152,242,1,24,32,170,0,125,98,113,254,168,19,76,0,17,157,220,254,155,52,5,0,19,111,161,255,71,90,252,255,173,110,240,0,10,198,121,255,253,255,240,255,66,123,210,0,221,194,215,254,121,163,17,255,225,7,99,0,190,49,182,0,115,9,133,1,232,26,138,255,213,68,132,0,44,119,122,255,179,98,51,0,149,90,106,0,71,50,230,255,10,153,118,255,177,70,25,0,165,87,205,0,55,138,234,0,238,30,97,0,113,155,207,0,98,153,127,0,34,107,219,254,117,114,172,255,76,180,255,254,242,57,179,255,221,34,172,254,56,162,49,255,83,3,255,255,113,221,189,255,188,25,228,254,16,88,89,255,71,28,198,254,22,17,149,255,243,121,254,255,107,202,99,255,9,206,14,1,220,47,153,0,107,137,39,1,97,49,194,255,149,51,197,254,186,58,11,255,107,43,232,1,200,6,14,255,181,133,65,254,221,228,171,255,123,62,231,1,227,234,179,255,34,189,212,254,244,187,249,0,190,13,80,1,130,89,1,0,223,133,173,0,9,222,198,255,66,127,74,0,167,216,93,255,155,168,198,1,66,145,0,0,68,102,46,1,172,90,154,0,216,128,75,255,160,40,51,0,158,17,27,1,124,240,49,0,236,202,176,255,151,124,192,255,38,193,190,0,95,182,61,0,163,147,124,255,255,165,51,255,28,40,17,254,215,96,78,0,86,145,218,254,31,36,202,255,86,9,5,0,111,41,200,255,237,108,97,0,57,62,44,0,117,184,15,1,45,241,116,0,152,1,220,255,157,165,188,0,250,15,131,1,60,44,125,255,65,220,251,255,75,50,184,0,53,90,128,255,231,80,194,255,136,129,127,1,21,18,187,255,45,58,161,255,71,147,34,0,174,249,11,254,35,141,29,0,239,68,177,255,115,110,58,0,238,190,177,1,87,245,166,255,190,49,247,255,146,83,184,255,173,14,39,255,146,215,104,0,142,223,120,0,149,200,155,255,212,207,145,1,16,181,217,0,173,32,87,255,255,35,181,0,119,223,161,1,200,223,94,255,70,6,186,255,192,67,85,255,50,169,152,0,144,26,123,255,56,243,179,254,20,68,136,0,39,140,188,254,253,208,5,255,200,115,135,1,43,172,229,255,156,104,187,0,151,251,167,0,52,135,23,0,151,153,72,0,147,197,107,254,148,158,5,255,238,143,206,0,126,153,137,255,88,152,197,254,7,68,167,0,252,159,165,255,239,78,54,255,24,63,55,255,38,222,94,0,237,183,12,255,206,204,210,0,19,39,246,254,30,74,231,0,135,108,29,1,179,115,0,0,117,118,116,1,132,6,252,255,145,129,161,1,105,67,141,0,82,37,226,255,238,226,228,255,204,214,129,254,162,123,100,255,185,121,234,0,45,108,231,0,66,8,56,255,132,136,128,0,172,224,66,254,175,157,188,0,230,223,226,254,242,219,69,0,184,14,119,1,82,162,56,0,114,123,20,0,162,103,85,255,49,239,99,254,156,135,215,0,111,255,167,254,39,196,214,0,144,38,79,1,249,168,125,0,155,97,156,255,23,52,219,255,150,22,144,0,44,149,165,255,40,127,183,0,196,77,233,255,118,129,210,255,170,135,230,255,214,119,198,0,233,240,35,0,253,52,7,255,117,102,48,255,21,204,154,255,179,136,177,255,23,2,3,1,149,130,89,255,252,17,159,1,70,60,26,0,144,107,17,0,180,190,60,255,56,182,59,255,110,71,54,255,198,18,129,255,149,224,87,255,223,21,152,255,138,22,182,255,250,156,205,0,236,45,208,255,79,148,242,1,101,70,209,0,103,78,174,0,101,144,172,255,152,136,237,1,191,194,136,0,113,80,125,1,152,4,141,0,155,150,53,255,196,116,245,0,239,114,73,254,19,82,17,255,124,125,234,255,40,52,191,0,42,210,158,255,155,132,165,0,178,5,42,1,64,92,40,255,36,85,77,255,178,228,118,0,137,66,96,254,115,226,66,0,110,240,69,254,151,111,80,0,167,174,236,255,227,108,107,255,188,242,65,255,183,81,255,0,57,206,181,255,47,34,181,255,213,240,158,1,71,75,95,0,156,40,24,255,102,210,81,0,171,199,228,255,154,34,41,0,227,175,75,0,21,239,195,0,138,229,95,1,76,192,49,0,117,123,87,1,227,225,130,0,125,62,63,255,2,198,171,0,254,36,13,254,145,186,206,0,148,255,244,255,35,0,166,0,30,150,219,1,92,228,212,0,92,198,60,254,62,133,200,255,201,41,59,0,125,238,109,255,180,163,238,1,140,122,82,0,9,22,88,255,197,157,47,255,153,94,57,0,88,30,182,0,84,161,85,0,178,146,124,0,166,166,7,255,21,208,223,0,156,182,242,0,155,121,185,0,83,156,174,254,154,16,118,255,186,83,232,1,223,58,121,255,29,23,88,0,35,125,127,255,170,5,149,254,164,12,130,255,155,196,29,0,161,96,136,0,7,35,29,1,162,37,251,0,3,46,242,255,0,217,188,0,57,174,226,1,206,233,2,0,57,187,136,254,123,189,9,255,201,117,127,255,186,36,204,0,231,25,216,0,80,78,105,0,19,134,129,255,148,203,68,0,141,81,125,254,248,165,200,255,214,144,135,0,151,55,166,255,38,235,91,0,21,46,154,0,223,254,150,255,35,153,180,255,125,176,29,1,43,98,30,255,216,122,230,255,233,160,12,0,57,185,12,254,240,113,7,255,5,9,16,254,26,91,108,0,109,198,203,0,8,147,40,0,129,134,228,255,124,186,40,255,114,98,132,254,166,132,23,0,99,69,44,0,9,242,238,255,184,53,59,0,132,129,102,255,52,32,243,254,147,223,200,255,123,83,179,254,135,144,201,255,141,37,56,1,151,60,227,255,90,73,156,1,203,172,187,0,80,151,47,255,94,137,231,255,36,191,59,255,225,209,181,255,74,215,213,254,6,118,179,255,153,54,193,1,50,0,231,0,104,157,72,1,140,227,154,255,182,226,16,254,96,225,92,255,115,20,170,254,6,250,78,0,248,75,173,255,53,89,6,255,0,180,118,0,72,173,1,0,64,8,206,1,174,133,223,0,185,62,133,255,214,11,98,0,197,31,208,0,171,167,244,255,22,231,181,1,150,218,185,0,247,169,97,1,165,139,247,255,47,120,149,1,103,248,51,0,60,69,28,254,25,179,196,0,124,7,218,254,58,107,81,0,184,233,156,255,252,74,36,0,118,188,67,0,141,95,53,255,222,94,165,254,46,61,53,0,206,59,115,255,47,236,250,255,74,5,32,1,129,154,238,255,106,32,226,0,121,187,61,255,3,166,241,254,67,170,172,255,29,216,178,255,23,201,252,0,253,110,243,0,200,125,57,0,109,192,96,255,52,115,238,0,38,121,243,255,201,56,33,0,194,118,130,0,75,96,25,255,170,30,230,254,39,63,253,0,36,45,250,255,251,1,239,0,160,212,92,1,45,209,237,0,243,33,87,254,237,84,201,255,212,18,157,254,212,99,127,255,217,98,16,254,139,172,239,0,168,201,130,255,143,193,169,255,238,151,193,1,215,104,41,0,239,61,165,254,2,3,242,0,22,203,177,254,177,204,22,0,149,129,213,254,31,11,41,255,0,159,121,254,160,25,114,255,162,80,200,0,157,151,11,0,154,134,78,1,216,54,252,0,48,103,133,0,105,220,197,0,253,168,77,254,53,179,23,0,24,121,240,1,255,46,96,255,107,60,135,254,98,205,249,255,63,249,119,255,120,59,211,255,114,180,55,254,91,85,237,0,149,212,77,1,56,73,49,0,86,198,150,0,93,209,160,0,69,205,182,255,244,90,43,0,20,36,176,0,122,116,221,0,51,167,39,1,231,1,63,255,13,197,134,0,3,209,34,255,135,59,202,0,167,100,78,0,47,223,76,0,185,60,62,0,178,166,123,1,132,12,161,255,61,174,43,0,195,69,144,0,127,47,191,1,34,44,78,0,57,234,52,1,255,22,40,255,246,94,146,0,83,228,128,0,60,78,224,255,0,96,210,255,153,175,236,0,159,21,73,0,180,115,196,254,131,225,106,0,255,167,134,0,159,8,112,255,120,68,194,255,176,196,198,255,118,48,168,255,93,169,1,0,112,200,102,1,74,24,254,0,19,141,4,254,142,62,63,0,131,179,187,255,77,156,155,255,119,86,164,0,170,208,146,255,208,133,154,255,148,155,58,255,162,120,232,254,252,213,155,0,241,13,42,0,94,50,131,0,179,170,112,0,140,83,151,255,55,119,84,1,140,35,239,255,153,45,67,1,236,175,39,0,54,151,103,255,158,42,65,255,196,239,135,254,86,53,203,0,149,97,47,254,216,35,17,255,70,3,70,1,103,36,90,255,40,26,173,0,184,48,13,0,163,219,217,255,81,6,1,255,221,170,108,254,233,208,93,0,100,201,249,254,86,36,35,255,209,154,30,1,227,201,251,255,2,189,167,254,100,57,3,0,13,128,41,0,197,100,75,0,150,204,235,255,145,174,59,0,120,248,149,255,85,55,225,0,114,210,53,254,199,204,119,0,14,247,74,1,63,251,129,0,67,104,151,1,135,130,80,0,79,89,55,255,117,230,157,255,25,96,143,0,213,145,5,0,69,241,120,1,149,243,95,255,114,42,20,0,131,72,2,0,154,53,20,255,73,62,109,0,196,102,152,0,41,12,204,255,122,38,11,1,250,10,145,0,207,125,148,0,246,244,222,255,41,32,85,1,112,213,126,0,162,249,86,1,71,198,127,255,81,9,21,1,98,39,4,255,204,71,45,1,75,111,137,0,234,59,231,0,32,48,95,255,204,31,114,1,29,196,181,255,51,241,167,254,93,109,142,0,104,144,45,0,235,12,181,255,52,112,164,0,76,254,202,255,174,14,162,0,61,235,147,255,43,64,185,254,233,125,217,0,243,88,167,254,74,49,8,0,156,204,66,0,124,214,123,0,38,221,118,1,146,112,236,0,114,98,177,0,151,89,199,0,87,197,112,0,185,149,161,0,44,96,165,0,248,179,20,255,188,219,216,254,40,62,13,0,243,142,141,0,229,227,206,255,172,202,35,255,117,176,225,255,82,110,38,1,42,245,14,255,20,83,97,0,49,171,10,0,242,119,120,0,25,232,61,0,212,240,147,255,4,115,56,255,145,17,239,254,202,17,251,255,249,18,245,255,99,117,239,0,184,4,179,255,246,237,51,255,37,239,137,255,166,112,166,255,81,188,33,255,185,250,142,255,54,187,173,0,208,112,201,0,246,43,228,1,104,184,88,255,212,52,196,255,51,117,108,255,254,117,155,0,46,91,15,255,87,14,144,255,87,227,204,0,83,26,83,1,159,76,227,0,159,27,213,1,24,151,108,0,117,144,179,254,137,209,82,0,38,159,10,0,115,133,201,0,223,182,156,1,110,196,93,255,57,60,233,0,5,167,105,255,154,197,164,0,96,34,186,255,147,133,37,1,220,99,190,0,1,167,84,255,20,145,171,0,194,197,251,254,95,78,133,255,252,248,243,255,225,93,131,255,187,134,196,255,216,153,170,0,20,118,158,254,140,1,118,0,86,158,15,1,45,211,41,255,147,1,100,254,113,116,76,255,211,127,108,1,103,15,48,0,193,16,102,1,69,51,95,255,107,128,157,0,137,171,233,0,90,124,144,1,106,161,182,0,175,76,236,1,200,141,172,255,163,58,104,0,233,180,52,255,240,253,14,255,162,113,254,255,38,239,138,254,52,46,166,0,241,101,33,254,131,186,156,0,111,208,62,255,124,94,160,255,31,172,254,0,112,174,56,255,188,99,27,255,67,138,251,0,125,58,128,1,156,152,174,255,178,12,247,255,252,84,158,0,82,197,14,254,172,200,83,255,37,39,46,1,106,207,167,0,24,189,34,0,131,178,144,0,206,213,4,0,161,226,210,0,72,51,105,255,97,45,187,255,78,184,223,255,176,29,251,0,79,160,86,255,116,37,178,0,82,77,213,1,82,84,141,255,226,101,212,1,175,88,199,255,245,94,247,1,172,118,109,255,166,185,190,0,131,181,120,0,87,254,93,255,134,240,73,255,32,245,143,255,139,162,103,255,179,98,18,254,217,204,112,0,147,223,120,255,53,10,243,0,166,140,150,0,125,80,200,255,14,109,219,255,91,218,1,255,252,252,47,254,109,156,116,255,115,49,127,1,204,87,211,255,148,202,217,255,26,85,249,255,14,245,134,1,76,89,169,255,242,45,230,0,59,98,172,255,114,73,132,254,78,155,49,255,158,126,84,0,49,175,43,255,16,182,84,255,157,103,35,0,104,193,109,255,67,221,154,0,201,172,1,254,8,162,88,0,165,1,29,255,125,155,229,255,30,154,220,1,103,239,92,0,220,1,109,255,202,198,1,0,94,2,142,1,36,54,44,0,235,226,158,255,170,251,214,255],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+10240);allocate([185,77,9,0,97,74,242,0,219,163,149,255,240,35,118,255,223,114,88,254,192,199,3,0,106,37,24,255,201,161,118,255,97,89,99,1,224,58,103,255,101,199,147,254,222,60,99,0,234,25,59,1,52,135,27,0,102,3,91,254,168,216,235,0,229,232,136,0,104,60,129,0,46,168,238,0,39,191,67,0,75,163,47,0,143,97,98,255,56,216,168,1,168,233,252,255,35,111,22,255,92,84,43,0,26,200,87,1,91,253,152,0,202,56,70,0,142,8,77,0,80,10,175,1,252,199,76,0,22,110,82,255,129,1,194,0,11,128,61,1,87,14,145,255,253,222,190,1,15,72,174,0,85,163,86,254,58,99,44,255,45,24,188,254,26,205,15,0,19,229,210,254,248,67,195,0,99,71,184,0,154,199,37,255,151,243,121,255,38,51,75,255,201,85,130,254,44,65,250,0,57,147,243,254,146,43,59,255,89,28,53,0,33,84,24,255,179,51,18,254,189,70,83,0,11,156,179,1,98,134,119,0,158,111,111,0,119,154,73,255,200,63,140,254,45,13,13,255,154,192,2,254,81,72,42,0,46,160,185,254,44,112,6,0,146,215,149,1,26,176,104,0,68,28,87,1,236,50,153,255,179,128,250,254,206,193,191,255,166,92,137,254,53,40,239,0,210,1,204,254,168,173,35,0,141,243,45,1,36,50,109,255,15,242,194,255,227,159,122,255,176,175,202,254,70,57,72,0,40,223,56,0,208,162,58,255,183,98,93,0,15,111,12,0,30,8,76,255,132,127,246,255,45,242,103,0,69,181,15,255,10,209,30,0,3,179,121,0,241,232,218,1,123,199,88,255,2,210,202,1,188,130,81,255,94,101,208,1,103,36,45,0,76,193,24,1,95,26,241,255,165,162,187,0,36,114,140,0,202,66,5,255,37,56,147,0,152,11,243,1,127,85,232,255,250,135,212,1,185,177,113,0,90,220,75,255,69,248,146,0,50,111,50,0,92,22,80,0,244,36,115,254,163,100,82,255,25,193,6,1,127,61,36,0,253,67,30,254,65,236,170,255,161,17,215,254,63,175,140,0,55,127,4,0,79,112,233,0,109,160,40,0,143,83,7,255,65,26,238,255,217,169,140,255,78,94,189,255,0,147,190,255,147,71,186,254,106,77,127,255,233,157,233,1,135,87,237,255,208,13,236,1,155,109,36,255,180,100,218,0,180,163,18,0,190,110,9,1,17,63,123,255,179,136,180,255,165,123,123,255,144,188,81,254,71,240,108,255,25,112,11,255,227,218,51,255,167,50,234,255,114,79,108,255,31,19,115,255,183,240,99,0,227,87,143,255,72,217,248,255,102,169,95,1,129,149,149,0,238,133,12,1,227,204,35,0,208,115,26,1,102,8,234,0,112,88,143,1,144,249,14,0,240,158,172,254,100,112,119,0,194,141,153,254,40,56,83,255,121,176,46,0,42,53,76,255,158,191,154,0,91,209,92,0,173,13,16,1,5,72,226,255,204,254,149,0,80,184,207,0,100,9,122,254,118,101,171,255,252,203,0,254,160,207,54,0,56,72,249,1,56,140,13,255,10,64,107,254,91,101,52,255,225,181,248,1,139,255,132,0,230,145,17,0,233,56,23,0,119,1,241,255,213,169,151,255,99,99,9,254,185,15,191,255,173,103,109,1,174,13,251,255,178,88,7,254,27,59,68,255,10,33,2,255,248,97,59,0,26,30,146,1,176,147,10,0,95,121,207,1,188,88,24,0,185,94,254,254,115,55,201,0,24,50,70,0,120,53,6,0,142,66,146,0,228,226,249,255,104,192,222,1,173,68,219,0,162,184,36,255,143,102,137,255,157,11,23,0,125,45,98,0,235,93,225,254,56,112,160,255,70,116,243,1,153,249,55,255,129,39,17,1,241,80,244,0,87,69,21,1,94,228,73,255,78,66,65,255,194,227,231,0,61,146,87,255,173,155,23,255,112,116,219,254,216,38,11,255,131,186,133,0,94,212,187,0,100,47,91,0,204,254,175,255,222,18,215,254,173,68,108,255,227,228,79,255,38,221,213,0,163,227,150,254,31,190,18,0,160,179,11,1,10,90,94,255,220,174,88,0,163,211,229,255,199,136,52,0,130,95,221,255,140,188,231,254,139,113,128,255,117,171,236,254,49,220,20,255,59,20,171,255,228,109,188,0,20,225,32,254,195,16,174,0,227,254,136,1,135,39,105,0,150,77,206,255,210,238,226,0,55,212,132,254,239,57,124,0,170,194,93,255,249,16,247,255,24,151,62,255,10,151,10,0,79,139,178,255,120,242,202,0,26,219,213,0,62,125,35,255,144,2,108,255,230,33,83,255,81,45,216,1,224,62,17,0,214,217,125,0,98,153,153,255,179,176,106,254,131,93,138,255,109,62,36,255,178,121,32,255,120,252,70,0,220,248,37,0,204,88,103,1,128,220,251,255,236,227,7,1,106,49,198,255,60,56,107,0,99,114,238,0,220,204,94,1,73,187,1,0,89,154,34,0,78,217,165,255,14,195,249,255,9,230,253,255,205,135,245,0,26,252,7,255,84,205,27,1,134,2,112,0,37,158,32,0,231,91,237,255,191,170,204,255,152,7,222,0,109,192,49,0,193,166,146,255,232,19,181,255,105,142,52,255,103,16,27,1,253,200,165,0,195,217,4,255,52,189,144,255,123,155,160,254,87,130,54,255,78,120,61,255,14,56,41,0,25,41,125,255,87,168,245,0,214,165,70,0,212,169,6,255,219,211,194,254,72,93,164,255,197,33,103,255,43,142,141,0,131,225,172,0,244,105,28,0,68,68,225,0,136,84,13,255,130,57,40,254,139,77,56,0,84,150,53,0,54,95,157,0,144,13,177,254,95,115,186,0,117,23,118,255,244,166,241,255,11,186,135,0,178,106,203,255,97,218,93,0,43,253,45,0,164,152,4,0,139,118,239,0,96,1,24,254,235,153,211,255,168,110,20,255,50,239,176,0,114,41,232,0,193,250,53,0,254,160,111,254,136,122,41,255,97,108,67,0,215,152,23,255,140,209,212,0,42,189,163,0,202,42,50,255,106,106,189,255,190,68,217,255,233,58,117,0,229,220,243,1,197,3,4,0,37,120,54,254,4,156,134,255,36,61,171,254,165,136,100,255,212,232,14,0,90,174,10,0,216,198,65,255,12,3,64,0,116,113,115,255,248,103,8,0,231,125,18,255,160,28,197,0,30,184,35,1,223,73,249,255,123,20,46,254,135,56,37,255,173,13,229,1,119,161,34,255,245,61,73,0,205,125,112,0,137,104,134,0,217,246,30,255,237,142,143,0,65,159,102,255,108,164,190,0,219,117,173,255,34,37,120,254,200,69,80,0,31,124,218,254,74,27,160,255,186,154,199,255,71,199,252,0,104,81,159,1,17,200,39,0,211,61,192,1,26,238,91,0,148,217,12,0,59,91,213,255,11,81,183,255,129,230,122,255,114,203,145,1,119,180,66,255,72,138,180,0,224,149,106,0,119,82,104,255,208,140,43,0,98,9,182,255,205,101,134,255,18,101,38,0,95,197,166,255,203,241,147,0,62,208,145,255,133,246,251,0,2,169,14,0,13,247,184,0,142,7,254,0,36,200,23,255,88,205,223,0,91,129,52,255,21,186,30,0,143,228,210,1,247,234,248,255,230,69,31,254,176,186,135,255,238,205,52,1,139,79,43,0,17,176,217,254,32,243,67,0,242,111,233,0,44,35,9,255,227,114,81,1,4,71,12,255,38,105,191,0,7,117,50,255,81,79,16,0,63,68,65,255,157,36,110,255,77,241,3,255,226,45,251,1,142,25,206,0,120,123,209,1,28,254,238,255,5,128,126,255,91,222,215,255,162,15,191,0,86,240,73,0,135,185,81,254,44,241,163,0,212,219,210,255,112,162,155,0,207,101,118,0,168,72,56,255,196,5,52,0,72,172,242,255,126,22,157,255,146,96,59,255,162,121,152,254,140,16,95,0,195,254,200,254,82,150,162,0,119,43,145,254,204,172,78,255,166,224,159,0,104,19,237,255,245,126,208,255,226,59,213,0,117,217,197,0,152,72,237,0,220,31,23,254,14,90,231,255,188,212,64,1,60,101,246,255,85,24,86,0,1,177,109,0,146,83,32,1,75,182,192,0,119,241,224,0,185,237,27,255,184,101,82,1,235,37,77,255,253,134,19,0,232,246,122,0,60,106,179,0,195,11,12,0,109,66,235,1,125,113,59,0,61,40,164,0,175,104,240,0,2,47,187,255,50,12,141,0,194,139,181,255,135,250,104,0,97,92,222,255,217,149,201,255,203,241,118,255,79,151,67,0,122,142,218,255,149,245,239,0,138,42,200,254,80,37,97,255,124,112,167,255,36,138,87,255,130,29,147,255,241,87,78,255,204,97,19,1,177,209,22,255,247,227,127,254,99,119,83,255,212,25,198,1,16,179,179,0,145,77,172,254,89,153,14,255,218,189,167,0,107,233,59,255,35,33,243,254,44,112,112,255,161,127,79,1,204,175,10,0,40,21,138,254,104,116,228,0,199,95,137,255,133,190,168,255,146,165,234,1,183,99,39,0,183,220,54,254,255,222,133,0,162,219,121,254,63,239,6,0,225,102,54,255,251,18,246,0,4,34,129,1,135,36,131,0,206,50,59,1,15,97,183,0,171,216,135,255,101,152,43,255,150,251,91,0,38,145,95,0,34,204,38,254,178,140,83,255,25,129,243,255,76,144,37,0,106,36,26,254,118,144,172,255,68,186,229,255,107,161,213,255,46,163,68,255,149,170,253,0,187,17,15,0,218,160,165,255,171,35,246,1,96,13,19,0,165,203,117,0,214,107,192,255,244,123,177,1,100,3,104,0,178,242,97,255,251,76,130,255,211,77,42,1,250,79,70,255,63,244,80,1,105,101,246,0,61,136,58,1,238,91,213,0,14,59,98,255,167,84,77,0,17,132,46,254,57,175,197,255,185,62,184,0,76,64,207,0,172,175,208,254,175,74,37,0,138,27,211,254,148,125,194,0,10,89,81,0,168,203,101,255,43,213,209,1,235,245,54,0,30,35,226,255,9,126,70,0,226,125,94,254,156,117,20,255,57,248,112,1,230,48,64,255,164,92,166,1,224,214,230,255,36,120,143,0,55,8,43,255,251,1,245,1,106,98,165,0,74,107,106,254,53,4,54,255,90,178,150,1,3,120,123,255,244,5,89,1,114,250,61,255,254,153,82,1,77,15,17,0,57,238,90,1,95,223,230,0,236,52,47,254,103,148,164,255,121,207,36,1,18,16,185,255,75,20,74,0,187,11,101,0,46,48,129,255,22,239,210,255,77,236,129,255,111,77,204,255,61,72,97,255,199,217,251,255,42,215,204,0,133,145,201,255,57,230,146,1,235,100,198,0,146,73,35,254,108,198,20,255,182,79,210,255,82,103,136,0,246,108,176,0,34,17,60,255,19,74,114,254,168,170,78,255,157,239,20,255,149,41,168,0,58,121,28,0,79,179,134,255,231,121,135,255,174,209,98,255,243,122,190,0,171,166,205,0,212,116,48,0,29,108,66,255,162,222,182,1,14,119,21,0,213,39,249,255,254,223,228,255,183,165,198,0,133,190,48,0,124,208,109,255,119,175,85,255,9,209,121,1,48,171,189,255,195,71,134,1,136,219,51,255,182,91,141,254,49,159,72,0,35,118,245,255,112,186,227,255,59,137,31,0,137,44,163,0,114,103,60,254,8,213,150,0,162,10,113,255,194,104,72,0,220,131,116,255,178,79,92,0,203,250,213,254,93,193,189,255,130,255,34,254,212,188,151,0,136,17,20,255,20,101,83,255,212,206,166,0,229,238,73,255,151,74,3,255,168,87,215,0,155,188,133,255,166,129,73,0,240,79,133,255,178,211,81,255,203,72,163,254,193,168,165,0,14,164,199,254,30,255,204,0,65,72,91,1,166,74,102,255,200,42,0,255,194,113,227,255,66,23,208,0,229,216,100,255,24,239,26,0,10,233,62,255,123,10,178,1,26,36,174,255,119,219,199,1,45,163,190,0,16,168,42,0,166,57,198,255,28,26,26,0,126,165,231,0,251,108,100,255,61,229,121,255,58,118,138,0,76,207,17,0,13,34,112,254,89,16,168,0,37,208,105,255,35,201,215,255,40,106,101,254,6,239,114,0,40,103,226,254,246,127,110,255,63,167,58,0,132,240,142,0,5,158,88,255,129,73,158,255,94,89,146,0,230,54,146,0,8,45,173,0,79,169,1,0,115,186,247,0,84,64,131,0,67,224,253,255,207,189,64,0,154,28,81,1,45,184,54,255,87,212,224,255,0,96,73,255,129,33,235,1,52,66,80,255,251,174,155,255,4,179,37,0,234,164,93,254,93,175,253,0,198,69,87,255,224,106,46,0,99,29,210,0,62,188,114,255,44,234,8,0,169,175,247,255,23,109,137,255,229,182,39,0,192,165,94,254,245,101,217,0,191,88,96,0,196,94,99,255,106,238,11,254,53,126,243,0,94,1,101,255,46,147,2,0,201,124,124,255,141,12,218,0,13,166,157,1,48,251,237,255,155,250,124,255,106,148,146,255,182,13,202,0,28,61,167,0,217,152,8,254,220,130,45,255,200,230,255,1,55,65,87,255,93,191,97,254,114,251,14,0,32,105,92,1,26,207,141,0,24,207,13,254,21,50,48,255,186,148,116,255,211,43,225,0,37,34,162,254,164,210,42,255,68,23,96,255,182,214,8,255,245,117,137,255,66,195,50,0,75,12,83,254,80,140,164,0,9,165,36,1,228,110,227,0,241,17,90,1,25,52,212,0,6,223,12,255,139,243,57,0,12,113,75,1,246,183,191,255,213,191,69,255,230,15,142,0,1,195,196,255,138,171,47,255,64,63,106,1,16,169,214,255,207,174,56,1,88,73,133,255,182,133,140,0,177,14,25,255,147,184,53,255,10,227,161,255,120,216,244,255,73,77,233,0,157,238,139,1,59,65,233,0,70,251,216,1,41,184,153,255,32,203,112,0,146,147,253,0,87,101,109,1,44,82,133,255,244,150,53,255,94,152,232,255,59,93,39,255,88,147,220,255,78,81,13,1,32,47,252,255,160,19,114,255,93,107,39,255,118,16,211,1,185,119,209,255,227,219,127,254,88,105,236,255,162,110,23,255,36,166,110,255,91,236,221,255,66,234,116,0,111,19,244,254,10,233,26,0,32,183,6,254,2,191,242,0,218,156,53,254,41,60,70,255,168,236,111,0,121,185,126,255,238,142,207,255,55,126,52,0,220,129,208,254,80,204,164,255,67,23,144,254,218,40,108,255,127,202,164,0,203,33,3,255,2,158,0,0,37,96,188,255,192,49,74,0,109,4,0,0,111,167,10,254,91,218,135,255,203,66,173,255,150,194,226,0,201,253,6,255,174,102,121,0,205,191,110,0,53,194,4,0,81,40,45,254,35,102,143,255,12,108,198,255,16,27,232,255,252,71,186,1,176,110,114,0,142,3,117,1,113,77,142,0,19,156,197,1,92,47,252,0,53,232,22,1,54,18,235,0,46,35,189,255,236,212,129,0,2,96,208,254,200,238,199,255,59,175,164,255,146,43,231,0,194,217,52,255,3,223,12,0,138,54,178,254,85,235,207,0,232,207,34,0,49,52,50,255,166,113,89,255,10,45,216,255,62,173,28,0,111,165,246,0,118,115,91,255,128,84,60,0,167,144,203,0,87,13,243,0,22,30,228,1,177,113,146,255,129,170,230,254,252,153,129,255,145,225,43,0,70,231,5,255,122,105,126,254,86,246,148,255,110,37,154,254,209,3,91,0,68,145,62,0,228,16,165,255,55,221,249,254,178,210,91,0,83,146,226,254,69,146,186,0,93,210,104,254,16,25,173,0,231,186,38,0,189,122,140,255,251,13,112,255,105,110,93,0,251,72,170,0,192,23,223,255,24,3,202,1,225,93,228,0,153,147,199,254,109,170,22,0,248,101,246,255,178,124,12,255,178,254,102,254,55,4,65,0,125,214,180,0,183,96,147,0,45,117,23,254,132,191,249,0,143,176,203,254,136,183,54,255,146,234,177,0,146,101,86,255,44,123,143,1,33,209,152,0,192,90,41,254,83,15,125,255,213,172,82,0,215,169,144,0,16,13,34,0,32,209,100,255,84,18,249,1,197,17,236,255,217,186,230,0,49,160,176,255,111,118,97,255,237,104,235,0,79,59,92,254,69,249,11,255,35,172,74,1,19,118,68,0,222,124,165,255,180,66,35,255,86,174,246,0,43,74,111,255,126,144,86,255,228,234,91,0,242,213,24,254,69,44,235,255,220,180,35,0,8,248,7,255,102,47,92,255,240,205,102,255,113,230,171,1,31,185,201,255,194,246,70,255,122,17,187,0,134,70,199,255,149,3,150,255,117,63,103,0,65,104,123,255,212,54,19,1,6,141,88,0,83,134,243,255,136,53,103,0,169,27,180,0,177,49,24,0,111,54,167,0,195,61,215,255,31,1,108,1,60,42,70,0,185,3,162,255,194,149,40,255,246,127,38,254,190,119,38,255,61,119,8,1,96,161,219,255,42,203,221,1,177,242,164,255,245,159,10,0,116,196,0,0,5,93,205,254,128,127,179,0,125,237,246,255,149,162,217,255,87,37,20,254,140,238,192,0,9,9,193,0,97,1,226,0,29,38,10,0,0,136,63,255,229,72,210,254,38,134,92,255,78,218,208,1,104,36,84,255,12,5,193,255,242,175,61,255,191,169,46,1,179,147,147,255,113,190,139,254,125,172,31,0,3,75,252,254,215,36,15,0,193,27,24,1,255,69,149,255,110,129,118,0,203,93,249,0,138,137,64,254,38,70,6,0,153,116,222,0,161,74,123,0,193,99,79,255,118,59,94,255,61,12,43,1,146,177,157,0,46,147,191,0,16,255,38,0,11,51,31,1,60,58,98,255,111,194,77,1,154,91,244,0,140,40,144,1,173,10,251,0,203,209,50,254,108,130,78,0,228,180,90,0,174,7,250,0,31,174,60,0,41,171,30,0,116,99,82,255,118,193,139,255,187,173,198,254,218,111,56,0,185,123,216,0,249,158,52,0,52,180,93,255,201,9,91,255,56,45,166,254,132,155,203,255,58,232,110,0,52,211,89,255,253,0,162,1,9,87,183,0,145,136,44,1,94,122,245,0,85,188,171,1,147,92,198,0,0,8,104,0,30,95,174,0,221,230,52,1,247,247,235,255,137,174,53,255,35,21,204,255,71,227,214,1,232,82,194,0,11,48,227,255,170,73,184,255,198,251,252,254,44,112,34,0,131,101,131,255,72,168,187,0,132,135,125,255,138,104,97,255,238,184,168,255,243,104,84,255,135,216,226,255,139,144,237,0,188,137,150,1,80,56,140,255,86,169,167,255,194,78,25,255,220,17,180,255,17,13,193,0,117,137,212,255,141,224,151,0,49,244,175,0,193,99,175,255,19,99,154,1,255,65,62,255,156,210,55,255,242,244,3,255,250,14,149,0,158,88,217,255,157,207,134,254,251,232,28,0,46,156,251,255,171,56,184,255,239,51,234,0,142,138,131,255,25,254,243,1,10,201,194,0,63,97,75,0,210,239,162,0,192,200,31,1,117,214,243,0,24,71,222,254,54,40,232,255,76,183,111,254,144,14,87,255,214,79,136,255,216,196,212,0,132,27,140,254,131,5,253,0,124,108,19,255,28,215,75,0,76,222,55,254,233,182,63,0,68,171,191,254,52,111,222,255,10,105,77,255,80,170,235,0,143,24,88,255,45,231,121,0,148,129,224,1,61,246,84,0,253,46,219,255,239,76,33,0,49,148,18,254,230,37,69,0,67,134,22,254,142,155,94,0,31,157,211,254,213,42,30,255,4,228,247,254,252,176,13,255,39,0,31,254,241,244,255,255,170,45,10,254,253,222,249,0,222,114,132,0,255,47,6,255,180,163,179,1,84,94,151,255,89,209,82,254,229,52,169,255,213,236,0,1,214,56,228,255,135,119,151,255,112,201,193,0,83,160,53,254,6,151,66,0,18,162,17,0,233,97,91,0,131,5,78,1,181,120,53,255,117,95,63,255,237,117,185,0,191,126,136,255,144,119,233,0,183,57,97,1,47,201,187,255,167,165,119,1,45,100,126,0,21,98,6,254,145,150,95,255,120,54,152,0,209,98,104,0,143,111,30,254,184,148,249,0,235,216,46,0,248,202,148,255,57,95,22,0,242,225,163,0,233,247,232,255,71,171,19,255,103,244,49,255,84,103,93,255,68,121,244,1,82,224,13,0,41,79,43,255,249,206,167,255,215,52,21,254,192,32,22,255,247,111,60,0,101,74,38,255,22,91,84,254,29,28,13,255,198,231,215,254,244,154,200,0,223,137,237,0,211,132,14,0,95,64,206,255,17,62,247,255,233,131,121,1,93,23,77,0,205,204,52,254,81,189,136,0,180,219,138,1,143,18,94,0,204,43,140,254,188,175,219,0,111,98,143,255,151,63,162,255,211,50,71,254,19,146,53,0,146,45,83,254,178,82,238,255,16,133,84,255,226,198,93,255,201,97,20,255,120,118,35,255,114,50,231,255,162,229,156,255,211,26,12,0,114,39,115,255,206,212,134,0,197,217,160,255,116,129,94,254,199,215,219,255,75,223,249,1,253,116,181,255,232,215,104,255,228,130,246,255,185,117,86,0,14,5,8,0,239,29,61,1,237,87,133,255,125,146,137,254,204,168,223,0,46,168,245,0,154,105,22,0,220,212,161,255,107,69,24,255,137,218,181,255,241,84,198,255,130,122,211,255,141,8,153,255,190,177,118,0,96,89,178,0,255,16,48,254,122,96,105,255,117,54,232,255,34,126,105,255,204,67,166,0,232,52,138,255,211,147,12,0,25,54,7,0,44,15,215,254,51,236,45,0,190,68,129,1,106,147,225,0,28,93,45,254,236,141,15,255,17,61,161,0,220,115,192,0,236,145,24,254,111,168,169,0,224,58,63,255,127,164,188,0,82,234,75,1,224,158,134,0,209,68,110,1,217,166,217,0,70,225,166,1,187,193,143,255,16,7,88,255,10,205,140,0,117,192,156,1,17,56,38,0,27,124,108,1,171,215,55,255,95,253,212,0,155,135,168,255,246,178,153,254,154,68,74,0,232,61,96,254,105,132,59,0,33,76,199,1,189,176,130,255,9,104,25,254,75,198,102,255,233,1,112,0,108,220,20,255,114,230,70,0,140,194,133,255,57,158,164,254,146,6,80,255,169,196,97,1,85,183,130,0,70,158,222,1,59,237,234,255,96,25,26,255,232,175,97,255,11,121,248,254,88,35,194,0,219,180,252,254,74,8,227,0,195,227,73,1,184,110,161,255,49,233,164,1,128,53,47,0,82,14,121,255,193,190,58,0,48,174,117,255,132,23,32,0,40,10,134,1,22,51,25,255,240,11,176,255,110,57,146,0,117,143,239,1,157,101,118,255,54,84,76,0,205,184,18,255,47,4,72,255,78,112,85,255,193,50,66,1,93,16,52,255,8,105,134,0,12,109,72,255,58,156,251,0,144,35,204,0,44,160,117,254,50,107,194,0,1,68,165,255,111,110,162,0,158,83,40,254,76,214,234,0,58,216,205,255,171,96,147,255,40,227,114,1,176,227,241,0,70,249,183,1,136,84,139,255,60,122,247,254,143,9,117,255,177,174,137,254,73,247,143,0,236,185,126,255,62,25,247,255,45,64,56,255,161,244,6,0,34,57,56,1,105,202,83,0,128,147,208,0,6,103,10,255,74,138,65,255,97,80,100,255,214,174,33,255,50,134,74,255,110,151,130,254,111,84,172,0,84,199,75,254,248,59,112,255,8,216,178,1,9,183,95,0,238,27,8,254,170,205,220,0,195,229,135,0,98,76,237,255,226,91,26,1,82,219,39,255,225,190,199,1,217,200,121,255,81,179,8,255,140,65,206,0,178,207,87,254,250,252,46,255,104,89,110,1,253,189,158,255,144,214,158,255,160,245,54,255,53,183,92,1,21,200,194,255,146,33,113,1,209,1,255,0,235,106,43,255,167,52,232,0,157,229,221,0,51,30,25,0,250,221,27,1,65,147,87,255,79,123,196,0,65,196,223,255,76,44,17,1,85,241,68,0,202,183,249,255,65,212,212,255,9,33,154,1,71,59,80,0,175,194,59,255,141,72,9,0,100,160,244,0,230,208,56,0,59,25,75,254,80,194,194,0,18,3,200,254,160,159,115,0,132,143,247,1,111,93,57,255,58,237,11,1,134,222,135,255,122,163,108,1,123,43,190,255,251,189,206,254,80,182,72,255,208,246,224,1,17,60,9,0,161,207,38,0,141,109,91,0,216,15,211,255,136,78,110,0,98,163,104,255,21,80,121,255,173,178,183,1,127,143,4,0,104,60,82,254,214,16,13,255,96,238,33,1,158,148,230,255,127,129,62,255,51,255,210,255,62,141,236,254,157,55,224,255,114,39,244,0,192,188,250,255,228,76,53,0,98,84,81,255,173,203,61,254,147,50,55,255,204,235,191,0,52,197,244,0,88,43,211,254,27,191,119,0,188,231,154,0,66,81,161,0,92,193,160,1,250,227,120,0,123,55,226,0,184,17,72,0,133,168,10,254,22,135,156,255,41,25,103,255,48,202,58,0,186,149,81,255,188,134,239,0,235,181,189,254,217,139,188,255,74,48,82,0,46,218,229,0,189,253,251,0,50,229,12,255,211,141,191,1,128,244,25,255,169,231,122,254,86,47,189,255,132,183,23,255,37,178,150,255,51,137,253,0,200,78,31,0,22,105,50,0,130,60,0,0,132,163,91,254,23,231,187,0,192,79,239,0,157,102,164,255,192,82,20,1,24,181,103,255,240,9,234,0,1,123,164,255,133,233,0,255,202,242,242,0,60,186,245,0,241,16,199,255,224,116,158,254,191,125,91,255,224,86,207,0,121,37,231,255,227,9,198,255,15,153,239,255,121,232,217,254,75,112,82,0,95,12,57,254,51,214,105,255,148,220,97,1,199,98,36,0,156,209,12,254,10,212,52,0,217,180,55,254,212,170,232,255,216,20,84,255,157,250,135,0,157,99,127,254,1,206,41,0,149,36,70,1,54,196,201,255,87,116,0,254,235,171,150,0,27,163,234,0,202,135,180,0,208,95,0,254,123,156,93,0,183,62,75,0,137,235,182,0,204,225,255,255,214,139,210,255,2,115,8,255,29,12,111,0,52,156,1,0,253,21,251,255,37,165,31,254,12,130,211,0,106,18,53,254,42,99,154,0,14,217,61,254,216,11,92,255,200,197,112,254,147,38,199,0,36,252,120,254,107,169,77,0,1,123,159,255,207,75,102,0,163,175,196,0,44,1,240,0,120,186,176,254,13,98,76,255,237,124,241,255,232,146,188,255,200,96,224,0,204,31,41,0,208,200,13,0,21,225,96,255,175,156,196,0,247,208,126,0,62,184,244,254,2,171,81,0,85,115,158,0,54,64,45,255,19,138,114,0,135,71,205,0,227,47,147,1,218,231,66,0,253,209,28,0,244,15,173,255,6,15,118,254,16,150,208,255,185,22,50,255,86,112,207,255,75,113,215,1,63,146,43,255,4,225,19,254,227,23,62,255,14,255,214,254,45,8,205,255,87,197,151,254,210,82,215,255,245,248,247,255,128,248,70,0,225,247,87,0,90,120,70,0,213,245,92,0,13,133,226,0,47,181,5,1,92,163,105,255,6,30,133,254,232,178,61,255,230,149,24,255,18,49,158,0,228,100,61,254,116,243,251,255,77,75,92,1,81,219,147,255,76,163,254,254,141,213,246,0,232,37,152,254,97,44,100,0,201,37,50,1,212,244,57,0,174,171,183,255,249,74,112,0,166,156,30,0,222,221,97,255,243,93,73,254,251,101,100,255,216,217,93,255,254,138,187,255,142,190,52,255,59,203,177,255,200,94,52,0,115,114,158,255,165,152,104,1,126,99,226,255,118,157,244,1,107,200,16,0,193,90,229,0,121,6,88,0,156,32,93,254,125,241,211,255,14,237,157,255,165,154,21,255,184,224,22,255,250,24,152,255,113,77,31,0,247,171,23,255,237,177,204,255,52,137,145,255,194,182,114,0,224,234,149,0,10,111,103,1,201,129,4,0,238,142,78,0,52,6,40,255,110,213,165,254,60,207,253,0,62,215,69,0,96,97,0,255,49,45,202,0,120,121,22,255,235,139,48,1,198,45,34,255,182,50,27,1,131,210,91,255,46,54,128,0,175,123,105,255,198,141,78,254,67,244,239,255,245,54,103,254,78,38,242,255,2,92,249,254,251,174,87,255,139,63,144,0,24,108,27,255,34,102,18,1,34,22,152,0,66,229,118,254,50,143,99,0,144,169,149,1,118,30,152,0,178,8,121,1,8,159,18,0,90,101,230,255,129,29,119,0,68,36,11,1,232,183,55,0,23,255,96,255,161,41,193,255,63,139,222,0,15,179,243,0,255,100,15,255,82,53,135,0,137,57,149,1,99,240,170,255,22,230,228,254,49,180,82,255,61,82,43,0,110,245,217,0,199,125,61,0,46,253,52,0,141,197,219,0,211,159,193,0,55,121,105,254,183,20,129,0,169,119,170,255,203,178,139,255,135,40,182,255,172,13,202,255,65,178,148,0,8,207,43,0,122,53,127,1,74,161,48,0,227,214,128,254,86,11,243,255,100,86,7,1,245,68,134,255,61,43,21,1,152,84,94,255,190,60,250,254,239,118,232,255,214,136,37,1,113,76,107,255,93,104,100,1,144,206,23,255,110,150,154,1,228,103,185,0,218,49,50,254,135,77,139,255,185,1,78,0,0,161,148,255,97,29,233,255,207,148,149,255,160,168,0,0,91,128,171,255,6,28,19,254,11,111,247,0,39,187,150,255,138,232,149,0,117,62,68,255,63,216,188,255,235,234,32,254,29,57,160,255,25,12,241,1,169,60,191,0,32,131,141,255,237,159,123,255,94,197,94,254,116,254,3,255,92,179,97,254,121,97,92,255,170,112,14,0,21,149,248,0,248,227,3,0,80,96,109,0,75,192,74,1,12,90,226,255,161,106,68,1,208,114,127,255,114,42,255,254,74,26,74,255,247,179,150,254,121,140,60,0,147,70,200,255,214,40,161,255,161,188,201,255,141,65,135,255,242,115,252,0,62,47,202,0,180,149,255,254,130,55,237,0,165,17,186,255,10,169,194,0,156,109,218,255,112,140,123,255,104,128,223,254,177,142,108,255,121,37,219,255,128,77,18,255,111,108,23,1,91,192,75,0,174,245,22,255,4,236,62,255,43,64,153,1,227,173,254,0,237,122,132,1,127,89,186,255,142,82,128,254,252,84,174,0,90,179,177,1,243,214,87,255,103,60,162,255,208,130,14,255,11,130,139,0,206,129,219,255,94,217,157,255,239,230,230,255,116,115,159,254,164,107,95,0,51,218,2,1,216,125,198,255,140,202,128,254,11,95,68,255,55,9,93,254,174,153,6,255,204,172,96,0,69,160,110,0,213,38,49,254,27,80,213,0,118,125,114,0,70,70,67,255,15,142,73,255,131,122,185,255,243,20,50,254,130,237,40,0,210,159,140,1,197,151,65,255,84,153,66,0,195,126,90,0,16,238,236,1,118,187,102,255,3,24,133,255,187,69,230,0,56,197,92,1,213,69,94,255,80,138,229,1,206,7,230,0,222,111,230,1,91,233,119,255,9,89,7,1,2,98,1,0,148,74,133,255,51,246,180,255,228,177,112,1,58,189,108,255,194,203,237,254,21,209,195,0,147,10,35,1,86,157,226,0,31,163,139,254,56,7,75,255,62,90,116,0,181,60,169,0,138,162,212,254,81,167,31,0,205,90,112,255,33,112,227,0,83,151,117,1,177,224,73,255,174,144,217,255,230,204,79,255,22,77,232,255,114,78,234,0,224,57,126,254,9,49,141,0,242,147,165,1,104,182,140,255,167,132,12,1,123,68,127,0,225,87,39,1,251,108,8,0,198,193,143,1,121,135,207,255,172,22,70,0,50,68,116,255,101,175,40,255,248,105,233,0,166,203,7,0,110,197,218,0,215,254,26,254,168,226,253,0,31,143,96,0,11,103,41,0,183,129,203,254,100,247,74,255,213,126,132,0,210,147,44,0,199,234,27,1,148,47,181,0,155,91,158,1,54,105,175,255,2,78,145,254,102,154,95,0,128,207,127,254,52,124,236,255,130,84,71,0,221,243,211,0,152,170,207,0,222,106,199,0,183,84,94,254,92,200,56,255,138,182,115,1,142,96,146,0,133,136,228,0,97,18,150,0,55,251,66,0,140,102,4,0,202,103,151,0,30,19,248,255,51,184,207,0,202,198,89,0,55,197,225,254,169,95,249,255,66,65,68,255,188,234,126,0,166,223,100,1,112,239,244,0,144,23,194,0,58,39,182,0,244,44,24,254,175,68,179,255,152,118,154,1,176,162,130,0,217,114,204,254,173,126,78,255,33,222,30,255,36,2,91,255,2,143,243,0,9,235,215,0,3,171,151,1,24,215,245,255,168,47,164,254,241,146,207,0,69,129,180,0,68,243,113,0,144,53,72,254,251,45,14,0,23,110,168,0,68,68,79,255,110,70,95,254,174,91,144,255,33,206,95,255,137,41,7,255,19,187,153,254,35,255,112,255,9,145,185,254,50,157,37,0,11,112,49,1,102,8,190,255,234,243,169,1,60,85,23,0,74,39,189,0,116,49,239,0,173,213,210,0,46,161,108,255,159,150,37,0,196,120,185,255,34,98,6,255,153,195,62,255,97,230,71,255,102,61,76,0,26,212,236,255,164,97,16,0,198,59,146,0,163,23,196,0,56,24,61,0,181,98,193,0,251,147,229,255,98,189,24,255,46,54,206,255,234,82,246,0,183,103,38,1,109,62,204,0,10,240,224,0,146,22,117,255,142,154,120,0,69,212,35,0,208,99,118,1,121,255,3,255,72,6,194,0,117,17,197,255,125,15,23,0,154,79,153,0,214,94,197,255,185,55,147,255,62,254,78,254,127,82,153,0,110,102,63,255,108,82,161,255,105,187,212,1,80,138,39,0,60,255,93,255,72,12,186,0,210,251,31,1,190,167,144,255,228,44,19,254,128,67,232,0,214,249,107,254,136,145,86,255,132,46,176,0,189,187,227,255,208,22,140,0,217,211,116,0,50,81,186,254,139,250,31,0,30,64,198,1,135,155,100,0,160,206,23,254,187,162,211,255,16,188,63,0,254,208,49,0,85,84,191,0,241,192,242,255,153,126,145,1,234,162,162,255,230,97,216,1,64,135,126,0,190,148,223,1,52,0,43,255,28,39,189,1,64,136,238,0,175,196,185,0,98,226,213,255,127,159,244,1,226,175,60,0,160,233,142,1,180,243,207,255,69,152,89,1,31,101,21,0,144,25,164,254,139,191,209,0,91,25,121,0,32,147,5,0,39,186,123,255,63,115,230,255,93,167,198,255,143,213,220,255,179,156,19,255,25,66,122,0,214,160,217,255,2,45,62,255,106,79,146,254,51,137,99,255,87,100,231,255,175,145,232,255,101,184,1,255,174,9,125,0,82,37,161,1,36,114,141,255,48,222,142,255,245,186,154,0,5,174,221,254,63,114,155,255,135,55,160,1,80,31,135,0,126,250,179,1,236,218,45,0,20,28,145,1,16,147,73,0,249,189,132,1,17,189,192,255,223,142,198,255,72,20,15,255,250,53,237,254,15,11,18,0,27,211,113,254,213,107,56,255,174,147,146,255,96,126,48,0,23,193,109,1,37,162,94,0,199,157,249,254,24,128,187,255,205,49,178,254,93,164,42,255,43,119,235,1,88,183,237,255,218,210,1,255,107,254,42,0,230,10,99,255,162,0,226,0,219,237,91,0,129,178,203,0,208,50,95,254,206,208,95,255,247,191,89,254,110,234,79,255,165,61,243,0,20,122,112,255,246,246,185,254,103,4,123,0,233,99,230,1,219,91,252,255,199,222,22,255,179,245,233,255,211,241,234,0,111,250,192,255,85,84,136,0,101,58,50,255,131,173,156,254,119,45,51,255,118,233,16,254,242,90,214,0,94,159,219,1,3,3,234,255,98,76,92,254,80,54,230,0,5,228,231,254,53,24,223,255,113,56,118,1,20,132,1,255,171,210,236,0,56,241,158,255,186,115,19,255,8,229,174,0,48,44,0,1,114,114,166,255,6,73,226,255,205,89,244,0,137,227,75,1,248,173,56,0,74,120,246,254,119,3,11,255,81,120,198,255,136,122,98,255,146,241,221,1,109,194,78,255,223,241,70,1,214,200,169,255,97,190,47,255,47,103,174,255,99,92,72,254,118,233,180,255,193,35,233,254,26,229,32,255,222,252,198,0,204,43,71,255,199,84,172,0,134,102,190,0,111,238,97,254,230,40,230,0,227,205,64,254,200,12,225,0,166,25,222,0,113,69,51,255,143,159,24,0,167,184,74,0,29,224,116,254,158,208,233,0,193,116,126,255,212,11,133,255,22,58,140,1,204,36,51,255,232,30,43,0,235,70,181,255,64,56,146,254,169,18,84,255,226,1,13,255,200,50,176,255,52,213,245,254,168,209,97,0,191,71,55,0,34,78,156,0,232,144,58,1,185,74,189,0,186,142,149,254,64,69,127,255,161,203,147,255,176,151,191,0,136,231,203,254,163,182,137,0,161,126,251,254,233,32,66,0,68,207,66,0,30,28,37,0,93,114,96,1,254,92,247,255,44,171,69,0,202,119,11,255,188,118,50,1,255,83,136,255,71,82,26,0,70,227,2,0,32,235,121,1,181,41,154,0,71,134,229,254,202,255,36,0,41,152,5,0,154,63,73,255,34,182,124,0,121,221,150,255,26,204,213,1,41,172,87,0,90,157,146,255,109,130,20,0,71,107,200,255,243,102,189,0,1,195,145,254,46,88,117,0,8,206,227,0,191,110,253,255,109,128,20,254,134,85,51,255,137,177,112,1,216,34,22,255,131,16,208,255,121,149,170,0,114,19,23,1,166,80,31,255,113,240,122,0,232,179,250,0,68,110,180,254,210,170,119,0,223,108,164,255,207,79,233,255,27,229,226,254,209,98,81,255,79,68,7,0,131,185,100,0,170,29,162,255,17,162,107,255,57,21,11,1,100,200,181,255,127,65,166,1,165,134,204,0,104,167,168,0,1,164,79,0,146,135,59,1,70,50,128,255,102,119,13,254,227,6,135,0,162,142,179,255,160,100,222,0,27,224,219,1,158,93,195,255,234,141,137,0,16,24,125,255,238,206,47,255,97,17,98,255,116,110,12,255,96,115,77,0,91,227,232,255,248,254,79,255,92,229,6,254,88,198,139,0,206,75,129,0,250,77,206,255,141,244,123,1,138,69,220,0,32,151,6,1,131,167,22,255,237,68,167,254,199,189,150,0,163,171,138,255,51,188,6,255,95,29,137,254,148,226,179,0,181,107,208,255,134,31,82,255,151,101,45,255,129,202,225,0,224,72,147,0,48,138,151,255,195,64,206,254,237,218,158,0,106,29,137,254,253,189,233,255,103,15,17,255,194,97,255,0,178,45,169,254,198,225,155,0,39,48,117,255,135,106,115,0,97,38,181,0,150,47,65,255,83,130,229,254,246,38,129,0,92,239,154,254,91,99,127,0,161,111,33,255,238,217,242,255,131,185,195,255,213,191,158,255,41,150,218,0,132,169,131,0,89,84,252,1,171,70,128,255,163,248,203,254,1,50,180,255,124,76,85,1,251,111,80,0,99,66,239,255,154,237,182,255,221,126,133,254,74,204,99,255,65,147,119,255,99,56,167,255,79,248,149,255,116,155,228,255,237,43,14,254,69,137,11,255,22,250,241,1,91,122,143,255,205,249,243,0,212,26,60,255,48,182,176,1,48,23,191,255,203,121,152,254,45,74,213,255,62,90,18,254,245,163,230,255,185,106,116,255,83,35,159,0,12,33,2,255,80,34,62,0,16,87,174,255,173,101,85,0,202,36,81,254,160,69,204,255,64,225,187,0,58,206,94,0,86,144,47,0,229,86,245,0,63,145,190,1,37,5,39,0,109,251,26,0,137,147,234,0,162,121,145,255,144,116,206,255,197,232,185,255,183,190,140,255,73,12,254,255,139,20,242,255,170,90,239,255,97,66,187,255,245,181,135,254,222,136,52,0,245,5,51,254,203,47,78,0,152,101,216,0,73,23,125,0,254,96,33,1,235,210,73,255,43,209,88,1,7,129,109,0,122,104,228,254,170,242,203,0,242,204,135,255,202,28,233,255,65,6,127,0,159,144,71,0,100,140,95,0,78,150,13,0,251,107,118,1,182,58,125,255,1,38,108,255,141,189,209,255,8,155,125,1,113,163,91,255,121,79,190,255,134,239,108,255,76,47,248,0,163,228,239,0,17,111,10,0,88,149,75,255,215,235,239,0,167,159,24,255,47,151,108,255,107,209,188,0,233,231,99,254,28,202,148,255,174,35,138,255,110,24,68,255,2,69,181,0,107,102,82,0,102,237,7,0,92,36,237,255,221,162,83,1,55,202,6,255,135,234,135,255,24,250,222,0,65,94,168,254,245,248,210,255,167,108,201,254,255,161,111,0,205,8,254,0,136,13,116,0,100,176,132,255,43,215,126,255,177,133,130,255,158,79,148,0,67,224,37,1,12,206,21,255,62,34,110,1,237,104,175,255,80,132,111,255,142,174,72,0,84,229,180,254,105,179,140,0,64,248,15,255,233,138,16,0,245,67,123,254,218,121,212,255,63,95,218,1,213,133,137,255,143,182,82,255,48,28,11,0,244,114,141,1,209,175,76,255,157,181,150,255,186,229,3,255,164,157,111,1,231,189,139,0,119,202,190,255,218,106,64,255,68,235,63,254,96,26,172,255,187,47,11,1,215,18,251,255,81,84,89,0,68,58,128,0,94,113,5,1,92,129,208,255,97,15,83,254,9,28,188,0,239,9,164,0,60,205,152,0,192,163,98,255,184,18,60,0,217,182,139,0,109,59,120,255,4,192,251,0,169,210,240,255,37,172,92,254,148,211,245,255,179,65,52,0,253,13,115,0,185,174,206,1,114,188,149,255,237,90,173,0,43,199,192,255,88,108,113,0,52,35,76,0,66,25,148,255,221,4,7,255,151,241,114,255,190,209,232,0,98,50,199,0,151,150,213,255,18,74,36,1,53,40,7,0,19,135,65,255,26,172,69,0,174,237,85,0,99,95,41,0,3,56,16,0,39,160,177,255,200,106,218,254,185,68,84,255,91,186,61,254,67,143,141,255,13,244,166,255,99,114,198,0,199,110,163,255,193,18,186,0,124,239,246,1,110,68,22,0,2,235,46,1,212,60,107,0,105,42,105,1,14,230,152,0,7,5,131,0,141,104,154,255,213,3,6,0,131,228,162,255,179,100,28,1,231,123,85,255,206,14,223,1,253,96,230,0,38,152,149,1,98,137,122,0,214,205,3,255,226,152,179,255,6,133,137,0,158,69,140,255,113,162,154,255,180,243,172,255,27,189,115,255,143,46,220,255,213,134,225,255,126,29,69,0,188,43,137,1,242,70,9,0,90,204,255,255,231,170,147,0,23,56,19,254,56,125,157,255,48,179,218,255,79,182,253,255,38,212,191,1,41,235,124,0,96,151,28,0,135,148,190,0,205,249,39,254,52,96,136,255,212,44,136,255,67,209,131,255,252,130,23,255,219,128,20,255,198,129,118,0,108,101,11,0,178,5,146,1,62,7,100,255,181,236,94,254,28,26,164,0,76,22,112,255,120,102,79,0,202,192,229,1,200,176,215,0,41,64,244,255,206,184,78,0,167,45,63,1,160,35,0,255,59,12,142,255,204,9,144,255,219,94,229,1,122,27,112,0,189,105,109,255,64,208,74,255,251,127,55,1,2,226,198,0,44,76,209,0,151,152,77,255,210,23,46,1,201,171,69,255,44,211,231,0,190,37,224,255,245,196,62,255,169,181,222,255,34,211,17,0,119,241,197,255,229,35,152,1,21,69,40,255,178,226,161,0,148,179,193,0,219,194,254,1,40,206,51,255,231,92,250,1,67,153,170,0,21,148,241,0,170,69,82,255,121,18,231,255,92,114,3,0,184,62,230,0,225,201,87,255,146,96,162,255,181,242,220,0,173,187,221,1,226,62,170,255,56,126,217,1,117,13,227,255,179,44,239,0,157,141,155,255,144,221,83,0,235,209,208,0,42,17,165,1,251,81,133,0,124,245,201,254,97,211,24,255,83,214,166,0,154,36,9,255,248,47,127,0,90,219,140,255,161,217,38,254,212,147,63,255,66,84,148,1,207,3,1,0,230,134,89,1,127,78,122,255,224,155,1,255,82,136,74,0,178,156,208,255,186,25,49,255,222,3,210,1,229,150,190,255,85,162,52,255,41,84,141,255,73,123,84,254,93,17,150,0,119,19,28,1,32,22,215,255,28,23,204,255,142,241,52,255,228,52,125,0,29,76,207,0,215,167,250,254,175,164,230,0,55,207,105,1,109,187,245,255,161,44,220,1,41,101,128,255,167,16,94,0,93,214,107,255,118,72,0,254,80,61,234,255,121,175,125,0,139,169,251,0,97,39,147,254,250,196,49,255,165,179,110,254,223,70,187,255,22,142,125,1,154,179,138,255,118,176,42,1,10,174,153,0,156,92,102,0,168,13,161,255,143,16,32,0,250,197,180,255,203,163,44,1,87,32,36,0,161,153,20,255,123,252,15,0,25,227,80,0,60,88,142,0,17,22,201,1,154,205,77,255,39,63,47,0,8,122,141,0,128,23,182,254,204,39,19,255,4,112,29,255,23,36,140,255,210,234,116,254,53,50,63,255,121,171,104,255,160,219,94,0,87,82,14,254,231,42,5,0,165,139,127,254,86,78,38,0,130,60,66,254,203,30,45,255],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+20480);allocate([46,196,122,1,249,53,162,255,136,143,103,254,215,210,114,0,231,7,160,254,169,152,42,255,111,45,246,0,142,131,135,255,131,71,204,255,36,226,11,0,0,28,242,255,225,138,213,255,247,46,216,254,245,3,183,0,108,252,74,1,206,26,48,255,205,54,246,255,211,198,36,255,121,35,50,0,52,216,202,255,38,139,129,254,242,73,148,0,67,231,141,255,42,47,204,0,78,116,25,1,4,225,191,255,6,147,228,0,58,88,177,0,122,165,229,255,252,83,201,255,224,167,96,1,177,184,158,255,242,105,179,1,248,198,240,0,133,66,203,1,254,36,47,0,45,24,115,255,119,62,254,0,196,225,186,254,123,141,172,0,26,85,41,255,226,111,183,0,213,231,151,0,4,59,7,255,238,138,148,0,66,147,33,255,31,246,141,255,209,141,116,255,104,112,31,0,88,161,172,0,83,215,230,254,47,111,151,0,45,38,52,1,132,45,204,0,138,128,109,254,233,117,134,255,243,190,173,254,241,236,240,0,82,127,236,254,40,223,161,255,110,182,225,255,123,174,239,0,135,242,145,1,51,209,154,0,150,3,115,254,217,164,252,255,55,156,69,1,84,94,255,255,232,73,45,1,20,19,212,255,96,197,59,254,96,251,33,0,38,199,73,1,64,172,247,255,117,116,56,255,228,17,18,0,62,138,103,1,246,229,164,255,244,118,201,254,86,32,159,255,109,34,137,1,85,211,186,0,10,193,193,254,122,194,177,0,122,238,102,255,162,218,171,0,108,217,161,1,158,170,34,0,176,47,155,1,181,228,11,255,8,156,0,0,16,75,93,0,206,98,255,1,58,154,35,0,12,243,184,254,67,117,66,255,230,229,123,0,201,42,110,0,134,228,178,254,186,108,118,255,58,19,154,255,82,169,62,255,114,143,115,1,239,196,50,255,173,48,193,255,147,2,84,255,150,134,147,254,95,232,73,0,109,227,52,254,191,137,10,0,40,204,30,254,76,52,97,255,164,235,126,0,254,124,188,0,74,182,21,1,121,29,35,255,241,30,7,254,85,218,214,255,7,84,150,254,81,27,117,255,160,159,152,254,66,24,221,255,227,10,60,1,141,135,102,0,208,189,150,1,117,179,92,0,132,22,136,255,120,199,28,0,21,129,79,254,182,9,65,0,218,163,169,0,246,147,198,255,107,38,144,1,78,175,205,255,214,5,250,254,47,88,29,255,164,47,204,255,43,55,6,255,131,134,207,254,116,100,214,0,96,140,75,1,106,220,144,0,195,32,28,1,172,81,5,255,199,179,52,255,37,84,203,0,170,112,174,0,11,4,91,0,69,244,27,1,117,131,92,0,33,152,175,255,140,153,107,255,251,135,43,254,87,138,4,255,198,234,147,254,121,152,84,255,205,101,155,1,157,9,25,0,72,106,17,254,108,153,0,255,189,229,186,0,193,8,176,255,174,149,209,0,238,130,29,0,233,214,126,1,61,226,102,0,57,163,4,1,198,111,51,255,45,79,78,1,115,210,10,255,218,9,25,255,158,139,198,255,211,82,187,254,80,133,83,0,157,129,230,1,243,133,134,255,40,136,16,0,77,107,79,255,183,85,92,1,177,204,202,0,163,71,147,255,152,69,190,0,172,51,188,1,250,210,172,255,211,242,113,1,89,89,26,255,64,66,111,254,116,152,42,0,161,39,27,255,54,80,254,0,106,209,115,1,103,124,97,0,221,230,98,255,31,231,6,0,178,192,120,254,15,217,203,255,124,158,79,0,112,145,247,0,92,250,48,1,163,181,193,255,37,47,142,254,144,189,165,255,46,146,240,0,6,75,128,0,41,157,200,254,87,121,213,0,1,113,236,0,5,45,250,0,144,12,82,0,31,108,231,0,225,239,119,255,167,7,189,255,187,228,132,255,110,189,34,0,94,44,204,1,162,52,197,0,78,188,241,254,57,20,141,0,244,146,47,1,206,100,51,0,125,107,148,254,27,195,77,0,152,253,90,1,7,143,144,255,51,37,31,0,34,119,38,255,7,197,118,0,153,188,211,0,151,20,116,254,245,65,52,255,180,253,110,1,47,177,209,0,161,99,17,255,118,222,202,0,125,179,252,1,123,54,126,255,145,57,191,0,55,186,121,0,10,243,138,0,205,211,229,255,125,156,241,254,148,156,185,255,227,19,188,255,124,41,32,255,31,34,206,254,17,57,83,0,204,22,37,255,42,96,98,0,119,102,184,1,3,190,28,0,110,82,218,255,200,204,192,255,201,145,118,0,117,204,146,0,132,32,98,1,192,194,121,0,106,161,248,1,237,88,124,0,23,212,26,0,205,171,90,255,248,48,216,1,141,37,230,255,124,203,0,254,158,168,30,255,214,248,21,0,112,187,7,255,75,133,239,255,74,227,243,255,250,147,70,0,214,120,162,0,167,9,179,255,22,158,18,0,218,77,209,1,97,109,81,255,244,33,179,255,57,52,57,255,65,172,210,255,249,71,209,255,142,169,238,0,158,189,153,255,174,254,103,254,98,33,14,0,141,76,230,255,113,139,52,255,15,58,212,0,168,215,201,255,248,204,215,1,223,68,160,255,57,154,183,254,47,231,121,0,106,166,137,0,81,136,138,0,165,43,51,0,231,139,61,0,57,95,59,254,118,98,25,255,151,63,236,1,94,190,250,255,169,185,114,1,5,250,58,255,75,105,97,1,215,223,134,0,113,99,163,1,128,62,112,0,99,106,147,0,163,195,10,0,33,205,182,0,214,14,174,255,129,38,231,255,53,182,223,0,98,42,159,255,247,13,40,0,188,210,177,1,6,21,0,255,255,61,148,254,137,45,129,255,89,26,116,254,126,38,114,0,251,50,242,254,121,134,128,255,204,249,167,254,165,235,215,0,202,177,243,0,133,141,62,0,240,130,190,1,110,175,255,0,0,20,146,1,37,210,121,255,7,39,130,0,142,250,84,255,141,200,207,0,9,95,104,255,11,244,174,0,134,232,126,0,167,1,123,254,16,193,149,255,232,233,239,1,213,70,112,255,252,116,160,254,242,222,220,255,205,85,227,0,7,185,58,0,118,247,63,1,116,77,177,255,62,245,200,254,63,18,37,255,107,53,232,254,50,221,211,0,162,219,7,254,2,94,43,0,182,62,182,254,160,78,200,255,135,140,170,0,235,184,228,0,175,53,138,254,80,58,77,255,152,201,2,1,63,196,34,0,5,30,184,0,171,176,154,0,121,59,206,0,38,99,39,0,172,80,77,254,0,134,151,0,186,33,241,254,94,253,223,255,44,114,252,0,108,126,57,255,201,40,13,255,39,229,27,255,39,239,23,1,151,121,51,255,153,150,248,0,10,234,174,255,118,246,4,254,200,245,38,0,69,161,242,1,16,178,150,0,113,56,130,0,171,31,105,0,26,88,108,255,49,42,106,0,251,169,66,0,69,93,149,0,20,57,254,0,164,25,111,0,90,188,90,255,204,4,197,0,40,213,50,1,212,96,132,255,88,138,180,254,228,146,124,255,184,246,247,0,65,117,86,255,253,102,210,254,254,121,36,0,137,115,3,255,60,24,216,0,134,18,29,0,59,226,97,0,176,142,71,0,7,209,161,0,189,84,51,254,155,250,72,0,213,84,235,255,45,222,224,0,238,148,143,255,170,42,53,255,78,167,117,0,186,0,40,255,125,177,103,255,69,225,66,0,227,7,88,1,75,172,6,0,169,45,227,1,16,36,70,255,50,2,9,255,139,193,22,0,143,183,231,254,218,69,50,0,236,56,161,1,213,131,42,0,138,145,44,254,136,229,40,255,49,63,35,255,61,145,245,255,101,192,2,254,232,167,113,0,152,104,38,1,121,185,218,0,121,139,211,254,119,240,35,0,65,189,217,254,187,179,162,255,160,187,230,0,62,248,14,255,60,78,97,0,255,247,163,255,225,59,91,255,107,71,58,255,241,47,33,1,50,117,236,0,219,177,63,254,244,90,179,0,35,194,215,255,189,67,50,255,23,135,129,0,104,189,37,255,185,57,194,0,35,62,231,255,220,248,108,0,12,231,178,0,143,80,91,1,131,93,101,255,144,39,2,1,255,250,178,0,5,17,236,254,139,32,46,0,204,188,38,254,245,115,52,255,191,113,73,254,191,108,69,255,22,69,245,1,23,203,178,0,170,99,170,0,65,248,111,0,37,108,153,255,64,37,69,0,0,88,62,254,89,148,144,255,191,68,224,1,241,39,53,0,41,203,237,255,145,126,194,255,221,42,253,255,25,99,151,0,97,253,223,1,74,115,49,255,6,175,72,255,59,176,203,0,124,183,249,1,228,228,99,0,129,12,207,254,168,192,195,255,204,176,16,254,152,234,171,0,77,37,85,255,33,120,135,255,142,194,227,1,31,214,58,0,213,187,125,255,232,46,60,255,190,116,42,254,151,178,19,255,51,62,237,254,204,236,193,0,194,232,60,0,172,34,157,255,189,16,184,254,103,3,95,255,141,233,36,254,41,25,11,255,21,195,166,0,118,245,45,0,67,213,149,255,159,12,18,255,187,164,227,1,160,25,5,0,12,78,195,1,43,197,225,0,48,142,41,254,196,155,60,255,223,199,18,1,145,136,156,0,252,117,169,254,145,226,238,0,239,23,107,0,109,181,188,255,230,112,49,254,73,170,237,255,231,183,227,255,80,220,20,0,194,107,127,1,127,205,101,0,46,52,197,1,210,171,36,255,88,3,90,255,56,151,141,0,96,187,255,255,42,78,200,0,254,70,70,1,244,125,168,0,204,68,138,1,124,215,70,0,102,66,200,254,17,52,228,0,117,220,143,254,203,248,123,0,56,18,174,255,186,151,164,255,51,232,208,1,160,228,43,255,249,29,25,1,68,190,63,0,103,230,9,106,133,174,103,187,114,243,110,60,58,245,79,165,127,82,14,81,140,104,5,155,171,217,131,31,25,205,224,91,152,47,138,66,145,68,55,113,207,251,192,181,165,219,181,233,91,194,86,57,241,17,241,89,164,130,63,146,213,94,28,171,152,170,7,216,1,91,131,18,190,133,49,36,195,125,12,85,116,93,190,114,254,177,222,128,167,6,220,155,116,241,155,193,193,105,155,228,134,71,190,239,198,157,193,15,204,161,12,36,111,44,233,45,170,132,116,74,220,169,176,92,218,136,249,118,82,81,62,152,109,198,49,168,200,39,3,176,199,127,89,191,243,11,224,198,71,145,167,213,81,99,202,6,103,41,41,20,133,10,183,39,56,33,27,46,252,109,44,77,19,13,56,83,84,115,10,101,187,10,106,118,46,201,194,129,133,44,114,146,161,232,191,162,75,102,26,168,112,139,75,194,163,81,108,199,25,232,146,209,36,6,153,214,133,53,14,244,112,160,106,16,22,193,164,25,8,108,55,30,76,119,72,39,181,188,176,52,179,12,28,57,74,170,216,78,79,202,156,91,243,111,46,104,238,130,143,116,111,99,165,120,20,120,200,132,8,2,199,140,250,255,190,144,235,108,80,164,247,163,249,190,242,120,113,198,104,109,97,99,115,104,97,53,49,50,50,53,54,0,99,117,114,118,101,50,53,53,49,57,120,115,97,108,115,97,50,48,112,111,108,121,49,51,48,53,0,83,45,62,98,117,102,108,101,110,32,60,61,32,66,76,65,75,69,50,66,95,66,76,79,67,75,66,89,84,69,83,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,47,98,108,97,107,101,50,98,47,114,101,102,47,98,108,97,107,101,50,98,45,114,101,102,46,99,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,95,95,102,105,110,97,108,0,111,117,116,108,101,110,32,60,61,32,85,73,78,84,56,95,77,65,88,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,47,98,108,97,107,101,50,98,47,114,101,102,47,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,46,99,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,0,107,101,121,108,101,110,32,60,61,32,85,73,78,84,56,95,77,65,88,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,95,115,97,108,116,95,112,101,114,115,111,110,97,108,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,95,105,110,105,116,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,95,105,110,105,116,95,115,97,108,116,95,112,101,114,115,111,110,97,108,0,99,114,121,112,116,111,95,103,101,110,101,114,105,99,104,97,115,104,95,98,108,97,107,101,50,98,95,102,105,110,97,108,0,115,104,97,53,49,50,0,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,98,108,97,107,101,50,98,0,112,111,108,121,49,51,48,53,0,36,97,114,103,111,110,50,105,0,36,118,61,0,36,109,61,0,44,116,61,0,44,112,61,0,36,97,114,103,111,110,50,105,36,118,61,0,36,97,114,103,111,110,50,105,36,0,97,114,103,111,110,50,105,0,46,47,48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,0,36,55,36,0,99,117,114,118,101,50,53,53,49,57,0,120,115,97,108,115,97,50,48,112,111,108,121,49,51,48,53,0,115,105,112,104,97,115,104,50,52,0,101,100,50,53,53,49,57,0,237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,120,115,97,108,115,97,50,48,0,106,115,0,123,32,114,101,116,117,114,110,32,77,111,100,117,108,101,46,103,101,116,82,97,110,100,111,109,86,97,108,117,101,40,41,59,32,125,0,123,32,105,102,32,40,77,111,100,117,108,101,46,103,101,116,82,97,110,100,111,109,86,97,108,117,101,32,61,61,61,32,117,110,100,101,102,105,110,101,100,41,32,123,32,116,114,121,32,123,32,118,97,114,32,119,105,110,100,111,119,95,32,61,32,34,111,98,106,101,99,116,34,32,61,61,61,32,116,121,112,101,111,102,32,119,105,110,100,111,119,32,63,32,119,105,110,100,111,119,32,58,32,115,101,108,102,44,32,99,114,121,112,116,111,95,32,61,32,116,121,112,101,111,102,32,119,105,110,100,111,119,95,46,99,114,121,112,116,111,32,33,61,61,32,34,117,110,100,101,102,105,110,101,100,34,32,63,32,119,105,110,100,111,119,95,46,99,114,121,112,116,111,32,58,32,119,105,110,100,111,119,95,46,109,115,67,114,121,112,116,111,44,32,114,97,110,100,111,109,86,97,108,117,101,115,83,116,97,110,100,97,114,100,32,61,32,102,117,110,99,116,105,111,110,40,41,32,123,32,118,97,114,32,98,117,102,32,61,32,110,101,119,32,85,105,110,116,51,50,65,114,114,97,121,40,49,41,59,32,99,114,121,112,116,111,95,46,103,101,116,82,97,110,100,111,109,86,97,108,117,101,115,40,98,117,102,41,59,32,114,101,116,117,114,110,32,98,117,102,91,48,93,32,62,62,62,32,48,59,32,125,59,32,114,97,110,100,111,109,86,97,108,117,101,115,83,116,97,110,100,97,114,100,40,41,59,32,77,111,100,117,108,101,46,103,101,116,82,97,110,100,111,109,86,97,108,117,101,32,61,32,114,97,110,100,111,109,86,97,108,117,101,115,83,116,97,110,100,97,114,100,59,32,125,32,99,97,116,99,104,32,40,101,41,32,123,32,116,114,121,32,123,32,118,97,114,32,99,114,121,112,116,111,32,61,32,114,101,113,117,105,114,101,40,39,99,114,121,112,116,111,39,41,44,32,114,97,110,100,111,109,86,97,108,117,101,78,111,100,101,74,83,32,61,32,102,117,110,99,116,105,111,110,40,41,32,123,32,118,97,114,32,98,117,102,32,61,32,99,114,121,112,116,111,46,114,97,110,100,111,109,66,121,116,101,115,40,52,41,59,32,114,101,116,117,114,110,32,40,98,117,102,91,48,93,32,60,60,32,50,52,32,124,32,98,117,102,91,49,93,32,60,60,32,49,54,32,124,32,98,117,102,91,50,93,32,60,60,32,56,32,124,32,98,117,102,91,51,93,41,32,62,62,62,32,48,59,32,125,59,32,114,97,110,100,111,109,86,97,108,117,101,78,111,100,101,74,83,40,41,59,32,77,111,100,117,108,101,46,103,101,116,82,97,110,100,111,109,86,97,108,117,101,32,61,32,114,97,110,100,111,109,86,97,108,117,101,78,111,100,101,74,83,59,32,125,32,99,97,116,99,104,32,40,101,41,32,123,32,116,104,114,111,119,32,39,78,111,32,115,101,99,117,114,101,32,114,97,110,100,111,109,32,110,117,109,98,101,114,32,103,101,110,101,114,97,116,111,114,32,102,111,117,110,100,39,59,32,125,32,125,32,125,32,125,0,98,117,102,95,108,101,110,32,60,61,32,83,73,90,69,95,77,65,88,0,114,97,110,100,111,109,98,121,116,101,115,47,114,97,110,100,111,109,98,121,116,101,115,46,99,0,114,97,110,100,111,109,98,121,116,101,115,0,49,46,48,46,49,50,0],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE+30720);var tempDoublePtr=STATICTOP;STATICTOP+=16;Module["_bitshift64Ashr"]=_bitshift64Ashr;Module["_i64Subtract"]=_i64Subtract;Module["_i64Add"]=_i64Add;Module["_memset"]=_memset;Module["_bitshift64Lshr"]=_bitshift64Lshr;Module["_bitshift64Shl"]=_bitshift64Shl;function _abort(){Module["abort"]()}function ___assert_fail(condition,filename,line,func){ABORT=true;throw"Assertion failed: "+Pointer_stringify(condition)+", at: "+[filename?Pointer_stringify(filename):"unknown filename",line,func?Pointer_stringify(func):"unknown function"]+" at "+stackTrace()}function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest);return dest}Module["_memcpy"]=_memcpy;var cttz_i8=allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0],"i8",ALLOC_STATIC);Module["_llvm_cttz_i32"]=_llvm_cttz_i32;Module["___udivmoddi4"]=___udivmoddi4;Module["___udivdi3"]=___udivdi3;Module["___muldsi3"]=___muldsi3;Module["___muldi3"]=___muldi3;function ___setErrNo(value){if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;return value}var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};function _sysconf(name){switch(name){case 30:return PAGE_SIZE;case 85:return totalMemory/PAGE_SIZE;case 132:case 133:case 12:case 137:case 138:case 15:case 235:case 16:case 17:case 18:case 19:case 20:case 149:case 13:case 10:case 236:case 153:case 9:case 21:case 22:case 159:case 154:case 14:case 77:case 78:case 139:case 80:case 81:case 82:case 68:case 67:case 164:case 11:case 29:case 47:case 48:case 95:case 52:case 51:case 46:return 200809;case 79:return 0;case 27:case 246:case 127:case 128:case 23:case 24:case 160:case 161:case 181:case 182:case 242:case 183:case 184:case 243:case 244:case 245:case 165:case 178:case 179:case 49:case 50:case 168:case 169:case 175:case 170:case 171:case 172:case 97:case 76:case 32:case 173:case 35:return-1;case 176:case 177:case 7:case 155:case 8:case 157:case 125:case 126:case 92:case 93:case 129:case 130:case 131:case 94:case 91:return 1;case 74:case 60:case 69:case 70:case 4:return 1024;case 31:case 42:case 72:return 32;case 87:case 26:case 33:return 2147483647;case 34:case 1:return 47839;case 38:case 36:return 99;case 43:case 37:return 2048;case 0:return 2097152;case 3:return 65536;case 28:return 32768;case 44:return 32767;case 75:return 16384;case 39:return 1e3;case 89:return 700;case 71:return 256;case 40:return 255;case 2:return 100;case 180:return 64;case 25:return 20;case 5:return 16;case 6:return 6;case 73:return 4;case 84:{if(typeof navigator==="object")return navigator["hardwareConcurrency"]||1;return 1}}___setErrNo(ERRNO_CODES.EINVAL);return-1}Module["_sbrk"]=_sbrk;Module["_memmove"]=_memmove;Module["___uremdi3"]=___uremdi3;DYNAMICTOP_PTR=allocate(1,"i32",ALLOC_STATIC);STACK_BASE=STACKTOP=Runtime.alignMemory(STATICTOP);STACK_MAX=STACK_BASE+TOTAL_STACK;DYNAMIC_BASE=Runtime.alignMemory(STACK_MAX);HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;staticSealed=true;Module.asmGlobalArg={"Math":Math,"Int8Array":Int8Array,"Int16Array":Int16Array,"Int32Array":Int32Array,"Uint8Array":Uint8Array,"Uint16Array":Uint16Array,"Uint32Array":Uint32Array,"Float32Array":Float32Array,"Float64Array":Float64Array,"NaN":NaN,"Infinity":Infinity};Module.asmLibraryArg={"abort":abort,"assert":assert,"enlargeMemory":enlargeMemory,"getTotalMemory":getTotalMemory,"abortOnCannotGrowMemory":abortOnCannotGrowMemory,"_emscripten_asm_const_i":_emscripten_asm_const_i,"_sysconf":_sysconf,"_abort":_abort,"___setErrNo":___setErrNo,"_emscripten_memcpy_big":_emscripten_memcpy_big,"_emscripten_asm_const_v":_emscripten_asm_const_v,"___assert_fail":___assert_fail,"STACKTOP":STACKTOP,"STACK_MAX":STACK_MAX,"DYNAMICTOP_PTR":DYNAMICTOP_PTR,"tempDoublePtr":tempDoublePtr,"ABORT":ABORT,"cttz_i8":cttz_i8};// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer) {
"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.STACKTOP|0;var j=env.STACK_MAX|0;var k=env.DYNAMICTOP_PTR|0;var l=env.tempDoublePtr|0;var m=env.ABORT|0;var n=env.cttz_i8|0;var o=0;var p=0;var q=0;var r=0;var s=global.NaN,t=global.Infinity;var u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;var D=0;var E=global.Math.floor;var F=global.Math.abs;var G=global.Math.sqrt;var H=global.Math.pow;var I=global.Math.cos;var J=global.Math.sin;var K=global.Math.tan;var L=global.Math.acos;var M=global.Math.asin;var N=global.Math.atan;var O=global.Math.atan2;var P=global.Math.exp;var Q=global.Math.log;var R=global.Math.ceil;var S=global.Math.imul;var T=global.Math.min;var U=global.Math.max;var V=global.Math.clz32;var W=env.abort;var X=env.assert;var Y=env.enlargeMemory;var Z=env.getTotalMemory;var _=env.abortOnCannotGrowMemory;var $=env._emscripten_asm_const_i;var aa=env._sysconf;var ba=env._abort;var ca=env.___setErrNo;var da=env._emscripten_memcpy_big;var ea=env._emscripten_asm_const_v;var fa=env.___assert_fail;var ga=0;
// EMSCRIPTEN_START_FUNCS
function ha(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0;O=i;P=i=i+63&-64;i=i+128|0;v=d[b>>0]|d[b+1>>0]<<8|d[b+2>>0]<<16|d[b+3>>0]<<24;H=d[b+4>>0]|d[b+4+1>>0]<<8|d[b+4+2>>0]<<16|d[b+4+3>>0]<<24;h=d[b+8>>0]|d[b+8+1>>0]<<8|d[b+8+2>>0]<<16|d[b+8+3>>0]<<24;j=d[b+8+4>>0]|d[b+8+4+1>>0]<<8|d[b+8+4+2>>0]<<16|d[b+8+4+3>>0]<<24;k=d[b+16>>0]|d[b+16+1>>0]<<8|d[b+16+2>>0]<<16|d[b+16+3>>0]<<24;l=d[b+16+4>>0]|d[b+16+4+1>>0]<<8|d[b+16+4+2>>0]<<16|d[b+16+4+3>>0]<<24;m=d[b+24>>0]|d[b+24+1>>0]<<8|d[b+24+2>>0]<<16|d[b+24+3>>0]<<24;n=d[b+24+4>>0]|d[b+24+4+1>>0]<<8|d[b+24+4+2>>0]<<16|d[b+24+4+3>>0]<<24;o=d[b+32>>0]|d[b+32+1>>0]<<8|d[b+32+2>>0]<<16|d[b+32+3>>0]<<24;p=d[b+32+4>>0]|d[b+32+4+1>>0]<<8|d[b+32+4+2>>0]<<16|d[b+32+4+3>>0]<<24;q=d[b+40>>0]|d[b+40+1>>0]<<8|d[b+40+2>>0]<<16|d[b+40+3>>0]<<24;r=d[b+40+4>>0]|d[b+40+4+1>>0]<<8|d[b+40+4+2>>0]<<16|d[b+40+4+3>>0]<<24;s=d[b+48>>0]|d[b+48+1>>0]<<8|d[b+48+2>>0]<<16|d[b+48+3>>0]<<24;t=d[b+48+4>>0]|d[b+48+4+1>>0]<<8|d[b+48+4+2>>0]<<16|d[b+48+4+3>>0]<<24;u=d[b+56>>0]|d[b+56+1>>0]<<8|d[b+56+2>>0]<<16|d[b+56+3>>0]<<24;w=d[b+56+4>>0]|d[b+56+4+1>>0]<<8|d[b+56+4+2>>0]<<16|d[b+56+4+3>>0]<<24;x=d[b+64>>0]|d[b+64+1>>0]<<8|d[b+64+2>>0]<<16|d[b+64+3>>0]<<24;y=d[b+64+4>>0]|d[b+64+4+1>>0]<<8|d[b+64+4+2>>0]<<16|d[b+64+4+3>>0]<<24;z=d[b+72>>0]|d[b+72+1>>0]<<8|d[b+72+2>>0]<<16|d[b+72+3>>0]<<24;A=d[b+72+4>>0]|d[b+72+4+1>>0]<<8|d[b+72+4+2>>0]<<16|d[b+72+4+3>>0]<<24;B=d[b+80>>0]|d[b+80+1>>0]<<8|d[b+80+2>>0]<<16|d[b+80+3>>0]<<24;C=d[b+80+4>>0]|d[b+80+4+1>>0]<<8|d[b+80+4+2>>0]<<16|d[b+80+4+3>>0]<<24;E=d[b+88>>0]|d[b+88+1>>0]<<8|d[b+88+2>>0]<<16|d[b+88+3>>0]<<24;F=d[b+88+4>>0]|d[b+88+4+1>>0]<<8|d[b+88+4+2>>0]<<16|d[b+88+4+3>>0]<<24;G=d[b+96>>0]|d[b+96+1>>0]<<8|d[b+96+2>>0]<<16|d[b+96+3>>0]<<24;I=d[b+96+4>>0]|d[b+96+4+1>>0]<<8|d[b+96+4+2>>0]<<16|d[b+96+4+3>>0]<<24;J=d[b+104>>0]|d[b+104+1>>0]<<8|d[b+104+2>>0]<<16|d[b+104+3>>0]<<24;K=d[b+104+4>>0]|d[b+104+4+1>>0]<<8|d[b+104+4+2>>0]<<16|d[b+104+4+3>>0]<<24;L=d[b+112>>0]|d[b+112+1>>0]<<8|d[b+112+2>>0]<<16|d[b+112+3>>0]<<24;M=d[b+112+4>>0]|d[b+112+4+1>>0]<<8|d[b+112+4+2>>0]<<16|d[b+112+4+3>>0]<<24;N=d[b+120>>0]|d[b+120+1>>0]<<8|d[b+120+2>>0]<<16|d[b+120+3>>0]<<24;b=d[b+120+4>>0]|d[b+120+4+1>>0]<<8|d[b+120+4+2>>0]<<16|d[b+120+4+3>>0]<<24;e=P;f=a;g=e+64|0;do{c[e>>2]=c[f>>2];e=e+4|0;f=f+4|0}while((e|0)<(g|0));c[P+80>>2]=-23791573;c[P+80+4>>2]=1013904242;c[P+88>>2]=1595750129;c[P+88+4>>2]=-1521486534;Y=c[a+64>>2]^-1377402159;ha=c[a+64+4>>2]^1359893119;$=c[a+72>>2]^725511199;R=c[a+72+4>>2]^-1694144372;V=c[a+80>>2]^-79577749;ba=c[a+80+4>>2]^528734635;ka=c[a+88>>2]^327033209;ga=c[a+88+4>>2]^1541459225;c[P+120>>2]=ka;c[P+120+4>>2]=ga;X=c[P+32>>2]|0;da=c[P+32+4>>2]|0;la=we(X|0,da|0,c[P>>2]|0,c[P+4>>2]|0)|0;la=we(la|0,D|0,v|0,H|0)|0;ja=D;U=we(ha^ja|0,Y^la|0,-205731576,1779033703)|0;ea=D;Z=Yd(X^U|0,da^ea|0,24)|0;e=D;da=Wd(X^U|0,da^ea|0,40)|0;e=D|e;X=we(da|Z|0,e|0,la|0,ja|0)|0;X=we(X|0,D|0,h|0,j|0)|0;Q=D;c[P>>2]=X;c[P+4>>2]=Q;_=Yd(ha^ja^X|0,Y^la^Q|0,16)|0;g=D;la=Wd(ha^ja^X|0,Y^la^Q|0,48)|0;g=D|g;c[P+96>>2]=la|_;c[P+96+4>>2]=g;ea=we(la|_|0,g|0,U|0,ea|0)|0;U=D;c[P+64>>2]=ea;c[P+64+4>>2]=U;g=Yd((da|Z)^ea|0,e^U|0,63)|0;_=D;U=Wd((da|Z)^ea|0,e^U|0,1)|0;c[P+32>>2]=U|g;c[P+32+4>>2]=D|_;_=c[P+40>>2]|0;g=c[P+40+4>>2]|0;U=we(_|0,g|0,c[P+8>>2]|0,c[P+8+4>>2]|0)|0;U=we(U|0,D|0,k|0,l|0)|0;e=D;ea=we(R^e|0,$^U|0,-2067093701,-1150833019)|0;Z=D;da=Yd(_^ea|0,g^Z|0,24)|0;la=D;g=Wd(_^ea|0,g^Z|0,40)|0;la=D|la;_=we(g|da|0,la|0,U|0,e|0)|0;_=we(_|0,D|0,m|0,n|0)|0;Y=D;c[P+8>>2]=_;c[P+8+4>>2]=Y;ja=Yd(R^e^_|0,$^U^Y|0,16)|0;ha=D;U=Wd(R^e^_|0,$^U^Y|0,48)|0;ha=D|ha;c[P+104>>2]=U|ja;c[P+104+4>>2]=ha;Z=we(U|ja|0,ha|0,ea|0,Z|0)|0;ea=D;c[P+72>>2]=Z;c[P+72+4>>2]=ea;ha=Yd((g|da)^Z|0,la^ea|0,63)|0;ja=D;ea=Wd((g|da)^Z|0,la^ea|0,1)|0;ja=D|ja;la=c[P+48>>2]|0;Z=c[P+48+4>>2]|0;da=we(la|0,Z|0,c[P+16>>2]|0,c[P+16+4>>2]|0)|0;da=we(da|0,D|0,o|0,p|0)|0;g=D;U=we(ba^g|0,V^da|0,-23791573,1013904242)|0;$=D;e=Yd(la^U|0,Z^$|0,24)|0;R=D;Z=Wd(la^U|0,Z^$|0,40)|0;R=D|R;la=we(Z|e|0,R|0,da|0,g|0)|0;la=we(la|0,D|0,q|0,r|0)|0;W=D;c[P+16>>2]=la;c[P+16+4>>2]=W;ia=Yd(ba^g^la|0,V^da^W|0,16)|0;fa=D;da=Wd(ba^g^la|0,V^da^W|0,48)|0;fa=D|fa;c[P+112>>2]=da|ia;c[P+112+4>>2]=fa;$=we(da|ia|0,fa|0,U|0,$|0)|0;U=D;fa=Yd((Z|e)^$|0,R^U|0,63)|0;ia=D;R=Wd((Z|e)^$|0,R^U|0,1)|0;ia=D|ia;e=c[P+56>>2]|0;Z=c[P+56+4>>2]|0;da=we(e|0,Z|0,c[P+24>>2]|0,c[P+24+4>>2]|0)|0;da=we(da|0,D|0,s|0,t|0)|0;V=D;g=we(ga^V|0,ka^da|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;ba=D;f=Yd(e^g|0,Z^ba|0,24)|0;aa=D;Z=Wd(e^g|0,Z^ba|0,40)|0;aa=D|aa;e=we(Z|f|0,aa|0,da|0,V|0)|0;e=we(e|0,D|0,u|0,w|0)|0;S=D;c[P+24>>2]=e;c[P+24+4>>2]=S;ca=Yd(ga^V^e|0,ka^da^S|0,16)|0;ma=D;da=Wd(ga^V^e|0,ka^da^S|0,48)|0;ma=D|ma;ba=we(da|ca|0,ma|0,g|0,ba|0)|0;g=D;ka=Yd((Z|f)^ba|0,aa^g|0,63)|0;V=D;aa=Wd((Z|f)^ba|0,aa^g|0,1)|0;V=D|V;Q=we(ea|ha|0,ja|0,X|0,Q|0)|0;Q=we(Q|0,D|0,x|0,y|0)|0;X=D;U=we(ma^X|0,(da|ca)^Q|0,$|0,U|0)|0;$=D;f=Yd((ea|ha)^U|0,ja^$|0,24)|0;Z=D;ja=Wd((ea|ha)^U|0,ja^$|0,40)|0;Z=D|Z;ha=we(ja|f|0,Z|0,Q|0,X|0)|0;ha=we(ha|0,D|0,z|0,A|0)|0;ea=D;c[P>>2]=ha;c[P+4>>2]=ea;ga=Yd(ma^X^ha|0,(da|ca)^Q^ea|0,16)|0;T=D;Q=Wd(ma^X^ha|0,(da|ca)^Q^ea|0,48)|0;T=D|T;c[P+120>>2]=Q|ga;c[P+120+4>>2]=T;$=we(Q|ga|0,T|0,U|0,$|0)|0;U=D;c[P+80>>2]=$;c[P+80+4>>2]=U;T=Yd((ja|f)^$|0,Z^U|0,63)|0;ga=D;U=Wd((ja|f)^$|0,Z^U|0,1)|0;c[P+40>>2]=U|T;c[P+40+4>>2]=D|ga;Y=we(R|fa|0,ia|0,_|0,Y|0)|0;Y=we(Y|0,D|0,B|0,C|0)|0;_=D;ga=c[P+96>>2]^Y;T=c[P+96+4>>2]^_;g=we(T|0,ga|0,ba|0,g|0)|0;ba=D;U=Yd((R|fa)^g|0,ia^ba|0,24)|0;Z=D;ia=Wd((R|fa)^g|0,ia^ba|0,40)|0;Z=D|Z;_=we(ia|U|0,Z|0,Y|0,_|0)|0;_=we(_|0,D|0,E|0,F|0)|0;Y=D;c[P+8>>2]=_;c[P+8+4>>2]=Y;fa=Yd(T^_|0,ga^Y|0,16)|0;R=D;ga=Wd(T^_|0,ga^Y|0,48)|0;R=D|R;ba=we(ga|fa|0,R|0,g|0,ba|0)|0;g=D;c[P+88>>2]=ba;c[P+88+4>>2]=g;T=Yd((ia|U)^ba|0,Z^g|0,63)|0;$=D;g=Wd((ia|U)^ba|0,Z^g|0,1)|0;c[P+48>>2]=g|T;c[P+48+4>>2]=D|$;W=we(aa|ka|0,V|0,la|0,W|0)|0;W=we(W|0,D|0,G|0,I|0)|0;la=D;$=c[P+104>>2]^W;T=c[P+104+4>>2]^la;g=we(T|0,$|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;Z=D;ba=Yd((aa|ka)^g|0,V^Z|0,24)|0;U=D;V=Wd((aa|ka)^g|0,V^Z|0,40)|0;U=D|U;la=we(V|ba|0,U|0,W|0,la|0)|0;la=we(la|0,D|0,J|0,K|0)|0;W=D;c[P+16>>2]=la;c[P+16+4>>2]=W;ka=Yd(T^la|0,$^W|0,16)|0;aa=D;$=Wd(T^la|0,$^W|0,48)|0;aa=D|aa;Z=we($|ka|0,aa|0,g|0,Z|0)|0;g=D;T=Yd((V|ba)^Z|0,U^g|0,63)|0;ia=D;U=Wd((V|ba)^Z|0,U^g|0,1)|0;c[P+56>>2]=U|T;c[P+56+4>>2]=D|ia;ia=c[P+32>>2]|0;T=c[P+32+4>>2]|0;S=we(ia|0,T|0,e|0,S|0)|0;S=we(S|0,D|0,L|0,M|0)|0;e=D;U=c[P+112>>2]^S;ba=c[P+112+4>>2]^e;V=we(ba|0,U|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;f=D;ja=Yd(ia^V|0,T^f|0,24)|0;Q=D;T=Wd(ia^V|0,T^f|0,40)|0;Q=D|Q;e=we(T|ja|0,Q|0,S|0,e|0)|0;e=we(e|0,D|0,N|0,b|0)|0;S=D;c[P+24>>2]=e;c[P+24+4>>2]=S;ia=Yd(ba^e|0,U^S|0,16)|0;ca=D;U=Wd(ba^e|0,U^S|0,48)|0;ca=D|ca;f=we(U|ia|0,ca|0,V|0,f|0)|0;V=D;ba=Yd((T|ja)^f|0,Q^V|0,63)|0;da=D;Q=Wd((T|ja)^f|0,Q^V|0,1)|0;da=D|da;ea=we(Q|ba|0,da|0,ha|0,ea|0)|0;ea=we(ea|0,D|0,L|0,M|0)|0;ha=D;g=we(R^ha|0,(ga|fa)^ea|0,Z|0,g|0)|0;Z=D;ja=Yd((Q|ba)^g|0,da^Z|0,24)|0;T=D;da=Wd((Q|ba)^g|0,da^Z|0,40)|0;T=D|T;ba=we(da|ja|0,T|0,ea|0,ha|0)|0;ba=we(ba|0,D|0,B|0,C|0)|0;Q=D;c[P>>2]=ba;c[P+4>>2]=Q;X=Yd(R^ha^ba|0,(ga|fa)^ea^Q|0,16)|0;ma=D;ea=Wd(R^ha^ba|0,(ga|fa)^ea^Q|0,48)|0;ma=D|ma;c[P+96>>2]=ea|X;c[P+96+4>>2]=ma;Z=we(ea|X|0,ma|0,g|0,Z|0)|0;g=D;c[P+64>>2]=Z;c[P+64+4>>2]=g;ma=Yd((da|ja)^Z|0,T^g|0,63)|0;X=D;g=Wd((da|ja)^Z|0,T^g|0,1)|0;c[P+32>>2]=g|ma;c[P+32+4>>2]=D|X;X=c[P+40>>2]|0;ma=c[P+40+4>>2]|0;Y=we(X|0,ma|0,_|0,Y|0)|0;Y=we(Y|0,D|0,o|0,p|0)|0;_=D;V=we(aa^_|0,($|ka)^Y|0,f|0,V|0)|0;f=D;g=Yd(X^V|0,ma^f|0,24)|0;T=D;ma=Wd(X^V|0,ma^f|0,40)|0;T=D|T;X=we(ma|g|0,T|0,Y|0,_|0)|0;X=we(X|0,D|0,x|0,y|0)|0;Z=D;c[P+8>>2]=X;c[P+8+4>>2]=Z;ja=Yd(aa^_^X|0,($|ka)^Y^Z|0,16)|0;da=D;Y=Wd(aa^_^X|0,($|ka)^Y^Z|0,48)|0;da=D|da;c[P+104>>2]=Y|ja;c[P+104+4>>2]=da;f=we(Y|ja|0,da|0,V|0,f|0)|0;V=D;c[P+72>>2]=f;c[P+72+4>>2]=V;da=Yd((ma|g)^f|0,T^V|0,63)|0;ja=D;V=Wd((ma|g)^f|0,T^V|0,1)|0;ja=D|ja;T=c[P+48>>2]|0;f=c[P+48+4>>2]|0;W=we(T|0,f|0,la|0,W|0)|0;W=we(W|0,D|0,z|0,A|0)|0;la=D;g=we(ca^la|0,(U|ia)^W|0,c[P+80>>2]|0,c[P+80+4>>2]|0)|0;ma=D;Y=Yd(T^g|0,f^ma|0,24)|0;ka=D;f=Wd(T^g|0,f^ma|0,40)|0;ka=D|ka;T=we(f|Y|0,ka|0,W|0,la|0)|0;T=we(T|0,D|0,N|0,b|0)|0;$=D;c[P+16>>2]=T;c[P+16+4>>2]=$;_=Yd(ca^la^T|0,(U|ia)^W^$|0,16)|0;aa=D;W=Wd(ca^la^T|0,(U|ia)^W^$|0,48)|0;aa=D|aa;c[P+112>>2]=W|_;c[P+112+4>>2]=aa;ma=we(W|_|0,aa|0,g|0,ma|0)|0;g=D;aa=Yd((f|Y)^ma|0,ka^g|0,63)|0;_=D;ka=Wd((f|Y)^ma|0,ka^g|0,1)|0;_=D|_;Y=c[P+56>>2]|0;f=c[P+56+4>>2]|0;S=we(Y|0,f|0,e|0,S|0)|0;S=we(S|0,D|0,J|0,K|0)|0;e=D;W=c[P+120>>2]^S;ia=c[P+120+4>>2]^e;U=we(ia|0,W|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;la=D;ca=Yd(Y^U|0,f^la|0,24)|0;ea=D;f=Wd(Y^U|0,f^la|0,40)|0;ea=D|ea;e=we(f|ca|0,ea|0,S|0,e|0)|0;e=we(e|0,D|0,s|0,t|0)|0;S=D;c[P+24>>2]=e;c[P+24+4>>2]=S;Y=Yd(ia^e|0,W^S|0,16)|0;fa=D;W=Wd(ia^e|0,W^S|0,48)|0;fa=D|fa;la=we(W|Y|0,fa|0,U|0,la|0)|0;U=D;ia=Yd((f|ca)^la|0,ea^U|0,63)|0;ga=D;ea=Wd((f|ca)^la|0,ea^U|0,1)|0;ga=D|ga;Q=we(V|da|0,ja|0,ba|0,Q|0)|0;Q=we(Q|0,D|0,h|0,j|0)|0;ba=D;g=we(fa^ba|0,(W|Y)^Q|0,ma|0,g|0)|0;ma=D;ca=Yd((V|da)^g|0,ja^ma|0,24)|0;f=D;ja=Wd((V|da)^g|0,ja^ma|0,40)|0;f=D|f;da=we(ja|ca|0,f|0,Q|0,ba|0)|0;da=we(da|0,D|0,G|0,I|0)|0;V=D;c[P>>2]=da;c[P+4>>2]=V;ha=Yd(fa^ba^da|0,(W|Y)^Q^V|0,16)|0;R=D;Q=Wd(fa^ba^da|0,(W|Y)^Q^V|0,48)|0;R=D|R;c[P+120>>2]=Q|ha;c[P+120+4>>2]=R;ma=we(Q|ha|0,R|0,g|0,ma|0)|0;g=D;c[P+80>>2]=ma;c[P+80+4>>2]=g;R=Yd((ja|ca)^ma|0,f^g|0,63)|0;ha=D;g=Wd((ja|ca)^ma|0,f^g|0,1)|0;c[P+40>>2]=g|R;c[P+40+4>>2]=D|ha;Z=we(ka|aa|0,_|0,X|0,Z|0)|0;Z=we(Z|0,D|0,v|0,H|0)|0;X=D;ha=c[P+96>>2]^Z;R=c[P+96+4>>2]^X;U=we(R|0,ha|0,la|0,U|0)|0;la=D;g=Yd((ka|aa)^U|0,_^la|0,24)|0;f=D;_=Wd((ka|aa)^U|0,_^la|0,40)|0;f=D|f;X=we(_|g|0,f|0,Z|0,X|0)|0;X=we(X|0,D|0,k|0,l|0)|0;Z=D;c[P+8>>2]=X;c[P+8+4>>2]=Z;aa=Yd(R^X|0,ha^Z|0,16)|0;ka=D;ha=Wd(R^X|0,ha^Z|0,48)|0;ka=D|ka;la=we(ha|aa|0,ka|0,U|0,la|0)|0;U=D;c[P+88>>2]=la;c[P+88+4>>2]=U;R=Yd((_|g)^la|0,f^U|0,63)|0;ma=D;U=Wd((_|g)^la|0,f^U|0,1)|0;c[P+48>>2]=U|R;c[P+48+4>>2]=D|ma;$=we(ea|ia|0,ga|0,T|0,$|0)|0;$=we($|0,D|0,E|0,F|0)|0;T=D;ma=c[P+104>>2]^$;R=c[P+104+4>>2]^T;U=we(R|0,ma|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;f=D;la=Yd((ea|ia)^U|0,ga^f|0,24)|0;g=D;ga=Wd((ea|ia)^U|0,ga^f|0,40)|0;g=D|g;T=we(ga|la|0,g|0,$|0,T|0)|0;T=we(T|0,D|0,u|0,w|0)|0;$=D;c[P+16>>2]=T;c[P+16+4>>2]=$;ia=Yd(R^T|0,ma^$|0,16)|0;ea=D;ma=Wd(R^T|0,ma^$|0,48)|0;ea=D|ea;f=we(ma|ia|0,ea|0,U|0,f|0)|0;U=D;R=Yd((ga|la)^f|0,g^U|0,63)|0;_=D;g=Wd((ga|la)^f|0,g^U|0,1)|0;c[P+56>>2]=g|R;c[P+56+4>>2]=D|_;_=c[P+32>>2]|0;R=c[P+32+4>>2]|0;S=we(_|0,R|0,e|0,S|0)|0;S=we(S|0,D|0,q|0,r|0)|0;e=D;g=c[P+112>>2]^S;la=c[P+112+4>>2]^e;ga=we(la|0,g|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;ca=D;ja=Yd(_^ga|0,R^ca|0,24)|0;Q=D;R=Wd(_^ga|0,R^ca|0,40)|0;Q=D|Q;e=we(R|ja|0,Q|0,S|0,e|0)|0;e=we(e|0,D|0,m|0,n|0)|0;S=D;c[P+24>>2]=e;c[P+24+4>>2]=S;_=Yd(la^e|0,g^S|0,16)|0;Y=D;g=Wd(la^e|0,g^S|0,48)|0;Y=D|Y;ca=we(g|_|0,Y|0,ga|0,ca|0)|0;ga=D;la=Yd((R|ja)^ca|0,Q^ga|0,63)|0;W=D;Q=Wd((R|ja)^ca|0,Q^ga|0,1)|0;W=D|W;V=we(Q|la|0,W|0,da|0,V|0)|0;V=we(V|0,D|0,E|0,F|0)|0;da=D;U=we(ka^da|0,(ha|aa)^V|0,f|0,U|0)|0;f=D;ja=Yd((Q|la)^U|0,W^f|0,24)|0;R=D;W=Wd((Q|la)^U|0,W^f|0,40)|0;R=D|R;la=we(W|ja|0,R|0,V|0,da|0)|0;la=we(la|0,D|0,x|0,y|0)|0;Q=D;c[P>>2]=la;c[P+4>>2]=Q;ba=Yd(ka^da^la|0,(ha|aa)^V^Q|0,16)|0;fa=D;V=Wd(ka^da^la|0,(ha|aa)^V^Q|0,48)|0;fa=D|fa;c[P+96>>2]=V|ba;c[P+96+4>>2]=fa;f=we(V|ba|0,fa|0,U|0,f|0)|0;U=D;c[P+64>>2]=f;c[P+64+4>>2]=U;fa=Yd((W|ja)^f|0,R^U|0,63)|0;ba=D;U=Wd((W|ja)^f|0,R^U|0,1)|0;c[P+32>>2]=U|fa;c[P+32+4>>2]=D|ba;ba=c[P+40>>2]|0;fa=c[P+40+4>>2]|0;Z=we(ba|0,fa|0,X|0,Z|0)|0;Z=we(Z|0,D|0,G|0,I|0)|0;X=D;ga=we(ea^X|0,(ma|ia)^Z|0,ca|0,ga|0)|0;ca=D;U=Yd(ba^ga|0,fa^ca|0,24)|0;R=D;fa=Wd(ba^ga|0,fa^ca|0,40)|0;R=D|R;ba=we(fa|U|0,R|0,Z|0,X|0)|0;ba=we(ba|0,D|0,v|0,H|0)|0;f=D;c[P+8>>2]=ba;c[P+8+4>>2]=f;ja=Yd(ea^X^ba|0,(ma|ia)^Z^f|0,16)|0;W=D;Z=Wd(ea^X^ba|0,(ma|ia)^Z^f|0,48)|0;W=D|W;c[P+104>>2]=Z|ja;c[P+104+4>>2]=W;ca=we(Z|ja|0,W|0,ga|0,ca|0)|0;ga=D;c[P+72>>2]=ca;c[P+72+4>>2]=ga;W=Yd((fa|U)^ca|0,R^ga|0,63)|0;ja=D;ga=Wd((fa|U)^ca|0,R^ga|0,1)|0;ja=D|ja;R=c[P+48>>2]|0;ca=c[P+48+4>>2]|0;$=we(R|0,ca|0,T|0,$|0)|0;$=we($|0,D|0,q|0,r|0)|0;T=D;U=we(Y^T|0,(g|_)^$|0,c[P+80>>2]|0,c[P+80+4>>2]|0)|0;fa=D;Z=Yd(R^U|0,ca^fa|0,24)|0;ia=D;ca=Wd(R^U|0,ca^fa|0,40)|0;ia=D|ia;R=we(ca|Z|0,ia|0,$|0,T|0)|0;R=we(R|0,D|0,k|0,l|0)|0;ma=D;c[P+16>>2]=R;c[P+16+4>>2]=ma;X=Yd(Y^T^R|0,(g|_)^$^ma|0,16)|0;ea=D;$=Wd(Y^T^R|0,(g|_)^$^ma|0,48)|0;ea=D|ea;c[P+112>>2]=$|X;c[P+112+4>>2]=ea;fa=we($|X|0,ea|0,U|0,fa|0)|0;U=D;ea=Yd((ca|Z)^fa|0,ia^U|0,63)|0;X=D;ia=Wd((ca|Z)^fa|0,ia^U|0,1)|0;X=D|X;Z=c[P+56>>2]|0;ca=c[P+56+4>>2]|0;S=we(Z|0,ca|0,e|0,S|0)|0;S=we(S|0,D|0,N|0,b|0)|0;e=D;$=c[P+120>>2]^S;_=c[P+120+4>>2]^e;g=we(_|0,$|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;T=D;Y=Yd(Z^g|0,ca^T|0,24)|0;V=D;ca=Wd(Z^g|0,ca^T|0,40)|0;V=D|V;e=we(ca|Y|0,V|0,S|0,e|0)|0;e=we(e|0,D|0,J|0,K|0)|0;S=D;c[P+24>>2]=e;c[P+24+4>>2]=S;Z=Yd(_^e|0,$^S|0,16)|0;aa=D;$=Wd(_^e|0,$^S|0,48)|0;aa=D|aa;T=we($|Z|0,aa|0,g|0,T|0)|0;g=D;_=Yd((ca|Y)^T|0,V^g|0,63)|0;ha=D;V=Wd((ca|Y)^T|0,V^g|0,1)|0;ha=D|ha;Q=we(ga|W|0,ja|0,la|0,Q|0)|0;Q=we(Q|0,D|0,B|0,C|0)|0;la=D;U=we(aa^la|0,($|Z)^Q|0,fa|0,U|0)|0;fa=D;Y=Yd((ga|W)^U|0,ja^fa|0,24)|0;ca=D;ja=Wd((ga|W)^U|0,ja^fa|0,40)|0;ca=D|ca;W=we(ja|Y|0,ca|0,Q|0,la|0)|0;W=we(W|0,D|0,L|0,M|0)|0;ga=D;c[P>>2]=W;c[P+4>>2]=ga;da=Yd(aa^la^W|0,($|Z)^Q^ga|0,16)|0;ka=D;Q=Wd(aa^la^W|0,($|Z)^Q^ga|0,48)|0;ka=D|ka;c[P+120>>2]=Q|da;c[P+120+4>>2]=ka;fa=we(Q|da|0,ka|0,U|0,fa|0)|0;U=D;c[P+80>>2]=fa;c[P+80+4>>2]=U;ka=Yd((ja|Y)^fa|0,ca^U|0,63)|0;da=D;U=Wd((ja|Y)^fa|0,ca^U|0,1)|0;c[P+40>>2]=U|ka;c[P+40+4>>2]=D|da;f=we(ia|ea|0,X|0,ba|0,f|0)|0;f=we(f|0,D|0,m|0,n|0)|0;ba=D;da=c[P+96>>2]^f;ka=c[P+96+4>>2]^ba;g=we(ka|0,da|0,T|0,g|0)|0;T=D;U=Yd((ia|ea)^g|0,X^T|0,24)|0;ca=D;X=Wd((ia|ea)^g|0,X^T|0,40)|0;ca=D|ca;ba=we(X|U|0,ca|0,f|0,ba|0)|0;ba=we(ba|0,D|0,s|0,t|0)|0;f=D;c[P+8>>2]=ba;c[P+8+4>>2]=f;ea=Yd(ka^ba|0,da^f|0,16)|0;ia=D;da=Wd(ka^ba|0,da^f|0,48)|0;ia=D|ia;T=we(da|ea|0,ia|0,g|0,T|0)|0;g=D;c[P+88>>2]=T;c[P+88+4>>2]=g;ka=Yd((X|U)^T|0,ca^g|0,63)|0;fa=D;g=Wd((X|U)^T|0,ca^g|0,1)|0;c[P+48>>2]=g|ka;c[P+48+4>>2]=D|fa;ma=we(V|_|0,ha|0,R|0,ma|0)|0;ma=we(ma|0,D|0,u|0,w|0)|0;R=D;fa=c[P+104>>2]^ma;ka=c[P+104+4>>2]^R;g=we(ka|0,fa|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;ca=D;T=Yd((V|_)^g|0,ha^ca|0,24)|0;U=D;ha=Wd((V|_)^g|0,ha^ca|0,40)|0;U=D|U;R=we(ha|T|0,U|0,ma|0,R|0)|0;R=we(R|0,D|0,h|0,j|0)|0;ma=D;c[P+16>>2]=R;c[P+16+4>>2]=ma;_=Yd(ka^R|0,fa^ma|0,16)|0;V=D;fa=Wd(ka^R|0,fa^ma|0,48)|0;V=D|V;ca=we(fa|_|0,V|0,g|0,ca|0)|0;g=D;ka=Yd((ha|T)^ca|0,U^g|0,63)|0;X=D;U=Wd((ha|T)^ca|0,U^g|0,1)|0;c[P+56>>2]=U|ka;c[P+56+4>>2]=D|X;X=c[P+32>>2]|0;ka=c[P+32+4>>2]|0;S=we(X|0,ka|0,e|0,S|0)|0;S=we(S|0,D|0,z|0,A|0)|0;e=D;U=c[P+112>>2]^S;T=c[P+112+4>>2]^e;ha=we(T|0,U|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;Y=D;ja=Yd(X^ha|0,ka^Y|0,24)|0;Q=D;ka=Wd(X^ha|0,ka^Y|0,40)|0;Q=D|Q;e=we(ka|ja|0,Q|0,S|0,e|0)|0;e=we(e|0,D|0,o|0,p|0)|0;S=D;c[P+24>>2]=e;c[P+24+4>>2]=S;X=Yd(T^e|0,U^S|0,16)|0;Z=D;U=Wd(T^e|0,U^S|0,48)|0;Z=D|Z;Y=we(U|X|0,Z|0,ha|0,Y|0)|0;ha=D;T=Yd((ka|ja)^Y|0,Q^ha|0,63)|0;$=D;Q=Wd((ka|ja)^Y|0,Q^ha|0,1)|0;$=D|$;ga=we(Q|T|0,$|0,W|0,ga|0)|0;ga=we(ga|0,D|0,u|0,w|0)|0;W=D;g=we(ia^W|0,(da|ea)^ga|0,ca|0,g|0)|0;ca=D;ja=Yd((Q|T)^g|0,$^ca|0,24)|0;ka=D;$=Wd((Q|T)^g|0,$^ca|0,40)|0;ka=D|ka;T=we($|ja|0,ka|0,ga|0,W|0)|0;T=we(T|0,D|0,z|0,A|0)|0;Q=D;c[P>>2]=T;c[P+4>>2]=Q;la=Yd(ia^W^T|0,(da|ea)^ga^Q|0,16)|0;aa=D;ga=Wd(ia^W^T|0,(da|ea)^ga^Q|0,48)|0;aa=D|aa;c[P+96>>2]=ga|la;c[P+96+4>>2]=aa;ca=we(ga|la|0,aa|0,g|0,ca|0)|0;g=D;c[P+64>>2]=ca;c[P+64+4>>2]=g;aa=Yd(($|ja)^ca|0,ka^g|0,63)|0;la=D;g=Wd(($|ja)^ca|0,ka^g|0,1)|0;c[P+32>>2]=g|aa;c[P+32+4>>2]=D|la;la=c[P+40>>2]|0;aa=c[P+40+4>>2]|0;f=we(la|0,aa|0,ba|0,f|0)|0;f=we(f|0,D|0,m|0,n|0)|0;ba=D;ha=we(V^ba|0,(fa|_)^f|0,Y|0,ha|0)|0;Y=D;g=Yd(la^ha|0,aa^Y|0,24)|0;ka=D;aa=Wd(la^ha|0,aa^Y|0,40)|0;ka=D|ka;la=we(aa|g|0,ka|0,f|0,ba|0)|0;la=we(la|0,D|0,h|0,j|0)|0;ca=D;c[P+8>>2]=la;c[P+8+4>>2]=ca;ja=Yd(V^ba^la|0,(fa|_)^f^ca|0,16)|0;$=D;f=Wd(V^ba^la|0,(fa|_)^f^ca|0,48)|0;$=D|$;c[P+104>>2]=f|ja;c[P+104+4>>2]=$;Y=we(f|ja|0,$|0,ha|0,Y|0)|0;ha=D;c[P+72>>2]=Y;c[P+72+4>>2]=ha;$=Yd((aa|g)^Y|0,ka^ha|0,63)|0;ja=D;ha=Wd((aa|g)^Y|0,ka^ha|0,1)|0;ja=D|ja;ka=c[P+48>>2]|0;Y=c[P+48+4>>2]|0;ma=we(ka|0,Y|0,R|0,ma|0)|0;ma=we(ma|0,D|0,J|0,K|0)|0;R=D;g=we(Z^R|0,(U|X)^ma|0,c[P+80>>2]|0,c[P+80+4>>2]|0)|0;aa=D;f=Yd(ka^g|0,Y^aa|0,24)|0;_=D;Y=Wd(ka^g|0,Y^aa|0,40)|0;_=D|_;ka=we(Y|f|0,_|0,ma|0,R|0)|0;ka=we(ka|0,D|0,G|0,I|0)|0;fa=D;c[P+16>>2]=ka;c[P+16+4>>2]=fa;ba=Yd(Z^R^ka|0,(U|X)^ma^fa|0,16)|0;V=D;ma=Wd(Z^R^ka|0,(U|X)^ma^fa|0,48)|0;V=D|V;c[P+112>>2]=ma|ba;c[P+112+4>>2]=V;aa=we(ma|ba|0,V|0,g|0,aa|0)|0;g=D;V=Yd((Y|f)^aa|0,_^g|0,63)|0;ba=D;_=Wd((Y|f)^aa|0,_^g|0,1)|0;ba=D|ba;f=c[P+56>>2]|0;Y=c[P+56+4>>2]|0;S=we(f|0,Y|0,e|0,S|0)|0;S=we(S|0,D|0,E|0,F|0)|0;e=D;ma=c[P+120>>2]^S;X=c[P+120+4>>2]^e;U=we(X|0,ma|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;R=D;Z=Yd(f^U|0,Y^R|0,24)|0;ga=D;Y=Wd(f^U|0,Y^R|0,40)|0;ga=D|ga;e=we(Y|Z|0,ga|0,S|0,e|0)|0;e=we(e|0,D|0,L|0,M|0)|0;S=D;c[P+24>>2]=e;c[P+24+4>>2]=S;f=Yd(X^e|0,ma^S|0,16)|0;ea=D;ma=Wd(X^e|0,ma^S|0,48)|0;ea=D|ea;R=we(ma|f|0,ea|0,U|0,R|0)|0;U=D;X=Yd((Y|Z)^R|0,ga^U|0,63)|0;da=D;ga=Wd((Y|Z)^R|0,ga^U|0,1)|0;da=D|da;Q=we(ha|$|0,ja|0,T|0,Q|0)|0;Q=we(Q|0,D|0,k|0,l|0)|0;T=D;g=we(ea^T|0,(ma|f)^Q|0,aa|0,g|0)|0;aa=D;Z=Yd((ha|$)^g|0,ja^aa|0,24)|0;Y=D;ja=Wd((ha|$)^g|0,ja^aa|0,40)|0;Y=D|Y;$=we(ja|Z|0,Y|0,Q|0,T|0)|0;$=we($|0,D|0,s|0,t|0)|0;ha=D;c[P>>2]=$;c[P+4>>2]=ha;W=Yd(ea^T^$|0,(ma|f)^Q^ha|0,16)|0;ia=D;Q=Wd(ea^T^$|0,(ma|f)^Q^ha|0,48)|0;ia=D|ia;c[P+120>>2]=Q|W;c[P+120+4>>2]=ia;aa=we(Q|W|0,ia|0,g|0,aa|0)|0;g=D;c[P+80>>2]=aa;c[P+80+4>>2]=g;ia=Yd((ja|Z)^aa|0,Y^g|0,63)|0;W=D;g=Wd((ja|Z)^aa|0,Y^g|0,1)|0;c[P+40>>2]=g|ia;c[P+40+4>>2]=D|W;ca=we(_|V|0,ba|0,la|0,ca|0)|0;ca=we(ca|0,D|0,q|0,r|0)|0;la=D;W=c[P+96>>2]^ca;ia=c[P+96+4>>2]^la;U=we(ia|0,W|0,R|0,U|0)|0;R=D;g=Yd((_|V)^U|0,ba^R|0,24)|0;Y=D;ba=Wd((_|V)^U|0,ba^R|0,40)|0;Y=D|Y;la=we(ba|g|0,Y|0,ca|0,la|0)|0;la=we(la|0,D|0,B|0,C|0)|0;ca=D;c[P+8>>2]=la;c[P+8+4>>2]=ca;V=Yd(ia^la|0,W^ca|0,16)|0;_=D;W=Wd(ia^la|0,W^ca|0,48)|0;_=D|_;R=we(W|V|0,_|0,U|0,R|0)|0;U=D;c[P+88>>2]=R;c[P+88+4>>2]=U;ia=Yd((ba|g)^R|0,Y^U|0,63)|0;aa=D;U=Wd((ba|g)^R|0,Y^U|0,1)|0;c[P+48>>2]=U|ia;c[P+48+4>>2]=D|aa;fa=we(ga|X|0,da|0,ka|0,fa|0)|0;fa=we(fa|0,D|0,o|0,p|0)|0;ka=D;aa=c[P+104>>2]^fa;ia=c[P+104+4>>2]^ka;U=we(ia|0,aa|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;Y=D;R=Yd((ga|X)^U|0,da^Y|0,24)|0;g=D;da=Wd((ga|X)^U|0,da^Y|0,40)|0;g=D|g;ka=we(da|R|0,g|0,fa|0,ka|0)|0;ka=we(ka|0,D|0,v|0,H|0)|0;fa=D;c[P+16>>2]=ka;c[P+16+4>>2]=fa;X=Yd(ia^ka|0,aa^fa|0,16)|0;ga=D;aa=Wd(ia^ka|0,aa^fa|0,48)|0;ga=D|ga;Y=we(aa|X|0,ga|0,U|0,Y|0)|0;U=D;ia=Yd((da|R)^Y|0,g^U|0,63)|0;ba=D;g=Wd((da|R)^Y|0,g^U|0,1)|0;c[P+56>>2]=g|ia;c[P+56+4>>2]=D|ba;ba=c[P+32>>2]|0;ia=c[P+32+4>>2]|0;S=we(ba|0,ia|0,e|0,S|0)|0;S=we(S|0,D|0,N|0,b|0)|0;e=D;g=c[P+112>>2]^S;R=c[P+112+4>>2]^e;da=we(R|0,g|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;Z=D;ja=Yd(ba^da|0,ia^Z|0,24)|0;Q=D;ia=Wd(ba^da|0,ia^Z|0,40)|0;Q=D|Q;e=we(ia|ja|0,Q|0,S|0,e|0)|0;e=we(e|0,D|0,x|0,y|0)|0;S=D;c[P+24>>2]=e;c[P+24+4>>2]=S;ba=Yd(R^e|0,g^S|0,16)|0;f=D;g=Wd(R^e|0,g^S|0,48)|0;f=D|f;Z=we(g|ba|0,f|0,da|0,Z|0)|0;da=D;R=Yd((ia|ja)^Z|0,Q^da|0,63)|0;ma=D;Q=Wd((ia|ja)^Z|0,Q^da|0,1)|0;ma=D|ma;ha=we(Q|R|0,ma|0,$|0,ha|0)|0;ha=we(ha|0,D|0,z|0,A|0)|0;$=D;U=we(_^$|0,(W|V)^ha|0,Y|0,U|0)|0;Y=D;ja=Yd((Q|R)^U|0,ma^Y|0,24)|0;ia=D;ma=Wd((Q|R)^U|0,ma^Y|0,40)|0;ia=D|ia;R=we(ma|ja|0,ia|0,ha|0,$|0)|0;R=we(R|0,D|0,v|0,H|0)|0;Q=D;c[P>>2]=R;c[P+4>>2]=Q;T=Yd(_^$^R|0,(W|V)^ha^Q|0,16)|0;ea=D;ha=Wd(_^$^R|0,(W|V)^ha^Q|0,48)|0;ea=D|ea;c[P+96>>2]=ha|T;c[P+96+4>>2]=ea;Y=we(ha|T|0,ea|0,U|0,Y|0)|0;U=D;c[P+64>>2]=Y;c[P+64+4>>2]=U;ea=Yd((ma|ja)^Y|0,ia^U|0,63)|0;T=D;U=Wd((ma|ja)^Y|0,ia^U|0,1)|0;c[P+32>>2]=U|ea;c[P+32+4>>2]=D|T;T=c[P+40>>2]|0;ea=c[P+40+4>>2]|0;ca=we(T|0,ea|0,la|0,ca|0)|0;ca=we(ca|0,D|0,q|0,r|0)|0;la=D;da=we(ga^la|0,(aa|X)^ca|0,Z|0,da|0)|0;Z=D;U=Yd(T^da|0,ea^Z|0,24)|0;ia=D;ea=Wd(T^da|0,ea^Z|0,40)|0;ia=D|ia;T=we(ea|U|0,ia|0,ca|0,la|0)|0;T=we(T|0,D|0,u|0,w|0)|0;Y=D;c[P+8>>2]=T;c[P+8+4>>2]=Y;ja=Yd(ga^la^T|0,(aa|X)^ca^Y|0,16)|0;ma=D;ca=Wd(ga^la^T|0,(aa|X)^ca^Y|0,48)|0;ma=D|ma;c[P+104>>2]=ca|ja;c[P+104+4>>2]=ma;Z=we(ca|ja|0,ma|0,da|0,Z|0)|0;da=D;c[P+72>>2]=Z;c[P+72+4>>2]=da;ma=Yd((ea|U)^Z|0,ia^da|0,63)|0;ja=D;da=Wd((ea|U)^Z|0,ia^da|0,1)|0;ja=D|ja;ia=c[P+48>>2]|0;Z=c[P+48+4>>2]|0;fa=we(ia|0,Z|0,ka|0,fa|0)|0;fa=we(fa|0,D|0,k|0,l|0)|0;ka=D;U=we(f^ka|0,(g|ba)^fa|0,c[P+80>>2]|0,c[P+80+4>>2]|0)|0;ea=D;ca=Yd(ia^U|0,Z^ea|0,24)|0;X=D;Z=Wd(ia^U|0,Z^ea|0,40)|0;X=D|X;ia=we(Z|ca|0,X|0,fa|0,ka|0)|0;ia=we(ia|0,D|0,o|0,p|0)|0;aa=D;c[P+16>>2]=ia;c[P+16+4>>2]=aa;la=Yd(f^ka^ia|0,(g|ba)^fa^aa|0,16)|0;ga=D;fa=Wd(f^ka^ia|0,(g|ba)^fa^aa|0,48)|0;ga=D|ga;c[P+112>>2]=fa|la;c[P+112+4>>2]=ga;ea=we(fa|la|0,ga|0,U|0,ea|0)|0;U=D;ga=Yd((Z|ca)^ea|0,X^U|0,63)|0;la=D;X=Wd((Z|ca)^ea|0,X^U|0,1)|0;la=D|la;ca=c[P+56>>2]|0;Z=c[P+56+4>>2]|0;S=we(ca|0,Z|0,e|0,S|0)|0;S=we(S|0,D|0,B|0,C|0)|0;e=D;fa=c[P+120>>2]^S;ba=c[P+120+4>>2]^e;g=we(ba|0,fa|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;ka=D;f=Yd(ca^g|0,Z^ka|0,24)|0;ha=D;Z=Wd(ca^g|0,Z^ka|0,40)|0;ha=D|ha;e=we(Z|f|0,ha|0,S|0,e|0)|0;e=we(e|0,D|0,N|0,b|0)|0;S=D;c[P+24>>2]=e;c[P+24+4>>2]=S;ca=Yd(ba^e|0,fa^S|0,16)|0;V=D;fa=Wd(ba^e|0,fa^S|0,48)|0;V=D|V;ka=we(fa|ca|0,V|0,g|0,ka|0)|0;g=D;ba=Yd((Z|f)^ka|0,ha^g|0,63)|0;W=D;ha=Wd((Z|f)^ka|0,ha^g|0,1)|0;W=D|W;Q=we(da|ma|0,ja|0,R|0,Q|0)|0;Q=we(Q|0,D|0,L|0,M|0)|0;R=D;U=we(V^R|0,(fa|ca)^Q|0,ea|0,U|0)|0;ea=D;f=Yd((da|ma)^U|0,ja^ea|0,24)|0;Z=D;ja=Wd((da|ma)^U|0,ja^ea|0,40)|0;Z=D|Z;ma=we(ja|f|0,Z|0,Q|0,R|0)|0;ma=we(ma|0,D|0,h|0,j|0)|0;da=D;c[P>>2]=ma;c[P+4>>2]=da;$=Yd(V^R^ma|0,(fa|ca)^Q^da|0,16)|0;_=D;Q=Wd(V^R^ma|0,(fa|ca)^Q^da|0,48)|0;_=D|_;c[P+120>>2]=Q|$;c[P+120+4>>2]=_;ea=we(Q|$|0,_|0,U|0,ea|0)|0;U=D;c[P+80>>2]=ea;c[P+80+4>>2]=U;_=Yd((ja|f)^ea|0,Z^U|0,63)|0;$=D;U=Wd((ja|f)^ea|0,Z^U|0,1)|0;c[P+40>>2]=U|_;c[P+40+4>>2]=D|$;Y=we(X|ga|0,la|0,T|0,Y|0)|0;Y=we(Y|0,D|0,E|0,F|0)|0;T=D;$=c[P+96>>2]^Y;_=c[P+96+4>>2]^T;g=we(_|0,$|0,ka|0,g|0)|0;ka=D;U=Yd((X|ga)^g|0,la^ka|0,24)|0;Z=D;la=Wd((X|ga)^g|0,la^ka|0,40)|0;Z=D|Z;T=we(la|U|0,Z|0,Y|0,T|0)|0;T=we(T|0,D|0,G|0,I|0)|0;Y=D;c[P+8>>2]=T;c[P+8+4>>2]=Y;ga=Yd(_^T|0,$^Y|0,16)|0;X=D;$=Wd(_^T|0,$^Y|0,48)|0;X=D|X;ka=we($|ga|0,X|0,g|0,ka|0)|0;g=D;c[P+88>>2]=ka;c[P+88+4>>2]=g;_=Yd((la|U)^ka|0,Z^g|0,63)|0;ea=D;g=Wd((la|U)^ka|0,Z^g|0,1)|0;c[P+48>>2]=g|_;c[P+48+4>>2]=D|ea;aa=we(ha|ba|0,W|0,ia|0,aa|0)|0;aa=we(aa|0,D|0,s|0,t|0)|0;ia=D;ea=c[P+104>>2]^aa;_=c[P+104+4>>2]^ia;g=we(_|0,ea|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;Z=D;ka=Yd((ha|ba)^g|0,W^Z|0,24)|0;U=D;W=Wd((ha|ba)^g|0,W^Z|0,40)|0;U=D|U;ia=we(W|ka|0,U|0,aa|0,ia|0)|0;ia=we(ia|0,D|0,x|0,y|0)|0;aa=D;c[P+16>>2]=ia;c[P+16+4>>2]=aa;ba=Yd(_^ia|0,ea^aa|0,16)|0;ha=D;ea=Wd(_^ia|0,ea^aa|0,48)|0;ha=D|ha;Z=we(ea|ba|0,ha|0,g|0,Z|0)|0;g=D;_=Yd((W|ka)^Z|0,U^g|0,63)|0;la=D;U=Wd((W|ka)^Z|0,U^g|0,1)|0;c[P+56>>2]=U|_;c[P+56+4>>2]=D|la;la=c[P+32>>2]|0;_=c[P+32+4>>2]|0;S=we(la|0,_|0,e|0,S|0)|0;S=we(S|0,D|0,m|0,n|0)|0;e=D;U=c[P+112>>2]^S;ka=c[P+112+4>>2]^e;W=we(ka|0,U|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;f=D;ja=Yd(la^W|0,_^f|0,24)|0;Q=D;_=Wd(la^W|0,_^f|0,40)|0;Q=D|Q;e=we(_|ja|0,Q|0,S|0,e|0)|0;e=we(e|0,D|0,J|0,K|0)|0;S=D;c[P+24>>2]=e;c[P+24+4>>2]=S;la=Yd(ka^e|0,U^S|0,16)|0;ca=D;U=Wd(ka^e|0,U^S|0,48)|0;ca=D|ca;f=we(U|la|0,ca|0,W|0,f|0)|0;W=D;ka=Yd((_|ja)^f|0,Q^W|0,63)|0;fa=D;Q=Wd((_|ja)^f|0,Q^W|0,1)|0;fa=D|fa;da=we(Q|ka|0,fa|0,ma|0,da|0)|0;da=we(da|0,D|0,k|0,l|0)|0;ma=D;g=we(X^ma|0,($|ga)^da|0,Z|0,g|0)|0;Z=D;ja=Yd((Q|ka)^g|0,fa^Z|0,24)|0;_=D;fa=Wd((Q|ka)^g|0,fa^Z|0,40)|0;_=D|_;ka=we(fa|ja|0,_|0,da|0,ma|0)|0;ka=we(ka|0,D|0,G|0,I|0)|0;Q=D;c[P>>2]=ka;c[P+4>>2]=Q;R=Yd(X^ma^ka|0,($|ga)^da^Q|0,16)|0;V=D;da=Wd(X^ma^ka|0,($|ga)^da^Q|0,48)|0;V=D|V;c[P+96>>2]=da|R;c[P+96+4>>2]=V;Z=we(da|R|0,V|0,g|0,Z|0)|0;g=D;c[P+64>>2]=Z;c[P+64+4>>2]=g;V=Yd((fa|ja)^Z|0,_^g|0,63)|0;R=D;g=Wd((fa|ja)^Z|0,_^g|0,1)|0;c[P+32>>2]=g|V;c[P+32+4>>2]=D|R;R=c[P+40>>2]|0;V=c[P+40+4>>2]|0;Y=we(R|0,V|0,T|0,Y|0)|0;Y=we(Y|0,D|0,s|0,t|0)|0;T=D;W=we(ha^T|0,(ea|ba)^Y|0,f|0,W|0)|0;f=D;g=Yd(R^W|0,V^f|0,24)|0;_=D;V=Wd(R^W|0,V^f|0,40)|0;_=D|_;R=we(V|g|0,_|0,Y|0,T|0)|0;R=we(R|0,D|0,B|0,C|0)|0;Z=D;c[P+8>>2]=R;c[P+8+4>>2]=Z;ja=Yd(ha^T^R|0,(ea|ba)^Y^Z|0,16)|0;fa=D;Y=Wd(ha^T^R|0,(ea|ba)^Y^Z|0,48)|0;fa=D|fa;c[P+104>>2]=Y|ja;c[P+104+4>>2]=fa;f=we(Y|ja|0,fa|0,W|0,f|0)|0;W=D;c[P+72>>2]=f;c[P+72+4>>2]=W;fa=Yd((V|g)^f|0,_^W|0,63)|0;ja=D;W=Wd((V|g)^f|0,_^W|0,1)|0;ja=D|ja;_=c[P+48>>2]|0;f=c[P+48+4>>2]|0;aa=we(_|0,f|0,ia|0,aa|0)|0;aa=we(aa|0,D|0,v|0,H|0)|0;ia=D;g=we(ca^ia|0,(U|la)^aa|0,c[P+80>>2]|0,c[P+80+4>>2]|0)|0;V=D;Y=Yd(_^g|0,f^V|0,24)|0;ba=D;f=Wd(_^g|0,f^V|0,40)|0;ba=D|ba;_=we(f|Y|0,ba|0,aa|0,ia|0)|0;_=we(_|0,D|0,E|0,F|0)|0;ea=D;c[P+16>>2]=_;c[P+16+4>>2]=ea;T=Yd(ca^ia^_|0,(U|la)^aa^ea|0,16)|0;ha=D;aa=Wd(ca^ia^_|0,(U|la)^aa^ea|0,48)|0;ha=D|ha;c[P+112>>2]=aa|T;c[P+112+4>>2]=ha;V=we(aa|T|0,ha|0,g|0,V|0)|0;g=D;ha=Yd((f|Y)^V|0,ba^g|0,63)|0;T=D;ba=Wd((f|Y)^V|0,ba^g|0,1)|0;T=D|T;Y=c[P+56>>2]|0;f=c[P+56+4>>2]|0;S=we(Y|0,f|0,e|0,S|0)|0;S=we(S|0,D|0,x|0,y|0)|0;e=D;aa=c[P+120>>2]^S;la=c[P+120+4>>2]^e;U=we(la|0,aa|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;ia=D;ca=Yd(Y^U|0,f^ia|0,24)|0;da=D;f=Wd(Y^U|0,f^ia|0,40)|0;da=D|da;e=we(f|ca|0,da|0,S|0,e|0)|0;e=we(e|0,D|0,m|0,n|0)|0;S=D;c[P+24>>2]=e;c[P+24+4>>2]=S;Y=Yd(la^e|0,aa^S|0,16)|0;ga=D;aa=Wd(la^e|0,aa^S|0,48)|0;ga=D|ga;ia=we(aa|Y|0,ga|0,U|0,ia|0)|0;U=D;la=Yd((f|ca)^ia|0,da^U|0,63)|0;$=D;da=Wd((f|ca)^ia|0,da^U|0,1)|0;$=D|$;Q=we(W|fa|0,ja|0,ka|0,Q|0)|0;Q=we(Q|0,D|0,o|0,p|0)|0;ka=D;g=we(ga^ka|0,(aa|Y)^Q|0,V|0,g|0)|0;V=D;ca=Yd((W|fa)^g|0,ja^V|0,24)|0;f=D;ja=Wd((W|fa)^g|0,ja^V|0,40)|0;f=D|f;fa=we(ja|ca|0,f|0,Q|0,ka|0)|0;fa=we(fa|0,D|0,J|0,K|0)|0;W=D;c[P>>2]=fa;c[P+4>>2]=W;ma=Yd(ga^ka^fa|0,(aa|Y)^Q^W|0,16)|0;X=D;Q=Wd(ga^ka^fa|0,(aa|Y)^Q^W|0,48)|0;X=D|X;c[P+120>>2]=Q|ma;c[P+120+4>>2]=X;V=we(Q|ma|0,X|0,g|0,V|0)|0;g=D;c[P+80>>2]=V;c[P+80+4>>2]=g;X=Yd((ja|ca)^V|0,f^g|0,63)|0;ma=D;g=Wd((ja|ca)^V|0,f^g|0,1)|0;c[P+40>>2]=g|X;c[P+40+4>>2]=D|ma;Z=we(ba|ha|0,T|0,R|0,Z|0)|0;Z=we(Z|0,D|0,u|0,w|0)|0;R=D;ma=c[P+96>>2]^Z;X=c[P+96+4>>2]^R;U=we(X|0,ma|0,ia|0,U|0)|0;ia=D;g=Yd((ba|ha)^U|0,T^ia|0,24)|0;f=D;T=Wd((ba|ha)^U|0,T^ia|0,40)|0;f=D|f;R=we(T|g|0,f|0,Z|0,R|0)|0;R=we(R|0,D|0,q|0,r|0)|0;Z=D;c[P+8>>2]=R;c[P+8+4>>2]=Z;ha=Yd(X^R|0,ma^Z|0,16)|0;ba=D;ma=Wd(X^R|0,ma^Z|0,48)|0;ba=D|ba;ia=we(ma|ha|0,ba|0,U|0,ia|0)|0;U=D;c[P+88>>2]=ia;c[P+88+4>>2]=U;X=Yd((T|g)^ia|0,f^U|0,63)|0;V=D;U=Wd((T|g)^ia|0,f^U|0,1)|0;c[P+48>>2]=U|X;c[P+48+4>>2]=D|V;ea=we(da|la|0,$|0,_|0,ea|0)|0;ea=we(ea|0,D|0,N|0,b|0)|0;_=D;V=c[P+104>>2]^ea;X=c[P+104+4>>2]^_;U=we(X|0,V|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;f=D;ia=Yd((da|la)^U|0,$^f|0,24)|0;g=D;$=Wd((da|la)^U|0,$^f|0,40)|0;g=D|g;_=we($|ia|0,g|0,ea|0,_|0)|0;_=we(_|0,D|0,L|0,M|0)|0;ea=D;c[P+16>>2]=_;c[P+16+4>>2]=ea;la=Yd(X^_|0,V^ea|0,16)|0;da=D;V=Wd(X^_|0,V^ea|0,48)|0;da=D|da;f=we(V|la|0,da|0,U|0,f|0)|0;U=D;X=Yd(($|ia)^f|0,g^U|0,63)|0;T=D;g=Wd(($|ia)^f|0,g^U|0,1)|0;c[P+56>>2]=g|X;c[P+56+4>>2]=D|T;T=c[P+32>>2]|0;X=c[P+32+4>>2]|0;S=we(T|0,X|0,e|0,S|0)|0;S=we(S|0,D|0,h|0,j|0)|0;e=D;g=c[P+112>>2]^S;ia=c[P+112+4>>2]^e;$=we(ia|0,g|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;ca=D;ja=Yd(T^$|0,X^ca|0,24)|0;Q=D;X=Wd(T^$|0,X^ca|0,40)|0;Q=D|Q;e=we(X|ja|0,Q|0,S|0,e|0)|0;e=we(e|0,D|0,z|0,A|0)|0;S=D;c[P+24>>2]=e;c[P+24+4>>2]=S;T=Yd(ia^e|0,g^S|0,16)|0;Y=D;g=Wd(ia^e|0,g^S|0,48)|0;Y=D|Y;ca=we(g|T|0,Y|0,$|0,ca|0)|0;$=D;ia=Yd((X|ja)^ca|0,Q^$|0,63)|0;aa=D;Q=Wd((X|ja)^ca|0,Q^$|0,1)|0;aa=D|aa;W=we(Q|ia|0,aa|0,fa|0,W|0)|0;W=we(W|0,D|0,G|0,I|0)|0;fa=D;U=we(ba^fa|0,(ma|ha)^W|0,f|0,U|0)|0;f=D;ja=Yd((Q|ia)^U|0,aa^f|0,24)|0;X=D;aa=Wd((Q|ia)^U|0,aa^f|0,40)|0;X=D|X;ia=we(aa|ja|0,X|0,W|0,fa|0)|0;ia=we(ia|0,D|0,q|0,r|0)|0;Q=D;c[P>>2]=ia;c[P+4>>2]=Q;ka=Yd(ba^fa^ia|0,(ma|ha)^W^Q|0,16)|0;ga=D;W=Wd(ba^fa^ia|0,(ma|ha)^W^Q|0,48)|0;ga=D|ga;c[P+96>>2]=W|ka;c[P+96+4>>2]=ga;f=we(W|ka|0,ga|0,U|0,f|0)|0;U=D;c[P+64>>2]=f;c[P+64+4>>2]=U;ga=Yd((aa|ja)^f|0,X^U|0,63)|0;ka=D;U=Wd((aa|ja)^f|0,X^U|0,1)|0;c[P+32>>2]=U|ga;c[P+32+4>>2]=D|ka;ka=c[P+40>>2]|0;ga=c[P+40+4>>2]|0;Z=we(ka|0,ga|0,R|0,Z|0)|0;Z=we(Z|0,D|0,h|0,j|0)|0;R=D;$=we(da^R|0,(V|la)^Z|0,ca|0,$|0)|0;ca=D;U=Yd(ka^$|0,ga^ca|0,24)|0;X=D;ga=Wd(ka^$|0,ga^ca|0,40)|0;X=D|X;ka=we(ga|U|0,X|0,Z|0,R|0)|0;ka=we(ka|0,D|0,N|0,b|0)|0;f=D;c[P+8>>2]=ka;c[P+8+4>>2]=f;ja=Yd(da^R^ka|0,(V|la)^Z^f|0,16)|0;aa=D;Z=Wd(da^R^ka|0,(V|la)^Z^f|0,48)|0;aa=D|aa;c[P+104>>2]=Z|ja;c[P+104+4>>2]=aa;ca=we(Z|ja|0,aa|0,$|0,ca|0)|0;$=D;c[P+72>>2]=ca;c[P+72+4>>2]=$;aa=Yd((ga|U)^ca|0,X^$|0,63)|0;ja=D;$=Wd((ga|U)^ca|0,X^$|0,1)|0;ja=D|ja;X=c[P+48>>2]|0;ca=c[P+48+4>>2]|0;ea=we(X|0,ca|0,_|0,ea|0)|0;ea=we(ea|0,D|0,L|0,M|0)|0;_=D;U=we(Y^_|0,(g|T)^ea|0,c[P+80>>2]|0,c[P+80+4>>2]|0)|0;ga=D;Z=Yd(X^U|0,ca^ga|0,24)|0;la=D;ca=Wd(X^U|0,ca^ga|0,40)|0;la=D|la;X=we(ca|Z|0,la|0,ea|0,_|0)|0;X=we(X|0,D|0,J|0,K|0)|0;V=D;c[P+16>>2]=X;c[P+16+4>>2]=V;R=Yd(Y^_^X|0,(g|T)^ea^V|0,16)|0;da=D;ea=Wd(Y^_^X|0,(g|T)^ea^V|0,48)|0;da=D|da;c[P+112>>2]=ea|R;c[P+112+4>>2]=da;ga=we(ea|R|0,da|0,U|0,ga|0)|0;U=D;da=Yd((ca|Z)^ga|0,la^U|0,63)|0;R=D;la=Wd((ca|Z)^ga|0,la^U|0,1)|0;R=D|R;Z=c[P+56>>2]|0;ca=c[P+56+4>>2]|0;S=we(Z|0,ca|0,e|0,S|0)|0;S=we(S|0,D|0,o|0,p|0)|0;e=D;ea=c[P+120>>2]^S;T=c[P+120+4>>2]^e;g=we(T|0,ea|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;_=D;Y=Yd(Z^g|0,ca^_|0,24)|0;W=D;ca=Wd(Z^g|0,ca^_|0,40)|0;W=D|W;e=we(ca|Y|0,W|0,S|0,e|0)|0;e=we(e|0,D|0,B|0,C|0)|0;S=D;c[P+24>>2]=e;c[P+24+4>>2]=S;Z=Yd(T^e|0,ea^S|0,16)|0;ha=D;ea=Wd(T^e|0,ea^S|0,48)|0;ha=D|ha;_=we(ea|Z|0,ha|0,g|0,_|0)|0;g=D;T=Yd((ca|Y)^_|0,W^g|0,63)|0;ma=D;W=Wd((ca|Y)^_|0,W^g|0,1)|0;ma=D|ma;Q=we($|aa|0,ja|0,ia|0,Q|0)|0;Q=we(Q|0,D|0,v|0,H|0)|0;ia=D;U=we(ha^ia|0,(ea|Z)^Q|0,ga|0,U|0)|0;ga=D;Y=Yd(($|aa)^U|0,ja^ga|0,24)|0;ca=D;ja=Wd(($|aa)^U|0,ja^ga|0,40)|0;ca=D|ca;aa=we(ja|Y|0,ca|0,Q|0,ia|0)|0;aa=we(aa|0,D|0,u|0,w|0)|0;$=D;c[P>>2]=aa;c[P+4>>2]=$;fa=Yd(ha^ia^aa|0,(ea|Z)^Q^$|0,16)|0;ba=D;Q=Wd(ha^ia^aa|0,(ea|Z)^Q^$|0,48)|0;ba=D|ba;c[P+120>>2]=Q|fa;c[P+120+4>>2]=ba;ga=we(Q|fa|0,ba|0,U|0,ga|0)|0;U=D;c[P+80>>2]=ga;c[P+80+4>>2]=U;ba=Yd((ja|Y)^ga|0,ca^U|0,63)|0;fa=D;U=Wd((ja|Y)^ga|0,ca^U|0,1)|0;c[P+40>>2]=U|ba;c[P+40+4>>2]=D|fa;f=we(la|da|0,R|0,ka|0,f|0)|0;f=we(f|0,D|0,s|0,t|0)|0;ka=D;fa=c[P+96>>2]^f;ba=c[P+96+4>>2]^ka;g=we(ba|0,fa|0,_|0,g|0)|0;_=D;U=Yd((la|da)^g|0,R^_|0,24)|0;ca=D;R=Wd((la|da)^g|0,R^_|0,40)|0;ca=D|ca;ka=we(R|U|0,ca|0,f|0,ka|0)|0;ka=we(ka|0,D|0,m|0,n|0)|0;f=D;c[P+8>>2]=ka;c[P+8+4>>2]=f;da=Yd(ba^ka|0,fa^f|0,16)|0;la=D;fa=Wd(ba^ka|0,fa^f|0,48)|0;la=D|la;_=we(fa|da|0,la|0,g|0,_|0)|0;g=D;c[P+88>>2]=_;c[P+88+4>>2]=g;ba=Yd((R|U)^_|0,ca^g|0,63)|0;ga=D;g=Wd((R|U)^_|0,ca^g|0,1)|0;c[P+48>>2]=g|ba;c[P+48+4>>2]=D|ga;V=we(W|T|0,ma|0,X|0,V|0)|0;V=we(V|0,D|0,z|0,A|0)|0;X=D;ga=c[P+104>>2]^V;ba=c[P+104+4>>2]^X;g=we(ba|0,ga|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;ca=D;_=Yd((W|T)^g|0,ma^ca|0,24)|0;U=D;ma=Wd((W|T)^g|0,ma^ca|0,40)|0;U=D|U;X=we(ma|_|0,U|0,V|0,X|0)|0;X=we(X|0,D|0,k|0,l|0)|0;V=D;c[P+16>>2]=X;c[P+16+4>>2]=V;T=Yd(ba^X|0,ga^V|0,16)|0;W=D;ga=Wd(ba^X|0,ga^V|0,48)|0;W=D|W;ca=we(ga|T|0,W|0,g|0,ca|0)|0;g=D;ba=Yd((ma|_)^ca|0,U^g|0,63)|0;R=D;U=Wd((ma|_)^ca|0,U^g|0,1)|0;c[P+56>>2]=U|ba;c[P+56+4>>2]=D|R;R=c[P+32>>2]|0;ba=c[P+32+4>>2]|0;S=we(R|0,ba|0,e|0,S|0)|0;S=we(S|0,D|0,x|0,y|0)|0;e=D;U=c[P+112>>2]^S;_=c[P+112+4>>2]^e;ma=we(_|0,U|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;Y=D;ja=Yd(R^ma|0,ba^Y|0,24)|0;Q=D;ba=Wd(R^ma|0,ba^Y|0,40)|0;Q=D|Q;e=we(ba|ja|0,Q|0,S|0,e|0)|0;e=we(e|0,D|0,E|0,F|0)|0;S=D;c[P+24>>2]=e;c[P+24+4>>2]=S;R=Yd(_^e|0,U^S|0,16)|0;Z=D;U=Wd(_^e|0,U^S|0,48)|0;Z=D|Z;Y=we(U|R|0,Z|0,ma|0,Y|0)|0;ma=D;_=Yd((ba|ja)^Y|0,Q^ma|0,63)|0;ea=D;Q=Wd((ba|ja)^Y|0,Q^ma|0,1)|0;ea=D|ea;$=we(Q|_|0,ea|0,aa|0,$|0)|0;$=we($|0,D|0,J|0,K|0)|0;aa=D;g=we(la^aa|0,(fa|da)^$|0,ca|0,g|0)|0;ca=D;ja=Yd((Q|_)^g|0,ea^ca|0,24)|0;ba=D;ea=Wd((Q|_)^g|0,ea^ca|0,40)|0;ba=D|ba;_=we(ea|ja|0,ba|0,$|0,aa|0)|0;_=we(_|0,D|0,E|0,F|0)|0;Q=D;c[P>>2]=_;c[P+4>>2]=Q;ia=Yd(la^aa^_|0,(fa|da)^$^Q|0,16)|0;ha=D;$=Wd(la^aa^_|0,(fa|da)^$^Q|0,48)|0;ha=D|ha;c[P+96>>2]=$|ia;c[P+96+4>>2]=ha;ca=we($|ia|0,ha|0,g|0,ca|0)|0;g=D;c[P+64>>2]=ca;c[P+64+4>>2]=g;ha=Yd((ea|ja)^ca|0,ba^g|0,63)|0;ia=D;g=Wd((ea|ja)^ca|0,ba^g|0,1)|0;c[P+32>>2]=g|ha;c[P+32+4>>2]=D|ia;ia=c[P+40>>2]|0;ha=c[P+40+4>>2]|0;f=we(ia|0,ha|0,ka|0,f|0)|0;f=we(f|0,D|0,u|0,w|0)|0;ka=D;ma=we(W^ka|0,(ga|T)^f|0,Y|0,ma|0)|0;Y=D;g=Yd(ia^ma|0,ha^Y|0,24)|0;ba=D;ha=Wd(ia^ma|0,ha^Y|0,40)|0;ba=D|ba;ia=we(ha|g|0,ba|0,f|0,ka|0)|0;ia=we(ia|0,D|0,L|0,M|0)|0;ca=D;c[P+8>>2]=ia;c[P+8+4>>2]=ca;ja=Yd(W^ka^ia|0,(ga|T)^f^ca|0,16)|0;ea=D;f=Wd(W^ka^ia|0,(ga|T)^f^ca|0,48)|0;ea=D|ea;c[P+104>>2]=f|ja;c[P+104+4>>2]=ea;Y=we(f|ja|0,ea|0,ma|0,Y|0)|0;ma=D;c[P+72>>2]=Y;c[P+72+4>>2]=ma;ea=Yd((ha|g)^Y|0,ba^ma|0,63)|0;ja=D;ma=Wd((ha|g)^Y|0,ba^ma|0,1)|0;ja=D|ja;ba=c[P+48>>2]|0;Y=c[P+48+4>>2]|0;V=we(ba|0,Y|0,X|0,V|0)|0;V=we(V|0,D|0,G|0,I|0)|0;X=D;g=we(Z^X|0,(U|R)^V|0,c[P+80>>2]|0,c[P+80+4>>2]|0)|0;ha=D;f=Yd(ba^g|0,Y^ha|0,24)|0;T=D;Y=Wd(ba^g|0,Y^ha|0,40)|0;T=D|T;ba=we(Y|f|0,T|0,V|0,X|0)|0;ba=we(ba|0,D|0,h|0,j|0)|0;ga=D;c[P+16>>2]=ba;c[P+16+4>>2]=ga;ka=Yd(Z^X^ba|0,(U|R)^V^ga|0,16)|0;W=D;V=Wd(Z^X^ba|0,(U|R)^V^ga|0,48)|0;W=D|W;c[P+112>>2]=V|ka;c[P+112+4>>2]=W;ha=we(V|ka|0,W|0,g|0,ha|0)|0;g=D;W=Yd((Y|f)^ha|0,T^g|0,63)|0;ka=D;T=Wd((Y|f)^ha|0,T^g|0,1)|0;ka=D|ka;f=c[P+56>>2]|0;Y=c[P+56+4>>2]|0;S=we(f|0,Y|0,e|0,S|0)|0;S=we(S|0,D|0,m|0,n|0)|0;e=D;V=c[P+120>>2]^S;R=c[P+120+4>>2]^e;U=we(R|0,V|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;X=D;Z=Yd(f^U|0,Y^X|0,24)|0;$=D;Y=Wd(f^U|0,Y^X|0,40)|0;$=D|$;e=we(Y|Z|0,$|0,S|0,e|0)|0;e=we(e|0,D|0,z|0,A|0)|0;S=D;c[P+24>>2]=e;c[P+24+4>>2]=S;f=Yd(R^e|0,V^S|0,16)|0;da=D;V=Wd(R^e|0,V^S|0,48)|0;da=D|da;X=we(V|f|0,da|0,U|0,X|0)|0;U=D;R=Yd((Y|Z)^X|0,$^U|0,63)|0;fa=D;$=Wd((Y|Z)^X|0,$^U|0,1)|0;fa=D|fa;Q=we(ma|ea|0,ja|0,_|0,Q|0)|0;Q=we(Q|0,D|0,q|0,r|0)|0;_=D;g=we(da^_|0,(V|f)^Q|0,ha|0,g|0)|0;ha=D;Z=Yd((ma|ea)^g|0,ja^ha|0,24)|0;Y=D;ja=Wd((ma|ea)^g|0,ja^ha|0,40)|0;Y=D|Y;ea=we(ja|Z|0,Y|0,Q|0,_|0)|0;ea=we(ea|0,D|0,v|0,H|0)|0;ma=D;c[P>>2]=ea;c[P+4>>2]=ma;aa=Yd(da^_^ea|0,(V|f)^Q^ma|0,16)|0;la=D;Q=Wd(da^_^ea|0,(V|f)^Q^ma|0,48)|0;la=D|la;c[P+120>>2]=Q|aa;c[P+120+4>>2]=la;ha=we(Q|aa|0,la|0,g|0,ha|0)|0;g=D;c[P+80>>2]=ha;c[P+80+4>>2]=g;la=Yd((ja|Z)^ha|0,Y^g|0,63)|0;aa=D;g=Wd((ja|Z)^ha|0,Y^g|0,1)|0;c[P+40>>2]=g|la;c[P+40+4>>2]=D|aa;ca=we(T|W|0,ka|0,ia|0,ca|0)|0;ca=we(ca|0,D|0,N|0,b|0)|0;ia=D;aa=c[P+96>>2]^ca;la=c[P+96+4>>2]^ia;U=we(la|0,aa|0,X|0,U|0)|0;X=D;g=Yd((T|W)^U|0,ka^X|0,24)|0;Y=D;ka=Wd((T|W)^U|0,ka^X|0,40)|0;Y=D|Y;ia=we(ka|g|0,Y|0,ca|0,ia|0)|0;ia=we(ia|0,D|0,o|0,p|0)|0;ca=D;c[P+8>>2]=ia;c[P+8+4>>2]=ca;W=Yd(la^ia|0,aa^ca|0,16)|0;T=D;aa=Wd(la^ia|0,aa^ca|0,48)|0;T=D|T;X=we(aa|W|0,T|0,U|0,X|0)|0;U=D;c[P+88>>2]=X;c[P+88+4>>2]=U;la=Yd((ka|g)^X|0,Y^U|0,63)|0;ha=D;U=Wd((ka|g)^X|0,Y^U|0,1)|0;c[P+48>>2]=U|la;c[P+48+4>>2]=D|ha;ga=we($|R|0,fa|0,ba|0,ga|0)|0;ga=we(ga|0,D|0,x|0,y|0)|0;ba=D;ha=c[P+104>>2]^ga;la=c[P+104+4>>2]^ba;U=we(la|0,ha|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;Y=D;X=Yd(($|R)^U|0,fa^Y|0,24)|0;g=D;fa=Wd(($|R)^U|0,fa^Y|0,40)|0;g=D|g;ba=we(fa|X|0,g|0,ga|0,ba|0)|0;ba=we(ba|0,D|0,s|0,t|0)|0;ga=D;c[P+16>>2]=ba;c[P+16+4>>2]=ga;R=Yd(la^ba|0,ha^ga|0,16)|0;$=D;ha=Wd(la^ba|0,ha^ga|0,48)|0;$=D|$;Y=we(ha|R|0,$|0,U|0,Y|0)|0;U=D;la=Yd((fa|X)^Y|0,g^U|0,63)|0;ka=D;g=Wd((fa|X)^Y|0,g^U|0,1)|0;c[P+56>>2]=g|la;c[P+56+4>>2]=D|ka;ka=c[P+32>>2]|0;la=c[P+32+4>>2]|0;S=we(ka|0,la|0,e|0,S|0)|0;S=we(S|0,D|0,k|0,l|0)|0;e=D;g=c[P+112>>2]^S;X=c[P+112+4>>2]^e;fa=we(X|0,g|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;Z=D;ja=Yd(ka^fa|0,la^Z|0,24)|0;Q=D;la=Wd(ka^fa|0,la^Z|0,40)|0;Q=D|Q;e=we(la|ja|0,Q|0,S|0,e|0)|0;e=we(e|0,D|0,B|0,C|0)|0;S=D;c[P+24>>2]=e;c[P+24+4>>2]=S;ka=Yd(X^e|0,g^S|0,16)|0;f=D;g=Wd(X^e|0,g^S|0,48)|0;f=D|f;Z=we(g|ka|0,f|0,fa|0,Z|0)|0;fa=D;X=Yd((la|ja)^Z|0,Q^fa|0,63)|0;V=D;Q=Wd((la|ja)^Z|0,Q^fa|0,1)|0;V=D|V;ma=we(Q|X|0,V|0,ea|0,ma|0)|0;ma=we(ma|0,D|0,s|0,t|0)|0;ea=D;U=we(T^ea|0,(aa|W)^ma|0,Y|0,U|0)|0;Y=D;ja=Yd((Q|X)^U|0,V^Y|0,24)|0;la=D;V=Wd((Q|X)^U|0,V^Y|0,40)|0;la=D|la;X=we(V|ja|0,la|0,ma|0,ea|0)|0;X=we(X|0,D|0,N|0,b|0)|0;Q=D;c[P>>2]=X;c[P+4>>2]=Q;_=Yd(T^ea^X|0,(aa|W)^ma^Q|0,16)|0;da=D;ma=Wd(T^ea^X|0,(aa|W)^ma^Q|0,48)|0;da=D|da;c[P+96>>2]=ma|_;c[P+96+4>>2]=da;Y=we(ma|_|0,da|0,U|0,Y|0)|0;U=D;c[P+64>>2]=Y;c[P+64+4>>2]=U;da=Yd((V|ja)^Y|0,la^U|0,63)|0;_=D;U=Wd((V|ja)^Y|0,la^U|0,1)|0;c[P+32>>2]=U|da;c[P+32+4>>2]=D|_;_=c[P+40>>2]|0;da=c[P+40+4>>2]|0;ca=we(_|0,da|0,ia|0,ca|0)|0;ca=we(ca|0,D|0,L|0,M|0)|0;ia=D;fa=we($^ia|0,(ha|R)^ca|0,Z|0,fa|0)|0;Z=D;U=Yd(_^fa|0,da^Z|0,24)|0;la=D;da=Wd(_^fa|0,da^Z|0,40)|0;la=D|la;_=we(da|U|0,la|0,ca|0,ia|0)|0;_=we(_|0,D|0,z|0,A|0)|0;Y=D;c[P+8>>2]=_;c[P+8+4>>2]=Y;ja=Yd($^ia^_|0,(ha|R)^ca^Y|0,16)|0;V=D;ca=Wd($^ia^_|0,(ha|R)^ca^Y|0,48)|0;V=D|V;c[P+104>>2]=ca|ja;c[P+104+4>>2]=V;Z=we(ca|ja|0,V|0,fa|0,Z|0)|0;fa=D;c[P+72>>2]=Z;c[P+72+4>>2]=fa;V=Yd((da|U)^Z|0,la^fa|0,63)|0;ja=D;fa=Wd((da|U)^Z|0,la^fa|0,1)|0;ja=D|ja;la=c[P+48>>2]|0;Z=c[P+48+4>>2]|0;ga=we(la|0,Z|0,ba|0,ga|0)|0;ga=we(ga|0,D|0,E|0,F|0)|0;ba=D;U=we(f^ba|0,(g|ka)^ga|0,c[P+80>>2]|0,c[P+80+4>>2]|0)|0;da=D;ca=Yd(la^U|0,Z^da|0,24)|0;R=D;Z=Wd(la^U|0,Z^da|0,40)|0;R=D|R;la=we(Z|ca|0,R|0,ga|0,ba|0)|0;la=we(la|0,D|0,m|0,n|0)|0;ha=D;c[P+16>>2]=la;c[P+16+4>>2]=ha;ia=Yd(f^ba^la|0,(g|ka)^ga^ha|0,16)|0;$=D;ga=Wd(f^ba^la|0,(g|ka)^ga^ha|0,48)|0;$=D|$;c[P+112>>2]=ga|ia;c[P+112+4>>2]=$;da=we(ga|ia|0,$|0,U|0,da|0)|0;U=D;$=Yd((Z|ca)^da|0,R^U|0,63)|0;ia=D;R=Wd((Z|ca)^da|0,R^U|0,1)|0;ia=D|ia;ca=c[P+56>>2]|0;Z=c[P+56+4>>2]|0;S=we(ca|0,Z|0,e|0,S|0)|0;S=we(S|0,D|0,v|0,H|0)|0;e=D;ga=c[P+120>>2]^S;ka=c[P+120+4>>2]^e;g=we(ka|0,ga|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;ba=D;f=Yd(ca^g|0,Z^ba|0,24)|0;ma=D;Z=Wd(ca^g|0,Z^ba|0,40)|0;ma=D|ma;e=we(Z|f|0,ma|0,S|0,e|0)|0;e=we(e|0,D|0,x|0,y|0)|0;S=D;c[P+24>>2]=e;c[P+24+4>>2]=S;ca=Yd(ka^e|0,ga^S|0,16)|0;W=D;ga=Wd(ka^e|0,ga^S|0,48)|0;W=D|W;ba=we(ga|ca|0,W|0,g|0,ba|0)|0;g=D;ka=Yd((Z|f)^ba|0,ma^g|0,63)|0;aa=D;ma=Wd((Z|f)^ba|0,ma^g|0,1)|0;aa=D|aa;Q=we(fa|V|0,ja|0,X|0,Q|0)|0;Q=we(Q|0,D|0,G|0,I|0)|0;X=D;U=we(W^X|0,(ga|ca)^Q|0,da|0,U|0)|0;da=D;f=Yd((fa|V)^U|0,ja^da|0,24)|0;Z=D;ja=Wd((fa|V)^U|0,ja^da|0,40)|0;Z=D|Z;V=we(ja|f|0,Z|0,Q|0,X|0)|0;V=we(V|0,D|0,k|0,l|0)|0;fa=D;c[P>>2]=V;c[P+4>>2]=fa;ea=Yd(W^X^V|0,(ga|ca)^Q^fa|0,16)|0;T=D;Q=Wd(W^X^V|0,(ga|ca)^Q^fa|0,48)|0;T=D|T;c[P+120>>2]=Q|ea;c[P+120+4>>2]=T;da=we(Q|ea|0,T|0,U|0,da|0)|0;U=D;c[P+80>>2]=da;c[P+80+4>>2]=U;T=Yd((ja|f)^da|0,Z^U|0,63)|0;ea=D;U=Wd((ja|f)^da|0,Z^U|0,1)|0;c[P+40>>2]=U|T;c[P+40+4>>2]=D|ea;Y=we(R|$|0,ia|0,_|0,Y|0)|0;Y=we(Y|0,D|0,J|0,K|0)|0;_=D;ea=c[P+96>>2]^Y;T=c[P+96+4>>2]^_;g=we(T|0,ea|0,ba|0,g|0)|0;ba=D;U=Yd((R|$)^g|0,ia^ba|0,24)|0;Z=D;ia=Wd((R|$)^g|0,ia^ba|0,40)|0;Z=D|Z;_=we(ia|U|0,Z|0,Y|0,_|0)|0;_=we(_|0,D|0,u|0,w|0)|0;Y=D;c[P+8>>2]=_;c[P+8+4>>2]=Y;$=Yd(T^_|0,ea^Y|0,16)|0;R=D;ea=Wd(T^_|0,ea^Y|0,48)|0;R=D|R;ba=we(ea|$|0,R|0,g|0,ba|0)|0;g=D;c[P+88>>2]=ba;c[P+88+4>>2]=g;T=Yd((ia|U)^ba|0,Z^g|0,63)|0;da=D;g=Wd((ia|U)^ba|0,Z^g|0,1)|0;c[P+48>>2]=g|T;c[P+48+4>>2]=D|da;ha=we(ma|ka|0,aa|0,la|0,ha|0)|0;ha=we(ha|0,D|0,h|0,j|0)|0;la=D;da=c[P+104>>2]^ha;T=c[P+104+4>>2]^la;g=we(T|0,da|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;Z=D;ba=Yd((ma|ka)^g|0,aa^Z|0,24)|0;U=D;aa=Wd((ma|ka)^g|0,aa^Z|0,40)|0;U=D|U;la=we(aa|ba|0,U|0,ha|0,la|0)|0;la=we(la|0,D|0,o|0,p|0)|0;ha=D;c[P+16>>2]=la;c[P+16+4>>2]=ha;ka=Yd(T^la|0,da^ha|0,16)|0;ma=D;da=Wd(T^la|0,da^ha|0,48)|0;ma=D|ma;Z=we(da|ka|0,ma|0,g|0,Z|0)|0;g=D;T=Yd((aa|ba)^Z|0,U^g|0,63)|0;ia=D;U=Wd((aa|ba)^Z|0,U^g|0,1)|0;c[P+56>>2]=U|T;c[P+56+4>>2]=D|ia;ia=c[P+32>>2]|0;T=c[P+32+4>>2]|0;S=we(ia|0,T|0,e|0,S|0)|0;S=we(S|0,D|0,B|0,C|0)|0;e=D;U=c[P+112>>2]^S;ba=c[P+112+4>>2]^e;aa=we(ba|0,U|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;f=D;ja=Yd(ia^aa|0,T^f|0,24)|0;Q=D;T=Wd(ia^aa|0,T^f|0,40)|0;Q=D|Q;e=we(T|ja|0,Q|0,S|0,e|0)|0;e=we(e|0,D|0,q|0,r|0)|0;S=D;c[P+24>>2]=e;c[P+24+4>>2]=S;ia=Yd(ba^e|0,U^S|0,16)|0;ca=D;U=Wd(ba^e|0,U^S|0,48)|0;ca=D|ca;f=we(U|ia|0,ca|0,aa|0,f|0)|0;aa=D;ba=Yd((T|ja)^f|0,Q^aa|0,63)|0;ga=D;Q=Wd((T|ja)^f|0,Q^aa|0,1)|0;ga=D|ga;fa=we(Q|ba|0,ga|0,V|0,fa|0)|0;fa=we(fa|0,D|0,B|0,C|0)|0;V=D;g=we(R^V|0,(ea|$)^fa|0,Z|0,g|0)|0;Z=D;ja=Yd((Q|ba)^g|0,ga^Z|0,24)|0;T=D;ga=Wd((Q|ba)^g|0,ga^Z|0,40)|0;T=D|T;ba=we(ga|ja|0,T|0,fa|0,V|0)|0;ba=we(ba|0,D|0,k|0,l|0)|0;Q=D;c[P>>2]=ba;c[P+4>>2]=Q;X=Yd(R^V^ba|0,(ea|$)^fa^Q|0,16)|0;W=D;fa=Wd(R^V^ba|0,(ea|$)^fa^Q|0,48)|0;W=D|W;c[P+96>>2]=fa|X;c[P+96+4>>2]=W;Z=we(fa|X|0,W|0,g|0,Z|0)|0;g=D;c[P+64>>2]=Z;c[P+64+4>>2]=g;W=Yd((ga|ja)^Z|0,T^g|0,63)|0;X=D;g=Wd((ga|ja)^Z|0,T^g|0,1)|0;c[P+32>>2]=g|W;c[P+32+4>>2]=D|X;X=c[P+40>>2]|0;W=c[P+40+4>>2]|0;Y=we(X|0,W|0,_|0,Y|0)|0;Y=we(Y|0,D|0,x|0,y|0)|0;_=D;aa=we(ma^_|0,(da|ka)^Y|0,f|0,aa|0)|0;f=D;g=Yd(X^aa|0,W^f|0,24)|0;T=D;W=Wd(X^aa|0,W^f|0,40)|0;T=D|T;X=we(W|g|0,T|0,Y|0,_|0)|0;X=we(X|0,D|0,o|0,p|0)|0;Z=D;c[P+8>>2]=X;c[P+8+4>>2]=Z;ja=Yd(ma^_^X|0,(da|ka)^Y^Z|0,16)|0;ga=D;Y=Wd(ma^_^X|0,(da|ka)^Y^Z|0,48)|0;ga=D|ga;c[P+104>>2]=Y|ja;c[P+104+4>>2]=ga;f=we(Y|ja|0,ga|0,aa|0,f|0)|0;aa=D;c[P+72>>2]=f;c[P+72+4>>2]=aa;ga=Yd((W|g)^f|0,T^aa|0,63)|0;ja=D;aa=Wd((W|g)^f|0,T^aa|0,1)|0;ja=D|ja;T=c[P+48>>2]|0;f=c[P+48+4>>2]|0;ha=we(T|0,f|0,la|0,ha|0)|0;ha=we(ha|0,D|0,u|0,w|0)|0;la=D;g=we(ca^la|0,(U|ia)^ha|0,c[P+80>>2]|0,c[P+80+4>>2]|0)|0;W=D;Y=Yd(T^g|0,f^W|0,24)|0;ka=D;f=Wd(T^g|0,f^W|0,40)|0;ka=D|ka;T=we(f|Y|0,ka|0,ha|0,la|0)|0;T=we(T|0,D|0,s|0,t|0)|0;da=D;c[P+16>>2]=T;c[P+16+4>>2]=da;_=Yd(ca^la^T|0,(U|ia)^ha^da|0,16)|0;ma=D;ha=Wd(ca^la^T|0,(U|ia)^ha^da|0,48)|0;ma=D|ma;c[P+112>>2]=ha|_;c[P+112+4>>2]=ma;W=we(ha|_|0,ma|0,g|0,W|0)|0;g=D;ma=Yd((f|Y)^W|0,ka^g|0,63)|0;_=D;ka=Wd((f|Y)^W|0,ka^g|0,1)|0;_=D|_;Y=c[P+56>>2]|0;f=c[P+56+4>>2]|0;S=we(Y|0,f|0,e|0,S|0)|0;S=we(S|0,D|0,h|0,j|0)|0;e=D;ha=c[P+120>>2]^S;ia=c[P+120+4>>2]^e;U=we(ia|0,ha|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;la=D;ca=Yd(Y^U|0,f^la|0,24)|0;fa=D;f=Wd(Y^U|0,f^la|0,40)|0;fa=D|fa;e=we(f|ca|0,fa|0,S|0,e|0)|0;e=we(e|0,D|0,q|0,r|0)|0;S=D;c[P+24>>2]=e;c[P+24+4>>2]=S;Y=Yd(ia^e|0,ha^S|0,16)|0;$=D;ha=Wd(ia^e|0,ha^S|0,48)|0;$=D|$;la=we(ha|Y|0,$|0,U|0,la|0)|0;U=D;ia=Yd((f|ca)^la|0,fa^U|0,63)|0;ea=D;fa=Wd((f|ca)^la|0,fa^U|0,1)|0;ea=D|ea;Q=we(aa|ga|0,ja|0,ba|0,Q|0)|0;Q=we(Q|0,D|0,N|0,b|0)|0;ba=D;g=we($^ba|0,(ha|Y)^Q|0,W|0,g|0)|0;W=D;ca=Yd((aa|ga)^g|0,ja^W|0,24)|0;f=D;ja=Wd((aa|ga)^g|0,ja^W|0,40)|0;f=D|f;ga=we(ja|ca|0,f|0,Q|0,ba|0)|0;ga=we(ga|0,D|0,E|0,F|0)|0;aa=D;c[P>>2]=ga;c[P+4>>2]=aa;V=Yd($^ba^ga|0,(ha|Y)^Q^aa|0,16)|0;R=D;Q=Wd($^ba^ga|0,(ha|Y)^Q^aa|0,48)|0;R=D|R;c[P+120>>2]=Q|V;c[P+120+4>>2]=R;W=we(Q|V|0,R|0,g|0,W|0)|0;g=D;c[P+80>>2]=W;c[P+80+4>>2]=g;R=Yd((ja|ca)^W|0,f^g|0,63)|0;V=D;g=Wd((ja|ca)^W|0,f^g|0,1)|0;c[P+40>>2]=g|R;c[P+40+4>>2]=D|V;Z=we(ka|ma|0,_|0,X|0,Z|0)|0;Z=we(Z|0,D|0,z|0,A|0)|0;X=D;V=c[P+96>>2]^Z;R=c[P+96+4>>2]^X;U=we(R|0,V|0,la|0,U|0)|0;la=D;g=Yd((ka|ma)^U|0,_^la|0,24)|0;f=D;_=Wd((ka|ma)^U|0,_^la|0,40)|0;f=D|f;X=we(_|g|0,f|0,Z|0,X|0)|0;X=we(X|0,D|0,L|0,M|0)|0;Z=D;c[P+8>>2]=X;c[P+8+4>>2]=Z;ma=Yd(R^X|0,V^Z|0,16)|0;ka=D;V=Wd(R^X|0,V^Z|0,48)|0;ka=D|ka;la=we(V|ma|0,ka|0,U|0,la|0)|0;U=D;c[P+88>>2]=la;c[P+88+4>>2]=U;R=Yd((_|g)^la|0,f^U|0,63)|0;W=D;U=Wd((_|g)^la|0,f^U|0,1)|0;c[P+48>>2]=U|R;c[P+48+4>>2]=D|W;da=we(fa|ia|0,ea|0,T|0,da|0)|0;da=we(da|0,D|0,m|0,n|0)|0;T=D;W=c[P+104>>2]^da;R=c[P+104+4>>2]^T;U=we(R|0,W|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;f=D;la=Yd((fa|ia)^U|0,ea^f|0,24)|0;g=D;ea=Wd((fa|ia)^U|0,ea^f|0,40)|0;g=D|g;T=we(ea|la|0,g|0,da|0,T|0)|0;T=we(T|0,D|0,G|0,I|0)|0;da=D;c[P+16>>2]=T;c[P+16+4>>2]=da;ia=Yd(R^T|0,W^da|0,16)|0;fa=D;W=Wd(R^T|0,W^da|0,48)|0;fa=D|fa;f=we(W|ia|0,fa|0,U|0,f|0)|0;U=D;R=Yd((ea|la)^f|0,g^U|0,63)|0;_=D;g=Wd((ea|la)^f|0,g^U|0,1)|0;c[P+56>>2]=g|R;c[P+56+4>>2]=D|_;_=c[P+32>>2]|0;R=c[P+32+4>>2]|0;S=we(_|0,R|0,e|0,S|0)|0;S=we(S|0,D|0,J|0,K|0)|0;e=D;g=c[P+112>>2]^S;la=c[P+112+4>>2]^e;ea=we(la|0,g|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;ca=D;ja=Yd(_^ea|0,R^ca|0,24)|0;Q=D;R=Wd(_^ea|0,R^ca|0,40)|0;Q=D|Q;e=we(R|ja|0,Q|0,S|0,e|0)|0;e=we(e|0,D|0,v|0,H|0)|0;S=D;c[P+24>>2]=e;c[P+24+4>>2]=S;_=Yd(la^e|0,g^S|0,16)|0;Y=D;g=Wd(la^e|0,g^S|0,48)|0;Y=D|Y;ca=we(g|_|0,Y|0,ea|0,ca|0)|0;ea=D;la=Yd((R|ja)^ca|0,Q^ea|0,63)|0;ha=D;Q=Wd((R|ja)^ca|0,Q^ea|0,1)|0;ha=D|ha;aa=we(Q|la|0,ha|0,ga|0,aa|0)|0;aa=we(aa|0,D|0,v|0,H|0)|0;ga=D;U=we(ka^ga|0,(V|ma)^aa|0,f|0,U|0)|0;f=D;ja=Yd((Q|la)^U|0,ha^f|0,24)|0;R=D;ha=Wd((Q|la)^U|0,ha^f|0,40)|0;R=D|R;la=we(ha|ja|0,R|0,aa|0,ga|0)|0;la=we(la|0,D|0,h|0,j|0)|0;Q=D;c[P>>2]=la;c[P+4>>2]=Q;ba=Yd(ka^ga^la|0,(V|ma)^aa^Q|0,16)|0;$=D;aa=Wd(ka^ga^la|0,(V|ma)^aa^Q|0,48)|0;$=D|$;c[P+96>>2]=aa|ba;c[P+96+4>>2]=$;f=we(aa|ba|0,$|0,U|0,f|0)|0;U=D;c[P+64>>2]=f;c[P+64+4>>2]=U;$=Yd((ha|ja)^f|0,R^U|0,63)|0;ba=D;U=Wd((ha|ja)^f|0,R^U|0,1)|0;c[P+32>>2]=U|$;c[P+32+4>>2]=D|ba;ba=c[P+40>>2]|0;$=c[P+40+4>>2]|0;Z=we(ba|0,$|0,X|0,Z|0)|0;Z=we(Z|0,D|0,k|0,l|0)|0;X=D;ea=we(fa^X|0,(W|ia)^Z|0,ca|0,ea|0)|0;ca=D;U=Yd(ba^ea|0,$^ca|0,24)|0;R=D;$=Wd(ba^ea|0,$^ca|0,40)|0;R=D|R;ba=we($|U|0,R|0,Z|0,X|0)|0;ba=we(ba|0,D|0,m|0,n|0)|0;f=D;c[P+8>>2]=ba;c[P+8+4>>2]=f;ja=Yd(fa^X^ba|0,(W|ia)^Z^f|0,16)|0;ha=D;Z=Wd(fa^X^ba|0,(W|ia)^Z^f|0,48)|0;ha=D|ha;c[P+104>>2]=Z|ja;c[P+104+4>>2]=ha;ca=we(Z|ja|0,ha|0,ea|0,ca|0)|0;ea=D;c[P+72>>2]=ca;c[P+72+4>>2]=ea;ha=Yd(($|U)^ca|0,R^ea|0,63)|0;ja=D;ea=Wd(($|U)^ca|0,R^ea|0,1)|0;ja=D|ja;R=c[P+48>>2]|0;ca=c[P+48+4>>2]|0;da=we(R|0,ca|0,T|0,da|0)|0;da=we(da|0,D|0,o|0,p|0)|0;T=D;U=we(Y^T|0,(g|_)^da|0,c[P+80>>2]|0,c[P+80+4>>2]|0)|0;$=D;Z=Yd(R^U|0,ca^$|0,24)|0;ia=D;ca=Wd(R^U|0,ca^$|0,40)|0;ia=D|ia;R=we(ca|Z|0,ia|0,da|0,T|0)|0;R=we(R|0,D|0,q|0,r|0)|0;W=D;c[P+16>>2]=R;c[P+16+4>>2]=W;X=Yd(Y^T^R|0,(g|_)^da^W|0,16)|0;fa=D;da=Wd(Y^T^R|0,(g|_)^da^W|0,48)|0;fa=D|fa;c[P+112>>2]=da|X;c[P+112+4>>2]=fa;$=we(da|X|0,fa|0,U|0,$|0)|0;U=D;fa=Yd((ca|Z)^$|0,ia^U|0,63)|0;X=D;ia=Wd((ca|Z)^$|0,ia^U|0,1)|0;X=D|X;Z=c[P+56>>2]|0;ca=c[P+56+4>>2]|0;S=we(Z|0,ca|0,e|0,S|0)|0;S=we(S|0,D|0,s|0,t|0)|0;e=D;da=c[P+120>>2]^S;_=c[P+120+4>>2]^e;g=we(_|0,da|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;T=D;Y=Yd(Z^g|0,ca^T|0,24)|0;aa=D;ca=Wd(Z^g|0,ca^T|0,40)|0;aa=D|aa;e=we(ca|Y|0,aa|0,S|0,e|0)|0;e=we(e|0,D|0,u|0,w|0)|0;S=D;c[P+24>>2]=e;c[P+24+4>>2]=S;Z=Yd(_^e|0,da^S|0,16)|0;ma=D;da=Wd(_^e|0,da^S|0,48)|0;ma=D|ma;T=we(da|Z|0,ma|0,g|0,T|0)|0;g=D;_=Yd((ca|Y)^T|0,aa^g|0,63)|0;V=D;aa=Wd((ca|Y)^T|0,aa^g|0,1)|0;V=D|V;Q=we(ea|ha|0,ja|0,la|0,Q|0)|0;Q=we(Q|0,D|0,x|0,y|0)|0;la=D;U=we(ma^la|0,(da|Z)^Q|0,$|0,U|0)|0;$=D;Y=Yd((ea|ha)^U|0,ja^$|0,24)|0;ca=D;ja=Wd((ea|ha)^U|0,ja^$|0,40)|0;ca=D|ca;ha=we(ja|Y|0,ca|0,Q|0,la|0)|0;ha=we(ha|0,D|0,z|0,A|0)|0;ea=D;c[P>>2]=ha;c[P+4>>2]=ea;ga=Yd(ma^la^ha|0,(da|Z)^Q^ea|0,16)|0;ka=D;Q=Wd(ma^la^ha|0,(da|Z)^Q^ea|0,48)|0;ka=D|ka;c[P+120>>2]=Q|ga;c[P+120+4>>2]=ka;$=we(Q|ga|0,ka|0,U|0,$|0)|0;U=D;c[P+80>>2]=$;c[P+80+4>>2]=U;ka=Yd((ja|Y)^$|0,ca^U|0,63)|0;ga=D;U=Wd((ja|Y)^$|0,ca^U|0,1)|0;c[P+40>>2]=U|ka;c[P+40+4>>2]=D|ga;f=we(ia|fa|0,X|0,ba|0,f|0)|0;f=we(f|0,D|0,B|0,C|0)|0;ba=D;ga=c[P+96>>2]^f;ka=c[P+96+4>>2]^ba;g=we(ka|0,ga|0,T|0,g|0)|0;T=D;U=Yd((ia|fa)^g|0,X^T|0,24)|0;ca=D;X=Wd((ia|fa)^g|0,X^T|0,40)|0;ca=D|ca;ba=we(X|U|0,ca|0,f|0,ba|0)|0;ba=we(ba|0,D|0,E|0,F|0)|0;f=D;c[P+8>>2]=ba;c[P+8+4>>2]=f;fa=Yd(ka^ba|0,ga^f|0,16)|0;ia=D;ga=Wd(ka^ba|0,ga^f|0,48)|0;ia=D|ia;T=we(ga|fa|0,ia|0,g|0,T|0)|0;g=D;c[P+88>>2]=T;c[P+88+4>>2]=g;ka=Yd((X|U)^T|0,ca^g|0,63)|0;$=D;g=Wd((X|U)^T|0,ca^g|0,1)|0;c[P+48>>2]=g|ka;c[P+48+4>>2]=D|$;W=we(aa|_|0,V|0,R|0,W|0)|0;W=we(W|0,D|0,G|0,I|0)|0;R=D;$=c[P+104>>2]^W;ka=c[P+104+4>>2]^R;g=we(ka|0,$|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;ca=D;T=Yd((aa|_)^g|0,V^ca|0,24)|0;U=D;V=Wd((aa|_)^g|0,V^ca|0,40)|0;U=D|U;R=we(V|T|0,U|0,W|0,R|0)|0;R=we(R|0,D|0,J|0,K|0)|0;W=D;c[P+16>>2]=R;c[P+16+4>>2]=W;_=Yd(ka^R|0,$^W|0,16)|0;aa=D;$=Wd(ka^R|0,$^W|0,48)|0;aa=D|aa;ca=we($|_|0,aa|0,g|0,ca|0)|0;g=D;ka=Yd((V|T)^ca|0,U^g|0,63)|0;X=D;U=Wd((V|T)^ca|0,U^g|0,1)|0;c[P+56>>2]=U|ka;c[P+56+4>>2]=D|X;X=c[P+32>>2]|0;ka=c[P+32+4>>2]|0;S=we(X|0,ka|0,e|0,S|0)|0;S=we(S|0,D|0,L|0,M|0)|0;e=D;U=c[P+112>>2]^S;T=c[P+112+4>>2]^e;V=we(T|0,U|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;Y=D;ja=Yd(X^V|0,ka^Y|0,24)|0;Q=D;ka=Wd(X^V|0,ka^Y|0,40)|0;Q=D|Q;e=we(ka|ja|0,Q|0,S|0,e|0)|0;e=we(e|0,D|0,N|0,b|0)|0;S=D;c[P+24>>2]=e;c[P+24+4>>2]=S;X=Yd(T^e|0,U^S|0,16)|0;Z=D;U=Wd(T^e|0,U^S|0,48)|0;Z=D|Z;Y=we(U|X|0,Z|0,V|0,Y|0)|0;V=D;T=Yd((ka|ja)^Y|0,Q^V|0,63)|0;da=D;Q=Wd((ka|ja)^Y|0,Q^V|0,1)|0;da=D|da;ea=we(Q|T|0,da|0,ha|0,ea|0)|0;ea=we(ea|0,D|0,L|0,M|0)|0;ha=D;g=we(ia^ha|0,(ga|fa)^ea|0,ca|0,g|0)|0;L=D;ca=Yd((Q|T)^g|0,da^L|0,24)|0;M=D;da=Wd((Q|T)^g|0,da^L|0,40)|0;M=D|M;T=we(da|ca|0,M|0,ea|0,ha|0)|0;T=we(T|0,D|0,B|0,C|0)|0;Q=D;c[P>>2]=T;c[P+4>>2]=Q;B=Yd(ia^ha^T|0,(ga|fa)^ea^Q|0,16)|0;C=D;ea=Wd(ia^ha^T|0,(ga|fa)^ea^Q|0,48)|0;C=D|C;c[P+96>>2]=ea|B;c[P+96+4>>2]=C;C=we(ea|B|0,C|0,g|0,L|0)|0;L=D;c[P+64>>2]=C;c[P+64+4>>2]=L;B=Yd((da|ca)^C|0,M^L|0,63)|0;g=D;L=Wd((da|ca)^C|0,M^L|0,1)|0;c[P+32>>2]=L|B;c[P+32+4>>2]=D|g;g=c[P+40>>2]|0;B=c[P+40+4>>2]|0;L=we(g|0,B|0,ba|0,f|0)|0;L=we(L|0,D|0,o|0,p|0)|0;p=D;V=we(aa^p|0,($|_)^L|0,Y|0,V|0)|0;Y=D;M=Yd(g^V|0,B^Y|0,24)|0;C=D;B=Wd(g^V|0,B^Y|0,40)|0;C=D|C;o=we(B|M|0,C|0,L|0,p|0)|0;o=we(o|0,D|0,x|0,y|0)|0;x=D;c[P+8>>2]=o;c[P+8+4>>2]=x;g=Yd(aa^p^o|0,($|_)^L^x|0,16)|0;f=D;y=Wd(aa^p^o|0,($|_)^L^x|0,48)|0;f=D|f;c[P+104>>2]=y|g;c[P+104+4>>2]=f;Y=we(y|g|0,f|0,V|0,Y|0)|0;V=D;c[P+72>>2]=Y;c[P+72+4>>2]=V;f=Yd((B|M)^Y|0,C^V|0,63)|0;g=D;V=Wd((B|M)^Y|0,C^V|0,1)|0;g=D|g;C=c[P+48>>2]|0;Y=c[P+48+4>>2]|0;M=we(C|0,Y|0,R|0,W|0)|0;M=we(M|0,D|0,z|0,A|0)|0;z=D;y=we(Z^z|0,(U|X)^M|0,c[P+80>>2]|0,c[P+80+4>>2]|0)|0;W=D;R=Yd(C^y|0,Y^W|0,24)|0;B=D;Y=Wd(C^y|0,Y^W|0,40)|0;B=D|B;C=we(Y|R|0,B|0,M|0,z|0)|0;C=we(C|0,D|0,N|0,b|0)|0;L=D;c[P+16>>2]=C;c[P+16+4>>2]=L;N=Yd(Z^z^C|0,(U|X)^M^L|0,16)|0;b=D;M=Wd(Z^z^C|0,(U|X)^M^L|0,48)|0;b=D|b;c[P+112>>2]=M|N;c[P+112+4>>2]=b;W=we(M|N|0,b|0,y|0,W|0)|0;b=D;N=Yd((Y|R)^W|0,B^b|0,63)|0;y=D;B=Wd((Y|R)^W|0,B^b|0,1)|0;y=D|y;R=c[P+56>>2]|0;Y=c[P+56+4>>2]|0;M=we(R|0,Y|0,e|0,S|0)|0;M=we(M|0,D|0,J|0,K|0)|0;K=D;S=c[P+120>>2]^M;e=c[P+120+4>>2]^K;z=we(e|0,S|0,c[P+88>>2]|0,c[P+88+4>>2]|0)|0;p=D;X=Yd(R^z|0,Y^p|0,24)|0;A=D;Y=Wd(R^z|0,Y^p|0,40)|0;A=D|A;K=we(Y|X|0,A|0,M|0,K|0)|0;K=we(K|0,D|0,s|0,t|0)|0;M=D;c[P+24>>2]=K;c[P+24+4>>2]=M;R=Yd(e^K|0,S^M|0,16)|0;U=D;S=Wd(e^K|0,S^M|0,48)|0;U=D|U;p=we(S|R|0,U|0,z|0,p|0)|0;z=D;e=Yd((Y|X)^p|0,A^z|0,63)|0;J=D;A=Wd((Y|X)^p|0,A^z|0,1)|0;J=D|J;Q=we(V|f|0,g|0,T|0,Q|0)|0;Q=we(Q|0,D|0,h|0,j|0)|0;T=D;t=we(U^T|0,(S|R)^Q|0,W|0,b|0)|0;s=D;h=Yd((V|f)^t|0,g^s|0,24)|0;j=D;g=Wd((V|f)^t|0,g^s|0,40)|0;j=D|j;f=we(g|h|0,j|0,Q|0,T|0)|0;f=we(f|0,D|0,G|0,I|0)|0;b=D;c[P>>2]=f;c[P+4>>2]=b;I=Yd(U^T^f|0,(S|R)^Q^b|0,16)|0;G=D;Q=Wd(U^T^f|0,(S|R)^Q^b|0,48)|0;G=D|G;c[P+120>>2]=Q|I;c[P+120+4>>2]=G;G=we(Q|I|0,G|0,t|0,s|0)|0;I=D;c[P+80>>2]=G;c[P+80+4>>2]=I;s=Yd((g|h)^G|0,j^I|0,63)|0;t=D;I=Wd((g|h)^G|0,j^I|0,1)|0;c[P+40>>2]=I|s;c[P+40+4>>2]=D|t;x=we(B|N|0,y|0,o|0,x|0)|0;x=we(x|0,D|0,v|0,H|0)|0;t=D;v=c[P+96>>2]^x;s=c[P+96+4>>2]^t;H=we(s|0,v|0,p|0,z|0)|0;I=D;z=Yd((B|N)^H|0,y^I|0,24)|0;G=D;y=Wd((B|N)^H|0,y^I|0,40)|0;G=D|G;t=we(y|z|0,G|0,x|0,t|0)|0;t=we(t|0,D|0,k|0,l|0)|0;x=D;c[P+8>>2]=t;c[P+8+4>>2]=x;N=Yd(s^t|0,v^x|0,16)|0;B=D;x=Wd(s^t|0,v^x|0,48)|0;B=D|B;c[P+96>>2]=x|N;c[P+96+4>>2]=B;I=we(x|N|0,B|0,H|0,I|0)|0;H=D;c[P+88>>2]=I;c[P+88+4>>2]=H;B=Yd((y|z)^I|0,G^H|0,63)|0;N=D;H=Wd((y|z)^I|0,G^H|0,1)|0;c[P+48>>2]=H|B;c[P+48+4>>2]=D|N;L=we(A|e|0,J|0,C|0,L|0)|0;L=we(L|0,D|0,E|0,F|0)|0;C=D;N=c[P+104>>2]^L;B=c[P+104+4>>2]^C;H=we(B|0,N|0,c[P+64>>2]|0,c[P+64+4>>2]|0)|0;G=D;E=Yd((A|e)^H|0,J^G|0,24)|0;F=D;J=Wd((A|e)^H|0,J^G|0,40)|0;F=D|F;C=we(J|E|0,F|0,L|0,C|0)|0;C=we(C|0,D|0,u|0,w|0)|0;L=D;c[P+16>>2]=C;c[P+16+4>>2]=L;e=Yd(B^C|0,N^L|0,16)|0;I=D;L=Wd(B^C|0,N^L|0,48)|0;I=D|I;c[P+104>>2]=L|e;c[P+104+4>>2]=I;G=we(L|e|0,I|0,H|0,G|0)|0;H=D;c[P+64>>2]=G;c[P+64+4>>2]=H;I=Yd((J|E)^G|0,F^H|0,63)|0;e=D;H=Wd((J|E)^G|0,F^H|0,1)|0;c[P+56>>2]=H|I;c[P+56+4>>2]=D|e;e=c[P+32>>2]|0;I=c[P+32+4>>2]|0;H=we(e|0,I|0,K|0,M|0)|0;H=we(H|0,D|0,q|0,r|0)|0;F=D;G=c[P+112>>2]^H;E=c[P+112+4>>2]^F;M=we(E|0,G|0,c[P+72>>2]|0,c[P+72+4>>2]|0)|0;K=D;J=Yd(e^M|0,I^K|0,24)|0;L=D;I=Wd(e^M|0,I^K|0,40)|0;L=D|L;F=we(I|J|0,L|0,H|0,F|0)|0;F=we(F|0,D|0,m|0,n|0)|0;H=D;c[P+24>>2]=F;c[P+24+4>>2]=H;e=Yd(E^F|0,G^H|0,16)|0;N=D;H=Wd(E^F|0,G^H|0,48)|0;N=D|N;c[P+112>>2]=H|e;c[P+112+4>>2]=N;K=we(H|e|0,N|0,M|0,K|0)|0;M=D;c[P+72>>2]=K;c[P+72+4>>2]=M;N=Yd((I|J)^K|0,L^M|0,63)|0;e=D;M=Wd((I|J)^K|0,L^M|0,1)|0;c[P+32>>2]=M|N;c[P+32+4>>2]=D|e;e=0;while(1){ma=a+(e<<3)|0;la=P+(e+8<<3)|0;b=b^c[ma+4>>2]^c[la+4>>2];c[ma>>2]=f^c[ma>>2]^c[la>>2];c[ma+4>>2]=b;b=e+1|0;if((b|0)==8)break;e=b;f=c[P+(b<<3)>>2]|0;b=c[P+(b<<3)+4>>2]|0}i=O;return}function ia(b,c,e,f){b=b|0;c=c|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,nb=0,ob=0,pb=0,qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,xb=0,yb=0,zb=0,Ab=0,Bb=0,Cb=0,Db=0,Eb=0,Fb=0,Gb=0,Hb=0,Ib=0,Jb=0,Kb=0,Lb=0,Mb=0,Nb=0,Ob=0,Pb=0,Qb=0,Rb=0,Sb=0,Tb=0,Ub=0,Vb=0,Wb=0,Xb=0,Yb=0,Zb=0,_b=0,$b=0,ac=0,bc=0,cc=0,dc=0,ec=0,fc=0,gc=0,hc=0,ic=0,jc=0,kc=0,lc=0,mc=0,nc=0,oc=0,pc=0,qc=0,rc=0,sc=0,tc=0,uc=0,vc=0,wc=0,xc=0,yc=0,zc=0;O=d[c>>0]|0;P=Wd(d[c+1>>0]|0|0,0,8)|0;jb=D;j=d[c+2>>0]|0;db=Wd(j|0,0,16)|0;Ma=Wd(d[c+3>>0]|0|0,0,8)|0;qb=D;A=Wd(d[c+4>>0]|0|0,0,16)|0;qb=qb|D;nb=d[c+5>>0]|0;z=Wd(nb|0,0,24)|0;qb=Yd(Ma|j|A|z|0,qb|D|0,5)|0;z=Wd(d[c+6>>0]|0|0,0,8)|0;A=D;j=d[c+7>>0]|0;Ma=Wd(j|0,0,16)|0;A=Yd(z|nb|Ma|0,A|D|0,2)|0;Ma=Wd(d[c+8>>0]|0|0,0,8)|0;nb=D;z=Wd(d[c+9>>0]|0|0,0,16)|0;nb=nb|D;ca=d[c+10>>0]|0;lb=Wd(ca|0,0,24)|0;nb=Yd(Ma|j|z|lb|0,nb|D|0,7)|0;lb=Wd(d[c+11>>0]|0|0,0,8)|0;z=D;j=Wd(d[c+12>>0]|0|0,0,16)|0;z=z|D;Ma=d[c+13>>0]|0;ra=Wd(Ma|0,0,24)|0;z=Yd(lb|ca|j|ra|0,z|D|0,4)|0;ra=Wd(d[c+14>>0]|0|0,0,8)|0;j=D;ca=d[c+15>>0]|0;lb=Wd(ca|0,0,16)|0;j=Yd(ra|Ma|lb|0,j|D|0,1)|0;lb=Wd(d[c+16>>0]|0|0,0,8)|0;Ma=D;ra=Wd(d[c+17>>0]|0|0,0,16)|0;Ma=Ma|D;Ca=d[c+18>>0]|0;I=Wd(Ca|0,0,24)|0;Ma=Yd(lb|ca|ra|I|0,Ma|D|0,6)|0;I=Wd(d[c+19>>0]|0|0,0,8)|0;ra=D;ca=Wd(d[c+20>>0]|0|0,0,16)|0;ra=Yd(I|Ca|ca|0,ra|D|0,3)|0;ca=D;Ca=d[c+21>>0]|0;I=Wd(d[c+22>>0]|0|0,0,8)|0;lb=D;eb=d[c+23>>0]|0;Ja=Wd(eb|0,0,16)|0;ba=Wd(d[c+24>>0]|0|0,0,8)|0;La=D;sc=Wd(d[c+25>>0]|0|0,0,16)|0;La=La|D;o=d[c+26>>0]|0;rb=Wd(o|0,0,24)|0;La=Yd(ba|eb|sc|rb|0,La|D|0,5)|0;rb=Wd(d[c+27>>0]|0|0,0,8)|0;sc=D;eb=d[c+28>>0]|0;ba=Wd(eb|0,0,16)|0;sc=Yd(rb|o|ba|0,sc|D|0,2)|0;ba=Wd(d[c+29>>0]|0|0,0,8)|0;o=D;rb=Wd(d[c+30>>0]|0|0,0,16)|0;o=o|D;Da=Wd(d[c+31>>0]|0|0,0,24)|0;o=Yd(ba|eb|rb|Da|0,o|D|0,7)|0;Da=D;rb=d[e>>0]|0;eb=Wd(d[e+1>>0]|0|0,0,8)|0;ba=D;Ta=d[e+2>>0]|0;aa=Wd(Ta|0,0,16)|0;m=Wd(d[e+3>>0]|0|0,0,8)|0;Ya=D;q=Wd(d[e+4>>0]|0|0,0,16)|0;Ya=Ya|D;p=d[e+5>>0]|0;ea=Wd(p|0,0,24)|0;Ya=Yd(m|Ta|q|ea|0,Ya|D|0,5)|0;ea=Wd(d[e+6>>0]|0|0,0,8)|0;q=D;Ta=d[e+7>>0]|0;m=Wd(Ta|0,0,16)|0;q=Yd(ea|p|m|0,q|D|0,2)|0;m=Wd(d[e+8>>0]|0|0,0,8)|0;p=D;ea=Wd(d[e+9>>0]|0|0,0,16)|0;p=p|D;wc=d[e+10>>0]|0;wa=Wd(wc|0,0,24)|0;p=Yd(m|Ta|ea|wa|0,p|D|0,7)|0;wa=Wd(d[e+11>>0]|0|0,0,8)|0;ea=D;Ta=Wd(d[e+12>>0]|0|0,0,16)|0;ea=ea|D;m=d[e+13>>0]|0;zc=Wd(m|0,0,24)|0;ea=Yd(wa|wc|Ta|zc|0,ea|D|0,4)|0;zc=Wd(d[e+14>>0]|0|0,0,8)|0;Ta=D;wc=d[e+15>>0]|0;wa=Wd(wc|0,0,16)|0;Ta=Yd(zc|m|wa|0,Ta|D|0,1)|0;wa=Wd(d[e+16>>0]|0|0,0,8)|0;m=D;zc=Wd(d[e+17>>0]|0|0,0,16)|0;m=m|D;ub=d[e+18>>0]|0;uc=Wd(ub|0,0,24)|0;m=Yd(wa|wc|zc|uc|0,m|D|0,6)|0;uc=Wd(d[e+19>>0]|0|0,0,8)|0;zc=D;wc=Wd(d[e+20>>0]|0|0,0,16)|0;zc=Yd(uc|ub|wc|0,zc|D|0,3)|0;wc=D;ub=d[e+21>>0]|0;uc=Wd(d[e+22>>0]|0|0,0,8)|0;wa=D;pc=d[e+23>>0]|0;na=Wd(pc|0,0,16)|0;W=Wd(d[e+24>>0]|0|0,0,8)|0;Ia=D;K=Wd(d[e+25>>0]|0|0,0,16)|0;Ia=Ia|D;x=d[e+26>>0]|0;qc=Wd(x|0,0,24)|0;Ia=Yd(W|pc|K|qc|0,Ia|D|0,5)|0;qc=Wd(d[e+27>>0]|0|0,0,8)|0;K=D;pc=d[e+28>>0]|0;W=Wd(pc|0,0,16)|0;K=Yd(qc|x|W|0,K|D|0,2)|0;W=Wd(d[e+29>>0]|0|0,0,8)|0;x=D;qc=Wd(d[e+30>>0]|0|0,0,16)|0;x=x|D;Ba=Wd(d[e+31>>0]|0|0,0,24)|0;x=Yd(W|pc|qc|Ba|0,x|D|0,7)|0;Ba=D;qc=d[f>>0]|0;pc=Wd(d[f+1>>0]|0|0,0,8)|0;W=D;y=d[f+2>>0]|0;rc=Wd(y|0,0,16)|0;Qa=Wd(d[f+3>>0]|0|0,0,8)|0;xa=D;Fa=Wd(d[f+4>>0]|0|0,0,16)|0;xa=xa|D;ib=d[f+5>>0]|0;za=Wd(ib|0,0,24)|0;xa=Yd(Qa|y|Fa|za|0,xa|D|0,5)|0;za=Wd(d[f+6>>0]|0|0,0,8)|0;Fa=D;y=d[f+7>>0]|0;Qa=Wd(y|0,0,16)|0;Fa=Yd(za|ib|Qa|0,Fa|D|0,2)|0;Qa=Wd(d[f+8>>0]|0|0,0,8)|0;ib=D;za=Wd(d[f+9>>0]|0|0,0,16)|0;ib=ib|D;h=d[f+10>>0]|0;Y=Wd(h|0,0,24)|0;ib=Yd(Qa|y|za|Y|0,ib|D|0,7)|0;Y=Wd(d[f+11>>0]|0|0,0,8)|0;za=D;y=Wd(d[f+12>>0]|0|0,0,16)|0;za=za|D;Qa=d[f+13>>0]|0;B=Wd(Qa|0,0,24)|0;za=Yd(Y|h|y|B|0,za|D|0,4)|0;B=Wd(d[f+14>>0]|0|0,0,8)|0;y=D;h=d[f+15>>0]|0;Y=Wd(h|0,0,16)|0;y=Yd(B|Qa|Y|0,y|D|0,1)|0;Y=Wd(d[f+16>>0]|0|0,0,8)|0;Qa=D;B=Wd(d[f+17>>0]|0|0,0,16)|0;Qa=Qa|D;sa=d[f+18>>0]|0;H=Wd(sa|0,0,24)|0;Qa=Yd(Y|h|B|H|0,Qa|D|0,6)|0;H=Wd(d[f+19>>0]|0|0,0,8)|0;B=D;h=Wd(d[f+20>>0]|0|0,0,16)|0;B=Yd(H|sa|h|0,B|D|0,3)|0;h=D;sa=d[f+21>>0]|0;H=Wd(d[f+22>>0]|0|0,0,8)|0;Y=D;ma=d[f+23>>0]|0;Z=Wd(ma|0,0,16)|0;ua=Wd(d[f+24>>0]|0|0,0,8)|0;G=D;N=Wd(d[f+25>>0]|0|0,0,16)|0;G=G|D;c=d[f+26>>0]|0;Aa=Wd(c|0,0,24)|0;G=Yd(ua|ma|N|Aa|0,G|D|0,5)|0;Aa=Wd(d[f+27>>0]|0|0,0,8)|0;N=D;ma=d[f+28>>0]|0;ua=Wd(ma|0,0,16)|0;N=Yd(Aa|c|ua|0,N|D|0,2)|0;ua=Wd(d[f+29>>0]|0|0,0,8)|0;c=D;Aa=Wd(d[f+30>>0]|0|0,0,16)|0;c=c|D;i=Wd(d[f+31>>0]|0|0,0,24)|0;c=Yd(ua|ma|Aa|i|0,c|D|0,7)|0;i=D;Aa=Kd(eb|rb|aa&2031616|0,ba|0,P|O|db&2031616|0,jb|0)|0;Aa=we(pc|qc|rc&2031616|0,W|0,Aa|0,D|0)|0;W=D;rc=Kd(Ya&2097151|0,0,P|O|db&2031616|0,jb|0)|0;qc=D;pc=Kd(eb|rb|aa&2031616|0,ba|0,qb&2097151|0,0)|0;ma=D;ua=Kd(q&2097151|0,0,P|O|db&2031616|0,jb|0)|0;Ea=D;va=Kd(Ya&2097151|0,0,qb&2097151|0,0)|0;kc=D;ia=Kd(eb|rb|aa&2031616|0,ba|0,A&2097151|0,0)|0;ia=we(va|0,kc|0,ia|0,D|0)|0;Ea=we(ia|0,D|0,ua|0,Ea|0)|0;Fa=we(Ea|0,D|0,Fa&2097151|0,0)|0;Ea=D;ua=Kd(p&2097151|0,0,P|O|db&2031616|0,jb|0)|0;ia=D;kc=Kd(q&2097151|0,0,qb&2097151|0,0)|0;va=D;oc=Kd(Ya&2097151|0,0,A&2097151|0,0)|0;nc=D;mc=Kd(eb|rb|aa&2031616|0,ba|0,nb&2097151|0,0)|0;lc=D;Ha=Kd(ea&2097151|0,0,P|O|db&2031616|0,jb|0)|0;ya=D;bc=Kd(p&2097151|0,0,qb&2097151|0,0)|0;u=D;dc=Kd(q&2097151|0,0,A&2097151|0,0)|0;Ga=D;ec=Kd(Ya&2097151|0,0,nb&2097151|0,0)|0;fc=D;cc=Kd(eb|rb|aa&2031616|0,ba|0,z&2097151|0,0)|0;cc=we(ec|0,fc|0,cc|0,D|0)|0;Ga=we(cc|0,D|0,dc|0,Ga|0)|0;u=we(Ga|0,D|0,bc|0,u|0)|0;ya=we(u|0,D|0,Ha|0,ya|0)|0;za=we(ya|0,D|0,za&2097151|0,0)|0;ya=D;Ha=Kd(Ta&2097151|0,0,P|O|db&2031616|0,jb|0)|0;u=D;bc=Kd(ea&2097151|0,0,qb&2097151|0,0)|0;Ga=D;dc=Kd(p&2097151|0,0,A&2097151|0,0)|0;cc=D;fc=Kd(q&2097151|0,0,nb&2097151|0,0)|0;ec=D;jc=Kd(Ya&2097151|0,0,z&2097151|0,0)|0;ic=D;hc=Kd(eb|rb|aa&2031616|0,ba|0,j&2097151|0,0)|0;gc=D;X=Kd(m&2097151|0,0,P|O|db&2031616|0,jb|0)|0;Ra=D;Qb=Kd(Ta&2097151|0,0,qb&2097151|0,0)|0;da=D;Sb=Kd(ea&2097151|0,0,A&2097151|0,0)|0;Pb=D;Ub=Kd(p&2097151|0,0,nb&2097151|0,0)|0;Rb=D;Wb=Kd(q&2097151|0,0,z&2097151|0,0)|0;Tb=D;Xb=Kd(Ya&2097151|0,0,j&2097151|0,0)|0;Yb=D;Vb=Kd(eb|rb|aa&2031616|0,ba|0,Ma&2097151|0,0)|0;Vb=we(Xb|0,Yb|0,Vb|0,D|0)|0;Tb=we(Vb|0,D|0,Wb|0,Tb|0)|0;Rb=we(Tb|0,D|0,Ub|0,Rb|0)|0;Pb=we(Rb|0,D|0,Sb|0,Pb|0)|0;da=we(Pb|0,D|0,Qb|0,da|0)|0;Ra=we(da|0,D|0,X|0,Ra|0)|0;Qa=we(Ra|0,D|0,Qa&2097151|0,0)|0;Ra=D;X=Kd(zc|0,wc|0,P|O|db&2031616|0,jb|0)|0;da=D;Qb=Kd(m&2097151|0,0,qb&2097151|0,0)|0;Pb=D;Sb=Kd(Ta&2097151|0,0,A&2097151|0,0)|0;Rb=D;Ub=Kd(ea&2097151|0,0,nb&2097151|0,0)|0;Tb=D;Wb=Kd(p&2097151|0,0,z&2097151|0,0)|0;Vb=D;Yb=Kd(q&2097151|0,0,j&2097151|0,0)|0;Xb=D;ac=Kd(Ya&2097151|0,0,Ma&2097151|0,0)|0;$b=D;_b=Kd(eb|rb|aa&2031616|0,ba|0,ra|0,ca|0)|0;Zb=D;ta=Kd(uc|ub|na&2031616|0,wa|0,P|O|db&2031616|0,jb|0)|0;yb=D;zb=Kd(zc|0,wc|0,qb&2097151|0,0)|0;Ab=D;Bb=Kd(m&2097151|0,0,A&2097151|0,0)|0;Cb=D;Db=Kd(Ta&2097151|0,0,nb&2097151|0,0)|0;Eb=D;Fb=Kd(ea&2097151|0,0,z&2097151|0,0)|0;Gb=D;Hb=Kd(p&2097151|0,0,j&2097151|0,0)|0;Ib=D;Jb=Kd(q&2097151|0,0,Ma&2097151|0,0)|0;Kb=D;Mb=Kd(Ya&2097151|0,0,ra|0,ca|0)|0;Nb=D;Ob=Kd(eb|rb|aa&2031616|0,ba|0,I|Ca|Ja&2031616|0,lb|0)|0;Ob=we(Mb|0,Nb|0,Ob|0,D|0)|0;Kb=we(Ob|0,D|0,Jb|0,Kb|0)|0;Ib=we(Kb|0,D|0,Hb|0,Ib|0)|0;Gb=we(Ib|0,D|0,Fb|0,Gb|0)|0;Eb=we(Gb|0,D|0,Db|0,Eb|0)|0;Cb=we(Eb|0,D|0,Bb|0,Cb|0)|0;Ab=we(Cb|0,D|0,zb|0,Ab|0)|0;yb=we(Ab|0,D|0,ta|0,yb|0)|0;Y=we(yb|0,D|0,H|sa|Z&2031616|0,Y|0)|0;Z=D;sa=Kd(Ia&2097151|0,0,P|O|db&2031616|0,jb|0)|0;H=D;yb=Kd(uc|ub|na&2031616|0,wa|0,qb&2097151|0,0)|0;ta=D;Ab=Kd(zc|0,wc|0,A&2097151|0,0)|0;zb=D;Cb=Kd(m&2097151|0,0,nb&2097151|0,0)|0;Bb=D;Eb=Kd(Ta&2097151|0,0,z&2097151|0,0)|0;Db=D;Gb=Kd(ea&2097151|0,0,j&2097151|0,0)|0;Fb=D;Ib=Kd(p&2097151|0,0,Ma&2097151|0,0)|0;Hb=D;Kb=Kd(q&2097151|0,0,ra|0,ca|0)|0;Jb=D;Ob=Kd(Ya&2097151|0,0,I|Ca|Ja&2031616|0,lb|0)|0;Nb=D;Mb=Kd(eb|rb|aa&2031616|0,ba|0,La&2097151|0,0)|0;Lb=D;ab=Kd(K&2097151|0,0,P|O|db&2031616|0,jb|0)|0;M=D;Q=Kd(Ia&2097151|0,0,qb&2097151|0,0)|0;bb=D;ob=Kd(uc|ub|na&2031616|0,wa|0,A&2097151|0,0)|0;R=D;J=Kd(zc|0,wc|0,nb&2097151|0,0)|0;pb=D;Oa=Kd(m&2097151|0,0,z&2097151|0,0)|0;C=D;gb=Kd(Ta&2097151|0,0,j&2097151|0,0)|0;Pa=D;U=Kd(ea&2097151|0,0,Ma&2097151|0,0)|0;hb=D;Wa=Kd(p&2097151|0,0,ra|0,ca|0)|0;V=D;xb=Kd(q&2097151|0,0,I|Ca|Ja&2031616|0,lb|0)|0;Xa=D;fa=Kd(Ya&2097151|0,0,La&2097151|0,0)|0;w=D;wb=Kd(eb|rb|aa&2031616|0,ba|0,sc&2097151|0,0)|0;wb=we(fa|0,w|0,wb|0,D|0)|0;Xa=we(wb|0,D|0,xb|0,Xa|0)|0;V=we(Xa|0,D|0,Wa|0,V|0)|0;hb=we(V|0,D|0,U|0,hb|0)|0;Pa=we(hb|0,D|0,gb|0,Pa|0)|0;C=we(Pa|0,D|0,Oa|0,C|0)|0;pb=we(C|0,D|0,J|0,pb|0)|0;R=we(pb|0,D|0,ob|0,R|0)|0;bb=we(R|0,D|0,Q|0,bb|0)|0;M=we(bb|0,D|0,ab|0,M|0)|0;N=we(M|0,D|0,N&2097151|0,0)|0;M=D;jb=Kd(x|0,Ba|0,P|O|db&2031616|0,jb|0)|0;db=D;O=Kd(K&2097151|0,0,qb&2097151|0,0)|0;P=D;ab=Kd(Ia&2097151|0,0,A&2097151|0,0)|0;bb=D;Q=Kd(uc|ub|na&2031616|0,wa|0,nb&2097151|0,0)|0;R=D;ob=Kd(zc|0,wc|0,z&2097151|0,0)|0;pb=D;J=Kd(m&2097151|0,0,j&2097151|0,0)|0;C=D;Oa=Kd(Ta&2097151|0,0,Ma&2097151|0,0)|0;Pa=D;gb=Kd(ea&2097151|0,0,ra|0,ca|0)|0;hb=D;U=Kd(p&2097151|0,0,I|Ca|Ja&2031616|0,lb|0)|0;V=D;Wa=Kd(q&2097151|0,0,La&2097151|0,0)|0;Xa=D;xb=Kd(Ya&2097151|0,0,sc&2097151|0,0)|0;wb=D;ba=Kd(eb|rb|aa&2031616|0,ba|0,o|0,Da|0)|0;aa=D;qb=Kd(x|0,Ba|0,qb&2097151|0,0)|0;rb=D;eb=Kd(K&2097151|0,0,A&2097151|0,0)|0;w=D;fa=Kd(Ia&2097151|0,0,nb&2097151|0,0)|0;fb=D;ha=Kd(uc|ub|na&2031616|0,wa|0,z&2097151|0,0)|0;$=D;sb=Kd(zc|0,wc|0,j&2097151|0,0)|0;kb=D;la=Kd(m&2097151|0,0,Ma&2097151|0,0)|0;tb=D;qa=Kd(Ta&2097151|0,0,ra|0,ca|0)|0;ka=D;Na=Kd(ea&2097151|0,0,I|Ca|Ja&2031616|0,lb|0)|0;pa=D;Za=Kd(p&2097151|0,0,La&2097151|0,0)|0;ga=D;mb=Kd(q&2097151|0,0,sc&2097151|0,0)|0;v=D;Ya=Kd(Ya&2097151|0,0,o|0,Da|0)|0;Ya=we(mb|0,v|0,Ya|0,D|0)|0;ga=we(Ya|0,D|0,Za|0,ga|0)|0;pa=we(ga|0,D|0,Na|0,pa|0)|0;ka=we(pa|0,D|0,qa|0,ka|0)|0;tb=we(ka|0,D|0,la|0,tb|0)|0;kb=we(tb|0,D|0,sb|0,kb|0)|0;$=we(kb|0,D|0,ha|0,$|0)|0;fb=we($|0,D|0,fa|0,fb|0)|0;w=we(fb|0,D|0,eb|0,w|0)|0;rb=we(w|0,D|0,qb|0,rb|0)|0;qb=D;A=Kd(x|0,Ba|0,A&2097151|0,0)|0;w=D;eb=Kd(K&2097151|0,0,nb&2097151|0,0)|0;fb=D;fa=Kd(Ia&2097151|0,0,z&2097151|0,0)|0;$=D;ha=Kd(uc|ub|na&2031616|0,wa|0,j&2097151|0,0)|0;kb=D;sb=Kd(zc|0,wc|0,Ma&2097151|0,0)|0;tb=D;la=Kd(m&2097151|0,0,ra|0,ca|0)|0;ka=D;qa=Kd(Ta&2097151|0,0,I|Ca|Ja&2031616|0,lb|0)|0;pa=D;Na=Kd(ea&2097151|0,0,La&2097151|0,0)|0;ga=D;Za=Kd(p&2097151|0,0,sc&2097151|0,0)|0;Ya=D;q=Kd(q&2097151|0,0,o|0,Da|0)|0;v=D;nb=Kd(x|0,Ba|0,nb&2097151|0,0)|0;mb=D;_a=Kd(K&2097151|0,0,z&2097151|0,0)|0;r=D;E=Kd(Ia&2097151|0,0,j&2097151|0,0)|0;$a=D;n=Kd(uc|ub|na&2031616|0,wa|0,Ma&2097151|0,0)|0;t=D;_=Kd(zc|0,wc|0,ra|0,ca|0)|0;g=D;ja=Kd(m&2097151|0,0,I|Ca|Ja&2031616|0,lb|0)|0;s=D;oa=Kd(Ta&2097151|0,0,La&2097151|0,0)|0;F=D;vb=Kd(ea&2097151|0,0,sc&2097151|0,0)|0;l=D;p=Kd(p&2097151|0,0,o|0,Da|0)|0;p=we(vb|0,l|0,p|0,D|0)|0;F=we(p|0,D|0,oa|0,F|0)|0;s=we(F|0,D|0,ja|0,s|0)|0;g=we(s|0,D|0,_|0,g|0)|0;t=we(g|0,D|0,n|0,t|0)|0;$a=we(t|0,D|0,E|0,$a|0)|0;r=we($a|0,D|0,_a|0,r|0)|0;mb=we(r|0,D|0,nb|0,mb|0)|0;nb=D;z=Kd(x|0,Ba|0,z&2097151|0,0)|0;r=D;_a=Kd(K&2097151|0,0,j&2097151|0,0)|0;$a=D;E=Kd(Ia&2097151|0,0,Ma&2097151|0,0)|0;t=D;n=Kd(uc|ub|na&2031616|0,wa|0,ra|0,ca|0)|0;g=D;_=Kd(zc|0,wc|0,I|Ca|Ja&2031616|0,lb|0)|0;s=D;ja=Kd(m&2097151|0,0,La&2097151|0,0)|0;F=D;oa=Kd(Ta&2097151|0,0,sc&2097151|0,0)|0;p=D;ea=Kd(ea&2097151|0,0,o|0,Da|0)|0;l=D;j=Kd(x|0,Ba|0,j&2097151|0,0)|0;vb=D;e=Kd(K&2097151|0,0,Ma&2097151|0,0)|0;L=D;T=Kd(Ia&2097151|0,0,ra|0,ca|0)|0;Ka=D;Va=Kd(uc|ub|na&2031616|0,wa|0,I|Ca|Ja&2031616|0,lb|0)|0;S=D;Sa=Kd(zc|0,wc|0,La&2097151|0,0)|0;Ua=D;f=Kd(m&2097151|0,0,sc&2097151|0,0)|0;k=D;Ta=Kd(Ta&2097151|0,0,o|0,Da|0)|0;Ta=we(f|0,k|0,Ta|0,D|0)|0;Ua=we(Ta|0,D|0,Sa|0,Ua|0)|0;S=we(Ua|0,D|0,Va|0,S|0)|0;Ka=we(S|0,D|0,T|0,Ka|0)|0;L=we(Ka|0,D|0,e|0,L|0)|0;vb=we(L|0,D|0,j|0,vb|0)|0;j=D;Ma=Kd(x|0,Ba|0,Ma&2097151|0,0)|0;L=D;e=Kd(K&2097151|0,0,ra|0,ca|0)|0;Ka=D;T=Kd(Ia&2097151|0,0,I|Ca|Ja&2031616|0,lb|0)|0;S=D;Va=Kd(uc|ub|na&2031616|0,wa|0,La&2097151|0,0)|0;Ua=D;Sa=Kd(zc|0,wc|0,sc&2097151|0,0)|0;Ta=D;m=Kd(m&2097151|0,0,o|0,Da|0)|0;k=D;ca=Kd(x|0,Ba|0,ra|0,ca|0)|0;f=D;ra=Kd(K&2097151|0,0,I|Ca|Ja&2031616|0,lb|0)|0;cb=D;vc=Kd(Ia&2097151|0,0,La&2097151|0,0)|0;tc=D;yc=Kd(uc|ub|na&2031616|0,wa|0,sc&2097151|0,0)|0;xc=D;wc=Kd(zc|0,wc|0,o|0,Da|0)|0;wc=we(yc|0,xc|0,wc|0,D|0)|0;tc=we(wc|0,D|0,vc|0,tc|0)|0;cb=we(tc|0,D|0,ra|0,cb|0)|0;f=we(cb|0,D|0,ca|0,f|0)|0;ca=D;lb=Kd(x|0,Ba|0,I|Ca|Ja&2031616|0,lb|0)|0;Ja=D;Ca=Kd(K&2097151|0,0,La&2097151|0,0)|0;I=D;cb=Kd(Ia&2097151|0,0,sc&2097151|0,0)|0;ra=D;wa=Kd(uc|ub|na&2031616|0,wa|0,o|0,Da|0)|0;na=D;La=Kd(x|0,Ba|0,La&2097151|0,0)|0;ub=D;uc=Kd(K&2097151|0,0,sc&2097151|0,0)|0;tc=D;Ia=Kd(Ia&2097151|0,0,o|0,Da|0)|0;Ia=we(uc|0,tc|0,Ia|0,D|0)|0;ub=we(Ia|0,D|0,La|0,ub|0)|0;La=D;sc=Kd(x|0,Ba|0,sc&2097151|0,0)|0;Ia=D;K=Kd(K&2097151|0,0,o|0,Da|0)|0;K=we(sc|0,Ia|0,K|0,D|0)|0;Ia=D;Da=Kd(x|0,Ba|0,o|0,Da|0)|0;o=D;Ba=we(Aa|0,W|0,1048576,0)|0;Ba=Yd(Ba|0,D|0,21)|0;x=D;ma=we(rc|0,qc|0,pc|0,ma|0)|0;ma=we(ma|0,D|0,Ba|0,x|0)|0;xa=we(ma|0,D|0,xa&2097151|0,0)|0;ma=D;x=Wd(Ba|0,x|0,21)|0;x=te(Aa|0,W|0,x|0,D|0)|0;W=D;Aa=we(Fa|0,Ea|0,1048576,0)|0;Aa=Yd(Aa|0,D|0,21)|0;Ba=D;lc=we(oc|0,nc|0,mc|0,lc|0)|0;va=we(lc|0,D|0,kc|0,va|0)|0;ia=we(va|0,D|0,ua|0,ia|0)|0;ib=we(ia|0,D|0,ib&2097151|0,0)|0;ib=we(ib|0,D|0,Aa|0,Ba|0)|0;ia=D;Ba=Wd(Aa|0,Ba|0,21)|0;Aa=D;ua=we(za|0,ya|0,1048576,0)|0;ua=Jd(ua|0,D|0,21)|0;va=D;gc=we(jc|0,ic|0,hc|0,gc|0)|0;ec=we(gc|0,D|0,fc|0,ec|0)|0;cc=we(ec|0,D|0,dc|0,cc|0)|0;Ga=we(cc|0,D|0,bc|0,Ga|0)|0;u=we(Ga|0,D|0,Ha|0,u|0)|0;y=we(u|0,D|0,y&2097151|0,0)|0;y=we(y|0,D|0,ua|0,va|0)|0;u=D;va=Wd(ua|0,va|0,21)|0;ua=D;Ha=we(Qa|0,Ra|0,1048576,0)|0;Ha=Jd(Ha|0,D|0,21)|0;Ga=D;Zb=we(ac|0,$b|0,_b|0,Zb|0)|0;Xb=we(Zb|0,D|0,Yb|0,Xb|0)|0;Vb=we(Xb|0,D|0,Wb|0,Vb|0)|0;Tb=we(Vb|0,D|0,Ub|0,Tb|0)|0;Rb=we(Tb|0,D|0,Sb|0,Rb|0)|0;Pb=we(Rb|0,D|0,Qb|0,Pb|0)|0;da=we(Pb|0,D|0,X|0,da|0)|0;h=we(da|0,D|0,B|0,h|0)|0;h=we(h|0,D|0,Ha|0,Ga|0)|0;B=D;Ga=Wd(Ha|0,Ga|0,21)|0;Ha=D;da=we(Y|0,Z|0,1048576,0)|0;da=Jd(da|0,D|0,21)|0;X=D;Lb=we(Ob|0,Nb|0,Mb|0,Lb|0)|0;Jb=we(Lb|0,D|0,Kb|0,Jb|0)|0;Hb=we(Jb|0,D|0,Ib|0,Hb|0)|0;Fb=we(Hb|0,D|0,Gb|0,Fb|0)|0;Db=we(Fb|0,D|0,Eb|0,Db|0)|0;Bb=we(Db|0,D|0,Cb|0,Bb|0)|0;zb=we(Bb|0,D|0,Ab|0,zb|0)|0;ta=we(zb|0,D|0,yb|0,ta|0)|0;H=we(ta|0,D|0,sa|0,H|0)|0;G=we(H|0,D|0,G&2097151|0,0)|0;G=we(G|0,D|0,da|0,X|0)|0;H=D;X=Wd(da|0,X|0,21)|0;da=D;sa=we(N|0,M|0,1048576,0)|0;sa=Jd(sa|0,D|0,21)|0;ta=D;aa=we(xb|0,wb|0,ba|0,aa|0)|0;Xa=we(aa|0,D|0,Wa|0,Xa|0)|0;V=we(Xa|0,D|0,U|0,V|0)|0;hb=we(V|0,D|0,gb|0,hb|0)|0;Pa=we(hb|0,D|0,Oa|0,Pa|0)|0;C=we(Pa|0,D|0,J|0,C|0)|0;pb=we(C|0,D|0,ob|0,pb|0)|0;R=we(pb|0,D|0,Q|0,R|0)|0;bb=we(R|0,D|0,ab|0,bb|0)|0;P=we(bb|0,D|0,O|0,P|0)|0;db=we(P|0,D|0,jb|0,db|0)|0;i=we(db|0,D|0,c|0,i|0)|0;i=we(i|0,D|0,sa|0,ta|0)|0;c=D;ta=Wd(sa|0,ta|0,21)|0;sa=D;db=we(rb|0,qb|0,1048576,0)|0;db=Jd(db|0,D|0,21)|0;jb=D;v=we(Za|0,Ya|0,q|0,v|0)|0;ga=we(v|0,D|0,Na|0,ga|0)|0;pa=we(ga|0,D|0,qa|0,pa|0)|0;ka=we(pa|0,D|0,la|0,ka|0)|0;tb=we(ka|0,D|0,sb|0,tb|0)|0;kb=we(tb|0,D|0,ha|0,kb|0)|0;$=we(kb|0,D|0,fa|0,$|0)|0;fb=we($|0,D|0,eb|0,fb|0)|0;w=we(fb|0,D|0,A|0,w|0)|0;w=we(w|0,D|0,db|0,jb|0)|0;A=D;jb=Wd(db|0,jb|0,21)|0;db=D;fb=we(mb|0,nb|0,1048576,0)|0;fb=Jd(fb|0,D|0,21)|0;eb=D;l=we(oa|0,p|0,ea|0,l|0)|0;F=we(l|0,D|0,ja|0,F|0)|0;s=we(F|0,D|0,_|0,s|0)|0;g=we(s|0,D|0,n|0,g|0)|0;t=we(g|0,D|0,E|0,t|0)|0;$a=we(t|0,D|0,_a|0,$a|0)|0;r=we($a|0,D|0,z|0,r|0)|0;r=we(r|0,D|0,fb|0,eb|0)|0;z=D;eb=Wd(fb|0,eb|0,21)|0;fb=D;$a=we(vb|0,j|0,1048576,0)|0;$a=Jd($a|0,D|0,21)|0;_a=D;k=we(Sa|0,Ta|0,m|0,k|0)|0;Ua=we(k|0,D|0,Va|0,Ua|0)|0;S=we(Ua|0,D|0,T|0,S|0)|0;Ka=we(S|0,D|0,e|0,Ka|0)|0;L=we(Ka|0,D|0,Ma|0,L|0)|0;L=we(L|0,D|0,$a|0,_a|0)|0;Ma=D;_a=Wd($a|0,_a|0,21)|0;$a=D;Ka=we(f|0,ca|0,1048576,0)|0;Ka=Jd(Ka|0,D|0,21)|0;e=D;na=we(cb|0,ra|0,wa|0,na|0)|0;I=we(na|0,D|0,Ca|0,I|0)|0;Ja=we(I|0,D|0,lb|0,Ja|0)|0;Ja=we(Ja|0,D|0,Ka|0,e|0)|0;lb=D;e=Wd(Ka|0,e|0,21)|0;e=te(f|0,ca|0,e|0,D|0)|0;ca=D;f=we(ub|0,La|0,1048576,0)|0;f=Jd(f|0,D|0,21)|0;Ka=D;Ia=we(K|0,Ia|0,f|0,Ka|0)|0;K=D;Ka=Wd(f|0,Ka|0,21)|0;Ka=te(ub|0,La|0,Ka|0,D|0)|0;La=D;ub=we(Da|0,o|0,1048576,0)|0;ub=Jd(ub|0,D|0,21)|0;f=D;I=Wd(ub|0,f|0,21)|0;I=te(Da|0,o|0,I|0,D|0)|0;o=D;Da=we(xa|0,ma|0,1048576,0)|0;Da=Yd(Da|0,D|0,21)|0;Ca=D;na=Wd(Da|0,Ca|0,21)|0;na=te(xa|0,ma|0,na|0,D|0)|0;ma=D;xa=we(ib|0,ia|0,1048576,0)|0;xa=Jd(xa|0,D|0,21)|0;wa=D;ra=Wd(xa|0,wa|0,21)|0;ra=te(ib|0,ia|0,ra|0,D|0)|0;ia=D;ib=we(y|0,u|0,1048576,0)|0;ib=Jd(ib|0,D|0,21)|0;cb=D;S=Wd(ib|0,cb|0,21)|0;T=D;Ua=we(h|0,B|0,1048576,0)|0;Ua=Jd(Ua|0,D|0,21)|0;Va=D;k=Wd(Ua|0,Va|0,21)|0;m=D;Ta=we(G|0,H|0,1048576,0)|0;Ta=Jd(Ta|0,D|0,21)|0;Sa=D;t=Wd(Ta|0,Sa|0,21)|0;E=D;g=we(i|0,c|0,1048576,0)|0;g=Jd(g|0,D|0,21)|0;n=D;s=Wd(g|0,n|0,21)|0;_=D;F=we(w|0,A|0,1048576,0)|0;F=Jd(F|0,D|0,21)|0;ja=D;l=Wd(F|0,ja|0,21)|0;ea=D;p=we(r|0,z|0,1048576,0)|0;p=Jd(p|0,D|0,21)|0;oa=D;$=Wd(p|0,oa|0,21)|0;fa=D;kb=we(L|0,Ma|0,1048576,0)|0;kb=Jd(kb|0,D|0,21)|0;ha=D;ca=we(kb|0,ha|0,e|0,ca|0)|0;e=D;ha=Wd(kb|0,ha|0,21)|0;ha=te(L|0,Ma|0,ha|0,D|0)|0;Ma=D;L=we(Ja|0,lb|0,1048576,0)|0;L=Jd(L|0,D|0,21)|0;kb=D;La=we(L|0,kb|0,Ka|0,La|0)|0;Ka=D;kb=Wd(L|0,kb|0,21)|0;kb=te(Ja|0,lb|0,kb|0,D|0)|0;lb=D;Ja=we(Ia|0,K|0,1048576,0)|0;Ja=Jd(Ja|0,D|0,21)|0;L=D;o=we(Ja|0,L|0,I|0,o|0)|0;I=D;L=Wd(Ja|0,L|0,21)|0;L=te(Ia|0,K|0,L|0,D|0)|0;K=D;Ia=Kd(ub|0,f|0,666643,0)|0;Ja=D;tb=Kd(ub|0,f|0,470296,0)|0;sb=D;ka=Kd(ub|0,f|0,654183,0)|0;la=D;pa=Kd(ub|0,f|0,-997805,-1)|0;qa=D;ga=Kd(ub|0,f|0,136657,0)|0;Na=D;f=Kd(ub|0,f|0,-683901,-1)|0;f=we(vb|0,j|0,f|0,D|0)|0;$a=te(f|0,D|0,_a|0,$a|0)|0;oa=we($a|0,D|0,p|0,oa|0)|0;p=D;$a=Kd(o|0,I|0,666643,0)|0;_a=D;f=Kd(o|0,I|0,470296,0)|0;j=D;vb=Kd(o|0,I|0,654183,0)|0;ub=D;v=Kd(o|0,I|0,-997805,-1)|0;q=D;Ya=Kd(o|0,I|0,136657,0)|0;Za=D;I=Kd(o|0,I|0,-683901,-1)|0;o=D;P=Kd(L|0,K|0,666643,0)|0;O=D;bb=Kd(L|0,K|0,470296,0)|0;ab=D;R=Kd(L|0,K|0,654183,0)|0;Q=D;pb=Kd(L|0,K|0,-997805,-1)|0;ob=D;C=Kd(L|0,K|0,136657,0)|0;J=D;K=Kd(L|0,K|0,-683901,-1)|0;L=D;qa=we(mb|0,nb|0,pa|0,qa|0)|0;Za=we(qa|0,D|0,Ya|0,Za|0)|0;L=we(Za|0,D|0,K|0,L|0)|0;fb=te(L|0,D|0,eb|0,fb|0)|0;ja=we(fb|0,D|0,F|0,ja|0)|0;F=D;fb=Kd(La|0,Ka|0,666643,0)|0;eb=D;L=Kd(La|0,Ka|0,470296,0)|0;K=D;Za=Kd(La|0,Ka|0,654183,0)|0;Ya=D;qa=Kd(La|0,Ka|0,-997805,-1)|0;pa=D;nb=Kd(La|0,Ka|0,136657,0)|0;mb=D;Ka=Kd(La|0,Ka|0,-683901,-1)|0;La=D;Pa=Kd(kb|0,lb|0,666643,0)|0;Oa=D;hb=Kd(kb|0,lb|0,470296,0)|0;gb=D;V=Kd(kb|0,lb|0,654183,0)|0;U=D;Xa=Kd(kb|0,lb|0,-997805,-1)|0;Wa=D;aa=Kd(kb|0,lb|0,136657,0)|0;ba=D;lb=Kd(kb|0,lb|0,-683901,-1)|0;kb=D;sb=we(vb|0,ub|0,tb|0,sb|0)|0;qb=we(sb|0,D|0,rb|0,qb|0)|0;ob=we(qb|0,D|0,pb|0,ob|0)|0;mb=we(ob|0,D|0,nb|0,mb|0)|0;kb=we(mb|0,D|0,lb|0,kb|0)|0;db=te(kb|0,D|0,jb|0,db|0)|0;n=we(db|0,D|0,g|0,n|0)|0;g=D;db=Kd(ca|0,e|0,666643,0)|0;db=we(ib|0,cb|0,db|0,D|0)|0;Ra=we(db|0,D|0,Qa|0,Ra|0)|0;Ha=te(Ra|0,D|0,Ga|0,Ha|0)|0;Ga=D;Ra=Kd(ca|0,e|0,470296,0)|0;Qa=D;db=Kd(ca|0,e|0,654183,0)|0;cb=D;eb=we(hb|0,gb|0,fb|0,eb|0)|0;cb=we(eb|0,D|0,db|0,cb|0)|0;Va=we(cb|0,D|0,Ua|0,Va|0)|0;Z=we(Va|0,D|0,Y|0,Z|0)|0;da=te(Z|0,D|0,X|0,da|0)|0;X=D;Z=Kd(ca|0,e|0,-997805,-1)|0;Y=D;Va=Kd(ca|0,e|0,136657,0)|0;Ua=D;_a=we(bb|0,ab|0,$a|0,_a|0)|0;Ya=we(_a|0,D|0,Za|0,Ya|0)|0;Wa=we(Ya|0,D|0,Xa|0,Wa|0)|0;Ua=we(Wa|0,D|0,Va|0,Ua|0)|0;Sa=we(Ua|0,D|0,Ta|0,Sa|0)|0;M=we(Sa|0,D|0,N|0,M|0)|0;sa=te(M|0,D|0,ta|0,sa|0)|0;ta=D;e=Kd(ca|0,e|0,-683901,-1)|0;ca=D;M=we(Ha|0,Ga|0,1048576,0)|0;M=Jd(M|0,D|0,21)|0;N=D;Oa=we(Ra|0,Qa|0,Pa|0,Oa|0)|0;B=we(Oa|0,D|0,h|0,B|0)|0;m=te(B|0,D|0,k|0,m|0)|0;m=we(m|0,D|0,M|0,N|0)|0;k=D;N=Wd(M|0,N|0,21)|0;M=D;B=we(da|0,X|0,1048576,0)|0;B=Jd(B|0,D|0,21)|0;h=D;O=we(L|0,K|0,P|0,O|0)|0;U=we(O|0,D|0,V|0,U|0)|0;Y=we(U|0,D|0,Z|0,Y|0)|0;H=we(Y|0,D|0,G|0,H|0)|0;E=te(H|0,D|0,t|0,E|0)|0;E=we(E|0,D|0,B|0,h|0)|0;t=D;h=Wd(B|0,h|0,21)|0;B=D;H=we(sa|0,ta|0,1048576,0)|0;H=Jd(H|0,D|0,21)|0;G=D;Ja=we(f|0,j|0,Ia|0,Ja|0)|0;Q=we(Ja|0,D|0,R|0,Q|0)|0;pa=we(Q|0,D|0,qa|0,pa|0)|0;ba=we(pa|0,D|0,aa|0,ba|0)|0;ca=we(ba|0,D|0,e|0,ca|0)|0;c=we(ca|0,D|0,i|0,c|0)|0;_=te(c|0,D|0,s|0,_|0)|0;_=we(_|0,D|0,H|0,G|0)|0;s=D;G=Wd(H|0,G|0,21)|0;H=D;c=we(n|0,g|0,1048576,0)|0;c=Jd(c|0,D|0,21)|0;i=D;la=we(v|0,q|0,ka|0,la|0)|0;J=we(la|0,D|0,C|0,J|0)|0;La=we(J|0,D|0,Ka|0,La|0)|0;A=we(La|0,D|0,w|0,A|0)|0;ea=te(A|0,D|0,l|0,ea|0)|0;ea=we(ea|0,D|0,c|0,i|0)|0;l=D;i=Wd(c|0,i|0,21)|0;i=te(n|0,g|0,i|0,D|0)|0;g=D;n=we(ja|0,F|0,1048576,0)|0;n=Jd(n|0,D|0,21)|0;c=D;Na=we(I|0,o|0,ga|0,Na|0)|0;z=we(Na|0,D|0,r|0,z|0)|0;fa=te(z|0,D|0,$|0,fa|0)|0;fa=we(fa|0,D|0,n|0,c|0)|0;$=D;c=Wd(n|0,c|0,21)|0;c=te(ja|0,F|0,c|0,D|0)|0;F=D;ja=we(oa|0,p|0,1048576,0)|0;ja=Jd(ja|0,D|0,21)|0;n=D;Ma=we(ja|0,n|0,ha|0,Ma|0)|0;ha=D;n=Wd(ja|0,n|0,21)|0;n=te(oa|0,p|0,n|0,D|0)|0;p=D;oa=we(m|0,k|0,1048576,0)|0;oa=Jd(oa|0,D|0,21)|0;ja=D;z=Wd(oa|0,ja|0,21)|0;r=D;Na=we(E|0,t|0,1048576,0)|0;Na=Jd(Na|0,D|0,21)|0;ga=D;o=Wd(Na|0,ga|0,21)|0;I=D;A=we(_|0,s|0,1048576,0)|0;A=Jd(A|0,D|0,21)|0;w=D;g=we(A|0,w|0,i|0,g|0)|0;i=D;w=Wd(A|0,w|0,21)|0;w=te(_|0,s|0,w|0,D|0)|0;s=D;_=we(ea|0,l|0,1048576,0)|0;_=Jd(_|0,D|0,21)|0;A=D;F=we(_|0,A|0,c|0,F|0)|0;c=D;A=Wd(_|0,A|0,21)|0;A=te(ea|0,l|0,A|0,D|0)|0;l=D;ea=we(fa|0,$|0,1048576,0)|0;ea=Jd(ea|0,D|0,21)|0;_=D;p=we(ea|0,_|0,n|0,p|0)|0;n=D;_=Wd(ea|0,_|0,21)|0;_=te(fa|0,$|0,_|0,D|0)|0;$=D;fa=Kd(Ma|0,ha|0,666643,0)|0;ea=D;La=Kd(Ma|0,ha|0,470296,0)|0;Ka=D;J=Kd(Ma|0,ha|0,654183,0)|0;C=D;la=Kd(Ma|0,ha|0,-997805,-1)|0;ka=D;q=Kd(Ma|0,ha|0,136657,0)|0;v=D;ha=Kd(Ma|0,ha|0,-683901,-1)|0;ha=we(Na|0,ga|0,ha|0,D|0)|0;ta=we(ha|0,D|0,sa|0,ta|0)|0;H=te(ta|0,D|0,G|0,H|0)|0;G=D;ta=Kd(p|0,n|0,666643,0)|0;sa=D;ha=Kd(p|0,n|0,470296,0)|0;ga=D;Na=Kd(p|0,n|0,654183,0)|0;Ma=D;ca=Kd(p|0,n|0,-997805,-1)|0;e=D;ba=Kd(p|0,n|0,136657,0)|0;aa=D;n=Kd(p|0,n|0,-683901,-1)|0;p=D;pa=Kd(_|0,$|0,666643,0)|0;pa=we(ra|0,ia|0,pa|0,D|0)|0;ia=D;ra=Kd(_|0,$|0,470296,0)|0;qa=D;Q=Kd(_|0,$|0,654183,0)|0;R=D;Ja=Kd(_|0,$|0,-997805,-1)|0;Ia=D;j=Kd(_|0,$|0,136657,0)|0;f=D;$=Kd(_|0,$|0,-683901,-1)|0;_=D;ka=we(ba|0,aa|0,la|0,ka|0)|0;_=we(ka|0,D|0,$|0,_|0)|0;ja=we(_|0,D|0,oa|0,ja|0)|0;X=we(ja|0,D|0,da|0,X|0)|0;B=te(X|0,D|0,h|0,B|0)|0;h=D;X=Kd(F|0,c|0,666643,0)|0;da=D;ja=Kd(F|0,c|0,470296,0)|0;ja=we(pa|0,ia|0,ja|0,D|0)|0;ia=D;pa=Kd(F|0,c|0,654183,0)|0;oa=D;_=Kd(F|0,c|0,-997805,-1)|0;$=D;ka=Kd(F|0,c|0,136657,0)|0;la=D;c=Kd(F|0,c|0,-683901,-1)|0;F=D;aa=Kd(A|0,l|0,666643,0)|0;ba=D;Y=Kd(A|0,l|0,470296,0)|0;Z=D;U=Kd(A|0,l|0,654183,0)|0;V=D;O=Kd(A|0,l|0,-997805,-1)|0;P=D;K=Kd(A|0,l|0,136657,0)|0;L=D;l=Kd(A|0,l|0,-683901,-1)|0;A=D;Ka=we(Na|0,Ma|0,La|0,Ka|0)|0;Ia=we(Ka|0,D|0,Ja|0,Ia|0)|0;Ga=we(Ia|0,D|0,Ha|0,Ga|0)|0;M=te(Ga|0,D|0,N|0,M|0)|0;la=we(M|0,D|0,ka|0,la|0)|0;A=we(la|0,D|0,l|0,A|0)|0;l=D;la=Kd(g|0,i|0,666643,0)|0;W=we(la|0,D|0,x|0,W|0)|0;x=D;la=Kd(g|0,i|0,470296,0)|0;ka=D;M=Kd(g|0,i|0,654183,0)|0;N=D;Ca=we(Fa|0,Ea|0,Da|0,Ca|0)|0;Aa=te(Ca|0,D|0,Ba|0,Aa|0)|0;da=we(Aa|0,D|0,X|0,da|0)|0;N=we(da|0,D|0,M|0,N|0)|0;Z=we(N|0,D|0,Y|0,Z|0)|0;Y=D;N=Kd(g|0,i|0,-997805,-1)|0;M=D;da=Kd(g|0,i|0,136657,0)|0;X=D;wa=we(za|0,ya|0,xa|0,wa|0)|0;ua=te(wa|0,D|0,va|0,ua|0)|0;sa=we(ua|0,D|0,ta|0,sa|0)|0;qa=we(sa|0,D|0,ra|0,qa|0)|0;oa=we(qa|0,D|0,pa|0,oa|0)|0;X=we(oa|0,D|0,da|0,X|0)|0;P=we(X|0,D|0,O|0,P|0)|0;O=D;i=Kd(g|0,i|0,-683901,-1)|0;g=D;X=we(W|0,x|0,1048576,0)|0;X=Jd(X|0,D|0,21)|0;da=D;ka=we(na|0,ma|0,la|0,ka|0)|0;ba=we(ka|0,D|0,aa|0,ba|0)|0;ba=we(ba|0,D|0,X|0,da|0)|0;aa=D;da=Wd(X|0,da|0,21)|0;da=te(W|0,x|0,da|0,D|0)|0;x=D;W=we(Z|0,Y|0,1048576,0)|0;W=Jd(W|0,D|0,21)|0;X=D;M=we(ja|0,ia|0,N|0,M|0)|0;V=we(M|0,D|0,U|0,V|0)|0;V=we(V|0,D|0,W|0,X|0)|0;U=D;X=Wd(W|0,X|0,21)|0;W=D;M=we(P|0,O|0,1048576,0)|0;M=Jd(M|0,D|0,21)|0;N=D;ea=we(ha|0,ga|0,fa|0,ea|0)|0;u=we(ea|0,D|0,y|0,u|0)|0;R=we(u|0,D|0,Q|0,R|0)|0;T=te(R|0,D|0,S|0,T|0)|0;$=we(T|0,D|0,_|0,$|0)|0;g=we($|0,D|0,i|0,g|0)|0;L=we(g|0,D|0,K|0,L|0)|0;L=we(L|0,D|0,M|0,N|0)|0;K=D;N=Wd(M|0,N|0,21)|0;M=D;g=we(A|0,l|0,1048576,0)|0;g=Jd(g|0,D|0,21)|0;i=D;C=we(ca|0,e|0,J|0,C|0)|0;f=we(C|0,D|0,j|0,f|0)|0;k=we(f|0,D|0,m|0,k|0)|0;r=te(k|0,D|0,z|0,r|0)|0;F=we(r|0,D|0,c|0,F|0)|0;F=we(F|0,D|0,g|0,i|0)|0;c=D;i=Wd(g|0,i|0,21)|0;i=te(A|0,l|0,i|0,D|0)|0;l=D;A=we(B|0,h|0,1048576,0)|0;A=Jd(A|0,D|0,21)|0;g=D;v=we(n|0,p|0,q|0,v|0)|0;t=we(v|0,D|0,E|0,t|0)|0;I=te(t|0,D|0,o|0,I|0)|0;I=we(I|0,D|0,A|0,g|0)|0;o=D;g=Wd(A|0,g|0,21)|0;g=te(B|0,h|0,g|0,D|0)|0;h=D;B=we(H|0,G|0,1048576,0)|0;B=Jd(B|0,D|0,21)|0;A=D;s=we(w|0,s|0,B|0,A|0)|0;w=D;A=Wd(B|0,A|0,21)|0;B=D;t=we(ba|0,aa|0,1048576,0)|0;t=Jd(t|0,D|0,21)|0;E=D;v=Wd(t|0,E|0,21)|0;q=D;p=we(V|0,U|0,1048576,0)|0;p=Jd(p|0,D|0,21)|0;n=D;r=Wd(p|0,n|0,21)|0;z=D;k=we(L|0,K|0,1048576,0)|0;k=Jd(k|0,D|0,21)|0;m=D;l=we(i|0,l|0,k|0,m|0)|0;i=D;m=Wd(k|0,m|0,21)|0;k=D;f=we(F|0,c|0,1048576,0)|0;f=Jd(f|0,D|0,21)|0;j=D;h=we(g|0,h|0,f|0,j|0)|0;g=D;j=Wd(f|0,j|0,21)|0;j=te(F|0,c|0,j|0,D|0)|0;c=D;F=we(I|0,o|0,1048576,0)|0;F=Jd(F|0,D|0,21)|0;f=D;C=Wd(F|0,f|0,21)|0;C=te(I|0,o|0,C|0,D|0)|0;o=D;I=we(s|0,w|0,1048576,0)|0;I=Jd(I|0,D|0,21)|0;J=D;e=Wd(I|0,J|0,21)|0;e=te(s|0,w|0,e|0,D|0)|0;w=D;s=Kd(I|0,J|0,666643,0)|0;s=we(da|0,x|0,s|0,D|0)|0;x=D;da=Kd(I|0,J|0,470296,0)|0;ca=D;$=Kd(I|0,J|0,654183,0)|0;_=D;T=Kd(I|0,J|0,-997805,-1)|0;S=D;R=Kd(I|0,J|0,136657,0)|0;Q=D;J=Kd(I|0,J|0,-683901,-1)|0;I=D;u=Jd(s|0,x|0,21)|0;y=D;aa=we(da|0,ca|0,ba|0,aa|0)|0;q=te(aa|0,D|0,v|0,q|0)|0;q=we(q|0,D|0,u|0,y|0)|0;v=D;y=Wd(u|0,y|0,21)|0;y=te(s|0,x|0,y|0,D|0)|0;x=D;s=Jd(q|0,v|0,21)|0;u=D;Y=we($|0,_|0,Z|0,Y|0)|0;W=te(Y|0,D|0,X|0,W|0)|0;E=we(W|0,D|0,t|0,E|0)|0;E=we(E|0,D|0,s|0,u|0)|0;t=D;u=Wd(s|0,u|0,21)|0;u=te(q|0,v|0,u|0,D|0)|0;v=D;q=Jd(E|0,t|0,21)|0;s=D;S=we(V|0,U|0,T|0,S|0)|0;z=te(S|0,D|0,r|0,z|0)|0;z=we(z|0,D|0,q|0,s|0)|0;r=D;s=Wd(q|0,s|0,21)|0;s=te(E|0,t|0,s|0,D|0)|0;t=D;E=Jd(z|0,r|0,21)|0;q=D;O=we(R|0,Q|0,P|0,O|0)|0;M=te(O|0,D|0,N|0,M|0)|0;n=we(M|0,D|0,p|0,n|0)|0;n=we(n|0,D|0,E|0,q|0)|0;p=D;q=Wd(E|0,q|0,21)|0;q=te(z|0,r|0,q|0,D|0)|0;r=D;z=Jd(n|0,p|0,21)|0;E=D;I=we(L|0,K|0,J|0,I|0)|0;k=te(I|0,D|0,m|0,k|0)|0;k=we(k|0,D|0,z|0,E|0)|0;m=D;E=Wd(z|0,E|0,21)|0;E=te(n|0,p|0,E|0,D|0)|0;p=D;n=Jd(k|0,m|0,21)|0;z=D;i=we(l|0,i|0,n|0,z|0)|0;l=D;z=Wd(n|0,z|0,21)|0;z=te(k|0,m|0,z|0,D|0)|0;m=D;k=Jd(i|0,l|0,21)|0;n=D;c=we(k|0,n|0,j|0,c|0)|0;j=D;n=Wd(k|0,n|0,21)|0;n=te(i|0,l|0,n|0,D|0)|0;l=D;i=Jd(c|0,j|0,21)|0;k=D;g=we(h|0,g|0,i|0,k|0)|0;h=D;k=Wd(i|0,k|0,21)|0;k=te(c|0,j|0,k|0,D|0)|0;j=D;c=Jd(g|0,h|0,21)|0;i=D;o=we(c|0,i|0,C|0,o|0)|0;C=D;i=Wd(c|0,i|0,21)|0;i=te(g|0,h|0,i|0,D|0)|0;h=D;g=Jd(o|0,C|0,21)|0;c=D;f=we(H|0,G|0,F|0,f|0)|0;B=te(f|0,D|0,A|0,B|0)|0;B=we(B|0,D|0,g|0,c|0)|0;A=D;c=Wd(g|0,c|0,21)|0;c=te(o|0,C|0,c|0,D|0)|0;C=D;o=Jd(B|0,A|0,21)|0;g=D;w=we(o|0,g|0,e|0,w|0)|0;e=D;g=Wd(o|0,g|0,21)|0;g=te(B|0,A|0,g|0,D|0)|0;A=D;B=Jd(w|0,e|0,21)|0;o=D;f=Wd(B|0,o|0,21)|0;f=te(w|0,e|0,f|0,D|0)|0;e=D;w=Kd(B|0,o|0,666643,0)|0;x=we(w|0,D|0,y|0,x|0)|0;y=D;w=Kd(B|0,o|0,470296,0)|0;w=we(u|0,v|0,w|0,D|0)|0;v=D;u=Kd(B|0,o|0,654183,0)|0;u=we(s|0,t|0,u|0,D|0)|0;t=D;s=Kd(B|0,o|0,-997805,-1)|0;s=we(q|0,r|0,s|0,D|0)|0;r=D;q=Kd(B|0,o|0,136657,0)|0;q=we(E|0,p|0,q|0,D|0)|0;p=D;o=Kd(B|0,o|0,-683901,-1)|0;o=we(z|0,m|0,o|0,D|0)|0;m=D;z=Jd(x|0,y|0,21)|0;B=D;v=we(w|0,v|0,z|0,B|0)|0;w=D;B=Wd(z|0,B|0,21)|0;B=te(x|0,y|0,B|0,D|0)|0;y=D;x=Jd(v|0,w|0,21)|0;z=D;t=we(u|0,t|0,x|0,z|0)|0;u=D;z=Wd(x|0,z|0,21)|0;z=te(v|0,w|0,z|0,D|0)|0;w=D;v=Jd(t|0,u|0,21)|0;x=D;r=we(s|0,r|0,v|0,x|0)|0;s=D;x=Wd(v|0,x|0,21)|0;x=te(t|0,u|0,x|0,D|0)|0;u=D;t=Jd(r|0,s|0,21)|0;v=D;p=we(q|0,p|0,t|0,v|0)|0;q=D;v=Wd(t|0,v|0,21)|0;v=te(r|0,s|0,v|0,D|0)|0;s=D;r=Jd(p|0,q|0,21)|0;t=D;m=we(o|0,m|0,r|0,t|0)|0;o=D;t=Wd(r|0,t|0,21)|0;t=te(p|0,q|0,t|0,D|0)|0;q=D;p=Jd(m|0,o|0,21)|0;r=D;l=we(p|0,r|0,n|0,l|0)|0;n=D;r=Wd(p|0,r|0,21)|0;r=te(m|0,o|0,r|0,D|0)|0;o=D;m=Jd(l|0,n|0,21)|0;p=D;j=we(m|0,p|0,k|0,j|0)|0;k=D;p=Wd(m|0,p|0,21)|0;p=te(l|0,n|0,p|0,D|0)|0;n=D;l=Jd(j|0,k|0,21)|0;m=D;h=we(l|0,m|0,i|0,h|0)|0;i=D;m=Wd(l|0,m|0,21)|0;m=te(j|0,k|0,m|0,D|0)|0;k=D;j=Jd(h|0,i|0,21)|0;l=D;C=we(j|0,l|0,c|0,C|0)|0;c=D;l=Wd(j|0,l|0,21)|0;l=te(h|0,i|0,l|0,D|0)|0;i=D;h=Jd(C|0,c|0,21)|0;j=D;A=we(h|0,j|0,g|0,A|0)|0;g=D;j=Wd(h|0,j|0,21)|0;j=te(C|0,c|0,j|0,D|0)|0;c=D;C=Jd(A|0,g|0,21)|0;h=D;e=we(C|0,h|0,f|0,e|0)|0;f=D;h=Wd(C|0,h|0,21)|0;h=te(A|0,g|0,h|0,D|0)|0;g=D;a[b>>0]=B;A=Yd(B|0,y|0,8)|0;a[b+1>>0]=A;y=Yd(B|0,y|0,16)|0;B=D;A=Wd(z|0,w|0,5)|0;a[b+2>>0]=A|y;y=Yd(z|0,w|0,3)|0;a[b+3>>0]=y;y=Yd(z|0,w|0,11)|0;a[b+4>>0]=y;w=Yd(z|0,w|0,19)|0;z=D;y=Wd(x|0,u|0,2)|0;a[b+5>>0]=y|w;w=Yd(x|0,u|0,6)|0;a[b+6>>0]=w;u=Yd(x|0,u|0,14)|0;x=D;w=Wd(v|0,s|0,7)|0;a[b+7>>0]=w|u;u=Yd(v|0,s|0,1)|0;a[b+8>>0]=u;u=Yd(v|0,s|0,9)|0;a[b+9>>0]=u;s=Yd(v|0,s|0,17)|0;v=D;u=Wd(t|0,q|0,4)|0;a[b+10>>0]=u|s;s=Yd(t|0,q|0,4)|0;a[b+11>>0]=s;s=Yd(t|0,q|0,12)|0;a[b+12>>0]=s;q=Yd(t|0,q|0,20)|0;t=D;s=Wd(r|0,o|0,1)|0;a[b+13>>0]=s|q;q=Yd(r|0,o|0,7)|0;a[b+14>>0]=q;o=Yd(r|0,o|0,15)|0;r=D;q=Wd(p|0,n|0,6)|0;a[b+15>>0]=q|o;o=Yd(p|0,n|0,2)|0;a[b+16>>0]=o;o=Yd(p|0,n|0,10)|0;a[b+17>>0]=o;n=Yd(p|0,n|0,18)|0;p=D;o=Wd(m|0,k|0,3)|0;a[b+18>>0]=o|n;n=Yd(m|0,k|0,5)|0;a[b+19>>0]=n;k=Yd(m|0,k|0,13)|0;a[b+20>>0]=k;a[b+21>>0]=l;k=Yd(l|0,i|0,8)|0;a[b+22>>0]=k;i=Yd(l|0,i|0,16)|0;l=D;k=Wd(j|0,c|0,5)|0;a[b+23>>0]=k|i;i=Yd(j|0,c|0,3)|0;a[b+24>>0]=i;i=Yd(j|0,c|0,11)|0;a[b+25>>0]=i;c=Yd(j|0,c|0,19)|0;j=D;i=Wd(h|0,g|0,2)|0;a[b+26>>0]=i|c;c=Yd(h|0,g|0,6)|0;a[b+27>>0]=c;g=Yd(h|0,g|0,14)|0;h=D;c=Wd(e|0,f|0,7)|0;a[b+28>>0]=g|c;c=Yd(e|0,f|0,1)|0;a[b+29>>0]=c;c=Yd(e|0,f|0,9)|0;a[b+30>>0]=c;f=Yd(e|0,f|0,17)|0;a[b+31>>0]=f;return}function ja(a,b,e,f){a=a|0;b=b|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0;g=0;do{s=b+(g<<3)|0;n=d[s+7>>0]|0;m=Wd(d[s+6>>0]|0|0,0,8)|0;t=D;o=Wd(d[s+5>>0]|0|0,0,16)|0;t=t|D;p=Wd(d[s+4>>0]|0|0,0,24)|0;t=t|D|(d[s+3>>0]|0);q=Wd(d[s+2>>0]|0|0,0,40)|0;t=t|D;r=Wd(d[s+1>>0]|0|0,0,48)|0;t=t|D;s=Wd(d[s>>0]|0|0,0,56)|0;u=e+(g<<3)|0;c[u>>2]=m|n|o|p|q|r|s;c[u+4>>2]=t|D;g=g+1|0}while((g|0)!=16);g=f;b=a;h=g+64|0;do{c[g>>2]=c[b>>2];g=g+4|0;b=b+4|0}while((g|0)<(h|0));t=0;g=c[e>>2]|0;b=c[e+4>>2]|0;while(1){P=c[f+32>>2]|0;p=c[f+32+4>>2]|0;h=Yd(P|0,p|0,14)|0;B=D;S=Wd(P|0,p|0,50)|0;B=D|B;R=Yd(P|0,p|0,18)|0;y=D;i=Wd(P|0,p|0,46)|0;y=B^(D|y);B=Yd(P|0,p|0,41)|0;v=D;K=Wd(P|0,p|0,23)|0;o=c[f+40>>2]|0;k=c[f+40+4>>2]|0;n=c[f+48>>2]|0;j=c[f+48+4>>2]|0;N=464+(t<<3)|0;q=c[N>>2]|0;N=c[N+4>>2]|0;x=c[f+56>>2]|0;A=c[f+56+4>>2]|0;v=we((S|h)^(i|R)^(K|B)|0,y^(D|v)|0,g|0,b|0)|0;N=we(v|0,D|0,q|0,N|0)|0;N=we(N|0,D|0,(n^o)&P^n|0,(j^k)&p^j|0)|0;A=we(N|0,D|0,x|0,A|0)|0;x=D;N=we(A|0,x|0,c[f+24>>2]|0,c[f+24+4>>2]|0)|0;q=D;c[f+24>>2]=N;c[f+24+4>>2]=q;v=c[f>>2]|0;y=c[f+4>>2]|0;g=Yd(v|0,y|0,28)|0;B=D;K=Wd(v|0,y|0,36)|0;B=D|B;R=Yd(v|0,y|0,34)|0;i=D;h=Wd(v|0,y|0,30)|0;i=B^(D|i);B=Yd(v|0,y|0,39)|0;S=D;m=Wd(v|0,y|0,25)|0;s=c[f+8>>2]|0;E=c[f+8+4>>2]|0;r=c[f+16>>2]|0;H=c[f+16+4>>2]|0;x=we((K|g)^(h|R)^(m|B)|0,i^(D|S)|0,A|0,x|0)|0;x=we(x|0,D|0,(r|s)&v|r&s|0,(H|E)&y|H&E|0)|0;A=D;c[f+56>>2]=x;c[f+56+4>>2]=A;S=Yd(N|0,q|0,14)|0;i=D;B=Wd(N|0,q|0,50)|0;i=D|i;m=Yd(N|0,q|0,18)|0;R=D;h=Wd(N|0,q|0,46)|0;R=i^(D|R);i=Yd(N|0,q|0,41)|0;g=D;K=Wd(N|0,q|0,23)|0;l=t|1;b=c[464+(l<<3)>>2]|0;u=c[464+(l<<3)+4>>2]|0;g=we((B|S)^(h|m)^(K|i)|0,R^(D|g)|0,c[e+(l<<3)>>2]|0,c[e+(l<<3)+4>>2]|0)|0;u=we(g|0,D|0,b|0,u|0)|0;p=we(u|0,D|0,(o^P)&N^o|0,(k^p)&q^k|0)|0;j=we(p|0,D|0,n|0,j|0)|0;n=D;H=we(j|0,n|0,r|0,H|0)|0;r=D;c[f+16>>2]=H;c[f+16+4>>2]=r;p=Yd(x|0,A|0,28)|0;P=D;u=Wd(x|0,A|0,36)|0;P=D|P;b=Yd(x|0,A|0,34)|0;g=D;R=Wd(x|0,A|0,30)|0;g=P^(D|g);P=Yd(x|0,A|0,39)|0;i=D;K=Wd(x|0,A|0,25)|0;n=we((u|p)^(R|b)^(K|P)|0,g^(D|i)|0,j|0,n|0)|0;y=we(n|0,D|0,(s|v)&x|s&v|0,(E|y)&A|E&y|0)|0;v=D;c[f+48>>2]=y;c[f+48+4>>2]=v;n=Yd(H|0,r|0,14)|0;j=D;i=Wd(H|0,r|0,50)|0;j=D|j;g=Yd(H|0,r|0,18)|0;P=D;K=Wd(H|0,r|0,46)|0;P=j^(D|P);j=Yd(H|0,r|0,41)|0;b=D;R=Wd(H|0,r|0,23)|0;p=c[f+32>>2]|0;u=c[f+32+4>>2]|0;m=t|2;h=c[464+(m<<3)>>2]|0;S=c[464+(m<<3)+4>>2]|0;b=we((i|n)^(K|g)^(R|j)|0,P^(D|b)|0,c[e+(m<<3)>>2]|0,c[e+(m<<3)+4>>2]|0)|0;S=we(b|0,D|0,h|0,S|0)|0;q=we(S|0,D|0,(p^N)&H^p|0,(u^q)&r^u|0)|0;k=we(q|0,D|0,o|0,k|0)|0;o=D;E=we(k|0,o|0,s|0,E|0)|0;s=D;c[f+8>>2]=E;c[f+8+4>>2]=s;q=Yd(y|0,v|0,28)|0;N=D;S=Wd(y|0,v|0,36)|0;N=D|N;h=Yd(y|0,v|0,34)|0;b=D;P=Wd(y|0,v|0,30)|0;b=N^(D|b);N=Yd(y|0,v|0,39)|0;j=D;R=Wd(y|0,v|0,25)|0;g=c[f>>2]|0;K=c[f+4>>2]|0;o=we((S|q)^(P|h)^(R|N)|0,b^(D|j)|0,k|0,o|0)|0;A=we(o|0,D|0,(g|x)&y|g&x|0,(K|A)&v|K&A|0)|0;x=D;c[f+40>>2]=A;c[f+40+4>>2]=x;o=Yd(E|0,s|0,14)|0;k=D;j=Wd(E|0,s|0,50)|0;k=D|k;b=Yd(E|0,s|0,18)|0;N=D;R=Wd(E|0,s|0,46)|0;N=k^(D|N);k=Yd(E|0,s|0,41)|0;h=D;P=Wd(E|0,s|0,23)|0;q=c[f+24>>2]|0;S=c[f+24+4>>2]|0;n=t|3;i=c[464+(n<<3)>>2]|0;B=c[464+(n<<3)+4>>2]|0;h=we((j|o)^(R|b)^(P|k)|0,N^(D|h)|0,c[e+(n<<3)>>2]|0,c[e+(n<<3)+4>>2]|0)|0;B=we(h|0,D|0,i|0,B|0)|0;r=we(B|0,D|0,(q^H)&E^q|0,(S^r)&s^S|0)|0;u=we(r|0,D|0,p|0,u|0)|0;p=D;K=we(u|0,p|0,g|0,K|0)|0;g=D;c[f>>2]=K;c[f+4>>2]=g;r=Yd(A|0,x|0,28)|0;H=D;B=Wd(A|0,x|0,36)|0;H=D|H;i=Yd(A|0,x|0,34)|0;h=D;N=Wd(A|0,x|0,30)|0;h=H^(D|h);H=Yd(A|0,x|0,39)|0;k=D;P=Wd(A|0,x|0,25)|0;b=c[f+56>>2]|0;R=c[f+56+4>>2]|0;p=we((B|r)^(N|i)^(P|H)|0,h^(D|k)|0,u|0,p|0)|0;v=we(p|0,D|0,(b|y)&A|b&y|0,(R|v)&x|R&v|0)|0;y=D;c[f+32>>2]=v;c[f+32+4>>2]=y;p=Yd(K|0,g|0,14)|0;u=D;k=Wd(K|0,g|0,50)|0;u=D|u;h=Yd(K|0,g|0,18)|0;H=D;P=Wd(K|0,g|0,46)|0;H=u^(D|H);u=Yd(K|0,g|0,41)|0;i=D;N=Wd(K|0,g|0,23)|0;r=c[f+16>>2]|0;B=c[f+16+4>>2]|0;o=t|4;j=c[464+(o<<3)>>2]|0;J=c[464+(o<<3)+4>>2]|0;i=we((k|p)^(P|h)^(N|u)|0,H^(D|i)|0,c[e+(o<<3)>>2]|0,c[e+(o<<3)+4>>2]|0)|0;J=we(i|0,D|0,j|0,J|0)|0;s=we(J|0,D|0,(r^E)&K^r|0,(B^s)&g^B|0)|0;S=we(s|0,D|0,q|0,S|0)|0;q=D;R=we(S|0,q|0,b|0,R|0)|0;b=D;c[f+56>>2]=R;c[f+56+4>>2]=b;s=Yd(v|0,y|0,28)|0;E=D;J=Wd(v|0,y|0,36)|0;E=D|E;j=Yd(v|0,y|0,34)|0;i=D;H=Wd(v|0,y|0,30)|0;i=E^(D|i);E=Yd(v|0,y|0,39)|0;u=D;N=Wd(v|0,y|0,25)|0;h=c[f+48>>2]|0;P=c[f+48+4>>2]|0;q=we((J|s)^(H|j)^(N|E)|0,i^(D|u)|0,S|0,q|0)|0;x=we(q|0,D|0,(h|A)&v|h&A|0,(P|x)&y|P&x|0)|0;A=D;c[f+24>>2]=x;c[f+24+4>>2]=A;q=Yd(R|0,b|0,14)|0;S=D;u=Wd(R|0,b|0,50)|0;S=D|S;i=Yd(R|0,b|0,18)|0;E=D;N=Wd(R|0,b|0,46)|0;E=S^(D|E);S=Yd(R|0,b|0,41)|0;j=D;H=Wd(R|0,b|0,23)|0;s=c[f+8>>2]|0;J=c[f+8+4>>2]|0;p=t|5;k=c[464+(p<<3)>>2]|0;F=c[464+(p<<3)+4>>2]|0;j=we((u|q)^(N|i)^(H|S)|0,E^(D|j)|0,c[e+(p<<3)>>2]|0,c[e+(p<<3)+4>>2]|0)|0;F=we(j|0,D|0,k|0,F|0)|0;g=we(F|0,D|0,(s^K)&R^s|0,(J^g)&b^J|0)|0;B=we(g|0,D|0,r|0,B|0)|0;r=D;P=we(B|0,r|0,h|0,P|0)|0;h=D;c[f+48>>2]=P;c[f+48+4>>2]=h;g=Yd(x|0,A|0,28)|0;K=D;F=Wd(x|0,A|0,36)|0;K=D|K;k=Yd(x|0,A|0,34)|0;j=D;E=Wd(x|0,A|0,30)|0;j=K^(D|j);K=Yd(x|0,A|0,39)|0;S=D;H=Wd(x|0,A|0,25)|0;i=c[f+40>>2]|0;N=c[f+40+4>>2]|0;r=we((F|g)^(E|k)^(H|K)|0,j^(D|S)|0,B|0,r|0)|0;y=we(r|0,D|0,(i|v)&x|i&v|0,(N|y)&A|N&y|0)|0;v=D;c[f+16>>2]=y;c[f+16+4>>2]=v;r=Yd(P|0,h|0,14)|0;B=D;S=Wd(P|0,h|0,50)|0;B=D|B;j=Yd(P|0,h|0,18)|0;K=D;H=Wd(P|0,h|0,46)|0;K=B^(D|K);B=Yd(P|0,h|0,41)|0;k=D;E=Wd(P|0,h|0,23)|0;g=c[f>>2]|0;F=c[f+4>>2]|0;q=t|6;u=c[464+(q<<3)>>2]|0;I=c[464+(q<<3)+4>>2]|0;k=we((S|r)^(H|j)^(E|B)|0,K^(D|k)|0,c[e+(q<<3)>>2]|0,c[e+(q<<3)+4>>2]|0)|0;I=we(k|0,D|0,u|0,I|0)|0;b=we(I|0,D|0,(g^R)&P^g|0,(F^b)&h^F|0)|0;J=we(b|0,D|0,s|0,J|0)|0;s=D;N=we(J|0,s|0,i|0,N|0)|0;i=D;c[f+40>>2]=N;c[f+40+4>>2]=i;b=Yd(y|0,v|0,28)|0;R=D;I=Wd(y|0,v|0,36)|0;R=D|R;u=Yd(y|0,v|0,34)|0;k=D;K=Wd(y|0,v|0,30)|0;k=R^(D|k);R=Yd(y|0,v|0,39)|0;B=D;E=Wd(y|0,v|0,25)|0;j=c[f+32>>2]|0;H=c[f+32+4>>2]|0;s=we((I|b)^(K|u)^(E|R)|0,k^(D|B)|0,J|0,s|0)|0;A=we(s|0,D|0,(j|x)&y|j&x|0,(H|A)&v|H&A|0)|0;x=D;c[f+8>>2]=A;c[f+8+4>>2]=x;s=Yd(N|0,i|0,14)|0;J=D;B=Wd(N|0,i|0,50)|0;J=D|J;k=Yd(N|0,i|0,18)|0;R=D;E=Wd(N|0,i|0,46)|0;R=J^(D|R);J=Yd(N|0,i|0,41)|0;u=D;K=Wd(N|0,i|0,23)|0;b=c[f+56>>2]|0;I=c[f+56+4>>2]|0;r=t|7;S=c[464+(r<<3)>>2]|0;G=c[464+(r<<3)+4>>2]|0;u=we((B|s)^(E|k)^(K|J)|0,R^(D|u)|0,c[e+(r<<3)>>2]|0,c[e+(r<<3)+4>>2]|0)|0;G=we(u|0,D|0,S|0,G|0)|0;h=we(G|0,D|0,(b^P)&N^b|0,(I^h)&i^I|0)|0;F=we(h|0,D|0,g|0,F|0)|0;g=D;H=we(F|0,g|0,j|0,H|0)|0;j=D;c[f+32>>2]=H;c[f+32+4>>2]=j;h=Yd(A|0,x|0,28)|0;P=D;G=Wd(A|0,x|0,36)|0;P=D|P;S=Yd(A|0,x|0,34)|0;u=D;R=Wd(A|0,x|0,30)|0;u=P^(D|u);P=Yd(A|0,x|0,39)|0;J=D;K=Wd(A|0,x|0,25)|0;k=c[f+24>>2]|0;E=c[f+24+4>>2]|0;g=we((G|h)^(R|S)^(K|P)|0,u^(D|J)|0,F|0,g|0)|0;v=we(g|0,D|0,(k|y)&A|k&y|0,(E|v)&x|E&v|0)|0;y=D;c[f>>2]=v;c[f+4>>2]=y;g=Yd(H|0,j|0,14)|0;F=D;J=Wd(H|0,j|0,50)|0;F=D|F;u=Yd(H|0,j|0,18)|0;P=D;K=Wd(H|0,j|0,46)|0;P=F^(D|P);F=Yd(H|0,j|0,41)|0;S=D;R=Wd(H|0,j|0,23)|0;h=c[f+48>>2]|0;G=c[f+48+4>>2]|0;s=t|8;B=c[464+(s<<3)>>2]|0;Q=c[464+(s<<3)+4>>2]|0;S=we((J|g)^(K|u)^(R|F)|0,P^(D|S)|0,c[e+(s<<3)>>2]|0,c[e+(s<<3)+4>>2]|0)|0;Q=we(S|0,D|0,B|0,Q|0)|0;i=we(Q|0,D|0,(h^N)&H^h|0,(G^i)&j^G|0)|0;I=we(i|0,D|0,b|0,I|0)|0;b=D;E=we(I|0,b|0,k|0,E|0)|0;k=D;c[f+24>>2]=E;c[f+24+4>>2]=k;i=Yd(v|0,y|0,28)|0;N=D;Q=Wd(v|0,y|0,36)|0;N=D|N;B=Yd(v|0,y|0,34)|0;S=D;P=Wd(v|0,y|0,30)|0;S=N^(D|S);N=Yd(v|0,y|0,39)|0;F=D;R=Wd(v|0,y|0,25)|0;u=c[f+16>>2]|0;K=c[f+16+4>>2]|0;b=we((Q|i)^(P|B)^(R|N)|0,S^(D|F)|0,I|0,b|0)|0;x=we(b|0,D|0,(u|A)&v|u&A|0,(K|x)&y|K&x|0)|0;A=D;c[f+56>>2]=x;c[f+56+4>>2]=A;b=Yd(E|0,k|0,14)|0;I=D;F=Wd(E|0,k|0,50)|0;I=D|I;S=Yd(E|0,k|0,18)|0;N=D;R=Wd(E|0,k|0,46)|0;N=I^(D|N);I=Yd(E|0,k|0,41)|0;B=D;P=Wd(E|0,k|0,23)|0;i=c[f+40>>2]|0;Q=c[f+40+4>>2]|0;g=t|9;J=c[464+(g<<3)>>2]|0;M=c[464+(g<<3)+4>>2]|0;B=we((F|b)^(R|S)^(P|I)|0,N^(D|B)|0,c[e+(g<<3)>>2]|0,c[e+(g<<3)+4>>2]|0)|0;M=we(B|0,D|0,J|0,M|0)|0;j=we(M|0,D|0,(i^H)&E^i|0,(Q^j)&k^Q|0)|0;G=we(j|0,D|0,h|0,G|0)|0;h=D;K=we(G|0,h|0,u|0,K|0)|0;u=D;c[f+16>>2]=K;c[f+16+4>>2]=u;j=Yd(x|0,A|0,28)|0;H=D;M=Wd(x|0,A|0,36)|0;H=D|H;J=Yd(x|0,A|0,34)|0;B=D;N=Wd(x|0,A|0,30)|0;B=H^(D|B);H=Yd(x|0,A|0,39)|0;I=D;P=Wd(x|0,A|0,25)|0;S=c[f+8>>2]|0;R=c[f+8+4>>2]|0;h=we((M|j)^(N|J)^(P|H)|0,B^(D|I)|0,G|0,h|0)|0;y=we(h|0,D|0,(S|v)&x|S&v|0,(R|y)&A|R&y|0)|0;v=D;c[f+48>>2]=y;c[f+48+4>>2]=v;h=Yd(K|0,u|0,14)|0;G=D;I=Wd(K|0,u|0,50)|0;G=D|G;B=Yd(K|0,u|0,18)|0;H=D;P=Wd(K|0,u|0,46)|0;H=G^(D|H);G=Yd(K|0,u|0,41)|0;J=D;N=Wd(K|0,u|0,23)|0;j=c[f+32>>2]|0;M=c[f+32+4>>2]|0;b=t|10;F=c[464+(b<<3)>>2]|0;w=c[464+(b<<3)+4>>2]|0;J=we((I|h)^(P|B)^(N|G)|0,H^(D|J)|0,c[e+(b<<3)>>2]|0,c[e+(b<<3)+4>>2]|0)|0;w=we(J|0,D|0,F|0,w|0)|0;k=we(w|0,D|0,(j^E)&K^j|0,(M^k)&u^M|0)|0;Q=we(k|0,D|0,i|0,Q|0)|0;i=D;R=we(Q|0,i|0,S|0,R|0)|0;S=D;c[f+8>>2]=R;c[f+8+4>>2]=S;k=Yd(y|0,v|0,28)|0;E=D;w=Wd(y|0,v|0,36)|0;E=D|E;F=Yd(y|0,v|0,34)|0;J=D;H=Wd(y|0,v|0,30)|0;J=E^(D|J);E=Yd(y|0,v|0,39)|0;G=D;N=Wd(y|0,v|0,25)|0;B=c[f>>2]|0;P=c[f+4>>2]|0;i=we((w|k)^(H|F)^(N|E)|0,J^(D|G)|0,Q|0,i|0)|0;A=we(i|0,D|0,(B|x)&y|B&x|0,(P|A)&v|P&A|0)|0;x=D;c[f+40>>2]=A;c[f+40+4>>2]=x;i=Yd(R|0,S|0,14)|0;Q=D;G=Wd(R|0,S|0,50)|0;Q=D|Q;J=Yd(R|0,S|0,18)|0;E=D;N=Wd(R|0,S|0,46)|0;E=Q^(D|E);Q=Yd(R|0,S|0,41)|0;F=D;H=Wd(R|0,S|0,23)|0;k=c[f+24>>2]|0;w=c[f+24+4>>2]|0;h=t|11;I=c[464+(h<<3)>>2]|0;T=c[464+(h<<3)+4>>2]|0;F=we((G|i)^(N|J)^(H|Q)|0,E^(D|F)|0,c[e+(h<<3)>>2]|0,c[e+(h<<3)+4>>2]|0)|0;T=we(F|0,D|0,I|0,T|0)|0;u=we(T|0,D|0,(k^K)&R^k|0,(w^u)&S^w|0)|0;M=we(u|0,D|0,j|0,M|0)|0;j=D;P=we(M|0,j|0,B|0,P|0)|0;B=D;c[f>>2]=P;c[f+4>>2]=B;u=Yd(A|0,x|0,28)|0;K=D;T=Wd(A|0,x|0,36)|0;K=D|K;I=Yd(A|0,x|0,34)|0;F=D;E=Wd(A|0,x|0,30)|0;F=K^(D|F);K=Yd(A|0,x|0,39)|0;Q=D;H=Wd(A|0,x|0,25)|0;J=c[f+56>>2]|0;N=c[f+56+4>>2]|0;j=we((T|u)^(E|I)^(H|K)|0,F^(D|Q)|0,M|0,j|0)|0;v=we(j|0,D|0,(J|y)&A|J&y|0,(N|v)&x|N&v|0)|0;y=D;c[f+32>>2]=v;c[f+32+4>>2]=y;j=Yd(P|0,B|0,14)|0;M=D;Q=Wd(P|0,B|0,50)|0;M=D|M;F=Yd(P|0,B|0,18)|0;K=D;H=Wd(P|0,B|0,46)|0;K=M^(D|K);M=Yd(P|0,B|0,41)|0;I=D;E=Wd(P|0,B|0,23)|0;u=c[f+16>>2]|0;T=c[f+16+4>>2]|0;i=t|12;G=c[464+(i<<3)>>2]|0;O=c[464+(i<<3)+4>>2]|0;I=we((Q|j)^(H|F)^(E|M)|0,K^(D|I)|0,c[e+(i<<3)>>2]|0,c[e+(i<<3)+4>>2]|0)|0;O=we(I|0,D|0,G|0,O|0)|0;S=we(O|0,D|0,(u^R)&P^u|0,(T^S)&B^T|0)|0;w=we(S|0,D|0,k|0,w|0)|0;k=D;N=we(w|0,k|0,J|0,N|0)|0;J=D;c[f+56>>2]=N;c[f+56+4>>2]=J;S=Yd(v|0,y|0,28)|0;R=D;O=Wd(v|0,y|0,36)|0;R=D|R;G=Yd(v|0,y|0,34)|0;I=D;K=Wd(v|0,y|0,30)|0;I=R^(D|I);R=Yd(v|0,y|0,39)|0;M=D;E=Wd(v|0,y|0,25)|0;F=c[f+48>>2]|0;H=c[f+48+4>>2]|0;k=we((O|S)^(K|G)^(E|R)|0,I^(D|M)|0,w|0,k|0)|0;x=we(k|0,D|0,(F|A)&v|F&A|0,(H|x)&y|H&x|0)|0;A=D;c[f+24>>2]=x;c[f+24+4>>2]=A;k=Yd(N|0,J|0,14)|0;w=D;M=Wd(N|0,J|0,50)|0;w=D|w;I=Yd(N|0,J|0,18)|0;R=D;E=Wd(N|0,J|0,46)|0;R=w^(D|R);w=Yd(N|0,J|0,41)|0;G=D;K=Wd(N|0,J|0,23)|0;S=c[f+8>>2]|0;O=c[f+8+4>>2]|0;j=t|13;Q=c[464+(j<<3)>>2]|0;C=c[464+(j<<3)+4>>2]|0;G=we((M|k)^(E|I)^(K|w)|0,R^(D|G)|0,c[e+(j<<3)>>2]|0,c[e+(j<<3)+4>>2]|0)|0;C=we(G|0,D|0,Q|0,C|0)|0;B=we(C|0,D|0,(S^P)&N^S|0,(O^B)&J^O|0)|0;T=we(B|0,D|0,u|0,T|0)|0;u=D;H=we(T|0,u|0,F|0,H|0)|0;F=D;c[f+48>>2]=H;c[f+48+4>>2]=F;B=Yd(x|0,A|0,28)|0;P=D;C=Wd(x|0,A|0,36)|0;P=D|P;Q=Yd(x|0,A|0,34)|0;G=D;R=Wd(x|0,A|0,30)|0;G=P^(D|G);P=Yd(x|0,A|0,39)|0;w=D;K=Wd(x|0,A|0,25)|0;I=c[f+40>>2]|0;E=c[f+40+4>>2]|0;u=we((C|B)^(R|Q)^(K|P)|0,G^(D|w)|0,T|0,u|0)|0;y=we(u|0,D|0,(I|v)&x|I&v|0,(E|y)&A|E&y|0)|0;v=D;c[f+16>>2]=y;c[f+16+4>>2]=v;u=Yd(H|0,F|0,14)|0;T=D;w=Wd(H|0,F|0,50)|0;T=D|T;G=Yd(H|0,F|0,18)|0;P=D;K=Wd(H|0,F|0,46)|0;P=T^(D|P);T=Yd(H|0,F|0,41)|0;Q=D;R=Wd(H|0,F|0,23)|0;B=c[f>>2]|0;C=c[f+4>>2]|0;k=t|14;M=c[464+(k<<3)>>2]|0;L=c[464+(k<<3)+4>>2]|0;Q=we((w|u)^(K|G)^(R|T)|0,P^(D|Q)|0,c[e+(k<<3)>>2]|0,c[e+(k<<3)+4>>2]|0)|0;L=we(Q|0,D|0,M|0,L|0)|0;J=we(L|0,D|0,(B^N)&H^B|0,(C^J)&F^C|0)|0;O=we(J|0,D|0,S|0,O|0)|0;S=D;E=we(O|0,S|0,I|0,E|0)|0;I=D;c[f+40>>2]=E;c[f+40+4>>2]=I;J=Yd(y|0,v|0,28)|0;N=D;L=Wd(y|0,v|0,36)|0;N=D|N;M=Yd(y|0,v|0,34)|0;Q=D;P=Wd(y|0,v|0,30)|0;Q=N^(D|Q);N=Yd(y|0,v|0,39)|0;T=D;R=Wd(y|0,v|0,25)|0;G=c[f+32>>2]|0;K=c[f+32+4>>2]|0;S=we((L|J)^(P|M)^(R|N)|0,Q^(D|T)|0,O|0,S|0)|0;A=we(S|0,D|0,(G|x)&y|G&x|0,(K|A)&v|K&A|0)|0;x=D;c[f+8>>2]=A;c[f+8+4>>2]=x;S=Yd(E|0,I|0,14)|0;O=D;T=Wd(E|0,I|0,50)|0;O=D|O;Q=Yd(E|0,I|0,18)|0;N=D;R=Wd(E|0,I|0,46)|0;N=O^(D|N);O=Yd(E|0,I|0,41)|0;M=D;P=Wd(E|0,I|0,23)|0;J=c[f+56>>2]|0;L=c[f+56+4>>2]|0;u=t|15;w=c[464+(u<<3)>>2]|0;z=c[464+(u<<3)+4>>2]|0;M=we((T|S)^(R|Q)^(P|O)|0,N^(D|M)|0,c[e+(u<<3)>>2]|0,c[e+(u<<3)+4>>2]|0)|0;z=we(M|0,D|0,w|0,z|0)|0;L=we(z|0,D|0,(J^H)&E^J|0,(L^F)&I^L|0)|0;C=we(L|0,D|0,B|0,C|0)|0;B=D;K=we(C|0,B|0,G|0,K|0)|0;c[f+32>>2]=K;c[f+32+4>>2]=D;K=Yd(A|0,x|0,28)|0;G=D;L=Wd(A|0,x|0,36)|0;G=D|G;I=Yd(A|0,x|0,34)|0;F=D;J=Wd(A|0,x|0,30)|0;F=G^(D|F);G=Yd(A|0,x|0,39)|0;E=D;H=Wd(A|0,x|0,25)|0;z=c[f+24>>2]|0;w=c[f+24+4>>2]|0;B=we((L|K)^(J|I)^(H|G)|0,F^(D|E)|0,C|0,B|0)|0;v=we(B|0,D|0,(z|y)&A|z&y|0,(w|v)&x|w&v|0)|0;c[f>>2]=v;c[f+4>>2]=D;if((t|0)==64){g=0;break}z=c[e+(k<<3)>>2]|0;B=c[e+(k<<3)+4>>2]|0;O=Yd(z|0,B|0,19)|0;K=D;F=Wd(z|0,B|0,45)|0;K=D|K;E=Yd(z|0,B|0,61)|0;T=D;G=Wd(z|0,B|0,3)|0;T=D|T;B=Yd(z|0,B|0,6)|0;K=T^D^K;T=c[e+(g<<3)>>2]|0;z=c[e+(g<<3)+4>>2]|0;y=c[e+(l<<3)>>2]|0;S=c[e+(l<<3)+4>>2]|0;J=Yd(y|0,S|0,1)|0;R=D;M=Wd(y|0,S|0,63)|0;R=D|R;P=Yd(y|0,S|0,8)|0;H=D;A=Wd(y|0,S|0,56)|0;H=D|H;N=Yd(y|0,S|0,7)|0;R=H^D^R;H=e+(t<<3)|0;z=we(c[H>>2]|0,c[H+4>>2]|0,T|0,z|0)|0;K=we(z|0,D|0,(G|E)^B^(F|O)|0,K|0)|0;R=we(K|0,D|0,(A|P)^N^(M|J)|0,R|0)|0;J=D;t=t+16|0;M=e+(t<<3)|0;c[M>>2]=R;c[M+4>>2]=J;M=c[e+(u<<3)>>2]|0;N=c[e+(u<<3)+4>>2]|0;P=Yd(M|0,N|0,19)|0;A=D;K=Wd(M|0,N|0,45)|0;A=D|A;O=Yd(M|0,N|0,61)|0;F=D;B=Wd(M|0,N|0,3)|0;F=D|F;N=Yd(M|0,N|0,6)|0;A=F^D^A;F=c[e+(l+9<<3)>>2]|0;M=c[e+(l+9<<3)+4>>2]|0;E=c[e+(l+1<<3)>>2]|0;G=c[e+(l+1<<3)+4>>2]|0;z=Yd(E|0,G|0,1)|0;T=D;H=Wd(E|0,G|0,63)|0;T=D|T;Q=Yd(E|0,G|0,8)|0;L=D;C=Wd(E|0,G|0,56)|0;L=D|L;I=Yd(E|0,G|0,7)|0;T=L^D^T;M=we(y|0,S|0,F|0,M|0)|0;A=we(M|0,D|0,(B|O)^N^(K|P)|0,A|0)|0;T=we(A|0,D|0,(C|Q)^I^(H|z)|0,T|0)|0;z=D;c[e+(l+16<<3)>>2]=T;c[e+(l+16<<3)+4>>2]=z;H=Yd(R|0,J|0,19)|0;I=D;Q=Wd(R|0,J|0,45)|0;I=D|I;C=Yd(R|0,J|0,61)|0;A=D;P=Wd(R|0,J|0,3)|0;A=D|A;J=Yd(R|0,J|0,6)|0;I=A^D^I;A=c[e+(h<<3)>>2]|0;R=c[e+(h<<3)+4>>2]|0;K=c[e+(n<<3)>>2]|0;N=c[e+(n<<3)+4>>2]|0;O=Yd(K|0,N|0,1)|0;B=D;M=Wd(K|0,N|0,63)|0;B=D|B;F=Yd(K|0,N|0,8)|0;S=D;y=Wd(K|0,N|0,56)|0;S=D|S;L=Yd(K|0,N|0,7)|0;B=S^D^B;R=we(E|0,G|0,A|0,R|0)|0;I=we(R|0,D|0,(P|C)^J^(Q|H)|0,I|0)|0;B=we(I|0,D|0,(y|F)^L^(M|O)|0,B|0)|0;O=D;c[e+(m+16<<3)>>2]=B;c[e+(m+16<<3)+4>>2]=O;M=Yd(T|0,z|0,19)|0;L=D;F=Wd(T|0,z|0,45)|0;L=D|L;y=Yd(T|0,z|0,61)|0;I=D;H=Wd(T|0,z|0,3)|0;I=D|I;z=Yd(T|0,z|0,6)|0;L=I^D^L;I=c[e+(n+9<<3)>>2]|0;T=c[e+(n+9<<3)+4>>2]|0;Q=c[e+(n+1<<3)>>2]|0;J=c[e+(n+1<<3)+4>>2]|0;C=Yd(Q|0,J|0,1)|0;P=D;R=Wd(Q|0,J|0,63)|0;P=D|P;A=Yd(Q|0,J|0,8)|0;G=D;E=Wd(Q|0,J|0,56)|0;G=D|G;S=Yd(Q|0,J|0,7)|0;P=G^D^P;T=we(K|0,N|0,I|0,T|0)|0;L=we(T|0,D|0,(H|y)^z^(F|M)|0,L|0)|0;P=we(L|0,D|0,(E|A)^S^(R|C)|0,P|0)|0;C=D;c[e+(n+16<<3)>>2]=P;c[e+(n+16<<3)+4>>2]=C;R=Yd(B|0,O|0,19)|0;S=D;A=Wd(B|0,O|0,45)|0;S=D|S;E=Yd(B|0,O|0,61)|0;L=D;M=Wd(B|0,O|0,3)|0;L=D|L;O=Yd(B|0,O|0,6)|0;S=L^D^S;L=c[e+(j<<3)>>2]|0;B=c[e+(j<<3)+4>>2]|0;F=c[e+(p<<3)>>2]|0;z=c[e+(p<<3)+4>>2]|0;y=Yd(F|0,z|0,1)|0;H=D;T=Wd(F|0,z|0,63)|0;H=D|H;I=Yd(F|0,z|0,8)|0;N=D;K=Wd(F|0,z|0,56)|0;N=D|N;G=Yd(F|0,z|0,7)|0;H=N^D^H;B=we(Q|0,J|0,L|0,B|0)|0;S=we(B|0,D|0,(M|E)^O^(A|R)|0,S|0)|0;H=we(S|0,D|0,(K|I)^G^(T|y)|0,H|0)|0;y=D;c[e+(o+16<<3)>>2]=H;c[e+(o+16<<3)+4>>2]=y;T=Yd(P|0,C|0,19)|0;G=D;I=Wd(P|0,C|0,45)|0;G=D|G;K=Yd(P|0,C|0,61)|0;S=D;R=Wd(P|0,C|0,3)|0;S=D|S;C=Yd(P|0,C|0,6)|0;G=S^D^G;S=c[e+(p+9<<3)>>2]|0;P=c[e+(p+9<<3)+4>>2]|0;A=c[e+(p+1<<3)>>2]|0;O=c[e+(p+1<<3)+4>>2]|0;E=Yd(A|0,O|0,1)|0;M=D;B=Wd(A|0,O|0,63)|0;M=D|M;L=Yd(A|0,O|0,8)|0;J=D;Q=Wd(A|0,O|0,56)|0;J=D|J;N=Yd(A|0,O|0,7)|0;M=J^D^M;P=we(F|0,z|0,S|0,P|0)|0;G=we(P|0,D|0,(R|K)^C^(I|T)|0,G|0)|0;M=we(G|0,D|0,(Q|L)^N^(B|E)|0,M|0)|0;E=D;c[e+(p+16<<3)>>2]=M;c[e+(p+16<<3)+4>>2]=E;B=Yd(H|0,y|0,19)|0;N=D;L=Wd(H|0,y|0,45)|0;N=D|N;Q=Yd(H|0,y|0,61)|0;G=D;T=Wd(H|0,y|0,3)|0;G=D|G;y=Yd(H|0,y|0,6)|0;N=G^D^N;G=c[e+(u<<3)>>2]|0;H=c[e+(u<<3)+4>>2]|0;I=c[e+(r<<3)>>2]|0;C=c[e+(r<<3)+4>>2]|0;K=Yd(I|0,C|0,1)|0;R=D;P=Wd(I|0,C|0,63)|0;R=D|R;S=Yd(I|0,C|0,8)|0;z=D;F=Wd(I|0,C|0,56)|0;z=D|z;J=Yd(I|0,C|0,7)|0;R=z^D^R;H=we(A|0,O|0,G|0,H|0)|0;N=we(H|0,D|0,(T|Q)^y^(L|B)|0,N|0)|0;R=we(N|0,D|0,(F|S)^J^(P|K)|0,R|0)|0;K=D;c[e+(q+16<<3)>>2]=R;c[e+(q+16<<3)+4>>2]=K;P=Yd(M|0,E|0,19)|0;J=D;S=Wd(M|0,E|0,45)|0;J=D|J;F=Yd(M|0,E|0,61)|0;N=D;B=Wd(M|0,E|0,3)|0;N=D|N;E=Yd(M|0,E|0,6)|0;J=N^D^J;N=c[e+(r+9<<3)>>2]|0;M=c[e+(r+9<<3)+4>>2]|0;L=c[e+(r+1<<3)>>2]|0;y=c[e+(r+1<<3)+4>>2]|0;Q=Yd(L|0,y|0,1)|0;T=D;H=Wd(L|0,y|0,63)|0;T=D|T;G=Yd(L|0,y|0,8)|0;O=D;A=Wd(L|0,y|0,56)|0;O=D|O;z=Yd(L|0,y|0,7)|0;T=O^D^T;M=we(I|0,C|0,N|0,M|0)|0;J=we(M|0,D|0,(B|F)^E^(S|P)|0,J|0)|0;T=we(J|0,D|0,(A|G)^z^(H|Q)|0,T|0)|0;Q=D;c[e+(r+16<<3)>>2]=T;c[e+(r+16<<3)+4>>2]=Q;H=Yd(R|0,K|0,19)|0;z=D;G=Wd(R|0,K|0,45)|0;z=D|z;A=Yd(R|0,K|0,61)|0;J=D;P=Wd(R|0,K|0,3)|0;J=D|J;K=Yd(R|0,K|0,6)|0;z=J^D^z;J=c[e+(s+9<<3)>>2]|0;R=c[e+(s+9<<3)+4>>2]|0;S=c[e+(g<<3)>>2]|0;E=c[e+(g<<3)+4>>2]|0;F=Yd(S|0,E|0,1)|0;B=D;M=Wd(S|0,E|0,63)|0;B=D|B;N=Yd(S|0,E|0,8)|0;C=D;I=Wd(S|0,E|0,56)|0;C=D|C;O=Yd(S|0,E|0,7)|0;B=C^D^B;R=we(L|0,y|0,J|0,R|0)|0;z=we(R|0,D|0,(P|A)^K^(G|H)|0,z|0)|0;B=we(z|0,D|0,(I|N)^O^(M|F)|0,B|0)|0;F=D;c[e+(s+16<<3)>>2]=B;c[e+(s+16<<3)+4>>2]=F;M=Yd(T|0,Q|0,19)|0;O=D;N=Wd(T|0,Q|0,45)|0;O=D|O;I=Yd(T|0,Q|0,61)|0;z=D;H=Wd(T|0,Q|0,3)|0;z=D|z;Q=Yd(T|0,Q|0,6)|0;O=z^D^O;z=c[e+(g+9<<3)>>2]|0;T=c[e+(g+9<<3)+4>>2]|0;G=c[e+(g+1<<3)>>2]|0;K=c[e+(g+1<<3)+4>>2]|0;A=Yd(G|0,K|0,1)|0;P=D;R=Wd(G|0,K|0,63)|0;P=D|P;J=Yd(G|0,K|0,8)|0;y=D;L=Wd(G|0,K|0,56)|0;y=D|y;C=Yd(G|0,K|0,7)|0;P=y^D^P;T=we(S|0,E|0,z|0,T|0)|0;O=we(T|0,D|0,(H|I)^Q^(N|M)|0,O|0)|0;P=we(O|0,D|0,(L|J)^C^(R|A)|0,P|0)|0;A=D;c[e+(g+16<<3)>>2]=P;c[e+(g+16<<3)+4>>2]=A;R=Yd(B|0,F|0,19)|0;C=D;J=Wd(B|0,F|0,45)|0;C=D|C;L=Yd(B|0,F|0,61)|0;O=D;M=Wd(B|0,F|0,3)|0;O=D|O;F=Yd(B|0,F|0,6)|0;C=O^D^C;O=c[e+(b+9<<3)>>2]|0;B=c[e+(b+9<<3)+4>>2]|0;N=c[e+(h<<3)>>2]|0;g=c[e+(h<<3)+4>>2]|0;Q=Yd(N|0,g|0,1)|0;I=D;H=Wd(N|0,g|0,63)|0;I=D|I;T=Yd(N|0,g|0,8)|0;z=D;E=Wd(N|0,g|0,56)|0;z=D|z;S=Yd(N|0,g|0,7)|0;I=z^D^I;B=we(G|0,K|0,O|0,B|0)|0;C=we(B|0,D|0,(M|L)^F^(J|R)|0,C|0)|0;I=we(C|0,D|0,(E|T)^S^(H|Q)|0,I|0)|0;Q=D;c[e+(b+16<<3)>>2]=I;c[e+(b+16<<3)+4>>2]=Q;H=Yd(P|0,A|0,19)|0;S=D;b=Wd(P|0,A|0,45)|0;S=D|S;T=Yd(P|0,A|0,61)|0;E=D;C=Wd(P|0,A|0,3)|0;E=D|E;A=Yd(P|0,A|0,6)|0;S=E^D^S;E=c[e+(h+9<<3)>>2]|0;P=c[e+(h+9<<3)+4>>2]|0;R=c[e+(h+1<<3)>>2]|0;J=c[e+(h+1<<3)+4>>2]|0;F=Yd(R|0,J|0,1)|0;L=D;M=Wd(R|0,J|0,63)|0;L=D|L;B=Yd(R|0,J|0,8)|0;O=D;K=Wd(R|0,J|0,56)|0;O=D|O;G=Yd(R|0,J|0,7)|0;L=O^D^L;P=we(N|0,g|0,E|0,P|0)|0;S=we(P|0,D|0,(C|T)^A^(b|H)|0,S|0)|0;L=we(S|0,D|0,(K|B)^G^(M|F)|0,L|0)|0;F=D;c[e+(h+16<<3)>>2]=L;c[e+(h+16<<3)+4>>2]=F;M=Yd(I|0,Q|0,19)|0;G=D;B=Wd(I|0,Q|0,45)|0;G=D|G;K=Yd(I|0,Q|0,61)|0;S=D;H=Wd(I|0,Q|0,3)|0;S=D|S;Q=Yd(I|0,Q|0,6)|0;G=S^D^G;S=c[e+(i+9<<3)>>2]|0;b=c[e+(i+9<<3)+4>>2]|0;I=c[e+(j<<3)>>2]|0;A=c[e+(j<<3)+4>>2]|0;T=Yd(I|0,A|0,1)|0;C=D;P=Wd(I|0,A|0,63)|0;C=D|C;E=Yd(I|0,A|0,8)|0;g=D;N=Wd(I|0,A|0,56)|0;g=D|g;O=Yd(I|0,A|0,7)|0;C=g^D^C;b=we(R|0,J|0,S|0,b|0)|0;G=we(b|0,D|0,(H|K)^Q^(B|M)|0,G|0)|0;C=we(G|0,D|0,(N|E)^O^(P|T)|0,C|0)|0;T=D;c[e+(i+16<<3)>>2]=C;c[e+(i+16<<3)+4>>2]=T;P=Yd(L|0,F|0,19)|0;O=D;E=Wd(L|0,F|0,45)|0;O=D|O;N=Yd(L|0,F|0,61)|0;G=D;M=Wd(L|0,F|0,3)|0;G=D|G;F=Yd(L|0,F|0,6)|0;O=G^D^O;G=c[e+(j+9<<3)>>2]|0;L=c[e+(j+9<<3)+4>>2]|0;B=c[e+(j+1<<3)>>2]|0;Q=c[e+(j+1<<3)+4>>2]|0;K=Yd(B|0,Q|0,1)|0;H=D;b=Wd(B|0,Q|0,63)|0;H=D|H;S=Yd(B|0,Q|0,8)|0;J=D;R=Wd(B|0,Q|0,56)|0;J=D|J;g=Yd(B|0,Q|0,7)|0;H=J^D^H;L=we(I|0,A|0,G|0,L|0)|0;O=we(L|0,D|0,(M|N)^F^(E|P)|0,O|0)|0;H=we(O|0,D|0,(R|S)^g^(b|K)|0,H|0)|0;K=D;c[e+(j+16<<3)>>2]=H;c[e+(j+16<<3)+4>>2]=K;b=Yd(C|0,T|0,19)|0;g=D;S=Wd(C|0,T|0,45)|0;g=D|g;R=Yd(C|0,T|0,61)|0;O=D;P=Wd(C|0,T|0,3)|0;O=D|O;T=Yd(C|0,T|0,6)|0;g=O^D^g;O=c[e+(k+9<<3)>>2]|0;C=c[e+(k+9<<3)+4>>2]|0;E=c[e+(u<<3)>>2]|0;F=c[e+(u<<3)+4>>2]|0;N=Yd(E|0,F|0,1)|0;M=D;L=Wd(E|0,F|0,63)|0;M=D|M;G=Yd(E|0,F|0,8)|0;A=D;I=Wd(E|0,F|0,56)|0;A=D|A;J=Yd(E|0,F|0,7)|0;M=A^D^M;C=we(B|0,Q|0,O|0,C|0)|0;g=we(C|0,D|0,(P|R)^T^(S|b)|0,g|0)|0;M=we(g|0,D|0,(I|G)^J^(L|N)|0,M|0)|0;c[e+(k+16<<3)>>2]=M;c[e+(k+16<<3)+4>>2]=D;M=Yd(H|0,K|0,19)|0;N=D;L=Wd(H|0,K|0,45)|0;N=D|N;J=Yd(H|0,K|0,61)|0;G=D;I=Wd(H|0,K|0,3)|0;G=D|G;K=Yd(H|0,K|0,6)|0;N=G^D^N;G=c[e+(u+9<<3)>>2]|0;H=c[e+(u+9<<3)+4>>2]|0;g=c[e+(u+1<<3)>>2]|0;b=c[e+(u+1<<3)+4>>2]|0;S=Yd(g|0,b|0,1)|0;T=D;R=Wd(g|0,b|0,63)|0;T=D|T;P=Yd(g|0,b|0,8)|0;C=D;O=Wd(g|0,b|0,56)|0;C=D|C;Q=Yd(g|0,b|0,7)|0;T=C^D^T;H=we(E|0,F|0,G|0,H|0)|0;N=we(H|0,D|0,(I|J)^K^(L|M)|0,N|0)|0;T=we(N|0,D|0,(O|P)^Q^(R|S)|0,T|0)|0;c[e+(u+16<<3)>>2]=T;c[e+(u+16<<3)+4>>2]=D;if((t|0)>=80){g=0;break}}do{S=f+(g<<3)|0;T=a+(g<<3)|0;S=we(c[T>>2]|0,c[T+4>>2]|0,c[S>>2]|0,c[S+4>>2]|0)|0;c[T>>2]=S;c[T+4>>2]=D;g=g+1|0}while((g|0)!=8);return}function ka(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0;r=i;q=i=i+63&-64;i=i+4096|0;if(b){p=ma(c[b+12>>2]<<3)|0;if(!p)e=-22;else{uf(q+3072|0);uf(q+2048|0);l=c[d>>2]|0;c[q+2048>>2]=l;c[q+2048+4>>2]=0;j=c[d+4>>2]|0;c[q+2048+8>>2]=j;c[q+2048+8+4>>2]=0;k=a[d+8>>0]|0;c[q+2048+16>>2]=k&255;c[q+2048+16+4>>2]=0;c[q+2048+24>>2]=c[b+8>>2];c[q+2048+24+4>>2]=0;c[q+2048+32>>2]=c[b+4>>2];c[q+2048+32+4>>2]=0;c[q+2048+40>>2]=c[b+28>>2];c[q+2048+40+4>>2]=0;e=c[b+12>>2]|0;if(!e)f=0;else{g=0;do{f=g&127;if(!f){e=we(c[q+2048+48>>2]|0,c[q+2048+48+4>>2]|0,1,0)|0;c[q+2048+48>>2]=e;c[q+2048+48+4>>2]=D;uf(q);uf(q+1024|0);la(q+3072|0,q+2048|0,q);la(q+3072|0,q,q+1024|0);e=c[b+12>>2]|0}n=c[q+1024+(f<<3)+4>>2]|0;o=p+(g<<3)|0;c[o>>2]=c[q+1024+(f<<3)>>2];c[o+4>>2]=n;g=g+1|0}while(g>>>0<e>>>0);f=e}e=(l|0)==0&k<<24>>24==0?2:0;h=c[b+16>>2]|0;g=(S(h,j)|0)+e+(S(k&255,f)|0)|0;a:do if(e>>>0<f>>>0){o=g;f=(((g>>>0)%(h>>>0)|0|0)==0?h+-1|0:-1)+g|0;m=h;g=l;while(1){n=((o>>>0)%(m>>>0)|0|0)==1?o+-1|0:f;f=p+(e<<3)|0;j=c[f>>2]|0;f=Hd(c[f+4>>2]|0,0,c[b+20>>2]|0,0)|0;h=D;l=(g|0)==0;if(l?(a[d+8>>0]|0)==0:0){f=c[d+4>>2]|0;h=0}c[d+12>>2]=e;j=Gb(b,d,j,((h|0)==0?(f|0)==(c[d+4>>2]|0):0)&1)|0;k=c[(c[b>>2]|0)+4>>2]|0;f=Kd(m|0,0,f|0,h|0)|0;g=k+(o<<10)|0;if(l){pf(q+3072|0,k+(f<<10)+(j<<10)|0);md(q+3072|0,k+(n<<10)|0);pf(q+2048|0,q+3072|0);f=0;do{m=f<<4;z=c[q+3072+(m<<3)>>2]|0;G=c[q+3072+(m<<3)+4>>2]|0;u=c[q+3072+((m|4)<<3)>>2]|0;s=c[q+3072+((m|4)<<3)+4>>2]|0;l=we(u|0,s|0,z|0,G|0)|0;v=D;G=Wd(z|0,G|0,1)|0;G=Kd(G&-2|0,D&1|0,u|0,0)|0;G=we(l|0,v|0,G|0,D|0)|0;v=D;l=G^c[q+3072+((m|12)<<3)>>2];z=v^c[q+3072+((m|12)<<3)+4>>2];y=c[q+3072+((m|8)<<3)>>2]|0;A=c[q+3072+((m|8)<<3)+4>>2]|0;C=we(z|0,l|0,y|0,A|0)|0;j=D;A=Wd(y|0,A|0,1)|0;A=Kd(z|0,0,A&-2|0,D&1|0)|0;A=we(C|0,j|0,A|0,D|0)|0;j=D;C=Yd(A^u|0,j^s|0,24)|0;y=D;s=Wd(A^u|0,j^s|0,40)|0;y=D|y;u=we(s|C|0,y|0,G|0,v|0)|0;h=D;v=Wd(G|0,v|0,1)|0;v=Kd(C|0,0,v&-2|0,D&1|0)|0;v=we(u|0,h|0,v|0,D|0)|0;h=D;c[q+3072+(m<<3)>>2]=v;c[q+3072+(m<<3)+4>>2]=h;u=Yd(v^z|0,h^l|0,16)|0;G=D;l=Wd(v^z|0,h^l|0,48)|0;G=D|G;c[q+3072+((m|12)<<3)>>2]=l|u;c[q+3072+((m|12)<<3)+4>>2]=G;G=we(l|u|0,G|0,A|0,j|0)|0;l=D;j=Wd(A|0,j|0,1)|0;j=Kd(u|0,0,j&-2|0,D&1|0)|0;j=we(G|0,l|0,j|0,D|0)|0;l=D;c[q+3072+((m|8)<<3)>>2]=j;c[q+3072+((m|8)<<3)+4>>2]=l;G=Yd(j^(s|C)|0,l^y|0,63)|0;u=D;y=Wd(j^(s|C)|0,l^y|0,1)|0;c[q+3072+((m|4)<<3)>>2]=y|G;c[q+3072+((m|4)<<3)+4>>2]=D|u;u=c[q+3072+((m|1)<<3)>>2]|0;G=c[q+3072+((m|1)<<3)+4>>2]|0;y=c[q+3072+((m|5)<<3)>>2]|0;l=c[q+3072+((m|5)<<3)+4>>2]|0;C=we(y|0,l|0,u|0,G|0)|0;s=D;G=Wd(u|0,G|0,1)|0;G=Kd(G&-2|0,D&1|0,y|0,0)|0;G=we(C|0,s|0,G|0,D|0)|0;s=D;C=G^c[q+3072+((m|13)<<3)>>2];u=s^c[q+3072+((m|13)<<3)+4>>2];j=c[q+3072+((m|9)<<3)>>2]|0;A=c[q+3072+((m|9)<<3)+4>>2]|0;h=we(u|0,C|0,j|0,A|0)|0;z=D;A=Wd(j|0,A|0,1)|0;A=Kd(u|0,0,A&-2|0,D&1|0)|0;A=we(h|0,z|0,A|0,D|0)|0;z=D;h=Yd(A^y|0,z^l|0,24)|0;j=D;l=Wd(A^y|0,z^l|0,40)|0;j=D|j;y=we(l|h|0,j|0,G|0,s|0)|0;v=D;s=Wd(G|0,s|0,1)|0;s=Kd(h|0,0,s&-2|0,D&1|0)|0;s=we(y|0,v|0,s|0,D|0)|0;v=D;c[q+3072+((m|1)<<3)>>2]=s;c[q+3072+((m|1)<<3)+4>>2]=v;y=Yd(s^u|0,v^C|0,16)|0;G=D;C=Wd(s^u|0,v^C|0,48)|0;G=D|G;c[q+3072+((m|13)<<3)>>2]=C|y;c[q+3072+((m|13)<<3)+4>>2]=G;G=we(C|y|0,G|0,A|0,z|0)|0;C=D;z=Wd(A|0,z|0,1)|0;z=Kd(y|0,0,z&-2|0,D&1|0)|0;z=we(G|0,C|0,z|0,D|0)|0;C=D;c[q+3072+((m|9)<<3)>>2]=z;c[q+3072+((m|9)<<3)+4>>2]=C;G=Yd(z^(l|h)|0,C^j|0,63)|0;y=D;j=Wd(z^(l|h)|0,C^j|0,1)|0;c[q+3072+((m|5)<<3)>>2]=j|G;c[q+3072+((m|5)<<3)+4>>2]=D|y;y=c[q+3072+((m|2)<<3)>>2]|0;G=c[q+3072+((m|2)<<3)+4>>2]|0;j=c[q+3072+((m|6)<<3)>>2]|0;C=c[q+3072+((m|6)<<3)+4>>2]|0;h=we(j|0,C|0,y|0,G|0)|0;l=D;G=Wd(y|0,G|0,1)|0;G=Kd(G&-2|0,D&1|0,j|0,0)|0;G=we(h|0,l|0,G|0,D|0)|0;l=D;h=G^c[q+3072+((m|14)<<3)>>2];y=l^c[q+3072+((m|14)<<3)+4>>2];z=c[q+3072+((m|10)<<3)>>2]|0;A=c[q+3072+((m|10)<<3)+4>>2]|0;v=we(y|0,h|0,z|0,A|0)|0;u=D;A=Wd(z|0,A|0,1)|0;A=Kd(y|0,0,A&-2|0,D&1|0)|0;A=we(v|0,u|0,A|0,D|0)|0;u=D;v=Yd(A^j|0,u^C|0,24)|0;z=D;C=Wd(A^j|0,u^C|0,40)|0;z=D|z;j=we(C|v|0,z|0,G|0,l|0)|0;s=D;l=Wd(G|0,l|0,1)|0;l=Kd(v|0,0,l&-2|0,D&1|0)|0;l=we(j|0,s|0,l|0,D|0)|0;s=D;c[q+3072+((m|2)<<3)>>2]=l;c[q+3072+((m|2)<<3)+4>>2]=s;j=Yd(l^y|0,s^h|0,16)|0;G=D;h=Wd(l^y|0,s^h|0,48)|0;G=D|G;c[q+3072+((m|14)<<3)>>2]=h|j;c[q+3072+((m|14)<<3)+4>>2]=G;G=we(h|j|0,G|0,A|0,u|0)|0;h=D;u=Wd(A|0,u|0,1)|0;u=Kd(j|0,0,u&-2|0,D&1|0)|0;u=we(G|0,h|0,u|0,D|0)|0;h=D;G=Yd(u^(C|v)|0,h^z|0,63)|0;j=D;z=Wd(u^(C|v)|0,h^z|0,1)|0;c[q+3072+((m|6)<<3)>>2]=z|G;c[q+3072+((m|6)<<3)+4>>2]=D|j;j=c[q+3072+((m|3)<<3)>>2]|0;G=c[q+3072+((m|3)<<3)+4>>2]|0;z=c[q+3072+((m|7)<<3)>>2]|0;v=c[q+3072+((m|7)<<3)+4>>2]|0;C=we(z|0,v|0,j|0,G|0)|0;A=D;G=Wd(j|0,G|0,1)|0;G=Kd(G&-2|0,D&1|0,z|0,0)|0;G=we(C|0,A|0,G|0,D|0)|0;A=D;C=G^c[q+3072+((m|15)<<3)>>2];j=A^c[q+3072+((m|15)<<3)+4>>2];s=c[q+3072+((m|11)<<3)>>2]|0;y=c[q+3072+((m|11)<<3)+4>>2]|0;l=we(j|0,C|0,s|0,y|0)|0;t=D;y=Wd(s|0,y|0,1)|0;y=Kd(j|0,0,y&-2|0,D&1|0)|0;y=we(l|0,t|0,y|0,D|0)|0;t=D;l=Yd(y^z|0,t^v|0,24)|0;s=D;v=Wd(y^z|0,t^v|0,40)|0;s=D|s;z=we(v|l|0,s|0,G|0,A|0)|0;x=D;A=Wd(G|0,A|0,1)|0;A=Kd(l|0,0,A&-2|0,D&1|0)|0;A=we(z|0,x|0,A|0,D|0)|0;x=D;c[q+3072+((m|3)<<3)>>2]=A;c[q+3072+((m|3)<<3)+4>>2]=x;z=Yd(A^j|0,x^C|0,16)|0;G=D;C=Wd(A^j|0,x^C|0,48)|0;G=D|G;x=we(C|z|0,G|0,y|0,t|0)|0;j=D;t=Wd(y|0,t|0,1)|0;t=Kd(z|0,0,t&-2|0,D&1|0)|0;t=we(x|0,j|0,t|0,D|0)|0;j=D;x=Yd(t^(v|l)|0,j^s|0,63)|0;y=D;s=Wd(t^(v|l)|0,j^s|0,1)|0;y=D|y;c[q+3072+((m|7)<<3)>>2]=s|x;c[q+3072+((m|7)<<3)+4>>2]=y;l=c[q+3072+(m<<3)>>2]|0;v=c[q+3072+(m<<3)+4>>2]|0;A=c[q+3072+((m|5)<<3)>>2]|0;B=c[q+3072+((m|5)<<3)+4>>2]|0;w=we(A|0,B|0,l|0,v|0)|0;F=D;v=Wd(l|0,v|0,1)|0;v=Kd(v&-2|0,D&1|0,A|0,0)|0;v=we(w|0,F|0,v|0,D|0)|0;F=D;w=we(G^F|0,(C|z)^v|0,u|0,h|0)|0;l=D;h=Wd(u|0,h|0,1)|0;h=Kd(G^F|0,0,h&-2|0,D&1|0)|0;h=we(w|0,l|0,h|0,D|0)|0;l=D;w=Yd(h^A|0,l^B|0,24)|0;u=D;B=Wd(h^A|0,l^B|0,40)|0;u=D|u;A=we(B|w|0,u|0,v|0,F|0)|0;E=D;H=Wd(v|0,F|0,1)|0;H=Kd(w|0,0,H&-2|0,D&1|0)|0;H=we(A|0,E|0,H|0,D|0)|0;E=D;c[q+3072+(m<<3)>>2]=H;c[q+3072+(m<<3)+4>>2]=E;A=Yd(H^(G^F)|0,E^((C|z)^v)|0,16)|0;k=D;v=Wd(H^(G^F)|0,E^((C|z)^v)|0,48)|0;k=D|k;c[q+3072+((m|15)<<3)>>2]=v|A;c[q+3072+((m|15)<<3)+4>>2]=k;k=we(v|A|0,k|0,h|0,l|0)|0;v=D;l=Wd(h|0,l|0,1)|0;l=Kd(A|0,0,l&-2|0,D&1|0)|0;l=we(k|0,v|0,l|0,D|0)|0;v=D;c[q+3072+((m|10)<<3)>>2]=l;c[q+3072+((m|10)<<3)+4>>2]=v;k=Yd(l^(B|w)|0,v^u|0,63)|0;A=D;u=Wd(l^(B|w)|0,v^u|0,1)|0;c[q+3072+((m|5)<<3)>>2]=u|k;c[q+3072+((m|5)<<3)+4>>2]=D|A;A=c[q+3072+((m|1)<<3)>>2]|0;k=c[q+3072+((m|1)<<3)+4>>2]|0;u=c[q+3072+((m|6)<<3)>>2]|0;v=c[q+3072+((m|6)<<3)+4>>2]|0;w=we(u|0,v|0,A|0,k|0)|0;B=D;k=Wd(A|0,k|0,1)|0;k=Kd(k&-2|0,D&1|0,u|0,0)|0;k=we(w|0,B|0,k|0,D|0)|0;B=D;w=k^c[q+3072+((m|12)<<3)>>2];A=B^c[q+3072+((m|12)<<3)+4>>2];l=we(A|0,w|0,t|0,j|0)|0;h=D;j=Wd(t|0,j|0,1)|0;j=Kd(j&-2|0,D&1|0,A|0,0)|0;j=we(l|0,h|0,j|0,D|0)|0;h=D;l=Yd(j^u|0,h^v|0,24)|0;t=D;v=Wd(j^u|0,h^v|0,40)|0;t=D|t;u=we(v|l|0,t|0,k|0,B|0)|0;z=D;B=Wd(k|0,B|0,1)|0;B=Kd(l|0,0,B&-2|0,D&1|0)|0;B=we(u|0,z|0,B|0,D|0)|0;z=D;c[q+3072+((m|1)<<3)>>2]=B;c[q+3072+((m|1)<<3)+4>>2]=z;u=Yd(B^A|0,z^w|0,16)|0;k=D;w=Wd(B^A|0,z^w|0,48)|0;k=D|k;c[q+3072+((m|12)<<3)>>2]=w|u;c[q+3072+((m|12)<<3)+4>>2]=k;k=we(w|u|0,k|0,j|0,h|0)|0;w=D;h=Wd(j|0,h|0,1)|0;h=Kd(u|0,0,h&-2|0,D&1|0)|0;h=we(k|0,w|0,h|0,D|0)|0;w=D;c[q+3072+((m|11)<<3)>>2]=h;c[q+3072+((m|11)<<3)+4>>2]=w;k=Yd(h^(v|l)|0,w^t|0,63)|0;u=D;t=Wd(h^(v|l)|0,w^t|0,1)|0;c[q+3072+((m|6)<<3)>>2]=t|k;c[q+3072+((m|6)<<3)+4>>2]=D|u;u=c[q+3072+((m|2)<<3)>>2]|0;k=c[q+3072+((m|2)<<3)+4>>2]|0;t=we(s|x|0,y|0,u|0,k|0)|0;w=D;k=Wd(u|0,k|0,1)|0;k=Kd(k&-2|0,D&1|0,s|x|0,0)|0;k=we(t|0,w|0,k|0,D|0)|0;w=D;t=k^c[q+3072+((m|13)<<3)>>2];u=w^c[q+3072+((m|13)<<3)+4>>2];l=c[q+3072+((m|8)<<3)>>2]|0;v=c[q+3072+((m|8)<<3)+4>>2]|0;h=we(u|0,t|0,l|0,v|0)|0;j=D;v=Wd(l|0,v|0,1)|0;v=Kd(u|0,0,v&-2|0,D&1|0)|0;v=we(h|0,j|0,v|0,D|0)|0;j=D;h=Yd(v^(s|x)|0,j^y|0,24)|0;l=D;y=Wd(v^(s|x)|0,j^y|0,40)|0;l=D|l;x=we(y|h|0,l|0,k|0,w|0)|0;s=D;w=Wd(k|0,w|0,1)|0;w=Kd(h|0,0,w&-2|0,D&1|0)|0;w=we(x|0,s|0,w|0,D|0)|0;s=D;c[q+3072+((m|2)<<3)>>2]=w;c[q+3072+((m|2)<<3)+4>>2]=s;x=Yd(w^u|0,s^t|0,16)|0;k=D;t=Wd(w^u|0,s^t|0,48)|0;k=D|k;c[q+3072+((m|13)<<3)>>2]=t|x;c[q+3072+((m|13)<<3)+4>>2]=k;k=we(t|x|0,k|0,v|0,j|0)|0;t=D;j=Wd(v|0,j|0,1)|0;j=Kd(x|0,0,j&-2|0,D&1|0)|0;j=we(k|0,t|0,j|0,D|0)|0;t=D;c[q+3072+((m|8)<<3)>>2]=j;c[q+3072+((m|8)<<3)+4>>2]=t;k=Yd(j^(y|h)|0,t^l|0,63)|0;x=D;l=Wd(j^(y|h)|0,t^l|0,1)|0;c[q+3072+((m|7)<<3)>>2]=l|k;c[q+3072+((m|7)<<3)+4>>2]=D|x;x=c[q+3072+((m|3)<<3)>>2]|0;k=c[q+3072+((m|3)<<3)+4>>2]|0;l=c[q+3072+((m|4)<<3)>>2]|0;t=c[q+3072+((m|4)<<3)+4>>2]|0;h=we(l|0,t|0,x|0,k|0)|0;y=D;k=Wd(x|0,k|0,1)|0;k=Kd(k&-2|0,D&1|0,l|0,0)|0;k=we(h|0,y|0,k|0,D|0)|0;y=D;h=k^c[q+3072+((m|14)<<3)>>2];x=y^c[q+3072+((m|14)<<3)+4>>2];j=c[q+3072+((m|9)<<3)>>2]|0;v=c[q+3072+((m|9)<<3)+4>>2]|0;s=we(x|0,h|0,j|0,v|0)|0;u=D;v=Wd(j|0,v|0,1)|0;v=Kd(x|0,0,v&-2|0,D&1|0)|0;v=we(s|0,u|0,v|0,D|0)|0;u=D;s=Yd(v^l|0,u^t|0,24)|0;j=D;t=Wd(v^l|0,u^t|0,40)|0;j=D|j;l=we(t|s|0,j|0,k|0,y|0)|0;w=D;y=Wd(k|0,y|0,1)|0;y=Kd(s|0,0,y&-2|0,D&1|0)|0;y=we(l|0,w|0,y|0,D|0)|0;w=D;c[q+3072+((m|3)<<3)>>2]=y;c[q+3072+((m|3)<<3)+4>>2]=w;l=Yd(y^x|0,w^h|0,16)|0;k=D;h=Wd(y^x|0,w^h|0,48)|0;k=D|k;c[q+3072+((m|14)<<3)>>2]=h|l;c[q+3072+((m|14)<<3)+4>>2]=k;k=we(h|l|0,k|0,v|0,u|0)|0;h=D;u=Wd(v|0,u|0,1)|0;u=Kd(l|0,0,u&-2|0,D&1|0)|0;u=we(k|0,h|0,u|0,D|0)|0;h=D;c[q+3072+((m|9)<<3)>>2]=u;c[q+3072+((m|9)<<3)+4>>2]=h;k=Yd(u^(t|s)|0,h^j|0,63)|0;l=D;j=Wd(u^(t|s)|0,h^j|0,1)|0;c[q+3072+((m|4)<<3)>>2]=j|k;c[q+3072+((m|4)<<3)+4>>2]=D|l;f=f+1|0}while((f|0)!=8);f=0;do{H=f<<1;A=c[q+3072+(H<<3)>>2]|0;E=c[q+3072+(H<<3)+4>>2]|0;v=q+3072+(H+32<<3)|0;y=c[v>>2]|0;v=c[v+4>>2]|0;s=we(y|0,v|0,A|0,E|0)|0;j=D;E=Wd(A|0,E|0,1)|0;E=Kd(E&-2|0,D&1|0,y|0,0)|0;E=we(s|0,j|0,E|0,D|0)|0;j=D;s=q+3072+(H+96<<3)|0;A=E^c[s>>2];s=j^c[s+4>>2];m=q+3072+(H+64<<3)|0;w=c[m>>2]|0;m=c[m+4>>2]|0;F=we(s|0,A|0,w|0,m|0)|0;u=D;m=Wd(w|0,m|0,1)|0;m=Kd(s|0,0,m&-2|0,D&1|0)|0;m=we(F|0,u|0,m|0,D|0)|0;u=D;F=Yd(m^y|0,u^v|0,24)|0;w=D;v=Wd(m^y|0,u^v|0,40)|0;w=D|w;y=we(v|F|0,w|0,E|0,j|0)|0;B=D;j=Wd(E|0,j|0,1)|0;j=Kd(F|0,0,j&-2|0,D&1|0)|0;j=we(y|0,B|0,j|0,D|0)|0;B=D;c[q+3072+(H<<3)>>2]=j;c[q+3072+(H<<3)+4>>2]=B;y=Yd(j^s|0,B^A|0,16)|0;E=D;A=Wd(j^s|0,B^A|0,48)|0;E=D|E;B=q+3072+(H+96<<3)|0;c[B>>2]=A|y;c[B+4>>2]=E;E=we(A|y|0,E|0,m|0,u|0)|0;A=D;u=Wd(m|0,u|0,1)|0;u=Kd(y|0,0,u&-2|0,D&1|0)|0;u=we(E|0,A|0,u|0,D|0)|0;A=D;E=q+3072+(H+64<<3)|0;c[E>>2]=u;c[E+4>>2]=A;E=Yd(u^(v|F)|0,A^w|0,63)|0;y=D;w=Wd(u^(v|F)|0,A^w|0,1)|0;A=q+3072+(H+32<<3)|0;c[A>>2]=w|E;c[A+4>>2]=D|y;A=c[q+3072+((H|1)<<3)>>2]|0;y=c[q+3072+((H|1)<<3)+4>>2]|0;E=q+3072+(H+33<<3)|0;w=c[E>>2]|0;E=c[E+4>>2]|0;F=we(w|0,E|0,A|0,y|0)|0;v=D;y=Wd(A|0,y|0,1)|0;y=Kd(y&-2|0,D&1|0,w|0,0)|0;y=we(F|0,v|0,y|0,D|0)|0;v=D;F=q+3072+(H+97<<3)|0;A=y^c[F>>2];F=v^c[F+4>>2];u=q+3072+(H+65<<3)|0;m=c[u>>2]|0;u=c[u+4>>2]|0;B=we(F|0,A|0,m|0,u|0)|0;s=D;u=Wd(m|0,u|0,1)|0;u=Kd(F|0,0,u&-2|0,D&1|0)|0;u=we(B|0,s|0,u|0,D|0)|0;s=D;B=Yd(u^w|0,s^E|0,24)|0;m=D;E=Wd(u^w|0,s^E|0,40)|0;m=D|m;w=we(E|B|0,m|0,y|0,v|0)|0;j=D;v=Wd(y|0,v|0,1)|0;v=Kd(B|0,0,v&-2|0,D&1|0)|0;v=we(w|0,j|0,v|0,D|0)|0;j=D;c[q+3072+((H|1)<<3)>>2]=v;c[q+3072+((H|1)<<3)+4>>2]=j;w=Yd(v^F|0,j^A|0,16)|0;y=D;A=Wd(v^F|0,j^A|0,48)|0;y=D|y;j=q+3072+(H+97<<3)|0;c[j>>2]=A|w;c[j+4>>2]=y;y=we(A|w|0,y|0,u|0,s|0)|0;A=D;s=Wd(u|0,s|0,1)|0;s=Kd(w|0,0,s&-2|0,D&1|0)|0;s=we(y|0,A|0,s|0,D|0)|0;A=D;y=q+3072+(H+65<<3)|0;c[y>>2]=s;c[y+4>>2]=A;y=Yd(s^(E|B)|0,A^m|0,63)|0;w=D;m=Wd(s^(E|B)|0,A^m|0,1)|0;A=q+3072+(H+33<<3)|0;c[A>>2]=m|y;c[A+4>>2]=D|w;A=q+3072+(H+16<<3)|0;w=c[A>>2]|0;A=c[A+4>>2]|0;y=q+3072+(H+48<<3)|0;m=c[y>>2]|0;y=c[y+4>>2]|0;B=we(m|0,y|0,w|0,A|0)|0;E=D;A=Wd(w|0,A|0,1)|0;A=Kd(A&-2|0,D&1|0,m|0,0)|0;A=we(B|0,E|0,A|0,D|0)|0;E=D;B=q+3072+(H+112<<3)|0;w=A^c[B>>2];B=E^c[B+4>>2];s=q+3072+(H+80<<3)|0;u=c[s>>2]|0;s=c[s+4>>2]|0;j=we(B|0,w|0,u|0,s|0)|0;F=D;s=Wd(u|0,s|0,1)|0;s=Kd(B|0,0,s&-2|0,D&1|0)|0;s=we(j|0,F|0,s|0,D|0)|0;F=D;j=Yd(s^m|0,F^y|0,24)|0;u=D;y=Wd(s^m|0,F^y|0,40)|0;u=D|u;m=we(y|j|0,u|0,A|0,E|0)|0;v=D;E=Wd(A|0,E|0,1)|0;E=Kd(j|0,0,E&-2|0,D&1|0)|0;E=we(m|0,v|0,E|0,D|0)|0;v=D;m=q+3072+(H+16<<3)|0;c[m>>2]=E;c[m+4>>2]=v;m=Yd(E^B|0,v^w|0,16)|0;A=D;w=Wd(E^B|0,v^w|0,48)|0;A=D|A;v=q+3072+(H+112<<3)|0;c[v>>2]=w|m;c[v+4>>2]=A;A=we(w|m|0,A|0,s|0,F|0)|0;w=D;F=Wd(s|0,F|0,1)|0;F=Kd(m|0,0,F&-2|0,D&1|0)|0;F=we(A|0,w|0,F|0,D|0)|0;w=D;A=Yd(F^(y|j)|0,w^u|0,63)|0;m=D;u=Wd(F^(y|j)|0,w^u|0,1)|0;j=q+3072+(H+48<<3)|0;c[j>>2]=u|A;c[j+4>>2]=D|m;j=q+3072+(H+17<<3)|0;m=c[j>>2]|0;j=c[j+4>>2]|0;A=q+3072+(H+49<<3)|0;u=c[A>>2]|0;A=c[A+4>>2]|0;y=we(u|0,A|0,m|0,j|0)|0;s=D;j=Wd(m|0,j|0,1)|0;j=Kd(j&-2|0,D&1|0,u|0,0)|0;j=we(y|0,s|0,j|0,D|0)|0;s=D;y=q+3072+(H+113<<3)|0;m=j^c[y>>2];y=s^c[y+4>>2];v=q+3072+(H+81<<3)|0;B=c[v>>2]|0;v=c[v+4>>2]|0;E=we(y|0,m|0,B|0,v|0)|0;x=D;v=Wd(B|0,v|0,1)|0;v=Kd(y|0,0,v&-2|0,D&1|0)|0;v=we(E|0,x|0,v|0,D|0)|0;x=D;E=Yd(v^u|0,x^A|0,24)|0;B=D;A=Wd(v^u|0,x^A|0,40)|0;B=D|B;u=we(A|E|0,B|0,j|0,s|0)|0;C=D;s=Wd(j|0,s|0,1)|0;s=Kd(E|0,0,s&-2|0,D&1|0)|0;s=we(u|0,C|0,s|0,D|0)|0;C=D;u=q+3072+(H+17<<3)|0;c[u>>2]=s;c[u+4>>2]=C;u=Yd(s^y|0,C^m|0,16)|0;j=D;m=Wd(s^y|0,C^m|0,48)|0;j=D|j;C=we(m|u|0,j|0,v|0,x|0)|0;y=D;x=Wd(v|0,x|0,1)|0;x=Kd(u|0,0,x&-2|0,D&1|0)|0;x=we(C|0,y|0,x|0,D|0)|0;y=D;C=Yd(x^(A|E)|0,y^B|0,63)|0;v=D;B=Wd(x^(A|E)|0,y^B|0,1)|0;v=D|v;E=q+3072+(H+49<<3)|0;c[E>>2]=B|C;c[E+4>>2]=v;E=c[q+3072+(H<<3)>>2]|0;A=c[q+3072+(H<<3)+4>>2]|0;s=q+3072+(H+33<<3)|0;z=c[s>>2]|0;s=c[s+4>>2]|0;t=we(z|0,s|0,E|0,A|0)|0;k=D;A=Wd(E|0,A|0,1)|0;A=Kd(A&-2|0,D&1|0,z|0,0)|0;A=we(t|0,k|0,A|0,D|0)|0;k=D;t=we(j^k|0,(m|u)^A|0,F|0,w|0)|0;E=D;w=Wd(F|0,w|0,1)|0;w=Kd(j^k|0,0,w&-2|0,D&1|0)|0;w=we(t|0,E|0,w|0,D|0)|0;E=D;t=Yd(w^z|0,E^s|0,24)|0;F=D;s=Wd(w^z|0,E^s|0,40)|0;F=D|F;z=we(s|t|0,F|0,A|0,k|0)|0;l=D;h=Wd(A|0,k|0,1)|0;h=Kd(t|0,0,h&-2|0,D&1|0)|0;h=we(z|0,l|0,h|0,D|0)|0;l=D;c[q+3072+(H<<3)>>2]=h;c[q+3072+(H<<3)+4>>2]=l;z=Yd(h^(j^k)|0,l^((m|u)^A)|0,16)|0;G=D;A=Wd(h^(j^k)|0,l^((m|u)^A)|0,48)|0;G=D|G;u=q+3072+(H+113<<3)|0;c[u>>2]=A|z;c[u+4>>2]=G;G=we(A|z|0,G|0,w|0,E|0)|0;A=D;E=Wd(w|0,E|0,1)|0;E=Kd(z|0,0,E&-2|0,D&1|0)|0;E=we(G|0,A|0,E|0,D|0)|0;A=D;G=q+3072+(H+80<<3)|0;c[G>>2]=E;c[G+4>>2]=A;G=Yd(E^(s|t)|0,A^F|0,63)|0;z=D;F=Wd(E^(s|t)|0,A^F|0,1)|0;A=q+3072+(H+33<<3)|0;c[A>>2]=F|G;c[A+4>>2]=D|z;A=c[q+3072+((H|1)<<3)>>2]|0;z=c[q+3072+((H|1)<<3)+4>>2]|0;G=q+3072+(H+48<<3)|0;F=c[G>>2]|0;G=c[G+4>>2]|0;t=we(F|0,G|0,A|0,z|0)|0;s=D;z=Wd(A|0,z|0,1)|0;z=Kd(z&-2|0,D&1|0,F|0,0)|0;z=we(t|0,s|0,z|0,D|0)|0;s=D;t=q+3072+(H+96<<3)|0;A=z^c[t>>2];t=s^c[t+4>>2];E=we(t|0,A|0,x|0,y|0)|0;w=D;y=Wd(x|0,y|0,1)|0;y=Kd(y&-2|0,D&1|0,t|0,0)|0;y=we(E|0,w|0,y|0,D|0)|0;w=D;E=Yd(y^F|0,w^G|0,24)|0;x=D;G=Wd(y^F|0,w^G|0,40)|0;x=D|x;F=we(G|E|0,x|0,z|0,s|0)|0;u=D;s=Wd(z|0,s|0,1)|0;s=Kd(E|0,0,s&-2|0,D&1|0)|0;s=we(F|0,u|0,s|0,D|0)|0;u=D;c[q+3072+((H|1)<<3)>>2]=s;c[q+3072+((H|1)<<3)+4>>2]=u;F=Yd(s^t|0,u^A|0,16)|0;z=D;A=Wd(s^t|0,u^A|0,48)|0;z=D|z;u=q+3072+(H+96<<3)|0;c[u>>2]=A|F;c[u+4>>2]=z;z=we(A|F|0,z|0,y|0,w|0)|0;A=D;w=Wd(y|0,w|0,1)|0;w=Kd(F|0,0,w&-2|0,D&1|0)|0;w=we(z|0,A|0,w|0,D|0)|0;A=D;z=q+3072+(H+81<<3)|0;c[z>>2]=w;c[z+4>>2]=A;z=Yd(w^(G|E)|0,A^x|0,63)|0;F=D;x=Wd(w^(G|E)|0,A^x|0,1)|0;A=q+3072+(H+48<<3)|0;c[A>>2]=x|z;c[A+4>>2]=D|F;A=q+3072+(H+16<<3)|0;F=c[A>>2]|0;A=c[A+4>>2]|0;z=we(B|C|0,v|0,F|0,A|0)|0;x=D;A=Wd(F|0,A|0,1)|0;A=Kd(A&-2|0,D&1|0,B|C|0,0)|0;A=we(z|0,x|0,A|0,D|0)|0;x=D;z=q+3072+(H+97<<3)|0;F=A^c[z>>2];z=x^c[z+4>>2];E=q+3072+(H+64<<3)|0;G=c[E>>2]|0;E=c[E+4>>2]|0;w=we(z|0,F|0,G|0,E|0)|0;y=D;E=Wd(G|0,E|0,1)|0;E=Kd(z|0,0,E&-2|0,D&1|0)|0;E=we(w|0,y|0,E|0,D|0)|0;y=D;w=Yd(E^(B|C)|0,y^v|0,24)|0;G=D;v=Wd(E^(B|C)|0,y^v|0,40)|0;G=D|G;C=we(v|w|0,G|0,A|0,x|0)|0;B=D;x=Wd(A|0,x|0,1)|0;x=Kd(w|0,0,x&-2|0,D&1|0)|0;x=we(C|0,B|0,x|0,D|0)|0;B=D;C=q+3072+(H+16<<3)|0;c[C>>2]=x;c[C+4>>2]=B;C=Yd(x^z|0,B^F|0,16)|0;A=D;F=Wd(x^z|0,B^F|0,48)|0;A=D|A;B=q+3072+(H+97<<3)|0;c[B>>2]=F|C;c[B+4>>2]=A;A=we(F|C|0,A|0,E|0,y|0)|0;F=D;y=Wd(E|0,y|0,1)|0;y=Kd(C|0,0,y&-2|0,D&1|0)|0;y=we(A|0,F|0,y|0,D|0)|0;F=D;A=q+3072+(H+64<<3)|0;c[A>>2]=y;c[A+4>>2]=F;A=Yd(y^(v|w)|0,F^G|0,63)|0;C=D;G=Wd(y^(v|w)|0,F^G|0,1)|0;F=q+3072+(H+49<<3)|0;c[F>>2]=G|A;c[F+4>>2]=D|C;F=q+3072+(H+17<<3)|0;C=c[F>>2]|0;F=c[F+4>>2]|0;A=q+3072+(H+32<<3)|0;G=c[A>>2]|0;A=c[A+4>>2]|0;w=we(G|0,A|0,C|0,F|0)|0;v=D;F=Wd(C|0,F|0,1)|0;F=Kd(F&-2|0,D&1|0,G|0,0)|0;F=we(w|0,v|0,F|0,D|0)|0;v=D;w=q+3072+(H+112<<3)|0;C=F^c[w>>2];w=v^c[w+4>>2];y=q+3072+(H+65<<3)|0;E=c[y>>2]|0;y=c[y+4>>2]|0;B=we(w|0,C|0,E|0,y|0)|0;z=D;y=Wd(E|0,y|0,1)|0;y=Kd(w|0,0,y&-2|0,D&1|0)|0;y=we(B|0,z|0,y|0,D|0)|0;z=D;B=Yd(y^G|0,z^A|0,24)|0;E=D;A=Wd(y^G|0,z^A|0,40)|0;E=D|E;G=we(A|B|0,E|0,F|0,v|0)|0;x=D;v=Wd(F|0,v|0,1)|0;v=Kd(B|0,0,v&-2|0,D&1|0)|0;v=we(G|0,x|0,v|0,D|0)|0;x=D;G=q+3072+(H+17<<3)|0;c[G>>2]=v;c[G+4>>2]=x;G=Yd(v^w|0,x^C|0,16)|0;F=D;C=Wd(v^w|0,x^C|0,48)|0;F=D|F;x=q+3072+(H+112<<3)|0;c[x>>2]=C|G;c[x+4>>2]=F;F=we(C|G|0,F|0,y|0,z|0)|0;C=D;z=Wd(y|0,z|0,1)|0;z=Kd(G|0,0,z&-2|0,D&1|0)|0;z=we(F|0,C|0,z|0,D|0)|0;C=D;F=q+3072+(H+65<<3)|0;c[F>>2]=z;c[F+4>>2]=C;F=Yd(z^(A|B)|0,C^E|0,63)|0;G=D;E=Wd(z^(A|B)|0,C^E|0,1)|0;H=q+3072+(H+32<<3)|0;c[H>>2]=E|F;c[H+4>>2]=D|G;f=f+1|0}while((f|0)!=8);pf(g,q+2048|0);md(g,q+3072|0)}else la(k+(n<<10)|0,k+(f<<10)+(j<<10)|0,g);e=e+1|0;if(e>>>0>=(c[b+12>>2]|0)>>>0)break a;o=o+1|0;f=n+1|0;m=c[b+16>>2]|0;g=c[d>>2]|0}}while(0);ta(p);e=0}}else e=0;i=r;return e|0}function la(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;e=i;f=i=i+63&-64;i=i+2048|0;pf(f+1024|0,b);md(f+1024|0,a);pf(f,f+1024|0);md(f,d);a=0;do{b=a<<4;o=c[f+1024+(b<<3)>>2]|0;x=c[f+1024+(b<<3)+4>>2]|0;n=c[f+1024+((b|4)<<3)>>2]|0;l=c[f+1024+((b|4)<<3)+4>>2]|0;g=we(n|0,l|0,o|0,x|0)|0;v=D;x=Wd(o|0,x|0,1)|0;x=Kd(x&-2|0,D&1|0,n|0,0)|0;x=we(g|0,v|0,x|0,D|0)|0;v=D;g=x^c[f+1024+((b|12)<<3)>>2];o=v^c[f+1024+((b|12)<<3)+4>>2];r=c[f+1024+((b|8)<<3)>>2]|0;t=c[f+1024+((b|8)<<3)+4>>2]|0;s=we(o|0,g|0,r|0,t|0)|0;j=D;t=Wd(r|0,t|0,1)|0;t=Kd(t&-2|0,D&1|0,o|0,0)|0;t=we(s|0,j|0,t|0,D|0)|0;j=D;s=Yd(t^n|0,j^l|0,24)|0;r=D;l=Wd(t^n|0,j^l|0,40)|0;r=D|r;n=we(l|s|0,r|0,x|0,v|0)|0;k=D;v=Wd(x|0,v|0,1)|0;v=Kd(s|0,0,v&-2|0,D&1|0)|0;v=we(n|0,k|0,v|0,D|0)|0;k=D;c[f+1024+(b<<3)>>2]=v;c[f+1024+(b<<3)+4>>2]=k;n=Yd(v^o|0,k^g|0,16)|0;x=D;g=Wd(v^o|0,k^g|0,48)|0;x=D|x;c[f+1024+((b|12)<<3)>>2]=g|n;c[f+1024+((b|12)<<3)+4>>2]=x;x=we(g|n|0,x|0,t|0,j|0)|0;g=D;j=Wd(t|0,j|0,1)|0;j=Kd(n|0,0,j&-2|0,D&1|0)|0;j=we(x|0,g|0,j|0,D|0)|0;g=D;c[f+1024+((b|8)<<3)>>2]=j;c[f+1024+((b|8)<<3)+4>>2]=g;x=Yd(j^(l|s)|0,g^r|0,63)|0;n=D;r=Wd(j^(l|s)|0,g^r|0,1)|0;c[f+1024+((b|4)<<3)>>2]=r|x;c[f+1024+((b|4)<<3)+4>>2]=D|n;n=c[f+1024+((b|1)<<3)>>2]|0;x=c[f+1024+((b|1)<<3)+4>>2]|0;r=c[f+1024+((b|5)<<3)>>2]|0;g=c[f+1024+((b|5)<<3)+4>>2]|0;s=we(r|0,g|0,n|0,x|0)|0;l=D;x=Wd(n|0,x|0,1)|0;x=Kd(x&-2|0,D&1|0,r|0,0)|0;x=we(s|0,l|0,x|0,D|0)|0;l=D;s=x^c[f+1024+((b|13)<<3)>>2];n=l^c[f+1024+((b|13)<<3)+4>>2];j=c[f+1024+((b|9)<<3)>>2]|0;t=c[f+1024+((b|9)<<3)+4>>2]|0;k=we(n|0,s|0,j|0,t|0)|0;o=D;t=Wd(j|0,t|0,1)|0;t=Kd(t&-2|0,D&1|0,n|0,0)|0;t=we(k|0,o|0,t|0,D|0)|0;o=D;k=Yd(t^r|0,o^g|0,24)|0;j=D;g=Wd(t^r|0,o^g|0,40)|0;j=D|j;r=we(g|k|0,j|0,x|0,l|0)|0;v=D;l=Wd(x|0,l|0,1)|0;l=Kd(k|0,0,l&-2|0,D&1|0)|0;l=we(r|0,v|0,l|0,D|0)|0;v=D;c[f+1024+((b|1)<<3)>>2]=l;c[f+1024+((b|1)<<3)+4>>2]=v;r=Yd(l^n|0,v^s|0,16)|0;x=D;s=Wd(l^n|0,v^s|0,48)|0;x=D|x;c[f+1024+((b|13)<<3)>>2]=s|r;c[f+1024+((b|13)<<3)+4>>2]=x;x=we(s|r|0,x|0,t|0,o|0)|0;s=D;o=Wd(t|0,o|0,1)|0;o=Kd(r|0,0,o&-2|0,D&1|0)|0;o=we(x|0,s|0,o|0,D|0)|0;s=D;c[f+1024+((b|9)<<3)>>2]=o;c[f+1024+((b|9)<<3)+4>>2]=s;x=Yd(o^(g|k)|0,s^j|0,63)|0;r=D;j=Wd(o^(g|k)|0,s^j|0,1)|0;c[f+1024+((b|5)<<3)>>2]=j|x;c[f+1024+((b|5)<<3)+4>>2]=D|r;r=c[f+1024+((b|2)<<3)>>2]|0;x=c[f+1024+((b|2)<<3)+4>>2]|0;j=c[f+1024+((b|6)<<3)>>2]|0;s=c[f+1024+((b|6)<<3)+4>>2]|0;k=we(j|0,s|0,r|0,x|0)|0;g=D;x=Wd(r|0,x|0,1)|0;x=Kd(x&-2|0,D&1|0,j|0,0)|0;x=we(k|0,g|0,x|0,D|0)|0;g=D;k=x^c[f+1024+((b|14)<<3)>>2];r=g^c[f+1024+((b|14)<<3)+4>>2];o=c[f+1024+((b|10)<<3)>>2]|0;t=c[f+1024+((b|10)<<3)+4>>2]|0;v=we(r|0,k|0,o|0,t|0)|0;n=D;t=Wd(o|0,t|0,1)|0;t=Kd(t&-2|0,D&1|0,r|0,0)|0;t=we(v|0,n|0,t|0,D|0)|0;n=D;v=Yd(t^j|0,n^s|0,24)|0;o=D;s=Wd(t^j|0,n^s|0,40)|0;o=D|o;j=we(s|v|0,o|0,x|0,g|0)|0;l=D;g=Wd(x|0,g|0,1)|0;g=Kd(v|0,0,g&-2|0,D&1|0)|0;g=we(j|0,l|0,g|0,D|0)|0;l=D;c[f+1024+((b|2)<<3)>>2]=g;c[f+1024+((b|2)<<3)+4>>2]=l;j=Yd(g^r|0,l^k|0,16)|0;x=D;k=Wd(g^r|0,l^k|0,48)|0;x=D|x;c[f+1024+((b|14)<<3)>>2]=k|j;c[f+1024+((b|14)<<3)+4>>2]=x;x=we(k|j|0,x|0,t|0,n|0)|0;k=D;n=Wd(t|0,n|0,1)|0;n=Kd(j|0,0,n&-2|0,D&1|0)|0;n=we(x|0,k|0,n|0,D|0)|0;k=D;x=Yd(n^(s|v)|0,k^o|0,63)|0;j=D;o=Wd(n^(s|v)|0,k^o|0,1)|0;c[f+1024+((b|6)<<3)>>2]=o|x;c[f+1024+((b|6)<<3)+4>>2]=D|j;j=c[f+1024+((b|3)<<3)>>2]|0;x=c[f+1024+((b|3)<<3)+4>>2]|0;o=c[f+1024+((b|7)<<3)>>2]|0;v=c[f+1024+((b|7)<<3)+4>>2]|0;s=we(o|0,v|0,j|0,x|0)|0;t=D;x=Wd(j|0,x|0,1)|0;x=Kd(x&-2|0,D&1|0,o|0,0)|0;x=we(s|0,t|0,x|0,D|0)|0;t=D;s=x^c[f+1024+((b|15)<<3)>>2];j=t^c[f+1024+((b|15)<<3)+4>>2];l=c[f+1024+((b|11)<<3)>>2]|0;r=c[f+1024+((b|11)<<3)+4>>2]|0;g=we(j|0,s|0,l|0,r|0)|0;m=D;r=Wd(l|0,r|0,1)|0;r=Kd(r&-2|0,D&1|0,j|0,0)|0;r=we(g|0,m|0,r|0,D|0)|0;m=D;g=Yd(r^o|0,m^v|0,24)|0;l=D;v=Wd(r^o|0,m^v|0,40)|0;l=D|l;o=we(v|g|0,l|0,x|0,t|0)|0;q=D;t=Wd(x|0,t|0,1)|0;t=Kd(g|0,0,t&-2|0,D&1|0)|0;t=we(o|0,q|0,t|0,D|0)|0;q=D;c[f+1024+((b|3)<<3)>>2]=t;c[f+1024+((b|3)<<3)+4>>2]=q;o=Yd(t^j|0,q^s|0,16)|0;x=D;s=Wd(t^j|0,q^s|0,48)|0;x=D|x;q=we(s|o|0,x|0,r|0,m|0)|0;j=D;m=Wd(r|0,m|0,1)|0;m=Kd(o|0,0,m&-2|0,D&1|0)|0;m=we(q|0,j|0,m|0,D|0)|0;j=D;q=Yd(m^(v|g)|0,j^l|0,63)|0;r=D;l=Wd(m^(v|g)|0,j^l|0,1)|0;r=D|r;c[f+1024+((b|7)<<3)>>2]=l|q;c[f+1024+((b|7)<<3)+4>>2]=r;g=c[f+1024+(b<<3)>>2]|0;v=c[f+1024+(b<<3)+4>>2]|0;t=c[f+1024+((b|5)<<3)>>2]|0;u=c[f+1024+((b|5)<<3)+4>>2]|0;p=we(t|0,u|0,g|0,v|0)|0;y=D;v=Wd(g|0,v|0,1)|0;v=Kd(v&-2|0,D&1|0,t|0,0)|0;v=we(p|0,y|0,v|0,D|0)|0;y=D;p=we(y^x|0,v^(s|o)|0,n|0,k|0)|0;g=D;k=Wd(n|0,k|0,1)|0;k=Kd(k&-2|0,D&1|0,y^x|0,0)|0;k=we(p|0,g|0,k|0,D|0)|0;g=D;p=Yd(k^t|0,g^u|0,24)|0;n=D;u=Wd(k^t|0,g^u|0,40)|0;n=D|n;t=we(u|p|0,n|0,v|0,y|0)|0;w=D;z=Wd(v|0,y|0,1)|0;z=Kd(p|0,0,z&-2|0,D&1|0)|0;z=we(t|0,w|0,z|0,D|0)|0;w=D;c[f+1024+(b<<3)>>2]=z;c[f+1024+(b<<3)+4>>2]=w;t=Yd(z^(y^x)|0,w^(v^(s|o))|0,16)|0;h=D;o=Wd(z^(y^x)|0,w^(v^(s|o))|0,48)|0;h=D|h;c[f+1024+((b|15)<<3)>>2]=o|t;c[f+1024+((b|15)<<3)+4>>2]=h;h=we(o|t|0,h|0,k|0,g|0)|0;o=D;g=Wd(k|0,g|0,1)|0;g=Kd(t|0,0,g&-2|0,D&1|0)|0;g=we(h|0,o|0,g|0,D|0)|0;o=D;c[f+1024+((b|10)<<3)>>2]=g;c[f+1024+((b|10)<<3)+4>>2]=o;h=Yd(g^(u|p)|0,o^n|0,63)|0;t=D;n=Wd(g^(u|p)|0,o^n|0,1)|0;c[f+1024+((b|5)<<3)>>2]=n|h;c[f+1024+((b|5)<<3)+4>>2]=D|t;t=c[f+1024+((b|1)<<3)>>2]|0;h=c[f+1024+((b|1)<<3)+4>>2]|0;n=c[f+1024+((b|6)<<3)>>2]|0;o=c[f+1024+((b|6)<<3)+4>>2]|0;p=we(n|0,o|0,t|0,h|0)|0;u=D;h=Wd(t|0,h|0,1)|0;h=Kd(h&-2|0,D&1|0,n|0,0)|0;h=we(p|0,u|0,h|0,D|0)|0;u=D;p=h^c[f+1024+((b|12)<<3)>>2];t=u^c[f+1024+((b|12)<<3)+4>>2];g=we(t|0,p|0,m|0,j|0)|0;k=D;j=Wd(m|0,j|0,1)|0;j=Kd(j&-2|0,D&1|0,t|0,0)|0;j=we(g|0,k|0,j|0,D|0)|0;k=D;g=Yd(j^n|0,k^o|0,24)|0;m=D;o=Wd(j^n|0,k^o|0,40)|0;m=D|m;n=we(o|g|0,m|0,h|0,u|0)|0;s=D;u=Wd(h|0,u|0,1)|0;u=Kd(g|0,0,u&-2|0,D&1|0)|0;u=we(n|0,s|0,u|0,D|0)|0;s=D;c[f+1024+((b|1)<<3)>>2]=u;c[f+1024+((b|1)<<3)+4>>2]=s;n=Yd(u^t|0,s^p|0,16)|0;h=D;p=Wd(u^t|0,s^p|0,48)|0;h=D|h;c[f+1024+((b|12)<<3)>>2]=p|n;c[f+1024+((b|12)<<3)+4>>2]=h;h=we(p|n|0,h|0,j|0,k|0)|0;p=D;k=Wd(j|0,k|0,1)|0;k=Kd(n|0,0,k&-2|0,D&1|0)|0;k=we(h|0,p|0,k|0,D|0)|0;p=D;c[f+1024+((b|11)<<3)>>2]=k;c[f+1024+((b|11)<<3)+4>>2]=p;h=Yd(k^(o|g)|0,p^m|0,63)|0;n=D;m=Wd(k^(o|g)|0,p^m|0,1)|0;c[f+1024+((b|6)<<3)>>2]=m|h;c[f+1024+((b|6)<<3)+4>>2]=D|n;n=c[f+1024+((b|2)<<3)>>2]|0;h=c[f+1024+((b|2)<<3)+4>>2]|0;m=we(l|q|0,r|0,n|0,h|0)|0;p=D;h=Wd(n|0,h|0,1)|0;h=Kd(h&-2|0,D&1|0,l|q|0,0)|0;h=we(m|0,p|0,h|0,D|0)|0;p=D;m=h^c[f+1024+((b|13)<<3)>>2];n=p^c[f+1024+((b|13)<<3)+4>>2];g=c[f+1024+((b|8)<<3)>>2]|0;o=c[f+1024+((b|8)<<3)+4>>2]|0;k=we(n|0,m|0,g|0,o|0)|0;j=D;o=Wd(g|0,o|0,1)|0;o=Kd(o&-2|0,D&1|0,n|0,0)|0;o=we(k|0,j|0,o|0,D|0)|0;j=D;k=Yd(o^(l|q)|0,j^r|0,24)|0;g=D;r=Wd(o^(l|q)|0,j^r|0,40)|0;g=D|g;q=we(r|k|0,g|0,h|0,p|0)|0;l=D;p=Wd(h|0,p|0,1)|0;p=Kd(k|0,0,p&-2|0,D&1|0)|0;p=we(q|0,l|0,p|0,D|0)|0;l=D;c[f+1024+((b|2)<<3)>>2]=p;c[f+1024+((b|2)<<3)+4>>2]=l;q=Yd(p^n|0,l^m|0,16)|0;h=D;m=Wd(p^n|0,l^m|0,48)|0;h=D|h;c[f+1024+((b|13)<<3)>>2]=m|q;c[f+1024+((b|13)<<3)+4>>2]=h;h=we(m|q|0,h|0,o|0,j|0)|0;m=D;j=Wd(o|0,j|0,1)|0;j=Kd(q|0,0,j&-2|0,D&1|0)|0;j=we(h|0,m|0,j|0,D|0)|0;m=D;c[f+1024+((b|8)<<3)>>2]=j;c[f+1024+((b|8)<<3)+4>>2]=m;h=Yd(j^(r|k)|0,m^g|0,63)|0;q=D;g=Wd(j^(r|k)|0,m^g|0,1)|0;c[f+1024+((b|7)<<3)>>2]=g|h;c[f+1024+((b|7)<<3)+4>>2]=D|q;q=c[f+1024+((b|3)<<3)>>2]|0;h=c[f+1024+((b|3)<<3)+4>>2]|0;g=c[f+1024+((b|4)<<3)>>2]|0;m=c[f+1024+((b|4)<<3)+4>>2]|0;k=we(g|0,m|0,q|0,h|0)|0;r=D;h=Wd(q|0,h|0,1)|0;h=Kd(h&-2|0,D&1|0,g|0,0)|0;h=we(k|0,r|0,h|0,D|0)|0;r=D;k=h^c[f+1024+((b|14)<<3)>>2];q=r^c[f+1024+((b|14)<<3)+4>>2];j=c[f+1024+((b|9)<<3)>>2]|0;o=c[f+1024+((b|9)<<3)+4>>2]|0;l=we(q|0,k|0,j|0,o|0)|0;n=D;o=Wd(j|0,o|0,1)|0;o=Kd(o&-2|0,D&1|0,q|0,0)|0;o=we(l|0,n|0,o|0,D|0)|0;n=D;l=Yd(o^g|0,n^m|0,24)|0;j=D;m=Wd(o^g|0,n^m|0,40)|0;j=D|j;g=we(m|l|0,j|0,h|0,r|0)|0;p=D;r=Wd(h|0,r|0,1)|0;r=Kd(l|0,0,r&-2|0,D&1|0)|0;r=we(g|0,p|0,r|0,D|0)|0;p=D;c[f+1024+((b|3)<<3)>>2]=r;c[f+1024+((b|3)<<3)+4>>2]=p;g=Yd(r^q|0,p^k|0,16)|0;h=D;k=Wd(r^q|0,p^k|0,48)|0;h=D|h;c[f+1024+((b|14)<<3)>>2]=k|g;c[f+1024+((b|14)<<3)+4>>2]=h;h=we(k|g|0,h|0,o|0,n|0)|0;k=D;n=Wd(o|0,n|0,1)|0;n=Kd(g|0,0,n&-2|0,D&1|0)|0;n=we(h|0,k|0,n|0,D|0)|0;k=D;c[f+1024+((b|9)<<3)>>2]=n;c[f+1024+((b|9)<<3)+4>>2]=k;h=Yd(n^(m|l)|0,k^j|0,63)|0;g=D;j=Wd(n^(m|l)|0,k^j|0,1)|0;c[f+1024+((b|4)<<3)>>2]=j|h;c[f+1024+((b|4)<<3)+4>>2]=D|g;a=a+1|0}while((a|0)!=8);a=0;do{z=a<<1;k=c[f+1024+(z<<3)>>2]|0;w=c[f+1024+(z<<3)+4>>2]|0;o=f+1024+(z+32<<3)|0;r=c[o>>2]|0;o=c[o+4>>2]|0;l=we(r|0,o|0,k|0,w|0)|0;h=D;w=Wd(k|0,w|0,1)|0;w=Kd(w&-2|0,D&1|0,r|0,0)|0;w=we(l|0,h|0,w|0,D|0)|0;h=D;l=f+1024+(z+96<<3)|0;k=w^c[l>>2];l=h^c[l+4>>2];n=f+1024+(z+64<<3)|0;p=c[n>>2]|0;n=c[n+4>>2]|0;x=we(l|0,k|0,p|0,n|0)|0;t=D;n=Wd(p|0,n|0,1)|0;n=Kd(n&-2|0,D&1|0,l|0,0)|0;n=we(x|0,t|0,n|0,D|0)|0;t=D;x=Yd(n^r|0,t^o|0,24)|0;p=D;o=Wd(n^r|0,t^o|0,40)|0;p=D|p;r=we(o|x|0,p|0,w|0,h|0)|0;u=D;h=Wd(w|0,h|0,1)|0;h=Kd(x|0,0,h&-2|0,D&1|0)|0;h=we(r|0,u|0,h|0,D|0)|0;u=D;c[f+1024+(z<<3)>>2]=h;c[f+1024+(z<<3)+4>>2]=u;r=Yd(h^l|0,u^k|0,16)|0;w=D;k=Wd(h^l|0,u^k|0,48)|0;w=D|w;u=f+1024+(z+96<<3)|0;c[u>>2]=k|r;c[u+4>>2]=w;w=we(k|r|0,w|0,n|0,t|0)|0;k=D;t=Wd(n|0,t|0,1)|0;t=Kd(r|0,0,t&-2|0,D&1|0)|0;t=we(w|0,k|0,t|0,D|0)|0;k=D;w=f+1024+(z+64<<3)|0;c[w>>2]=t;c[w+4>>2]=k;w=Yd(t^(o|x)|0,k^p|0,63)|0;r=D;p=Wd(t^(o|x)|0,k^p|0,1)|0;k=f+1024+(z+32<<3)|0;c[k>>2]=p|w;c[k+4>>2]=D|r;k=c[f+1024+((z|1)<<3)>>2]|0;r=c[f+1024+((z|1)<<3)+4>>2]|0;w=f+1024+(z+33<<3)|0;p=c[w>>2]|0;w=c[w+4>>2]|0;x=we(p|0,w|0,k|0,r|0)|0;o=D;r=Wd(k|0,r|0,1)|0;r=Kd(r&-2|0,D&1|0,p|0,0)|0;r=we(x|0,o|0,r|0,D|0)|0;o=D;x=f+1024+(z+97<<3)|0;k=r^c[x>>2];x=o^c[x+4>>2];t=f+1024+(z+65<<3)|0;n=c[t>>2]|0;t=c[t+4>>2]|0;u=we(x|0,k|0,n|0,t|0)|0;l=D;t=Wd(n|0,t|0,1)|0;t=Kd(t&-2|0,D&1|0,x|0,0)|0;t=we(u|0,l|0,t|0,D|0)|0;l=D;u=Yd(t^p|0,l^w|0,24)|0;n=D;w=Wd(t^p|0,l^w|0,40)|0;n=D|n;p=we(w|u|0,n|0,r|0,o|0)|0;h=D;o=Wd(r|0,o|0,1)|0;o=Kd(u|0,0,o&-2|0,D&1|0)|0;o=we(p|0,h|0,o|0,D|0)|0;h=D;c[f+1024+((z|1)<<3)>>2]=o;c[f+1024+((z|1)<<3)+4>>2]=h;p=Yd(o^x|0,h^k|0,16)|0;r=D;k=Wd(o^x|0,h^k|0,48)|0;r=D|r;h=f+1024+(z+97<<3)|0;c[h>>2]=k|p;c[h+4>>2]=r;r=we(k|p|0,r|0,t|0,l|0)|0;k=D;l=Wd(t|0,l|0,1)|0;l=Kd(p|0,0,l&-2|0,D&1|0)|0;l=we(r|0,k|0,l|0,D|0)|0;k=D;r=f+1024+(z+65<<3)|0;c[r>>2]=l;c[r+4>>2]=k;r=Yd(l^(w|u)|0,k^n|0,63)|0;p=D;n=Wd(l^(w|u)|0,k^n|0,1)|0;k=f+1024+(z+33<<3)|0;c[k>>2]=n|r;c[k+4>>2]=D|p;k=f+1024+(z+16<<3)|0;p=c[k>>2]|0;k=c[k+4>>2]|0;r=f+1024+(z+48<<3)|0;n=c[r>>2]|0;r=c[r+4>>2]|0;u=we(n|0,r|0,p|0,k|0)|0;w=D;k=Wd(p|0,k|0,1)|0;k=Kd(k&-2|0,D&1|0,n|0,0)|0;k=we(u|0,w|0,k|0,D|0)|0;w=D;u=f+1024+(z+112<<3)|0;p=k^c[u>>2];u=w^c[u+4>>2];l=f+1024+(z+80<<3)|0;t=c[l>>2]|0;l=c[l+4>>2]|0;h=we(u|0,p|0,t|0,l|0)|0;x=D;l=Wd(t|0,l|0,1)|0;l=Kd(l&-2|0,D&1|0,u|0,0)|0;l=we(h|0,x|0,l|0,D|0)|0;x=D;h=Yd(l^n|0,x^r|0,24)|0;t=D;r=Wd(l^n|0,x^r|0,40)|0;t=D|t;n=we(r|h|0,t|0,k|0,w|0)|0;o=D;w=Wd(k|0,w|0,1)|0;w=Kd(h|0,0,w&-2|0,D&1|0)|0;w=we(n|0,o|0,w|0,D|0)|0;o=D;n=f+1024+(z+16<<3)|0;c[n>>2]=w;c[n+4>>2]=o;n=Yd(w^u|0,o^p|0,16)|0;k=D;p=Wd(w^u|0,o^p|0,48)|0;k=D|k;o=f+1024+(z+112<<3)|0;c[o>>2]=p|n;c[o+4>>2]=k;k=we(p|n|0,k|0,l|0,x|0)|0;p=D;x=Wd(l|0,x|0,1)|0;x=Kd(n|0,0,x&-2|0,D&1|0)|0;x=we(k|0,p|0,x|0,D|0)|0;p=D;k=Yd(x^(r|h)|0,p^t|0,63)|0;n=D;t=Wd(x^(r|h)|0,p^t|0,1)|0;h=f+1024+(z+48<<3)|0;c[h>>2]=t|k;c[h+4>>2]=D|n;h=f+1024+(z+17<<3)|0;n=c[h>>2]|0;h=c[h+4>>2]|0;k=f+1024+(z+49<<3)|0;t=c[k>>2]|0;k=c[k+4>>2]|0;r=we(t|0,k|0,n|0,h|0)|0;l=D;h=Wd(n|0,h|0,1)|0;h=Kd(h&-2|0,D&1|0,t|0,0)|0;h=we(r|0,l|0,h|0,D|0)|0;l=D;r=f+1024+(z+113<<3)|0;n=h^c[r>>2];r=l^c[r+4>>2];o=f+1024+(z+81<<3)|0;u=c[o>>2]|0;o=c[o+4>>2]|0;w=we(r|0,n|0,u|0,o|0)|0;q=D;o=Wd(u|0,o|0,1)|0;o=Kd(o&-2|0,D&1|0,r|0,0)|0;o=we(w|0,q|0,o|0,D|0)|0;q=D;w=Yd(o^t|0,q^k|0,24)|0;u=D;k=Wd(o^t|0,q^k|0,40)|0;u=D|u;t=we(k|w|0,u|0,h|0,l|0)|0;v=D;l=Wd(h|0,l|0,1)|0;l=Kd(w|0,0,l&-2|0,D&1|0)|0;l=we(t|0,v|0,l|0,D|0)|0;v=D;t=f+1024+(z+17<<3)|0;c[t>>2]=l;c[t+4>>2]=v;t=Yd(l^r|0,v^n|0,16)|0;h=D;n=Wd(l^r|0,v^n|0,48)|0;h=D|h;v=we(n|t|0,h|0,o|0,q|0)|0;r=D;q=Wd(o|0,q|0,1)|0;q=Kd(t|0,0,q&-2|0,D&1|0)|0;q=we(v|0,r|0,q|0,D|0)|0;r=D;v=Yd(q^(k|w)|0,r^u|0,63)|0;o=D;u=Wd(q^(k|w)|0,r^u|0,1)|0;o=D|o;w=f+1024+(z+49<<3)|0;c[w>>2]=u|v;c[w+4>>2]=o;w=c[f+1024+(z<<3)>>2]|0;k=c[f+1024+(z<<3)+4>>2]|0;l=f+1024+(z+33<<3)|0;s=c[l>>2]|0;l=c[l+4>>2]|0;m=we(s|0,l|0,w|0,k|0)|0;g=D;k=Wd(w|0,k|0,1)|0;k=Kd(k&-2|0,D&1|0,s|0,0)|0;k=we(m|0,g|0,k|0,D|0)|0;g=D;m=we(g^h|0,k^(n|t)|0,x|0,p|0)|0;w=D;p=Wd(x|0,p|0,1)|0;p=Kd(p&-2|0,D&1|0,g^h|0,0)|0;p=we(m|0,w|0,p|0,D|0)|0;w=D;m=Yd(p^s|0,w^l|0,24)|0;x=D;l=Wd(p^s|0,w^l|0,40)|0;x=D|x;s=we(l|m|0,x|0,k|0,g|0)|0;j=D;b=Wd(k|0,g|0,1)|0;b=Kd(m|0,0,b&-2|0,D&1|0)|0;b=we(s|0,j|0,b|0,D|0)|0;j=D;c[f+1024+(z<<3)>>2]=b;c[f+1024+(z<<3)+4>>2]=j;s=Yd(b^(g^h)|0,j^(k^(n|t))|0,16)|0;y=D;t=Wd(b^(g^h)|0,j^(k^(n|t))|0,48)|0;y=D|y;n=f+1024+(z+113<<3)|0;c[n>>2]=t|s;c[n+4>>2]=y;y=we(t|s|0,y|0,p|0,w|0)|0;t=D;w=Wd(p|0,w|0,1)|0;w=Kd(s|0,0,w&-2|0,D&1|0)|0;w=we(y|0,t|0,w|0,D|0)|0;t=D;y=f+1024+(z+80<<3)|0;c[y>>2]=w;c[y+4>>2]=t;y=Yd(w^(l|m)|0,t^x|0,63)|0;s=D;x=Wd(w^(l|m)|0,t^x|0,1)|0;t=f+1024+(z+33<<3)|0;c[t>>2]=x|y;c[t+4>>2]=D|s;t=c[f+1024+((z|1)<<3)>>2]|0;s=c[f+1024+((z|1)<<3)+4>>2]|0;y=f+1024+(z+48<<3)|0;x=c[y>>2]|0;y=c[y+4>>2]|0;m=we(x|0,y|0,t|0,s|0)|0;l=D;s=Wd(t|0,s|0,1)|0;s=Kd(s&-2|0,D&1|0,x|0,0)|0;s=we(m|0,l|0,s|0,D|0)|0;l=D;m=f+1024+(z+96<<3)|0;t=s^c[m>>2];m=l^c[m+4>>2];w=we(m|0,t|0,q|0,r|0)|0;p=D;r=Wd(q|0,r|0,1)|0;r=Kd(r&-2|0,D&1|0,m|0,0)|0;r=we(w|0,p|0,r|0,D|0)|0;p=D;w=Yd(r^x|0,p^y|0,24)|0;q=D;y=Wd(r^x|0,p^y|0,40)|0;q=D|q;x=we(y|w|0,q|0,s|0,l|0)|0;n=D;l=Wd(s|0,l|0,1)|0;l=Kd(w|0,0,l&-2|0,D&1|0)|0;l=we(x|0,n|0,l|0,D|0)|0;n=D;c[f+1024+((z|1)<<3)>>2]=l;c[f+1024+((z|1)<<3)+4>>2]=n;x=Yd(l^m|0,n^t|0,16)|0;s=D;t=Wd(l^m|0,n^t|0,48)|0;s=D|s;n=f+1024+(z+96<<3)|0;c[n>>2]=t|x;c[n+4>>2]=s;s=we(t|x|0,s|0,r|0,p|0)|0;t=D;p=Wd(r|0,p|0,1)|0;p=Kd(x|0,0,p&-2|0,D&1|0)|0;p=we(s|0,t|0,p|0,D|0)|0;t=D;s=f+1024+(z+81<<3)|0;c[s>>2]=p;c[s+4>>2]=t;s=Yd(p^(y|w)|0,t^q|0,63)|0;x=D;q=Wd(p^(y|w)|0,t^q|0,1)|0;t=f+1024+(z+48<<3)|0;c[t>>2]=q|s;c[t+4>>2]=D|x;t=f+1024+(z+16<<3)|0;x=c[t>>2]|0;t=c[t+4>>2]|0;s=we(u|v|0,o|0,x|0,t|0)|0;q=D;t=Wd(x|0,t|0,1)|0;t=Kd(t&-2|0,D&1|0,u|v|0,0)|0;t=we(s|0,q|0,t|0,D|0)|0;q=D;s=f+1024+(z+97<<3)|0;x=t^c[s>>2];s=q^c[s+4>>2];w=f+1024+(z+64<<3)|0;y=c[w>>2]|0;w=c[w+4>>2]|0;p=we(s|0,x|0,y|0,w|0)|0;r=D;w=Wd(y|0,w|0,1)|0;w=Kd(w&-2|0,D&1|0,s|0,0)|0;w=we(p|0,r|0,w|0,D|0)|0;r=D;p=Yd(w^(u|v)|0,r^o|0,24)|0;y=D;o=Wd(w^(u|v)|0,r^o|0,40)|0;y=D|y;v=we(o|p|0,y|0,t|0,q|0)|0;u=D;q=Wd(t|0,q|0,1)|0;q=Kd(p|0,0,q&-2|0,D&1|0)|0;q=we(v|0,u|0,q|0,D|0)|0;u=D;v=f+1024+(z+16<<3)|0;c[v>>2]=q;c[v+4>>2]=u;v=Yd(q^s|0,u^x|0,16)|0;t=D;x=Wd(q^s|0,u^x|0,48)|0;t=D|t;u=f+1024+(z+97<<3)|0;c[u>>2]=x|v;c[u+4>>2]=t;t=we(x|v|0,t|0,w|0,r|0)|0;x=D;r=Wd(w|0,r|0,1)|0;r=Kd(v|0,0,r&-2|0,D&1|0)|0;r=we(t|0,x|0,r|0,D|0)|0;x=D;t=f+1024+(z+64<<3)|0;c[t>>2]=r;c[t+4>>2]=x;t=Yd(r^(o|p)|0,x^y|0,63)|0;v=D;y=Wd(r^(o|p)|0,x^y|0,1)|0;x=f+1024+(z+49<<3)|0;c[x>>2]=y|t;c[x+4>>2]=D|v;x=f+1024+(z+17<<3)|0;v=c[x>>2]|0;x=c[x+4>>2]|0;t=f+1024+(z+32<<3)|0;y=c[t>>2]|0;t=c[t+4>>2]|0;p=we(y|0,t|0,v|0,x|0)|0;o=D;x=Wd(v|0,x|0,1)|0;x=Kd(x&-2|0,D&1|0,y|0,0)|0;x=we(p|0,o|0,x|0,D|0)|0;o=D;p=f+1024+(z+112<<3)|0;v=x^c[p>>2];p=o^c[p+4>>2];r=f+1024+(z+65<<3)|0;w=c[r>>2]|0;r=c[r+4>>2]|0;u=we(p|0,v|0,w|0,r|0)|0;s=D;r=Wd(w|0,r|0,1)|0;r=Kd(r&-2|0,D&1|0,p|0,0)|0;r=we(u|0,s|0,r|0,D|0)|0;s=D;u=Yd(r^y|0,s^t|0,24)|0;w=D;t=Wd(r^y|0,s^t|0,40)|0;w=D|w;y=we(t|u|0,w|0,x|0,o|0)|0;q=D;o=Wd(x|0,o|0,1)|0;o=Kd(u|0,0,o&-2|0,D&1|0)|0;o=we(y|0,q|0,o|0,D|0)|0;q=D;y=f+1024+(z+17<<3)|0;c[y>>2]=o;c[y+4>>2]=q;y=Yd(o^p|0,q^v|0,16)|0;x=D;v=Wd(o^p|0,q^v|0,48)|0;x=D|x;q=f+1024+(z+112<<3)|0;c[q>>2]=v|y;c[q+4>>2]=x;x=we(v|y|0,x|0,r|0,s|0)|0;v=D;s=Wd(r|0,s|0,1)|0;s=Kd(y|0,0,s&-2|0,D&1|0)|0;s=we(x|0,v|0,s|0,D|0)|0;v=D;x=f+1024+(z+65<<3)|0;c[x>>2]=s;c[x+4>>2]=v;x=Yd(s^(t|u)|0,v^w|0,63)|0;y=D;w=Wd(s^(t|u)|0,v^w|0,1)|0;z=f+1024+(z+32<<3)|0;c[z>>2]=w|x;c[z+4>>2]=D|y;a=a+1|0}while((a|0)!=8);pf(d,f);md(d,f+1024|0);i=e;return}function ma(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0;I=i;s=i=i+63&-64;i=i+16|0;do if(a>>>0<245){r=a>>>0<11?16:a+11&-8;q=c[8719]|0;if(q>>>(r>>>3)&3|0){b=34916+((q>>>(r>>>3)&1^1)+(r>>>3)<<1<<2)|0;a=c[b+8>>2]|0;d=c[a+8>>2]|0;do if((b|0)!=(d|0)){if(d>>>0<(c[8723]|0)>>>0)ba();if((c[d+12>>2]|0)==(a|0)){c[d+12>>2]=b;c[b+8>>2]=d;break}else ba()}else c[8719]=q&~(1<<(q>>>(r>>>3)&1^1)+(r>>>3));while(0);H=(q>>>(r>>>3)&1^1)+(r>>>3)<<3;c[a+4>>2]=H|3;c[a+H+4>>2]=c[a+H+4>>2]|1;H=a+8|0;i=I;return H|0}p=c[8721]|0;if(r>>>0>p>>>0){if(q>>>(r>>>3)|0){b=q>>>(r>>>3)<<(r>>>3)&(2<<(r>>>3)|0-(2<<(r>>>3)));e=((b&0-b)+-1|0)>>>(((b&0-b)+-1|0)>>>12&16);d=e>>>(e>>>5&8)>>>(e>>>(e>>>5&8)>>>2&4);d=(e>>>5&8|((b&0-b)+-1|0)>>>12&16|e>>>(e>>>5&8)>>>2&4|d>>>1&2|d>>>(d>>>1&2)>>>1&1)+(d>>>(d>>>1&2)>>>(d>>>(d>>>1&2)>>>1&1))|0;e=c[34916+(d<<1<<2)+8>>2]|0;b=c[e+8>>2]|0;do if((34916+(d<<1<<2)|0)!=(b|0)){if(b>>>0<(c[8723]|0)>>>0)ba();if((c[b+12>>2]|0)==(e|0)){c[b+12>>2]=34916+(d<<1<<2);c[34916+(d<<1<<2)+8>>2]=b;f=q;break}else ba()}else{c[8719]=q&~(1<<d);f=q&~(1<<d)}while(0);c[e+4>>2]=r|3;c[e+r+4>>2]=(d<<3)-r|1;c[e+r+((d<<3)-r)>>2]=(d<<3)-r;if(p|0){a=c[8724]|0;if(f&1<<(p>>>3)){b=c[34916+(p>>>3<<1<<2)+8>>2]|0;if(b>>>0<(c[8723]|0)>>>0)ba();else{h=b;j=34916+(p>>>3<<1<<2)+8|0}}else{c[8719]=f|1<<(p>>>3);h=34916+(p>>>3<<1<<2)|0;j=34916+(p>>>3<<1<<2)+8|0}c[j>>2]=a;c[h+12>>2]=a;c[a+8>>2]=h;c[a+12>>2]=34916+(p>>>3<<1<<2)}c[8721]=(d<<3)-r;c[8724]=e+r;H=e+8|0;i=I;return H|0}l=c[8720]|0;if(l){a=((l&0-l)+-1|0)>>>(((l&0-l)+-1|0)>>>12&16);k=a>>>(a>>>5&8)>>>(a>>>(a>>>5&8)>>>2&4);k=c[35180+((a>>>5&8|((l&0-l)+-1|0)>>>12&16|a>>>(a>>>5&8)>>>2&4|k>>>1&2|k>>>(k>>>1&2)>>>1&1)+(k>>>(k>>>1&2)>>>(k>>>(k>>>1&2)>>>1&1))<<2)>>2]|0;a=k;j=k;k=(c[k+4>>2]&-8)-r|0;while(1){b=c[a+16>>2]|0;if(!b){b=c[a+20>>2]|0;if(!b)break}H=(c[b+4>>2]&-8)-r|0;G=H>>>0<k>>>0;a=b;j=G?b:j;k=G?H:k}f=c[8723]|0;if(j>>>0<f>>>0)ba();h=j+r|0;if(j>>>0>=h>>>0)ba();g=c[j+24>>2]|0;b=c[j+12>>2]|0;do if((b|0)==(j|0)){a=j+20|0;b=c[a>>2]|0;if(!b){a=j+16|0;b=c[a>>2]|0;if(!b){m=0;break}}while(1){d=b+20|0;e=c[d>>2]|0;if(e|0){b=e;a=d;continue}d=b+16|0;e=c[d>>2]|0;if(!e)break;else{b=e;a=d}}if(a>>>0<f>>>0)ba();else{c[a>>2]=0;m=b;break}}else{a=c[j+8>>2]|0;if(a>>>0<f>>>0)ba();if((c[a+12>>2]|0)!=(j|0))ba();if((c[b+8>>2]|0)==(j|0)){c[a+12>>2]=b;c[b+8>>2]=a;m=b;break}else ba()}while(0);do if(g|0){b=c[j+28>>2]|0;if((j|0)==(c[35180+(b<<2)>>2]|0)){c[35180+(b<<2)>>2]=m;if(!m){c[8720]=l&~(1<<b);break}}else{if(g>>>0<(c[8723]|0)>>>0)ba();if((c[g+16>>2]|0)==(j|0))c[g+16>>2]=m;else c[g+20>>2]=m;if(!m)break}a=c[8723]|0;if(m>>>0<a>>>0)ba();c[m+24>>2]=g;b=c[j+16>>2]|0;do if(b|0)if(b>>>0<a>>>0)ba();else{c[m+16>>2]=b;c[b+24>>2]=m;break}while(0);b=c[j+20>>2]|0;if(b|0)if(b>>>0<(c[8723]|0)>>>0)ba();else{c[m+20>>2]=b;c[b+24>>2]=m;break}}while(0);if(k>>>0<16){H=k+r|0;c[j+4>>2]=H|3;H=j+H+4|0;c[H>>2]=c[H>>2]|1}else{c[j+4>>2]=r|3;c[h+4>>2]=k|1;c[h+k>>2]=k;if(p|0){a=c[8724]|0;if(q&1<<(p>>>3)){b=c[34916+(p>>>3<<1<<2)+8>>2]|0;if(b>>>0<(c[8723]|0)>>>0)ba();else{n=b;o=34916+(p>>>3<<1<<2)+8|0}}else{c[8719]=q|1<<(p>>>3);n=34916+(p>>>3<<1<<2)|0;o=34916+(p>>>3<<1<<2)+8|0}c[o>>2]=a;c[n+12>>2]=a;c[a+8>>2]=n;c[a+12>>2]=34916+(p>>>3<<1<<2)}c[8721]=k;c[8724]=h}H=j+8|0;i=I;return H|0}}}else if(a>>>0<=4294967231){r=a+11&-8;l=c[8720]|0;if(l){if((a+11|0)>>>8)if(r>>>0>16777215)k=31;else{k=(a+11|0)>>>8<<((((a+11|0)>>>8)+1048320|0)>>>16&8);k=14-((k+520192|0)>>>16&4|(((a+11|0)>>>8)+1048320|0)>>>16&8|((k<<((k+520192|0)>>>16&4))+245760|0)>>>16&2)+(k<<((k+520192|0)>>>16&4)<<(((k<<((k+520192|0)>>>16&4))+245760|0)>>>16&2)>>>15)|0;k=r>>>(k+7|0)&1|k<<1}else k=0;a=c[35180+(k<<2)>>2]|0;a:do if(!a){a=0;e=0;d=0-r|0;A=86}else{e=0;d=0-r|0;j=r<<((k|0)==31?0:25-(k>>>1)|0);h=0;while(1){f=(c[a+4>>2]&-8)-r|0;if(f>>>0<d>>>0)if(!f){h=a;d=0;e=a;A=90;break a}else{e=a;d=f}f=c[a+20>>2]|0;a=c[a+16+(j>>>31<<2)>>2]|0;h=(f|0)==0|(f|0)==(a|0)?h:f;f=(a|0)==0;if(f){a=h;A=86;break}else j=j<<(f&1^1)}}while(0);if((A|0)==86){if((a|0)==0&(e|0)==0){a=2<<k;if(!(l&(a|0-a)))break;n=(l&(a|0-a)&0-(l&(a|0-a)))+-1|0;o=n>>>(n>>>12&16)>>>(n>>>(n>>>12&16)>>>5&8);a=o>>>(o>>>2&4)>>>(o>>>(o>>>2&4)>>>1&2);a=c[35180+((n>>>(n>>>12&16)>>>5&8|n>>>12&16|o>>>2&4|o>>>(o>>>2&4)>>>1&2|a>>>1&1)+(a>>>(a>>>1&1))<<2)>>2]|0}if(!a){k=e;j=d}else{h=e;e=a;A=90}}if((A|0)==90)while(1){A=0;f=(c[e+4>>2]&-8)-r|0;a=f>>>0<d>>>0;d=a?f:d;a=a?e:h;f=c[e+16>>2]|0;if(f|0){h=a;e=f;A=90;continue}e=c[e+20>>2]|0;if(!e){k=a;j=d;break}else{h=a;A=90}}if((k|0)!=0?j>>>0<((c[8721]|0)-r|0)>>>0:0){f=c[8723]|0;if(k>>>0<f>>>0)ba();h=k+r|0;if(k>>>0>=h>>>0)ba();g=c[k+24>>2]|0;b=c[k+12>>2]|0;do if((b|0)==(k|0)){a=k+20|0;b=c[a>>2]|0;if(!b){a=k+16|0;b=c[a>>2]|0;if(!b){p=0;break}}while(1){d=b+20|0;e=c[d>>2]|0;if(e|0){b=e;a=d;continue}d=b+16|0;e=c[d>>2]|0;if(!e)break;else{b=e;a=d}}if(a>>>0<f>>>0)ba();else{c[a>>2]=0;p=b;break}}else{a=c[k+8>>2]|0;if(a>>>0<f>>>0)ba();if((c[a+12>>2]|0)!=(k|0))ba();if((c[b+8>>2]|0)==(k|0)){c[a+12>>2]=b;c[b+8>>2]=a;p=b;break}else ba()}while(0);do if(g){b=c[k+28>>2]|0;if((k|0)==(c[35180+(b<<2)>>2]|0)){c[35180+(b<<2)>>2]=p;if(!p){c[8720]=l&~(1<<b);y=l&~(1<<b);break}}else{if(g>>>0<(c[8723]|0)>>>0)ba();if((c[g+16>>2]|0)==(k|0))c[g+16>>2]=p;else c[g+20>>2]=p;if(!p){y=l;break}}a=c[8723]|0;if(p>>>0<a>>>0)ba();c[p+24>>2]=g;b=c[k+16>>2]|0;do if(b|0)if(b>>>0<a>>>0)ba();else{c[p+16>>2]=b;c[b+24>>2]=p;break}while(0);b=c[k+20>>2]|0;if(b)if(b>>>0<(c[8723]|0)>>>0)ba();else{c[p+20>>2]=b;c[b+24>>2]=p;y=l;break}else y=l}else y=l;while(0);do if(j>>>0>=16){c[k+4>>2]=r|3;c[h+4>>2]=j|1;c[h+j>>2]=j;a=j>>>3;if(j>>>0<256){b=c[8719]|0;if(b&1<<a){b=c[34916+(a<<1<<2)+8>>2]|0;if(b>>>0<(c[8723]|0)>>>0)ba();else{q=b;v=34916+(a<<1<<2)+8|0}}else{c[8719]=b|1<<a;q=34916+(a<<1<<2)|0;v=34916+(a<<1<<2)+8|0}c[v>>2]=h;c[q+12>>2]=h;c[h+8>>2]=q;c[h+12>>2]=34916+(a<<1<<2);break}b=j>>>8;if(b)if(j>>>0>16777215)b=31;else{H=b<<((b+1048320|0)>>>16&8)<<(((b<<((b+1048320|0)>>>16&8))+520192|0)>>>16&4);b=14-(((b<<((b+1048320|0)>>>16&8))+520192|0)>>>16&4|(b+1048320|0)>>>16&8|(H+245760|0)>>>16&2)+(H<<((H+245760|0)>>>16&2)>>>15)|0;b=j>>>(b+7|0)&1|b<<1}else b=0;d=35180+(b<<2)|0;c[h+28>>2]=b;c[h+16+4>>2]=0;c[h+16>>2]=0;a=1<<b;if(!(y&a)){c[8720]=y|a;c[d>>2]=h;c[h+24>>2]=d;c[h+12>>2]=h;c[h+8>>2]=h;break}a=j<<((b|0)==31?0:25-(b>>>1)|0);e=c[d>>2]|0;while(1){if((c[e+4>>2]&-8|0)==(j|0)){A=148;break}d=e+16+(a>>>31<<2)|0;b=c[d>>2]|0;if(!b){A=145;break}else{a=a<<1;e=b}}if((A|0)==145)if(d>>>0<(c[8723]|0)>>>0)ba();else{c[d>>2]=h;c[h+24>>2]=e;c[h+12>>2]=h;c[h+8>>2]=h;break}else if((A|0)==148){b=e+8|0;a=c[b>>2]|0;H=c[8723]|0;if(a>>>0>=H>>>0&e>>>0>=H>>>0){c[a+12>>2]=h;c[b>>2]=h;c[h+8>>2]=a;c[h+12>>2]=e;c[h+24>>2]=0;break}else ba()}}else{H=j+r|0;c[k+4>>2]=H|3;H=k+H+4|0;c[H>>2]=c[H>>2]|1}while(0);H=k+8|0;i=I;return H|0}}}else r=-1;while(0);d=c[8721]|0;if(d>>>0>=r>>>0){b=d-r|0;a=c[8724]|0;if(b>>>0>15){H=a+r|0;c[8724]=H;c[8721]=b;c[H+4>>2]=b|1;c[H+b>>2]=b;c[a+4>>2]=r|3}else{c[8721]=0;c[8724]=0;c[a+4>>2]=d|3;c[a+d+4>>2]=c[a+d+4>>2]|1}H=a+8|0;i=I;return H|0}f=c[8722]|0;if(f>>>0>r>>>0){F=f-r|0;c[8722]=F;H=c[8725]|0;G=H+r|0;c[8725]=G;c[G+4>>2]=F|1;c[H+4>>2]=r|3;H=H+8|0;i=I;return H|0}if(!(c[8837]|0)){c[8839]=4096;c[8838]=4096;c[8840]=-1;c[8841]=-1;c[8842]=0;c[8830]=0;c[s>>2]=s&-16^1431655768;c[8837]=s&-16^1431655768;a=4096}else a=c[8839]|0;h=r+48|0;j=r+47|0;l=a+j|0;k=0-a|0;if((l&k)>>>0<=r>>>0){H=0;i=I;return H|0}a=c[8829]|0;if(a|0?(y=c[8827]|0,(y+(l&k)|0)>>>0<=y>>>0?1:(y+(l&k)|0)>>>0>a>>>0):0){H=0;i=I;return H|0}b:do if(!(c[8830]&4)){e=c[8725]|0;c:do if(e){d=35324;while(1){a=c[d>>2]|0;if(a>>>0<=e>>>0?(t=d+4|0,(a+(c[t>>2]|0)|0)>>>0>e>>>0):0)break;a=c[d+8>>2]|0;if(!a){A=172;break c}else d=a}if((l-f&k)>>>0<2147483647){a=Vc(l-f&k|0)|0;if((a|0)==((c[d>>2]|0)+(c[t>>2]|0)|0)){if((a|0)!=(-1|0)){h=l-f&k;g=a;A=190;break b}}else{b=l-f&k;A=180}}}else A=172;while(0);do if(((A|0)==172?(g=Vc(0)|0,(g|0)!=(-1|0)):0)?(b=c[8838]|0,b=((b+-1&g|0)==0?0:(b+-1+g&0-b)-g|0)+(l&k)|0,u=c[8827]|0,b>>>0>r>>>0&b>>>0<2147483647):0){y=c[8829]|0;if(y|0?(b+u|0)>>>0<=u>>>0|(b+u|0)>>>0>y>>>0:0)break;a=Vc(b|0)|0;if((a|0)==(g|0)){h=b;A=190;break b}else A=180}while(0);d:do if((A|0)==180){d=0-b|0;do if(h>>>0>b>>>0&(b>>>0<2147483647&(a|0)!=(-1|0))?(w=c[8839]|0,w=j-b+w&0-w,w>>>0<2147483647):0)if((Vc(w|0)|0)==(-1|0)){Vc(d|0)|0;break d}else{b=w+b|0;break}while(0);if((a|0)!=(-1|0)){h=b;g=a;A=190;break b}}while(0);c[8830]=c[8830]|4;A=187}else A=187;while(0);if((((A|0)==187?(l&k)>>>0<2147483647:0)?(z=Vc(l&k|0)|0,x=Vc(0)|0,z>>>0<x>>>0&((z|0)!=(-1|0)&(x|0)!=(-1|0))):0)?(x-z|0)>>>0>(r+40|0)>>>0:0){h=x-z|0;g=z;A=190}if((A|0)==190){b=(c[8827]|0)+h|0;c[8827]=b;if(b>>>0>(c[8828]|0)>>>0)c[8828]=b;j=c[8725]|0;do if(j){b=35324;while(1){a=c[b>>2]|0;d=b+4|0;e=c[d>>2]|0;if((g|0)==(a+e|0)){A=200;break}f=c[b+8>>2]|0;if(!f)break;else b=f}if(((A|0)==200?(c[b+12>>2]&8|0)==0:0)?j>>>0<g>>>0&j>>>0>=a>>>0:0){c[d>>2]=e+h;G=(j+8&7|0)==0?0:0-(j+8)&7;H=h-G+(c[8722]|0)|0;c[8725]=j+G;c[8722]=H;c[j+G+4>>2]=H|1;c[j+G+H+4>>2]=40;c[8726]=c[8841];break}b=c[8723]|0;if(g>>>0<b>>>0){c[8723]=g;k=g}else k=b;a=g+h|0;b=35324;while(1){if((c[b>>2]|0)==(a|0)){A=208;break}b=c[b+8>>2]|0;if(!b){a=35324;break}}if((A|0)==208)if(!(c[b+12>>2]&8)){c[b>>2]=g;m=b+4|0;c[m>>2]=(c[m>>2]|0)+h;m=g+8|0;m=g+((m&7|0)==0?0:0-m&7)|0;b=a+((a+8&7|0)==0?0:0-(a+8)&7)|0;l=m+r|0;f=b-m-r|0;c[m+4>>2]=r|3;do if((b|0)!=(j|0)){if((b|0)==(c[8724]|0)){H=(c[8721]|0)+f|0;c[8721]=H;c[8724]=l;c[l+4>>2]=H|1;c[l+H>>2]=H;break}j=c[b+4>>2]|0;if((j&3|0)==1){e:do if(j>>>0>=256){h=c[b+24>>2]|0;a=c[b+12>>2]|0;do if((a|0)==(b|0)){a=c[b+16+4>>2]|0;if(!a){a=c[b+16>>2]|0;if(!a){F=0;break}else g=b+16|0}else g=b+16+4|0;while(1){d=a+20|0;e=c[d>>2]|0;if(e|0){a=e;g=d;continue}d=a+16|0;e=c[d>>2]|0;if(!e)break;else{a=e;g=d}}if(g>>>0<k>>>0)ba();else{c[g>>2]=0;F=a;break}}else{d=c[b+8>>2]|0;if(d>>>0<k>>>0)ba();if((c[d+12>>2]|0)!=(b|0))ba();if((c[a+8>>2]|0)==(b|0)){c[d+12>>2]=a;c[a+8>>2]=d;F=a;break}else ba()}while(0);if(!h)break;a=c[b+28>>2]|0;do if((b|0)!=(c[35180+(a<<2)>>2]|0)){if(h>>>0<(c[8723]|0)>>>0)ba();if((c[h+16>>2]|0)==(b|0))c[h+16>>2]=F;else c[h+20>>2]=F;if(!F)break e}else{c[35180+(a<<2)>>2]=F;if(F|0)break;c[8720]=c[8720]&~(1<<a);break e}while(0);d=c[8723]|0;if(F>>>0<d>>>0)ba();c[F+24>>2]=h;a=c[b+16>>2]|0;do if(a|0)if(a>>>0<d>>>0)ba();else{c[F+16>>2]=a;c[a+24>>2]=F;break}while(0);a=c[b+16+4>>2]|0;if(!a)break;if(a>>>0<(c[8723]|0)>>>0)ba();else{c[F+20>>2]=a;c[a+24>>2]=F;break}}else{a=c[b+8>>2]|0;d=c[b+12>>2]|0;do if((a|0)!=(34916+(j>>>3<<1<<2)|0)){if(a>>>0<k>>>0)ba();if((c[a+12>>2]|0)==(b|0))break;ba()}while(0);if((d|0)==(a|0)){c[8719]=c[8719]&~(1<<(j>>>3));break}do if((d|0)==(34916+(j>>>3<<1<<2)|0))E=d+8|0;else{if(d>>>0<k>>>0)ba();if((c[d+8>>2]|0)==(b|0)){E=d+8|0;break}ba()}while(0);c[a+12>>2]=d;c[E>>2]=a}while(0);b=b+(j&-8)|0;f=(j&-8)+f|0}a=b+4|0;c[a>>2]=c[a>>2]&-2;c[l+4>>2]=f|1;c[l+f>>2]=f;a=f>>>3;if(f>>>0<256){b=c[8719]|0;do if(!(b&1<<a)){c[8719]=b|1<<a;G=34916+(a<<1<<2)|0;H=34916+(a<<1<<2)+8|0}else{b=c[34916+(a<<1<<2)+8>>2]|0;if(b>>>0>=(c[8723]|0)>>>0){G=b;H=34916+(a<<1<<2)+8|0;break}ba()}while(0);c[H>>2]=l;c[G+12>>2]=l;c[l+8>>2]=G;c[l+12>>2]=34916+(a<<1<<2);break}b=f>>>8;do if(!b)b=0;else{if(f>>>0>16777215){b=31;break}H=b<<((b+1048320|0)>>>16&8)<<(((b<<((b+1048320|0)>>>16&8))+520192|0)>>>16&4);b=14-(((b<<((b+1048320|0)>>>16&8))+520192|0)>>>16&4|(b+1048320|0)>>>16&8|(H+245760|0)>>>16&2)+(H<<((H+245760|0)>>>16&2)>>>15)|0;b=f>>>(b+7|0)&1|b<<1}while(0);e=35180+(b<<2)|0;c[l+28>>2]=b;c[l+16+4>>2]=0;c[l+16>>2]=0;a=c[8720]|0;d=1<<b;if(!(a&d)){c[8720]=a|d;c[e>>2]=l;c[l+24>>2]=e;c[l+12>>2]=l;c[l+8>>2]=l;break}a=f<<((b|0)==31?0:25-(b>>>1)|0);e=c[e>>2]|0;while(1){if((c[e+4>>2]&-8|0)==(f|0)){A=278;break}d=e+16+(a>>>31<<2)|0;b=c[d>>2]|0;if(!b){A=275;break}else{a=a<<1;e=b}}if((A|0)==275)if(d>>>0<(c[8723]|0)>>>0)ba();else{c[d>>2]=l;c[l+24>>2]=e;c[l+12>>2]=l;c[l+8>>2]=l;break}else if((A|0)==278){b=e+8|0;a=c[b>>2]|0;H=c[8723]|0;if(a>>>0>=H>>>0&e>>>0>=H>>>0){c[a+12>>2]=l;c[b>>2]=l;c[l+8>>2]=a;c[l+12>>2]=e;c[l+24>>2]=0;break}else ba()}}else{H=(c[8722]|0)+f|0;c[8722]=H;c[8725]=l;c[l+4>>2]=H|1}while(0);H=m+8|0;i=I;return H|0}else a=35324;while(1){b=c[a>>2]|0;if(b>>>0<=j>>>0?(B=b+(c[a+4>>2]|0)|0,B>>>0>j>>>0):0)break;a=c[a+8>>2]|0}f=B+-47+((B+-47+8&7|0)==0?0:0-(B+-47+8)&7)|0;f=f>>>0<(j+16|0)>>>0?j:f;b=g+8|0;b=(b&7|0)==0?0:0-b&7;H=g+b|0;b=h+-40-b|0;c[8725]=H;c[8722]=b;c[H+4>>2]=b|1;c[H+b+4>>2]=40;c[8726]=c[8841];c[f+4>>2]=27;c[f+8>>2]=c[8831];c[f+8+4>>2]=c[8832];c[f+8+8>>2]=c[8833];c[f+8+12>>2]=c[8834];c[8831]=g;c[8832]=h;c[8834]=0;c[8833]=f+8;b=f+24|0;do{b=b+4|0;c[b>>2]=7}while((b+4|0)>>>0<B>>>0);if((f|0)!=(j|0)){c[f+4>>2]=c[f+4>>2]&-2;c[j+4>>2]=f-j|1;c[f>>2]=f-j;if((f-j|0)>>>0<256){a=34916+((f-j|0)>>>3<<1<<2)|0;b=c[8719]|0;if(b&1<<((f-j|0)>>>3)){b=c[a+8>>2]|0;if(b>>>0<(c[8723]|0)>>>0)ba();else{C=b;D=a+8|0}}else{c[8719]=b|1<<((f-j|0)>>>3);C=a;D=a+8|0}c[D>>2]=j;c[C+12>>2]=j;c[j+8>>2]=C;c[j+12>>2]=a;break}if((f-j|0)>>>8)if((f-j|0)>>>0>16777215)b=31;else{b=(f-j|0)>>>8<<((((f-j|0)>>>8)+1048320|0)>>>16&8);b=14-((b+520192|0)>>>16&4|(((f-j|0)>>>8)+1048320|0)>>>16&8|((b<<((b+520192|0)>>>16&4))+245760|0)>>>16&2)+(b<<((b+520192|0)>>>16&4)<<(((b<<((b+520192|0)>>>16&4))+245760|0)>>>16&2)>>>15)|0;b=(f-j|0)>>>(b+7|0)&1|b<<1}else b=0;e=35180+(b<<2)|0;c[j+28>>2]=b;c[j+20>>2]=0;c[j+16>>2]=0;a=c[8720]|0;d=1<<b;if(!(a&d)){c[8720]=a|d;c[e>>2]=j;c[j+24>>2]=e;c[j+12>>2]=j;c[j+8>>2]=j;break}a=f-j<<((b|0)==31?0:25-(b>>>1)|0);e=c[e>>2]|0;while(1){if((c[e+4>>2]&-8|0)==(f-j|0)){A=304;break}d=e+16+(a>>>31<<2)|0;b=c[d>>2]|0;if(!b){A=301;break}else{a=a<<1;e=b}}if((A|0)==301)if(d>>>0<(c[8723]|0)>>>0)ba();else{c[d>>2]=j;c[j+24>>2]=e;c[j+12>>2]=j;c[j+8>>2]=j;break}else if((A|0)==304){b=e+8|0;a=c[b>>2]|0;H=c[8723]|0;if(a>>>0>=H>>>0&e>>>0>=H>>>0){c[a+12>>2]=j;c[b>>2]=j;c[j+8>>2]=a;c[j+12>>2]=e;c[j+24>>2]=0;break}else ba()}}}else{H=c[8723]|0;if((H|0)==0|g>>>0<H>>>0)c[8723]=g;c[8831]=g;c[8832]=h;c[8834]=0;c[8728]=c[8837];c[8727]=-1;b=0;do{H=34916+(b<<1<<2)|0;c[H+12>>2]=H;c[H+8>>2]=H;b=b+1|0}while((b|0)!=32);H=g+8|0;H=(H&7|0)==0?0:0-H&7;G=g+H|0;H=h+-40-H|0;c[8725]=G;c[8722]=H;c[G+4>>2]=H|1;c[G+H+4>>2]=40;c[8726]=c[8841]}while(0);b=c[8722]|0;if(b>>>0>r>>>0){F=b-r|0;c[8722]=F;H=c[8725]|0;G=H+r|0;c[8725]=G;c[G+4>>2]=F|1;c[H+4>>2]=r|3;H=H+8|0;i=I;return H|0}}c[(mg()|0)>>2]=12;H=0;i=I;return H|0}function na(b){b=b|0;var c=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0;e=d[b>>0]|0;j=Wd(d[b+1>>0]|0|0,0,8)|0;S=D;_=d[b+2>>0]|0;x=Wd(_|0,0,16)|0;Z=Wd(d[b+3>>0]|0|0,0,8)|0;C=D;Y=Wd(d[b+4>>0]|0|0,0,16)|0;C=C|D;m=d[b+5>>0]|0;n=Wd(m|0,0,24)|0;C=Yd(Z|_|Y|n|0,C|D|0,5)|0;n=Wd(d[b+6>>0]|0|0,0,8)|0;Y=D;_=d[b+7>>0]|0;Z=Wd(_|0,0,16)|0;Y=Yd(n|m|Z|0,Y|D|0,2)|0;Z=Wd(d[b+8>>0]|0|0,0,8)|0;m=D;n=Wd(d[b+9>>0]|0|0,0,16)|0;m=m|D;na=d[b+10>>0]|0;va=Wd(na|0,0,24)|0;m=Yd(Z|_|n|va|0,m|D|0,7)|0;va=Wd(d[b+11>>0]|0|0,0,8)|0;n=D;_=Wd(d[b+12>>0]|0|0,0,16)|0;n=n|D;Z=d[b+13>>0]|0;oa=Wd(Z|0,0,24)|0;n=Yd(va|na|_|oa|0,n|D|0,4)|0;oa=Wd(d[b+14>>0]|0|0,0,8)|0;_=D;na=d[b+15>>0]|0;va=Wd(na|0,0,16)|0;_=Yd(oa|Z|va|0,_|D|0,1)|0;va=Wd(d[b+16>>0]|0|0,0,8)|0;Z=D;oa=Wd(d[b+17>>0]|0|0,0,16)|0;Z=Z|D;xa=d[b+18>>0]|0;ya=Wd(xa|0,0,24)|0;Z=Yd(va|na|oa|ya|0,Z|D|0,6)|0;ya=Wd(d[b+19>>0]|0|0,0,8)|0;oa=D;na=Wd(d[b+20>>0]|0|0,0,16)|0;oa=Yd(ya|xa|na|0,oa|D|0,3)|0;na=D;xa=d[b+21>>0]|0;ya=Wd(d[b+22>>0]|0|0,0,8)|0;va=D;N=d[b+23>>0]|0;wa=Wd(N|0,0,16)|0;U=Wd(d[b+24>>0]|0|0,0,8)|0;ka=D;ua=Wd(d[b+25>>0]|0|0,0,16)|0;ka=ka|D;fa=d[b+26>>0]|0;Ca=Wd(fa|0,0,24)|0;ka=Yd(U|N|ua|Ca|0,ka|D|0,5)|0;Ca=Wd(d[b+27>>0]|0|0,0,8)|0;ua=D;N=d[b+28>>0]|0;U=Wd(N|0,0,16)|0;ua=Yd(Ca|fa|U|0,ua|D|0,2)|0;U=Wd(d[b+29>>0]|0|0,0,8)|0;fa=D;Ca=Wd(d[b+30>>0]|0|0,0,16)|0;fa=fa|D;A=d[b+31>>0]|0;g=Wd(A|0,0,24)|0;fa=Yd(U|N|Ca|g|0,fa|D|0,7)|0;g=Wd(d[b+32>>0]|0|0,0,8)|0;Ca=D;N=Wd(d[b+33>>0]|0|0,0,16)|0;Ca=Ca|D;U=d[b+34>>0]|0;I=Wd(U|0,0,24)|0;Ca=Yd(g|A|N|I|0,Ca|D|0,4)|0;I=Wd(d[b+35>>0]|0|0,0,8)|0;N=D;A=d[b+36>>0]|0;g=Wd(A|0,0,16)|0;N=Yd(I|U|g|0,N|D|0,1)|0;g=Wd(d[b+37>>0]|0|0,0,8)|0;U=D;I=Wd(d[b+38>>0]|0|0,0,16)|0;U=U|D;K=d[b+39>>0]|0;L=Wd(K|0,0,24)|0;U=Yd(g|A|I|L|0,U|D|0,6)|0;L=Wd(d[b+40>>0]|0|0,0,8)|0;I=D;A=Wd(d[b+41>>0]|0|0,0,16)|0;I=Yd(L|K|A|0,I|D|0,3)|0;A=D;K=d[b+42>>0]|0;L=Wd(d[b+43>>0]|0|0,0,8)|0;g=D;X=d[b+44>>0]|0;W=Wd(X|0,0,16)|0;G=Wd(d[b+45>>0]|0|0,0,8)|0;t=D;ha=Wd(d[b+46>>0]|0|0,0,16)|0;t=t|D;Da=d[b+47>>0]|0;u=Wd(Da|0,0,24)|0;t=Yd(G|X|ha|u|0,t|D|0,5)|0;u=Wd(d[b+48>>0]|0|0,0,8)|0;ha=D;X=d[b+49>>0]|0;G=Wd(X|0,0,16)|0;ha=Yd(u|Da|G|0,ha|D|0,2)|0;G=Wd(d[b+50>>0]|0|0,0,8)|0;Da=D;u=Wd(d[b+51>>0]|0|0,0,16)|0;Da=Da|D;s=d[b+52>>0]|0;q=Wd(s|0,0,24)|0;Da=Yd(G|X|u|q|0,Da|D|0,7)|0;q=Wd(d[b+53>>0]|0|0,0,8)|0;u=D;X=Wd(d[b+54>>0]|0|0,0,16)|0;u=u|D;G=d[b+55>>0]|0;f=Wd(G|0,0,24)|0;u=Yd(q|s|X|f|0,u|D|0,4)|0;f=Wd(d[b+56>>0]|0|0,0,8)|0;X=D;s=d[b+57>>0]|0;q=Wd(s|0,0,16)|0;X=Yd(f|G|q|0,X|D|0,1)|0;q=Wd(d[b+58>>0]|0|0,0,8)|0;G=D;f=Wd(d[b+59>>0]|0|0,0,16)|0;G=G|D;E=d[b+60>>0]|0;v=Wd(E|0,0,24)|0;G=Yd(q|s|f|v|0,G|D|0,6)|0;v=Wd(d[b+61>>0]|0|0,0,8)|0;f=D;s=Wd(d[b+62>>0]|0|0,0,16)|0;f=f|D;q=Wd(d[b+63>>0]|0|0,0,24)|0;f=Yd(v|E|s|q|0,f|D|0,3)|0;q=D;s=Kd(f|0,q|0,666643,0)|0;E=D;v=Kd(f|0,q|0,470296,0)|0;o=D;B=Kd(f|0,q|0,654183,0)|0;Q=D;$=Kd(f|0,q|0,-997805,-1)|0;i=D;h=Kd(f|0,q|0,136657,0)|0;p=D;q=Kd(f|0,q|0,-683901,-1)|0;g=we(q|0,D|0,L|K|W&2031616|0,g|0)|0;W=D;K=Kd(G&2097151|0,0,666643,0)|0;L=D;q=Kd(G&2097151|0,0,470296,0)|0;f=D;qa=Kd(G&2097151|0,0,654183,0)|0;l=D;J=Kd(G&2097151|0,0,-997805,-1)|0;w=D;V=Kd(G&2097151|0,0,136657,0)|0;P=D;G=Kd(G&2097151|0,0,-683901,-1)|0;r=D;c=Kd(X&2097151|0,0,666643,0)|0;O=D;T=Kd(X&2097151|0,0,470296,0)|0;ga=D;aa=Kd(X&2097151|0,0,654183,0)|0;y=D;za=Kd(X&2097151|0,0,-997805,-1)|0;pa=D;H=Kd(X&2097151|0,0,136657,0)|0;k=D;X=Kd(X&2097151|0,0,-683901,-1)|0;U=we(X|0,D|0,U&2097151|0,0)|0;P=we(U|0,D|0,V|0,P|0)|0;i=we(P|0,D|0,$|0,i|0)|0;$=D;P=Kd(u&2097151|0,0,666643,0)|0;V=D;U=Kd(u&2097151|0,0,470296,0)|0;X=D;ra=Kd(u&2097151|0,0,654183,0)|0;z=D;ca=Kd(u&2097151|0,0,-997805,-1)|0;ba=D;Ba=Kd(u&2097151|0,0,136657,0)|0;Aa=D;u=Kd(u&2097151|0,0,-683901,-1)|0;M=D;F=Kd(Da&2097151|0,0,666643,0)|0;R=D;la=Kd(Da&2097151|0,0,470296,0)|0;ma=D;ja=Kd(Da&2097151|0,0,654183,0)|0;ia=D;ta=Kd(Da&2097151|0,0,-997805,-1)|0;sa=D;ea=Kd(Da&2097151|0,0,136657,0)|0;da=D;Da=Kd(Da&2097151|0,0,-683901,-1)|0;Ca=we(Da|0,D|0,Ca&2097151|0,0)|0;Aa=we(Ca|0,D|0,Ba|0,Aa|0)|0;pa=we(Aa|0,D|0,za|0,pa|0)|0;l=we(pa|0,D|0,qa|0,l|0)|0;o=we(l|0,D|0,v|0,o|0)|0;v=D;l=Kd(ha&2097151|0,0,666643,0)|0;Z=we(l|0,D|0,Z&2097151|0,0)|0;l=D;qa=Kd(ha&2097151|0,0,470296,0)|0;pa=D;za=Kd(ha&2097151|0,0,654183,0)|0;va=we(za|0,D|0,ya|xa|wa&2031616|0,va|0)|0;ma=we(va|0,D|0,la|0,ma|0)|0;V=we(ma|0,D|0,P|0,V|0)|0;P=D;ma=Kd(ha&2097151|0,0,-997805,-1)|0;la=D;va=Kd(ha&2097151|0,0,136657,0)|0;ua=we(va|0,D|0,ua&2097151|0,0)|0;sa=we(ua|0,D|0,ta|0,sa|0)|0;z=we(sa|0,D|0,ra|0,z|0)|0;ga=we(z|0,D|0,T|0,ga|0)|0;L=we(ga|0,D|0,K|0,L|0)|0;K=D;ha=Kd(ha&2097151|0,0,-683901,-1)|0;ga=D;T=we(Z|0,l|0,1048576,0)|0;T=Yd(T|0,D|0,21)|0;z=D;na=we(qa|0,pa|0,oa|0,na|0)|0;na=we(na|0,D|0,T|0,z|0)|0;R=we(na|0,D|0,F|0,R|0)|0;F=D;z=Wd(T|0,z|0,21)|0;z=te(Z|0,l|0,z|0,D|0)|0;l=D;Z=we(V|0,P|0,1048576,0)|0;Z=Yd(Z|0,D|0,21)|0;T=D;ka=we(ma|0,la|0,ka&2097151|0,0)|0;ia=we(ka|0,D|0,ja|0,ia|0)|0;X=we(ia|0,D|0,U|0,X|0)|0;O=we(X|0,D|0,c|0,O|0)|0;O=we(O|0,D|0,Z|0,T|0)|0;c=D;T=Wd(Z|0,T|0,21)|0;Z=D;X=we(L|0,K|0,1048576,0)|0;X=Jd(X|0,D|0,21)|0;U=D;fa=we(ha|0,ga|0,fa&2097151|0,0)|0;da=we(fa|0,D|0,ea|0,da|0)|0;ba=we(da|0,D|0,ca|0,ba|0)|0;y=we(ba|0,D|0,aa|0,y|0)|0;f=we(y|0,D|0,q|0,f|0)|0;E=we(f|0,D|0,s|0,E|0)|0;E=we(E|0,D|0,X|0,U|0)|0;s=D;U=Wd(X|0,U|0,21)|0;X=D;f=we(o|0,v|0,1048576,0)|0;f=Jd(f|0,D|0,21)|0;q=D;N=we(u|0,M|0,N&2097151|0,0)|0;k=we(N|0,D|0,H|0,k|0)|0;w=we(k|0,D|0,J|0,w|0)|0;Q=we(w|0,D|0,B|0,Q|0)|0;Q=we(Q|0,D|0,f|0,q|0)|0;B=D;q=Wd(f|0,q|0,21)|0;q=te(o|0,v|0,q|0,D|0)|0;v=D;o=we(i|0,$|0,1048576,0)|0;o=Jd(o|0,D|0,21)|0;f=D;A=we(G|0,r|0,I|0,A|0)|0;p=we(A|0,D|0,h|0,p|0)|0;p=we(p|0,D|0,o|0,f|0)|0;h=D;f=Wd(o|0,f|0,21)|0;f=te(i|0,$|0,f|0,D|0)|0;$=D;i=we(g|0,W|0,1048576,0)|0;i=Jd(i|0,D|0,21)|0;o=D;t=we(i|0,o|0,t&2097151|0,0)|0;A=D;o=Wd(i|0,o|0,21)|0;o=te(g|0,W|0,o|0,D|0)|0;W=D;g=we(R|0,F|0,1048576,0)|0;g=Yd(g|0,D|0,21)|0;i=D;I=Wd(g|0,i|0,21)|0;I=te(R|0,F|0,I|0,D|0)|0;F=D;R=we(O|0,c|0,1048576,0)|0;R=Jd(R|0,D|0,21)|0;r=D;G=Wd(R|0,r|0,21)|0;G=te(O|0,c|0,G|0,D|0)|0;c=D;O=we(E|0,s|0,1048576,0)|0;O=Jd(O|0,D|0,21)|0;w=D;v=we(q|0,v|0,O|0,w|0)|0;q=D;w=Wd(O|0,w|0,21)|0;w=te(E|0,s|0,w|0,D|0)|0;s=D;E=we(Q|0,B|0,1048576,0)|0;E=Jd(E|0,D|0,21)|0;O=D;$=we(E|0,O|0,f|0,$|0)|0;f=D;O=Wd(E|0,O|0,21)|0;O=te(Q|0,B|0,O|0,D|0)|0;B=D;Q=we(p|0,h|0,1048576,0)|0;Q=Jd(Q|0,D|0,21)|0;E=D;W=we(Q|0,E|0,o|0,W|0)|0;o=D;E=Wd(Q|0,E|0,21)|0;E=te(p|0,h|0,E|0,D|0)|0;h=D;p=Kd(t|0,A|0,666643,0)|0;_=we(p|0,D|0,_&2097151|0,0)|0;p=D;Q=Kd(t|0,A|0,470296,0)|0;Q=we(z|0,l|0,Q|0,D|0)|0;l=D;z=Kd(t|0,A|0,654183,0)|0;z=we(I|0,F|0,z|0,D|0)|0;F=D;I=Kd(t|0,A|0,-997805,-1)|0;J=D;k=Kd(t|0,A|0,136657,0)|0;k=we(G|0,c|0,k|0,D|0)|0;c=D;A=Kd(t|0,A|0,-683901,-1)|0;t=D;r=we(L|0,K|0,R|0,r|0)|0;X=te(r|0,D|0,U|0,X|0)|0;t=we(X|0,D|0,A|0,t|0)|0;A=D;X=Kd(W|0,o|0,666643,0)|0;n=we(X|0,D|0,n&2097151|0,0)|0;X=D;U=Kd(W|0,o|0,470296,0)|0;U=we(_|0,p|0,U|0,D|0)|0;p=D;_=Kd(W|0,o|0,654183,0)|0;_=we(Q|0,l|0,_|0,D|0)|0;l=D;Q=Kd(W|0,o|0,-997805,-1)|0;Q=we(z|0,F|0,Q|0,D|0)|0;F=D;z=Kd(W|0,o|0,136657,0)|0;r=D;o=Kd(W|0,o|0,-683901,-1)|0;o=we(k|0,c|0,o|0,D|0)|0;c=D;k=Kd(E|0,h|0,666643,0)|0;m=we(k|0,D|0,m&2097151|0,0)|0;k=D;W=Kd(E|0,h|0,470296,0)|0;W=we(n|0,X|0,W|0,D|0)|0;X=D;n=Kd(E|0,h|0,654183,0)|0;n=we(U|0,p|0,n|0,D|0)|0;p=D;U=Kd(E|0,h|0,-997805,-1)|0;U=we(_|0,l|0,U|0,D|0)|0;l=D;_=Kd(E|0,h|0,136657,0)|0;_=we(Q|0,F|0,_|0,D|0)|0;F=D;h=Kd(E|0,h|0,-683901,-1)|0;E=D;i=we(V|0,P|0,g|0,i|0)|0;Z=te(i|0,D|0,T|0,Z|0)|0;J=we(Z|0,D|0,I|0,J|0)|0;r=we(J|0,D|0,z|0,r|0)|0;E=we(r|0,D|0,h|0,E|0)|0;h=D;r=Kd($|0,f|0,666643,0)|0;z=D;J=Kd($|0,f|0,470296,0)|0;I=D;Z=Kd($|0,f|0,654183,0)|0;T=D;i=Kd($|0,f|0,-997805,-1)|0;g=D;P=Kd($|0,f|0,136657,0)|0;P=we(U|0,l|0,P|0,D|0)|0;l=D;f=Kd($|0,f|0,-683901,-1)|0;f=we(_|0,F|0,f|0,D|0)|0;F=D;_=Kd(O|0,B|0,666643,0)|0;$=D;U=Kd(O|0,B|0,470296,0)|0;V=D;Q=Kd(O|0,B|0,654183,0)|0;R=D;K=Kd(O|0,B|0,-997805,-1)|0;L=D;G=Kd(O|0,B|0,136657,0)|0;H=D;B=Kd(O|0,B|0,-683901,-1)|0;B=we(P|0,l|0,B|0,D|0)|0;l=D;P=Kd(v|0,q|0,666643,0)|0;S=we(P|0,D|0,j|e|x&2031616|0,S|0)|0;x=D;e=Kd(v|0,q|0,470296,0)|0;j=D;P=Kd(v|0,q|0,654183,0)|0;Y=we(P|0,D|0,Y&2097151|0,0)|0;z=we(Y|0,D|0,r|0,z|0)|0;V=we(z|0,D|0,U|0,V|0)|0;U=D;z=Kd(v|0,q|0,-997805,-1)|0;r=D;Y=Kd(v|0,q|0,136657,0)|0;Y=we(W|0,X|0,Y|0,D|0)|0;T=we(Y|0,D|0,Z|0,T|0)|0;L=we(T|0,D|0,K|0,L|0)|0;K=D;q=Kd(v|0,q|0,-683901,-1)|0;v=D;T=we(S|0,x|0,1048576,0)|0;T=Jd(T|0,D|0,21)|0;Z=D;C=we(e|0,j|0,C&2097151|0,0)|0;$=we(C|0,D|0,_|0,$|0)|0;$=we($|0,D|0,T|0,Z|0)|0;_=D;Z=Wd(T|0,Z|0,21)|0;Z=te(S|0,x|0,Z|0,D|0)|0;x=D;S=we(V|0,U|0,1048576,0)|0;S=Jd(S|0,D|0,21)|0;T=D;r=we(m|0,k|0,z|0,r|0)|0;I=we(r|0,D|0,J|0,I|0)|0;R=we(I|0,D|0,Q|0,R|0)|0;R=we(R|0,D|0,S|0,T|0)|0;Q=D;T=Wd(S|0,T|0,21)|0;S=D;I=we(L|0,K|0,1048576,0)|0;I=Jd(I|0,D|0,21)|0;J=D;v=we(n|0,p|0,q|0,v|0)|0;g=we(v|0,D|0,i|0,g|0)|0;H=we(g|0,D|0,G|0,H|0)|0;H=we(H|0,D|0,I|0,J|0)|0;G=D;J=Wd(I|0,J|0,21)|0;I=D;g=we(B|0,l|0,1048576,0)|0;g=Jd(g|0,D|0,21)|0;i=D;F=we(f|0,F|0,g|0,i|0)|0;f=D;i=Wd(g|0,i|0,21)|0;i=te(B|0,l|0,i|0,D|0)|0;l=D;B=we(E|0,h|0,1048576,0)|0;B=Jd(B|0,D|0,21)|0;g=D;c=we(o|0,c|0,B|0,g|0)|0;o=D;g=Wd(B|0,g|0,21)|0;g=te(E|0,h|0,g|0,D|0)|0;h=D;E=we(t|0,A|0,1048576,0)|0;E=Jd(E|0,D|0,21)|0;B=D;s=we(w|0,s|0,E|0,B|0)|0;w=D;B=Wd(E|0,B|0,21)|0;B=te(t|0,A|0,B|0,D|0)|0;A=D;t=we($|0,_|0,1048576,0)|0;t=Jd(t|0,D|0,21)|0;E=D;v=Wd(t|0,E|0,21)|0;q=D;p=we(R|0,Q|0,1048576,0)|0;p=Jd(p|0,D|0,21)|0;n=D;r=Wd(p|0,n|0,21)|0;z=D;k=we(H|0,G|0,1048576,0)|0;k=Jd(k|0,D|0,21)|0;m=D;l=we(i|0,l|0,k|0,m|0)|0;i=D;m=Wd(k|0,m|0,21)|0;k=D;C=we(F|0,f|0,1048576,0)|0;C=Jd(C|0,D|0,21)|0;j=D;h=we(g|0,h|0,C|0,j|0)|0;g=D;j=Wd(C|0,j|0,21)|0;j=te(F|0,f|0,j|0,D|0)|0;f=D;F=we(c|0,o|0,1048576,0)|0;F=Jd(F|0,D|0,21)|0;C=D;A=we(B|0,A|0,F|0,C|0)|0;B=D;C=Wd(F|0,C|0,21)|0;C=te(c|0,o|0,C|0,D|0)|0;o=D;c=we(s|0,w|0,1048576,0)|0;c=Jd(c|0,D|0,21)|0;F=D;e=Wd(c|0,F|0,21)|0;e=te(s|0,w|0,e|0,D|0)|0;w=D;s=Kd(c|0,F|0,666643,0)|0;s=we(Z|0,x|0,s|0,D|0)|0;x=D;Z=Kd(c|0,F|0,470296,0)|0;Y=D;X=Kd(c|0,F|0,654183,0)|0;W=D;P=Kd(c|0,F|0,-997805,-1)|0;O=D;N=Kd(c|0,F|0,136657,0)|0;M=D;F=Kd(c|0,F|0,-683901,-1)|0;c=D;u=Jd(s|0,x|0,21)|0;y=D;Y=we($|0,_|0,Z|0,Y|0)|0;Y=we(Y|0,D|0,u|0,y|0)|0;q=te(Y|0,D|0,v|0,q|0)|0;v=D;y=Wd(u|0,y|0,21)|0;y=te(s|0,x|0,y|0,D|0)|0;x=D;s=Jd(q|0,v|0,21)|0;u=D;U=we(X|0,W|0,V|0,U|0)|0;S=te(U|0,D|0,T|0,S|0)|0;E=we(S|0,D|0,t|0,E|0)|0;E=we(E|0,D|0,s|0,u|0)|0;t=D;u=Wd(s|0,u|0,21)|0;u=te(q|0,v|0,u|0,D|0)|0;v=D;q=Jd(E|0,t|0,21)|0;s=D;O=we(R|0,Q|0,P|0,O|0)|0;z=te(O|0,D|0,r|0,z|0)|0;z=we(z|0,D|0,q|0,s|0)|0;r=D;s=Wd(q|0,s|0,21)|0;s=te(E|0,t|0,s|0,D|0)|0;t=D;E=Jd(z|0,r|0,21)|0;q=D;K=we(N|0,M|0,L|0,K|0)|0;I=te(K|0,D|0,J|0,I|0)|0;n=we(I|0,D|0,p|0,n|0)|0;n=we(n|0,D|0,E|0,q|0)|0;p=D;q=Wd(E|0,q|0,21)|0;q=te(z|0,r|0,q|0,D|0)|0;r=D;z=Jd(n|0,p|0,21)|0;E=D;c=we(H|0,G|0,F|0,c|0)|0;k=te(c|0,D|0,m|0,k|0)|0;k=we(k|0,D|0,z|0,E|0)|0;m=D;E=Wd(z|0,E|0,21)|0;E=te(n|0,p|0,E|0,D|0)|0;p=D;n=Jd(k|0,m|0,21)|0;z=D;i=we(l|0,i|0,n|0,z|0)|0;l=D;z=Wd(n|0,z|0,21)|0;z=te(k|0,m|0,z|0,D|0)|0;m=D;k=Jd(i|0,l|0,21)|0;n=D;f=we(k|0,n|0,j|0,f|0)|0;j=D;n=Wd(k|0,n|0,21)|0;n=te(i|0,l|0,n|0,D|0)|0;l=D;i=Jd(f|0,j|0,21)|0;k=D;g=we(h|0,g|0,i|0,k|0)|0;h=D;k=Wd(i|0,k|0,21)|0;k=te(f|0,j|0,k|0,D|0)|0;j=D;f=Jd(g|0,h|0,21)|0;i=D;o=we(f|0,i|0,C|0,o|0)|0;C=D;i=Wd(f|0,i|0,21)|0;i=te(g|0,h|0,i|0,D|0)|0;h=D;g=Jd(o|0,C|0,21)|0;f=D;B=we(A|0,B|0,g|0,f|0)|0;A=D;f=Wd(g|0,f|0,21)|0;f=te(o|0,C|0,f|0,D|0)|0;C=D;o=Jd(B|0,A|0,21)|0;g=D;w=we(o|0,g|0,e|0,w|0)|0;e=D;g=Wd(o|0,g|0,21)|0;g=te(B|0,A|0,g|0,D|0)|0;A=D;B=Jd(w|0,e|0,21)|0;o=D;c=Wd(B|0,o|0,21)|0;c=te(w|0,e|0,c|0,D|0)|0;e=D;w=Kd(B|0,o|0,666643,0)|0;x=we(w|0,D|0,y|0,x|0)|0;y=D;w=Kd(B|0,o|0,470296,0)|0;w=we(u|0,v|0,w|0,D|0)|0;v=D;u=Kd(B|0,o|0,654183,0)|0;u=we(s|0,t|0,u|0,D|0)|0;t=D;s=Kd(B|0,o|0,-997805,-1)|0;s=we(q|0,r|0,s|0,D|0)|0;r=D;q=Kd(B|0,o|0,136657,0)|0;q=we(E|0,p|0,q|0,D|0)|0;p=D;o=Kd(B|0,o|0,-683901,-1)|0;o=we(z|0,m|0,o|0,D|0)|0;m=D;z=Jd(x|0,y|0,21)|0;B=D;v=we(w|0,v|0,z|0,B|0)|0;w=D;B=Wd(z|0,B|0,21)|0;B=te(x|0,y|0,B|0,D|0)|0;y=D;x=Jd(v|0,w|0,21)|0;z=D;t=we(u|0,t|0,x|0,z|0)|0;u=D;z=Wd(x|0,z|0,21)|0;z=te(v|0,w|0,z|0,D|0)|0;w=D;v=Jd(t|0,u|0,21)|0;x=D;r=we(s|0,r|0,v|0,x|0)|0;s=D;x=Wd(v|0,x|0,21)|0;x=te(t|0,u|0,x|0,D|0)|0;u=D;t=Jd(r|0,s|0,21)|0;v=D;p=we(q|0,p|0,t|0,v|0)|0;q=D;v=Wd(t|0,v|0,21)|0;v=te(r|0,s|0,v|0,D|0)|0;s=D;r=Jd(p|0,q|0,21)|0;t=D;m=we(o|0,m|0,r|0,t|0)|0;o=D;t=Wd(r|0,t|0,21)|0;t=te(p|0,q|0,t|0,D|0)|0;q=D;p=Jd(m|0,o|0,21)|0;r=D;l=we(p|0,r|0,n|0,l|0)|0;n=D;r=Wd(p|0,r|0,21)|0;r=te(m|0,o|0,r|0,D|0)|0;o=D;m=Jd(l|0,n|0,21)|0;p=D;j=we(m|0,p|0,k|0,j|0)|0;k=D;p=Wd(m|0,p|0,21)|0;p=te(l|0,n|0,p|0,D|0)|0;n=D;l=Jd(j|0,k|0,21)|0;m=D;h=we(l|0,m|0,i|0,h|0)|0;i=D;m=Wd(l|0,m|0,21)|0;m=te(j|0,k|0,m|0,D|0)|0;k=D;j=Jd(h|0,i|0,21)|0;l=D;C=we(j|0,l|0,f|0,C|0)|0;f=D;l=Wd(j|0,l|0,21)|0;l=te(h|0,i|0,l|0,D|0)|0;i=D;h=Jd(C|0,f|0,21)|0;j=D;A=we(h|0,j|0,g|0,A|0)|0;g=D;j=Wd(h|0,j|0,21)|0;j=te(C|0,f|0,j|0,D|0)|0;f=D;C=Jd(A|0,g|0,21)|0;h=D;e=we(C|0,h|0,c|0,e|0)|0;c=D;h=Wd(C|0,h|0,21)|0;h=te(A|0,g|0,h|0,D|0)|0;g=D;a[b>>0]=B;A=Yd(B|0,y|0,8)|0;a[b+1>>0]=A;y=Yd(B|0,y|0,16)|0;B=D;A=Wd(z|0,w|0,5)|0;a[b+2>>0]=A|y;y=Yd(z|0,w|0,3)|0;a[b+3>>0]=y;y=Yd(z|0,w|0,11)|0;a[b+4>>0]=y;w=Yd(z|0,w|0,19)|0;z=D;y=Wd(x|0,u|0,2)|0;a[b+5>>0]=y|w;w=Yd(x|0,u|0,6)|0;a[b+6>>0]=w;u=Yd(x|0,u|0,14)|0;x=D;w=Wd(v|0,s|0,7)|0;a[b+7>>0]=w|u;u=Yd(v|0,s|0,1)|0;a[b+8>>0]=u;u=Yd(v|0,s|0,9)|0;a[b+9>>0]=u;s=Yd(v|0,s|0,17)|0;v=D;u=Wd(t|0,q|0,4)|0;a[b+10>>0]=u|s;s=Yd(t|0,q|0,4)|0;a[b+11>>0]=s;s=Yd(t|0,q|0,12)|0;a[b+12>>0]=s;q=Yd(t|0,q|0,20)|0;t=D;s=Wd(r|0,o|0,1)|0;a[b+13>>0]=s|q;q=Yd(r|0,o|0,7)|0;a[b+14>>0]=q;o=Yd(r|0,o|0,15)|0;r=D;q=Wd(p|0,n|0,6)|0;a[b+15>>0]=q|o;o=Yd(p|0,n|0,2)|0;a[b+16>>0]=o;o=Yd(p|0,n|0,10)|0;a[b+17>>0]=o;n=Yd(p|0,n|0,18)|0;p=D;o=Wd(m|0,k|0,3)|0;a[b+18>>0]=o|n;n=Yd(m|0,k|0,5)|0;a[b+19>>0]=n;k=Yd(m|0,k|0,13)|0;a[b+20>>0]=k;a[b+21>>0]=l;k=Yd(l|0,i|0,8)|0;a[b+22>>0]=k;i=Yd(l|0,i|0,16)|0;l=D;k=Wd(j|0,f|0,5)|0;a[b+23>>0]=k|i;i=Yd(j|0,f|0,3)|0;a[b+24>>0]=i;i=Yd(j|0,f|0,11)|0;a[b+25>>0]=i;f=Yd(j|0,f|0,19)|0;j=D;i=Wd(h|0,g|0,2)|0;a[b+26>>0]=i|f;f=Yd(h|0,g|0,6)|0;a[b+27>>0]=f;g=Yd(h|0,g|0,14)|0;h=D;f=Wd(e|0,c|0,7)|0;a[b+28>>0]=g|f;f=Yd(e|0,c|0,1)|0;a[b+29>>0]=f;f=Yd(e|0,c|0,9)|0;a[b+30>>0]=f;c=Yd(e|0,c|0,17)|0;a[b+31>>0]=c;return}function oa(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,nb=0,ob=0,pb=0,qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,xb=0,yb=0,zb=0,Ab=0,Bb=0,Cb=0,Db=0,Eb=0,Fb=0,Gb=0,Hb=0,Ib=0,Jb=0,Kb=0,Lb=0,Mb=0,Nb=0,Ob=0,Pb=0,Qb=0,Rb=0,Sb=0,Tb=0,Ub=0,Vb=0,Wb=0,Xb=0,Yb=0,Zb=0,_b=0,$b=0,ac=0,bc=0,cc=0,dc=0,ec=0,fc=0,gc=0,hc=0,ic=0,jc=0,kc=0,lc=0,mc=0,nc=0,oc=0,pc=0,qc=0,rc=0,sc=0,tc=0,uc=0,vc=0,wc=0,xc=0,yc=0,zc=0,Ac=0,Bc=0,Cc=0,Dc=0,Ec=0,Fc=0,Gc=0,Hc=0,Ic=0,Jc=0,Kc=0,Lc=0,Mc=0,Nc=0,Oc=0,Pc=0;o=c[b>>2]|0;n=c[b+4>>2]|0;k=c[b+8>>2]|0;fa=c[b+12>>2]|0;N=c[b+16>>2]|0;M=c[b+20>>2]|0;g=c[b+24>>2]|0;ea=c[b+28>>2]|0;L=c[b+32>>2]|0;q=c[b+36>>2]|0;I=c[d>>2]|0;Oc=c[d+4>>2]|0;cc=c[d+8>>2]|0;sb=c[d+12>>2]|0;Ia=c[d+16>>2]|0;jc=c[d+20>>2]|0;Db=c[d+24>>2]|0;Ta=c[d+28>>2]|0;ga=c[d+32>>2]|0;Pc=c[d+36>>2]|0;Mc=Kd(I|0,((I|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;Lc=D;wc=Kd(Oc|0,((Oc|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;vc=D;ub=Kd(cc|0,((cc|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;tb=D;Ka=Kd(sb|0,((sb|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;Ja=D;mc=Kd(Ia|0,((Ia|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;lc=D;Gb=Kd(jc|0,((jc|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;Fb=D;Wa=Kd(Db|0,((Db|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;Va=D;ja=Kd(Ta|0,((Ta|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;ia=D;P=Kd(ga|0,((ga|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;O=D;o=Kd(Pc|0,((Pc|0)<0)<<31>>31|0,o|0,((o|0)<0)<<31>>31|0)|0;l=D;dc=Kd(I|0,((I|0)<0)<<31>>31|0,n|0,((n|0)<0)<<31>>31|0)|0;ec=D;yb=Kd(Oc|0,((Oc|0)<0)<<31>>31|0,n<<1|0,((n<<1|0)<0)<<31>>31|0)|0;xb=D;Ma=Kd(cc|0,((cc|0)<0)<<31>>31|0,n|0,((n|0)<0)<<31>>31|0)|0;La=D;oc=Kd(sb|0,((sb|0)<0)<<31>>31|0,n<<1|0,((n<<1|0)<0)<<31>>31|0)|0;nc=D;Ib=Kd(Ia|0,((Ia|0)<0)<<31>>31|0,n|0,((n|0)<0)<<31>>31|0)|0;Hb=D;Ya=Kd(jc|0,((jc|0)<0)<<31>>31|0,n<<1|0,((n<<1|0)<0)<<31>>31|0)|0;Xa=D;la=Kd(Db|0,((Db|0)<0)<<31>>31|0,n|0,((n|0)<0)<<31>>31|0)|0;ka=D;R=Kd(Ta|0,((Ta|0)<0)<<31>>31|0,n<<1|0,((n<<1|0)<0)<<31>>31|0)|0;Q=D;t=Kd(ga|0,((ga|0)<0)<<31>>31|0,n|0,((n|0)<0)<<31>>31|0)|0;s=D;d=((Pc*19|0)<0)<<31>>31;n=Kd(Pc*19|0,d|0,n<<1|0,((n<<1|0)<0)<<31>>31|0)|0;p=D;wb=Kd(I|0,((I|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;vb=D;Qa=Kd(Oc|0,((Oc|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;Pa=D;qc=Kd(cc|0,((cc|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;pc=D;Kb=Kd(sb|0,((sb|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;Jb=D;_a=Kd(Ia|0,((Ia|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;Za=D;na=Kd(jc|0,((jc|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;ma=D;T=Kd(Db|0,((Db|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;S=D;v=Kd(Ta|0,((Ta|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;u=D;ha=((ga*19|0)<0)<<31>>31;yc=Kd(ga*19|0,ha|0,k|0,((k|0)<0)<<31>>31|0)|0;xc=D;k=Kd(Pc*19|0,d|0,k|0,((k|0)<0)<<31>>31|0)|0;j=D;Oa=Kd(I|0,((I|0)<0)<<31>>31|0,fa|0,((fa|0)<0)<<31>>31|0)|0;Na=D;uc=Kd(Oc|0,((Oc|0)<0)<<31>>31|0,fa<<1|0,((fa<<1|0)<0)<<31>>31|0)|0;tc=D;Mb=Kd(cc|0,((cc|0)<0)<<31>>31|0,fa|0,((fa|0)<0)<<31>>31|0)|0;Lb=D;ab=Kd(sb|0,((sb|0)<0)<<31>>31|0,fa<<1|0,((fa<<1|0)<0)<<31>>31|0)|0;$a=D;pa=Kd(Ia|0,((Ia|0)<0)<<31>>31|0,fa|0,((fa|0)<0)<<31>>31|0)|0;oa=D;V=Kd(jc|0,((jc|0)<0)<<31>>31|0,fa<<1|0,((fa<<1|0)<0)<<31>>31|0)|0;U=D;x=Kd(Db|0,((Db|0)<0)<<31>>31|0,fa|0,((fa|0)<0)<<31>>31|0)|0;w=D;Ua=((Ta*19|0)<0)<<31>>31;Ac=Kd(Ta*19|0,Ua|0,fa<<1|0,((fa<<1|0)<0)<<31>>31|0)|0;zc=D;Sb=Kd(ga*19|0,ha|0,fa|0,((fa|0)<0)<<31>>31|0)|0;Rb=D;fa=Kd(Pc*19|0,d|0,fa<<1|0,((fa<<1|0)<0)<<31>>31|0)|0;f=D;sc=Kd(I|0,((I|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;rc=D;Qb=Kd(Oc|0,((Oc|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;Pb=D;cb=Kd(cc|0,((cc|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;bb=D;ra=Kd(sb|0,((sb|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;qa=D;X=Kd(Ia|0,((Ia|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;W=D;z=Kd(jc|0,((jc|0)<0)<<31>>31|0,N|0,((N|0)<0)<<31>>31|0)|0;y=D;Eb=((Db*19|0)<0)<<31>>31;Cc=Kd(Db*19|0,Eb|0,N|0,((N|0)<0)<<31>>31|0)|0;Bc=D;Ub=Kd(Ta*19|0,Ua|0,N|0,((N|0)<0)<<31>>31|0)|0;Tb=D;ib=Kd(ga*19|0,ha|0,N|0,((N|0)<0)<<31>>31|0)|0;hb=D;N=Kd(Pc*19|0,d|0,N|0,((N|0)<0)<<31>>31|0)|0;e=D;Ob=Kd(I|0,((I|0)<0)<<31>>31|0,M|0,((M|0)<0)<<31>>31|0)|0;Nb=D;gb=Kd(Oc|0,((Oc|0)<0)<<31>>31|0,M<<1|0,((M<<1|0)<0)<<31>>31|0)|0;fb=D;ta=Kd(cc|0,((cc|0)<0)<<31>>31|0,M|0,((M|0)<0)<<31>>31|0)|0;sa=D;Z=Kd(sb|0,((sb|0)<0)<<31>>31|0,M<<1|0,((M<<1|0)<0)<<31>>31|0)|0;Y=D;B=Kd(Ia|0,((Ia|0)<0)<<31>>31|0,M|0,((M|0)<0)<<31>>31|0)|0;A=D;kc=((jc*19|0)<0)<<31>>31;Ec=Kd(jc*19|0,kc|0,M<<1|0,((M<<1|0)<0)<<31>>31|0)|0;Dc=D;Wb=Kd(Db*19|0,Eb|0,M|0,((M|0)<0)<<31>>31|0)|0;Vb=D;kb=Kd(Ta*19|0,Ua|0,M<<1|0,((M<<1|0)<0)<<31>>31|0)|0;jb=D;Aa=Kd(ga*19|0,ha|0,M|0,((M|0)<0)<<31>>31|0)|0;za=D;b=Kd(Pc*19|0,d|0,M<<1|0,((M<<1|0)<0)<<31>>31|0)|0;M=D;eb=Kd(I|0,((I|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;db=D;xa=Kd(Oc|0,((Oc|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;wa=D;$=Kd(cc|0,((cc|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;_=D;E=Kd(sb|0,((sb|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;C=D;Gc=Kd(Ia*19|0,((Ia*19|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;Fc=D;Yb=Kd(jc*19|0,kc|0,g|0,((g|0)<0)<<31>>31|0)|0;Xb=D;mb=Kd(Db*19|0,Eb|0,g|0,((g|0)<0)<<31>>31|0)|0;lb=D;Ca=Kd(Ta*19|0,Ua|0,g|0,((g|0)<0)<<31>>31|0)|0;Ba=D;m=Kd(ga*19|0,ha|0,g|0,((g|0)<0)<<31>>31|0)|0;r=D;g=Kd(Pc*19|0,d|0,g|0,((g|0)<0)<<31>>31|0)|0;ya=D;va=Kd(I|0,((I|0)<0)<<31>>31|0,ea|0,((ea|0)<0)<<31>>31|0)|0;ua=D;da=Kd(Oc|0,((Oc|0)<0)<<31>>31|0,ea<<1|0,((ea<<1|0)<0)<<31>>31|0)|0;ca=D;G=Kd(cc|0,((cc|0)<0)<<31>>31|0,ea|0,((ea|0)<0)<<31>>31|0)|0;F=D;Ic=Kd(sb*19|0,((sb*19|0)<0)<<31>>31|0,ea<<1|0,((ea<<1|0)<0)<<31>>31|0)|0;Hc=D;_b=Kd(Ia*19|0,((Ia*19|0)<0)<<31>>31|0,ea|0,((ea|0)<0)<<31>>31|0)|0;Zb=D;ob=Kd(jc*19|0,kc|0,ea<<1|0,((ea<<1|0)<0)<<31>>31|0)|0;nb=D;Ea=Kd(Db*19|0,Eb|0,ea|0,((ea|0)<0)<<31>>31|0)|0;Da=D;gc=Kd(Ta*19|0,Ua|0,ea<<1|0,((ea<<1|0)<0)<<31>>31|0)|0;fc=D;Ab=Kd(ga*19|0,ha|0,ea|0,((ea|0)<0)<<31>>31|0)|0;zb=D;ea=Kd(Pc*19|0,d|0,ea<<1|0,((ea<<1|0)<0)<<31>>31|0)|0;i=D;ba=Kd(I|0,((I|0)<0)<<31>>31|0,L|0,((L|0)<0)<<31>>31|0)|0;aa=D;K=Kd(Oc|0,((Oc|0)<0)<<31>>31|0,L|0,((L|0)<0)<<31>>31|0)|0;J=D;Kc=Kd(cc*19|0,((cc*19|0)<0)<<31>>31|0,L|0,((L|0)<0)<<31>>31|0)|0;Jc=D;ac=Kd(sb*19|0,((sb*19|0)<0)<<31>>31|0,L|0,((L|0)<0)<<31>>31|0)|0;$b=D;qb=Kd(Ia*19|0,((Ia*19|0)<0)<<31>>31|0,L|0,((L|0)<0)<<31>>31|0)|0;pb=D;Ga=Kd(jc*19|0,kc|0,L|0,((L|0)<0)<<31>>31|0)|0;Fa=D;ic=Kd(Db*19|0,Eb|0,L|0,((L|0)<0)<<31>>31|0)|0;hc=D;Cb=Kd(Ta*19|0,Ua|0,L|0,((L|0)<0)<<31>>31|0)|0;Bb=D;Sa=Kd(ga*19|0,ha|0,L|0,((L|0)<0)<<31>>31|0)|0;Ra=D;L=Kd(Pc*19|0,d|0,L|0,((L|0)<0)<<31>>31|0)|0;h=D;I=Kd(I|0,((I|0)<0)<<31>>31|0,q|0,((q|0)<0)<<31>>31|0)|0;H=D;Oc=Kd(Oc*19|0,((Oc*19|0)<0)<<31>>31|0,q<<1|0,((q<<1|0)<0)<<31>>31|0)|0;Nc=D;cc=Kd(cc*19|0,((cc*19|0)<0)<<31>>31|0,q|0,((q|0)<0)<<31>>31|0)|0;bc=D;sb=Kd(sb*19|0,((sb*19|0)<0)<<31>>31|0,q<<1|0,((q<<1|0)<0)<<31>>31|0)|0;rb=D;Ia=Kd(Ia*19|0,((Ia*19|0)<0)<<31>>31|0,q|0,((q|0)<0)<<31>>31|0)|0;Ha=D;kc=Kd(jc*19|0,kc|0,q<<1|0,((q<<1|0)<0)<<31>>31|0)|0;jc=D;Eb=Kd(Db*19|0,Eb|0,q|0,((q|0)<0)<<31>>31|0)|0;Db=D;Ua=Kd(Ta*19|0,Ua|0,q<<1|0,((q<<1|0)<0)<<31>>31|0)|0;Ta=D;ha=Kd(ga*19|0,ha|0,q|0,((q|0)<0)<<31>>31|0)|0;ga=D;q=Kd(Pc*19|0,d|0,q<<1|0,((q<<1|0)<0)<<31>>31|0)|0;d=D;Lc=we(Oc|0,Nc|0,Mc|0,Lc|0)|0;Jc=we(Lc|0,D|0,Kc|0,Jc|0)|0;Hc=we(Jc|0,D|0,Ic|0,Hc|0)|0;Fc=we(Hc|0,D|0,Gc|0,Fc|0)|0;Dc=we(Fc|0,D|0,Ec|0,Dc|0)|0;Bc=we(Dc|0,D|0,Cc|0,Bc|0)|0;zc=we(Bc|0,D|0,Ac|0,zc|0)|0;xc=we(zc|0,D|0,yc|0,xc|0)|0;p=we(xc|0,D|0,n|0,p|0)|0;n=D;ec=we(wc|0,vc|0,dc|0,ec|0)|0;dc=D;rc=we(uc|0,tc|0,sc|0,rc|0)|0;pc=we(rc|0,D|0,qc|0,pc|0)|0;nc=we(pc|0,D|0,oc|0,nc|0)|0;lc=we(nc|0,D|0,mc|0,lc|0)|0;jc=we(lc|0,D|0,kc|0,jc|0)|0;hc=we(jc|0,D|0,ic|0,hc|0)|0;fc=we(hc|0,D|0,gc|0,fc|0)|0;r=we(fc|0,D|0,m|0,r|0)|0;M=we(r|0,D|0,b|0,M|0)|0;b=D;r=we(p|0,n|0,33554432,0)|0;r=Jd(r|0,D|0,26)|0;m=D;bc=we(ec|0,dc|0,cc|0,bc|0)|0;$b=we(bc|0,D|0,ac|0,$b|0)|0;Zb=we($b|0,D|0,_b|0,Zb|0)|0;Xb=we(Zb|0,D|0,Yb|0,Xb|0)|0;Vb=we(Xb|0,D|0,Wb|0,Vb|0)|0;Tb=we(Vb|0,D|0,Ub|0,Tb|0)|0;Rb=we(Tb|0,D|0,Sb|0,Rb|0)|0;j=we(Rb|0,D|0,k|0,j|0)|0;j=we(j|0,D|0,r|0,m|0)|0;k=D;m=Wd(r|0,m|0,26)|0;m=te(p|0,n|0,m|0,D|0)|0;n=D;p=we(M|0,b|0,33554432,0)|0;p=Jd(p|0,D|0,26)|0;r=D;Nb=we(Qb|0,Pb|0,Ob|0,Nb|0)|0;Lb=we(Nb|0,D|0,Mb|0,Lb|0)|0;Jb=we(Lb|0,D|0,Kb|0,Jb|0)|0;Hb=we(Jb|0,D|0,Ib|0,Hb|0)|0;Fb=we(Hb|0,D|0,Gb|0,Fb|0)|0;Db=we(Fb|0,D|0,Eb|0,Db|0)|0;Bb=we(Db|0,D|0,Cb|0,Bb|0)|0;zb=we(Bb|0,D|0,Ab|0,zb|0)|0;ya=we(zb|0,D|0,g|0,ya|0)|0;ya=we(ya|0,D|0,p|0,r|0)|0;g=D;r=Wd(p|0,r|0,26)|0;r=te(M|0,b|0,r|0,D|0)|0;b=D;M=we(j|0,k|0,16777216,0)|0;M=Jd(M|0,D|0,25)|0;p=D;vb=we(yb|0,xb|0,wb|0,vb|0)|0;tb=we(vb|0,D|0,ub|0,tb|0)|0;rb=we(tb|0,D|0,sb|0,rb|0)|0;pb=we(rb|0,D|0,qb|0,pb|0)|0;nb=we(pb|0,D|0,ob|0,nb|0)|0;lb=we(nb|0,D|0,mb|0,lb|0)|0;jb=we(lb|0,D|0,kb|0,jb|0)|0;hb=we(jb|0,D|0,ib|0,hb|0)|0;f=we(hb|0,D|0,fa|0,f|0)|0;f=we(f|0,D|0,M|0,p|0)|0;fa=D;p=Wd(M|0,p|0,25)|0;p=te(j|0,k|0,p|0,D|0)|0;k=D;j=we(ya|0,g|0,16777216,0)|0;j=Jd(j|0,D|0,25)|0;M=D;db=we(gb|0,fb|0,eb|0,db|0)|0;bb=we(db|0,D|0,cb|0,bb|0)|0;$a=we(bb|0,D|0,ab|0,$a|0)|0;Za=we($a|0,D|0,_a|0,Za|0)|0;Xa=we(Za|0,D|0,Ya|0,Xa|0)|0;Va=we(Xa|0,D|0,Wa|0,Va|0)|0;Ta=we(Va|0,D|0,Ua|0,Ta|0)|0;Ra=we(Ta|0,D|0,Sa|0,Ra|0)|0;i=we(Ra|0,D|0,ea|0,i|0)|0;i=we(i|0,D|0,j|0,M|0)|0;ea=D;M=Wd(j|0,M|0,25)|0;M=te(ya|0,g|0,M|0,D|0)|0;g=D;ya=we(f|0,fa|0,33554432,0)|0;ya=Jd(ya|0,D|0,26)|0;j=D;Na=we(Qa|0,Pa|0,Oa|0,Na|0)|0;La=we(Na|0,D|0,Ma|0,La|0)|0;Ja=we(La|0,D|0,Ka|0,Ja|0)|0;Ha=we(Ja|0,D|0,Ia|0,Ha|0)|0;Fa=we(Ha|0,D|0,Ga|0,Fa|0)|0;Da=we(Fa|0,D|0,Ea|0,Da|0)|0;Ba=we(Da|0,D|0,Ca|0,Ba|0)|0;za=we(Ba|0,D|0,Aa|0,za|0)|0;e=we(za|0,D|0,N|0,e|0)|0;e=we(e|0,D|0,ya|0,j|0)|0;N=D;j=Wd(ya|0,j|0,26)|0;j=te(f|0,fa|0,j|0,D|0)|0;fa=we(i|0,ea|0,33554432,0)|0;fa=Jd(fa|0,D|0,26)|0;f=D;ua=we(xa|0,wa|0,va|0,ua|0)|0;sa=we(ua|0,D|0,ta|0,sa|0)|0;qa=we(sa|0,D|0,ra|0,qa|0)|0;oa=we(qa|0,D|0,pa|0,oa|0)|0;ma=we(oa|0,D|0,na|0,ma|0)|0;ka=we(ma|0,D|0,la|0,ka|0)|0;ia=we(ka|0,D|0,ja|0,ia|0)|0;ga=we(ia|0,D|0,ha|0,ga|0)|0;h=we(ga|0,D|0,L|0,h|0)|0;h=we(h|0,D|0,fa|0,f|0)|0;L=D;f=Wd(fa|0,f|0,26)|0;f=te(i|0,ea|0,f|0,D|0)|0;ea=we(e|0,N|0,16777216,0)|0;ea=Jd(ea|0,D|0,25)|0;i=D;b=we(ea|0,i|0,r|0,b|0)|0;r=D;i=Wd(ea|0,i|0,25)|0;i=te(e|0,N|0,i|0,D|0)|0;N=we(h|0,L|0,16777216,0)|0;N=Jd(N|0,D|0,25)|0;e=D;aa=we(da|0,ca|0,ba|0,aa|0)|0;_=we(aa|0,D|0,$|0,_|0)|0;Y=we(_|0,D|0,Z|0,Y|0)|0;W=we(Y|0,D|0,X|0,W|0)|0;U=we(W|0,D|0,V|0,U|0)|0;S=we(U|0,D|0,T|0,S|0)|0;Q=we(S|0,D|0,R|0,Q|0)|0;O=we(Q|0,D|0,P|0,O|0)|0;d=we(O|0,D|0,q|0,d|0)|0;d=we(d|0,D|0,N|0,e|0)|0;q=D;e=Wd(N|0,e|0,25)|0;e=te(h|0,L|0,e|0,D|0)|0;L=we(b|0,r|0,33554432,0)|0;L=Jd(L|0,D|0,26)|0;h=D;g=we(M|0,g|0,L|0,h|0)|0;h=Wd(L|0,h|0,26)|0;h=te(b|0,r|0,h|0,D|0)|0;r=we(d|0,q|0,33554432,0)|0;r=Jd(r|0,D|0,26)|0;b=D;H=we(K|0,J|0,I|0,H|0)|0;F=we(H|0,D|0,G|0,F|0)|0;C=we(F|0,D|0,E|0,C|0)|0;A=we(C|0,D|0,B|0,A|0)|0;y=we(A|0,D|0,z|0,y|0)|0;w=we(y|0,D|0,x|0,w|0)|0;u=we(w|0,D|0,v|0,u|0)|0;s=we(u|0,D|0,t|0,s|0)|0;l=we(s|0,D|0,o|0,l|0)|0;l=we(l|0,D|0,r|0,b|0)|0;o=D;b=Wd(r|0,b|0,26)|0;b=te(d|0,q|0,b|0,D|0)|0;q=we(l|0,o|0,16777216,0)|0;q=Jd(q|0,D|0,25)|0;d=D;r=Kd(q|0,d|0,19,0)|0;n=we(r|0,D|0,m|0,n|0)|0;m=D;d=Wd(q|0,d|0,25)|0;d=te(l|0,o|0,d|0,D|0)|0;o=we(n|0,m|0,33554432,0)|0;o=Jd(o|0,D|0,26)|0;l=D;k=we(p|0,k|0,o|0,l|0)|0;l=Wd(o|0,l|0,26)|0;l=te(n|0,m|0,l|0,D|0)|0;c[a>>2]=l;c[a+4>>2]=k;c[a+8>>2]=j;c[a+12>>2]=i;c[a+16>>2]=h;c[a+20>>2]=g;c[a+24>>2]=f;c[a+28>>2]=e;c[a+32>>2]=b;c[a+36>>2]=d;return}function pa(a,b,e,f){a=a|0;b=b|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0;g=0;do{u=b+(g<<2)|0;c[e+(g<<2)>>2]=(d[u+2>>0]|0)<<8|(d[u+3>>0]|0)|(d[u+1>>0]|0)<<16|(d[u>>0]|0)<<24;g=g+1|0}while((g|0)!=16);c[f>>2]=c[a>>2];c[f+4>>2]=c[a+4>>2];c[f+8>>2]=c[a+8>>2];c[f+12>>2]=c[a+12>>2];c[f+16>>2]=c[a+16>>2];c[f+20>>2]=c[a+20>>2];c[f+24>>2]=c[a+24>>2];c[f+28>>2]=c[a+28>>2];t=0;g=c[e>>2]|0;while(1){B=c[f+16>>2]|0;D=c[f+20>>2]|0;z=c[f+24>>2]|0;x=((B<<26|B>>>6)^(B<<21|B>>>11)^(B<<7|B>>>25))+g+(c[32936+(t<<2)>>2]|0)+((z^D)&B^z)+(c[f+28>>2]|0)|0;w=x+(c[f+12>>2]|0)|0;c[f+12>>2]=w;v=c[f>>2]|0;A=c[f+4>>2]|0;C=c[f+8>>2]|0;c[f+28>>2]=((v<<30|v>>>2)^(v<<19|v>>>13)^(v<<10|v>>>22))+x+((C|A)&v|C&A);s=t|1;z=((w<<26|w>>>6)^(w<<21|w>>>11)^(w<<7|w>>>25))+(c[e+(s<<2)>>2]|0)+(c[32936+(s<<2)>>2]|0)+((D^B)&w^D)+z|0;c[f+8>>2]=z+C;B=((((v<<30|v>>>2)^(v<<19|v>>>13)^(v<<10|v>>>22))+x+((C|A)&v|C&A)<<30|(((v<<30|v>>>2)^(v<<19|v>>>13)^(v<<10|v>>>22))+x+((C|A)&v|C&A)|0)>>>2)^(((v<<30|v>>>2)^(v<<19|v>>>13)^(v<<10|v>>>22))+x+((C|A)&v|C&A)<<19|(((v<<30|v>>>2)^(v<<19|v>>>13)^(v<<10|v>>>22))+x+((C|A)&v|C&A)|0)>>>13)^(((v<<30|v>>>2)^(v<<19|v>>>13)^(v<<10|v>>>22))+x+((C|A)&v|C&A)<<10|(((v<<30|v>>>2)^(v<<19|v>>>13)^(v<<10|v>>>22))+x+((C|A)&v|C&A)|0)>>>22))+z+((A|v)&((v<<30|v>>>2)^(v<<19|v>>>13)^(v<<10|v>>>22))+x+((C|A)&v|C&A)|A&v)|0;c[f+24>>2]=B;j=c[f+16>>2]|0;g=t|2;D=((z+C<<26|(z+C|0)>>>6)^(z+C<<21|(z+C|0)>>>11)^(z+C<<7|(z+C|0)>>>25))+(c[e+(g<<2)>>2]|0)+(c[32936+(g<<2)>>2]|0)+((j^w)&z+C^j)+D|0;c[f+4>>2]=D+A;w=c[f>>2]|0;v=((B<<30|B>>>2)^(B<<19|B>>>13)^(B<<10|B>>>22))+D+((w|((v<<30|v>>>2)^(v<<19|v>>>13)^(v<<10|v>>>22))+x+((C|A)&v|C&A))&B|w&((v<<30|v>>>2)^(v<<19|v>>>13)^(v<<10|v>>>22))+x+((C|A)&v|C&A))|0;c[f+20>>2]=v;x=c[f+12>>2]|0;b=t|3;j=((D+A<<26|(D+A|0)>>>6)^(D+A<<21|(D+A|0)>>>11)^(D+A<<7|(D+A|0)>>>25))+(c[e+(b<<2)>>2]|0)+(c[32936+(b<<2)>>2]|0)+((x^z+C)&D+A^x)+j|0;c[f>>2]=j+w;C=c[f+28>>2]|0;c[f+16>>2]=((v<<30|v>>>2)^(v<<19|v>>>13)^(v<<10|v>>>22))+j+((C|B)&v|C&B);z=c[f+8>>2]|0;h=t|4;x=((j+w<<26|(j+w|0)>>>6)^(j+w<<21|(j+w|0)>>>11)^(j+w<<7|(j+w|0)>>>25))+(c[e+(h<<2)>>2]|0)+(c[32936+(h<<2)>>2]|0)+((z^D+A)&j+w^z)+x|0;c[f+28>>2]=x+C;A=c[f+24>>2]|0;D=((((v<<30|v>>>2)^(v<<19|v>>>13)^(v<<10|v>>>22))+j+((C|B)&v|C&B)<<30|(((v<<30|v>>>2)^(v<<19|v>>>13)^(v<<10|v>>>22))+j+((C|B)&v|C&B)|0)>>>2)^(((v<<30|v>>>2)^(v<<19|v>>>13)^(v<<10|v>>>22))+j+((C|B)&v|C&B)<<19|(((v<<30|v>>>2)^(v<<19|v>>>13)^(v<<10|v>>>22))+j+((C|B)&v|C&B)|0)>>>13)^(((v<<30|v>>>2)^(v<<19|v>>>13)^(v<<10|v>>>22))+j+((C|B)&v|C&B)<<10|(((v<<30|v>>>2)^(v<<19|v>>>13)^(v<<10|v>>>22))+j+((C|B)&v|C&B)|0)>>>22))+x+((A|v)&((v<<30|v>>>2)^(v<<19|v>>>13)^(v<<10|v>>>22))+j+((C|B)&v|C&B)|A&v)|0;c[f+12>>2]=D;m=c[f+4>>2]|0;i=t|5;z=((x+C<<26|(x+C|0)>>>6)^(x+C<<21|(x+C|0)>>>11)^(x+C<<7|(x+C|0)>>>25))+(c[e+(i<<2)>>2]|0)+(c[32936+(i<<2)>>2]|0)+((m^j+w)&x+C^m)+z|0;c[f+24>>2]=z+A;w=c[f+20>>2]|0;B=((D<<30|D>>>2)^(D<<19|D>>>13)^(D<<10|D>>>22))+z+((w|((v<<30|v>>>2)^(v<<19|v>>>13)^(v<<10|v>>>22))+j+((C|B)&v|C&B))&D|w&((v<<30|v>>>2)^(v<<19|v>>>13)^(v<<10|v>>>22))+j+((C|B)&v|C&B))|0;c[f+8>>2]=B;v=c[f>>2]|0;j=t|6;m=((z+A<<26|(z+A|0)>>>6)^(z+A<<21|(z+A|0)>>>11)^(z+A<<7|(z+A|0)>>>25))+(c[e+(j<<2)>>2]|0)+(c[32936+(j<<2)>>2]|0)+((v^x+C)&z+A^v)+m|0;c[f+20>>2]=m+w;C=c[f+16>>2]|0;c[f+4>>2]=((B<<30|B>>>2)^(B<<19|B>>>13)^(B<<10|B>>>22))+m+((C|D)&B|C&D);x=c[f+28>>2]|0;k=t|7;v=((m+w<<26|(m+w|0)>>>6)^(m+w<<21|(m+w|0)>>>11)^(m+w<<7|(m+w|0)>>>25))+(c[e+(k<<2)>>2]|0)+(c[32936+(k<<2)>>2]|0)+((x^z+A)&m+w^x)+v|0;c[f+16>>2]=v+C;A=c[f+12>>2]|0;z=((((B<<30|B>>>2)^(B<<19|B>>>13)^(B<<10|B>>>22))+m+((C|D)&B|C&D)<<30|(((B<<30|B>>>2)^(B<<19|B>>>13)^(B<<10|B>>>22))+m+((C|D)&B|C&D)|0)>>>2)^(((B<<30|B>>>2)^(B<<19|B>>>13)^(B<<10|B>>>22))+m+((C|D)&B|C&D)<<19|(((B<<30|B>>>2)^(B<<19|B>>>13)^(B<<10|B>>>22))+m+((C|D)&B|C&D)|0)>>>13)^(((B<<30|B>>>2)^(B<<19|B>>>13)^(B<<10|B>>>22))+m+((C|D)&B|C&D)<<10|(((B<<30|B>>>2)^(B<<19|B>>>13)^(B<<10|B>>>22))+m+((C|D)&B|C&D)|0)>>>22))+v+((A|B)&((B<<30|B>>>2)^(B<<19|B>>>13)^(B<<10|B>>>22))+m+((C|D)&B|C&D)|A&B)|0;c[f>>2]=z;p=c[f+24>>2]|0;l=t|8;x=((v+C<<26|(v+C|0)>>>6)^(v+C<<21|(v+C|0)>>>11)^(v+C<<7|(v+C|0)>>>25))+(c[e+(l<<2)>>2]|0)+(c[32936+(l<<2)>>2]|0)+((p^m+w)&v+C^p)+x|0;c[f+12>>2]=x+A;w=c[f+8>>2]|0;D=((z<<30|z>>>2)^(z<<19|z>>>13)^(z<<10|z>>>22))+x+((w|((B<<30|B>>>2)^(B<<19|B>>>13)^(B<<10|B>>>22))+m+((C|D)&B|C&D))&z|w&((B<<30|B>>>2)^(B<<19|B>>>13)^(B<<10|B>>>22))+m+((C|D)&B|C&D))|0;c[f+28>>2]=D;B=c[f+20>>2]|0;m=t|9;p=((x+A<<26|(x+A|0)>>>6)^(x+A<<21|(x+A|0)>>>11)^(x+A<<7|(x+A|0)>>>25))+(c[e+(m<<2)>>2]|0)+(c[32936+(m<<2)>>2]|0)+((B^v+C)&x+A^B)+p|0;c[f+8>>2]=p+w;C=c[f+4>>2]|0;c[f+24>>2]=((D<<30|D>>>2)^(D<<19|D>>>13)^(D<<10|D>>>22))+p+((C|z)&D|C&z);v=c[f+16>>2]|0;n=t|10;B=((p+w<<26|(p+w|0)>>>6)^(p+w<<21|(p+w|0)>>>11)^(p+w<<7|(p+w|0)>>>25))+(c[e+(n<<2)>>2]|0)+(c[32936+(n<<2)>>2]|0)+((v^x+A)&p+w^v)+B|0;c[f+4>>2]=B+C;A=c[f>>2]|0;x=((((D<<30|D>>>2)^(D<<19|D>>>13)^(D<<10|D>>>22))+p+((C|z)&D|C&z)<<30|(((D<<30|D>>>2)^(D<<19|D>>>13)^(D<<10|D>>>22))+p+((C|z)&D|C&z)|0)>>>2)^(((D<<30|D>>>2)^(D<<19|D>>>13)^(D<<10|D>>>22))+p+((C|z)&D|C&z)<<19|(((D<<30|D>>>2)^(D<<19|D>>>13)^(D<<10|D>>>22))+p+((C|z)&D|C&z)|0)>>>13)^(((D<<30|D>>>2)^(D<<19|D>>>13)^(D<<10|D>>>22))+p+((C|z)&D|C&z)<<10|(((D<<30|D>>>2)^(D<<19|D>>>13)^(D<<10|D>>>22))+p+((C|z)&D|C&z)|0)>>>22))+B+((A|D)&((D<<30|D>>>2)^(D<<19|D>>>13)^(D<<10|D>>>22))+p+((C|z)&D|C&z)|A&D)|0;c[f+20>>2]=x;u=c[f+12>>2]|0;o=t|11;v=((B+C<<26|(B+C|0)>>>6)^(B+C<<21|(B+C|0)>>>11)^(B+C<<7|(B+C|0)>>>25))+(c[e+(o<<2)>>2]|0)+(c[32936+(o<<2)>>2]|0)+((u^p+w)&B+C^u)+v|0;c[f>>2]=v+A;w=c[f+28>>2]|0;z=((x<<30|x>>>2)^(x<<19|x>>>13)^(x<<10|x>>>22))+v+((w|((D<<30|D>>>2)^(D<<19|D>>>13)^(D<<10|D>>>22))+p+((C|z)&D|C&z))&x|w&((D<<30|D>>>2)^(D<<19|D>>>13)^(D<<10|D>>>22))+p+((C|z)&D|C&z))|0;c[f+16>>2]=z;D=c[f+8>>2]|0;p=t|12;u=((v+A<<26|(v+A|0)>>>6)^(v+A<<21|(v+A|0)>>>11)^(v+A<<7|(v+A|0)>>>25))+(c[e+(p<<2)>>2]|0)+(c[32936+(p<<2)>>2]|0)+((D^B+C)&v+A^D)+u|0;c[f+28>>2]=u+w;C=c[f+24>>2]|0;c[f+12>>2]=((z<<30|z>>>2)^(z<<19|z>>>13)^(z<<10|z>>>22))+u+((C|x)&z|C&x);B=c[f+4>>2]|0;q=t|13;D=((u+w<<26|(u+w|0)>>>6)^(u+w<<21|(u+w|0)>>>11)^(u+w<<7|(u+w|0)>>>25))+(c[e+(q<<2)>>2]|0)+(c[32936+(q<<2)>>2]|0)+((B^v+A)&u+w^B)+D|0;c[f+24>>2]=D+C;A=c[f+20>>2]|0;v=((((z<<30|z>>>2)^(z<<19|z>>>13)^(z<<10|z>>>22))+u+((C|x)&z|C&x)<<30|(((z<<30|z>>>2)^(z<<19|z>>>13)^(z<<10|z>>>22))+u+((C|x)&z|C&x)|0)>>>2)^(((z<<30|z>>>2)^(z<<19|z>>>13)^(z<<10|z>>>22))+u+((C|x)&z|C&x)<<19|(((z<<30|z>>>2)^(z<<19|z>>>13)^(z<<10|z>>>22))+u+((C|x)&z|C&x)|0)>>>13)^(((z<<30|z>>>2)^(z<<19|z>>>13)^(z<<10|z>>>22))+u+((C|x)&z|C&x)<<10|(((z<<30|z>>>2)^(z<<19|z>>>13)^(z<<10|z>>>22))+u+((C|x)&z|C&x)|0)>>>22))+D+((A|z)&((z<<30|z>>>2)^(z<<19|z>>>13)^(z<<10|z>>>22))+u+((C|x)&z|C&x)|A&z)|0;c[f+8>>2]=v;y=c[f>>2]|0;r=t|14;B=((D+C<<26|(D+C|0)>>>6)^(D+C<<21|(D+C|0)>>>11)^(D+C<<7|(D+C|0)>>>25))+(c[e+(r<<2)>>2]|0)+(c[32936+(r<<2)>>2]|0)+((y^u+w)&D+C^y)+B|0;c[f+20>>2]=B+A;w=c[f+16>>2]|0;x=((v<<30|v>>>2)^(v<<19|v>>>13)^(v<<10|v>>>22))+B+((w|((z<<30|z>>>2)^(z<<19|z>>>13)^(z<<10|z>>>22))+u+((C|x)&z|C&x))&v|w&((z<<30|z>>>2)^(z<<19|z>>>13)^(z<<10|z>>>22))+u+((C|x)&z|C&x))|0;c[f+4>>2]=x;z=c[f+28>>2]|0;u=t|15;y=((B+A<<26|(B+A|0)>>>6)^(B+A<<21|(B+A|0)>>>11)^(B+A<<7|(B+A|0)>>>25))+(c[e+(u<<2)>>2]|0)+(c[32936+(u<<2)>>2]|0)+((z^D+C)&B+A^z)+y|0;c[f+16>>2]=y+w;w=c[f+12>>2]|0;c[f>>2]=((x<<30|x>>>2)^(x<<19|x>>>13)^(x<<10|x>>>22))+y+((w|v)&x|w&v);if((t|0)==48){g=0;break}B=c[e+(r<<2)>>2]|0;C=c[e+(s<<2)>>2]|0;B=(c[e+(t<<2)>>2]|0)+(c[e+(m<<2)>>2]|0)+((B<<13|B>>>19)^B>>>10^(B<<15|B>>>17))+((C<<14|C>>>18)^C>>>3^(C<<25|C>>>7))|0;t=t+16|0;c[e+(t<<2)>>2]=B;D=c[e+(u<<2)>>2]|0;A=c[e+(s+1<<2)>>2]|0;D=C+(c[e+(s+9<<2)>>2]|0)+((D<<13|D>>>19)^D>>>10^(D<<15|D>>>17))+((A<<14|A>>>18)^A>>>3^(A<<25|A>>>7))|0;c[e+(s+16<<2)>>2]=D;C=c[e+(b<<2)>>2]|0;B=A+(c[e+(o<<2)>>2]|0)+((B<<13|B>>>19)^B>>>10^(B<<15|B>>>17))+((C<<14|C>>>18)^C>>>3^(C<<25|C>>>7))|0;c[e+(g+16<<2)>>2]=B;g=c[e+(b+1<<2)>>2]|0;D=C+(c[e+(b+9<<2)>>2]|0)+((D<<13|D>>>19)^D>>>10^(D<<15|D>>>17))+((g<<14|g>>>18)^g>>>3^(g<<25|g>>>7))|0;c[e+(b+16<<2)>>2]=D;C=c[e+(i<<2)>>2]|0;g=g+(c[e+(q<<2)>>2]|0)+((B<<13|B>>>19)^B>>>10^(B<<15|B>>>17))+((C<<14|C>>>18)^C>>>3^(C<<25|C>>>7))|0;c[e+(h+16<<2)>>2]=g;B=c[e+(i+1<<2)>>2]|0;D=C+(c[e+(i+9<<2)>>2]|0)+((D<<13|D>>>19)^D>>>10^(D<<15|D>>>17))+((B<<14|B>>>18)^B>>>3^(B<<25|B>>>7))|0;c[e+(i+16<<2)>>2]=D;C=c[e+(k<<2)>>2]|0;g=B+(c[e+(u<<2)>>2]|0)+((g<<13|g>>>19)^g>>>10^(g<<15|g>>>17))+((C<<14|C>>>18)^C>>>3^(C<<25|C>>>7))|0;c[e+(j+16<<2)>>2]=g;B=c[e+(k+1<<2)>>2]|0;D=C+(c[e+(k+9<<2)>>2]|0)+((D<<13|D>>>19)^D>>>10^(D<<15|D>>>17))+((B<<14|B>>>18)^B>>>3^(B<<25|B>>>7))|0;c[e+(k+16<<2)>>2]=D;C=c[e+(m<<2)>>2]|0;g=B+(c[e+(l+9<<2)>>2]|0)+((g<<13|g>>>19)^g>>>10^(g<<15|g>>>17))+((C<<14|C>>>18)^C>>>3^(C<<25|C>>>7))|0;c[e+(l+16<<2)>>2]=g;B=c[e+(m+1<<2)>>2]|0;D=C+(c[e+(m+9<<2)>>2]|0)+((D<<13|D>>>19)^D>>>10^(D<<15|D>>>17))+((B<<14|B>>>18)^B>>>3^(B<<25|B>>>7))|0;c[e+(m+16<<2)>>2]=D;C=c[e+(o<<2)>>2]|0;g=B+(c[e+(n+9<<2)>>2]|0)+((g<<13|g>>>19)^g>>>10^(g<<15|g>>>17))+((C<<14|C>>>18)^C>>>3^(C<<25|C>>>7))|0;c[e+(n+16<<2)>>2]=g;B=c[e+(o+1<<2)>>2]|0;D=C+(c[e+(o+9<<2)>>2]|0)+((D<<13|D>>>19)^D>>>10^(D<<15|D>>>17))+((B<<14|B>>>18)^B>>>3^(B<<25|B>>>7))|0;c[e+(o+16<<2)>>2]=D;C=c[e+(q<<2)>>2]|0;g=B+(c[e+(p+9<<2)>>2]|0)+((g<<13|g>>>19)^g>>>10^(g<<15|g>>>17))+((C<<14|C>>>18)^C>>>3^(C<<25|C>>>7))|0;c[e+(p+16<<2)>>2]=g;B=c[e+(q+1<<2)>>2]|0;D=C+(c[e+(q+9<<2)>>2]|0)+((D<<13|D>>>19)^D>>>10^(D<<15|D>>>17))+((B<<14|B>>>18)^B>>>3^(B<<25|B>>>7))|0;c[e+(q+16<<2)>>2]=D;C=c[e+(u<<2)>>2]|0;c[e+(r+16<<2)>>2]=B+(c[e+(r+9<<2)>>2]|0)+((g<<13|g>>>19)^g>>>10^(g<<15|g>>>17))+((C<<14|C>>>18)^C>>>3^(C<<25|C>>>7));g=c[e+(u+1<<2)>>2]|0;c[e+(u+16<<2)>>2]=C+(c[e+(u+9<<2)>>2]|0)+((D<<13|D>>>19)^D>>>10^(D<<15|D>>>17))+((g<<14|g>>>18)^g>>>3^(g<<25|g>>>7));if((t|0)>=64){g=0;break}}do{D=a+(g<<2)|0;c[D>>2]=(c[D>>2]|0)+(c[f+(g<<2)>>2]|0);g=g+1|0}while((g|0)!=8);return}function qa(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0;l=c[b>>2]|0;n=c[b+4>>2]|0;k=c[b+8>>2]|0;f=c[b+12>>2]|0;u=c[b+16>>2]|0;t=c[b+20>>2]|0;g=c[b+24>>2]|0;v=c[b+28>>2]|0;s=c[b+32>>2]|0;q=c[b+36>>2]|0;cb=Kd(l|0,((l|0)<0)<<31>>31|0,l|0,((l|0)<0)<<31>>31|0)|0;bb=D;o=((l<<1|0)<0)<<31>>31;Ua=Kd(l<<1|0,o|0,n|0,((n|0)<0)<<31>>31|0)|0;Ta=D;Oa=Kd(k|0,((k|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Na=D;Ea=Kd(f|0,((f|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Da=D;sa=Kd(u|0,((u|0)<0)<<31>>31|0,l<<1|0,o|0)|0;ra=D;ia=Kd(t|0,((t|0)<0)<<31>>31|0,l<<1|0,o|0)|0;ha=D;_=Kd(g|0,((g|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Z=D;Q=Kd(v|0,((v|0)<0)<<31>>31|0,l<<1|0,o|0)|0;P=D;G=Kd(s|0,((s|0)<0)<<31>>31|0,l<<1|0,o|0)|0;F=D;o=Kd(q|0,((q|0)<0)<<31>>31|0,l<<1|0,o|0)|0;l=D;p=((n<<1|0)<0)<<31>>31;Ma=Kd(n<<1|0,p|0,n|0,((n|0)<0)<<31>>31|0)|0;La=D;Ca=Kd(n<<1|0,p|0,k|0,((k|0)<0)<<31>>31|0)|0;Ba=D;w=((f<<1|0)<0)<<31>>31;wa=Kd(f<<1|0,w|0,n<<1|0,p|0)|0;va=D;ma=Kd(u|0,((u|0)<0)<<31>>31|0,n<<1|0,p|0)|0;la=D;aa=Kd(t<<1|0,((t<<1|0)<0)<<31>>31|0,n<<1|0,p|0)|0;$=D;S=Kd(g|0,((g|0)<0)<<31>>31|0,n<<1|0,p|0)|0;R=D;I=Kd(v<<1|0,((v<<1|0)<0)<<31>>31|0,n<<1|0,p|0)|0;H=D;m=Kd(s|0,((s|0)<0)<<31>>31|0,n<<1|0,p|0)|0;r=D;b=((q*38|0)<0)<<31>>31;p=Kd(q*38|0,b|0,n<<1|0,p|0)|0;n=D;ua=Kd(k|0,((k|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;ta=D;ka=Kd(k<<1|0,((k<<1|0)<0)<<31>>31|0,f|0,((f|0)<0)<<31>>31|0)|0;ja=D;ca=Kd(u|0,((u|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;ba=D;W=Kd(t|0,((t|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;V=D;O=Kd(g|0,((g|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;N=D;z=Kd(v|0,((v|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;y=D;Y=((s*19|0)<0)<<31>>31;Ya=Kd(s*19|0,Y|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;Xa=D;k=Kd(q*38|0,b|0,k|0,((k|0)<0)<<31>>31|0)|0;j=D;ea=Kd(f<<1|0,w|0,f|0,((f|0)<0)<<31>>31|0)|0;da=D;U=Kd(f<<1|0,w|0,u|0,((u|0)<0)<<31>>31|0)|0;T=D;K=Kd(t<<1|0,((t<<1|0)<0)<<31>>31|0,f<<1|0,w|0)|0;J=D;E=Kd(g|0,((g|0)<0)<<31>>31|0,f<<1|0,w|0)|0;C=D;qa=((v*38|0)<0)<<31>>31;_a=Kd(v*38|0,qa|0,f<<1|0,w|0)|0;Za=D;Qa=Kd(s*19|0,Y|0,f<<1|0,w|0)|0;Pa=D;w=Kd(q*38|0,b|0,f<<1|0,w|0)|0;f=D;M=Kd(u|0,((u|0)<0)<<31>>31|0,u|0,((u|0)<0)<<31>>31|0)|0;L=D;B=Kd(u<<1|0,((u<<1|0)<0)<<31>>31|0,t|0,((t|0)<0)<<31>>31|0)|0;A=D;ab=Kd(g*19|0,((g*19|0)<0)<<31>>31|0,u<<1|0,((u<<1|0)<0)<<31>>31|0)|0;$a=D;Sa=Kd(v*38|0,qa|0,u|0,((u|0)<0)<<31>>31|0)|0;Ra=D;Ga=Kd(s*19|0,Y|0,u<<1|0,((u<<1|0)<0)<<31>>31|0)|0;Fa=D;u=Kd(q*38|0,b|0,u|0,((u|0)<0)<<31>>31|0)|0;e=D;eb=Kd(t*38|0,((t*38|0)<0)<<31>>31|0,t|0,((t|0)<0)<<31>>31|0)|0;db=D;Wa=Kd(g*19|0,((g*19|0)<0)<<31>>31|0,t<<1|0,((t<<1|0)<0)<<31>>31|0)|0;Va=D;Ia=Kd(v*38|0,qa|0,t<<1|0,((t<<1|0)<0)<<31>>31|0)|0;Ha=D;ya=Kd(s*19|0,Y|0,t<<1|0,((t<<1|0)<0)<<31>>31|0)|0;xa=D;t=Kd(q*38|0,b|0,t<<1|0,((t<<1|0)<0)<<31>>31|0)|0;d=D;Ka=Kd(g*19|0,((g*19|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;Ja=D;Aa=Kd(v*38|0,qa|0,g|0,((g|0)<0)<<31>>31|0)|0;za=D;oa=Kd(s*19|0,Y|0,g<<1|0,((g<<1|0)<0)<<31>>31|0)|0;na=D;g=Kd(q*38|0,b|0,g|0,((g|0)<0)<<31>>31|0)|0;x=D;qa=Kd(v*38|0,qa|0,v|0,((v|0)<0)<<31>>31|0)|0;pa=D;ga=Kd(s*19|0,Y|0,v<<1|0,((v<<1|0)<0)<<31>>31|0)|0;fa=D;v=Kd(q*38|0,b|0,v<<1|0,((v<<1|0)<0)<<31>>31|0)|0;i=D;Y=Kd(s*19|0,Y|0,s|0,((s|0)<0)<<31>>31|0)|0;X=D;s=Kd(q*38|0,b|0,s|0,((s|0)<0)<<31>>31|0)|0;h=D;q=Kd(q*38|0,b|0,q|0,((q|0)<0)<<31>>31|0)|0;b=D;bb=we(eb|0,db|0,cb|0,bb|0)|0;$a=we(bb|0,D|0,ab|0,$a|0)|0;Za=we($a|0,D|0,_a|0,Za|0)|0;Xa=we(Za|0,D|0,Ya|0,Xa|0)|0;n=we(Xa|0,D|0,p|0,n|0)|0;p=D;Ta=we(Wa|0,Va|0,Ua|0,Ta|0)|0;Ra=we(Ta|0,D|0,Sa|0,Ra|0)|0;Pa=we(Ra|0,D|0,Qa|0,Pa|0)|0;j=we(Pa|0,D|0,k|0,j|0)|0;k=D;La=we(Oa|0,Na|0,Ma|0,La|0)|0;Ja=we(La|0,D|0,Ka|0,Ja|0)|0;Ha=we(Ja|0,D|0,Ia|0,Ha|0)|0;Fa=we(Ha|0,D|0,Ga|0,Fa|0)|0;f=we(Fa|0,D|0,w|0,f|0)|0;w=D;Ba=we(Ea|0,Da|0,Ca|0,Ba|0)|0;za=we(Ba|0,D|0,Aa|0,za|0)|0;xa=we(za|0,D|0,ya|0,xa|0)|0;e=we(xa|0,D|0,u|0,e|0)|0;u=D;ta=we(wa|0,va|0,ua|0,ta|0)|0;ra=we(ta|0,D|0,sa|0,ra|0)|0;pa=we(ra|0,D|0,qa|0,pa|0)|0;na=we(pa|0,D|0,oa|0,na|0)|0;d=we(na|0,D|0,t|0,d|0)|0;t=D;ja=we(ma|0,la|0,ka|0,ja|0)|0;ha=we(ja|0,D|0,ia|0,ha|0)|0;fa=we(ha|0,D|0,ga|0,fa|0)|0;x=we(fa|0,D|0,g|0,x|0)|0;g=D;ba=we(ea|0,da|0,ca|0,ba|0)|0;$=we(ba|0,D|0,aa|0,$|0)|0;Z=we($|0,D|0,_|0,Z|0)|0;X=we(Z|0,D|0,Y|0,X|0)|0;i=we(X|0,D|0,v|0,i|0)|0;v=D;T=we(W|0,V|0,U|0,T|0)|0;R=we(T|0,D|0,S|0,R|0)|0;P=we(R|0,D|0,Q|0,P|0)|0;h=we(P|0,D|0,s|0,h|0)|0;s=D;L=we(O|0,N|0,M|0,L|0)|0;J=we(L|0,D|0,K|0,J|0)|0;H=we(J|0,D|0,I|0,H|0)|0;F=we(H|0,D|0,G|0,F|0)|0;b=we(F|0,D|0,q|0,b|0)|0;q=D;A=we(E|0,C|0,B|0,A|0)|0;y=we(A|0,D|0,z|0,y|0)|0;r=we(y|0,D|0,m|0,r|0)|0;l=we(r|0,D|0,o|0,l|0)|0;o=D;p=Wd(n|0,p|0,1)|0;n=D;k=Wd(j|0,k|0,1)|0;j=D;w=Wd(f|0,w|0,1)|0;f=D;u=Wd(e|0,u|0,1)|0;e=D;t=Wd(d|0,t|0,1)|0;d=D;g=Wd(x|0,g|0,1)|0;x=D;v=Wd(i|0,v|0,1)|0;i=D;s=Wd(h|0,s|0,1)|0;h=D;q=Wd(b|0,q|0,1)|0;b=D;o=Wd(l|0,o|0,1)|0;l=D;r=we(p|0,n|0,33554432,0)|0;r=Jd(r|0,D|0,26)|0;m=D;j=we(r|0,m|0,k|0,j|0)|0;k=D;m=Wd(r|0,m|0,26)|0;m=te(p|0,n|0,m|0,D|0)|0;n=D;p=we(t|0,d|0,33554432,0)|0;p=Jd(p|0,D|0,26)|0;r=D;x=we(p|0,r|0,g|0,x|0)|0;g=D;r=Wd(p|0,r|0,26)|0;r=te(t|0,d|0,r|0,D|0)|0;d=D;t=we(j|0,k|0,16777216,0)|0;t=Jd(t|0,D|0,25)|0;p=D;f=we(t|0,p|0,w|0,f|0)|0;w=D;p=Wd(t|0,p|0,25)|0;p=te(j|0,k|0,p|0,D|0)|0;k=D;j=we(x|0,g|0,16777216,0)|0;j=Jd(j|0,D|0,25)|0;t=D;i=we(j|0,t|0,v|0,i|0)|0;v=D;t=Wd(j|0,t|0,25)|0;t=te(x|0,g|0,t|0,D|0)|0;g=D;x=we(f|0,w|0,33554432,0)|0;x=Jd(x|0,D|0,26)|0;j=D;e=we(x|0,j|0,u|0,e|0)|0;u=D;j=Wd(x|0,j|0,26)|0;j=te(f|0,w|0,j|0,D|0)|0;w=we(i|0,v|0,33554432,0)|0;w=Jd(w|0,D|0,26)|0;f=D;h=we(w|0,f|0,s|0,h|0)|0;s=D;f=Wd(w|0,f|0,26)|0;f=te(i|0,v|0,f|0,D|0)|0;v=we(e|0,u|0,16777216,0)|0;v=Jd(v|0,D|0,25)|0;i=D;d=we(v|0,i|0,r|0,d|0)|0;r=D;i=Wd(v|0,i|0,25)|0;i=te(e|0,u|0,i|0,D|0)|0;u=we(h|0,s|0,16777216,0)|0;u=Jd(u|0,D|0,25)|0;e=D;b=we(u|0,e|0,q|0,b|0)|0;q=D;e=Wd(u|0,e|0,25)|0;e=te(h|0,s|0,e|0,D|0)|0;s=we(d|0,r|0,33554432,0)|0;s=Jd(s|0,D|0,26)|0;h=D;g=we(t|0,g|0,s|0,h|0)|0;h=Wd(s|0,h|0,26)|0;h=te(d|0,r|0,h|0,D|0)|0;r=we(b|0,q|0,33554432,0)|0;r=Jd(r|0,D|0,26)|0;d=D;l=we(r|0,d|0,o|0,l|0)|0;o=D;d=Wd(r|0,d|0,26)|0;d=te(b|0,q|0,d|0,D|0)|0;q=we(l|0,o|0,16777216,0)|0;q=Jd(q|0,D|0,25)|0;b=D;r=Kd(q|0,b|0,19,0)|0;n=we(r|0,D|0,m|0,n|0)|0;m=D;b=Wd(q|0,b|0,25)|0;b=te(l|0,o|0,b|0,D|0)|0;o=we(n|0,m|0,33554432,0)|0;o=Jd(o|0,D|0,26)|0;l=D;k=we(p|0,k|0,o|0,l|0)|0;l=Wd(o|0,l|0,26)|0;l=te(n|0,m|0,l|0,D|0)|0;c[a>>2]=l;c[a+4>>2]=k;c[a+8>>2]=j;c[a+12>>2]=i;c[a+16>>2]=h;c[a+20>>2]=g;c[a+24>>2]=f;c[a+28>>2]=e;c[a+32>>2]=d;c[a+36>>2]=b;return}function ra(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0;l=c[b>>2]|0;p=c[b+4>>2]|0;k=c[b+8>>2]|0;f=c[b+12>>2]|0;C=c[b+16>>2]|0;d=c[b+20>>2]|0;g=c[b+24>>2]|0;O=c[b+28>>2]|0;A=c[b+32>>2]|0;q=c[b+36>>2]|0;cb=Kd(l|0,((l|0)<0)<<31>>31|0,l|0,((l|0)<0)<<31>>31|0)|0;bb=D;o=((l<<1|0)<0)<<31>>31;Ia=Kd(l<<1|0,o|0,p|0,((p|0)<0)<<31>>31|0)|0;Ha=D;Wa=Kd(k|0,((k|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Va=D;Ua=Kd(f|0,((f|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Ta=D;Oa=Kd(C|0,((C|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Na=D;ya=Kd(d|0,((d|0)<0)<<31>>31|0,l<<1|0,o|0)|0;xa=D;ga=Kd(g|0,((g|0)<0)<<31>>31|0,l<<1|0,o|0)|0;fa=D;R=Kd(O|0,((O|0)<0)<<31>>31|0,l<<1|0,o|0)|0;Q=D;F=Kd(A|0,((A|0)<0)<<31>>31|0,l<<1|0,o|0)|0;E=D;o=Kd(q|0,((q|0)<0)<<31>>31|0,l<<1|0,o|0)|0;l=D;n=((p<<1|0)<0)<<31>>31;ta=Kd(p<<1|0,n|0,p|0,((p|0)<0)<<31>>31|0)|0;ua=D;ba=Kd(p<<1|0,n|0,k|0,((k|0)<0)<<31>>31|0)|0;ca=D;P=((f<<1|0)<0)<<31>>31;Sa=Kd(f<<1|0,P|0,p<<1|0,n|0)|0;Ra=D;Ca=Kd(C|0,((C|0)<0)<<31>>31|0,p<<1|0,n|0)|0;Ba=D;ia=Kd(d<<1|0,((d<<1|0)<0)<<31>>31|0,p<<1|0,n|0)|0;ha=D;T=Kd(g|0,((g|0)<0)<<31>>31|0,p<<1|0,n|0)|0;S=D;H=Kd(O<<1|0,((O<<1|0)<0)<<31>>31|0,p<<1|0,n|0)|0;G=D;t=Kd(A|0,((A|0)<0)<<31>>31|0,p<<1|0,n|0)|0;s=D;b=((q*38|0)<0)<<31>>31;n=Kd(q*38|0,b|0,p<<1|0,n|0)|0;p=D;Qa=Kd(k|0,((k|0)<0)<<31>>31|0,k|0,((k|0)<0)<<31>>31|0)|0;Pa=D;Aa=Kd(k<<1|0,((k<<1|0)<0)<<31>>31|0,f|0,((f|0)<0)<<31>>31|0)|0;za=D;ka=Kd(C|0,((C|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;ja=D;X=Kd(d|0,((d|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;W=D;N=Kd(g|0,((g|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;M=D;v=Kd(O|0,((O|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;u=D;ea=((A*19|0)<0)<<31>>31;Ya=Kd(A*19|0,ea|0,k<<1|0,((k<<1|0)<0)<<31>>31|0)|0;Xa=D;k=Kd(q*38|0,b|0,k|0,((k|0)<0)<<31>>31|0)|0;j=D;ma=Kd(f<<1|0,P|0,f|0,((f|0)<0)<<31>>31|0)|0;la=D;V=Kd(f<<1|0,P|0,C|0,((C|0)<0)<<31>>31|0)|0;U=D;J=Kd(d<<1|0,((d<<1|0)<0)<<31>>31|0,f<<1|0,P|0)|0;I=D;z=Kd(g|0,((g|0)<0)<<31>>31|0,f<<1|0,P|0)|0;y=D;Ma=((O*38|0)<0)<<31>>31;_a=Kd(O*38|0,Ma|0,f<<1|0,P|0)|0;Za=D;Ea=Kd(A*19|0,ea|0,f<<1|0,P|0)|0;Da=D;P=Kd(q*38|0,b|0,f<<1|0,P|0)|0;f=D;L=Kd(C|0,((C|0)<0)<<31>>31|0,C|0,((C|0)<0)<<31>>31|0)|0;K=D;x=Kd(C<<1|0,((C<<1|0)<0)<<31>>31|0,d|0,((d|0)<0)<<31>>31|0)|0;w=D;ab=Kd(g*19|0,((g*19|0)<0)<<31>>31|0,C<<1|0,((C<<1|0)<0)<<31>>31|0)|0;$a=D;Ga=Kd(O*38|0,Ma|0,C|0,((C|0)<0)<<31>>31|0)|0;Fa=D;oa=Kd(A*19|0,ea|0,C<<1|0,((C<<1|0)<0)<<31>>31|0)|0;na=D;C=Kd(q*38|0,b|0,C|0,((C|0)<0)<<31>>31|0)|0;e=D;eb=Kd(d*38|0,((d*38|0)<0)<<31>>31|0,d|0,((d|0)<0)<<31>>31|0)|0;db=D;Ka=Kd(g*19|0,((g*19|0)<0)<<31>>31|0,d<<1|0,((d<<1|0)<0)<<31>>31|0)|0;Ja=D;qa=Kd(O*38|0,Ma|0,d<<1|0,((d<<1|0)<0)<<31>>31|0)|0;pa=D;_=Kd(A*19|0,ea|0,d<<1|0,((d<<1|0)<0)<<31>>31|0)|0;Z=D;d=Kd(q*38|0,b|0,d<<1|0,((d<<1|0)<0)<<31>>31|0)|0;B=D;sa=Kd(g*19|0,((g*19|0)<0)<<31>>31|0,g|0,((g|0)<0)<<31>>31|0)|0;ra=D;aa=Kd(O*38|0,Ma|0,g|0,((g|0)<0)<<31>>31|0)|0;$=D;m=Kd(A*19|0,ea|0,g<<1|0,((g<<1|0)<0)<<31>>31|0)|0;r=D;g=Kd(q*38|0,b|0,g|0,((g|0)<0)<<31>>31|0)|0;Y=D;Ma=Kd(O*38|0,Ma|0,O|0,((O|0)<0)<<31>>31|0)|0;La=D;wa=Kd(A*19|0,ea|0,O<<1|0,((O<<1|0)<0)<<31>>31|0)|0;va=D;O=Kd(q*38|0,b|0,O<<1|0,((O<<1|0)<0)<<31>>31|0)|0;i=D;ea=Kd(A*19|0,ea|0,A|0,((A|0)<0)<<31>>31|0)|0;da=D;A=Kd(q*38|0,b|0,A|0,((A|0)<0)<<31>>31|0)|0;h=D;q=Kd(q*38|0,b|0,q|0,((q|0)<0)<<31>>31|0)|0;b=D;bb=we(eb|0,db|0,cb|0,bb|0)|0;$a=we(bb|0,D|0,ab|0,$a|0)|0;Za=we($a|0,D|0,_a|0,Za|0)|0;Xa=we(Za|0,D|0,Ya|0,Xa|0)|0;p=we(Xa|0,D|0,n|0,p|0)|0;n=D;ua=we(Wa|0,Va|0,ta|0,ua|0)|0;ta=D;ca=we(Ua|0,Ta|0,ba|0,ca|0)|0;ba=D;Pa=we(Sa|0,Ra|0,Qa|0,Pa|0)|0;Na=we(Pa|0,D|0,Oa|0,Na|0)|0;La=we(Na|0,D|0,Ma|0,La|0)|0;r=we(La|0,D|0,m|0,r|0)|0;B=we(r|0,D|0,d|0,B|0)|0;d=D;r=we(p|0,n|0,33554432,0)|0;r=Jd(r|0,D|0,26)|0;m=D;Ha=we(Ka|0,Ja|0,Ia|0,Ha|0)|0;Fa=we(Ha|0,D|0,Ga|0,Fa|0)|0;Da=we(Fa|0,D|0,Ea|0,Da|0)|0;j=we(Da|0,D|0,k|0,j|0)|0;j=we(j|0,D|0,r|0,m|0)|0;k=D;m=Wd(r|0,m|0,26)|0;m=te(p|0,n|0,m|0,D|0)|0;n=D;p=we(B|0,d|0,33554432,0)|0;p=Jd(p|0,D|0,26)|0;r=D;za=we(Ca|0,Ba|0,Aa|0,za|0)|0;xa=we(za|0,D|0,ya|0,xa|0)|0;va=we(xa|0,D|0,wa|0,va|0)|0;Y=we(va|0,D|0,g|0,Y|0)|0;Y=we(Y|0,D|0,p|0,r|0)|0;g=D;r=Wd(p|0,r|0,26)|0;r=te(B|0,d|0,r|0,D|0)|0;d=D;B=we(j|0,k|0,16777216,0)|0;B=Jd(B|0,D|0,25)|0;p=D;ra=we(ua|0,ta|0,sa|0,ra|0)|0;pa=we(ra|0,D|0,qa|0,pa|0)|0;na=we(pa|0,D|0,oa|0,na|0)|0;f=we(na|0,D|0,P|0,f|0)|0;f=we(f|0,D|0,B|0,p|0)|0;P=D;p=Wd(B|0,p|0,25)|0;p=te(j|0,k|0,p|0,D|0)|0;k=D;j=we(Y|0,g|0,16777216,0)|0;j=Jd(j|0,D|0,25)|0;B=D;ja=we(ma|0,la|0,ka|0,ja|0)|0;ha=we(ja|0,D|0,ia|0,ha|0)|0;fa=we(ha|0,D|0,ga|0,fa|0)|0;da=we(fa|0,D|0,ea|0,da|0)|0;i=we(da|0,D|0,O|0,i|0)|0;i=we(i|0,D|0,j|0,B|0)|0;O=D;B=Wd(j|0,B|0,25)|0;B=te(Y|0,g|0,B|0,D|0)|0;g=D;Y=we(f|0,P|0,33554432,0)|0;Y=Jd(Y|0,D|0,26)|0;j=D;$=we(ca|0,ba|0,aa|0,$|0)|0;Z=we($|0,D|0,_|0,Z|0)|0;e=we(Z|0,D|0,C|0,e|0)|0;e=we(e|0,D|0,Y|0,j|0)|0;C=D;j=Wd(Y|0,j|0,26)|0;j=te(f|0,P|0,j|0,D|0)|0;P=we(i|0,O|0,33554432,0)|0;P=Jd(P|0,D|0,26)|0;f=D;U=we(X|0,W|0,V|0,U|0)|0;S=we(U|0,D|0,T|0,S|0)|0;Q=we(S|0,D|0,R|0,Q|0)|0;h=we(Q|0,D|0,A|0,h|0)|0;h=we(h|0,D|0,P|0,f|0)|0;A=D;f=Wd(P|0,f|0,26)|0;f=te(i|0,O|0,f|0,D|0)|0;O=we(e|0,C|0,16777216,0)|0;O=Jd(O|0,D|0,25)|0;i=D;d=we(O|0,i|0,r|0,d|0)|0;r=D;i=Wd(O|0,i|0,25)|0;i=te(e|0,C|0,i|0,D|0)|0;C=we(h|0,A|0,16777216,0)|0;C=Jd(C|0,D|0,25)|0;e=D;K=we(N|0,M|0,L|0,K|0)|0;I=we(K|0,D|0,J|0,I|0)|0;G=we(I|0,D|0,H|0,G|0)|0;E=we(G|0,D|0,F|0,E|0)|0;b=we(E|0,D|0,q|0,b|0)|0;b=we(b|0,D|0,C|0,e|0)|0;q=D;e=Wd(C|0,e|0,25)|0;e=te(h|0,A|0,e|0,D|0)|0;A=we(d|0,r|0,33554432,0)|0;A=Jd(A|0,D|0,26)|0;h=D;g=we(B|0,g|0,A|0,h|0)|0;h=Wd(A|0,h|0,26)|0;h=te(d|0,r|0,h|0,D|0)|0;r=we(b|0,q|0,33554432,0)|0;r=Jd(r|0,D|0,26)|0;d=D;w=we(z|0,y|0,x|0,w|0)|0;u=we(w|0,D|0,v|0,u|0)|0;s=we(u|0,D|0,t|0,s|0)|0;l=we(s|0,D|0,o|0,l|0)|0;l=we(l|0,D|0,r|0,d|0)|0;o=D;d=Wd(r|0,d|0,26)|0;d=te(b|0,q|0,d|0,D|0)|0;q=we(l|0,o|0,16777216,0)|0;q=Jd(q|0,D|0,25)|0;b=D;r=Kd(q|0,b|0,19,0)|0;n=we(r|0,D|0,m|0,n|0)|0;m=D;b=Wd(q|0,b|0,25)|0;b=te(l|0,o|0,b|0,D|0)|0;o=we(n|0,m|0,33554432,0)|0;o=Jd(o|0,D|0,26)|0;l=D;k=we(p|0,k|0,o|0,l|0)|0;l=Wd(o|0,l|0,26)|0;l=te(n|0,m|0,l|0,D|0)|0;c[a>>2]=l;c[a+4>>2]=k;c[a+8>>2]=j;c[a+12>>2]=i;c[a+16>>2]=h;c[a+20>>2]=g;c[a+24>>2]=f;c[a+28>>2]=e;c[a+32>>2]=d;c[a+36>>2]=b;return}function sa(b,c,e,f,g){b=b|0;c=c|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;n=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;p=d[g+4>>0]|d[g+4+1>>0]<<8|d[g+4+2>>0]<<16|d[g+4+3>>0]<<24;h=d[g+8>>0]|d[g+8+1>>0]<<8|d[g+8+2>>0]<<16|d[g+8+3>>0]<<24;i=d[g+8+4>>0]|d[g+8+4+1>>0]<<8|d[g+8+4+2>>0]<<16|d[g+8+4+3>>0]<<24;f=Wd(e|0,f|0,56)|0;g=D;if((c+e+(0-(e&7))|0)==(c|0)){o=h^2037671283;l=i^1952801890;m=n^1886610805;k=p^1936682341;j=h^1852075885;s=i^1685025377;i=n^1852142177;h=p^1819895653}else{u=c;r=h^2037671283;l=i^1952801890;o=n^1886610805;m=p^1936682341;k=h^1852075885;j=i^1685025377;i=n^1852142177;h=p^1819895653;while(1){v=u;t=d[v>>0]|d[v+1>>0]<<8|d[v+2>>0]<<16|d[v+3>>0]<<24;v=d[v+4>>0]|d[v+4+1>>0]<<8|d[v+4+2>>0]<<16|d[v+4+3>>0]<<24;r=t^r;x=v^l;m=we(o|0,m|0,k|0,j|0)|0;n=D;o=Wd(k|0,j|0,13)|0;p=D;q=Yd(k|0,j|0,51)|0;k=(D|p)^n;h=we(r|0,x|0,i|0,h|0)|0;i=D;p=Wd(r|0,x|0,16)|0;l=D;x=Yd(r|0,x|0,48)|0;l=(D|l)^i;n=we((x|p)^h|0,l|0,n|0,m|0)|0;r=D;j=Wd((x|p)^h|0,l|0,21)|0;s=D;l=Yd((x|p)^h|0,l|0,43)|0;s=(D|s)^r;i=we(h|0,i|0,(q|o)^m|0,k|0)|0;h=D;p=Wd((q|o)^m|0,k|0,17)|0;x=D;k=Yd((q|o)^m|0,k|0,47)|0;x=h^(D|x);r=we(n|0,r|0,i^(k|p)|0,x|0)|0;m=D;o=Wd(i^(k|p)|0,x|0,13)|0;q=D;x=Yd(i^(k|p)|0,x|0,51)|0;q=(D|q)^m;i=we((l|j)^n|0,s|0,h|0,i|0)|0;h=D;p=Wd((l|j)^n|0,s|0,16)|0;k=D;s=Yd((l|j)^n|0,s|0,48)|0;k=(D|k)^h;m=we((s|p)^i|0,k|0,m|0,r|0)|0;n=D;j=Wd((s|p)^i|0,k|0,21)|0;l=D;k=Yd((s|p)^i|0,k|0,43)|0;l=(D|l)^n;h=we(i|0,h|0,(x|o)^r|0,q|0)|0;i=D;p=Wd((x|o)^r|0,q|0,17)|0;s=D;q=Yd((x|o)^r|0,q|0,47)|0;s=(D|s)^i;u=u+8|0;if((u|0)==(c+e+(0-(e&7))|0)){c=c+e+(0-(e&7))|0;o=(k|j)^m;m=m^t;k=n^v;j=(q|p)^h;break}else{r=(k|j)^m;o=m^t;m=n^v;k=(q|p)^h;j=s}}}switch(e&7){case 7:{f=Wd(d[c+6>>0]|0|0,0,48)|0|f;g=D|g;w=5;break}case 6:{w=5;break}case 5:{w=6;break}case 4:{w=7;break}case 3:{w=8;break}case 2:{w=9;break}case 1:{w=10;break}default:{}}if((w|0)==5){x=Wd(d[c+5>>0]|0|0,0,40)|0;g=D|g;f=x|f;w=6}if((w|0)==6){g=d[c+4>>0]|0|g;w=7}if((w|0)==7){x=Wd(d[c+3>>0]|0|0,0,24)|0;f=x|f;g=D|g;w=8}if((w|0)==8){x=Wd(d[c+2>>0]|0|0,0,16)|0;f=x|f;g=D|g;w=9}if((w|0)==9){x=Wd(d[c+1>>0]|0|0,0,8)|0;f=x|f;g=D|g;w=10}if((w|0)==10)f=d[c>>0]|0|f;x=f^o;t=g^l;w=we(m|0,k|0,j|0,s|0)|0;o=D;r=Wd(j|0,s|0,13)|0;u=D;p=Yd(j|0,s|0,51)|0;u=(D|u)^o;v=we(x|0,t|0,i|0,h|0)|0;c=D;e=Wd(x|0,t|0,16)|0;n=D;s=Yd(x|0,t|0,48)|0;n=(D|n)^c;o=we((s|e)^v|0,n|0,o|0,w|0)|0;t=D;x=Wd((s|e)^v|0,n|0,21)|0;q=D;n=Yd((s|e)^v|0,n|0,43)|0;q=(D|q)^t;c=we(v|0,c|0,(p|r)^w|0,u|0)|0;v=D;e=Wd((p|r)^w|0,u|0,17)|0;s=D;u=Yd((p|r)^w|0,u|0,47)|0;s=v^(D|s);t=we(o|0,t|0,c^(u|e)|0,s|0)|0;w=D;r=Wd(c^(u|e)|0,s|0,13)|0;p=D;s=Yd(c^(u|e)|0,s|0,51)|0;p=(D|p)^w;c=we((n|x)^o|0,q|0,v|0,c|0)|0;v=D;e=Wd((n|x)^o|0,q|0,16)|0;u=D;q=Yd((n|x)^o|0,q|0,48)|0;u=(D|u)^v;w=we((q|e)^c|0,u|0,w|0,t|0)|0;o=D;x=Wd((q|e)^c|0,u|0,21)|0;n=D;u=Yd((q|e)^c|0,u|0,43)|0;n=(D|n)^o;v=we(c|0,v|0,(s|r)^t|0,p|0)|0;c=D;e=Wd((s|r)^t|0,p|0,17)|0;q=D;p=Yd((s|r)^t|0,p|0,47)|0;q=(D|q)^c;o=we(w^f|0,o^g|0,(p|e)^v|0,q|0)|0;t=D;r=Wd((p|e)^v|0,q|0,13)|0;s=D;q=Yd((p|e)^v|0,q|0,51)|0;s=t^(D|s);v=we((u|x)^w|0,n|0,c^255|0,v|0)|0;c=D;e=Wd((u|x)^w|0,n|0,16)|0;p=D;n=Yd((u|x)^w|0,n|0,48)|0;p=(D|p)^c;t=we((n|e)^v|0,p|0,t|0,o|0)|0;w=D;x=Wd((n|e)^v|0,p|0,21)|0;u=D;p=Yd((n|e)^v|0,p|0,43)|0;u=(D|u)^w;c=we(v|0,c|0,o^(q|r)|0,s|0)|0;v=D;e=Wd(o^(q|r)|0,s|0,17)|0;n=D;s=Yd(o^(q|r)|0,s|0,47)|0;n=(D|n)^v;w=we(t|0,w|0,(s|e)^c|0,n|0)|0;r=D;q=Wd((s|e)^c|0,n|0,13)|0;o=D;n=Yd((s|e)^c|0,n|0,51)|0;o=(D|o)^r;c=we((p|x)^t|0,u|0,v|0,c|0)|0;v=D;e=Wd((p|x)^t|0,u|0,16)|0;s=D;u=Yd((p|x)^t|0,u|0,48)|0;s=(D|s)^v;r=we((u|e)^c|0,s|0,r|0,w|0)|0;t=D;x=Wd((u|e)^c|0,s|0,21)|0;p=D;s=Yd((u|e)^c|0,s|0,43)|0;p=(D|p)^t;v=we(c|0,v|0,(n|q)^w|0,o|0)|0;c=D;e=Wd((n|q)^w|0,o|0,17)|0;u=D;o=Yd((n|q)^w|0,o|0,47)|0;u=(D|u)^c;t=we(r|0,t|0,(o|e)^v|0,u|0)|0;w=D;q=Wd((o|e)^v|0,u|0,13)|0;n=D;u=Yd((o|e)^v|0,u|0,51)|0;n=(D|n)^w;v=we((s|x)^r|0,p|0,c|0,v|0)|0;c=D;e=Wd((s|x)^r|0,p|0,16)|0;o=D;p=Yd((s|x)^r|0,p|0,48)|0;o=(D|o)^c;w=we((p|e)^v|0,o|0,w|0,t|0)|0;r=D;x=Wd((p|e)^v|0,o|0,21)|0;s=D;o=Yd((p|e)^v|0,o|0,43)|0;s=(D|s)^r;c=we(v|0,c|0,(u|q)^t|0,n|0)|0;v=D;e=Wd((u|q)^t|0,n|0,17)|0;p=D;n=Yd((u|q)^t|0,n|0,47)|0;p=(D|p)^v;r=we(w|0,r|0,(n|e)^c|0,p|0)|0;t=D;q=Wd((n|e)^c|0,p|0,13)|0;u=D;p=Yd((n|e)^c|0,p|0,51)|0;t=(D|u)^t;c=we((o|x)^w|0,s|0,v|0,c|0)|0;v=D;u=Wd((o|x)^w|0,s|0,16)|0;e=D;s=Yd((o|x)^w|0,s|0,48)|0;e=(D|e)^v;w=Wd((s|u)^c|0,e|0,21)|0;x=D;e=Yd((s|u)^c|0,e|0,43)|0;x=D|x;v=we(c|0,v|0,(p|q)^r|0,t|0)|0;c=D;u=Wd((p|q)^r|0,t|0,17)|0;s=D;t=Yd((p|q)^r|0,t|0,47)|0;x=(D|s)^c^v^x;a[b>>0]=(t|u)^v^c^(e|w);a[b+1>>0]=((t|u)^v^c^(e|w))>>8;a[b+2>>0]=((t|u)^v^c^(e|w))>>16;a[b+3>>0]=((t|u)^v^c^(e|w))>>24;a[b+4>>0]=x;a[b+4+1>>0]=x>>8;a[b+4+2>>0]=x>>16;a[b+4+3>>0]=x>>24;return 0}function ta(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;if(!a)return;h=c[8723]|0;if((a+-8|0)>>>0<h>>>0)ba();b=c[a+-4>>2]|0;if((b&3|0)==1)ba();n=a+-8+(b&-8)|0;do if(!(b&1)){e=c[a+-8>>2]|0;if(!(b&3))return;k=a+-8+(0-e)|0;j=e+(b&-8)|0;if(k>>>0<h>>>0)ba();if((k|0)==(c[8724]|0)){a=c[n+4>>2]|0;if((a&3|0)!=3){q=k;f=j;break}c[8721]=j;c[n+4>>2]=a&-2;c[k+4>>2]=j|1;c[k+j>>2]=j;return}if(e>>>0<256){a=c[k+8>>2]|0;b=c[k+12>>2]|0;if((a|0)!=(34916+(e>>>3<<1<<2)|0)){if(a>>>0<h>>>0)ba();if((c[a+12>>2]|0)!=(k|0))ba()}if((b|0)==(a|0)){c[8719]=c[8719]&~(1<<(e>>>3));q=k;f=j;break}if((b|0)!=(34916+(e>>>3<<1<<2)|0)){if(b>>>0<h>>>0)ba();if((c[b+8>>2]|0)!=(k|0))ba();else d=b+8|0}else d=b+8|0;c[a+12>>2]=b;c[d>>2]=a;q=k;f=j;break}g=c[k+24>>2]|0;a=c[k+12>>2]|0;do if((a|0)==(k|0)){a=c[k+16+4>>2]|0;if(!a){a=c[k+16>>2]|0;if(!a){i=0;break}else e=k+16|0}else e=k+16+4|0;while(1){b=a+20|0;d=c[b>>2]|0;if(d|0){a=d;e=b;continue}b=a+16|0;d=c[b>>2]|0;if(!d)break;else{a=d;e=b}}if(e>>>0<h>>>0)ba();else{c[e>>2]=0;i=a;break}}else{b=c[k+8>>2]|0;if(b>>>0<h>>>0)ba();if((c[b+12>>2]|0)!=(k|0))ba();if((c[a+8>>2]|0)==(k|0)){c[b+12>>2]=a;c[a+8>>2]=b;i=a;break}else ba()}while(0);if(g){a=c[k+28>>2]|0;if((k|0)==(c[35180+(a<<2)>>2]|0)){c[35180+(a<<2)>>2]=i;if(!i){c[8720]=c[8720]&~(1<<a);q=k;f=j;break}}else{if(g>>>0<(c[8723]|0)>>>0)ba();if((c[g+16>>2]|0)==(k|0))c[g+16>>2]=i;else c[g+20>>2]=i;if(!i){q=k;f=j;break}}b=c[8723]|0;if(i>>>0<b>>>0)ba();c[i+24>>2]=g;a=c[k+16>>2]|0;do if(a|0)if(a>>>0<b>>>0)ba();else{c[i+16>>2]=a;c[a+24>>2]=i;break}while(0);a=c[k+16+4>>2]|0;if(a)if(a>>>0<(c[8723]|0)>>>0)ba();else{c[i+20>>2]=a;c[a+24>>2]=i;q=k;f=j;break}else{q=k;f=j}}else{q=k;f=j}}else{q=a+-8|0;f=b&-8}while(0);if(q>>>0>=n>>>0)ba();d=c[n+4>>2]|0;if(!(d&1))ba();if(!(d&2)){if((n|0)==(c[8725]|0)){p=(c[8722]|0)+f|0;c[8722]=p;c[8725]=q;c[q+4>>2]=p|1;if((q|0)!=(c[8724]|0))return;c[8724]=0;c[8721]=0;return}if((n|0)==(c[8724]|0)){p=(c[8721]|0)+f|0;c[8721]=p;c[8724]=q;c[q+4>>2]=p|1;c[q+p>>2]=p;return}f=(d&-8)+f|0;do if(d>>>0>=256){g=c[n+24>>2]|0;a=c[n+12>>2]|0;do if((a|0)==(n|0)){a=c[n+16+4>>2]|0;if(!a){a=c[n+16>>2]|0;if(!a){m=0;break}else e=n+16|0}else e=n+16+4|0;while(1){b=a+20|0;d=c[b>>2]|0;if(d|0){a=d;e=b;continue}b=a+16|0;d=c[b>>2]|0;if(!d)break;else{a=d;e=b}}if(e>>>0<(c[8723]|0)>>>0)ba();else{c[e>>2]=0;m=a;break}}else{b=c[n+8>>2]|0;if(b>>>0<(c[8723]|0)>>>0)ba();if((c[b+12>>2]|0)!=(n|0))ba();if((c[a+8>>2]|0)==(n|0)){c[b+12>>2]=a;c[a+8>>2]=b;m=a;break}else ba()}while(0);if(g|0){a=c[n+28>>2]|0;if((n|0)==(c[35180+(a<<2)>>2]|0)){c[35180+(a<<2)>>2]=m;if(!m){c[8720]=c[8720]&~(1<<a);break}}else{if(g>>>0<(c[8723]|0)>>>0)ba();if((c[g+16>>2]|0)==(n|0))c[g+16>>2]=m;else c[g+20>>2]=m;if(!m)break}b=c[8723]|0;if(m>>>0<b>>>0)ba();c[m+24>>2]=g;a=c[n+16>>2]|0;do if(a|0)if(a>>>0<b>>>0)ba();else{c[m+16>>2]=a;c[a+24>>2]=m;break}while(0);a=c[n+16+4>>2]|0;if(a|0)if(a>>>0<(c[8723]|0)>>>0)ba();else{c[m+20>>2]=a;c[a+24>>2]=m;break}}}else{a=c[n+8>>2]|0;b=c[n+12>>2]|0;if((a|0)!=(34916+(d>>>3<<1<<2)|0)){if(a>>>0<(c[8723]|0)>>>0)ba();if((c[a+12>>2]|0)!=(n|0))ba()}if((b|0)==(a|0)){c[8719]=c[8719]&~(1<<(d>>>3));break}if((b|0)!=(34916+(d>>>3<<1<<2)|0)){if(b>>>0<(c[8723]|0)>>>0)ba();if((c[b+8>>2]|0)!=(n|0))ba();else l=b+8|0}else l=b+8|0;c[a+12>>2]=b;c[l>>2]=a}while(0);c[q+4>>2]=f|1;c[q+f>>2]=f;if((q|0)==(c[8724]|0)){c[8721]=f;return}}else{c[n+4>>2]=d&-2;c[q+4>>2]=f|1;c[q+f>>2]=f}b=f>>>3;if(f>>>0<256){a=c[8719]|0;if(a&1<<b){a=c[34916+(b<<1<<2)+8>>2]|0;if(a>>>0<(c[8723]|0)>>>0)ba();else{o=a;p=34916+(b<<1<<2)+8|0}}else{c[8719]=a|1<<b;o=34916+(b<<1<<2)|0;p=34916+(b<<1<<2)+8|0}c[p>>2]=q;c[o+12>>2]=q;c[q+8>>2]=o;c[q+12>>2]=34916+(b<<1<<2);return}a=f>>>8;if(a)if(f>>>0>16777215)a=31;else{p=a<<((a+1048320|0)>>>16&8)<<(((a<<((a+1048320|0)>>>16&8))+520192|0)>>>16&4);a=14-(((a<<((a+1048320|0)>>>16&8))+520192|0)>>>16&4|(a+1048320|0)>>>16&8|(p+245760|0)>>>16&2)+(p<<((p+245760|0)>>>16&2)>>>15)|0;a=f>>>(a+7|0)&1|a<<1}else a=0;e=35180+(a<<2)|0;c[q+28>>2]=a;c[q+20>>2]=0;c[q+16>>2]=0;b=c[8720]|0;d=1<<a;do if(b&d){b=f<<((a|0)==31?0:25-(a>>>1)|0);e=c[e>>2]|0;while(1){if((c[e+4>>2]&-8|0)==(f|0)){a=130;break}d=e+16+(b>>>31<<2)|0;a=c[d>>2]|0;if(!a){a=127;break}else{b=b<<1;e=a}}if((a|0)==127)if(d>>>0<(c[8723]|0)>>>0)ba();else{c[d>>2]=q;c[q+24>>2]=e;c[q+12>>2]=q;c[q+8>>2]=q;break}else if((a|0)==130){a=e+8|0;b=c[a>>2]|0;p=c[8723]|0;if(b>>>0>=p>>>0&e>>>0>=p>>>0){c[b+12>>2]=q;c[a>>2]=q;c[q+8>>2]=b;c[q+12>>2]=e;c[q+24>>2]=0;break}else ba()}}else{c[8720]=b|d;c[e>>2]=q;c[q+24>>2]=e;c[q+12>>2]=q;c[q+8>>2]=q}while(0);q=(c[8727]|0)+-1|0;c[8727]=q;if(!q)a=35332;else return;while(1){a=c[a>>2]|0;if(!a)break;else a=a+8|0}c[8727]=-1;return}function ua(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=c[a+4>>2]|0;do if(!(d&1)){l=c[a>>2]|0;if(!(d&3))return;j=c[8723]|0;if((a+(0-l)|0)>>>0<j>>>0)ba();if((a+(0-l)|0)==(c[8724]|0)){d=c[a+b+4>>2]|0;if((d&3|0)!=3){q=a+(0-l)|0;h=l+b|0;break}c[8721]=l+b;c[a+b+4>>2]=d&-2;c[a+(0-l)+4>>2]=l+b|1;c[a+(0-l)+(l+b)>>2]=l+b;return}if(l>>>0<256){d=c[a+(0-l)+8>>2]|0;e=c[a+(0-l)+12>>2]|0;if((d|0)!=(34916+(l>>>3<<1<<2)|0)){if(d>>>0<j>>>0)ba();if((c[d+12>>2]|0)!=(a+(0-l)|0))ba()}if((e|0)==(d|0)){c[8719]=c[8719]&~(1<<(l>>>3));q=a+(0-l)|0;h=l+b|0;break}if((e|0)!=(34916+(l>>>3<<1<<2)|0)){if(e>>>0<j>>>0)ba();if((c[e+8>>2]|0)!=(a+(0-l)|0))ba();else f=e+8|0}else f=e+8|0;c[d+12>>2]=e;c[f>>2]=d;q=a+(0-l)|0;h=l+b|0;break}i=c[a+(0-l)+24>>2]|0;d=c[a+(0-l)+12>>2]|0;do if((d|0)==(a+(0-l)|0)){e=a+(0-l)+16|0;d=c[e+4>>2]|0;if(!d){d=c[e>>2]|0;if(!d){k=0;break}}else e=e+4|0;while(1){f=d+20|0;g=c[f>>2]|0;if(g|0){d=g;e=f;continue}f=d+16|0;g=c[f>>2]|0;if(!g)break;else{d=g;e=f}}if(e>>>0<j>>>0)ba();else{c[e>>2]=0;k=d;break}}else{e=c[a+(0-l)+8>>2]|0;if(e>>>0<j>>>0)ba();if((c[e+12>>2]|0)!=(a+(0-l)|0))ba();if((c[d+8>>2]|0)==(a+(0-l)|0)){c[e+12>>2]=d;c[d+8>>2]=e;k=d;break}else ba()}while(0);if(i){d=c[a+(0-l)+28>>2]|0;if((a+(0-l)|0)==(c[35180+(d<<2)>>2]|0)){c[35180+(d<<2)>>2]=k;if(!k){c[8720]=c[8720]&~(1<<d);q=a+(0-l)|0;h=l+b|0;break}}else{if(i>>>0<(c[8723]|0)>>>0)ba();if((c[i+16>>2]|0)==(a+(0-l)|0))c[i+16>>2]=k;else c[i+20>>2]=k;if(!k){q=a+(0-l)|0;h=l+b|0;break}}e=c[8723]|0;if(k>>>0<e>>>0)ba();c[k+24>>2]=i;d=c[a+(0-l)+16>>2]|0;do if(d|0)if(d>>>0<e>>>0)ba();else{c[k+16>>2]=d;c[d+24>>2]=k;break}while(0);d=c[a+(0-l)+16+4>>2]|0;if(d)if(d>>>0<(c[8723]|0)>>>0)ba();else{c[k+20>>2]=d;c[d+24>>2]=k;q=a+(0-l)|0;h=l+b|0;break}else{q=a+(0-l)|0;h=l+b|0}}else{q=a+(0-l)|0;h=l+b|0}}else{q=a;h=b}while(0);j=c[8723]|0;if((a+b|0)>>>0<j>>>0)ba();f=c[a+b+4>>2]|0;if(!(f&2)){if((a+b|0)==(c[8725]|0)){p=(c[8722]|0)+h|0;c[8722]=p;c[8725]=q;c[q+4>>2]=p|1;if((q|0)!=(c[8724]|0))return;c[8724]=0;c[8721]=0;return}if((a+b|0)==(c[8724]|0)){p=(c[8721]|0)+h|0;c[8721]=p;c[8724]=q;c[q+4>>2]=p|1;c[q+p>>2]=p;return}h=(f&-8)+h|0;do if(f>>>0>=256){i=c[a+b+24>>2]|0;d=c[a+b+12>>2]|0;do if((d|0)==(a+b|0)){d=c[a+b+16+4>>2]|0;if(!d){d=c[a+b+16>>2]|0;if(!d){n=0;break}else g=a+b+16|0}else g=a+b+16+4|0;while(1){e=d+20|0;f=c[e>>2]|0;if(f|0){d=f;g=e;continue}e=d+16|0;f=c[e>>2]|0;if(!f)break;else{d=f;g=e}}if(g>>>0<j>>>0)ba();else{c[g>>2]=0;n=d;break}}else{e=c[a+b+8>>2]|0;if(e>>>0<j>>>0)ba();if((c[e+12>>2]|0)!=(a+b|0))ba();if((c[d+8>>2]|0)==(a+b|0)){c[e+12>>2]=d;c[d+8>>2]=e;n=d;break}else ba()}while(0);if(i|0){d=c[a+b+28>>2]|0;if((a+b|0)==(c[35180+(d<<2)>>2]|0)){c[35180+(d<<2)>>2]=n;if(!n){c[8720]=c[8720]&~(1<<d);break}}else{if(i>>>0<(c[8723]|0)>>>0)ba();if((c[i+16>>2]|0)==(a+b|0))c[i+16>>2]=n;else c[i+20>>2]=n;if(!n)break}e=c[8723]|0;if(n>>>0<e>>>0)ba();c[n+24>>2]=i;d=c[a+b+16>>2]|0;do if(d|0)if(d>>>0<e>>>0)ba();else{c[n+16>>2]=d;c[d+24>>2]=n;break}while(0);d=c[a+b+16+4>>2]|0;if(d|0)if(d>>>0<(c[8723]|0)>>>0)ba();else{c[n+20>>2]=d;c[d+24>>2]=n;break}}}else{d=c[a+b+8>>2]|0;e=c[a+b+12>>2]|0;if((d|0)!=(34916+(f>>>3<<1<<2)|0)){if(d>>>0<j>>>0)ba();if((c[d+12>>2]|0)!=(a+b|0))ba()}if((e|0)==(d|0)){c[8719]=c[8719]&~(1<<(f>>>3));break}if((e|0)!=(34916+(f>>>3<<1<<2)|0)){if(e>>>0<j>>>0)ba();if((c[e+8>>2]|0)!=(a+b|0))ba();else m=e+8|0}else m=e+8|0;c[d+12>>2]=e;c[m>>2]=d}while(0);c[q+4>>2]=h|1;c[q+h>>2]=h;if((q|0)==(c[8724]|0)){c[8721]=h;return}}else{c[a+b+4>>2]=f&-2;c[q+4>>2]=h|1;c[q+h>>2]=h}e=h>>>3;if(h>>>0<256){d=c[8719]|0;if(d&1<<e){d=c[34916+(e<<1<<2)+8>>2]|0;if(d>>>0<(c[8723]|0)>>>0)ba();else{o=d;p=34916+(e<<1<<2)+8|0}}else{c[8719]=d|1<<e;o=34916+(e<<1<<2)|0;p=34916+(e<<1<<2)+8|0}c[p>>2]=q;c[o+12>>2]=q;c[q+8>>2]=o;c[q+12>>2]=34916+(e<<1<<2);return}d=h>>>8;if(d)if(h>>>0>16777215)d=31;else{p=d<<((d+1048320|0)>>>16&8)<<(((d<<((d+1048320|0)>>>16&8))+520192|0)>>>16&4);d=14-(((d<<((d+1048320|0)>>>16&8))+520192|0)>>>16&4|(d+1048320|0)>>>16&8|(p+245760|0)>>>16&2)+(p<<((p+245760|0)>>>16&2)>>>15)|0;d=h>>>(d+7|0)&1|d<<1}else d=0;g=35180+(d<<2)|0;c[q+28>>2]=d;c[q+20>>2]=0;c[q+16>>2]=0;e=c[8720]|0;f=1<<d;if(!(e&f)){c[8720]=e|f;c[g>>2]=q;c[q+24>>2]=g;c[q+12>>2]=q;c[q+8>>2]=q;return}e=h<<((d|0)==31?0:25-(d>>>1)|0);g=c[g>>2]|0;while(1){if((c[g+4>>2]&-8|0)==(h|0)){d=127;break}f=g+16+(e>>>31<<2)|0;d=c[f>>2]|0;if(!d){d=124;break}else{e=e<<1;g=d}}if((d|0)==124){if(f>>>0<(c[8723]|0)>>>0)ba();c[f>>2]=q;c[q+24>>2]=g;c[q+12>>2]=q;c[q+8>>2]=q;return}else if((d|0)==127){d=g+8|0;e=c[d>>2]|0;p=c[8723]|0;if(!(e>>>0>=p>>>0&g>>>0>=p>>>0))ba();c[e+12>>2]=q;c[d>>2]=q;c[q+8>>2]=e;c[q+12>>2]=g;c[q+24>>2]=0;return}}function va(b,e,f,g,h){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0;V=i;U=i=i+63&-64;i=i+64|0;if(!((g|0)==0&(h|0)==0)){if(h>>>0>63|(h|0)==63&g>>>0>4294967232)ba();G=c[b>>2]|0;H=c[b+4>>2]|0;I=c[b+8>>2]|0;J=c[b+12>>2]|0;K=c[b+16>>2]|0;L=c[b+20>>2]|0;M=c[b+24>>2]|0;N=c[b+28>>2]|0;O=c[b+32>>2]|0;P=c[b+36>>2]|0;Q=c[b+40>>2]|0;R=c[b+44>>2]|0;S=c[b+56>>2]|0;T=c[b+60>>2]|0;j=0;C=c[b+52>>2]|0;A=c[b+48>>2]|0;E=h;F=g;while(1){B=E>>>0<0|(E|0)==0&F>>>0<64;if(B){h=U;g=h+64|0;do{a[h>>0]=0;h=h+1|0}while((h|0)<(g|0));h=0;do{a[U+h>>0]=a[e+h>>0]|0;h=h+1|0}while(0<E>>>0|0==(E|0)&h>>>0<F>>>0);j=f;e=U;f=U}h=G;k=H;l=I;m=J;n=K;o=L;p=M;q=N;r=O;s=P;t=Q;u=T;v=S;w=C;x=A;y=R;g=20;do{na=h+n|0;ca=na^x;aa=(ca>>>16|ca<<16)+r|0;ma=aa^n;ca=(ma>>>20|ma<<12)+na^(ca>>>16|ca<<16);z=(ca>>>24|ca<<8)+aa^(ma>>>20|ma<<12);ja=k+o|0;X=ja^w;W=(X>>>16|X<<16)+s|0;ia=W^o;X=(ia>>>20|ia<<12)+ja^(X>>>16|X<<16);ka=(X>>>24|X<<8)+W^(ia>>>20|ia<<12);ea=l+p|0;Y=ea^v;la=(Y>>>16|Y<<16)+t|0;da=la^p;Y=(da>>>20|da<<12)+ea^(Y>>>16|Y<<16);fa=(Y>>>24|Y<<8)+la^(da>>>20|da<<12);Z=m+q|0;ha=Z^u;ga=(ha>>>16|ha<<16)+y|0;_=ga^q;ha=(_>>>20|_<<12)+Z^(ha>>>16|ha<<16);$=(ha>>>24|ha<<8)+ga^(_>>>20|_<<12);na=(ka>>>25|ka<<7)+((ma>>>20|ma<<12)+na)|0;ma=(na^(ha>>>24|ha<<8))>>>16|(na^(ha>>>24|ha<<8))<<16;ka=ma+((Y>>>24|Y<<8)+la)^(ka>>>25|ka<<7);h=(ka>>>20|ka<<12)+na|0;na=h^ma;u=na>>>24|na<<8;t=u+(ma+((Y>>>24|Y<<8)+la))|0;ka=t^(ka>>>20|ka<<12);o=ka>>>25|ka<<7;ja=(fa>>>25|fa<<7)+((ia>>>20|ia<<12)+ja)|0;ia=(ja^(ca>>>24|ca<<8))>>>16|(ja^(ca>>>24|ca<<8))<<16;fa=ia+((ha>>>24|ha<<8)+ga)^(fa>>>25|fa<<7);k=(fa>>>20|fa<<12)+ja|0;ja=k^ia;x=ja>>>24|ja<<8;y=x+(ia+((ha>>>24|ha<<8)+ga))|0;fa=y^(fa>>>20|fa<<12);p=fa>>>25|fa<<7;ea=($>>>25|$<<7)+((da>>>20|da<<12)+ea)|0;da=(ea^(X>>>24|X<<8))>>>16|(ea^(X>>>24|X<<8))<<16;$=da+((ca>>>24|ca<<8)+aa)^($>>>25|$<<7);l=($>>>20|$<<12)+ea|0;ea=l^da;w=ea>>>24|ea<<8;r=w+(da+((ca>>>24|ca<<8)+aa))|0;$=r^($>>>20|$<<12);q=$>>>25|$<<7;Z=(z>>>25|z<<7)+((_>>>20|_<<12)+Z)|0;Y=(Z^(Y>>>24|Y<<8))>>>16|(Z^(Y>>>24|Y<<8))<<16;z=Y+((X>>>24|X<<8)+W)^(z>>>25|z<<7);m=(z>>>20|z<<12)+Z|0;Z=m^Y;v=Z>>>24|Z<<8;s=v+(Y+((X>>>24|X<<8)+W))|0;z=s^(z>>>20|z<<12);n=z>>>25|z<<7;g=g+-2|0}while((g|0)!=0);z=(d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24)^h+G;Z=e+4|0;Z=(d[Z>>0]|d[Z+1>>0]<<8|d[Z+2>>0]<<16|d[Z+3>>0]<<24)^k+H;_=e+8|0;_=(d[_>>0]|d[_+1>>0]<<8|d[_+2>>0]<<16|d[_+3>>0]<<24)^l+I;$=e+12|0;$=(d[$>>0]|d[$+1>>0]<<8|d[$+2>>0]<<16|d[$+3>>0]<<24)^m+J;aa=e+16|0;aa=(d[aa>>0]|d[aa+1>>0]<<8|d[aa+2>>0]<<16|d[aa+3>>0]<<24)^n+K;ca=e+20|0;ca=(d[ca>>0]|d[ca+1>>0]<<8|d[ca+2>>0]<<16|d[ca+3>>0]<<24)^o+L;da=e+24|0;da=(d[da>>0]|d[da+1>>0]<<8|d[da+2>>0]<<16|d[da+3>>0]<<24)^p+M;ea=e+28|0;ea=(d[ea>>0]|d[ea+1>>0]<<8|d[ea+2>>0]<<16|d[ea+3>>0]<<24)^q+N;fa=e+32|0;fa=(d[fa>>0]|d[fa+1>>0]<<8|d[fa+2>>0]<<16|d[fa+3>>0]<<24)^r+O;ga=e+36|0;ga=(d[ga>>0]|d[ga+1>>0]<<8|d[ga+2>>0]<<16|d[ga+3>>0]<<24)^s+P;ha=e+40|0;ha=(d[ha>>0]|d[ha+1>>0]<<8|d[ha+2>>0]<<16|d[ha+3>>0]<<24)^t+Q;ia=e+44|0;ia=(d[ia>>0]|d[ia+1>>0]<<8|d[ia+2>>0]<<16|d[ia+3>>0]<<24)^y+R;ja=e+48|0;ja=(d[ja>>0]|d[ja+1>>0]<<8|d[ja+2>>0]<<16|d[ja+3>>0]<<24)^x+A;ka=e+52|0;ka=(d[ka>>0]|d[ka+1>>0]<<8|d[ka+2>>0]<<16|d[ka+3>>0]<<24)^w+C;la=e+56|0;la=(d[la>>0]|d[la+1>>0]<<8|d[la+2>>0]<<16|d[la+3>>0]<<24)^v+S;ma=e+60|0;ma=(d[ma>>0]|d[ma+1>>0]<<8|d[ma+2>>0]<<16|d[ma+3>>0]<<24)^u+T;g=A+1|0;h=((g|0)==0&1)+C|0;a[f>>0]=z;a[f+1>>0]=z>>8;a[f+2>>0]=z>>16;a[f+3>>0]=z>>24;na=f+4|0;a[na>>0]=Z;a[na+1>>0]=Z>>8;a[na+2>>0]=Z>>16;a[na+3>>0]=Z>>24;na=f+8|0;a[na>>0]=_;a[na+1>>0]=_>>8;a[na+2>>0]=_>>16;a[na+3>>0]=_>>24;na=f+12|0;a[na>>0]=$;a[na+1>>0]=$>>8;a[na+2>>0]=$>>16;a[na+3>>0]=$>>24;na=f+16|0;a[na>>0]=aa;a[na+1>>0]=aa>>8;a[na+2>>0]=aa>>16;a[na+3>>0]=aa>>24;na=f+20|0;a[na>>0]=ca;a[na+1>>0]=ca>>8;a[na+2>>0]=ca>>16;a[na+3>>0]=ca>>24;na=f+24|0;a[na>>0]=da;a[na+1>>0]=da>>8;a[na+2>>0]=da>>16;a[na+3>>0]=da>>24;na=f+28|0;a[na>>0]=ea;a[na+1>>0]=ea>>8;a[na+2>>0]=ea>>16;a[na+3>>0]=ea>>24;na=f+32|0;a[na>>0]=fa;a[na+1>>0]=fa>>8;a[na+2>>0]=fa>>16;a[na+3>>0]=fa>>24;na=f+36|0;a[na>>0]=ga;a[na+1>>0]=ga>>8;a[na+2>>0]=ga>>16;a[na+3>>0]=ga>>24;na=f+40|0;a[na>>0]=ha;a[na+1>>0]=ha>>8;a[na+2>>0]=ha>>16;a[na+3>>0]=ha>>24;na=f+44|0;a[na>>0]=ia;a[na+1>>0]=ia>>8;a[na+2>>0]=ia>>16;a[na+3>>0]=ia>>24;na=f+48|0;a[na>>0]=ja;a[na+1>>0]=ja>>8;a[na+2>>0]=ja>>16;a[na+3>>0]=ja>>24;na=f+52|0;a[na>>0]=ka;a[na+1>>0]=ka>>8;a[na+2>>0]=ka>>16;a[na+3>>0]=ka>>24;na=f+56|0;a[na>>0]=la;a[na+1>>0]=la>>8;a[na+2>>0]=la>>16;a[na+3>>0]=la>>24;na=f+60|0;a[na>>0]=ma;a[na+1>>0]=ma>>8;a[na+2>>0]=ma>>16;a[na+3>>0]=ma>>24;if(E>>>0<0|(E|0)==0&F>>>0<65)break;na=we(F|0,E|0,-64,-1)|0;e=e+64|0;f=f+64|0;C=h;A=g;E=D;F=na}if((B?F|0:0)?(a[j>>0]=z,(F|0)!=1):0){e=1;do{a[j+e>>0]=a[f+e>>0]|0;e=e+1|0}while((e|0)!=(F|0))}c[b+48>>2]=g;c[b+52>>2]=h}i=V;return}
function wa(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0;j=i;k=i=i+63&-64;i=i+320|0;h=k+280|0;g=h+32|0;do{a[h>>0]=a[e>>0]|0;h=h+1|0;e=e+1|0}while((h|0)<(g|0));a[k+280>>0]=(d[k+280>>0]|0)&248;a[k+280+31>>0]=(d[k+280+31>>0]|0)&63|64;ya(k+240|0,f);_d(k+200|0);ze(k+160|0);mc(k+120|0,k+240|0);_d(k+80|0);e=0;g=254;while(1){B=e;e=(d[k+280+(g>>>3)>>0]|0)>>>(g&7)&1;B=e^B;fb(k+200|0,k+120|0,B);fb(k+160|0,k+80|0,B);Kb(k+40|0,k+120|0,k+80|0);Kb(k,k+200|0,k+160|0);Lb(k+200|0,k+200|0,k+160|0);Lb(k+160|0,k+120|0,k+80|0);oa(k+80|0,k+40|0,k+200|0);oa(k+160|0,k+160|0,k);ra(k+40|0,k);ra(k,k+200|0);Lb(k+120|0,k+80|0,k+160|0);Kb(k+160|0,k+80|0,k+160|0);oa(k+200|0,k,k+40|0);Kb(k,k,k+40|0);ra(k+160|0,k+160|0);B=c[k>>2]|0;A=c[k+4>>2]|0;z=c[k+8>>2]|0;y=c[k+12>>2]|0;x=c[k+16>>2]|0;s=c[k+20>>2]|0;v=c[k+24>>2]|0;E=c[k+28>>2]|0;t=c[k+32>>2]|0;C=c[k+36>>2]|0;B=Kd(B|0,((B|0)<0)<<31>>31|0,121666,0)|0;q=D;A=Kd(A|0,((A|0)<0)<<31>>31|0,121666,0)|0;r=D;z=Kd(z|0,((z|0)<0)<<31>>31|0,121666,0)|0;o=D;y=Kd(y|0,((y|0)<0)<<31>>31|0,121666,0)|0;p=D;x=Kd(x|0,((x|0)<0)<<31>>31|0,121666,0)|0;m=D;s=Kd(s|0,((s|0)<0)<<31>>31|0,121666,0)|0;n=D;v=Kd(v|0,((v|0)<0)<<31>>31|0,121666,0)|0;f=D;E=Kd(E|0,((E|0)<0)<<31>>31|0,121666,0)|0;l=D;t=Kd(t|0,((t|0)<0)<<31>>31|0,121666,0)|0;u=D;C=Kd(C|0,((C|0)<0)<<31>>31|0,121666,0)|0;h=D;F=we(C|0,h|0,16777216,0)|0;F=Jd(F|0,D|0,25)|0;w=D;G=Kd(F|0,w|0,19,0)|0;q=we(G|0,D|0,B|0,q|0)|0;B=D;w=Wd(F|0,w|0,25)|0;w=te(C|0,h|0,w|0,D|0)|0;h=D;C=we(A|0,r|0,16777216,0)|0;C=Jd(C|0,D|0,25)|0;F=D;o=we(C|0,F|0,z|0,o|0)|0;z=D;F=Wd(C|0,F|0,25)|0;F=te(A|0,r|0,F|0,D|0)|0;r=D;A=we(y|0,p|0,16777216,0)|0;A=Jd(A|0,D|0,25)|0;C=D;m=we(A|0,C|0,x|0,m|0)|0;x=D;C=Wd(A|0,C|0,25)|0;C=te(y|0,p|0,C|0,D|0)|0;p=D;y=we(s|0,n|0,16777216,0)|0;y=Jd(y|0,D|0,25)|0;A=D;f=we(y|0,A|0,v|0,f|0)|0;v=D;A=Wd(y|0,A|0,25)|0;A=te(s|0,n|0,A|0,D|0)|0;n=D;s=we(E|0,l|0,16777216,0)|0;s=Jd(s|0,D|0,25)|0;y=D;u=we(s|0,y|0,t|0,u|0)|0;t=D;y=Wd(s|0,y|0,25)|0;y=te(E|0,l|0,y|0,D|0)|0;l=D;E=we(q|0,B|0,33554432,0)|0;E=Jd(E|0,D|0,26)|0;s=D;r=we(F|0,r|0,E|0,s|0)|0;s=Wd(E|0,s|0,26)|0;s=te(q|0,B|0,s|0,D|0)|0;B=we(o|0,z|0,33554432,0)|0;B=Jd(B|0,D|0,26)|0;q=D;p=we(C|0,p|0,B|0,q|0)|0;q=Wd(B|0,q|0,26)|0;q=te(o|0,z|0,q|0,D|0)|0;z=we(m|0,x|0,33554432,0)|0;z=Jd(z|0,D|0,26)|0;o=D;n=we(A|0,n|0,z|0,o|0)|0;o=Wd(z|0,o|0,26)|0;o=te(m|0,x|0,o|0,D|0)|0;x=we(f|0,v|0,33554432,0)|0;x=Jd(x|0,D|0,26)|0;m=D;l=we(y|0,l|0,x|0,m|0)|0;m=Wd(x|0,m|0,26)|0;m=te(f|0,v|0,m|0,D|0)|0;v=we(u|0,t|0,33554432,0)|0;v=Jd(v|0,D|0,26)|0;f=D;h=we(w|0,h|0,v|0,f|0)|0;f=Wd(v|0,f|0,26)|0;f=te(u|0,t|0,f|0,D|0)|0;c[k+80>>2]=s;c[k+80+4>>2]=r;c[k+80+8>>2]=q;c[k+80+12>>2]=p;c[k+80+16>>2]=o;c[k+80+20>>2]=n;c[k+80+24>>2]=m;c[k+80+28>>2]=l;c[k+80+32>>2]=f;c[k+80+36>>2]=h;ra(k+120|0,k+120|0);Lb(k+40|0,k+40|0,k+80|0);oa(k+80|0,k+240|0,k+160|0);oa(k+160|0,k,k+40|0);if((g|0)<=0)break;else g=g+-1|0}fb(k+200|0,k+120|0,e);fb(k+160|0,k+80|0,e);Ka(k+160|0,k+160|0);oa(k+200|0,k+200|0,k+160|0);Ma(b,k+200|0);i=j;return 0}function xa(b,c,e,f){b=b|0;c=c|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0;if(!f){H=857760878;I=2036477234;J=1634760805;G=1797285236}else{H=d[f+4>>0]|d[f+4+1>>0]<<8|d[f+4+2>>0]<<16|d[f+4+3>>0]<<24;I=d[f+8>>0]|d[f+8+1>>0]<<8|d[f+8+2>>0]<<16|d[f+8+3>>0]<<24;J=d[f>>0]|d[f+1>>0]<<8|d[f+2>>0]<<16|d[f+3>>0]<<24;G=d[f+12>>0]|d[f+12+1>>0]<<8|d[f+12+2>>0]<<16|d[f+12+3>>0]<<24}F=d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24;E=d[e+4>>0]|d[e+4+1>>0]<<8|d[e+4+2>>0]<<16|d[e+4+3>>0]<<24;D=d[e+8>>0]|d[e+8+1>>0]<<8|d[e+8+2>>0]<<16|d[e+8+3>>0]<<24;C=d[e+12>>0]|d[e+12+1>>0]<<8|d[e+12+2>>0]<<16|d[e+12+3>>0]<<24;B=d[e+16>>0]|d[e+16+1>>0]<<8|d[e+16+2>>0]<<16|d[e+16+3>>0]<<24;A=d[e+20>>0]|d[e+20+1>>0]<<8|d[e+20+2>>0]<<16|d[e+20+3>>0]<<24;z=d[e+24>>0]|d[e+24+1>>0]<<8|d[e+24+2>>0]<<16|d[e+24+3>>0]<<24;y=d[e+28>>0]|d[e+28+1>>0]<<8|d[e+28+2>>0]<<16|d[e+28+3>>0]<<24;x=d[c>>0]|d[c+1>>0]<<8|d[c+2>>0]<<16|d[c+3>>0]<<24;w=d[c+4>>0]|d[c+4+1>>0]<<8|d[c+4+2>>0]<<16|d[c+4+3>>0]<<24;v=d[c+8>>0]|d[c+8+1>>0]<<8|d[c+8+2>>0]<<16|d[c+8+3>>0]<<24;f=d[c+12>>0]|d[c+12+1>>0]<<8|d[c+12+2>>0]<<16|d[c+12+3>>0]<<24;e=F;c=E;g=D;h=C;i=x;j=w;k=v;l=f;m=B;n=y;o=z;p=A;q=0;r=H;s=I;t=G;u=J;do{T=p+u|0;T=(T>>>25|T<<7)^h;Q=T+u|0;Q=(Q>>>23|Q<<9)^k;N=((Q+T|0)>>>19|Q+T<<13)^p;W=((N+Q|0)>>>14|N+Q<<18)^u;P=r+e|0;P=l^(P>>>25|P<<7);M=P+r|0;M=o^(M>>>23|M<<9);Z=((M+P|0)>>>19|M+P<<13)^e;S=((Z+M|0)>>>14|Z+M<<18)^r;L=s+i|0;L=(L>>>25|L<<7)^n;Y=L+s|0;Y=(Y>>>23|Y<<9)^c;V=((Y+L|0)>>>19|Y+L<<13)^i;O=((V+Y|0)>>>14|V+Y<<18)^s;X=t+m|0;X=(X>>>25|X<<7)^g;U=X+t|0;U=(U>>>23|U<<9)^j;R=((U+X|0)>>>19|U+X<<13)^m;K=((R+U|0)>>>14|R+U<<18)^t;e=((W+X|0)>>>25|W+X<<7)^Z;Z=e+W|0;c=(Z>>>23|Z<<9)^Y;Y=c+e|0;g=(Y>>>19|Y<<13)^X;X=g+c|0;u=(X>>>14|X<<18)^W;i=((S+T|0)>>>25|S+T<<7)^V;V=i+S|0;j=(V>>>23|V<<9)^U;U=j+i|0;h=(U>>>19|U<<13)^T;T=h+j|0;r=(T>>>14|T<<18)^S;m=((O+P|0)>>>25|O+P<<7)^R;R=m+O|0;k=(R>>>23|R<<9)^Q;Q=k+m|0;l=(Q>>>19|Q<<13)^P;P=l+k|0;s=(P>>>14|P<<18)^O;p=((K+L|0)>>>25|K+L<<7)^N;N=p+K|0;o=(N>>>23|N<<9)^M;M=o+p|0;n=(M>>>19|M<<13)^L;L=n+o|0;t=(L>>>14|L<<18)^K;q=q+2|0}while((q|0)<20);Z=u+J|0;a[b>>0]=Z;a[b+1>>0]=Z>>8;a[b+2>>0]=Z>>16;a[b+3>>0]=Z>>24;Z=e+F|0;a[b+4>>0]=Z;a[b+4+1>>0]=Z>>8;a[b+4+2>>0]=Z>>16;a[b+4+3>>0]=Z>>24;Z=c+E|0;a[b+8>>0]=Z;a[b+8+1>>0]=Z>>8;a[b+8+2>>0]=Z>>16;a[b+8+3>>0]=Z>>24;Z=g+D|0;a[b+12>>0]=Z;a[b+12+1>>0]=Z>>8;a[b+12+2>>0]=Z>>16;a[b+12+3>>0]=Z>>24;Z=h+C|0;a[b+16>>0]=Z;a[b+16+1>>0]=Z>>8;a[b+16+2>>0]=Z>>16;a[b+16+3>>0]=Z>>24;Z=r+H|0;a[b+20>>0]=Z;a[b+20+1>>0]=Z>>8;a[b+20+2>>0]=Z>>16;a[b+20+3>>0]=Z>>24;Z=i+x|0;a[b+24>>0]=Z;a[b+24+1>>0]=Z>>8;a[b+24+2>>0]=Z>>16;a[b+24+3>>0]=Z>>24;Z=j+w|0;a[b+28>>0]=Z;a[b+28+1>>0]=Z>>8;a[b+28+2>>0]=Z>>16;a[b+28+3>>0]=Z>>24;Z=k+v|0;a[b+32>>0]=Z;a[b+32+1>>0]=Z>>8;a[b+32+2>>0]=Z>>16;a[b+32+3>>0]=Z>>24;Z=l+f|0;a[b+36>>0]=Z;a[b+36+1>>0]=Z>>8;a[b+36+2>>0]=Z>>16;a[b+36+3>>0]=Z>>24;Z=s+I|0;a[b+40>>0]=Z;a[b+40+1>>0]=Z>>8;a[b+40+2>>0]=Z>>16;a[b+40+3>>0]=Z>>24;Z=m+B|0;a[b+44>>0]=Z;a[b+44+1>>0]=Z>>8;a[b+44+2>>0]=Z>>16;a[b+44+3>>0]=Z>>24;Z=p+A|0;a[b+48>>0]=Z;a[b+48+1>>0]=Z>>8;a[b+48+2>>0]=Z>>16;a[b+48+3>>0]=Z>>24;Z=o+z|0;a[b+52>>0]=Z;a[b+52+1>>0]=Z>>8;a[b+52+2>>0]=Z>>16;a[b+52+3>>0]=Z>>24;Z=n+y|0;a[b+56>>0]=Z;a[b+56+1>>0]=Z>>8;a[b+56+2>>0]=Z>>16;a[b+56+3>>0]=Z>>24;Z=t+G|0;a[b+60>>0]=Z;a[b+60+1>>0]=Z>>8;a[b+60+2>>0]=Z>>16;a[b+60+3>>0]=Z>>24;return 0}function ya(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0;J=d[b>>0]|0;h=Wd(d[b+1>>0]|0|0,0,8)|0;k=D;F=Wd(d[b+2>>0]|0|0,0,16)|0;k=k|D;E=Wd(d[b+3>>0]|0|0,0,24)|0;k=k|D;B=d[b+4>>0]|0;C=Wd(d[b+5>>0]|0|0,0,8)|0;j=D;l=Wd(d[b+6>>0]|0|0,0,16)|0;j=Wd(C|B|l|0,j|D|0,6)|0;l=D;B=d[b+7>>0]|0;C=Wd(d[b+8>>0]|0|0,0,8)|0;w=D;i=Wd(d[b+9>>0]|0|0,0,16)|0;w=Wd(C|B|i|0,w|D|0,5)|0;i=D;B=d[b+10>>0]|0;C=Wd(d[b+11>>0]|0|0,0,8)|0;H=D;G=Wd(d[b+12>>0]|0|0,0,16)|0;H=Wd(C|B|G|0,H|D|0,3)|0;G=D;B=d[b+13>>0]|0;C=Wd(d[b+14>>0]|0|0,0,8)|0;s=D;g=Wd(d[b+15>>0]|0|0,0,16)|0;s=Wd(C|B|g|0,s|D|0,2)|0;g=D;B=d[b+16>>0]|0;C=Wd(d[b+17>>0]|0|0,0,8)|0;y=D;A=Wd(d[b+18>>0]|0|0,0,16)|0;y=y|D;z=Wd(d[b+19>>0]|0|0,0,24)|0;y=y|D;q=d[b+20>>0]|0;x=Wd(d[b+21>>0]|0|0,0,8)|0;p=D;e=Wd(d[b+22>>0]|0|0,0,16)|0;p=Wd(x|q|e|0,p|D|0,7)|0;e=D;q=d[b+23>>0]|0;x=Wd(d[b+24>>0]|0|0,0,8)|0;v=D;u=Wd(d[b+25>>0]|0|0,0,16)|0;v=Wd(x|q|u|0,v|D|0,5)|0;u=D;q=d[b+26>>0]|0;x=Wd(d[b+27>>0]|0|0,0,8)|0;n=D;o=Wd(d[b+28>>0]|0|0,0,16)|0;n=Wd(x|q|o|0,n|D|0,4)|0;o=D;q=d[b+29>>0]|0;x=Wd(d[b+30>>0]|0|0,0,8)|0;r=D;b=Wd(d[b+31>>0]|0|0,0,16)|0;r=Wd(x|q|b|0,r|D|0,2)|0;b=we(r&33554428|0,0,16777216,0)|0;b=Yd(b|0,D|0,25)|0;q=D;x=te(0,0,b|0,q|0)|0;k=we(x&19|0,0,h|J|F|E|0,k|0)|0;E=D;q=Wd(b|0,q|0,25)|0;b=D;F=we(j|0,l|0,16777216,0)|0;F=Yd(F|0,D|0,25)|0;J=D;i=we(w|0,i|0,F|0,J|0)|0;w=D;J=Wd(F|0,J|0,25)|0;J=te(j|0,l|0,J|0,D|0)|0;l=D;j=we(H|0,G|0,16777216,0)|0;j=Yd(j|0,D|0,25)|0;F=D;g=we(s|0,g|0,j|0,F|0)|0;s=D;F=Wd(j|0,F|0,25)|0;j=D;h=we(C|B|A|z|0,y|0,16777216,0)|0;h=Yd(h|0,D|0,25)|0;x=D;e=we(p|0,e|0,h|0,x|0)|0;p=D;x=Wd(h|0,x|0,25)|0;h=D;f=we(v|0,u|0,16777216,0)|0;f=Yd(f|0,D|0,25)|0;t=D;o=we(n|0,o|0,f|0,t|0)|0;n=D;t=Wd(f|0,t|0,25)|0;f=D;I=we(k|0,E|0,33554432,0)|0;I=Jd(I|0,D|0,26)|0;m=D;l=we(J|0,l|0,I|0,m|0)|0;m=Wd(I|0,m|0,26)|0;m=te(k|0,E|0,m|0,D|0)|0;E=we(i|0,w|0,33554432,0)|0;E=Jd(E|0,D|0,26)|0;k=D;G=we(E|0,k|0,H|0,G|0)|0;j=te(G|0,D|0,F|0,j|0)|0;k=Wd(E|0,k|0,26)|0;k=te(i|0,w|0,k|0,D|0)|0;w=we(g|0,s|0,33554432,0)|0;w=Jd(w|0,D|0,26)|0;i=D;y=we(w|0,i|0,C|B|A|z|0,y|0)|0;h=te(y|0,D|0,x|0,h|0)|0;i=Wd(w|0,i|0,26)|0;i=te(g|0,s|0,i|0,D|0)|0;s=we(e|0,p|0,33554432,0)|0;s=Jd(s|0,D|0,26)|0;g=D;u=we(s|0,g|0,v|0,u|0)|0;f=te(u|0,D|0,t|0,f|0)|0;g=Wd(s|0,g|0,26)|0;g=te(e|0,p|0,g|0,D|0)|0;p=we(o|0,n|0,33554432,0)|0;p=Jd(p|0,D|0,26)|0;e=D;r=we(r&33554428|0,0,p|0,e|0)|0;b=te(r|0,D|0,q|0,b|0)|0;e=Wd(p|0,e|0,26)|0;e=te(o|0,n|0,e|0,D|0)|0;c[a>>2]=m;c[a+4>>2]=l;c[a+8>>2]=k;c[a+12>>2]=j;c[a+16>>2]=i;c[a+20>>2]=h;c[a+24>>2]=g;c[a+28>>2]=f;c[a+32>>2]=e;c[a+36>>2]=b;return}function za(b,c,e,f){b=b|0;c=c|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0;if(!f){i=1797285236;g=2036477234;h=857760878;f=1634760805}else{i=d[f+12>>0]|d[f+12+1>>0]<<8|d[f+12+2>>0]<<16|d[f+12+3>>0]<<24;g=d[f+8>>0]|d[f+8+1>>0]<<8|d[f+8+2>>0]<<16|d[f+8+3>>0]<<24;h=d[f+4>>0]|d[f+4+1>>0]<<8|d[f+4+2>>0]<<16|d[f+4+3>>0]<<24;f=d[f>>0]|d[f+1>>0]<<8|d[f+2>>0]<<16|d[f+3>>0]<<24}q=d[c+8>>0]|d[c+8+1>>0]<<8|d[c+8+2>>0]<<16|d[c+8+3>>0]<<24;r=d[c+4>>0]|d[c+4+1>>0]<<8|d[c+4+2>>0]<<16|d[c+4+3>>0]<<24;s=d[c>>0]|d[c+1>>0]<<8|d[c+2>>0]<<16|d[c+3>>0]<<24;t=d[e+28>>0]|d[e+28+1>>0]<<8|d[e+28+2>>0]<<16|d[e+28+3>>0]<<24;u=d[e+24>>0]|d[e+24+1>>0]<<8|d[e+24+2>>0]<<16|d[e+24+3>>0]<<24;v=d[e+20>>0]|d[e+20+1>>0]<<8|d[e+20+2>>0]<<16|d[e+20+3>>0]<<24;w=d[e+16>>0]|d[e+16+1>>0]<<8|d[e+16+2>>0]<<16|d[e+16+3>>0]<<24;o=d[e+12>>0]|d[e+12+1>>0]<<8|d[e+12+2>>0]<<16|d[e+12+3>>0]<<24;m=d[e+8>>0]|d[e+8+1>>0]<<8|d[e+8+2>>0]<<16|d[e+8+3>>0]<<24;l=d[e+4>>0]|d[e+4+1>>0]<<8|d[e+4+2>>0]<<16|d[e+4+3>>0]<<24;e=d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24;p=0;n=d[c+12>>0]|d[c+12+1>>0]<<8|d[c+12+2>>0]<<16|d[c+12+3>>0]<<24;k=h;j=f;while(1){J=e+j|0;A=s^J;z=(A>>>16|A<<16)+w|0;I=z^e;A=(I>>>20|I<<12)+J^(A>>>16|A<<16);h=(A>>>24|A<<8)+z^(I>>>20|I<<12);G=l+k|0;c=r^G;x=(c>>>16|c<<16)+v|0;F=x^l;l=(F>>>20|F<<12)+G^(c>>>16|c<<16);c=(l>>>24|l<<8)+x^(F>>>20|F<<12);C=m+g|0;y=q^C;H=(y>>>16|y<<16)+u|0;B=H^m;y=(B>>>20|B<<12)+C^(y>>>16|y<<16);e=(y>>>24|y<<8)+H^(B>>>20|B<<12);m=o+i|0;E=n^m;D=(E>>>16|E<<16)+t|0;o=D^o;E=(o>>>20|o<<12)+m^(E>>>16|E<<16);f=(E>>>24|E<<8)+D^(o>>>20|o<<12);J=(c>>>25|c<<7)+((I>>>20|I<<12)+J)|0;I=(J^(E>>>24|E<<8))>>>16|(J^(E>>>24|E<<8))<<16;c=I+((y>>>24|y<<8)+H)^(c>>>25|c<<7);j=(c>>>20|c<<12)+J|0;J=j^I;n=J>>>24|J<<8;u=n+(I+((y>>>24|y<<8)+H))|0;c=u^(c>>>20|c<<12);G=(e>>>25|e<<7)+((F>>>20|F<<12)+G)|0;F=(G^(A>>>24|A<<8))>>>16|(G^(A>>>24|A<<8))<<16;e=F+((E>>>24|E<<8)+D)^(e>>>25|e<<7);k=(e>>>20|e<<12)+G|0;G=k^F;s=G>>>24|G<<8;t=s+(F+((E>>>24|E<<8)+D))|0;e=t^(e>>>20|e<<12);C=(f>>>25|f<<7)+((B>>>20|B<<12)+C)|0;B=(C^(l>>>24|l<<8))>>>16|(C^(l>>>24|l<<8))<<16;f=B+((A>>>24|A<<8)+z)^(f>>>25|f<<7);g=(f>>>20|f<<12)+C|0;C=g^B;r=C>>>24|C<<8;w=r+(B+((A>>>24|A<<8)+z))|0;f=w^(f>>>20|f<<12);m=(h>>>25|h<<7)+((o>>>20|o<<12)+m)|0;o=(m^(y>>>24|y<<8))>>>16|(m^(y>>>24|y<<8))<<16;h=o+((l>>>24|l<<8)+x)^(h>>>25|h<<7);i=(h>>>20|h<<12)+m|0;m=i^o;q=m>>>24|m<<8;v=q+(o+((l>>>24|l<<8)+x))|0;h=v^(h>>>20|h<<12);p=p+1|0;if((p|0)==10)break;else{o=f>>>25|f<<7;m=e>>>25|e<<7;l=c>>>25|c<<7;e=h>>>25|h<<7}}a[b>>0]=j;a[b+1>>0]=j>>8;a[b+2>>0]=j>>16;a[b+3>>0]=j>>24;a[b+4>>0]=k;a[b+4+1>>0]=k>>8;a[b+4+2>>0]=k>>16;a[b+4+3>>0]=k>>24;a[b+8>>0]=g;a[b+8+1>>0]=g>>8;a[b+8+2>>0]=g>>16;a[b+8+3>>0]=g>>24;a[b+12>>0]=i;a[b+12+1>>0]=i>>8;a[b+12+2>>0]=i>>16;a[b+12+3>>0]=i>>24;a[b+16>>0]=s;a[b+16+1>>0]=s>>8;a[b+16+2>>0]=s>>16;a[b+16+3>>0]=s>>24;a[b+20>>0]=r;a[b+20+1>>0]=r>>8;a[b+20+2>>0]=r>>16;a[b+20+3>>0]=r>>24;a[b+24>>0]=q;a[b+24+1>>0]=q>>8;a[b+24+2>>0]=q>>16;a[b+24+3>>0]=q>>24;a[b+28>>0]=n;a[b+28+1>>0]=n>>8;a[b+28+2>>0]=n>>16;a[b+28+3>>0]=n>>24;return 0}function Aa(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0;r=i;p=i=i+63&-64;i=i+240|0;ya(a+40|0,b);c[a+80>>2]=1;e=a+84|0;f=e+36|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(f|0));ra(p+160|0,a+40|0);oa(p+120|0,p+160|0,1104);g=c[a+80>>2]|0;f=c[a+84>>2]|0;e=c[a+88>>2]|0;o=c[a+92>>2]|0;n=c[a+96>>2]|0;m=c[a+100>>2]|0;l=c[a+104>>2]|0;k=c[a+108>>2]|0;j=c[a+112>>2]|0;h=c[a+116>>2]|0;B=(c[p+160>>2]|0)-g|0;A=(c[p+160+4>>2]|0)-f|0;z=(c[p+160+8>>2]|0)-e|0;y=(c[p+160+12>>2]|0)-o|0;x=(c[p+160+16>>2]|0)-n|0;w=(c[p+160+20>>2]|0)-m|0;v=(c[p+160+24>>2]|0)-l|0;u=(c[p+160+28>>2]|0)-k|0;t=(c[p+160+32>>2]|0)-j|0;s=(c[p+160+36>>2]|0)-h|0;c[p+160>>2]=B;c[p+160+4>>2]=A;c[p+160+8>>2]=z;c[p+160+12>>2]=y;c[p+160+16>>2]=x;c[p+160+20>>2]=w;c[p+160+24>>2]=v;c[p+160+28>>2]=u;c[p+160+32>>2]=t;c[p+160+36>>2]=s;f=f+(c[p+120+4>>2]|0)|0;e=e+(c[p+120+8>>2]|0)|0;o=o+(c[p+120+12>>2]|0)|0;n=n+(c[p+120+16>>2]|0)|0;m=m+(c[p+120+20>>2]|0)|0;l=l+(c[p+120+24>>2]|0)|0;k=k+(c[p+120+28>>2]|0)|0;j=j+(c[p+120+32>>2]|0)|0;h=h+(c[p+120+36>>2]|0)|0;c[p+120>>2]=g+(c[p+120>>2]|0);c[p+120+4>>2]=f;c[p+120+8>>2]=e;c[p+120+12>>2]=o;c[p+120+16>>2]=n;c[p+120+20>>2]=m;c[p+120+24>>2]=l;c[p+120+28>>2]=k;c[p+120+32>>2]=j;c[p+120+36>>2]=h;ra(p+80|0,p+120|0);oa(p+80|0,p+80|0,p+120|0);ra(a,p+80|0);oa(a,a,p+120|0);oa(a,a,p+160|0);La(a,a);oa(a,a,p+80|0);oa(a,a,p+160|0);ra(p+40|0,a);oa(p+40|0,p+40|0,p+120|0);h=c[p+40>>2]|0;j=c[p+40+4>>2]|0;k=c[p+40+8>>2]|0;l=c[p+40+12>>2]|0;m=c[p+40+16>>2]|0;n=c[p+40+20>>2]|0;o=c[p+40+24>>2]|0;e=c[p+40+28>>2]|0;f=c[p+40+32>>2]|0;g=c[p+40+36>>2]|0;c[p>>2]=h-B;c[p+4>>2]=j-A;c[p+8>>2]=k-z;c[p+12>>2]=l-y;c[p+16>>2]=m-x;c[p+20>>2]=n-w;c[p+24>>2]=o-v;c[p+28>>2]=e-u;c[p+32>>2]=f-t;c[p+36>>2]=g-s;Ma(p+200|0,p);if(Fd(p+200|0,35404)|0){t=(c[p+160+4>>2]|0)+j|0;u=(c[p+160+8>>2]|0)+k|0;v=(c[p+160+12>>2]|0)+l|0;w=(c[p+160+16>>2]|0)+m|0;x=(c[p+160+20>>2]|0)+n|0;y=(c[p+160+24>>2]|0)+o|0;z=(c[p+160+28>>2]|0)+e|0;A=(c[p+160+32>>2]|0)+f|0;B=(c[p+160+36>>2]|0)+g|0;c[p>>2]=(c[p+160>>2]|0)+h;c[p+4>>2]=t;c[p+8>>2]=u;c[p+12>>2]=v;c[p+16>>2]=w;c[p+20>>2]=x;c[p+24>>2]=y;c[p+28>>2]=z;c[p+32>>2]=A;c[p+36>>2]=B;Ma(p+200|0,p);if(!(Fd(p+200|0,35404)|0)){oa(a,a,1144);q=4}else e=-1}else q=4;if((q|0)==4){Ma(p+200|0,a);if(((d[p+200>>0]|0)&1|0)==((d[b+31>>0]|0)>>>7|0))gc(a,a);oa(a+120|0,a,a+40|0);e=0}i=r;return e|0}function Ba(b,c,e,f){b=b|0;c=c|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0;if(!f){o=1797285236;g=2036477234;h=857760878;f=1634760805}else{o=d[f+12>>0]|d[f+12+1>>0]<<8|d[f+12+2>>0]<<16|d[f+12+3>>0]<<24;g=d[f+8>>0]|d[f+8+1>>0]<<8|d[f+8+2>>0]<<16|d[f+8+3>>0]<<24;h=d[f+4>>0]|d[f+4+1>>0]<<8|d[f+4+2>>0]<<16|d[f+4+3>>0]<<24;f=d[f>>0]|d[f+1>>0]<<8|d[f+2>>0]<<16|d[f+3>>0]<<24}p=d[e+28>>0]|d[e+28+1>>0]<<8|d[e+28+2>>0]<<16|d[e+28+3>>0]<<24;q=d[e+24>>0]|d[e+24+1>>0]<<8|d[e+24+2>>0]<<16|d[e+24+3>>0]<<24;r=d[e+20>>0]|d[e+20+1>>0]<<8|d[e+20+2>>0]<<16|d[e+20+3>>0]<<24;s=d[e+16>>0]|d[e+16+1>>0]<<8|d[e+16+2>>0]<<16|d[e+16+3>>0]<<24;t=d[c+12>>0]|d[c+12+1>>0]<<8|d[c+12+2>>0]<<16|d[c+12+3>>0]<<24;u=d[c+8>>0]|d[c+8+1>>0]<<8|d[c+8+2>>0]<<16|d[c+8+3>>0]<<24;v=d[c+4>>0]|d[c+4+1>>0]<<8|d[c+4+2>>0]<<16|d[c+4+3>>0]<<24;k=d[c>>0]|d[c+1>>0]<<8|d[c+2>>0]<<16|d[c+3>>0]<<24;l=d[e+12>>0]|d[e+12+1>>0]<<8|d[e+12+2>>0]<<16|d[e+12+3>>0]<<24;m=d[e+8>>0]|d[e+8+1>>0]<<8|d[e+8+2>>0]<<16|d[e+8+3>>0]<<24;n=d[e+4>>0]|d[e+4+1>>0]<<8|d[e+4+2>>0]<<16|d[e+4+3>>0]<<24;i=d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24;j=20;e=h;c=f;f=o;while(1){D=r+c|0;D=(D>>>25|D<<7)^l;A=D+c|0;A=(A>>>23|A<<9)^u;x=((A+D|0)>>>19|A+D<<13)^r;G=((x+A|0)>>>14|x+A<<18)^c;z=e+i|0;z=t^(z>>>25|z<<7);w=z+e|0;w=q^(w>>>23|w<<9);J=((w+z|0)>>>19|w+z<<13)^i;C=((J+w|0)>>>14|J+w<<18)^e;h=g+k|0;h=p^(h>>>25|h<<7);I=h+g|0;I=(I>>>23|I<<9)^n;F=((I+h|0)>>>19|I+h<<13)^k;y=((F+I|0)>>>14|F+I<<18)^g;H=f+s|0;H=(H>>>25|H<<7)^m;E=H+f|0;E=(E>>>23|E<<9)^v;B=((E+H|0)>>>19|E+H<<13)^s;o=((B+E|0)>>>14|B+E<<18)^f;i=((G+H|0)>>>25|G+H<<7)^J;J=i+G|0;n=(J>>>23|J<<9)^I;I=n+i|0;m=(I>>>19|I<<13)^H;H=m+n|0;c=(H>>>14|H<<18)^G;k=((C+D|0)>>>25|C+D<<7)^F;F=k+C|0;v=(F>>>23|F<<9)^E;E=v+k|0;l=(E>>>19|E<<13)^D;D=l+v|0;e=(D>>>14|D<<18)^C;s=((y+z|0)>>>25|y+z<<7)^B;B=s+y|0;u=(B>>>23|B<<9)^A;A=u+s|0;t=(A>>>19|A<<13)^z;z=t+u|0;g=(z>>>14|z<<18)^y;r=((o+h|0)>>>25|o+h<<7)^x;x=r+o|0;q=(x>>>23|x<<9)^w;w=q+r|0;p=(w>>>19|w<<13)^h;h=p+q|0;f=(h>>>14|h<<18)^o;if((j|0)<=2)break;else j=j+-2|0}a[b>>0]=c;a[b+1>>0]=c>>8;a[b+2>>0]=c>>16;a[b+3>>0]=c>>24;a[b+4>>0]=e;a[b+4+1>>0]=e>>8;a[b+4+2>>0]=e>>16;a[b+4+3>>0]=e>>24;a[b+8>>0]=g;a[b+8+1>>0]=g>>8;a[b+8+2>>0]=g>>16;a[b+8+3>>0]=g>>24;a[b+12>>0]=f;a[b+12+1>>0]=f>>8;a[b+12+2>>0]=f>>16;a[b+12+3>>0]=f>>24;a[b+16>>0]=k;a[b+16+1>>0]=k>>8;a[b+16+2>>0]=k>>16;a[b+16+3>>0]=k>>24;a[b+20>>0]=v;a[b+20+1>>0]=v>>8;a[b+20+2>>0]=v>>16;a[b+20+3>>0]=v>>24;a[b+24>>0]=u;a[b+24+1>>0]=u>>8;a[b+24+2>>0]=u>>16;a[b+24+3>>0]=u>>24;a[b+28>>0]=t;a[b+28+1>>0]=t>>8;a[b+28+2>>0]=t>>16;a[b+28+3>>0]=t>>24;return 0}function Ca(b,e,f,g){b=b|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;t=a[b+80>>0]|0?0:16777216;u=c[b+4>>2]|0;p=c[b+8>>2]|0;q=c[b+12>>2]|0;r=c[b+16>>2]|0;l=c[b+20>>2]|0;k=c[b+24>>2]|0;j=c[b+28>>2]|0;i=c[b+32>>2]|0;h=c[b+36>>2]|0;if(g>>>0>0|(g|0)==0&f>>>0>15){s=c[b>>2]|0;n=f;while(1){z=((d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24)&67108863)+l|0;A=e+3|0;A=((d[A>>0]|d[A+1>>0]<<8|d[A+2>>0]<<16|d[A+3>>0]<<24)>>>2&67108863)+k|0;y=e+6|0;y=((d[y>>0]|d[y+1>>0]<<8|d[y+2>>0]<<16|d[y+3>>0]<<24)>>>4&67108863)+j|0;x=e+9|0;x=((d[x>>0]|d[x+1>>0]<<8|d[x+2>>0]<<16|d[x+3>>0]<<24)>>>6)+i|0;l=e+12|0;l=((d[l>>0]|d[l+1>>0]<<8|d[l+2>>0]<<16|d[l+3>>0]<<24)>>>8|t)+h|0;h=Kd(z|0,0,s|0,0)|0;f=D;j=Kd(A|0,0,r*5|0,0)|0;f=we(j|0,D|0,h|0,f|0)|0;h=D;j=Kd(y|0,0,q*5|0,0)|0;j=we(f|0,h|0,j|0,D|0)|0;h=D;f=Kd(x|0,0,p*5|0,0)|0;f=we(j|0,h|0,f|0,D|0)|0;h=D;j=Kd(l|0,0,u*5|0,0)|0;j=we(f|0,h|0,j|0,D|0)|0;h=D;f=Kd(z|0,0,u|0,0)|0;m=D;w=Kd(A|0,0,s|0,0)|0;m=we(w|0,D|0,f|0,m|0)|0;f=D;w=Kd(y|0,0,r*5|0,0)|0;w=we(m|0,f|0,w|0,D|0)|0;f=D;m=Kd(x|0,0,q*5|0,0)|0;m=we(w|0,f|0,m|0,D|0)|0;f=D;w=Kd(l|0,0,p*5|0,0)|0;w=we(m|0,f|0,w|0,D|0)|0;f=D;m=Kd(z|0,0,p|0,0)|0;o=D;v=Kd(A|0,0,u|0,0)|0;o=we(v|0,D|0,m|0,o|0)|0;m=D;v=Kd(y|0,0,s|0,0)|0;v=we(o|0,m|0,v|0,D|0)|0;m=D;o=Kd(x|0,0,r*5|0,0)|0;o=we(v|0,m|0,o|0,D|0)|0;m=D;v=Kd(l|0,0,q*5|0,0)|0;v=we(o|0,m|0,v|0,D|0)|0;m=D;o=Kd(z|0,0,q|0,0)|0;i=D;k=Kd(A|0,0,p|0,0)|0;i=we(k|0,D|0,o|0,i|0)|0;o=D;k=Kd(y|0,0,u|0,0)|0;k=we(i|0,o|0,k|0,D|0)|0;o=D;i=Kd(x|0,0,s|0,0)|0;i=we(k|0,o|0,i|0,D|0)|0;o=D;k=Kd(l|0,0,r*5|0,0)|0;k=we(i|0,o|0,k|0,D|0)|0;o=D;i=Kd(z|0,0,r|0,0)|0;z=D;A=Kd(A|0,0,q|0,0)|0;z=we(A|0,D|0,i|0,z|0)|0;i=D;y=Kd(y|0,0,p|0,0)|0;y=we(z|0,i|0,y|0,D|0)|0;i=D;x=Kd(x|0,0,u|0,0)|0;x=we(y|0,i|0,x|0,D|0)|0;i=D;l=Kd(l|0,0,s|0,0)|0;l=we(x|0,i|0,l|0,D|0)|0;i=D;h=Yd(j|0,h|0,26)|0;h=we(w|0,f|0,h|0,0)|0;f=Yd(h|0,D|0,26)|0;f=we(v|0,m|0,f|0,0)|0;m=Yd(f|0,D|0,26)|0;m=we(k|0,o|0,m|0,0)|0;o=Yd(m|0,D|0,26)|0;o=we(l|0,i|0,o|0,0)|0;i=Yd(o|0,D|0,26)|0;n=we(n|0,g|0,-16,-1)|0;g=D;if(!(g>>>0>0|(g|0)==0&n>>>0>15)){l=(i*5|0)+j&67108863;k=(((i*5|0)+(j&67108863)|0)>>>26)+(h&67108863)|0;j=f&67108863;i=m&67108863;h=o&67108863;break}else{l=(i*5|0)+j&67108863;k=(((i*5|0)+(j&67108863)|0)>>>26)+(h&67108863)|0;j=f&67108863;i=m&67108863;h=o&67108863;e=e+16|0}}}c[b+20>>2]=l;c[b+24>>2]=k;c[b+28>>2]=j;c[b+32>>2]=i;c[b+36>>2]=h;return}function Da(b,e,f,g,h,i,j,k,l,m,n){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;var o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;v=Kd(l|0,0,k|0,0)|0;u=D;do if(u>>>0>0|(u|0)==0&v>>>0>1073741823){c[(mg()|0)>>2]=27;b=-1}else{if(j>>>0>0|(j|0)==0&i>>>0>4294967295){c[(mg()|0)>>2]=27;b=-1;break}u=we(i|0,j|0,-1,-1)|0;if(j>>>0<0|(j|0)==0&i>>>0<2|((u&i|0)!=0|(D&j|0)!=0)){c[(mg()|0)>>2]=22;b=-1;break}if((k|0)==0|(l|0)==0){c[(mg()|0)>>2]=22;b=-1;break}if(!(k>>>0>16777215?1:(33554431/(l>>>0)|0)>>>0<k>>>0)?!(0<j>>>0|(0==(j|0)?(33554431/(k>>>0)|0)>>>0<i>>>0:0)):0){v=S(k<<7,l)|0;p=Kd(k<<7|0,0,i|0,j|0)|0;if((p+v|0)>>>0<p>>>0){c[(mg()|0)>>2]=12;b=-1;break}o=p+v+(k<<8|64)|0;if(o>>>0<(k<<8|64)>>>0){c[(mg()|0)>>2]=12;b=-1;break}if((c[b+8>>2]|0)>>>0<o>>>0?(re(b),(Uc(b,o)|0)==0):0){b=-1;break}t=c[b+4>>2]|0;s=t+v+p|0;Vb(e,f,g,h,t,v);q=s+(k<<5<<2)|0;h=0;do{r=t+(S(k<<7,h)|0)|0;if(k<<5|0){b=0;do{g=r+(b<<2)|0;c[s+(b<<2)>>2]=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;b=b+1|0}while((b|0)!=(k<<5|0))}if(!((i|0)==0&(j|0)==0)){p=0;g=0;do{if(!(k<<5&1073741792))yb(s,q,s+(k<<6<<2)|0,k);else{o=Kd(p|0,g|0,k<<5|0,0)|0;b=0;do{c[t+v+(o<<2)+(b<<2)>>2]=c[s+(b<<2)>>2];b=b+1|0}while((b|0)!=(k<<5&1073741792|0));yb(s,q,s+(k<<6<<2)|0,k);o=Kd(p|1|0,g|0,k<<5|0,0)|0;b=0;do{c[t+v+(o<<2)+(b<<2)>>2]=c[q+(b<<2)>>2];b=b+1|0}while((b|0)!=(k<<5&1073741792|0))}yb(q,s,s+(k<<6<<2)|0,k);p=we(p|0,g|0,2,0)|0;g=D}while(g>>>0<j>>>0|(g|0)==(j|0)&p>>>0<i>>>0);p=0;g=0;do{if(!(k<<5&1073741792))yb(s,q,s+(k<<6<<2)|0,k);else{o=Kd(c[s+((k<<7)+-64)>>2]&u|0,0,k<<5|0,0)|0;b=0;do{w=s+(b<<2)|0;c[w>>2]=c[w>>2]^c[t+v+(o<<2)+(b<<2)>>2];b=b+1|0}while((b|0)!=(k<<5&1073741792|0));yb(s,q,s+(k<<6<<2)|0,k);o=Kd(c[q+((k<<7)+-64)>>2]&u|0,0,k<<5|0,0)|0;b=0;do{w=q+(b<<2)|0;c[w>>2]=c[w>>2]^c[t+v+(o<<2)+(b<<2)>>2];b=b+1|0}while((b|0)!=(k<<5&1073741792|0))}yb(q,s,s+(k<<6<<2)|0,k);p=we(p|0,g|0,2,0)|0;g=D}while(g>>>0<j>>>0|(g|0)==(j|0)&p>>>0<i>>>0)}if(k<<5|0){b=0;do{w=r+(b<<2)|0;g=c[s+(b<<2)>>2]|0;a[w>>0]=g;a[w+1>>0]=g>>8;a[w+2>>0]=g>>16;a[w+3>>0]=g>>24;b=b+1|0}while((b|0)!=(k<<5|0))}h=h+1|0}while((h|0)!=(l|0));Vb(e,f,t,v,m,n);b=0;break}c[(mg()|0)>>2]=12;b=-1}while(0);return b|0}function Ea(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;if(!b)if(!e){if(f|0){c[f>>2]=(a>>>0)%(d>>>0);c[f+4>>2]=0}e=0;f=(a>>>0)/(d>>>0)>>>0;return (D=e,f)|0}else{if(!f){e=0;f=0;return (D=e,f)|0}c[f>>2]=a|0;c[f+4>>2]=b&0;e=0;f=0;return (D=e,f)|0}do if(d){if(e|0){h=(V(e|0)|0)-(V(b|0)|0)|0;if(h>>>0<=31){n=h+1|0;i=a>>>((h+1|0)>>>0)&h-31>>31|b<<31-h;m=b>>>((h+1|0)>>>0)&h-31>>31;g=0;h=a<<31-h;break}if(!f){e=0;f=0;return (D=e,f)|0}c[f>>2]=a|0;c[f+4>>2]=b|b&0;e=0;f=0;return (D=e,f)|0}if(d-1&d|0){h=(V(d|0)|0)+33-(V(b|0)|0)|0;n=h;i=32-h-1>>31&b>>>((h-32|0)>>>0)|(b<<32-h|a>>>(h>>>0))&h-32>>31;m=h-32>>31&b>>>(h>>>0);g=a<<64-h&32-h>>31;h=(b<<64-h|a>>>((h-32|0)>>>0))&32-h>>31|a<<32-h&h-33>>31;break}if(f|0){c[f>>2]=d-1&a;c[f+4>>2]=0}if((d|0)==1){e=b|b&0;f=a|0|0;return (D=e,f)|0}else{f=od(d|0)|0;e=b>>>(f>>>0)|0;f=b<<32-f|a>>>(f>>>0)|0;return (D=e,f)|0}}else{if(!e){if(f|0){c[f>>2]=(b>>>0)%(d>>>0);c[f+4>>2]=0}e=0;f=(b>>>0)/(d>>>0)>>>0;return (D=e,f)|0}if(!a){if(f|0){c[f>>2]=0;c[f+4>>2]=(b>>>0)%(e>>>0)}d=0;f=(b>>>0)/(e>>>0)>>>0;return (D=d,f)|0}if(!(e-1&e)){if(f|0){c[f>>2]=a|0;c[f+4>>2]=e-1&b|b&0}d=0;f=b>>>((od(e|0)|0)>>>0);return (D=d,f)|0}h=(V(e|0)|0)-(V(b|0)|0)|0;if(h>>>0<=30){n=h+1|0;i=b<<31-h|a>>>((h+1|0)>>>0);m=b>>>((h+1|0)>>>0);g=0;h=a<<31-h;break}if(!f){e=0;f=0;return (D=e,f)|0}c[f>>2]=a|0;c[f+4>>2]=b|b&0;e=0;f=0;return (D=e,f)|0}while(0);if(!n){j=h;b=m;a=0;h=0}else{k=we(d|0|0,e|e&0|0,-1,-1)|0;l=D;j=h;b=m;a=n;h=0;do{p=j;j=g>>>31|j<<1;g=h|g<<1;p=i<<1|p>>>31|0;o=i>>>31|b<<1|0;te(k|0,l|0,p|0,o|0)|0;n=D;m=n>>31|((n|0)<0?-1:0)<<1;h=m&1;i=te(p|0,o|0,m&(d|0)|0,(((n|0)<0?-1:0)>>31|((n|0)<0?-1:0)<<1)&(e|e&0)|0)|0;b=D;a=a-1|0}while((a|0)!=0);a=0}if(f|0){c[f>>2]=i;c[f+4>>2]=b}o=(g|0)>>>31|j<<1|(0<<1|g>>>31)&0|a;p=(g<<1|0>>>31)&-2|h;return (D=o,p)|0}function Fa(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;g=i;h=i=i+63&-64;i=i+2400|0;Hb(h+2136|0,d);Hb(h+1880|0,f);Tb(h+480|0,e);db(h+1760|0,e);ic(h+320|0,h+1760|0);ed(h,h+320|0);Sb(h+320|0,h,h+480|0);ed(h+160|0,h+320|0);Tb(h+480+160|0,h+160|0);Sb(h+320|0,h,h+480+160|0);ed(h+160|0,h+320|0);Tb(h+480+320|0,h+160|0);Sb(h+320|0,h,h+480+320|0);ed(h+160|0,h+320|0);Tb(h+480+480|0,h+160|0);Sb(h+320|0,h,h+480+480|0);ed(h+160|0,h+320|0);Tb(h+480+640|0,h+160|0);Sb(h+320|0,h,h+480+640|0);ed(h+160|0,h+320|0);Tb(h+480+800|0,h+160|0);Sb(h+320|0,h,h+480+800|0);ed(h+160|0,h+320|0);Tb(h+480+960|0,h+160|0);Sb(h+320|0,h,h+480+960|0);ed(h+160|0,h+320|0);Tb(h+480+1120|0,h+160|0);d=b;e=d+40|0;do{c[d>>2]=0;d=d+4|0}while((d|0)<(e|0));c[b+40>>2]=1;d=b+44|0;e=d+36|0;do{c[d>>2]=0;d=d+4|0}while((d|0)<(e|0));c[b+80>>2]=1;d=b+84|0;e=d+36|0;do{c[d>>2]=0;d=d+4|0}while((d|0)<(e|0));d=255;while(1){if(a[h+2136+d>>0]|0)break;if(a[h+1880+d>>0]|0)break;e=d+-1|0;if((d|0)>0)d=e;else{d=e;break}}if((d|0)>-1)while(1){ic(h+320|0,b);e=a[h+2136+d>>0]|0;if(e<<24>>24<=0){if(e<<24>>24<0){ed(h+160|0,h+320|0);Rb(h+320|0,h+160|0,h+480+((((e<<24>>24)/-2|0)<<24>>24)*160|0)|0)}}else{ed(h+160|0,h+320|0);Sb(h+320|0,h+160|0,h+480+(((e&255)>>>1&255)*160|0)|0)}e=a[h+1880+d>>0]|0;if(e<<24>>24<=0){if(e<<24>>24<0){ed(h+160|0,h+320|0);Yb(h+320|0,h+160|0,1224+((((e<<24>>24)/-2|0)<<24>>24)*120|0)|0)}}else{ed(h+160|0,h+320|0);Zb(h+320|0,h+160|0,1224+(((e&255)>>>1&255)*120|0)|0)}Ad(b,h+320|0);if((d|0)>0)d=d+-1|0;else break}i=g;return}function Ga(e,f,g){e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;s=i;p=i=i+63&-64;i=i+32|0;do if(f>>>0>=12){h=e;j=33857;k=h+12|0;do{a[h>>0]=a[j>>0]|0;h=h+1|0;j=j+1|0}while((h|0)<(k|0));h=kb(g)|0;if(!h){a[p+12+9>>0]=57;a[p+12+8>>0]=49;b[p>>1]=d[p+12+8>>0]|d[p+12+8+1>>0]<<8;a[p+2>>0]=0;l=pc(p)|0;m=e+11+l|0;if((f+-11|0)>>>0<=l>>>0){h=-31;break}yc(e+11|0,p|0,l+1|0)|0;if((f+-11-l|0)>>>0>=4){a[m>>0]=36;a[m+1>>0]=109;a[m+2>>0]=61;a[m+3>>0]=0;h=10;j=c[g+44>>2]|0;while(1){k=h+-1|0;a[p+12+k>>0]=(j>>>0)%10|0|48;if(j>>>0>9&(k|0)!=0){h=k;j=(j>>>0)/10|0}else break}h=11-h|0;yc(p|0,p+12+k|0,h|0)|0;a[p+h>>0]=0;h=pc(p)|0;n=m+3+h|0;o=f+-11-l+-3-h|0;if((f+-11-l+-3|0)>>>0<=h>>>0){h=-31;break}yc(m+3|0,p|0,h+1|0)|0;if(o>>>0>=4){a[n>>0]=44;a[n+1>>0]=116;a[n+2>>0]=61;a[n+3>>0]=0;h=10;j=c[g+40>>2]|0;while(1){k=h+-1|0;a[p+12+k>>0]=(j>>>0)%10|0|48;if(j>>>0>9&(k|0)!=0){h=k;j=(j>>>0)/10|0}else break}e=11-h|0;yc(p|0,p+12+k|0,e|0)|0;a[p+e>>0]=0;e=pc(p)|0;l=n+3+e|0;if((o+-3|0)>>>0<=e>>>0){h=-31;break}yc(n+3|0,p|0,e+1|0)|0;if((o+-3-e|0)>>>0>=4){a[l>>0]=44;a[l+1>>0]=112;a[l+2>>0]=61;a[l+3>>0]=0;h=10;j=c[g+48>>2]|0;while(1){k=h+-1|0;a[p+12+k>>0]=(j>>>0)%10|0|48;if(j>>>0>9&(k|0)!=0){h=k;j=(j>>>0)/10|0}else break}j=11-h|0;yc(p|0,p+12+k|0,j|0)|0;a[p+j>>0]=0;j=pc(p)|0;k=o+-3-e+-3-j|0;if((o+-3-e+-3|0)>>>0<=j>>>0){h=-31;break}yc(l+3|0,p|0,j+1|0)|0;h=l+3+j+1|0;if(k>>>0>=2?(a[l+3+j>>0]=36,a[l+3+j+1>>0]=0,p=Mb(h,k+-1|0,c[g+16>>2]|0,c[g+20>>2]|0)|0,r=k+-1-((p|0)==-1?0:p)|0,q=(p|0)==-1?h:h+p|0,!((p|0)==-1|r>>>0<2)):0){a[q>>0]=36;a[q+1>>0]=0;g=(Mb(q+1|0,r+-1|0,c[g>>2]|0,c[g+4>>2]|0)|0)!=-1;i=s;return (g?0:-31)|0}else h=-31}else h=-31}else h=-31}else h=-31}}else h=-31;while(0);i=s;return h|0}function Ha(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;u=i;v=i=i+63&-64;i=i+64|0;b=v;d=a;e=b+64|0;do{c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0}while((b|0)<(e|0));b=0;e=c[v+44>>2]|0;f=c[v+60>>2]|0;g=c[v+12>>2]|0;h=c[v+28>>2]|0;j=c[v+48>>2]|0;k=c[v>>2]|0;l=c[v+16>>2]|0;m=c[v+32>>2]|0;d=c[v+4>>2]|0;n=c[v+20>>2]|0;o=c[v+36>>2]|0;p=c[v+52>>2]|0;q=c[v+24>>2]|0;r=c[v+40>>2]|0;s=c[v+56>>2]|0;t=c[v+8>>2]|0;do{F=j+k|0;F=(F<<7|F>>>25)^l;C=F+k|0;C=(C<<9|C>>>23)^m;z=(C+F<<13|(C+F|0)>>>19)^j;I=(z+C<<18|(z+C|0)>>>14)^k;B=d+n|0;B=(B<<7|B>>>25)^o;y=B+n|0;y=(y<<9|y>>>23)^p;L=(y+B<<13|(y+B|0)>>>19)^d;E=(L+y<<18|(L+y|0)>>>14)^n;x=q+r|0;x=(x<<7|x>>>25)^s;K=x+r|0;K=(K<<9|K>>>23)^t;H=(K+x<<13|(K+x|0)>>>19)^q;A=(H+K<<18|(H+K|0)>>>14)^r;J=e+f|0;J=(J<<7|J>>>25)^g;G=J+f|0;G=(G<<9|G>>>23)^h;D=(G+J<<13|(G+J|0)>>>19)^e;w=(D+G<<18|(D+G|0)>>>14)^f;d=(J+I<<7|(J+I|0)>>>25)^L;L=d+I|0;t=(L<<9|L>>>23)^K;K=t+d|0;g=(K<<13|K>>>19)^J;J=g+t|0;k=(J<<18|J>>>14)^I;q=(F+E<<7|(F+E|0)>>>25)^H;H=q+E|0;h=(H<<9|H>>>23)^G;G=h+q|0;l=(G<<13|G>>>19)^F;F=l+h|0;n=(F<<18|F>>>14)^E;e=(B+A<<7|(B+A|0)>>>25)^D;D=e+A|0;m=(D<<9|D>>>23)^C;C=m+e|0;o=(C<<13|C>>>19)^B;B=o+m|0;r=(B<<18|B>>>14)^A;j=(x+w<<7|(x+w|0)>>>25)^z;z=j+w|0;p=(z<<9|z>>>23)^y;y=p+j|0;s=(y<<13|y>>>19)^x;x=s+p|0;f=(x<<18|x>>>14)^w;b=b+2|0}while(b>>>0<8);c[v>>2]=k;c[v+48>>2]=j;c[v+16>>2]=l;c[v+32>>2]=m;c[v+20>>2]=n;c[v+4>>2]=d;c[v+36>>2]=o;c[v+52>>2]=p;c[v+40>>2]=r;c[v+24>>2]=q;c[v+56>>2]=s;c[v+8>>2]=t;c[v+60>>2]=f;c[v+44>>2]=e;c[v+12>>2]=g;c[v+28>>2]=h;c[a>>2]=(c[a>>2]|0)+k;b=1;while(1){L=a+(b<<2)|0;c[L>>2]=(c[L>>2]|0)+d;b=b+1|0;if((b|0)==16)break;d=c[v+(b<<2)>>2]|0}i=u;return}function Ia(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;g=i;h=i=i+63&-64;i=i+128|0;e=Yd(d<<24>>24|0,((d<<24>>24|0)<0)<<31>>31|0,63)|0;c[a>>2]=1;f=a+4|0;j=f+36|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(j|0));c[a+40>>2]=1;f=a+44|0;j=f+76|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(j|0));o=(d<<24>>24)-((d<<24>>24&0-e)<<1)&255;Dd(a,2184+(b*960|0)|0,((o^1)+-1|0)>>>31&255);Dd(a,2184+(b*960|0)+120|0,((o^2)+-1|0)>>>31&255);Dd(a,2184+(b*960|0)+240|0,((o^3)+-1|0)>>>31&255);Dd(a,2184+(b*960|0)+360|0,((o^4)+-1|0)>>>31&255);Dd(a,2184+(b*960|0)+480|0,((o^5)+-1|0)>>>31&255);Dd(a,2184+(b*960|0)+600|0,((o^6)+-1|0)>>>31&255);Dd(a,2184+(b*960|0)+720|0,((o^7)+-1|0)>>>31&255);Dd(a,2184+(b*960|0)+840|0,((o^8)+-1|0)>>>31&255);o=c[a+44>>2]|0;n=c[a+48>>2]|0;m=c[a+52>>2]|0;l=c[a+56>>2]|0;k=c[a+60>>2]|0;b=c[a+64>>2]|0;d=c[a+68>>2]|0;f=c[a+72>>2]|0;j=c[a+76>>2]|0;c[h>>2]=c[a+40>>2];c[h+4>>2]=o;c[h+8>>2]=n;c[h+12>>2]=m;c[h+16>>2]=l;c[h+20>>2]=k;c[h+24>>2]=b;c[h+28>>2]=d;c[h+32>>2]=f;c[h+36>>2]=j;j=c[a+4>>2]|0;f=c[a+8>>2]|0;d=c[a+12>>2]|0;b=c[a+16>>2]|0;k=c[a+20>>2]|0;l=c[a+24>>2]|0;m=c[a+28>>2]|0;n=c[a+32>>2]|0;o=c[a+36>>2]|0;c[h+40>>2]=c[a>>2];c[h+44>>2]=j;c[h+48>>2]=f;c[h+52>>2]=d;c[h+56>>2]=b;c[h+60>>2]=k;c[h+64>>2]=l;c[h+68>>2]=m;c[h+72>>2]=n;c[h+76>>2]=o;o=0-(c[a+84>>2]|0)|0;n=0-(c[a+88>>2]|0)|0;m=0-(c[a+92>>2]|0)|0;l=0-(c[a+96>>2]|0)|0;k=0-(c[a+100>>2]|0)|0;b=0-(c[a+104>>2]|0)|0;d=0-(c[a+108>>2]|0)|0;f=0-(c[a+112>>2]|0)|0;j=0-(c[a+116>>2]|0)|0;c[h+80>>2]=0-(c[a+80>>2]|0);c[h+84>>2]=o;c[h+88>>2]=n;c[h+92>>2]=m;c[h+96>>2]=l;c[h+100>>2]=k;c[h+104>>2]=b;c[h+108>>2]=d;c[h+112>>2]=f;c[h+116>>2]=j;Dd(a,h,e&255);i=g;return}function Ja(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;n=i;m=i=i+63&-64;i=i+704|0;a:do if(!((e|0)==0&(f|0)==0)){r=c[b+72>>2]|0;p=c[b+72+4>>2]|0;l=Yd(r|0,p|0,3)|0;o=Wd(e|0,f|0,3)|0;q=D;j=Yd(e|0,f|0,61)|0;k=D;p=we(r|0,p|0,o|0,q|0)|0;r=D;c[b+72>>2]=p;c[b+72+4>>2]=r;g=c[b+64>>2]|0;h=c[b+64+4>>2]|0;if(r>>>0<q>>>0|(r|0)==(q|0)&p>>>0<o>>>0){g=we(g|0,h|0,1,0)|0;h=D;c[b+64>>2]=g;c[b+64+4>>2]=h}k=we(g|0,h|0,j|0,k|0)|0;c[b+64>>2]=k;c[b+64+4>>2]=D;k=te(128,0,l&127|0,0)|0;g=D;if(g>>>0>f>>>0|(g|0)==(f|0)&k>>>0>e>>>0){g=0;h=0;while(1){q=a[d+g>>0]|0;r=we(g|0,h|0,l&127|0,0)|0;a[b+80+r>>0]=q;g=we(g|0,h|0,1,0)|0;h=D;if(!(h>>>0<f>>>0|(h|0)==(f|0)&g>>>0<e>>>0))break a}}if(!((k|0)==0&(g|0)==0)){h=0;j=0;do{q=a[d+h>>0]|0;r=we(h|0,j|0,l&127|0,0)|0;a[b+80+r>>0]=q;h=we(h|0,j|0,1,0)|0;j=D}while(j>>>0<g>>>0|(j|0)==(g|0)&h>>>0<k>>>0)}ja(b,b+80|0,m,m+640|0);g=te(e|0,f|0,k|0,g|0)|0;h=D;if(h>>>0>0|(h|0)==0&g>>>0>127){j=d+k|0;do{ja(b,j,m,m+640|0);j=j+128|0;g=we(g|0,h|0,-128,-1)|0;h=D}while(h>>>0>0|(h|0)==0&g>>>0>127);k=j}else k=d+k|0;g=g&127;if(!((g|0)==0&0==0)){h=0;j=0;do{a[b+80+h>>0]=a[k+h>>0]|0;h=we(h|0,j|0,1,0)|0;j=D}while(j>>>0<0|(j|0)==0&h>>>0<g>>>0)}ld(m,704)}while(0);i=n;return 0}function Ka(a,b){a=a|0;b=b|0;var c=0,d=0;c=i;d=i=i+63&-64;i=i+160|0;ra(d+120|0,b);ra(d+80|0,d+120|0);ra(d+80|0,d+80|0);oa(d+80|0,b,d+80|0);oa(d+120|0,d+120|0,d+80|0);ra(d+40|0,d+120|0);oa(d+80|0,d+80|0,d+40|0);ra(d+40|0,d+80|0);b=1;do{ra(d+40|0,d+40|0);b=b+1|0}while((b|0)!=5);oa(d+80|0,d+40|0,d+80|0);ra(d+40|0,d+80|0);b=1;do{ra(d+40|0,d+40|0);b=b+1|0}while((b|0)!=10);oa(d+40|0,d+40|0,d+80|0);ra(d,d+40|0);b=1;do{ra(d,d);b=b+1|0}while((b|0)!=20);oa(d+40|0,d,d+40|0);ra(d+40|0,d+40|0);b=1;do{ra(d+40|0,d+40|0);b=b+1|0}while((b|0)!=10);oa(d+80|0,d+40|0,d+80|0);ra(d+40|0,d+80|0);b=1;do{ra(d+40|0,d+40|0);b=b+1|0}while((b|0)!=50);oa(d+40|0,d+40|0,d+80|0);ra(d,d+40|0);b=1;do{ra(d,d);b=b+1|0}while((b|0)!=100);oa(d+40|0,d,d+40|0);ra(d+40|0,d+40|0);b=1;do{ra(d+40|0,d+40|0);b=b+1|0}while((b|0)!=50);oa(d+80|0,d+40|0,d+80|0);ra(d+80|0,d+80|0);b=1;do{ra(d+80|0,d+80|0);b=b+1|0}while((b|0)!=5);oa(a,d+80|0,d+120|0);i=c;return}function La(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;d=i;e=i=i+63&-64;i=i+128|0;ra(e+80|0,b);ra(e+40|0,e+80|0);ra(e+40|0,e+40|0);oa(e+40|0,b,e+40|0);oa(e+80|0,e+80|0,e+40|0);ra(e+80|0,e+80|0);oa(e+80|0,e+40|0,e+80|0);ra(e+40|0,e+80|0);c=1;do{ra(e+40|0,e+40|0);c=c+1|0}while((c|0)!=5);oa(e+80|0,e+40|0,e+80|0);ra(e+40|0,e+80|0);c=1;do{ra(e+40|0,e+40|0);c=c+1|0}while((c|0)!=10);oa(e+40|0,e+40|0,e+80|0);ra(e,e+40|0);c=1;do{ra(e,e);c=c+1|0}while((c|0)!=20);oa(e+40|0,e,e+40|0);ra(e+40|0,e+40|0);c=1;do{ra(e+40|0,e+40|0);c=c+1|0}while((c|0)!=10);oa(e+80|0,e+40|0,e+80|0);ra(e+40|0,e+80|0);c=1;do{ra(e+40|0,e+40|0);c=c+1|0}while((c|0)!=50);oa(e+40|0,e+40|0,e+80|0);ra(e,e+40|0);c=1;do{ra(e,e);c=c+1|0}while((c|0)!=100);oa(e+40|0,e,e+40|0);ra(e+40|0,e+40|0);c=1;do{ra(e+40|0,e+40|0);c=c+1|0}while((c|0)!=50);oa(e+80|0,e+40|0,e+80|0);ra(e+80|0,e+80|0);ra(e+80|0,e+80|0);oa(a,e+80|0,b);i=d;return}function Ma(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;m=c[d>>2]|0;h=c[d+4>>2]|0;i=c[d+8>>2]|0;j=c[d+12>>2]|0;p=c[d+16>>2]|0;f=c[d+20>>2]|0;g=c[d+24>>2]|0;n=c[d+28>>2]|0;e=c[d+32>>2]|0;d=c[d+36>>2]|0;o=((((((((((((((d*19|0)+16777216|0)>>>25)+m>>26)+h>>25)+i>>26)+j>>25)+p>>26)+f>>25)+g>>26)+n>>25)+e>>26)+d>>25)*19|0)+m>>26;m=((((((((((((((d*19|0)+16777216|0)>>>25)+m>>26)+h>>25)+i>>26)+j>>25)+p>>26)+f>>25)+g>>26)+n>>25)+e>>26)+d>>25)*19|0)+m-(o<<26)|0;l=o+h-(o+h>>25<<25)|0;k=(o+h>>25)+i-((o+h>>25)+i>>26<<26)|0;q=((o+h>>25)+i>>26)+j>>25;j=((o+h>>25)+i>>26)+j-(q<<25)|0;i=q+p-(q+p>>26<<26)|0;h=(q+p>>26)+f-((q+p>>26)+f>>25<<25)|0;o=((q+p>>26)+f>>25)+g>>26;g=((q+p>>26)+f>>25)+g-(o<<26)|0;f=o+n-(o+n>>25<<25)|0;d=((o+n>>25)+e>>26)+d|0;e=(o+n>>25)+e-((o+n>>25)+e>>26<<26)|0;a[b>>0]=m;a[b+1>>0]=m>>>8;a[b+2>>0]=m>>>16;a[b+3>>0]=l<<2|m>>>24;a[b+4>>0]=l>>>6;a[b+5>>0]=l>>>14;a[b+6>>0]=k<<3|l>>>22;a[b+7>>0]=k>>>5;a[b+8>>0]=k>>>13;a[b+9>>0]=j<<5|k>>>21;a[b+10>>0]=j>>>3;a[b+11>>0]=j>>>11;a[b+12>>0]=i<<6|j>>>19;a[b+13>>0]=i>>>2;a[b+14>>0]=i>>>10;a[b+15>>0]=i>>>18;a[b+16>>0]=h;a[b+17>>0]=h>>>8;a[b+18>>0]=h>>>16;a[b+19>>0]=g<<1|h>>>24;a[b+20>>0]=g>>>7;a[b+21>>0]=g>>>15;a[b+22>>0]=f<<3|g>>>23;a[b+23>>0]=f>>>5;a[b+24>>0]=f>>>13;a[b+25>>0]=e<<4|f>>>21;a[b+26>>0]=e>>>4;a[b+27>>0]=e>>>12;a[b+28>>0]=e>>>20|(d&33554431)<<6;a[b+29>>0]=d>>>2;a[b+30>>0]=d>>>10;a[b+31>>0]=(d&33554431)>>>18;return}function Na(b,e,f,g,h,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;s=i;t=i=i+63&-64;i=i+112|0;if(!((f|0)==0&(g|0)==0)){n=t+16|0;m=n+32|0;do{a[n>>0]=a[l>>0]|0;n=n+1|0;l=l+1|0}while((n|0)<(m|0));n=d[h+4>>0]|d[h+4+1>>0]<<8|d[h+4+2>>0]<<16|d[h+4+3>>0]<<24;c[t>>2]=d[h>>0]|d[h+1>>0]<<8|d[h+2>>0]<<16|d[h+3>>0]<<24;c[t+4>>2]=n;a[t+8>>0]=j;n=Yd(j|0,k|0,8)|0;a[t+9>>0]=n;n=Yd(j|0,k|0,16)|0;a[t+10>>0]=n;n=Yd(j|0,k|0,24)|0;a[t+11>>0]=n;a[t+12>>0]=k;n=Yd(j|0,k|0,40)|0;a[t+13>>0]=n;n=Yd(j|0,k|0,48)|0;a[t+14>>0]=n;n=Yd(j|0,k|0,56)|0;a[t+15>>0]=n;if(g>>>0>0|(g|0)==0&f>>>0>63){do{xa(t+48|0,t,t+16|0,0)|0;l=0;do{a[b+l>>0]=a[t+48+l>>0]^a[e+l>>0];l=l+1|0}while((l|0)!=64);l=1;m=8;while(1){n=t+m|0;l=(d[n>>0]|0)+l|0;a[n>>0]=l;m=m+1|0;if((m|0)==16)break;else l=l>>>8}f=we(f|0,g|0,-64,-1)|0;g=D;b=b+64|0;e=e+64|0}while(g>>>0>0|(g|0)==0&f>>>0>63);if(!((f|0)==0&(g|0)==0)){p=b;q=f;r=e;o=8}}else{p=b;q=f;r=e;o=8}if((o|0)==8?(xa(t+48|0,t,t+16|0,0)|0,q|0):0){l=0;do{a[p+l>>0]=a[t+48+l>>0]^a[r+l>>0];l=l+1|0}while((l|0)!=(q|0))}ld(t+48|0,64);ld(t+16|0,32)}i=s;return 0}function Oa(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;f=c[b+56>>2]|0;g=c[b+56+4>>2]|0;if(!((f|0)==0&(g|0)==0)){a[b+64+f>>0]=1;e=we(f|0,g|0,1,0)|0;h=D;if(h>>>0<0|(h|0)==0&e>>>0<16){h=te(14,0,f|0,g|0)|0;Nc(b+64+e|0,0,h+1|0)|0}a[b+80>>0]=1;Ca(b,b+64|0,16,0)}g=c[b+24>>2]|0;h=(c[b+28>>2]|0)+(g>>>26)|0;k=(h>>>26)+(c[b+32>>2]|0)|0;i=(k>>>26)+(c[b+36>>2]|0)|0;e=((i>>>26)*5|0)+(c[b+20>>2]|0)|0;l=((((e&67108863)+5|0)>>>26)+((e>>>26)+(g&67108863))|0)>>>26;j=(i|-67108864)+((((l+(h&67108863)|0)>>>26)+(k&67108863)|0)>>>26)|0;g=(((e&67108863)+5|0)>>>26)+((e>>>26)+(g&67108863))&67108863&(j>>>31)+-1|j>>31&(e>>>26)+(g&67108863);k=((l+(h&67108863)|0)>>>26)+k&67108863&(j>>>31)+-1|j>>31&(k&67108863);e=we(e+5&67108863&(j>>>31)+-1|j>>31&(e&67108863)|g<<26|0,0,c[b+40>>2]|0,0)|0;f=D;g=we(g>>>6|(l+h&67108863&(j>>>31)+-1|j>>31&(h&67108863))<<20|0,0,c[b+44>>2]|0,0)|0;f=we(g|0,D|0,f|0,0)|0;g=D;h=we((l+h&67108863&(j>>>31)+-1|j>>31&(h&67108863))>>>12|k<<14|0,0,c[b+48>>2]|0,0)|0;g=we(h|0,D|0,g|0,0)|0;h=D;i=we(k>>>18|((j>>>31)+-1&j|j>>31&i)<<8|0,0,c[b+52>>2]|0,0)|0;h=we(i|0,D|0,h|0,0)|0;a[d>>0]=e;a[d+1>>0]=e>>8;a[d+2>>0]=e>>16;a[d+3>>0]=e>>24;a[d+4>>0]=f;a[d+4+1>>0]=f>>8;a[d+4+2>>0]=f>>16;a[d+4+3>>0]=f>>24;a[d+8>>0]=g;a[d+8+1>>0]=g>>8;a[d+8+2>>0]=g>>16;a[d+8+3>>0]=g>>24;a[d+12>>0]=h;a[d+12+1>>0]=h>>8;a[d+12+2>>0]=h>>16;a[d+12+3>>0]=h>>24;ld(b,88);return}function Pa(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;q=i;r=i=i+63&-64;i=i+288|0;f=c[b+32>>2]|0;g=c[b+32+4>>2]|0;e=Yd(f|0,g|0,3)|0;if(0<0|0==0&(e&56)>>>0<56){yc(b+40+(e&63)|0,33623,56-(e&63)|0)|0;j=Yd(f|0,g|0,8)|0;l=Yd(f|0,g|0,16)|0;m=Yd(f|0,g|0,24)|0;t=Yd(f|0,g|0,40)|0;s=Yd(f|0,g|0,48)|0;h=Yd(f|0,g|0,56)|0;n=b+40|0;o=r+256|0;p=b;k=f&255;l=l&255;m=m&255;e=g&255;f=t&255;g=s&255;h=h&255;j=j&255}else{yc(b+40+(e&63)|0,33623,64-(e&63)|0)|0;pa(b,b+40|0,r,r+256|0);e=b+40|0;f=e+56|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(f|0));k=c[b+32>>2]|0;e=c[b+32+4>>2]|0;j=Yd(k|0,e|0,8)|0;l=Yd(k|0,e|0,16)|0;m=Yd(k|0,e|0,24)|0;f=Yd(k|0,e|0,40)|0;g=Yd(k|0,e|0,48)|0;h=Yd(k|0,e|0,56)|0;n=b+40|0;o=r+256|0;p=b;k=k&255;l=l&255;m=m&255;e=e&255;f=f&255;g=g&255;h=h&255;j=j&255}a[b+103>>0]=k;a[b+102>>0]=j;a[b+101>>0]=l;a[b+100>>0]=m;a[b+99>>0]=e;a[b+98>>0]=f;a[b+97>>0]=g;a[b+96>>0]=h;pa(p,n,r,o);e=0;do{t=d+(e<<2)|0;s=c[b+(e<<2)>>2]|0;a[t+3>>0]=s;a[t+2>>0]=s>>>8;a[t+1>>0]=s>>>16;a[t>>0]=s>>>24;e=e+1|0}while((e|0)!=8);ld(r,288);ld(b,104);i=q;return 0}function Qa(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;n=i;m=i=i+63&-64;i=i+288|0;a:do if(!((e|0)==0&(f|0)==0)){j=c[b+32>>2]|0;g=c[b+32+4>>2]|0;k=Yd(j|0,g|0,3)|0;l=Wd(e|0,f|0,3)|0;l=we(j|0,g|0,l|0,D|0)|0;c[b+32>>2]=l;c[b+32+4>>2]=D;l=te(64,0,k&63|0,0)|0;g=D;if(g>>>0>f>>>0|(g|0)==(f|0)&l>>>0>e>>>0){g=0;h=0;while(1){l=a[d+g>>0]|0;m=we(g|0,h|0,k&63|0,0)|0;a[b+40+m>>0]=l;g=we(g|0,h|0,1,0)|0;h=D;if(!(h>>>0<f>>>0|(h|0)==(f|0)&g>>>0<e>>>0))break a}}if(!((l|0)==0&(g|0)==0)){h=0;j=0;do{p=a[d+h>>0]|0;o=we(h|0,j|0,k&63|0,0)|0;a[b+40+o>>0]=p;h=we(h|0,j|0,1,0)|0;j=D}while(j>>>0<g>>>0|(j|0)==(g|0)&h>>>0<l>>>0)}pa(b,b+40|0,m,m+256|0);g=te(e|0,f|0,l|0,g|0)|0;h=D;if(h>>>0>0|(h|0)==0&g>>>0>63){j=d+l|0;do{pa(b,j,m,m+256|0);j=j+64|0;g=we(g|0,h|0,-64,-1)|0;h=D}while(h>>>0>0|(h|0)==0&g>>>0>63);k=j}else k=d+l|0;g=g&63;if(!((g|0)==0&0==0)){h=0;j=0;do{a[b+40+h>>0]=a[k+h>>0]|0;h=we(h|0,j|0,1,0)|0;j=D}while(j>>>0<0|(j|0)==0&h>>>0<g>>>0)}ld(m,288)}while(0);i=n;return 0}function Ra(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;g=i;h=i=i+63&-64;i=i+592|0;f=0;do{k=a[e+f>>0]|0;j=f<<1;a[h+520+j>>0]=k&15;a[h+520+(j|1)>>0]=(k&255)>>>4;f=f+1|0}while((f|0)!=32);f=0;e=0;do{k=h+520+e|0;j=(d[k>>0]|0)+f|0;f=(j<<24)+134217728>>28;a[k>>0]=j-(f<<4);e=e+1|0}while((e|0)!=63);a[h+520+63>>0]=(d[h+520+63>>0]|0)+f;f=b;e=f+40|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(e|0));c[b+40>>2]=1;f=b+44|0;e=f+36|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(e|0));c[b+80>>2]=1;f=b+84|0;e=f+76|0;do{c[f>>2]=0;f=f+4|0}while((f|0)<(e|0));f=1;do{Ia(h,(f|0)/2|0,a[h+520+f>>0]|0);Zb(h+240|0,b,h);ed(b,h+240|0);f=f+2|0}while((f|0)<64);db(h+400|0,b);ic(h+240|0,h+400|0);Ad(h+120|0,h+240|0);ic(h+240|0,h+120|0);Ad(h+120|0,h+240|0);ic(h+240|0,h+120|0);Ad(h+120|0,h+240|0);ic(h+240|0,h+120|0);ed(b,h+240|0);f=0;do{Ia(h,(f|0)/2|0,a[h+520+f>>0]|0);Zb(h+240|0,b,h);ed(b,h+240|0);f=f+2|0}while((f|0)<64);i=g;return}function Sa(b,e,f,g,h,j){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0;m=i;n=i=i+63&-64;i=i+192|0;if((e+-1&255)>63)ba();if((f|0)!=0&g<<24>>24!=0?(g&255)<=64:0){a[n+128>>0]=e;a[n+128+1>>0]=g;a[n+128+2>>0]=1;a[n+128+3>>0]=1;k=n+128+4|0;l=k+28|0;do{a[k>>0]=0;k=k+1|0}while((k|0)<(l|0));if(!h){k=n+128+32|0;l=k+16|0;do{a[k>>0]=0;k=k+1|0}while((k|0)<(l|0))}else{k=n+128+32|0;e=h;l=k+16|0;do{a[k>>0]=a[e>>0]|0;k=k+1|0;e=e+1|0}while((k|0)<(l|0))}if(!j){k=n+128+48|0;l=k+16|0;do{a[k>>0]=0;k=k+1|0}while((k|0)<(l|0))}else{k=n+128+48|0;e=j;l=k+16|0;do{a[k>>0]=a[e>>0]|0;k=k+1|0;e=e+1|0}while((k|0)<(l|0))}Nc(b+64|0,0,293)|0;k=b;e=400;l=k+64|0;do{c[k>>2]=c[e>>2];k=k+4|0;e=e+4|0}while((k|0)<(l|0));e=0;do{k=n+128+(e<<3)|0;j=b+(e<<3)|0;l=c[j+4>>2]^(d[k+4>>0]|d[k+4+1>>0]<<8|d[k+4+2>>0]<<16|d[k+4+3>>0]<<24);c[j>>2]=c[j>>2]^(d[k>>0]|d[k+1>>0]<<8|d[k+2>>0]<<16|d[k+3>>0]<<24);c[j+4>>2]=l;e=e+1|0}while((e|0)!=8);Nc(n+(g&255)|0,0,(g<<24>>24<0?0:128-(g&255)|0)|0)|0;yc(n|0,f|0,g&255|0)|0;lb(b,n,128,0);ld(n,128);i=m;return}ba()}function Ta(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;h=c[b+56>>2]|0;g=c[b+56+4>>2]|0;if(!((h|0)==0&(g|0)==0)){j=te(16,0,h|0,g|0)|0;l=D;k=l>>>0>f>>>0|(l|0)==(f|0)&j>>>0>e>>>0?e:j;l=l>>>0>f>>>0|(l|0)==(f|0)&j>>>0>e>>>0?f:l;if(!((k|0)==0&(l|0)==0)){j=0;i=0;do{n=a[d+j>>0]|0;h=we(h|0,g|0,j|0,i|0)|0;a[b+64+h>>0]=n;j=we(j|0,i|0,1,0)|0;i=D;h=c[b+56>>2]|0;g=c[b+56+4>>2]|0}while(i>>>0<l>>>0|(i|0)==(l|0)&j>>>0<k>>>0)}n=we(h|0,g|0,k|0,l|0)|0;j=D;c[b+56>>2]=n;c[b+56+4>>2]=j;if(!(j>>>0<0|(j|0)==0&n>>>0<16)){e=te(e|0,f|0,k|0,l|0)|0;f=D;Ca(b,b+64|0,16,0);c[b+56>>2]=0;c[b+56+4>>2]=0;d=d+k|0;m=6}}else m=6;if((m|0)==6){g=e&-16;if(f>>>0>0|(f|0)==0&e>>>0>15){h=te(e|0,f|0,g|0,f|0)|0;n=D;Ca(b,d,g,f);i=d+g|0;g=n}else{i=d;h=e;g=f}if(!((h|0)==0&(g|0)==0)){e=0;d=0;do{m=a[i+e>>0]|0;n=we(c[b+56>>2]|0,c[b+56+4>>2]|0,e|0,d|0)|0;a[b+64+n>>0]=m;e=we(e|0,d|0,1,0)|0;d=D}while(d>>>0<g>>>0|(d|0)==(g|0)&e>>>0<h>>>0);n=we(c[b+56>>2]|0,c[b+56+4>>2]|0,h|0,g|0)|0;c[b+56>>2]=n;c[b+56+4>>2]=D}}return}function Ua(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=i;f=i=i+63&-64;i=i+368|0;if(!((a|0)==0|(b|0)==0)){Dc(f,0,0,64)|0;c[f+360>>2]=c[b+48>>2];Ce(f,f+360|0,4,0)|0;c[f+360>>2]=c[b+4>>2];Ce(f,f+360|0,4,0)|0;c[f+360>>2]=c[b+44>>2];Ce(f,f+360|0,4,0)|0;c[f+360>>2]=c[b+40>>2];Ce(f,f+360|0,4,0)|0;c[f+360>>2]=19;Ce(f,f+360|0,4,0)|0;c[f+360>>2]=d;Ce(f,f+360|0,4,0)|0;c[f+360>>2]=c[b+12>>2];Ce(f,f+360|0,4,0)|0;d=c[b+8>>2]|0;if(d|0?(Ce(f,d,c[b+12>>2]|0,0)|0,c[b+56>>2]&1|0):0){ld(c[b+8>>2]|0,c[b+12>>2]|0);c[b+12>>2]=0}c[f+360>>2]=c[b+20>>2];Ce(f,f+360|0,4,0)|0;d=c[b+16>>2]|0;if(d|0)Ce(f,d,c[b+20>>2]|0,0)|0;c[f+360>>2]=c[b+28>>2];Ce(f,f+360|0,4,0)|0;d=c[b+24>>2]|0;if(d|0?(Ce(f,d,c[b+28>>2]|0,0)|0,c[b+56>>2]&2|0):0){ld(c[b+24>>2]|0,c[b+28>>2]|0);c[b+28>>2]=0}c[f+360>>2]=c[b+36>>2];Ce(f,f+360|0,4,0)|0;d=c[b+32>>2]|0;if(d|0)Ce(f,d,c[b+36>>2]|0,0)|0;Ld(f,a,64)|0}i=e;return}function Va(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0;k=i;l=i=i+63&-64;i=i+496|0;c[l+360>>2]=d;if(d>>>0<65){if((Dc(l,0,0,d)|0)>=0){Ce(l,l+360|0,4,0)|0;Ce(l,e,f,0)|0;Ld(l,b,d)|0}}else a:do if((Dc(l,0,0,64)|0)>=0?(Ce(l,l+360|0,4,0)|0,Ce(l,e,f,0)|0,(Ld(l,l+432|0,64)|0)>=0):0){g=b;h=l+432|0;j=g+32|0;do{a[g>>0]=a[h>>0]|0;g=g+1|0;h=h+1|0}while((g|0)<(j|0));g=l+368|0;h=l+432|0;j=g+64|0;do{a[g>>0]=a[h>>0]|0;g=g+1|0;h=h+1|0}while((g|0)<(j|0));if((d+-32|0)>>>0>64){f=d+-32|0;e=b+32|0;do{if((Ic(l+432|0,64,l+368|0,64,0,0,0)|0)<0)break a;g=e;h=l+432|0;j=g+32|0;do{a[g>>0]=a[h>>0]|0;g=g+1|0;h=h+1|0}while((g|0)<(j|0));f=f+-32|0;e=e+32|0;g=l+368|0;h=l+432|0;j=g+64|0;do{a[g>>0]=a[h>>0]|0;g=g+1|0;h=h+1|0}while((g|0)<(j|0))}while(f>>>0>64)}else{f=d+-32|0;e=b+32|0}if((Ic(l+432|0,f,l+368|0,64,0,0,0)|0)>=0)yc(e|0,l+432|0,f|0)|0}while(0);ld(l,357);i=k;return}function Wa(a,b,e,f,g,h,j){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;k=i;l=i=i+63&-64;i=i+64|0;if(!((e|0)==0&(f|0)==0)){c[l>>2]=1634760805;c[l+4>>2]=857760878;c[l+8>>2]=2036477234;c[l+12>>2]=1797285236;c[l+16>>2]=d[j>>0]|d[j+1>>0]<<8|d[j+2>>0]<<16|d[j+3>>0]<<24;c[l+20>>2]=d[j+4>>0]|d[j+4+1>>0]<<8|d[j+4+2>>0]<<16|d[j+4+3>>0]<<24;c[l+24>>2]=d[j+8>>0]|d[j+8+1>>0]<<8|d[j+8+2>>0]<<16|d[j+8+3>>0]<<24;c[l+28>>2]=d[j+12>>0]|d[j+12+1>>0]<<8|d[j+12+2>>0]<<16|d[j+12+3>>0]<<24;c[l+32>>2]=d[j+16>>0]|d[j+16+1>>0]<<8|d[j+16+2>>0]<<16|d[j+16+3>>0]<<24;c[l+36>>2]=d[j+20>>0]|d[j+20+1>>0]<<8|d[j+20+2>>0]<<16|d[j+20+3>>0]<<24;c[l+40>>2]=d[j+24>>0]|d[j+24+1>>0]<<8|d[j+24+2>>0]<<16|d[j+24+3>>0]<<24;c[l+44>>2]=d[j+28>>0]|d[j+28+1>>0]<<8|d[j+28+2>>0]<<16|d[j+28+3>>0]<<24;c[l+48>>2]=h;c[l+52>>2]=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;c[l+56>>2]=d[g+4>>0]|d[g+4+1>>0]<<8|d[g+4+2>>0]<<16|d[g+4+3>>0]<<24;c[l+60>>2]=d[g+8>>0]|d[g+8+1>>0]<<8|d[g+8+2>>0]<<16|d[g+8+3>>0]<<24;va(l,b,a,e,f);ld(l,64)}i=k;return 0}function Xa(a,b,e,f,g){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;var h=0,j=0;h=i;j=i=i+63&-64;i=i+64|0;if(!((b|0)==0&(e|0)==0)){c[j>>2]=1634760805;c[j+4>>2]=857760878;c[j+8>>2]=2036477234;c[j+12>>2]=1797285236;c[j+16>>2]=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;c[j+20>>2]=d[g+4>>0]|d[g+4+1>>0]<<8|d[g+4+2>>0]<<16|d[g+4+3>>0]<<24;c[j+24>>2]=d[g+8>>0]|d[g+8+1>>0]<<8|d[g+8+2>>0]<<16|d[g+8+3>>0]<<24;c[j+28>>2]=d[g+12>>0]|d[g+12+1>>0]<<8|d[g+12+2>>0]<<16|d[g+12+3>>0]<<24;c[j+32>>2]=d[g+16>>0]|d[g+16+1>>0]<<8|d[g+16+2>>0]<<16|d[g+16+3>>0]<<24;c[j+36>>2]=d[g+20>>0]|d[g+20+1>>0]<<8|d[g+20+2>>0]<<16|d[g+20+3>>0]<<24;c[j+40>>2]=d[g+24>>0]|d[g+24+1>>0]<<8|d[g+24+2>>0]<<16|d[g+24+3>>0]<<24;c[j+44>>2]=d[g+28>>0]|d[g+28+1>>0]<<8|d[g+28+2>>0]<<16|d[g+28+3>>0]<<24;c[j+48>>2]=0;c[j+52>>2]=d[f>>0]|d[f+1>>0]<<8|d[f+2>>0]<<16|d[f+3>>0]<<24;c[j+56>>2]=d[f+4>>0]|d[f+4+1>>0]<<8|d[f+4+2>>0]<<16|d[f+4+3>>0]<<24;c[j+60>>2]=d[f+8>>0]|d[f+8+1>>0]<<8|d[f+8+2>>0]<<16|d[f+8+3>>0]<<24;Nc(a|0,0,b|0)|0;va(j,a,a,b,e);ld(j,64)}i=h;return 0}function Ya(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0;n=i;m=i=i+63&-64;i=i+592|0;h=32;g=1;j=0;while(1){h=h+-1|0;k=a[b+32+h>>0]|0;l=a[34002+h>>0]|0;g=g&255;j=((k&255)-(l&255)|0)>>>8&g|j&255;if(!h)break;else g=(((l^k)&255)+65535|0)>>>8&g}a:do if(j){h=0;do{g=0;j=0;do{j=a[16+(h<<5)+g>>0]^a[b+g>>0]|j;g=g+1|0}while((g|0)!=32);h=h+1|0;if(!(j<<24>>24)){g=-1;break a}}while(h>>>0<12);if(!(Aa(m+328|0,f)|0)){g=0;h=0;do{h=a[f+g>>0]|h;g=g+1|0}while((g|0)!=32);if(h<<24>>24){td(m)|0;Ja(m,b,32,0)|0;Ja(m,f,32,0)|0;Ja(m,c,d,e)|0;Wb(m,m+520|0)|0;na(m+520|0);Fa(m+208|0,m+520|0,m+328|0,b+32|0);Ac(m+488|0,m+208|0);g=Fd(m+488|0,b)|0;g=((m+488|0)==(b|0)?-1:g)|(Jc(b,m+488|0,32)|0)}else g=-1}else g=-1}else g=-1;while(0);i=n;return g|0}function Za(b,c,d,e,f,g,h){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0;k=i;l=i=i+63&-64;i=i+352|0;Ba(l+256|0,g,h,0)|0;if(b>>>0>=d>>>0?0<f>>>0|0==(f|0)&(b-d|0)>>>0<e>>>0:0)j=5;else if(d>>>0>=b>>>0?0<f>>>0|0==(f|0)&(d-b|0)>>>0<e>>>0:0)j=5;if((j|0)==5){cd(b|0,d|0,e|0)|0;d=b}h=l+288|0;j=h+32|0;do{a[h>>0]=0;h=h+1|0}while((h|0)<(j|0));h=f>>>0>0|(f|0)==0&e>>>0>32?32:e;j=f>>>0>0|(f|0)==0&e>>>0>32?0:f;if(!((h|0)==0&(j|0)==0)){m=we((f>>>0<0|(f|0)==0&e>>>0<32?e:32)|0,(f>>>0<0|(f|0)==0&e>>>0<32?f:0)|0,-1,0)|0;yc(l+288+32|0,d|0,m+1|0)|0}m=we(h|0,j|0,32,0)|0;fe(l+288|0,l+288|0,m,D,g+16|0,l+256|0)|0;af(l,l+288|0)|0;if(!((h|0)==0&(j|0)==0)){m=we((f>>>0<0|(f|0)==0&e>>>0<32?e:32)|0,(f>>>0<0|(f|0)==0&e>>>0<32?f:0)|0,-1,0)|0;yc(b|0,l+288+32|0,m+1|0)|0}ld(l+288|0,64);if(f>>>0>0|(f|0)==0&e>>>0>32){m=te(e|0,f|0,h|0,j|0)|0;Nd(b+h|0,d+h|0,m,D,g+16|0,1,0,l+256|0)|0}ld(l+256|0,32);ve(l,b,e,f)|0;$e(l,c)|0;ld(l,256);i=k;return 0}function _a(a,b,e,f,g,h,j,k){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0;l=i;m=i=i+63&-64;i=i+64|0;if(!((e|0)==0&(f|0)==0)){c[m>>2]=1634760805;c[m+4>>2]=857760878;c[m+8>>2]=2036477234;c[m+12>>2]=1797285236;c[m+16>>2]=d[k>>0]|d[k+1>>0]<<8|d[k+2>>0]<<16|d[k+3>>0]<<24;c[m+20>>2]=d[k+4>>0]|d[k+4+1>>0]<<8|d[k+4+2>>0]<<16|d[k+4+3>>0]<<24;c[m+24>>2]=d[k+8>>0]|d[k+8+1>>0]<<8|d[k+8+2>>0]<<16|d[k+8+3>>0]<<24;c[m+28>>2]=d[k+12>>0]|d[k+12+1>>0]<<8|d[k+12+2>>0]<<16|d[k+12+3>>0]<<24;c[m+32>>2]=d[k+16>>0]|d[k+16+1>>0]<<8|d[k+16+2>>0]<<16|d[k+16+3>>0]<<24;c[m+36>>2]=d[k+20>>0]|d[k+20+1>>0]<<8|d[k+20+2>>0]<<16|d[k+20+3>>0]<<24;c[m+40>>2]=d[k+24>>0]|d[k+24+1>>0]<<8|d[k+24+2>>0]<<16|d[k+24+3>>0]<<24;c[m+44>>2]=d[k+28>>0]|d[k+28+1>>0]<<8|d[k+28+2>>0]<<16|d[k+28+3>>0]<<24;c[m+48>>2]=h;c[m+52>>2]=j;c[m+56>>2]=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;c[m+60>>2]=d[g+4>>0]|d[g+4+1>>0]<<8|d[g+4+2>>0]<<16|d[g+4+3>>0]<<24;va(m,b,a,e,f);ld(m,64)}i=l;return 0}function $a(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;k=i;l=i=i+63&-64;i=i+1024|0;if(c[e+20>>2]|0){j=0;do{a[b+64>>0]=0;a[b+64+1>>0]=0;a[b+64+2>>0]=0;a[b+64+3>>0]=0;a[b+68>>0]=j;a[b+68+1>>0]=j>>8;a[b+68+2>>0]=j>>16;a[b+68+3>>0]=j>>24;Va(l,1024,b,72);g=S(c[e+16>>2]|0,j)|0;h=c[(c[e>>2]|0)+4>>2]|0;f=0;do{o=l+(f<<3)|0;n=d[o+4>>0]|d[o+4+1>>0]<<8|d[o+4+2>>0]<<16|d[o+4+3>>0]<<24;m=h+(g<<10)+(f<<3)|0;c[m>>2]=d[o>>0]|d[o+1>>0]<<8|d[o+2>>0]<<16|d[o+3>>0]<<24;c[m+4>>2]=n;f=f+1|0}while((f|0)!=128);a[b+64>>0]=1;a[b+64+1>>0]=0;a[b+64+2>>0]=0;a[b+64+3>>0]=0;Va(l,1024,b,72);g=(S(c[e+16>>2]|0,j)|0)+1|0;h=c[(c[e>>2]|0)+4>>2]|0;f=0;do{m=l+(f<<3)|0;n=d[m+4>>0]|d[m+4+1>>0]<<8|d[m+4+2>>0]<<16|d[m+4+3>>0]<<24;o=h+(g<<10)+(f<<3)|0;c[o>>2]=d[m>>0]|d[m+1>>0]<<8|d[m+2>>0]<<16|d[m+3>>0]<<24;c[o+4>>2]=n;f=f+1|0}while((f|0)!=128);j=j+1|0}while(j>>>0<(c[e+20>>2]|0)>>>0)}ld(l,1024);i=k;return}function ab(a,b,e,f,g){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;var h=0,j=0;h=i;j=i=i+63&-64;i=i+64|0;if(!((b|0)==0&(e|0)==0)){c[j>>2]=1634760805;c[j+4>>2]=857760878;c[j+8>>2]=2036477234;c[j+12>>2]=1797285236;c[j+16>>2]=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;c[j+20>>2]=d[g+4>>0]|d[g+4+1>>0]<<8|d[g+4+2>>0]<<16|d[g+4+3>>0]<<24;c[j+24>>2]=d[g+8>>0]|d[g+8+1>>0]<<8|d[g+8+2>>0]<<16|d[g+8+3>>0]<<24;c[j+28>>2]=d[g+12>>0]|d[g+12+1>>0]<<8|d[g+12+2>>0]<<16|d[g+12+3>>0]<<24;c[j+32>>2]=d[g+16>>0]|d[g+16+1>>0]<<8|d[g+16+2>>0]<<16|d[g+16+3>>0]<<24;c[j+36>>2]=d[g+20>>0]|d[g+20+1>>0]<<8|d[g+20+2>>0]<<16|d[g+20+3>>0]<<24;c[j+40>>2]=d[g+24>>0]|d[g+24+1>>0]<<8|d[g+24+2>>0]<<16|d[g+24+3>>0]<<24;c[j+44>>2]=d[g+28>>0]|d[g+28+1>>0]<<8|d[g+28+2>>0]<<16|d[g+28+3>>0]<<24;c[j+48>>2]=0;c[j+52>>2]=0;c[j+56>>2]=d[f>>0]|d[f+1>>0]<<8|d[f+2>>0]<<16|d[f+3>>0]<<24;c[j+60>>2]=d[f+4>>0]|d[f+4+1>>0]<<8|d[f+4+2>>0]<<16|d[f+4+3>>0]<<24;Nc(a|0,0,b|0)|0;va(j,a,a,b,e);ld(j,64)}i=h;return 0}function bb(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;p=i;o=i=i+63&-64;i=i+16|0;m=c[b+20>>2]|0;n=c[b+4>>2]|0;c[b+20>>2]=0;c[b+4>>2]=0;q=(xc(d,33832,8)|0)==0;d=q?d+8|0:d;do if((q?(xc(d,33841,3)|0)==0:0)?(g=oc(d+3|0,o)|0,(g|0)!=0):0)if((c[o>>2]|0)==19)if(((((((xc(g,33845,3)|0)==0?(h=oc(g+3|0,o)|0,j=c[o>>2]|0,(h|0)!=0):0)?(c[b+44>>2]=j,(xc(h,33849,3)|0)==0):0)?(k=oc(h+3|0,o)|0,e=(k|0)==0?j:c[o>>2]|0,(k|0)!=0):0)?(c[b+40>>2]=e,(xc(k,33853,3)|0)==0):0)?(l=oc(k+3|0,o)|0,f=(l|0)==0?e:c[o>>2]|0,(l|0)!=0):0)?(c[b+48>>2]=f,c[b+52>>2]=f,(a[l>>0]|0)==36):0){c[o>>2]=m;d=wb(c[b+16>>2]|0,o,l+1|0)|0;if(!d){d=-32;break}c[b+20>>2]=c[o>>2];if((a[d>>0]|0)==36){c[o>>2]=n;e=wb(c[b>>2]|0,o,d+1|0)|0;if(!e){d=-32;break}c[b+4>>2]=c[o>>2];d=kb(b)|0;if(!d)d=(a[e>>0]|0)==0?0:-32}else d=-32}else d=-32;else d=-26;else d=-32;while(0);i=p;return d|0}function cb(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0;if(e<<24>>24?(e&255)<=64:0){if((c[b+80>>2]|0)==0?(c[b+80+4>>2]|0)==0:0){f=c[b+352>>2]|0;do if(f>>>0>128){f=c[b+64>>2]|0;i=c[b+64+4>>2]|0;j=we(f|0,i|0,128,0)|0;c[b+64>>2]=j;c[b+64+4>>2]=D;f=we((i>>>0>4294967295|(i|0)==-1&f>>>0>4294967167)&1|0,0,c[b+72>>2]|0,c[b+72+4>>2]|0)|0;c[b+72>>2]=f;c[b+72+4>>2]=D;ha(b,b+96|0);f=(c[b+352>>2]|0)+-128|0;c[b+352>>2]=f;if(f>>>0<129){yc(b+96|0,b+224|0,f|0)|0;g=b+72|0;h=c[b+352>>2]|0;break}else fa(33233,33265,367,33310)}else{g=b+72|0;h=f}while(0);j=we(c[b+64>>2]|0,c[b+64+4>>2]|0,h|0,0)|0;f=D;c[b+64>>2]=j;c[b+64+4>>2]=f;i=g;i=we((f>>>0<0|(f|0)==0&j>>>0<h>>>0)&1|0,0,c[i>>2]|0,c[i+4>>2]|0)|0;j=g;c[j>>2]=i;c[j+4>>2]=D;if(a[b+356>>0]|0){c[b+88>>2]=-1;c[b+88+4>>2]=-1}c[b+80>>2]=-1;c[b+80+4>>2]=-1;Nc(b+96+h|0,0,256-h|0)|0;ha(b,b+96|0);yc(d|0,b|0,e&255|0)|0;f=0}else f=-1;return f|0}ba();return 0}function db(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;l=c[b+4>>2]|0;k=c[b+8>>2]|0;j=c[b+12>>2]|0;i=c[b+16>>2]|0;h=c[b+20>>2]|0;g=c[b+24>>2]|0;f=c[b+28>>2]|0;e=c[b+32>>2]|0;d=c[b+36>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=l;c[a+8>>2]=k;c[a+12>>2]=j;c[a+16>>2]=i;c[a+20>>2]=h;c[a+24>>2]=g;c[a+28>>2]=f;c[a+32>>2]=e;c[a+36>>2]=d;d=c[b+44>>2]|0;e=c[b+48>>2]|0;f=c[b+52>>2]|0;g=c[b+56>>2]|0;h=c[b+60>>2]|0;i=c[b+64>>2]|0;j=c[b+68>>2]|0;k=c[b+72>>2]|0;l=c[b+76>>2]|0;c[a+40>>2]=c[b+40>>2];c[a+44>>2]=d;c[a+48>>2]=e;c[a+52>>2]=f;c[a+56>>2]=g;c[a+60>>2]=h;c[a+64>>2]=i;c[a+68>>2]=j;c[a+72>>2]=k;c[a+76>>2]=l;l=c[b+84>>2]|0;k=c[b+88>>2]|0;j=c[b+92>>2]|0;i=c[b+96>>2]|0;h=c[b+100>>2]|0;g=c[b+104>>2]|0;f=c[b+108>>2]|0;e=c[b+112>>2]|0;d=c[b+116>>2]|0;c[a+80>>2]=c[b+80>>2];c[a+84>>2]=l;c[a+88>>2]=k;c[a+92>>2]=j;c[a+96>>2]=i;c[a+100>>2]=h;c[a+104>>2]=g;c[a+108>>2]=f;c[a+112>>2]=e;c[a+116>>2]=d;return}function eb(b,e,f,g,h){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;j=i;k=i=i+63&-64;i=i+96|0;c[k>>2]=(d[h>>0]|d[h+1>>0]<<8|d[h+2>>0]<<16|d[h+3>>0]<<24)&67108863;c[k+4>>2]=(d[h+3>>0]|d[h+3+1>>0]<<8|d[h+3+2>>0]<<16|d[h+3+3>>0]<<24)>>>2&67108611;c[k+8>>2]=(d[h+6>>0]|d[h+6+1>>0]<<8|d[h+6+2>>0]<<16|d[h+6+3>>0]<<24)>>>4&67092735;c[k+12>>2]=(d[h+9>>0]|d[h+9+1>>0]<<8|d[h+9+2>>0]<<16|d[h+9+3>>0]<<24)>>>6&66076671;c[k+16>>2]=(d[h+12>>0]|d[h+12+1>>0]<<8|d[h+12+2>>0]<<16|d[h+12+3>>0]<<24)>>>8&1048575;c[k+20>>2]=0;c[k+20+4>>2]=0;c[k+20+8>>2]=0;c[k+20+12>>2]=0;c[k+20+16>>2]=0;c[k+40>>2]=d[h+16>>0]|d[h+16+1>>0]<<8|d[h+16+2>>0]<<16|d[h+16+3>>0]<<24;c[k+44>>2]=d[h+20>>0]|d[h+20+1>>0]<<8|d[h+20+2>>0]<<16|d[h+20+3>>0]<<24;c[k+48>>2]=d[h+24>>0]|d[h+24+1>>0]<<8|d[h+24+2>>0]<<16|d[h+24+3>>0]<<24;c[k+52>>2]=d[h+28>>0]|d[h+28+1>>0]<<8|d[h+28+2>>0]<<16|d[h+28+3>>0]<<24;c[k+56>>2]=0;c[k+56+4>>2]=0;a[k+80>>0]=0;Ta(k,e,f,g);Oa(k,b);i=j;return 0}function fb(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;x=c[a>>2]|0;v=c[a+4>>2]|0;t=c[a+8>>2]|0;r=c[a+12>>2]|0;p=c[a+16>>2]|0;n=c[a+20>>2]|0;l=c[a+24>>2]|0;j=c[a+28>>2]|0;h=c[a+32>>2]|0;f=c[a+36>>2]|0;w=c[b>>2]|0;u=c[b+4>>2]|0;s=c[b+8>>2]|0;q=c[b+12>>2]|0;o=c[b+16>>2]|0;m=c[b+20>>2]|0;k=c[b+24>>2]|0;i=c[b+28>>2]|0;g=c[b+32>>2]|0;e=c[b+36>>2]|0;c[a>>2]=(w^x)&0-d^x;c[a+4>>2]=(u^v)&0-d^v;c[a+8>>2]=(s^t)&0-d^t;c[a+12>>2]=(q^r)&0-d^r;c[a+16>>2]=(o^p)&0-d^p;c[a+20>>2]=(m^n)&0-d^n;c[a+24>>2]=(k^l)&0-d^l;c[a+28>>2]=(i^j)&0-d^j;c[a+32>>2]=(g^h)&0-d^h;c[a+36>>2]=(e^f)&0-d^f;c[b>>2]=(w^x)&0-d^w;c[b+4>>2]=(u^v)&0-d^u;c[b+8>>2]=(s^t)&0-d^s;c[b+12>>2]=(q^r)&0-d^q;c[b+16>>2]=(o^p)&0-d^o;c[b+20>>2]=(m^n)&0-d^m;c[b+24>>2]=(k^l)&0-d^k;c[b+28>>2]=(i^j)&0-d^i;c[b+32>>2]=(g^h)&0-d^g;c[b+36>>2]=(e^f)&0-d^e;return}function gb(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0;k=i;j=i=i+63&-64;i=i+96|0;Ba(j,f,g,0)|0;Le(j+32|0,32,0,f+16|0,j)|0;if(!(he(c,b,d,e,j+32|0)|0))if(!a)c=0;else{if(b>>>0>=a>>>0?0<e>>>0|0==(e|0)&(b-a|0)>>>0<d>>>0:0)h=8;else if(a>>>0>=b>>>0?0<e>>>0|0==(e|0)&(a-b|0)>>>0<d>>>0:0)h=8;if((h|0)==8){cd(a|0,b|0,d|0)|0;b=a}c=e>>>0>0|(e|0)==0&d>>>0>32?32:d;g=e>>>0>0|(e|0)==0&d>>>0>32?0:e;if((c|0)==0&(g|0)==0)fe(j+32|0,j+32|0,32,0,f+16|0,j)|0;else{h=we((e>>>0<0|(e|0)==0&d>>>0<32?d:32)|0,(e>>>0<0|(e|0)==0&d>>>0<32?e:0)|0,-1,0)|0;yc(j+32+32|0,b|0,h+1|0)|0;l=we(c|0,g|0,32,0)|0;fe(j+32|0,j+32|0,l,D,f+16|0,j)|0;yc(a|0,j+32+32|0,h+1|0)|0}if(e>>>0>0|(e|0)==0&d>>>0>32){l=te(d|0,e|0,c|0,g|0)|0;Nd(a+c|0,b+c|0,l,D,f+16|0,1,0,j)|0}ld(j,32);c=0}else{ld(j,32);c=-1}i=k;return c|0}function hb(b,e,f,g,h){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0;o=i;p=i=i+63&-64;i=i+112|0;if(!((e|0)==0&(f|0)==0)){k=p+16|0;j=k+32|0;do{a[k>>0]=a[h>>0]|0;k=k+1|0;h=h+1|0}while((k|0)<(j|0));k=d[g+4>>0]|d[g+4+1>>0]<<8|d[g+4+2>>0]<<16|d[g+4+3>>0]<<24;c[p>>2]=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;c[p+4>>2]=k;c[p+8>>2]=0;c[p+8+4>>2]=0;if(f>>>0>0|(f|0)==0&e>>>0>63){do{xa(b,p,p+16|0,0)|0;h=1;j=8;while(1){k=p+j|0;h=(d[k>>0]|0)+h|0;a[k>>0]=h;j=j+1|0;if((j|0)==16)break;else h=h>>>8}e=we(e|0,f|0,-64,-1)|0;f=D;b=b+64|0}while(f>>>0>0|(f|0)==0&e>>>0>63);if(!((e|0)==0&(f|0)==0)){m=b;n=e;l=7}}else{m=b;n=e;l=7}if((l|0)==7?(xa(p+48|0,p,p+16|0,0)|0,n|0):0){h=0;do{a[m+h>>0]=a[p+48+h>>0]|0;h=h+1|0}while((h|0)!=(n|0))}ld(p+48|0,64);ld(p+16|0,32)}i=o;return 0}function ib(b,e,f,g){b=b|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0;k=i;l=i=i+63&-64;i=i+64|0;if((e+-1&255)>63)ba();a[l>>0]=e;a[l+1>>0]=0;a[l+2>>0]=1;a[l+3>>0]=1;h=l+4|0;j=h+28|0;do{a[h>>0]=0;h=h+1|0}while((h|0)<(j|0));if(!f){h=l+32|0;j=h+16|0;do{a[h>>0]=0;h=h+1|0}while((h|0)<(j|0))}else{h=l+32|0;e=f;j=h+16|0;do{a[h>>0]=a[e>>0]|0;h=h+1|0;e=e+1|0}while((h|0)<(j|0))}if(!g){h=l+48|0;j=h+16|0;do{a[h>>0]=0;h=h+1|0}while((h|0)<(j|0))}else{h=l+48|0;e=g;j=h+16|0;do{a[h>>0]=a[e>>0]|0;h=h+1|0;e=e+1|0}while((h|0)<(j|0))}Nc(b+64|0,0,293)|0;h=b;e=400;j=h+64|0;do{c[h>>2]=c[e>>2];h=h+4|0;e=e+4|0}while((h|0)<(j|0));e=0;do{h=l+(e<<3)|0;g=b+(e<<3)|0;j=c[g+4>>2]^(d[h+4>>0]|d[h+4+1>>0]<<8|d[h+4+2>>0]<<16|d[h+4+3>>0]<<24);c[g>>2]=c[g>>2]^(d[h>>0]|d[h+1>>0]<<8|d[h+2>>0]<<16|d[h+3>>0]<<24);c[g+4>>2]=j;e=e+1|0}while((e|0)!=8);i=k;return}function jb(b,e){b=b|0;e=e|0;c[b>>2]=(d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24)&67108863;c[b+4>>2]=(d[e+3>>0]|d[e+3+1>>0]<<8|d[e+3+2>>0]<<16|d[e+3+3>>0]<<24)>>>2&67108611;c[b+8>>2]=(d[e+6>>0]|d[e+6+1>>0]<<8|d[e+6+2>>0]<<16|d[e+6+3>>0]<<24)>>>4&67092735;c[b+12>>2]=(d[e+9>>0]|d[e+9+1>>0]<<8|d[e+9+2>>0]<<16|d[e+9+3>>0]<<24)>>>6&66076671;c[b+16>>2]=(d[e+12>>0]|d[e+12+1>>0]<<8|d[e+12+2>>0]<<16|d[e+12+3>>0]<<24)>>>8&1048575;c[b+20>>2]=0;c[b+20+4>>2]=0;c[b+20+8>>2]=0;c[b+20+12>>2]=0;c[b+20+16>>2]=0;c[b+40>>2]=d[e+16>>0]|d[e+16+1>>0]<<8|d[e+16+2>>0]<<16|d[e+16+3>>0]<<24;c[b+44>>2]=d[e+20>>0]|d[e+20+1>>0]<<8|d[e+20+2>>0]<<16|d[e+20+3>>0]<<24;c[b+48>>2]=d[e+24>>0]|d[e+24+1>>0]<<8|d[e+24+2>>0]<<16|d[e+24+3>>0]<<24;c[b+52>>2]=d[e+28>>0]|d[e+28+1>>0]<<8|d[e+28+2>>0]<<16|d[e+28+3>>0]<<24;c[b+56>>2]=0;c[b+56+4>>2]=0;a[b+80>>0]=0;return 0}function kb(a){a=a|0;var b=0,d=0;do if(a)if(c[a>>2]|0)if((c[a+4>>2]|0)>>>0>=16){if((c[a+8>>2]|0)==0?c[a+12>>2]|0:0){b=-18;break}b=c[a+20>>2]|0;if(!(c[a+16>>2]|0))return ((b|0)==0?-6:-19)|0;if(b>>>0>=8){if((c[a+24>>2]|0)==0?c[a+28>>2]|0:0){b=-20;break}if((c[a+32>>2]|0)==0?c[a+36>>2]|0:0){b=-21;break}b=c[a+44>>2]|0;if(b>>>0>=8)if(b>>>0<=2097152){d=c[a+48>>2]|0;if(b>>>0>=d<<3>>>0)if((c[a+40>>2]|0)>>>0>=3)if(d)if(d>>>0<=16777215){b=c[a+52>>2]|0;if(!b)b=-28;else b=b>>>0>16777215?-29:0}else b=-17;else b=-16;else b=-12;else b=-14}else b=-15;else b=-14}else b=-6}else b=-2;else b=-1;else b=-25;while(0);return b|0}function lb(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;a:do if(!((e|0)==0&(f|0)==0)){g=c[b+352>>2]|0;j=f;while(1){i=256-g|0;f=b+96+g|0;if(!(j>>>0>0|(j|0)==0&e>>>0>i>>>0))break;yc(f|0,d|0,i|0)|0;c[b+352>>2]=(c[b+352>>2]|0)+i;f=c[b+64>>2]|0;g=c[b+64+4>>2]|0;h=we(f|0,g|0,128,0)|0;c[b+64>>2]=h;c[b+64+4>>2]=D;f=we((g>>>0>4294967295|(g|0)==-1&f>>>0>4294967167)&1|0,0,c[b+72>>2]|0,c[b+72+4>>2]|0)|0;c[b+72>>2]=f;c[b+72+4>>2]=D;ha(b,b+96|0);f=b+96|0;g=b+224|0;h=f+128|0;do{a[f>>0]=a[g>>0]|0;f=f+1|0;g=g+1|0}while((f|0)<(h|0));g=(c[b+352>>2]|0)+-128|0;c[b+352>>2]=g;e=te(e|0,j|0,i|0,0)|0;f=D;if((e|0)==0&(f|0)==0)break a;else{d=d+i|0;j=f}}yc(f|0,d|0,e|0)|0;j=we(c[b+352>>2]|0,0,e|0,j|0)|0;c[b+352>>2]=j}while(0);return}function mb(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0;l=i;k=i=i+63&-64;i=i+64|0;e=k+4+4|0;f=e+52|0;do{c[e>>2]=0;e=e+4|0}while((e|0)<(f|0));e=pc(a)|0;c[k+36>>2]=e;c[k+20>>2]=e;c[k+4>>2]=e;h=ma(e)|0;c[k+32>>2]=h;f=ma(e)|0;c[k+16>>2]=f;g=ma(e)|0;c[k>>2]=g;do if((f|0)==0|(g|0)==0|(h|0)==0){ta(h);ta(f);ta(g);e=-22}else{j=ma(e)|0;if(!j){ta(h);ta(f);ta(g);e=-22;break}e=bb(k,a)|0;if(e|0){ta(c[k+32>>2]|0);ta(c[k+16>>2]|0);ta(c[k>>2]|0);ta(j);break}d=zb(c[k+40>>2]|0,c[k+44>>2]|0,c[k+52>>2]|0,b,d,c[k+16>>2]|0,c[k+20>>2]|0,j,c[k+4>>2]|0,0,0)|0;ta(c[k+32>>2]|0);ta(c[k+16>>2]|0);if((d|0)==0?(Jc(j,c[k>>2]|0,c[k+4>>2]|0)|0)==0:0)e=0;else e=-35;ta(j);ta(c[k>>2]|0)}while(0);i=l;return e|0}function nb(a,b,d,e,f,g,h,j,k,l,m){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0;n=i;i=i+352|0;Ee(n+280|0,64,0,l,m)|0;af(n,n+280|0)|0;ld(n+280|0,64);ve(n,h,j,k)|0;b=te(0,0,j|0,k|0)|0;ve(n,35372,b&15,0)|0;ve(n,d,e,f)|0;b=te(0,0,e|0,f|0)|0;ve(n,35372,b&15,0)|0;c[n+256>>2]=j;c[n+256+4>>2]=k;ve(n,n+256|0,8,0)|0;c[n+256>>2]=e;c[n+256+4>>2]=f;ve(n,n+256|0,8,0)|0;$e(n,n+264|0)|0;ld(n,256);b=Gd(n+264|0,g)|0;ld(n+264|0,16);do if(a)if(!b){Sd(a,d,e,f,l,1,m)|0;b=0;break}else{Nc(a|0,0,e|0)|0;b=-1;break}while(0);i=n;return b|0}function ob(b,e,f,g,h,i,j){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0;a:do if(!g){n=0;m=0;k=0;l=0}else{n=0;m=0;k=0;q=0;while(1){p=n<<24>>24==0;while(1){l=d[f+k>>0]|0;o=(((l&223)+201&255)+65526^((l&223)+201&255)+65520)>>>8;if((o|((l^48)+65526|0)>>>8)&255|0)break;if(!((h|0)!=0&p)){l=0;break a}if(!(Ue(h,l)|0)){n=0;l=0;break a}k=k+1|0;if(k>>>0>=g>>>0){n=0;l=0;break a}}l=o&(l&223)+201|((l^48)+65526|0)>>>8&(l^48);if(m>>>0>=e>>>0)break;if(p)l=l<<4&255;else{a[b+m>>0]=l|q&255;m=m+1|0;l=q}n=(n&255^255)&255;k=k+1|0;if(k>>>0<g>>>0)q=l;else{l=0;break a}}c[(mg()|0)>>2]=34;l=-1}while(0);if(j|0)c[j>>2]=f+(((n<<24>>24!=0)<<31>>31)+k);if(i|0)c[i>>2]=m;return l|0}function pb(b,e,f,g){b=b|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0;k=i;l=i=i+63&-64;i=i+192|0;if((e+-1&255)>63)ba();if((f|0)!=0&g<<24>>24!=0?(g&255)<=64:0){a[l+128>>0]=e;a[l+128+1>>0]=g;a[l+128+2>>0]=1;a[l+128+3>>0]=1;e=l+128+4|0;j=e+60|0;do{a[e>>0]=0;e=e+1|0}while((e|0)<(j|0));Nc(b+64|0,0,293)|0;e=b;h=400;j=e+64|0;do{c[e>>2]=c[h>>2];e=e+4|0;h=h+4|0}while((e|0)<(j|0));e=0;do{m=l+128+(e<<3)|0;j=b+(e<<3)|0;h=c[j+4>>2]^(d[m+4>>0]|d[m+4+1>>0]<<8|d[m+4+2>>0]<<16|d[m+4+3>>0]<<24);c[j>>2]=c[j>>2]^(d[m>>0]|d[m+1>>0]<<8|d[m+2>>0]<<16|d[m+3>>0]<<24);c[j+4>>2]=h;e=e+1|0}while((e|0)!=8);Nc(l+(g&255)|0,0,(g<<24>>24<0?0:128-(g&255)|0)|0)|0;yc(l|0,f|0,g&255|0)|0;lb(b,l,128,0);ld(l,128);i=k;return}ba()}function qb(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0;i=b>>>0<0|(b|0)==0&a>>>0<32768?32768:a;h=b>>>0<0|(b|0)==0&a>>>0<32768?0:b;c[g>>2]=8;a:do if(h>>>0<0|(h|0)==0&i>>>0<d>>>5>>>0){c[f>>2]=1;a=bf(i|0,h|0,c[g>>2]<<2|0,0)|0;c[e>>2]=1;a=Yd(a|0,D|0,1)|0;b=D;h=1;do{g=Wd(1,0,h|0)|0;f=D;h=h+1|0;if(f>>>0>b>>>0|(f|0)==(b|0)&g>>>0>a>>>0)break a;c[e>>2]=h}while(h>>>0<63)}else{c[e>>2]=1;b=1;while(1){j=Wd(1,0,b|0)|0;k=D;a=b+1|0;if(k>>>0>0|(k|0)==0&j>>>0>d>>>11>>>0){a=b;break}c[e>>2]=a;if(a>>>0<63)b=a;else break}e=Yd(i|0,h|0,2)|0;e=Yd(e|0,D|0,a|0)|0;j=D;k=j>>>0>0|(j|0)==0&e>>>0>1073741823?1073741823:e;c[f>>2]=(k>>>0)/((c[g>>2]|0)>>>0)|0}while(0);return}function rb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;m=i;l=i=i+63&-64;i=i+2048|0;if((a|0)!=0&(b|0)!=0){k=(c[b>>2]|0)+4|0;f=c[b+16>>2]|0;yc(l|0,(c[k>>2]|0)+(f<<10)+-1024|0,1024)|0;g=c[b+20>>2]|0;if(g>>>0>1){d=1;do{h=f+-1+(S(f,d)|0)|0;j=c[k>>2]|0;e=0;do{p=j+(h<<10)+(e<<3)|0;n=l+(e<<3)|0;o=c[n+4>>2]^c[p+4>>2];c[n>>2]=c[n>>2]^c[p>>2];c[n+4>>2]=o;e=e+1|0}while((e|0)!=128);d=d+1|0}while((d|0)!=(g|0))}yc(l+1024|0,l|0,1024)|0;Va(c[a>>2]|0,c[a+4>>2]|0,l+1024|0,1024);ld(l,1024);ld(l+1024|0,1024);e=c[b>>2]|0;if(e|0?(c[a+56>>2]&1|0)!=0:0){ld(c[e+4>>2]|0,c[b+8>>2]<<10);e=c[b>>2]|0}d=c[e>>2]|0;if(d|0)ta(d);ta(e)}i=m;return}function sb(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;a:do if((e|0)!=0&(b&3|0)!=0){f=e;while(1){if((a[b>>0]|0)==(d&255)<<24>>24)break a;b=b+1|0;e=f+-1|0;if((e|0)!=0&(b&3|0)!=0)f=e;else{f=e;e=(e|0)!=0;g=5;break}}}else{f=e;e=(e|0)!=0;g=5}while(0);b:do if((g|0)==5)if(e){if((a[b>>0]|0)!=(d&255)<<24>>24){e=S(d&255,16843009)|0;c:do if(f>>>0>3)while(1){h=c[b>>2]^e;if((h&-2139062144^-2139062144)&h+-16843009|0)break;b=b+4|0;f=f+-4|0;if(f>>>0<=3){g=11;break c}}else g=11;while(0);if((g|0)==11)if(!f){f=0;break}while(1){if((a[b>>0]|0)==(d&255)<<24>>24)break b;b=b+1|0;f=f+-1|0;if(!f){f=0;break}}}}else f=0;while(0);return (f|0?b:0)|0}function tb(a){a=a|0;var b=0,d=0,e=0,f=0;if(a>>>0>=4294967168){c[(mg()|0)>>2]=12;f=0;return f|0}f=a>>>0<11?16:a+11&-8;e=ma(f+76|0)|0;if(!e){f=0;return f|0}do if(e&63){a=((e+63&-64)+-8-(e+-8)|0)>>>0>15?(e+63&-64)+-8|0:(e+63&-64)+56|0;b=a-(e+-8)|0;d=c[e+-4>>2]|0;if(!(d&3)){c[a>>2]=(c[e+-8>>2]|0)+b;c[a+4>>2]=(d&-8)-b;break}else{c[a+4>>2]=(d&-8)-b|c[a+4>>2]&1|2;c[a+((d&-8)-b)+4>>2]=c[a+((d&-8)-b)+4>>2]|1;c[e+-4>>2]=b|c[e+-4>>2]&1|2;c[a+4>>2]=c[a+4>>2]|1;ua(e+-8|0,b);break}}else a=e+-8|0;while(0);b=a+4|0;d=c[b>>2]|0;if(d&3|0?(d&-8)>>>0>(f+16|0)>>>0:0){e=a+f|0;c[b>>2]=f|d&1|2;c[e+4>>2]=(d&-8)-f|3;c[e+((d&-8)-f)+4>>2]=c[e+((d&-8)-f)+4>>2]|1;ua(e,(d&-8)-f|0)}f=a+8|0;return f|0}function ub(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;h=i;i=i+192|0;if(d>>>0>128){td(b)|0;Ja(b,c,d,0)|0;Wb(b,h)|0;d=64;c=h}td(b)|0;e=h+64|0;f=e+128|0;do{a[e>>0]=54;e=e+1|0}while((e|0)<(f|0));g=(d|0)==0;if(!g?(a[h+64>>0]=a[c>>0]^54,(d|0)!=1):0){e=1;do{f=h+64+e|0;a[f>>0]=a[f>>0]^a[c+e>>0];e=e+1|0}while((e|0)!=(d|0))}Ja(b,h+64|0,128,0)|0;td(b+208|0)|0;e=h+64|0;f=e+128|0;do{a[e>>0]=92;e=e+1|0}while((e|0)<(f|0));if(!g?(a[h+64>>0]=a[c>>0]^92,(d|0)!=1):0){e=1;do{g=h+64+e|0;a[g>>0]=a[g>>0]^a[c+e>>0];e=e+1|0}while((e|0)!=(d|0))}Ja(b+208|0,h+64|0,128,0)|0;ld(h+64|0,128);ld(h,64);i=h;return 0}function vb(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;h=i;i=i+96|0;if(d>>>0>64){Yc(b)|0;Qa(b,c,d,0)|0;Pa(b,h)|0;d=32;c=h}Yc(b)|0;e=h+32|0;f=e+64|0;do{a[e>>0]=54;e=e+1|0}while((e|0)<(f|0));g=(d|0)==0;if(!g?(a[h+32>>0]=a[c>>0]^54,(d|0)!=1):0){e=1;do{f=h+32+e|0;a[f>>0]=a[f>>0]^a[c+e>>0];e=e+1|0}while((e|0)!=(d|0))}Qa(b,h+32|0,64,0)|0;Yc(b+104|0)|0;e=h+32|0;f=e+64|0;do{a[e>>0]=92;e=e+1|0}while((e|0)<(f|0));if(!g?(a[h+32>>0]=a[c>>0]^92,(d|0)!=1):0){e=1;do{g=h+32+e|0;a[g>>0]=a[g>>0]^a[c+e>>0];e=e+1|0}while((e|0)!=(d|0))}Qa(b+104|0,h+32|0,64,0)|0;ld(h+32|0,64);ld(h,32);i=h;return 0}function wb(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0;f=0;h=0;i=0;a:while(1){while(1){g=a[e>>0]|0;g=((0-((0-(g^47)|0)>>>8&63^63|(0-(g^43)|0)>>>8&62^62|((g+65439|0)>>>8^255)&g+185&((122-g|0)>>>8&255^255)|((g+-65|0)>>>8^255)&g+-65&((90-g|0)>>>8&255^255)|((g+65488|0)>>>8^255)&g+4&((57-g|0)>>>8&255^255))|0)>>>8&255^255)&(0-(g^65)|0)>>>8|((0-(g^47)|0)>>>8&63^63|(0-(g^43)|0)>>>8&62^62|((g+65439|0)>>>8^255)&g+185&((122-g|0)>>>8&255^255)|((g+-65|0)>>>8^255)&g+-65&((90-g|0)>>>8&255^255)|((g+65488|0)>>>8^255)&g+4&((57-g|0)>>>8&255^255));if((g|0)==255){j=7;break a}e=e+1|0;h=g+(h<<6)|0;g=f+6|0;if(g>>>0>7)break;else f=g}f=f+-2|0;if(i>>>0>=(c[d>>2]|0)>>>0){e=0;break}a[b>>0]=h>>>f;b=b+1|0;i=i+1|0}if((j|0)==7)if(f>>>0<=4?((1<<f)+-1&h|0)==0:0)c[d>>2]=i;else e=0;return e|0}function xb(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;w=c[a>>2]|0;u=c[a+4>>2]|0;s=c[a+8>>2]|0;q=c[a+12>>2]|0;o=c[a+16>>2]|0;m=c[a+20>>2]|0;k=c[a+24>>2]|0;i=c[a+28>>2]|0;g=c[a+32>>2]|0;e=c[a+36>>2]|0;v=(c[b+4>>2]^u)&0-d;t=(c[b+8>>2]^s)&0-d;r=(c[b+12>>2]^q)&0-d;p=(c[b+16>>2]^o)&0-d;n=(c[b+20>>2]^m)&0-d;l=(c[b+24>>2]^k)&0-d;j=(c[b+28>>2]^i)&0-d;h=(c[b+32>>2]^g)&0-d;f=(c[b+36>>2]^e)&0-d;c[a>>2]=(c[b>>2]^w)&0-d^w;c[a+4>>2]=v^u;c[a+8>>2]=t^s;c[a+12>>2]=r^q;c[a+16>>2]=p^o;c[a+20>>2]=n^m;c[a+24>>2]=l^k;c[a+28>>2]=j^i;c[a+32>>2]=h^g;c[a+36>>2]=f^e;return}function yb(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0;f=0;do{c[d+(f<<2)>>2]=c[a+((e<<5)+-16<<2)+(f<<2)>>2];f=f+1|0}while((f|0)!=16);if(e<<1|0){i=0;j=0;while(1){g=i<<4;f=0;do{h=d+(f<<2)|0;c[h>>2]=c[h>>2]^c[a+(g<<2)+(f<<2)>>2];f=f+1|0}while((f|0)!=16);Ha(d);h=i<<3;f=0;do{c[b+(h<<2)+(f<<2)>>2]=c[d+(f<<2)>>2];f=f+1|0}while((f|0)!=16);f=0;do{k=d+(f<<2)|0;c[k>>2]=c[k>>2]^c[a+((g|16)<<2)+(f<<2)>>2];f=f+1|0}while((f|0)!=16);Ha(d);f=0;do{c[b+(h+(e<<4)<<2)+(f<<2)>>2]=c[d+(f<<2)>>2];f=f+1|0}while((f|0)!=16);if((j|0)==(((e<<1)+-1|0)>>>1|0))break;else{i=i+2|0;j=j+1|0}}}return}function zb(a,b,d,e,f,g,h,j,k,l,m){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0;p=i;o=i=i+63&-64;i=i+64|0;n=ma(k)|0;do if(!n)a=-22;else{c[o>>2]=n;c[o+4>>2]=k;c[o+8>>2]=e;c[o+12>>2]=f;c[o+16>>2]=g;c[o+20>>2]=h;c[o+24>>2]=0;c[o+24+4>>2]=0;c[o+24+8>>2]=0;c[o+24+12>>2]=0;c[o+40>>2]=a;c[o+44>>2]=b;c[o+48>>2]=d;c[o+52>>2]=d;c[o+56>>2]=4;a=fc(o)|0;if(a|0){ld(n,k);ta(n);break}if(j|0)yc(j|0,n|0,k|0)|0;if((l|0)!=0&(m|0)!=0?Ga(l,m,o)|0:0){ld(n,k);ld(l,m);ta(n);a=-31;break}ld(n,k);ta(n);a=0}while(0);i=p;return a|0}function Ab(b,e,f,g,h){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;q=i;p=i=i+63&-64;i=i+48|0;if((((((a[g>>0]|0)==36?(a[g+1>>0]|0)==55:0)?(a[g+2>>0]|0)==36:0)?(k=sb(33887,d[g+3>>0]|0,65)|0,(k|0)!=0):0)?(l=Wd(1,0,k-33887|0)|0,m=D,j=id(p+4|0,g+4|0)|0,(j|0)!=0):0)?(n=id(p,j)|0,(n|0)!=0):0){j=rf(n)|0;if(!j)j=pc(n)|0;else j=j-n|0;k=j+(n-g)|0;if((!((k+45|0)>>>0>102|(k+45|0)>>>0<j>>>0)?(Da(b,e,f,n,j,l,m,c[p+4>>2]|0,c[p>>2]|0,p+8|0,32)|0)==0:0)?(yc(h|0,g|0,k|0)|0,a[h+k>>0]=36,o=cc(h+k+1|0,h+102-(h+k+1)|0,p+8|0)|0,ld(p+8|0,32),(o|0)!=0&o>>>0<(h+102|0)>>>0):0)a[o>>0]=0;else h=0}else h=0;i=q;return h|0}function Bb(b,e,f,g,h,j){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;k=i;l=i=i+63&-64;i=i+560|0;Cc(l+496|0,j,32,0)|0;a[l+496>>0]=(d[l+496>>0]|0)&248;a[l+496+31>>0]=(d[l+496+31>>0]|0)&63|64;td(l)|0;Ja(l,l+496+32|0,32,0)|0;Ja(l,f,g,h)|0;Wb(l,l+432|0)|0;cd(b+32|0,j+32|0,32)|0;na(l+432|0);Ra(l+208|0,l+432|0);Ac(b,l+208|0);td(l)|0;Ja(l,b,64,0)|0;Ja(l,f,g,h)|0;Wb(l,l+368|0)|0;na(l+368|0);ia(b+32|0,l+368|0,l+496|0,l+432|0);ld(l+496|0,64);if(e|0){c[e>>2]=64;c[e+4>>2]=0}i=k;return 0}function Cb(a,b,d,e,f,g,h,j,k,l,m,n){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;l=i;i=i+336|0;Ee(l+264|0,64,0,m,n)|0;af(l,l+264|0)|0;ld(l+264|0,64);ve(l,h,j,k)|0;h=te(0,0,j|0,k|0)|0;ve(l,35372,h&15,0)|0;Sd(a,e,f,g,m,1,n)|0;ve(l,a,f,g)|0;h=te(0,0,f|0,g|0)|0;ve(l,35372,h&15,0)|0;c[l+256>>2]=j;c[l+256+4>>2]=k;ve(l,l+256|0,8,0)|0;c[l+256>>2]=f;c[l+256+4>>2]=g;ve(l,l+256|0,8,0)|0;$e(l,b)|0;ld(l,256);if(d|0){c[d>>2]=16;c[d+4>>2]=0}i=l;return 0}function Db(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0;a:do if(b>>>0<=63?(g=Kd(d|0,0,c|0,0)|0,i=D,!(i>>>0>0|(i|0)==0&g>>>0>1073741823)):0){a[f>>0]=36;a[f+1>>0]=55;a[f+2>>0]=36;a[f+3>>0]=a[33887+b>>0]|0;b=f+4|0;g=0;while(1){i=b;b=b+1|0;a[i>>0]=a[33887+(c&63)>>0]|0;g=g+6|0;if(g>>>0>=30)break;else c=c>>>6}if(b){g=d;d=f+58-b|0;c=0;while(1){if(!d){f=0;break a}i=b;b=b+1|0;a[i>>0]=a[33887+(g&63)>>0]|0;c=c+6|0;if(c>>>0>=30)break;else{g=g>>>6;d=d+-1|0}}if((b|0)!=0?(h=cc(b,f+58-b|0,e)|0,(h|0)!=0&h>>>0<(f+58|0)>>>0):0)a[h>>0]=0;else f=0}else f=0}else f=0;while(0);return f|0}function Eb(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0;k=i;j=i=i+63&-64;i=i+32|0;a:do if(((b|0)!=0?(d=c[b+20>>2]|0,(d|0)!=0):0)?(c[b+4>>2]|0)!=0:0){h=0;while(1){g=0;do{if(!d)d=0;else{f=g&255;e=0;do{c[j>>2]=h;c[j+4>>2]=e;a[j+8>>0]=f;c[j+12>>2]=0;c[j+16>>2]=c[j>>2];c[j+16+4>>2]=c[j+4>>2];c[j+16+8>>2]=c[j+8>>2];c[j+16+12>>2]=c[j+12>>2];d=ka(b,j+16|0)|0;e=e+1|0;if(d|0)break a;d=c[b+20>>2]|0}while(e>>>0<d>>>0)}g=g+1|0}while(g>>>0<4);h=h+1|0;if(h>>>0>=(c[b+4>>2]|0)>>>0){d=0;break}}}else d=0;while(0);i=k;return d|0}function Fb(a,b,d,e,f,g,h,j,k,l,m){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0;n=i;i=i+352|0;Pe(n+280|0,64,0,l,m)|0;af(n,n+280|0)|0;ld(n+280|0,64);ve(n,h,j,k)|0;c[n+256>>2]=j;c[n+256+4>>2]=k;ve(n,n+256|0,8,0)|0;ve(n,d,e,f)|0;c[n+256>>2]=e;c[n+256+4>>2]=f;ve(n,n+256|0,8,0)|0;$e(n,n+264|0)|0;ld(n,256);b=Gd(n+264|0,g)|0;ld(n+264|0,16);do if(a)if(!b){Pd(a,d,e,f,l,1,0,m)|0;b=0;break}else{Nc(a|0,0,e|0)|0;b=-1;break}while(0);i=n;return b|0}function Gb(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;j=(c[d>>2]|0)==0;do if(j){g=a[d+8>>0]|0;if(!(g<<24>>24)){g=(c[d+12>>2]|0)+-1|0;break}g=S(c[b+12>>2]|0,g&255)|0;h=c[d+12>>2]|0;if(!f){g=(((h|0)==0)<<31>>31)+g|0;break}else{g=h+-1+g|0;break}}else{g=(c[b+16>>2]|0)-(c[b+12>>2]|0)|0;h=c[d+12>>2]|0;if(!f){g=(((h|0)==0)<<31>>31)+g|0;break}else{g=h+-1+g|0;break}}while(0);Kd(e|0,0,e|0,0)|0;Kd(g|0,0,D|0,0)|0;f=te(g+-1|0,0,D|0,0)|0;e=D;if(!j?(i=a[d+8>>0]|0,i<<24>>24!=3):0){g=S(c[b+12>>2]|0,(i&255)+1|0)|0;h=0}else{g=0;h=0}j=we(f|0,e|0,g|0,h|0)|0;b=Hd(j|0,D|0,c[b+16>>2]|0,0)|0;return b|0}function Hb(b,c){b=b|0;c=c|0;var e=0,f=0,g=0,h=0,i=0;e=0;do{a[b+e>>0]=(d[c+(e>>3)>>0]|0)>>>(e&7)&1;e=e+1|0}while((e|0)!=256);h=0;do{i=b+h|0;a:do if(a[i>>0]|0){g=1;do{e=g+h|0;if((e|0)>=256)break a;c=a[b+e>>0]|0;b:do if(c<<24>>24){f=a[i>>0]|0;c=c<<24>>24<<g;if((f+c|0)<16){a[i>>0]=f+c;a[b+e>>0]=0;break}if((f-c|0)<=-16)break a;a[i>>0]=f-c;while(1){c=b+e|0;if(!(a[c>>0]|0))break;a[c>>0]=0;e=e+1|0;if((e|0)>=256)break b}a[c>>0]=1}while(0);g=g+1|0}while((g|0)<7)}while(0);h=h+1|0}while((h|0)!=256);return}function Ib(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0;n=i;l=i=i+63&-64;i=i+128|0;k=b;m=k+102|0;do{a[k>>0]=0;k=k+1|0}while((k|0)<(m|0));do if(!(f>>>0>0|(f|0)==0&e>>>0>4294967295)){qb(g,h,j,l+8|0,l+4|0,l);Md(l+88|0,32);if(!(Db(c[l+8>>2]|0,c[l>>2]|0,c[l+4>>2]|0,l+88|0,l+24|0)|0)){c[(mg()|0)>>2]=22;b=-1;break}ef(l+12|0);m=(Ab(l+12|0,d,e,l+24|0,b)|0)==0;re(l+12|0);if(m){c[(mg()|0)>>2]=22;b=-1}else b=0}else{c[(mg()|0)>>2]=27;b=-1}while(0);i=n;return b|0}function Jb(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;h=i;j=i=i+63&-64;i=i+64|0;if((e+-1&255)>63)ba();a[j>>0]=e;a[j+1>>0]=0;a[j+2>>0]=1;a[j+3>>0]=1;e=j+4|0;g=e+60|0;do{a[e>>0]=0;e=e+1|0}while((e|0)<(g|0));Nc(b+64|0,0,293)|0;e=b;f=400;g=e+64|0;do{c[e>>2]=c[f>>2];e=e+4|0;f=f+4|0}while((e|0)<(g|0));e=0;do{k=j+(e<<3)|0;g=b+(e<<3)|0;f=c[g+4>>2]^(d[k+4>>0]|d[k+4+1>>0]<<8|d[k+4+2>>0]<<16|d[k+4+3>>0]<<24);c[g>>2]=c[g>>2]^(d[k>>0]|d[k+1>>0]<<8|d[k+2>>0]<<16|d[k+3>>0]<<24);c[g+4>>2]=f;e=e+1|0}while((e|0)!=8);i=h;return}function Kb(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;m=(c[b+4>>2]|0)-(c[d+4>>2]|0)|0;l=(c[b+8>>2]|0)-(c[d+8>>2]|0)|0;k=(c[b+12>>2]|0)-(c[d+12>>2]|0)|0;j=(c[b+16>>2]|0)-(c[d+16>>2]|0)|0;i=(c[b+20>>2]|0)-(c[d+20>>2]|0)|0;h=(c[b+24>>2]|0)-(c[d+24>>2]|0)|0;g=(c[b+28>>2]|0)-(c[d+28>>2]|0)|0;f=(c[b+32>>2]|0)-(c[d+32>>2]|0)|0;e=(c[b+36>>2]|0)-(c[d+36>>2]|0)|0;c[a>>2]=(c[b>>2]|0)-(c[d>>2]|0);c[a+4>>2]=m;c[a+8>>2]=l;c[a+12>>2]=k;c[a+16>>2]=j;c[a+20>>2]=i;c[a+24>>2]=h;c[a+28>>2]=g;c[a+32>>2]=f;c[a+36>>2]=e;return}function Lb(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;m=(c[d+4>>2]|0)+(c[b+4>>2]|0)|0;l=(c[d+8>>2]|0)+(c[b+8>>2]|0)|0;k=(c[d+12>>2]|0)+(c[b+12>>2]|0)|0;j=(c[d+16>>2]|0)+(c[b+16>>2]|0)|0;i=(c[d+20>>2]|0)+(c[b+20>>2]|0)|0;h=(c[d+24>>2]|0)+(c[b+24>>2]|0)|0;g=(c[d+28>>2]|0)+(c[b+28>>2]|0)|0;f=(c[d+32>>2]|0)+(c[b+32>>2]|0)|0;e=(c[d+36>>2]|0)+(c[b+36>>2]|0)|0;c[a>>2]=(c[d>>2]|0)+(c[b>>2]|0);c[a+4>>2]=m;c[a+8>>2]=l;c[a+12>>2]=k;c[a+16>>2]=j;c[a+20>>2]=i;c[a+24>>2]=h;c[a+28>>2]=g;c[a+32>>2]=f;c[a+36>>2]=e;return}function Mb(b,c,e,f){b=b|0;c=c|0;e=e|0;f=f|0;var g=0,h=0,i=0;switch(((f>>>0)%3|0)&3){case 2:{g=((f>>>0)/3|0)<<2|1;h=3;break}case 1:{g=((f>>>0)/3|0)<<2;h=3;break}default:g=((f>>>0)/3|0)<<2}if((h|0)==3)g=g+2|0;if(g>>>0<c>>>0){if(f){i=0;c=0;do{f=f+-1|0;h=e;e=e+1|0;i=d[h>>0]|0|i<<8;c=c+8|0;if(c>>>0>5)while(1){c=c+-6|0;h=b+1|0;a[b>>0]=zd(i>>>c&63)|0;if(c>>>0>5)b=h;else{b=h;break}}}while((f|0)!=0);if(c){a[b>>0]=zd(i<<6-c&63)|0;b=b+1|0}}a[b>>0]=0}else g=-1;return g|0}function Nb(b,d){b=b|0;d=d|0;var e=0,f=0;a:do if(!(d&255))b=b+(pc(b)|0)|0;else{if(b&3)do{f=a[b>>0]|0;if(f<<24>>24==0?1:f<<24>>24==(d&255)<<24>>24)break a;b=b+1|0}while((b&3|0)!=0);f=S(d&255,16843009)|0;e=c[b>>2]|0;b:do if(!((e&-2139062144^-2139062144)&e+-16843009))do{e=e^f;if((e&-2139062144^-2139062144)&e+-16843009|0)break b;b=b+4|0;e=c[b>>2]|0}while(!((e&-2139062144^-2139062144)&e+-16843009|0));while(0);while(1){f=a[b>>0]|0;if(f<<24>>24==0?1:f<<24>>24==(d&255)<<24>>24)break;else b=b+1|0}}while(0);return b|0}function Ob(a,b,d,e,f,g,h,j,k,l,m,n){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;l=i;i=i+336|0;Pe(l+264|0,64,0,m,n)|0;af(l,l+264|0)|0;ld(l+264|0,64);ve(l,h,j,k)|0;c[l+256>>2]=j;c[l+256+4>>2]=k;ve(l,l+256|0,8,0)|0;Pd(a,e,f,g,m,1,0,n)|0;ve(l,a,f,g)|0;c[l+256>>2]=f;c[l+256+4>>2]=g;ve(l,l+256|0,8,0)|0;$e(l,b)|0;ld(l,256);if(d|0){c[d>>2]=16;c[d+4>>2]=0}i=l;return 0}function Pb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;g=i;f=i=i+63&-64;i=i+80|0;a:do if((a|0)==0|(b|0)==0)d=-25;else{e=c[a+8>>2]|0;do if((e|0?((e<<10>>>0)/(e>>>0)|0|0)==1024:0)?(d=ma(12)|0,c[a>>2]=d,d|0):0){d=Vd(f,e<<10)|0;c[(mg()|0)>>2]=d;if(d|0){c[f>>2]=0;break}d=c[f>>2]|0;if(d|0){c[c[a>>2]>>2]=d;c[(c[a>>2]|0)+4>>2]=d;c[(c[a>>2]|0)+8>>2]=e<<10;Ua(f+8|0,b,c[a+28>>2]|0);ld(f+8+64|0,8);$a(f+8|0,a);ld(f+8|0,72);d=0;break a}}while(0);d=-22}while(0);i=g;return d|0}function Qb(a,b,d,e,f,g,h,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0;n=i;m=i=i+63&-64;i=i+16|0;Nc(a|0,0,b|0)|0;do if(!((g|d)>>>0>0|(g|d|0)==0&(f|b)>>>0>4294967295))if(d>>>0<0|(d|0)==0&b>>>0<16){c[(mg()|0)>>2]=22;a=-1;break}else{qb(j,k,l,m+8|0,m+4|0,m);l=Wd(1,0,c[m+8>>2]|0)|0;a=Sc(e,f,h,32,l,D,c[m>>2]|0,c[m+4>>2]|0,a,b)|0;break}else{c[(mg()|0)>>2]=27;a=-1}while(0);i=n;return a|0}function Rb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;e=i=i+63&-64;i=i+48|0;Lb(a,b+40|0,b);Kb(a+40|0,b+40|0,b);oa(a+80|0,a,c+40|0);oa(a+40|0,a+40|0,c);oa(a+120|0,c+120|0,b+120|0);oa(a,b+80|0,c+80|0);Lb(e,a,a);Kb(a,a+80|0,a+40|0);Lb(a+40|0,a+80|0,a+40|0);Kb(a+80|0,e,a+120|0);Lb(a+120|0,e,a+120|0);i=d;return}function Sb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;e=i=i+63&-64;i=i+48|0;Lb(a,b+40|0,b);Kb(a+40|0,b+40|0,b);oa(a+80|0,a,c);oa(a+40|0,a+40|0,c+40|0);oa(a+120|0,c+120|0,b+120|0);oa(a,b+80|0,c+80|0);Lb(e,a,a);Kb(a,a+80|0,a+40|0);Lb(a+40|0,a+80|0,a+40|0);Lb(a+80|0,e,a+120|0);Kb(a+120|0,e,a+120|0);i=d;return}function Tb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;Lb(a,b+40|0,b);Kb(a+40|0,b+40|0,b);l=c[b+84>>2]|0;k=c[b+88>>2]|0;j=c[b+92>>2]|0;i=c[b+96>>2]|0;h=c[b+100>>2]|0;g=c[b+104>>2]|0;f=c[b+108>>2]|0;e=c[b+112>>2]|0;d=c[b+116>>2]|0;c[a+80>>2]=c[b+80>>2];c[a+84>>2]=l;c[a+88>>2]=k;c[a+92>>2]=j;c[a+96>>2]=i;c[a+100>>2]=h;c[a+104>>2]=g;c[a+108>>2]=f;c[a+112>>2]=e;c[a+116>>2]=d;oa(a+120|0,b+120|0,1184);return}function Ub(b,c){b=b|0;c=c|0;var e=0,f=0,g=0,h=0;g=i;h=i=i+63&-64;i=i+320|0;f=h+280|0;e=f+32|0;do{a[f>>0]=a[c>>0]|0;f=f+1|0;c=c+1|0}while((f|0)<(e|0));a[h+280>>0]=(d[h+280>>0]|0)&248;a[h+280+31>>0]=(d[h+280+31>>0]|0)&63|64;Ra(h+40|0,h+280|0);Lb(h+240|0,h+40+80|0,h+40+40|0);Kb(h+200|0,h+40+80|0,h+40+40|0);Ka(h+200|0,h+200|0);oa(h,h+240|0,h+200|0);Ma(b,h);i=g;return 0}function Vb(b,c,d,e,f,g){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0;h=i;j=i=i+63&-64;i=i+464|0;vb(j+208|0,b,c)|0;Ke(j+208|0,d,e,0)|0;if(g|0){b=0;c=0;do{b=b+1|0;a[j+448+3>>0]=b;a[j+448+2>>0]=b>>>8;a[j+448+1>>0]=b>>>16;a[j+448>>0]=b>>>24;yc(j|0,j+208|0,208)|0;Ke(j,j+448|0,4,0)|0;vd(j,j+416|0)|0;e=g-c|0;yc(f+c|0,j+416|0,(e>>>0>32?32:e)|0)|0;c=b<<5}while(c>>>0<g>>>0)}ld(j+208|0,208);i=h;return}function Wb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;g=i;h=i=i+63&-64;i=i+704|0;d=Yd(c[a+72>>2]|0,c[a+72+4>>2]|0,3)|0;if(0<0|0==0&(d&112)>>>0<112){yc(a+80+(d&127)|0,33687,112-(d&127)|0)|0;d=a+80|0;e=h+640|0;f=a}else{yc(a+80+(d&127)|0,33687,128-(d&127)|0)|0;ja(a,a+80|0,h,h+640|0);d=a+80|0;e=d+112|0;do{c[d>>2]=0;d=d+4|0}while((d|0)<(e|0));d=a+80|0;e=h+640|0;f=a}dc(a+192|0,a+64|0,16);ja(f,d,h,e);dc(b,f,64);ld(h,704);ld(a,208);i=g;return 0}function Xb(a,b,e,f,g,h){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0;k=i;j=i=i+63&-64;i=i+32|0;l=d[g+4>>0]|d[g+4+1>>0]<<8|d[g+4+2>>0]<<16|d[g+4+3>>0]<<24;c[j+16>>2]=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;c[j+16+4>>2]=l;c[j+16+8>>2]=0;c[j+16+8+4>>2]=0;c[j>>2]=e;c[j+4>>2]=f;c[j+8>>2]=0;c[j+8+4>>2]=0;if((b+-16|0)>>>0>48){c[(mg()|0)>>2]=22;a=-1}else a=zc(a,b,0,0,0,h,32,j,j+16|0)|0;i=k;return a|0}function Yb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;e=i=i+63&-64;i=i+48|0;Lb(a,b+40|0,b);Kb(a+40|0,b+40|0,b);oa(a+80|0,a,c+40|0);oa(a+40|0,a+40|0,c);oa(a+120|0,c+80|0,b+120|0);Lb(e,b+80|0,b+80|0);Kb(a,a+80|0,a+40|0);Lb(a+40|0,a+80|0,a+40|0);Kb(a+80|0,e,a+120|0);Lb(a+120|0,e,a+120|0);i=d;return}function Zb(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;e=i=i+63&-64;i=i+48|0;Lb(a,b+40|0,b);Kb(a+40|0,b+40|0,b);oa(a+80|0,a,c);oa(a+40|0,a+40|0,c+40|0);oa(a+120|0,c+80|0,b+120|0);Lb(e,b+80|0,b+80|0);Kb(a,a+80|0,a+40|0);Lb(a+40|0,a+80|0,a+40|0);Lb(a+80|0,e,a+120|0);Kb(a+120|0,e,a+120|0);i=d;return}function _b(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0;n=i;l=i=i+63&-64;i=i+16|0;k=b;m=k+128|0;do{a[k>>0]=0;k=k+1|0}while((k|0)<(m|0));do if(!((h|f)>>>0>0|(h|f|0)==0&(g|e)>>>0>4294967295|j>>>0>2147484671))if(h>>>0<0|(h|0)==0&g>>>0<3|j>>>0<8192){c[(mg()|0)>>2]=22;b=-1;break}else{Md(l,16);b=((ie(g,j>>>10,d,e,l,b)|0)!=0)<<31>>31;break}else{c[(mg()|0)>>2]=27;b=-1}while(0);i=n;return b|0}function $b(a,b,e,f,g,h,j,k,l,m,n,o){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;m=i;i=i+48|0;c[m>>2]=0;za(m+16|0,n,o,0)|0;o=d[n+16+4>>0]|d[n+16+4+1>>0]<<8|d[n+16+4+2>>0]<<16|d[n+16+4+3>>0]<<24;c[m+4>>2]=d[n+16>>0]|d[n+16+1>>0]<<8|d[n+16+2>>0]<<16|d[n+16+3>>0]<<24;c[m+4+4>>2]=o;Cb(a,b,e,f,g,h,j,k,l,0,m,m+16|0)|0;ld(m+16|0,32);i=m;return 0}function ac(a,b,c,d,e,f,g,h,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;k=i;l=i=i+63&-64;i=i+368|0;if((b|0)==0&((e|0)!=0|(f|0)!=0))ba();if(!a)ba();if((d+-1&255)>63)ba();if(!((c|0)!=0|g<<24>>24==0))ba();if((g&255)>64)ba();if(!(g<<24>>24))ib(l,d,h,j);else Sa(l,d,c,g,h,j);lb(l,b,e,f);cb(l,a,d)|0;i=k;return}function bc(a,b,e,f,g,h,j,k,l,m,n){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;b=i;i=i+48|0;c[b>>2]=0;za(b+16|0,m,n,0)|0;n=d[m+16+4>>0]|d[m+16+4+1>>0]<<8|d[m+16+4+2>>0]<<16|d[m+16+4+3>>0]<<24;c[b+4>>2]=d[m+16>>0]|d[m+16+1>>0]<<8|d[m+16+2>>0]<<16|d[m+16+3>>0]<<24;c[b+4+4>>2]=n;m=nb(a,0,e,f,g,h,j,k,l,b,b+16|0)|0;ld(b+16|0,32);i=b;return m|0}function cc(b,c,e){b=b|0;c=c|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0;g=0;a:while(1){if(g>>>0<32){k=0;f=0;j=g}else break;do{i=j;j=j+1|0;f=(d[e+i>>0]|0)<<k|f;k=k+8|0}while(j>>>0<32&k>>>0<24);g=c;i=b;h=0;while(1){if(!g){b=0;break a}l=i;i=i+1|0;a[l>>0]=a[33887+(f&63)>>0]|0;h=h+6|0;if(h>>>0>=k>>>0)break;else{f=f>>>6;g=g+-1|0}}l=(i|0)==0;c=(l?0:b-i|0)+c|0;if(l){b=0;break}else{g=j;b=i}}return b|0}function dc(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0;if(e>>>3|0){f=0;do{g=b+(f<<3)|0;h=d+(f<<3)|0;i=c[h>>2]|0;h=c[h+4>>2]|0;a[g+7>>0]=i;j=Yd(i|0,h|0,8)|0;a[g+6>>0]=j;j=Yd(i|0,h|0,16)|0;a[g+5>>0]=j;j=Yd(i|0,h|0,24)|0;a[g+4>>0]=j;a[g+3>>0]=h;j=Yd(i|0,h|0,40)|0;a[g+2>>0]=j;j=Yd(i|0,h|0,48)|0;a[g+1>>0]=j;h=Yd(i|0,h|0,56)|0;a[g>>0]=h;f=f+1|0}while((f|0)!=(e>>>3|0))}return}function ec(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;Nc(a|0,0,b|0)|0;do if((l|0)==1){if((g|d|j)>>>0>0|(g|d|j|0)==0&(f|b|i)>>>0>4294967295|k>>>0>2147484671){c[(mg()|0)>>2]=27;a=-1;break}if(d>>>0<0|(d|0)==0&b>>>0<16|(j>>>0<0|(j|0)==0&i>>>0<3)|k>>>0<8192){c[(mg()|0)>>2]=22;a=-1;break}else{a=((ae(i,k>>>10,e,f,h,a,b)|0)!=0)<<31>>31;break}}else a=-1;while(0);return a|0}function fc(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;e=i;d=i=i+63&-64;i=i+48|0;b=kb(a)|0;if(!b){f=c[a+44>>2]|0;b=c[a+48>>2]|0;f=((f>>>0<b<<3>>>0?b<<3:f)>>>0)/(b<<2>>>0)|0;g=S(f,b<<2)|0;c[d>>2]=0;c[d+4>>2]=c[a+40>>2];c[d+8>>2]=g;c[d+12>>2]=f;c[d+16>>2]=f<<2;c[d+20>>2]=b;c[d+24>>2]=c[a+52>>2];c[d+28>>2]=1;b=Pb(d,a)|0;if(!b){b=Eb(d)|0;if(!b){rb(a,d);b=0}}}i=e;return b|0}function gc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;l=0-(c[b+4>>2]|0)|0;k=0-(c[b+8>>2]|0)|0;j=0-(c[b+12>>2]|0)|0;i=0-(c[b+16>>2]|0)|0;h=0-(c[b+20>>2]|0)|0;g=0-(c[b+24>>2]|0)|0;f=0-(c[b+28>>2]|0)|0;e=0-(c[b+32>>2]|0)|0;d=0-(c[b+36>>2]|0)|0;c[a>>2]=0-(c[b>>2]|0);c[a+4>>2]=l;c[a+8>>2]=k;c[a+12>>2]=j;c[a+16>>2]=i;c[a+20>>2]=h;c[a+24>>2]=g;c[a+28>>2]=f;c[a+32>>2]=e;c[a+36>>2]=d;return}function hc(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0;h=i;j=i=i+63&-64;i=i+368|0;if((b|0)==0&((e|0)!=0|(f|0)!=0))ba();if(!a)ba();if((d+-1&255)>63)ba();if(!((c|0)!=0|g<<24>>24==0))ba();if((g&255)>64)ba();if(!(g<<24>>24))Jb(j,d);else pb(j,d,c,g);lb(j,b,e,f);cb(j,a,d)|0;i=h;return}function ic(a,b){a=a|0;b=b|0;var c=0,d=0;c=i;d=i=i+63&-64;i=i+48|0;ra(a,b);ra(a+80|0,b+40|0);qa(a+120|0,b+80|0);Lb(a+40|0,b,b+40|0);ra(d,a+40|0);Lb(a+40|0,a+80|0,a);Kb(a+80|0,a+80|0,a);Kb(a,d,a+40|0);Kb(a+120|0,a+120|0,a+80|0);i=c;return}function jc(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0;h=i;j=i=i+63&-64;i=i+16|0;cd(a+64|0,d|0,e|0)|0;Bb(a,j,a+64|0,e,f,g)|0;if((c[j>>2]|0)==64&(c[j+4>>2]|0)==0)if(b|0){a=we(e|0,f|0,64,0)|0;c[b>>2]=a;c[b+4>>2]=D;a=0}else a=0;else{if(b|0){c[b>>2]=0;c[b+4>>2]=0}j=we(e|0,f|0,64,0)|0;Nc(a|0,0,j|0)|0;a=-1}i=h;return a|0}function kc(a,b){a=a|0;b=b|0;var c=0,d=0;d=i;c=i=i+63&-64;i=i+240|0;if(!(Aa(c+80|0,b)|0)){_d(c);Kb(c,c,c+80+40|0);Ka(c,c);_d(c+40|0);Lb(c+40|0,c+40|0,c+80+40|0);oa(c+40|0,c+40|0,c);Ma(a,c+40|0);a=0}else a=-1;i=d;return a|0}function lc(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;e=we(e|0,f|0,-64,-1)|0;f=D;do if(f>>>0>0|(f|0)==0&e>>>0>4294967231)h=7;else{if(Ya(d,d+64|0,e,f,g)|0){Nc(a|0,0,e|0)|0;h=7;break}if(b|0){c[b>>2]=e;c[b+4>>2]=f}cd(a|0,d+64|0,e|0)|0;e=0}while(0);if((h|0)==7)if(!b)e=-1;else{c[b>>2]=0;c[b+4>>2]=0;e=-1}return e|0}function mc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;l=c[b+4>>2]|0;k=c[b+8>>2]|0;j=c[b+12>>2]|0;i=c[b+16>>2]|0;h=c[b+20>>2]|0;g=c[b+24>>2]|0;f=c[b+28>>2]|0;e=c[b+32>>2]|0;d=c[b+36>>2]|0;c[a>>2]=c[b>>2];c[a+4>>2]=l;c[a+8>>2]=k;c[a+12>>2]=j;c[a+16>>2]=i;c[a+20>>2]=h;c[a+24>>2]=g;c[a+28>>2]=f;c[a+32>>2]=e;c[a+36>>2]=d;return}function nc(b,c,d,e,f,g){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0;j=i;h=i=i+63&-64;i=i+32|0;if(!(e>>>0<0|(e|0)==0&d>>>0<32)?($c(h,32,0,f,g)|0,k=we(d|0,e|0,-32,-1)|0,(he(c+16|0,c+32|0,k,D,h)|0)==0):0){be(b,c,d,e,f,g)|0;c=b+32|0;do{a[b>>0]=0;b=b+1|0}while((b|0)<(c|0));b=0}else b=-1;i=j;return b|0}function oc(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;i=a[b>>0]|0;a:do if((i+-48&255)<=9){g=0;h=b;f=i;while(1){e=(f<<24>>24)+-48|0;f=g*10|0;if(g>>>0>429496729|e>>>0>~f>>>0){e=0;break a}g=e+f|0;e=h+1|0;f=a[e>>0]|0;if((f+-48&255)>9)break;else h=e}if((e|0)!=(b|0)?(h|0)==(b|0)|i<<24>>24!=48:0)c[d>>2]=g;else e=0}else e=0;while(0);return e|0}function pc(b){b=b|0;var d=0,e=0,f=0;a:do if(!(b&3)){d=b;f=4}else{d=b;e=b;while(1){if(!(a[d>>0]|0)){d=e;break a}d=d+1|0;e=d;if(!(e&3)){f=4;break}}}while(0);if((f|0)==4){while(1){e=c[d>>2]|0;if(!((e&-2139062144^-2139062144)&e+-16843009))d=d+4|0;else break}if((e&255)<<24>>24)do d=d+1|0;while((a[d>>0]|0)!=0)}return d-b|0}function qc(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0;k=i;i=i+96|0;if(!(df(k+32|0,k)|0)){g=b;h=k+32|0;j=g+32|0;do{a[g>>0]=a[h>>0]|0;g=g+1|0;h=h+1|0}while((g|0)<(j|0));_c(k+64|0,k+32|0,f);b=wd(b+32|0,c,d,e,k+64|0,f,k)|0;ld(k,32);ld(k+32|0,32);ld(k+64|0,24)}else b=-1;i=k;return b|0}function rc(b,c,d,e){b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0;h=i;f=i=i+63&-64;i=i+128|0;if((sb(b,0,102)|0)==(b+101|0)){ef(f);e=f+12|0;g=e+102|0;do{a[e>>0]=0;e=e+1|0}while((e|0)<(g|0));d=(Ab(f,c,d,b,f+12|0)|0)==0;re(f);if(!d){e=Jc(f+12|0,b,102)|0;ld(f+12|0,102)}else e=-1}else e=-1;i=h;return e|0}function sc(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;do if(!(c>>>0>64|(d+-1|0)>>>0>63)){if(d>>>0>=256)fa(33344,33364,75,33537);if(c>>>0>=256)fa(33444,33364,76,33537);if((b|0)==0|(c|0)==0){ib(a,d&255,e,f);a=0;break}else{Sa(a,d&255,b,c&255,e,f);a=0;break}}else a=-1;while(0);return a|0}function tc(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;if(g>>>0>0|(g|0)==0&f>>>0>15){d=we(f|0,g|0,-16,-1)|0;a=bc(a,0,e,d,D,e+f+-16|0,h,i,j,k,l)|0}else a=-1;if(b|0){f=we(f|0,g|0,-16,-1)|0;g=(a|0)==0;c[b>>2]=g?f:0;c[b+4>>2]=g?D:0}return a|0}function uc(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;if(g>>>0>0|(g|0)==0&f>>>0>15){d=we(f|0,g|0,-16,-1)|0;a=nb(a,0,e,d,D,e+f+-16|0,h,i,j,k,l)|0}else a=-1;if(b|0){f=we(f|0,g|0,-16,-1)|0;g=(a|0)==0;c[b>>2]=g?f:0;c[b+4>>2]=g?D:0}return a|0}function vc(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;if(g>>>0>0|(g|0)==0&f>>>0>15){d=we(f|0,g|0,-16,-1)|0;a=Fb(a,0,e,d,D,e+f+-16|0,h,i,j,k,l)|0}else a=-1;if(b|0){f=we(f|0,g|0,-16,-1)|0;g=(a|0)==0;c[b>>2]=g?f:0;c[b+4>>2]=g?D:0}return a|0}function wc(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=i;g=i=i+63&-64;i=i+112|0;c[g+32>>2]=0;c[g+32+4>>2]=0;c[g>>2]=c[8226];c[g+4>>2]=c[8227];c[g+8>>2]=c[8228];c[g+12>>2]=c[8229];c[g+16>>2]=c[8230];c[g+20>>2]=c[8231];c[g+24>>2]=c[8232];c[g+28>>2]=c[8233];Qa(g,b,d,e)|0;Pa(g,a)|0;i=f;return 0}function xc(b,c,e){b=b|0;c=c|0;e=e|0;var f=0,g=0;if(!e)f=0;else{f=a[b>>0]|0;a:do if(!(f<<24>>24))f=0;else while(1){e=e+-1|0;g=a[c>>0]|0;if(!(f<<24>>24==g<<24>>24&((e|0)!=0&g<<24>>24!=0)))break a;b=b+1|0;c=c+1|0;f=a[b>>0]|0;if(!(f<<24>>24)){f=0;break}}while(0);f=(f&255)-(d[c>>0]|0)|0}return f|0}function yc(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;if((e|0)>=4096)return da(b|0,d|0,e|0)|0;f=b|0;if((b&3)==(d&3)){while(b&3){if(!e)return f|0;a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0;e=e-1|0}while((e|0)>=4){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0;e=e-4|0}}while((e|0)>0){a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0;e=e-1|0}return f|0}function zc(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0;do if(!((b+-1|0)>>>0>63|g>>>0>64)){if(b>>>0>=256)fa(33344,33364,35,33464);if(g>>>0<256){ac(a,c,f,b&255,d,e,g&255,h,i);j=0;break}else fa(33444,33364,36,33464)}else j=-1;while(0);return j|0}function Ac(b,c){b=b|0;c=c|0;var e=0,f=0;e=i;f=i=i+63&-64;i=i+160|0;Ka(f+80|0,c+80|0);oa(f+40|0,c,f+80|0);oa(f,c+40|0,f+80|0);Ma(b,f);Ma(f+120|0,f+40|0);a[b+31>>0]=(d[b+31>>0]|0)^(d[f+120>>0]|0)<<7;i=e;return}function Bc(b,c,e,f){b=b|0;c=c|0;e=e|0;f=f|0;var g=0,h=0;if(!(f>>>0<2147483647&f<<1>>>0<c>>>0))ba();if(!f)c=0;else{c=0;do{h=d[e+c>>0]|0;g=c<<1;a[b+g>>0]=(h>>>4)+87+(((h>>>4)+65526|0)>>>8&217);a[b+(g|1)>>0]=(((h&15)<<8)+22272+((h&15)+65526&55552)|0)>>>8;c=c+1|0}while((c|0)!=(f|0));c=f<<1}a[b+c>>0]=0;return b|0}function Cc(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;g=i;h=i=i+63&-64;i=i+208|0;c[h+64>>2]=0;c[h+64+4>>2]=0;c[h+64+8>>2]=0;c[h+64+12>>2]=0;f=h;j=400;k=f+64|0;do{c[f>>2]=c[j>>2];f=f+4|0;j=j+4|0}while((f|0)<(k|0));Ja(h,b,d,e)|0;Wb(h,a)|0;i=g;return 0}function Dc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;do if(!(c>>>0>64|(d+-1|0)>>>0>63)){if(d>>>0>=256)fa(33344,33364,52,33505);if(c>>>0>=256)fa(33444,33364,53,33505);if((b|0)==0|(c|0)==0){Jb(a,d&255);a=0;break}else{pb(a,d&255,b,c&255);a=0;break}}else a=-1;while(0);return a|0}function Ec(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;if(f>>>0>4294967295|(f|0)==-1&e>>>0>4294967279)ba();$b(a,a+e|0,0,d,e,f,g,h,i,0,k,l)|0;if(b|0){k=we(e|0,f|0,16,0)|0;c[b>>2]=k;c[b+4>>2]=D}return 0}function Fc(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;if(f>>>0>4294967295|(f|0)==-1&e>>>0>4294967279)ba();Cb(a,a+e|0,0,d,e,f,g,h,i,0,k,l)|0;if(b|0){k=we(e|0,f|0,16,0)|0;c[b>>2]=k;c[b+4>>2]=D}return 0}function Gc(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;if(f>>>0>4294967295|(f|0)==-1&e>>>0>4294967279)ba();Ob(a,a+e|0,0,d,e,f,g,h,i,0,k,l)|0;if(b|0){k=we(e|0,f|0,16,0)|0;c[b>>2]=k;c[b+4>>2]=D}return 0}function Hc(b,c,e){b=b|0;c=c|0;e=e|0;var f=0,g=0;f=i;g=i=i+63&-64;i=i+160|0;Cc(c,e,32,0)|0;a[c>>0]=(d[c>>0]|0)&248;a[c+31>>0]=(d[c+31>>0]|0)&63|64;Ra(g,c);Ac(b,g);cd(c|0,e|0,32)|0;cd(c+32|0,b|0,32)|0;i=f;return 0}function Ic(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;do if(!((b+-1|0)>>>0>63|g>>>0>64)){if(b>>>0>=256)fa(33344,33364,18,33417);if(g>>>0<256){hc(a,c,f,b&255,d,e,g&255);h=0;break}else fa(33444,33364,19,33417)}else h=-1;while(0);return h|0}function Jc(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0;g=i;f=i=i+63&-64;i=i+16|0;c[f+4>>2]=b;c[f>>2]=d;if(!e)b=0;else{d=0;b=0;do{b=a[(c[f>>2]|0)+d>>0]^a[(c[f+4>>2]|0)+d>>0]|b;d=d+1|0}while((d|0)!=(e|0))}i=g;return (((b&255)+511|0)>>>8&1)+-1|0}function Kc(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;g=i;h=i=i+63&-64;i=i+64|0;Cc(h,d,32,0)|0;d=c;e=h;f=d+32|0;do{a[d>>0]=a[e>>0]|0;d=d+1|0;e=e+1|0}while((d|0)<(f|0));ld(h,64);h=_e(b,c)|0;i=g;return h|0}function Lc(b,c){b=b|0;c=c|0;var e=0,f=0,g=0;f=i;g=i=i+63&-64;i=i+64|0;Cc(g,c,32,0)|0;a[g>>0]=(d[g>>0]|0)&248;a[g+31>>0]=(d[g+31>>0]|0)&63|64;c=g;e=b+32|0;do{a[b>>0]=a[c>>0]|0;b=b+1|0;c=c+1|0}while((b|0)<(e|0));ld(g,64);i=f;return 0}function Mc(b,c,d,e,f,g){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;if(e>>>0<0|(e|0)==0&d>>>0<32)b=-1;else{be(b,c,d,e,f,g)|0;c=we(d|0,e|0,-32,-1)|0;pe(b+16|0,b+32|0,c,D,b)|0;c=b+16|0;do{a[b>>0]=0;b=b+1|0}while((b|0)<(c|0));b=0}return b|0}function Nc(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=b+e|0;if((e|0)>=20){d=d&255;g=b&3;h=d|d<<8|d<<16|d<<24;if(g){g=b+4-g|0;while((b|0)<(g|0)){a[b>>0]=d;b=b+1|0}}while((b|0)<(f&~3|0)){c[b>>2]=h;b=b+4|0}}while((b|0)<(f|0)){a[b>>0]=d;b=b+1|0}return b-e|0}function Oc(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;h=i;g=i=i+63&-64;i=i+32|0;if(d>>>0<0|(d|0)==0&c>>>0<48)a=-1;else{c=we(c|0,d|0,-32,-1)|0;d=D;_c(g,b,e);a=jd(a,b+32|0,c,d,g,b,f)|0}i=h;return a|0}function Pc(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0;j=i;h=i=i+63&-64;i=i+32|0;if(!(ad(h,f,g)|0)){a=nc(a,b,c,d,e,h)|0;ld(h,32)}else a=-1;i=j;return a|0}function Qc(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0;g=i;i=i+480|0;ub(g,f,32)|0;Je(g,c,d,e)|0;ud(g,g+416|0)|0;c=g+416|0;d=b+32|0;do{a[b>>0]=a[c>>0]|0;b=b+1|0;c=c+1|0}while((b|0)<(d|0));i=g;return 0}function Rc(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0;j=i;h=i=i+63&-64;i=i+32|0;if(!(ad(h,f,g)|0)){a=Mc(a,b,c,d,e,h)|0;ld(h,32)}else a=-1;i=j;return a|0}function Sc(a,b,c,d,e,f,g,h,j,k){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0;l=i;m=i=i+63&-64;i=i+16|0;ef(m);k=Da(m,a,b,c,d,e,f,g,h,j,k)|0;re(m);i=l;return k|0}function Tc(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;j=i;k=i=i+63&-64;i=i+32|0;Ba(k,e,h,0)|0;h=Nd(a,b,c,d,e+16|0,f,g,k)|0;ld(k,32);i=j;return h|0}function Uc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;e=i;d=i=i+63&-64;i=i+16|0;f=Vd(d,b)|0;c[(mg()|0)>>2]=f;if(!f)d=c[d>>2]|0;else{c[d>>2]=0;d=0}c[a>>2]=d;c[a+4>>2]=d;c[a+8>>2]=d|0?b:0;i=e;return d|0}function Vc(a){a=a|0;var b=0,d=0;d=a+15&-16|0;b=c[k>>2]|0;a=b+d|0;if((d|0)>0&(a|0)<(b|0)|(a|0)<0){_()|0;ca(12);return -1}c[k>>2]=a;if((a|0)>(Z()|0)?(Y()|0)==0:0){ca(12);c[k>>2]=b;return -1}return b|0}function Wc(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0;j=i;i=i+32|0;if(!(Te(j,g,h)|0)){a=gb(a,b,c,d,e,f,j)|0;ld(j,32)}else a=-1;i=j;return a|0}function Xc(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0;j=i;i=i+32|0;if(!(Te(j,g,h)|0)){Za(a,b,c,d,e,f,j)|0;ld(j,32);a=0}else a=-1;i=j;return a|0}function Yc(a){a=a|0;c[a+32>>2]=0;c[a+32+4>>2]=0;c[a>>2]=c[8226];c[a+4>>2]=c[8227];c[a+8>>2]=c[8228];c[a+12>>2]=c[8229];c[a+16>>2]=c[8230];c[a+20>>2]=c[8231];c[a+24>>2]=c[8232];c[a+28>>2]=c[8233];return 0}function Zc(a,b,d,e,f,g,h,i,j,k,l){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;if((l|0)==1)a=ec(a,b,d,e,f,g,h,i,j,k,1)|0;else{c[(mg()|0)>>2]=22;a=-1}return a|0}function _c(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;e=i=i+63&-64;i=i+368|0;Qe(e,0,0,24)|0;Fe(e,b,32,0)|0;Fe(e,c,32,0)|0;Xe(e,a,24)|0;i=d;return}function $c(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;f=i;g=i=i+63&-64;i=i+32|0;Ba(g,d,e,0)|0;e=Le(a,b,c,d+16|0,g)|0;ld(g,32);i=f;return e|0}function ad(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;e=i;d=i=i+63&-64;i=i+32|0;if(!(fd(d,c,b)|0)){Ba(a,35388,d,0)|0;a=0}else a=-1;i=e;return a|0}function bd(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0;f=i;i=i+32|0;Qc(f,b,c,d,e)|0;e=Fd(a,f)|0;e=((f|0)==(a|0)?-1:e)|(Jc(f,a,32)|0);i=f;return e|0}function cd(b,c,d){b=b|0;c=c|0;d=d|0;var e=0;if((c|0)<(b|0)&(b|0)<(c+d|0)){e=b;c=c+d|0;b=b+d|0;while((d|0)>0){b=b-1|0;c=c-1|0;d=d-1|0;a[b>>0]=a[c>>0]|0}b=e}else yc(b,c,d)|0;return b|0}function dd(a,b){a=a|0;b=b|0;var c=0,d=0,e=0;c=S(b&65535,a&65535)|0;e=(c>>>16)+(S(b&65535,a>>>16)|0)|0;d=S(b>>>16,a&65535)|0;return (D=(e>>>16)+(S(b>>>16,a>>>16)|0)+(((e&65535)+d|0)>>>16)|0,e+d<<16|c&65535|0)|0}function ed(a,b){a=a|0;b=b|0;oa(a,b,b+120|0);oa(a+40|0,b+40|0,b+80|0);oa(a+80|0,b+80|0,b+120|0);oa(a+120|0,b,b+40|0);return}function fd(b,c,d){b=b|0;c=c|0;d=d|0;if(!(wa(b,c,d)|0)){c=0;d=0;do{d=a[b+c>>0]|d;c=c+1|0}while((c|0)!=32);c=0-(((d&255)+511|0)>>>8&1)|0}else c=-1;return c|0}function gd(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0;f=i;i=i+64|0;rd(f,b,c,d,e)|0;e=Ed(a,f)|0;e=((f|0)==(a|0)?-1:e)|(Jc(f,a,64)|0);i=f;return e|0}function hd(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0;f=i;i=i+32|0;sd(f,b,c,d,e)|0;e=Fd(a,f)|0;e=((f|0)==(a|0)?-1:e)|(Jc(f,a,32)|0);i=f;return e|0}function id(a,b){a=a|0;b=b|0;var e=0,f=0,g=0;e=0;g=0;do{f=sb(33887,d[b>>0]|0,65)|0;if(!f){b=0;e=0;break}b=b+1|0;e=f-33887<<g|e;g=g+6|0}while(g>>>0<30);c[a>>2]=e;return b|0}function jd(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;if(d>>>0<0|(d|0)==0&c>>>0<16)a=-1;else{d=we(c|0,d|0,-16,-1)|0;a=Wc(a,b+16|0,b,d,D,e,f,g)|0}return a|0}function kd(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;f=i;g=i=i+63&-64;i=i+16|0;eb(g,b,c,d,e)|0;e=Gd(a,g)|0;i=f;return e|0}function ld(b,d){b=b|0;d=d|0;var e=0,f=0;e=i;f=i=i+63&-64;i=i+16|0;c[f>>2]=b;if(d|0){b=0;do{a[(c[f>>2]|0)+b>>0]=0;b=b+1|0}while((b|0)!=(d|0))}i=e;return}function md(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=0;do{g=b+(d<<3)|0;e=a+(d<<3)|0;f=c[e+4>>2]^c[g+4>>2];c[e>>2]=c[e>>2]^c[g>>2];c[e+4>>2]=f;d=d+1|0}while((d|0)!=128);return}function nd(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;if(d>>>0<0|(d|0)==0&c>>>0<16)a=-1;else{d=we(c|0,d|0,-16,-1)|0;a=gb(a,b+16|0,b,d,D,e,f)|0}return a|0}function od(b){b=b|0;var c=0;c=a[n+(b&255)>>0]|0;if((c|0)<8)return c|0;c=a[n+(b>>8&255)>>0]|0;if((c|0)<8)return c+8|0;c=a[n+(b>>16&255)>>0]|0;if((c|0)<8)return c+16|0;return (a[n+(b>>>24)>>0]|0)+24|0}function pd(b,c){b=b|0;c=c|0;var d=0,e=0;e=i;i=i+64|0;ud(b,e)|0;b=e;d=c+32|0;do{a[c>>0]=a[b>>0]|0;c=c+1|0;b=b+1|0}while((c|0)<(d|0));i=e;return 0}function qd(b,c,d){b=b|0;c=c|0;d=d|0;if(!(d>>>0<1|(d|0)==1&c>>>0<0))fa(34789,34809,199,34835);if(c|0){d=0;do{a[b+d>>0]=$(0)|0;d=d+1|0}while((d|0)!=(c|0))}return}function rd(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0;f=i;i=i+416|0;ub(f,e,32)|0;Ja(f,b,c,d)|0;ud(f,a)|0;i=f;return 0}function sd(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0;f=i;i=i+208|0;vb(f,e,32)|0;Qa(f,b,c,d)|0;vd(f,a)|0;i=f;return 0}function td(a){a=a|0;var b=0,d=0;c[a+64>>2]=0;c[a+64+4>>2]=0;c[a+64+8>>2]=0;c[a+64+12>>2]=0;b=400;d=a+64|0;do{c[a>>2]=c[b>>2];a=a+4|0;b=b+4|0}while((a|0)<(d|0));return 0}function ud(a,b){a=a|0;b=b|0;var c=0;c=i;i=i+64|0;Wb(a,c)|0;Ja(a+208|0,c,64,0)|0;Wb(a+208|0,b)|0;ld(c,64);i=c;return 0}function vd(a,b){a=a|0;b=b|0;var c=0;c=i;i=i+32|0;Pa(a,c)|0;Qa(a+104|0,c,32,0)|0;Pa(a+104|0,b)|0;ld(c,32);i=c;return 0}function wd(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;if(d>>>0>0|(d|0)==0&c>>>0>4294967279)a=-1;else a=Xc(a+16|0,a,b,c,d,e,f,g)|0;return a|0}function xd(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;if(e>>>0>0|(e|0)==0&d>>>0>4294967295){c[(mg()|0)>>2]=27;a=-1}else a=((of(a,b,d)|0)!=0)<<31>>31;return a|0}function yd(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;if(d>>>0>0|(d|0)==0&c>>>0>4294967279)a=-1;else{Za(a+16|0,a,b,c,d,e,f)|0;a=0}return a|0}function zd(a){a=a|0;return (0-(a^62)|0)>>>8&43^43|(a+65510|0)>>>8&255&a+65|(0-(a^63)|0)>>>8&47^47|(a+65484|0)>>>8&a+71&((a+65510|0)>>>8&255^255)|(a+65474|0)>>>8&a+252&((a+65484|0)>>>8&255^255)|0}function Ad(a,b){a=a|0;b=b|0;oa(a,b,b+120|0);oa(a+40|0,b+40|0,b+80|0);oa(a+80|0,b+80|0,b+120|0);return}function Bd(a,b){a=a|0;b=b|0;var c=0,d=0;c=i;d=i=i+63&-64;i=i+32|0;Md(d,32);Hc(a,b,d)|0;ld(d,32);i=c;return 0}function Cd(a){a=a|0;var b=0;if(a>>>0<2)a=0;else{do b=$(0)|0;while(b>>>0<(((0-a|0)>>>0)%(a>>>0)|0)>>>0);a=(b>>>0)%(a>>>0)|0}return a|0}function Dd(a,b,c){a=a|0;b=b|0;c=c|0;xb(a,b,c&255);xb(a+40|0,b+40|0,c&255);xb(a+80|0,b+80|0,c&255);return}function Ed(b,c){b=b|0;c=c|0;var d=0,e=0;d=0;e=0;do{d=(a[c+e>>0]^a[b+e>>0])&255|d;e=e+1|0}while((e|0)!=64);return ((d+511|0)>>>8&1)+-1|0}function Fd(b,c){b=b|0;c=c|0;var d=0,e=0;d=0;e=0;do{d=(a[c+e>>0]^a[b+e>>0])&255|d;e=e+1|0}while((e|0)!=32);return ((d+511|0)>>>8&1)+-1|0}function Gd(b,c){b=b|0;c=c|0;var d=0,e=0;d=0;e=0;do{d=(a[c+e>>0]^a[b+e>>0])&255|d;e=e+1|0}while((e|0)!=16);return ((d+511|0)>>>8&1)+-1|0}function Hd(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;f=i;i=i+16|0;Ea(a,b,d,e,f|0)|0;i=f;return (D=c[f+4>>2]|0,c[f>>2]|0)|0}function Id(){}function Jd(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){D=b>>c;return a>>>c|(b&(1<<c)-1)<<32-c}D=(b|0)<0?-1:0;return b>>c-32|0}function Kd(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=dd(a,c)|0;f=D;return (D=(S(b,c)|0)+(S(d,a)|0)+f|f&0,e|0|0)|0}function Ld(a,b,c){a=a|0;b=b|0;c=c|0;if(c>>>0<256)return cb(a,b,c&255)|0;else fa(33344,33364,102,33583);return 0}function Md(b,c){b=b|0;c=c|0;var d=0;if(c|0){d=0;do{a[b+d>>0]=$(0)|0;d=d+1|0}while((d|0)!=(c|0))}return}function Nd(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;return Na(a,b,c,d,e,f,g,h)|0}function Od(b,c){b=b|0;c=c|0;var d=0;d=c;do{if(!d){c=0;break}d=d+-1|0;c=b+d|0}while((a[c>>0]|0)!=36);return c|0}function Pd(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;return _a(a,b,c,d,e,f,g,h)|0}function Qd(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return gb(a,b,c,d,e,f,g)|0}function Rd(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return Pc(a,b,c,d,e,f,g)|0}function Sd(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return Wa(a,b,c,d,e,f,g)|0}function Td(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;Za(a,b,c,d,e,f,g)|0;return 0}function Ud(){var a=0;a=aa(30)|0;if((a|0)>0)c[8717]=a;else a=c[8717]|0;if(a>>>0<16)ba();else{Md(35448,16);return}}function Vd(a,b){a=a|0;b=b|0;var d=0;if(b>>>0<=4294967168?(d=tb(b)|0,(d|0)!=0):0){c[a>>2]=d;a=0}else a=12;return a|0}function Wd(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){D=b<<c|(a&(1<<c)-1<<32-c)>>>32-c;return a<<c}D=a<<c-32;return 0}function Xd(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return Rc(a,b,c,d,e,f,g)|0}function Yd(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){D=b>>>c;return a>>>c|(b&(1<<c)-1)<<32-c}D=0;return b>>>c-32|0}function Zd(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return Ic(a,b,c,d,e,f,g)|0}function _d(a){a=a|0;var b=0;c[a>>2]=1;a=a+4|0;b=a+36|0;do{c[a>>2]=0;a=a+4|0}while((a|0)<(b|0));return}function $d(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return _b(a,b,c,d,e,f,g)|0}function ae(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;return zb(a,b,1,c,d,e,16,f,g,0,0)|0}function be(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return Tc(a,b,c,d,e,0,0,f)|0}function ce(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return Xb(a,b,c,d,e,f)|0}function de(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return nc(a,b,c,d,e,f)|0}function ee(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return Wa(a,b,c,d,e,0,f)|0}function fe(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return Na(a,b,c,d,e,0,0,f)|0}function ge(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;Bb(a,b,c,d,e,f)|0;return 0}function he(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return kd(a,b,c,d,e)|0}function ie(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return zb(a,b,1,c,d,e,16,0,32,f,128)|0}function je(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return _a(a,b,c,d,e,0,0,f)|0}function ke(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return Mc(a,b,c,d,e,f)|0}function le(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return de(a,b,c,d,e,f)|0}function me(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return be(a,b,c,d,e,f)|0}function ne(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return Ya(a,b,c,d,e)|0}function oe(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return lc(a,b,c,d,e,f)|0}function pe(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return eb(a,b,c,d,e)|0}function qe(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return he(a,b,c,d,e)|0}function re(a){a=a|0;var b=0;b=c[a>>2]|0;if(b|0)ta(b);c[a+4>>2]=0;c[a>>2]=0;c[a+8>>2]=0;return}function se(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return ke(a,b,c,d,e,f)|0}function te(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;d=b-d-(c>>>0>a>>>0|0)>>>0;return (D=d,a-c>>>0|0)|0}function ue(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return jc(a,b,c,d,e,f)|0}function ve(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return Oe(a,b,c,d)|0}function we(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return (D=b+d+(a+c>>>0>>>0<a>>>0|0)>>>0,a+c>>>0|0)|0}function xe(){var a=0;if(!(c[8716]|0)){Bf();Ud();c[8716]=1;a=0}else a=1;return a|0}function ye(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return bd(a,b,c,d,e)|0}function ze(a){a=a|0;var b=0;b=a+40|0;do{c[a>>2]=0;a=a+4|0}while((a|0)<(b|0));return}function Ae(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;sa(a,b,c,d,e)|0;return 0}function Be(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return pe(a,b,c,d,e)|0}function Ce(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;lb(a,b,c,d);return 0}function De(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Je(a,b,c,d)|0;return 0}function Ee(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return Xa(a,b,c,d,e)|0}function Fe(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Ce(a,b,c,d)|0;return 0}function Ge(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Qc(a,b,c,d,e)|0;return 0}function He(a,b){a=a|0;b=b|0;Md(b,32);return _e(a,b)|0}function Ie(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return ve(a,b,c,d)|0}function Je(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Ja(a,b,c,d)|0;return 0}function Ke(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Qa(a,b,c,d)|0;return 0}function Le(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return hb(a,b,c,d,e)|0}function Me(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return $c(a,b,c,d,e)|0}function Ne(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return xd(a,b,c,d)|0}function Oe(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Ta(a,b,c,d);return 0}function Pe(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return ab(a,b,c,d,e)|0}function Qe(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return Dc(a,b,c,d)|0}function Re(a,b,c){a=a|0;b=b|0;c=c|0;return Kc(a,b,c)|0}function Se(a,b,c){a=a|0;b=b|0;c=c|0;Ee(a,b,0,35436,c)|0;return}function Te(a,b,c){a=a|0;b=b|0;c=c|0;return ad(a,b,c)|0}function Ue(b,c){b=b|0;c=c|0;b=Nb(b,c)|0;return ((a[b>>0]|0)==(c&255)<<24>>24?b:0)|0}function Ve(a,b,c){a=a|0;b=b|0;c=c|0;ub(a,b,c)|0;return 0}function We(a,b,c){a=a|0;b=b|0;c=c|0;Hc(a,b,c)|0;return 0}function Xe(a,b,c){a=a|0;b=b|0;c=c|0;return Ld(a,b,c)|0}function Ye(a){a=a|0;var b=0;b=i;i=i+a|0;i=i+15&-16;return b|0}function Ze(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;Cc(a,b,c,d)|0;return 0}function _e(a,b){a=a|0;b=b|0;return Ub(a,b)|0}function $e(a,b){a=a|0;b=b|0;return kf(a,b)|0}function af(a,b){a=a|0;b=b|0;return jb(a,b)|0}function bf(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return Ea(a,b,c,d,0)|0}function cf(a,b,c){a=a|0;b=b|0;c=c|0;return fd(a,b,c)|0}function df(a,b){a=a|0;b=b|0;return He(a,b)|0}function ef(a){a=a|0;c[a+4>>2]=0;c[a>>2]=0;c[a+8>>2]=0;return}function ff(a,b){a=a|0;b=b|0;return $e(a,b)|0}function gf(a,b){a=a|0;b=b|0;cd(a|0,b+32|0,32)|0;return 0}function hf(a,b){a=a|0;b=b|0;return _e(a,b)|0}function jf(a,b){a=a|0;b=b|0;return af(a,b)|0}function kf(a,b){a=a|0;b=b|0;Oa(a,b);return 0}function lf(a,b){a=a|0;b=b|0;if(!o){o=a;p=b}}function mf(a,b){a=a|0;b=b|0;cd(a|0,b|0,32)|0;return 0}function nf(a,b){a=a|0;b=b|0;Bd(a,b)|0;return 0}function of(a,b,c){a=a|0;b=b|0;c=c|0;return mb(a,b,c)|0}function pf(a,b){a=a|0;b=b|0;yc(a|0,b|0,1024)|0;return}function qf(a,b){a=a|0;b=b|0;i=a;j=b}function rf(a){a=a|0;return Od(a,(pc(a)|0)+1|0)|0}function sf(a){a=a|0;Md(a,16);return}function tf(){return 1073741824}function uf(a){a=a|0;Nc(a|0,0,1024)|0;return}function vf(){return 524288}function wf(a){a=a|0;Md(a,32);return}function xf(){return 16777216}function yf(){return 33952}function zf(){return $(0)|0}function Af(){return 102}function Bf(){ea(1);return}function Cf(){return 33554432}function Df(){return 536870912}function Ef(){return 12}function Ff(){return 134217728}function Gf(){return 34043}function Hf(){return 416}function If(a){a=a|0;i=a}function Jf(){return 33823}function Kf(a){a=a|0;D=a}function Lf(){return 33956}function Mf(){return 6}function Nf(){return 256}function Of(){return 208}function Pf(){return 104}function Qf(){return 384}function Rf(){return 33984}function Sf(){return 33967}function Tf(){return 32768}function Uf(){return 4}function Vf(){return 9}function Wf(){return 34034}function Xf(){return 33869}function Yf(){return 33879}function Zf(){return 3}function _f(){return 34847}function $f(){return 33994}function ag(){return 1}function bg(){return 33616}function cg(){return 33192}function dg(){return 128}function eg(){return -1}function fg(){return 33815}function gg(){return 33206}function hg(){return 8}function ig(){return 24}function jg(){return D|0}function kg(){return 48}function lg(){return 16}function mg(){return 34872}function ng(){return i|0}function og(){return 64}function pg(){return 32}function qg(){return 0}

// EMSCRIPTEN_END_FUNCS
return{_crypto_onetimeauth_poly1305_init:af,_crypto_hash_sha512_init:td,_crypto_pwhash_scryptsalsa208sha256:Qb,_crypto_scalarmult_primitive:Lf,_crypto_scalarmult_base:hf,_crypto_auth_bytes:pg,_crypto_stream_chacha20_keybytes:pg,_crypto_aead_chacha20poly1305_decrypt_detached:Fb,_crypto_kdf_blake2b_bytes_min:lg,_crypto_generichash_blake2b_keybytes_max:og,_crypto_box_beforenmbytes:pg,___udivmoddi4:Ea,_crypto_sign_ed25519_sk_to_curve25519:Lc,_crypto_stream_chacha20_ietf_xor_ic:Sd,_crypto_secretbox_xsalsa20poly1305_open:nc,_crypto_box_zerobytes:pg,_crypto_hash_sha512_bytes:og,_crypto_verify_32:Fd,_crypto_sign_ed25519_publickeybytes:pg,_crypto_core_hsalsa20_keybytes:pg,_crypto_sign_primitive:$f,_crypto_scalarmult_curve25519_bytes:pg,_crypto_pwhash_scryptsalsa208sha256_saltbytes:pg,_crypto_pwhash_argon2i_str_verify:xd,_crypto_scalarmult_curve25519_base:_e,_crypto_box_detached_afternm:Td,_crypto_stream_salsa20_xor_ic:Nd,_crypto_auth_hmacsha256_init:vb,_crypto_stream_chacha20_ietf_xor:ee,_crypto_auth_hmacsha512256_final:pd,_sodium_library_version_major:Vf,_crypto_kdf_blake2b_derive_from_key:Xb,_crypto_box_curve25519xsalsa20poly1305_keypair:He,_crypto_hash_sha256_init:Yc,_crypto_stream_xsalsa20_noncebytes:ig,_crypto_scalarmult_curve25519_scalarbytes:pg,_crypto_verify_64:Ed,_crypto_box_curve25519xsalsa20poly1305_open:Pc,_crypto_pwhash_memlimit_sensitive:Df,_crypto_pwhash_argon2i_opslimit_interactive:Uf,_crypto_kdf_blake2b_keybytes:pg,_crypto_hash_sha512_update:Ja,_crypto_core_hchacha20:za,_crypto_pwhash_bytes_min:lg,_crypto_secretbox_open:de,_crypto_auth_hmacsha256_final:vd,_crypto_verify_16:Gd,_crypto_pwhash_scryptsalsa208sha256_memlimit_max:eg,_crypto_pwhash_scryptsalsa208sha256_ll:Sc,_crypto_secretbox_xsalsa20poly1305_keygen:wf,_crypto_pwhash_argon2i_bytes_max:eg,_crypto_onetimeauth_poly1305_update:ve,_crypto_pwhash_memlimit_max:Tf,_crypto_verify_64_bytes:og,_crypto_onetimeauth_poly1305_keygen:wf,_crypto_generichash_blake2b_keygen:wf,_crypto_pwhash_argon2i_strprefix:Xf,_crypto_auth_hmacsha256_update:Ke,_crypto_aead_xchacha20poly1305_ietf_encrypt:Ec,_crypto_pwhash_scryptsalsa208sha256_strbytes:Af,_crypto_stream_xsalsa20_keybytes:pg,_crypto_generichash_keygen:wf,_crypto_pwhash_argon2i_str:_b,_crypto_box_sealbytes:kg,_crypto_core_hchacha20_constbytes:lg,_crypto_secretbox_boxzerobytes:lg,_crypto_aead_chacha20poly1305_ietf_keygen:wf,_crypto_stream_chacha20:Pe,_crypto_box_open_afternm:le,_crypto_pwhash_opslimit_moderate:Mf,_crypto_box_macbytes:lg,_randombytes_seedbytes:pg,_crypto_generichash_primitive:fg,_crypto_sign_ed25519_keypair:Bd,_crypto_aead_xchacha20poly1305_ietf_keybytes:pg,_crypto_auth_primitive:cg,_malloc:ma,_crypto_stream_noncebytes:ig,_crypto_generichash_keybytes_max:og,_crypto_secretbox_xsalsa20poly1305_keybytes:pg,_crypto_pwhash_saltbytes:lg,_crypto_secretbox_noncebytes:ig,_crypto_secretbox_xsalsa20poly1305_macbytes:lg,_crypto_pwhash_argon2i_opslimit_max:eg,_crypto_auth_hmacsha512_bytes:og,_crypto_generichash_keybytes:pg,_crypto_sign_publickeybytes:pg,_crypto_pwhash_argon2i_memlimit_moderate:Ff,_crypto_generichash_blake2b:Ic,_crypto_core_hchacha20_keybytes:pg,___uremdi3:Hd,_crypto_pwhash_argon2i_opslimit_moderate:Mf,_randombytes_implementation_name:Gf,_crypto_stream:Me,_crypto_sign_ed25519_verify_detached:Ya,_crypto_hash_sha512_statebytes:Of,_crypto_secretbox_primitive:Sf,_crypto_verify_32_bytes:pg,_crypto_kdf_keygen:wf,_randombytes_buf:Md,_crypto_stream_chacha20_ietf_keygen:wf,_crypto_stream_chacha20_keygen:wf,_crypto_box_easy:wd,_crypto_hash_sha256:wc,_crypto_sign_ed25519_seedbytes:pg,_crypto_pwhash_alg_argon2i13:ag,_crypto_pwhash_scryptsalsa208sha256_memlimit_min:xf,_crypto_pwhash_opslimit_min:Zf,_crypto_pwhash_argon2i_memlimit_max:Tf,_crypto_kdf_blake2b_bytes_max:og,_crypto_generichash_bytes_max:og,_crypto_stream_chacha20_ietf_noncebytes:Ef,_crypto_pwhash_scryptsalsa208sha256_memlimit_sensitive:tf,_crypto_box_beforenm:Te,_crypto_box_curve25519xsalsa20poly1305_afternm:ke,_crypto_sign_open:oe,_crypto_box_seed_keypair:Re,_crypto_auth_hmacsha512_init:ub,_crypto_sign_ed25519_sk_to_pk:gf,_crypto_scalarmult_curve25519:fd,_crypto_box_open_easy:jd,_crypto_auth_hmacsha512:rd,_crypto_stream_keygen:wf,_crypto_auth_hmacsha512256_keybytes:pg,_crypto_aead_chacha20poly1305_keybytes:pg,_free:ta,_crypto_onetimeauth_poly1305_keybytes:pg,_crypto_sign_ed25519_secretkeybytes:og,_crypto_kdf_blake2b_contextbytes:hg,_crypto_sign_seedbytes:pg,_randombytes_random:zf,_crypto_auth_hmacsha256_keygen:wf,_crypto_auth_hmacsha256_statebytes:Of,_randombytes_buf_deterministic:Se,_crypto_aead_chacha20poly1305_encrypt_detached:Ob,_crypto_stream_xsalsa20_keygen:wf,_crypto_hash_primitive:bg,_crypto_sign_ed25519_pk_to_curve25519:kc,_crypto_shorthash_siphash24:sa,_crypto_box_curve25519xsalsa20poly1305_macbytes:lg,_crypto_sign_ed25519_bytes:og,_crypto_sign_ed25519:jc,_crypto_core_salsa20_constbytes:lg,_crypto_box_boxzerobytes:lg,_crypto_pwhash_argon2i_saltbytes:lg,_crypto_box_curve25519xsalsa20poly1305_beforenmbytes:pg,_crypto_onetimeauth:Be,_crypto_shorthash_bytes:hg,_crypto_secretbox_zerobytes:pg,_crypto_stream_xsalsa20_xor:be,_crypto_generichash_blake2b_saltbytes:lg,_crypto_box_open_detached:Wc,_crypto_secretbox_xsalsa20poly1305_zerobytes:pg,_crypto_generichash_blake2b_keybytes:pg,_crypto_pwhash_argon2i_bytes_min:lg,_crypto_pwhash_scryptsalsa208sha256_str:Ib,_crypto_hash:Ze,_i64Subtract:te,_crypto_box_seedbytes:pg,_crypto_generichash_blake2b_bytes_min:lg,_crypto_box_curve25519xsalsa20poly1305:Rc,_crypto_generichash_blake2b_statebytes:Qf,_crypto_aead_chacha20poly1305_ietf_decrypt_detached:nb,_crypto_auth_hmacsha512256_bytes:pg,_crypto_auth_hmacsha512_update:Je,_crypto_auth_hmacsha256:sd,_crypto_box_keypair:df,_crypto_hash_sha256_bytes:pg,___udivdi3:bf,_crypto_pwhash_argon2i_passwd_max:eg,_sodium_init:xe,_crypto_secretbox_macbytes:lg,_crypto_aead_xchacha20poly1305_ietf_npubbytes:ig,_bitshift64Shl:Wd,_crypto_pwhash_argon2i_opslimit_min:Zf,_crypto_shorthash_siphash24_keybytes:lg,_crypto_core_salsa20_outputbytes:og,___muldi3:Kd,_crypto_aead_chacha20poly1305_nsecbytes:qg,_crypto_aead_xchacha20poly1305_ietf_nsecbytes:qg,_crypto_pwhash_argon2i_strbytes:dg,_crypto_box_curve25519xsalsa20poly1305_publickeybytes:pg,_crypto_generichash_blake2b_salt_personal:zc,_crypto_kdf_derive_from_key:ce,_crypto_secretbox_xsalsa20poly1305_noncebytes:ig,_crypto_pwhash_scryptsalsa208sha256_opslimit_interactive:vf,_crypto_pwhash_argon2i_memlimit_interactive:Cf,_crypto_hash_sha256_final:Pa,_crypto_stream_keybytes:pg,_crypto_pwhash_memlimit_min:ag,_crypto_aead_chacha20poly1305_ietf_npubbytes:Ef,_sodium_library_version_minor:Uf,_crypto_onetimeauth_bytes:lg,_sodium_version_string:_f,_crypto_box_open:Rd,_crypto_auth_hmacsha512_keygen:wf,_crypto_sign_ed25519_open:lc,_crypto_stream_chacha20_ietf_keybytes:pg,_crypto_box_noncebytes:ig,_crypto_core_hchacha20_outputbytes:pg,_bitshift64Ashr:Jd,_crypto_onetimeauth_keygen:wf,_crypto_pwhash_strbytes:dg,_crypto_auth_hmacsha512256_update:De,_crypto_onetimeauth_poly1305:pe,_crypto_kdf_bytes_min:lg,_crypto_sign_ed25519_sk_to_seed:mf,_crypto_pwhash_scryptsalsa208sha256_memlimit_interactive:xf,_crypto_stream_xsalsa20:$c,_crypto_box_open_easy_afternm:nd,_crypto_box_curve25519xsalsa20poly1305_seedbytes:pg,_crypto_stream_salsa20_keybytes:pg,_crypto_kdf_primitive:fg,_crypto_shorthash:Ae,_crypto_auth_keybytes:pg,_crypto_box_curve25519xsalsa20poly1305_open_afternm:de,_crypto_aead_chacha20poly1305_npubbytes:hg,_crypto_aead_xchacha20poly1305_ietf_abytes:lg,_crypto_onetimeauth_poly1305_final:$e,_crypto_onetimeauth_poly1305_bytes:lg,_crypto_box_curve25519xsalsa20poly1305_seed_keypair:Kc,_crypto_box_primitive:gg,_crypto_pwhash_str:$d,_crypto_auth_hmacsha512_keybytes:pg,_crypto_auth:Ge,_crypto_box_detached:Xc,_crypto_pwhash_scryptsalsa208sha256_bytes_min:lg,_crypto_core_salsa20_keybytes:pg,_crypto_box_afternm:se,_crypto_onetimeauth_primitive:Jf,_crypto_pwhash_scryptsalsa208sha256_str_verify:rc,_randombytes_stir:Bf,_crypto_pwhash_scryptsalsa208sha256_passwd_min:qg,_crypto_stream_chacha20_ietf:Ee,_crypto_generichash:Zd,_crypto_core_hsalsa20_outputbytes:pg,_crypto_pwhash_opslimit_interactive:Uf,_crypto_box_curve25519xsalsa20poly1305_noncebytes:ig,_crypto_aead_chacha20poly1305_ietf_decrypt:uc,_crypto_auth_hmacsha512256_init:Ve,_crypto_onetimeauth_poly1305_verify:he,_crypto_auth_hmacsha512_final:ud,_crypto_auth_hmacsha512256_verify:bd,_crypto_box_secretkeybytes:pg,_crypto_onetimeauth_update:Ie,_crypto_core_salsa20:xa,_crypto_pwhash_memlimit_interactive:Cf,_crypto_scalarmult_bytes:pg,_crypto_secretbox_detached:Za,_crypto_stream_xor:me,_crypto_secretbox_easy:yd,_crypto_aead_xchacha20poly1305_ietf_decrypt_detached:bc,_crypto_stream_salsa20:Le,_sodium_bin2hex:Bc,_crypto_auth_hmacsha512_statebytes:Hf,_crypto_kdf_bytes_max:og,_crypto_generichash_blake2b_bytes_max:og,_crypto_hash_sha256_update:Qa,_crypto_core_hsalsa20_constbytes:lg,_crypto_box_easy_afternm:yd,_crypto_pwhash_memlimit_moderate:Ff,_crypto_core_salsa20_inputbytes:lg,_crypto_box_publickeybytes:pg,_crypto_sign_secretkeybytes:og,___muldsi3:dd,_crypto_scalarmult_scalarbytes:pg,_crypto_stream_xsalsa20_xor_ic:Tc,_crypto_aead_chacha20poly1305_decrypt:vc,_crypto_sign:ue,_crypto_pwhash_passwd_max:eg,_crypto_pwhash_scryptsalsa208sha256_opslimit_min:Tf,_sodium_hex2bin:ob,_crypto_pwhash_argon2i_alg_argon2i13:ag,_crypto_secretbox_keybytes:pg,_randombytes:qd,_crypto_hash_bytes:og,_crypto_stream_salsa20_keygen:wf,_crypto_hash_sha256_statebytes:Pf,_crypto_pwhash_argon2i_passwd_min:qg,_crypto_pwhash_opslimit_sensitive:hg,_crypto_generichash_blake2b_personalbytes:lg,_crypto_stream_chacha20_xor_ic:Pd,_crypto_sign_verify_detached:ne,_crypto_onetimeauth_verify:qe,_crypto_sign_ed25519_detached:Bb,_crypto_generichash_init:Qe,_i64Add:we,_crypto_sign_bytes:og,_crypto_generichash_update:Fe,_crypto_scalarmult:cf,_crypto_aead_chacha20poly1305_ietf_abytes:lg,_crypto_sign_detached:ge,_crypto_generichash_blake2b_update:Ce,_crypto_box_curve25519xsalsa20poly1305_beforenm:ad,_crypto_generichash_blake2b_bytes:pg,_crypto_generichash_final:Xe,_randombytes_uniform:Cd,_crypto_sign_seed_keypair:We,_crypto_shorthash_keygen:sf,_crypto_onetimeauth_init:jf,_crypto_sign_ed25519_seed_keypair:Hc,_crypto_stream_salsa20_xor:fe,_crypto_auth_hmacsha512_verify:gd,_crypto_generichash_blake2b_keybytes_min:lg,_bitshift64Lshr:Yd,_crypto_pwhash_bytes_max:eg,_crypto_aead_chacha20poly1305_ietf_keybytes:pg,_crypto_aead_chacha20poly1305_ietf_encrypt_detached:Cb,_crypto_aead_chacha20poly1305_abytes:lg,_sbrk:Vc,_memcpy:yc,_crypto_pwhash:Zc,_crypto_auth_hmacsha512256:Qc,_crypto_secretbox_xsalsa20poly1305:Mc,_crypto_verify_16_bytes:lg,_crypto_generichash_blake2b_final:Ld,_crypto_generichash_blake2b_init_salt_personal:sc,_crypto_box_seal:qc,_crypto_aead_xchacha20poly1305_ietf_keygen:wf,_crypto_pwhash_alg_default:ag,_crypto_box:Xd,_crypto_stream_primitive:Wf,_crypto_secretbox_xsalsa20poly1305_boxzerobytes:lg,_crypto_pwhash_str_verify:Ne,_crypto_generichash_keybytes_min:lg,_crypto_generichash_statebytes:Qf,_crypto_pwhash_strprefix:Xf,_crypto_secretbox_keygen:wf,_crypto_hash_sha512:Cc,_llvm_cttz_i32:od,_crypto_pwhash_scryptsalsa208sha256_bytes_max:eg,_crypto_aead_chacha20poly1305_ietf_nsecbytes:qg,_crypto_aead_chacha20poly1305_ietf_encrypt:Fc,_crypto_generichash_blake2b_init:Dc,_randombytes_close:qg,_crypto_pwhash_primitive:Yf,_crypto_onetimeauth_keybytes:pg,_crypto_pwhash_argon2i:ec,_crypto_kdf_keybytes:pg,_crypto_aead_chacha20poly1305_encrypt:Gc,_crypto_shorthash_siphash24_bytes:hg,_crypto_pwhash_opslimit_max:eg,_crypto_auth_verify:ye,_crypto_generichash_bytes:pg,_crypto_auth_hmacsha512256_keygen:wf,_memset:Nc,_crypto_box_open_detached_afternm:Qd,_crypto_pwhash_argon2i_memlimit_sensitive:Df,_crypto_aead_xchacha20poly1305_ietf_decrypt:tc,_crypto_pwhash_scryptsalsa208sha256_strprefix:yf,_crypto_core_hchacha20_inputbytes:lg,_crypto_auth_keygen:wf,_crypto_secretbox:ke,_crypto_aead_xchacha20poly1305_ietf_encrypt_detached:$b,_crypto_pwhash_scryptsalsa208sha256_passwd_max:eg,_crypto_auth_hmacsha256_bytes:pg,_crypto_auth_hmacsha256_verify:hd,_crypto_sign_keypair:nf,_crypto_onetimeauth_statebytes:Nf,_crypto_stream_salsa20_noncebytes:hg,_crypto_shorthash_keybytes:lg,_crypto_aead_chacha20poly1305_keygen:wf,_memmove:cd,_crypto_hash_sha512_final:Wb,_crypto_box_curve25519xsalsa20poly1305_zerobytes:pg,_crypto_pwhash_passwd_min:qg,_crypto_box_curve25519xsalsa20poly1305_boxzerobytes:lg,_crypto_generichash_bytes_min:lg,_crypto_auth_hmacsha256_keybytes:pg,_crypto_pwhash_argon2i_opslimit_sensitive:hg,_crypto_pwhash_scryptsalsa208sha256_opslimit_max:eg,_crypto_stream_chacha20_noncebytes:hg,_crypto_secretbox_open_detached:gb,_crypto_pwhash_argon2i_memlimit_min:ag,_crypto_pwhash_scryptsalsa208sha256_opslimit_sensitive:Cf,_crypto_box_curve25519xsalsa20poly1305_secretkeybytes:pg,_crypto_kdf_contextbytes:hg,_crypto_box_seal_open:Oc,_crypto_shorthash_primitive:Rf,_crypto_core_hsalsa20_inputbytes:lg,_crypto_onetimeauth_final:ff,_crypto_secretbox_open_easy:nd,_crypto_auth_hmacsha512256_statebytes:Hf,_crypto_stream_chacha20_xor:je,_crypto_core_hsalsa20:Ba,runPostSets:Id,stackAlloc:Ye,stackSave:ng,stackRestore:If,establishStackSpace:qf,setThrew:lf,setTempRet0:Kf,getTempRet0:jg}})


// EMSCRIPTEN_END_ASM
(Module.asmGlobalArg,Module.asmLibraryArg,buffer);var _crypto_onetimeauth_poly1305_init=Module["_crypto_onetimeauth_poly1305_init"]=asm["_crypto_onetimeauth_poly1305_init"];var _crypto_hash_sha512_init=Module["_crypto_hash_sha512_init"]=asm["_crypto_hash_sha512_init"];var _crypto_pwhash_scryptsalsa208sha256=Module["_crypto_pwhash_scryptsalsa208sha256"]=asm["_crypto_pwhash_scryptsalsa208sha256"];var _crypto_scalarmult_primitive=Module["_crypto_scalarmult_primitive"]=asm["_crypto_scalarmult_primitive"];var _crypto_scalarmult_base=Module["_crypto_scalarmult_base"]=asm["_crypto_scalarmult_base"];var _crypto_auth_bytes=Module["_crypto_auth_bytes"]=asm["_crypto_auth_bytes"];var _crypto_stream_chacha20_keybytes=Module["_crypto_stream_chacha20_keybytes"]=asm["_crypto_stream_chacha20_keybytes"];var _crypto_aead_chacha20poly1305_decrypt_detached=Module["_crypto_aead_chacha20poly1305_decrypt_detached"]=asm["_crypto_aead_chacha20poly1305_decrypt_detached"];var _crypto_kdf_blake2b_bytes_min=Module["_crypto_kdf_blake2b_bytes_min"]=asm["_crypto_kdf_blake2b_bytes_min"];var _crypto_generichash_blake2b_keybytes_max=Module["_crypto_generichash_blake2b_keybytes_max"]=asm["_crypto_generichash_blake2b_keybytes_max"];var _crypto_box_beforenmbytes=Module["_crypto_box_beforenmbytes"]=asm["_crypto_box_beforenmbytes"];var ___udivmoddi4=Module["___udivmoddi4"]=asm["___udivmoddi4"];var _crypto_sign_ed25519_sk_to_curve25519=Module["_crypto_sign_ed25519_sk_to_curve25519"]=asm["_crypto_sign_ed25519_sk_to_curve25519"];var _crypto_stream_chacha20_ietf_xor_ic=Module["_crypto_stream_chacha20_ietf_xor_ic"]=asm["_crypto_stream_chacha20_ietf_xor_ic"];var _crypto_secretbox_xsalsa20poly1305_open=Module["_crypto_secretbox_xsalsa20poly1305_open"]=asm["_crypto_secretbox_xsalsa20poly1305_open"];var _crypto_box_zerobytes=Module["_crypto_box_zerobytes"]=asm["_crypto_box_zerobytes"];var _crypto_hash_sha512_bytes=Module["_crypto_hash_sha512_bytes"]=asm["_crypto_hash_sha512_bytes"];var _crypto_verify_32=Module["_crypto_verify_32"]=asm["_crypto_verify_32"];var _crypto_sign_ed25519_publickeybytes=Module["_crypto_sign_ed25519_publickeybytes"]=asm["_crypto_sign_ed25519_publickeybytes"];var _crypto_core_hsalsa20_keybytes=Module["_crypto_core_hsalsa20_keybytes"]=asm["_crypto_core_hsalsa20_keybytes"];var _crypto_sign_primitive=Module["_crypto_sign_primitive"]=asm["_crypto_sign_primitive"];var _crypto_scalarmult_curve25519_bytes=Module["_crypto_scalarmult_curve25519_bytes"]=asm["_crypto_scalarmult_curve25519_bytes"];var _crypto_scalarmult_curve25519_scalarbytes=Module["_crypto_scalarmult_curve25519_scalarbytes"]=asm["_crypto_scalarmult_curve25519_scalarbytes"];var _crypto_pwhash_scryptsalsa208sha256_saltbytes=Module["_crypto_pwhash_scryptsalsa208sha256_saltbytes"]=asm["_crypto_pwhash_scryptsalsa208sha256_saltbytes"];var _crypto_pwhash_argon2i_str_verify=Module["_crypto_pwhash_argon2i_str_verify"]=asm["_crypto_pwhash_argon2i_str_verify"];var _crypto_auth_hmacsha512_keygen=Module["_crypto_auth_hmacsha512_keygen"]=asm["_crypto_auth_hmacsha512_keygen"];var _crypto_box_detached_afternm=Module["_crypto_box_detached_afternm"]=asm["_crypto_box_detached_afternm"];var _crypto_stream_salsa20_xor_ic=Module["_crypto_stream_salsa20_xor_ic"]=asm["_crypto_stream_salsa20_xor_ic"];var _crypto_auth_hmacsha256_init=Module["_crypto_auth_hmacsha256_init"]=asm["_crypto_auth_hmacsha256_init"];var _crypto_stream_chacha20_ietf_xor=Module["_crypto_stream_chacha20_ietf_xor"]=asm["_crypto_stream_chacha20_ietf_xor"];var _crypto_auth_hmacsha512256_final=Module["_crypto_auth_hmacsha512256_final"]=asm["_crypto_auth_hmacsha512256_final"];var _sodium_library_version_major=Module["_sodium_library_version_major"]=asm["_sodium_library_version_major"];var _crypto_kdf_blake2b_derive_from_key=Module["_crypto_kdf_blake2b_derive_from_key"]=asm["_crypto_kdf_blake2b_derive_from_key"];var _crypto_box_curve25519xsalsa20poly1305_keypair=Module["_crypto_box_curve25519xsalsa20poly1305_keypair"]=asm["_crypto_box_curve25519xsalsa20poly1305_keypair"];var _crypto_hash_sha256_init=Module["_crypto_hash_sha256_init"]=asm["_crypto_hash_sha256_init"];var _crypto_stream_xsalsa20_noncebytes=Module["_crypto_stream_xsalsa20_noncebytes"]=asm["_crypto_stream_xsalsa20_noncebytes"];var _crypto_generichash_keybytes_max=Module["_crypto_generichash_keybytes_max"]=asm["_crypto_generichash_keybytes_max"];var _crypto_verify_64=Module["_crypto_verify_64"]=asm["_crypto_verify_64"];var _crypto_box_curve25519xsalsa20poly1305_open=Module["_crypto_box_curve25519xsalsa20poly1305_open"]=asm["_crypto_box_curve25519xsalsa20poly1305_open"];var _crypto_pwhash_memlimit_sensitive=Module["_crypto_pwhash_memlimit_sensitive"]=asm["_crypto_pwhash_memlimit_sensitive"];var _crypto_pwhash_argon2i_opslimit_interactive=Module["_crypto_pwhash_argon2i_opslimit_interactive"]=asm["_crypto_pwhash_argon2i_opslimit_interactive"];var _crypto_verify_16_bytes=Module["_crypto_verify_16_bytes"]=asm["_crypto_verify_16_bytes"];var _crypto_hash_sha512_update=Module["_crypto_hash_sha512_update"]=asm["_crypto_hash_sha512_update"];var _crypto_core_hchacha20=Module["_crypto_core_hchacha20"]=asm["_crypto_core_hchacha20"];var _crypto_pwhash_bytes_min=Module["_crypto_pwhash_bytes_min"]=asm["_crypto_pwhash_bytes_min"];var _crypto_secretbox_open=Module["_crypto_secretbox_open"]=asm["_crypto_secretbox_open"];var _crypto_auth_hmacsha256_final=Module["_crypto_auth_hmacsha256_final"]=asm["_crypto_auth_hmacsha256_final"];var _crypto_verify_16=Module["_crypto_verify_16"]=asm["_crypto_verify_16"];var _crypto_pwhash_scryptsalsa208sha256_memlimit_max=Module["_crypto_pwhash_scryptsalsa208sha256_memlimit_max"]=asm["_crypto_pwhash_scryptsalsa208sha256_memlimit_max"];var _crypto_pwhash_scryptsalsa208sha256_ll=Module["_crypto_pwhash_scryptsalsa208sha256_ll"]=asm["_crypto_pwhash_scryptsalsa208sha256_ll"];var _crypto_secretbox_xsalsa20poly1305_keygen=Module["_crypto_secretbox_xsalsa20poly1305_keygen"]=asm["_crypto_secretbox_xsalsa20poly1305_keygen"];var _crypto_secretbox_xsalsa20poly1305=Module["_crypto_secretbox_xsalsa20poly1305"]=asm["_crypto_secretbox_xsalsa20poly1305"];var _crypto_onetimeauth_poly1305_update=Module["_crypto_onetimeauth_poly1305_update"]=asm["_crypto_onetimeauth_poly1305_update"];var _crypto_pwhash_memlimit_max=Module["_crypto_pwhash_memlimit_max"]=asm["_crypto_pwhash_memlimit_max"];var _crypto_verify_64_bytes=Module["_crypto_verify_64_bytes"]=asm["_crypto_verify_64_bytes"];var _crypto_onetimeauth_poly1305_keygen=Module["_crypto_onetimeauth_poly1305_keygen"]=asm["_crypto_onetimeauth_poly1305_keygen"];var _crypto_generichash_blake2b_keygen=Module["_crypto_generichash_blake2b_keygen"]=asm["_crypto_generichash_blake2b_keygen"];var _crypto_pwhash_argon2i_strprefix=Module["_crypto_pwhash_argon2i_strprefix"]=asm["_crypto_pwhash_argon2i_strprefix"];var _crypto_auth_hmacsha256_update=Module["_crypto_auth_hmacsha256_update"]=asm["_crypto_auth_hmacsha256_update"];var _crypto_aead_xchacha20poly1305_ietf_encrypt=Module["_crypto_aead_xchacha20poly1305_ietf_encrypt"]=asm["_crypto_aead_xchacha20poly1305_ietf_encrypt"];var _crypto_pwhash_scryptsalsa208sha256_strbytes=Module["_crypto_pwhash_scryptsalsa208sha256_strbytes"]=asm["_crypto_pwhash_scryptsalsa208sha256_strbytes"];var _crypto_stream_xsalsa20_keybytes=Module["_crypto_stream_xsalsa20_keybytes"]=asm["_crypto_stream_xsalsa20_keybytes"];var _crypto_generichash_keygen=Module["_crypto_generichash_keygen"]=asm["_crypto_generichash_keygen"];var _crypto_pwhash_argon2i_str=Module["_crypto_pwhash_argon2i_str"]=asm["_crypto_pwhash_argon2i_str"];var _crypto_box_sealbytes=Module["_crypto_box_sealbytes"]=asm["_crypto_box_sealbytes"];var _crypto_onetimeauth=Module["_crypto_onetimeauth"]=asm["_crypto_onetimeauth"];var _crypto_secretbox_boxzerobytes=Module["_crypto_secretbox_boxzerobytes"]=asm["_crypto_secretbox_boxzerobytes"];var _crypto_aead_chacha20poly1305_ietf_keygen=Module["_crypto_aead_chacha20poly1305_ietf_keygen"]=asm["_crypto_aead_chacha20poly1305_ietf_keygen"];var _crypto_stream_chacha20=Module["_crypto_stream_chacha20"]=asm["_crypto_stream_chacha20"];var _crypto_box_open_afternm=Module["_crypto_box_open_afternm"]=asm["_crypto_box_open_afternm"];var _crypto_pwhash_opslimit_moderate=Module["_crypto_pwhash_opslimit_moderate"]=asm["_crypto_pwhash_opslimit_moderate"];var _crypto_box_macbytes=Module["_crypto_box_macbytes"]=asm["_crypto_box_macbytes"];var _crypto_shorthash_bytes=Module["_crypto_shorthash_bytes"]=asm["_crypto_shorthash_bytes"];var _crypto_generichash_primitive=Module["_crypto_generichash_primitive"]=asm["_crypto_generichash_primitive"];var _crypto_sign_ed25519_keypair=Module["_crypto_sign_ed25519_keypair"]=asm["_crypto_sign_ed25519_keypair"];var _crypto_aead_xchacha20poly1305_ietf_keybytes=Module["_crypto_aead_xchacha20poly1305_ietf_keybytes"]=asm["_crypto_aead_xchacha20poly1305_ietf_keybytes"];var _crypto_auth_primitive=Module["_crypto_auth_primitive"]=asm["_crypto_auth_primitive"];var _malloc=Module["_malloc"]=asm["_malloc"];var _crypto_stream_noncebytes=Module["_crypto_stream_noncebytes"]=asm["_crypto_stream_noncebytes"];var _crypto_pwhash_memlimit_interactive=Module["_crypto_pwhash_memlimit_interactive"]=asm["_crypto_pwhash_memlimit_interactive"];var _crypto_secretbox_xsalsa20poly1305_keybytes=Module["_crypto_secretbox_xsalsa20poly1305_keybytes"]=asm["_crypto_secretbox_xsalsa20poly1305_keybytes"];var _crypto_pwhash_saltbytes=Module["_crypto_pwhash_saltbytes"]=asm["_crypto_pwhash_saltbytes"];var _crypto_secretbox_noncebytes=Module["_crypto_secretbox_noncebytes"]=asm["_crypto_secretbox_noncebytes"];var _crypto_secretbox_xsalsa20poly1305_macbytes=Module["_crypto_secretbox_xsalsa20poly1305_macbytes"]=asm["_crypto_secretbox_xsalsa20poly1305_macbytes"];var _crypto_pwhash_argon2i_opslimit_max=Module["_crypto_pwhash_argon2i_opslimit_max"]=asm["_crypto_pwhash_argon2i_opslimit_max"];var _crypto_auth_hmacsha512_bytes=Module["_crypto_auth_hmacsha512_bytes"]=asm["_crypto_auth_hmacsha512_bytes"];var _crypto_generichash_keybytes=Module["_crypto_generichash_keybytes"]=asm["_crypto_generichash_keybytes"];var _crypto_sign_publickeybytes=Module["_crypto_sign_publickeybytes"]=asm["_crypto_sign_publickeybytes"];var _crypto_pwhash_argon2i_memlimit_moderate=Module["_crypto_pwhash_argon2i_memlimit_moderate"]=asm["_crypto_pwhash_argon2i_memlimit_moderate"];var _crypto_generichash_blake2b=Module["_crypto_generichash_blake2b"]=asm["_crypto_generichash_blake2b"];var _crypto_core_hchacha20_keybytes=Module["_crypto_core_hchacha20_keybytes"]=asm["_crypto_core_hchacha20_keybytes"];var ___uremdi3=Module["___uremdi3"]=asm["___uremdi3"];var _crypto_pwhash_argon2i_opslimit_moderate=Module["_crypto_pwhash_argon2i_opslimit_moderate"]=asm["_crypto_pwhash_argon2i_opslimit_moderate"];var _randombytes_implementation_name=Module["_randombytes_implementation_name"]=asm["_randombytes_implementation_name"];var _crypto_sign_ed25519_verify_detached=Module["_crypto_sign_ed25519_verify_detached"]=asm["_crypto_sign_ed25519_verify_detached"];var _crypto_hash_sha512_statebytes=Module["_crypto_hash_sha512_statebytes"]=asm["_crypto_hash_sha512_statebytes"];var _crypto_secretbox_zerobytes=Module["_crypto_secretbox_zerobytes"]=asm["_crypto_secretbox_zerobytes"];var _crypto_verify_32_bytes=Module["_crypto_verify_32_bytes"]=asm["_crypto_verify_32_bytes"];var _crypto_kdf_keygen=Module["_crypto_kdf_keygen"]=asm["_crypto_kdf_keygen"];var _crypto_stream_xsalsa20_xor=Module["_crypto_stream_xsalsa20_xor"]=asm["_crypto_stream_xsalsa20_xor"];var _crypto_stream_chacha20_ietf_keygen=Module["_crypto_stream_chacha20_ietf_keygen"]=asm["_crypto_stream_chacha20_ietf_keygen"];var _crypto_stream_chacha20_keygen=Module["_crypto_stream_chacha20_keygen"]=asm["_crypto_stream_chacha20_keygen"];var _crypto_box_easy=Module["_crypto_box_easy"]=asm["_crypto_box_easy"];var _crypto_hash_sha256=Module["_crypto_hash_sha256"]=asm["_crypto_hash_sha256"];var _crypto_sign_ed25519_seedbytes=Module["_crypto_sign_ed25519_seedbytes"]=asm["_crypto_sign_ed25519_seedbytes"];var _crypto_pwhash_alg_argon2i13=Module["_crypto_pwhash_alg_argon2i13"]=asm["_crypto_pwhash_alg_argon2i13"];var _crypto_pwhash_scryptsalsa208sha256_memlimit_min=Module["_crypto_pwhash_scryptsalsa208sha256_memlimit_min"]=asm["_crypto_pwhash_scryptsalsa208sha256_memlimit_min"];var _crypto_pwhash_opslimit_min=Module["_crypto_pwhash_opslimit_min"]=asm["_crypto_pwhash_opslimit_min"];var _crypto_box_curve25519xsalsa20poly1305_publickeybytes=Module["_crypto_box_curve25519xsalsa20poly1305_publickeybytes"]=asm["_crypto_box_curve25519xsalsa20poly1305_publickeybytes"];var _crypto_kdf_blake2b_bytes_max=Module["_crypto_kdf_blake2b_bytes_max"]=asm["_crypto_kdf_blake2b_bytes_max"];var _crypto_generichash_bytes_max=Module["_crypto_generichash_bytes_max"]=asm["_crypto_generichash_bytes_max"];var _crypto_stream_chacha20_ietf_noncebytes=Module["_crypto_stream_chacha20_ietf_noncebytes"]=asm["_crypto_stream_chacha20_ietf_noncebytes"];var _crypto_pwhash_scryptsalsa208sha256_memlimit_sensitive=Module["_crypto_pwhash_scryptsalsa208sha256_memlimit_sensitive"]=asm["_crypto_pwhash_scryptsalsa208sha256_memlimit_sensitive"];var _crypto_box_beforenm=Module["_crypto_box_beforenm"]=asm["_crypto_box_beforenm"];var _crypto_box_curve25519xsalsa20poly1305_afternm=Module["_crypto_box_curve25519xsalsa20poly1305_afternm"]=asm["_crypto_box_curve25519xsalsa20poly1305_afternm"];var _crypto_sign_open=Module["_crypto_sign_open"]=asm["_crypto_sign_open"];var _crypto_box_seed_keypair=Module["_crypto_box_seed_keypair"]=asm["_crypto_box_seed_keypair"];var _crypto_auth_hmacsha512_init=Module["_crypto_auth_hmacsha512_init"]=asm["_crypto_auth_hmacsha512_init"];var _crypto_sign_ed25519_sk_to_pk=Module["_crypto_sign_ed25519_sk_to_pk"]=asm["_crypto_sign_ed25519_sk_to_pk"];var _crypto_scalarmult_curve25519=Module["_crypto_scalarmult_curve25519"]=asm["_crypto_scalarmult_curve25519"];var _crypto_box_open_easy=Module["_crypto_box_open_easy"]=asm["_crypto_box_open_easy"];var _crypto_auth_hmacsha512=Module["_crypto_auth_hmacsha512"]=asm["_crypto_auth_hmacsha512"];var _crypto_stream_keygen=Module["_crypto_stream_keygen"]=asm["_crypto_stream_keygen"];var _crypto_auth_hmacsha512256_keybytes=Module["_crypto_auth_hmacsha512256_keybytes"]=asm["_crypto_auth_hmacsha512256_keybytes"];var _crypto_aead_chacha20poly1305_keybytes=Module["_crypto_aead_chacha20poly1305_keybytes"]=asm["_crypto_aead_chacha20poly1305_keybytes"];var _free=Module["_free"]=asm["_free"];var _crypto_onetimeauth_poly1305_keybytes=Module["_crypto_onetimeauth_poly1305_keybytes"]=asm["_crypto_onetimeauth_poly1305_keybytes"];var _crypto_sign_ed25519_secretkeybytes=Module["_crypto_sign_ed25519_secretkeybytes"]=asm["_crypto_sign_ed25519_secretkeybytes"];var _crypto_kdf_blake2b_contextbytes=Module["_crypto_kdf_blake2b_contextbytes"]=asm["_crypto_kdf_blake2b_contextbytes"];var _crypto_sign_seedbytes=Module["_crypto_sign_seedbytes"]=asm["_crypto_sign_seedbytes"];var _randombytes_random=Module["_randombytes_random"]=asm["_randombytes_random"];var _crypto_auth_hmacsha256_keygen=Module["_crypto_auth_hmacsha256_keygen"]=asm["_crypto_auth_hmacsha256_keygen"];var _crypto_auth_hmacsha256_statebytes=Module["_crypto_auth_hmacsha256_statebytes"]=asm["_crypto_auth_hmacsha256_statebytes"];var _randombytes_buf_deterministic=Module["_randombytes_buf_deterministic"]=asm["_randombytes_buf_deterministic"];var _crypto_aead_chacha20poly1305_encrypt_detached=Module["_crypto_aead_chacha20poly1305_encrypt_detached"]=asm["_crypto_aead_chacha20poly1305_encrypt_detached"];var _crypto_stream_xsalsa20_keygen=Module["_crypto_stream_xsalsa20_keygen"]=asm["_crypto_stream_xsalsa20_keygen"];var _crypto_hash_primitive=Module["_crypto_hash_primitive"]=asm["_crypto_hash_primitive"];var _crypto_sign_ed25519_pk_to_curve25519=Module["_crypto_sign_ed25519_pk_to_curve25519"]=asm["_crypto_sign_ed25519_pk_to_curve25519"];var _crypto_shorthash_siphash24=Module["_crypto_shorthash_siphash24"]=asm["_crypto_shorthash_siphash24"];var _crypto_box_curve25519xsalsa20poly1305_macbytes=Module["_crypto_box_curve25519xsalsa20poly1305_macbytes"]=asm["_crypto_box_curve25519xsalsa20poly1305_macbytes"];var _crypto_sign_ed25519_bytes=Module["_crypto_sign_ed25519_bytes"]=asm["_crypto_sign_ed25519_bytes"];var _crypto_sign_ed25519=Module["_crypto_sign_ed25519"]=asm["_crypto_sign_ed25519"];var _crypto_core_salsa20_constbytes=Module["_crypto_core_salsa20_constbytes"]=asm["_crypto_core_salsa20_constbytes"];var _crypto_secretbox_primitive=Module["_crypto_secretbox_primitive"]=asm["_crypto_secretbox_primitive"];var _crypto_box_boxzerobytes=Module["_crypto_box_boxzerobytes"]=asm["_crypto_box_boxzerobytes"];var _crypto_pwhash_argon2i_saltbytes=Module["_crypto_pwhash_argon2i_saltbytes"]=asm["_crypto_pwhash_argon2i_saltbytes"];var _crypto_box_curve25519xsalsa20poly1305_beforenmbytes=Module["_crypto_box_curve25519xsalsa20poly1305_beforenmbytes"]=asm["_crypto_box_curve25519xsalsa20poly1305_beforenmbytes"];var _crypto_core_hchacha20_constbytes=Module["_crypto_core_hchacha20_constbytes"]=asm["_crypto_core_hchacha20_constbytes"];var _randombytes_seedbytes=Module["_randombytes_seedbytes"]=asm["_randombytes_seedbytes"];var _crypto_box_detached=Module["_crypto_box_detached"]=asm["_crypto_box_detached"];var _randombytes_buf=Module["_randombytes_buf"]=asm["_randombytes_buf"];var _crypto_generichash_blake2b_saltbytes=Module["_crypto_generichash_blake2b_saltbytes"]=asm["_crypto_generichash_blake2b_saltbytes"];var _crypto_box_open_detached=Module["_crypto_box_open_detached"]=asm["_crypto_box_open_detached"];var _crypto_stream_chacha20_noncebytes=Module["_crypto_stream_chacha20_noncebytes"]=asm["_crypto_stream_chacha20_noncebytes"];var _crypto_secretbox_xsalsa20poly1305_zerobytes=Module["_crypto_secretbox_xsalsa20poly1305_zerobytes"]=asm["_crypto_secretbox_xsalsa20poly1305_zerobytes"];var _crypto_generichash_blake2b_keybytes=Module["_crypto_generichash_blake2b_keybytes"]=asm["_crypto_generichash_blake2b_keybytes"];var _crypto_pwhash_argon2i_bytes_min=Module["_crypto_pwhash_argon2i_bytes_min"]=asm["_crypto_pwhash_argon2i_bytes_min"];var _crypto_pwhash_scryptsalsa208sha256_str=Module["_crypto_pwhash_scryptsalsa208sha256_str"]=asm["_crypto_pwhash_scryptsalsa208sha256_str"];var _crypto_hash=Module["_crypto_hash"]=asm["_crypto_hash"];var _i64Subtract=Module["_i64Subtract"]=asm["_i64Subtract"];var _crypto_box_seedbytes=Module["_crypto_box_seedbytes"]=asm["_crypto_box_seedbytes"];var _crypto_generichash_blake2b_bytes_min=Module["_crypto_generichash_blake2b_bytes_min"]=asm["_crypto_generichash_blake2b_bytes_min"];var _crypto_box_curve25519xsalsa20poly1305=Module["_crypto_box_curve25519xsalsa20poly1305"]=asm["_crypto_box_curve25519xsalsa20poly1305"];var _crypto_generichash_blake2b_statebytes=Module["_crypto_generichash_blake2b_statebytes"]=asm["_crypto_generichash_blake2b_statebytes"];var _crypto_aead_chacha20poly1305_ietf_decrypt_detached=Module["_crypto_aead_chacha20poly1305_ietf_decrypt_detached"]=asm["_crypto_aead_chacha20poly1305_ietf_decrypt_detached"];var _crypto_auth_hmacsha512256_bytes=Module["_crypto_auth_hmacsha512256_bytes"]=asm["_crypto_auth_hmacsha512256_bytes"];var _crypto_auth_hmacsha512_update=Module["_crypto_auth_hmacsha512_update"]=asm["_crypto_auth_hmacsha512_update"];var _crypto_auth_hmacsha256=Module["_crypto_auth_hmacsha256"]=asm["_crypto_auth_hmacsha256"];var _crypto_box_keypair=Module["_crypto_box_keypair"]=asm["_crypto_box_keypair"];var _crypto_hash_sha256_bytes=Module["_crypto_hash_sha256_bytes"]=asm["_crypto_hash_sha256_bytes"];var ___udivdi3=Module["___udivdi3"]=asm["___udivdi3"];var _crypto_pwhash_argon2i_passwd_max=Module["_crypto_pwhash_argon2i_passwd_max"]=asm["_crypto_pwhash_argon2i_passwd_max"];var _sodium_init=Module["_sodium_init"]=asm["_sodium_init"];var _crypto_secretbox_macbytes=Module["_crypto_secretbox_macbytes"]=asm["_crypto_secretbox_macbytes"];var _crypto_aead_xchacha20poly1305_ietf_npubbytes=Module["_crypto_aead_xchacha20poly1305_ietf_npubbytes"]=asm["_crypto_aead_xchacha20poly1305_ietf_npubbytes"];var _bitshift64Shl=Module["_bitshift64Shl"]=asm["_bitshift64Shl"];var _crypto_pwhash_argon2i_opslimit_min=Module["_crypto_pwhash_argon2i_opslimit_min"]=asm["_crypto_pwhash_argon2i_opslimit_min"];var _crypto_shorthash_siphash24_keybytes=Module["_crypto_shorthash_siphash24_keybytes"]=asm["_crypto_shorthash_siphash24_keybytes"];var _crypto_core_hchacha20_inputbytes=Module["_crypto_core_hchacha20_inputbytes"]=asm["_crypto_core_hchacha20_inputbytes"];var ___muldi3=Module["___muldi3"]=asm["___muldi3"];var _crypto_aead_chacha20poly1305_nsecbytes=Module["_crypto_aead_chacha20poly1305_nsecbytes"]=asm["_crypto_aead_chacha20poly1305_nsecbytes"];var _crypto_aead_xchacha20poly1305_ietf_nsecbytes=Module["_crypto_aead_xchacha20poly1305_ietf_nsecbytes"]=asm["_crypto_aead_xchacha20poly1305_ietf_nsecbytes"];var _crypto_pwhash_argon2i_strbytes=Module["_crypto_pwhash_argon2i_strbytes"]=asm["_crypto_pwhash_argon2i_strbytes"];var _crypto_pwhash_argon2i_memlimit_max=Module["_crypto_pwhash_argon2i_memlimit_max"]=asm["_crypto_pwhash_argon2i_memlimit_max"];var _crypto_generichash_blake2b_salt_personal=Module["_crypto_generichash_blake2b_salt_personal"]=asm["_crypto_generichash_blake2b_salt_personal"];var _crypto_kdf_derive_from_key=Module["_crypto_kdf_derive_from_key"]=asm["_crypto_kdf_derive_from_key"];var _crypto_secretbox_xsalsa20poly1305_noncebytes=Module["_crypto_secretbox_xsalsa20poly1305_noncebytes"]=asm["_crypto_secretbox_xsalsa20poly1305_noncebytes"];var _crypto_pwhash_scryptsalsa208sha256_opslimit_interactive=Module["_crypto_pwhash_scryptsalsa208sha256_opslimit_interactive"]=asm["_crypto_pwhash_scryptsalsa208sha256_opslimit_interactive"];var _crypto_pwhash_argon2i_memlimit_interactive=Module["_crypto_pwhash_argon2i_memlimit_interactive"]=asm["_crypto_pwhash_argon2i_memlimit_interactive"];var _crypto_hash_sha256_final=Module["_crypto_hash_sha256_final"]=asm["_crypto_hash_sha256_final"];var _crypto_stream_keybytes=Module["_crypto_stream_keybytes"]=asm["_crypto_stream_keybytes"];var _crypto_pwhash_memlimit_min=Module["_crypto_pwhash_memlimit_min"]=asm["_crypto_pwhash_memlimit_min"];var _crypto_aead_chacha20poly1305_ietf_npubbytes=Module["_crypto_aead_chacha20poly1305_ietf_npubbytes"]=asm["_crypto_aead_chacha20poly1305_ietf_npubbytes"];var _sodium_library_version_minor=Module["_sodium_library_version_minor"]=asm["_sodium_library_version_minor"];var _crypto_onetimeauth_bytes=Module["_crypto_onetimeauth_bytes"]=asm["_crypto_onetimeauth_bytes"];var _sodium_version_string=Module["_sodium_version_string"]=asm["_sodium_version_string"];var _crypto_box_open=Module["_crypto_box_open"]=asm["_crypto_box_open"];var _crypto_scalarmult_curve25519_base=Module["_crypto_scalarmult_curve25519_base"]=asm["_crypto_scalarmult_curve25519_base"];var _crypto_sign_ed25519_open=Module["_crypto_sign_ed25519_open"]=asm["_crypto_sign_ed25519_open"];var _crypto_stream_chacha20_ietf_keybytes=Module["_crypto_stream_chacha20_ietf_keybytes"]=asm["_crypto_stream_chacha20_ietf_keybytes"];var _crypto_box_noncebytes=Module["_crypto_box_noncebytes"]=asm["_crypto_box_noncebytes"];var _crypto_core_hchacha20_outputbytes=Module["_crypto_core_hchacha20_outputbytes"]=asm["_crypto_core_hchacha20_outputbytes"];var _bitshift64Ashr=Module["_bitshift64Ashr"]=asm["_bitshift64Ashr"];var _crypto_onetimeauth_keygen=Module["_crypto_onetimeauth_keygen"]=asm["_crypto_onetimeauth_keygen"];var _crypto_pwhash_strbytes=Module["_crypto_pwhash_strbytes"]=asm["_crypto_pwhash_strbytes"];var _crypto_auth_hmacsha512256_update=Module["_crypto_auth_hmacsha512256_update"]=asm["_crypto_auth_hmacsha512256_update"];var _crypto_onetimeauth_poly1305=Module["_crypto_onetimeauth_poly1305"]=asm["_crypto_onetimeauth_poly1305"];var _crypto_kdf_bytes_min=Module["_crypto_kdf_bytes_min"]=asm["_crypto_kdf_bytes_min"];var _crypto_sign_ed25519_sk_to_seed=Module["_crypto_sign_ed25519_sk_to_seed"]=asm["_crypto_sign_ed25519_sk_to_seed"];var _crypto_pwhash_scryptsalsa208sha256_memlimit_interactive=Module["_crypto_pwhash_scryptsalsa208sha256_memlimit_interactive"]=asm["_crypto_pwhash_scryptsalsa208sha256_memlimit_interactive"];var _crypto_stream_xsalsa20=Module["_crypto_stream_xsalsa20"]=asm["_crypto_stream_xsalsa20"];var _crypto_box_open_easy_afternm=Module["_crypto_box_open_easy_afternm"]=asm["_crypto_box_open_easy_afternm"];var _crypto_box_curve25519xsalsa20poly1305_seedbytes=Module["_crypto_box_curve25519xsalsa20poly1305_seedbytes"]=asm["_crypto_box_curve25519xsalsa20poly1305_seedbytes"];var _crypto_stream_salsa20_keybytes=Module["_crypto_stream_salsa20_keybytes"]=asm["_crypto_stream_salsa20_keybytes"];var _crypto_kdf_primitive=Module["_crypto_kdf_primitive"]=asm["_crypto_kdf_primitive"];var _crypto_shorthash=Module["_crypto_shorthash"]=asm["_crypto_shorthash"];var _crypto_auth_keybytes=Module["_crypto_auth_keybytes"]=asm["_crypto_auth_keybytes"];var _crypto_box_curve25519xsalsa20poly1305_open_afternm=Module["_crypto_box_curve25519xsalsa20poly1305_open_afternm"]=asm["_crypto_box_curve25519xsalsa20poly1305_open_afternm"];var _crypto_aead_chacha20poly1305_npubbytes=Module["_crypto_aead_chacha20poly1305_npubbytes"]=asm["_crypto_aead_chacha20poly1305_npubbytes"];var _crypto_aead_xchacha20poly1305_ietf_abytes=Module["_crypto_aead_xchacha20poly1305_ietf_abytes"]=asm["_crypto_aead_xchacha20poly1305_ietf_abytes"];var _crypto_onetimeauth_poly1305_final=Module["_crypto_onetimeauth_poly1305_final"]=asm["_crypto_onetimeauth_poly1305_final"];var _crypto_onetimeauth_poly1305_bytes=Module["_crypto_onetimeauth_poly1305_bytes"]=asm["_crypto_onetimeauth_poly1305_bytes"];var _crypto_box_curve25519xsalsa20poly1305_seed_keypair=Module["_crypto_box_curve25519xsalsa20poly1305_seed_keypair"]=asm["_crypto_box_curve25519xsalsa20poly1305_seed_keypair"];var _crypto_box_primitive=Module["_crypto_box_primitive"]=asm["_crypto_box_primitive"];var _crypto_pwhash_str=Module["_crypto_pwhash_str"]=asm["_crypto_pwhash_str"];var _crypto_auth_hmacsha512_keybytes=Module["_crypto_auth_hmacsha512_keybytes"]=asm["_crypto_auth_hmacsha512_keybytes"];var _crypto_auth=Module["_crypto_auth"]=asm["_crypto_auth"];var _crypto_pwhash_scryptsalsa208sha256_bytes_min=Module["_crypto_pwhash_scryptsalsa208sha256_bytes_min"]=asm["_crypto_pwhash_scryptsalsa208sha256_bytes_min"];var _crypto_core_salsa20_keybytes=Module["_crypto_core_salsa20_keybytes"]=asm["_crypto_core_salsa20_keybytes"];var _crypto_box_afternm=Module["_crypto_box_afternm"]=asm["_crypto_box_afternm"];var _crypto_onetimeauth_primitive=Module["_crypto_onetimeauth_primitive"]=asm["_crypto_onetimeauth_primitive"];var _crypto_pwhash_scryptsalsa208sha256_str_verify=Module["_crypto_pwhash_scryptsalsa208sha256_str_verify"]=asm["_crypto_pwhash_scryptsalsa208sha256_str_verify"];var _crypto_kdf_blake2b_keybytes=Module["_crypto_kdf_blake2b_keybytes"]=asm["_crypto_kdf_blake2b_keybytes"];var _crypto_pwhash_scryptsalsa208sha256_passwd_min=Module["_crypto_pwhash_scryptsalsa208sha256_passwd_min"]=asm["_crypto_pwhash_scryptsalsa208sha256_passwd_min"];var _crypto_stream_chacha20_ietf=Module["_crypto_stream_chacha20_ietf"]=asm["_crypto_stream_chacha20_ietf"];var _crypto_generichash=Module["_crypto_generichash"]=asm["_crypto_generichash"];var _crypto_core_hsalsa20_outputbytes=Module["_crypto_core_hsalsa20_outputbytes"]=asm["_crypto_core_hsalsa20_outputbytes"];var _crypto_pwhash_opslimit_interactive=Module["_crypto_pwhash_opslimit_interactive"]=asm["_crypto_pwhash_opslimit_interactive"];var _crypto_box_curve25519xsalsa20poly1305_noncebytes=Module["_crypto_box_curve25519xsalsa20poly1305_noncebytes"]=asm["_crypto_box_curve25519xsalsa20poly1305_noncebytes"];var _crypto_aead_chacha20poly1305_ietf_decrypt=Module["_crypto_aead_chacha20poly1305_ietf_decrypt"]=asm["_crypto_aead_chacha20poly1305_ietf_decrypt"];var _crypto_auth_hmacsha512256_init=Module["_crypto_auth_hmacsha512256_init"]=asm["_crypto_auth_hmacsha512256_init"];var _crypto_onetimeauth_poly1305_verify=Module["_crypto_onetimeauth_poly1305_verify"]=asm["_crypto_onetimeauth_poly1305_verify"];var _crypto_auth_hmacsha512_final=Module["_crypto_auth_hmacsha512_final"]=asm["_crypto_auth_hmacsha512_final"];var _crypto_auth_hmacsha512256_verify=Module["_crypto_auth_hmacsha512256_verify"]=asm["_crypto_auth_hmacsha512256_verify"];var _crypto_box_secretkeybytes=Module["_crypto_box_secretkeybytes"]=asm["_crypto_box_secretkeybytes"];var _crypto_onetimeauth_update=Module["_crypto_onetimeauth_update"]=asm["_crypto_onetimeauth_update"];var _crypto_core_salsa20=Module["_crypto_core_salsa20"]=asm["_crypto_core_salsa20"];var _crypto_aead_chacha20poly1305_abytes=Module["_crypto_aead_chacha20poly1305_abytes"]=asm["_crypto_aead_chacha20poly1305_abytes"];var _crypto_scalarmult_bytes=Module["_crypto_scalarmult_bytes"]=asm["_crypto_scalarmult_bytes"];var _crypto_secretbox_detached=Module["_crypto_secretbox_detached"]=asm["_crypto_secretbox_detached"];var _crypto_stream_xor=Module["_crypto_stream_xor"]=asm["_crypto_stream_xor"];var _crypto_secretbox_easy=Module["_crypto_secretbox_easy"]=asm["_crypto_secretbox_easy"];var _crypto_aead_xchacha20poly1305_ietf_decrypt_detached=Module["_crypto_aead_xchacha20poly1305_ietf_decrypt_detached"]=asm["_crypto_aead_xchacha20poly1305_ietf_decrypt_detached"];var _crypto_stream_salsa20=Module["_crypto_stream_salsa20"]=asm["_crypto_stream_salsa20"];var _sodium_bin2hex=Module["_sodium_bin2hex"]=asm["_sodium_bin2hex"];var _crypto_auth_hmacsha512_statebytes=Module["_crypto_auth_hmacsha512_statebytes"]=asm["_crypto_auth_hmacsha512_statebytes"];var _crypto_pwhash=Module["_crypto_pwhash"]=asm["_crypto_pwhash"];var _crypto_generichash_blake2b_bytes_max=Module["_crypto_generichash_blake2b_bytes_max"]=asm["_crypto_generichash_blake2b_bytes_max"];var _crypto_hash_sha256_update=Module["_crypto_hash_sha256_update"]=asm["_crypto_hash_sha256_update"];var _crypto_core_hsalsa20_constbytes=Module["_crypto_core_hsalsa20_constbytes"]=asm["_crypto_core_hsalsa20_constbytes"];var _crypto_box_easy_afternm=Module["_crypto_box_easy_afternm"]=asm["_crypto_box_easy_afternm"];var _crypto_pwhash_memlimit_moderate=Module["_crypto_pwhash_memlimit_moderate"]=asm["_crypto_pwhash_memlimit_moderate"];var _crypto_core_salsa20_inputbytes=Module["_crypto_core_salsa20_inputbytes"]=asm["_crypto_core_salsa20_inputbytes"];var _crypto_box_publickeybytes=Module["_crypto_box_publickeybytes"]=asm["_crypto_box_publickeybytes"];var _crypto_sign_secretkeybytes=Module["_crypto_sign_secretkeybytes"]=asm["_crypto_sign_secretkeybytes"];var ___muldsi3=Module["___muldsi3"]=asm["___muldsi3"];var _crypto_scalarmult_scalarbytes=Module["_crypto_scalarmult_scalarbytes"]=asm["_crypto_scalarmult_scalarbytes"];var _crypto_stream_xsalsa20_xor_ic=Module["_crypto_stream_xsalsa20_xor_ic"]=asm["_crypto_stream_xsalsa20_xor_ic"];var _crypto_aead_chacha20poly1305_decrypt=Module["_crypto_aead_chacha20poly1305_decrypt"]=asm["_crypto_aead_chacha20poly1305_decrypt"];var _crypto_sign=Module["_crypto_sign"]=asm["_crypto_sign"];var _crypto_pwhash_passwd_max=Module["_crypto_pwhash_passwd_max"]=asm["_crypto_pwhash_passwd_max"];var _crypto_pwhash_scryptsalsa208sha256_opslimit_min=Module["_crypto_pwhash_scryptsalsa208sha256_opslimit_min"]=asm["_crypto_pwhash_scryptsalsa208sha256_opslimit_min"];var _sodium_hex2bin=Module["_sodium_hex2bin"]=asm["_sodium_hex2bin"];var _crypto_pwhash_argon2i_alg_argon2i13=Module["_crypto_pwhash_argon2i_alg_argon2i13"]=asm["_crypto_pwhash_argon2i_alg_argon2i13"];var _crypto_secretbox_keybytes=Module["_crypto_secretbox_keybytes"]=asm["_crypto_secretbox_keybytes"];var _randombytes=Module["_randombytes"]=asm["_randombytes"];var _crypto_hash_bytes=Module["_crypto_hash_bytes"]=asm["_crypto_hash_bytes"];var _crypto_stream_salsa20_keygen=Module["_crypto_stream_salsa20_keygen"]=asm["_crypto_stream_salsa20_keygen"];var _crypto_hash_sha256_statebytes=Module["_crypto_hash_sha256_statebytes"]=asm["_crypto_hash_sha256_statebytes"];var _crypto_pwhash_argon2i_passwd_min=Module["_crypto_pwhash_argon2i_passwd_min"]=asm["_crypto_pwhash_argon2i_passwd_min"];var _crypto_pwhash_opslimit_sensitive=Module["_crypto_pwhash_opslimit_sensitive"]=asm["_crypto_pwhash_opslimit_sensitive"];var _crypto_generichash_blake2b_personalbytes=Module["_crypto_generichash_blake2b_personalbytes"]=asm["_crypto_generichash_blake2b_personalbytes"];var _crypto_stream_chacha20_xor_ic=Module["_crypto_stream_chacha20_xor_ic"]=asm["_crypto_stream_chacha20_xor_ic"];var _crypto_sign_verify_detached=Module["_crypto_sign_verify_detached"]=asm["_crypto_sign_verify_detached"];var _crypto_onetimeauth_verify=Module["_crypto_onetimeauth_verify"]=asm["_crypto_onetimeauth_verify"];var _crypto_sign_ed25519_detached=Module["_crypto_sign_ed25519_detached"]=asm["_crypto_sign_ed25519_detached"];var _crypto_generichash_init=Module["_crypto_generichash_init"]=asm["_crypto_generichash_init"];var _i64Add=Module["_i64Add"]=asm["_i64Add"];var _crypto_sign_bytes=Module["_crypto_sign_bytes"]=asm["_crypto_sign_bytes"];var _crypto_generichash_update=Module["_crypto_generichash_update"]=asm["_crypto_generichash_update"];var _crypto_scalarmult=Module["_crypto_scalarmult"]=asm["_crypto_scalarmult"];var _crypto_aead_chacha20poly1305_ietf_abytes=Module["_crypto_aead_chacha20poly1305_ietf_abytes"]=asm["_crypto_aead_chacha20poly1305_ietf_abytes"];var _crypto_sign_detached=Module["_crypto_sign_detached"]=asm["_crypto_sign_detached"];var _crypto_generichash_blake2b_update=Module["_crypto_generichash_blake2b_update"]=asm["_crypto_generichash_blake2b_update"];var _crypto_box_curve25519xsalsa20poly1305_beforenm=Module["_crypto_box_curve25519xsalsa20poly1305_beforenm"]=asm["_crypto_box_curve25519xsalsa20poly1305_beforenm"];var _crypto_generichash_blake2b_bytes=Module["_crypto_generichash_blake2b_bytes"]=asm["_crypto_generichash_blake2b_bytes"];var _crypto_generichash_final=Module["_crypto_generichash_final"]=asm["_crypto_generichash_final"];var _randombytes_uniform=Module["_randombytes_uniform"]=asm["_randombytes_uniform"];var _crypto_sign_seed_keypair=Module["_crypto_sign_seed_keypair"]=asm["_crypto_sign_seed_keypair"];var _crypto_shorthash_keygen=Module["_crypto_shorthash_keygen"]=asm["_crypto_shorthash_keygen"];var _crypto_onetimeauth_init=Module["_crypto_onetimeauth_init"]=asm["_crypto_onetimeauth_init"];var _crypto_generichash_bytes=Module["_crypto_generichash_bytes"]=asm["_crypto_generichash_bytes"];var _crypto_stream_salsa20_xor=Module["_crypto_stream_salsa20_xor"]=asm["_crypto_stream_salsa20_xor"];var _crypto_auth_hmacsha512_verify=Module["_crypto_auth_hmacsha512_verify"]=asm["_crypto_auth_hmacsha512_verify"];var _crypto_generichash_blake2b_keybytes_min=Module["_crypto_generichash_blake2b_keybytes_min"]=asm["_crypto_generichash_blake2b_keybytes_min"];var _bitshift64Lshr=Module["_bitshift64Lshr"]=asm["_bitshift64Lshr"];var _crypto_pwhash_bytes_max=Module["_crypto_pwhash_bytes_max"]=asm["_crypto_pwhash_bytes_max"];var _crypto_aead_chacha20poly1305_ietf_keybytes=Module["_crypto_aead_chacha20poly1305_ietf_keybytes"]=asm["_crypto_aead_chacha20poly1305_ietf_keybytes"];var _crypto_aead_chacha20poly1305_ietf_encrypt_detached=Module["_crypto_aead_chacha20poly1305_ietf_encrypt_detached"]=asm["_crypto_aead_chacha20poly1305_ietf_encrypt_detached"];var _crypto_stream=Module["_crypto_stream"]=asm["_crypto_stream"];var _sbrk=Module["_sbrk"]=asm["_sbrk"];var _memcpy=Module["_memcpy"]=asm["_memcpy"];var _crypto_kdf_bytes_max=Module["_crypto_kdf_bytes_max"]=asm["_crypto_kdf_bytes_max"];var _crypto_auth_hmacsha512256=Module["_crypto_auth_hmacsha512256"]=asm["_crypto_auth_hmacsha512256"];var _crypto_pwhash_argon2i_bytes_max=Module["_crypto_pwhash_argon2i_bytes_max"]=asm["_crypto_pwhash_argon2i_bytes_max"];var _crypto_generichash_blake2b_final=Module["_crypto_generichash_blake2b_final"]=asm["_crypto_generichash_blake2b_final"];var _crypto_generichash_blake2b_init_salt_personal=Module["_crypto_generichash_blake2b_init_salt_personal"]=asm["_crypto_generichash_blake2b_init_salt_personal"];var _crypto_box_seal=Module["_crypto_box_seal"]=asm["_crypto_box_seal"];var _crypto_aead_xchacha20poly1305_ietf_keygen=Module["_crypto_aead_xchacha20poly1305_ietf_keygen"]=asm["_crypto_aead_xchacha20poly1305_ietf_keygen"];var runPostSets=Module["runPostSets"]=asm["runPostSets"];var _crypto_pwhash_alg_default=Module["_crypto_pwhash_alg_default"]=asm["_crypto_pwhash_alg_default"];var _crypto_pwhash_str_verify=Module["_crypto_pwhash_str_verify"]=asm["_crypto_pwhash_str_verify"];var _crypto_stream_primitive=Module["_crypto_stream_primitive"]=asm["_crypto_stream_primitive"];var _crypto_secretbox_xsalsa20poly1305_boxzerobytes=Module["_crypto_secretbox_xsalsa20poly1305_boxzerobytes"]=asm["_crypto_secretbox_xsalsa20poly1305_boxzerobytes"];var _crypto_box=Module["_crypto_box"]=asm["_crypto_box"];var _crypto_generichash_keybytes_min=Module["_crypto_generichash_keybytes_min"]=asm["_crypto_generichash_keybytes_min"];var _crypto_generichash_statebytes=Module["_crypto_generichash_statebytes"]=asm["_crypto_generichash_statebytes"];var _crypto_pwhash_strprefix=Module["_crypto_pwhash_strprefix"]=asm["_crypto_pwhash_strprefix"];var _crypto_secretbox_keygen=Module["_crypto_secretbox_keygen"]=asm["_crypto_secretbox_keygen"];var _crypto_hash_sha512=Module["_crypto_hash_sha512"]=asm["_crypto_hash_sha512"];var _llvm_cttz_i32=Module["_llvm_cttz_i32"]=asm["_llvm_cttz_i32"];var _crypto_pwhash_scryptsalsa208sha256_bytes_max=Module["_crypto_pwhash_scryptsalsa208sha256_bytes_max"]=asm["_crypto_pwhash_scryptsalsa208sha256_bytes_max"];var _crypto_aead_chacha20poly1305_ietf_nsecbytes=Module["_crypto_aead_chacha20poly1305_ietf_nsecbytes"]=asm["_crypto_aead_chacha20poly1305_ietf_nsecbytes"];var _crypto_aead_chacha20poly1305_ietf_encrypt=Module["_crypto_aead_chacha20poly1305_ietf_encrypt"]=asm["_crypto_aead_chacha20poly1305_ietf_encrypt"];var _crypto_generichash_blake2b_init=Module["_crypto_generichash_blake2b_init"]=asm["_crypto_generichash_blake2b_init"];var _randombytes_close=Module["_randombytes_close"]=asm["_randombytes_close"];var _crypto_pwhash_primitive=Module["_crypto_pwhash_primitive"]=asm["_crypto_pwhash_primitive"];var _crypto_onetimeauth_keybytes=Module["_crypto_onetimeauth_keybytes"]=asm["_crypto_onetimeauth_keybytes"];var _crypto_pwhash_argon2i=Module["_crypto_pwhash_argon2i"]=asm["_crypto_pwhash_argon2i"];var _crypto_kdf_keybytes=Module["_crypto_kdf_keybytes"]=asm["_crypto_kdf_keybytes"];var _crypto_aead_chacha20poly1305_encrypt=Module["_crypto_aead_chacha20poly1305_encrypt"]=asm["_crypto_aead_chacha20poly1305_encrypt"];var _crypto_shorthash_siphash24_bytes=Module["_crypto_shorthash_siphash24_bytes"]=asm["_crypto_shorthash_siphash24_bytes"];var _crypto_pwhash_opslimit_max=Module["_crypto_pwhash_opslimit_max"]=asm["_crypto_pwhash_opslimit_max"];var _crypto_auth_verify=Module["_crypto_auth_verify"]=asm["_crypto_auth_verify"];var _crypto_auth_hmacsha512256_keygen=Module["_crypto_auth_hmacsha512256_keygen"]=asm["_crypto_auth_hmacsha512256_keygen"];var _randombytes_stir=Module["_randombytes_stir"]=asm["_randombytes_stir"];var _memset=Module["_memset"]=asm["_memset"];var _crypto_box_open_detached_afternm=Module["_crypto_box_open_detached_afternm"]=asm["_crypto_box_open_detached_afternm"];var _crypto_pwhash_argon2i_memlimit_sensitive=Module["_crypto_pwhash_argon2i_memlimit_sensitive"]=asm["_crypto_pwhash_argon2i_memlimit_sensitive"];var _crypto_aead_xchacha20poly1305_ietf_decrypt=Module["_crypto_aead_xchacha20poly1305_ietf_decrypt"]=asm["_crypto_aead_xchacha20poly1305_ietf_decrypt"];var _crypto_pwhash_scryptsalsa208sha256_strprefix=Module["_crypto_pwhash_scryptsalsa208sha256_strprefix"]=asm["_crypto_pwhash_scryptsalsa208sha256_strprefix"];var _crypto_core_salsa20_outputbytes=Module["_crypto_core_salsa20_outputbytes"]=asm["_crypto_core_salsa20_outputbytes"];var _crypto_auth_keygen=Module["_crypto_auth_keygen"]=asm["_crypto_auth_keygen"];var _crypto_secretbox=Module["_crypto_secretbox"]=asm["_crypto_secretbox"];var _crypto_aead_xchacha20poly1305_ietf_encrypt_detached=Module["_crypto_aead_xchacha20poly1305_ietf_encrypt_detached"]=asm["_crypto_aead_xchacha20poly1305_ietf_encrypt_detached"];var _crypto_pwhash_scryptsalsa208sha256_passwd_max=Module["_crypto_pwhash_scryptsalsa208sha256_passwd_max"]=asm["_crypto_pwhash_scryptsalsa208sha256_passwd_max"];var _crypto_auth_hmacsha256_bytes=Module["_crypto_auth_hmacsha256_bytes"]=asm["_crypto_auth_hmacsha256_bytes"];var _crypto_auth_hmacsha256_verify=Module["_crypto_auth_hmacsha256_verify"]=asm["_crypto_auth_hmacsha256_verify"];var _crypto_sign_keypair=Module["_crypto_sign_keypair"]=asm["_crypto_sign_keypair"];var _crypto_onetimeauth_statebytes=Module["_crypto_onetimeauth_statebytes"]=asm["_crypto_onetimeauth_statebytes"];var _crypto_stream_salsa20_noncebytes=Module["_crypto_stream_salsa20_noncebytes"]=asm["_crypto_stream_salsa20_noncebytes"];var _crypto_shorthash_keybytes=Module["_crypto_shorthash_keybytes"]=asm["_crypto_shorthash_keybytes"];var _crypto_aead_chacha20poly1305_keygen=Module["_crypto_aead_chacha20poly1305_keygen"]=asm["_crypto_aead_chacha20poly1305_keygen"];var _memmove=Module["_memmove"]=asm["_memmove"];var _crypto_hash_sha512_final=Module["_crypto_hash_sha512_final"]=asm["_crypto_hash_sha512_final"];var _crypto_box_curve25519xsalsa20poly1305_zerobytes=Module["_crypto_box_curve25519xsalsa20poly1305_zerobytes"]=asm["_crypto_box_curve25519xsalsa20poly1305_zerobytes"];var _crypto_pwhash_passwd_min=Module["_crypto_pwhash_passwd_min"]=asm["_crypto_pwhash_passwd_min"];var _crypto_box_curve25519xsalsa20poly1305_boxzerobytes=Module["_crypto_box_curve25519xsalsa20poly1305_boxzerobytes"]=asm["_crypto_box_curve25519xsalsa20poly1305_boxzerobytes"];var _crypto_generichash_bytes_min=Module["_crypto_generichash_bytes_min"]=asm["_crypto_generichash_bytes_min"];var _crypto_auth_hmacsha256_keybytes=Module["_crypto_auth_hmacsha256_keybytes"]=asm["_crypto_auth_hmacsha256_keybytes"];var _crypto_pwhash_argon2i_opslimit_sensitive=Module["_crypto_pwhash_argon2i_opslimit_sensitive"]=asm["_crypto_pwhash_argon2i_opslimit_sensitive"];var _crypto_pwhash_scryptsalsa208sha256_opslimit_max=Module["_crypto_pwhash_scryptsalsa208sha256_opslimit_max"]=asm["_crypto_pwhash_scryptsalsa208sha256_opslimit_max"];var _crypto_sign_ed25519_seed_keypair=Module["_crypto_sign_ed25519_seed_keypair"]=asm["_crypto_sign_ed25519_seed_keypair"];var _crypto_secretbox_open_detached=Module["_crypto_secretbox_open_detached"]=asm["_crypto_secretbox_open_detached"];var _crypto_pwhash_argon2i_memlimit_min=Module["_crypto_pwhash_argon2i_memlimit_min"]=asm["_crypto_pwhash_argon2i_memlimit_min"];var _crypto_pwhash_scryptsalsa208sha256_opslimit_sensitive=Module["_crypto_pwhash_scryptsalsa208sha256_opslimit_sensitive"]=asm["_crypto_pwhash_scryptsalsa208sha256_opslimit_sensitive"];var _crypto_box_curve25519xsalsa20poly1305_secretkeybytes=Module["_crypto_box_curve25519xsalsa20poly1305_secretkeybytes"]=asm["_crypto_box_curve25519xsalsa20poly1305_secretkeybytes"];var _crypto_kdf_contextbytes=Module["_crypto_kdf_contextbytes"]=asm["_crypto_kdf_contextbytes"];var _crypto_box_seal_open=Module["_crypto_box_seal_open"]=asm["_crypto_box_seal_open"];var _crypto_shorthash_primitive=Module["_crypto_shorthash_primitive"]=asm["_crypto_shorthash_primitive"];var _crypto_core_hsalsa20_inputbytes=Module["_crypto_core_hsalsa20_inputbytes"]=asm["_crypto_core_hsalsa20_inputbytes"];var _crypto_onetimeauth_final=Module["_crypto_onetimeauth_final"]=asm["_crypto_onetimeauth_final"];var _crypto_secretbox_open_easy=Module["_crypto_secretbox_open_easy"]=asm["_crypto_secretbox_open_easy"];var _crypto_auth_hmacsha512256_statebytes=Module["_crypto_auth_hmacsha512256_statebytes"]=asm["_crypto_auth_hmacsha512256_statebytes"];var _crypto_stream_chacha20_xor=Module["_crypto_stream_chacha20_xor"]=asm["_crypto_stream_chacha20_xor"];var _crypto_core_hsalsa20=Module["_crypto_core_hsalsa20"]=asm["_crypto_core_hsalsa20"];Runtime.stackAlloc=asm["stackAlloc"];Runtime.stackSave=asm["stackSave"];Runtime.stackRestore=asm["stackRestore"];Runtime.establishStackSpace=asm["establishStackSpace"];Runtime.setTempRet0=asm["setTempRet0"];Runtime.getTempRet0=asm["getTempRet0"];function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}ExitStatus.prototype=new Error;ExitStatus.prototype.constructor=ExitStatus;var initialStackTop;var preloadStartTime=null;var calledMain=false;dependenciesFulfilled=function runCaller(){if(!Module["calledRun"])run();if(!Module["calledRun"])dependenciesFulfilled=runCaller};Module["callMain"]=Module.callMain=function callMain(args){args=args||[];ensureInitRuntime();var argc=args.length+1;function pad(){for(var i=0;i<4-1;i++){argv.push(0)}}var argv=[allocate(intArrayFromString(Module["thisProgram"]),"i8",ALLOC_NORMAL)];pad();for(var i=0;i<argc-1;i=i+1){argv.push(allocate(intArrayFromString(args[i]),"i8",ALLOC_NORMAL));pad()}argv.push(0);argv=allocate(argv,"i32",ALLOC_NORMAL);try{var ret=Module["_main"](argc,argv,0);exit(ret,true)}catch(e){if(e instanceof ExitStatus){return}else if(e=="SimulateInfiniteLoop"){Module["noExitRuntime"]=true;return}else{if(e&&typeof e==="object"&&e.stack)Module.printErr("exception thrown: "+[e,e.stack]);throw e}}finally{calledMain=true}};function run(args){args=args||Module["arguments"];if(preloadStartTime===null)preloadStartTime=Date.now();if(runDependencies>0){return}preRun();if(runDependencies>0)return;if(Module["calledRun"])return;function doRun(){if(Module["calledRun"])return;Module["calledRun"]=true;if(ABORT)return;ensureInitRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(Module["_main"]&&shouldRunNow)Module["callMain"](args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout((function(){setTimeout((function(){Module["setStatus"]("")}),1);doRun()}),1)}else{doRun()}}Module["run"]=Module.run=run;function exit(status,implicit){if(implicit&&Module["noExitRuntime"]){return}if(Module["noExitRuntime"]){}else{ABORT=true;EXITSTATUS=status;STACKTOP=initialStackTop;exitRuntime();if(Module["onExit"])Module["onExit"](status)}if(ENVIRONMENT_IS_NODE){process["exit"](status)}else if(ENVIRONMENT_IS_SHELL&&typeof quit==="function"){quit(status)}throw new ExitStatus(status)}Module["exit"]=Module.exit=exit;var abortDecorators=[];function abort(what){if(what!==undefined){Module.print(what);Module.printErr(what);what=JSON.stringify(what)}else{what=""}ABORT=true;EXITSTATUS=1;var extra="\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";var output="abort("+what+") at "+stackTrace()+extra;if(abortDecorators){abortDecorators.forEach((function(decorator){output=decorator(output,what)}))}throw output}Module["abort"]=Module.abort=abort;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"]){shouldRunNow=false}run()




    ENVIRONMENT_IS_NODE && !process.removeAllListeners("uncaughtException");
    return Module;
}));
(function (root, factory) {
    if (typeof process === "object" && typeof process.stdout === "undefined") {
        process.stderr = process.stdout = { write: function() { } };
    }
    if (typeof define === "function" && define.amd) {
        define(["exports", "libsodium-sumo"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("libsodium-sumo"));
    } else {
        var cb = root.sodium && root.sodium.onload;
        factory((root.sodium = {}), root.libsodium);
        if (typeof cb === "function") {
            cb(root.sodium);
        }
    }
}(this, (function (exports, libsodium) {
    "use strict";

    var output_format = "uint8array";

    if (libsodium._sodium_init() !== 0) {
        throw new Error("libsodium was not correctly initialized.");
    }

    // List of functions and constants defined in the wrapped libsodium
    function symbols() {
        return Object.keys(exports).sort();
    }

    function increment(bytes) {
        if (! bytes instanceof Uint8Array) {
            throw new TypeError("Only Uint8Array instances can be incremented");
        }
        var c = 1 << 8;
        for (var i = 0 | 0, j = bytes.length; i < j; i++) {
            c >>= 8;
            c += bytes[i];
            bytes[i] = c & 0xff;
        }
    }

    function add(a, b) {
        if (! a instanceof Uint8Array || ! b instanceof Uint8Array) {
            throw new TypeError("Only Uint8Array instances can added");
        }
        var j = a.length, c = 0 | 0, i = 0 | 0;
        if (b.length != a.length) {
            throw new TypeError("Arguments must have the same length");
        }
        for (i = 0; i < j; i++) {
            c >>= 8;
            c += (a[i] + b[j]);
            a[i] = c & 0xff;
        }
    }

    function is_zero(bytes) {
        if (! bytes instanceof Uint8Array) {
            throw new TypeError("Only Uint8Array instances can be checked");
        }
        var d = 0 | 0;
        for (var i = 0 | 0, j = bytes.length; i < j; i++) {
            d |= bytes[i];
        }
        return d === 0;
    }

    function memzero(bytes) {
        if (! bytes instanceof Uint8Array) {
            throw new TypeError("Only Uint8Array instances can be wiped");
        }
        for (var i = 0 | 0, j = bytes.length; i < j; i++) {
            bytes[i] = 0;
        }
    }

    function memcmp(b1, b2) {
        if (!(b1 instanceof Uint8Array && b2 instanceof Uint8Array)) {
            throw new TypeError("Only Uint8Array instances can be compared");
        }
        if (b1.length !== b2.length) {
            throw new TypeError("Only instances of identical length can be compared");
        }
        for (var d = 0 | 0, i = 0 | 0, j = b1.length; i < j; i++) {
            d |= b1[i] ^ b2[i];
        }
        return d === 0;
    }

    function compare(b1, b2) {
        if (!(b1 instanceof Uint8Array && b2 instanceof Uint8Array)) {
            throw new TypeError("Only Uint8Array instances can be compared");
        }
        if (b1.length !== b2.length) {
            throw new TypeError("Only instances of identical length can be compared");
        }
        for (var gt = 0 | 0, eq = 1 | 1, i = b1.length; i-- > 0;) {
            gt |= ((b2[i] - b1[i]) >> 8) & eq;
            eq &= ((b2[i] ^ b1[i]) - 1) >> 8;
        }
        return (gt + gt + eq) - 1;
    }

    //---------------------------------------------------------------------------
    // Codecs
    //
    function from_string(str) {
        if (typeof TextEncoder === "function") {
            return new TextEncoder("utf-8").encode(str);
        }
        str = unescape(encodeURIComponent(str));
        var bytes = new Uint8Array(str.length);
        for (var i = 0; i < str.length; i++) {
            bytes[i] = str.charCodeAt(i);
        }
        return bytes;
    }

    function to_string(bytes) {
        if (typeof TextDecoder === "function") {
            return new TextDecoder("utf-8", {fatal: true}).decode(bytes);
        }

        var toStringChunkSize = 8192,
            numChunks = Math.ceil(bytes.length / toStringChunkSize);
        if (numChunks <= 1) {
            try {
                return decodeURIComponent(escape(String.fromCharCode.apply(null, bytes)));
            }
            catch (_) {
                throw new TypeError("The encoded data was not valid.");
            }
        }
        var totalString = '';
        var sequenceReadOffset = 0;
        for (var i = 0; i < numChunks; i++) {
            var currentChunk =
                Array.prototype.slice.call(bytes,
                                           i * toStringChunkSize + sequenceReadOffset,
                                           (i + 1) * toStringChunkSize + sequenceReadOffset);
            //Depending on how much we have shifted
            if (currentChunk.length == 0) {
                continue;
            }

            //Checking that we didn't cut the buffer in the middle of a UTF8 sequence.
            //If we did, remove the bytes of the "cut" sequence and
            //decrement sequenceReadOffset for each removed byte
            var sequenceDetectionComplete,
                sequenceIndex = currentChunk.length,
                sequenceLength = 0;

            //This loop will read the chunk from its end, looking for sequence start bytes
            do {
                sequenceIndex--;
                var currentByte = currentChunk[sequenceIndex];

                if (currentByte >= 240) { //Beginning of a 4-byte UTF-8 sequence
                    sequenceLength = 4;
                    sequenceDetectionComplete = true;
                } else if (currentByte >= 224) { //Beginning of a 3-byte UTF-8 sequence
                    sequenceLength = 3;
                    sequenceDetectionComplete = true;
                } else if (currentByte >= 192) { //Beginning of a 2-byte UTF-8 sequence
                    sequenceLength = 2;
                    sequenceDetectionComplete = true;
                } else if (currentByte < 128) { //A one byte UTF-8 char
                    sequenceLength = 1;
                    sequenceDetectionComplete = true;
                }
                //The values between [128, 192[ are part of a UTF-8 sequence.
                //The loop will not exit in that case, and will iterate one byte backwards instead
            } while (!sequenceDetectionComplete);

            var extraBytes = sequenceLength - (currentChunk.length - sequenceIndex);
            for (var j = 0; j < extraBytes; j++) {
                sequenceReadOffset--;
                currentChunk.pop();
            }

            totalString += to_string(currentChunk);
        }
        return totalString;
    }

    /* not constant-time */
    function from_hex(str) {
        if (!is_hex(str)) {
            throw new TypeError("The provided string doesn't look like hex data");
        }
        var result = new Uint8Array(str.length / 2);
        for (var i = 0; i < str.length; i += 2) {
            result[i >>> 1] = parseInt(str.substr(i, 2), 16);
        }
        return result;
    }

    function to_hex(bytes) {
        var str = "", b, c, x;
        for (var i = 0; i < bytes.length; i++) {
            c = bytes[i] & 0xf;
            b = bytes[i] >>> 4;
            x = (87 + c + (((c - 10) >> 8) & ~38)) << 8 |
                (87 + b + (((b - 10) >> 8) & ~38));
            str += String.fromCharCode(x & 0xff) + String.fromCharCode(x >>> 8);
        }
        return str;
    }

    function is_hex(str) {
        return (typeof str === "string" && /^[0-9a-f]+$/i.test(str) && str.length % 2 === 0);
    }

    function from_base64(sBase64, nBlocksSize) {
        function _b64ToUint6(nChr) {
            return nChr > 64 && nChr < 91 ?
                nChr - 65 : nChr > 96 && nChr < 123 ?
                nChr - 71 : nChr > 47 && nChr < 58 ?
                nChr + 4 : nChr === 43 ?
                62 : nChr === 47 ?
                63 :
                0;
        }

        var sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""),
            nInLen = sB64Enc.length,
            nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2,
            taBytes = new Uint8Array(nOutLen);

        for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
            nMod4 = nInIdx & 3;
            nUint24 |= _b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
            if (nMod4 === 3 || nInLen - nInIdx === 1) {
                for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
                    taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
                }
                nUint24 = 0;
            }
        }
        return taBytes;
    }

    function to_base64(aBytes, noNewLine) {
        if (typeof noNewLine === "undefined") {
            noNewLine = true;
        }
        function _uint6ToB64(nUint6) {
            return nUint6 < 26 ?
                nUint6 + 65 : nUint6 < 52 ?
                nUint6 + 71 : nUint6 < 62 ?
                nUint6 - 4 : nUint6 === 62 ?
                43 : nUint6 === 63 ?
                47 :
                65;
        }
        if (typeof aBytes === "string") {
            throw new Error("input has to be an array");
        }
        var nMod3 = 2,
            sB64Enc = "";
        for (var nLen = aBytes.length, nUint24 = 0, nIdx = 0; nIdx < nLen; nIdx++) {
            nMod3 = nIdx % 3;
            if (nIdx > 0 && (nIdx * 4 / 3) % 76 === 0 && !noNewLine) {
                sB64Enc += "\r\n";
            }
            nUint24 |= aBytes[nIdx] << (16 >>> nMod3 & 24);
            if (nMod3 === 2 || aBytes.length - nIdx === 1) {
                sB64Enc += String.fromCharCode(_uint6ToB64(nUint24 >>> 18 & 63),
                                               _uint6ToB64(nUint24 >>> 12 & 63),
                                               _uint6ToB64(nUint24 >>> 6 & 63),
                                               _uint6ToB64(nUint24 & 63));
                nUint24 = 0;
            }
        }
        return sB64Enc.substr(0, sB64Enc.length - 2 + nMod3) +
            (nMod3 === 2 ? "" : nMod3 === 1 ? "=" : "==");
    }

    function output_formats() {
        return ["uint8array", "text", "hex", "base64"];
    }

    function _format_output(output, optionalOutputFormat) {
        var selectedOutputFormat = optionalOutputFormat || output_format;
        if (!_is_output_format(selectedOutputFormat)) {
            throw new Error(selectedOutputFormat + " output format is not available");
        }
        if (output instanceof AllocatedBuf) {
            if (selectedOutputFormat === "uint8array") {
                return output.to_Uint8Array();
            } else if (selectedOutputFormat === "text") {
                return to_string(output.to_Uint8Array());
            } else if (selectedOutputFormat === "hex") {
                return to_hex(output.to_Uint8Array());
            } else if (selectedOutputFormat === "base64") {
                return to_base64(output.to_Uint8Array());
            } else {
                throw new Error("What is output format \"" + selectedOutputFormat + "\"?");
            }
        } else if (typeof output === "object") { //Composed output. Example : key pairs
            var props = Object.keys(output);
            var formattedOutput = {};
            for (var i = 0; i < props.length; i++) {
                formattedOutput[props[i]] = _format_output(output[props[i]], selectedOutputFormat);
            }
            return formattedOutput;
        } else if (typeof output === "string") {
            return output;
        } else {
            throw new TypeError("Cannot format output");
        }
    }

    function _is_output_format(format) {
        var formats = output_formats();
        for (var i = 0; i < formats.length; i++) {
            if (formats[i] === format) {
                return true;
            }
        }
        return false;
    }

    function _check_output_format(format) {
        if (!format) {
            return;
        } else if (typeof format !== "string") {
            throw new TypeError("When defined, the output format must be a string");
        } else if (!_is_output_format(format)) {
            throw new Error(format + " is not a supported output format");
        }
    }

    //---------------------------------------------------------------------------
    // Memory management
    //
    // AllocatedBuf: address allocated using _malloc() + length
    function AllocatedBuf(length) {
        this.length = length;
        this.address = _malloc(length);
    }

    // Copy the content of a AllocatedBuf (_malloc()'d memory) into a Uint8Array
    AllocatedBuf.prototype.to_Uint8Array = function () {
        var result = new Uint8Array(this.length);
        result.set(libsodium.HEAPU8.subarray(this.address, this.address + this.length));
        return result;
    };

    // _malloc() a region and initialize it with the content of a Uint8Array
    function _to_allocated_buf_address(bytes) {
        var address = _malloc(bytes.length);
        libsodium.HEAPU8.set(bytes, address);
        return address;
    }

    function _malloc(length) {
        var result = libsodium._malloc(length);
        if (result === 0) {
            throw {
                message: "_malloc() failed",
                length: length
            };
        }
        return result;
    }

    function _free(address) {
        libsodium._free(address);
    }

    function _free_all(addresses) {
        for (var i = 0; i < addresses.length; i++) {
            _free(addresses[i]);
        }
    }

    function _free_and_throw_error(address_pool, err) {
        _free_all(address_pool);
        throw new Error(err);
    }

    function _free_and_throw_type_error(address_pool, err) {
        _free_all(address_pool);
        throw new TypeError(err);
    }

    function _require_defined(address_pool, varValue, varName) {
        if (varValue == undefined) {
            _free_and_throw_type_error(address_pool, varName + " cannot be null or undefined");
        }
    }

    function _any_to_Uint8Array(address_pool, varValue, varName) {
        _require_defined(address_pool, varValue, varName);
        if (varValue instanceof Uint8Array) {
            return varValue;
        } else if (typeof varValue === "string") {
            return from_string(varValue);
        }
        _free_and_throw_type_error(address_pool, "unsupported input type for " + varName);
    }

    
	function crypto_aead_chacha20poly1305_decrypt(secret_nonce, ciphertext, additional_data, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length - libsodium._crypto_aead_chacha20poly1305_abytes()) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_decrypt(message_address, null, secret_nonce_address, ciphertext_address, ciphertext_length, 0, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_decrypt_detached(secret_nonce, ciphertext, mac, additional_data, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: mac (buf)
		
		mac = _any_to_Uint8Array(address_pool, mac, "mac");
		var mac_address, mac_length = (libsodium._crypto_box_macbytes()) | 0;
		if (mac.length !== mac_length) {
		        _free_and_throw_type_error(address_pool, "invalid mac length");
		}
		mac_address = _to_allocated_buf_address(mac);
		address_pool.push(mac_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_decrypt_detached(message_address, secret_nonce_address, ciphertext_address, ciphertext_length, 0, mac_address, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_encrypt(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length + libsodium._crypto_aead_chacha20poly1305_abytes()) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_encrypt(ciphertext_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(ciphertext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_encrypt_detached(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		// ---------- output mac (buf)
		
		var mac_length = (libsodium._crypto_aead_chacha20poly1305_abytes()) | 0,
		    mac = new AllocatedBuf(mac_length),
		    mac_address = mac.address;
		
		address_pool.push(mac_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_encrypt_detached(ciphertext_address, mac_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
			var ret = _format_output({ciphertext: ciphertext, mac: mac}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_ietf_decrypt(secret_nonce, ciphertext, additional_data, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_ietf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length - libsodium._crypto_aead_chacha20poly1305_ietf_abytes()) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_ietf_decrypt(message_address, null, secret_nonce_address, ciphertext_address, ciphertext_length, 0, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_ietf_decrypt_detached(secret_nonce, ciphertext, mac, additional_data, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: mac (buf)
		
		mac = _any_to_Uint8Array(address_pool, mac, "mac");
		var mac_address, mac_length = (libsodium._crypto_box_macbytes()) | 0;
		if (mac.length !== mac_length) {
		        _free_and_throw_type_error(address_pool, "invalid mac length");
		}
		mac_address = _to_allocated_buf_address(mac);
		address_pool.push(mac_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_ietf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_ietf_decrypt_detached(message_address, secret_nonce_address, ciphertext_address, ciphertext_length, 0, mac_address, additional_data_address, additional_data_length, 0, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_ietf_encrypt(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_ietf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length + libsodium._crypto_aead_chacha20poly1305_ietf_abytes()) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_ietf_encrypt(ciphertext_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
			var ret = _format_output(ciphertext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_aead_chacha20poly1305_ietf_encrypt_detached(message, additional_data, secret_nonce, public_nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: additional_data (unsized_buf_optional)
		
		var additional_data_address = null, additional_data_length = 0;
		if (additional_data != undefined) {
		        additional_data = _any_to_Uint8Array(address_pool, additional_data, "additional_data");
		        additional_data_address = _to_allocated_buf_address(additional_data);
		        additional_data_length = additional_data.length;
		        address_pool.push(additional_data_address);
		}
		
		// ---------- input: secret_nonce (unsized_buf_optional)
		
		var secret_nonce_address = null, secret_nonce_length = 0;
		if (secret_nonce != undefined) {
		        secret_nonce = _any_to_Uint8Array(address_pool, secret_nonce, "secret_nonce");
		        secret_nonce_address = _to_allocated_buf_address(secret_nonce);
		        secret_nonce_length = secret_nonce.length;
		        address_pool.push(secret_nonce_address);
		}
		
		// ---------- input: public_nonce (buf)
		
		public_nonce = _any_to_Uint8Array(address_pool, public_nonce, "public_nonce");
		var public_nonce_address, public_nonce_length = (libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes()) | 0;
		if (public_nonce.length !== public_nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid public_nonce length");
		}
		public_nonce_address = _to_allocated_buf_address(public_nonce);
		address_pool.push(public_nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_aead_chacha20poly1305_ietf_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		// ---------- output mac (buf)
		
		var mac_length = (libsodium._crypto_aead_chacha20poly1305_ietf_abytes()) | 0,
		    mac = new AllocatedBuf(mac_length),
		    mac_address = mac.address;
		
		address_pool.push(mac_address);
		
		if ((libsodium._crypto_aead_chacha20poly1305_ietf_encrypt_detached(ciphertext_address, mac_address, null, message_address, message_length, 0, additional_data_address, additional_data_length, 0, secret_nonce_address, public_nonce_address, key_address)) === 0) {
			var ret = _format_output({ciphertext: ciphertext, mac: mac}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_auth(message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output tag (buf)
		
		var tag_length = (libsodium._crypto_auth_bytes()) | 0,
		    tag = new AllocatedBuf(tag_length),
		    tag_address = tag.address;
		
		address_pool.push(tag_address);
		
		if ((libsodium._crypto_auth(tag_address, message_address, message_length, 0, key_address) | 0) === 0) {
			var ret = _format_output(tag, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_auth_hmacsha256(message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_hmacsha256_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_auth_hmacsha256_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_auth_hmacsha256(hash_address, message_address, message_length, 0, key_address) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_auth_hmacsha256_verify(tag, message, key) {
		var address_pool = [];

		// ---------- input: tag (buf)
		
		tag = _any_to_Uint8Array(address_pool, tag, "tag");
		var tag_address, tag_length = (libsodium._crypto_auth_hmacsha256_bytes()) | 0;
		if (tag.length !== tag_length) {
		        _free_and_throw_type_error(address_pool, "invalid tag length");
		}
		tag_address = _to_allocated_buf_address(tag);
		address_pool.push(tag_address);
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_hmacsha256_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		var result = libsodium._crypto_auth_hmacsha256_verify(tag_address, message_address, message_length, 0, key_address) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_auth_hmacsha512(message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_hmacsha512_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_auth_hmacsha512_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_auth_hmacsha512(hash_address, message_address, message_length, 0, key_address) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_auth_hmacsha512_verify(tag, message, key) {
		var address_pool = [];

		// ---------- input: tag (buf)
		
		tag = _any_to_Uint8Array(address_pool, tag, "tag");
		var tag_address, tag_length = (libsodium._crypto_auth_hmacsha512_bytes()) | 0;
		if (tag.length !== tag_length) {
		        _free_and_throw_type_error(address_pool, "invalid tag length");
		}
		tag_address = _to_allocated_buf_address(tag);
		address_pool.push(tag_address);
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_hmacsha512_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		var result = libsodium._crypto_auth_hmacsha512_verify(tag_address, message_address, message_length, 0, key_address) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_auth_verify(tag, message, key) {
		var address_pool = [];

		// ---------- input: tag (buf)
		
		tag = _any_to_Uint8Array(address_pool, tag, "tag");
		var tag_address, tag_length = (libsodium._crypto_auth_bytes()) | 0;
		if (tag.length !== tag_length) {
		        _free_and_throw_type_error(address_pool, "invalid tag length");
		}
		tag_address = _to_allocated_buf_address(tag);
		address_pool.push(tag_address);
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_auth_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		var result = libsodium._crypto_auth_verify(tag_address, message_address, message_length, 0, key_address) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_box_beforenm(publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output sharedKey (buf)
		
		var sharedKey_length = (libsodium._crypto_box_beforenmbytes()) | 0,
		    sharedKey = new AllocatedBuf(sharedKey_length),
		    sharedKey_address = sharedKey.address;
		
		address_pool.push(sharedKey_address);
		
		if ((libsodium._crypto_box_beforenm(sharedKey_address, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output(sharedKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_detached(message, nonce, publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		// ---------- output mac (buf)
		
		var mac_length = (libsodium._crypto_box_macbytes()) | 0,
		    mac = new AllocatedBuf(mac_length),
		    mac_address = mac.address;
		
		address_pool.push(mac_address);
		
		if ((libsodium._crypto_box_detached(ciphertext_address, mac_address, message_address, message_length, 0, nonce_address, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output({ciphertext: ciphertext, mac: mac}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_easy(message, nonce, publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length + libsodium._crypto_box_macbytes()) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		if ((libsodium._crypto_box_easy(ciphertext_address, message_address, message_length, 0, nonce_address, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output(ciphertext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_easy_afternm(message, nonce, sharedKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: sharedKey (buf)
		
		sharedKey = _any_to_Uint8Array(address_pool, sharedKey, "sharedKey");
		var sharedKey_address, sharedKey_length = (libsodium._crypto_box_beforenmbytes()) | 0;
		if (sharedKey.length !== sharedKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid sharedKey length");
		}
		sharedKey_address = _to_allocated_buf_address(sharedKey);
		address_pool.push(sharedKey_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length + libsodium._crypto_box_macbytes()) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		if ((libsodium._crypto_box_easy_afternm(ciphertext_address, message_address, message_length, 0, nonce_address, sharedKey_address) | 0) === 0) {
			var ret = _format_output(ciphertext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_keypair(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		// ---------- output secretKey (buf)
		
		var secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0,
		    secretKey = new AllocatedBuf(secretKey_length),
		    secretKey_address = secretKey.address;
		
		address_pool.push(secretKey_address);
		
		if ((libsodium._crypto_box_keypair(publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output({publicKey: publicKey, privateKey: secretKey, keyType: "curve25519"}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_open_detached(ciphertext, mac, nonce, publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: mac (buf)
		
		mac = _any_to_Uint8Array(address_pool, mac, "mac");
		var mac_address, mac_length = (libsodium._crypto_box_macbytes()) | 0;
		if (mac.length !== mac_length) {
		        _free_and_throw_type_error(address_pool, "invalid mac length");
		}
		mac_address = _to_allocated_buf_address(mac);
		address_pool.push(mac_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output plaintext (buf)
		
		var plaintext_length = (ciphertext_length) | 0,
		    plaintext = new AllocatedBuf(plaintext_length),
		    plaintext_address = plaintext.address;
		
		address_pool.push(plaintext_address);
		
		if ((libsodium._crypto_box_open_detached(plaintext_address, ciphertext_address, mac_address, ciphertext_length, 0, nonce_address, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output(plaintext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_open_easy(ciphertext, nonce, publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output plaintext (buf)
		
		var plaintext_length = (ciphertext_length - libsodium._crypto_box_macbytes()) | 0,
		    plaintext = new AllocatedBuf(plaintext_length),
		    plaintext_address = plaintext.address;
		
		address_pool.push(plaintext_address);
		
		if ((libsodium._crypto_box_open_easy(plaintext_address, ciphertext_address, ciphertext_length, 0, nonce_address, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output(plaintext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_open_easy_afternm(ciphertext, nonce, sharedKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_box_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: sharedKey (buf)
		
		sharedKey = _any_to_Uint8Array(address_pool, sharedKey, "sharedKey");
		var sharedKey_address, sharedKey_length = (libsodium._crypto_box_beforenmbytes()) | 0;
		if (sharedKey.length !== sharedKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid sharedKey length");
		}
		sharedKey_address = _to_allocated_buf_address(sharedKey);
		address_pool.push(sharedKey_address);
		
		// ---------- output plaintext (buf)
		
		var plaintext_length = (ciphertext_length - libsodium._crypto_box_macbytes()) | 0,
		    plaintext = new AllocatedBuf(plaintext_length),
		    plaintext_address = plaintext.address;
		
		address_pool.push(plaintext_address);
		
		if ((libsodium._crypto_box_open_easy_afternm(plaintext_address, ciphertext_address, ciphertext_length, 0, nonce_address, sharedKey_address) | 0) === 0) {
			var ret = _format_output(plaintext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_seal(message, publicKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- output ciphertext (buf)
		
		var ciphertext_length = (message_length + libsodium._crypto_box_sealbytes()) | 0,
		    ciphertext = new AllocatedBuf(ciphertext_length),
		    ciphertext_address = ciphertext.address;
		
		address_pool.push(ciphertext_address);
		
		if ((libsodium._crypto_box_seal(ciphertext_address, message_address, message_length, 0, publicKey_address) | 0) === 0) {
			var ret = _format_output(ciphertext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_seal_open(ciphertext, publicKey, secretKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- input: secretKey (buf)
		
		secretKey = _any_to_Uint8Array(address_pool, secretKey, "secretKey");
		var secretKey_address, secretKey_length = (libsodium._crypto_box_secretkeybytes()) | 0;
		if (secretKey.length !== secretKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid secretKey length");
		}
		secretKey_address = _to_allocated_buf_address(secretKey);
		address_pool.push(secretKey_address);
		
		// ---------- output plaintext (buf)
		
		var plaintext_length = (ciphertext_length - libsodium._crypto_box_sealbytes()) | 0,
		    plaintext = new AllocatedBuf(plaintext_length),
		    plaintext_address = plaintext.address;
		
		address_pool.push(plaintext_address);
		
		if ((libsodium._crypto_box_seal_open(plaintext_address, ciphertext_address, ciphertext_length, 0, publicKey_address, secretKey_address) | 0) === 0) {
			var ret = _format_output(plaintext, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_box_seed_keypair(seed, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: seed (buf)
		
		seed = _any_to_Uint8Array(address_pool, seed, "seed");
		var seed_address, seed_length = (libsodium._crypto_box_seedbytes()) | 0;
		if (seed.length !== seed_length) {
		        _free_and_throw_type_error(address_pool, "invalid seed length");
		}
		seed_address = _to_allocated_buf_address(seed);
		address_pool.push(seed_address);
		
		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_box_publickeybytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		// ---------- output privateKey (buf)
		
		var privateKey_length = (libsodium._crypto_box_secretkeybytes()) | 0,
		    privateKey = new AllocatedBuf(privateKey_length),
		    privateKey_address = privateKey.address;
		
		address_pool.push(privateKey_address);
		
		if ((libsodium._crypto_box_seed_keypair(publicKey_address, privateKey_address, seed_address) | 0) === 0) {
			var ret = _format_output({publicKey: publicKey, privateKey: privateKey}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_generichash(hash_length, message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: hash_length (uint)
		
		_require_defined(address_pool, hash_length, "hash_length");
		
		if (!(typeof hash_length === "number" && (hash_length | 0) === hash_length) && (hash_length | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "hash_length must be an unsigned integer");
		}
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (unsized_buf_optional)
		
		var key_address = null, key_length = 0;
		if (key != undefined) {
		        key = _any_to_Uint8Array(address_pool, key, "key");
		        key_address = _to_allocated_buf_address(key);
		        key_length = key.length;
		        address_pool.push(key_address);
		}
		
		// ---------- output hash (buf)
		
		var hash_length = (hash_length) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_generichash(hash_address, hash_length, message_address, message_length, 0, key_address, key_length) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_generichash_final(state_address, hash_length, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: state_address (generichash_state_address)
		
		_require_defined(address_pool, state_address, "state_address");
		
		// ---------- input: hash_length (uint)
		
		_require_defined(address_pool, hash_length, "hash_length");
		
		if (!(typeof hash_length === "number" && (hash_length | 0) === hash_length) && (hash_length | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "hash_length must be an unsigned integer");
		}
		
		// ---------- output hash (buf)
		
		var hash_length = (hash_length) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_generichash_final(state_address, hash_address, hash_length) | 0) === 0) {
			var ret = (libsodium._free(state_address), _format_output(hash, outputFormat));
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_generichash_init(key, hash_length, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: key (unsized_buf_optional)
		
		var key_address = null, key_length = 0;
		if (key != undefined) {
		        key = _any_to_Uint8Array(address_pool, key, "key");
		        key_address = _to_allocated_buf_address(key);
		        key_length = key.length;
		        address_pool.push(key_address);
		}
		
		// ---------- input: hash_length (uint)
		
		_require_defined(address_pool, hash_length, "hash_length");
		
		if (!(typeof hash_length === "number" && (hash_length | 0) === hash_length) && (hash_length | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "hash_length must be an unsigned integer");
		}
		
		// ---------- output state (generichash_state)
		
		var state_address = new AllocatedBuf(357).address;
		
		if ((libsodium._crypto_generichash_init(state_address, key_address, key_length, hash_length) | 0) === 0) {
			var ret = state_address;
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_generichash_update(state_address, message_chunk, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: state_address (generichash_state_address)
		
		_require_defined(address_pool, state_address, "state_address");
		
		// ---------- input: message_chunk (unsized_buf)
		
		message_chunk = _any_to_Uint8Array(address_pool, message_chunk, "message_chunk");
		var message_chunk_address = _to_allocated_buf_address(message_chunk),
		    message_chunk_length = message_chunk.length;
		address_pool.push(message_chunk_address);
		
		if ((libsodium._crypto_generichash_update(state_address, message_chunk_address, message_chunk_length) | 0) === 0) {
			_free_all(address_pool);
			return;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_hash(message, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_hash_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_hash(hash_address, message_address, message_length, 0) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_hash_sha256(message, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_hash_sha256_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_hash_sha256(hash_address, message_address, message_length, 0) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_hash_sha512(message, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_hash_sha512_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_hash_sha512(hash_address, message_address, message_length, 0) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_onetimeauth(message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_onetimeauth_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_onetimeauth_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_onetimeauth(hash_address, message_address, message_length, 0, key_address) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_onetimeauth_final(state_address, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: state_address (onetimeauth_state_address)
		
		_require_defined(address_pool, state_address, "state_address");
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_onetimeauth_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_onetimeauth_final(state_address, hash_address) | 0) === 0) {
			var ret = (libsodium._free(state_address), _format_output(hash, outputFormat));
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_onetimeauth_init(key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: key (unsized_buf_optional)
		
		var key_address = null, key_length = 0;
		if (key != undefined) {
		        key = _any_to_Uint8Array(address_pool, key, "key");
		        key_address = _to_allocated_buf_address(key);
		        key_length = key.length;
		        address_pool.push(key_address);
		}
		
		// ---------- output state (onetimeauth_state)
		
		var state_address = new AllocatedBuf(144).address;
		
		if ((libsodium._crypto_onetimeauth_init(state_address, key_address) | 0) === 0) {
			var ret = state_address;
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_onetimeauth_update(state_address, message_chunk, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: state_address (onetimeauth_state_address)
		
		_require_defined(address_pool, state_address, "state_address");
		
		// ---------- input: message_chunk (unsized_buf)
		
		message_chunk = _any_to_Uint8Array(address_pool, message_chunk, "message_chunk");
		var message_chunk_address = _to_allocated_buf_address(message_chunk),
		    message_chunk_length = message_chunk.length;
		address_pool.push(message_chunk_address);
		
		if ((libsodium._crypto_onetimeauth_update(state_address, message_chunk_address, message_chunk_length) | 0) === 0) {
			_free_all(address_pool);
			return;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_onetimeauth_verify(hash, message, key) {
		var address_pool = [];

		// ---------- input: hash (buf)
		
		hash = _any_to_Uint8Array(address_pool, hash, "hash");
		var hash_address, hash_length = (libsodium._crypto_onetimeauth_bytes()) | 0;
		if (hash.length !== hash_length) {
		        _free_and_throw_type_error(address_pool, "invalid hash length");
		}
		hash_address = _to_allocated_buf_address(hash);
		address_pool.push(hash_address);
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_onetimeauth_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		var result = libsodium._crypto_onetimeauth_verify(hash_address, message_address, message_length, 0, key_address) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_pwhash(keyLength, password, salt, opsLimit, memLimit, algorithm, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: keyLength (uint)
		
		_require_defined(address_pool, keyLength, "keyLength");
		
		if (!(typeof keyLength === "number" && (keyLength | 0) === keyLength) && (keyLength | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "keyLength must be an unsigned integer");
		}
		
		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		// ---------- input: salt (buf)
		
		salt = _any_to_Uint8Array(address_pool, salt, "salt");
		var salt_address, salt_length = (libsodium._crypto_pwhash_saltbytes()) | 0;
		if (salt.length !== salt_length) {
		        _free_and_throw_type_error(address_pool, "invalid salt length");
		}
		salt_address = _to_allocated_buf_address(salt);
		address_pool.push(salt_address);
		
		// ---------- input: opsLimit (uint)
		
		_require_defined(address_pool, opsLimit, "opsLimit");
		
		if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) && (opsLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
		}
		
		// ---------- input: memLimit (uint)
		
		_require_defined(address_pool, memLimit, "memLimit");
		
		if (!(typeof memLimit === "number" && (memLimit | 0) === memLimit) && (memLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "memLimit must be an unsigned integer");
		}
		
		// ---------- input: algorithm (uint)
		
		_require_defined(address_pool, algorithm, "algorithm");
		
		if (!(typeof algorithm === "number" && (algorithm | 0) === algorithm) && (algorithm | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "algorithm must be an unsigned integer");
		}
		
		// ---------- output derivedKey (buf)
		
		var derivedKey_length = (keyLength) | 0,
		    derivedKey = new AllocatedBuf(derivedKey_length),
		    derivedKey_address = derivedKey.address;
		
		address_pool.push(derivedKey_address);
		
		if ((libsodium._crypto_pwhash(derivedKey_address, keyLength, 0, password_address, password_length, 0, salt_address, opsLimit, 0, memLimit, algorithm) | 0) === 0) {
			var ret = _format_output(derivedKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_pwhash_scryptsalsa208sha256(keyLength, password, salt, opsLimit, memLimit, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: keyLength (uint)
		
		_require_defined(address_pool, keyLength, "keyLength");
		
		if (!(typeof keyLength === "number" && (keyLength | 0) === keyLength) && (keyLength | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "keyLength must be an unsigned integer");
		}
		
		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		// ---------- input: salt (buf)
		
		salt = _any_to_Uint8Array(address_pool, salt, "salt");
		var salt_address, salt_length = (libsodium._crypto_pwhash_scryptsalsa208sha256_saltbytes()) | 0;
		if (salt.length !== salt_length) {
		        _free_and_throw_type_error(address_pool, "invalid salt length");
		}
		salt_address = _to_allocated_buf_address(salt);
		address_pool.push(salt_address);
		
		// ---------- input: opsLimit (uint)
		
		_require_defined(address_pool, opsLimit, "opsLimit");
		
		if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) && (opsLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
		}
		
		// ---------- input: memLimit (uint)
		
		_require_defined(address_pool, memLimit, "memLimit");
		
		if (!(typeof memLimit === "number" && (memLimit | 0) === memLimit) && (memLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "memLimit must be an unsigned integer");
		}
		
		// ---------- output derivedKey (buf)
		
		var derivedKey_length = (keyLength) | 0,
		    derivedKey = new AllocatedBuf(derivedKey_length),
		    derivedKey_address = derivedKey.address;
		
		address_pool.push(derivedKey_address);
		
		if ((libsodium._crypto_pwhash_scryptsalsa208sha256(derivedKey_address, keyLength, 0, password_address, password_length, 0, salt_address, opsLimit, 0, memLimit) | 0) === 0) {
			var ret = _format_output(derivedKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_pwhash_scryptsalsa208sha256_ll(password, salt, opsLimit, r, p, keyLength, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		// ---------- input: salt (unsized_buf)
		
		salt = _any_to_Uint8Array(address_pool, salt, "salt");
		var salt_address = _to_allocated_buf_address(salt),
		    salt_length = salt.length;
		address_pool.push(salt_address);
		
		// ---------- input: opsLimit (uint)
		
		_require_defined(address_pool, opsLimit, "opsLimit");
		
		if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) && (opsLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
		}
		
		// ---------- input: r (uint)
		
		_require_defined(address_pool, r, "r");
		
		if (!(typeof r === "number" && (r | 0) === r) && (r | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "r must be an unsigned integer");
		}
		
		// ---------- input: p (uint)
		
		_require_defined(address_pool, p, "p");
		
		if (!(typeof p === "number" && (p | 0) === p) && (p | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "p must be an unsigned integer");
		}
		
		// ---------- input: keyLength (uint)
		
		_require_defined(address_pool, keyLength, "keyLength");
		
		if (!(typeof keyLength === "number" && (keyLength | 0) === keyLength) && (keyLength | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "keyLength must be an unsigned integer");
		}
		
		// ---------- output derivedKey (buf)
		
		var derivedKey_length = (keyLength) | 0,
		    derivedKey = new AllocatedBuf(derivedKey_length),
		    derivedKey_address = derivedKey.address;
		
		address_pool.push(derivedKey_address);
		
		if ((libsodium._crypto_pwhash_scryptsalsa208sha256_ll(password_address, password_length, salt_address, salt_length, opsLimit, 0, r, p, derivedKey_address, keyLength) | 0) === 0) {
			var ret = _format_output(derivedKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_pwhash_scryptsalsa208sha256_str(password, opsLimit, memLimit, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		// ---------- input: opsLimit (uint)
		
		_require_defined(address_pool, opsLimit, "opsLimit");
		
		if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) && (opsLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
		}
		
		// ---------- input: memLimit (uint)
		
		_require_defined(address_pool, memLimit, "memLimit");
		
		if (!(typeof memLimit === "number" && (memLimit | 0) === memLimit) && (memLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "memLimit must be an unsigned integer");
		}
		
		// ---------- output hashed_password (buf)
		
		var hashed_password_length = (libsodium._crypto_pwhash_scryptsalsa208sha256_strbytes()) | 0,
		    hashed_password = new AllocatedBuf(hashed_password_length),
		    hashed_password_address = hashed_password.address;
		
		address_pool.push(hashed_password_address);
		
		if ((libsodium._crypto_pwhash_scryptsalsa208sha256_str(hashed_password_address, password_address, password_length, 0, opsLimit, 0, memLimit) | 0) === 0) {
			var ret = libsodium.Pointer_stringify(hashed_password_address);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_pwhash_scryptsalsa208sha256_str_verify(hashed_password, password, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: hashed_password (string)
		
		hashed_password = from_string(hashed_password + "\0");
		var hashed_password_address = _to_allocated_buf_address(hashed_password),
		    hashed_password_length = hashed_password.length - 1;
		address_pool.push(hashed_password_address);
		
		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		var result = libsodium._crypto_pwhash_scryptsalsa208sha256_str_verify(hashed_password_address, password_address, password_length, 0) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_pwhash_str(password, opsLimit, memLimit, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		// ---------- input: opsLimit (uint)
		
		_require_defined(address_pool, opsLimit, "opsLimit");
		
		if (!(typeof opsLimit === "number" && (opsLimit | 0) === opsLimit) && (opsLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "opsLimit must be an unsigned integer");
		}
		
		// ---------- input: memLimit (uint)
		
		_require_defined(address_pool, memLimit, "memLimit");
		
		if (!(typeof memLimit === "number" && (memLimit | 0) === memLimit) && (memLimit | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "memLimit must be an unsigned integer");
		}
		
		// ---------- output hashed_password (buf)
		
		var hashed_password_length = (libsodium._crypto_pwhash_strbytes()) | 0,
		    hashed_password = new AllocatedBuf(hashed_password_length),
		    hashed_password_address = hashed_password.address;
		
		address_pool.push(hashed_password_address);
		
		if ((libsodium._crypto_pwhash_str(hashed_password_address, password_address, password_length, 0, opsLimit, 0, memLimit) | 0) === 0) {
			var ret = libsodium.Pointer_stringify(hashed_password_address);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_pwhash_str_verify(hashed_password, password, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: hashed_password (string)
		
		hashed_password = from_string(hashed_password + "\0");
		var hashed_password_address = _to_allocated_buf_address(hashed_password),
		    hashed_password_length = hashed_password.length - 1;
		address_pool.push(hashed_password_address);
		
		// ---------- input: password (unsized_buf)
		
		password = _any_to_Uint8Array(address_pool, password, "password");
		var password_address = _to_allocated_buf_address(password),
		    password_length = password.length;
		address_pool.push(password_address);
		
		var result = libsodium._crypto_pwhash_str_verify(hashed_password_address, password_address, password_length, 0) | 0;
		var ret = (result === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_scalarmult(privateKey, publicKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- output sharedSecret (buf)
		
		var sharedSecret_length = (libsodium._crypto_scalarmult_bytes()) | 0,
		    sharedSecret = new AllocatedBuf(sharedSecret_length),
		    sharedSecret_address = sharedSecret.address;
		
		address_pool.push(sharedSecret_address);
		
		if ((libsodium._crypto_scalarmult(sharedSecret_address, privateKey_address, publicKey_address) | 0) === 0) {
			var ret = _format_output(sharedSecret, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_scalarmult_base(privateKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		if ((libsodium._crypto_scalarmult_base(publicKey_address, privateKey_address) | 0) === 0) {
			var ret = _format_output(publicKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_secretbox_detached(message, nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_secretbox_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_secretbox_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output cipher (buf)
		
		var cipher_length = (message_length) | 0,
		    cipher = new AllocatedBuf(cipher_length),
		    cipher_address = cipher.address;
		
		address_pool.push(cipher_address);
		
		// ---------- output mac (buf)
		
		var mac_length = (libsodium._crypto_secretbox_macbytes()) | 0,
		    mac = new AllocatedBuf(mac_length),
		    mac_address = mac.address;
		
		address_pool.push(mac_address);
		
		if ((libsodium._crypto_secretbox_detached(cipher_address, mac_address, message_address, message_length, 0, nonce_address, key_address) | 0) === 0) {
			var ret = _format_output({mac: mac, cipher: cipher}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_secretbox_easy(message, nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_secretbox_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_secretbox_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output cipher (buf)
		
		var cipher_length = (message_length + libsodium._crypto_secretbox_macbytes()) | 0,
		    cipher = new AllocatedBuf(cipher_length),
		    cipher_address = cipher.address;
		
		address_pool.push(cipher_address);
		
		if ((libsodium._crypto_secretbox_easy(cipher_address, message_address, message_length, 0, nonce_address, key_address) | 0) === 0) {
			var ret = _format_output(cipher, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_secretbox_open_detached(ciphertext, mac, nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: mac (buf)
		
		mac = _any_to_Uint8Array(address_pool, mac, "mac");
		var mac_address, mac_length = (libsodium._crypto_secretbox_macbytes()) | 0;
		if (mac.length !== mac_length) {
		        _free_and_throw_type_error(address_pool, "invalid mac length");
		}
		mac_address = _to_allocated_buf_address(mac);
		address_pool.push(mac_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_secretbox_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_secretbox_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_secretbox_open_detached(message_address, ciphertext_address, mac_address, ciphertext_length, 0, nonce_address, key_address) | 0) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_secretbox_open_easy(ciphertext, nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: ciphertext (unsized_buf)
		
		ciphertext = _any_to_Uint8Array(address_pool, ciphertext, "ciphertext");
		var ciphertext_address = _to_allocated_buf_address(ciphertext),
		    ciphertext_length = ciphertext.length;
		address_pool.push(ciphertext_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_secretbox_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_secretbox_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output message (buf)
		
		var message_length = (ciphertext_length - libsodium._crypto_secretbox_macbytes()) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_secretbox_open_easy(message_address, ciphertext_address, ciphertext_length, 0, nonce_address, key_address) | 0) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_shorthash(message, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_shorthash_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output hash (buf)
		
		var hash_length = (libsodium._crypto_shorthash_bytes()) | 0,
		    hash = new AllocatedBuf(hash_length),
		    hash_address = hash.address;
		
		address_pool.push(hash_address);
		
		if ((libsodium._crypto_shorthash(hash_address, message_address, message_length, 0, key_address) | 0) === 0) {
			var ret = _format_output(hash, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign(message, privateKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- output signature (buf)
		
		var signature_length = (message.length + libsodium._crypto_sign_bytes()) | 0,
		    signature = new AllocatedBuf(signature_length),
		    signature_address = signature.address;
		
		address_pool.push(signature_address);
		
		if ((libsodium._crypto_sign(signature_address, null, message_address, message_length, 0, privateKey_address) | 0) === 0) {
			var ret = _format_output(signature, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_detached(message, privateKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- output signature (buf)
		
		var signature_length = (libsodium._crypto_sign_bytes()) | 0,
		    signature = new AllocatedBuf(signature_length),
		    signature_address = signature.address;
		
		address_pool.push(signature_address);
		
		if ((libsodium._crypto_sign_detached(signature_address, null, message_address, message_length, 0, privateKey_address) | 0) === 0) {
			var ret = _format_output(signature, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_ed25519_pk_to_curve25519(edPk, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: edPk (buf)
		
		edPk = _any_to_Uint8Array(address_pool, edPk, "edPk");
		var edPk_address, edPk_length = (libsodium._crypto_sign_publickeybytes()) | 0;
		if (edPk.length !== edPk_length) {
		        _free_and_throw_type_error(address_pool, "invalid edPk length");
		}
		edPk_address = _to_allocated_buf_address(edPk);
		address_pool.push(edPk_address);
		
		// ---------- output cPk (buf)
		
		var cPk_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0,
		    cPk = new AllocatedBuf(cPk_length),
		    cPk_address = cPk.address;
		
		address_pool.push(cPk_address);
		
		if ((libsodium._crypto_sign_ed25519_pk_to_curve25519(cPk_address, edPk_address) | 0) === 0) {
			var ret = _format_output(cPk, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_ed25519_sk_to_curve25519(edSk, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: edSk (buf)
		
		edSk = _any_to_Uint8Array(address_pool, edSk, "edSk");
		var edSk_address, edSk_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
		if (edSk.length !== edSk_length) {
		        _free_and_throw_type_error(address_pool, "invalid edSk length");
		}
		edSk_address = _to_allocated_buf_address(edSk);
		address_pool.push(edSk_address);
		
		// ---------- output cSk (buf)
		
		var cSk_length = (libsodium._crypto_scalarmult_scalarbytes()) | 0,
		    cSk = new AllocatedBuf(cSk_length),
		    cSk_address = cSk.address;
		
		address_pool.push(cSk_address);
		
		if ((libsodium._crypto_sign_ed25519_sk_to_curve25519(cSk_address, edSk_address) | 0) === 0) {
			var ret = _format_output(cSk, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_ed25519_sk_to_pk(privateKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		if ((libsodium._crypto_sign_ed25519_sk_to_pk(publicKey_address, privateKey_address) | 0) === 0) {
			var ret = _format_output(publicKey, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_ed25519_sk_to_seed(privateKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: privateKey (buf)
		
		privateKey = _any_to_Uint8Array(address_pool, privateKey, "privateKey");
		var privateKey_address, privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0;
		if (privateKey.length !== privateKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid privateKey length");
		}
		privateKey_address = _to_allocated_buf_address(privateKey);
		address_pool.push(privateKey_address);
		
		// ---------- output seed (buf)
		
		var seed_length = (libsodium._crypto_sign_seedbytes()) | 0,
		    seed = new AllocatedBuf(seed_length),
		    seed_address = seed.address;
		
		address_pool.push(seed_address);
		
		if ((libsodium._crypto_sign_ed25519_sk_to_seed(seed_address, privateKey_address) | 0) === 0) {
			var ret = _format_output(seed, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_keypair(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		// ---------- output privateKey (buf)
		
		var privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0,
		    privateKey = new AllocatedBuf(privateKey_length),
		    privateKey_address = privateKey.address;
		
		address_pool.push(privateKey_address);
		
		if ((libsodium._crypto_sign_keypair(publicKey_address, privateKey_address) | 0) === 0) {
			var ret = _format_output({publicKey: publicKey, privateKey: privateKey, keyType: 'ed25519'}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_open(signedMessage, publicKey, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: signedMessage (unsized_buf)
		
		signedMessage = _any_to_Uint8Array(address_pool, signedMessage, "signedMessage");
		var signedMessage_address = _to_allocated_buf_address(signedMessage),
		    signedMessage_length = signedMessage.length;
		address_pool.push(signedMessage_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		// ---------- output message (buf)
		
		var message_length = (signedMessage_length - libsodium._crypto_sign_bytes()) | 0,
		    message = new AllocatedBuf(message_length),
		    message_address = message.address;
		
		address_pool.push(message_address);
		
		if ((libsodium._crypto_sign_open(message_address, null, signedMessage_address, signedMessage_length, 0, publicKey_address) | 0) === 0) {
			var ret = _format_output(message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_seed_keypair(seed, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: seed (buf)
		
		seed = _any_to_Uint8Array(address_pool, seed, "seed");
		var seed_address, seed_length = (libsodium._crypto_sign_seedbytes()) | 0;
		if (seed.length !== seed_length) {
		        _free_and_throw_type_error(address_pool, "invalid seed length");
		}
		seed_address = _to_allocated_buf_address(seed);
		address_pool.push(seed_address);
		
		// ---------- output publicKey (buf)
		
		var publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0,
		    publicKey = new AllocatedBuf(publicKey_length),
		    publicKey_address = publicKey.address;
		
		address_pool.push(publicKey_address);
		
		// ---------- output privateKey (buf)
		
		var privateKey_length = (libsodium._crypto_sign_secretkeybytes()) | 0,
		    privateKey = new AllocatedBuf(privateKey_length),
		    privateKey_address = privateKey.address;
		
		address_pool.push(privateKey_address);
		
		if ((libsodium._crypto_sign_seed_keypair(publicKey_address, privateKey_address, seed_address) | 0) === 0) {
			var ret = _format_output({publicKey: publicKey, privateKey: privateKey, keyType: "ed25519"}, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_sign_verify_detached(signature, message, publicKey) {
		var address_pool = [];

		// ---------- input: signature (buf)
		
		signature = _any_to_Uint8Array(address_pool, signature, "signature");
		var signature_address, signature_length = (libsodium._crypto_sign_bytes()) | 0;
		if (signature.length !== signature_length) {
		        _free_and_throw_type_error(address_pool, "invalid signature length");
		}
		signature_address = _to_allocated_buf_address(signature);
		address_pool.push(signature_address);
		
		// ---------- input: message (unsized_buf)
		
		message = _any_to_Uint8Array(address_pool, message, "message");
		var message_address = _to_allocated_buf_address(message),
		    message_length = message.length;
		address_pool.push(message_address);
		
		// ---------- input: publicKey (buf)
		
		publicKey = _any_to_Uint8Array(address_pool, publicKey, "publicKey");
		var publicKey_address, publicKey_length = (libsodium._crypto_sign_publickeybytes()) | 0;
		if (publicKey.length !== publicKey_length) {
		        _free_and_throw_type_error(address_pool, "invalid publicKey length");
		}
		publicKey_address = _to_allocated_buf_address(publicKey);
		address_pool.push(publicKey_address);
		
		var verificationResult = libsodium._crypto_sign_verify_detached(signature_address, message_address, message_length, 0, publicKey_address) | 0;
		var ret = (verificationResult === 0);
		_free_all(address_pool);
		return ret;
		
	}

	function crypto_stream_chacha20_xor(input_message, nonce, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: input_message (unsized_buf)
		
		input_message = _any_to_Uint8Array(address_pool, input_message, "input_message");
		var input_message_address = _to_allocated_buf_address(input_message),
		    input_message_length = input_message.length;
		address_pool.push(input_message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_stream_chacha20_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_stream_chacha20_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output output_message (buf)
		
		var output_message_length = (input_message_length) | 0,
		    output_message = new AllocatedBuf(output_message_length),
		    output_message_address = output_message.address;
		
		address_pool.push(output_message_address);
		
		if ((libsodium._crypto_stream_chacha20_xor(output_message_address, input_message_address, input_message_length, 0, nonce_address, key_address)) === 0) {
			var ret = _format_output(output_message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function crypto_stream_chacha20_xor_ic(input_message, nonce, nonce_increment, key, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: input_message (unsized_buf)
		
		input_message = _any_to_Uint8Array(address_pool, input_message, "input_message");
		var input_message_address = _to_allocated_buf_address(input_message),
		    input_message_length = input_message.length;
		address_pool.push(input_message_address);
		
		// ---------- input: nonce (buf)
		
		nonce = _any_to_Uint8Array(address_pool, nonce, "nonce");
		var nonce_address, nonce_length = (libsodium._crypto_stream_chacha20_noncebytes()) | 0;
		if (nonce.length !== nonce_length) {
		        _free_and_throw_type_error(address_pool, "invalid nonce length");
		}
		nonce_address = _to_allocated_buf_address(nonce);
		address_pool.push(nonce_address);
		
		// ---------- input: nonce_increment (uint)
		
		_require_defined(address_pool, nonce_increment, "nonce_increment");
		
		if (!(typeof nonce_increment === "number" && (nonce_increment | 0) === nonce_increment) && (nonce_increment | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "nonce_increment must be an unsigned integer");
		}
		
		// ---------- input: key (buf)
		
		key = _any_to_Uint8Array(address_pool, key, "key");
		var key_address, key_length = (libsodium._crypto_stream_chacha20_keybytes()) | 0;
		if (key.length !== key_length) {
		        _free_and_throw_type_error(address_pool, "invalid key length");
		}
		key_address = _to_allocated_buf_address(key);
		address_pool.push(key_address);
		
		// ---------- output output_message (buf)
		
		var output_message_length = (input_message_length) | 0,
		    output_message = new AllocatedBuf(output_message_length),
		    output_message_address = output_message.address;
		
		address_pool.push(output_message_address);
		
		if ((libsodium._crypto_stream_chacha20_xor_ic(output_message_address, input_message_address, input_message_length, 0, nonce_address, nonce_increment, 0, key_address)) === 0) {
			var ret = _format_output(output_message, outputFormat);
			_free_all(address_pool);
			return ret;
		}
		_free_and_throw_error(address_pool);
		
	}

	function randombytes_buf(length, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: length (uint)
		
		_require_defined(address_pool, length, "length");
		
		if (!(typeof length === "number" && (length | 0) === length) && (length | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "length must be an unsigned integer");
		}
		
		// ---------- output output (buf)
		
		var output_length = (length) | 0,
		    output = new AllocatedBuf(output_length),
		    output_address = output.address;
		
		address_pool.push(output_address);
		
		libsodium._randombytes_buf(output_address, length);
		var ret = (_format_output(output, outputFormat));
		_free_all(address_pool);
		return ret;
		
	}

	function randombytes_close(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		libsodium._randombytes_close();
		
	}

	function randombytes_random(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		var random_value = libsodium._randombytes_random() >>> 0;
		var ret = (random_value);
		_free_all(address_pool);
		return ret;
		
	}

	function randombytes_set_implementation(implementation, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: implementation (randombytes_implementation)
		
		var implementation_address = libsodium._malloc(6 * 4);
		for (var i = 0; i < 6; i++) {
		        libsodium.setValue(implementation_address + i * 4,
		            libsodium.Runtime.addFunction(implementation
		            [["implementation_name", "random", "stir", "uniform", "buf", "close"][i]]),
		            "i32");
		}
		
		if ((libsodium._randombytes_set_implementation(implementation_address) | 0) === 0) {
			_free_all(address_pool);
			return;
		}
		_free_and_throw_error(address_pool);
		
	}

	function randombytes_stir(outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		libsodium._randombytes_stir();
		
	}

	function randombytes_uniform(upper_bound, outputFormat) {
		var address_pool = [];
		_check_output_format(outputFormat);

		// ---------- input: upper_bound (uint)
		
		_require_defined(address_pool, upper_bound, "upper_bound");
		
		if (!(typeof upper_bound === "number" && (upper_bound | 0) === upper_bound) && (upper_bound | 0) > 0) {
		        _free_and_throw_type_error(address_pool, "upper_bound must be an unsigned integer");
		}
		
		var random_value = libsodium._randombytes_uniform(upper_bound) >>> 0;
		var ret = (random_value);
		_free_all(address_pool);
		return ret;
		
	}

	function sodium_version_string() {
		var address_pool = [];

		var version = libsodium._sodium_version_string();
		var ret = (libsodium.Pointer_stringify(version));
		_free_all(address_pool);
		return ret;
		
	}


    exports.add = add;
    exports.compare = compare;
    exports.from_base64 = from_base64;
    exports.from_hex = from_hex;
    exports.from_string = from_string;
    exports.increment = increment;
    exports.is_zero = is_zero;
    exports.libsodium = libsodium;
    exports.memcmp = memcmp;
    exports.memzero = memzero;
    exports.output_formats = output_formats;
    exports.symbols = symbols;
    exports.to_base64 = to_base64;
    exports.to_hex = to_hex;
    exports.to_string = to_string;

    
	var exported_functions = ["crypto_aead_chacha20poly1305_decrypt", "crypto_aead_chacha20poly1305_decrypt_detached", "crypto_aead_chacha20poly1305_encrypt", "crypto_aead_chacha20poly1305_encrypt_detached", "crypto_aead_chacha20poly1305_ietf_decrypt", "crypto_aead_chacha20poly1305_ietf_decrypt_detached", "crypto_aead_chacha20poly1305_ietf_encrypt", "crypto_aead_chacha20poly1305_ietf_encrypt_detached", "crypto_auth", "crypto_auth_hmacsha256", "crypto_auth_hmacsha256_verify", "crypto_auth_hmacsha512", "crypto_auth_hmacsha512_verify", "crypto_auth_verify", "crypto_box_beforenm", "crypto_box_detached", "crypto_box_easy", "crypto_box_easy_afternm", "crypto_box_keypair", "crypto_box_open_detached", "crypto_box_open_easy", "crypto_box_open_easy_afternm", "crypto_box_seal", "crypto_box_seal_open", "crypto_box_seed_keypair", "crypto_generichash", "crypto_generichash_final", "crypto_generichash_init", "crypto_generichash_update", "crypto_hash", "crypto_hash_sha256", "crypto_hash_sha512", "crypto_onetimeauth", "crypto_onetimeauth_final", "crypto_onetimeauth_init", "crypto_onetimeauth_update", "crypto_onetimeauth_verify", "crypto_pwhash", "crypto_pwhash_scryptsalsa208sha256", "crypto_pwhash_scryptsalsa208sha256_ll", "crypto_pwhash_scryptsalsa208sha256_str", "crypto_pwhash_scryptsalsa208sha256_str_verify", "crypto_pwhash_str", "crypto_pwhash_str_verify", "crypto_scalarmult", "crypto_scalarmult_base", "crypto_secretbox_detached", "crypto_secretbox_easy", "crypto_secretbox_open_detached", "crypto_secretbox_open_easy", "crypto_shorthash", "crypto_sign", "crypto_sign_detached", "crypto_sign_ed25519_pk_to_curve25519", "crypto_sign_ed25519_sk_to_curve25519", "crypto_sign_ed25519_sk_to_pk", "crypto_sign_ed25519_sk_to_seed", "crypto_sign_keypair", "crypto_sign_open", "crypto_sign_seed_keypair", "crypto_sign_verify_detached", "crypto_stream_chacha20_xor", "crypto_stream_chacha20_xor_ic", "randombytes_buf", "randombytes_close", "randombytes_random", "randombytes_set_implementation", "randombytes_stir", "randombytes_uniform", "sodium_version_string"],
	      functions = [crypto_aead_chacha20poly1305_decrypt, crypto_aead_chacha20poly1305_decrypt_detached, crypto_aead_chacha20poly1305_encrypt, crypto_aead_chacha20poly1305_encrypt_detached, crypto_aead_chacha20poly1305_ietf_decrypt, crypto_aead_chacha20poly1305_ietf_decrypt_detached, crypto_aead_chacha20poly1305_ietf_encrypt, crypto_aead_chacha20poly1305_ietf_encrypt_detached, crypto_auth, crypto_auth_hmacsha256, crypto_auth_hmacsha256_verify, crypto_auth_hmacsha512, crypto_auth_hmacsha512_verify, crypto_auth_verify, crypto_box_beforenm, crypto_box_detached, crypto_box_easy, crypto_box_easy_afternm, crypto_box_keypair, crypto_box_open_detached, crypto_box_open_easy, crypto_box_open_easy_afternm, crypto_box_seal, crypto_box_seal_open, crypto_box_seed_keypair, crypto_generichash, crypto_generichash_final, crypto_generichash_init, crypto_generichash_update, crypto_hash, crypto_hash_sha256, crypto_hash_sha512, crypto_onetimeauth, crypto_onetimeauth_final, crypto_onetimeauth_init, crypto_onetimeauth_update, crypto_onetimeauth_verify, crypto_pwhash, crypto_pwhash_scryptsalsa208sha256, crypto_pwhash_scryptsalsa208sha256_ll, crypto_pwhash_scryptsalsa208sha256_str, crypto_pwhash_scryptsalsa208sha256_str_verify, crypto_pwhash_str, crypto_pwhash_str_verify, crypto_scalarmult, crypto_scalarmult_base, crypto_secretbox_detached, crypto_secretbox_easy, crypto_secretbox_open_detached, crypto_secretbox_open_easy, crypto_shorthash, crypto_sign, crypto_sign_detached, crypto_sign_ed25519_pk_to_curve25519, crypto_sign_ed25519_sk_to_curve25519, crypto_sign_ed25519_sk_to_pk, crypto_sign_ed25519_sk_to_seed, crypto_sign_keypair, crypto_sign_open, crypto_sign_seed_keypair, crypto_sign_verify_detached, crypto_stream_chacha20_xor, crypto_stream_chacha20_xor_ic, randombytes_buf, randombytes_close, randombytes_random, randombytes_set_implementation, randombytes_stir, randombytes_uniform, sodium_version_string];
	for (var i = 0; i < functions.length; i++) {
		if (typeof libsodium["_" + exported_functions[i]] === "function") {
			exports[exported_functions[i]] = functions[i];
		}
	}
	var constants = ["SODIUM_LIBRARY_VERSION_MAJOR", "SODIUM_LIBRARY_VERSION_MINOR", "crypto_aead_chacha20poly1305_ABYTES", "crypto_aead_chacha20poly1305_KEYBYTES", "crypto_aead_chacha20poly1305_NPUBBYTES", "crypto_aead_chacha20poly1305_NSECBYTES", "crypto_aead_chacha20poly1305_ietf_ABYTES", "crypto_aead_chacha20poly1305_ietf_KEYBYTES", "crypto_aead_chacha20poly1305_ietf_NPUBBYTES", "crypto_aead_chacha20poly1305_ietf_NSECBYTES", "crypto_auth_BYTES", "crypto_auth_KEYBYTES", "crypto_auth_hmacsha256_BYTES", "crypto_auth_hmacsha256_KEYBYTES", "crypto_auth_hmacsha512_BYTES", "crypto_auth_hmacsha512_KEYBYTES", "crypto_box_BEFORENMBYTES", "crypto_box_MACBYTES", "crypto_box_NONCEBYTES", "crypto_box_PUBLICKEYBYTES", "crypto_box_SEALBYTES", "crypto_box_SECRETKEYBYTES", "crypto_box_SEEDBYTES", "crypto_generichash_BYTES", "crypto_generichash_BYTES_MAX", "crypto_generichash_BYTES_MIN", "crypto_generichash_KEYBYTES", "crypto_generichash_KEYBYTES_MAX", "crypto_generichash_KEYBYTES_MIN", "crypto_hash_BYTES", "crypto_onetimeauth_BYTES", "crypto_onetimeauth_KEYBYTES", "crypto_pwhash_ALG_ARGON2I13", "crypto_pwhash_ALG_DEFAULT", "crypto_pwhash_MEMLIMIT_INTERACTIVE", "crypto_pwhash_MEMLIMIT_MODERATE", "crypto_pwhash_MEMLIMIT_SENSITIVE", "crypto_pwhash_OPSLIMIT_INTERACTIVE", "crypto_pwhash_OPSLIMIT_MODERATE", "crypto_pwhash_OPSLIMIT_SENSITIVE", "crypto_pwhash_SALTBYTES", "crypto_pwhash_STRBYTES", "crypto_pwhash_STR_VERIFY", "crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_INTERACTIVE", "crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_SENSITIVE", "crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_INTERACTIVE", "crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_SENSITIVE", "crypto_pwhash_scryptsalsa208sha256_SALTBYTES", "crypto_pwhash_scryptsalsa208sha256_STRBYTES", "crypto_pwhash_scryptsalsa208sha256_STR_VERIFY", "crypto_scalarmult_BYTES", "crypto_scalarmult_SCALARBYTES", "crypto_secretbox_KEYBYTES", "crypto_secretbox_MACBYTES", "crypto_secretbox_NONCEBYTES", "crypto_shorthash_BYTES", "crypto_shorthash_KEYBYTES", "crypto_sign_BYTES", "crypto_sign_PUBLICKEYBYTES", "crypto_sign_SECRETKEYBYTES", "crypto_sign_SEEDBYTES", "crypto_stream_chacha20_KEYBYTES", "crypto_stream_chacha20_NONCEBYTES"];
	for (var i = 0; i < constants.length; i++) {
		var raw = libsodium["_" + constants[i].toLowerCase()];
		if (typeof raw === "function") exports[constants[i]] = raw()|0;
	}
	var constants_str = ["SODIUM_VERSION_STRING", "crypto_pwhash_STRPREFIX", "crypto_pwhash_scryptsalsa208sha256_STRPREFIX"];
	for (var i = 0; i < constants_str.length; i++) {
		var raw = libsodium["_" + constants_str[i].toLowerCase()];
		if (typeof raw === "function") exports[constants_str[i]] = libsodium.Pointer_stringify(raw());
	}

    return exports;
})));
