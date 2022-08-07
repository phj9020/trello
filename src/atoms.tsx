import {atom, selector} from 'recoil';


export interface IToDo {
    id: number;
    text: string;
}

interface IToDostate {
    // property of string : string array 구성
    [key: string]: IToDo[];
}

export const toDoState = atom<IToDostate>({
    key: "todo",
    default: {
        "To Do" : [],
        Doing : [],
        Done : [],
    },
})

export const toDoSelector = selector({
    key: 'MySelector',
    get: ({get}) => get(toDoState),
});