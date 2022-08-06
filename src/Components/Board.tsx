
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './DragabbleCard';


const Wrapper = styled.div`
    width: 300px;
    padding: 20px 10px;
    padding-top: 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 300px;
`;


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
                {
                (magic) =>
                <>
                <div style={{backgroundColor:'red'}} ref={magic.innerRef} {...magic.droppableProps}>
                    {toDos.map((todo, index) =>
                        <DraggableCard key={index} todo={todo} index={index} />
                    )}
                    {/* dragable을 밖으로 빼도 사이즈가 그대로를 유지하게 만듦 placehoder */}
                    {magic.placeholder}
                </div>
                </>
                }
            </Droppable>
        </Wrapper>
    )
}

export default Board;