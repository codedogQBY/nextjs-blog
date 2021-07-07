import gravatar from 'gravatar'

declare module 'gravatar' {
    export interface IGravatar{
        url: (email:string,options:{cdn:string,protocol:string},protocol?:'https')=>string
        profile_url:(email:string,options:{format:string,cdn:string,protocol:string},https:string)=>string
    }
}