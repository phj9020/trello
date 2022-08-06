import { GlobalStyle } from './style/GlobalStyle';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { toDoState } from './atoms';
import Board from './Components/Board';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width:680px;
  margin: 0 auto;
  justify-content:center;
  align-items: center;
  height: 100vh;
`

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`





function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  // when drag ends fn
  const onDragEnd = (info : DropResult) => { 
    console.log("info",info)
    const { destination, draggableId, source} = info;
    // case 1 : 도착할 곳을 정하지 않을 경우
    if(!destination) return;
    // case 2 : 만약, 같은 보드에서 움직인다면, same board movement 
    if(destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        console.log("allBoards",allBoards)
        // splice 는 어레이 형태를 변형시키므로 copy 후 작업 
        const boardCopy = [...allBoards[source.droppableId]];
        // Step1 : delete item on source.index
        boardCopy.splice(source?.index, 1);
        // Step 2 : Put back the item on the destination.index 
        // splice(start, 지울개수, 삽입항목);
        boardCopy.splice(destination?.index, 0, draggableId);
        console.log(boardCopy)
        return {
          ...allBoards,
          [source.droppableId]: boardCopy
        };
      });
    };
    // case 3 : 다른 보드로 움직일 경우
    if(destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination?.droppableId]];
        sourceBoard.splice(source?.index, 1);
        destinationBoard.splice(destination?.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId] : sourceBoard,
          [destination?.droppableId] : destinationBoard
        }
      })
    }

  }
  return (
    <>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map(boardId => <Board toDos={toDos[boardId]} boardId={boardId} key={boardId} /> )}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
