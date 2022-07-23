import {atom, selector} from 'recoil';

// minutes 에 대한 상태만 만들고
export const minuteState = atom({
    key: "minutes",
    default : 0
})

// hour는 minute state을 가져와서 변형 시켰다. 
export const hourSelector = selector({
    key: "hours",
    get: ({get}) => {
        const minutes = get(minuteState);
        return minutes / 60;
    },
    set: ({set}, newValue) => {
        // newValue에서는 시간 인풋에서 입력한 값을 받아온다
        const minutes = Number(newValue) * 60;
        // minutesState에 변환한 분 값을 입력한다.
        set(minuteState, minutes);
    }
})