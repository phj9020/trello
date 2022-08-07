
import { Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { IToDo, toDoState } from '../atoms';
import DraggableCard from './DragabbleCard';


const Wrapper = styled.div`
    width: 300px;
    padding-top: 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    overflow:hidden;
`;

interface IArea {
    isDraggingOver: boolean;
    isDraggingFromThis : boolean;

}

const Area = styled.div<IArea>`
    background-color: ${(props) => props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent"};
    flex-grow: 1;
    transition: background-color 0.3s ease-in-out;
    padding: 20px;
`

const BoardTitle = styled.h2`
    margin-bottom:10px;
    font-weight: 800;
    text-align: center;
`
const Form = styled.form`
    width: 100%;
    input {
        width:100%;
    }
`

interface IBoard {
    toDos: IToDo[];
    boardId: string;
}


interface IForm {
    toDo : string;
}

function Board({toDos, boardId } :IBoard ) {
    const setToDos = useSetRecoilState(toDoState)
    const { register, setValue, handleSubmit } =  useForm<IForm>();
    const onValid = (data:IForm) => {
        console.log(data);
        const newToDo = {
            id: Date.now(),
            text: data.toDo
        };
        // set newToDo in recoil state 
        setToDos(allBoards => {
            // 기존 보드들을 넣어주고 추가하는 특정 보드안에 있었던 항목도 넣어주고 newToDo를 넣어줘야한다. (순서는 마지막에 넣는것으로)
            return {
                ...allBoards,
                [boardId] : [...allBoards[boardId], newToDo]
            }
        })
        // empty the value in input
        setValue("toDo", "");
    }
    return (
        <Wrapper>
            <BoardTitle>{boardId}</BoardTitle>
            <Form onSubmit={handleSubmit(onValid)}>
                <input {...register("toDo", {required:true})} type="text" placeholder={`Add task on ${boardId}`}/>
            </Form>
            <Droppable droppableId={boardId} >
                {(magic, snapshot) =>
                    <Area isDraggingOver={snapshot.isDraggingOver}
                        isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                        ref={magic.innerRef} {...magic.droppableProps}>
                        {toDos.map((todo, index) =>
                            <DraggableCard key={todo.id} todoId={todo.id} todoText={todo.text} index={index} />
                        )}
                        {/* dragable을 밖으로 빼도 사이즈가 그대로를 유지하게 만듦 placehoder */}
                        {magic.placeholder}
                    </Area>
                }
            </Droppable>
        </Wrapper>
    )
}

export default Board;