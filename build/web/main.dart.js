(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
return y.__proto__&&y.__proto__.p===z.prototype.p}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isi=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$ish)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="i"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="static"){processStatics(init.statics[b1]=b2.static,b3)
delete b2.static}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$defaultValues=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$signature=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$defaultValues=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.dJ"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.dJ"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.dJ(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.ct=function(){}
var dart=[["","",,L,{
"^":"",
K:function(a,b,c,d){var z,y,x
z=W.eP(null,null,null)
y=S.fj(z,b,1,1,6,8,18,10,1)
x=new S.jB(null,P.C())
x.eq(0,"load",new L.o6(d,y))
x.eq(0,"error",new L.o7(c))
x.b=$.nT
x.jO(0,a,z)
return y},
o6:{
"^":"k:0;a,b",
$1:function(a){var z=this.b
z.b=J.hw(a)
z.db=!0}},
o7:{
"^":"k:0;a",
$1:function(a){}}}],["","",,H,{
"^":"",
pt:{
"^":"i;a"}}],["","",,J,{
"^":"",
v:function(a){return void 0},
cy:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
cu:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.dM==null){H.nZ()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.d(new P.cl("Return interceptor for "+H.l(y(a,z))))}w=H.o8(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.E
else return C.F}return w},
h:{
"^":"i;",
O:function(a,b){return a===b},
gah:function(a){return H.aS(a)},
t:["fX",function(a){return H.cd(a)}],
"%":"ANGLEInstancedArrays|Animation|AnimationEffect|AnimationNode|AnimationTimeline|AudioListener|CSS|Cache|CacheStorage|CanvasGradient|CanvasPattern|ConsoleBase|Coordinates|Counter|CredentialsContainer|Crypto|DOMError|DOMFileSystem|DOMFileSystemSync|DOMImplementation|DOMParser|DataTransfer|Database|DeprecatedStorageInfo|DeprecatedStorageQuota|DeviceRotationRate|DirectoryEntrySync|DirectoryReader|DirectoryReaderSync|EXTBlendMinMax|EXTFragDepth|EXTShaderTextureLOD|EXTTextureFilterAnisotropic|EntrySync|FileEntrySync|FileError|FileReaderSync|FileWriterSync|FormData|Geofencing|Geolocation|Geoposition|HTMLAllCollection|IDBFactory|IDBKeyRange|ImageBitmap|InjectedScriptHost|MediaDeviceInfo|MediaError|MediaKeyError|MediaKeys|MemoryInfo|MessageChannel|MutationObserver|NavigatorUserMediaError|NodeFilter|NodeIterator|OESElementIndexUint|OESStandardDerivatives|OESTextureFloat|OESTextureFloatLinear|OESTextureHalfFloat|OESTextureHalfFloatLinear|OESVertexArrayObject|PagePopupController|PerformanceEntry|PerformanceMark|PerformanceMeasure|PerformanceResourceTiming|PerformanceTiming|PeriodicWave|PositionError|PushManager|PushRegistration|RGBColor|RTCIceCandidate|RTCStatsResponse|Range|ReadableStream|Rect|SQLError|SQLResultSet|SQLTransaction|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGPreserveAspectRatio|SVGRenderingIntent|SVGUnitTypes|Screen|ServiceWorkerClients|ServiceWorkerContainer|SpeechRecognitionAlternative|SpeechSynthesisVoice|StorageInfo|StorageQuota|SubtleCrypto|TextMetrics|Timing|TreeWalker|ValidityState|VideoPlaybackQuality|WebGLBuffer|WebGLCompressedTextureATC|WebGLCompressedTextureETC1|WebGLCompressedTexturePVRTC|WebGLCompressedTextureS3TC|WebGLContextAttributes|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLDepthTexture|WebGLDrawBuffers|WebGLExtensionLoseContext|WebGLFramebuffer|WebGLLoseContext|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLShaderPrecisionFormat|WebGLTexture|WebGLUniformLocation|WebGLVertexArrayObjectOES|WebKitCSSMatrix|WebKitMutationObserver|WorkerConsole|WorkerPerformance|XMLSerializer|XPathEvaluator|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor|mozRTCIceCandidate"},
ky:{
"^":"h;",
t:function(a){return String(a)},
gah:function(a){return a?519018:218159},
$isdI:1},
eU:{
"^":"h;",
O:function(a,b){return null==b},
t:function(a){return"null"},
gah:function(a){return 0}},
eV:{
"^":"h;",
gah:function(a){return 0},
$iskA:1},
l2:{
"^":"eV;"},
dv:{
"^":"eV;",
t:function(a){return String(a)}},
bD:{
"^":"h;",
ez:function(a,b){if(!!a.immutable$list)throw H.d(new P.t(b))},
bJ:function(a,b){if(!!a.fixed$length)throw H.d(new P.t(b))},
u:function(a,b){this.bJ(a,"add")
a.push(b)},
aX:function(a,b){this.bJ(a,"removeAt")
if(b<0||b>=a.length)throw H.d(P.bI(b,null,null))
return a.splice(b,1)[0]},
hM:function(a,b,c){var z,y,x,w,v
z=[]
y=a.length
for(x=0;x<y;++x){w=a[x]
if(b.$1(w)!==!0===c)z.push(w)
if(a.length!==y)throw H.d(new P.aa(a))}v=z.length
if(v===y)return
this.sj(a,v)
for(x=0;x<z.length;++x)this.k(a,x,z[x])},
bd:function(a,b){var z,y
this.bJ(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.dU)(b),++y)a.push(b[y])},
G:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.d(new P.aa(a))}},
b8:function(a,b){return H.o(new H.b5(a,b),[null,null])},
v:function(a,b){var z,y,x,w
z=a.length
y=Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.l(a[x])
if(x>=z)return H.a(y,x)
y[x]=w}return y.join(b)},
jK:function(a){return this.v(a,"")},
jf:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.d(new P.aa(a))}return y},
H:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
gje:function(a){if(a.length>0)return a[0]
throw H.d(H.eS())},
bE:function(a,b,c,d,e){var z,y,x
this.ez(a,"set range")
P.f8(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.S(P.aT(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.d(H.kx())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.a(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.a(d,x)
a[b+y]=d[x]}},
c4:function(a,b){this.ez(a,"sort")
H.bJ(a,0,a.length-1,b)},
jv:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.a7(a[z],b))return z
return-1},
b7:function(a,b){return this.jv(a,b,0)},
t:function(a){return P.c2(a,"[","]")},
aD:function(a,b){var z
if(b)z=H.o(a.slice(),[H.V(a,0)])
else{z=H.o(a.slice(),[H.V(a,0)])
z.fixed$length=Array
z=z}return z},
aq:function(a){return this.aD(a,!0)},
ga5:function(a){return new J.cO(a,a.length,0,null)},
gah:function(a){return H.aS(a)},
gj:function(a){return a.length},
sj:function(a,b){this.bJ(a,"set length")
if(b<0)throw H.d(P.aT(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.a2(a,b))
if(b>=a.length||b<0)throw H.d(H.a2(a,b))
return a[b]},
k:function(a,b,c){if(!!a.immutable$list)H.S(new P.t("indexed set"))
if(b>=a.length||b<0)throw H.d(H.a2(a,b))
a[b]=c},
$isO:1,
$isc:1,
$asc:null,
$ism:1},
ps:{
"^":"bD;"},
cO:{
"^":"i;a,b,c,d",
gV:function(){return this.d},
M:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.d(new P.aa(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
bE:{
"^":"h;",
iC:function(a,b){var z
if(typeof b!=="number")throw H.d(H.a1(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gbw(b)
if(this.gbw(a)===z)return 0
if(this.gbw(a))return-1
return 1}return 0}else if(isNaN(a)){if(this.geM(b))return 0
return 1}else return-1},
gbw:function(a){return a===0?1/a<0:a<0},
geM:function(a){return isNaN(a)},
gjI:function(a){return a==1/0||a==-1/0},
dc:function(a,b){return a%b},
a2:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.d(new P.t(""+a))},
dg:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.d(new P.t(""+a))},
ku:function(a){return a},
bY:function(a,b){var z
H.nI(b)
if(b>20)throw H.d(P.aT(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gbw(a))return"-"+z
return z},
t:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gah:function(a){return a&0x1FFFFFFF},
aN:function(a){return-a},
p:function(a,b){if(typeof b!=="number")throw H.d(H.a1(b))
return a+b},
aa:function(a,b){if(typeof b!=="number")throw H.d(H.a1(b))
return a-b},
a3:function(a,b){if(typeof b!=="number")throw H.d(H.a1(b))
return a*b},
aR:function(a,b){return(a|0)===a?a/b|0:this.a2(a/b)},
em:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
b_:function(a,b){if(typeof b!=="number")throw H.d(H.a1(b))
return a<b},
aE:function(a,b){if(typeof b!=="number")throw H.d(H.a1(b))
return a>b},
cp:function(a,b){if(typeof b!=="number")throw H.d(H.a1(b))
return a<=b},
ai:function(a,b){if(typeof b!=="number")throw H.d(H.a1(b))
return a>=b},
$isaI:1},
eT:{
"^":"bE;",
$isbq:1,
$isaI:1,
$isE:1},
kz:{
"^":"bE;",
$isbq:1,
$isaI:1},
c4:{
"^":"h;",
iz:function(a,b){if(b>=a.length)throw H.d(H.a2(a,b))
return a.charCodeAt(b)},
p:function(a,b){if(typeof b!=="string")throw H.d(P.ii(b,null,null))
return a+b},
dJ:function(a,b,c){var z
if(typeof b!=="number"||Math.floor(b)!==b)H.S(H.a1(b))
if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.S(H.a1(c))
z=J.as(b)
if(z.b_(b,0))throw H.d(P.bI(b,null,null))
if(z.aE(b,c))throw H.d(P.bI(b,null,null))
if(J.a8(c,a.length))throw H.d(P.bI(c,null,null))
return a.substring(b,c)},
fW:function(a,b){return this.dJ(a,b,null)},
a3:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.d(C.q)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
iJ:function(a,b,c){if(c>a.length)throw H.d(P.aT(c,0,a.length,null,null))
return H.oh(a,b,c)},
gaL:function(a){return a.length===0},
t:function(a){return a},
gah:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gj:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.a2(a,b))
if(b>=a.length||b<0)throw H.d(H.a2(a,b))
return a[b]},
$isO:1,
$isU:1}}],["","",,H,{
"^":"",
bM:function(a,b){var z=a.bN(b)
if(!init.globalState.d.cy)init.globalState.f.bX()
return z},
cx:function(){--init.globalState.f.b},
hb:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
b=b
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.v(y).$isc)throw H.d(P.ax("Arguments to main must be a List: "+H.l(y)))
init.globalState=new H.n1(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
if(!v)w=w!=null&&$.$get$eQ()!=null
else w=!0
y.y=w
y.r=x&&!v
y.f=new H.mC(P.d4(null,H.bL),0)
y.z=P.c6(null,null,null,P.E,H.dE)
y.ch=P.c6(null,null,null,P.E,null)
if(y.x===!0){x=new H.n0()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.kq,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.n2)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=P.c6(null,null,null,P.E,H.ce)
w=P.bi(null,null,null,P.E)
v=new H.ce(0,null,!1)
u=new H.dE(y,x,w,init.createNewIsolate(),v,new H.b1(H.cA()),new H.b1(H.cA()),!1,!1,[],P.bi(null,null,null,null),null,null,!1,!0,P.bi(null,null,null,null))
w.u(0,0)
u.dR(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.bO()
x=H.bc(y,[y]).bb(a)
if(x)u.bN(new H.of(z,a))
else{y=H.bc(y,[y,y]).bb(a)
if(y)u.bN(new H.og(z,a))
else u.bN(a)}init.globalState.f.bX()},
ku:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.kv()
return},
kv:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.d(new P.t("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.d(new P.t("Cannot extract URI from \""+H.l(z)+"\""))},
kq:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.cn(!0,[]).bf(b.data)
y=J.J(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.cn(!0,[]).bf(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.cn(!0,[]).bf(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.c6(null,null,null,P.E,H.ce)
p=P.bi(null,null,null,P.E)
o=new H.ce(0,null,!1)
n=new H.dE(y,q,p,init.createNewIsolate(),o,new H.b1(H.cA()),new H.b1(H.cA()),!1,!1,[],P.bi(null,null,null,null),null,null,!1,!0,P.bi(null,null,null,null))
p.u(0,0)
n.dR(0,o)
init.globalState.f.a.aP(0,new H.bL(n,new H.kr(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bX()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.be(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.bX()
break
case"close":init.globalState.ch.b9(0,$.$get$eR().h(0,a))
a.terminate()
init.globalState.f.bX()
break
case"log":H.kp(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.y(["command","print","msg",z])
q=new H.b8(!0,P.b4(null,P.E)).aF(q)
y.toString
self.postMessage(q)}else P.a5(y.h(z,"msg"))
break
case"error":throw H.d(y.h(z,"msg"))}},
kp:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.y(["command","log","msg",a])
x=new H.b8(!0,P.b4(null,P.E)).aF(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.a6(w)
z=H.ab(w)
throw H.d(P.bZ(z))}},
ks:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.f5=$.f5+("_"+y)
$.f6=$.f6+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.be(f,["spawned",new H.cq(y,x),w,z.r])
x=new H.kt(a,b,c,d,z)
if(e===!0){z.es(w,w)
init.globalState.f.a.aP(0,new H.bL(z,x,"start isolate"))}else x.$0()},
nn:function(a){return new H.cn(!0,[]).bf(new H.b8(!1,P.b4(null,P.E)).aF(a))},
of:{
"^":"k:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
og:{
"^":"k:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
n1:{
"^":"i;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
static:{n2:function(a){var z=P.y(["command","print","msg",a])
return new H.b8(!0,P.b4(null,P.E)).aF(z)}}},
dE:{
"^":"i;X:a>,b,c,jJ:d<,iK:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
es:function(a,b){if(!this.f.O(0,a))return
if(this.Q.u(0,b)&&!this.y)this.y=!0
this.cW()},
ke:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.b9(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.a(z,0)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.a(v,w)
v[w]=x
if(w===y.c)y.e1();++y.d}this.y=!1}this.cW()},
i1:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.v(a),y=0;x=this.ch,y<x.length;y+=2)if(z.O(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.a(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
kb:function(a){var z,y,x
if(this.ch==null)return
for(z=J.v(a),y=0;x=this.ch,y<x.length;y+=2)if(z.O(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.S(new P.t("removeRange"))
P.f8(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
fJ:function(a,b){if(!this.r.O(0,a))return
this.db=b},
jm:function(a,b,c){var z=J.v(b)
if(!z.O(b,0))z=z.O(b,1)&&!this.cy
else z=!0
if(z){J.be(a,c)
return}z=this.cx
if(z==null){z=P.d4(null,null)
this.cx=z}z.aP(0,new H.mU(a,c))},
jk:function(a,b){var z
if(!this.r.O(0,a))return
z=J.v(b)
if(!z.O(b,0))z=z.O(b,1)&&!this.cy
else z=!0
if(z){this.d5()
return}z=this.cx
if(z==null){z=P.d4(null,null)
this.cx=z}z.aP(0,this.gjM())},
jn:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.a5(a)
if(b!=null)P.a5(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.b_(a)
y[1]=b==null?null:J.b_(b)
for(x=new P.eW(z,z.r,null,null),x.c=z.e;x.M();)J.be(x.d,y)},
bN:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.a6(u)
w=t
v=H.ab(u)
this.jn(w,v)
if(this.db===!0){this.d5()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gjJ()
if(this.cx!=null)for(;t=this.cx,!t.gaL(t);)this.cx.f_().$0()}return y},
eR:function(a){return this.b.h(0,a)},
dR:function(a,b){var z=this.b
if(z.cc(0,a))throw H.d(P.bZ("Registry: ports must be registered only once."))
z.k(0,a,b)},
cW:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.k(0,this.a,this)
else this.d5()},
d5:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.b1(0)
for(z=this.b,y=z.gfg(z),y=y.ga5(y);y.M();)y.gV().hn()
z.b1(0)
this.c.b1(0)
init.globalState.z.b9(0,this.a)
this.dx.b1(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.a(z,v)
J.be(w,z[v])}this.ch=null}},"$0","gjM",0,0,2]},
mU:{
"^":"k:2;a,b",
$0:function(){J.be(this.a,this.b)}},
mC:{
"^":"i;a,b",
iZ:function(){var z=this.a
if(z.b===z.c)return
return z.f_()},
f9:function(){var z,y,x
z=this.iZ()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.cc(0,init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gaL(y)}else y=!1
else y=!1
else y=!1
if(y)H.S(P.bZ("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gaL(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.y(["command","close"])
x=new H.b8(!0,P.b4(null,P.E)).aF(x)
y.toString
self.postMessage(x)}return!1}z.k8()
return!0},
eg:function(){if(self.window!=null)new H.mD(this).$0()
else for(;this.f9(););},
bX:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.eg()
else try{this.eg()}catch(x){w=H.a6(x)
z=w
y=H.ab(x)
w=init.globalState.Q
v=P.y(["command","error","msg",H.l(z)+"\n"+H.l(y)])
v=new H.b8(!0,P.b4(null,P.E)).aF(v)
w.toString
self.postMessage(v)}}},
mD:{
"^":"k:2;a",
$0:function(){if(!this.a.f9())return
P.dr(C.f,this)}},
bL:{
"^":"i;a,b,c",
k8:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.bN(this.b)}},
n0:{
"^":"i;"},
kr:{
"^":"k:1;a,b,c,d,e,f",
$0:function(){H.ks(this.a,this.b,this.c,this.d,this.e,this.f)}},
kt:{
"^":"k:2;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.bO()
w=H.bc(x,[x,x]).bb(y)
if(w)y.$2(this.b,this.c)
else{x=H.bc(x,[x]).bb(y)
if(x)y.$1(this.b)
else y.$0()}}z.cW()}},
fD:{
"^":"i;"},
cq:{
"^":"fD;b,a",
bn:function(a,b){var z,y,x,w
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.ge5())return
x=H.nn(b)
if(z.giK()===y){y=J.J(x)
switch(y.h(x,0)){case"pause":z.es(y.h(x,1),y.h(x,2))
break
case"resume":z.ke(y.h(x,1))
break
case"add-ondone":z.i1(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.kb(y.h(x,1))
break
case"set-errors-fatal":z.fJ(y.h(x,1),y.h(x,2))
break
case"ping":z.jm(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.jk(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.u(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.b9(0,y)
break}return}y=init.globalState.f
w="receive "+H.l(b)
y.a.aP(0,new H.bL(z,new H.n4(this,x),w))},
O:function(a,b){if(b==null)return!1
return b instanceof H.cq&&J.a7(this.b,b.b)},
gah:function(a){return this.b.gcQ()}},
n4:{
"^":"k:1;a,b",
$0:function(){var z=this.a.b
if(!z.ge5())z.hm(0,this.b)}},
dF:{
"^":"fD;b,c,a",
bn:function(a,b){var z,y,x
z=P.y(["command","message","port",this,"msg",b])
y=new H.b8(!0,P.b4(null,P.E)).aF(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
O:function(a,b){if(b==null)return!1
return b instanceof H.dF&&J.a7(this.b,b.b)&&J.a7(this.a,b.a)&&J.a7(this.c,b.c)},
gah:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.fU()
y=this.a
if(typeof y!=="number")return y.fU()
x=this.c
if(typeof x!=="number")return H.n(x)
return(z<<16^y<<8^x)>>>0}},
ce:{
"^":"i;cQ:a<,b,e5:c<",
hn:function(){this.c=!0
this.b=null},
hm:function(a,b){if(this.c)return
this.hD(b)},
hD:function(a){return this.b.$1(a)},
$isle:1},
lP:{
"^":"i;a,b,c",
hi:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.aP(0,new H.bL(y,new H.lR(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.ak(new H.lS(this,b),0),a)}else throw H.d(new P.t("Timer greater than 0."))},
static:{lQ:function(a,b){var z=new H.lP(!0,!1,null)
z.hi(a,b)
return z}}},
lR:{
"^":"k:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
lS:{
"^":"k:2;a,b",
$0:function(){this.a.c=null
H.cx()
this.b.$0()}},
b1:{
"^":"i;cQ:a<",
gah:function(a){var z=this.a
if(typeof z!=="number")return z.kW()
z=C.b.em(z,0)^C.b.aR(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
O:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.b1){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
b8:{
"^":"i;a,b",
aF:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.k(0,a,z.gj(z))
z=J.v(a)
if(!!z.$isd7)return["buffer",a]
if(!!z.$isc9)return["typed",a]
if(!!z.$isO)return this.fC(a)
if(!!z.$iskn){x=this.gfz()
w=z.geN(a)
w=H.c8(w,x,H.a3(w,"Y",0),null)
w=P.aP(w,!0,H.a3(w,"Y",0))
z=z.gfg(a)
z=H.c8(z,x,H.a3(z,"Y",0),null)
return["map",w,P.aP(z,!0,H.a3(z,"Y",0))]}if(!!z.$iskA)return this.fD(a)
if(!!z.$ish)this.fc(a)
if(!!z.$isle)this.bZ(a,"RawReceivePorts can't be transmitted:")
if(!!z.$iscq)return this.fE(a)
if(!!z.$isdF)return this.fF(a)
if(!!z.$isk){v=a.$static_name
if(v==null)this.bZ(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isb1)return["capability",a.a]
if(!(a instanceof P.i))this.fc(a)
return["dart",init.classIdExtractor(a),this.fB(init.classFieldsExtractor(a))]},"$1","gfz",2,0,0],
bZ:function(a,b){throw H.d(new P.t(H.l(b==null?"Can't transmit:":b)+" "+H.l(a)))},
fc:function(a){return this.bZ(a,null)},
fC:function(a){var z=this.fA(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.bZ(a,"Can't serialize indexable: ")},
fA:function(a){var z,y,x
z=[]
C.a.sj(z,a.length)
for(y=0;y<a.length;++y){x=this.aF(a[y])
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
fB:function(a){var z
for(z=0;z<a.length;++z)C.a.k(a,z,this.aF(a[z]))
return a},
fD:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.bZ(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.sj(y,z.length)
for(x=0;x<z.length;++x){w=this.aF(a[z[x]])
if(x>=y.length)return H.a(y,x)
y[x]=w}return["js-object",z,y]},
fF:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
fE:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gcQ()]
return["raw sendport",a]}},
cn:{
"^":"i;a,b",
bf:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.d(P.ax("Bad serialized message: "+H.l(a)))
switch(C.a.gje(a)){case"ref":if(1>=a.length)return H.a(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.a(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=this.bM(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=this.bM(x)
y.$builtinTypeInfo=[null]
return y
case"mutable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return this.bM(x)
case"const":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=this.bM(x)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.j1(a)
case"sendport":return this.j2(a)
case"raw sendport":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.j0(a)
case"function":if(1>=a.length)return H.a(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.a(a,1)
return new H.b1(a[1])
case"dart":y=a.length
if(1>=y)return H.a(a,1)
w=a[1]
if(2>=y)return H.a(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.bM(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.d("couldn't deserialize: "+H.l(a))}},"$1","gj_",2,0,0],
bM:function(a){var z,y,x
z=J.J(a)
y=0
while(!0){x=z.gj(a)
if(typeof x!=="number")return H.n(x)
if(!(y<x))break
z.k(a,y,this.bf(z.h(a,y)));++y}return a},
j1:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w=P.C()
this.b.push(w)
y=J.ef(J.cJ(y,this.gj_()))
for(z=J.J(y),v=J.J(x),u=0;u<z.gj(y);++u){if(u>=y.length)return H.a(y,u)
w.k(0,y[u],this.bf(v.h(x,u)))}return w},
j2:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
if(3>=z)return H.a(a,3)
w=a[3]
if(J.a7(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.eR(w)
if(u==null)return
t=new H.cq(u,x)}else t=new H.dF(y,w,x)
this.b.push(t)
return t},
j0:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.J(y)
v=J.J(x)
u=0
while(!0){t=z.gj(y)
if(typeof t!=="number")return H.n(t)
if(!(u<t))break
w[z.h(y,u)]=this.bf(v.h(x,u));++u}return w}}}],["","",,H,{
"^":"",
iE:function(){throw H.d(new P.t("Cannot modify unmodifiable Map"))},
nU:function(a){return init.types[a]},
h5:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.v(a).$isP},
l:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.b_(a)
if(typeof z!=="string")throw H.d(H.a1(a))
return z},
aS:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
f4:function(a,b){throw H.d(new P.jg(a,null,null))},
dd:function(a,b,c){var z,y
H.nJ(a)
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.f4(a,c)
if(3>=z.length)return H.a(z,3)
y=z[3]
if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.f4(a,c)},
bk:function(a){var z,y
z=C.n(J.v(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.i.iz(z,0)===36)z=C.i.fW(z,1)
return(z+H.dO(H.cv(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
cd:function(a){return"Instance of '"+H.bk(a)+"'"},
ae:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cc:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.a1(a))
return a[b]},
de:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.a1(a))
a[b]=c},
n:function(a){throw H.d(H.a1(a))},
a:function(a,b){if(a==null)J.ao(a)
throw H.d(H.a2(a,b))},
a2:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aM(!0,b,"index",null)
z=J.ao(a)
if(!(b<0)){if(typeof z!=="number")return H.n(z)
y=b>=z}else y=!0
if(y)return P.L(b,a,"index",null,z)
return P.bI(b,"index",null)},
a1:function(a){return new P.aM(!0,a,null,null)},
u:function(a){if(typeof a!=="number")throw H.d(H.a1(a))
return a},
nI:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.d(H.a1(a))
return a},
nJ:function(a){if(typeof a!=="string")throw H.d(H.a1(a))
return a},
d:function(a){var z
if(a==null)a=new P.da()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.hc})
z.name=""}else z.toString=H.hc
return z},
hc:function(){return J.b_(this.dartException)},
S:function(a){throw H.d(a)},
dU:function(a){throw H.d(new P.aa(a))},
a6:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.oj(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.em(x,16)&8191)===10)switch(w){case 438:return z.$1(H.d2(H.l(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.l(y)+" (Error "+w+")"
return z.$1(new H.f3(v,null))}}if(a instanceof TypeError){u=$.$get$fl()
t=$.$get$fm()
s=$.$get$fn()
r=$.$get$fo()
q=$.$get$fs()
p=$.$get$ft()
o=$.$get$fq()
$.$get$fp()
n=$.$get$fv()
m=$.$get$fu()
l=u.aM(y)
if(l!=null)return z.$1(H.d2(y,l))
else{l=t.aM(y)
if(l!=null){l.method="call"
return z.$1(H.d2(y,l))}else{l=s.aM(y)
if(l==null){l=r.aM(y)
if(l==null){l=q.aM(y)
if(l==null){l=p.aM(y)
if(l==null){l=o.aM(y)
if(l==null){l=r.aM(y)
if(l==null){l=n.aM(y)
if(l==null){l=m.aM(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.f3(y,l==null?null:l.method))}}return z.$1(new H.m1(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.fd()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aM(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.fd()
return a},
ab:function(a){var z
if(a==null)return new H.fL(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.fL(a,null)},
ob:function(a){if(a==null||typeof a!='object')return J.ac(a)
else return H.aS(a)},
h1:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.k(0,a[y],a[x])}return b},
o0:function(a,b,c,d,e,f,g){var z=J.v(c)
if(z.O(c,0))return H.bM(b,new H.o1(a))
else if(z.O(c,1))return H.bM(b,new H.o2(a,d))
else if(z.O(c,2))return H.bM(b,new H.o3(a,d,e))
else if(z.O(c,3))return H.bM(b,new H.o4(a,d,e,f))
else if(z.O(c,4))return H.bM(b,new H.o5(a,d,e,f,g))
else throw H.d(P.bZ("Unsupported number of arguments for wrapped closure"))},
ak:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.o0)
a.$identity=z
return z},
iA:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.v(c).$isc){z.$reflectionInfo=c
x=H.lm(z).r}else x=c
w=d?Object.create(new H.lB().constructor.prototype):Object.create(new H.cQ(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.ay
$.ay=J.aJ(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.es(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.nU(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.eq:H.cR
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.d("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.es(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
ix:function(a,b,c,d){var z=H.cR
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
es:function(a,b,c){var z,y,x,w,v,u
if(c)return H.iz(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.ix(y,!w,z,b)
if(y===0){w=$.bg
if(w==null){w=H.bV("self")
$.bg=w}w="return function(){return this."+H.l(w)+"."+H.l(z)+"();"
v=$.ay
$.ay=J.aJ(v,1)
return new Function(w+H.l(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.bg
if(v==null){v=H.bV("self")
$.bg=v}v=w+H.l(v)+"."+H.l(z)+"("+u+");"
w=$.ay
$.ay=J.aJ(w,1)
return new Function(v+H.l(w)+"}")()},
iy:function(a,b,c,d){var z,y
z=H.cR
y=H.eq
switch(b?-1:a){case 0:throw H.d(new H.lp("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
iz:function(a,b){var z,y,x,w,v,u,t,s
z=H.ir()
y=$.ep
if(y==null){y=H.bV("receiver")
$.ep=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.iy(w,!u,x,b)
if(w===1){y="return function(){return this."+H.l(z)+"."+H.l(x)+"(this."+H.l(y)+");"
u=$.ay
$.ay=J.aJ(u,1)
return new Function(y+H.l(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.l(z)+"."+H.l(x)+"(this."+H.l(y)+", "+s+");"
u=$.ay
$.ay=J.aJ(u,1)
return new Function(y+H.l(u)+"}")()},
dJ:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.v(c).$isc){c.fixed$length=Array
z=c}else z=c
return H.iA(a,b,z,!!d,e,f)},
oc:function(a,b){var z=J.J(b)
throw H.d(H.cU(H.bk(a),z.dJ(b,3,z.gj(b))))},
at:function(a,b){var z
if(a!=null)z=typeof a==="object"&&J.v(a)[b]
else z=!0
if(z)return a
H.oc(a,b)},
dP:function(a){if(!!J.v(a).$isc||a==null)return a
throw H.d(H.cU(H.bk(a),"List"))},
oi:function(a){throw H.d(new P.iK("Cyclic initialization for static "+H.l(a)))},
bc:function(a,b,c){return new H.lq(a,b,c,null)},
bO:function(){return C.p},
cA:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
o:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
cv:function(a){if(a==null)return
return a.$builtinTypeInfo},
h3:function(a,b){return H.dT(a["$as"+H.l(b)],H.cv(a))},
a3:function(a,b,c){var z=H.h3(a,b)
return z==null?null:z[c]},
V:function(a,b){var z=H.cv(a)
return z==null?null:z[b]},
dS:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.dO(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.c.t(a)
else return},
dO:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.dm("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.l(H.dS(u,c))}return w?"":"<"+H.l(z)+">"},
dT:function(a,b){if(typeof a=="function"){a=H.dN(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.dN(a,null,b)}return b},
nK:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.cv(a)
y=J.v(a)
if(y[b]==null)return!1
return H.fW(H.dT(y[d],z),c)},
cB:function(a,b,c,d){if(a!=null&&!H.nK(a,b,c,d))throw H.d(H.cU(H.bk(a),(b.substring(3)+H.dO(c,0,null)).replace(/[^<,> ]+/g,function(e){return init.mangledGlobalNames[e]||e})))
return a},
fW:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.am(a[y],b[y]))return!1
return!0},
dK:function(a,b,c){return H.dN(a,b,H.h3(b,c))},
am:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.h4(a,b)
if('func' in a)return b.builtin$cls==="ji"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.dS(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.l(H.dS(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.fW(H.dT(v,z),x)},
fV:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.am(z,v)||H.am(v,z)))return!1}return!0},
nC:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.am(v,u)||H.am(u,v)))return!1}return!0},
h4:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
y=b.ret
if(!(H.am(z,y)||H.am(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.fV(x,w,!1))return!1
if(!H.fV(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.am(o,n)||H.am(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.am(o,n)||H.am(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.am(o,n)||H.am(n,o)))return!1}}return H.nC(a.named,b.named)},
dN:function(a,b,c){return a.apply(b,c)},
rT:function(a){var z=$.dL
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
rR:function(a){return H.aS(a)},
rQ:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
o8:function(a){var z,y,x,w,v,u
z=$.dL.$1(a)
y=$.cs[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.cw[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.fU.$2(a,z)
if(z!=null){y=$.cs[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.cw[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.dQ(x)
$.cs[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.cw[z]=x
return x}if(v==="-"){u=H.dQ(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.h7(a,x)
if(v==="*")throw H.d(new P.cl(z))
if(init.leafTags[z]===true){u=H.dQ(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.h7(a,x)},
h7:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.cy(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
dQ:function(a){return J.cy(a,!1,null,!!a.$isP)},
o9:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.cy(z,!1,null,!!z.$isP)
else return J.cy(z,c,null,null)},
nZ:function(){if(!0===$.dM)return
$.dM=!0
H.o_()},
o_:function(){var z,y,x,w,v,u,t,s
$.cs=Object.create(null)
$.cw=Object.create(null)
H.nV()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.h8.$1(v)
if(u!=null){t=H.o9(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
nV:function(){var z,y,x,w,v,u,t
z=C.y()
z=H.bb(C.v,H.bb(C.A,H.bb(C.o,H.bb(C.o,H.bb(C.z,H.bb(C.w,H.bb(C.x(C.n),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.dL=new H.nW(v)
$.fU=new H.nX(u)
$.h8=new H.nY(t)},
bb:function(a,b){return a(b)||b},
oh:function(a,b,c){return a.indexOf(b,c)>=0},
iD:{
"^":"i;",
t:function(a){return P.eZ(this)},
k:function(a,b,c){return H.iE()},
$isai:1,
$asai:null},
js:{
"^":"iD;a",
cP:function(){var z=this.$map
if(z==null){z=new H.bF(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.h1(this.a,z)
this.$map=z}return z},
h:function(a,b){return this.cP().h(0,b)},
G:function(a,b){this.cP().G(0,b)},
gj:function(a){var z=this.cP()
return z.gj(z)}},
ll:{
"^":"i;a,b,c,d,e,f,r,x",
static:{lm:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.ll(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
lT:{
"^":"i;a,b,c,d,e,f",
aM:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
static:{az:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.lT(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},ck:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},fr:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
f3:{
"^":"a_;a,b",
t:function(a){var z=this.b
if(z==null)return"NullError: "+H.l(this.a)
return"NullError: method not found: '"+H.l(z)+"' on null"}},
kC:{
"^":"a_;a,b,c",
t:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.l(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.l(z)+"' ("+H.l(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.l(z)+"' on '"+H.l(y)+"' ("+H.l(this.a)+")"},
static:{d2:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.kC(a,y,z?null:b.receiver)}}},
m1:{
"^":"a_;a",
t:function(a){var z=this.a
return C.i.gaL(z)?"Error":"Error: "+z}},
oj:{
"^":"k:0;a",
$1:function(a){if(!!J.v(a).$isa_)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
fL:{
"^":"i;a,b",
t:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
o1:{
"^":"k:1;a",
$0:function(){return this.a.$0()}},
o2:{
"^":"k:1;a,b",
$0:function(){return this.a.$1(this.b)}},
o3:{
"^":"k:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
o4:{
"^":"k:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
o5:{
"^":"k:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
k:{
"^":"i;",
t:function(a){return"Closure '"+H.bk(this)+"'"},
gfi:function(){return this},
gfi:function(){return this}},
fh:{
"^":"k;"},
lB:{
"^":"fh;",
t:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
cQ:{
"^":"fh;a,b,c,d",
O:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.cQ))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gah:function(a){var z,y
z=this.c
if(z==null)y=H.aS(this.a)
else y=typeof z!=="object"?J.ac(z):H.aS(z)
z=H.aS(this.b)
if(typeof y!=="number")return y.kY()
return(y^z)>>>0},
t:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.l(this.d)+"' of "+H.cd(z)},
static:{cR:function(a){return a.a},eq:function(a){return a.c},ir:function(){var z=$.bg
if(z==null){z=H.bV("self")
$.bg=z}return z},bV:function(a){var z,y,x,w,v
z=new H.cQ("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
iw:{
"^":"a_;a",
t:function(a){return this.a},
static:{cU:function(a,b){return new H.iw("CastError: Casting value of type "+H.l(a)+" to incompatible type "+H.l(b))}}},
lp:{
"^":"a_;a",
t:function(a){return"RuntimeError: "+H.l(this.a)}},
fa:{
"^":"i;"},
lq:{
"^":"fa;a,b,c,d",
bb:function(a){var z=this.hy(a)
return z==null?!1:H.h4(z,this.bz())},
hy:function(a){var z=J.v(a)
return"$signature" in z?z.$signature():null},
bz:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.v(y)
if(!!x.$isrj)z.void=true
else if(!x.$iseA)z.ret=y.bz()
y=this.b
if(y!=null&&y.length!==0)z.args=H.f9(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.f9(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.h0(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].bz()}z.named=w}return z},
t:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.l(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.l(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.h0(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.l(z[s].bz())+" "+s}x+="}"}}return x+(") -> "+H.l(this.a))},
static:{f9:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].bz())
return z}}},
eA:{
"^":"fa;",
t:function(a){return"dynamic"},
bz:function(){return}},
bF:{
"^":"i;a,b,c,d,e,f,r",
gj:function(a){return this.a},
gaL:function(a){return this.a===0},
geN:function(a){return H.o(new H.kE(this),[H.V(this,0)])},
gfg:function(a){return H.c8(this.geN(this),new H.kB(this),H.V(this,0),H.V(this,1))},
cc:function(a,b){var z,y
if(typeof b==="string"){z=this.b
if(z==null)return!1
return this.dX(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return this.dX(y,b)}else return this.jD(b)},
jD:function(a){var z=this.d
if(z==null)return!1
return this.bT(this.aQ(z,this.bS(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.aQ(z,b)
return y==null?null:y.gbj()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.aQ(x,b)
return y==null?null:y.gbj()}else return this.jE(b)},
jE:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.aQ(z,this.bS(a))
x=this.bT(y,a)
if(x<0)return
return y[x].gbj()},
k:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.cS()
this.b=z}this.dQ(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.cS()
this.c=y}this.dQ(y,b,c)}else this.jG(b,c)},
jG:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.cS()
this.d=z}y=this.bS(a)
x=this.aQ(z,y)
if(x==null)this.cU(z,y,[this.cT(a,b)])
else{w=this.bT(x,a)
if(w>=0)x[w].sbj(b)
else x.push(this.cT(a,b))}},
b9:function(a,b){if(typeof b==="string")return this.ed(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.ed(this.c,b)
else return this.jF(b)},
jF:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.aQ(z,this.bS(a))
x=this.bT(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.en(w)
return w.gbj()},
b1:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
G:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.d(new P.aa(this))
z=z.c}},
dQ:function(a,b,c){var z=this.aQ(a,b)
if(z==null)this.cU(a,b,this.cT(b,c))
else z.sbj(c)},
ed:function(a,b){var z
if(a==null)return
z=this.aQ(a,b)
if(z==null)return
this.en(z)
this.dY(a,b)
return z.gbj()},
cT:function(a,b){var z,y
z=new H.kD(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
en:function(a){var z,y
z=a.ghJ()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
bS:function(a){return J.ac(a)&0x3ffffff},
bT:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a7(a[y].geI(),b))return y
return-1},
t:function(a){return P.eZ(this)},
aQ:function(a,b){return a[b]},
cU:function(a,b,c){a[b]=c},
dY:function(a,b){delete a[b]},
dX:function(a,b){return this.aQ(a,b)!=null},
cS:function(){var z=Object.create(null)
this.cU(z,"<non-identifier-key>",z)
this.dY(z,"<non-identifier-key>")
return z},
$iskn:1,
$isai:1,
$asai:null},
kB:{
"^":"k:0;a",
$1:function(a){return this.a.h(0,a)}},
kD:{
"^":"i;eI:a<,bj:b@,c,hJ:d<"},
kE:{
"^":"Y;a",
gj:function(a){return this.a.a},
ga5:function(a){var z,y
z=this.a
y=new H.kF(z,z.r,null,null)
y.c=z.e
return y},
G:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.d(new P.aa(z))
y=y.c}},
$ism:1},
kF:{
"^":"i;a,b,c,d",
gV:function(){return this.d},
M:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.aa(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
nW:{
"^":"k:0;a",
$1:function(a){return this.a(a)}},
nX:{
"^":"k:12;a",
$2:function(a,b){return this.a(a,b)}},
nY:{
"^":"k:13;a",
$1:function(a){return this.a(a)}}}],["","",,H,{
"^":"",
eS:function(){return new P.b7("No element")},
kx:function(){return new P.b7("Too few elements")},
bJ:function(a,b,c,d){if(c-b<=32)H.lA(a,b,c,d)
else H.lz(a,b,c,d)},
lA:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.J(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.a8(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.k(a,w,y.h(a,v))
w=v}y.k(a,w,x)}},
lz:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.c.aR(c-b+1,6)
y=b+z
x=c-z
w=C.c.aR(b+c,2)
v=w-z
u=w+z
t=J.J(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.a8(d.$2(s,r),0)){n=r
r=s
s=n}if(J.a8(d.$2(p,o),0)){n=o
o=p
p=n}if(J.a8(d.$2(s,q),0)){n=q
q=s
s=n}if(J.a8(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a8(d.$2(s,p),0)){n=p
p=s
s=n}if(J.a8(d.$2(q,p),0)){n=p
p=q
q=n}if(J.a8(d.$2(r,o),0)){n=o
o=r
r=n}if(J.a8(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a8(d.$2(p,o),0)){n=o
o=p
p=n}t.k(a,y,s)
t.k(a,w,q)
t.k(a,x,o)
t.k(a,v,t.h(a,b))
t.k(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.a7(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
h=J.v(i)
if(h.O(i,0))continue
if(h.b_(i,0)){if(k!==m){t.k(a,k,t.h(a,m))
t.k(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
h=J.as(i)
if(h.aE(i,0)){--l
continue}else{g=l-1
if(h.b_(i,0)){t.k(a,k,t.h(a,m))
f=m+1
t.k(a,m,t.h(a,l))
t.k(a,l,j)
l=g
m=f
break}else{t.k(a,k,t.h(a,l))
t.k(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(J.br(d.$2(j,r),0)){if(k!==m){t.k(a,k,t.h(a,m))
t.k(a,m,j)}++m}else if(J.a8(d.$2(j,p),0))for(;!0;)if(J.a8(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.br(d.$2(t.h(a,l),r),0)){t.k(a,k,t.h(a,m))
f=m+1
t.k(a,m,t.h(a,l))
t.k(a,l,j)
m=f}else{t.k(a,k,t.h(a,l))
t.k(a,l,j)}l=g
break}}e=!1}h=m-1
t.k(a,b,t.h(a,h))
t.k(a,h,r)
h=l+1
t.k(a,c,t.h(a,h))
t.k(a,h,p)
H.bJ(a,b,m-2,d)
H.bJ(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.a7(d.$2(t.h(a,m),r),0);)++m
for(;J.a7(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(J.a7(d.$2(j,r),0)){if(k!==m){t.k(a,k,t.h(a,m))
t.k(a,m,j)}++m}else if(J.a7(d.$2(j,p),0))for(;!0;)if(J.a7(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.br(d.$2(t.h(a,l),r),0)){t.k(a,k,t.h(a,m))
f=m+1
t.k(a,m,t.h(a,l))
t.k(a,l,j)
m=f}else{t.k(a,k,t.h(a,l))
t.k(a,l,j)}l=g
break}}H.bJ(a,m,l,d)}else H.bJ(a,m,l,d)},
lL:function(a){return a.gl3()},
c7:{
"^":"Y;",
ga5:function(a){return new H.eX(this,this.gj(this),0,null)},
G:function(a,b){var z,y
z=this.gj(this)
for(y=0;y<z;++y){b.$1(this.H(0,y))
if(z!==this.gj(this))throw H.d(new P.aa(this))}},
b8:function(a,b){return H.o(new H.b5(this,b),[null,null])},
aD:function(a,b){var z,y,x
if(b){z=H.o([],[H.a3(this,"c7",0)])
C.a.sj(z,this.gj(this))}else{y=Array(this.gj(this))
y.fixed$length=Array
z=H.o(y,[H.a3(this,"c7",0)])}for(x=0;x<this.gj(this);++x){y=this.H(0,x)
if(x>=z.length)return H.a(z,x)
z[x]=y}return z},
aq:function(a){return this.aD(a,!0)},
$ism:1},
eX:{
"^":"i;a,b,c,d",
gV:function(){return this.d},
M:function(){var z,y,x,w
z=this.a
y=J.J(z)
x=y.gj(z)
if(this.b!==x)throw H.d(new P.aa(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.H(z,w);++this.c
return!0}},
eY:{
"^":"Y;a,b",
ga5:function(a){var z=new H.kJ(null,J.aY(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gj:function(a){return J.ao(this.a)},
$asY:function(a,b){return[b]},
static:{c8:function(a,b,c,d){if(!!J.v(a).$ism)return H.o(new H.eB(a,b),[c,d])
return H.o(new H.eY(a,b),[c,d])}}},
eB:{
"^":"eY;a,b",
$ism:1},
kJ:{
"^":"c3;a,b,c",
M:function(){var z=this.b
if(z.M()){this.a=this.bI(z.gV())
return!0}this.a=null
return!1},
gV:function(){return this.a},
bI:function(a){return this.c.$1(a)}},
b5:{
"^":"c7;a,b",
gj:function(a){return J.ao(this.a)},
H:function(a,b){return this.bI(J.hu(this.a,b))},
bI:function(a){return this.b.$1(a)},
$asc7:function(a,b){return[b]},
$asY:function(a,b){return[b]},
$ism:1},
mj:{
"^":"Y;a,b",
ga5:function(a){var z=new H.mk(J.aY(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
mk:{
"^":"c3;a,b",
M:function(){for(var z=this.a;z.M();)if(this.bI(z.gV())===!0)return!0
return!1},
gV:function(){return this.a.gV()},
bI:function(a){return this.b.$1(a)}},
fg:{
"^":"Y;a,b",
ga5:function(a){var z=new H.lN(J.aY(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
static:{lM:function(a,b,c){if(b<0)throw H.d(P.ax(b))
if(!!J.v(a).$ism)return H.o(new H.j0(a,b),[c])
return H.o(new H.fg(a,b),[c])}}},
j0:{
"^":"fg;a,b",
gj:function(a){var z,y
z=J.ao(this.a)
y=this.b
if(J.a8(z,y))return y
return z},
$ism:1},
lN:{
"^":"c3;a,b",
M:function(){if(--this.b>=0)return this.a.M()
this.b=-1
return!1},
gV:function(){if(this.b<0)return
return this.a.gV()}},
fc:{
"^":"Y;a,b",
ga5:function(a){var z=new H.ly(J.aY(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
dL:function(a,b,c){var z=this.b
if(z<0)H.S(P.aT(z,0,null,"count",null))},
static:{lx:function(a,b,c){var z
if(!!J.v(a).$ism){z=H.o(new H.j_(a,b),[c])
z.dL(a,b,c)
return z}return H.lw(a,b,c)},lw:function(a,b,c){var z=H.o(new H.fc(a,b),[c])
z.dL(a,b,c)
return z}}},
j_:{
"^":"fc;a,b",
gj:function(a){var z=J.bP(J.ao(this.a),this.b)
if(J.hd(z,0))return z
return 0},
$ism:1},
ly:{
"^":"c3;a,b",
M:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.M()
this.b=0
return z.M()},
gV:function(){return this.a.gV()}},
eK:{
"^":"i;",
sj:function(a,b){throw H.d(new P.t("Cannot change the length of a fixed-length list"))},
u:function(a,b){throw H.d(new P.t("Cannot add to a fixed-length list"))}}}],["","",,H,{
"^":"",
h0:function(a){var z=H.o(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
mp:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.nD()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.ak(new P.mr(z),1)).observe(y,{childList:true})
return new P.mq(z,y,x)}else if(self.setImmediate!=null)return P.nE()
return P.nF()},
rq:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.ak(new P.ms(a),0))},"$1","nD",2,0,5],
rr:[function(a){++init.globalState.f.b
self.setImmediate(H.ak(new P.mt(a),0))},"$1","nE",2,0,5],
rs:[function(a){P.ds(C.f,a)},"$1","nF",2,0,5],
fP:function(a,b){var z=H.bO()
z=H.bc(z,[z,z]).bb(a)
if(z){b.toString
return a}else{b.toString
return a}},
jj:function(a,b,c){var z
a=a!=null?a:new P.da()
z=$.A
if(z!==C.d)z.toString
z=H.o(new P.aj(0,z,null),[c])
z.dS(a,b)
return z},
ny:function(){var z,y
for(;z=$.b9,z!=null;){$.bo=null
y=J.e9(z)
$.b9=y
if(y==null)$.bn=null
$.A=z.gkR()
z.it()}},
rP:[function(){$.dG=!0
try{P.ny()}finally{$.A=C.d
$.bo=null
$.dG=!1
if($.b9!=null)$.$get$dA().$1(P.fX())}},"$0","fX",0,0,2],
fT:function(a){if($.b9==null){$.bn=a
$.b9=a
if(!$.dG)$.$get$dA().$1(P.fX())}else{$.bn.c=a
$.bn=a}},
h9:function(a){var z,y
z=$.A
if(C.d===z){P.ba(null,null,C.d,a)
return}z.toString
if(C.d.gd2()===z){P.ba(null,null,z,a)
return}y=$.A
P.ba(null,null,y,y.cX(a,!0))},
nA:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.a6(u)
z=t
y=H.ab(u)
$.A.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.aB(x)
w=t
v=x.gaO()
c.$2(w,v)}}},
nj:function(a,b,c,d){var z=a.cZ(0)
if(!!J.v(z).$isaO)z.dm(new P.nm(b,c,d))
else b.aG(c,d)},
nk:function(a,b){return new P.nl(a,b)},
ni:function(a,b,c){$.A.toString
a.cF(b,c)},
dr:function(a,b){var z=$.A
if(z===C.d){z.toString
return P.ds(a,b)}return P.ds(a,z.cX(b,!0))},
ds:function(a,b){var z=C.c.aR(a.a,1000)
return H.lQ(z<0?0:z,b)},
dz:function(a){var z=$.A
$.A=a
return z},
bN:function(a,b,c,d,e){var z,y,x
z=new P.fC(new P.nz(d,e),C.d,null)
y=$.b9
if(y==null){P.fT(z)
$.bo=$.bn}else{x=$.bo
if(x==null){z.c=y
$.bo=z
$.b9=z}else{z.c=x.c
x.c=z
$.bo=z
if(z.c==null)$.bn=z}}},
fQ:function(a,b,c,d){var z,y
if($.A===c)return d.$0()
z=P.dz(c)
try{y=d.$0()
return y}finally{$.A=z}},
fS:function(a,b,c,d,e){var z,y
if($.A===c)return d.$1(e)
z=P.dz(c)
try{y=d.$1(e)
return y}finally{$.A=z}},
fR:function(a,b,c,d,e,f){var z,y
if($.A===c)return d.$2(e,f)
z=P.dz(c)
try{y=d.$2(e,f)
return y}finally{$.A=z}},
ba:function(a,b,c,d){var z=C.d!==c
if(z){d=c.cX(d,!(!z||C.d.gd2()===c))
c=C.d}P.fT(new P.fC(d,c,null))},
mr:{
"^":"k:0;a",
$1:function(a){var z,y
H.cx()
z=this.a
y=z.a
z.a=null
y.$0()}},
mq:{
"^":"k:14;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
ms:{
"^":"k:1;a",
$0:function(){H.cx()
this.a.$0()}},
mt:{
"^":"k:1;a",
$0:function(){H.cx()
this.a.$0()}},
nf:{
"^":"b0;a,b",
t:function(a){var z,y
z="Uncaught Error: "+H.l(this.a)
y=this.b
return y!=null?z+("\nStack Trace:\n"+H.l(y)):z},
static:{ng:function(a,b){if(b!=null)return b
if(!!J.v(a).$isa_)return a.gaO()
return}}},
aO:{
"^":"i;"},
fG:{
"^":"i;",
iI:[function(a,b){a=a!=null?a:new P.da()
if(this.a.a!==0)throw H.d(new P.b7("Future already completed"))
$.A.toString
this.aG(a,b)},function(a){return this.iI(a,null)},"iH","$2","$1","giG",2,2,15,0]},
mo:{
"^":"fG;a",
iF:function(a,b){var z=this.a
if(z.a!==0)throw H.d(new P.b7("Future already completed"))
z.hq(b)},
iE:function(a){return this.iF(a,null)},
aG:function(a,b){this.a.dS(a,b)}},
ne:{
"^":"fG;a",
aG:function(a,b){this.a.aG(a,b)}},
bl:{
"^":"i;e6:a<,kj:b>,c,d,e",
gbr:function(){return this.b.b},
geH:function(){return(this.c&1)!==0},
gjq:function(){return this.c===6},
gjo:function(){return this.c===8},
ghI:function(){return this.d},
ghY:function(){return this.d}},
aj:{
"^":"i;cV:a?,br:b<,c",
ghE:function(){return this.a===8},
shG:function(a){if(a)this.a=2
else this.a=0},
fa:function(a,b){var z,y
z=H.o(new P.aj(0,$.A,null),[null])
y=z.b
if(y!==C.d){y.toString
if(b!=null)b=P.fP(b,y)}this.cG(new P.bl(null,z,b==null?1:3,a,b))
return z},
dm:function(a){var z,y
z=$.A
y=new P.aj(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.d)z.toString
this.cG(new P.bl(null,y,8,a,null))
return y},
cR:function(){if(this.a!==0)throw H.d(new P.b7("Future already completed"))
this.a=1},
ghX:function(){return this.c},
gbH:function(){return this.c},
el:function(a){this.a=4
this.c=a},
ek:function(a){this.a=8
this.c=a},
hP:function(a,b){this.ek(new P.b0(a,b))},
cG:function(a){var z
if(this.a>=4){z=this.b
z.toString
P.ba(null,null,z,new P.mG(this,a))}else{a.a=this.c
this.c=a}},
c9:function(){var z,y,x
z=this.c
this.c=null
for(y=null;z!=null;y=z,z=x){x=z.ge6()
z.a=y}return y},
c6:function(a){var z,y
z=J.v(a)
if(!!z.$isaO)if(!!z.$isaj)P.cp(a,this)
else P.dD(a,this)
else{y=this.c9()
this.el(a)
P.aW(this,y)}},
dW:function(a){var z=this.c9()
this.el(a)
P.aW(this,z)},
aG:[function(a,b){var z=this.c9()
this.ek(new P.b0(a,b))
P.aW(this,z)},function(a){return this.aG(a,null)},"l_","$2","$1","gcM",2,2,16,0],
hq:function(a){var z
if(a==null);else{z=J.v(a)
if(!!z.$isaO){if(!!z.$isaj){z=a.a
if(z>=4&&z===8){this.cR()
z=this.b
z.toString
P.ba(null,null,z,new P.mI(this,a))}else P.cp(a,this)}else P.dD(a,this)
return}}this.cR()
z=this.b
z.toString
P.ba(null,null,z,new P.mJ(this,a))},
dS:function(a,b){var z
this.cR()
z=this.b
z.toString
P.ba(null,null,z,new P.mH(this,a,b))},
$isaO:1,
static:{dD:function(a,b){var z,y,x,w
b.scV(2)
try{a.fa(new P.mK(b),new P.mL(b))}catch(x){w=H.a6(x)
z=w
y=H.ab(x)
P.h9(new P.mM(b,z,y))}},cp:function(a,b){var z
b.a=2
z=new P.bl(null,b,0,null,null)
if(a.a>=4)P.aW(a,z)
else a.cG(z)},aW:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.ghE()
if(b==null){if(w){v=z.a.gbH()
y=z.a.gbr()
x=J.aB(v)
u=v.gaO()
y.toString
P.bN(null,null,y,x,u)}return}for(;b.ge6()!=null;b=t){t=b.a
b.a=null
P.aW(z.a,b)}x.a=!0
s=w?null:z.a.ghX()
x.b=s
x.c=!1
y=!w
if(!y||b.geH()||b.c===8){r=b.gbr()
if(w){u=z.a.gbr()
u.toString
if(u==null?r!=null:u!==r){u=u.gd2()
r.toString
u=u===r}else u=!0
u=!u}else u=!1
if(u){v=z.a.gbH()
y=z.a.gbr()
x=J.aB(v)
u=v.gaO()
y.toString
P.bN(null,null,y,x,u)
return}q=$.A
if(q==null?r!=null:q!==r)$.A=r
else q=null
if(y){if(b.geH())x.a=new P.mO(x,b,s,r).$0()}else new P.mN(z,x,b,r).$0()
if(b.gjo())new P.mP(z,x,w,b,r).$0()
if(q!=null)$.A=q
if(x.c)return
if(x.a===!0){y=x.b
y=(s==null?y!=null:s!==y)&&!!J.v(y).$isaO}else y=!1
if(y){p=x.b
o=b.b
if(p instanceof P.aj)if(p.a>=4){o.a=2
z.a=p
b=new P.bl(null,o,0,null,null)
y=p
continue}else P.cp(p,o)
else P.dD(p,o)
return}}o=b.b
b=o.c9()
y=x.a
x=x.b
if(y===!0){o.a=4
o.c=x}else{o.a=8
o.c=x}z.a=o
y=o}}}},
mG:{
"^":"k:1;a,b",
$0:function(){P.aW(this.a,this.b)}},
mK:{
"^":"k:0;a",
$1:function(a){this.a.dW(a)}},
mL:{
"^":"k:6;a",
$2:function(a,b){this.a.aG(a,b)},
$1:function(a){return this.$2(a,null)}},
mM:{
"^":"k:1;a,b,c",
$0:function(){this.a.aG(this.b,this.c)}},
mI:{
"^":"k:1;a,b",
$0:function(){P.cp(this.b,this.a)}},
mJ:{
"^":"k:1;a,b",
$0:function(){this.a.dW(this.b)}},
mH:{
"^":"k:1;a,b,c",
$0:function(){this.a.aG(this.b,this.c)}},
mO:{
"^":"k:17;a,b,c,d",
$0:function(){var z,y,x,w
try{this.a.b=this.d.cl(this.b.ghI(),this.c)
return!0}catch(x){w=H.a6(x)
z=w
y=H.ab(x)
this.a.b=new P.b0(z,y)
return!1}}},
mN:{
"^":"k:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.gbH()
y=!0
r=this.c
if(r.gjq()){x=r.d
try{y=this.d.cl(x,J.aB(z))}catch(q){r=H.a6(q)
w=r
v=H.ab(q)
r=J.aB(z)
p=w
o=(r==null?p==null:r===p)?z:new P.b0(w,v)
r=this.b
r.b=o
r.a=!1
return}}u=r.e
if(y===!0&&u!=null){try{r=u
p=H.bO()
p=H.bc(p,[p,p]).bb(r)
n=this.d
m=this.b
if(p)m.b=n.kk(u,J.aB(z),z.gaO())
else m.b=n.cl(u,J.aB(z))}catch(q){r=H.a6(q)
t=r
s=H.ab(q)
r=J.aB(z)
p=t
o=(r==null?p==null:r===p)?z:new P.b0(t,s)
r=this.b
r.b=o
r.a=!1
return}this.b.a=!0}else{r=this.b
r.b=z
r.a=!1}}},
mP:{
"^":"k:2;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u,t,s
z={}
z.a=null
try{w=this.e.f7(this.d.ghY())
z.a=w
v=w}catch(u){z=H.a6(u)
y=z
x=H.ab(u)
if(this.c){z=J.aB(this.a.a.gbH())
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.b
if(z)v.b=this.a.a.gbH()
else v.b=new P.b0(y,x)
v.a=!1
return}if(!!J.v(v).$isaO){t=this.d
s=t.gkj(t)
s.shG(!0)
this.b.c=!0
v.fa(new P.mQ(this.a,s),new P.mR(z,s))}}},
mQ:{
"^":"k:0;a,b",
$1:function(a){P.aW(this.a.a,new P.bl(null,this.b,0,null,null))}},
mR:{
"^":"k:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!(z.a instanceof P.aj)){y=H.o(new P.aj(0,$.A,null),[null])
z.a=y
y.hP(a,b)}P.aW(z.a,new P.bl(null,this.b,0,null,null))},
$1:function(a){return this.$2(a,null)}},
fC:{
"^":"i;a,kR:b<,bl:c>",
it:function(){return this.a.$0()}},
aV:{
"^":"i;",
b8:function(a,b){return H.o(new P.n3(b,this),[H.a3(this,"aV",0),null])},
G:function(a,b){var z,y
z={}
y=H.o(new P.aj(0,$.A,null),[null])
z.a=null
z.a=this.bx(new P.lF(z,this,b,y),!0,new P.lG(y),y.gcM())
return y},
gj:function(a){var z,y
z={}
y=H.o(new P.aj(0,$.A,null),[P.E])
z.a=0
this.bx(new P.lH(z),!0,new P.lI(z,y),y.gcM())
return y},
aq:function(a){var z,y
z=H.o([],[H.a3(this,"aV",0)])
y=H.o(new P.aj(0,$.A,null),[[P.c,H.a3(this,"aV",0)]])
this.bx(new P.lJ(this,z),!0,new P.lK(z,y),y.gcM())
return y}},
lF:{
"^":"k;a,b,c,d",
$1:function(a){P.nA(new P.lD(this.c,a),new P.lE(),P.nk(this.a.a,this.d))},
$signature:function(){return H.dK(function(a){return{func:1,args:[a]}},this.b,"aV")}},
lD:{
"^":"k:1;a,b",
$0:function(){return this.a.$1(this.b)}},
lE:{
"^":"k:0;",
$1:function(a){}},
lG:{
"^":"k:1;a",
$0:function(){this.a.c6(null)}},
lH:{
"^":"k:0;a",
$1:function(a){++this.a.a}},
lI:{
"^":"k:1;a,b",
$0:function(){this.b.c6(this.a.a)}},
lJ:{
"^":"k;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.dK(function(a){return{func:1,args:[a]}},this.a,"aV")}},
lK:{
"^":"k:1;a,b",
$0:function(){this.b.c6(this.a)}},
lC:{
"^":"i;"},
rB:{
"^":"i;"},
mu:{
"^":"i;br:d<,cV:e?",
d9:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.ey()
if((z&4)===0&&(this.e&32)===0)this.e2(this.ge8())},
eY:function(a){return this.d9(a,null)},
f6:function(a){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gaL(z)}else z=!1
if(z)this.r.cq(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.e2(this.gea())}}}},
cZ:function(a){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.cJ()
return this.f},
cJ:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.ey()
if((this.e&32)===0)this.r=null
this.f=this.e7()},
cI:["fY",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.eh(b)
else this.cH(new P.my(b,null))}],
cF:["fZ",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.ej(a,b)
else this.cH(new P.mA(a,b,null))}],
hr:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.ei()
else this.cH(C.r)},
e9:[function(){},"$0","ge8",0,0,2],
eb:[function(){},"$0","gea",0,0,2],
e7:function(){return},
cH:function(a){var z,y
z=this.r
if(z==null){z=new P.nd(null,null,0)
this.r=z}z.u(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.cq(this)}},
eh:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.dh(this.a,a)
this.e=(this.e&4294967263)>>>0
this.cK((z&4)!==0)},
ej:function(a,b){var z,y
z=this.e
y=new P.mw(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.cJ()
z=this.f
if(!!J.v(z).$isaO)z.dm(y)
else y.$0()}else{y.$0()
this.cK((z&4)!==0)}},
ei:function(){var z,y
z=new P.mv(this)
this.cJ()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.v(y).$isaO)y.dm(z)
else z.$0()},
e2:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.cK((z&4)!==0)},
cK:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gaL(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gaL(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.e9()
else this.eb()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.cq(this)},
hk:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.fP(b,z)
this.c=c}},
mw:{
"^":"k:2;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.bO()
x=H.bc(x,[x,x]).bb(y)
w=z.d
v=this.b
u=z.b
if(x)w.kl(u,v,this.c)
else w.dh(u,v)
z.e=(z.e&4294967263)>>>0}},
mv:{
"^":"k:2;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.f8(z.c)
z.e=(z.e&4294967263)>>>0}},
fH:{
"^":"i;bl:a*"},
my:{
"^":"fH;q:b>,a",
da:function(a){a.eh(this.b)}},
mA:{
"^":"fH;aK:b>,aO:c<,a",
da:function(a){a.ej(this.b,this.c)}},
mz:{
"^":"i;",
da:function(a){a.ei()},
gbl:function(a){return},
sbl:function(a,b){throw H.d(new P.b7("No events after a done."))}},
n5:{
"^":"i;cV:a?",
cq:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.h9(new P.n6(this,a))
this.a=1},
ey:function(){if(this.a===1)this.a=3}},
n6:{
"^":"k:1;a,b",
$0:function(){var z,y
z=this.a
y=z.a
z.a=0
if(y===3)return
z.jl(this.b)}},
nd:{
"^":"n5;b,c,a",
gaL:function(a){return this.c==null},
u:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{J.hW(z,b)
this.c=b}},
jl:function(a){var z,y
z=this.b
y=J.e9(z)
this.b=y
if(y==null)this.c=null
z.da(a)}},
nm:{
"^":"k:1;a,b,c",
$0:function(){return this.a.aG(this.b,this.c)}},
nl:{
"^":"k:18;a,b",
$2:function(a,b){return P.nj(this.a,this.b,a,b)}},
dC:{
"^":"aV;",
bx:function(a,b,c,d){return this.hw(a,d,c,!0===b)},
eP:function(a,b,c){return this.bx(a,null,b,c)},
hw:function(a,b,c,d){return P.mF(this,a,b,c,d,H.a3(this,"dC",0),H.a3(this,"dC",1))},
e3:function(a,b){b.cI(0,a)},
$asaV:function(a,b){return[b]}},
fI:{
"^":"mu;x,y,a,b,c,d,e,f,r",
cI:function(a,b){if((this.e&2)!==0)return
this.fY(this,b)},
cF:function(a,b){if((this.e&2)!==0)return
this.fZ(a,b)},
e9:[function(){var z=this.y
if(z==null)return
z.eY(0)},"$0","ge8",0,0,2],
eb:[function(){var z=this.y
if(z==null)return
z.f6(0)},"$0","gea",0,0,2],
e7:function(){var z=this.y
if(z!=null){this.y=null
z.cZ(0)}return},
l0:[function(a){this.x.e3(a,this)},"$1","ghA",2,0,function(){return H.dK(function(a,b){return{func:1,void:true,args:[a]}},this.$receiver,"fI")}],
l2:[function(a,b){this.cF(a,b)},"$2","ghC",4,0,19],
l1:[function(){this.hr()},"$0","ghB",0,0,2],
hl:function(a,b,c,d,e,f,g){var z,y
z=this.ghA()
y=this.ghC()
this.y=this.x.a.eP(z,this.ghB(),y)},
static:{mF:function(a,b,c,d,e,f,g){var z=$.A
z=H.o(new P.fI(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.hk(b,c,d,e)
z.hl(a,b,c,d,e,f,g)
return z}}},
n3:{
"^":"dC;b,a",
e3:function(a,b){var z,y,x,w,v
z=null
try{z=this.hW(a)}catch(w){v=H.a6(w)
y=v
x=H.ab(w)
P.ni(b,y,x)
return}J.hg(b,z)},
hW:function(a){return this.b.$1(a)}},
b0:{
"^":"i;aK:a>,aO:b<",
t:function(a){return H.l(this.a)},
$isa_:1},
nh:{
"^":"i;"},
nz:{
"^":"k:1;a,b",
$0:function(){var z=this.a
throw H.d(new P.nf(z,P.ng(z,this.b)))}},
n8:{
"^":"nh;",
gd2:function(){return this},
f8:function(a){var z,y,x,w
try{if(C.d===$.A){x=a.$0()
return x}x=P.fQ(null,null,this,a)
return x}catch(w){x=H.a6(w)
z=x
y=H.ab(w)
return P.bN(null,null,this,z,y)}},
dh:function(a,b){var z,y,x,w
try{if(C.d===$.A){x=a.$1(b)
return x}x=P.fS(null,null,this,a,b)
return x}catch(w){x=H.a6(w)
z=x
y=H.ab(w)
return P.bN(null,null,this,z,y)}},
kl:function(a,b,c){var z,y,x,w
try{if(C.d===$.A){x=a.$2(b,c)
return x}x=P.fR(null,null,this,a,b,c)
return x}catch(w){x=H.a6(w)
z=x
y=H.ab(w)
return P.bN(null,null,this,z,y)}},
cX:function(a,b){if(b)return new P.n9(this,a)
else return new P.na(this,a)},
ig:function(a,b){if(b)return new P.nb(this,a)
else return new P.nc(this,a)},
h:function(a,b){return},
f7:function(a){if($.A===C.d)return a.$0()
return P.fQ(null,null,this,a)},
cl:function(a,b){if($.A===C.d)return a.$1(b)
return P.fS(null,null,this,a,b)},
kk:function(a,b,c){if($.A===C.d)return a.$2(b,c)
return P.fR(null,null,this,a,b,c)}},
n9:{
"^":"k:1;a,b",
$0:function(){return this.a.f8(this.b)}},
na:{
"^":"k:1;a,b",
$0:function(){return this.a.f7(this.b)}},
nb:{
"^":"k:0;a,b",
$1:function(a){return this.a.dh(this.b,a)}},
nc:{
"^":"k:0;a,b",
$1:function(a){return this.a.cl(this.b,a)}}}],["","",,P,{
"^":"",
C:function(){return H.o(new H.bF(0,null,null,null,null,null,0),[null,null])},
y:function(a){return H.h1(a,H.o(new H.bF(0,null,null,null,null,null,0),[null,null]))},
kw:function(a,b,c){var z,y
if(P.dH(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bp()
y.push(a)
try{P.nx(a,z)}finally{if(0>=y.length)return H.a(y,0)
y.pop()}y=P.fe(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
c2:function(a,b,c){var z,y,x
if(P.dH(a))return b+"..."+c
z=new P.dm(b)
y=$.$get$bp()
y.push(a)
try{x=z
x.a=P.fe(x.gbp(),a,", ")}finally{if(0>=y.length)return H.a(y,0)
y.pop()}y=z
y.a=y.gbp()+c
y=z.gbp()
return y.charCodeAt(0)==0?y:y},
dH:function(a){var z,y
for(z=0;y=$.$get$bp(),z<y.length;++z)if(a===y[z])return!0
return!1},
nx:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.ga5(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.M())return
w=H.l(z.gV())
b.push(w)
y+=w.length+2;++x}if(!z.M()){if(x<=5)return
if(0>=b.length)return H.a(b,0)
v=b.pop()
if(0>=b.length)return H.a(b,0)
u=b.pop()}else{t=z.gV();++x
if(!z.M()){if(x<=4){b.push(H.l(t))
return}v=H.l(t)
if(0>=b.length)return H.a(b,0)
u=b.pop()
y+=v.length+2}else{s=z.gV();++x
for(;z.M();t=s,s=r){r=z.gV();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.a(b,0)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.l(t)
v=H.l(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.a(b,0)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
c6:function(a,b,c,d,e){return H.o(new H.bF(0,null,null,null,null,null,0),[d,e])},
b4:function(a,b){return P.mZ(a,b)},
bi:function(a,b,c,d){return H.o(new P.mW(0,null,null,null,null,null,0),[d])},
eZ:function(a){var z,y,x
z={}
if(P.dH(a))return"{...}"
y=new P.dm("")
try{$.$get$bp().push(a)
x=y
x.a=x.gbp()+"{"
z.a=!0
J.bw(a,new P.kK(z,y))
z=y
z.a=z.gbp()+"}"}finally{z=$.$get$bp()
if(0>=z.length)return H.a(z,0)
z.pop()}z=y.gbp()
return z.charCodeAt(0)==0?z:z},
mY:{
"^":"bF;a,b,c,d,e,f,r",
bS:function(a){return H.ob(a)&0x3ffffff},
bT:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].geI()
if(x==null?b==null:x===b)return y}return-1},
static:{mZ:function(a,b){return H.o(new P.mY(0,null,null,null,null,null,0),[a,b])}}},
mW:{
"^":"mT;a,b,c,d,e,f,r",
ga5:function(a){var z=new P.eW(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
cb:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.hu(b)},
hu:function(a){var z=this.d
if(z==null)return!1
return this.c8(z[this.c7(a)],a)>=0},
eR:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.cb(0,a)?a:null
else return this.hH(a)},
hH:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.c7(a)]
x=this.c8(y,a)
if(x<0)return
return J.x(y,x).gdZ()},
G:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.d(new P.aa(this))
z=z.b}},
u:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.dT(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.dT(x,b)}else return this.aP(0,b)},
aP:function(a,b){var z,y,x
z=this.d
if(z==null){z=P.mX()
this.d=z}y=this.c7(b)
x=z[y]
if(x==null)z[y]=[this.cL(b)]
else{if(this.c8(x,b)>=0)return!1
x.push(this.cL(b))}return!0},
b9:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.dU(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.dU(this.c,b)
else return this.ht(0,b)},
ht:function(a,b){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.c7(b)]
x=this.c8(y,b)
if(x<0)return!1
this.dV(y.splice(x,1)[0])
return!0},
b1:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
dT:function(a,b){if(a[b]!=null)return!1
a[b]=this.cL(b)
return!0},
dU:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.dV(z)
delete a[b]
return!0},
cL:function(a){var z,y
z=new P.kG(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
dV:function(a){var z,y
z=a.ghs()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
c7:function(a){return J.ac(a)&0x3ffffff},
c8:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a7(a[y].gdZ(),b))return y
return-1},
$ism:1,
static:{mX:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
kG:{
"^":"i;dZ:a<,b,hs:c<"},
eW:{
"^":"i;a,b,c,d",
gV:function(){return this.d},
M:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.aa(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
mT:{
"^":"lr;"},
bj:{
"^":"kQ;"},
kQ:{
"^":"i+I;",
$isc:1,
$asc:null,
$ism:1},
I:{
"^":"i;",
ga5:function(a){return new H.eX(a,this.gj(a),0,null)},
H:function(a,b){return this.h(a,b)},
G:function(a,b){var z,y
z=this.gj(a)
for(y=0;y<z;++y){b.$1(this.h(a,y))
if(z!==this.gj(a))throw H.d(new P.aa(a))}},
b8:function(a,b){return H.o(new H.b5(a,b),[null,null])},
aD:function(a,b){var z,y,x
if(b){z=H.o([],[H.a3(a,"I",0)])
C.a.sj(z,this.gj(a))}else{y=Array(this.gj(a))
y.fixed$length=Array
z=H.o(y,[H.a3(a,"I",0)])}for(x=0;x<this.gj(a);++x){y=this.h(a,x)
if(x>=z.length)return H.a(z,x)
z[x]=y}return z},
aq:function(a){return this.aD(a,!0)},
u:function(a,b){var z=this.gj(a)
this.sj(a,z+1)
this.k(a,z,b)},
t:function(a){return P.c2(a,"[","]")},
$isc:1,
$asc:null,
$ism:1},
kK:{
"^":"k:3;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.l(a)
z.a=y+": "
z.a+=H.l(b)}},
kH:{
"^":"Y;a,b,c,d",
ga5:function(a){return new P.n_(this,this.c,this.d,this.b,null)},
G:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.a(x,y)
b.$1(x[y])
if(z!==this.d)H.S(new P.aa(this))}},
gaL:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
aD:function(a,b){var z,y
if(b){z=H.o([],[H.V(this,0)])
C.a.sj(z,this.gj(this))}else{y=Array(this.gj(this))
y.fixed$length=Array
z=H.o(y,[H.V(this,0)])}this.hZ(z)
return z},
aq:function(a){return this.aD(a,!0)},
u:function(a,b){this.aP(0,b)},
b1:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.a(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
t:function(a){return P.c2(this,"{","}")},
f_:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.d(H.eS());++this.d
y=this.a
x=y.length
if(z>=x)return H.a(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
aP:function(a,b){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.a(z,y)
z[y]=b
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.e1();++this.d},
e1:function(){var z,y,x,w
z=Array(this.a.length*2)
z.fixed$length=Array
y=H.o(z,[H.V(this,0)])
z=this.a
x=this.b
w=z.length-x
C.a.bE(y,0,w,z,x)
C.a.bE(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
hZ:function(a){var z,y,x,w,v
z=this.b
y=this.c
x=this.a
if(z<=y){w=y-z
C.a.bE(a,0,w,x,z)
return w}else{v=x.length-z
C.a.bE(a,0,v,x,z)
C.a.bE(a,v,v+this.c,this.a,0)
return this.c+v}},
h8:function(a,b){var z=Array(8)
z.fixed$length=Array
this.a=H.o(z,[b])},
$ism:1,
static:{d4:function(a,b){var z=H.o(new P.kH(null,0,0,0),[b])
z.h8(a,b)
return z}}},
n_:{
"^":"i;a,b,c,d,e",
gV:function(){return this.e},
M:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.S(new P.aa(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.a(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
ls:{
"^":"i;",
aD:function(a,b){var z,y,x,w,v
if(b){z=H.o([],[H.V(this,0)])
C.a.sj(z,this.gj(this))}else{y=Array(this.gj(this))
y.fixed$length=Array
z=H.o(y,[H.V(this,0)])}for(y=this.ga5(this),x=0;y.M();x=v){w=y.d
v=x+1
if(x>=z.length)return H.a(z,x)
z[x]=w}return z},
aq:function(a){return this.aD(a,!0)},
b8:function(a,b){return H.o(new H.eB(this,b),[H.V(this,0),null])},
t:function(a){return P.c2(this,"{","}")},
G:function(a,b){var z
for(z=this.ga5(this);z.M();)b.$1(z.d)},
$ism:1},
lr:{
"^":"ls;"}}],["","",,P,{
"^":"",
nB:function(a){return H.lL(a)},
cW:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.b_(a)
if(typeof a==="string")return JSON.stringify(a)
return P.j4(a)},
j4:function(a){var z=J.v(a)
if(!!z.$isk)return z.t(a)
return H.cd(a)},
bZ:function(a){return new P.mE(a)},
aP:function(a,b,c){var z,y
z=H.o([],[c])
for(y=J.aY(a);y.M();)z.push(y.gV())
if(b)return z
z.fixed$length=Array
return z},
kI:function(a,b,c,d){var z,y,x
if(c){z=H.o([],[d])
C.a.sj(z,a)}else z=H.o(Array(a),[d])
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
a5:function(a){var z=H.l(a)
H.cz(z)},
q2:{
"^":"k:20;a,b",
$2:function(a,b){this.b.a+=this.a.a
P.nB(a)}},
dI:{
"^":"i;"},
"+bool":0,
bA:{
"^":"i;a,b",
O:function(a,b){if(b==null)return!1
if(!(b instanceof P.bA))return!1
return this.a===b.a&&this.b===b.b},
gah:function(a){return this.a},
t:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.iM(z?H.ae(this).getUTCFullYear()+0:H.ae(this).getFullYear()+0)
x=P.bB(z?H.ae(this).getUTCMonth()+1:H.ae(this).getMonth()+1)
w=P.bB(z?H.ae(this).getUTCDate()+0:H.ae(this).getDate()+0)
v=P.bB(z?H.ae(this).getUTCHours()+0:H.ae(this).getHours()+0)
u=P.bB(z?H.ae(this).getUTCMinutes()+0:H.ae(this).getMinutes()+0)
t=P.bB(z?H.ae(this).getUTCSeconds()+0:H.ae(this).getSeconds()+0)
s=P.iN(z?H.ae(this).getUTCMilliseconds()+0:H.ae(this).getMilliseconds()+0)
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
u:function(a,b){return P.eu(C.c.p(this.a,b.gle()),this.b)},
h6:function(a,b){if(Math.abs(a)>864e13)throw H.d(P.ax(a))},
static:{eu:function(a,b){var z=new P.bA(a,b)
z.h6(a,b)
return z},iM:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.l(z)
if(z>=10)return y+"00"+H.l(z)
return y+"000"+H.l(z)},iN:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},bB:function(a){if(a>=10)return""+a
return"0"+a}}},
bq:{
"^":"aI;"},
"+double":0,
b2:{
"^":"i;bq:a<",
p:function(a,b){return new P.b2(C.c.p(this.a,b.gbq()))},
aa:function(a,b){return new P.b2(this.a-b.gbq())},
b_:function(a,b){return C.c.b_(this.a,b.gbq())},
aE:function(a,b){return this.a>b.gbq()},
cp:function(a,b){return C.c.cp(this.a,b.gbq())},
ai:function(a,b){return C.c.ai(this.a,b.gbq())},
O:function(a,b){if(b==null)return!1
if(!(b instanceof P.b2))return!1
return this.a===b.a},
gah:function(a){return this.a&0x1FFFFFFF},
t:function(a){var z,y,x,w,v
z=new P.iZ()
y=this.a
if(y<0)return"-"+new P.b2(-y).t(0)
x=z.$1(C.c.dc(C.c.aR(y,6e7),60))
w=z.$1(C.c.dc(C.c.aR(y,1e6),60))
v=new P.iY().$1(C.c.dc(y,1e6))
return""+C.c.aR(y,36e8)+":"+H.l(x)+":"+H.l(w)+"."+H.l(v)},
aN:function(a){return new P.b2(-this.a)},
static:{iX:function(a,b,c,d,e,f){return new P.b2(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
iY:{
"^":"k:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
iZ:{
"^":"k:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
a_:{
"^":"i;",
gaO:function(){return H.ab(this.$thrownJsError)}},
da:{
"^":"a_;",
t:function(a){return"Throw of null."}},
aM:{
"^":"a_;a,b,c,d",
gcO:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gcN:function(){return""},
t:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.l(z)+")":""
z=this.d
x=z==null?"":": "+H.l(z)
w=this.gcO()+y+x
if(!this.a)return w
v=this.gcN()
u=P.cW(this.b)
return w+v+": "+H.l(u)},
static:{ax:function(a){return new P.aM(!1,null,null,a)},ii:function(a,b,c){return new P.aM(!0,a,b,c)},ih:function(a){return new P.aM(!0,null,a,"Must not be null")}}},
dg:{
"^":"aM;e,f,a,b,c,d",
gcO:function(){return"RangeError"},
gcN:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.l(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.l(z)
else{if(typeof x!=="number")return x.aE()
if(typeof z!=="number")return H.n(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
static:{ld:function(a){return new P.dg(null,null,!1,null,null,a)},bI:function(a,b,c){return new P.dg(null,null,!0,a,b,"Value not in range")},aT:function(a,b,c,d,e){return new P.dg(b,c,!0,a,d,"Invalid value")},f8:function(a,b,c,d,e,f){if(0>a||a>c)throw H.d(P.aT(a,0,c,"start",f))
if(a>b||b>c)throw H.d(P.aT(b,a,c,"end",f))
return b}}},
jF:{
"^":"aM;e,j:f>,a,b,c,d",
gcO:function(){return"RangeError"},
gcN:function(){P.cW(this.e)
var z=": index should be less than "+H.l(this.f)
return J.br(this.b,0)?": index must not be negative":z},
static:{L:function(a,b,c,d,e){var z=e!=null?e:J.ao(b)
return new P.jF(b,z,!0,a,c,"Index out of range")}}},
t:{
"^":"a_;a",
t:function(a){return"Unsupported operation: "+this.a}},
cl:{
"^":"a_;a",
t:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.l(z):"UnimplementedError"}},
b7:{
"^":"a_;a",
t:function(a){return"Bad state: "+this.a}},
aa:{
"^":"a_;a",
t:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.l(P.cW(z))+"."}},
kT:{
"^":"i;",
t:function(a){return"Out of Memory"},
gaO:function(){return},
$isa_:1},
fd:{
"^":"i;",
t:function(a){return"Stack Overflow"},
gaO:function(){return},
$isa_:1},
iK:{
"^":"a_;a",
t:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
mE:{
"^":"i;a",
t:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.l(z)}},
jg:{
"^":"i;a,b,c",
t:function(a){var z,y
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.l(z):"FormatException"
return y}},
j7:{
"^":"i;a",
t:function(a){return"Expando:"+H.l(this.a)},
h:function(a,b){var z=H.cc(b,"expando$values")
return z==null?null:H.cc(z,this.e0(0))},
k:function(a,b,c){var z=H.cc(b,"expando$values")
if(z==null){z=new P.i()
H.de(b,"expando$values",z)}H.de(z,this.e0(0),c)},
e0:function(a){var z,y
z=H.cc(this,"expando$key")
if(z==null){y=$.eH
$.eH=y+1
z="expando$key$"+y
H.de(this,"expando$key",z)}return z}},
ji:{
"^":"i;"},
E:{
"^":"aI;"},
"+int":0,
Y:{
"^":"i;",
b8:function(a,b){return H.c8(this,b,H.a3(this,"Y",0),null)},
G:function(a,b){var z
for(z=this.ga5(this);z.M();)b.$1(z.gV())},
aD:function(a,b){return P.aP(this,b,H.a3(this,"Y",0))},
aq:function(a){return this.aD(a,!0)},
gj:function(a){var z,y
z=this.ga5(this)
for(y=0;z.M();)++y
return y},
H:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(P.ih("index"))
if(b<0)H.S(P.aT(b,0,null,"index",null))
for(z=this.ga5(this),y=0;z.M();){x=z.gV()
if(b===y)return x;++y}throw H.d(P.L(b,this,"index",null,y))},
t:function(a){return P.kw(this,"(",")")}},
c3:{
"^":"i;"},
c:{
"^":"i;",
$asc:null,
$isY:1,
$ism:1},
"+List":0,
ai:{
"^":"i;",
$asai:null},
q3:{
"^":"i;",
t:function(a){return"null"}},
"+Null":0,
aI:{
"^":"i;"},
"+num":0,
i:{
"^":";",
O:function(a,b){return this===b},
gah:function(a){return H.aS(this)},
t:function(a){return H.cd(this)}},
aU:{
"^":"i;"},
U:{
"^":"i;"},
"+String":0,
dm:{
"^":"i;bp:a<",
gj:function(a){return this.a.length},
t:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
static:{fe:function(a,b,c){var z=J.aY(b)
if(!z.M())return a
if(c.length===0){do a+=H.l(z.gV())
while(z.M())}else{a+=H.l(z.gV())
for(;z.M();)a=a+c+H.l(z.gV())}return a}}},
ff:{
"^":"i;"}}],["","",,W,{
"^":"",
iv:function(a,b){var z=document.createElement("canvas",null)
return z},
iG:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.B)},
mB:function(a,b){return document.createElement(a)},
eP:function(a,b,c){var z=document.createElement("img",null)
return z},
aX:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
fJ:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
aw:function(a){var z=$.A
if(z===C.d)return a
return z.ig(a,!0)},
B:{
"^":"ar;",
$isB:1,
$isar:1,
$isT:1,
$isi:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFontElement|HTMLFrameElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLabelElement|HTMLLegendElement|HTMLMapElement|HTMLMarqueeElement|HTMLModElement|HTMLOptGroupElement|HTMLParagraphElement|HTMLPictureElement|HTMLPreElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
rA:{
"^":"h;",
$isc:1,
$asc:function(){return[W.j1]},
$ism:1,
"%":"EntryArray"},
on:{
"^":"B;D:type=",
t:function(a){return String(a)},
$ish:1,
"%":"HTMLAnchorElement"},
ig:{
"^":"H;",
$isig:1,
$isi:1,
"%":"AnimationPlayer"},
oq:{
"^":"B;",
t:function(a){return String(a)},
$ish:1,
"%":"HTMLAreaElement"},
ot:{
"^":"h;X:id=",
"%":"AudioTrack"},
ou:{
"^":"H;j:length=",
"%":"AudioTrackList"},
ov:{
"^":"h;dl:visible=",
"%":"BarProp"},
cP:{
"^":"h;ae:size=,D:type=",
$iscP:1,
"%":";Blob"},
iq:{
"^":"h;",
"%":"Response;Body"},
ox:{
"^":"B;",
gd7:function(a){return H.o(new W.aA(a,"error",!1),[null])},
gd8:function(a){return H.o(new W.aA(a,"load",!1),[null])},
$ish:1,
"%":"HTMLBodyElement"},
oz:{
"^":"B;D:type=,q:value%",
"%":"HTMLButtonElement"},
oA:{
"^":"h;i:storage=",
"%":"Canvas2DContextAttributes"},
cT:{
"^":"B;E:height%,F:width%",
dq:function(a,b,c){return a.getContext(b,P.nL(c))},
fn:function(a,b,c,d,e,f,g){var z,y
z=P.y(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.dq(a,"webgl",z)
return y==null?this.dq(a,"experimental-webgl",z):y},
fm:function(a,b,c,d,e,f){return this.fn(a,b,c,!0,d,e,f)},
$iscT:1,
"%":"HTMLCanvasElement"},
oB:{
"^":"h;",
eO:function(a,b){return a.lineWidth.$1(b)},
"%":"CanvasRenderingContext2D"},
oD:{
"^":"T;j:length=",
$ish:1,
"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
oF:{
"^":"h;X:id=",
"%":"Credential|FederatedCredential|LocalCredential"},
oG:{
"^":"h;D:type=",
"%":"CryptoKey"},
cV:{
"^":"h;D:type=",
$isi:1,
"%":"CSSCharsetRule|CSSFontFaceRule|CSSImportRule|CSSKeyframeRule|CSSKeyframesRule|CSSMediaRule|CSSPageRule|CSSRule|CSSStyleRule|CSSSupportsRule|CSSUnknownRule|CSSViewportRule|MozCSSKeyframeRule|MozCSSKeyframesRule|WebKitCSSFilterRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule"},
oH:{
"^":"jH;j:length=",
c1:function(a,b){var z=this.hz(a,b)
return z!=null?z:""},
hz:function(a,b){if(W.iG(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.iO()+b)},
gbe:function(a){return a.color},
gbL:function(a){return a.content},
gI:function(a){return a.position},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
jH:{
"^":"h+iF;"},
iF:{
"^":"i;",
gbe:function(a){return this.c1(a,"color")},
gbL:function(a){return this.c1(a,"content")},
gI:function(a){return this.c1(a,"position")},
gae:function(a){return this.c1(a,"size")}},
iL:{
"^":"h;D:type=",
$isiL:1,
$isi:1,
"%":"DataTransferItem"},
oJ:{
"^":"h;j:length=",
ep:function(a,b,c){return a.add(b,c)},
u:function(a,b){return a.add(b)},
h:function(a,b){return a[b]},
"%":"DataTransferItemList"},
oK:{
"^":"h;m:x=,n:y=,w:z=",
"%":"DeviceAcceleration"},
oL:{
"^":"bY;q:value=",
"%":"DeviceLightEvent"},
iQ:{
"^":"T;",
"%":"XMLDocument;Document"},
oM:{
"^":"T;",
gbK:function(a){if(a._docChildren==null)a._docChildren=new P.eJ(a,new W.dB(a))
return a._docChildren},
$ish:1,
"%":"DocumentFragment|ShadowRoot"},
oN:{
"^":"h;",
t:function(a){return String(a)},
"%":"DOMException"},
iR:{
"^":"h;",
eT:[function(a,b){return a.next(b)},function(a){return a.next()},"jT","$1","$0","gbl",0,2,21,0],
$isiR:1,
$isi:1,
"%":"Iterator"},
iS:{
"^":"iT;",
$isiS:1,
$isi:1,
"%":"DOMMatrix"},
iT:{
"^":"h;",
"%":";DOMMatrixReadOnly"},
oO:{
"^":"iU;",
gaw:function(a){return a.w},
gm:function(a){return a.x},
gn:function(a){return a.y},
gw:function(a){return a.z},
"%":"DOMPoint"},
iU:{
"^":"h;aw:w=,m:x=,n:y=,w:z=",
"%":";DOMPointReadOnly"},
iV:{
"^":"h;cY:bottom=,E:height=,aV:left=,df:right=,bA:top=,F:width=,m:x=,n:y=",
t:function(a){return"Rectangle ("+H.l(a.left)+", "+H.l(a.top)+") "+H.l(this.gF(a))+" x "+H.l(this.gE(a))},
O:function(a,b){var z,y,x
if(b==null)return!1
z=J.v(b)
if(!z.$isav)return!1
y=a.left
x=z.gaV(b)
if(y==null?x==null:y===x){y=a.top
x=z.gbA(b)
if(y==null?x==null:y===x){y=this.gF(a)
x=z.gF(b)
if(y==null?x==null:y===x){y=this.gE(a)
z=z.gE(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gah:function(a){var z,y,x,w
z=J.ac(a.left)
y=J.ac(a.top)
x=J.ac(this.gF(a))
w=J.ac(this.gE(a))
return W.fJ(W.aX(W.aX(W.aX(W.aX(0,z),y),x),w))},
$isav:1,
$asav:I.ct,
"%":";DOMRectReadOnly"},
oP:{
"^":"iW;q:value%",
"%":"DOMSettableTokenList"},
oQ:{
"^":"k2;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[P.U]},
$ism:1,
$isP:1,
$isO:1,
"%":"DOMStringList"},
jI:{
"^":"h+I;",
$isc:1,
$asc:function(){return[P.U]},
$ism:1},
k2:{
"^":"jI+M;",
$isc:1,
$asc:function(){return[P.U]},
$ism:1},
iW:{
"^":"h;j:length=",
u:function(a,b){return a.add(b)},
"%":";DOMTokenList"},
mx:{
"^":"bj;a,b",
gj:function(a){return this.b.length},
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.b
if(b<0||b>=z.length)return H.a(z,b)
this.a.replaceChild(c,z[b])},
sj:function(a,b){throw H.d(new P.t("Cannot resize element lists"))},
u:function(a,b){this.a.appendChild(b)
return b},
ga5:function(a){var z=this.aq(this)
return new J.cO(z,z.length,0,null)},
$asbj:function(){return[W.ar]},
$asc:function(){return[W.ar]}},
ar:{
"^":"T;X:id%",
gbK:function(a){return new W.mx(a,a.children)},
t:function(a){return a.localName},
gd7:function(a){return H.o(new W.aA(a,"error",!1),[null])},
gd8:function(a){return H.o(new W.aA(a,"load",!1),[null])},
gck:function(a){return H.o(new W.aA(a,"mousedown",!1),[null])},
$isar:1,
$isT:1,
$isi:1,
$ish:1,
"%":";Element"},
oR:{
"^":"B;E:height%,b0:src},D:type=,F:width%",
"%":"HTMLEmbedElement"},
j1:{
"^":"h;",
hK:function(a,b,c){return a.remove(H.ak(b,0),H.ak(c,1))},
eZ:function(a){var z=H.o(new P.mo(H.o(new P.aj(0,$.A,null),[null])),[null])
this.hK(a,new W.j2(z),new W.j3(z))
return z.a},
$isi:1,
"%":"DirectoryEntry|Entry|FileEntry"},
j2:{
"^":"k:1;a",
$0:function(){this.a.iE(0)}},
j3:{
"^":"k:0;a",
$1:function(a){this.a.iH(a)}},
oS:{
"^":"bY;aK:error=",
"%":"ErrorEvent"},
bY:{
"^":"h;D:type=",
k7:function(a){return a.preventDefault()},
"%":"AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;ClipboardEvent|Event|InputEvent"},
H:{
"^":"h;",
i2:function(a,b,c,d){if(c!=null)this.bo(a,b,c,d)},
kc:function(a,b,c,d){if(c!=null)this.hL(a,b,c,d)},
bo:function(a,b,c,d){return a.addEventListener(b,H.ak(c,1),d)},
hL:function(a,b,c,d){return a.removeEventListener(b,H.ak(c,1),d)},
"%":"ApplicationCache|AudioContext|BatteryManager|DOMApplicationCache|EventSource|IDBDatabase|InputMethodContext|MIDIAccess|MediaController|MediaQueryList|MediaSource|MessagePort|Notification|OfflineAudioContext|OfflineResourceList|Performance|Presentation|RTCDTMFSender|RTCPeerConnection|ServiceWorkerRegistration|SpeechRecognition|SpeechSynthesis|SpeechSynthesisUtterance|mozRTCPeerConnection|webkitAudioContext;EventTarget;eD|eF|eE|eG"},
pa:{
"^":"B;D:type=",
"%":"HTMLFieldSetElement"},
bC:{
"^":"cP;",
$isbC:1,
$isi:1,
"%":"File"},
eI:{
"^":"k3;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$iseI:1,
$isc:1,
$asc:function(){return[W.bC]},
$ism:1,
$isP:1,
$isO:1,
"%":"FileList"},
jJ:{
"^":"h+I;",
$isc:1,
$asc:function(){return[W.bC]},
$ism:1},
k3:{
"^":"jJ+M;",
$isc:1,
$asc:function(){return[W.bC]},
$ism:1},
pb:{
"^":"H;aK:error=",
"%":"FileReader"},
pc:{
"^":"h;D:type=",
"%":"Stream"},
pd:{
"^":"H;aK:error=,j:length=,I:position=",
"%":"FileWriter"},
jf:{
"^":"h;",
$isjf:1,
$isi:1,
"%":"FontFace"},
pf:{
"^":"H;ae:size=",
u:function(a,b){return a.add(b)},
jg:function(a,b,c){return a.forEach(H.ak(b,3),c)},
G:function(a,b){b=H.ak(b,3)
return a.forEach(b)},
"%":"FontFaceSet"},
ph:{
"^":"B;j:length=",
"%":"HTMLFormElement"},
d_:{
"^":"h;X:id=",
$isi:1,
"%":"Gamepad"},
pi:{
"^":"h;q:value=",
"%":"GamepadButton"},
pj:{
"^":"h;X:id=",
"%":"CircularGeofencingRegion|GeofencingRegion"},
pk:{
"^":"B;be:color=",
"%":"HTMLHRElement"},
pl:{
"^":"h;ae:size=",
jg:function(a,b,c){return a.forEach(H.ak(b,3),c)},
G:function(a,b){b=H.ak(b,3)
return a.forEach(b)},
"%":"Headers"},
pm:{
"^":"h;j:length=",
"%":"History"},
pn:{
"^":"k4;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.T]},
$ism:1,
$isP:1,
$isO:1,
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
jK:{
"^":"h+I;",
$isc:1,
$asc:function(){return[W.T]},
$ism:1},
k4:{
"^":"jK+M;",
$isc:1,
$asc:function(){return[W.T]},
$ism:1},
jz:{
"^":"iQ;",
"%":"HTMLDocument"},
po:{
"^":"jA;",
bn:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
jA:{
"^":"H;",
"%":"XMLHttpRequestUpload;XMLHttpRequestEventTarget"},
pp:{
"^":"B;E:height%,b0:src},F:width%",
"%":"HTMLIFrameElement"},
d0:{
"^":"h;",
$isd0:1,
"%":"ImageData"},
d1:{
"^":"B;cd:crossOrigin},E:height%,b0:src},F:width%",
$isd1:1,
"%":"HTMLImageElement"},
pr:{
"^":"B;E:height%,ae:size=,b0:src},D:type=,q:value%,F:width%",
$isar:1,
$ish:1,
"%":"HTMLInputElement"},
pu:{
"^":"fw;",
gjL:function(a){return a.keyCode},
"%":"KeyboardEvent"},
pv:{
"^":"B;D:type=",
"%":"HTMLKeygenElement"},
pw:{
"^":"B;q:value%",
"%":"HTMLLIElement"},
py:{
"^":"B;cd:crossOrigin},D:type=",
"%":"HTMLLinkElement"},
pz:{
"^":"h;",
t:function(a){return String(a)},
"%":"Location"},
kM:{
"^":"B;cd:crossOrigin},aK:error=,b0:src}",
"%":"HTMLAudioElement;HTMLMediaElement"},
pD:{
"^":"H;aK:error=",
"%":"MediaKeySession"},
pE:{
"^":"h;j:length=",
"%":"MediaList"},
pF:{
"^":"H;X:id=",
af:function(a){return a.clone()},
"%":"MediaStream"},
pG:{
"^":"H;X:id=",
af:function(a){return a.clone()},
"%":"MediaStreamTrack"},
pH:{
"^":"B;D:type=",
"%":"HTMLMenuElement"},
pI:{
"^":"B;D:type=",
"%":"HTMLMenuItemElement"},
pJ:{
"^":"B;bL:content=",
"%":"HTMLMetaElement"},
pK:{
"^":"h;ae:size=",
"%":"Metadata"},
pL:{
"^":"B;q:value%",
"%":"HTMLMeterElement"},
pM:{
"^":"h;ae:size=",
"%":"MIDIInputMap"},
pN:{
"^":"kN;",
kS:function(a,b,c){return a.send(b,c)},
bn:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
pO:{
"^":"h;ae:size=",
"%":"MIDIOutputMap"},
kN:{
"^":"H;X:id=,D:type=",
"%":"MIDIInput;MIDIPort"},
d6:{
"^":"h;D:type=",
$isi:1,
"%":"MimeType"},
pP:{
"^":"kf;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.d6]},
$ism:1,
$isP:1,
$isO:1,
"%":"MimeTypeArray"},
jV:{
"^":"h+I;",
$isc:1,
$asc:function(){return[W.d6]},
$ism:1},
kf:{
"^":"jV+M;",
$isc:1,
$asc:function(){return[W.d6]},
$ism:1},
pQ:{
"^":"fw;ip:button=",
gjS:function(a){return H.o(new P.bH(a.webkitMovementX,a.webkitMovementY),[null])},
"%":"DragEvent|MSPointerEvent|MouseEvent|PointerEvent|WheelEvent"},
pR:{
"^":"h;D:type=",
"%":"MutationRecord"},
q0:{
"^":"h;",
$ish:1,
"%":"Navigator"},
q1:{
"^":"H;D:type=",
"%":"NetworkInformation"},
dB:{
"^":"bj;a",
u:function(a,b){this.a.appendChild(b)},
k:function(a,b,c){var z,y
z=this.a
y=z.childNodes
if(b<0||b>=y.length)return H.a(y,b)
z.replaceChild(c,y[b])},
ga5:function(a){return C.D.ga5(this.a.childNodes)},
gj:function(a){return this.a.childNodes.length},
sj:function(a,b){throw H.d(new P.t("Cannot set length on immutable List."))},
h:function(a,b){var z=this.a.childNodes
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
$asbj:function(){return[W.T]},
$asc:function(){return[W.T]}},
T:{
"^":"H;",
gjV:function(a){return new W.dB(a)},
eZ:function(a){var z=a.parentNode
if(z!=null)z.removeChild(a)},
ki:function(a,b){var z,y
try{z=a.parentNode
J.hh(z,b,a)}catch(y){H.a6(y)}return a},
t:function(a){var z=a.nodeValue
return z==null?this.fX(a):z},
hO:function(a,b,c){return a.replaceChild(b,c)},
$isT:1,
$isi:1,
"%":";Node"},
kO:{
"^":"kg;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.T]},
$ism:1,
$isP:1,
$isO:1,
"%":"NodeList|RadioNodeList"},
jW:{
"^":"h+I;",
$isc:1,
$asc:function(){return[W.T]},
$ism:1},
kg:{
"^":"jW+M;",
$isc:1,
$asc:function(){return[W.T]},
$ism:1},
q5:{
"^":"B;D:type=",
"%":"HTMLOListElement"},
q6:{
"^":"B;E:height%,D:type=,F:width%",
"%":"HTMLObjectElement"},
q8:{
"^":"B;q:value%",
"%":"HTMLOptionElement"},
qa:{
"^":"B;D:type=,q:value%",
"%":"HTMLOutputElement"},
qb:{
"^":"B;q:value%",
"%":"HTMLParamElement"},
qc:{
"^":"h;",
$ish:1,
"%":"Path2D"},
qx:{
"^":"h;D:type=",
"%":"PerformanceNavigation"},
dc:{
"^":"h;j:length=",
$isi:1,
"%":"Plugin"},
qy:{
"^":"kh;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.dc]},
$ism:1,
$isP:1,
$isO:1,
"%":"PluginArray"},
jX:{
"^":"h+I;",
$isc:1,
$asc:function(){return[W.dc]},
$ism:1},
kh:{
"^":"jX+M;",
$isc:1,
$asc:function(){return[W.dc]},
$ism:1},
qB:{
"^":"B;I:position=,q:value%",
"%":"HTMLProgressElement"},
qI:{
"^":"H;X:id=",
bn:function(a,b){return a.send(b)},
"%":"DataChannel|RTCDataChannel"},
qJ:{
"^":"h;D:type=",
"%":"RTCSessionDescription|mozRTCSessionDescription"},
lo:{
"^":"h;X:id=,D:type=",
$islo:1,
$isi:1,
"%":"RTCStatsReport"},
qK:{
"^":"H;D:type=",
"%":"ScreenOrientation"},
qL:{
"^":"B;cd:crossOrigin},b0:src},D:type=",
"%":"HTMLScriptElement"},
qN:{
"^":"B;j:length%,ae:size=,D:type=,q:value%",
"%":"HTMLSelectElement"},
qO:{
"^":"h;D:type=",
"%":"Selection"},
qP:{
"^":"h;X:id=",
"%":"ServiceWorkerClient"},
qQ:{
"^":"H;",
$ish:1,
"%":"SharedWorker"},
dj:{
"^":"H;",
$isi:1,
"%":"SourceBuffer"},
qR:{
"^":"eF;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.dj]},
$ism:1,
$isP:1,
$isO:1,
"%":"SourceBufferList"},
eD:{
"^":"H+I;",
$isc:1,
$asc:function(){return[W.dj]},
$ism:1},
eF:{
"^":"eD+M;",
$isc:1,
$asc:function(){return[W.dj]},
$ism:1},
qS:{
"^":"B;b0:src},D:type=",
"%":"HTMLSourceElement"},
qT:{
"^":"h;X:id=",
"%":"SourceInfo"},
dk:{
"^":"h;",
$isi:1,
"%":"SpeechGrammar"},
qU:{
"^":"ki;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.dk]},
$ism:1,
$isP:1,
$isO:1,
"%":"SpeechGrammarList"},
jY:{
"^":"h+I;",
$isc:1,
$asc:function(){return[W.dk]},
$ism:1},
ki:{
"^":"jY+M;",
$isc:1,
$asc:function(){return[W.dk]},
$ism:1},
qV:{
"^":"bY;aK:error=",
"%":"SpeechRecognitionError"},
dl:{
"^":"h;j:length=",
$isi:1,
"%":"SpeechRecognitionResult"},
qX:{
"^":"h;",
h:function(a,b){return a.getItem(b)},
k:function(a,b,c){a.setItem(b,c)},
G:function(a,b){var z,y
for(z=0;!0;++z){y=a.key(z)
if(y==null)return
b.$2(y,a.getItem(y))}},
gj:function(a){return a.length},
$isai:1,
$asai:function(){return[P.U,P.U]},
"%":"Storage"},
qZ:{
"^":"B;D:type=",
"%":"HTMLStyleElement"},
r0:{
"^":"h;D:type=",
"%":"StyleMedia"},
dn:{
"^":"h;D:type=",
$isi:1,
"%":"CSSStyleSheet|StyleSheet"},
r3:{
"^":"B;bL:content=",
"%":"HTMLTemplateElement"},
r4:{
"^":"B;D:type=,q:value%",
"%":"HTMLTextAreaElement"},
dp:{
"^":"H;X:id=",
$isi:1,
"%":"TextTrack"},
ci:{
"^":"H;X:id%",
$isi:1,
"%":";TextTrackCue"},
r6:{
"^":"kj;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isP:1,
$isO:1,
$isc:1,
$asc:function(){return[W.ci]},
$ism:1,
"%":"TextTrackCueList"},
jZ:{
"^":"h+I;",
$isc:1,
$asc:function(){return[W.ci]},
$ism:1},
kj:{
"^":"jZ+M;",
$isc:1,
$asc:function(){return[W.ci]},
$ism:1},
r7:{
"^":"eG;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.dp]},
$ism:1,
$isP:1,
$isO:1,
"%":"TextTrackList"},
eE:{
"^":"H+I;",
$isc:1,
$asc:function(){return[W.dp]},
$ism:1},
eG:{
"^":"eE+M;",
$isc:1,
$asc:function(){return[W.dp]},
$ism:1},
r8:{
"^":"h;j:length=",
"%":"TimeRanges"},
dt:{
"^":"h;",
$isi:1,
"%":"Touch"},
r9:{
"^":"kk;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.dt]},
$ism:1,
$isP:1,
$isO:1,
"%":"TouchList"},
k_:{
"^":"h+I;",
$isc:1,
$asc:function(){return[W.dt]},
$ism:1},
kk:{
"^":"k_+M;",
$isc:1,
$asc:function(){return[W.dt]},
$ism:1},
ra:{
"^":"B;b0:src}",
"%":"HTMLTrackElement"},
fw:{
"^":"bY;",
"%":"CompositionEvent|FocusEvent|SVGZoomEvent|TextEvent|TouchEvent;UIEvent"},
rd:{
"^":"h;",
t:function(a){return String(a)},
$ish:1,
"%":"URL"},
dw:{
"^":"kM;E:height%,F:width%",
$isdw:1,
"%":"HTMLVideoElement"},
rf:{
"^":"h;X:id=",
"%":"VideoTrack"},
rg:{
"^":"H;j:length=",
"%":"VideoTrackList"},
rk:{
"^":"ci;I:position=,ae:size=",
"%":"VTTCue"},
rl:{
"^":"h;X:id%",
"%":"VTTRegion"},
rm:{
"^":"h;j:length=",
"%":"VTTRegionList"},
rn:{
"^":"H;",
bn:function(a,b){return a.send(b)},
"%":"WebSocket"},
ml:{
"^":"H;",
ef:function(a,b){return a.requestAnimationFrame(H.ak(b,1))},
e_:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$ish:1,
"%":"DOMWindow|Window"},
ro:{
"^":"H;",
$ish:1,
"%":"Worker"},
rp:{
"^":"H;",
$ish:1,
"%":"DedicatedWorkerGlobalScope|ServiceWorkerGlobalScope|SharedWorkerGlobalScope|WorkerGlobalScope"},
rt:{
"^":"T;q:value%",
"%":"Attr"},
cm:{
"^":"h;",
$isi:1,
"%":"CSSPrimitiveValue;CSSValue;fE|fF"},
ru:{
"^":"h;cY:bottom=,E:height=,aV:left=,df:right=,bA:top=,F:width=",
t:function(a){return"Rectangle ("+H.l(a.left)+", "+H.l(a.top)+") "+H.l(a.width)+" x "+H.l(a.height)},
O:function(a,b){var z,y,x
if(b==null)return!1
z=J.v(b)
if(!z.$isav)return!1
y=a.left
x=z.gaV(b)
if(y==null?x==null:y===x){y=a.top
x=z.gbA(b)
if(y==null?x==null:y===x){y=a.width
x=z.gF(b)
if(y==null?x==null:y===x){y=a.height
z=z.gE(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gah:function(a){var z,y,x,w
z=J.ac(a.left)
y=J.ac(a.top)
x=J.ac(a.width)
w=J.ac(a.height)
return W.fJ(W.aX(W.aX(W.aX(W.aX(0,z),y),x),w))},
$isav:1,
$asav:I.ct,
"%":"ClientRect"},
rv:{
"^":"kl;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isP:1,
$isO:1,
$isc:1,
$asc:function(){return[P.av]},
$ism:1,
"%":"ClientRectList|DOMRectList"},
k0:{
"^":"h+I;",
$isc:1,
$asc:function(){return[P.av]},
$ism:1},
kl:{
"^":"k0+M;",
$isc:1,
$asc:function(){return[P.av]},
$ism:1},
rw:{
"^":"km;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.cV]},
$ism:1,
$isP:1,
$isO:1,
"%":"CSSRuleList"},
k1:{
"^":"h+I;",
$isc:1,
$asc:function(){return[W.cV]},
$ism:1},
km:{
"^":"k1+M;",
$isc:1,
$asc:function(){return[W.cV]},
$ism:1},
rx:{
"^":"fF;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.cm]},
$ism:1,
$isP:1,
$isO:1,
"%":"CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue"},
fE:{
"^":"cm+I;",
$isc:1,
$asc:function(){return[W.cm]},
$ism:1},
fF:{
"^":"fE+M;",
$isc:1,
$asc:function(){return[W.cm]},
$ism:1},
ry:{
"^":"T;",
$ish:1,
"%":"DocumentType"},
rz:{
"^":"iV;",
gE:function(a){return a.height},
gF:function(a){return a.width},
gm:function(a){return a.x},
gn:function(a){return a.y},
"%":"DOMRect"},
rC:{
"^":"k5;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.d_]},
$ism:1,
$isP:1,
$isO:1,
"%":"GamepadList"},
jL:{
"^":"h+I;",
$isc:1,
$asc:function(){return[W.d_]},
$ism:1},
k5:{
"^":"jL+M;",
$isc:1,
$asc:function(){return[W.d_]},
$ism:1},
rD:{
"^":"B;",
$ish:1,
"%":"HTMLFrameSetElement"},
rE:{
"^":"k6;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.T]},
$ism:1,
$isP:1,
$isO:1,
"%":"MozNamedAttrMap|NamedNodeMap"},
jM:{
"^":"h+I;",
$isc:1,
$asc:function(){return[W.T]},
$ism:1},
k6:{
"^":"jM+M;",
$isc:1,
$asc:function(){return[W.T]},
$ism:1},
rF:{
"^":"iq;",
af:function(a){return a.clone()},
"%":"Request"},
rK:{
"^":"H;",
$ish:1,
"%":"ServiceWorker"},
rL:{
"^":"k7;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.dl]},
$ism:1,
$isP:1,
$isO:1,
"%":"SpeechRecognitionResultList"},
jN:{
"^":"h+I;",
$isc:1,
$asc:function(){return[W.dl]},
$ism:1},
k7:{
"^":"jN+M;",
$isc:1,
$asc:function(){return[W.dl]},
$ism:1},
rM:{
"^":"k8;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.dn]},
$ism:1,
$isP:1,
$isO:1,
"%":"StyleSheetList"},
jO:{
"^":"h+I;",
$isc:1,
$asc:function(){return[W.dn]},
$ism:1},
k8:{
"^":"jO+M;",
$isc:1,
$asc:function(){return[W.dn]},
$ism:1},
rN:{
"^":"h;",
$ish:1,
"%":"WorkerLocation"},
rO:{
"^":"h;",
$ish:1,
"%":"WorkerNavigator"},
co:{
"^":"aV;a,b,c",
bx:function(a,b,c,d){var z=new W.aH(0,this.a,this.b,W.aw(a),this.c)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.aI()
return z},
eP:function(a,b,c){return this.bx(a,null,b,c)}},
aA:{
"^":"co;a,b,c"},
aH:{
"^":"lC;a,b,c,d,e",
cZ:function(a){if(this.b==null)return
this.eo()
this.b=null
this.d=null
return},
d9:function(a,b){if(this.b==null)return;++this.a
this.eo()},
eY:function(a){return this.d9(a,null)},
f6:function(a){if(this.b==null||this.a<=0)return;--this.a
this.aI()},
aI:function(){var z=this.d
if(z!=null&&this.a<=0)J.hi(this.b,this.c,z,this.e)},
eo:function(){var z=this.d
if(z!=null)J.hR(this.b,this.c,z,this.e)}},
M:{
"^":"i;",
ga5:function(a){return new W.jd(a,this.gj(a),-1,null)},
u:function(a,b){throw H.d(new P.t("Cannot add to immutable List."))},
$isc:1,
$asc:null,
$ism:1},
jd:{
"^":"i;a,b,c,d",
M:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.x(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gV:function(){return this.d}}}],["","",,P,{
"^":"",
no:function(a){var z,y
z=H.o(new P.ne(H.o(new P.aj(0,$.A,null),[null])),[null])
a.toString
y=H.o(new W.co(a,"success",!1),[null])
H.o(new W.aH(0,y.a,y.b,W.aw(new P.np(a,z)),y.c),[H.V(y,0)]).aI()
y=H.o(new W.co(a,"error",!1),[null])
H.o(new W.aH(0,y.a,y.b,W.aw(z.giG()),y.c),[H.V(y,0)]).aI()
return z.a},
iJ:{
"^":"h;",
eT:[function(a,b){a.continue(b)},function(a){return this.eT(a,null)},"jT","$1","$0","gbl",0,2,22,0],
"%":";IDBCursor"},
oI:{
"^":"iJ;",
gq:function(a){return P.fZ(a.value,!1)},
"%":"IDBCursorWithValue"},
np:{
"^":"k:0;a,b",
$1:function(a){var z,y
z=P.fZ(this.a.result,!1)
y=this.b.a
if(y.a!==0)H.S(new P.b7("Future already completed"))
y.c6(z)}},
jE:{
"^":"h;",
$isjE:1,
$isi:1,
"%":"IDBIndex"},
q7:{
"^":"h;",
ep:function(a,b,c){var z,y,x,w,v
try{z=null
if(c!=null)z=this.e4(a,b,c)
else z=this.hF(a,b)
w=P.no(z)
return w}catch(v){w=H.a6(v)
y=w
x=H.ab(v)
return P.jj(y,x,null)}},
u:function(a,b){return this.ep(a,b,null)},
e4:function(a,b,c){return a.add(P.nq(b))},
hF:function(a,b){return this.e4(a,b,null)},
"%":"IDBObjectStore"},
qG:{
"^":"H;aK:error=",
"%":"IDBOpenDBRequest|IDBRequest|IDBVersionChangeRequest"},
rb:{
"^":"H;aK:error=",
"%":"IDBTransaction"}}],["","",,P,{
"^":"",
ok:{
"^":"b3;",
$ish:1,
"%":"SVGAElement"},
om:{
"^":"lO;",
$ish:1,
"%":"SVGAltGlyphElement"},
oo:{
"^":"h;q:value%",
"%":"SVGAngle"},
op:{
"^":"D;",
$ish:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
oE:{
"^":"eN;ag:r=",
"%":"SVGCircleElement"},
oT:{
"^":"D;E:height=,F:width=,m:x=,n:y=",
$ish:1,
"%":"SVGFEBlendElement"},
oU:{
"^":"D;D:type=,E:height=,F:width=,m:x=,n:y=",
$ish:1,
"%":"SVGFEColorMatrixElement"},
oV:{
"^":"D;E:height=,F:width=,m:x=,n:y=",
$ish:1,
"%":"SVGFEComponentTransferElement"},
oW:{
"^":"D;E:height=,F:width=,m:x=,n:y=",
$ish:1,
"%":"SVGFECompositeElement"},
oX:{
"^":"D;E:height=,F:width=,m:x=,n:y=",
$ish:1,
"%":"SVGFEConvolveMatrixElement"},
oY:{
"^":"D;E:height=,F:width=,m:x=,n:y=",
$ish:1,
"%":"SVGFEDiffuseLightingElement"},
oZ:{
"^":"D;E:height=,F:width=,m:x=,n:y=",
$ish:1,
"%":"SVGFEDisplacementMapElement"},
p_:{
"^":"D;E:height=,F:width=,m:x=,n:y=",
$ish:1,
"%":"SVGFEFloodElement"},
p0:{
"^":"D;E:height=,F:width=,m:x=,n:y=",
$ish:1,
"%":"SVGFEGaussianBlurElement"},
p1:{
"^":"D;E:height=,F:width=,m:x=,n:y=",
$ish:1,
"%":"SVGFEImageElement"},
p2:{
"^":"D;E:height=,F:width=,m:x=,n:y=",
$ish:1,
"%":"SVGFEMergeElement"},
p3:{
"^":"D;E:height=,F:width=,m:x=,n:y=",
$ish:1,
"%":"SVGFEMorphologyElement"},
p4:{
"^":"D;E:height=,F:width=,m:x=,n:y=",
$ish:1,
"%":"SVGFEOffsetElement"},
p5:{
"^":"D;m:x=,n:y=,w:z=",
"%":"SVGFEPointLightElement"},
p6:{
"^":"D;E:height=,F:width=,m:x=,n:y=",
$ish:1,
"%":"SVGFESpecularLightingElement"},
p7:{
"^":"D;m:x=,n:y=,w:z=",
"%":"SVGFESpotLightElement"},
p8:{
"^":"D;E:height=,F:width=,m:x=,n:y=",
$ish:1,
"%":"SVGFETileElement"},
p9:{
"^":"D;D:type=,E:height=,F:width=,m:x=,n:y=",
$ish:1,
"%":"SVGFETurbulenceElement"},
pe:{
"^":"D;E:height=,F:width=,m:x=,n:y=",
$ish:1,
"%":"SVGFilterElement"},
pg:{
"^":"b3;E:height=,F:width=,m:x=,n:y=",
"%":"SVGForeignObjectElement"},
eN:{
"^":"b3;",
"%":"SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},
b3:{
"^":"D;",
$ish:1,
"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},
pq:{
"^":"b3;E:height=,F:width=,m:x=,n:y=",
$ish:1,
"%":"SVGImageElement"},
d3:{
"^":"h;q:value%",
$isi:1,
"%":"SVGLength"},
px:{
"^":"k9;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a.getItem(b)},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){return this.h(a,b)},
$isc:1,
$asc:function(){return[P.d3]},
$ism:1,
"%":"SVGLengthList"},
jP:{
"^":"h+I;",
$isc:1,
$asc:function(){return[P.d3]},
$ism:1},
k9:{
"^":"jP+M;",
$isc:1,
$asc:function(){return[P.d3]},
$ism:1},
pA:{
"^":"D;",
$ish:1,
"%":"SVGMarkerElement"},
pB:{
"^":"D;E:height=,F:width=,m:x=,n:y=",
$ish:1,
"%":"SVGMaskElement"},
kL:{
"^":"h;",
$iskL:1,
$isi:1,
"%":"SVGMatrix"},
db:{
"^":"h;q:value%",
$isi:1,
"%":"SVGNumber"},
q4:{
"^":"ka;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a.getItem(b)},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){return this.h(a,b)},
$isc:1,
$asc:function(){return[P.db]},
$ism:1,
"%":"SVGNumberList"},
jQ:{
"^":"h+I;",
$isc:1,
$asc:function(){return[P.db]},
$ism:1},
ka:{
"^":"jQ+M;",
$isc:1,
$asc:function(){return[P.db]},
$ism:1},
Q:{
"^":"h;",
$isi:1,
"%":"SVGPathSegClosePath;SVGPathSeg"},
qd:{
"^":"Q;m:x=,n:y=",
"%":"SVGPathSegArcAbs"},
qe:{
"^":"Q;m:x=,n:y=",
"%":"SVGPathSegArcRel"},
qf:{
"^":"Q;m:x=,n:y=",
"%":"SVGPathSegCurvetoCubicAbs"},
qg:{
"^":"Q;m:x=,n:y=",
"%":"SVGPathSegCurvetoCubicRel"},
qh:{
"^":"Q;m:x=,n:y=",
"%":"SVGPathSegCurvetoCubicSmoothAbs"},
qi:{
"^":"Q;m:x=,n:y=",
"%":"SVGPathSegCurvetoCubicSmoothRel"},
qj:{
"^":"Q;m:x=,n:y=",
"%":"SVGPathSegCurvetoQuadraticAbs"},
qk:{
"^":"Q;m:x=,n:y=",
"%":"SVGPathSegCurvetoQuadraticRel"},
ql:{
"^":"Q;m:x=,n:y=",
"%":"SVGPathSegCurvetoQuadraticSmoothAbs"},
qm:{
"^":"Q;m:x=,n:y=",
"%":"SVGPathSegCurvetoQuadraticSmoothRel"},
qn:{
"^":"Q;m:x=,n:y=",
"%":"SVGPathSegLinetoAbs"},
qo:{
"^":"Q;m:x=",
"%":"SVGPathSegLinetoHorizontalAbs"},
qp:{
"^":"Q;m:x=",
"%":"SVGPathSegLinetoHorizontalRel"},
qq:{
"^":"Q;m:x=,n:y=",
"%":"SVGPathSegLinetoRel"},
qr:{
"^":"Q;n:y=",
"%":"SVGPathSegLinetoVerticalAbs"},
qs:{
"^":"Q;n:y=",
"%":"SVGPathSegLinetoVerticalRel"},
qt:{
"^":"kb;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a.getItem(b)},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){return this.h(a,b)},
$isc:1,
$asc:function(){return[P.Q]},
$ism:1,
"%":"SVGPathSegList"},
jR:{
"^":"h+I;",
$isc:1,
$asc:function(){return[P.Q]},
$ism:1},
kb:{
"^":"jR+M;",
$isc:1,
$asc:function(){return[P.Q]},
$ism:1},
qu:{
"^":"Q;m:x=,n:y=",
"%":"SVGPathSegMovetoAbs"},
qv:{
"^":"Q;m:x=,n:y=",
"%":"SVGPathSegMovetoRel"},
qw:{
"^":"D;E:height=,F:width=,m:x=,n:y=",
$ish:1,
"%":"SVGPatternElement"},
qz:{
"^":"h;m:x=,n:y=",
"%":"SVGPoint"},
qA:{
"^":"h;j:length=",
"%":"SVGPointList"},
qC:{
"^":"mS;ag:r=",
"%":"SVGRadialGradientElement"},
qD:{
"^":"h;m:x=,n:y=",
"%":"SVGRect"},
qE:{
"^":"eN;E:height=,F:width=,m:x=,n:y=",
"%":"SVGRectElement"},
qM:{
"^":"D;D:type=",
$ish:1,
"%":"SVGScriptElement"},
qY:{
"^":"kc;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a.getItem(b)},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){return this.h(a,b)},
$isc:1,
$asc:function(){return[P.U]},
$ism:1,
"%":"SVGStringList"},
jS:{
"^":"h+I;",
$isc:1,
$asc:function(){return[P.U]},
$ism:1},
kc:{
"^":"jS+M;",
$isc:1,
$asc:function(){return[P.U]},
$ism:1},
r_:{
"^":"D;D:type=",
"%":"SVGStyleElement"},
D:{
"^":"ar;",
gbK:function(a){return new P.eJ(a,new W.dB(a))},
gd7:function(a){return H.o(new W.aA(a,"error",!1),[null])},
gd8:function(a){return H.o(new W.aA(a,"load",!1),[null])},
gck:function(a){return H.o(new W.aA(a,"mousedown",!1),[null])},
$ish:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGTitleElement|SVGVKernElement;SVGElement"},
r1:{
"^":"b3;E:height=,F:width=,m:x=,n:y=",
$ish:1,
"%":"SVGSVGElement"},
r2:{
"^":"D;",
$ish:1,
"%":"SVGSymbolElement"},
fi:{
"^":"b3;",
"%":";SVGTextContentElement"},
r5:{
"^":"fi;",
$ish:1,
"%":"SVGTextPathElement"},
lO:{
"^":"fi;m:x=,n:y=",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
du:{
"^":"h;D:type=",
$isi:1,
"%":"SVGTransform"},
rc:{
"^":"kd;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return a.getItem(b)},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){return this.h(a,b)},
$isc:1,
$asc:function(){return[P.du]},
$ism:1,
"%":"SVGTransformList"},
jT:{
"^":"h+I;",
$isc:1,
$asc:function(){return[P.du]},
$ism:1},
kd:{
"^":"jT+M;",
$isc:1,
$asc:function(){return[P.du]},
$ism:1},
re:{
"^":"b3;E:height=,F:width=,m:x=,n:y=",
$ish:1,
"%":"SVGUseElement"},
rh:{
"^":"D;",
$ish:1,
"%":"SVGViewElement"},
ri:{
"^":"h;",
$ish:1,
"%":"SVGViewSpec"},
mS:{
"^":"D;",
$ish:1,
"%":"SVGLinearGradientElement;SVGGradientElement"},
rG:{
"^":"D;",
$ish:1,
"%":"SVGCursorElement"},
rH:{
"^":"D;",
$ish:1,
"%":"SVGFEDropShadowElement"},
rI:{
"^":"D;",
$ish:1,
"%":"SVGGlyphRefElement"},
rJ:{
"^":"D;",
$ish:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":"",
or:{
"^":"h;j:length=",
"%":"AudioBuffer"},
en:{
"^":"H;",
"%":"AnalyserNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioPannerNode|ChannelMergerNode|ChannelSplitterNode|ConvolverNode|DelayNode|DynamicsCompressorNode|GainNode|JavaScriptAudioNode|MediaStreamAudioDestinationNode|PannerNode|RealtimeAnalyserNode|ScriptProcessorNode|WaveShaperNode|webkitAudioPannerNode;AudioNode"},
os:{
"^":"h;q:value%",
"%":"AudioParam"},
ij:{
"^":"en;",
"%":"AudioBufferSourceNode|MediaElementAudioSourceNode|MediaStreamAudioSourceNode;AudioSourceNode"},
ow:{
"^":"en;D:type=",
"%":"BiquadFilterNode"},
q9:{
"^":"ij;D:type=",
"%":"Oscillator|OscillatorNode"}}],["","",,P,{
"^":"",
ol:{
"^":"h;ae:size=,D:type=",
"%":"WebGLActiveInfo"},
qF:{
"^":"h;",
i0:function(a,b){return a.activeTexture(b)},
i8:function(a,b,c){return a.attachShader(b,c)},
ia:function(a,b,c){return a.bindBuffer(b,c)},
ib:function(a,b,c){return a.bindFramebuffer(b,c)},
ic:function(a,b,c){return a.bindRenderbuffer(b,c)},
ie:function(a,b,c){return a.bindTexture(b,c)},
ih:function(a,b){return a.blendEquation(b)},
ii:function(a,b,c){return a.blendEquationSeparate(b,c)},
ij:function(a,b,c){return a.blendFunc(b,c)},
ik:function(a,b,c,d,e){return a.blendFuncSeparate(b,c,d,e)},
im:function(a,b,c,d){return a.bufferData(b,c,d)},
iv:function(a,b){return a.clear(b)},
iw:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
ix:function(a,b){return a.clearDepth(b)},
iy:function(a,b){return a.clearStencil(b)},
iD:function(a,b){return a.compileShader(b)},
iM:function(a){return a.createBuffer()},
iN:function(a){return a.createFramebuffer()},
iP:function(a){return a.createProgram()},
iQ:function(a){return a.createRenderbuffer()},
iR:function(a,b){return a.createShader(b)},
iS:function(a){return a.createTexture()},
iU:function(a,b){return a.cullFace(b)},
iW:function(a,b){return a.deleteShader(b)},
iX:function(a,b){return a.depthFunc(b)},
iY:function(a,b){return a.depthMask(b)},
j4:function(a,b){return a.disable(b)},
j6:function(a,b){return a.disableVertexAttribArray(b)},
j7:function(a,b,c,d){return a.drawArrays(b,c,d)},
j8:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
j9:function(a,b){return a.enable(b)},
ja:function(a,b){return a.enableVertexAttribArray(b)},
jh:function(a,b,c,d,e){return a.framebufferRenderbuffer(b,c,d,e)},
ji:function(a,b,c,d,e,f){return a.framebufferTexture2D(b,c,d,e,f)},
jj:function(a,b){return a.frontFace(b)},
fk:function(a,b){return a.generateMipmap(b)},
fl:function(a,b,c){return a.getAttribLocation(b,c)},
fo:function(a){return a.getError()},
fp:function(a,b){return a.getExtension(b)},
fq:function(a,b){return a.getParameter(b)},
fs:function(a,b,c){return a.getProgramParameter(b,c)},
ft:function(a,b){return a.getShaderInfoLog(b)},
fu:function(a,b,c){return a.getShaderParameter(b,c)},
fv:function(a,b,c){return a.getShaderPrecisionFormat(b,c)},
fw:function(a,b,c){return a.getUniformLocation(b,c)},
eO:function(a,b){return a.lineWidth(b)},
jN:function(a,b){return a.linkProgram(b)},
k5:function(a,b,c){return a.pixelStorei(b,c)},
k6:function(a,b,c){return a.polygonOffset(b,c)},
kh:function(a,b,c,d,e){return a.renderbufferStorage(b,c,d,e)},
fR:function(a,b,c){return a.shaderSource(b,c)},
kn:function(a,b,c,d,e,f,g,h,i,j){var z,y
z=J.v(g)
if(!!z.$isd0||g==null)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,P.nN(g))
return}if(!!z.$isd1)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$iscT)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isdw)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,g)
return}throw H.d(P.ax("Incorrect number or type of arguments"))},
km:function(a,b,c,d,e,f,g){return this.kn(a,b,c,d,e,f,g,null,null,null)},
ko:function(a,b,c,d,e,f,g){return a.texImage2D(b,c,d,e,f,g)},
kp:function(a,b,c,d,e,f,g){return a.texImage2D(b,c,d,e,f,g)},
kr:function(a,b,c,d,e,f,g){return a.texImage2D(b,c,d,e,f,g)},
ks:function(a,b,c,d){return a.texParameterf(b,c,d)},
kt:function(a,b,c,d){return a.texParameteri(b,c,d)},
kw:function(a,b,c){return a.uniform1f(b,c)},
kx:function(a,b,c){return a.uniform1fv(b,c)},
ky:function(a,b,c){return a.uniform1i(b,c)},
kz:function(a,b,c){return a.uniform1iv(b,c)},
kA:function(a,b,c,d){return a.uniform2f(b,c,d)},
kB:function(a,b,c){return a.uniform2fv(b,c)},
kC:function(a,b,c,d,e){return a.uniform3f(b,c,d,e)},
kD:function(a,b,c){return a.uniform3fv(b,c)},
kE:function(a,b,c){return a.uniform3iv(b,c)},
kF:function(a,b,c,d,e,f){return a.uniform4f(b,c,d,e,f)},
kG:function(a,b,c){return a.uniform4fv(b,c)},
kH:function(a,b,c,d){return a.uniformMatrix2fv(b,c,d)},
kI:function(a,b,c,d){return a.uniformMatrix3fv(b,c,d)},
kJ:function(a,b,c,d){return a.uniformMatrix4fv(b,c,d)},
kN:function(a,b){return a.useProgram(b)},
kO:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,e,f,g)},
kQ:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
kq:function(a,b,c,d,e,f,g,h,i,j){return a.texImage2D(b,c,d,e,f,g,h,i,j)},
"%":"WebGLRenderingContext"}}],["","",,P,{
"^":"",
qW:{
"^":"ke;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.L(b,a,null,null,null))
return P.nS(a.item(b))},
k:function(a,b,c){throw H.d(new P.t("Cannot assign element of immutable List."))},
sj:function(a,b){throw H.d(new P.t("Cannot resize immutable List."))},
H:function(a,b){return this.h(a,b)},
$isc:1,
$asc:function(){return[P.ai]},
$ism:1,
"%":"SQLResultSetRowList"},
jU:{
"^":"h+I;",
$isc:1,
$asc:function(){return[P.ai]},
$ism:1},
ke:{
"^":"jU+M;",
$isc:1,
$asc:function(){return[P.ai]},
$ism:1}}],["","",,P,{
"^":"",
oC:{
"^":"i;"}}],["","",,P,{
"^":"",
bm:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
fK:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
dR:function(a,b){if(typeof a!=="number")throw H.d(P.ax(a))
if(typeof b!=="number")throw H.d(P.ax(b))
if(a>b)return b
if(a<b)return a
if(typeof b==="number"){if(typeof a==="number")if(a===0)return(a+b)*a*b
if(a===0&&C.b.gbw(b)||isNaN(b))return b
return a}return a},
af:function(a,b){if(typeof a!=="number")throw H.d(P.ax(a))
if(a>b)return a
if(a<b)return b
if(typeof b==="number"){if(typeof a==="number")if(a===0)return a+b
if(isNaN(b))return b
return a}if(b===0&&C.b.gbw(a))return b
return a},
mV:{
"^":"i;",
jU:function(a){if(a<=0||a>4294967296)throw H.d(P.ld("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0}},
bH:{
"^":"i;m:a>,n:b>",
t:function(a){return"Point("+H.l(this.a)+", "+H.l(this.b)+")"},
O:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.bH))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gah:function(a){var z,y
z=J.ac(this.a)
y=J.ac(this.b)
return P.fK(P.bm(P.bm(0,z),y))},
p:function(a,b){var z,y,x
z=this.a
y=J.f(b)
x=y.gm(b)
if(typeof z!=="number")return z.p()
x=C.b.p(z,x)
z=this.b
y=y.gn(b)
if(typeof z!=="number")return z.p()
y=new P.bH(x,C.b.p(z,y))
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
aa:function(a,b){var z,y,x,w
z=this.a
y=J.f(b)
x=y.gm(b)
if(typeof z!=="number")return z.aa()
if(typeof x!=="number")return H.n(x)
w=this.b
y=y.gn(b)
if(typeof w!=="number")return w.aa()
if(typeof y!=="number")return H.n(y)
y=new P.bH(z-x,w-y)
y.$builtinTypeInfo=this.$builtinTypeInfo
return y}},
n7:{
"^":"i;",
gdf:function(a){return this.gaV(this)+this.c},
gcY:function(a){return this.gbA(this)+this.d},
t:function(a){return"Rectangle ("+this.gaV(this)+", "+this.b+") "+this.c+" x "+this.d},
O:function(a,b){var z,y
if(b==null)return!1
z=J.v(b)
if(!z.$isav)return!1
if(this.gaV(this)===z.gaV(b)){y=this.b
z=y===z.gbA(b)&&this.a+this.c===z.gdf(b)&&y+this.d===z.gcY(b)}else z=!1
return z},
gah:function(a){var z=this.b
return P.fK(P.bm(P.bm(P.bm(P.bm(0,this.gaV(this)&0x1FFFFFFF),z&0x1FFFFFFF),this.a+this.c&0x1FFFFFFF),z+this.d&0x1FFFFFFF))}},
av:{
"^":"n7;aV:a>,bA:b>,F:c>,E:d>",
$asav:null}}],["","",,H,{
"^":"",
b:function(a){return a},
cr:function(a){var z,y,x,w,v
z=J.v(a)
if(!!z.$isO)return a
z=z.gj(a)
y=Array(z)
y.fixed$length=Array
for(x=a.length,w=0;w<x;++w){v=a[w]
if(w>=z)return H.a(y,w)
y[w]=v}return y},
d7:{
"^":"h;",
$isd7:1,
"%":"ArrayBuffer"},
c9:{
"^":"h;",
$isc9:1,
"%":"DataView;ArrayBufferView;d8|f_|f1|d9|f0|f2|aQ"},
d8:{
"^":"c9;",
gj:function(a){return a.length},
$isP:1,
$isO:1},
d9:{
"^":"f1;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.S(H.a2(a,b))
return a[b]},
k:function(a,b,c){if(b>>>0!==b||b>=a.length)H.S(H.a2(a,b))
a[b]=c}},
f_:{
"^":"d8+I;",
$isc:1,
$asc:function(){return[P.bq]},
$ism:1},
f1:{
"^":"f_+eK;"},
aQ:{
"^":"f2;",
k:function(a,b,c){if(b>>>0!==b||b>=a.length)H.S(H.a2(a,b))
a[b]=c},
$isc:1,
$asc:function(){return[P.E]},
$ism:1},
f0:{
"^":"d8+I;",
$isc:1,
$asc:function(){return[P.E]},
$ism:1},
f2:{
"^":"f0+eK;"},
pS:{
"^":"d9;",
$isc_:1,
$isc:1,
$asc:function(){return[P.bq]},
$ism:1,
"%":"Float32Array"},
pT:{
"^":"d9;",
$isc:1,
$asc:function(){return[P.bq]},
$ism:1,
"%":"Float64Array"},
pU:{
"^":"aQ;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.S(H.a2(a,b))
return a[b]},
$isc:1,
$asc:function(){return[P.E]},
$ism:1,
"%":"Int16Array"},
pV:{
"^":"aQ;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.S(H.a2(a,b))
return a[b]},
$isjG:1,
$isc:1,
$asc:function(){return[P.E]},
$ism:1,
"%":"Int32Array"},
pW:{
"^":"aQ;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.S(H.a2(a,b))
return a[b]},
$isc:1,
$asc:function(){return[P.E]},
$ism:1,
"%":"Int8Array"},
pX:{
"^":"aQ;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.S(H.a2(a,b))
return a[b]},
$isc:1,
$asc:function(){return[P.E]},
$ism:1,
"%":"Uint16Array"},
pY:{
"^":"aQ;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.S(H.a2(a,b))
return a[b]},
$isc:1,
$asc:function(){return[P.E]},
$ism:1,
"%":"Uint32Array"},
pZ:{
"^":"aQ;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.S(H.a2(a,b))
return a[b]},
$isc:1,
$asc:function(){return[P.E]},
$ism:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
q_:{
"^":"aQ;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.S(H.a2(a,b))
return a[b]},
$isc:1,
$asc:function(){return[P.E]},
$ism:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
cz:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{
"^":"",
nS:function(a){var z,y,x,w,v
if(a==null)return
z=P.C()
y=Object.getOwnPropertyNames(a)
for(x=y.length,w=0;w<y.length;y.length===x||(0,H.dU)(y),++w){v=y[w]
z.k(0,v,a[v])}return z},
nL:function(a){var z
if(a==null)return
z={}
J.bw(a,new P.nM(z))
return z},
nq:function(a){var z,y
z=[]
y=new P.nu(new P.ns([],z),new P.nt(z),new P.nw(z)).$1(a)
new P.nr().$0()
return y},
fZ:function(a,b){var z=[]
return new P.nQ(b,new P.nO([],z),new P.nP(z),new P.nR(z)).$1(a)},
nN:function(a){return a},
ez:function(){var z=$.ey
if(z==null){z=J.cE(window.navigator.userAgent,"Opera",0)
$.ey=z}return z},
iO:function(){var z,y
z=$.ev
if(z!=null)return z
y=$.ew
if(y==null){y=J.cE(window.navigator.userAgent,"Firefox",0)
$.ew=y}if(y===!0)z="-moz-"
else{y=$.ex
if(y==null){y=P.ez()!==!0&&J.cE(window.navigator.userAgent,"Trident/",0)
$.ex=y}if(y===!0)z="-ms-"
else z=P.ez()===!0?"-o-":"-webkit-"}$.ev=z
return z},
nM:{
"^":"k:23;a",
$2:function(a,b){this.a[a]=b}},
ns:{
"^":"k:8;a,b",
$1:function(a){var z,y,x
z=this.a
y=z.length
for(x=0;x<y;++x)if(z[x]===a)return x
z.push(a)
this.b.push(null)
return y}},
nt:{
"^":"k:9;a",
$1:function(a){var z=this.a
if(a>=z.length)return H.a(z,a)
return z[a]}},
nw:{
"^":"k:10;a",
$2:function(a,b){var z=this.a
if(a>=z.length)return H.a(z,a)
z[a]=b}},
nr:{
"^":"k:1;",
$0:function(){}},
nu:{
"^":"k:0;a,b,c",
$1:function(a){var z,y,x,w,v,u
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
y=J.v(a)
if(!!y.$isbA)return new Date(a.a)
if(!!y.$isbC)return a
if(!!y.$iscP)return a
if(!!y.$iseI)return a
if(!!y.$isd0)return a
if(!!y.$isd7)return a
if(!!y.$isc9)return a
if(!!y.$isai){x=this.a.$1(a)
w=this.b.$1(x)
z.a=w
if(w!=null)return w
w={}
z.a=w
this.c.$2(x,w)
y.G(a,new P.nv(z,this))
return z.a}if(!!y.$isc){v=y.gj(a)
x=this.a.$1(a)
w=this.b.$1(x)
if(w!=null){if(!0===w){w=new Array(v)
this.c.$2(x,w)}return w}w=new Array(v)
this.c.$2(x,w)
for(u=0;u<v;++u){z=this.$1(y.h(a,u))
if(u>=w.length)return H.a(w,u)
w[u]=z}return w}throw H.d(new P.cl("structured clone of other type"))}},
nv:{
"^":"k:3;a,b",
$2:function(a,b){this.a.a[a]=this.b.$1(b)}},
nO:{
"^":"k:8;a,b",
$1:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y}},
nP:{
"^":"k:9;a",
$1:function(a){var z=this.a
if(a>=z.length)return H.a(z,a)
return z[a]}},
nR:{
"^":"k:10;a",
$2:function(a,b){var z=this.a
if(a>=z.length)return H.a(z,a)
z[a]=b}},
nQ:{
"^":"k:0;a,b,c,d",
$1:function(a){var z,y,x,w,v,u,t,s,r
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date)return P.eu(a.getTime(),!0)
if(a instanceof RegExp)throw H.d(new P.cl("structured clone of RegExp"))
z=Object.getPrototypeOf(a)
if(z===Object.prototype||z===null){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
x=P.C()
this.d.$2(y,x)
for(w=Object.keys(a),v=w.length,u=0;u<w.length;w.length===v||(0,H.dU)(w),++u){t=w[u]
x.k(0,t,this.$1(a[t]))}return x}if(a instanceof Array){y=this.b.$1(a)
x=this.c.$1(y)
if(x!=null)return x
w=J.J(a)
s=w.gj(a)
x=this.a?new Array(s):a
this.d.$2(y,x)
if(typeof s!=="number")return H.n(s)
v=J.al(x)
r=0
for(;r<s;++r)v.k(x,r,this.$1(w.h(a,r)))
return x}return a}},
eJ:{
"^":"bj;a,b",
gbc:function(){return H.o(new H.mj(this.b,new P.jb()),[null])},
G:function(a,b){C.a.G(P.aP(this.gbc(),!1,W.ar),b)},
k:function(a,b,c){J.hS(this.gbc().H(0,b),c)},
sj:function(a,b){var z,y
z=this.gbc()
y=z.gj(z)
if(b>=y)return
else if(b<0)throw H.d(P.ax("Invalid list length"))
this.kf(0,b,y)},
u:function(a,b){this.b.a.appendChild(b)},
kf:function(a,b,c){var z=this.gbc()
z=H.lx(z,b,H.a3(z,"Y",0))
C.a.G(P.aP(H.lM(z,c-b,H.a3(z,"Y",0)),!0,null),new P.jc())},
gj:function(a){var z=this.gbc()
return z.gj(z)},
h:function(a,b){return this.gbc().H(0,b)},
ga5:function(a){var z=P.aP(this.gbc(),!1,W.ar)
return new J.cO(z,z.length,0,null)},
$asbj:function(){return[W.ar]},
$asc:function(){return[W.ar]}},
jb:{
"^":"k:0;",
$1:function(a){return!!J.v(a).$isar}},
jc:{
"^":"k:0;",
$1:function(a){return J.hQ(a)}}}],["","",,F,{
"^":"",
rS:[function(){var z,y,x,w,v
z=Date.now()
y=new Float32Array(H.b(3))
x=new T.e(new Float32Array(H.b(3)))
x.l(0,0,0)
w=new T.e(new Float32Array(H.b(3)))
w.l(0,0,-100)
v=new F.jk(null,null,null,null,new P.bA(z,!1),new T.e(y),null,null,1300,null,null,null,null,null,null,null,null,x,w,null)
v.jx()
w=window
x=v.geu(v)
C.h.e_(w)
C.h.ef(w,W.aw(x))
x=v.a
x.d.ee(x.a,x.b)},"$0","h6",0,0,2],
jk:{
"^":"i;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy",
jx:function(){var z,y,x,w
z=new M.mm(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.ch=!1
z.cy=M.fy()
z.db=M.im()
y=new M.iB(null)
y.a=H.o([],[S.aR])
z.f=y
z.r=M.et()
z.hv()
z.hQ()
z.hR()
z.hU()
z.hS()
z.hp()
z.hV()
z.hT()
y=z.cy.a
x=L.K("img/dirt.png",null,null,null)
w=$.p
$.p=w+1
w=M.Z(y/8,3,new S.z(x,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",w,0,S.w(16777215),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
z.cx=w
w.x.k3=!1
w=J.hC(z.d.a)
H.o(new W.aH(0,w.a,w.b,W.aw(z.gck(z)),w.c),[H.V(w,0)]).aI()
this.a=z
this.c=M.et()
z=this.a
z=M.l7(z.b,z.e.cx.r.a[1])
this.b=z
z.e=!0
this.a.a.u(0,z.c)
this.ch=!1
this.cx=!1
this.cy=!1
this.db=!1
this.dx=!1
this.dy=!1
this.z=1
z=document
C.e.bo(z,"keydown",new F.jm(this),!1)
z=document
C.e.bo(z,"keyup",new F.jn(this),!1)
z=document
C.e.bo(z,"mousedown",new F.jo(this),!1)
z=document
C.e.bo(z,"mouseup",new F.jp(this),!1)
z=document
C.e.bo(z,"mousewheel",new F.jq(this),!1)
z=new T.e(new Float32Array(H.b(3)))
z.l(0,0,0)
y=new T.e(new Float32Array(H.b(3)))
y.l(0,-1,0)
this.x=S.lf(z,y,0,10)
y=this.a
y.a.u(0,y.cx.x)
this.fy=null
this.a.db
y=L.K("img/rock.png",null,null,null)
z=$.p
$.p=z+1
this.d=new S.z(y,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",z,0,S.w(16777215),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1)
this.Q=document.createElement("div",null)
this.Q=document.querySelector("#block")
P.dr(C.f,new F.jl(this))},
l4:[function(a,b){var z,y
z=window
y=this.geu(this)
C.h.e_(z)
C.h.ef(z,W.aw(y))
y=this.a
y.d.ee(y.a,y.b)},"$1","geu",2,0,24],
eQ:function(){var z,y,x,w,v,u,t,s,r,q,p,o
if(this.a.ch){this.x.a.B(this.b.c.r)
z=this.x
y=z.a.a
x=y[1]
w=this.a
y[1]=x-w.cy.a
z=z.d4(w.f.a).length
v=z>0&&z<this.b.y
z=Date.now()
u=C.c.aR(P.iX(0,0,0,z-this.e.a,0,0).a,1000)/1000
y=this.f.a
x=y[0]
y[0]=x-x*10*u
x=y[2]
y[2]=x-x*10*u
y[1]=y[1]-980.0000000000001*u
if(v){y[1]=P.af(0,y[1])
this.r=!0}x=this.c
w=this.a
t=x.iA(w.e.cx,w.f.a,w.cy.a/2,this.cx,this.ch,this.cy,this.db)
for(x=J.aY(t[3]),w=this.y*u;x.M();)switch(x.d){case C.k:this.cx=!1
s=y[2]
r=this.a.cy.a
q=t[2]
if(typeof q!=="number")return H.n(q)
y[2]=s-(w+r+q)
break
case C.j:this.ch=!1
s=y[2]
r=this.a.cy.a
q=t[2]
if(typeof q!=="number")return H.n(q)
y[2]=s+(w+r+q)
break
case C.m:this.cy=!1
s=y[0]
r=this.a.cy.a
q=t[0]
if(typeof q!=="number")return H.n(q)
y[0]=s+(w+r+q)
break
case C.l:this.db=!1
s=y[0]
r=this.a.cy.a
q=t[0]
if(typeof q!=="number")return H.n(q)
y[0]=s-(w+r+q)
break}if(this.ch===!0)y[2]=y[2]-w
if(this.cx===!0)y[2]=y[2]+w
if(this.cy===!0)y[0]=y[0]-w
if(this.db===!0)y[0]=y[0]+w
x=this.b.c
x.dj(0,y[0]*u,x.rx.l(1,0,0))
x=this.b.c
x.dj(0,y[1]*u,x.rx.l(0,1,0))
x=this.b.c
x.dj(0,y[2]*u,x.rx.l(0,0,1))
this.a.e.cx.x.l(0,this.b.c.x.a[1],0)
this.a.e.cx.r.B(this.b.c.r)
x=this.b
w=x.c.r.a
s=w[1]
x=x.y
if(s<x){y[1]=0
w[1]=x
this.r=!0}y=new T.e(new Float32Array(H.b(3)))
y.B(this.fx)
y=y.bs(this.a.b.dy)
x=new T.e(new Float32Array(H.b(3)))
x.B(y)
this.fr=x
this.a.cx.x.r.B(x)
x=this.a
y=x.r
w=x.cx.x
s=x.f.a
x=x.cy.a
p=y.iB(w,s,x,x)
if(this.dx===!0){if(p[0]===!0){o=M.Z(this.a.cy.a,3,this.d)
o.x.r.B(p[1])
this.a.a.u(0,o.x)
y=this.a
x=o.x
y.f.a.push(x)}this.dx=!1}if(this.dy===!0){if(p[0]===!0&&p[2]!=null){this.a.ka(p[2])
this.a.a.b9(0,p[2])}this.dy=!1}y=p[2]==null
if(y&&this.fy!=null)this.fy.gaW().e=1
else if(!y){y=this.fy
if(y!=null&&J.bU(y)!==J.bU(p[2]))this.fy.gaW().e=1
y=p[2]
this.fy=y
y.gaW().e=0.8}this.e=new P.bA(z,!1)}P.dr(C.f,new F.jr(this))}},
jm:{
"^":"k:0;a",
$1:function(a){var z,y
switch(J.e8(a)){case 38:case 87:this.a.ch=!0
break
case 37:case 65:this.a.cy=!0
break
case 40:case 83:this.a.cx=!0
break
case 39:case 68:this.a.db=!0
break
case 32:z=this.a
if(z.r===!0){y=z.f.a
y[1]=y[1]+350}z.r=!1
break}}},
jn:{
"^":"k:0;a",
$1:function(a){switch(J.e8(a)){case 38:case 87:this.a.ch=!1
break
case 37:case 65:this.a.cy=!1
break
case 40:case 83:this.a.cx=!1
break
case 39:case 68:this.a.db=!1
break}}},
jo:{
"^":"k:0;a",
$1:function(a){switch(J.e4(a)){case 0:this.a.dx=!0
break
case 2:this.a.dy=!0
break}}},
jp:{
"^":"k:0;a",
$1:function(a){switch(J.e4(a)){case 0:this.a.dx=!1
break
case 2:this.a.dy=!1
break}}},
jq:{
"^":"k:0;a",
$1:function(a){var z,y,x
z=this.a
y=z.z
if(typeof y!=="number")return y.b_()
if(y<4){++y
z.z=y}else{z.z=1
y=1}switch(y){case 1:z.a.db
y=L.K("img/rock.png",null,null,null)
x=$.p
$.p=x+1
z.d=new S.z(y,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",x,0,S.w(16777215),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1)
z=z.Q.style
z.backgroundImage="url(./img/rock.png)"
break
case 2:z.a.db
y=L.K("img/dirt.png",null,null,null)
x=$.p
$.p=x+1
z.d=new S.z(y,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",x,0,S.w(16777215),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1)
z=z.Q.style
z.backgroundImage="url(./img/dirt.png)"
break
case 3:z.a.db
y=L.K("img/wood.png",null,null,null)
x=$.p
$.p=x+1
z.d=new S.z(y,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",x,0,S.w(16777215),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1)
z=z.Q.style
z.backgroundImage="url(./img/wood.png)"
break
case 4:z.a.db
y=L.K("img/leaves.png",null,null,null)
x=$.p
$.p=x+1
z.d=new S.z(y,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",x,0,S.w(16777215),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1)
z=z.Q.style
z.backgroundImage="url(./img/leaves.png)"
break}}},
jl:{
"^":"k:1;a",
$0:function(){return this.a.eQ()}},
jr:{
"^":"k:1;a",
$0:function(){return this.a.eQ()}}},1],["","",,S,{
"^":"",
oa:function(a,b,c,d){var z,y,x,w,v
z=b.aa(0,c).by(0)
if(z.gj(z)===0)z.a[2]=1
y=d.d1(z).by(0)
if(y.gj(y)===0){x=z.a
x[0]=x[0]+0.0001
y=d.d1(z).by(0)}x=y.a
w=z.d1(y).by(0).a
v=z.a
a.dF(x[0],x[1],x[2],0,w[0],w[1],w[2],0,v[0],v[1],v[2],0,0,0,0,1)
return a},
ha:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=b.a
y=z[0]
x=z[1]
w=z[2]
v=z[3]
u=y+y
t=x+x
s=w+w
r=y*u
q=y*t
p=y*s
o=x*t
n=x*s
m=w*s
l=v*u
k=v*t
j=v*s
z=a.a
z[0]=1-(o+m)
z[4]=q-j
z[8]=p+k
z[1]=q+j
z[5]=1-(r+m)
z[9]=n-l
z[2]=p-k
z[6]=n+l
z[10]=1-(r+o)
return a},
fY:function(a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z=a4.h(0,10)*a4.h(0,5)-a4.h(0,6)*a4.h(0,9)
y=a4.h(0,10)
x=a4.h(0,1)
w=a4.h(0,2)
v=a4.h(0,9)
u=a4.h(0,6)
t=a4.h(0,1)
s=a4.h(0,2)
r=a4.h(0,5)
q=-a4.h(0,10)*a4.h(0,4)+a4.h(0,6)*a4.h(0,8)
p=a4.h(0,10)
o=a4.h(0,0)
n=a4.h(0,2)
m=a4.h(0,8)
l=a4.h(0,6)
k=a4.h(0,0)
j=a4.h(0,2)
i=a4.h(0,4)
h=a4.h(0,9)*a4.h(0,4)-a4.h(0,5)*a4.h(0,8)
g=a4.h(0,9)
f=a4.h(0,0)
e=a4.h(0,1)
d=a4.h(0,8)
c=a4.h(0,5)
b=a4.h(0,0)
a=a4.h(0,1)
a0=a4.h(0,4)
a1=a4.h(0,0)*z+a4.h(0,1)*q+a4.h(0,2)*h
if(a1===0)P.a5("Matrix3.getInverse(): determinant == 0")
a2=1/a1
a3=new T.b6(new Float32Array(H.b(9)))
a3.fM(a2*z,a2*(-y*x+w*v),a2*(u*t-s*r),a2*q,a2*(p*o-n*m),a2*(-l*k+j*i),a2*h,a2*(-g*f+e*d),a2*(c*b-a*a0))
return a3},
h_:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=a.gi(a)
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
v=z[2]
u=new T.e(new Float32Array(H.b(3)))
u.l(x,w,v)
if(4>=y)return H.a(z,4)
v=z[4]
if(5>=y)return H.a(z,5)
w=z[5]
if(6>=y)return H.a(z,6)
x=z[6]
t=new T.e(new Float32Array(H.b(3)))
t.l(v,w,x)
if(8>=y)return H.a(z,8)
x=z[8]
if(9>=y)return H.a(z,9)
w=z[9]
if(10>=y)return H.a(z,10)
v=z[10]
s=new T.e(new Float32Array(H.b(3)))
s.l(x,w,v)
x=d.a
x[0]=u.gj(u)
x[1]=t.gj(t)
x[2]=s.gj(s)
if(12>=y)return H.a(z,12)
w=b.a
w[0]=z[12]
if(13>=y)return H.a(z,13)
w[1]=z[13]
if(14>=y)return H.a(z,14)
w[2]=z[14]
r=a.af(0)
w=r.gi(r)
if(0>=w.length)return H.a(w,0)
w[0]=w[0]/x[0]
w=r.gi(r)
if(1>=w.length)return H.a(w,1)
w[1]=w[1]/x[0]
w=r.gi(r)
if(2>=w.length)return H.a(w,2)
w[2]=w[2]/x[0]
w=r.gi(r)
if(4>=w.length)return H.a(w,4)
w[4]=w[4]/x[1]
w=r.gi(r)
if(5>=w.length)return H.a(w,5)
w[5]=w[5]/x[1]
w=r.gi(r)
if(6>=w.length)return H.a(w,6)
w[6]=w[6]/x[1]
w=r.gi(r)
if(8>=w.length)return H.a(w,8)
w[8]=w[8]/x[2]
w=r.gi(r)
if(9>=w.length)return H.a(w,9)
w[9]=w[9]/x[2]
w=r.gi(r)
if(10>=w.length)return H.a(w,10)
w[10]=w[10]/x[2]
q=T.aF()
z=r.gi(r)
x=z.length
if(0>=x)return H.a(z,0)
p=z[0]
if(4>=x)return H.a(z,4)
o=z[4]
if(8>=x)return H.a(z,8)
n=z[8]
m=z[1]
l=z[5]
if(9>=x)return H.a(z,9)
k=z[9]
j=z[2]
i=z[6]
if(10>=x)return H.a(z,10)
h=z[10]
g=p+l+h
if(g>0){f=0.5/Math.sqrt(H.u(g+1))
y=q.a
y[3]=0.25/f
y[0]=(i-k)*f
y[1]=(n-j)*f
y[2]=(m-o)*f}else if(p>l&&p>h){f=2*Math.sqrt(H.u(1+p-l-h))
y=q.a
y[3]=(i-k)/f
y[0]=0.25*f
y[1]=(o+m)/f
y[2]=(n+j)/f}else{y=k+i
x=q.a
if(l>h){f=2*Math.sqrt(H.u(1+l-p-h))
x[3]=(n-j)/f
x[0]=(o+m)/f
x[1]=0.25*f
x[2]=y/f}else{f=2*Math.sqrt(H.u(1+h-p-l))
x[3]=(m-o)/f
x[0]=(n+j)/f
x[1]=y/f
x[2]=0.25*f}}return[b,c,d]},
nG:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=new S.nH()
y=a.a
x=y[0]
w=y[4]
v=y[8]
u=y[1]
t=y[5]
s=y[9]
r=y[2]
q=y[6]
p=y[10]
if(b==="XYZ"){o=Math.asin(H.u(z.$1(v)))
if(Math.abs(v)<0.99999){n=Math.atan2(H.u(-s),H.u(p))
m=Math.atan2(H.u(-w),H.u(x))}else{n=Math.atan2(H.u(u),H.u(t))
m=0}}else if(b==="YXZ"){n=Math.asin(H.u(J.cC(z.$1(s))))
if(Math.abs(s)<0.99999){o=Math.atan2(H.u(v),H.u(p))
m=Math.atan2(H.u(u),H.u(t))}else{o=Math.atan2(H.u(-r),H.u(x))
m=0}}else if(b==="ZXY"){n=Math.asin(H.u(z.$1(q)))
if(Math.abs(q)<0.99999){o=Math.atan2(H.u(-r),H.u(p))
m=Math.atan2(H.u(-w),H.u(t))}else{m=Math.atan2(H.u(v),H.u(x))
o=0}}else if(b==="ZYX"){o=Math.asin(H.u(J.cC(z.$1(r))))
if(Math.abs(r)<0.99999){n=Math.atan2(H.u(q),H.u(p))
m=Math.atan2(H.u(u),H.u(x))}else{m=Math.atan2(H.u(-w),H.u(t))
n=0}}else if(b==="YZX"){m=Math.asin(H.u(z.$1(u)))
if(Math.abs(u)<0.99999){n=Math.atan2(H.u(-s),H.u(t))
o=Math.atan2(H.u(-r),H.u(x))}else{o=Math.atan2(H.u(r),H.u(p))
n=0}}else if(b==="XZY"){m=Math.asin(H.u(J.cC(z.$1(w))))
if(Math.abs(w)<0.99999){n=Math.atan2(H.u(q),H.u(t))
o=Math.atan2(H.u(v),H.u(x))}else{n=Math.atan2(H.u(-v),H.u(p))
o=0}}else{n=null
o=null
m=null}y=new T.e(new Float32Array(H.b(3)))
y.l(n,o,m)
return y},
j:function(){var z=$.fM
if(z==null){z=P.y(["fog_pars_fragment",C.a.v(["#ifdef USE_FOG","uniform vec3 fogColor;","#ifdef FOG_EXP2","uniform float fogDensity;","#else","uniform float fogNear;","uniform float fogFar;","#endif","#endif"],"\n"),"fog_fragment",C.a.v(["#ifdef USE_FOG","float depth = gl_FragCoord.z / gl_FragCoord.w;","#ifdef FOG_EXP2","const float LOG2 = 1.442695;","float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );","fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );","#else","float fogFactor = smoothstep( fogNear, fogFar, depth );","#endif","gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );","#endif"],"\n"),"envmap_pars_fragment",C.a.v(["#ifdef USE_ENVMAP","uniform float reflectivity;","uniform samplerCube envMap;","uniform float flipEnvMap;","uniform int combine;","#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )","uniform bool useRefract;","uniform float refractionRatio;","#else","varying vec3 vReflect;","#endif","#endif"],"\n"),"envmap_fragment",C.a.v(["#ifdef USE_ENVMAP","vec3 reflectVec;","#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )","vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );","if ( useRefract ) {","reflectVec = refract( cameraToVertex, normal, refractionRatio );","} else { ","reflectVec = reflect( cameraToVertex, normal );","}","#else","reflectVec = vReflect;","#endif","#ifdef DOUBLE_SIDED","float flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );","vec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );","#else","vec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );","#endif","#ifdef GAMMA_INPUT","cubeColor.xyz *= cubeColor.xyz;","#endif","if ( combine == 1 ) {","gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );","} else if ( combine == 2 ) {","gl_FragColor.xyz += cubeColor.xyz * specularStrength * reflectivity;","} else {","gl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );","}","#endif"],"\n"),"envmap_pars_vertex",C.a.v(["#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )","varying vec3 vReflect;","uniform float refractionRatio;","uniform bool useRefract;","#endif"],"\n"),"worldpos_vertex",C.a.v(["#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )","#ifdef USE_SKINNING","vec4 worldPosition = modelMatrix * skinned;","#endif","#if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )","vec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );","#endif","#if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )","vec4 worldPosition = modelMatrix * vec4( position, 1.0 );","#endif","#endif"],"\n"),"envmap_vertex",C.a.v(["#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )","vec3 worldNormal = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * objectNormal;","worldNormal = normalize( worldNormal );","vec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );","if ( useRefract ) {","vReflect = refract( cameraToVertex, worldNormal, refractionRatio );","} else {","vReflect = reflect( cameraToVertex, worldNormal );","}","#endif"],"\n"),"map_particle_pars_fragment",C.a.v(["#ifdef USE_MAP","uniform sampler2D map;","#endif"],"\n"),"map_particle_fragment",C.a.v(["#ifdef USE_MAP","gl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );","#endif"],"\n"),"map_pars_vertex",C.a.v(["#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )","varying vec2 vUv;","uniform vec4 offsetRepeat;","#endif"],"\n"),"map_pars_fragment",C.a.v(["#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )","varying vec2 vUv;","#endif","#ifdef USE_MAP","uniform sampler2D map;","#endif"],"\n"),"map_vertex",C.a.v(["#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )","vUv = uv * offsetRepeat.zw + offsetRepeat.xy;","#endif"],"\n"),"map_fragment",C.a.v(["#ifdef USE_MAP","vec4 texelColor = texture2D( map, vUv );","#ifdef GAMMA_INPUT","texelColor.xyz *= texelColor.xyz;","#endif","gl_FragColor = gl_FragColor * texelColor;","#endif"],"\n"),"lightmap_pars_fragment",C.a.v(["#ifdef USE_LIGHTMAP","varying vec2 vUv2;","uniform sampler2D lightMap;","#endif"],"\n"),"lightmap_pars_vertex",C.a.v(["#ifdef USE_LIGHTMAP","varying vec2 vUv2;","#endif"],"\n"),"lightmap_fragment",C.a.v(["#ifdef USE_LIGHTMAP","gl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );","#endif"],"\n"),"lightmap_vertex",C.a.v(["#ifdef USE_LIGHTMAP","vUv2 = uv2;","#endif"],"\n"),"bumpmap_pars_fragment",C.a.v(["#ifdef USE_BUMPMAP","uniform sampler2D bumpMap;","uniform float bumpScale;","vec2 dHdxy_fwd() {","vec2 dSTdx = dFdx( vUv );","vec2 dSTdy = dFdy( vUv );","float Hll = bumpScale * texture2D( bumpMap, vUv ).x;","float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;","float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;","return vec2( dBx, dBy );","}","vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {","vec3 vSigmaX = dFdx( surf_pos );","vec3 vSigmaY = dFdy( surf_pos );","vec3 vN = surf_norm;","vec3 R1 = cross( vSigmaY, vN );","vec3 R2 = cross( vN, vSigmaX );","float fDet = dot( vSigmaX, R1 );","vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );","return normalize( abs( fDet ) * surf_norm - vGrad );","}","#endif"],"\n"),"normalmap_pars_fragment",C.a.v(["#ifdef USE_NORMALMAP","uniform sampler2D normalMap;","uniform vec2 normalScale;","vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {","vec3 q0 = dFdx( eye_pos.xyz );","vec3 q1 = dFdy( eye_pos.xyz );","vec2 st0 = dFdx( vUv.st );","vec2 st1 = dFdy( vUv.st );","vec3 S = normalize(  q0 * st1.t - q1 * st0.t );","vec3 T = normalize( -q0 * st1.s + q1 * st0.s );","vec3 N = normalize( surf_norm );","vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;","mapN.xy = normalScale * mapN.xy;","mat3 tsn = mat3( S, T, N );","return normalize( tsn * mapN );","}","#endif"],"\n"),"specularmap_pars_fragment",C.a.v(["#ifdef USE_SPECULARMAP","uniform sampler2D specularMap;","#endif"],"\n"),"specularmap_fragment",C.a.v(["float specularStrength;","#ifdef USE_SPECULARMAP","vec4 texelSpecular = texture2D( specularMap, vUv );","specularStrength = texelSpecular.r;","#else","specularStrength = 1.0;","#endif"],"\n"),"lights_lambert_pars_vertex",C.a.v(["uniform vec3 ambient;","uniform vec3 diffuse;","uniform vec3 emissive;","uniform vec3 ambientLightColor;","#if MAX_DIR_LIGHTS > 0","uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];","uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];","#endif","#if MAX_HEMI_LIGHTS > 0","uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];","uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];","uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];","#endif","#if MAX_POINT_LIGHTS > 0","uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];","uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];","uniform float pointLightDistance[ MAX_POINT_LIGHTS ];","#endif","#if MAX_SPOT_LIGHTS > 0","uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];","uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];","uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];","uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];","uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];","uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];","#endif","#ifdef WRAP_AROUND","uniform vec3 wrapRGB;","#endif"],"\n"),"lights_lambert_vertex",C.a.v(["vLightFront = vec3( 0.0 );","#ifdef DOUBLE_SIDED","vLightBack = vec3( 0.0 );","#endif","transformedNormal = normalize( transformedNormal );","#if MAX_DIR_LIGHTS > 0","for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {","vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );","vec3 dirVector = normalize( lDirection.xyz );","float dotProduct = dot( transformedNormal, dirVector );","vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );","#ifdef DOUBLE_SIDED","vec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );","#ifdef WRAP_AROUND","vec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );","#endif","#endif","#ifdef WRAP_AROUND","vec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );","directionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );","#ifdef DOUBLE_SIDED","directionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );","#endif","#endif","vLightFront += directionalLightColor[ i ] * directionalLightWeighting;","#ifdef DOUBLE_SIDED","vLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;","#endif","}","#endif","#if MAX_POINT_LIGHTS > 0","for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {","vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );","vec3 lVector = lPosition.xyz - mvPosition.xyz;","float lDistance = 1.0;","if ( pointLightDistance[ i ] > 0.0 )","lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );","lVector = normalize( lVector );","float dotProduct = dot( transformedNormal, lVector );","vec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );","#ifdef DOUBLE_SIDED","vec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );","#ifdef WRAP_AROUND","vec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );","#endif","#endif","#ifdef WRAP_AROUND","vec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );","pointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );","#ifdef DOUBLE_SIDED","pointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );","#endif","#endif","vLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;","#ifdef DOUBLE_SIDED","vLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;","#endif","}","#endif","#if MAX_SPOT_LIGHTS > 0","for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {","vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );","vec3 lVector = lPosition.xyz - mvPosition.xyz;","float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );","if ( spotEffect > spotLightAngleCos[ i ] ) {","spotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );","float lDistance = 1.0;","if ( spotLightDistance[ i ] > 0.0 )","lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );","lVector = normalize( lVector );","float dotProduct = dot( transformedNormal, lVector );","vec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );","#ifdef DOUBLE_SIDED","vec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );","#ifdef WRAP_AROUND","vec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );","#endif","#endif","#ifdef WRAP_AROUND","vec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );","spotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );","#ifdef DOUBLE_SIDED","spotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );","#endif","#endif","vLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;","#ifdef DOUBLE_SIDED","vLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;","#endif","}","}","#endif","#if MAX_HEMI_LIGHTS > 0","for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {","vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );","vec3 lVector = normalize( lDirection.xyz );","float dotProduct = dot( transformedNormal, lVector );","float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;","float hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;","vLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );","#ifdef DOUBLE_SIDED","vLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );","#endif","}","#endif","vLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;","#ifdef DOUBLE_SIDED","vLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;","#endif"],"\n"),"lights_phong_pars_vertex",C.a.v(["#ifndef PHONG_PER_PIXEL","#if MAX_POINT_LIGHTS > 0","uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];","uniform float pointLightDistance[ MAX_POINT_LIGHTS ];","varying vec4 vPointLight[ MAX_POINT_LIGHTS ];","#endif","#if MAX_SPOT_LIGHTS > 0","uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];","uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];","varying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];","#endif","#endif","#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )","varying vec3 vWorldPosition;","#endif"],"\n"),"lights_phong_vertex",C.a.v(["#ifndef PHONG_PER_PIXEL","#if MAX_POINT_LIGHTS > 0","for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {","vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );","vec3 lVector = lPosition.xyz - mvPosition.xyz;","float lDistance = 1.0;","if ( pointLightDistance[ i ] > 0.0 )","lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );","vPointLight[ i ] = vec4( lVector, lDistance );","}","#endif","#if MAX_SPOT_LIGHTS > 0","for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {","vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );","vec3 lVector = lPosition.xyz - mvPosition.xyz;","float lDistance = 1.0;","if ( spotLightDistance[ i ] > 0.0 )","lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );","vSpotLight[ i ] = vec4( lVector, lDistance );","}","#endif","#endif","#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )","vWorldPosition = worldPosition.xyz;","#endif"],"\n"),"lights_phong_pars_fragment",C.a.v(["uniform vec3 ambientLightColor;","#if MAX_DIR_LIGHTS > 0","uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];","uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];","#endif","#if MAX_HEMI_LIGHTS > 0","uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];","uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];","uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];","#endif","#if MAX_POINT_LIGHTS > 0","uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];","#ifdef PHONG_PER_PIXEL","uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];","uniform float pointLightDistance[ MAX_POINT_LIGHTS ];","#else","varying vec4 vPointLight[ MAX_POINT_LIGHTS ];","#endif","#endif","#if MAX_SPOT_LIGHTS > 0","uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];","uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];","uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];","uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];","uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];","#ifdef PHONG_PER_PIXEL","uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];","#else","varying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];","#endif","#endif","#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )","varying vec3 vWorldPosition;","#endif","#ifdef WRAP_AROUND","uniform vec3 wrapRGB;","#endif","varying vec3 vViewPosition;","varying vec3 vNormal;"],"\n"),"lights_phong_fragment",C.a.v(["vec3 normal = normalize( vNormal );","vec3 viewPosition = normalize( vViewPosition );","#ifdef DOUBLE_SIDED","normal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );","#endif","#ifdef USE_NORMALMAP","normal = perturbNormal2Arb( -viewPosition, normal );","#elif defined( USE_BUMPMAP )","normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );","#endif","#if MAX_POINT_LIGHTS > 0","vec3 pointDiffuse  = vec3( 0.0 );","vec3 pointSpecular = vec3( 0.0 );","for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {","#ifdef PHONG_PER_PIXEL","vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );","vec3 lVector = lPosition.xyz + vViewPosition.xyz;","float lDistance = 1.0;","if ( pointLightDistance[ i ] > 0.0 )","lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );","lVector = normalize( lVector );","#else","vec3 lVector = normalize( vPointLight[ i ].xyz );","float lDistance = vPointLight[ i ].w;","#endif","float dotProduct = dot( normal, lVector );","#ifdef WRAP_AROUND","float pointDiffuseWeightFull = max( dotProduct, 0.0 );","float pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );","vec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );","#else","float pointDiffuseWeight = max( dotProduct, 0.0 );","#endif","pointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;","vec3 pointHalfVector = normalize( lVector + viewPosition );","float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );","float pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );","#ifdef PHYSICALLY_BASED_SHADING","float specularNormalization = ( shininess + 2.0001 ) / 8.0;","vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );","pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;","#else","pointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;","#endif","}","#endif","#if MAX_SPOT_LIGHTS > 0","vec3 spotDiffuse  = vec3( 0.0 );","vec3 spotSpecular = vec3( 0.0 );","for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {","#ifdef PHONG_PER_PIXEL","vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );","vec3 lVector = lPosition.xyz + vViewPosition.xyz;","float lDistance = 1.0;","if ( spotLightDistance[ i ] > 0.0 )","lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );","lVector = normalize( lVector );","#else","vec3 lVector = normalize( vSpotLight[ i ].xyz );","float lDistance = vSpotLight[ i ].w;","#endif","float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );","if ( spotEffect > spotLightAngleCos[ i ] ) {","spotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );","float dotProduct = dot( normal, lVector );","#ifdef WRAP_AROUND","float spotDiffuseWeightFull = max( dotProduct, 0.0 );","float spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );","vec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );","#else","float spotDiffuseWeight = max( dotProduct, 0.0 );","#endif","spotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;","vec3 spotHalfVector = normalize( lVector + viewPosition );","float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );","float spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );","#ifdef PHYSICALLY_BASED_SHADING","float specularNormalization = ( shininess + 2.0001 ) / 8.0;","vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );","spotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;","#else","spotSpecular += specular * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;","#endif","}","}","#endif","#if MAX_DIR_LIGHTS > 0","vec3 dirDiffuse  = vec3( 0.0 );","vec3 dirSpecular = vec3( 0.0 );","for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {","vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );","vec3 dirVector = normalize( lDirection.xyz );","float dotProduct = dot( normal, dirVector );","#ifdef WRAP_AROUND","float dirDiffuseWeightFull = max( dotProduct, 0.0 );","float dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );","vec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );","#else","float dirDiffuseWeight = max( dotProduct, 0.0 );","#endif","dirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;","vec3 dirHalfVector = normalize( dirVector + viewPosition );","float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );","float dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );","#ifdef PHYSICALLY_BASED_SHADING","float specularNormalization = ( shininess + 2.0001 ) / 8.0;","vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );","dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;","#else","dirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;","#endif","}","#endif","#if MAX_HEMI_LIGHTS > 0","vec3 hemiDiffuse  = vec3( 0.0 );","vec3 hemiSpecular = vec3( 0.0 );","for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {","vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );","vec3 lVector = normalize( lDirection.xyz );","float dotProduct = dot( normal, lVector );","float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;","vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );","hemiDiffuse += diffuse * hemiColor;","vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );","float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;","float hemiSpecularWeightSky = specularStrength * max( pow( hemiDotNormalHalfSky, shininess ), 0.0 );","vec3 lVectorGround = -lVector;","vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );","float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;","float hemiSpecularWeightGround = specularStrength * max( pow( hemiDotNormalHalfGround, shininess ), 0.0 );","#ifdef PHYSICALLY_BASED_SHADING","float dotProductGround = dot( normal, lVectorGround );","float specularNormalization = ( shininess + 2.0001 ) / 8.0;","vec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );","vec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );","hemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );","#else","hemiSpecular += specular * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;","#endif","}","#endif","vec3 totalDiffuse = vec3( 0.0 );","vec3 totalSpecular = vec3( 0.0 );","#if MAX_DIR_LIGHTS > 0","totalDiffuse += dirDiffuse;","totalSpecular += dirSpecular;","#endif","#if MAX_HEMI_LIGHTS > 0","totalDiffuse += hemiDiffuse;","totalSpecular += hemiSpecular;","#endif","#if MAX_POINT_LIGHTS > 0","totalDiffuse += pointDiffuse;","totalSpecular += pointSpecular;","#endif","#if MAX_SPOT_LIGHTS > 0","totalDiffuse += spotDiffuse;","totalSpecular += spotSpecular;","#endif","#ifdef METAL","gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );","#else","gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;","#endif"],"\n"),"color_pars_fragment",C.a.v(["#ifdef USE_COLOR","varying vec3 vColor;","#endif"],"\n"),"color_fragment",C.a.v(["#ifdef USE_COLOR","gl_FragColor = gl_FragColor * vec4( vColor, opacity );","#endif"],"\n"),"color_pars_vertex",C.a.v(["#ifdef USE_COLOR","varying vec3 vColor;","#endif"],"\n"),"color_vertex",C.a.v(["#ifdef USE_COLOR","#ifdef GAMMA_INPUT","vColor = color * color;","#else","vColor = color;","#endif","#endif"],"\n"),"skinning_pars_vertex",C.a.v(["#ifdef USE_SKINNING","#ifdef BONE_TEXTURE","uniform sampler2D boneTexture;","mat4 getBoneMatrix( const in float i ) {","float j = i * 4.0;","float x = mod( j, N_BONE_PIXEL_X );","float y = floor( j / N_BONE_PIXEL_X );","const float dx = 1.0 / N_BONE_PIXEL_X;","const float dy = 1.0 / N_BONE_PIXEL_Y;","y = dy * ( y + 0.5 );","vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );","vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );","vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );","vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );","mat4 bone = mat4( v1, v2, v3, v4 );","return bone;","}","#else","uniform mat4 boneGlobalMatrices[ MAX_BONES ];","mat4 getBoneMatrix( const in float i ) {","mat4 bone = boneGlobalMatrices[ int(i) ];","return bone;","}","#endif","#endif"],"\n"),"skinbase_vertex",C.a.v(["#ifdef USE_SKINNING","mat4 boneMatX = getBoneMatrix( skinIndex.x );","mat4 boneMatY = getBoneMatrix( skinIndex.y );","#endif"],"\n"),"skinning_vertex",C.a.v(["#ifdef USE_SKINNING","#ifdef USE_MORPHTARGETS","vec4 skinVertex = vec4( morphed, 1.0 );","#else","vec4 skinVertex = vec4( position, 1.0 );","#endif","vec4 skinned  = boneMatX * skinVertex * skinWeight.x;","skinned    += boneMatY * skinVertex * skinWeight.y;","#endif"],"\n"),"morphtarget_pars_vertex",C.a.v(["#ifdef USE_MORPHTARGETS","#ifndef USE_MORPHNORMALS","uniform float morphTargetInfluences[ 8 ];","#else","uniform float morphTargetInfluences[ 4 ];","#endif","#endif"],"\n"),"morphtarget_vertex",C.a.v(["#ifdef USE_MORPHTARGETS","vec3 morphed = vec3( 0.0 );","morphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];","morphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];","morphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];","morphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];","#ifndef USE_MORPHNORMALS","morphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];","morphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];","morphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];","morphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];","#endif","morphed += position;","#endif"],"\n"),"default_vertex",C.a.v(["vec4 mvPosition;","#ifdef USE_SKINNING","mvPosition = modelViewMatrix * skinned;","#endif","#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )","mvPosition = modelViewMatrix * vec4( morphed, 1.0 );","#endif","#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )","mvPosition = modelViewMatrix * vec4( position, 1.0 );","#endif","gl_Position = projectionMatrix * mvPosition;"],"\n"),"morphnormal_vertex",C.a.v(["#ifdef USE_MORPHNORMALS","vec3 morphedNormal = vec3( 0.0 );","morphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];","morphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];","morphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];","morphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];","morphedNormal += normal;","#endif"],"\n"),"skinnormal_vertex",C.a.v(["#ifdef USE_SKINNING","mat4 skinMatrix = skinWeight.x * boneMatX;","skinMatrix   += skinWeight.y * boneMatY;","#ifdef USE_MORPHNORMALS","vec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );","#else","vec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );","#endif","#endif"],"\n"),"defaultnormal_vertex",C.a.v(["vec3 objectNormal;","#ifdef USE_SKINNING","objectNormal = skinnedNormal.xyz;","#endif","#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )","objectNormal = morphedNormal;","#endif","#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )","objectNormal = normal;","#endif","#ifdef FLIP_SIDED","objectNormal = -objectNormal;","#endif","vec3 transformedNormal = normalMatrix * objectNormal;"],"\n"),"shadowmap_pars_fragment",C.a.v(["#ifdef USE_SHADOWMAP","uniform sampler2D shadowMap[ MAX_SHADOWS ];","uniform vec2 shadowMapSize[ MAX_SHADOWS ];","uniform float shadowDarkness[ MAX_SHADOWS ];","uniform float shadowBias[ MAX_SHADOWS ];","varying vec4 vShadowCoord[ MAX_SHADOWS ];","float unpackDepth( const in vec4 rgba_depth ) {","const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );","float depth = dot( rgba_depth, bit_shift );","return depth;","}","#endif"],"\n"),"shadowmap_fragment",C.a.v(["#ifdef USE_SHADOWMAP","#ifdef SHADOWMAP_DEBUG","vec3 frustumColors[3];","frustumColors[0] = vec3( 1.0, 0.5, 0.0 );","frustumColors[1] = vec3( 0.0, 1.0, 0.8 );","frustumColors[2] = vec3( 0.0, 0.5, 1.0 );","#endif","#ifdef SHADOWMAP_CASCADE","int inFrustumCount = 0;","#endif","float fDepth;","vec3 shadowColor = vec3( 1.0 );","for( int i = 0; i < MAX_SHADOWS; i ++ ) {","vec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;","bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );","bool inFrustum = all( inFrustumVec );","#ifdef SHADOWMAP_CASCADE","inFrustumCount += int( inFrustum );","bvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );","#else","bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );","#endif","bool frustumTest = all( frustumTestVec );","if ( frustumTest ) {","shadowCoord.z += shadowBias[ i ];","#if defined( SHADOWMAP_TYPE_PCF )","float shadow = 0.0;","const float shadowDelta = 1.0 / 9.0;","float xPixelOffset = 1.0 / shadowMapSize[ i ].x;","float yPixelOffset = 1.0 / shadowMapSize[ i ].y;","float dx0 = -1.25 * xPixelOffset;","float dy0 = -1.25 * yPixelOffset;","float dx1 = 1.25 * xPixelOffset;","float dy1 = 1.25 * yPixelOffset;","fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );","if ( fDepth < shadowCoord.z ) shadow += shadowDelta;","fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );","if ( fDepth < shadowCoord.z ) shadow += shadowDelta;","fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );","if ( fDepth < shadowCoord.z ) shadow += shadowDelta;","fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );","if ( fDepth < shadowCoord.z ) shadow += shadowDelta;","fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );","if ( fDepth < shadowCoord.z ) shadow += shadowDelta;","fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );","if ( fDepth < shadowCoord.z ) shadow += shadowDelta;","fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );","if ( fDepth < shadowCoord.z ) shadow += shadowDelta;","fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );","if ( fDepth < shadowCoord.z ) shadow += shadowDelta;","fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );","if ( fDepth < shadowCoord.z ) shadow += shadowDelta;","shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );","#elif defined( SHADOWMAP_TYPE_PCF_SOFT )","float shadow = 0.0;","float xPixelOffset = 1.0 / shadowMapSize[ i ].x;","float yPixelOffset = 1.0 / shadowMapSize[ i ].y;","float dx0 = -1.0 * xPixelOffset;","float dy0 = -1.0 * yPixelOffset;","float dx1 = 1.0 * xPixelOffset;","float dy1 = 1.0 * yPixelOffset;","mat3 shadowKernel;","mat3 depthKernel;","depthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );","if ( depthKernel[0][0] < shadowCoord.z ) shadowKernel[0][0] = 0.25;","else shadowKernel[0][0] = 0.0;","depthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );","if ( depthKernel[0][1] < shadowCoord.z ) shadowKernel[0][1] = 0.25;","else shadowKernel[0][1] = 0.0;","depthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i], shadowCoord.xy + vec2( dx0, dy1 ) ) );","if ( depthKernel[0][2] < shadowCoord.z ) shadowKernel[0][2] = 0.25;","else shadowKernel[0][2] = 0.0;","depthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );","if ( depthKernel[1][0] < shadowCoord.z ) shadowKernel[1][0] = 0.25;","else shadowKernel[1][0] = 0.0;","depthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );","if ( depthKernel[1][1] < shadowCoord.z ) shadowKernel[1][1] = 0.25;","else shadowKernel[1][1] = 0.0;","depthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );","if ( depthKernel[1][2] < shadowCoord.z ) shadowKernel[1][2] = 0.25;","else shadowKernel[1][2] = 0.0;","depthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );","if ( depthKernel[2][0] < shadowCoord.z ) shadowKernel[2][0] = 0.25;","else shadowKernel[2][0] = 0.0;","depthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );","if ( depthKernel[2][1] < shadowCoord.z ) shadowKernel[2][1] = 0.25;","else shadowKernel[2][1] = 0.0;","depthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );","if ( depthKernel[2][2] < shadowCoord.z ) shadowKernel[2][2] = 0.25;","else shadowKernel[2][2] = 0.0;","vec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );","shadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );","shadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );","vec4 shadowValues;","shadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );","shadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );","shadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );","shadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );","shadow = dot( shadowValues, vec4( 1.0 ) );","shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );","#else","vec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );","float fDepth = unpackDepth( rgbaDepth );","if ( fDepth < shadowCoord.z )","shadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );","#endif","}","#ifdef SHADOWMAP_DEBUG","#ifdef SHADOWMAP_CASCADE","if ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];","#else","if ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];","#endif","#endif","}","#ifdef GAMMA_OUTPUT","shadowColor *= shadowColor;","#endif","gl_FragColor.xyz = gl_FragColor.xyz * shadowColor;","#endif"],"\n"),"shadowmap_pars_vertex",C.a.v(["#ifdef USE_SHADOWMAP","varying vec4 vShadowCoord[ MAX_SHADOWS ];","uniform mat4 shadowMatrix[ MAX_SHADOWS ];","#endif"],"\n"),"shadowmap_vertex",C.a.v(["#ifdef USE_SHADOWMAP","for( int i = 0; i < MAX_SHADOWS; i ++ ) {","vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;","}","#endif"],"\n"),"alphatest_fragment",C.a.v(["#ifdef ALPHATEST","if ( gl_FragColor.a < ALPHATEST ) discard;","#endif"],"\n"),"linear_to_gamma_fragment",C.a.v(["#ifdef GAMMA_OUTPUT","gl_FragColor.xyz = sqrt( gl_FragColor.xyz );","#endif"],"\n")])
$.fM=z}return z},
bK:function(a){var z=P.C()
C.a.G(a,new S.m_(z))
return z},
fx:function(a){var z=P.C()
a.G(0,new S.lY(z))
return z},
a0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=$.fO
if(z==null){z=new S.q("c",null,!0,null)
z.sq(0,S.w(15658734))
y=new S.q("f",null,!0,null)
y.sq(0,1)
x=new S.q("t",null,!0,null)
x.sq(0,null)
w=new T.R(new Float32Array(H.b(4)))
w.a7(0,0,1,1)
v=new S.q("v4",null,!0,null)
v.sq(0,w)
w=new S.q("t",null,!0,null)
w.sq(0,null)
u=new S.q("t",null,!0,null)
u.sq(0,null)
t=new S.q("t",null,!0,null)
t.sq(0,null)
s=new S.q("f",null,!0,null)
s.sq(0,-1)
r=new S.q("i",null,!0,null)
r.sq(0,0)
q=new S.q("f",null,!0,null)
q.sq(0,1)
p=new S.q("f",null,!0,null)
p.sq(0,0.98)
o=new S.q("i",null,!0,null)
o.sq(0,0)
n=new S.q("f",null,!0,null)
n.sq(0,0)
n=P.y(["diffuse",z,"opacity",y,"map",x,"offsetRepeat",v,"lightMap",w,"specularMap",u,"envMap",t,"flipEnvMap",s,"useRefract",r,"reflectivity",q,"refractionRatio",p,"combine",o,"morphTargetInfluences",n])
o=new S.q("t",null,!0,null)
o.sq(0,null)
p=new S.q("f",null,!0,null)
p.sq(0,1)
p=P.y(["bumpMap",o,"bumpScale",p])
o=new S.q("t",null,!0,null)
o.sq(0,null)
q=new Float32Array(H.b(2))
q[0]=1
q[1]=1
r=new S.q("v2",null,!0,null)
r.sq(0,new T.a4(q))
r=P.y(["normalMap",o,"normalScale",r])
o=new S.q("f",null,!0,null)
o.sq(0,0.00025)
q=new S.q("f",null,!0,null)
q.sq(0,1)
s=new S.q("f",null,!0,null)
s.sq(0,2000)
t=new S.q("c",null,!0,null)
t.sq(0,S.w(16777215))
t=P.y(["fogDensity",o,"fogNear",q,"fogFar",s,"fogColor",t])
s=new S.q("fv",null,!0,null)
s.sq(0,[])
q=new S.q("fv",null,!0,null)
q.sq(0,[])
o=new S.q("fv",null,!0,null)
o.sq(0,[])
u=new S.q("fv",null,!0,null)
u.sq(0,[])
w=new S.q("fv",null,!0,null)
w.sq(0,[])
v=new S.q("fv",null,!0,null)
v.sq(0,[])
x=new S.q("fv",null,!0,null)
x.sq(0,[])
y=new S.q("fv",null,!0,null)
y.sq(0,[])
z=new S.q("fv1",null,!0,null)
z.sq(0,[])
m=new S.q("fv",null,!0,null)
m.sq(0,[])
l=new S.q("fv",null,!0,null)
l.sq(0,[])
k=new S.q("fv",null,!0,null)
k.sq(0,[])
j=new S.q("fv1",null,!0,null)
j.sq(0,[])
i=new S.q("fv1",null,!0,null)
i.sq(0,[])
h=new S.q("fv1",null,!0,null)
h.sq(0,[])
h=P.y(["ambientLightColor",s,"directionalLightDirection",q,"directionalLightColor",o,"hemisphereLightDirection",u,"hemisphereLightSkyColor",w,"hemisphereLightGroundColor",v,"pointLightColor",x,"pointLightPosition",y,"pointLightDistance",z,"spotLightColor",m,"spotLightPosition",l,"spotLightDirection",k,"spotLightDistance",j,"spotLightAngleCos",i,"spotLightExponent",h])
i=new S.q("c",null,!0,null)
i.sq(0,S.w(15658734))
j=new S.q("f",null,!0,null)
j.sq(0,1)
k=new S.q("f",null,!0,null)
k.sq(0,1)
l=new S.q("f",null,!0,null)
l.sq(0,1)
m=new S.q("t",null,!0,null)
m.sq(0,null)
z=new S.q("f",null,!0,null)
z.sq(0,0.00025)
y=new S.q("f",null,!0,null)
y.sq(0,1)
x=new S.q("f",null,!0,null)
x.sq(0,2000)
v=new S.q("c",null,!0,null)
v.sq(0,S.w(16777215))
v=P.y(["psColor",i,"opacity",j,"size",k,"scale",l,"map",m,"fogDensity",z,"fogNear",y,"fogFar",x,"fogColor",v])
x=new S.q("tv",null,!0,null)
x.sq(0,[])
y=new S.q("v2v",null,!0,null)
y.sq(0,[])
z=new S.q("fv1",null,!0,null)
z.sq(0,[])
m=new S.q("fv1",null,!0,null)
m.sq(0,[])
l=new S.q("m4v",null,!0,null)
l.sq(0,[])
l=P.y(["common",n,"bump",p,"normalmap",r,"fog",t,"lights",h,"particle",v,"shadowmap",P.y(["shadowMap",x,"shadowMapSize",y,"shadowBias",z,"shadowDarkness",m,"shadowMatrix",l])])
$.fO=l
z=l}return z},
fb:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=$.fN
if(z==null){z=new S.q("f",null,!0,null)
z.sq(0,1)
y=new S.q("f",null,!0,null)
y.sq(0,2000)
x=new S.q("f",null,!0,null)
x.sq(0,1)
x=P.y(["uniforms",P.y(["mNear",z,"mFar",y,"opacity",x]),"vertexShader",C.a.v(["void main() {","gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"],"\n"),"fragmentShader",C.a.v(["uniform float mNear;","uniform float mFar;","uniform float opacity;","void main() {","float depth = gl_FragCoord.z / gl_FragCoord.w;","float color = 1.0 - smoothstep( mNear, mFar, depth );","gl_FragColor = vec4( vec3( color ), opacity );","}"],"\n")])
y=new S.q("f",null,!0,null)
y.sq(0,1)
y=P.y(["uniforms",P.y(["opacity",y]),"vertexShader",C.a.v(["varying vec3 vNormal;","void main() {","vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );","vNormal = normalize( normalMatrix * normal );","gl_Position = projectionMatrix * mvPosition;","}"],"\n"),"fragmentShader",C.a.v(["uniform float opacity;","varying vec3 vNormal;","void main() {","gl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );","}"],"\n")])
z=P.y(["uniforms",S.bK([S.a0().h(0,"common"),S.a0().h(0,"fog"),S.a0().h(0,"shadowmap")]),"vertexShader",C.a.v([S.j().h(0,"map_pars_vertex"),S.j().h(0,"lightmap_pars_vertex"),S.j().h(0,"envmap_pars_vertex"),S.j().h(0,"color_pars_vertex"),S.j().h(0,"morphtarget_pars_vertex"),S.j().h(0,"skinning_pars_vertex"),S.j().h(0,"shadowmap_pars_vertex"),"void main() {",S.j().h(0,"map_vertex"),S.j().h(0,"lightmap_vertex"),S.j().h(0,"color_vertex"),S.j().h(0,"skinbase_vertex"),"#ifdef USE_ENVMAP",S.j().h(0,"morphnormal_vertex"),S.j().h(0,"skinnormal_vertex"),S.j().h(0,"defaultnormal_vertex"),"#endif",S.j().h(0,"morphtarget_vertex"),S.j().h(0,"skinning_vertex"),S.j().h(0,"default_vertex"),S.j().h(0,"worldpos_vertex"),S.j().h(0,"envmap_vertex"),S.j().h(0,"shadowmap_vertex"),"}"],"\n"),"fragmentShader",C.a.v(["uniform vec3 diffuse;","uniform float opacity;",S.j().h(0,"color_pars_fragment"),S.j().h(0,"map_pars_fragment"),S.j().h(0,"lightmap_pars_fragment"),S.j().h(0,"envmap_pars_fragment"),S.j().h(0,"fog_pars_fragment"),S.j().h(0,"shadowmap_pars_fragment"),S.j().h(0,"specularmap_pars_fragment"),"void main() {","gl_FragColor = vec4( diffuse, opacity );",S.j().h(0,"map_fragment"),S.j().h(0,"alphatest_fragment"),S.j().h(0,"specularmap_fragment"),S.j().h(0,"lightmap_fragment"),S.j().h(0,"color_fragment"),S.j().h(0,"envmap_fragment"),S.j().h(0,"shadowmap_fragment"),S.j().h(0,"linear_to_gamma_fragment"),S.j().h(0,"fog_fragment"),"}"],"\n")])
w=S.a0().h(0,"common")
v=S.a0().h(0,"fog")
u=S.a0().h(0,"lights")
t=S.a0().h(0,"shadowmap")
s=new S.q("c",null,!0,null)
s.sq(0,S.w(16777215))
r=new S.q("c",null,!0,null)
r.sq(0,S.w(0))
q=new T.e(new Float32Array(H.b(3)))
q.l(1,1,1)
p=new S.q("v3",null,!0,null)
p.sq(0,q)
p=P.y(["uniforms",S.bK([w,v,u,t,P.y(["ambient",s,"emissive",r,"wrapRGB",p])]),"vertexShader",C.a.v(["#define LAMBERT","varying vec3 vLightFront;","#ifdef DOUBLE_SIDED","varying vec3 vLightBack;","#endif",S.j().h(0,"map_pars_vertex"),S.j().h(0,"lightmap_pars_vertex"),S.j().h(0,"envmap_pars_vertex"),S.j().h(0,"lights_lambert_pars_vertex"),S.j().h(0,"color_pars_vertex"),S.j().h(0,"morphtarget_pars_vertex"),S.j().h(0,"skinning_pars_vertex"),S.j().h(0,"shadowmap_pars_vertex"),"void main() {",S.j().h(0,"map_vertex"),S.j().h(0,"lightmap_vertex"),S.j().h(0,"color_vertex"),S.j().h(0,"morphnormal_vertex"),S.j().h(0,"skinbase_vertex"),S.j().h(0,"skinnormal_vertex"),S.j().h(0,"defaultnormal_vertex"),S.j().h(0,"morphtarget_vertex"),S.j().h(0,"skinning_vertex"),S.j().h(0,"default_vertex"),S.j().h(0,"worldpos_vertex"),S.j().h(0,"envmap_vertex"),S.j().h(0,"lights_lambert_vertex"),S.j().h(0,"shadowmap_vertex"),"}"],"\n"),"fragmentShader",C.a.v(["uniform float opacity;","varying vec3 vLightFront;","#ifdef DOUBLE_SIDED","varying vec3 vLightBack;","#endif",S.j().h(0,"color_pars_fragment"),S.j().h(0,"map_pars_fragment"),S.j().h(0,"lightmap_pars_fragment"),S.j().h(0,"envmap_pars_fragment"),S.j().h(0,"fog_pars_fragment"),S.j().h(0,"shadowmap_pars_fragment"),S.j().h(0,"specularmap_pars_fragment"),"void main() {","gl_FragColor = vec4( vec3 ( 1.0 ), opacity );",S.j().h(0,"map_fragment"),S.j().h(0,"alphatest_fragment"),S.j().h(0,"specularmap_fragment"),"#ifdef DOUBLE_SIDED","if ( gl_FrontFacing )","gl_FragColor.xyz *= vLightFront;","else","gl_FragColor.xyz *= vLightBack;","#else","gl_FragColor.xyz *= vLightFront;","#endif",S.j().h(0,"lightmap_fragment"),S.j().h(0,"color_fragment"),S.j().h(0,"envmap_fragment"),S.j().h(0,"shadowmap_fragment"),S.j().h(0,"linear_to_gamma_fragment"),S.j().h(0,"fog_fragment"),"}"],"\n")])
r=S.a0().h(0,"common")
s=S.a0().h(0,"bump")
t=S.a0().h(0,"normalmap")
u=S.a0().h(0,"fog")
v=S.a0().h(0,"lights")
w=S.a0().h(0,"shadowmap")
q=new S.q("c",null,!0,null)
q.sq(0,S.w(16777215))
o=new S.q("c",null,!0,null)
o.sq(0,S.w(0))
n=new S.q("c",null,!0,null)
n.sq(0,S.w(1118481))
m=new S.q("f",null,!0,null)
m.sq(0,30)
l=new T.e(new Float32Array(H.b(3)))
l.l(1,1,1)
k=new S.q("v3",null,!0,null)
k.sq(0,l)
k=P.y(["uniforms",S.bK([r,s,t,u,v,w,P.y(["ambient",q,"emissive",o,"specular",n,"shininess",m,"wrapRGB",k])]),"vertexShader",C.a.v(["#define PHONG","varying vec3 vViewPosition;","varying vec3 vNormal;",S.j().h(0,"map_pars_vertex"),S.j().h(0,"lightmap_pars_vertex"),S.j().h(0,"envmap_pars_vertex"),S.j().h(0,"lights_phong_pars_vertex"),S.j().h(0,"color_pars_vertex"),S.j().h(0,"morphtarget_pars_vertex"),S.j().h(0,"skinning_pars_vertex"),S.j().h(0,"shadowmap_pars_vertex"),"void main() {",S.j().h(0,"map_vertex"),S.j().h(0,"lightmap_vertex"),S.j().h(0,"color_vertex"),S.j().h(0,"morphnormal_vertex"),S.j().h(0,"skinbase_vertex"),S.j().h(0,"skinnormal_vertex"),S.j().h(0,"defaultnormal_vertex"),"vNormal = normalize( transformedNormal );",S.j().h(0,"morphtarget_vertex"),S.j().h(0,"skinning_vertex"),S.j().h(0,"default_vertex"),"vViewPosition = -mvPosition.xyz;",S.j().h(0,"worldpos_vertex"),S.j().h(0,"envmap_vertex"),S.j().h(0,"lights_phong_vertex"),S.j().h(0,"shadowmap_vertex"),"}"],"\n"),"fragmentShader",C.a.v(["uniform vec3 diffuse;","uniform float opacity;","uniform vec3 ambient;","uniform vec3 emissive;","uniform vec3 specular;","uniform float shininess;",S.j().h(0,"color_pars_fragment"),S.j().h(0,"map_pars_fragment"),S.j().h(0,"lightmap_pars_fragment"),S.j().h(0,"envmap_pars_fragment"),S.j().h(0,"fog_pars_fragment"),S.j().h(0,"lights_phong_pars_fragment"),S.j().h(0,"shadowmap_pars_fragment"),S.j().h(0,"bumpmap_pars_fragment"),S.j().h(0,"normalmap_pars_fragment"),S.j().h(0,"specularmap_pars_fragment"),"void main() {","gl_FragColor = vec4( vec3 ( 1.0 ), opacity );",S.j().h(0,"map_fragment"),S.j().h(0,"alphatest_fragment"),S.j().h(0,"specularmap_fragment"),S.j().h(0,"lights_phong_fragment"),S.j().h(0,"lightmap_fragment"),S.j().h(0,"color_fragment"),S.j().h(0,"envmap_fragment"),S.j().h(0,"shadowmap_fragment"),S.j().h(0,"linear_to_gamma_fragment"),S.j().h(0,"fog_fragment"),"}"],"\n")])
m=P.y(["uniforms",S.bK([S.a0().h(0,"particle"),S.a0().h(0,"shadowmap")]),"vertexShader",C.a.v(["uniform float size;","uniform float scale;",S.j().h(0,"color_pars_vertex"),S.j().h(0,"shadowmap_pars_vertex"),"void main() {",S.j().h(0,"color_vertex"),"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );","#ifdef USE_SIZEATTENUATION","gl_PointSize = size * ( scale / length( mvPosition.xyz ) );","#else","gl_PointSize = size;","#endif","gl_Position = projectionMatrix * mvPosition;",S.j().h(0,"worldpos_vertex"),S.j().h(0,"shadowmap_vertex"),"}"],"\n"),"fragmentShader",C.a.v(["uniform vec3 psColor;","uniform float opacity;",S.j().h(0,"color_pars_fragment"),S.j().h(0,"map_particle_pars_fragment"),S.j().h(0,"fog_pars_fragment"),S.j().h(0,"shadowmap_pars_fragment"),"void main() {","gl_FragColor = vec4( psColor, opacity );",S.j().h(0,"map_particle_fragment"),S.j().h(0,"alphatest_fragment"),S.j().h(0,"color_fragment"),S.j().h(0,"shadowmap_fragment"),S.j().h(0,"fog_fragment"),"}"],"\n")])
n=S.a0().h(0,"common")
o=S.a0().h(0,"fog")
q=new S.q("f",null,!0,null)
q.sq(0,1)
w=new S.q("f",null,!0,null)
w.sq(0,1)
v=new S.q("f",null,!0,null)
v.sq(0,2)
v=P.y(["depth",x,"normal",y,"basic",z,"lambert",p,"phong",k,"particle_basic",m,"dashed",P.y(["uniforms",S.bK([n,o,P.y(["scale",q,"dashSize",w,"totalSize",v])]),"vertexShader",C.a.v(["uniform float scale;","attribute float lineDistance;","varying float vLineDistance;",S.j().h(0,"color_pars_vertex"),"void main() {",S.j().h(0,"color_vertex"),"vLineDistance = scale * lineDistance;","vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );","gl_Position = projectionMatrix * mvPosition;","}"],"\n"),"fragmentShader",C.a.v(["uniform vec3 diffuse;","uniform float opacity;","uniform float dashSize;","uniform float totalSize;","varying float vLineDistance;",S.j().h(0,"color_pars_fragment"),S.j().h(0,"fog_pars_fragment"),"void main() {","if ( mod( vLineDistance, totalSize ) > dashSize ) {","discard;","}","gl_FragColor = vec4( diffuse, opacity );",S.j().h(0,"color_fragment"),S.j().h(0,"fog_fragment"),"}"],"\n")]),"depthRGBA",P.y(["uniforms",P.C(),"vertexShader",C.a.v([S.j().h(0,"morphtarget_pars_vertex"),S.j().h(0,"skinning_pars_vertex"),"void main() {",S.j().h(0,"skinbase_vertex"),S.j().h(0,"morphtarget_vertex"),S.j().h(0,"skinning_vertex"),S.j().h(0,"default_vertex"),"}"],"\n"),"fragmentShader",C.a.v(["vec4 pack_depth( const in float depth ) {","const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );","const vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );","vec4 res = fract( depth * bit_shift );","res -= res.xxyz * bit_mask;","return res;","}","void main() {","gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );","}"],"\n")])])
$.fN=v
z=v}return z},
jy:{
"^":"aR;L,N,Z,K,a1,ad,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a_,J,W,S,P,R,a8,T,a4,a9,ab,ac,a0,al,am,aj,Y",
dk:function(a){var z,y,x,w,v,u,t,s,r
if(this.fx)this.fe()
if(this.fy||a){z=this.d
y=this.dx
if(z!=null){z=z.gaA().a3(0,y)
this.dy=z
x=this.L
w=this.a1
S.h_(z,x,this.Z,w)
z=this.K
S.h_(y,this.N,z,this.ad)
y=this.dy
v=y.gi(y)
u=new T.r(new Float32Array(H.b(16)))
u.A()
S.ha(u,z)
w=w.a
z=w[0]
y=w[1]
w=w[2]
t=new Float32Array(H.b(16))
t[15]=1
t[10]=w
t[5]=y
t[0]=z
u.bk(0,new T.r(t))
x=x.a
t=x[0]
z=v.length
if(12>=z)return H.a(v,12)
v[12]=t
t=x[1]
if(13>=z)return H.a(v,13)
v[13]=t
x=x[2]
if(14>=z)return H.a(v,14)
v[14]=x}else this.dy.B(y)
this.fy=!1
a=!0}z=this.e
s=z.length
for(r=0;r<s;++r){if(r>=z.length)return H.a(z,r)
z[r].ls(a)}}},
iI:{
"^":"c1;x2,y1,y2,a_,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,a$,b$,c$,d$,e$,f$,r$,x$,y$,z$,Q$,ch$,cx$,cy$,db$,dx$,dy$,fr$,fx$,fy$,go$,id$,k1$,k2$,k3$,k4$,r1$,r2$,rx$,ry$,x1$,x2$,y1$,y2$,a_$,J$,W$,S$,P$,R$,a8$,T$,a4$,a9$,ab$,ac$,a0$",
bt:function(a3,a4,a5,a6,a7,a8,a9,b0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
z=this.y1
y=this.y2
x=a7/2
w=a8/2
v=this.b.length
u=a3==="x"
if(!(u&&a4==="y"))t=a3==="y"&&a4==="x"
else t=!0
if(t)s="z"
else{if(!(u&&a4==="z"))t=a3==="z"&&a4==="x"
else t=!0
if(t){y=this.a_
s="y"}else{if(!(a3==="z"&&a4==="y"))t=a3==="y"&&a4==="z"
else t=!0
if(t){z=this.a_
s="x"}else s=null}}r=z+1
q=y+1
p=a7/z
o=a8/y
t=new Float32Array(H.b(3))
n=new T.e(t)
m=s==="x"
if(m)t[0]=a9>0?1:-1
else if(s==="y")t[1]=a9>0?1:-1
else if(s==="z")t[2]=a9>0?1:-1
for(t=s==="z",l=s==="y",k=a4==="z",j=a4==="y",i=a4==="x",h=a3==="z",g=a3==="y",f=0;f<q;++f)for(e=(f*o-w)*a6,d=0;d<r;++d){c=new Float32Array(3)
if(u)c[0]=(d*p-x)*a5
else if(g)c[1]=(d*p-x)*a5
else if(h)c[2]=(d*p-x)*a5
if(i)c[0]=e
else if(j)c[1]=e
else if(k)c[2]=e
if(m)c[0]=a9
else if(l)c[1]=a9
else if(t)c[2]=a9
this.b.push(new T.e(c))}for(u=this.x,f=0;f<y;f=b)for(t=1-f/y,b=f+1,m=1-b/y,l=r*f,k=r*b,d=0;d<z;d=a){a=d+1
j=[d+l+v,d+k+v,a+k+v,a+l+v]
a0=new S.cY(j,null,null,null,null,null,null,null)
a0.cs(j,null,null,null)
a0.b.B(n)
j=a0.c
i=new T.e(new Float32Array(3))
i.B(n)
h=new T.e(new Float32Array(3))
h.B(n)
g=new T.e(new Float32Array(3))
g.B(n)
e=new T.e(new Float32Array(3))
e.B(n)
C.a.bd(j,[i,h,g,e])
a0.r=b0
this.f.push(a0)
a1=u[0]
a2=[]
e=d/z
g=a/z
C.a.bd(a2,[new S.aG(e,t),new S.aG(e,m),new S.aG(g,m),new S.aG(g,t)])
a1.push(a2)}},
h5:function(a,b,c,d,e,f,g,h){var z,y,x
z=a/2
y=b/2
x=c/2
this.e=[]
this.x2=new S.iH(!0,!0,!0,!0,!0,!0)
if(this.x2.a)this.bt("z","y",-1,-1,c,b,z,null)
if(this.x2.b)this.bt("z","y",1,-1,c,b,-z,null)
if(this.x2.c)this.bt("x","z",1,1,a,c,y,null)
if(this.x2.d)this.bt("x","z",1,-1,a,c,-y,null)
if(this.x2.e)this.bt("x","y",1,-1,a,b,x,null)
if(this.x2.f)this.bt("x","y",-1,-1,a,b,-x,null)
this.eC()
this.jQ()},
static:{aq:function(a,b,c,d,e,f,g,h){var z=new S.iI(null,d,e,f,"",H.o([],[T.e]),[],[],[],[],[[]],[[]],[],[],[],[],[],[],null,null,null,!1,!1,null,null,!1,!1,!1,!1,!1,!1,!1,!1,!1,null,null,null,null,null,null,null,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.ct()
z.h5(a,b,c,d,e,f,g,h)
return z}}},
iH:{
"^":"i;a,b,c,d,e,f"},
l3:{
"^":"c1;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,a$,b$,c$,d$,e$,f$,r$,x$,y$,z$,Q$,ch$,cx$,cy$,db$,dx$,dy$,fr$,fx$,fy$,go$,id$,k1$,k2$,k3$,k4$,r1$,r2$,rx$,ry$,x1$,x2$,y1$,y2$,a_$,J$,W$,S$,P$,R$,a8$,T$,a4$,a9$,ab$,ac$,a0$",
hb:function(a,b,a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=a/2
y=b/2
x=a0+1
w=a1+1
v=a/a0
u=b/a1
t=new T.e(new Float32Array(H.b(3)))
t.l(0,0,1)
for(s=0;s<w;++s)for(r=-(s*u-y),q=0;q<x;++q){p=this.b
o=new Float32Array(3)
o[0]=q*v-z
o[1]=r
o[2]=0
p.push(new T.e(o))}for(r=this.x,s=0;s<a1;s=n)for(p=s/a1,n=s+1,o=n/a1,m=x*s,l=x*n,q=0;q<a0;q=k){k=q+1
j=[q+m,q+l,k+l,k+m]
i=new S.cY(j,null,null,null,null,null,null,null)
i.cs(j,null,null,null)
j=new T.e(new Float32Array(3))
j.B(t)
i.b=j
j=i.c
h=new T.e(new Float32Array(3))
h.B(t)
g=new T.e(new Float32Array(3))
g.B(t)
f=new T.e(new Float32Array(3))
f.B(t)
e=new T.e(new Float32Array(3))
e.B(t)
C.a.bd(j,[h,g,f,e])
this.f.push(i)
d=r[0]
c=[]
e=q/a0
f=k/a0
C.a.bd(c,[new S.aG(e,p),new S.aG(e,o),new S.aG(f,o),new S.aG(f,p)])
d.push(c)}this.eC()},
static:{l4:function(a,b,c,d){var z=new S.l3("",H.o([],[T.e]),[],[],[],[],[[]],[[]],[],[],[],[],[],[],null,null,null,!1,!1,null,null,!1,!1,!1,!1,!1,!1,!1,!1,!1,null,null,null,null,null,null,null,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.ct()
z.hb(a,b,c,d)
return z}}},
iu:{
"^":"bh;Z,aA:K@,eS:a1<,ad,L,N,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a_,J,W,S,P,R,a8,T,a4,a9,ab,ac,a0,al,am,aj,Y",
C:function(a,b){var z
this.x1.b.push(new T.e(new Float32Array(H.b(3))))
this.x1.c.push(S.w(b))
z=this.ad
if(!z.cc(0,a))z.k(0,a,[])
z.h(0,a).push(this.x1.b.length-1)},
a6:function(a,b,c,d){var z,y,x,w,v
$.$get$bW().l(b,c,d)
$.$get$er().kK($.$get$bW(),$.$get$cS())
z=this.ad.h(0,a)
if(z!=null){y=z.length
for(x=0;x<y;++x){w=this.x1.b
if(x>=z.length)return H.a(z,x)
v=z[x]
if(v>>>0!==v||v>=w.length)return H.a(w,v)
w[v].B($.$get$bW())}}},
fd:function(a){$.$get$cS().N.B(this.Z.N)
this.a6("c",0,0,-1)
this.a6("t",0,0,1)
this.a6("n1",-1,-1,-1)
this.a6("n2",1,-1,-1)
this.a6("n3",-1,1,-1)
this.a6("n4",1,1,-1)
this.a6("f1",-1,-1,1)
this.a6("f2",1,-1,1)
this.a6("f3",-1,1,1)
this.a6("f4",1,1,1)
this.a6("u1",0.7,1.1,-1)
this.a6("u2",-0.7,1.1,-1)
this.a6("u3",0,2,-1)
this.a6("cf1",-1,0,1)
this.a6("cf2",1,0,1)
this.a6("cf3",0,-1,1)
this.a6("cf4",0,1,1)
this.a6("cn1",-1,0,-1)
this.a6("cn2",1,0,-1)
this.a6("cn3",0,-1,-1)
this.a6("cn4",0,1,-1)
this.x1.gaH().k(0,"verticesNeedUpdate",!0)}},
lu:{
"^":"i;a,b,c,d,e,f,r,x,y,z",
jy:function(a){var z,y,x
this.e=a.b
this.f=a
z=S.fb().h(0,"depthRGBA")
y=S.fx(z.h(0,"uniforms"))
this.r=S.cg(0,null,205,100,204,1,!0,!0,!0,z.h(0,"fragmentShader"),!1,!1,!1,"",1,!1,!1,0,0,2,0,!1,!1,y,0,z.h(0,"vertexShader"),!0,!1,1)
this.x=S.cg(0,null,205,100,204,1,!0,!0,!0,z.h(0,"fragmentShader"),!1,!1,!0,"",1,!1,!1,0,0,2,0,!1,!1,y,0,z.h(0,"vertexShader"),!0,!1,1)
this.y=S.cg(0,null,205,100,204,1,!0,!0,!0,z.h(0,"fragmentShader"),!1,!1,!1,"",1,!1,!1,0,0,2,0,!0,!1,y,0,z.h(0,"vertexShader"),!0,!1,1)
x=S.cg(0,null,205,100,204,1,!0,!0,!0,z.h(0,"fragmentShader"),!1,!1,!0,"",1,!1,!1,0,0,2,0,!0,!1,y,0,z.h(0,"vertexShader"),!0,!1,1)
this.z=x
this.r.r1=!0
this.x.r1=!0
this.y.r1=!0
x.r1=!0},
dd:function(a,b,c,d){var z=this.f
if(!(z.id&&z.k1))return
this.kL(0,a,b)},
kL:function(c5,c6,c7){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4
z=[]
J.bR(this.e,1,1,1,1)
J.bu(this.e,3042)
J.ag(this.e,2884)
J.bT(this.e,2305)
y=this.f.r1
x=this.e
if(y===2)J.bS(x,1028)
else J.bS(x,1029)
this.f.c2(!0)
w=c6.K.length
for(v=0,u=null,t=null;v<w;++v){y=c6.K
if(v>=y.length)return H.a(y,v)
s=y[v]
if(!s.gbu())continue
if(!!s.$isaN&&s.bh)for(u=0;u<s.gfT();++u){y=s.bR
if(u>=0)return H.a(y,u)
t=y[u]
if(!t){t=this.iT(s,u)
t.sk_(c7)
y=new Float32Array(3)
x=new Float32Array(3)
r=new Float32Array(4)
r[3]=1
q=new Float32Array(4)
q[3]=1
p=new Float32Array(3)
o=new Float32Array(3)
n=$.N
$.N=n+1
m=P.C()
l=new Float32Array(3)
l[0]=0
l[1]=1
l[2]=0
k=new Float32Array(3)
k[0]=0
k[1]=0
k[2]=0
j=new Float32Array(3)
j[0]=0
j[1]=0
j[2]=0
i=new Float32Array(3)
i[0]=1
i[1]=1
i[2]=1
h=new T.r(new Float32Array(16))
h.A()
g=new T.r(new Float32Array(16))
g.A()
f=new T.r(new Float32Array(16))
f.A()
e=new Float32Array(4)
e[3]=1
d=new S.jy(new T.e(y),new T.e(x),new T.aE(r),new T.aE(q),new T.e(p),new T.e(o),n,"",m,null,[],new T.e(l),new T.e(k),new T.e(j),new T.e(i),"XYZ",null,null,null,!0,null,h,g,f,!0,!0,new T.aE(e),!1,0,1,!0,!1,!1,!0,new T.e(new Float32Array(3)),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
d.r=s.bi
d.u(0,t)
d.u(0,t.aT)
c7.u(0,d)
s.bR[u]=t
c="Created virtualLight "+("Instance of '"+H.bk(t)+"'")
H.cz(c)}b=s.bR[u]
b.gI(b).d_(s.az)
y=b.gdi(b)
y.gI(y).d_(s.aT.r)
b.lf(b.gdi(b))
b.skU(s.U)
b.skV(s.ap)
b.skT(s.bv[u])
a=s.cf[u]
a0=s.cg[u]
a1=b.glm()
a1.h(0,0).sw(0,a)
a1.h(0,1).sw(0,a)
a1.h(0,2).sw(0,a)
a1.h(0,3).sw(0,a)
a1.h(0,4).sw(0,a0)
a1.h(0,5).sw(0,a0)
a1.h(0,6).sw(0,a0)
a1.h(0,7).sw(0,a0)
z.push(t)}else z.push(s)}w=z.length
for(y=this.a,v=0,a2=null,a3=null,a4=null,a5=null,a6=null,a7=null,a8=null,a9=null,b0=null,b1=null;v<w;++v){if(v>=z.length)return H.a(z,v)
s=z[v]
if(s.gdH()==null){b2=this.f.k4===2?3:6
x=new S.fB(s.ay,s.b2,null,null,!0,!0,!0,null,null,null,null,null,null,1,1,b2,b2,18,10,1,null,null,null,null,null,null,null,4,[],null,null)
x.cu(null,null,1,1,b2,b2,18,10,1)
if(x.k2==null)x.k2=new T.a4(new Float32Array(2))
if(x.k3==null){r=new Float32Array(2)
r[0]=1
r[1]=1
x.k3=new T.a4(r)}s.aS=x
x=s.ay
r=s.b2
q=new Float32Array(2)
q[0]=x
q[1]=r
s.bO=new T.a4(q)
x=new T.r(new Float32Array(16))
x.A()
s.at=x}if(s.as==null){if(!!s.$isaN){x=s.au
r=s.b5
q=s.b6
p=s.aU
o=s.K
n=s.a1
m=new Float32Array(16)
l=new Float32Array(16)
k=new T.r(new Float32Array(16))
k.A()
j=new T.r(new Float32Array(16))
j.A()
i=new T.r(new Float32Array(16))
i.A()
h=$.N
$.N=h+1
g=P.C()
f=new Float32Array(3)
f[0]=0
f[1]=1
f[2]=0
e=new Float32Array(3)
e[0]=0
e[1]=0
e[2]=0
b3=new Float32Array(3)
b3[0]=0
b3[1]=0
b3[2]=0
b4=new Float32Array(3)
b4[0]=1
b4[1]=1
b4[2]=1
b5=new T.r(new Float32Array(16))
b5.A()
b6=new T.r(new Float32Array(16))
b6.A()
b7=new T.r(new Float32Array(16))
b7.A()
b8=new Float32Array(4)
b8[3]=1
m=new S.kS(x,r,q,p,k,j,i,o,n,m,l,h,"",g,null,[],new T.e(f),new T.e(e),new T.e(b3),new T.e(b4),"XYZ",null,null,null,!0,null,b5,b6,b7,!0,!0,new T.aE(b8),!1,0,1,!0,!1,!1,!0,new T.e(new Float32Array(3)),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
T.oe(j,x,r,p,q,o,n)
s.as=m}else{H.cz("Unsupported light type for shadow")
continue}x=m
c6.u(0,x)
if(this.f.fr)c6.cn()}if(s.U&&s.b3==null){x=s.as
r=P.C()
q=S.jt()
p=$.p
$.p=p+1
o=new S.aC(1,1,1)
b9=C.c.a2(C.b.a2(Math.floor(16777215)))
o.a=((b9&16711680)>>>16)/255
o.b=((b9&65280)>>>8)/255
o.c=(b9&255)/255
p=new S.c5(1,"round","round","",p,0,o,1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,1,null,null,null,null,null,!1)
o=$.N
$.N=o+1
n=P.C()
m=new Float32Array(3)
m[0]=0
m[1]=1
m[2]=0
l=new Float32Array(3)
l[0]=0
l[1]=0
l[2]=0
k=new Float32Array(3)
k[0]=0
k[1]=0
k[2]=0
j=new Float32Array(3)
j[0]=1
j[1]=1
j[2]=1
i=new T.r(new Float32Array(16))
i.A()
h=new T.r(new Float32Array(16))
h.A()
g=new T.r(new Float32Array(16))
g.A()
f=new Float32Array(4)
f[3]=1
x=new S.iu(x,null,!1,r,p,1,o,"",n,null,[],new T.e(m),new T.e(l),new T.e(k),new T.e(j),"XYZ",null,null,null,!0,null,i,h,g,!0,!0,new T.aE(f),!1,0,1,!0,!1,!1,!0,new T.e(new Float32Array(3)),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
x.h7(q,p,1)
x.K=x.Z.dy
x.C("n1",16755200)
x.C("n2",16755200)
x.C("n2",16755200)
x.C("n4",16755200)
x.C("n4",16755200)
x.C("n3",16755200)
x.C("n3",16755200)
x.C("n1",16755200)
x.C("f1",16755200)
x.C("f2",16755200)
x.C("f2",16755200)
x.C("f4",16755200)
x.C("f4",16755200)
x.C("f3",16755200)
x.C("f3",16755200)
x.C("f1",16755200)
x.C("n1",16755200)
x.C("f1",16755200)
x.C("n2",16755200)
x.C("f2",16755200)
x.C("n3",16755200)
x.C("f3",16755200)
x.C("n4",16755200)
x.C("f4",16755200)
x.C("p",16711680)
x.C("n1",16711680)
x.C("p",16711680)
x.C("n2",16711680)
x.C("p",16711680)
x.C("n3",16711680)
x.C("p",16711680)
x.C("n4",16711680)
x.C("u1",43775)
x.C("u2",43775)
x.C("u2",43775)
x.C("u3",43775)
x.C("u3",43775)
x.C("u1",43775)
x.C("c",16777215)
x.C("t",16777215)
x.C("p",3355443)
x.C("c",3355443)
x.C("cn1",3355443)
x.C("cn2",3355443)
x.C("cn3",3355443)
x.C("cn4",3355443)
x.C("cf1",3355443)
x.C("cf2",3355443)
x.C("cf3",3355443)
x.C("cf4",3355443)
x.fd(0)
s.b3=x
s.as.u(0,x)}if(!!s.$isfz)t.gk_()
a4=s.aS
a5=s.at
a6=s.as
a6.r=s.dy.aZ()
x=s.gdi(s).dy.aZ()
r=a6.dx
S.oa(r,a6.r,x,a6.f)
if(a6.cy)a6.x=S.nG(r,a6.z)
a6.cn()
x=a6.L
x.d0(a6.dy)
r=s.b3
if(r!=null)r.k3=s.U
if(s.U)r.fd(0)
a5.dF(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1)
a5.bk(0,a6.N)
a5.bk(0,x)
r=a6.N.a3(0,x)
this.b=r
y.dv(r)
this.f.dB(a4)
this.f.b1(0)
b1=c6.U
a3=b1.length
for(a2=0;a2<a3;++a2){if(a2>=b1.length)return H.a(b1,a2)
a9=b1[a2]
b0=a9.b
a9.e=!1
if(b0.k3&&b0.gbu()){if(!!b0.$isau)r=!b0.r2||y.cb(0,b0)
else r=!0
if(r){b0.J=x.a3(0,b0.gaA())
a9.e=!0}}}a3=b1.length
for(a2=0,c0=null,c1=null,c2=null;a2<a3;++a2){if(a2>=b1.length)return H.a(b1,a2)
a9=b1[a2]
if(a9.e){b0=a9.b
a7=a9.a
b0.gaW()
c0=b0.gaW()
b0.x1.y
a8=this.r
this.f.f1(a6,c6.K,null,a8,a7,b0)
c1=!1
c2=!1}}b1=c6.an
a3=b1.length
for(a2=0;a2<a3;++a2){if(a2>=b1.length)return H.a(b1,a2)
a9=b1[a2]
b0=a9.b
if(b0.k3&&b0.gbu()){b0.J.bk(0,x)
this.f.f2(a6,c6.K,null,this.r,b0)}}}y=this.f
c3=y.d
c4=y.e
J.bR(this.e,c3.a,c3.b,c3.c,c4)
J.ag(this.e,3042)
if(this.f.r1===2)J.bS(this.e,1029)},
iT:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=new S.aC(1,1,1)
y=C.c.a2(C.b.a2(Math.floor(0)))
z.a=((y&16711680)>>>16)/255
z.b=((y&65280)>>>8)/255
z.c=(y&255)/255
x=$.N
$.N=x+1
w=P.C()
v=new Float32Array(3)
v[0]=0
v[1]=1
v[2]=0
u=new Float32Array(3)
u[0]=0
u[1]=0
u[2]=0
t=new Float32Array(3)
t[0]=0
t[1]=0
t[2]=0
s=new Float32Array(3)
s[0]=1
s[1]=1
s[2]=1
r=new T.r(new Float32Array(16))
r.A()
q=new T.r(new Float32Array(16))
q.A()
p=new T.r(new Float32Array(16))
p.A()
o=new Float32Array(4)
o[3]=1
n=new S.fz([],[],null,null,1,0,null,null,null,null,null,null,null,null,null,null,null,null,null,!1,!1,50,5000,50,!1,0,0.5,512,512,null,null,null,null,null,z,x,"",w,null,[],new T.e(v),new T.e(u),new T.e(t),new T.e(s),"XYZ",null,null,null,!0,null,r,q,p,!0,!0,new T.aE(o),!1,0,1,!0,!1,!1,!0,new T.e(new Float32Array(3)),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
n.dK(0,1,0)
n.Z=!0
n.N=!0
n.K=a.K
n.a1=a.a1
n.au=a.au
n.b5=a.b5
n.aU=a.aU
n.b6=a.b6
n.U=a.U
n.ap=a.ap
z=a.bv
if(b>=3)return H.a(z,b)
n.an=z[b]
n.ay=a.bQ[b]
n.b2=a.d3[b]
z=[]
n.jc=z
x=[]
n.jd=x
for(m=0;m<8;++m){w=new Float32Array(3)
if(m>=0)return H.a(z,m)
z[m]=new T.e(w)
x[m]=new T.e(new Float32Array(3))}l=a.cf[b]
k=a.cg[b]
if(0>=0)return H.a(x,0)
x[0].ba(-1,-1,l)
return H.a(x,1)
x[1].ba(1,-1,l)
return H.a(x,2)
x[2].ba(-1,1,l)
return H.a(x,3)
x[3].ba(1,1,l)
return H.a(x,4)
x[4].ba(-1,-1,k)
return H.a(x,5)
x[5].ba(1,-1,k)
return H.a(x,6)
x[6].ba(-1,1,k)
return H.a(x,7)
x[7].ba(1,1,k)
return n},
static:{lv:function(){var z,y
z=S.cZ()
y=new T.r(new Float32Array(H.b(16)))
y.A()
return new S.lu(z,y,new T.e(new Float32Array(H.b(3))),new T.e(new Float32Array(H.b(3))),null,null,null,null,null,null)}}},
fz:{
"^":"aN;jc,jd,az,aT,ce,b4,au,b5,b6,aU,bh,bi,bP,bv,bQ,d3,cf,cg,bR,N,Z,K,a1,ad,U,an,ap,ay,b2,aS,bO,as,at,b3,L,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a_,J,W,S,P,R,a8,T,a4,a9,ab,ac,a0,al,am,aj,Y"},
by:{
"^":"aR;L,N,Z,K,a1,ad,U,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a_,J,W,S,P,R,a8,T,a4,a9,ab,ac,a0,al,am,aj,Y",
static:{it:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=new Float32Array(H.b(16))
y=new Float32Array(H.b(16))
x=new T.r(new Float32Array(H.b(16)))
x.A()
w=new T.r(new Float32Array(H.b(16)))
w.A()
v=new T.r(new Float32Array(H.b(16)))
v.A()
u=$.N
$.N=u+1
t=P.C()
s=new T.e(new Float32Array(H.b(3)))
s.l(0,1,0)
r=new T.e(new Float32Array(H.b(3)))
r.l(0,0,0)
q=new T.e(new Float32Array(H.b(3)))
q.l(0,0,0)
p=new T.e(new Float32Array(H.b(3)))
p.l(1,1,1)
o=new T.r(new Float32Array(H.b(16)))
o.A()
n=new T.r(new Float32Array(H.b(16)))
n.A()
m=new T.r(new Float32Array(H.b(16)))
m.A()
return new S.by(x,w,v,a,b,z,y,u,"",t,null,[],s,r,q,p,"XYZ",null,null,null,!0,null,o,n,m,!0,!0,T.aF(),!1,0,1,!0,!1,!1,!0,new T.e(new Float32Array(H.b(3))),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)}}},
kS:{
"^":"by;an,ap,ay,b2,L,N,Z,K,a1,ad,U,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a_,J,W,S,P,R,a8,T,a4,a9,ab,ac,a0,al,am,aj,Y"},
l1:{
"^":"by;an,ap,ay,b2,aS,bO,as,at,L,N,Z,K,a1,ad,U,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a_,J,W,S,P,R,a8,T,a4,a9,ab,ac,a0,al,am,aj,Y",
ff:function(){var z,y,x,w,v
z=this.ap
y=this.K
x=Math.tan(H.u(this.an*0.017453292519943295*0.5))*y
w=x*z
v=new T.r(new Float32Array(H.b(16)))
T.od(v,-w,w,-x,x,y,this.a1)
this.N=v}},
aC:{
"^":"i;a,b,c",
gag:function(a){return this.a},
gak:function(){return this.b},
gav:function(a){return this.c},
d_:function(a){this.a=a.a
this.b=a.b
this.c=a.c
return this},
iL:function(a){var z=a.a
this.a=z*z
z=a.b
this.b=z*z
z=a.c
this.c=z*z
return this},
af:function(a){var z,y,x,w
z=S.w(null)
y=this.a
x=this.b
w=this.c
z.a=y
z.b=x
z.c=w
return z},
h4:function(a){var z
if(typeof a==="number"){z=C.c.a2(C.b.a2(Math.floor(a)))
this.a=((z&16711680)>>>16)/255
this.b=((z&65280)>>>8)/255
this.c=(z&255)/255}},
static:{w:function(a){var z=new S.aC(1,1,1)
z.h4(a)
return z}}},
eC:{
"^":"i;D:a>,b,bL:c>"},
j5:{
"^":"i;",
eq:function(a,b,c){var z,y
z=this.a
if(z.h(0,b)==null)z.k(0,b,[])
y=z.h(0,b)
if((y&&C.a).b7(y,c)===-1)z.h(0,b).push(c)},
eE:function(a,b){var z,y
z=this.a
y=b.a
if(z.h(0,y)!=null){z=z.h(0,y);(z&&C.a).G(z,new S.j6(b))}}},
j6:{
"^":"k:0;a",
$1:function(a){return a.$1(this.a)}},
cX:{
"^":"i;jw:a<,jW:b<,be:f>,iu:x<",
gae:function(a){return 4},
B:function(a){this.b.B(a.gjW())
this.f.d_(a.f)
this.x.B(a.x)
this.r=a.r
this.c=H.o(new H.b5(a.c,new S.j8()),[null,null]).aq(0)
this.d=H.o(new H.b5(a.d,new S.j9()),[null,null]).aq(0)
this.e=H.o(new H.b5(a.e,new S.ja()),[null,null]).aq(0)
return this},
cs:function(a,b,c,d){this.b=new T.e(new Float32Array(H.b(3)))
this.c=[]
this.f=S.w(null)
this.d=[]
this.e=[]
this.x=new T.e(new Float32Array(H.b(3)))}},
j8:{
"^":"k:4;",
$1:function(a){return J.bd(a)}},
j9:{
"^":"k:4;",
$1:function(a){return J.bd(a)}},
ja:{
"^":"k:4;",
$1:function(a){return J.bd(a)}},
cY:{
"^":"cX;a,b,c,d,e,f,r,x",
af:function(a){var z,y
z=this.a
z=[z[0],z[1],z[2],z[3]]
y=new S.cY(z,null,null,null,null,null,null,null)
y.cs(z,null,null,null)
return y.B(this)}},
jh:{
"^":"i;a",
dv:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=a.h(0,0)
y=a.h(0,1)
x=a.h(0,2)
w=a.h(0,3)
v=a.h(0,4)
u=a.h(0,5)
t=a.h(0,6)
s=a.h(0,7)
r=a.h(0,8)
q=a.h(0,9)
p=a.h(0,10)
o=a.h(0,11)
n=a.h(0,12)
m=a.h(0,13)
l=a.h(0,14)
k=a.h(0,15)
j=this.a
j[0].a7(w-z,s-v,o-r,k-n)
j[1].a7(w+z,s+v,o+r,k+n)
j[2].a7(w+y,s+u,o+q,k+m)
j[3].a7(w-y,s-u,o-q,k-m)
j[4].a7(w-x,s-t,o-p,k-l)
j[5].a7(w+x,s+t,o+p,k+l)
for(i=0;i<6;++i){h=j[i]
g=h.a
f=g[0]
e=g[1]
g=g[2]
d=Math.sqrt(f*f+e*e+g*g)
if(d>0)h.bD(0,1/d)}},
cb:function(a,b){var z,y,x,w
z=b.gaA()
y=-b.x1.dy.a*Math.sqrt(H.u(P.af(z.h(0,0)*z.h(0,0)+z.h(0,1)*z.h(0,1)+z.h(0,2)*z.h(0,2),P.af(z.h(0,4)*z.h(0,4)+z.h(0,5)*z.h(0,5)+z.h(0,6)*z.h(0,6),z.h(0,8)*z.h(0,8)+z.h(0,9)*z.h(0,9)+z.h(0,10)*z.h(0,10)))))
for(x=this.a,w=0;w<6;++w)if(x[w].a[0]*z.h(0,12)+x[w].a[1]*z.h(0,13)+x[w].a[2]*z.h(0,14)+x[w].a[3]<=y)return!1
return!0},
static:{cZ:function(){var z,y,x,w,v,u
z=new T.R(new Float32Array(H.b(4)))
z.a7(0,0,0,1)
y=new T.R(new Float32Array(H.b(4)))
y.a7(0,0,0,1)
x=new T.R(new Float32Array(H.b(4)))
x.a7(0,0,0,1)
w=new T.R(new Float32Array(H.b(4)))
w.a7(0,0,0,1)
v=new T.R(new Float32Array(H.b(4)))
v.a7(0,0,0,1)
u=new T.R(new Float32Array(H.b(4)))
u.a7(0,0,0,1)
return new S.jh([z,y,x,w,v,u])}}},
c1:{
"^":"kR;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,a$,b$,c$,d$,e$,f$,r$,x$,y$,z$,Q$,ch$,cx$,cy$,db$,dx$,dy$,fr$,fx$,fy$,go$,id$,k1$,k2$,k3$,k4$,r1$,r2$,rx$,ry$,x1$,x2$,y1$,y2$,a_$,J$,W$,S$,P$,R$,a8$,T$,a4$,a9$,ab$,ac$,a0$",
eC:function(){C.a.G(this.f,new S.jw(this))},
eB:function(){var z={}
z.a=null
this.dy=new S.is(Math.sqrt(H.u(C.a.jf(this.b,0,new S.ju(z)))),null)},
jQ:function(){var z,y,x,w,v,u,t,s,r,q,p
z=P.C()
y=[]
x=[]
H.u(10)
H.u(4)
w=Math.pow(10,4)
v=this.b.length
for(u=0;u<v;++u){t=this.b
if(u>=t.length)return H.a(t,u)
s=t[u]
t=J.f(s)
r=t.gm(s)
if(typeof r!=="number")return r.a3()
r=C.c.bY(C.b.dg(r*w),0)
q=t.gn(s)
if(typeof q!=="number")return q.a3()
q=C.c.bY(C.b.dg(q*w),0)
t=t.gw(s)
if(typeof t!=="number")return t.a3()
p=C.a.v([r,q,C.c.bY(C.b.dg(t*w),0)],"_")
if(z.h(0,p)==null){z.k(0,p,u)
y.push(s)
x.push(y.length-1)}else{t=z.h(0,p)
if(t>>>0!==t||t>=x.length)return H.a(x,t)
x.push(x[t])}}C.a.G(this.f,new S.jx(x))
t=this.b.length
r=y.length
this.b=y
return t-r},
af:function(a){},
gaH:function(){var z=this.x1
if(z==null){z=P.C()
this.x1=z}return z},
h:function(a,b){return this.gaH().h(0,b)},
k:function(a,b,c){this.gaH().k(0,b,c)
return c},
ct:function(){var z=$.eM
$.eM=z+1
this.sX(0,z)},
static:{jt:function(){var z=new S.c1("",H.o([],[T.e]),[],[],[],[],[[]],[[]],[],[],[],[],[],[],null,null,null,!1,!1,null,null,!1,!1,!1,!1,!1,!1,!1,!1,!1,null,null,null,null,null,null,null,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.ct()
return z}}},
kR:{
"^":"i+dx;X:a$*,eF:c$<,ar:x$@,bC:y$@,ax:z$@,bG:Q$?,dP:ch$?,bF:cx$@,cD:cy$@,dN:go$<,dO:id$<,cE:k1$<,cC:k3$@,dM:k4$<,cz:r1$@,cv:ry$@,cw:x1$@,cB:T$<,c5:a4$@,cA:a0$<"},
jw:{
"^":"k:11;a",
$1:function(a){var z,y,x,w
a.giu().l(0,0,0)
C.a.G(a.a,new S.jv(this.a,a))
z=a.x.a
y=z[0]
x=z[1]
z=z[2]
w=new T.e(new Float32Array(H.b(3)))
w.l(y*0.25,x*0.25,z*0.25)
a.x=w}},
jv:{
"^":"k:0;a,b",
$1:function(a){var z,y
z=this.b.x
y=this.a.b
if(a>>>0!==a||a>=y.length)return H.a(y,a)
z.u(0,y[a])}},
ju:{
"^":"k:25;a",
$2:function(a,b){var z,y
z=b.gbU()
this.a.a=z
if(typeof a!=="number")return H.n(a)
if(z>a)y=z
else y=a
return y}},
jx:{
"^":"k:11;a",
$1:function(a){var z,y,x,w,v
z=J.f(a)
y=this.a
x=0
while(!0){w=z.gae(a)
if(typeof w!=="number")return H.n(w)
if(!(x<w))break
w=a.gjw()
v=a.a
if(x>=4)return H.a(v,x)
v=v[x]
if(v<0||v>=y.length)return H.a(y,v)
w[x]=y[v];++x}}},
is:{
"^":"i;a,b"},
aR:{
"^":"i;X:a*,b,c,eX:d*,bK:e>,f,I:r>,x,y,z,Q,ch,cx,cy,db,dx,aA:dy@,fr,eS:fx<,fy,go,id,k1,k2,dl:k3>,bu:k4<,r1,r2,rx,ry,x1,aW:x2<,y1,y2,a_,J,W,S,P,R,a8,T,a4,a9,ab,ac,ax:a0@,bG:al?,am,aj,Y",
dj:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.dx.a
y=z[0]
x=c.a
w=x[0]
v=z[4]
u=x[1]
t=z[8]
s=x[2]
r=z[1]
q=z[5]
p=z[9]
o=z[2]
n=z[6]
z=z[10]
x[0]=y*w+v*u+t*s
x[1]=r*w+q*u+p*s
x[2]=o*w+n*u+z*s
c.by(0)
this.gI(this).u(0,c.bD(0,b))},
u:function(a,b){var z,y
if(b===this){P.a5("THREE.Object3D.add: An object can't be added as a child of itself.")
return}if(J.hD(b)!=null)b.d.b9(0,b)
b.d=this
this.e.push(b)
for(z=this;y=z.d,y!=null;z=y);if(!!z.$isdi)z.er(b)},
b9:function(a,b){var z,y,x,w
z=this.e
y=C.a.b7(z,b)
if(y!==-1){J.hX(b,null)
C.a.aX(z,y)
for(x=this;w=x.d,w!=null;x=w);if(!!x.$isdi)x.f0(b)}},
fe:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
z=this.dx
if(this.id)S.ha(z,this.go)
else{y=this.x.a
x=y[0]
w=y[1]
v=y[2]
u=Math.cos(H.u(x))
t=Math.sin(H.u(x))
s=Math.cos(H.u(w))
r=Math.sin(H.u(w))
q=Math.cos(H.u(v))
p=Math.sin(H.u(v))
y=u*q
o=z.a
n=u*s
m=s*q
switch(this.z){case"YXZ":l=s*p
k=r*q
j=r*p
o[0]=m+j*t
o[4]=k*t-l
o[8]=u*r
o[1]=u*p
o[5]=y
o[9]=-t
o[2]=l*t-k
o[6]=j+m*t
o[10]=n
break
case"ZXY":l=s*p
k=r*q
j=r*p
o[0]=m-j*t
i=-u
o[4]=i*p
o[8]=k+l*t
o[1]=l+k*t
o[5]=y
o[9]=j-m*t
o[2]=i*r
o[6]=t
o[10]=n
break
case"ZYX":h=u*p
g=t*q
f=t*p
o[0]=m
o[4]=g*r-h
o[8]=y*r+f
o[1]=s*p
o[5]=f*r+y
o[9]=h*r-g
o[2]=-r
o[6]=t*s
o[10]=n
break
case"YZX":e=u*r
d=t*s
c=t*r
o[0]=m
o[4]=c-n*p
o[8]=d*p+e
o[1]=p
o[5]=y
o[9]=-t*q
o[2]=-r*q
o[6]=e*p+d
o[10]=n-c*p
break
case"XZY":e=u*r
d=t*s
c=t*r
o[0]=m
o[4]=-p
o[8]=r*q
o[1]=n*p+c
o[5]=y
o[9]=e*p-d
o[2]=d*p-e
o[6]=t*q
o[10]=c*p+n
break
default:h=u*p
g=t*q
f=t*p
o[0]=m
o[4]=-s*p
o[8]=r
o[1]=h+g*r
o[5]=y-f*r
o[9]=-t*s
o[2]=f-y*r
o[6]=g+h*r
o[10]=n
break}}y=this.gI(this).a
v=y[2]
w=y[1]
x=y[0]
z=z.a
z[14]=v
z[13]=w
z[12]=x
y=this.y.a
b=y[0]
if(b!==1||y[1]!==1||y[2]!==1){a=y[1]
a0=y[2]
z[0]=z[0]*b
z[1]=z[1]*b
z[2]=z[2]*b
z[3]=z[3]*b
z[4]=z[4]*a
z[5]=z[5]*a
z[6]=z[6]*a
z[7]=z[7]*a
z[8]=z[8]*a0
z[9]=z[9]*a0
z[10]=z[10]*a0
z[11]=z[11]*a0
z[12]=z[12]
z[13]=z[13]
z[14]=z[14]
z[15]=z[15]
this.k2=P.af(y[0],P.af(y[1],y[2]))}this.fy=!0},
dk:function(a){var z,y,x
z={}
z.a=a
if(this.geS())this.fe()
if(this.fy||a){y=this.d
x=this.dx
if(y!=null)this.saA(y.gaA().a3(0,x))
else{y=new T.r(new Float32Array(H.b(16)))
y.B(x)
this.saA(y)}this.fy=!1
z.a=!0}C.a.G(this.e,new S.kP(z))},
cn:function(){return this.dk(!1)},
af:function(a){},
static:{ca:function(){var z,y,x,w,v,u,t,s,r
z=$.N
$.N=z+1
y=P.C()
x=new T.e(new Float32Array(H.b(3)))
x.l(0,1,0)
w=new T.e(new Float32Array(H.b(3)))
w.l(0,0,0)
v=new T.e(new Float32Array(H.b(3)))
v.l(0,0,0)
u=new T.e(new Float32Array(H.b(3)))
u.l(1,1,1)
t=new T.r(new Float32Array(H.b(16)))
t.A()
s=new T.r(new Float32Array(H.b(16)))
s.A()
r=new T.r(new Float32Array(H.b(16)))
r.A()
return new S.aR(z,"",y,null,[],x,w,v,u,"XYZ",null,null,null,!0,null,t,s,r,!0,!0,T.aF(),!1,0,1,!0,!1,!1,!0,new T.e(new Float32Array(H.b(3))),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)}}},
kP:{
"^":"k:0;a",
$1:function(a){return a.dk(this.a.a)}},
la:{
"^":"i;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2",
kK:function(a,b){var z=b.Z
z.d0(b.N)
z=b.dy.a3(0,z)
this.id=z
return a.bs(z)},
static:{lb:function(){var z,y,x,w,v,u,t
z=new Float32Array(H.b(3))
y=new T.R(new Float32Array(H.b(4)))
y.a7(0,0,0,1)
x=new T.r(new Float32Array(H.b(16)))
x.A()
w=new T.r(new Float32Array(H.b(16)))
w.A()
v=S.cZ()
u=new T.R(new Float32Array(H.b(4)))
u.a7(0,0,0,1)
t=new T.R(new Float32Array(H.b(4)))
t.a7(0,0,0,1)
return new S.la([],[],[],[],[],[],null,null,null,null,null,null,null,null,null,null,new T.e(z),y,u,t,new S.lc([],[],[],[]),x,w,v)}}},
lc:{
"^":"i;a,b,c,d"},
dh:{
"^":"i;a,b,c,d,e",
hx:function(a,b,c){var z,y
z=c.aa(0,a).aJ(b)
y=new T.e(new Float32Array(H.b(3)))
y.B(b)
y=c.aa(0,a.p(0,y.bD(0,z)))
return y.gj(y)},
ec:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p
z=J.bP(d,b)
y=J.bP(c,b)
x=a.aa(0,b)
w=z.aJ(z)
v=z.aJ(y)
u=z.aJ(x)
t=y.aJ(y)
s=y.aJ(x)
r=1/(w*t-v*v)
q=(t*u-v*s)*r
p=(w*s-v*u)*r
return q>=0&&p>=0&&q+p<1},
jH:function(a2,a3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
z={}
y=P.kI(4,new S.lg(),!0,null)
x=new T.e(new Float32Array(H.b(3)))
w=new T.e(new Float32Array(H.b(3)))
v=new T.e(new Float32Array(H.b(3)))
u=new T.e(new Float32Array(H.b(3)))
t=new T.e(new Float32Array(H.b(3)))
s=[]
r=J.f(a2)
J.ao(r.gbK(a2))
if(a3)J.bw(r.gbK(a2),new S.lh(this,s))
if(!!r.$isau){q=this.hx(this.a,this.b,a2.dy.aZ())
r=$.eL
if(r==null){r=new T.e(new Float32Array(H.b(3)))
$.eL=r}p=a2.dy.co(0)
p=p.gj(p)
o=a2.dy.co(1)
o=o.gj(o)
n=a2.dy.co(2)
r=r.l(p,o,n.gj(n)).a
if(q>a2.x1.dy.a*P.af(r[0],P.af(r[1],r[2])))return s
m=a2.x1
l=m.b
z.a=null
m.e
k=a2.L.c
r=a2.fr
p=a2.dy
j=new T.e(new Float32Array(H.b(3)))
o=j.l(p.h(0,0),p.h(0,1),p.h(0,2))
i=1/o.gj(o)
o=j.l(p.h(0,4),p.h(0,5),p.h(0,6))
h=1/o.gj(o)
o=j.l(p.h(0,8),p.h(0,9),p.h(0,10))
g=1/o.gj(o)
o=r.a
o[0]=p.h(0,0)*i
o[1]=p.h(0,1)*i
o[2]=p.h(0,2)*i
o[4]=p.h(0,4)*h
o[5]=p.h(0,5)*h
o[6]=p.h(0,6)*h
o[8]=p.h(0,8)*g
o[9]=p.h(0,9)*g
o[10]=p.h(0,10)*g
f=m.f.length
for(e=null,d=null,c=null,b=0;b<f;++b){p=m.f
if(b>=p.length)return H.a(p,b)
a=p[b]
a0=a2.L
if(a0==null)continue
k=a0.c
x.B(this.a)
w.B(this.b)
z.a=a2.dy
v.B(a.x)
v.bs(z.a).dI(x)
u.B(a.b)
u.bs(r)
d=w.aJ(u)
if(Math.abs(d)<0.0001)continue
c=u.aJ(v)/d
if(c<0)continue
if(k!==2)p=k===0?d<0:d>0
else p=!0
if(p){t=x.p(0,w.bD(0,c))
p=new H.b5(a.a,new S.li(z,l))
p.$builtinTypeInfo=[null,null]
y=p.aq(0)
p=y.length
if(0>=p)return H.a(y,0)
o=y[0]
if(1>=p)return H.a(y,1)
n=y[1]
if(3>=p)return H.a(y,3)
if(!this.ec(t,o,n,y[3])){p=y.length
if(1>=p)return H.a(y,1)
o=y[1]
if(2>=p)return H.a(y,2)
n=y[2]
if(3>=p)return H.a(y,3)
a1=this.ec(t,o,n,y[3])}else a1=!0
if(a1){p=x.aa(0,t)
p=p.gj(p)
o=new T.e(new Float32Array(3))
o.B(t)
e=new S.ko(p,o,a,a2)
s.push(e)}}}}return s},
eL:function(a){return this.jH(a,!1)},
d4:function(a){var z=[]
C.a.G(a,new S.lj(this,z))
C.a.c4(z,new S.lk())
return z},
hg:function(a,b,c,d){},
static:{lf:function(a,b,c,d){var z=new S.dh(a,b,c,d,0.0001)
z.hg(a,b,c,d)
return z}}},
lg:{
"^":"k:0;",
$1:function(a){return new T.e(new Float32Array(H.b(3)))}},
lh:{
"^":"k:0;a,b",
$1:function(a){C.a.bd(this.b,this.a.eL(a))}},
li:{
"^":"k:0;a,b",
$1:function(a){var z=this.b
if(a>>>0!==a||a>=z.length)return H.a(z,a)
return J.bd(z[a]).bs(this.a.a)}},
lj:{
"^":"k:0;a,b",
$1:function(a){return C.a.bd(this.b,this.a.eL(a))}},
lk:{
"^":"k:3;",
$2:function(a,b){return C.b.iC(a.gbg(),b.gbg())}},
ko:{
"^":"i;bg:a<,aC:b<,c,eV:d<"},
aG:{
"^":"i;cm:a<,b",
af:function(a){return new S.aG(this.a,this.b)}},
nH:{
"^":"k:0;",
$1:function(a){return P.dR(P.af(a,-1),1)}},
em:{
"^":"bG;L,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a_,J,W,S,P,R,a8,T,a4,a9,ab,ac,a0,al,am,aj,Y"},
aN:{
"^":"lt;I:az>,di:aT>,eK:ce<,bg:b4<,au,b5,b6,aU,bh,bi,fT:bP<,bv,bQ,d3,cf,cg,bR,N,Z,K,a1,ad,U,an,ap,ay,b2,aS,bO,as,at,b3,L,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a_,J,W,S,P,R,a8,T,a4,a9,ab,ac,a0,al,am,aj,Y",
dK:function(a,b,c){var z=new T.e(new Float32Array(H.b(3)))
z.l(0,1,0)
this.az=z
this.aT=S.ca()
this.au=-500
this.b5=500
this.b6=500
this.aU=-500
this.bh=!1
z=new T.e(new Float32Array(H.b(3)))
z.l(0,0,-1000)
this.bi=z
this.bP=2
this.bv=[0,0,0]
this.bQ=[512,512,512]
this.d3=[512,512,512]
this.cf=[-1,0.99,0.998]
this.cg=[0.99,0.998,1]
this.bR=[]},
static:{iP:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
z=S.w(a)
y=$.N
$.N=y+1
x=P.C()
w=new T.e(new Float32Array(H.b(3)))
w.l(0,1,0)
v=new T.e(new Float32Array(H.b(3)))
v.l(0,0,0)
u=new T.e(new Float32Array(H.b(3)))
u.l(0,0,0)
t=new T.e(new Float32Array(H.b(3)))
t.l(1,1,1)
s=new T.r(new Float32Array(H.b(16)))
s.A()
r=new T.r(new Float32Array(H.b(16)))
r.A()
q=new T.r(new Float32Array(H.b(16)))
q.A()
q=new S.aN(null,null,b,c,null,null,null,null,null,null,null,null,null,null,null,null,null,!1,!1,50,5000,50,!1,0,0.5,512,512,null,null,null,null,null,z,y,"",x,null,[],w,v,u,t,"XYZ",null,null,null,!0,null,s,r,q,!0,!0,T.aF(),!1,0,1,!0,!1,!1,!0,new T.e(new Float32Array(H.b(3))),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
q.dK(a,b,c)
return q}}},
bG:{
"^":"aR;be:L>"},
cb:{
"^":"bG;N,eK:Z<,bg:K<,L,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a_,J,W,S,P,R,a8,T,a4,a9,ab,ac,a0,al,am,aj,Y"},
lt:{
"^":"bG;bu:N<,eW:Z<,dH:aS<"},
jB:{
"^":"j5;b,a",
jO:function(a,b,c){var z,y
z={}
z.a=c
if(c==null){c=W.eP(null,null,null)
z.a=c
y=c}else y=c
y=J.hB(y)
H.o(new W.aH(0,y.a,y.b,W.aw(new S.jC(z,this)),y.c),[H.V(y,0)]).aI()
y=J.hA(z.a)
H.o(new W.aH(0,y.a,y.b,W.aw(new S.jD(this,b)),y.c),[H.V(y,0)]).aI()
y=this.b
if(y!=null)J.hT(z.a,y)
J.hY(z.a,b)}},
jC:{
"^":"k:0;a,b",
$1:function(a){this.b.eE(0,new S.eC("load",null,this.a.a))}},
jD:{
"^":"k:0;a,b",
$1:function(a){this.a.eE(0,new S.eC("error","Couldn't load URL ["+this.b+"]",null))}},
c5:{
"^":"d5;r2,rx,ry,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1"},
lU:{
"^":"i;"},
d5:{
"^":"i;X:b*,be:d>,dl:fr>,cj:fx<"},
z:{
"^":"d5;r2,rx,ry,x1,x2,y1,y2,fS:a_<,dn:J<,fh:W<,S,P,c3:R<,bV:a8<,ci:T<,bm:a4@,bW:a9@,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1",
b8:function(a,b){return this.r2.$1(b)},
$isdy:1,
$isaD:1,
$isch:1,
$isbX:1,
$iscj:1},
cf:{
"^":"d5;r2,dn:rx<,fh:ry<,x1,x2,y1,c3:y2<,bV:a_<,ci:J<,bm:W@,bW:S@,P,R,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1",
hh:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,a0,a1,a2){this.k3=x
this.k1=j
this.k2=z},
$isdy:1,
$isch:1,
$isaD:1,
static:{cg:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,a0,a1,a2,a3,a4){var z,y
z=P.C()
y=$.p
$.p=y+1
y=new S.cf(t,a3,a4,null,null,k,v,m,l,0,0,b,z,n,y,u,S.w(null),o,f,e,c,d,a,q,r,s,w,g,h,p,a2,!0,i,a0,null,null,null,null,null,!1)
y.hh(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,a0,a1,a2,a3,a4)
return y}}},
bh:{
"^":"aR;aW:L<,D:N>",
h7:function(a,b,c){if(a.dy==null)a.eB()
this.x1=a}},
au:{
"^":"aR;aW:L<,jR:N<,Z,K,a1,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a_,J,W,S,P,R,a8,T,a4,a9,ab,ac,a0,al,am,aj,Y",
h9:function(a,b){var z,y
if(this.L==null){z=C.t.jU(16777215)
y=$.p
$.p=y+1
this.L=new S.z(null,null,null,null,0,1,0.98,2,!0,1,"round","round",!1,!1,!1,0,0,"",y,0,S.w(z),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1)}if(a.dy==null)a.eB()
this.k1=a.dy.a
this.x1=a},
static:{ad:function(a,b){var z,y,x,w,v,u,t,s,r
z=$.N
$.N=z+1
y=P.C()
x=new T.e(new Float32Array(H.b(3)))
x.l(0,1,0)
w=new T.e(new Float32Array(H.b(3)))
w.l(0,0,0)
v=new T.e(new Float32Array(H.b(3)))
v.l(0,0,0)
u=new T.e(new Float32Array(H.b(3)))
u.l(1,1,1)
t=new T.r(new Float32Array(H.b(16)))
t.A()
s=new T.r(new Float32Array(H.b(16)))
s.A()
r=new T.r(new Float32Array(H.b(16)))
r.A()
r=new S.au(b,0,null,null,null,z,"",y,null,[],x,w,v,u,"XYZ",null,null,null,!0,null,t,s,r,!0,!0,T.aF(),!1,0,1,!0,!1,!1,!0,new T.e(new Float32Array(H.b(3))),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
r.h9(a,b)
return r}}},
fB:{
"^":"dq;id,k1,d6:k2*,de:k3*,k4,r1,c0:r2@,rx,ry,x1,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
af:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.id
y=this.k1
x=this.d
w=this.e
v=this.f
u=this.z
t=this.r
s=this.k2
s.toString
r=new T.a4(new Float32Array(H.b(2)))
r.B(s)
s=this.k3
s.toString
q=new T.a4(new Float32Array(H.b(2)))
q.B(s)
s=this.x
p=this.y
q=new S.fB(z,y,r,q,this.k4,this.r1,this.r2,this.rx,null,null,null,null,null,x,w,v,t,s,p,u,null,null,null,null,null,null,null,4,[],null,null)
q.cu(null,null,x,w,v,t,s,p,u)
if(q.k2==null)q.k2=new T.a4(new Float32Array(H.b(2)))
if(q.k3==null){z=new Float32Array(H.b(2))
z[0]=1
z[1]=1
q.k3=new T.a4(z)}return q}},
m3:{
"^":"i;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a_,J,W,S,P,R,a8,T,a4,a9,ab,ac,a0,al,am,aj,Y,L,N,Z,K,a1,ad,U,an,ap,ay,b2,aS,bO,as,at,b3,az,aT,ce,b4,au,b5,b6,aU,bh,bi,bP,bv,bQ",
dC:function(a,b){var z,y
z=this.a
y=this.f
if(typeof a!=="number")return a.a3()
if(typeof y!=="number")return H.n(y)
J.hZ(z,C.b.a2(a*y))
y=this.a
z=this.f
if(typeof b!=="number")return b.a3()
if(typeof z!=="number")return H.n(z)
J.hU(y,C.b.a2(b*z))
z=this.a.style
y=""+a+"px"
z.width=y
z=this.a.style
y=""+b+"px"
z.height=y
z=J.eb(this.a)
y=J.e5(this.a)
this.a1=0
this.ad=0
this.U=z!==-1?z:J.eb(this.a)
z=y!==-1?y:J.e5(this.a)
this.an=z
J.el(this.b,this.a1,this.ad,this.U,z)},
eA:function(a,b,c,d){var z=b?16384:0
if(c)z|=256
if(d)z|=1024
J.hl(this.b,z)},
b1:function(a){return this.eA(a,!0,!0,!0)},
iO:function(a){var z,y
a.sax(J.a9(this.b))
a.sbG(J.a9(this.b))
a.sdP(J.a9(this.b))
a.cx$=J.a9(this.b)
a.db$=J.a9(this.b)
a.dx$=J.a9(this.b)
a.fx$=J.a9(this.b)
a.fy$=J.a9(this.b)
a.go$=J.a9(this.b)
a.id$=J.a9(this.b)
z=a.e$
if(z!=null){a.k1$=[]
if(typeof z!=="number")return H.n(z)
y=0
for(;y<z;++y)a.k1$.push(J.a9(this.b))}z=a.f$
if(z!=null){a.k2$=[]
if(typeof z!=="number")return H.n(z)
y=0
for(;y<z;++y)a.k2$.push(J.a9(this.b))}++this.y1.a.b},
iV:function(a){var z,y
if(a.id==null)return
a.id=null
for(z=this.y2.length,y=0;y<z;++y);},
jz:function(a,b){},
eJ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=b.x1
y=a.geF()
x=a.d$
w=y.length
v=x.length
u=w*3+v*4
t=b.L
s=this.ex(t)
r=this.ew(t)
q=u*3
a.r1$=new Float32Array(q)
if(r!==0)a.r2$=new Float32Array(q)
if(z.fr)a.rx$=new Float32Array(u*4)
if(t.go!==0)a.ry$=new Float32Array(q)
if(s){z.r
a.x2$=new Float32Array(u*2)
z.x}b.x1.ch
w=(w+v*2)*3
a.S$=new Uint16Array(w)
v=u*2
a.P$=new Uint16Array(v)
p=a.e$
if(p!=null){a.R$=[]
if(typeof p!=="number")return H.n(p)
o=0
for(;o<p;++o){n=a.R$
n.push(new Float32Array(q))}}p=a.f$
if(p!=null){a.a8$=[]
if(typeof p!=="number")return H.n(p)
o=0
for(;o<p;++o){n=a.a8$
n.push(new Float32Array(q))}}a.T$=w
a.a4$=v
a.k4$=!0},
ew:function(a){var z
if(a instanceof S.z&&!0||!1)return 0
if(a!=null){a.gfS()
z=a.a_===2}else z=!1
if(z)return 2
else return 1},
ex:function(a){var z=J.v(a)
if(!!z.$iscj&&a.r2!=null)return!0
if(!!z.$isbX);return!1},
fK:function(a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=a0.b
y=a0.c
x=a0.cy
w=z.length
v=y.length
u=a0.gcz()
t=a0.gcv()
s=a0.gcw()
r=a0.id
q=a0.k1
p=a0.ry
o=a0.gcA()
if(r){for(n=0,m=null;n<w;++n){if(n>=z.length)return H.a(z,n)
l=z[n]
m=n*3
k=J.f(l)
j=k.gm(l)
i=u.length
if(m>=i)return H.a(u,m)
u[m]=j
j=m+1
h=k.gn(l)
if(j>=i)return H.a(u,j)
u[j]=h
h=m+2
k=k.gw(l)
if(h>=i)return H.a(u,h)
u[h]=k}J.F(this.b,34962,a0.gax())
J.W(this.b,34962,u,a1)}else m=null
if(q){for(k=y.length,g=0;g<v;++g){if(g>=k)return H.a(y,g)
f=y[g]
m=g*3
j=f.a
i=t.length
if(m>=i)return H.a(t,m)
t[m]=j
j=m+1
h=f.b
if(j>=i)return H.a(t,j)
t[j]=h
h=m+2
j=f.c
if(h>=i)return H.a(t,h)
t[h]=j}J.F(this.b,34962,a0.gbF())
J.W(this.b,34962,t,a1)}if(p){for(e=0;!1;++e){if(e>=0)return H.a(x,e)
s[e]=x[e]}J.F(this.b,34962,a0.gcD())
J.W(this.b,34962,s,a1)}if(o!=null){d=o.length
for(c=0,b=null;c<d;++c){if(c>=o.length)return H.a(o,c)
a=o[c]
if(a.gcj()){a.gil()
a.gil()}}}},
fL:function(g3,g4,g5,g6,g7){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2
if(g3.gdM()!==!0)return
z=this.ew(g7)
y=this.ex(g7)
x=z===2
w=g3.r1$
v=g3.x2$
u=g3.y1$
t=g3.r2$
s=g3.rx$
r=g3.ry$
q=g3.R$
p=g3.a8$
o=g3.a0$
n=g3.S$
m=g3.P$
l=g4.x1
k=l.id
j=l.k2
i=l.k3
h=l.k4
g=l.r1
f=l.k1
e=l.rx
d=l.b
c=g3.c$
b=g3.d$
a=l.f
a0=l.x[0]
a1=l.y
a2=l.Q
if(k){a3=c.length
for(a4=0,a5=null,a6=null,a7=null,a8=null,a9=0;a4<a3;++a4){if(a4>=c.length)return H.a(c,a4)
b0=c[a4]
if(b0>=a.length)return H.a(a,b0)
a5=a[b0]
b0=a5.a
b1=b0[0]
b2=d.length
if(b1<0||b1>=b2)return H.a(d,b1)
a6=d[b1]
b1=b0[1]
if(b1<0||b1>=b2)return H.a(d,b1)
a7=d[b1]
b0=b0[2]
if(b0<0||b0>=b2)return H.a(d,b0)
a8=d[b0]
b0=J.f(a6)
b2=b0.gm(a6)
b1=w.length
if(a9>=b1)return H.a(w,a9)
w[a9]=b2
b2=a9+1
b3=b0.gn(a6)
if(b2>=b1)return H.a(w,b2)
w[b2]=b3
b3=a9+2
b0=b0.gw(a6)
if(b3>=b1)return H.a(w,b3)
w[b3]=b0
b0=a9+3
b3=J.f(a7)
b2=b3.gm(a7)
if(b0>=b1)return H.a(w,b0)
w[b0]=b2
b2=a9+4
b0=b3.gn(a7)
if(b2>=b1)return H.a(w,b2)
w[b2]=b0
b0=a9+5
b3=b3.gw(a7)
if(b0>=b1)return H.a(w,b0)
w[b0]=b3
b3=a9+6
b0=J.f(a8)
b2=b0.gm(a8)
if(b3>=b1)return H.a(w,b3)
w[b3]=b2
b2=a9+7
b3=b0.gn(a8)
if(b2>=b1)return H.a(w,b2)
w[b2]=b3
b3=a9+8
b0=b0.gw(a8)
if(b3>=b1)return H.a(w,b3)
w[b3]=b0
a9+=9}a3=b.length
for(a4=0,b4=null;a4<a3;++a4){if(a4>=b.length)return H.a(b,a4)
b0=b[a4]
if(b0>=a.length)return H.a(a,b0)
a5=a[b0]
b0=a5.a
b1=b0[0]
b2=d.length
if(b1<0||b1>=b2)return H.a(d,b1)
a6=d[b1]
b1=b0[1]
if(b1<0||b1>=b2)return H.a(d,b1)
a7=d[b1]
b1=b0[2]
if(b1<0||b1>=b2)return H.a(d,b1)
a8=d[b1]
b0=b0[3]
if(b0<0||b0>=b2)return H.a(d,b0)
b4=d[b0]
b0=J.f(a6)
b2=b0.gm(a6)
b1=w.length
if(a9>=b1)return H.a(w,a9)
w[a9]=b2
b2=a9+1
b3=b0.gn(a6)
if(b2>=b1)return H.a(w,b2)
w[b2]=b3
b3=a9+2
b0=b0.gw(a6)
if(b3>=b1)return H.a(w,b3)
w[b3]=b0
b0=a9+3
b3=J.f(a7)
b2=b3.gm(a7)
if(b0>=b1)return H.a(w,b0)
w[b0]=b2
b2=a9+4
b0=b3.gn(a7)
if(b2>=b1)return H.a(w,b2)
w[b2]=b0
b0=a9+5
b3=b3.gw(a7)
if(b0>=b1)return H.a(w,b0)
w[b0]=b3
b3=a9+6
b0=J.f(a8)
b2=b0.gm(a8)
if(b3>=b1)return H.a(w,b3)
w[b3]=b2
b2=a9+7
b3=b0.gn(a8)
if(b2>=b1)return H.a(w,b2)
w[b2]=b3
b3=a9+8
b0=b0.gw(a8)
if(b3>=b1)return H.a(w,b3)
w[b3]=b0
b0=a9+9
b3=J.f(b4)
b2=b3.gm(b4)
if(b0>=b1)return H.a(w,b0)
w[b0]=b2
b2=a9+10
b0=b3.gn(b4)
if(b2>=b1)return H.a(w,b2)
w[b2]=b0
b0=a9+11
b3=b3.gw(b4)
if(b0>=b1)return H.a(w,b0)
w[b0]=b3
a9+=12}J.F(this.b,34962,g3.z$)
J.W(this.b,34962,w,g5)}else{a5=null
a6=null
a7=null
a8=null
b4=null}if(e)for(b0=!!J.v(g7).$isaD,b5=null,b6=null,b7=null,b8=null,b9=0,c0=null,c1=null,c2=null,c3=null;!1;++b9){a3=c.length
for(a4=0,c4=0;a4<a3;++a4){if(a4>=c.length)return H.a(c,a4)
c2=c[a4]
if(c2>=a.length)return H.a(a,c2)
a5=a[c2]
if(b9>=0)return H.a(a1,b9)
b1=a5.a
a6=a1[b9].gbB().h(0,b1[0])
a7=a1[b9].gbB().h(0,b1[1])
a8=a1[b9].gbB().h(0,b1[2])
c0=q[b9]
b1=a6.gm(a6)
b2=c0.length
if(c4>=b2)return H.a(c0,c4)
c0[c4]=b1
b1=c4+1
b3=a6.gn(a6)
if(b1>=b2)return H.a(c0,b1)
c0[b1]=b3
b3=c4+2
c5=a6.gw(a6)
if(b3>=b2)return H.a(c0,b3)
c0[b3]=c5
c5=c4+3
c6=a7.gm(a7)
if(c5>=b2)return H.a(c0,c5)
c0[c5]=c6
c6=c4+4
c7=a7.gn(a7)
if(c6>=b2)return H.a(c0,c6)
c0[c6]=c7
c7=c4+5
c8=a7.gw(a7)
if(c7>=b2)return H.a(c0,c7)
c0[c7]=c8
c8=c4+6
c9=a8.gm(a8)
if(c8>=b2)return H.a(c0,c8)
c0[c8]=c9
c9=c4+7
d0=a8.gn(a8)
if(c9>=b2)return H.a(c0,c9)
c0[c9]=d0
d0=c4+8
d1=a8.gw(a8)
if(d0>=b2)return H.a(c0,d0)
c0[d0]=d1
if(b0&&g7.T){b2=a2[b9]
if(x){c3=b2.gkP().h(0,c2)
b5=c3.gi_(c3)
b6=c3.gav(c3)
b7=c3.giq(c3)}else{b5=b2.gjb().h(0,c2)
b7=b5
b6=b7}c1=p[b9]
b2=b5.gm(b5)
d1=c1.length
if(c4>=d1)return H.a(c1,c4)
c1[c4]=b2
b2=b5.gn(b5)
if(b1>=d1)return H.a(c1,b1)
c1[b1]=b2
b2=b5.gw(b5)
if(b3>=d1)return H.a(c1,b3)
c1[b3]=b2
b2=b6.gm(b6)
if(c5>=d1)return H.a(c1,c5)
c1[c5]=b2
b2=b6.gn(b6)
if(c6>=d1)return H.a(c1,c6)
c1[c6]=b2
b2=b6.gw(b6)
if(c7>=d1)return H.a(c1,c7)
c1[c7]=b2
b2=b7.gm(b7)
if(c8>=d1)return H.a(c1,c8)
c1[c8]=b2
b2=b7.gn(b7)
if(c9>=d1)return H.a(c1,c9)
c1[c9]=b2
b2=b7.gw(b7)
if(d0>=d1)return H.a(c1,d0)
c1[d0]=b2}c4+=9}a3=b.length
for(a4=0;a4<a3;++a4){if(a4>=b.length)return H.a(b,a4)
c2=b[a4]
if(c2>=a.length)return H.a(a,c2)
a5=a[c2]
if(b9>=0)return H.a(a1,b9)
b1=a5.a
a6=a1[b9].gbB().h(0,b1[0])
a7=a1[b9].gbB().h(0,b1[1])
a8=a1[b9].gbB().h(0,b1[2])
b4=a1[b9].gbB().h(0,b1[3])
c0=q[b9]
b1=a6.gm(a6)
b2=c0.length
if(c4>=b2)return H.a(c0,c4)
c0[c4]=b1
b1=c4+1
b3=a6.gn(a6)
if(b1>=b2)return H.a(c0,b1)
c0[b1]=b3
b3=c4+2
c5=a6.gw(a6)
if(b3>=b2)return H.a(c0,b3)
c0[b3]=c5
c5=c4+3
c6=a7.gm(a7)
if(c5>=b2)return H.a(c0,c5)
c0[c5]=c6
c6=c4+4
c7=a7.gn(a7)
if(c6>=b2)return H.a(c0,c6)
c0[c6]=c7
c7=c4+5
c8=a7.gw(a7)
if(c7>=b2)return H.a(c0,c7)
c0[c7]=c8
c8=c4+6
c9=a8.gm(a8)
if(c8>=b2)return H.a(c0,c8)
c0[c8]=c9
c9=c4+7
d0=a8.gn(a8)
if(c9>=b2)return H.a(c0,c9)
c0[c9]=d0
d0=c4+8
d1=a8.gw(a8)
if(d0>=b2)return H.a(c0,d0)
c0[d0]=d1
d1=c4+9
d2=b4.gm(b4)
if(d1>=b2)return H.a(c0,d1)
c0[d1]=d2
d2=c4+10
d3=b4.gn(b4)
if(d2>=b2)return H.a(c0,d2)
c0[d2]=d3
d3=c4+11
d4=b4.gw(b4)
if(d3>=b2)return H.a(c0,d3)
c0[d3]=d4
if(b0&&g7.T){b2=a2[b9]
if(x){c3=b2.gkP().h(0,c2)
b5=c3.gi_(c3)
b6=c3.gav(c3)
b7=c3.giq(c3)
b8=c3.glb(c3)}else{b5=b2.gjb().h(0,c2)
b8=b5
b7=b8
b6=b7}c1=p[b9]
b2=b5.gm(b5)
d4=c1.length
if(c4>=d4)return H.a(c1,c4)
c1[c4]=b2
b2=b5.gn(b5)
if(b1>=d4)return H.a(c1,b1)
c1[b1]=b2
b2=b5.gw(b5)
if(b3>=d4)return H.a(c1,b3)
c1[b3]=b2
b2=b6.gm(b6)
if(c5>=d4)return H.a(c1,c5)
c1[c5]=b2
b2=b6.gn(b6)
if(c6>=d4)return H.a(c1,c6)
c1[c6]=b2
b2=b6.gw(b6)
if(c7>=d4)return H.a(c1,c7)
c1[c7]=b2
b2=b7.gm(b7)
if(c8>=d4)return H.a(c1,c8)
c1[c8]=b2
b2=b7.gn(b7)
if(c9>=d4)return H.a(c1,c9)
c1[c9]=b2
b2=b7.gw(b7)
if(d0>=d4)return H.a(c1,d0)
c1[d0]=b2
b2=b8.gm(b8)
if(d1>=d4)return H.a(c1,d1)
c1[d1]=b2
b2=b8.gn(b8)
if(d2>=d4)return H.a(c1,d2)
c1[d2]=b2
b2=b8.gw(b8)
if(d3>=d4)return H.a(c1,d3)
c1[d3]=b2}c4+=12}b1=this.b
b2=g3.k1$
if(b9>=b2.length)return H.a(b2,b9)
J.F(b1,34962,b2[b9])
b2=this.b
if(b9>=q.length)return H.a(q,b9)
J.W(b2,34962,q[b9],g5)
if(b0&&g7.T){b1=this.b
b2=g3.k2$
if(b9>=b2.length)return H.a(b2,b9)
J.F(b1,34962,b2[b9])
b2=this.b
if(b9>=p.length)return H.a(p,b9)
J.W(b2,34962,p[b9],g5)}}if(f&&g7.go!==0){a3=c.length
for(a4=0,d5=0;a4<a3;++a4){if(a4>=c.length)return H.a(c,a4)
b0=c[a4]
if(b0>=a.length)return H.a(a,b0)
a5=a[b0]
d6=a5.d
d7=a5.f
b0=d6.length
if(b0===3&&g7.go===2){if(0>=b0)return H.a(d6,0)
d8=d6[0]
if(1>=b0)return H.a(d6,1)
d9=d6[1]
if(2>=b0)return H.a(d6,2)
e0=d6[2]}else{e0=d7
d9=e0
d8=d9}b0=J.f(d8)
b1=b0.gag(d8)
b2=r.length
if(d5>=b2)return H.a(r,d5)
r[d5]=b1
b1=d5+1
b3=d8.gak()
if(b1>=b2)return H.a(r,b1)
r[b1]=b3
b3=d5+2
b0=b0.gav(d8)
if(b3>=b2)return H.a(r,b3)
r[b3]=b0
b0=d5+3
b3=J.f(d9)
b1=b3.gag(d9)
if(b0>=b2)return H.a(r,b0)
r[b0]=b1
b1=d5+4
b0=d9.gak()
if(b1>=b2)return H.a(r,b1)
r[b1]=b0
b0=d5+5
b3=b3.gav(d9)
if(b0>=b2)return H.a(r,b0)
r[b0]=b3
b3=d5+6
b0=J.f(e0)
b1=b0.gag(e0)
if(b3>=b2)return H.a(r,b3)
r[b3]=b1
b1=d5+7
b3=e0.gak()
if(b1>=b2)return H.a(r,b1)
r[b1]=b3
b3=d5+8
b0=b0.gav(e0)
if(b3>=b2)return H.a(r,b3)
r[b3]=b0
d5+=9}a3=b.length
for(a4=0;a4<a3;++a4){if(a4>=b.length)return H.a(b,a4)
b0=b[a4]
if(b0>=a.length)return H.a(a,b0)
a5=a[b0]
d6=a5.d
d7=a5.f
b0=d6.length
if(b0===4&&g7.go===2){if(0>=b0)return H.a(d6,0)
d8=d6[0]
if(1>=b0)return H.a(d6,1)
d9=d6[1]
if(2>=b0)return H.a(d6,2)
e0=d6[2]
if(3>=b0)return H.a(d6,3)
e1=d6[3]}else{e1=d7
e0=e1
d9=e0
d8=d9}b0=J.f(d8)
b1=b0.gag(d8)
b2=r.length
if(d5>=b2)return H.a(r,d5)
r[d5]=b1
b1=d5+1
b3=d8.gak()
if(b1>=b2)return H.a(r,b1)
r[b1]=b3
b3=d5+2
b0=b0.gav(d8)
if(b3>=b2)return H.a(r,b3)
r[b3]=b0
b0=d5+3
b3=J.f(d9)
b1=b3.gag(d9)
if(b0>=b2)return H.a(r,b0)
r[b0]=b1
b1=d5+4
b0=d9.gak()
if(b1>=b2)return H.a(r,b1)
r[b1]=b0
b0=d5+5
b3=b3.gav(d9)
if(b0>=b2)return H.a(r,b0)
r[b0]=b3
b3=d5+6
b0=J.f(e0)
b1=b0.gag(e0)
if(b3>=b2)return H.a(r,b3)
r[b3]=b1
b1=d5+7
b3=e0.gak()
if(b1>=b2)return H.a(r,b1)
r[b1]=b3
b3=d5+8
b0=b0.gav(e0)
if(b3>=b2)return H.a(r,b3)
r[b3]=b0
b0=d5+9
b3=J.f(e1)
b1=b3.gag(e1)
if(b0>=b2)return H.a(r,b0)
r[b0]=b1
b1=d5+10
b0=e1.gak()
if(b1>=b2)return H.a(r,b1)
r[b1]=b0
b0=d5+11
b3=b3.gav(e1)
if(b0>=b2)return H.a(r,b0)
r[b0]=b3
d5+=12}if(d5>0){J.F(this.b,34962,g3.cx$)
J.W(this.b,34962,r,g5)}}if(g&&l.fr){a3=c.length
for(a4=0,e2=0;a4<a3;++a4){if(a4>=c.length)return H.a(c,a4)
b0=c[a4]
if(b0>=a.length)return H.a(a,b0)
e3=a[b0].e
b0=e3.length
if(0>=b0)return H.a(e3,0)
d0=e3[0]
if(1>=b0)return H.a(e3,1)
b1=e3[1]
if(2>=b0)return H.a(e3,2)
b2=e3[2]
b0=J.f(d0)
b3=b0.gm(d0)
c5=s.length
if(e2>=c5)return H.a(s,e2)
s[e2]=b3
b3=e2+1
c6=b0.gn(d0)
if(b3>=c5)return H.a(s,b3)
s[b3]=c6
c6=e2+2
b3=b0.gw(d0)
if(c6>=c5)return H.a(s,c6)
s[c6]=b3
b3=e2+3
d0=b0.gaw(d0)
if(b3>=c5)return H.a(s,b3)
s[b3]=d0
d0=e2+4
b3=J.f(b1)
b0=b3.gm(b1)
if(d0>=c5)return H.a(s,d0)
s[d0]=b0
b0=e2+5
d0=b3.gn(b1)
if(b0>=c5)return H.a(s,b0)
s[b0]=d0
d0=e2+6
b0=b3.gw(b1)
if(d0>=c5)return H.a(s,d0)
s[d0]=b0
b0=e2+7
b1=b3.gaw(b1)
if(b0>=c5)return H.a(s,b0)
s[b0]=b1
b1=e2+8
b0=J.f(b2)
b3=b0.gm(b2)
if(b1>=c5)return H.a(s,b1)
s[b1]=b3
b3=e2+9
b1=b0.gn(b2)
if(b3>=c5)return H.a(s,b3)
s[b3]=b1
b1=e2+10
b3=b0.gw(b2)
if(b1>=c5)return H.a(s,b1)
s[b1]=b3
b3=e2+11
b2=b0.gaw(b2)
if(b3>=c5)return H.a(s,b3)
s[b3]=b2
e2+=12}a3=b.length
for(a4=0;a4<a3;++a4){if(a4>=b.length)return H.a(b,a4)
b0=b[a4]
if(b0>=a.length)return H.a(a,b0)
e3=a[b0].e
b0=e3.length
if(0>=b0)return H.a(e3,0)
d0=e3[0]
if(1>=b0)return H.a(e3,1)
b1=e3[1]
if(2>=b0)return H.a(e3,2)
b2=e3[2]
if(3>=b0)return H.a(e3,3)
b3=e3[3]
b0=J.f(d0)
c5=b0.gm(d0)
c6=s.length
if(e2>=c6)return H.a(s,e2)
s[e2]=c5
c5=e2+1
c7=b0.gn(d0)
if(c5>=c6)return H.a(s,c5)
s[c5]=c7
c7=e2+2
c5=b0.gw(d0)
if(c7>=c6)return H.a(s,c7)
s[c7]=c5
c5=e2+3
d0=b0.gaw(d0)
if(c5>=c6)return H.a(s,c5)
s[c5]=d0
d0=e2+4
c5=J.f(b1)
b0=c5.gm(b1)
if(d0>=c6)return H.a(s,d0)
s[d0]=b0
b0=e2+5
d0=c5.gn(b1)
if(b0>=c6)return H.a(s,b0)
s[b0]=d0
d0=e2+6
b0=c5.gw(b1)
if(d0>=c6)return H.a(s,d0)
s[d0]=b0
b0=e2+7
b1=c5.gaw(b1)
if(b0>=c6)return H.a(s,b0)
s[b0]=b1
b1=e2+8
b0=J.f(b2)
c5=b0.gm(b2)
if(b1>=c6)return H.a(s,b1)
s[b1]=c5
c5=e2+9
b1=b0.gn(b2)
if(c5>=c6)return H.a(s,c5)
s[c5]=b1
b1=e2+10
c5=b0.gw(b2)
if(b1>=c6)return H.a(s,b1)
s[b1]=c5
c5=e2+11
b2=b0.gaw(b2)
if(c5>=c6)return H.a(s,c5)
s[c5]=b2
b2=e2+12
c5=J.f(b3)
b0=c5.gm(b3)
if(b2>=c6)return H.a(s,b2)
s[b2]=b0
b0=e2+13
b2=c5.gn(b3)
if(b0>=c6)return H.a(s,b0)
s[b0]=b2
b2=e2+14
b0=c5.gw(b3)
if(b2>=c6)return H.a(s,b2)
s[b2]=b0
b0=e2+15
b3=c5.gaw(b3)
if(b0>=c6)return H.a(s,b0)
s[b0]=b3
e2+=16}J.F(this.b,34962,g3.ch$)
J.W(this.b,34962,s,g5)}if(h&&z!==0){a3=c.length
for(a4=0,e4=null,e5=0;a4<a3;++a4){if(a4>=c.length)return H.a(c,a4)
b0=c[a4]
if(b0>=a.length)return H.a(a,b0)
a5=a[b0]
e6=a5.c
e7=a5.b
if(e6.length===3&&x)for(e8=0;e8<3;++e8){if(e8>=e6.length)return H.a(e6,e8)
e4=e6[e8]
b0=J.f(e4)
b1=b0.gm(e4)
b2=t.length
if(e5<0||e5>=b2)return H.a(t,e5)
t[e5]=b1
b1=e5+1
b3=b0.gn(e4)
if(b1>=b2)return H.a(t,b1)
t[b1]=b3
b3=e5+2
b0=b0.gw(e4)
if(b3>=b2)return H.a(t,b3)
t[b3]=b0
e5+=3}else for(b0=e7.a,e8=0;e8<3;++e8){b1=b0[0]
b2=t.length
if(e5<0||e5>=b2)return H.a(t,e5)
t[e5]=b1
b1=e5+1
b3=b0[1]
if(b1>=b2)return H.a(t,b1)
t[b1]=b3
b3=e5+2
b1=b0[2]
if(b3>=b2)return H.a(t,b3)
t[b3]=b1
e5+=3}}a3=b.length
for(a4=0;a4<a3;++a4){if(a4>=b.length)return H.a(b,a4)
b0=b[a4]
if(b0>=a.length)return H.a(a,b0)
a5=a[b0]
e6=a5.c
e7=a5.b
if(e6.length===4&&x)for(e8=0;e8<4;++e8){if(e8>=e6.length)return H.a(e6,e8)
e4=e6[e8]
b0=J.f(e4)
b1=b0.gm(e4)
b2=t.length
if(e5<0||e5>=b2)return H.a(t,e5)
t[e5]=b1
b1=e5+1
b3=b0.gn(e4)
if(b1>=b2)return H.a(t,b1)
t[b1]=b3
b3=e5+2
b0=b0.gw(e4)
if(b3>=b2)return H.a(t,b3)
t[b3]=b0
e5+=3}else for(b0=e7.a,e8=0;e8<4;++e8){b1=b0[0]
b2=t.length
if(e5<0||e5>=b2)return H.a(t,e5)
t[e5]=b1
b1=e5+1
b3=b0[1]
if(b1>=b2)return H.a(t,b1)
t[b1]=b3
b3=e5+2
b1=b0[2]
if(b3>=b2)return H.a(t,b3)
t[b3]=b1
e5+=3}}J.F(this.b,34962,g3.Q$)
J.W(this.b,34962,t,g5)}if(i&&a0.length!==0&&y){a3=c.length
for(a4=0,e9=null,f0=0;a4<a3;++a4){if(a4>=c.length)return H.a(c,a4)
f1=c[a4]
if(f1>=a0.length)return H.a(a0,f1)
f2=a0[f1]
for(e8=0;e8<3;++e8){if(e8>=f2.length)return H.a(f2,e8)
e9=f2[e8]
b0=e9.gcm()
b1=v.length
if(f0<0||f0>=b1)return H.a(v,f0)
v[f0]=b0
b0=f0+1
b2=e9.b
if(b0>=b1)return H.a(v,b0)
v[b0]=b2
f0+=2}}a3=b.length
for(a4=0;a4<a3;++a4){if(a4>=b.length)return H.a(b,a4)
f1=b[a4]
if(f1>=a0.length)return H.a(a0,f1)
f2=a0[f1]
for(e8=0;e8<4;++e8){if(e8>=f2.length)return H.a(f2,e8)
e9=f2[e8]
b0=e9.gcm()
b1=v.length
if(f0<0||f0>=b1)return H.a(v,f0)
v[f0]=b0
b0=f0+1
b2=e9.b
if(b0>=b1)return H.a(v,b0)
v[b0]=b2
f0+=2}}if(f0>0){J.F(this.b,34962,g3.db$)
J.W(this.b,34962,v,g5)}}if(i)b0=!1
else b0=!1
if(b0){a3=c.length
for(a4=0,f3=null,f4=0;a4<a3;++a4){if(a4>=c.length)return H.a(c,a4)
f1=c[a4]
if(f1>=null.length)return H.a(null,f1)
f5=null[f1]
for(e8=0;e8<3;++e8){if(e8>=f5.length)return H.a(f5,e8)
f3=f5[e8]
b0=f3.gcm()
b1=u.length
if(f4<0||f4>=b1)return H.a(u,f4)
u[f4]=b0
b0=f4+1
b2=f3.b
if(b0>=b1)return H.a(u,b0)
u[b0]=b2
f4+=2}}a3=b.length
for(a4=0;a4<a3;++a4){if(a4>=b.length)return H.a(b,a4)
f1=b[a4]
if(f1>=null.length)return H.a(null,f1)
f5=null[f1]
for(e8=0;e8<4;++e8){if(e8>=f5.length)return H.a(f5,e8)
f3=f5[e8]
b0=f3.gcm()
b1=u.length
if(f4<0||f4>=b1)return H.a(u,f4)
u[f4]=b0
b0=f4+1
b2=f3.b
if(b0>=b1)return H.a(u,b0)
u[b0]=b2
f4+=2}}if(f4>0){J.F(this.b,34962,g3.dx$)
J.W(this.b,34962,u,g5)}}if(j){a3=c.length
for(a4=0,f6=0,f7=0,f8=0;a4<a3;++a4){b0=n.length
if(f7>=b0)return H.a(n,f7)
n[f7]=f6
b1=f7+1
b2=f6+1
if(b1>=b0)return H.a(n,b1)
n[b1]=b2
b1=f7+2
b3=f6+2
if(b1>=b0)return H.a(n,b1)
n[b1]=b3
f7+=3
b1=m.length
if(f8>=b1)return H.a(m,f8)
m[f8]=f6
b0=f8+1
if(b0>=b1)return H.a(m,b0)
m[b0]=b2
b0=f8+2
if(b0>=b1)return H.a(m,b0)
m[b0]=f6
b0=f8+3
if(b0>=b1)return H.a(m,b0)
m[b0]=b3
b0=f8+4
if(b0>=b1)return H.a(m,b0)
m[b0]=b2
b2=f8+5
if(b2>=b1)return H.a(m,b2)
m[b2]=b3
f8+=6
f6+=3}a3=b.length
for(a4=0;a4<a3;++a4){b0=n.length
if(f7>=b0)return H.a(n,f7)
n[f7]=f6
b1=f7+1
b2=f6+1
if(b1>=b0)return H.a(n,b1)
n[b1]=b2
b1=f7+2
b3=f6+3
if(b1>=b0)return H.a(n,b1)
n[b1]=b3
b1=f7+3
if(b1>=b0)return H.a(n,b1)
n[b1]=b2
b1=f7+4
c5=f6+2
if(b1>=b0)return H.a(n,b1)
n[b1]=c5
b1=f7+5
if(b1>=b0)return H.a(n,b1)
n[b1]=b3
f7+=6
b1=m.length
if(f8>=b1)return H.a(m,f8)
m[f8]=f6
b0=f8+1
if(b0>=b1)return H.a(m,b0)
m[b0]=b2
b0=f8+2
if(b0>=b1)return H.a(m,b0)
m[b0]=f6
b0=f8+3
if(b0>=b1)return H.a(m,b0)
m[b0]=b3
b0=f8+4
if(b0>=b1)return H.a(m,b0)
m[b0]=b2
b2=f8+5
if(b2>=b1)return H.a(m,b2)
m[b2]=c5
b2=f8+6
if(b2>=b1)return H.a(m,b2)
m[b2]=c5
c5=f8+7
if(c5>=b1)return H.a(m,c5)
m[c5]=b3
f8+=8
f6+=4}J.F(this.b,34963,g3.go$)
J.W(this.b,34963,n,g5)
J.F(this.b,34963,g3.id$)
J.W(this.b,34963,m,g5)}if(o!=null){f9=o.length
for(e8=0,g0=0,g1=0;e8<f9;++e8){if(e8>=o.length)return H.a(o,e8)
g2=o[e8]
if(!g2.gkZ().gcj())continue
g2.gae(g2)
g2.gae(g2)
g2.gae(g2)
g2.gae(g2)
g2.gca(g2).i9(34962)
J.W(this.b,34962,g2.gl5(),g5)
g0=0
g1=0}}if(g6){g3.k4$=!1
g3.ry$=null
g3.r2$=null
g3.rx$=null
g3.x2$=null
g3.y1$=null
g3.S$=null
g3.r1$=null
g3.P$=null
g3.J$=null
g3.W$=null}},
kg:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
if(a.gjs())a.gax()
if(a.gjr())a.gbG()
if(a.gjt())a.gho()
if(a.gjp())a.gbF()
if(a.gjs()){J.F(this.b,34962,a.gax())
J.W(this.b,34962,a.glq(),35048)
z=b.e
J.bv(this.b,z.h(0,"position"))
J.X(this.b,z.h(0,"position"),3,5126,!1,0,0)}if(a.gjr()){J.F(this.b,34962,a.gbG())
if(c.r2===1){y=a.geD(a).a3(0,3)
for(x=0;C.c.b_(x,y);x+=9){w=a.gjX()
v=w.h(0,x)
z=x+1
u=w.h(0,z)
t=x+2
s=w.h(0,t)
r=x+3
q=w.h(0,r)
p=x+4
o=w.h(0,p)
n=x+5
m=w.h(0,n)
l=x+6
k=w.h(0,l)
j=x+7
i=w.h(0,j)
h=x+8
g=w.h(0,h)
f=v.p(0,q).p(0,k).c_(0,3)
e=u.p(0,o).p(0,i).c_(0,3)
d=s.p(0,m).p(0,g).c_(0,3)
w.k(0,x,f)
w.k(0,z,e)
w.k(0,t,d)
w.k(0,r,f)
w.k(0,p,e)
w.k(0,n,d)
w.k(0,l,f)
w.k(0,j,e)
w.k(0,h,d)}}J.W(this.b,34962,a.gjX(),35048)
z=b.e
J.bv(this.b,z.h(0,"normal"))
J.X(this.b,z.h(0,"normal"),3,5126,!1,0,0)}if(a.gjt()&&c.glg(c)){J.F(this.b,34962,a.gho())
J.W(this.b,34962,a.glt(),35048)
z=b.e
J.bv(this.b,z.h(0,"uv"))
J.X(this.b,z.h(0,"uv"),2,5126,!1,0,0)}if(a.gjp()&&c.go!==0){J.F(this.b,34962,a.gbF())
J.W(this.b,34962,a.gla(),35048)
z=b.e
J.bv(this.b,z.h(0,"color"))
J.X(this.b,z.h(0,"color"),3,5126,!1,0,0)}J.e0(this.b,4,0,a.geD(a))
a.seD(0,0)},
f1:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n
if(!d.fr)return
z=this.dA(a,b,c,d,f)
y=z.e
x=J.v(d)
w=!!x.$isdy
v=w&&d.gdn()?1:0
u=J.aJ(J.aJ(J.hf(J.hx(e),16777215),z.a*2),v)
if(u!==this.P){this.P=u
t=!0}else t=!1
if(t)this.j5()
if(!!x.$isaD)s=!d.gbV()
else s=!0
if(s){s=y.h(0,"position")
if(typeof s!=="number")return s.ai()
s=s>=0}else s=!1
if(s){if(t){J.F(this.b,34962,e.gax())
this.ao(y.h(0,"position"))
J.X(this.b,y.h(0,"position"),3,5126,!1,0,0)}}else if(!!f.$isau&&f.N!==0)this.fP(d,e,f)
if(t){if(e.gcA()!=null){r=e.a0$.length
for(q=0;q<r;++q){s=e.a0$
if(q>=s.length)return H.a(s,q)
p=s[q]
s=y.h(0,p.gca(p).gev())
if(typeof s!=="number")return s.ai()
if(s>=0){p.gca(p).i9(34962)
this.ao(y.h(0,p.gca(p).gev()))
J.X(this.b,y.h(0,p.gca(p).gev()),p.gae(p),5126,!1,0,0)}}}s=y.h(0,"color")
if(typeof s!=="number")return s.ai()
if(s>=0){J.F(this.b,34962,e.cx$)
this.ao(y.h(0,"color"))
J.X(this.b,y.h(0,"color"),3,5126,!1,0,0)}s=y.h(0,"normal")
if(typeof s!=="number")return s.ai()
if(s>=0){J.F(this.b,34962,e.Q$)
this.ao(y.h(0,"normal"))
J.X(this.b,y.h(0,"normal"),3,5126,!1,0,0)}s=y.h(0,"tangent")
if(typeof s!=="number")return s.ai()
if(s>=0){J.F(this.b,34962,e.ch$)
this.ao(y.h(0,"tangent"))
J.X(this.b,y.h(0,"tangent"),4,5126,!1,0,0)}s=y.h(0,"uv")
if(typeof s!=="number")return s.ai()
if(s>=0){J.F(this.b,34962,e.db$)
this.ao(y.h(0,"uv"))
J.X(this.b,y.h(0,"uv"),2,5126,!1,0,0)}s=y.h(0,"uv2")
if(typeof s!=="number")return s.ai()
if(s>=0){J.F(this.b,34962,e.dx$)
this.ao(y.h(0,"uv2"))
J.X(this.b,y.h(0,"uv2"),2,5126,!1,0,0)}if(!!x.$isch)if(d.gc3()){s=y.h(0,"skinIndex")
if(typeof s!=="number")return s.ai()
if(s>=0){s=y.h(0,"skinWeight")
if(typeof s!=="number")return s.ai()
s=s>=0}else s=!1}else s=!1
else s=!1
if(s){J.F(this.b,34962,e.fx$)
this.ao(y.h(0,"skinIndex"))
J.X(this.b,y.h(0,"skinIndex"),4,5126,!1,0,0)
J.F(this.b,34962,e.fy$)
this.ao(y.h(0,"skinWeight"))
J.X(this.b,y.h(0,"skinWeight"),4,5126,!1,0,0)}s=y.h(0,"lineDistance")
if(typeof s!=="number")return s.ai()
if(s>=0){J.F(this.b,34962,e.cy$)
this.ao(y.h(0,"lineDistance"))
J.X(this.b,y.h(0,"lineDistance"),1,5126,!1,0,0)}}if(!!f.$isau){if(w&&d.gdn()){x=H.at(d,"$isdy").gfh()
if(x!==this.K){J.ed(this.b,x)
this.K=x}if(t)J.F(this.b,34963,e.gdO())
J.e1(this.b,1,e.gc5(),5123,0)}else{if(t)J.F(this.b,34963,e.gdN())
J.e1(this.b,4,e.gcB(),5123,0)}x=this.y1
w=x.b;++w.a
s=w.b
o=e.gcB()
if(typeof o!=="number")return H.n(o)
w.b=s+o
x=x.b
o=x.c
s=e.T$
if(typeof s!=="number")return s.kX()
x.c=o+C.c.aR(s,3)}else if(!!f.$isbh){n=f.N===0?3:1
x=!!x.$isc5?d.r2:0
if(x!==this.K){J.ed(this.b,x)
this.K=x}J.e0(this.b,n,0,e.gc5());++this.y1.b.a}},
ao:function(a){var z,y
z=J.b_(a)
y=this.a4
if(y.h(0,z)==null||y.h(0,z)!==!0){J.bv(this.b,a)
y.k(0,z,!0)}},
j5:function(){this.a4.G(0,new S.mc(this))},
fP:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
z=a.id.e
if(c.gjR()!==-1){y=z.h(0,"position")
if(typeof y!=="number")return y.ai()
y=y>=0}else y=!1
if(y){y=this.b
x=b.gcE()
w=c.N
if(w<0||w>=x.length)return H.a(x,w)
J.F(y,34962,x[w])
this.ao(z.h(0,"position"))
J.X(this.b,z.h(0,"position"),3,5126,!1,0,0)}else{y=z.h(0,"position")
if(typeof y!=="number")return y.ai()
if(y>=0){J.F(this.b,34962,b.gax())
this.ao(z.h(0,"position"))
J.X(this.b,z.h(0,"position"),3,5126,!1,0,0)}}if(!!a.$isaD)c.Z.length
v=[]
u=c.K
t=u.length
for(s=0;s<t;++s){if(s>=u.length)return H.a(u,s)
r=u[s]
if(J.a8(r,0))v.push([s,r])}y=v.length
H.at(a,"$isaD")
if(y>a.gbm()){C.a.c4(v,this.geU())
C.a.sj(v,a.gbm())}else if(v.length>a.gbW())C.a.c4(v,this.geU())
else if(v.length===0)v.push([0,0])
for(q=null,p=0;p<a.gbm();){y=v.length
if(p<y){x=v[p]
x=x!=null&&x.length!==0}else x=!1
if(x){if(p>=y)return H.a(v,p)
y=v[p]
if(0>=y.length)return H.a(y,0)
q=y[0]
y=this.b
x=b.gcE()
if(q>>>0!==q||q>=x.length)return H.a(x,q)
J.F(y,34962,x[q])
this.ao(z.h(0,"morphTarget"+p))
J.X(this.b,z.h(0,"morphTarget"+p),3,5126,!1,0,0)
if(a.gci()){y=this.b
x=b.k2$
if(q>=x.length)return H.a(x,q)
J.F(y,34962,x[q])
this.ao(z.h(0,"morphNormal"+p))
J.X(this.b,z.h(0,"morphNormal"+p),3,5126,!1,0,0)}y=c.Y
if(q>=u.length)return H.a(u,q)
x=J.cM(u[q])
if(p>=y.length)return H.a(y,p)
y[p]=x}else{y=c.Y
if(p>=y.length)return H.a(y,p)
y[p]=0}++p}if(a.id.f.h(0,"morphTargetInfluences")!=null)J.eg(this.b,a.id.f.h(0,"morphTargetInfluences"),c.Y)},
ll:[function(a,b){var z,y
z=J.f(a)
if(!J.e7(z.gw(a))){y=J.f(b)
y=J.e7(y.gw(b))||J.e6(z.gw(a))||J.e6(y.gw(b))}else y=!0
if(y)z=0
else{y=J.cI(b)
z=z.gw(a)
if(typeof y!=="number")return y.aa()
if(typeof z!=="number")return H.n(z)
z=C.b.a2(y-z)}return z},"$2","gk0",4,0,3],
lh:[function(a,b){return J.ee(J.bP(J.x(b,0),J.x(a,0)))},"$2","geU",4,0,3],
hN:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=a.K
y=a.L
this.S=-1
this.az=!0
if(this.fr)a.cn()
if(b.d==null)b.cn()
x=b.L
x.d0(b.dy)
this.aS.B(b.N).bk(0,x)
w=this.b2
w.dv(this.aS)
if(this.dy)this.jC(a)
this.f5(this.x1,a,b)
v=this.y1.b
v.a=0
v.b=0
v.c=0
v.d=0
this.dB(d)
if(this.ch||c)this.eA(0,this.cx,this.cy,this.db)
u=a.U
t=u.length
for(v=this.dx,s=0;s<t;++s){if(s>=u.length)return H.a(u,s)
r=u[s]
q=r.b
r.e=!1
if(q.k3)if(!(!!q.$isau||!1)||!q.r2||w.cb(0,q)){p=x.a3(0,q.gaA())
q.J=p
p=S.fY(p)
q.W=p
p.fb()
o=q.gaW()
if(o!=null){r.d=o
r.c=null}r.e=!0
if(v){p=q.gaA().aZ()
this.as=p
p.bs(this.aS)
r.f=this.as.a[2]}}}if(v)J.i0(u,this.gk0())
u=a.an
t=u.length
for(s=0;s<t;++s){if(s>=u.length)return H.a(u,s)
r=u[s]
q=r.b
if(q.k3){w=x.a3(0,q.gaA())
q.J=w
w=S.fY(w)
q.W=w
w.fb()
n=q.gaW()
if(n.cy){r.d=n
r.c=null}else{r.c=n
r.d=null}}}this.fG(0)
this.f3(a.U,!0,"opaque",b,z,y,!1,null)
this.f4(a.an,"opaque",b,z,y,!1,null)
this.f3(a.U,!1,"transparent",b,z,y,!0,null)
this.f4(a.an,"transparent",b,z,y,!0,null)
this.f5(this.x2,a,b)
this.c2(!0)
this.fI(!0)},
ee:function(a,b){return this.hN(a,b,!1,null)},
f5:function(a,b,c){C.a.G(a,new S.mh(this,b,c))},
f3:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u,t,s,r,q
if(b){z=a.length-1
y=-1
x=-1}else{y=a.length
z=0
x=1}for(w=c==="opaque",v=z,u=null,t=null,s=null;v!==y;v+=x){if(v<0||v>=a.length)return H.a(a,v)
r=a[v]
if(r.e){u=r.b
t=r.a
s=w?r.c:r.d
if(s==null)continue
if(g)this.cr(s.f,s.y,s.r,s.x)
this.c2(s.db)
q=s.dx
if(this.Y!==q){J.cF(this.b,q)
this.Y=q}this.dz(s.Q,s.ch,s.cx)
this.dw(s)
this.f1(d,e,f,s,t,u)}}},
f4:function(a,b,c,d,e,f,g){var z,y,x,w,v,u
z=a.length
for(y=null,x=0;x<z;++x){if(x>=a.length)return H.a(a,x)
w=a[x]
v=w.b
if(v.k3){y=w.h(0,b)
if(!y)continue
if(f)this.cr((!0).gl9(),(!0).gl7(!0),(!0).gl8(),(!0).gl6())
this.c2((!0).glc())
u=(!0).gld()
J.cF(this.b,u)
this.Y=u
this.dz((!0).gln(!0),(!0).glo(),(!0).glp())
this.f2(c,d,e,y,v)}}},
f2:function(a,b,c,d,e){var z=this.dA(a,b,c,d,e)
this.P=-1
this.dw(d)
e.lr(new S.mg(this,d,z))},
fV:function(a,b){var z,y,x,w,v,u
z=P.C()
a.sar(P.C())
y=a.f.length
for(x=0;x<y;++x){w=a.f
if(x>=w.length)return H.a(w,x)
if(z.h(0,"0")==null)z.k(0,"0",P.y(["hash","0","counter",0]))
v=H.l(J.x(z.h(0,"0"),"hash"))+"_"+H.l(J.x(z.h(0,"0"),"counter"))
if(a.gar().h(0,v)==null){w=a.gar()
u=new S.dx(null,null,null,null,null,null,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
u.c$=[]
u.d$=[]
u.r$=H.dd("0",null,null)
u.b$=0
u.e$=0
u.f$=0
w.k(0,v,u)}w=a.gar().h(0,v).b$
if(typeof w!=="number")return w.p()
if(w+4>65535){w=z.h(0,"0")
u=J.J(w)
u.k(w,"counter",J.aJ(u.h(w,"counter"),1))
v=H.l(J.x(z.h(0,"0"),"hash"))+"_"+H.l(J.x(z.h(0,"0"),"counter"))
if(a.gar().h(0,v)==null){w=a.gar()
u=new S.dx(null,null,null,null,null,null,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
u.c$=[]
u.d$=[]
u.r$=H.dd("0",null,null)
u.b$=0
u.e$=0
u.f$=0
w.k(0,v,u)}}a.gar().h(0,v).d$.push(x)
w=a.gar().h(0,v)
u=w.b$
if(typeof u!=="number")return u.p()
w.b$=u+4}a.sbC([])
a.gar().G(0,new S.mi(this,a))
return},
jC:function(a){var z,y,x,w
if(a.U==null){a.U=[]
a.an=[]
a.ap=[]
a.ay=[]}for(;z=a.a1,z.length>0;){this.i4(z[0],a)
C.a.aX(a.a1,0)}for(;z=a.ad,z.length>0;){z=z[0]
if(!z.$isau)y=!!z.$isbh
else y=!0
if(y)this.kd(a.U,z)
z.y2=!1
C.a.aX(a.ad,0)}for(x=a.U.length,w=0;w<x;++w){z=a.U
if(w>=z.length)return H.a(z,w)
this.kM(z[w].b)}},
i4:function(a,b){var z,y,x,w
z=a.x1
if(!a.y1){a.y1=!0
y=new T.r(new Float32Array(16))
y.A()
a.J=y
a.W=new T.b6(new Float32Array(9))
if(z!=null&&!z.gcC())z.scC(!0)
if(!!a.$isau){x=a.L
if(a.x1 instanceof S.c1&&!0){if(z.gar()==null)this.fV(z,x)
z.gar().G(0,new S.m7(this,a,z))}}else if(!!a.$isbh)if(z.gax()==null){z.sax(J.a9(this.b))
z.sbF(J.a9(this.b))
z.scD(J.a9(this.b));++this.y1.a.b
w=z.b.length
y=w*3
z.scz(new Float32Array(y))
z.scv(new Float32Array(y))
z.scw(new Float32Array(w))
z.sc5(w)
this.jz(z,a)
z.id=!0
z.k1=!0
z.ry=!0}}if(!a.y2){if(!!a.$isau)z.gar().G(0,new S.m8(this,a,b))
else{y=!!a.$isbh||!1
if(y)b.U.push(new S.fA(z,a,null,null,!0,0))}a.y2=!0}},
kM:function(a){var z,y,x,w,v,u,t
z=a.x1
if(!!a.$isau){for(y=z.gbC().length,x=!z.fx,w=0;w<y;++w){v=z.gbC()
if(w>=v.length)return H.a(v,w)
u=v[w]
t=a.L
if(z.r2)this.eJ(u,a)
if(z.id||z.rx||z.k2||z.k3||z.k4||z.k1||z.r1||!1)this.fL(u,a,35048,x,t)}z.id=!1
z.rx=!1
z.k2=!1
z.k3=!1
z.k4=!1
z.k1=!1
z.r1=!1
z.r2=!1}else if(!!a.$isbh){if(z.id||z.k1||z.ry||!1)this.fK(z,35048)
z.id=!1
z.k1=!1
z.ry=!1}},
kd:function(a,b){var z
for(z=a.length-1;z>=0;--z){if(z>=a.length)return H.a(a,z)
if(a[z].b===b)C.a.aX(a,z)}},
jB:function(a3,a4,a5,a6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!!a3.$isz)z="basic"
else if(!!a3.$isc5)z="basic"
else z=null
if(z!=null){y=S.fb().h(0,z)
a3.k3=S.fx(y.h(0,"uniforms"))
a3.k2=y.h(0,"vertexShader")
a3.k1=y.h(0,"fragmentShader")}x=this.i6(a4)
w=this.i7(a4)
v=this.i5(a6)
y=a3.k1
u=a3.k2
t=a3.k3
s=!!a3.$iscf
r=s?a3.P:P.C()
s=s?a3.R:P.C()
q=!!a3.$iscj?a3.r2:null
p=!!a3.$isbX
o=p?a3.x1:null
n=p?a3.rx:null
p=p?a3.ry:null
m=a3.go
l=a3.fy
k=!!a3.$isch&&a3.gc3()
if(this.aU===!0);j=!!a3.$isaD
i=j&&a3.gbV()
h=j&&a3.gci()
g=this.r2
f=this.rx
e=x.h(0,"directional")
d=x.h(0,"point")
c=x.h(0,"spot")
b=x.h(0,"hemi")
a=this.id&&a6.r1
a0=a3.c
m=this.io(z,y,u,t,r,s,a3.z,0,0,null,a0===2,o,a0===1,a5,a5 instanceof S.c0,n,q,v,e,b,f,g,d,w,c,!1,h,i,null,!1,this.k3,this.k2,a,this.k4,!1,k,p,l,!1,m,!1)
a3.id=m
a1=m.e
if(j&&a3.gbV()){H.at(a3,"$isaD")
a3.sbm(0)
for(a2=0;a2<g;++a2){y=a1.h(0,"morphTarget"+a2)
if(typeof y!=="number")return y.ai()
if(y>=0)a3.sbm(a3.gbm()+1)}}if(j&&a3.gci()){H.at(a3,"$isaD")
a3.sbW(0)
for(a2=0;a2<f;++a2){y=a1.h(0,"morphNormal"+a2)
if(typeof y!=="number")return y.ai()
if(y>=0)a3.sbW(a3.gbW()+1)}}a3.k4=[]
a3.k3.G(0,new S.me(a3))},
dA:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q
this.T=0
if(d.fx){if(d.id!=null)this.iV(d)
this.jB(d,b,c,e)
d.fx=!1}z=J.v(d)
if(!!z.$isaD&&d.gbV()){H.at(e,"$isau")
if(e.Y==null)e.Y=new Float32Array(H.b(this.r2))}y=d.id
x=y.f
w=d.k3
v=this.J
if(y==null?v!=null:y!==v){J.ie(this.b,y.b)
this.J=y
u=!0}else u=!1
v=d.b
if(v!==this.S){this.S=v
u=!0}if(u||a!==this.R){J.bf(this.b,x.h(0,"projectionMatrix"),!1,a.N.a)
if(a!==this.R)this.R=a}if(u){if(c!=null&&d.fy){J.G(w.h(0,"fogColor"),c.a)
if(c instanceof S.c0)J.G(w.h(0,"fogDensity"),c.c)}v=!!z.$iscf&&d.y1
if(v){if(this.az){this.fO(y,b)
this.az=!1}v=this.b3
J.G(w.h(0,"ambientLightColor"),v.h(0,"ambient"))
J.G(w.h(0,"directionalLightColor"),J.x(v.h(0,"directional"),"colors"))
J.G(w.h(0,"directionalLightDirection"),J.x(v.h(0,"directional"),"positions"))
J.G(w.h(0,"pointLightColor"),J.x(v.h(0,"point"),"colors"))
J.G(w.h(0,"pointLightPosition"),J.x(v.h(0,"point"),"positions"))
J.G(w.h(0,"pointLightDistance"),J.x(v.h(0,"point"),"distances"))
J.G(w.h(0,"spotLightColor"),J.x(v.h(0,"spot"),"colors"))
J.G(w.h(0,"spotLightPosition"),J.x(v.h(0,"spot"),"positions"))
J.G(w.h(0,"spotLightDistance"),J.x(v.h(0,"spot"),"distances"))
J.G(w.h(0,"spotLightDirection"),J.x(v.h(0,"spot"),"directions"))
J.G(w.h(0,"spotLightAngleCos"),J.x(v.h(0,"spot"),"anglesCos"))
J.G(w.h(0,"spotLightExponent"),J.x(v.h(0,"spot"),"exponents"))
J.G(w.h(0,"hemisphereLightSkyColor"),J.x(v.h(0,"hemi"),"skyColors"))
J.G(w.h(0,"hemisphereLightGroundColor"),J.x(v.h(0,"hemi"),"groundColors"))
J.G(w.h(0,"hemisphereLightDirection"),J.x(v.h(0,"hemi"),"positions"))}if(!z.$isz)v=!1
else v=!0
if(v){J.G(w.h(0,"opacity"),d.e)
v=this.fx
if(v)J.ah(w.h(0,"diffuse")).iL(d.d)
else J.G(w.h(0,"diffuse"),d.d)
t=!!z.$iscj
if(t)J.G(w.h(0,"map"),d.r2)
s=!!z.$isbX
if(s){J.G(w.h(0,"lightMap"),d.rx)
J.G(w.h(0,"specularMap"),d.ry)}if(t&&d.r2!=null)r=H.at(d,"$iscj").r2
else{if(s);r=null}if(r!=null){t=r.Q.a
q=r.ch.a
J.ah(w.h(0,"offsetRepeat")).a7(t[0],t[1],q[0],q[1])}if(s){J.G(w.h(0,"envMap"),d.x1)
t=w.h(0,"flipEnvMap")
J.G(t,-1)
t=d.y1
if(v)J.G(w.h(0,"reflectivity"),t)
else J.G(w.h(0,"reflectivity"),t)
J.G(w.h(0,"refractionRatio"),d.y2)
J.G(w.h(0,"combine"),d.x2)
v=w.h(0,"useRefract")
J.G(v,0)}}if(!!z.$isc5){J.G(w.h(0,"diffuse"),d.d)
J.G(w.h(0,"opacity"),d.e)}if(e.r1&&!d.r1)this.k9(w,b)
this.jP(y,d.k4)
v=!z.$iscf
if(v){if(!!z.$isbX);t=!1}else t=!0
if(t)if(x.h(0,"cameraPosition")!=null){this.as=a.dy.aZ()
t=this.b
s=x.h(0,"cameraPosition")
q=this.as.a
J.cN(t,s,q[0],q[1],q[2])}if(v)z=!!z.$isch&&d.gc3()
else z=!0
if(z)if(x.h(0,"viewMatrix")!=null)J.bf(this.b,x.h(0,"viewMatrix"),!1,a.L.a)}z=this.b
v=x.h(0,"modelViewMatrix")
t=e.J
J.bf(z,v,!1,t.gi(t))
if(x.h(0,"normalMatrix")!=null)J.ek(this.b,x.h(0,"normalMatrix"),!1,e.W.a)
if(x.h(0,"modelMatrix")!=null){z=this.b
v=x.h(0,"modelMatrix")
t=e.gaA()
J.bf(z,v,!1,t.gi(t))}return y},
k9:function(a,b){var z,y,x,w,v,u
if(a.cc(0,"shadowMatrix"))for(z=b.length,y=0,x=0;x<z;++x){if(x>=b.length)return H.a(b,x)
w=b[x]
if(!w.gbu())continue
v=!!w.$isaN&&!w.bh
if(v){u=y+1
if(J.br(J.ao(J.ah(a.h(0,"shadowMap"))),u)){J.bx(J.ah(a.h(0,"shadowMap")),u)
J.bx(J.ah(a.h(0,"shadowMapSize")),u)
J.bx(J.ah(a.h(0,"shadowMatrix")),u)
J.bx(J.ah(a.h(0,"shadowDarkness")),u)
J.bx(J.ah(a.h(0,"shadowBias")),u)}J.an(J.ah(a.h(0,"shadowMap")),y,w.gdH())
J.an(J.ah(a.h(0,"shadowMapSize")),y,w.bO)
J.an(J.ah(a.h(0,"shadowMatrix")),y,w.at)
J.an(J.ah(a.h(0,"shadowDarkness")),y,w.ap)
J.an(J.ah(a.h(0,"shadowBias")),y,w.an)
y=u}}},
ds:function(){var z,y,x
z=this.T
y=this.bi
if(typeof y!=="number")return H.n(y)
if(z>=y){x="WebGLRenderer: trying to use "+z+" texture units while this GPU supports only "+H.l(this.bi)
H.cz(x)}++this.T
return z},
jP:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b.length
for(y=a.f,x=null,w=null,v=null,u=null,t=null,s=null,r=null,q=0;q<z;++q){if(q>=b.length)return H.a(b,q)
p=y.h(0,b[q][1])
if(p==null)continue
if(q>=b.length)return H.a(b,q)
x=b[q][0]
v=J.hF(x)
w=x.gkv()
if(v==="i")J.eh(this.b,p,w)
else if(v==="f")J.i7(this.b,p,w)
else if(v==="v2"){o=J.f(w)
J.i8(this.b,p,o.gm(w),o.gn(w))}else if(v==="v3"){o=J.f(w)
J.cN(this.b,p,o.gm(w),o.gn(w),o.gw(w))}else if(v==="v4"){o=J.f(w)
J.ib(this.b,p,o.gm(w),o.gn(w),o.gw(w),o.gaw(w))}else if(v==="c"){o=J.f(w)
J.cN(this.b,p,o.gag(w),w.gak(),o.gav(w))}else if(v==="iv1")J.ei(this.b,p,w)
else if(v==="iv")J.ia(this.b,p,w)
else if(v==="fv1")J.eg(this.b,p,w)
else if(v==="fv")J.ej(this.b,p,w)
else if(v==="v2v")J.i9(this.b,p,w)
else if(v==="v3v")J.ej(this.b,p,w)
else if(v==="v4v")J.ic(this.b,p,w)
else if(v==="m2")J.id(this.b,p,!1,w)
else if(v==="m3")J.ek(this.b,p,!1,w)
else if(v==="m4")J.bf(this.b,p,!1,w)
else if(v==="m4v")J.bf(this.b,p,!1,w)
else if(v==="t"){u=x.b
t=this.ds()
J.eh(this.b,p,t)
if(u==null)continue
u.gju()
this.dD(u,t)}else if(v==="tv"){n=x.b
o=J.al(n)
m=new Int32Array(H.cr(J.ef(o.b8(n,new S.mf(this)))))
x.d=m
J.ei(this.b,p,m)
r=o.gj(n)
if(typeof r!=="number")return H.n(r)
s=0
for(;s<r;++s){u=J.x(x.b,s)
o=x.d
if(s>=o.length)return H.a(o,s)
t=o[s]
if(u==null)continue
this.dD(u,t)}}}},
dt:function(a,b,c,d){var z,y
z=J.f(c)
y=J.al(a)
y.k(a,b,z.gag(c)*z.gag(c)*d)
y.k(a,b+1,c.gak()*c.b*d)
z=c.c
y.k(a,b+2,z*z*d)},
du:function(a,b,c,d){var z,y
z=J.hE(c)
if(typeof d!=="number")return H.n(d)
y=J.al(a)
y.k(a,b,z*d)
y.k(a,b+1,c.gak()*d)
y.k(a,b+2,c.c*d)},
fO:function(b7,b8){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6
z=this.b3
y=J.x(z.h(0,"directional"),"colors")
x=J.x(z.h(0,"directional"),"positions")
w=J.x(z.h(0,"point"),"colors")
v=J.x(z.h(0,"point"),"positions")
u=J.x(z.h(0,"point"),"distances")
t=J.x(z.h(0,"spot"),"colors")
J.x(z.h(0,"spot"),"positions")
J.x(z.h(0,"spot"),"distances")
J.x(z.h(0,"spot"),"directions")
J.x(z.h(0,"spot"),"anglesCos")
J.x(z.h(0,"spot"),"exponents")
s=J.x(z.h(0,"hemi"),"skyColors")
r=J.x(z.h(0,"hemi"),"groundColors")
J.x(z.h(0,"hemi"),"positions")
q=b8.length
for(p=this.fx,o=J.J(w),n=J.J(v),m=J.J(y),l=J.J(x),k=0,j=0,i=0,h=0,g=null,f=null,e=null,d=null,c=null,b=null,a=null,a0=0,a1=0,a2=0,a3=0,a4=0,a5=0,a6=0,a7=0,a8=0,a9=0,b0=0,b1=0;k<q;++k){if(k>=b8.length)return H.a(b8,k)
b2=b8[k]
b3=J.v(b2)
b4=!!b3.$isaN
b5=!b4
if((!b5||!1)&&b2.geW()||b3.gdl(b2)!==!0)continue
g=b3.gbe(b2)
if(b5)b5=!!b3.$iscb
else b5=!0
if(b5){d=b2.geK()
a=b2.gbg()}if(!!b3.$isem){if(!b2.k3)continue
b3=J.f(g)
if(p){j+=b3.gag(g)*b3.gag(g)
i+=g.gak()*g.b
b3=g.c
h+=b3*b3}else{j+=b3.gag(g)
i+=g.gak()
h+=g.c}}else if(b4){++a4
if(!b2.k3)continue
this.at=b2.dy.aZ()
b3=b2.aT.dy.aZ()
this.as=b3
this.at.dI(b3)
this.at.by(0)
b3=this.at.a
if(b3[0]===0&&b3[1]===0&&b3[2]===0)continue
a8=a0*3
b3=a8+3
m.sj(y,b3)
l.sj(x,b3)
l.k(x,a8,this.at.a[0])
l.k(x,a8+1,this.at.a[1])
l.k(x,a8+2,this.at.a[2])
if(p){if(typeof d!=="number")return d.a3()
this.dt(y,a8,g,d*d)}else this.du(y,a8,g,d);++a0}else if(!!b3.$iscb){++a5
if(!b2.k3)continue
a9=a1*3
b3=a9+3
o.sj(w,b3)
n.sj(v,b3)
if(p){if(typeof d!=="number")return d.a3()
this.dt(w,a9,g,d*d)}else this.du(w,a9,g,d)
b=b2.dy.aZ()
b3=b.a
n.k(v,a9,b3[0])
n.k(v,a9+1,b3[1])
n.k(v,a9+2,b3[2])
if(u==null){u=[]
u.push(0)}for(b3=J.J(u);J.he(b3.gj(u),a1);)b3.u(u,0)
b3.k(u,a1,a);++a1}}q=P.af(m.gj(y),a4*3)
for(k=a0*3;k<q;++k)m.k(y,k,0)
q=P.af(o.gj(w),a5*3)
for(k=a1*3;k<q;++k)o.k(w,k,0)
p=J.J(t)
q=P.af(p.gj(t),a6*3)
for(k=a2*3;k<q;++k)p.k(t,k,0)
p=J.J(s)
o=a7*3
q=P.af(p.gj(s),o)
for(k=a3*3,b6=k;b6<q;++b6)p.k(s,b6,0)
p=J.J(r)
q=P.af(p.gj(r),o)
for(;k<q;++k)p.k(r,k,0)
J.an(z.h(0,"directional"),"length",a0)
J.an(z.h(0,"point"),"length",a1)
J.an(z.h(0,"spot"),"length",a2)
J.an(z.h(0,"hemi"),"length",a3)
J.an(z.h(0,"ambient"),0,j)
J.an(z.h(0,"ambient"),1,i)
J.an(z.h(0,"ambient"),2,h)},
dw:function(a){var z,y,x
z=a.c
y=z===2
x=z===1
if(this.a9!==y){z=this.b
if(y)J.bu(z,2884)
else J.ag(z,2884)
this.a9=y}if(this.ab!==x){z=this.b
if(x)J.bT(z,2304)
else J.bT(z,2305)
this.ab=x}},
c2:function(a){var z
if(this.aj!==a){z=this.b
if(a)J.ag(z,2929)
else J.bu(z,2929)
this.aj=a}},
fI:function(a){if(this.Y!==a){J.cF(this.b,a)
this.Y=a}},
dz:function(a,b,c){var z
if(this.L!==a){z=this.b
if(a)J.ag(z,32823)
else J.bu(z,32823)
this.L=a}if(a)z=this.N!==b||this.Z!==c
else z=!1
if(z){J.hO(this.b,b,c)
this.N=b
this.Z=c}},
cr:function(a,b,c,d){var z
if(a!==this.ac){if(a===0)J.bu(this.b,3042)
else if(a===2){J.ag(this.b,3042)
J.bs(this.b,32774)
J.bt(this.b,770,1)}else if(a===3){J.ag(this.b,3042)
J.bs(this.b,32774)
J.bt(this.b,0,769)}else if(a===4){J.ag(this.b,3042)
J.bs(this.b,32774)
J.bt(this.b,0,768)}else{z=this.b
if(a===5)J.ag(z,3042)
else{J.ag(z,3042)
J.hj(this.b,32774,32774)
J.hk(this.b,770,771,1,771)}}this.ac=a}if(a===5){z=this.a0
if(b==null?z!=null:b!==z){J.bs(this.b,this.aB(b))
this.a0=b}z=this.al
if(c==null?z==null:c===z){z=this.am
z=d==null?z!=null:d!==z}else z=!0
if(z){J.bt(this.b,this.aB(c),this.aB(d))
this.al=c
this.am=d}}else{this.a0=null
this.al=null
this.am=null}},
fG:function(a){return this.cr(a,null,null,null)},
fj:function(a){var z,y
z={}
z.a=null
y=[]
a.G(0,new S.md(z,y))
return C.a.v(y,"\n")},
io:function(c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0,g1,g2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1
z={}
y=[]
if(c2!=null)y.push(c2)
else{y.push(c3)
y.push(c4)}c7.G(0,new S.m9(y))
x=J.v(d5)
w=C.a.jK(y)+"maxDirLights"+e0+"maxPointLights"+e4+"maxSpotLights"+e6+"maxHemiLights"+e1+"maxShadows"+e5+"maxBones"+H.l(d9)+"map"+J.b_(d8)+"envMap"+H.l(d3)+"lightMap"+H.l(d7)+"bumpMap"+H.l(d1)+"normalMap"+H.l(f0)+"specularMap"+H.l(f8)+"vertexColors"+g1+"fog"+x.t(d5)+"useFog"+f9+"fogExp"+d6+"skinning"+f7+"useVertexTexture"+g0+"boneTextureWidth"+d0+"boneTextureHeight"+c9+"morphTargets"+e9+"morphNormals"+e8+"perPixel"+f1+"wrapAround"+g2+"doubleSided"+d2+"flipSided"+d4+"shadowMapEnabled"+f4+"shadowMapType"+f5+"shadowMapDebug"+f3+"shadowMapCascade"+f2+"sizeAttenuation"+f6
v=this.y2
u=v.length
for(t=0;t<u;++t){s=v[t]
if(s.c===w){++s.d
return s}}if(f5===1)r="SHADOWMAP_TYPE_PCF"
else r=f5===2?"SHADOWMAP_TYPE_PCF_SOFT":"SHADOWMAP_TYPE_BASIC"
q=this.fj(c7)
p=J.hq(this.b)
v="precision "+this.c+" float;"
o=this.b6===!0?"#define VERTEX_TEXTURES":""
n=this.fx
m=n?"#define GAMMA_INPUT":""
l=this.fy
k=l?"#define GAMMA_OUTPUT":""
j=this.go
i=j?"#define PHYSICALLY_BASED_SHADING":""
h="#define MAX_DIR_LIGHTS "+e0
g="#define MAX_POINT_LIGHTS "+e4
f="#define MAX_SPOT_LIGHTS "+e6
e="#define MAX_HEMI_LIGHTS "+e1
d="#define MAX_SHADOWS "+e5
c="#define MAX_BONES "+H.l(d9)
b=d8!=null
a=b?"#define USE_MAP":""
a0=g1!==0?"#define USE_COLOR":""
a1=f7?"#define USE_SKINNING":""
a2=g0?"#define BONE_TEXTURE":""
a3="#define N_BONE_PIXEL_X "+C.c.bY(d0,1)
a4="#define N_BONE_PIXEL_Y "+C.c.bY(c9,1)
a5=e9?"#define USE_MORPHTARGETS":""
a6=e8?"#define USE_MORPHNORMALS":""
a7=f1?"#define PHONG_PER_PIXEL":""
a8=g2?"#define WRAP_AROUND":""
a9=d2?"#define DOUBLE_SIDED":""
b0=d4?"#define FLIP_SIDED":""
b1=f4?"#define USE_SHADOWMAP":""
b2=f4?"#define "+r:""
b3=f3?"#define SHADOWMAP_DEBUG":""
b4=f2?"#define SHADOWMAP_CASCADE":""
b5=C.a.v([v,q,o,m,k,i,h,g,f,e,d,c,a,"","","","","",a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,f6?"#define USE_SIZEATTENUATION":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","attribute vec2 uv2;","#ifdef USE_COLOR","attribute vec3 color;","#endif","#ifdef USE_MORPHTARGETS","attribute vec3 morphTarget0;","attribute vec3 morphTarget1;","attribute vec3 morphTarget2;","attribute vec3 morphTarget3;","#ifdef USE_MORPHNORMALS","attribute vec3 morphNormal0;","attribute vec3 morphNormal1;","attribute vec3 morphNormal2;","attribute vec3 morphNormal3;","#else","attribute vec3 morphTarget4;","attribute vec3 morphTarget5;","attribute vec3 morphTarget6;","attribute vec3 morphTarget7;","#endif","#endif","#ifdef USE_SKINNING","attribute vec4 skinIndex;","attribute vec4 skinWeight;","#endif",""],"\n")
v="precision "+this.c+" float;"
o="#define MAX_DIR_LIGHTS "+e0
m="#define MAX_POINT_LIGHTS "+e4
k="#define MAX_SPOT_LIGHTS "+e6
i="#define MAX_HEMI_LIGHTS "+e1
h="#define MAX_SHADOWS "+e5
g=c8!==0?"#define ALPHATEST "+c8:""
n=n?"#define GAMMA_INPUT":""
l=l?"#define GAMMA_OUTPUT":""
j=j?"#define PHYSICALLY_BASED_SHADING":""
f=f9&&d5!=null?"#define USE_FOG":""
x=f9&&!!x.$isc0?"#define FOG_EXP2":""
e=b?"#define USE_MAP":""
d=g1!==0?"#define USE_COLOR":""
c=e7?"#define METAL":""
b=f1?"#define PHONG_PER_PIXEL":""
a=g2?"#define WRAP_AROUND":""
a0=d2?"#define DOUBLE_SIDED":""
a1=d4?"#define FLIP_SIDED":""
a2=f4?"#define USE_SHADOWMAP":""
a3=f4?"#define "+r:""
a4=f3?"#define SHADOWMAP_DEBUG":""
b6=this.dr("fragment",C.a.v([v,"",q,"",o,m,k,i,h,g,n,l,j,f,x,e,"","","","","",d,c,b,a,a0,a1,a2,a3,a4,f2?"#define SHADOWMAP_CASCADE":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;",""],"\n")+H.l(c3))
b7=this.dr("vertex",b5+H.l(c4))
J.dW(this.b,p,b7)
J.dW(this.b,p,b6)
J.hN(this.b,p)
if(J.ec(this.b,p,35714)!==!0){b8=J.ec(this.b,p,35715)
b9=J.hJ(this.b)
P.a5("Could not initialise shader\nVALIDATE_STATUS: "+H.l(b8)+", gl error ["+H.l(b9)+"]")}J.e_(this.b,b6)
J.e_(this.b,b7)
x=this.a_++
v=P.C()
s=new S.l9(x,p,w,1,P.C(),v)
z.a=null
c0=["viewMatrix","modelViewMatrix","projectionMatrix","normalMatrix","modelMatrix","cameraPosition","morphTargetInfluences"]
z.a=c0
if(g0)c0.push("boneTexture")
else c0.push("boneGlobalMatrices")
c5.G(0,new S.ma(z))
this.is(s,z.a)
z.a=["position","normal","uv","uv2","tangent","color","skinIndex","skinWeight","lineDistance"]
for(c1=0;c1<e3;++c1)z.a.push("morphTarget"+c1)
for(c1=0;c1<e2;++c1)z.a.push("morphNormal"+c1)
if(c6!=null)c6.G(0,new S.mb(z))
this.ir(s,z.a)
this.y2.push(s)
this.y1.a.a=this.y2.length
return s},
is:function(a,b){var z,y,x,w,v
z=b.length
for(y=a.f,x=a.b,w=0;w<z;++w){if(w>=b.length)return H.a(b,w)
v=b[w]
y.k(0,v,J.hM(this.b,x,v))}},
ir:function(a,b){var z,y,x,w,v
z=b.length
for(y=a.e,x=a.b,w=0;w<z;++w){if(w>=b.length)return H.a(b,w)
v=b[w]
y.k(0,v,J.hH(this.b,x,v))}},
i3:function(a){var z,y,x,w,v
z=a.split("\n")
y=z.length
for(x=0;x<y;x=w){w=x+1
v=""+w+":"
if(x>=z.length)return H.a(z,x)
v+=H.l(z[x])
if(x>=z.length)return H.a(z,x)
z[x]=v}return C.a.v(z,"\n")},
dr:function(a,b){var z
if(a==="fragment")z=J.dY(this.b,35632)
else z=a==="vertex"?J.dY(this.b,35633):null
J.i_(this.b,z,b)
J.ho(this.b,z)
if(J.hL(this.b,z,35713)!==!0){P.a5(J.hK(this.b,z))
P.a5(this.i3(b))
return}return z},
dE:function(a,b,c){var z,y,x
z=this.b
y=b.f
x=b.r
if(c){J.aL(z,a,10242,this.aB(b.d))
J.aL(this.b,a,10243,this.aB(b.e))
J.aL(this.b,a,10240,this.aB(y))
J.aL(this.b,a,10241,this.aB(x))}else{J.aL(z,a,10242,33071)
J.aL(this.b,a,10243,33071)
J.aL(this.b,a,10240,this.eG(y))
J.aL(this.b,a,10241,this.eG(x))}if(this.b4!=null&&b.y!==15){z=b.z
if(z>1||b.gaH().h(0,"__oldAnisotropy")!=null){J.i6(this.b,a,34046,P.dR(z,this.b5))
b.gaH().k(0,"__oldAnisotropy",z)}}},
dD:function(a,b){var z,y,x,w,v,u,t,s,r
if(a.gcj()){if(a.h(0,"__webglInit")==null){a.k(0,"__webglInit",!0)
a.k(0,"__webglTexture",J.dZ(this.b));++this.y1.a.c}J.dV(this.b,33984+b)
J.bQ(this.b,3553,a.h(0,"__webglTexture"))
z=this.b
J.cK(z,37440,a.dy?1:0)
z=this.b
J.cK(z,37441,a.cy?1:0)
J.cK(this.b,3317,a.fr)
y=a.b
z=J.f(y)
x=z.gF(y)
if(typeof x!=="number")return x.aa()
if((x&x-1)>>>0===0){z=z.gE(y)
if(typeof z!=="number")return z.aa()
w=(z&z-1)>>>0===0}else w=!1
v=this.aB(a.x)
u=this.aB(a.y)
this.dE(3553,a,w)
t=a.fx
z=t.length
if(z>0&&w){for(s=0;s<z;++s){if(s>=t.length)return H.a(t,s)
r=t[s]
J.i1(this.b,3553,s,v,v,u,r)}a.sc0(!1)}else{z=a.b
x=J.v(z)
if(!!x.$isd1)J.i3(this.b,3553,0,v,v,u,z)
else if(!!x.$iscT)J.i2(this.b,3553,0,v,v,u,z)
else if(!!x.$isdw)J.i5(this.b,3553,0,v,v,u,z)}if(a.gc0()&&w)J.e3(this.b,3553)
a.db=!1}else{J.dV(this.b,33984+b)
J.bQ(this.b,3553,a.h(0,"__webglTexture"))}},
fN:function(a,b,c){var z,y
J.cD(this.b,36160,a)
z=this.b
y=b.go
if(y==null){y=P.C()
b.go=y}J.hv(z,36160,36064,c,y.h(0,"__webglTexture"),0)},
fQ:function(a,b){var z,y,x,w
J.dX(this.b,36161,a)
z=b.k4
if(z&&!b.r1){J.cL(this.b,36161,33189,b.id,b.k1)
J.e2(this.b,36160,36096,36161,a)}else{z=z&&b.r1
y=b.id
x=this.b
w=b.k1
if(z){J.cL(x,36161,34041,y,w)
J.e2(this.b,36160,33306,36161,a)}else J.cL(x,36161,32854,y,w)}},
dB:function(a){var z,y,x,w,v,u,t,s,r,q
z=a!=null
if(z&&a.ry==null){y=J.dZ(this.b)
a.gaH().k(0,"__webglTexture",y);++this.y1.a.c
y=a.id
if((y&y-1)===0){y=a.k1
x=(y&y-1)===0}else x=!1
w=this.aB(a.x)
v=this.aB(a.y)
a.ry=J.hp(this.b)
a.x1=J.hr(this.b)
J.bQ(this.b,3553,a.gaH().h(0,"__webglTexture"))
this.dE(3553,a,x)
J.i4(this.b,3553,0,w,a.id,a.k1,0,w,v,null)
this.fN(a.ry,a,3553)
this.fQ(a.x1,a)
if(x)J.e3(this.b,3553)
J.bQ(this.b,3553,null)
J.dX(this.b,36161,null)
J.cD(this.b,36160,null)}if(z){u=a.ry
t=a.id
s=a.k1
r=0
q=0}else{t=this.U
s=this.an
r=this.a1
q=this.ad
u=null}z=this.W
if(u==null?z!=null:u!==z){J.cD(this.b,36160,u)
J.el(this.b,r,q,t,s)
this.W=u}this.ap=t
this.ay=s},
eG:function(a){if(a===3||a===4||a===5)return 9728
return 9729},
aB:function(a){if(a===0)return 10497
if(a===1)return 33071
if(a===2)return 33648
if(a===3)return 9728
if(a===4)return 9984
if(a===5)return 9986
if(a===6)return 9729
if(a===7)return 9985
if(a===8)return 9987
if(a===10)return 5121
if(a===1016)return 32819
if(a===1017)return 32820
if(a===1018)return 33635
if(a===9)return 5120
if(a===11)return 5122
if(a===12)return 5123
if(a===13)return 5124
if(a===14)return 5125
if(a===15)return 5126
if(a===16)return 6406
if(a===17)return 6407
if(a===18)return 6408
if(a===19)return 6409
if(a===20)return 6410
if(a===100)return 32774
if(a===101)return 32778
if(a===102)return 32779
if(a===200)return 0
if(a===201)return 1
if(a===202)return 768
if(a===203)return 769
if(a===204)return 770
if(a===205)return 771
if(a===206)return 772
if(a===207)return 773
if(a===208)return 774
if(a===209)return 775
if(a===210)return 776
if(this.au!=null){if(a===2001)return 33776
if(a===2002)return 33777
if(a===2003)return 33778
if(a===2004)return 33779}return 0},
i5:function(a){var z,y
if(this.aU===!0);z=J.aZ(this.b,36347)
if(typeof z!=="number")return z.aa()
y=C.c.a2(C.b.a2(Math.floor((z-20)/4)))
return y},
i6:function(a){var z,y,x,w,v,u,t
z=a.length
for(y=0,x=0,w=0;y<z;++y){if(y>=a.length)return H.a(a,y)
v=a[y]
u=J.v(v)
t=!!u.$isaN
if((t||!1)&&v.geW())continue
if(t)++x
if(!!u.$iscb)++w}return P.y(["directional",x,"point",w,"spot",0,"hemi",0])},
i7:function(a){var z,y,x,w
z=a.length
for(y=0,x=0;y<z;++y){if(y>=a.length)return H.a(a,y)
w=a[y]
if(!w.gbu())continue
if(!!w.$isaN&&!w.bh)++x}return x},
jA:function(){var z,y,x
try{y=J.hI(this.a,this.r,this.y,this.x,this.Q,this.z)
this.b=y
if(y==null)throw H.d("Error creating WebGL context.")}catch(x){y=H.a6(x)
z=y
P.a5(z)}this.aT=J.aK(this.b,"OES_texture_float")
this.ce=J.aK(this.b,"OES_standard_derivatives")
y=J.aK(this.b,"EXT_texture_filter_anisotropic")
this.b4=y
if(y==null){y=J.aK(this.b,"MOZ_EXT_texture_filter_anisotropic")
this.b4=y}if(y==null)this.b4=J.aK(this.b,"WEBKIT_EXT_texture_filter_anisotropic")
y=this.au
if(y==null){y=J.aK(this.b,"WEBGL_compressed_texture_s3tc")
this.au=y}if(y==null){y=J.aK(this.b,"MOZ_WEBGL_compressed_texture_s3tc")
this.au=y}if(y==null)this.au=J.aK(this.b,"WEBKIT_WEBGL_compressed_texture_s3tc")
if(this.aT==null)P.a5("THREE.WebGLRenderer: Float textures not supported.")
if(this.ce==null)P.a5("THREE.WebGLRenderer: Standard derivatives not supported.")
if(this.b4==null)P.a5("THREE.WebGLRenderer: Anisotropic texture filtering not supported.")
if(this.au==null)P.a5("THREE.WebGLRenderer: S3TC compressed textures not supported.")},
fH:function(){J.bR(this.b,0,0,0,1)
J.hm(this.b,1)
J.hn(this.b,0)
J.ag(this.b,2929)
J.hs(this.b,515)
J.bT(this.b,2305)
J.bS(this.b,1029)
J.ag(this.b,2884)
J.ag(this.b,3042)
J.bs(this.b,32774)
J.bt(this.b,770,771)
var z=this.d
J.bR(this.b,z.a,z.b,z.c,this.e)}},
mc:{
"^":"k:3;a",
$2:function(a,b){var z
if(b===!0){z=this.a
J.ht(z.b,H.dd(a,null,null))
z.a4.k(0,a,!1)}}},
mh:{
"^":"k:0;a,b,c",
$1:function(a){var z=this.a
z.J=null
z.R=null
z.ac=-1
z.aj=-1
z.Y=-1
z.a9=-1
z.ab=-1
z.P=-1
z.S=-1
z.az=!0
a.dd(this.b,this.c,z.ap,z.ay)
z.J=null
z.R=null
z.ac=-1
z.aj=-1
z.Y=-1
z.a9=-1
z.ab=-1
z.P=-1
z.S=-1
z.az=!0}},
mg:{
"^":"k:0;a,b,c",
$1:function(a){this.a.kg(a,this.c,this.b)}},
mi:{
"^":"k:3;a,b",
$2:function(a,b){J.hV(b,this.a.a8++)
this.b.gbC().push(b)}},
m7:{
"^":"k:3;a,b,c",
$2:function(a,b){var z
if(b.gax()==null){z=this.a
z.iO(b)
z.eJ(b,this.b)
z=this.c
z.id=!0
z.rx=!0
z.k2=!0
z.k3=!0
z.k4=!0
z.r1=!0
z.k1=!0}}},
m8:{
"^":"k:3;a,b,c",
$2:function(a,b){this.c.U.push(new S.fA(b,this.b,null,null,!0,0))}},
me:{
"^":"k:3;a",
$2:function(a,b){return this.a.k4.push([b,a])}},
mf:{
"^":"k:0;a",
$1:function(a){return this.a.ds()}},
md:{
"^":"k:3;a,b",
$2:function(a,b){var z
if(!J.a7(b,!1)){z="#define "+H.l(a)+" "+H.l(b)
this.a.a=z
this.b.push(z)}}},
m9:{
"^":"k:3;a",
$2:function(a,b){var z=this.a
z.push(a)
z.push(b)}},
ma:{
"^":"k:3;a",
$2:function(a,b){return this.a.a.push(a)}},
mb:{
"^":"k:3;a",
$2:function(a,b){return this.a.a.push(a)}},
m4:{
"^":"i;a,b",
dd:function(a,b,c,d){return this.b.$4(a,b,c,d)}},
m5:{
"^":"i;a,b,c"},
m6:{
"^":"i;a,b,c,d"},
l9:{
"^":"i;X:a*,b,c,d,e,f"},
oy:{
"^":"i;a,b,c"},
dx:{
"^":"i;X:a$*,b$,eF:c$<,d$,e$,f$,r$,ar:x$@,bC:y$@,ax:z$@,bG:Q$?,dP:ch$?,bF:cx$@,cD:cy$@,db$,dx$,dy$,fr$,fx$,fy$,dN:go$<,dO:id$<,cE:k1$<,k2$,cC:k3$@,dM:k4$<,cz:r1$@,r2$,rx$,cv:ry$@,cw:x1$@,x2$,y1$,y2$,a_$,J$,W$,S$,P$,R$,a8$,cB:T$<,c5:a4$@,a9$,ab$,ac$,cA:a0$<"},
fA:{
"^":"i;a,eV:b<,c,d,e,w:f>",
dd:function(a,b,c,d){return this.e.$4(a,b,c,d)}},
m_:{
"^":"k:26;a",
$1:function(a){J.bw(a,new S.lZ(this.a))}},
lZ:{
"^":"k:3;a",
$2:function(a,b){this.a.k(0,a,J.bd(b))}},
lY:{
"^":"k:3;a",
$2:function(a,b){this.a.k(0,a,J.bd(b))}},
q:{
"^":"i;D:a>,b,c,d",
gq:function(a){return this.b},
sq:function(a,b){if(this.a==="f")b=J.cM(b)
this.c=!0
this.b=b},
gkv:function(){var z,y,x,w,v,u,t,s,r
if(!this.c&&this.d!=null)return this.d
z=this.a
if((z==="fv"||z==="fv1")&&!J.v(this.b).$isc_)this.d=new Float32Array(H.cr(J.cJ(H.dP(this.b),new S.lV()).aq(0)))
else if((z==="iv"||z==="iv1")&&!J.v(this.b).$isjG)this.d=new Int32Array(H.cr(J.cJ(H.dP(this.b),new S.lW()).aq(0)))
else if(z==="v2v"){y=H.cB(this.b,"$isc",[T.a4],"$asc")
z=this.d
if(z==null){z=new Float32Array(H.b(2*J.ao(y)))
this.d=z}H.at(z,"$isc_")
for(x=J.J(y),w=0;w<x.gj(y);++w){v=w*2
u=J.cG(x.h(y,w))
t=z.length
if(v>=t)return H.a(z,v)
z[v]=u
u=v+1
s=J.cH(x.h(y,w))
if(u>=t)return H.a(z,u)
z[u]=s}}else if(z==="v3v"){y=H.cB(this.b,"$isc",[T.e],"$asc")
z=this.d
if(z==null){z=new Float32Array(H.b(3*J.ao(y)))
this.d=z}H.at(z,"$isc_")
for(x=J.J(y),w=0;w<x.gj(y);++w){v=w*3
u=J.cG(x.h(y,w))
t=z.length
if(v>=t)return H.a(z,v)
z[v]=u
u=v+1
s=J.cH(x.h(y,w))
if(u>=t)return H.a(z,u)
z[u]=s
s=v+2
u=J.cI(x.h(y,w))
if(s>=t)return H.a(z,s)
z[s]=u}}else if(z==="v4v"){y=H.cB(this.b,"$isc",[T.R],"$asc")
z=this.d
if(z==null){z=new Float32Array(H.b(4*J.ao(y)))
this.d=z}H.at(z,"$isc_")
for(x=J.J(y),w=0;w<x.gj(y);++w){v=w*4
u=J.cG(x.h(y,w))
t=z.length
if(v>=t)return H.a(z,v)
z[v]=u
u=v+1
s=J.cH(x.h(y,w))
if(u>=t)return H.a(z,u)
z[u]=s
s=v+2
u=J.cI(x.h(y,w))
if(s>=t)return H.a(z,s)
z[s]=u
u=v+3
s=J.hG(x.h(y,w))
if(u>=t)return H.a(z,u)
z[u]=s}}else if(z==="m2")this.d=C.u.gi(H.at(this.b,"$ispC"))
else if(z==="m3")this.d=H.at(this.b,"$isb6").a
else if(z==="m4")this.d=H.at(this.b,"$isr").a
else{x=this.b
if(z==="m4v"){r=[]
J.bw(H.cB(x,"$isc",[T.r],"$asc"),new S.lX(r))
this.d=new Float32Array(H.cr(r))}else return x}return this.d},
af:function(a){var z,y
z=this.b
y=J.v(z)
if(!!y.$isaC||!!y.$isa4||!!y.$ise||!!y.$isR||!!y.$isr||!!y.$isdq)z=y.af(z)
else if(!!y.$isc)z=P.aP(H.dP(z),!0,null)
y=new S.q(this.a,null,!0,null)
y.sq(0,z)
return y}},
lV:{
"^":"k:0;",
$1:function(a){return J.cM(a)}},
lW:{
"^":"k:0;",
$1:function(a){return J.ee(a)}},
lX:{
"^":"k:0;a",
$1:function(a){C.a.bd(this.a,J.ea(a))}},
je:{
"^":"i;be:a>"},
c0:{
"^":"je;c,a,b"},
di:{
"^":"aR;L,N,Z,K,a1,ad,U,an,ap,ay,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a_,J,W,S,P,R,a8,T,a4,a9,ab,ac,a0,al,am,aj,Y",
er:function(a){var z,y,x
if(!!a.$isbG){if(C.a.b7(this.K,a)===-1)this.K.push(a)}else if(!(!!a.$isby||!1))if(C.a.b7(this.Z,a)===-1){this.Z.push(a)
this.a1.push(a)
z=C.a.b7(this.ad,a)
if(z!==-1)C.a.aX(this.ad,z)}for(y=a.e,x=0;x<y.length;++x)this.er(y[x])},
f0:function(a){var z,y,x,w
if(!!a.$isbG){z=C.a.b7(this.K,a)
if(z!==-1)C.a.aX(this.K,z)}else if(!a.$isby){z=C.a.b7(this.Z,a)
if(z!==-1){C.a.aX(this.Z,z)
this.ad.push(a)
y=C.a.b7(this.a1,a)
if(y!==-1)C.a.aX(this.a1,y)}}for(x=a.e,w=0;w<x.length;++w)this.f0(x[w])}},
dq:{
"^":"i;X:a*,ju:b<,c,d,e,f,r,x,D:y>,z,d6:Q*,de:ch*,c0:cx@,cy,cj:db<,dx,dy,fr,fx,fy,go",
af:function(a){var z=S.fj(this.b,this.c,this.d,this.e,this.f,this.r,this.x,this.y,this.z)
z.fx=P.aP(this.fx,!0,null)
z.Q.B(this.gd6(this))
z.ch.B(this.gde(this))
return z},
gaH:function(){var z=this.go
if(z==null){z=P.C()
this.go=z}return z},
h:function(a,b){return this.gaH().h(0,b)},
k:function(a,b,c){this.gaH().k(0,b,c)
return c},
cu:function(a,b,c,d,e,f,g,h,i){var z=$.fk
$.fk=z+1
this.a=z
z=this.c
this.c=z!=null?z:new S.lU()
this.sd6(0,new T.a4(new Float32Array(H.b(2))))
z=new Float32Array(H.b(2))
z[0]=1
z[1]=1
this.sde(0,new T.a4(z))
this.sc0(!0)
this.cy=!1
this.dy=!0
this.db=!1
this.dx=null},
static:{fj:function(a,b,c,d,e,f,g,h,i){var z=new S.dq(null,a,b,c,d,e,f,g,h,i,null,null,null,null,null,null,null,4,[],null,null)
z.cu(a,b,c,d,e,f,g,h,i)
return z}}}}],["","",,T,{
"^":"",
od:function(a,b,c,d,e,f,g){var z,y,x,w,v
z=2*f
y=c-b
x=e-d
w=g-f
v=a.dG().a
v[0]=z/y
v[5]=z/x
v[8]=(c+b)/y
v[9]=(e+d)/x
v[10]=-(g+f)/w
v[11]=-1
v[14]=-(z*g)/w},
oe:function(a,b,c,d,e,f,g){var z,y,x,w
z=c-b
y=e-d
x=g-f
w=a.dG().a
w[0]=2/z
w[5]=2/y
w[10]=-2/x
w[12]=-(c+b)/z
w[13]=-(e+d)/y
w[14]=-(g+f)/x
w[15]=1},
b6:{
"^":"i;i:a>",
fM:function(a,b,c,d,e,f,g,h,i){var z=this.a
z[8]=i
z[7]=h
z[6]=g
z[5]=f
z[4]=e
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
B:function(a){var z,y
z=this.a
y=a.gi(a)
if(8>=y.length)return H.a(y,8)
z[8]=y[8]
y=a.gi(a)
if(7>=y.length)return H.a(y,7)
z[7]=y[7]
y=a.gi(a)
if(6>=y.length)return H.a(y,6)
z[6]=y[6]
y=a.gi(a)
if(5>=y.length)return H.a(y,5)
z[5]=y[5]
y=a.gi(a)
if(4>=y.length)return H.a(y,4)
z[4]=y[4]
y=a.gi(a)
if(3>=y.length)return H.a(y,3)
z[3]=y[3]
y=a.gi(a)
if(2>=y.length)return H.a(y,2)
z[2]=y[2]
y=a.gi(a)
if(1>=y.length)return H.a(y,1)
z[1]=y[1]
y=a.gi(a)
if(0>=y.length)return H.a(y,0)
z[0]=y[0]
return this},
t:function(a){return"[0] "+this.aY(0).t(0)+"\n[1] "+this.aY(1).t(0)+"\n[2] "+this.aY(2).t(0)+"\n"},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=9)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.a
if(b>=9)return H.a(z,b)
z[b]=c},
aY:function(a){var z,y,x
z=new Float32Array(H.b(3))
y=this.a
if(a>=9)return H.a(y,a)
z[0]=y[a]
x=3+a
if(x>=9)return H.a(y,x)
z[1]=y[x]
x=6+a
if(x>=9)return H.a(y,x)
z[2]=y[x]
return new T.e(z)},
af:function(a){var z=new T.b6(new Float32Array(H.b(9)))
z.B(this)
return z},
p:function(a,b){var z,y,x
z=new Float32Array(H.b(9))
y=this.a
x=J.f(b)
z[0]=C.b.p(y[0],x.gi(b).h(0,0))
z[1]=C.b.p(y[1],x.gi(b).h(0,1))
z[2]=C.b.p(y[2],x.gi(b).h(0,2))
z[3]=C.b.p(y[3],x.gi(b).h(0,3))
z[4]=C.b.p(y[4],x.gi(b).h(0,4))
z[5]=C.b.p(y[5],x.gi(b).h(0,5))
z[6]=C.b.p(y[6],x.gi(b).h(0,6))
z[7]=C.b.p(y[7],x.gi(b).h(0,7))
z[8]=C.b.p(y[8],x.gi(b).h(0,8))
return new T.b6(z)},
aa:function(a,b){var z,y,x,w,v
z=new Float32Array(H.b(9))
y=this.a
x=y[0]
w=J.f(b)
v=w.gi(b)
if(0>=v.length)return H.a(v,0)
v=v[0]
if(typeof v!=="number")return H.n(v)
z[0]=x-v
v=y[1]
x=w.gi(b)
if(1>=x.length)return H.a(x,1)
x=x[1]
if(typeof x!=="number")return H.n(x)
z[1]=v-x
x=y[2]
v=w.gi(b)
if(2>=v.length)return H.a(v,2)
v=v[2]
if(typeof v!=="number")return H.n(v)
z[2]=x-v
v=y[3]
x=w.gi(b)
if(3>=x.length)return H.a(x,3)
x=x[3]
if(typeof x!=="number")return H.n(x)
z[3]=v-x
x=y[4]
v=w.gi(b)
if(4>=v.length)return H.a(v,4)
v=v[4]
if(typeof v!=="number")return H.n(v)
z[4]=x-v
v=y[5]
x=w.gi(b)
if(5>=x.length)return H.a(x,5)
x=x[5]
if(typeof x!=="number")return H.n(x)
z[5]=v-x
x=y[6]
v=w.gi(b)
if(6>=v.length)return H.a(v,6)
v=v[6]
if(typeof v!=="number")return H.n(v)
z[6]=x-v
v=y[7]
x=w.gi(b)
if(7>=x.length)return H.a(x,7)
x=x[7]
if(typeof x!=="number")return H.n(x)
z[7]=v-x
y=y[8]
w=w.gi(b)
if(8>=w.length)return H.a(w,8)
w=w[8]
if(typeof w!=="number")return H.n(w)
z[8]=y-w
return new T.b6(z)},
aN:function(a){var z,y
z=new Float32Array(H.b(9))
y=this.a
z[0]=-y[0]
z[1]=-y[1]
z[2]=-y[2]
return new T.b6(z)},
fb:function(){var z,y
z=this.a
y=z[3]
z[3]=z[1]
z[1]=y
y=z[6]
z[6]=z[2]
z[2]=y
y=z[7]
z[7]=z[5]
z[5]=y
return this},
u:function(a,b){var z=this.a
z[0]=C.b.p(z[0],C.c.gi(b).h(0,0))
z[1]=C.b.p(z[1],C.c.gi(b).h(0,1))
z[2]=C.b.p(z[2],C.c.gi(b).h(0,2))
z[3]=C.b.p(z[3],C.c.gi(b).h(0,3))
z[4]=C.b.p(z[4],C.c.gi(b).h(0,4))
z[5]=C.b.p(z[5],C.c.gi(b).h(0,5))
z[6]=C.b.p(z[6],C.c.gi(b).h(0,6))
z[7]=C.b.p(z[7],C.c.gi(b).h(0,7))
z[8]=C.b.p(z[8],C.c.gi(b).h(0,8))
return this}},
r:{
"^":"i;i:a>",
dF:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var z=this.a
z[15]=p
z[14]=o
z[13]=n
z[12]=m
z[11]=l
z[10]=k
z[9]=j
z[8]=i
z[7]=h
z[6]=g
z[5]=f
z[4]=e
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
B:function(a){var z,y
z=this.a
y=a.gi(a)
if(15>=y.length)return H.a(y,15)
z[15]=y[15]
y=a.gi(a)
if(14>=y.length)return H.a(y,14)
z[14]=y[14]
y=a.gi(a)
if(13>=y.length)return H.a(y,13)
z[13]=y[13]
y=a.gi(a)
if(12>=y.length)return H.a(y,12)
z[12]=y[12]
y=a.gi(a)
if(11>=y.length)return H.a(y,11)
z[11]=y[11]
y=a.gi(a)
if(10>=y.length)return H.a(y,10)
z[10]=y[10]
y=a.gi(a)
if(9>=y.length)return H.a(y,9)
z[9]=y[9]
y=a.gi(a)
if(8>=y.length)return H.a(y,8)
z[8]=y[8]
y=a.gi(a)
if(7>=y.length)return H.a(y,7)
z[7]=y[7]
y=a.gi(a)
if(6>=y.length)return H.a(y,6)
z[6]=y[6]
y=a.gi(a)
if(5>=y.length)return H.a(y,5)
z[5]=y[5]
y=a.gi(a)
if(4>=y.length)return H.a(y,4)
z[4]=y[4]
y=a.gi(a)
if(3>=y.length)return H.a(y,3)
z[3]=y[3]
y=a.gi(a)
if(2>=y.length)return H.a(y,2)
z[2]=y[2]
y=a.gi(a)
if(1>=y.length)return H.a(y,1)
z[1]=y[1]
y=a.gi(a)
if(0>=y.length)return H.a(y,0)
z[0]=y[0]
return this},
t:function(a){return"[0] "+this.aY(0).t(0)+"\n[1] "+this.aY(1).t(0)+"\n[2] "+this.aY(2).t(0)+"\n[3] "+this.aY(3).t(0)+"\n"},
gj3:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.a
if(b>=16)return H.a(z,b)
z[b]=c},
aY:function(a){var z,y,x
z=new Float32Array(H.b(4))
y=this.a
if(a>=16)return H.a(y,a)
z[0]=y[a]
x=4+a
if(x>=16)return H.a(y,x)
z[1]=y[x]
x=8+a
if(x>=16)return H.a(y,x)
z[2]=y[x]
x=12+a
if(x>=16)return H.a(y,x)
z[3]=y[x]
return new T.R(z)},
co:function(a){var z,y,x,w
z=new Float32Array(H.b(4))
y=a*4
x=this.a
w=y+3
if(w>=16)return H.a(x,w)
z[3]=x[w]
w=y+2
if(w>=16)return H.a(x,w)
z[2]=x[w]
w=y+1
if(w>=16)return H.a(x,w)
z[1]=x[w]
if(y>=16)return H.a(x,y)
z[0]=x[y]
return new T.R(z)},
af:function(a){var z=new T.r(new Float32Array(H.b(16)))
z.B(this)
return z},
a3:function(a,b){var z,y,x
if(!!b.$isR){z=new Float32Array(H.b(4))
y=this.a
x=b.a
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
return new T.R(z)}if(!!b.$ise){z=new Float32Array(H.b(3))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]
return new T.e(z)}if(4===b.gj3()){z=new Float32Array(H.b(16))
y=this.a
x=b.a
z[0]=y[0]*x[0]+y[4]*x[1]+y[8]*x[2]+y[12]*x[3]
z[4]=y[0]*x[4]+y[4]*x[5]+y[8]*x[6]+y[12]*x[7]
z[8]=y[0]*x[8]+y[4]*x[9]+y[8]*x[10]+y[12]*x[11]
z[12]=y[0]*x[12]+y[4]*x[13]+y[8]*x[14]+y[12]*x[15]
z[1]=y[1]*x[0]+y[5]*x[1]+y[9]*x[2]+y[13]*x[3]
z[5]=y[1]*x[4]+y[5]*x[5]+y[9]*x[6]+y[13]*x[7]
z[9]=y[1]*x[8]+y[5]*x[9]+y[9]*x[10]+y[13]*x[11]
z[13]=y[1]*x[12]+y[5]*x[13]+y[9]*x[14]+y[13]*x[15]
z[2]=y[2]*x[0]+y[6]*x[1]+y[10]*x[2]+y[14]*x[3]
z[6]=y[2]*x[4]+y[6]*x[5]+y[10]*x[6]+y[14]*x[7]
z[10]=y[2]*x[8]+y[6]*x[9]+y[10]*x[10]+y[14]*x[11]
z[14]=y[2]*x[12]+y[6]*x[13]+y[10]*x[14]+y[14]*x[15]
z[3]=y[3]*x[0]+y[7]*x[1]+y[11]*x[2]+y[15]*x[3]
z[7]=y[3]*x[4]+y[7]*x[5]+y[11]*x[6]+y[15]*x[7]
z[11]=y[3]*x[8]+y[7]*x[9]+y[11]*x[10]+y[15]*x[11]
z[15]=y[3]*x[12]+y[7]*x[13]+y[11]*x[14]+y[15]*x[15]
return new T.r(z)}throw H.d(P.ax(b))},
p:function(a,b){var z,y,x
z=new Float32Array(H.b(16))
y=this.a
x=J.f(b)
z[0]=C.b.p(y[0],x.gi(b).h(0,0))
z[1]=C.b.p(y[1],x.gi(b).h(0,1))
z[2]=C.b.p(y[2],x.gi(b).h(0,2))
z[3]=C.b.p(y[3],x.gi(b).h(0,3))
z[4]=C.b.p(y[4],x.gi(b).h(0,4))
z[5]=C.b.p(y[5],x.gi(b).h(0,5))
z[6]=C.b.p(y[6],x.gi(b).h(0,6))
z[7]=C.b.p(y[7],x.gi(b).h(0,7))
z[8]=C.b.p(y[8],x.gi(b).h(0,8))
z[9]=C.b.p(y[9],x.gi(b).h(0,9))
z[10]=C.b.p(y[10],x.gi(b).h(0,10))
z[11]=C.b.p(y[11],x.gi(b).h(0,11))
z[12]=C.b.p(y[12],x.gi(b).h(0,12))
z[13]=C.b.p(y[13],x.gi(b).h(0,13))
z[14]=C.b.p(y[14],x.gi(b).h(0,14))
z[15]=C.b.p(y[15],x.gi(b).h(0,15))
return new T.r(z)},
aa:function(a,b){var z,y,x,w,v
z=new Float32Array(H.b(16))
y=this.a
x=y[0]
w=J.f(b)
v=w.gi(b)
if(0>=v.length)return H.a(v,0)
v=v[0]
if(typeof v!=="number")return H.n(v)
z[0]=x-v
v=y[1]
x=w.gi(b)
if(1>=x.length)return H.a(x,1)
x=x[1]
if(typeof x!=="number")return H.n(x)
z[1]=v-x
x=y[2]
v=w.gi(b)
if(2>=v.length)return H.a(v,2)
v=v[2]
if(typeof v!=="number")return H.n(v)
z[2]=x-v
v=y[3]
x=w.gi(b)
if(3>=x.length)return H.a(x,3)
x=x[3]
if(typeof x!=="number")return H.n(x)
z[3]=v-x
x=y[4]
v=w.gi(b)
if(4>=v.length)return H.a(v,4)
v=v[4]
if(typeof v!=="number")return H.n(v)
z[4]=x-v
v=y[5]
x=w.gi(b)
if(5>=x.length)return H.a(x,5)
x=x[5]
if(typeof x!=="number")return H.n(x)
z[5]=v-x
x=y[6]
v=w.gi(b)
if(6>=v.length)return H.a(v,6)
v=v[6]
if(typeof v!=="number")return H.n(v)
z[6]=x-v
v=y[7]
x=w.gi(b)
if(7>=x.length)return H.a(x,7)
x=x[7]
if(typeof x!=="number")return H.n(x)
z[7]=v-x
x=y[8]
v=w.gi(b)
if(8>=v.length)return H.a(v,8)
v=v[8]
if(typeof v!=="number")return H.n(v)
z[8]=x-v
v=y[9]
x=w.gi(b)
if(9>=x.length)return H.a(x,9)
x=x[9]
if(typeof x!=="number")return H.n(x)
z[9]=v-x
x=y[10]
v=w.gi(b)
if(10>=v.length)return H.a(v,10)
v=v[10]
if(typeof v!=="number")return H.n(v)
z[10]=x-v
v=y[11]
x=w.gi(b)
if(11>=x.length)return H.a(x,11)
x=x[11]
if(typeof x!=="number")return H.n(x)
z[11]=v-x
x=y[12]
v=w.gi(b)
if(12>=v.length)return H.a(v,12)
v=v[12]
if(typeof v!=="number")return H.n(v)
z[12]=x-v
v=y[13]
x=w.gi(b)
if(13>=x.length)return H.a(x,13)
x=x[13]
if(typeof x!=="number")return H.n(x)
z[13]=v-x
x=y[14]
v=w.gi(b)
if(14>=v.length)return H.a(v,14)
v=v[14]
if(typeof v!=="number")return H.n(v)
z[14]=x-v
y=y[15]
w=w.gi(b)
if(15>=w.length)return H.a(w,15)
w=w[15]
if(typeof w!=="number")return H.n(w)
z[15]=y-w
return new T.r(z)},
aN:function(a){var z,y
z=new Float32Array(H.b(16))
y=this.a
z[0]=-y[0]
z[1]=-y[1]
z[2]=-y[2]
z[3]=-y[3]
return new T.r(z)},
dG:function(){var z=this.a
z[0]=0
z[1]=0
z[2]=0
z[3]=0
z[4]=0
z[5]=0
z[6]=0
z[7]=0
z[8]=0
z[9]=0
z[10]=0
z[11]=0
z[12]=0
z[13]=0
z[14]=0
z[15]=0
return this},
A:function(){var z=this.a
z[0]=1
z[1]=0
z[2]=0
z[3]=0
z[4]=0
z[5]=1
z[6]=0
z[7]=0
z[8]=0
z[9]=0
z[10]=1
z[11]=0
z[12]=0
z[13]=0
z[14]=0
z[15]=1
return this},
aZ:function(){var z,y,x,w
z=this.a
y=z[14]
x=z[13]
w=z[12]
z=new T.e(new Float32Array(H.b(3)))
z.l(w,x,y)
return z},
d0:function(a7){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
z=a7.gi(a7)
if(0>=z.length)return H.a(z,0)
y=z[0]
z=a7.gi(a7)
if(1>=z.length)return H.a(z,1)
x=z[1]
z=a7.gi(a7)
if(2>=z.length)return H.a(z,2)
w=z[2]
z=a7.gi(a7)
if(3>=z.length)return H.a(z,3)
v=z[3]
z=a7.gi(a7)
if(4>=z.length)return H.a(z,4)
u=z[4]
z=a7.gi(a7)
if(5>=z.length)return H.a(z,5)
t=z[5]
z=a7.gi(a7)
if(6>=z.length)return H.a(z,6)
s=z[6]
z=a7.gi(a7)
if(7>=z.length)return H.a(z,7)
r=z[7]
z=a7.gi(a7)
if(8>=z.length)return H.a(z,8)
q=z[8]
z=a7.gi(a7)
if(9>=z.length)return H.a(z,9)
p=z[9]
z=a7.gi(a7)
if(10>=z.length)return H.a(z,10)
o=z[10]
z=a7.gi(a7)
if(11>=z.length)return H.a(z,11)
n=z[11]
z=a7.gi(a7)
if(12>=z.length)return H.a(z,12)
m=z[12]
z=a7.gi(a7)
if(13>=z.length)return H.a(z,13)
l=z[13]
z=a7.gi(a7)
if(14>=z.length)return H.a(z,14)
k=z[14]
z=a7.gi(a7)
if(15>=z.length)return H.a(z,15)
j=z[15]
i=y*t-x*u
h=y*s-w*u
g=y*r-v*u
f=x*s-w*t
e=x*r-v*t
d=w*r-v*s
c=q*l-p*m
b=q*k-o*m
a=q*j-n*m
a0=p*k-o*l
a1=p*j-n*l
a2=o*j-n*k
a3=i*a2-h*a1+g*a0+f*a-e*b+d*c
if(a3===0){this.B(a7)
return 0}a4=1/a3
z=this.a
z[0]=(t*a2-s*a1+r*a0)*a4
z[1]=(-x*a2+w*a1-v*a0)*a4
z[2]=(l*d-k*e+j*f)*a4
z[3]=(-p*d+o*e-n*f)*a4
a5=-u
z[4]=(a5*a2+s*a-r*b)*a4
z[5]=(y*a2-w*a+v*b)*a4
a6=-m
z[6]=(a6*d+k*g-j*h)*a4
z[7]=(q*d-o*g+n*h)*a4
z[8]=(u*a1-t*a+r*c)*a4
z[9]=(-y*a1+x*a-v*c)*a4
z[10]=(m*e-l*g+j*i)*a4
z[11]=(-q*e+p*g-n*i)*a4
z[12]=(a5*a0+t*b-s*c)*a4
z[13]=(y*a0-x*b+w*c)*a4
z[14]=(a6*f+l*h-k*i)*a4
z[15]=(q*f-p*h+o*i)*a4
return a3},
u:function(a,b){var z=this.a
z[0]=C.b.p(z[0],C.c.gi(b).h(0,0))
z[1]=C.b.p(z[1],C.c.gi(b).h(0,1))
z[2]=C.b.p(z[2],C.c.gi(b).h(0,2))
z[3]=C.b.p(z[3],C.c.gi(b).h(0,3))
z[4]=C.b.p(z[4],C.c.gi(b).h(0,4))
z[5]=C.b.p(z[5],C.c.gi(b).h(0,5))
z[6]=C.b.p(z[6],C.c.gi(b).h(0,6))
z[7]=C.b.p(z[7],C.c.gi(b).h(0,7))
z[8]=C.b.p(z[8],C.c.gi(b).h(0,8))
z[9]=C.b.p(z[9],C.c.gi(b).h(0,9))
z[10]=C.b.p(z[10],C.c.gi(b).h(0,10))
z[11]=C.b.p(z[11],C.c.gi(b).h(0,11))
z[12]=C.b.p(z[12],C.c.gi(b).h(0,12))
z[13]=C.b.p(z[13],C.c.gi(b).h(0,13))
z[14]=C.b.p(z[14],C.c.gi(b).h(0,14))
z[15]=C.b.p(z[15],C.c.gi(b).h(0,15))
return this},
bk:function(a8,a9){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
z=this.a
y=z[0]
x=z[4]
w=z[8]
v=z[12]
u=z[1]
t=z[5]
s=z[9]
r=z[13]
q=z[2]
p=z[6]
o=z[10]
n=z[14]
m=z[3]
l=z[7]
k=z[11]
j=z[15]
i=a9.a
h=i[0]
g=i[4]
f=i[8]
e=i[12]
d=i[1]
c=i[5]
b=i[9]
a=i[13]
a0=i[2]
a1=i[6]
a2=i[10]
a3=i[14]
a4=i[3]
a5=i[7]
a6=i[11]
a7=i[15]
z[0]=y*h+x*d+w*a0+v*a4
z[4]=y*g+x*c+w*a1+v*a5
z[8]=y*f+x*b+w*a2+v*a6
z[12]=y*e+x*a+w*a3+v*a7
z[1]=u*h+t*d+s*a0+r*a4
z[5]=u*g+t*c+s*a1+r*a5
z[9]=u*f+t*b+s*a2+r*a6
z[13]=u*e+t*a+s*a3+r*a7
z[2]=q*h+p*d+o*a0+n*a4
z[6]=q*g+p*c+o*a1+n*a5
z[10]=q*f+p*b+o*a2+n*a6
z[14]=q*e+p*a+o*a3+n*a7
z[3]=m*h+l*d+k*a0+j*a4
z[7]=m*g+l*c+k*a1+j*a5
z[11]=m*f+l*b+k*a2+j*a6
z[15]=m*e+l*a+k*a3+j*a7
return this}},
aE:{
"^":"i;i:a>",
gm:function(a){return this.a[0]},
gn:function(a){return this.a[1]},
gw:function(a){return this.a[2]},
gaw:function(a){return this.a[3]},
af:function(a){return T.f7(this)},
gbU:function(){var z,y,x,w,v
z=this.a
y=z[0]
x=z[1]
w=z[2]
v=z[3]
return y*y+x*x+w*w+v*v},
gj:function(a){return Math.sqrt(H.u(this.gbU()))},
p:function(a,b){var z,y
z=this.a
y=J.f(b)
return T.df(C.b.p(z[0],y.gi(b).h(0,0)),C.b.p(z[1],y.gi(b).h(0,1)),C.b.p(z[2],y.gi(b).h(0,2)),C.b.p(z[3],y.gi(b).h(0,3)))},
aa:function(a,b){var z,y,x,w,v,u,t,s
z=this.a
y=z[0]
x=J.f(b)
w=x.gi(b)
if(0>=w.length)return H.a(w,0)
w=w[0]
if(typeof w!=="number")return H.n(w)
v=z[1]
u=x.gi(b)
if(1>=u.length)return H.a(u,1)
u=u[1]
if(typeof u!=="number")return H.n(u)
t=z[2]
s=x.gi(b)
if(2>=s.length)return H.a(s,2)
s=s[2]
if(typeof s!=="number")return H.n(s)
z=z[3]
x=x.gi(b)
if(3>=x.length)return H.a(x,3)
x=x[3]
if(typeof x!=="number")return H.n(x)
return T.df(y-w,v-u,t-s,z-x)},
aN:function(a){var z=this.a
return T.df(-z[0],-z[1],-z[2],-z[3])},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.a
if(b>=4)return H.a(z,b)
z[b]=c},
t:function(a){var z=this.a
return H.l(z[0])+", "+H.l(z[1])+", "+H.l(z[2])+" @ "+H.l(z[3])},
hd:function(a,b,c,d){var z=this.a
z[0]=a
z[1]=b
z[2]=c
z[3]=d},
he:function(a){var z,y
z=this.a
y=a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
z[3]=y[3]},
hf:function(){this.a[3]=1},
static:{df:function(a,b,c,d){var z=new T.aE(new Float32Array(H.b(4)))
z.hd(a,b,c,d)
return z},f7:function(a){var z=new T.aE(new Float32Array(H.b(4)))
z.he(a)
return z},aF:function(){var z=new T.aE(new Float32Array(H.b(4)))
z.hf()
return z}}},
a4:{
"^":"i;i:a>",
B:function(a){var z,y
z=this.a
y=a.gi(a)
if(1>=y.length)return H.a(y,1)
z[1]=y[1]
y=a.gi(a)
if(0>=y.length)return H.a(y,0)
z[0]=y[0]
return this},
t:function(a){var z=this.a
return"["+H.l(z[0])+","+H.l(z[1])+"]"},
aN:function(a){var z,y,x
z=this.a
y=z[0]
z=z[1]
x=new Float32Array(H.b(2))
x[0]=-y
x[1]=-z
return new T.a4(x)},
aa:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
x=J.f(b)
w=x.gi(b)
if(0>=w.length)return H.a(w,0)
w=w[0]
if(typeof w!=="number")return H.n(w)
z=z[1]
x=x.gi(b)
if(1>=x.length)return H.a(x,1)
x=x[1]
if(typeof x!=="number")return H.n(x)
v=new Float32Array(H.b(2))
v[0]=y-w
v[1]=z-x
return new T.a4(v)},
p:function(a,b){var z,y,x
z=this.a
y=J.f(b)
x=C.b.p(z[0],y.gi(b).h(0,0))
y=C.b.p(z[1],y.gi(b).h(0,1))
z=new Float32Array(H.b(2))
z[0]=x
z[1]=y
return new T.a4(z)},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=2)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.a
if(b>=2)return H.a(z,b)
z[b]=c},
gj:function(a){var z,y
z=this.a
y=z[0]
z=z[1]
return Math.sqrt(H.u(y*y+z*z))},
gbU:function(){var z,y
z=this.a
y=z[0]
z=z[1]
return y*y+z*z},
aJ:function(a){var z,y,x,w
z=this.a
y=z[0]
x=J.f(a)
w=x.gi(a)
if(0>=w.length)return H.a(w,0)
w=w[0]
if(typeof w!=="number")return H.n(w)
z=z[1]
x=x.gi(a)
if(1>=x.length)return H.a(x,1)
x=x[1]
if(typeof x!=="number")return H.n(x)
return y*w+z*x},
u:function(a,b){var z=this.a
z[0]=C.b.p(z[0],C.c.gi(b).h(0,0))
z[1]=C.b.p(z[1],C.c.gi(b).h(0,1))
return this},
af:function(a){var z=new T.a4(new Float32Array(H.b(2)))
z.B(this)
return z},
gag:function(a){return this.a[0]},
gak:function(){return this.a[1]},
gm:function(a){return this.a[0]},
gn:function(a){return this.a[1]}},
e:{
"^":"i;i:a>",
l:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c
return this},
B:function(a){var z,y,x
z=this.a
y=J.f(a)
x=y.gi(a)
if(0>=x.length)return H.a(x,0)
z[0]=x[0]
x=y.gi(a)
if(1>=x.length)return H.a(x,1)
z[1]=x[1]
y=y.gi(a)
if(2>=y.length)return H.a(y,2)
z[2]=y[2]
return this},
t:function(a){var z=this.a
return"["+H.l(z[0])+","+H.l(z[1])+","+H.l(z[2])+"]"},
aN:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
z=z[2]
w=new T.e(new Float32Array(H.b(3)))
w.l(-y,-x,-z)
return w},
aa:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z[0]
x=J.f(b)
w=x.gi(b)
if(0>=w.length)return H.a(w,0)
w=w[0]
if(typeof w!=="number")return H.n(w)
v=z[1]
u=x.gi(b)
if(1>=u.length)return H.a(u,1)
u=u[1]
if(typeof u!=="number")return H.n(u)
z=z[2]
x=x.gi(b)
if(2>=x.length)return H.a(x,2)
x=x[2]
if(typeof x!=="number")return H.n(x)
t=new T.e(new Float32Array(H.b(3)))
t.l(y-w,v-u,z-x)
return t},
p:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z[0]
x=J.ea(b)[0]
w=z[1]
v=b.a
u=v[1]
z=z[2]
v=v[2]
t=new T.e(new Float32Array(H.b(3)))
t.l(y+x,w+u,z+v)
return t},
a3:function(a,b){var z,y,x,w
z=this.a
y=z[0]
if(typeof b!=="number")return H.n(b)
x=z[1]
z=z[2]
w=new T.e(new Float32Array(H.b(3)))
w.l(y*b,x*b,z*b)
return w},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.a
if(b>=3)return H.a(z,b)
z[b]=c},
gj:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(H.u(y*y+x*x+z*z))},
gbU:function(){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return y*y+x*x+z*z},
by:function(a){var z,y
z=this.gj(this)
if(z===0)return this
z=1/z
y=this.a
y[0]=y[0]*z
y[1]=y[1]*z
y[2]=y[2]*z
return this},
aJ:function(a){var z,y,x,w,v,u
z=this.a
y=z[0]
x=J.f(a)
w=x.gi(a)
if(0>=w.length)return H.a(w,0)
w=w[0]
if(typeof w!=="number")return H.n(w)
v=z[1]
u=x.gi(a)
if(1>=u.length)return H.a(u,1)
u=u[1]
if(typeof u!=="number")return H.n(u)
z=z[2]
x=x.gi(a)
if(2>=x.length)return H.a(x,2)
x=x[2]
if(typeof x!=="number")return H.n(x)
return y*w+v*u+z*x},
d1:function(a){var z,y,x,w,v,u,t
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=a.a
v=z[0]
u=z[1]
t=z[2]
z=new T.e(new Float32Array(H.b(3)))
z.l(x*t-w*u,w*v-y*t,y*u-x*v)
return z},
bs:function(a){var z,y,x,w,v,u,t,s,r
z=this.a
y=z[0]
x=z[1]
w=z[2]
v=a.gi(a)
if(3>=v.length)return H.a(v,3)
v=v[3]
u=a.gi(a)
if(7>=u.length)return H.a(u,7)
u=u[7]
t=a.gi(a)
if(11>=t.length)return H.a(t,11)
t=t[11]
s=a.gi(a)
if(15>=s.length)return H.a(s,15)
r=1/(v*y+u*x+t*w+s[15])
s=a.gi(a)
if(0>=s.length)return H.a(s,0)
s=s[0]
t=a.gi(a)
if(4>=t.length)return H.a(t,4)
t=t[4]
u=a.gi(a)
if(8>=u.length)return H.a(u,8)
u=u[8]
v=a.gi(a)
if(12>=v.length)return H.a(v,12)
z[0]=(s*y+t*x+u*w+v[12])*r
v=a.gi(a)
if(1>=v.length)return H.a(v,1)
v=v[1]
u=a.gi(a)
if(5>=u.length)return H.a(u,5)
u=u[5]
t=a.gi(a)
if(9>=t.length)return H.a(t,9)
t=t[9]
s=a.gi(a)
if(13>=s.length)return H.a(s,13)
z[1]=(v*y+u*x+t*w+s[13])*r
s=a.gi(a)
if(2>=s.length)return H.a(s,2)
s=s[2]
t=a.gi(a)
if(6>=t.length)return H.a(t,6)
t=t[6]
u=a.gi(a)
if(10>=u.length)return H.a(u,10)
u=u[10]
v=a.gi(a)
if(14>=v.length)return H.a(v,14)
z[2]=(s*y+t*x+u*w+v[14])*r
return this},
u:function(a,b){var z,y,x,w
z=this.a
y=z[0]
x=J.f(b)
w=x.gi(b)
if(0>=w.length)return H.a(w,0)
w=w[0]
if(typeof w!=="number")return H.n(w)
z[0]=y+w
w=z[1]
y=x.gi(b)
if(1>=y.length)return H.a(y,1)
y=y[1]
if(typeof y!=="number")return H.n(y)
z[1]=w+y
y=z[2]
x=x.gi(b)
if(2>=x.length)return H.a(x,2)
x=x[2]
if(typeof x!=="number")return H.n(x)
z[2]=y+x
return this},
dI:function(a){var z,y
z=this.a
y=a.a
z[0]=z[0]-y[0]
z[1]=z[1]-y[1]
z[2]=z[2]-y[2]
return this},
bk:function(a,b){var z,y
z=this.a
y=b.a
z[0]=z[0]*y[0]
z[1]=z[1]*y[1]
z[2]=z[2]*y[2]
return this},
bD:function(a,b){var z=this.a
z[2]=z[2]*b
z[1]=z[1]*b
z[0]=z[0]*b
return this},
af:function(a){var z=new T.e(new Float32Array(H.b(3)))
z.B(this)
return z},
gag:function(a){return this.a[0]},
gak:function(){return this.a[1]},
gav:function(a){return this.a[2]},
gm:function(a){return this.a[0]},
gn:function(a){return this.a[1]},
gw:function(a){return this.a[2]},
static:{m2:function(){return new T.e(new Float32Array(H.b(3)))}}},
R:{
"^":"i;i:a>",
a7:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
B:function(a){var z,y
z=this.a
y=a.gi(a)
if(3>=y.length)return H.a(y,3)
z[3]=y[3]
y=a.gi(a)
if(2>=y.length)return H.a(y,2)
z[2]=y[2]
y=a.gi(a)
if(1>=y.length)return H.a(y,1)
z[1]=y[1]
y=a.gi(a)
if(0>=y.length)return H.a(y,0)
z[0]=y[0]
return this},
t:function(a){var z=this.a
return H.l(z[0])+","+H.l(z[1])+","+H.l(z[2])+","+H.l(z[3])},
aN:function(a){var z,y,x,w,v
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
v=new T.R(new Float32Array(H.b(4)))
v.a7(-y,-x,-w,-z)
return v},
aa:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.a
y=z[0]
x=J.f(b)
w=x.gi(b)
if(0>=w.length)return H.a(w,0)
w=w[0]
if(typeof w!=="number")return H.n(w)
v=z[1]
u=x.gi(b)
if(1>=u.length)return H.a(u,1)
u=u[1]
if(typeof u!=="number")return H.n(u)
t=z[2]
s=x.gi(b)
if(2>=s.length)return H.a(s,2)
s=s[2]
if(typeof s!=="number")return H.n(s)
z=z[3]
x=x.gi(b)
if(3>=x.length)return H.a(x,3)
x=x[3]
if(typeof x!=="number")return H.n(x)
r=new T.R(new Float32Array(H.b(4)))
r.a7(y-w,v-u,t-s,z-x)
return r},
p:function(a,b){var z,y,x,w,v
z=this.a
y=J.f(b)
x=C.b.p(z[0],y.gi(b).h(0,0))
w=C.b.p(z[1],y.gi(b).h(0,1))
v=C.b.p(z[2],y.gi(b).h(0,2))
y=C.b.p(z[3],y.gi(b).h(0,3))
z=new T.R(new Float32Array(H.b(4)))
z.a7(x,w,v,y)
return z},
a3:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
if(typeof b!=="number")return H.n(b)
x=z[1]
w=z[2]
z=z[3]
v=new T.R(new Float32Array(H.b(4)))
v.a7(y*b,x*b,w*b,z*b)
return v},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.a(z,b)
return z[b]},
k:function(a,b,c){var z=this.a
if(b>=4)return H.a(z,b)
z[b]=c},
gj:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(H.u(y*y+x*x+w*w+z*z))},
gbU:function(){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return y*y+x*x+w*w+z*z},
aJ:function(a){var z,y,x,w,v,u,t,s
z=this.a
y=z[0]
x=J.f(a)
w=x.gi(a)
if(0>=w.length)return H.a(w,0)
w=w[0]
if(typeof w!=="number")return H.n(w)
v=z[1]
u=x.gi(a)
if(1>=u.length)return H.a(u,1)
u=u[1]
if(typeof u!=="number")return H.n(u)
t=z[2]
s=x.gi(a)
if(2>=s.length)return H.a(s,2)
s=s[2]
if(typeof s!=="number")return H.n(s)
z=z[3]
x=x.gi(a)
if(3>=x.length)return H.a(x,3)
x=x[3]
if(typeof x!=="number")return H.n(x)
return y*w+v*u+t*s+z*x},
u:function(a,b){var z=this.a
z[0]=C.b.p(z[0],C.c.gi(b).h(0,0))
z[1]=C.b.p(z[1],C.c.gi(b).h(0,1))
z[2]=C.b.p(z[2],C.c.gi(b).h(0,2))
z[3]=C.b.p(z[3],C.c.gi(b).h(0,3))
return this},
bk:function(a,b){var z,y
z=this.a
y=b.a
z[0]=z[0]*y[0]
z[1]=z[1]*y[1]
z[2]=z[2]*y[2]
z[3]=z[3]*y[3]
return this},
bD:function(a,b){var z=this.a
z[0]=z[0]*b
z[1]=z[1]*b
z[2]=z[2]*b
z[3]=z[3]*b
return this},
af:function(a){var z=new T.R(new Float32Array(H.b(4)))
z.B(this)
return z},
gag:function(a){return this.a[0]},
gak:function(){return this.a[1]},
gav:function(a){return this.a[2]},
gm:function(a){return this.a[0]},
gn:function(a){return this.a[1]},
gw:function(a){return this.a[2]},
gaw:function(a){return this.a[3]}}}],["","",,M,{
"^":"",
kU:{
"^":"i;",
ha:function(a){var z,y,x,w,v,u
z=M.fy()
y=z.a*a
x=y/2
w=S.aq(x,x,x,1,1,1,null,null)
this.y=w
C.a.aX(w.f,2)
this.Q=S.aq(x,x,x,1,1,1,null,null)
w=z.a
this.a=S.aq(w/8,w*a/2,w/4,1,1,1,null,null)
w=z.a
this.c=S.aq(w/8,w*a/2,w/4,1,1,1,null,null)
w=z.a
v=w/4
this.e=S.aq(v,w*a/8,v,1,1,1,null,null)
v=z.a
w=v/4
this.r=S.aq(w,v*a/8,w,1,1,1,null,null)
w=-x
v=new T.e(new Float32Array(H.b(3)))
v.l(0,w,0)
this.z=v
v=new T.e(new Float32Array(H.b(3)))
v.l(0,0,0)
this.ch=v
v=z.a
u=new T.e(new Float32Array(H.b(3)))
u.l(-v*a/4,w,0)
this.b=u
u=z.a
v=new T.e(new Float32Array(H.b(3)))
v.l(u*a/4,w,0)
this.d=v
v=z.a
w=-y
u=new T.e(new Float32Array(H.b(3)))
u.l(-v*a/4,w,0)
this.f=u
u=z.a
v=new T.e(new Float32Array(H.b(3)))
v.l(u*a/4,w,0)
this.x=v}},
l5:{
"^":"kU;cx,cy,a,b,c,d,e,f,r,x,y,z,Q,ch"},
iB:{
"^":"i;a"},
iC:{
"^":"i;a,b,c,d,e,f,r,x",
iA:function(a6,a7,a8,a9,b0,b1,b2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
C.a.sj(this.x,0)
z=a6.x.a[1]*57.29577951308232
y=new T.e(new Float32Array(H.b(3)))
y.l(0,0,0)
for(x=z>z-225.1,w=z>z-45.1,v=z>z-135.1,u=z<z+45,t=a9===!0,s=z<z+225,r=b0===!0,q=z<z+135,p=b2===!0,o=z<z+315,n=b1===!0,m=0;m<8;++m){l=this.b
k=this.a[m]
j=new Float32Array(3)
i=new T.e(j)
i.B(k)
k=T.f7(a6.go)
h=j[0]
g=j[1]
f=j[2]
k=k.a
e=k[0]
d=k[1]
c=k[2]
b=k[3]
a=b*h+d*f-c*g
a0=b*g+c*h-e*f
a1=b*f+e*g-d*h
k=-e
a2=k*h-d*g-c*f
a3=-c
a4=-d
j[0]=a*b+a2*k+a0*a3-a1*a4
j[1]=a0*b+a2*a4+a1*k-a*a3
j[2]=a1*b+a2*a3+a*a4-a0*k
l[m]=i
i=new S.dh(a6.r,this.b[m],0,1/0,0.0001)
this.e=i
a5=i.d4(a7)
if(a5.length>0&&a5[0].gbg()<=a8){if(0>=a5.length)return H.a(a5,0)
y=a5[0].gaC()
if(w&&u&&t)this.x.push(C.k)
else if(v&&s&&r)this.x.push(C.j)
if(w&&q&&p)this.x.push(C.l)
else if(x&&o&&n)this.x.push(C.m)}}return[y.gm(y),y.gn(y),y.gw(y),this.x]},
iB:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
C.a.sj(this.x,0)
a.k3=!1
z=a.L
z.J=!1
for(y=!1,x=null,w=0,v=0,u=0,t=0;t<6;++t){s=new S.dh(a.r,this.c[t],0,1/0,0.0001)
this.e=s
r=s.d4(b)
if(r.length>0&&r[0].gbg()<=c){if(0>=r.length)return H.a(r,0)
x=r[0].geV()
a.k3=!0
z.J=!0
s=x.gI(x).a[0]
if(0>=r.length)return H.a(r,0)
q=r[0].gaC()
if(s>q.gm(q)){s=x.gI(x).a[0]
if(0>=r.length)return H.a(r,0)
q=r[0].gaC()
p=s-q.gm(q)
o=!1}else{if(0>=r.length)return H.a(r,0)
s=r[0].gaC()
p=s.gm(s)-x.gI(x).a[0]
o=!0}s=x.gI(x).a[1]
if(0>=r.length)return H.a(r,0)
q=r[0].gaC()
if(s>q.gn(q)){s=x.gI(x).a[1]
if(0>=r.length)return H.a(r,0)
q=r[0].gaC()
n=s-q.gn(q)
m=!1}else{if(0>=r.length)return H.a(r,0)
s=r[0].gaC()
n=s.gn(s)-x.gI(x).a[1]
m=!0}s=x.gI(x).a[2]
if(0>=r.length)return H.a(r,0)
q=r[0].gaC()
if(s>q.gw(q)){s=x.gI(x).a[2]
if(0>=r.length)return H.a(r,0)
q=r[0].gaC()
l=s-q.gw(q)
k=!1}else{if(0>=r.length)return H.a(r,0)
s=r[0].gaC()
l=s.gw(s)-x.gI(x).a[2]
k=!0}if(o)w=p>l&&p>n?x.gI(x).a[0]+d:x.gI(x).a[0]
else w=p>l&&p>n?x.gI(x).a[0]-d:x.gI(x).a[0]
if(m)v=t===5?x.gI(x).a[1]+d:x.gI(x).a[1]
else v=t===4?x.gI(x).a[1]-d:x.gI(x).a[1]
if(k)u=l>p&&l>n?x.gI(x).a[2]+d:x.gI(x).a[2]
else u=l>p&&l>n?x.gI(x).a[2]-d:x.gI(x).a[2]
y=!0}}s=new T.e(new Float32Array(H.b(3)))
s.l(w,v,u)
return[y,s,x]},
h3:function(){var z,y,x,w,v,u,t,s
z=new T.e(new Float32Array(H.b(3)))
z.l(0,0,1)
this.d=z
z=new T.e(new Float32Array(H.b(3)))
z.l(0,0,1)
y=new T.e(new Float32Array(H.b(3)))
y.l(1,0,1)
x=new T.e(new Float32Array(H.b(3)))
x.l(1,0,0)
w=new T.e(new Float32Array(H.b(3)))
w.l(1,0,-1)
v=new T.e(new Float32Array(H.b(3)))
v.l(0,0,-1)
u=new T.e(new Float32Array(H.b(3)))
u.l(-1,0,-1)
t=new T.e(new Float32Array(H.b(3)))
t.l(-1,0,0)
s=new T.e(new Float32Array(H.b(3)))
s.l(-1,0,1)
this.a=[z,y,x,w,v,u,t,s]
s=new T.e(new Float32Array(H.b(3)))
s.l(0,0,0)
t=new T.e(new Float32Array(H.b(3)))
t.l(0,0,0)
u=new T.e(new Float32Array(H.b(3)))
u.l(0,0,0)
v=new T.e(new Float32Array(H.b(3)))
v.l(0,0,0)
w=new T.e(new Float32Array(H.b(3)))
w.l(0,0,0)
x=new T.e(new Float32Array(H.b(3)))
x.l(0,0,0)
y=new T.e(new Float32Array(H.b(3)))
y.l(0,0,0)
z=new T.e(new Float32Array(H.b(3)))
z.l(0,0,0)
this.b=[s,t,u,v,w,x,y,z]
z=new T.e(new Float32Array(H.b(3)))
z.l(0,0,1)
y=new T.e(new Float32Array(H.b(3)))
y.l(0,0,-1)
x=new T.e(new Float32Array(H.b(3)))
x.l(1,0,0)
w=new T.e(new Float32Array(H.b(3)))
w.l(-1,0,0)
v=new T.e(new Float32Array(H.b(3)))
v.l(0,1,0)
u=new T.e(new Float32Array(H.b(3)))
u.l(0,-1,0)
this.c=[z,y,x,w,v,u]
this.x=H.o([],[M.bz])
u=new T.e(new Float32Array(H.b(3)))
u.l(0,0,0)
this.r=u
this.f=new M.eO()},
static:{et:function(){var z=new M.iC(null,null,null,null,null,null,null,null)
z.h3()
return z}}},
l6:{
"^":"i;a,b,c,d,e,f,r,x,y,z,Q",
lj:[function(a,b){var z,y,x,w
if(!this.e)return
this.r=J.hy(b).a
z=H.o(new P.bH(b.webkitMovementX,b.webkitMovementY),[null]).b
this.x=z
y=this.c.x.a
x=y[1]
w=this.r
if(typeof w!=="number")return w.a3()
y[1]=x-w*0.002
w=this.b.x.a
x=w[0]
if(typeof z!=="number")return z.a3()
w[0]=x-z*0.002
z=this.d
if(typeof z!=="number")return z.aN()
w[0]=P.af(-z,P.dR(z,w[0]))},"$1","gjY",2,0,0],
hc:function(a,b){var z,y
z=this.f
z=z!=null?z:document.body
this.f=z
y=document.body
if(z==null?y!=null:z!==y)z.tabIndex=-1
z.toString
z=H.o(new W.aA(z,"contextmenu",!1),[null])
H.o(new W.aH(0,z.a,z.b,W.aw(new M.l8()),z.c),[H.V(z,0)]).aI()
z=this.f
z.toString
z=H.o(new W.aA(z,"mousemove",!1),[null])
H.o(new W.aH(0,z.a,z.b,W.aw(this.gjY(this)),z.c),[H.V(z,0)]).aI()
this.a.x.l(0,0,0)
z=S.ca()
this.b=z
z.u(0,this.a)
z=S.ca()
this.c=z
z.r.a[1]=this.y
z.u(0,this.b)
this.d=1.5707963267948966
this.Q=new M.eO()},
static:{l7:function(a,b){var z=new M.l6(a,null,null,null,!1,null,null,null,b,new T.e(new Float32Array(H.b(3))),null)
z.hc(a,b)
return z}}},
l8:{
"^":"k:0;",
$1:function(a){return J.hP(a)}},
mm:{
"^":"i;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
hv:function(){var z,y,x,w,v,u,t,s,r
z=$.N
$.N=z+1
y=P.C()
x=new T.e(new Float32Array(H.b(3)))
x.l(0,1,0)
w=new T.e(new Float32Array(H.b(3)))
w.l(0,0,0)
v=new T.e(new Float32Array(H.b(3)))
v.l(0,0,0)
u=new T.e(new Float32Array(H.b(3)))
u.l(1,1,1)
t=new T.r(new Float32Array(H.b(16)))
t.A()
s=new T.r(new Float32Array(H.b(16)))
s.A()
r=new T.r(new Float32Array(H.b(16)))
r.A()
r=new S.di(null,null,null,null,null,null,null,null,null,null,z,"",y,null,[],x,w,v,u,"XYZ",null,null,null,!0,null,t,s,r,!0,!0,T.aF(),!1,0,1,!0,!1,!1,!0,new T.e(new Float32Array(H.b(3))),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
r.L=null
r.N=null
r.fx=!1
r.Z=[]
r.K=[]
r.a1=[]
r.ad=[]
this.a=r
s=new S.c0(0.001,null,"")
s.a=S.w(16777215)
r.L=s},
hQ:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=window.innerWidth
y=window.innerHeight
if(typeof z!=="number")return z.c_()
if(typeof y!=="number")return H.n(y)
x=new Float32Array(H.b(16))
w=new Float32Array(H.b(16))
v=new T.r(new Float32Array(H.b(16)))
v.A()
u=new T.r(new Float32Array(H.b(16)))
u.A()
t=new T.r(new Float32Array(H.b(16)))
t.A()
s=$.N
$.N=s+1
r=P.C()
q=new T.e(new Float32Array(H.b(3)))
q.l(0,1,0)
p=new T.e(new Float32Array(H.b(3)))
p.l(0,0,0)
o=new T.e(new Float32Array(H.b(3)))
o.l(0,0,0)
n=new T.e(new Float32Array(H.b(3)))
n.l(1,1,1)
m=new T.r(new Float32Array(H.b(16)))
m.A()
l=new T.r(new Float32Array(H.b(16)))
l.A()
k=new T.r(new Float32Array(H.b(16)))
k.A()
k=new S.l1(75,z/y,null,null,null,null,null,null,v,u,t,1,1000,x,w,s,"",r,null,[],q,p,o,n,"XYZ",null,null,null,!0,null,m,l,k,!0,!0,T.aF(),!1,0,1,!0,!1,!1,!0,new T.e(new Float32Array(H.b(3))),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
k.ff()
this.b=k
k.b="cam"},
hR:function(){var z,y,x,w
z=M.eo()
y=M.eo()
this.a.u(0,z.b)
x=z.b.az
w=this.cy
x.l(-1,w.c-w.a,-1)
this.a.u(0,y.b)
y=y.b.az
w=this.cy
y.l(1,w.c-w.a,1)
this.a.u(0,z.a)},
hU:function(){var z,y,x,w,v,u
z=this.cy
y=z.b
z=z.c
x=this.db.a
w=$.p
$.p=w+1
w=new S.z(x,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",w,0,S.w(16777215),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1)
y=S.l4(y,y,1,1)
v=S.ad(y,w)
u=S.ad(y,w)
v.x.a[0]=-1.5707963267948966
u.x.a[0]=-4.71238898038469
u.r.a[1]=z
z=S.ca()
z.u(0,v)
this.a.u(0,z)},
hS:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=$.l0
y=$.p
$.p=y+1
z=S.w(z)
x=$.kW
w=$.p
$.p=w+1
x=S.w(x)
v=$.kX
u=$.p
$.p=u+1
v=S.w(v)
t=$.kZ
s=$.p
$.p=s+1
t=S.w(t)
r=$.kY
q=$.p
$.p=q+1
r=S.w(r)
p=$.l_
o=$.p
$.p=o+1
p=new M.l5(null,new M.kV(new S.z(null,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",y,0,z,1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1),new S.z(null,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",w,0,x,1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1),new S.z(null,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",u,0,v,1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1),new S.z(null,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",s,0,t,1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1),new S.z(null,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",q,0,r,1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1),new S.z(null,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",o,0,S.w(p),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1)),null,null,null,null,null,null,null,null,null,null,null,null)
p.ha(1)
n=S.ad(p.y,p.cy.a)
n.b="torso"
n.r.B(p.z)
m=S.ad(p.Q,p.cy.b)
m.b="head"
m.r.B(p.ch)
l=S.ad(p.a,p.cy.c)
l.b="leftarm"
l.r.B(p.b)
k=S.ad(p.c,p.cy.d)
k.b="rightarm"
k.x.a[0]=0.7853981633974483
k.r.B(p.d)
j=S.ad(p.e,p.cy.e)
j.b="leftleg"
j.r.B(p.f)
i=S.ad(p.r,p.cy.f)
i.b="rightleg"
i.r.B(p.x)
p.cx=m
m.u(0,n)
p.cx.u(0,l)
p.cx.u(0,k)
p.cx.u(0,j)
p.cx.u(0,i)
this.e=p
p=p.cx.r
o=this.cy.a
p.l(o,o,o)
this.a.u(0,this.e.cx)},
hp:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.cy.a
y=L.K("img/rock.png",null,null,null)
x=$.p
$.p=x+1
w=M.Z(z,3,new S.z(y,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",x,0,S.w(16777215),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
x=w.a
y=x/2
z=x*5
w.x.r.l(x,y,z)
this.a.u(0,w.x)
v=w.x
this.f.a.push(v)
v=this.cy.a
u=L.K("img/rock.png",null,null,null)
t=$.p
$.p=t+1
s=M.Z(v,3,new S.z(u,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",t,0,S.w(16777215),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
s.x.r.l(x,w.x.r.a[1]*3,z)
this.a.u(0,s.x)
z=s.x
this.f.a.push(z)
z=this.cy.a
t=L.K("img/rock.png",null,null,null)
u=$.p
$.p=u+1
r=M.Z(z,3,new S.z(t,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",u,0,S.w(16777215),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
u=x*4
r.x.r.l(x,y,u)
this.a.u(0,r.x)
t=r.x
this.f.a.push(t)
t=this.cy.a
z=L.K("img/rock.png",null,null,null)
v=$.p
$.p=v+1
q=M.Z(t,3,new S.z(z,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",v,0,S.w(16777215),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
q.x.r.l(x,w.x.r.a[1]*3,u)
this.a.u(0,q.x)
u=q.x
this.f.a.push(u)
u=this.cy.a
v=L.K("img/dirt.png",null,null,null)
z=$.p
$.p=z+1
p=M.Z(u,3,new S.z(v,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",z,0,S.w(16777215),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
z=x*2
p.x.r.l(z,y,z)
this.a.u(0,p.x)
z=p.x
this.f.a.push(z)
z=this.cy.a
v=L.K("img/rock.png",null,null,null)
u=$.p
$.p=u+1
u=M.Z(z,3,new S.z(v,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",u,0,S.w(16777215),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
this.y=u
v=x*6
u.x.r.l(v,y,v)
this.a.u(0,this.y.x)
u=this.y.x
this.f.a.push(u)
for(o=7;o<14;++o)for(z=o!==10,u=x*o,n=1;n<7;++n){if(!(n!==1&&z))t=n!==2&&z
else t=!0
if(t){t=this.cy.a
m=L.K("img/rock.png",null,null,null)
l=$.p
$.p=l+1
k=new S.aC(1,1,1)
j=C.c.a2(C.b.a2(Math.floor(16777215)))
k.a=((j&16711680)>>>16)/255
k.b=((j&65280)>>>8)/255
k.c=(j&255)/255
t=S.ad(S.aq(t,t,t,1,1,1,null,null),new S.z(m,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",l,0,k,1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
t.b="block"
m=t.r.a
m[0]=u
m[1]=x*n-y
m[2]=v
this.a.u(0,t)
this.f.a.push(t)}}for(z=x*13,o=7;o<14;++o)for(u=x*o,n=1;n<7;++n){t=this.cy.a
m=L.K("img/rock.png",null,null,null)
l=$.p
$.p=l+1
k=new S.aC(1,1,1)
j=C.c.a2(C.b.a2(Math.floor(16777215)))
k.a=((j&16711680)>>>16)/255
k.b=((j&65280)>>>8)/255
k.c=(j&255)/255
t=S.ad(S.aq(t,t,t,1,1,1,null,null),new S.z(m,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",l,0,k,1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
t.b="block"
m=t.r.a
m[0]=u
m[1]=x*n-y
m[2]=z
this.a.u(0,t)
this.f.a.push(t)}for(o=7;o<14;++o)for(z=x*o,n=1;n<7;++n){u=this.cy.a
t=L.K("img/rock.png",null,null,null)
m=$.p
$.p=m+1
l=new S.aC(1,1,1)
j=C.c.a2(C.b.a2(Math.floor(16777215)))
l.a=((j&16711680)>>>16)/255
l.b=((j&65280)>>>8)/255
l.c=(j&255)/255
u=S.ad(S.aq(u,u,u,1,1,1,null,null),new S.z(t,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",m,0,l,1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
u.b="block"
t=u.r.a
t[0]=v
t[1]=x*n-y
t[2]=z
this.a.u(0,u)
this.f.a.push(u)}for(z=x*7-y,o=7;o<14;++o)for(v=x*o,n=7;n<14;++n){u=this.cy.a
t=L.K("img/rock.png",null,null,null)
m=$.p
$.p=m+1
l=new S.aC(1,1,1)
j=C.c.a2(C.b.a2(Math.floor(16777215)))
l.a=((j&16711680)>>>16)/255
l.b=((j&65280)>>>8)/255
l.c=(j&255)/255
u=S.ad(S.aq(u,u,u,1,1,1,null,null),new S.z(t,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",m,0,l,1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
u.b="block"
t=u.r.a
t[0]=x*n
t[1]=z
t[2]=v
this.a.u(0,u)
this.f.a.push(u)}for(z=x*14,o=7;o<14;++o)for(v=x*o,n=1;n<7;++n){u=this.cy.a
t=L.K("img/rock.png",null,null,null)
m=$.p
$.p=m+1
l=new S.aC(1,1,1)
j=C.c.a2(C.b.a2(Math.floor(16777215)))
l.a=((j&16711680)>>>16)/255
l.b=((j&65280)>>>8)/255
l.c=(j&255)/255
u=S.ad(S.aq(u,u,u,1,1,1,null,null),new S.z(t,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",m,0,l,1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
u.b="block"
t=u.r.a
t[0]=z
t[1]=x*n-y
t[2]=v
this.a.u(0,u)
this.f.a.push(u)}},
hV:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.cy.a
y=L.K("img/wood.png",null,null,null)
x=$.p
$.p=x+1
w=M.Z(z,3,new S.z(y,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",x,0,S.w(16777215),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
x=w.a
y=x*8
z=x/2
v=x*4
w.x.r.l(y,z,v)
this.a.u(0,w.x)
u=w.x
this.f.a.push(u)
u=this.cy.a
t=L.K("img/wood.png",null,null,null)
s=$.p
$.p=s+1
r=M.Z(u,3,new S.z(t,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",s,0,S.w(16777215),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
r.x.r.l(y,x*2-z,v)
this.a.u(0,r.x)
s=r.x
this.f.a.push(s)
s=this.cy.a
t=L.K("img/wood.png",null,null,null)
u=$.p
$.p=u+1
q=M.Z(s,3,new S.z(t,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",u,0,S.w(16777215),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
q.x.r.l(y,x*3-z,v)
this.a.u(0,q.x)
x=q.x
this.f.a.push(x)
x=this.cy.a
u=L.K("img/wood.png",null,null,null)
t=$.p
$.p=t+1
p=M.Z(x,3,new S.z(u,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",t,0,S.w(16777215),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
p.x.r.l(y,v-z,v)
this.a.u(0,p.x)
v=p.x
this.f.a.push(v)
v=this.cy.a
z=L.K("img/leaves.png",null,null,null)
y=$.p
$.p=y+1
o=M.Z(v,3,new S.z(z,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",y,0,S.w(16777215),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
y=o.a
o.x.r.l(y*8,y*4-y/2,y*5)
this.a.u(0,o.x)
y=o.x
this.f.a.push(y)
y=this.cy.a
z=L.K("img/leaves.png",null,null,null)
v=$.p
$.p=v+1
n=M.Z(y,3,new S.z(z,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",v,0,S.w(16777215),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
v=n.a
n.x.r.l(v*8,v*4-v/2,v*3)
this.a.u(0,n.x)
v=n.x
this.f.a.push(v)
v=this.cy.a
z=L.K("img/leaves.png",null,null,null)
y=$.p
$.p=y+1
m=M.Z(v,3,new S.z(z,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",y,0,S.w(16777215),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
y=m.a
m.x.r.l(y*8,y*5-y/2,y*4)
this.a.u(0,m.x)
y=m.x
this.f.a.push(y)
y=this.cy.a
z=L.K("img/leaves.png",null,null,null)
v=$.p
$.p=v+1
l=M.Z(y,3,new S.z(z,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",v,0,S.w(16777215),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
v=l.a
z=v*4
l.x.r.l(v*7,z-v/2,z)
this.a.u(0,l.x)
z=l.x
this.f.a.push(z)
z=this.cy.a
v=L.K("img/leaves.png",null,null,null)
y=$.p
$.p=y+1
k=M.Z(z,3,new S.z(v,null,null,null,0,1,0.98,2,!1,1,"round","round",!1,!1,!1,0,0,"",y,0,S.w(16777215),1,1,204,205,100,0,!1,0,0,!1,!0,!0,!1,!0,!0,!0,0,null,null,null,null,null,!1))
y=k.a
v=y*4
k.x.r.l(y*9,v-y/2,v)
this.a.u(0,k.x)
v=k.x
this.f.a.push(v)},
hT:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=W.mB("span",null)
this.c=z
document.body.appendChild(z)
P.C()
z=S.w(0)
y=[]
x=new S.m4(null,null)
x.a=new S.m5(0,0,0)
x.b=new S.m6(0,0,0,0)
w=P.C()
v=S.cZ()
u=new T.r(new Float32Array(H.b(16)))
u.A()
t=new T.r(new Float32Array(H.b(16)))
t.A()
t=new S.m3(null,null,"highp",z,0,null,!0,!0,!0,!0,!1,!0,!0,!0,!0,!0,!0,!0,!1,!1,!1,!1,!0,!1,!1,1,2,8,4,!0,y,[],x,[],0,null,null,-1,null,null,0,0,w,-1,-1,-1,-1,-1,-1,-1,-1,null,null,null,null,0,0,0,0,0,0,v,u,t,new T.e(new Float32Array(H.b(3))),new T.e(new Float32Array(H.b(3))),null,!0,null,null,null,null,null,null,null,null,null,null,null,null)
z=window.devicePixelRatio!=null?window.devicePixelRatio:1
t.f=z
t.b3=P.y(["ambient",[0,0,0],"directional",P.y(["length",0,"colors",[],"positions",[]]),"point",P.y(["length",0,"colors",[],"positions",[],"distances",[]]),"spot",P.y(["length",0,"colors",[],"positions",[],"distances",[],"directions",[],"anglesCos",[],"exponents",[]]),"hemi",P.y(["length",0,"skyColors",[],"groundColors",[],"positions",[]])])
t.a=W.iv(null,null)
t.jA()
t.fH()
t.bi=J.aZ(t.b,34930)
t.bP=J.aZ(t.b,35660)
t.bv=J.aZ(t.b,3379)
t.bQ=J.aZ(t.b,34076)
t.b5=t.b4!=null?J.aZ(t.b,34047):0
z=t.bP
if(typeof z!=="number")return z.aE()
z=z>0
t.b6=z
t.aU=z&&t.aT!=null
if(t.au!=null)J.aZ(t.b,34467)
s=J.ap(t.b,35633,36338)
r=J.ap(t.b,35633,36337)
J.ap(t.b,35633,36336)
q=J.ap(t.b,35632,36338)
p=J.ap(t.b,35632,36337)
J.ap(t.b,35632,36336)
J.ap(t.b,35633,36341)
J.ap(t.b,35633,36340)
J.ap(t.b,35633,36339)
J.ap(t.b,35632,36341)
J.ap(t.b,35632,36340)
J.ap(t.b,35632,36339)
z=s.precision
if(typeof z!=="number")return z.aE()
if(z>0){z=q.precision
if(typeof z!=="number")return z.aE()
o=z>0}else o=!1
z=r.precision
if(typeof z!=="number")return z.aE()
if(z>0){z=p.precision
if(typeof z!=="number")return z.aE()
n=z>0}else n=!1
if(t.c==="highp"&&!o)if(n){t.c="mediump"
P.a5("WebGLRenderer: highp not supported, using mediump")}else{t.c="lowp"
P.a5("WebGLRenderer: highp and mediump not supported, using lowp")}if(t.c==="mediump"&&!n){t.c="lowp"
P.a5("WebGLRenderer: mediump not supported, using lowp")}z=S.lv()
t.bh=z
z.jy(t)
y.push(z)
t.dC(window.innerWidth,window.innerHeight)
this.d=t
J.hz(this.c).a.appendChild(this.d.a)
t=H.o(new W.co(window,"resize",!1),[null])
H.o(new W.aH(0,t.a,t.b,W.aw(this.gjZ()),t.c),[H.V(t,0)]).aI()},
lk:[function(a){var z,y,x
z=this.b
y=window.innerWidth
x=window.innerHeight
if(typeof y!=="number")return y.c_()
if(typeof x!=="number")return H.n(x)
z.ap=y/x
z.ff()
this.d.dC(window.innerWidth,window.innerHeight)},"$1","gjZ",2,0,0],
li:[function(a,b){this.d.a.requestPointerLock()
this.ch=!0},"$1","gck",2,0,27],
ka:function(a){var z=this.f.a
C.a.bJ(z,"removeWhere")
C.a.hM(z,new M.mn(a),!0)}},
mn:{
"^":"k:0;a",
$1:function(a){return J.bU(a)===J.bU(this.a)}},
bz:{
"^":"i;a",
t:function(a){return C.C.h(0,this.a)}},
ip:{
"^":"i;ae:a>",
h2:function(a){var z=this.a
this.b=S.aq(z,z,z,1,1,1,null,null)}},
ln:{
"^":"i;ae:a>"},
ik:{
"^":"i;a,b,aC:c<",
h_:function(){var z,y,x,w,v,u,t,s,r,q
z=S.w(460551)
y=$.N
$.N=y+1
x=P.C()
w=new T.e(new Float32Array(H.b(3)))
w.l(0,1,0)
v=new T.e(new Float32Array(H.b(3)))
v.l(0,0,0)
u=new T.e(new Float32Array(H.b(3)))
u.l(0,0,0)
t=new T.e(new Float32Array(H.b(3)))
t.l(1,1,1)
s=new T.r(new Float32Array(H.b(16)))
s.A()
r=new T.r(new Float32Array(H.b(16)))
r.A()
q=new T.r(new Float32Array(H.b(16)))
q.A()
this.a=new S.em(z,y,"",x,null,[],w,v,u,t,"XYZ",null,null,null,!0,null,s,r,q,!0,!0,T.aF(),!1,0,1,!0,!1,!1,!0,new T.e(new Float32Array(H.b(3))),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
this.b=S.iP(16777215,0.6,0)
q=S.w(16729088)
r=$.N
$.N=r+1
s=P.C()
t=new T.e(new Float32Array(H.b(3)))
t.l(0,1,0)
u=new T.e(new Float32Array(H.b(3)))
u.l(0,0,0)
v=new T.e(new Float32Array(H.b(3)))
v.l(0,0,0)
w=new T.e(new Float32Array(H.b(3)))
w.l(1,1,1)
x=new T.r(new Float32Array(H.b(16)))
x.A()
y=new T.r(new Float32Array(H.b(16)))
y.A()
z=new T.r(new Float32Array(H.b(16)))
z.A()
z=new S.cb(null,1.5,50,q,r,"",s,null,[],t,u,v,w,"XYZ",null,null,null,!0,null,x,y,z,!0,!0,T.aF(),!1,0,1,!0,!1,!1,!0,new T.e(new Float32Array(H.b(3))),null,null,null,!1,!1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.N=new T.e(new Float32Array(H.b(3)))
this.c=z
u.l(100,50,100)},
static:{eo:function(){var z=new M.ik(null,null,null)
z.h_()
return z}}},
il:{
"^":"i;a",
h0:function(){var z=L.K("img/checkerboard.jpg",null,null,null)
this.a=z
z.e=0
z.d=0
z=z.ch.a
z[0]=10
z[1]=10},
static:{im:function(){var z=new M.il(null)
z.h0()
return z}}},
kV:{
"^":"i;a,b,c,d,e,f"},
io:{
"^":"ip;D:c>,d,e,f,r,x,a,b",
h1:function(a,b,c){var z
this.d=!1
this.f=0
z=S.ad(this.b,this.r)
this.x=z
z.b="block"},
static:{Z:function(a,b,c){var z=new M.io(null,null,b,null,c,null,a,null)
z.h2(a)
z.h1(a,b,c)
return z}}},
qH:{
"^":"ln;D:c>,d,e,f,r,x,a,b"},
m0:{
"^":"i;a,b,c",
hj:function(){this.a=50
this.b=2000
this.c=500},
static:{fy:function(){var z=new M.m0(null,null,null)
z.hj()
return z}}},
eO:{
"^":"i;"}}]]
setupProgram(dart,0)
J.v=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.eT.prototype
return J.kz.prototype}if(typeof a=="string")return J.c4.prototype
if(a==null)return J.eU.prototype
if(typeof a=="boolean")return J.ky.prototype
if(a.constructor==Array)return J.bD.prototype
if(typeof a!="object")return a
if(a instanceof P.i)return a
return J.cu(a)}
J.J=function(a){if(typeof a=="string")return J.c4.prototype
if(a==null)return a
if(a.constructor==Array)return J.bD.prototype
if(typeof a!="object")return a
if(a instanceof P.i)return a
return J.cu(a)}
J.al=function(a){if(a==null)return a
if(a.constructor==Array)return J.bD.prototype
if(typeof a!="object")return a
if(a instanceof P.i)return a
return J.cu(a)}
J.as=function(a){if(typeof a=="number")return J.bE.prototype
if(a==null)return a
if(!(a instanceof P.i))return J.dv.prototype
return a}
J.h2=function(a){if(typeof a=="number")return J.bE.prototype
if(typeof a=="string")return J.c4.prototype
if(a==null)return a
if(!(a instanceof P.i))return J.dv.prototype
return a}
J.f=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.i)return a
return J.cu(a)}
J.aJ=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.h2(a).p(a,b)}
J.a7=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.v(a).O(a,b)}
J.hd=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>=b
return J.as(a).ai(a,b)}
J.a8=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.as(a).aE(a,b)}
J.he=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<=b
return J.as(a).cp(a,b)}
J.br=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.as(a).b_(a,b)}
J.hf=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.h2(a).a3(a,b)}
J.cC=function(a){if(typeof a=="number")return-a
return J.as(a).aN(a)}
J.bP=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.as(a).aa(a,b)}
J.x=function(a,b){if(a.constructor==Array||typeof a=="string"||H.h5(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.J(a).h(a,b)}
J.an=function(a,b,c){if((a.constructor==Array||H.h5(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.al(a).k(a,b,c)}
J.hg=function(a,b){return J.f(a).cI(a,b)}
J.hh=function(a,b,c){return J.f(a).hO(a,b,c)}
J.dV=function(a,b){return J.f(a).i0(a,b)}
J.hi=function(a,b,c,d){return J.f(a).i2(a,b,c,d)}
J.dW=function(a,b,c){return J.f(a).i8(a,b,c)}
J.F=function(a,b,c){return J.f(a).ia(a,b,c)}
J.cD=function(a,b,c){return J.f(a).ib(a,b,c)}
J.dX=function(a,b,c){return J.f(a).ic(a,b,c)}
J.bQ=function(a,b,c){return J.f(a).ie(a,b,c)}
J.bs=function(a,b){return J.f(a).ih(a,b)}
J.hj=function(a,b,c){return J.f(a).ii(a,b,c)}
J.bt=function(a,b,c){return J.f(a).ij(a,b,c)}
J.hk=function(a,b,c,d,e){return J.f(a).ik(a,b,c,d,e)}
J.W=function(a,b,c,d){return J.f(a).im(a,b,c,d)}
J.hl=function(a,b){return J.al(a).iv(a,b)}
J.bR=function(a,b,c,d,e){return J.f(a).iw(a,b,c,d,e)}
J.hm=function(a,b){return J.f(a).ix(a,b)}
J.hn=function(a,b){return J.f(a).iy(a,b)}
J.bd=function(a){return J.f(a).af(a)}
J.ho=function(a,b){return J.f(a).iD(a,b)}
J.cE=function(a,b,c){return J.J(a).iJ(a,b,c)}
J.a9=function(a){return J.f(a).iM(a)}
J.hp=function(a){return J.f(a).iN(a)}
J.hq=function(a){return J.f(a).iP(a)}
J.hr=function(a){return J.f(a).iQ(a)}
J.dY=function(a,b){return J.f(a).iR(a,b)}
J.dZ=function(a){return J.f(a).iS(a)}
J.bS=function(a,b){return J.f(a).iU(a,b)}
J.e_=function(a,b){return J.f(a).iW(a,b)}
J.hs=function(a,b){return J.f(a).iX(a,b)}
J.cF=function(a,b){return J.f(a).iY(a,b)}
J.bu=function(a,b){return J.f(a).j4(a,b)}
J.ht=function(a,b){return J.f(a).j6(a,b)}
J.e0=function(a,b,c,d){return J.f(a).j7(a,b,c,d)}
J.e1=function(a,b,c,d,e){return J.f(a).j8(a,b,c,d,e)}
J.hu=function(a,b){return J.al(a).H(a,b)}
J.ag=function(a,b){return J.f(a).j9(a,b)}
J.bv=function(a,b){return J.f(a).ja(a,b)}
J.bw=function(a,b){return J.al(a).G(a,b)}
J.e2=function(a,b,c,d,e){return J.f(a).jh(a,b,c,d,e)}
J.hv=function(a,b,c,d,e,f){return J.f(a).ji(a,b,c,d,e,f)}
J.bT=function(a,b){return J.f(a).jj(a,b)}
J.e3=function(a,b){return J.f(a).fk(a,b)}
J.e4=function(a){return J.f(a).gip(a)}
J.hw=function(a){return J.f(a).gbL(a)}
J.aB=function(a){return J.f(a).gaK(a)}
J.ac=function(a){return J.v(a).gah(a)}
J.e5=function(a){return J.f(a).gE(a)}
J.hx=function(a){return J.f(a).gX(a)}
J.e6=function(a){return J.as(a).gjI(a)}
J.e7=function(a){return J.as(a).geM(a)}
J.aY=function(a){return J.al(a).ga5(a)}
J.e8=function(a){return J.f(a).gjL(a)}
J.ao=function(a){return J.J(a).gj(a)}
J.hy=function(a){return J.f(a).gjS(a)}
J.e9=function(a){return J.f(a).gbl(a)}
J.hz=function(a){return J.f(a).gjV(a)}
J.hA=function(a){return J.f(a).gd7(a)}
J.hB=function(a){return J.f(a).gd8(a)}
J.hC=function(a){return J.f(a).gck(a)}
J.hD=function(a){return J.f(a).geX(a)}
J.bU=function(a){return J.f(a).gI(a)}
J.hE=function(a){return J.f(a).gag(a)}
J.ea=function(a){return J.f(a).gi(a)}
J.hF=function(a){return J.f(a).gD(a)}
J.ah=function(a){return J.f(a).gq(a)}
J.hG=function(a){return J.f(a).gaw(a)}
J.eb=function(a){return J.f(a).gF(a)}
J.cG=function(a){return J.f(a).gm(a)}
J.cH=function(a){return J.f(a).gn(a)}
J.cI=function(a){return J.f(a).gw(a)}
J.hH=function(a,b,c){return J.f(a).fl(a,b,c)}
J.hI=function(a,b,c,d,e,f){return J.f(a).fm(a,b,c,d,e,f)}
J.hJ=function(a){return J.f(a).fo(a)}
J.aK=function(a,b){return J.f(a).fp(a,b)}
J.aZ=function(a,b){return J.f(a).fq(a,b)}
J.ec=function(a,b,c){return J.f(a).fs(a,b,c)}
J.hK=function(a,b){return J.f(a).ft(a,b)}
J.hL=function(a,b,c){return J.f(a).fu(a,b,c)}
J.ap=function(a,b,c){return J.f(a).fv(a,b,c)}
J.hM=function(a,b,c){return J.f(a).fw(a,b,c)}
J.ed=function(a,b){return J.f(a).eO(a,b)}
J.hN=function(a,b){return J.f(a).jN(a,b)}
J.cJ=function(a,b){return J.al(a).b8(a,b)}
J.cK=function(a,b,c){return J.f(a).k5(a,b,c)}
J.hO=function(a,b,c){return J.f(a).k6(a,b,c)}
J.hP=function(a){return J.f(a).k7(a)}
J.hQ=function(a){return J.al(a).eZ(a)}
J.hR=function(a,b,c,d){return J.f(a).kc(a,b,c,d)}
J.cL=function(a,b,c,d,e){return J.f(a).kh(a,b,c,d,e)}
J.hS=function(a,b){return J.f(a).ki(a,b)}
J.be=function(a,b){return J.f(a).bn(a,b)}
J.hT=function(a,b){return J.f(a).scd(a,b)}
J.hU=function(a,b){return J.f(a).sE(a,b)}
J.hV=function(a,b){return J.f(a).sX(a,b)}
J.bx=function(a,b){return J.J(a).sj(a,b)}
J.hW=function(a,b){return J.f(a).sbl(a,b)}
J.hX=function(a,b){return J.f(a).seX(a,b)}
J.hY=function(a,b){return J.f(a).sb0(a,b)}
J.G=function(a,b){return J.f(a).sq(a,b)}
J.hZ=function(a,b){return J.f(a).sF(a,b)}
J.i_=function(a,b,c){return J.f(a).fR(a,b,c)}
J.i0=function(a,b){return J.al(a).c4(a,b)}
J.i1=function(a,b,c,d,e,f,g){return J.f(a).km(a,b,c,d,e,f,g)}
J.i2=function(a,b,c,d,e,f,g){return J.f(a).ko(a,b,c,d,e,f,g)}
J.i3=function(a,b,c,d,e,f,g){return J.f(a).kp(a,b,c,d,e,f,g)}
J.i4=function(a,b,c,d,e,f,g,h,i,j){return J.f(a).kq(a,b,c,d,e,f,g,h,i,j)}
J.i5=function(a,b,c,d,e,f,g){return J.f(a).kr(a,b,c,d,e,f,g)}
J.i6=function(a,b,c,d){return J.f(a).ks(a,b,c,d)}
J.aL=function(a,b,c,d){return J.f(a).kt(a,b,c,d)}
J.cM=function(a){return J.as(a).ku(a)}
J.ee=function(a){return J.as(a).a2(a)}
J.ef=function(a){return J.al(a).aq(a)}
J.b_=function(a){return J.v(a).t(a)}
J.i7=function(a,b,c){return J.f(a).kw(a,b,c)}
J.eg=function(a,b,c){return J.f(a).kx(a,b,c)}
J.eh=function(a,b,c){return J.f(a).ky(a,b,c)}
J.ei=function(a,b,c){return J.f(a).kz(a,b,c)}
J.i8=function(a,b,c,d){return J.f(a).kA(a,b,c,d)}
J.i9=function(a,b,c){return J.f(a).kB(a,b,c)}
J.cN=function(a,b,c,d,e){return J.f(a).kC(a,b,c,d,e)}
J.ej=function(a,b,c){return J.f(a).kD(a,b,c)}
J.ia=function(a,b,c){return J.f(a).kE(a,b,c)}
J.ib=function(a,b,c,d,e,f){return J.f(a).kF(a,b,c,d,e,f)}
J.ic=function(a,b,c){return J.f(a).kG(a,b,c)}
J.id=function(a,b,c,d){return J.f(a).kH(a,b,c,d)}
J.ek=function(a,b,c,d){return J.f(a).kI(a,b,c,d)}
J.bf=function(a,b,c,d){return J.f(a).kJ(a,b,c,d)}
J.ie=function(a,b){return J.f(a).kN(a,b)}
J.X=function(a,b,c,d,e,f,g){return J.f(a).kO(a,b,c,d,e,f,g)}
J.el=function(a,b,c,d,e){return J.f(a).kQ(a,b,c,d,e)}
var $=I.p
C.e=W.jz.prototype
C.a=J.bD.prototype
C.c=J.eT.prototype
C.u=J.eU.prototype
C.b=J.bE.prototype
C.i=J.c4.prototype
C.D=W.kO.prototype
C.E=J.l2.prototype
C.F=J.dv.prototype
C.h=W.ml.prototype
C.p=new H.eA()
C.q=new P.kT()
C.r=new P.mz()
C.t=new P.mV()
C.d=new P.n8()
C.j=new M.bz(0)
C.k=new M.bz(1)
C.l=new M.bz(2)
C.m=new M.bz(3)
C.f=new P.b2(0)
C.v=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.w=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.n=function getTagFallback(o) {
  var constructor = o.constructor;
  if (typeof constructor == "function") {
    var name = constructor.name;
    if (typeof name == "string" &&
        name.length > 2 &&
        name !== "Object" &&
        name !== "Function.prototype") {
      return name;
    }
  }
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.o=function(hooks) { return hooks; }

C.x=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.y=function() {
  function typeNameInChrome(o) {
    var constructor = o.constructor;
    if (constructor) {
      var name = constructor.name;
      if (name) return name;
    }
    var s = Object.prototype.toString.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = Object.prototype.toString.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: typeNameInChrome,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.z=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.A=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.B=function(_, letter) { return letter.toUpperCase(); }
C.C=new H.js([0,"CollisionDirections.forward",1,"CollisionDirections.backward",2,"CollisionDirections.right",3,"CollisionDirections.left"])
$.nT="anonymous"
$.f5="$cachedFunction"
$.f6="$cachedInvocation"
$.ay=0
$.bg=null
$.ep=null
$.dL=null
$.fU=null
$.h8=null
$.cs=null
$.cw=null
$.dM=null
$.b9=null
$.bn=null
$.bo=null
$.dG=!1
$.A=C.d
$.eH=0
$.ey=null
$.ex=null
$.ew=null
$.ev=null
$.eL=null
$.fM=null
$.fO=null
$.fN=null
$.eM=0
$.N=0
$.p=0
$.fk=0
$.l0=6729471
$.kW=16770491
$.kX=7316223
$.kZ=7316223
$.kY=14211071
$.l_=14211071
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["eQ","$get$eQ",function(){return H.ku()},"eR","$get$eR",function(){return new P.j7(null)},"fl","$get$fl",function(){return H.az(H.ck({toString:function(){return"$receiver$"}}))},"fm","$get$fm",function(){return H.az(H.ck({$method$:null,toString:function(){return"$receiver$"}}))},"fn","$get$fn",function(){return H.az(H.ck(null))},"fo","$get$fo",function(){return H.az(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"fs","$get$fs",function(){return H.az(H.ck(void 0))},"ft","$get$ft",function(){return H.az(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"fq","$get$fq",function(){return H.az(H.fr(null))},"fp","$get$fp",function(){return H.az(function(){try{null.$method$}catch(z){return z.message}}())},"fv","$get$fv",function(){return H.az(H.fr(void 0))},"fu","$get$fu",function(){return H.az(function(){try{(void 0).$method$}catch(z){return z.message}}())},"dA","$get$dA",function(){return P.mp()},"bp","$get$bp",function(){return[]},"er","$get$er",function(){return S.lb()},"bW","$get$bW",function(){return T.m2()},"cS","$get$cS",function(){return S.it(0,0)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1,args:[,]},{func:1},{func:1,void:true},{func:1,args:[,,]},{func:1,args:[T.e]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,args:[,],opt:[,]},{func:1,ret:P.U,args:[P.E]},{func:1,ret:P.E,args:[,]},{func:1,args:[P.E]},{func:1,args:[P.E,,]},{func:1,args:[S.cX]},{func:1,args:[,P.U]},{func:1,args:[P.U]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[P.i],opt:[P.aU]},{func:1,void:true,args:[,],opt:[P.aU]},{func:1,ret:P.dI},{func:1,args:[,P.aU]},{func:1,void:true,args:[,P.aU]},{func:1,args:[P.ff,,]},{func:1,ret:P.i,opt:[P.i]},{func:1,void:true,opt:[P.i]},{func:1,args:[P.U,,]},{func:1,void:true,args:[P.aI]},{func:1,args:[P.aI,T.e]},{func:1,args:[[P.ai,P.U,S.q]]},{func:1,void:true,args:[,]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.oi(d||a)
return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.ct=a.ct
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.hb(F.h6(),b)},[])
else (function(b){H.hb(F.h6(),b)})([])})})()