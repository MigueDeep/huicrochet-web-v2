import React, { useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { UsersStats } from "./UsersStats";
import { ViewsDateStats } from "./ViewsDateStats";

export const UserViewsDate = () => {
  const [components, setComponents] = useState([
    { id: "usersStats", component: <UsersStats /> },
    { id: "viewsDateStats", component: <ViewsDateStats /> },
  ]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = components.findIndex((comp) => comp.id === active.id);
    const newIndex = components.findIndex((comp) => comp.id === over.id);

    if (oldIndex !== newIndex) {
      setComponents((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div>
        {components.map(({ id, component }) => (
          <DraggableDroppable key={id} id={id}>
            {component}
          </DraggableDroppable>
        ))}
      </div>
    </DndContext>
  );
};

interface DraggableDroppableProps {
  id: string;
  children: React.ReactNode;
}

const DraggableDroppable: React.FC<DraggableDroppableProps> = ({
  id,
  children,
}) => {
  const {
    setNodeRef: setDraggableRef,
    listeners,
    attributes,
    transform,
    isDragging,
  } = useDraggable({ id });
  const { setNodeRef: setDroppableRef } = useDroppable({ id });

  const style = {
    transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
    transition: isDragging ? "none" : "transform 200ms ease",
    marginBottom: "16px", // Espacio entre los elementos
    cursor: "drag",
  };

  return (
    <div
      ref={(node) => {
        setDraggableRef(node);
        setDroppableRef(node);
      }}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};
