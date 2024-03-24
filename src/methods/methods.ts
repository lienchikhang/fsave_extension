import { STRINGLENGTH } from "../Enum"

export const convertStr = (string: string): string => { 
    if(string.length < STRINGLENGTH.maxLength) return string;

    return string.slice(0, STRINGLENGTH.maxLength) + "...."
 }