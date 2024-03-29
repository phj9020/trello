import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';



const Card = styled.div<{isDragging: boolean}>`
border-radius: 5px;
padding: 10px;
background-color: ${(props) => props.isDragging ? "#74b9ff" : props.theme.cardColor};
margin-bottom: 5px;
box-shadow : ${props => props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : "none"};
`

interface IDraggableCardProps {
    todoId: number;
    todoText: string;
    index: number;
}

function DraggableCard({todoId, todoText, index}: IDraggableCardProps) {
    console.log(todoText, "has been rendered")
    return (
        <Draggable key={todoId} draggableId={todoId+""} index={index}>
            {(provided, snapshot) =>
                <Card
                    isDragging={snapshot.isDragging}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    {todoText}
                </Card>}
        </Draggable>
                        
            
        
    )
};

export default React.memo(DraggableCard);