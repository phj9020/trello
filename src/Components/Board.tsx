
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
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

interface IBoard {
    toDos: string[];
    boardId: string;
}


function Board({toDos, boardId } :IBoard ) {
    return (
        <Wrapper>
            <BoardTitle>{boardId}</BoardTitle>
            <Droppable droppableId={boardId} >
                {(magic, snapshot) =>
                    <Area isDraggingOver={snapshot.isDraggingOver}
                        isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                        ref={magic.innerRef} {...magic.droppableProps}>
                        {toDos.map((todo, index) =>
                            <DraggableCard key={index} todo={todo} index={index} />
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