import { GlobalStyle } from './style/GlobalStyle';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

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

const toDos = ["a", "b", "c", "d"]

function App() {
  // when drag ends fn
  const onDragEnd = () => { }
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
                    <Draggable key={index} draggableId={todo} index={index}>
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
