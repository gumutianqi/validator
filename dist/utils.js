define("#validator/0.8.4/utils",["./async","./rule","#jquery/1.7.2/jquery","#widget/0.9.16/widget","#widget/0.9.16/daparser","#widget/0.9.16/auto-render","#base/0.9.16/base","#base/0.9.16/aspect","#base/0.9.16/attribute","#class/0.9.2/class","#events/0.9.1/events"],function(require,exports,module){function unique(){return"__anonymous__"+u_count++}function parseRule(str){var match=str.match(/([^{}:\s]*)(\{[^\{\}]*\})?/);return{name:match[1],param:parseJSON(match[2])}}function parseJSON(str){function getValue(str){return str[0]=='"'&&str[str.length-1]=='"'||str[0]=="'"&&str[str.length-1]=="'"?eval(str):str}if(!str)return null;var NOTICE='Invalid option object "'+str+'".';str=str.slice(1,-1);var result={},arr=str.split(",");return $.each(arr,function(i,v){arr[i]=$.trim(v);if(!arr[i])throw new Error(NOTICE);var arr2=arr[i].split(":"),key=$.trim(arr2[0]),value=$.trim(arr2[1]);if(!key||!value)throw new Error(NOTICE);result[getValue(key)]=$.trim(getValue(value))}),result}function parseRules(str){return str?str.match(/[a-zA-Z0-9\-\_]+(\{.*\})?/g):null}function parseDom(field){var field=$(field),result={},arr=[],required=field.attr("required");required&&(arr.push("required"),result.required=!0);var type=field.attr("type");if(type&&type!="submit"&&type!="cancel"&&type!="checkbox"&&type!="radio"&&type!="select"&&type!="select-one"&&type!="file"&&type!="hidden"){if(!Rule.getRule(type))throw new Error('Form field with type "'+type+'" not supported!');arr.push(type)}var min=field.attr("min");min&&arr.push('min{"min":"'+min+'"}');var max=field.attr("max");max&&arr.push("max{max:"+max+"}");var minlength=field.attr("minlength");minlength&&arr.push("minlength{min:"+minlength+"}");var maxlength=field.attr("maxlength");maxlength&&arr.push("maxlength{max:"+maxlength+"}");var pattern=field.attr("pattern");if(pattern){var regexp=new RegExp(pattern),name=unique();Rule.addRule(name,regexp),arr.push(name)}var rules=field.attr("data-rule");return rules=rules&&parseRules(rules),rules&&(arr=arr.concat(rules)),result.rule=arr.length==0?null:arr.join(" "),result}function helper(name,fn){return fn?(helpers[name]=fn,this):helpers[name]}var $=require("#jquery/1.7.2/jquery"),Rule=require("./rule"),u_count=0,helpers={};module.exports={parseRule:parseRule,parseRules:parseRules,parseDom:parseDom,helper:helper}});