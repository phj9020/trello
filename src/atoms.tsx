import {atom, selector} from 'recoil';

export const toDoState = atom({
    key: "todo",
    default: ["a", "b", "c", "d"],
})

export const toDoSelector = selector({
    key: 'MySelector',
    get: ({get}) => get(toDoState),
});