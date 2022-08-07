import {atom, selector} from 'recoil';

interface IToDostate {
    // property of string : string array 구성
    [key: string]: string[],
}

export const toDoState = atom<IToDostate>({
    key: "todo",
    default: {
        "To Do" : ["a","b","c","d"],
        Doing : ["e","f"],
        Done : ["g"],
    },
})

export const toDoSelector = selector({
    key: 'MySelector',
    get: ({get}) => get(toDoState),
});