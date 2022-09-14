
export default class Author {
    static get = ()=>{
let author = window.sessionStorage.getItem('author');
return author;
    }

    static set = (name: string)=>{
window.sessionStorage.setItem('author', name);
    }
    
    static isAuthor = ()=>{
let author = window.sessionStorage.getItem('author') ? true : false;
return author;
    }
    static clear = ()=>{
        window.sessionStorage.clear();
    }
}