import {atom, selector} from 'recoil';

interface IToDostate {
    // property of string : string array 구성
    [key: string]: string[],
}

export const toDoState = atom<IToDostate>({
    key: "todo",
    default: {
        to_do : ["a","b","c"],
        doing : ["e","f"],
        done : ["g"],
    },
})

export const toDoSelector = selector({
    key: 'MySelector',
    get: ({get}) => get(toDoState),
});