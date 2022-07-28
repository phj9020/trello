import { GlobalStyle } from './style/GlobalStyle';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { toDoState } from './atoms';

const Wrapper = styled.div`
  display: flex;
  width: 480px;
  max-width: 400px;
  margin: 0 auto;
  justify-content:center;
  align-items: center;
  height: 100vh;
`

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-column: repeat(1, 1fr);
`

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 10px;
  min-height: 200px;
  `

const Card = styled.div`
  border-radius: 5px;
  padding: 10px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 5px;
`


function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  // when drag ends fn
  const onDragEnd = ({draggableId, destination, source} : DropResult) => { 
    // destination 즉 목적지를 정하지 않을 시 예외처리 
    // if(!destination) return;
    // modify order in toToState
    setToDos(oldeToDos => {
      // splice 는 어레이 형태를 변형시키므로 copy 후 작업 
      const toDosCopy = [...oldeToDos];
      // Step1 : delete item on source.index
      toDosCopy.splice(source?.index, 1);
      // Step 2 : Put back the item on the destination.index 
      // splice(start, 지울개수, 삽입항목);
      toDosCopy.splice(destination?.index as number, 0, draggableId);
      console.log(toDosCopy)
      return toDosCopy;
    })
  }
  return (
    <>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId="one" >
              {
                (magic) =>
                <Board ref={magic.innerRef} {...magic.droppableProps}>
                  {toDos.map((todo, index) =>
                    <Draggable key={todo} draggableId={todo} index={index}>
                      {(provided) =>
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          {todo}
                        </Card>}
                    </Draggable>
                  )}
                  {/* dragable을 밖으로 빼도 사이즈가 그대로를 유지하게 만듦 placehoder */}
                  {magic.placeholder}
                </Board>
              }
            </Droppable>
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
