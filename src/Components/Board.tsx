
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './DragabbleCard';



const SingleBoard = styled.div`
    padding: 20px 10px;
    padding-top: 30px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 10px;
    min-height: 200px;
    margin: 20px 0px;
`

interface IBoard {
    toDos: string[];
    boardId: string;
}


function Board({toDos, boardId } :IBoard ) {
    return (
            <Droppable droppableId={boardId} >
                {
                (magic) =>
                <SingleBoard ref={magic.innerRef} {...magic.droppableProps}>
                    {toDos.map((todo, index) =>
                    <DraggableCard key={index} todo={todo} index={index} />
                    )}
                    {/* dragable을 밖으로 빼도 사이즈가 그대로를 유지하게 만듦 placehoder */}
                    {magic.placeholder}
                </SingleBoard>
                }
            </Droppable>
    )
}

export default Board;