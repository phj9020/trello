import { GlobalStyle } from './style/GlobalStyle';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
function App() {
  // when drag ends fn
  const onDragEnd = () => {}
  return (
      <>
        <GlobalStyle />
        <DragDropContext onDragEnd={onDragEnd}>
          <div>
            <Droppable droppableId="one" >
              {(magic) => 
                <ul ref={magic.innerRef} {...magic.droppableProps}>
                  <Draggable draggableId="first" index={0}>
                    {(provided) => 
                      <li 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} >
                        one <span {...provided.dragHandleProps}>control</span>
                      </li>}
                  </Draggable>
                  <Draggable draggableId="second" index={1}>
                    {(provided) => 
                      <li 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}>
                        two
                      </li>}
                  </Draggable>
                </ul>}

            </Droppable>
          </div>
        </DragDropContext>
      </>
  );
}

export default App;
