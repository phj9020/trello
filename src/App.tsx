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
  const onDragEnd = ({draggableId, destination, source} : DropResult) => { 
    // destination 즉 목적지를 정하지 않을 시 예외처리 
    if(!destination) return;
    // modify order in toToState
    // setToDos(oldeToDos => {
    //   // splice 는 어레이 형태를 변형시키므로 copy 후 작업 
    //   const toDosCopy = [...oldeToDos];
    //   // Step1 : delete item on source.index
    //   toDosCopy.splice(source?.index, 1);
    //   // Step 2 : Put back the item on the destination.index 
    //   // splice(start, 지울개수, 삽입항목);
    //   toDosCopy.splice(destination?.index, 0, draggableId);
    //   console.log(toDosCopy)
    //   return toDosCopy;
    // })
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
